#!/usr/bin/env python3
"""Check repository structure. This does not evaluate agent behavior or translation meaning."""
from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


def prose(text: str) -> str:
    """Exclude fenced examples, including triple fences inside four-backtick examples."""
    result, fence = [], None
    for line in text.splitlines():
        match = re.match(r"^\s*(`{3,}|~{3,})(.*)$", line)
        if fence:
            if match and match[1][0] == fence[0] and len(match[1]) >= fence[1] and not match[2].strip():
                fence = None
            continue
        if match:
            fence = (match[1][0], len(match[1]))
        else:
            result.append(line)
    return "\n".join(result)


def anchors(text: str) -> set[str]:
    result, seen = set(), {}
    for heading in re.findall(r"^#{1,6}\s+(.+?)\s*#*$", prose(text), re.M):
        slug = re.sub(r"[^\w\- ]", "", heading.lower()).replace(" ", "-")
        suffix = seen.get(slug, 0)
        seen[slug] = suffix + 1
        result.add(slug + (f"-{suffix}" if suffix else ""))
    return result


def identity(directory: Path) -> str:
    digest = hashlib.sha256()
    for file in sorted(directory.rglob("*"), key=lambda file: file.relative_to(directory).as_posix()):
        if file.is_file():
            digest.update(file.relative_to(directory).as_posix().encode() + b"\0" + file.read_bytes() + b"\0")
    return digest.hexdigest()


UPSTREAM = Path(".agents/upstream/mattpocock")


def read_source(root: Path) -> dict[str, str]:
    """Read the `key: value` lines of the pristine upstream copy's SOURCE file."""
    lines = (root / UPSTREAM / "SOURCE").read_text().splitlines()
    return dict(line.split(": ", 1) for line in lines if ": " in line)


def local_names(root: Path) -> dict[str, str]:
    """Map renamed upstream skills to their local names, from `upstream-name: local-name` lines in RENAMES."""
    file = root / UPSTREAM / "RENAMES"
    if not file.is_file():
        return {}
    lines = [line.split("#", 1)[0].strip() for line in file.read_text().splitlines()]
    return dict(tuple(part.strip() for part in line.split(":", 1)) for line in lines if ":" in line)


def check_upstream(root: Path, skills: Path) -> list[str]:
    errors, upstream = [], root / UPSTREAM
    if not (upstream / "SOURCE").is_file():
        return [f"{UPSTREAM}/SOURCE: missing"]
    source = read_source(root)
    if not (upstream / "skills").is_dir() or identity(upstream / "skills") != source.get("sha256"):
        errors.append(f"{UPSTREAM}: pristine copy differs from SOURCE; never edit it by hand")
    names = local_names(root)
    for directory in sorted((upstream / "skills").glob("*/*")):
        if not (skills / names.get(directory.name, directory.name) / "SKILL.md").is_file():
            errors.append(f"{directory.relative_to(root)}: no local skill with this name")
    revision = source.get("revision", "")
    if not re.fullmatch(r"[0-9a-f]{40}", revision):
        errors.append(f"{UPSTREAM}/SOURCE: revision must be a full commit SHA")
    else:
        for name in [".agents/skills/README.md", "NOTICE"]:
            pinned = set(re.findall(r"mattpocock/skills/tree/([0-9a-f]{40})", (root / name).read_text()))
            if pinned != {revision}:
                errors.append(f"{name}: Matt's snapshot link must name the SOURCE revision {revision}")
    return errors


def check(root: Path) -> tuple[list[str], dict[str, int]]:
    root = root.resolve()
    errors, counts = [], {"skills": 0, "local_links": 0}
    skills = root / ".agents/skills"
    inventory = (skills / "README.md").read_text()
    for directory in sorted(skills.iterdir()):
        file = directory / "SKILL.md"
        if not file.is_file():
            continue
        counts["skills"] += 1
        match = re.match(r"^---\n(.*?)\n---", file.read_text(), re.S)
        if not match:
            errors.append(f"{directory.name}: missing frontmatter")
            continue
        frontmatter = match[1]
        name = re.search(r"^name:\s*([^\n]+)", frontmatter, re.M)
        if not name or name[1].strip(" '\"") != directory.name:
            errors.append(f"{directory.name}: name mismatch")
        if not re.search(r"^description:\s*\S", frontmatter, re.M):
            errors.append(f"{directory.name}: missing description")
        native = directory / "agents/openai.yaml"
        if not native.is_file():
            errors.append(f"{directory.name}: missing native metadata")
        else:
            implicit = re.search(r"allow_implicit_invocation:\s*(true|false)", native.read_text())
            user_only = bool(re.search(r"^disable-model-invocation:\s*true\s*$", frontmatter, re.M))
            if (implicit is None or implicit[1] == "true") == user_only:
                errors.append(f"{directory.name}: invocation policies disagree")
        row = f"| `{directory.name}` | `{identity(directory)}` |"
        if row not in inventory:
            errors.append(f"{directory.name}: directory identity differs from inventory")

    errors += check_upstream(root, skills)
    upstream = root / UPSTREAM

    for file in sorted(root.rglob("*.md")):
        if ".git" in file.relative_to(root).parts or file.is_relative_to(upstream):
            continue
        for raw in re.findall(r"(?<!!)\[[^\]\n]*\]\(([^)\n]+)\)", prose(file.read_text())):
            url = urlsplit(raw.strip().split(' "')[0].strip("<>"))
            if url.scheme or url.netloc:
                continue
            counts["local_links"] += 1
            path = unquote(url.path)
            target = (root / path.lstrip("/")) if path.startswith("/") else (file.parent / path)
            target = target.resolve() if path else file
            if not target.is_relative_to(root) or not target.exists():
                errors.append(f"{file.relative_to(root)}: missing local link {raw}")
            elif url.fragment and target.suffix == ".md" and unquote(url.fragment) not in anchors(target.read_text()):
                errors.append(f"{file.relative_to(root)}: missing anchor {raw}")

    for left, right in [("CLAUDE.md", "AGENTS.md"), (".claude/skills", ".agents/skills")]:
        if not (root / left).is_symlink() or (root / left).resolve() != (root / right).resolve():
            errors.append(f"{left}: incorrect client pointer")
    if not re.search(r"^Human language: (en|ru)\.$", (root / "AGENTS.md").read_text(), re.M):
        errors.append("AGENTS.md: choose an explicit en or ru human language")
    for file in root.rglob("*.en.md"):
        if not file.with_name(file.name.replace(".en.md", ".ru.md")).is_file():
            errors.append(f"{file.relative_to(root)}: missing Russian peer")
    for file in root.rglob("*.ru.md"):
        if not file.with_name(file.name.replace(".ru.md", ".en.md")).is_file():
            errors.append(f"{file.relative_to(root)}: missing English peer")
    return errors, counts


if __name__ == "__main__":
    problems, checked = check(Path(__file__).resolve().parents[1])
    print(f"Checked {checked['skills']} skills and {checked['local_links']} local links/anchors.")
    for problem in problems:
        print(problem, file=sys.stderr)
    if problems:
        raise SystemExit(1)
    print("Structure checks passed. Behavior and translation meaning require separate evidence.")
