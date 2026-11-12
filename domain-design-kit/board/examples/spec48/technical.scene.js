// Technical board draft for spec #48: input for the technical design ticket (#56).
// It shows only what the accepted ADRs already fix: data owners, calls, events and the order of Edge checks.

const LANES = {
  g: "Edge / Входной слой",
  e: "Employees / Сотрудники",
  c: "Agent connections /\nПодключения агентов",
  a: "Access / Доступ",
  p: "Projects / Проекты",
};
const lane = (key, rows = 1, rowH) => ({ key, title: LANES[key], rows, rowH });

const FRAME_GAP = 110;

export function build(kit) {
  const { INK, frame, section, sticky, span, chip, arrow, path, text, para, titled } = kit;

  let y = 0;

  // ---------- What this board is ----------
  text(0, y, "Спецификация #48. Подключение сотрудника и агента к проекту", 44, INK);
  text(0, y + 66, "Техническая доска, черновик для задачи #56", 28, "#495057");
  const about = para(
    0,
    y + 124,
    "Что здесь: то, что уже задано принятыми ADR-0001, ADR-0003 и ADR-0004. Кто владеет данными, кто кого вызывает, какие события идут между модулями и в каком порядке Edge проверяет запрос.\nЧего здесь нет: новых решений. Контракты, хранение, токены и механизмы для гонок решает задача #56.\nПоведение домена показано на отдельной доске.",
    18,
    1560,
  );
  y = about.y + about.h + 100;

  // ---------- Context: modules ----------
  const context = frame("Карта модулей", 0, y, "Карта модулей: данные, вызовы и события", (x, top) => {
    const mx = x + 640;
    const mw = 400;
    const defs = [
      ["Agent connections / Подключения агентов", ["• владелец подключения", "• действительность и отзыв"]],
      [
        "Employees / Сотрудники",
        ["• учётная запись сотрудника", "• приглашение", "• корпоративная личность", "• сессия входа"],
      ],
      ["Access / Доступ", ["• участие в проекте", "• полномочия администратора", "• решения о разрешениях"]],
      ["Projects / Проекты", ["• проект и его репозитории", "• источники инструкций", "• версия harness"]],
    ];
    let cy = top;
    const modules = defs.map(([title, lines]) => {
      const m = titled("data", mx, cy, mw, title, lines);
      cy = m.y + m.h + 96;
      return m;
    });
    const [con, emp, acc, prj] = modules;
    const edge = titled(
      "edge",
      x,
      con.y,
      280,
      "Edge / Входной слой",
      [
        "проверяет каждый запрос:",
        "1. сессию или подключение",
        "2. активность учётной записи",
        "3. разрешения",
        "",
        "потом передаёт запрос модулю",
      ],
      { h: prj.y + prj.h - con.y },
    );
    arrow(edge, con, { label: "подключение действует?" });
    arrow(edge, emp, { label: "сессия действует?\nучётная запись активна?" });
    arrow(edge, acc, { label: "что разрешено сотруднику?" });
    arrow(edge, prj, { label: "запрос после проверок" });
    arrow(emp, con, { event: true, label: "событие:\nдоступ к платформе прекращён" });
    arrow(emp, acc, { x: emp.cx - 90, label: "вызов: снять полномочия\nадминистратора", labelSide: "left" });
    arrow(emp, acc, {
      event: true,
      x: emp.cx + 60,
      label: "события: приглашение принято,\nдоступ к платформе прекращён",
    });
    arrow(acc, prj, { label: "проекты существуют?" });
    text(
      x,
      prj.y + prj.h + 34,
      "Access не вызывает Employees и Agent connections: проверки входа делает Edge (ADR-0004).",
      15,
    );
  });
  y = context.bottom + FRAME_GAP;

  // ---------- Reading the project context ----------
  frame(
    "Чтение контекста",
    0,
    y,
    "Чтение контекста проекта: сотрудник и подключённый агент",
    (x, top) => {
      const s = section(x, top, "", [lane("g", 2, 130), lane("e"), lane("c"), lane("a"), lane("p")], 7);
      const request = sticky("command", s.at("g", 1, 0), "1. Запросить контекст проекта");
      chip("actor", request, "Сотрудник в браузере");
      chip("actor", request, "Подключённый агент", { index: 1 });
      const edge = span("edge", s.at("g", 2, 0), s.at("g", 6, 0), "Edge проверяет по порядку, потом передаёт запрос");
      const granted = sticky("read", s.at("g", 7, 0), "Контекст проекта");
      const rejected = sticky("eventAlt", s.at("g", 7, 1), "Запрос отклонён");
      arrow(request, edge);
      arrow(edge, granted);
      const bendX = edge.x + edge.w + 30;
      path(
        [
          [edge.x + edge.w, edge.cy + 24],
          [bendX, edge.cy + 24],
          [bendX, rejected.cy],
          [rejected.x - 3, rejected.cy],
        ],
        { from: edge, to: rejected },
      );
      const check = (col, laneKey, data, label) => {
        const d = sticky("data", s.at(laneKey, col), data);
        path(
          [
            [d.cx, edge.y + edge.h],
            [d.cx, d.y - 3],
          ],
          { from: edge, to: d },
        );
        text(d.cx + 10, edge.y + edge.h + 10, label, 14);
      };
      check(2, "e", "Сессия входа", "1. сотрудник:\nсессия действует?");
      check(3, "c", "Подключение агента", "1. агент:\nподключение действует?");
      check(4, "e", "Учётная запись сотрудника", "2. учётная запись\nактивна?");
      check(5, "a", "Участие в проекте", "3. участие в проекте\nесть?");
      check(6, "p", "Проект и его репозитории", "4. собрать\nконтекст");
      s.panel([
        [
          "rule",
          "Проверки 1–3",
          "• идут на каждом запросе, срок токена не важен\n• любая не прошла: запрос отклонён\n• запрос, уже прошедший проверки, может завершиться",
        ],
        [
          "rule",
          "Контекст проекта",
          "• описание и репозитории проекта\n• источники инструкций и версия harness\n• выдаётся только участнику, администратору тоже\n• общий репозиторий не раскрывает другие проекты",
        ],
        [
          "rule",
          "Администратор без участия",
          "• видит и правит настройки проекта в управлении\n• контекст проекта не получает",
        ],
        [
          "rule",
          "Подключённый агент",
          "• получает то же, что разрешено его владельцу\n• только читает, административных операций нет",
        ],
      ]);
    },
  );

  return kit.elements;
}
