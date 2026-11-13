#!/usr/bin/env python3
"""Show local adaptations of Matt's skills and merge a new upstream revision into them.

The pristine upstream copy lives in .agents/upstream/mattpocock. It is never edited by hand.
"""
from __future__ import annotations

import argparse
import filecmp
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from check import UPSTREAM, identity, local_names, read_source

ROOT = Path(__file__).resolve().parents[1]
LOCAL = Path(".agents/skills")
REPOSITORY = "https://github.com/mattpocock/skills"


def write_source(root: Path, revision: str, date: str) -> None:
    digest = identity(root / UPSTREAM / "skills")
    (root / UPSTREAM / "SOURCE").write_text(
        f"repository: {REPOSITORY}\nrevision: {revision}\ndate: {date}\nsha256: {digest}\n"
    )


def borrowed(skills: Path) -> dict[str, Path]:
    """Map each skill name to its directory in an upstream `skills/<group>/<name>` layout."""
    found: dict[str, Path] = {}
    for directory in sorted(skills.glob("*/*")):
        if (directory / "SKILL.md").is_file():
            if directory.name in found:
                raise SystemExit(f"upstream has two skills named {directory.name}")
            found[directory.name] = directory
    return found


def files(directory: Path) -> set[str]:
    if not directory.is_dir():
        return set()
    return {file.relative_to(directory).as_posix() for file in directory.rglob("*") if file.is_file()}


def same(left: Path, right: Path) -> bool:
    return filecmp.cmp(left, right, shallow=False)


def pairs(root: Path, names: list[str]) -> list[tuple[Path, Path]]:
    """Pair each named skill (upstream or local name; all when empty) as (pristine copy, local copy)."""
    upstream = borrowed(root / UPSTREAM / "skills")
    local = local_names(root)
    upstream_name = {name: original for original, name in local.items()}
    result = []
    for name in names or sorted(upstream):
        name = upstream_name.get(name, name)
        if name not in upstream:
            raise SystemExit(f"{name} is not a borrowed skill")
        result.append((upstream[name].relative_to(root), LOCAL / local.get(name, name)))
    return result


def diff(root: Path, names: list[str], stat: bool) -> int:
    command = ["git", "diff", "--no-index"] + (["--stat"] if stat else [])
    for pristine, local in pairs(root, names):
        subprocess.run(command + [pristine, local], cwd=root)
    return 0


def merge_skill(old: Path, new: Path, local: Path) -> list[str]:
    """Three-way merge one skill in place. Return the files that need a human."""
    problems = []
    for path in sorted(files(old) | files(new) | files(local)):
        o, n, l = old / path, new / path, local / path
        name = f"{local.name}/{path}"
        if o.is_file() and n.is_file() and l.is_file():
            if same(o, n):
                continue
            if same(o, l):
                shutil.copy(n, l)
                continue
            labels = ["-L", "local", "-L", "old upstream", "-L", "new upstream"]
            code = subprocess.run(["git", "merge-file", *labels, l, o, n]).returncode
            if code > 127:
                problems.append(f"{name}: git merge-file failed (binary or unreadable file); local file kept")
            elif code:
                problems.append(f"{name}: conflict markers left in the file")
        elif n.is_file() and not o.is_file():
            if not l.is_file():
                l.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy(n, l)
            elif not same(n, l):
                problems.append(f"{name}: added both upstream and locally; local file kept")
        elif o.is_file() and not n.is_file() and l.is_file():
            if same(o, l):
                l.unlink()
            else:
                problems.append(f"{name}: removed upstream but changed locally; local file kept")
        elif o.is_file() and n.is_file() and not same(o, n):
            problems.append(f"{name}: changed upstream but removed locally; not restored")
    return problems


def update(root: Path, checkout: Path, revision: str, date: str) -> list[str]:
    old = borrowed(root / UPSTREAM / "skills")
    new = borrowed(checkout / "skills")
    missing = sorted(set(old) - set(new))
    if missing:
        raise SystemExit(f"skills missing upstream, nothing changed: {', '.join(missing)}")
    problems, local = [], local_names(root)
    for name in sorted(old):
        problems += merge_skill(old[name], new[name], root / LOCAL / local.get(name, name))
    shutil.rmtree(root / UPSTREAM / "skills")
    for name in sorted(old):
        shutil.copytree(new[name], root / UPSTREAM / "skills" / new[name].relative_to(checkout / "skills"))
    write_source(root, revision, date)
    adopted = sorted(set(new) - set(old))
    if adopted:
        print("New upstream skills, not adopted: " + ", ".join(adopted))
    return problems


def fetch(repository: str, revision: str, target: Path) -> tuple[str, str]:
    subprocess.run(["git", "clone", "--quiet", repository, str(target)], check=True)
    subprocess.run(["git", "-C", str(target), "checkout", "--quiet", revision], check=True)
    output = subprocess.run(
        ["git", "-C", str(target), "log", "-1", "--format=%H %cs"], check=True, capture_output=True, text=True
    ).stdout.split()
    return output[0], output[1]


def main(argv: list[str], root: Path = ROOT) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    show = commands.add_parser("diff", help="show local adaptations against the pinned upstream copy")
    show.add_argument("skills", nargs="*")
    show.add_argument("--stat", action="store_true")
    merge = commands.add_parser("update", help="merge a new upstream revision into local skills")
    merge.add_argument("revision")
    merge.add_argument("--repository", default=REPOSITORY)
    args = parser.parse_args(argv)

    if args.command == "diff":
        return diff(root, args.skills, args.stat)

    dirty = subprocess.run(
        ["git", "status", "--porcelain", "--", ".agents"], cwd=root, check=True, capture_output=True, text=True
    ).stdout
    if dirty:
        raise SystemExit("commit or discard changes under .agents before an update")
    with tempfile.TemporaryDirectory() as temporary:
        revision, date = fetch(args.repository, args.revision, Path(temporary) / "upstream")
        problems = update(root, Path(temporary) / "upstream", revision, date)
    print(f"Merged upstream {revision} ({date}). Review with: git diff -- .agents")
    print("Then update snapshot links in .agents/skills/README.md and NOTICE, adaptations and directory hashes.")
    for problem in problems:
        print(problem, file=sys.stderr)
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
