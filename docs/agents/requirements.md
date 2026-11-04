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

## Current contract and history

`docs/requirements.en.md` and `docs/requirements.ru.md` describe this repository’s agreed scope.
`DOMAIN.md` owns terminology; ADRs record consequential accepted trade-offs when needed.
Agent instructions own the operational rules; human process maps explain them.
Historical issues record the change requested at that time.
Keep proposed and implemented behavior distinct.
Maintain the human document pair when the agreed scope changes.

## When requirements change

Follow [human participation](human-review.md) for planned checks and acceptance.
Before changing agreed behavior, show the semantic difference and obtain the owner’s decision.
Record the decision in the issue and update affected criteria, tickets, checks and implementation.
Pause dependent work while the decision is missing; independent authorized work may continue.
A passing test does not justify changing requirements to match the implementation.
After merge, new desired behavior gets a new issue; violations of the current contract get bug issues.
