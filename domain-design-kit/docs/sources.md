# Источники

Все ссылки открывались 12 ноября 2026 года. Здесь записано, что мы берём из каждого источника. Полные тексты не копируются.

## DDD

- [Eric Evans, Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/). Определения: единый язык, bounded context, карта контекстов, агрегат, сущность, объект-значение.
- [Martin Fowler, Bounded Context](https://martinfowler.com/bliki/BoundedContext.html) и [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html). Короткие объяснения двух главных понятий.
- [Martin Fowler, DDD Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html). Что такое агрегат и его граница.
- [Vaughn Vernon, Effective Aggregate Design](https://www.dddcommunity.org/library/vernon_2011/). Небольшие агрегаты, ссылки по идентификатору, согласованность между агрегатами через события.
- Vlad Khononov, «Learning Domain-Driven Design», O'Reilly, 2021. Тип поддомена определяет способ реализации: простой код для типовых и вспомогательных, доменная модель для основного.

## Формы и процесс DDD Crew

- [DDD Starter Modelling Process](https://github.com/ddd-crew/ddd-starter-modelling-process). Восемь шагов от целей до кода. Наша таблица практик идёт в том же порядке.
- [Context Mapping](https://github.com/ddd-crew/context-mapping). Отношения между контекстами и как их рисовать.
- [Core Domain Charts](https://github.com/ddd-crew/core-domain-charts). Классификация поддоменов.
- [Bounded Context Canvas](https://github.com/ddd-crew/bounded-context-canvas). Описание одного контекста на одном листе.
- [Aggregate Design Canvas](https://github.com/ddd-crew/aggregate-design-canvas). Описание одного агрегата: состояния, правила, действия, события.
- [Domain Message Flow Modelling](https://github.com/ddd-crew/domain-message-flow-modelling). Поток сообщений между контекстами.

## EventStorming

- [Alberto Brandolini, EventStorming](https://www.eventstorming.com/). Метод и три уровня: Big Picture, Process Modelling, Software Design.
- [EventStorming Glossary & Cheat sheet](https://github.com/ddd-crew/eventstorming-glossary-cheat-sheet). Цвета и значения стикеров.

## Примеры, решения, процесс работы с агентом

- [Matt Wynne, Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/). Правило, примеры, вопросы.
- [Michael Nygard, Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions). Формат ADR.
- [Matt Pocock, skills](https://github.com/mattpocock/skills). Подход «принципы и удобные скиллы», скиллы `grilling`, `domain-modeling`, `wayfinder`, форматы `GLOSSARY.md` и `GLOSSARY-MAP.md`.

## Инструмент доски

- [Excalidraw, Element Skeleton API](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/excalidraw-element-skeleton). Формат, в котором `kit.js` отдаёт сцену.

## Что здесь наше

Наших добавлений три, и все они про удобство чтения доски, а не про метод:

- дорожки по владельцу данных на схеме процесса;
- карточки правил с номером шага справа от раздела;
- код раскладки `kit.js`.
