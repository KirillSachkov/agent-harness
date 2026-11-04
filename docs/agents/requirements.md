# Requirements and change specifications

Every implementation needs a GitHub issue before repository changes begin.
Read its comments and linked decisions when preparing the assignment.

## Choose the artifact

Use a short issue for a clear bug, documentation change or bounded refactoring.
Use a change spec for unresolved behavior, several scenarios or contributors, contract changes or costly failure.
Propose user-only `to-spec` for the owner to select when needed.
Propose `to-tickets` when independent slices need explicit dependencies.
Tickets reference parent requirements instead of duplicating them.
Keep large ideas as proposals until concrete behavior is ready to specify.

## Current contract and history

`docs/requirements.en.md` and `docs/requirements.ru.md` describe this repository’s agreed scope.
Historical issues record the change requested at that time.
Keep proposed and implemented behavior distinct.
Maintain the human document pair when the agreed scope changes.

A short issue records the problem, desired and preserved behavior, scope, acceptance criteria and verification.
Use the `to-spec` template for full specs and [human participation](human-review.md) for acceptance planning.

## When requirements change

Before changing agreed behavior, show the semantic difference and follow [Ask the owner](human-review.md#ask-the-owner).
Record the decision in the issue and update affected criteria, tickets, checks and implementation.
After merge, new desired behavior gets a new issue; violations of the current contract get bug issues.
