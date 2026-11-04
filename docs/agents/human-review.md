# Human participation

Use root `AGENTS.md` for assignment and start authority. Follow [requirements.md](requirements.md#when-requirements-change) for behavior changes and [delivery.md](delivery.md) for merge authority.

## Human check

Record each additional check with these fields:

- Person or role.
- Affected behavior, plausible failure, and its consequence.
- Concrete action or question and expected result. Missing expectations remain explicit decisions for the owner.
- Evidence and its limits.
- When the check is needed and what permits work to continue.

## Plan additional acceptance

When preparing an issue or spec, agree additional checks using the [human-check fields](#human-check). A small issue may explicitly need no checks beyond normal final PR acceptance. Tickets inherit relevant parent checks and identify additional ones. Surface newly discovered checks when their decision is needed. Keep agreed checks until the owner resolves them; an agent cannot waive them.

## Choose additional human checks

Use the change's consequences, not its size or file extension. Require a focused human decision or inspection for:

- Changed permissions, identity, data visibility, or access revocation.
- Destructive data changes, irreversible actions, or consequential external effects.
- Changed business rules, shared contracts, or architecture that establishes a new pattern.
- Material changes to a user journey, interaction, or message whose meaning needs human judgment.
- Changes to CI, release controls, or agent authority, including instructions that change these controls.
- Missing or conflicting expectations, insufficient evidence, or a scenario requiring human-only access.

The owner or designated specialist inspects the remaining question. This need not mean reading the entire diff or repeating passing automated tests. Link existing evidence where it answers the question. A sensitive path is a search aid; changes elsewhere can trigger the same rule.

Before handoff, the independent Spec reviewer compares requirements, agreed checkpoints, the complete delivered diff, and current evidence. Report omitted triggers, stale evidence, and unsupported claims.

If no additional check is needed, give a short reason in the PR. Every final PR still goes to the owner for acceptance. Automated checks and independent review remain applicable. Automatic risk classifiers and exceptions to owner acceptance are future policy work.

## Present the result

Lead with changed behavior and the owner's next action. Present each additional check using the [human-check fields](#human-check).

Keep required human actions, unresolved questions, and material limitations visible. Put detailed commands, logs, and revision records behind a disclosure. Use `pr` for presentation. A screenshot demonstrates visible state; permissions and side effects need evidence at the relevant boundary. Mark planned or unavailable checks as such.

## Ask the owner

Ask when expected behavior is missing or contradictory, requirements must change, a finding requires a disputed decision, authority is insufficient, or an agreed human check is due. State one concrete question, recommend an answer with its consequences, and link the current issue/PR and relevant evidence. Explain which work is waiting and how it can resume.

Record the question and next step in the existing issue or PR, and notify the owner in the current conversation. Pause the affected work; continue independent authorized work. Do not invent an answer from silence or keep retrying without progress.

## Keep results inspectable

Record agent verification and progress in comments or the PR. Preserve the issue's agreed criteria and their acceptance checkboxes; the owner controls acceptance marks. Keep the issue open until its delivery criteria are met, normally by its linked PR merging.

Readiness, human acceptance, and merge are separate states. Reviews name commits and requirement inputs; [delivery.md](delivery.md#verification-evidence) owns revision changes and renewed merge approval.
