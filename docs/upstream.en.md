# Upstream maintenance

[Русский](upstream.ru.md)

The repository keeps editable skill copies, not a runtime dependency on another repository.
Matt’s pinned source revision is recorded once, in `.agents/upstream/mattpocock/SOURCE`.
The starting local adaptations came through [ai-first-platform](https://github.com/KirillSachkov/ai-first-platform/commit/53c0b946506b41839e255806144c3289680061c8).

## Pristine copy

`.agents/upstream/mattpocock/skills/` holds the borrowed skills exactly as upstream has them at the pinned revision, in upstream’s `skills/<group>/<skill>` layout.
Clients do not discover skills there; they read `.agents/skills`.
`SOURCE` records the repository, revision, date and directory hash. `scripts/check.py` fails when the copy differs from that hash, so nobody edits it by hand. It also fails when the snapshot links in `.agents/skills/README.md` and `NOTICE` name another revision.

Show our adaptations: `python3 scripts/upstream.py diff`, or `python3 scripts/upstream.py diff --stat` for a summary, optionally with skill names.

## Select an update

1. Open an issue describing the upstream change, desired benefit, boundaries and verification.
2. Commit or discard pending changes under `.agents`.
3. Run `python3 scripts/upstream.py update <revision>`. It fetches upstream into a temporary directory and runs `git merge-file` for every file of each borrowed skill: our file, the old upstream and the new upstream.
4. Resolve conflict markers and the files the script reports. To decline an upstream change, keep our text; the difference then shows as a local adaptation.
5. Update the snapshot links in `.agents/skills/README.md` and `NOTICE`, the adaptation list and the directory hashes, run repository checks and review the result through a PR.

The update moves the whole pristine copy to one revision; there are no per-skill source exceptions.
New upstream skills are listed but not adopted. A borrowed skill missing upstream stops the update before any change.
If an update stops halfway, discard it with `git restore --staged --worktree -- .agents` and `git clean -fd -- .agents`; step 2 keeps that safe.
Matching hashes establish identity, not quality.
No scheduled synchronization, update bot, submodule or installer runs here.

## Local adaptations

The starting adaptations cover domain naming, explicit project authority, committed review, correction verification and PR delivery.
This repository adds language selection and removes application-specific facts.
`ship` is locally authored rather than copied from Matt.
The skill README records runtime pointers, notices, identities and the list of adaptations.
Keep one operational source for project policy when merging upstream suggestions.

## Notices and provenance

Retain [Matt’s MIT notice](../.agents/skills/LICENSE.mattpocock).
PR presentation includes material credited to Dex Horthy / HumanLayer.
A verified historical source is [show-me at bba9d13](https://github.com/humanlayer/skills/blob/bba9d13ab34f0a87f1cc33df4dd196372393ddfc/plugins/show-me/skills/show-me/SKILL.md).
Retain [HumanLayer’s MIT notice](../.agents/skills/LICENSE.humanlayer) and [credits](../.agents/skills/pr/CREDITS.md).
Matt’s [copy commit](https://github.com/mattpocock/skills/commit/00cf26ea578872d1e2a57920632ac52c40566b79) does not state the exact HumanLayer revision copied.
The verified permalink records inspected provenance rather than inventing that missing historical revision.
[NOTICE](../NOTICE) collects source information; [LICENSE](../LICENSE) covers our own materials.
