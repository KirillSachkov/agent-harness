# Delivery and permissions

Use `ship` to deliver a committed, independently reviewed branch as a verified PR.
Use `pr` for its description in the language selected by root `AGENTS.md`.
The testing guide owns verification commands; the tracker guide owns GitHub operations.

## Issues and PRs

Independent work targets `main`; a spec uses an integration branch for its tickets.
Each implementation issue links to a PR. One integration PR may close several tickets.
A discussion or research issue without repository changes may resolve with an answer.
For a small task, the draft follows local checks and committed independent review.
A spec's draft follows its first integrated result.
A ready PR requires checks and review covering the current change.
Keep issues open until delivery criteria are met, normally by merge.

## Verification evidence

Follow [testing](testing.md) before delivery.
Checks and independent review must cover the delivered contents and accepted requirements.
Retain the initial full-diff review when later passes check only corrections and affected interactions.
Resolve blocking findings; keep optional suggestions and disputed decisions visible in the issue or PR.
Optional redesign does not expand the assignment.
For disputes, scope changes or corrections that stop making progress, follow [Ask the owner](human-review.md#ask-the-owner).
Apply these rules to agent and human findings within the active assignment.

After updating from the intended target, record a new immutable merge-base and review the complete resulting PR diff.
Include relevant interactions and conflict resolutions; retain earlier reports and checked endpoints.
New code or requirements need affected checks and review again.
Delivery requires successful CI on the current PR result.
Failures remain blockers until resolved.
Report unrelated failures and propose a separate implementation rather than expanding the assignment.

## Acceptance and merge

Every final PR goes to the owner for acceptance under [human participation](human-review.md).
Merge requires the owner’s explicit approval of the delivered head; an agent records its source and full SHA.
The owner may approve in the PR or in a message to the agent.
Use `gh pr merge <number> --squash --match-head-commit <approved-sha>` for an authorized merge.
A changed head needs renewed approval.
Agent review, an implementation start and green CI do not independently grant merge permission.
Never write an approval as if the owner authored it.
Shared-account authorship does not prove human approval; use the owner’s actual communication.

Inspect repository settings before claiming a check is required or a branch is protected.
This initial example does not install rulesets, automated approvals, deployment or auto-merge.
Retain the PR worktree for acceptance and clean only owned resources.
