# Practice menu

[Русский](PRACTICES.ru.md)

This is a menu, not a pipeline. Name the question that blocks progress first, then pick the practice that answers it. With no open question, no practice is needed. Terms are explained in the [glossary](DDD-GLOSSARY.en.md).

Sections: [practices by question](#practices-by-question), [EventStorming](#eventstorming), [what EventStorming finds and DDD decides](#what-eventstorming-finds-and-ddd-decides), [when to go back](#when-to-go-back), [boards](#boards), [sources](#sources).

## Practices by question

| Question | Practice | When it is needed | When it is not needed | What remains afterwards |
|---|---|---|---|---|
| Why the product exists, for whom, what the first version includes | Goals interview, appetite, user story map | A new product or a large version | A feature in an existing product with a clear goal | Product document: problem, goals and non-goals, first-version slice, top quality goals |
| What happens across the whole area | Lightweight event timeline: the agent proposes events in order, the owner corrects them | A new area that the owner holds alone | The area reduces to one process | List of processes, first terms, candidate boundaries, hot spots as questions |
| Where to invest effort | Subdomain classification, naming the core | A new product, a dispute about priorities | A small utility in one subdomain | A line in the product document; an ADR if it sets a boundary |
| In which order to grow or migrate parts | Core Domain Chart | Three or more contexts, a dispute about order | One or two contexts: a line in the product document is enough | Picture in the issue, outcome in an ADR |
| How the system splits, who owns which data | Bounded contexts and a context map | One word means different things in two places; two sources of truth; an external system with its own model | One language for the whole system, no integrations | ADR on the boundary; `DOMAIN-MAP.md` when there is more than one context |
| What one context is responsible for | Bounded Context Canvas | A context with several integrations or disputed responsibility | A small, obvious context | Filled canvas in the issue, responsibility in an ADR |
| Do the boundaries survive a scenario | Domain Message Flow: one scenario as commands, events and queries between contexts, usually 5–9 messages | Candidate contexts exist and the scenario crosses them | The scenario lives in one module | Diagram in the issue, contracts in implementation decisions |
| How a process runs and which rules apply | Process Modelling EventStorming | Several actors, failure branches, policies | A linear process without rules or handovers: a list of steps is enough | Step table, rules, open questions in the issue outcome |
| The expert tells a story rather than ordering events | Domain Storytelling | What matters is who does what with which object | Event order and policies matter: Process Modelling fits better | Numbered story in the issue |
| Which states an object has | Lifecycle, state diagram | Three or more states, races, retries | Two states or plain storage | States and allowed transitions in the issue outcome |
| What should happen in a disputed case | Example Mapping: rule, examples, questions | Every disputed rule | The rule is obvious and already covered by a test | "Given, action, result" examples, then tests |
| Which load, latency and failures we withstand | Quality scenarios: context, stimulus, measure | The attribute affects decisions | Nobody can name a number: measure first | Spec criteria; a lasting constraint in an ADR |
| A rule looks right on paper but unclear on cases | Logic prototype (`prototype`), Wlaschin types | Related fields and states | Two examples settle the rule | Answer in the issue, a type fragment as the decision |
| Where each rule lives, which contracts | Software Design EventStorming, tactical DDD | A complex core subdomain; a rule ties several objects; a transaction boundary is needed | A supporting or generic subdomain, CRUD | Technical design; ADR on the consistency boundary |
| How to slice behaviour | Event Modeling | Behaviour is understood; slices need a timeline of screens and commands | Behaviour is still being discussed | Slices with Given/When/Then examples |

Rows roughly follow the order in which questions arise in a new product. This is not DDD Crew's order: their Starter Modelling Process goes from understanding the business through EventStorming, subdomains, Core Domain Chart, Domain Message Flow, teams and Bounded Context Canvas to code, and its authors call it non-linear. In an existing product, enter at the row whose question is open now.

Depth follows complexity, not task size. Signs of complexity: several actors or modules, an object with states, races and retries, a mistake that costs access or money. Without them, terms and a list of rules in the issue are enough.

## EventStorming

| Format | Per the source | For an owner with an agent |
|---|---|---|
| Big Picture | 15–30 people in person, a full day, a long wall. Brandolini advises against trying it remotely | Lightweight event timeline. Agents miss some critical elements, so the owner checks the timeline rather than accepting it whole |
| Process Modelling | 5–15 people in different roles, about half a day | The main format: one process step by step, with examples for disputed rules |
| Software Design | Developers and an expert, short sessions | Transfers well, but agents are weakest on aggregates. Start from behaviour and rules; name things later |

The value of the method is the conversation. Afterwards keep the hot spots as open questions, terms in the glossary, pivotal events as candidate boundaries, rejected options in an ADR, and the process as text.

## What EventStorming finds and DDD decides

EventStorming finds; DDD decides and names. The event timeline shows candidate boundaries where actors and words change. Strategic DDD turns candidates into decisions. Process modelling also tests boundaries: if a process keeps jumping between modules, the boundary is in the wrong place.

## When to go back

- Implementation found a contradiction in a rule: go back to the process and examples.
- People started reading one word differently: go back to the glossary; it may signal two contexts.
- A process does not fit one module without constant calls to neighbours: go back to boundaries.

## Boards

A board helps when the question is about order, connections or boundaries. Goals, requirements and task lists read better as text. The board shows; the text decides: a decision counts once it is written in the glossary, an ADR, a spec or an issue outcome. Agents do not read boards, so always write the process as text as well: step, actor, action, event, rule.

Offer a board when the owner asks to see it, or when the text has grown so much that its order is no longer visible.

| View | Question it answers | When it is needed |
|---|---|---|
| Overview | How the whole area works, where candidate boundaries lie | A new product or a large area |
| Map | Which contexts, external systems and connections exist | Several modules or external systems |
| Process | Who does what, what happens, which rules apply | Several steps or actors |
| Lifecycle | Object states and forbidden transitions | Three or more states |
| Examples | What happens in a disputed case | Races, retries, edge values |
| Design | How rules land in code | Complex core logic |

One view answers one question: do not mix process, boundaries and technology in one frame.

Swimlanes by data owner help for a process inside already accepted boundaries. While boundaries are still being found, lanes get in the way: they draw in advance what the session should test. Draw the process as one timeline then.

Colours follow the DDD Crew cheat sheet. Boards from the [`draft/domain-design-kit`](https://github.com/KirillSachkov/agent-harness/tree/draft/domain-design-kit/domain-design-kit) draft have two deviations of their own: a hot spot is a red marker on the step plus a red card rather than a rotated bright pink sticky, and an external system is a regular pink sticky rather than a wide one. The board tool stays on that branch until [#15](https://github.com/KirillSachkov/agent-harness/issues/15) is decided.

## Sources

Links opened on 12 November 2026.

- DDD Crew: [DDD Starter Modelling Process](https://github.com/ddd-crew/ddd-starter-modelling-process), [Core Domain Charts](https://github.com/ddd-crew/core-domain-charts), [Bounded Context Canvas](https://github.com/ddd-crew/bounded-context-canvas), [Domain Message Flow Modelling](https://github.com/ddd-crew/domain-message-flow-modelling), [Context Mapping](https://github.com/ddd-crew/context-mapping), [EventStorming Glossary & Cheat Sheet](https://github.com/ddd-crew/eventstorming-glossary-cheat-sheet).
- Alberto Brandolini: [EventStorming](https://www.eventstorming.com/), [Remote EventStorming](https://blog.avanscoperta.it/2020/03/26/remote-eventstorming/) (2020), [AI-powered Domain-Driven Design](https://speakerdeck.com/ziobrando/ai-powered-domain-driven-design) (2026).
- Eric Evans, [DDD Reference](https://www.domainlanguage.com/ddd/reference/); Vaughn Vernon, [Effective Aggregate Design](https://www.dddcommunity.org/library/vernon_2011/).
- Agents and DDD: Eisenreich et al., [arXiv 2603.26244](https://arxiv.org/abs/2603.26244) (2026), one industrial case; Cao et al., [ICSA 2026](https://conf.researchr.org/details/icsa-2026/icsa-2026-papers/33), abstract only; Vaughn Vernon, [This Is Your Agent on Domain-Driven Design](https://wso2.com/library/conference/2026/05/this-is-your-agent-on-domain-driven-design) (2026).
- Matt Wynne, [Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/); [Domain Storytelling](https://domainstorytelling.org/quick-start-guide); [Event Modeling](https://eventmodeling.org/posts/what-is-event-modeling/); [arc42, section 10](https://docs.arc42.org/section-10/).
- Jeff Patton, [The New User Story Backlog is a Map](https://www.jpattonassociates.com/the-new-backlog/); Ryan Singer, [Shape Up](https://basecamp.com/shapeup/1.2-chapter-03).
