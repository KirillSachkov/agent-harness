# Worktree ownership

Each independent implementation uses its own worktree and branch.
Reuse the assigned worktree when resuming an issue.
One writer owns a worktree at a time.
Read-only reviewers may share a committed snapshot.
A reviewer that writes artifacts inside the repository needs a separate copy.

## Start or resume

1. Inspect path, branch, HEAD, status and assignment. Preserve existing changes and live work.
2. Reuse the issue’s dedicated worktree when one exists; establish ownership before writing.
3. Otherwise, base independent work on fetched `origin/main` and confirm its actual base.
4. Base spec ticket worktrees on the integration branch. Integrate worker commits serially.
5. Prefer the host’s worktree manager when available. Otherwise use Git’s worktree commands.

Use the root checkout for orientation rather than implementation.
Never reset another worker’s checkout to obtain a desired base.

## Shared resources and finish

This repository currently launches no application services.
Worktrees isolate files, not credentials, ports or external effects.
Before an experiment starts shared services, establish ownership and an isolation plan in its issue.
Retain the PR worktree for acceptance.
Remove only owned, integrated child worktrees with no active writer or unsaved work.
