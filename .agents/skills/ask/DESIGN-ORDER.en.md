# Design order

[Русский](DESIGN-ORDER.ru.md)

A spec is the outcome of design, not its start. A convenient order is usually: behaviour, quality, technical shape, unknowns, then `to-spec`. Skip any step without an open question.

## Steps

1. **Behaviour.** What must hold for the user: the process step by step, rules, examples for disputed rules, lifecycles. Why first: quality and technology depend on what exactly the system does. Practices: process modelling, Example Mapping and lifecycles from the [practice menu](PRACTICES.en.md).
2. **Quality.** Which load, latency and failures the system withstands. Write it short: context, stimulus, measure, for example "with 50 concurrent sign-ins the response arrives within 300 ms; if the provider is down, the user sees a clear refusal". A scenario needs numbers, units and at least one failure path. Top quality goals live in the product document, testable scenarios become spec criteria, and a lasting constraint goes into an ADR.
3. **Technical shape.** Where each rule lives, which contracts and data, whether a transaction boundary is needed. Walk the key scenarios through the modules and return the decisions to the spec, as described [below](#updating-a-spec-before-implementation). Why: a wrong shape is most expensive to discover in code.
4. **Unknowns.** Facts about APIs, technologies, performance. `research`, `prototype` or a spike answers them, not a guess in the spec.
5. **`to-spec`.** Collects what was decided into one spec: stories, criteria, quality scenarios, implementation decisions, test seams.

The order is not fixed. If an unknown fact could overturn the behaviour, start with it. If behaviour is obvious and the risk is technical, go to technical shape straight away.

## A Wayfinder map ends with one consolidating `to-spec`

When large work runs as a `wayfinder` map, decisions land in different map issues. The map has one final step: a `to-spec` that consolidates every decision into one spec. The reason: `to-tickets` and `implement` read the spec, and decisions scattered across comments are easy to miss or read with the wrong status. That is what happened in the [ai-first-platform#48 case](CASE-SPEC48.en.md).

The consolidated spec names the status of each input: requirement, implementation decision, research fact or material for people. An open question in it is either resolved or deferred, naming who decides and what it blocks.

## Updating a spec before implementation

Before implementation starts, an updated spec goes one of two ways: into the body of the earlier issue, or into a new issue that links the earlier one and lists the criteria it replaces. `/to-spec` publishes a new issue by default. The owner chooses. In [ai-first-platform#48](https://github.com/KirillSachkov/ai-first-platform/issues/48) the owner chose to update the body.

## Where things live

| What | Where |
|---|---|
| Product document: problem, goals, first-version slice | Usually a vision issue or a map in the tracker. In `ai-first-platform` map [#1](https://github.com/KirillSachkov/ai-first-platform/issues/1) takes this role, and the owner decided to remove the file `docs/first-version.md` ([#63](https://github.com/KirillSachkov/ai-first-platform/issues/63), still open on 13 November 2026). A product document kept as a file describes intent, not current behaviour, so it does not conflict with the [current-behaviour rule](../../../docs/agents/requirements.md#current-behavior-and-history) |
| Terms | `DOMAIN.md` |
| A decision that is hard to reverse | ADR |
| Requirements for a change | Issue or spec; after merge it is history |
| Rules, examples, step-by-step process | Spec or decision issue outcome |
| Current behaviour after implementation | Tests |
| Open question | The next step's issue |
| Board | A snapshot for people; it holds no decisions |

There is no separate "domain model" document next to the spec and tests: it goes stale first.

## Sources

Links opened on 12 November 2026.

- Martin Fowler, [Fragments: January 8](https://martinfowler.com/fragments/2026-01-08.html), 2026: Kent Beck on learning during the work.
- [arc42, section 10](https://docs.arc42.org/section-10/); Gernot Starke, [How to specify quality requirements](https://quality.arc42.org/articles/specify-quality-requirements).
- Vaughn Vernon, "Domain-Driven Design Distilled", 2016: strategy first, tactics later.
- Alberto Brandolini, [AI-powered Domain-Driven Design](https://speakerdeck.com/ziobrando/ai-powered-domain-driven-design), 2026: a board is a draft of the model, not a spec.
- Matt Pocock, [The /to-spec Skill](https://www.aihero.dev/skills-to-prd).
