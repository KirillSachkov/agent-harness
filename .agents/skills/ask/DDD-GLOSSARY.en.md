# DDD and EventStorming glossary

[Русский](DDD-GLOSSARY.ru.md)

Terms used by `ask` advice and the practice menu. For each term: what it means, why it matters and when to use it. Letters in brackets name the source; links are at the end of the file.

Sections: [strategic terms](#strategic-terms), [context map relationships](#context-map-relationships), [tactical terms](#tactical-terms), [EventStorming](#eventstorming), [neighbouring practices](#neighbouring-practices), [sources](#sources).

## Strategic terms

| Term | Meaning | Why it matters | When to use |
|---|---|---|---|
| Domain | The area of activity the software serves (ER) | Sets the subject of the conversation | Always |
| Subdomain | A part of the domain with its own business problem. It exists without software (K) | Decide where to invest effort | When planning a product |
| Core subdomain | What sets the product apart. Keep it small (ER, K) | Needs the best model and the most careful design | Name it at the start of a product and revisit |
| Supporting subdomain | Needed by the core, gives no advantage and is not solved by an off-the-shelf product (K) | Guards against overengineering: build it simply | When sorting where work goes |
| Generic subdomain | A problem already solved elsewhere: sign-in, payments, email (ER, K) | Saves effort: adopt a ready solution | Build-or-buy decisions |
| Domain vision statement | A short description of the core subdomain and its value (ER) | A reference point for decisions | Product document |
| Ubiquitous language | Words that people, documents and code understand the same way within one context. A new word changes the model (ER, F) | Removes translation between business and code; people and agents share one vocabulary | Always, from the first session |
| Bounded context | A boundary inside which one model holds and each word has one meaning (ER, F) | Keeps the model coherent while different parts of the system may read one word differently | At the first conflict of words or models. Start boundaries wide and split as you learn (K) |
| Context map | A description of all contexts and how they translate, share and influence each other. Map what exists first, transform later (ER) | Shows who depends on whom and where integration risk lies | From two contexts or one external system |
| Module | A way to organise code | Development convenience. A module does not by itself set a boundary of meaning | Always. If one word means different things in two modules, those are two contexts |

A subdomain divides the problem; a context divides the solution. One context per subdomain is convenient but not guaranteed. In a modular monolith a module often matches a context; check it.

## Context map relationships

An upstream context influences a downstream one; there is little influence back (DC).

First decide how the teams relate. DDD Crew names three kinds (DC):

| Team relationship | Meaning |
|---|---|
| Mutually dependent | Each team's success depends on the other; they plan together |
| Upstream/downstream | One influences the other, with little influence back |
| Free | The teams do not depend on each other |

Then choose a pattern for each connection:

| Pattern | Meaning | When it fits |
|---|---|---|
| Partnership | Both sides plan and integrate together; success is shared (ER) | Tightly connected contexts |
| Shared kernel | A small explicitly shared part of the model and code, changed only by agreement (ER) | Rarely, and small |
| Customer/Supplier | Upstream plans around downstream needs (ER, DC) | Upstream can be influenced |
| Conformist | Downstream adopts the other model as is (DC). Cheap, but the foreign model leaks in | An external or generic context you cannot influence |
| Anti-corruption layer | A layer translates the foreign model and keeps it out. It holds no business rules (ER, MS) | Integration with legacy or an external API next to the core |
| Open host service | Upstream offers an open protocol to many consumers (ER) | Many consumers |
| Published language | A documented shared exchange format: schema, events (ER) | Public API, event contract |
| Separate ways | No integration; each side solves its own problem (ER) | Integration costs more than it gives |
| Big Ball of Mud | A part of the system without clear boundaries. Draw a line around it and do not model inside (ER, DC) | An honest map of an existing system |

## Tactical terms

Needed only where a rule ties several objects or states together. Supporting and generic subdomains usually need only simple code (ER, K, V).

| Term | Meaning | Why it matters | When to use |
|---|---|---|---|
| Invariant | A rule that holds after every change (V) | Defines the consistency boundary | In any complex part, even without aggregates |
| Aggregate | A group of objects changed as one unit. Outside references go only to its root (ER, F, V) | The boundary inside which a rule always holds | Complex invariants in the core subdomain |
| Entity | An object that stays itself through changes: it has identity (ER) | Track an object over time | When it matters whether this is the same object |
| Value object | A value without identity, compared by content and immutable (ER, F) | Makes rules about values explicit | Money, periods, addresses |
| Domain event | Something that happened in the domain and matters to experts, in past tense (ER, B) | Explains why state changed and links process steps | Process modelling, message flows |
| Integration event | A change published to other contexts after it is stored (MS) | A contract between contexts | Exchange between contexts |
| Domain service | A domain operation that belongs to no single object (ER) | Avoids artificial objects | Rarely |
| Repository | Collection-like access to aggregates that hides storage (ER) | Separates rules from the database | Code level; rarely needed in design |
| Make illegal states unrepresentable | Express a rule as the full set of allowed cases instead of independent optional fields (W) | A rule error shows up before running | A rule over several related fields or states |
| Workflow as a pipeline | A domain process described as a function: input, steps, output, errors (W) | Both agent and owner can read it | Logic prototype, implementation decisions |

Aggregates reference each other by identity. A rule that spans several aggregates is enforced separately: by an event, a lock or a database constraint (V).

Wlaschin's text form of types looks like this. It can go straight into an issue; no code is needed:

```text
Contact = EmailOnly | PostOnly | EmailAndPost
Order = Customer AND ShippingAddress AND OrderLines
```

## EventStorming

EventStorming has three formats (B). See the [practice menu](PRACTICES.en.md#eventstorming) for when each is useful.

| Term | Meaning | When to use |
|---|---|---|
| Big Picture | Exploring the whole area as one event timeline. Brandolini describes a full in-person day with 15–30 people (B) | A new or tangled area with many roles. An owner working with an agent uses a lightweight event timeline instead |
| Process Modelling | One process, walked through with the colour grammar (B, DC) | A process with actors, failure branches and rules |
| Software Design | Designing behaviour inside one context, down to code (B, DC) | Complex core logic |
| Domain event | What happened, in past tense. The backbone of the model (B) | All formats |
| Command | What an actor or system decided to do (DC) | Process Modelling and later |
| Actor | A role that makes a decision (DC) | All formats |
| System | An external or internal system involved (DC) | All formats |
| Policy | "Whenever X, then Y". Manual ("a manager reviews the request") or automatic (DC, B) | Process Modelling |
| Read model | The information an actor uses to decide (DC) | Process Modelling |
| Constraint | What accepts or rejects a command, and the rule it guards. Formerly called the aggregate. Start from behaviour and name it later (DC, B) | Software Design |
| Hot spot | A place of disagreement, uncertainty or trouble (DC). It becomes an open question | All formats |
| Pivotal event | An event with a clear before and after that splits the flow into phases. A candidate boundary and cross-context event (B) | Finding boundaries |
| Opportunity, value | Where things can improve; where value is created or lost (DC) | Big Picture |

The chain that explains nearly everything: an actor reads a read model, issues a command, the constraint accepts or rejects it, an event appears, and a policy triggers the next command (DC).

## Neighbouring practices

| Term | Meaning | When to use |
|---|---|---|
| Example Mapping | Breaking one story into rules, examples for each rule, and questions (EM) | A disputed rule; checking whether a story is ready |
| Domain Storytelling | An expert tells numbered sentences of "who does what with which object" (DS) | The expert tells a story better than they order events in time |
| Event Modeling | A linear timeline of screens, commands, events and views. Each command or view becomes a slice with Given/When/Then examples (EV) | Designing by slices once behaviour is understood |
| Quality scenario | A testable expectation: context, stimulus, measure. The full six-part SEI form is rarely needed (A42) | Load, latency, failures, security |
| ADR | A short decision record: what was decided, the options, the consequences (N) | Hard to reverse, surprising without context, a real trade-off |

## Sources

Links opened on 12 November 2026.

- ER: Eric Evans, [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/), 2015.
- F: Martin Fowler, [BoundedContext](https://martinfowler.com/bliki/BoundedContext.html), [UbiquitousLanguage](https://martinfowler.com/bliki/UbiquitousLanguage.html), [DDD_Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html).
- V: Vaughn Vernon, [Effective Aggregate Design](https://www.dddcommunity.org/library/vernon_2011/), 2011.
- K: Vlad Khononov, "Learning Domain-Driven Design", O'Reilly, 2021. The book text was not read; based on [Tech Lead Journal podcast #76](https://techleadjournal.dev/episodes/76/).
- DC: DDD Crew, [Context Mapping](https://github.com/ddd-crew/context-mapping), [EventStorming Glossary & Cheat Sheet](https://github.com/ddd-crew/eventstorming-glossary-cheat-sheet).
- MS: Microsoft, [Anti-Corruption Layer pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer).
- B: Alberto Brandolini, [EventStorming](https://www.eventstorming.com/), [Introducing Event Storming](https://ziobrando.blogspot.com/2013/11/introducing-event-storming.html), 2013.
- W: Scott Wlaschin, [Making illegal states unrepresentable](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/), 2013, and [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/ddd/). The text notation for types is confirmed only by secondary accounts.
- EM: Matt Wynne, [Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/), 2015.
- DS: [Domain Storytelling, quick start](https://domainstorytelling.org/quick-start-guide).
- EV: Adam Dymitruk, [What is Event Modeling](https://eventmodeling.org/posts/what-is-event-modeling/), 2019.
- A42: [arc42, section 10](https://docs.arc42.org/section-10/); Gernot Starke, [How to specify quality requirements](https://quality.arc42.org/articles/specify-quality-requirements).
- N: Michael Nygard, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 2011.
