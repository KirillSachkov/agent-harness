---
name: ship
description: "Deliver reviewed work as a verified PR for owner acceptance. Use after implement or implement-spec, or when asked to deliver a reviewed branch."
---

Deliver the assigned, committed, independently reviewed branch. Before delivery, read root `AGENTS.md`, its delivery, testing, tracker, and human-participation pointers, and the issue/spec. Complete missing evidence under those project rules.

1. Push the owned branch. Call `pr` for the body. Create or update its PR through the configured tracker, following project draft timing and issue linkage. Return material revisions to draft during verification.
2. Wait for CI on the current PR result. For in-scope failures, fix, commit, and repeat affected checks and independent review. Report blockers under the project's escalation policy.
3. Record checked revisions, finding dispositions, evidence and its limits, and agreed human checks in the PR. Resolve any human decision due before handoff.
4. When project readiness criteria hold, mark the draft ready. Give the owner the PR, checked commit, and concrete next action. Retain or clean owned resources under project worktree rules.
