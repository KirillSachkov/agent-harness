---
name: ship
description: "Deliver reviewed work as a verified PR for owner acceptance. Use after implement or implement-spec, or when asked to deliver a reviewed branch."
---

Deliver the assigned, committed, independently reviewed branch. Read root `AGENTS.md`, `docs/agents/delivery.md`, the testing guide, and the issue/spec. Check that the current tree, requirements, review outcomes, and agreed human checkpoints still match the evidence. Complete missing checks and independent review before delivery.

1. Push the owned branch. Call `pr` to write the body in the team language, then create a draft or update the existing PR through the configured tracker. Reuse a spec's draft and link its implementation issues. Return a ready PR to draft while material revisions need verification.
2. Wait for required CI on the current PR result. Fix failures within scope, commit, and repeat affected checks and independent review before relying on the new CI. Missing, pending, cancelled, or earlier green checks are not success. Report blockers or decisions instead of waiving failures.
3. Record checked revisions, finding dispositions, actual evidence and its limits, and the owner's manual acceptance steps in the PR. Follow project human checkpoints; any required pre-handoff decision must be resolved.
4. When checks and review cover the current result, mark the draft ready and give the owner the PR, the full SHA of its head, and the concrete next action. Keep acceptance and merge distinct; follow project merge authority rather than inferring permission from a green run.

This project's delivery ends at owner handoff. Deployment and automatic merge are outside this procedure. Preserve the PR worktree; clean only owned resources under the worktree rules.
