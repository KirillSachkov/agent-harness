---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: true
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`.

Read root `AGENTS.md` and its requirements, worktree, human-participation, and delivery pointers. Confirm the approved spec, tickets, criteria, blockers, and human checkpoints. The owner's start authorizes the agreed child tasks, not new requirements.

The goal is the entire spec on one **integration branch/worktree**, delivered under project rules. Record an immutable review base against the intended target. Follow the project's ticket lifecycle.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Start every subagent with a fresh context window.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

**Implementer subagents** should be run in the background where possible for maximum concurrency.

## Steps

1. Read the spec and tickets to understand the task graph.

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible by all future subagents. This lets **implementer subagents** focus on implementation rather than exploration.

3. Prepare or reuse the owned integration worktree and branch. If the issue tracker closes work through PRs, or the user asks for one, open a draft PR after the first merge in step 5 (a branch with no commits ahead of main can't open one), marked as closing the spec and tickets.

4. Use a fresh **implementer subagent** for each ticket, each in its own worktree on its own branch. Each implementer subagent:
   - confirms ownership and the actual integration base before starting; reports mismatches without resetting foreign work;
   - follows project testing rules and calls `tdd` where required; observes inherited human checkpoints;
   - merges the integration branch tip into its own branch before reporting done

5. Once an **implementer subagent** completes, merge its work to the integration branch with a **merger subagent**.

6. If this changes the **frontier** of available tickets, kick off more **implementer subagents** to work on the new tickets. This allows for maximum concurrency.

7. Once tickets are integrated and project checks pass, commit the result and call `code-review` with the recorded base, reviewed head, and spec for the complete integration diff. Fix review issues in a single fresh **implementer subagent**. Rerun affected checks, commit corrections, and call `code-review` with the earlier report to check the fixes. Individual ticket workers still use `tdd`, not the user-only `implement` entrypoint.

8. Follow root `AGENTS.md` delivery pointers for the verified integration result, reusing any draft PR.

9. Clean up only owned, integrated child worktrees with no active writer or unsaved work. Follow project rules for retaining the integration worktree.
