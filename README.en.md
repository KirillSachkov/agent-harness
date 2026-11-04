# Agent Harness

[Русский](README.ru.md) · [Language selection](README.md)

A personal working example maintained by Kirill Sachkov.
It starts with a small workflow and evolves through real tasks and experiments.

## Start

Open this repository with a coding agent that can read project skills.
Ask it to use `setup-matt-pocock-skills` and choose English or Russian.
The setup is a conversation, not an installer.
It preserves existing settings and shows proposed changes before writing.

Both languages support the same workflow.
The current maintainer configuration is Russian; setup can select either language.
Skills and agent instructions stay in English.
README, process, scope, upstream maintenance and experiment guides have equal English/Russian versions.

## Work

1. Discuss the desired result and prepare an issue. Use a full spec only when complexity warrants it.
2. Explicitly select `implement` for a bounded task or `implement-spec` for a spec and its tickets.
3. Work in a dedicated worktree. Run applicable checks and independent Standards/Spec review.
4. Correct defects and independently check the corrections.
5. Use `ship` to prepare a PR, wait for current CI and hand the result to the owner.
6. The owner accepts the result and separately authorizes merge of the checked head.

[The process guide](docs/process.en.md) explains bugs, ideas, human checks and delivery.
The authoritative agent rules live in [AGENTS.md](AGENTS.md) and its conditional references.

## Contents

- 27 editable skills derived from Matt Pocock and the local `ship` skill.
- Native skill metadata, `.claude/skills` pointing to `.agents/skills`, and `CLAUDE.md` pointing to `AGENTS.md`.
- Project-owned requirements, worktree, testing, human-participation and delivery rules.
- `python3 scripts/check.py` for structural verification without third-party Python packages.

The repository is an example to develop, not a promise of identical behavior across coding-agent clients.
It contains no application runtime or automated installer.

## Maintain

Read [scope](docs/requirements.en.md), [upstream maintenance](docs/upstream.en.md) and [proposed experiments](docs/experiments.en.md).
Upstream skills are editable copies pinned to a documented snapshot.
Updates are selected and reviewed manually; no automatic synchronization runs.

Structural checks and independent review cannot prove live-agent adherence.
No comparative experiment has established that this workflow is better than another.

## License

Own materials use [MIT](LICENSE).
[NOTICE](NOTICE) and the retained Matt/HumanLayer notices describe borrowed material and verified source snapshots.
