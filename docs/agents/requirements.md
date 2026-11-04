# Requirements and change specifications

Every implementation needs a GitHub issue before repository changes begin.
State the problem, desired and preserved behavior, scope, acceptance criteria and verification.
Read the issue’s comments and linked decisions before treating it as ready.
Ask the owner when expected behavior is missing or contradictory.

## Choose the artifact

Use a short issue for a clear bug, documentation change or bounded refactoring.
Use a change spec for unresolved behavior, several scenarios or contributors, contract changes or costly failure.
Propose user-only `to-spec` for the owner to select when needed.
Propose `to-tickets` when independent slices need explicit dependencies.
Tickets reference parent requirements instead of duplicating them.
Keep large ideas as proposals until concrete behavior is ready to specify.

## Current behavior and history

`docs/requirements.en.md` and `docs/requirements.ru.md` describe this repository’s agreed scope.
Maintain the human document pair when the agreed scope changes.
Agent instructions own the operational rules; human process maps explain them.

An issue, including a change spec, records what was requested and why at that time.
After merge, preserve it unchanged as history; never edit it to describe later behavior.
Keep proposed and implemented behavior distinct.

In a project that adopts this harness, each question about current behavior has one owner:

- Behavior: the project’s tests at agreed seams. Name each test by the behavior it checks.
- Terms: `DOMAIN.md`.
- Decisions that meet the ADR criteria in `domain-modeling`, including deliberate non-goals: ADRs.

Such a project keeps current behavior in these sources only, without a separate prose document.
A lasting requirement that a test cannot check goes into an ADR when it meets those criteria.
Otherwise its issue remains its record.

## When requirements change

Follow [human participation](human-review.md) for planned checks and acceptance.
Before changing agreed behavior, show the semantic difference and obtain the owner’s decision.
Record the decision in the issue and update affected criteria, tickets, checks and implementation.
Pause dependent work while the decision is missing; independent authorized work may continue.
A passing test does not justify changing requirements to match the implementation.
After merge, new desired behavior gets a new issue.
The new issue links the earlier issue and names each criterion it replaces.
A violation of tested behavior or of an accepted criterion gets a bug issue.
