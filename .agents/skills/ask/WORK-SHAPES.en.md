# Work size and shape

[Русский](WORK-SHAPES.ru.md)

The number of unknowns and sessions sets the size of a spec, not a template. One spec describes one capability that is accepted as one result. If the work fits in one session, a spec is usually unnecessary: a short issue is enough.

This file gives advice. Project rules decide which artifact is required: in this repository, [`docs/agents/requirements.md`](../../../docs/agents/requirements.md#choose-the-artifact). When advice and project rule disagree, the rule wins.

## By situation

| Situation | What the issue or spec describes | What lives elsewhere | When to split or skip the spec |
|---|---|---|---|
| New product | No single spec. A product document: problem, users, goals and non-goals, appetite, first-version slice from the story map, 3–5 top quality goals, core subdomain. Then one spec per capability in the slice | `DOMAIN.md`, ADRs on stack and boundaries, a `wayfinder` map, a context map | One spec per story-map activity or per context. If the area is foggy, `wayfinder` first |
| Capability, large feature | `to-spec`: problem, solution, stories (success, failure, access, edges), implementation decisions, test seams, out of scope, preserved behaviour, quality scenarios when needed | Step-by-step process and examples in the decision issue outcome; ADRs for what is hard to reverse; tickets | Parts can ship independently; two contexts with their own words are involved; Example Mapping produced many rules or many questions |
| Small feature | A short issue: problem, desired and preserved behaviour, scope, criteria, verification. 2–3 examples per disputed rule | New terms in `DOMAIN.md` | No spec if the work fits one session. Many rules and examples mean the feature is not small |
| Behaviour change | A new issue linking the earlier one: which criteria it replaces, current and new behaviour, what stays the same, what happens to existing data and users | Tests change first; a new ADR supersedes the old one | If the change pulls in a new capability, that is a separate spec |
| Bug | Reproduction steps, actual and expected behaviour, unchanged behaviour, environment and version. No stories | A regression test; `diagnosing-bugs` for hard ones | If the fix needs new functionality, that is a separate spec. A typo needs no spec-style issue |
| Refactoring | Goal, preserved behaviour, seams, characterization tests, done criterion. Behaviour does not change | An ADR if the architecture changes shape; `codebase-design` | Split a wide refactoring into expand, migration batches and contract |
| Migration | What moves, invariants (nothing lost, counts reconcile), expand, migrate and contract phases, rollback, cutover | One ticket per phase; ADR on the target state; `wizard` for the cutover | Each phase is its own ticket; batches by blast radius |
| Integration | Our behaviour at the boundary in our words: what we send and receive, failures (timeouts, retries, duplicates), model translation, contract tests | API research (`research`); ADR on the context-map relationship; `wizard` for keys | If the API is unknown, research or trial access first |
| Technical change | A design doc in the issue: context, goals and non-goals, alternatives, decision, rollout and rollback, human steps | An ADR with the chosen option | Stories are needed only when visible behaviour changes. If the decision is obvious, skip the design doc |
| Large unknowns | No spec yet. A question, an appetite, the expected decision; a spike or prototype; a `wayfinder` map | Answers in decision issues, a prototype on a `prototype/*` branch, research | Write the spec once no scope-changing questions remain |

## Size signals

Example Mapping is the cheapest "time to split?" test. Many rules mean the story is large and should be cut. Many questions mean it is not ready. Many examples under one rule mean the rule should be split. Spec Kit sets a similar limit: more than three "needs clarification" markers mean it is too early to write the spec.

Depart from this table when the project has already decided otherwise, or when the owner deliberately takes more risk for speed. Record the reason in the issue.

## Sources

Links opened on 12 November 2026.

- Matt Pocock, [The /to-spec Skill](https://www.aihero.dev/skills-to-prd): a spec is for work spanning several sessions.
- Birgitta Böckeler, [Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), 2025: a heavy template turned a small bug into 4 stories and 16 criteria.
- GitHub [Spec Kit, spec-template](https://github.com/github/spec-kit/blob/main/templates/spec-template.md); Kiro, [Bugfix specs](https://kiro.dev/docs/specs/bugfix-specs/).
- Ryan Singer, [Shape Up](https://basecamp.com/shapeup/1.2-chapter-03); Jeff Patton, [The New User Story Backlog is a Map](https://www.jpattonassociates.com/the-new-backlog/).
- Malte Ubl, [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/), 2020; Michael Nygard, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 2011.
- Mozilla, [Bug Writing Guidelines](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html); [Characterization test](https://en.wikipedia.org/wiki/Characterization_test); Danilo Sato, [ParallelChange](https://martinfowler.com/bliki/ParallelChange.html), 2014.
- Martin Fowler, [ContractTest](https://martinfowler.com/bliki/ContractTest.html); James Shore, [Spike Solutions](https://www.jamesshore.com/v2/books/aoad2/spike_solutions), 2021.
- Matt Wynne, [Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/), 2015.
