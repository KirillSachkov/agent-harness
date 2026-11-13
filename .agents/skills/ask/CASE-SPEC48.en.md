# Case: the ai-first-platform#48 spec

[Русский](CASE-SPEC48.ru.md)

The example behind the [design order](DESIGN-ORDER.en.md) advice. On 12 November 2026 the owner and agents prepared the technical design for spec [#48](https://github.com/KirillSachkov/ai-first-platform/issues/48) in the `ai-first-platform` project.

## How the work went

Spec #48 was written and confirmed on 6 November, before design. Then the Wayfinder map [#51](https://github.com/KirillSachkov/ai-first-platform/issues/51) opened. A domain session modelled the processes and recorded 13 decisions in the [#52](https://github.com/KirillSachkov/ai-first-platform/issues/52#issuecomment-6827595085) outcome. A separate session produced the quality profile [#53](https://github.com/KirillSachkov/ai-first-platform/issues/53#issuecomment-6822040174). The technical design [#56](https://github.com/KirillSachkov/ai-first-platform/issues/56) and stages [#57](https://github.com/KirillSachkov/ai-first-platform/issues/57) stayed open.

## What worked

- The decision chain held: a question in a map issue, the owner's answer in conversation, the issue's outcome comment, a link from the map and from the spec. Every decision in the outcomes has a confirming message from the owner.
- Step-by-step process modelling with examples for disputed rules produced 30 steps and 34 cases in the #52 outcome.
- The separate domain model document was removed: terms went to the glossary, hard decisions to ADRs, requirements to issues. The board stayed a snapshot for people.

## Where things were lost

- **The status of findings was ambiguous.** The #48 comment called five items "requirement clarifications", while the quality profile and the other #52 decisions sat next to them as "design materials". A `to-tickets` session could not tell for sure which of these were requirements. Lesson: a map ends with one consolidating `to-spec`, and quality scenarios become criteria in it.
- **The spec went stale before design finished.** The #48 body linked to a removed model, and some criteria were not updated. Lesson: write the spec after design, or rebuild it at the end of the map.
- **Some knowledge fell out of the chain.** Four rules about instruction sources ended up in a comment on closed issue [#8](https://github.com/KirillSachkov/ai-first-platform/issues/8#issuecomment-6827888788), which #48 does not link. Three research reports were not committed. Lesson: everything implementation needs must be reachable from the spec.
- **Two issues did the same work.** #58 and #59 made the same change because ownership was not visible in the tracker and the #58 scope changed in chat. Lesson: claim the issue before writing and change scope in the issue itself.

## Sources

- `ai-first-platform` issues and comments linked above.
- The 12 November 2026 audit of the #48 preparation process. It lives on a working branch of `ai-first-platform` and is not published in the repository.
