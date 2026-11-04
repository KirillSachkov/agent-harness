---
name: pr
description: "Use when writing a PR body."
metadata:
  credits:
    skill: show-me
    author: Dex Horthy
    organisation: Humanlayer
    url: "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md"
---

Write a report the owner can understand without reading the conversation or every changed line. Root `AGENTS.md` owns audience language, including headings. Preserve technical syntax and use terms from `DOMAIN.md`. `ship` owns PR delivery; this skill owns its description.

## Build the explanation

1. Read the issue/spec, actual diff, verification results, and independent findings. Follow `docs/agents/human-review.md` for human checks.
2. Lead with the problem and resulting behavior. Use a concrete before/after example where it helps. Show the affected scope.
3. Choose the smallest useful structure. For diagrams, visual evidence, or formatting beyond the template, read the relevant [presentation](PRESENTATION.md) section. Use GitHub-supported Markdown to make the result clear and easy to scan.
4. Show the evidence conclusion and material limits first. Put commands, logs, revision records, and the complete check table in a disclosure.
5. State the owner's next action and additional human checks, or briefly explain why none are needed. Keep unresolved questions visible.
6. Describe consequences, reversibility, and rollback. Include deviations only when they exist. Read the rendered result before handoff.

## Suggested shape

Scale this shape to the change. Translate its headings into the team language. Omit empty sections and replace every placeholder.

````markdown
<agent provenance under project rules>

## What changes

<problem, resulting behavior, and a small visual when useful>

## Verification

<short result, actual evidence, and the important limit>

<details>
<summary>Verification details</summary>

Checked head: <commit permalink>. Review base: <full SHA>.

| Check | Result | What it confirms |
| --- | --- | --- |
| <command or observed step> | <actual result> | <scope and limit> |

</details>

## What the owner needs to do

<concrete question or action, expected result, reason, and evidence>
<or a short reason why no additional manual check is needed>

## Risk and rollback

<affected behavior, consequences, reversibility, rollback, and residual uncertainty>
````

## Evidence and human actions

List every check actually run on the delivered result in the detailed table, including manual observations. Distinguish current evidence from earlier runs, planned work, skipped checks, and unavailable checks. Record exact revisions and requirement inputs. Keep the conclusion short; the journal must remain available without dominating it.

For a bug, show how the reproduction or regression test fails before the fix and passes after it, when observed. For changed assertions, explain old/new expectations and the requirement that changed them. For visual changes, provide real screenshots or recordings when they demonstrate the changed property. Label examples and proposed experiments as unexecuted.

Link findings to their disposition. Explain a rejected finding or deferred item rather than hiding it in a green summary. A passing check confirms only what it exercised; a screenshot does not establish a backend permission rule.

Follow the project's human-check policy instead of generating a generic checklist. An owner's task list records their required actions; mark an action complete only from their recorded result. Keep readiness, acceptance, and merge authority distinct.

## Language and links

Use plain, concrete sentences with one idea each. Introduce unfamiliar terms. Prefer behavior and consequences over an inventory of files. Add file links only where they help inspection.

Link to the issue, CI run, evidence, and relevant code at the checked revision. Published PRs use accessible GitHub links; local paths and private session artifacts are not shared evidence. Keep essential limitations, decisions, and required human actions outside collapsed sections.
