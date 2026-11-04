# Upstream maintenance

[Русский](upstream.ru.md)

The repository keeps editable skill copies, not a runtime dependency on another repository.
Matt’s default source snapshot is `a496f5513d4a4cf889bc48e189e579f4b0bdf6aa`.
The starting local adaptations came through [ai-first-platform](https://github.com/KirillSachkov/ai-first-platform/commit/53c0b946506b41839e255806144c3289680061c8).
This does not mean every file is identical to Matt’s snapshot.

## Select an update

1. Open an issue describing the upstream change, desired benefit, boundaries and verification.
2. Obtain the old pinned source and the proposed new source in separate temporary copies.
3. Compare three versions: old upstream, new upstream and our current file.
4. Select useful changes and preserve local policy. Include references and native metadata belonging to the skill.
5. Record the source revision and adaptations, run repository checks and review the result through a PR.

Do not overwrite the local skills directory with a new upstream directory.
For a partial update, record per-skill source exceptions in `.agents/skills/README.md`.
Keep the default snapshot until a complete update accounts for every borrowed file.
Update directory hashes after changes; matching hashes establish identity, not quality.
No scheduled synchronization, update bot, submodule or installer runs here.

## Local adaptations

The starting adaptations cover domain naming, explicit project authority, committed review, correction verification and PR delivery.
This repository adds language selection and removes application-specific facts.
`ship` is locally authored rather than copied from Matt.
The skill README records runtime pointers, notices and identities.
Keep one operational source for project policy when merging upstream suggestions.

## Notices and provenance

Retain [Matt’s MIT notice](../.agents/skills/LICENSE.mattpocock).
PR presentation includes material credited to Dex Horthy / HumanLayer.
A verified historical source is [show-me at bba9d13](https://github.com/humanlayer/skills/blob/bba9d13ab34f0a87f1cc33df4dd196372393ddfc/plugins/show-me/skills/show-me/SKILL.md).
Retain [HumanLayer’s MIT notice](../.agents/skills/LICENSE.humanlayer) and [credits](../.agents/skills/pr/CREDITS.md).
Matt’s [copy commit](https://github.com/mattpocock/skills/commit/00cf26ea578872d1e2a57920632ac52c40566b79) does not state the exact HumanLayer revision copied.
The verified permalink records inspected provenance rather than inventing that missing historical revision.
[NOTICE](../NOTICE) collects source information; [LICENSE](../LICENSE) covers our own materials.
