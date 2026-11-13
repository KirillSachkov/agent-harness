"""Regression tests for the client pointer checks in scripts/check.py.

Run from the repository root: python3 -m unittest discover -s scripts
"""
from __future__ import annotations

import unittest
from pathlib import Path

from test_upstream import check_copy

UPSTREAM_SKILL = ".agents/upstream/mattpocock/skills/productivity/grilling"


class ClientPointers(unittest.TestCase):
    def test_root_claude_md_fails(self) -> None:
        self.assertIn(
            "CLAUDE.md: use native AGENTS.md instead of CLAUDE.md",
            check_copy(lambda copy: (copy / "CLAUDE.md").symlink_to("AGENTS.md")),
        )

    def test_nested_claude_md_fails(self) -> None:
        self.assertIn(
            "docs/CLAUDE.md: use native AGENTS.md instead of CLAUDE.md",
            check_copy(lambda copy: (copy / "docs/CLAUDE.md").write_text("# Notes\n")),
        )

    def test_claude_md_in_pristine_upstream_copy_is_not_reported_as_ours(self) -> None:
        errors = check_copy(lambda copy: (copy / UPSTREAM_SKILL / "CLAUDE.md").write_text("# Upstream\n"))
        self.assertEqual([error for error in errors if "CLAUDE.md" in error], [])

    def test_broken_skills_pointer_fails(self) -> None:
        def unlink(copy: Path) -> None:
            (copy / ".claude/skills").unlink()

        self.assertIn(".claude/skills: incorrect client pointer", check_copy(unlink))


if __name__ == "__main__":
    unittest.main()
