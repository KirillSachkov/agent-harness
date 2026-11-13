"""Regression tests for the client pointer checks in scripts/check.py.

Run from the repository root: python3 -m unittest discover -s scripts
"""
from __future__ import annotations

import shutil
import tempfile
import unittest
from pathlib import Path

import check

ROOT = Path(__file__).resolve().parents[1]


class ClientPointers(unittest.TestCase):
    def errors(self, change) -> list[str]:
        with tempfile.TemporaryDirectory() as temporary:
            copy = Path(temporary) / "repo"
            shutil.copytree(ROOT, copy, symlinks=True, ignore=shutil.ignore_patterns(".git"))
            change(copy)
            return check.check(copy)[0]

    def test_root_claude_md_fails(self) -> None:
        self.assertIn(
            "CLAUDE.md: use native AGENTS.md instead of CLAUDE.md",
            self.errors(lambda copy: (copy / "CLAUDE.md").symlink_to("AGENTS.md")),
        )

    def test_nested_claude_md_fails(self) -> None:
        self.assertIn(
            "docs/CLAUDE.md: use native AGENTS.md instead of CLAUDE.md",
            self.errors(lambda copy: (copy / "docs/CLAUDE.md").write_text("# Notes\n")),
        )

    def test_broken_skills_pointer_fails(self) -> None:
        def unlink(copy: Path) -> None:
            (copy / ".claude/skills").unlink()

        self.assertIn(".claude/skills: incorrect client pointer", self.errors(unlink))


if __name__ == "__main__":
    unittest.main()
