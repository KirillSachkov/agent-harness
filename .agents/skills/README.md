# Skills: runtime and provenance

This directory contains 27 editable skill copies derived from
[Matt Pocock’s snapshot](https://github.com/mattpocock/skills/tree/a496f5513d4a4cf889bc48e189e579f4b0bdf6aa),
commit `a496f5513d4a4cf889bc48e189e579f4b0bdf6aa`, and the locally authored `ship` skill.
They arrived through [ai-first-platform](https://github.com/KirillSachkov/ai-first-platform/commit/53c0b946506b41839e255806144c3289680061c8).
These are adapted copies. The pristine upstream copy lives in `.agents/upstream/mattpocock`;
`python3 scripts/upstream.py diff` shows every adaptation line by line.

## Runtime

Skills live in `.agents/skills`; `.claude/skills` points here.
Root `CLAUDE.md` points to the same `AGENTS.md` authority.
Use the client’s native skill mechanism where available.
When it is unavailable, read the named SKILL.md and its references, then follow the explicit assignment.
This fallback does not allow an agent to select user-only entrypoints itself.
Native metadata preserves the same invocation choice; reading files does not prove client discovery.
If independent subagents are unavailable, report independent review as unavailable rather than substituting self-review.

## Local adaptations

- Domain consumers and setup use `DOMAIN.md` and `DOMAIN-MAP.md` consistently.
- Project pointers preserve explicit starts, worktree ownership, human decisions, committed review and verified delivery.
- `implement` owns small-task corrections; `implement-spec` uses one fresh correction implementer.
- `code-review` reports two independent axes and checks corrections without discarding prior full coverage.
- `pr` uses the selected human language, conditional presentation guidance and visible human actions.
- `ship` delivers through existing project testing/tracker contracts; it does not deploy or approve merge.
- Setup selects English or Russian human language and preserves existing settings and equivalent pointers.
- Explanations and architecture reports follow that language. Tracker authorship precedes localized triage disclosures.
- `to-spec` keeps every upstream line; project rules sit in separate added lines.
- `ask`, `to-spec` and `to-tickets` read project policy without redefining it; diagnosis follows the same authority.
- Instruction ownership (#3): delivery criteria stay in the project guide and actions in `ship`. This change removes no upstream Matt text.
- `to-spec` calls the spec a snapshot of the decision, not a description of current behavior.
- `ask` is Matt's `ask-matt`, renamed through `.agents/upstream/mattpocock/RENAMES` (#14). It advises as a colleague, with reasons and when to depart, and adds design references with Russian twins: work size and shape, design order, practice menu, DDD and EventStorming glossary, and the ai-first-platform#48 case.
- `domain-modeling` offers a practice in one sentence when the conversation shows its signs, writes a walkthrough's outcome as text and offers a board only on request or for long text (#13).

## Notices and updates

Retain [Matt’s MIT notice](LICENSE.mattpocock), [HumanLayer’s MIT notice](LICENSE.humanlayer) and [PR credits](pr/CREDITS.md).
See [upstream maintenance](../../docs/upstream.en.md) for three-way updates with `scripts/upstream.py`.
Locally authored skill: `ship`.
Local adaptations do not imply a newer upstream source revision.

## Content identity

SHA-256 per directory, local copies here and the pristine copy in its `SOURCE`: sorted relative file paths encoded as UTF-8, NUL, file bytes, NUL.
Concatenate each entry and hash the result. Includes references and native metadata.
Hashes establish identity, not correctness or behavior.

| Skill | SHA-256 |
| --- | --- |
| `ask` | `556e17f39823a5952387ae7ce9a620ecd8116d4f671a3007be7b7e2d10da36d3` |
| `code-review` | `651145cbbce0a813dce3071e720b54009af4e54fdfe6ae06a79b48ac10281007` |
| `codebase-design` | `5e680d83ed795dfdce570831c31c7e95927c3a3403a2f71006c8684f35472b84` |
| `diagnosing-bugs` | `7f45fd315cf2ce923ff2208eb76d4ba3189f5e14b0b1ff33ff5256265ddd3bd9` |
| `domain-modeling` | `3d8be44d1943d5d47ebb9e360fe4dde0c2f45a932306f7c5fe6f1734fb8ef60b` |
| `grill-me` | `14c292fe16c0aed833cbbabb0983515c8d665fb6061d9755b13dba870363323b` |
| `grill-with-docs` | `2dff19547f0f72000f8b88868e21b7d76c27cf5c7ececc6edf4042bbe06157ac` |
| `grilling` | `27f71f106a7062691b2982d4f847304a62930ebed8b50734f4d4fd498d60afa8` |
| `handoff` | `77c2607c751b7c522e0208ab113ba4949f8267610d6061323c7ccd3ace21d7da` |
| `implement` | `95af274086aef8db8a8c51b078d9d2f0d108a28796d1e84e373536f88f3664fe` |
| `implement-spec` | `8cfbe422e17966c2dd77c8dee31855c94068e785b791175680ac7dbff3630bab` |
| `improve-codebase-architecture` | `6309784c0b4631b92b2a2196da3ea5a500749fe5905c2981e34acf514da6820b` |
| `pr` | `98d1dd6da6310b8d09b957005463c11b361c40354b5bbff48a7186cef3f0f4f2` |
| `prototype` | `c4efd5e0f1c302b6225be83e8e42abdb05e13fde900484e4e2240e90b4e83eb6` |
| `research` | `f2d6425b15cf3100d5c3eb4305a8e817174b8e5fa1fde6e06ad4b61321c32a60` |
| `retro` | `09c4f9fe72fc5bc8e486a2bbb32dd785ca6264c56a53dd1bf9a334af72586efd` |
| `setup-matt-pocock-skills` | `256566df5faffc6781f16f2b08f3d4730bd5ab75755fe557b2083fe2dec49244` |
| `ship` | `ccf488249ff1cdd3db1189293f855faaa5b70a81e9ee74b4c882bc127f355099` |
| `tdd` | `e262a6d42d7588c95df99c989c18151c0cab96a8d11a8a7cebf93bf43b2c280b` |
| `teach` | `9aaf696786348313963552e446415c67fdd8129276b61f02be6dcedb208cd381` |
| `to-questionnaire` | `560491db9f48174ca9f7b5dd1444bc9c3cb7ac2d9e3e673e48289ef3221f164e` |
| `to-spec` | `d87f3308bdbe6da158db9d986323e3d6217601a56577ffafc18fe75e8cdb669e` |
| `to-tickets` | `dc168c2ba857a8494423bbb88b39c48c0d325b8bb0e30021643731adf4c1b6b1` |
| `triage` | `4cf19b82804dd3c062a7f942900e6f9e89cfa5a77ccda3d84abf484f3115b50a` |
| `wait-what` | `295f962a8ea63082292695d854215be32eca79ce1f8134dbf7c6f6bed2e2bab5` |
| `wayfinder` | `62a0ab7262d40119da048328a71aeadaeaa21a4049ee9268d14500921bb6e257` |
| `wizard` | `8fd93e38124bf81ad439231ba8af833b462ca9719c62373c87f25b06f6be776e` |
| `writing-for-agents` | `dc53f07d1f662137317789b9b5d74cfcc26dbcfc15038a7faf676c844d8638e8` |
