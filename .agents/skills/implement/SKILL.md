---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets. Read root `AGENTS.md` and its implementation pointers first.

If the user passes a ticket reference, fetch it from the configured issue tracker and state its title. If the reference is ambiguous, ask.

Prepare or reuse the execution context under project instructions. Record starting HEAD and an immutable review base covering the complete assigned change, including earlier commits when resuming.

Call the client's skill mechanism with `tdd` where project testing rules require it, at pre-agreed seams. Run targeted checks during the loop and the project's applicable verification level at the end.

Commit assigned changes before calling `code-review` with the recorded base, reviewed head, and requirement source.

Fix review issues within the assignment. Rerun affected checks, commit corrections, and call `code-review` with the earlier report to check the fixes.

Follow root `AGENTS.md` delivery pointers for the verified result.
