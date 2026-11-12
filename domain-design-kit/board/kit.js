// Layout kit for EventStorming boards on Excalidraw's element skeleton API.
// It sizes every sticky from measured text and draws straight or single-bend arrows,
// so a scene file only names stickies, grid cells and links.

const LINE_HEIGHT = 1.15; // Excalidraw's line height for Helvetica (fontFamily 2)

export const INK = "#212529";
export const MUTED = "#495057";

/** Grid of a process section: lane label column, column and row pitch, default sticky size. */
export const GRID = { labelW: 230, col: 250, row: 150, w: 190, h: 84 };

const KINDS = {
  command: { bg: "#a5d8ff" },
  event: { bg: "#ffc078" },
  eventAlt: { bg: "#ffe8cc" },
  policy: { bg: "#d0bfff" },
  data: { bg: "#fff3bf" },
  external: { bg: "#fcc2d7" },
  read: { bg: "#b2f2bb" },
  edge: { bg: "#dee2e6" },
  state: { bg: "#e7f5ff", round: true },
  rule: { bg: "#f3f0ff", stroke: "#9775fa", head: "#5f3dc4" },
  hot: { bg: "#ffe3e3", stroke: "#e03131", head: "#c92a2a", ink: "#7a1010" },
  example: { bg: "#ebfbee", stroke: "#40c057", head: "#2b8a3e" },
  actor: { bg: "#ffd43b", stroke: "#f08c00" },
  hotChip: { bg: "#ff8787", stroke: "#c92a2a", ink: "#5c0b0b" },
};

export function createKit() {
  const out = [];
  const trackers = [];
  let seq = 0;
  const nextId = (prefix) => `${prefix}-${++seq}`;
  const canvas = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");

  function widthOf(value, size) {
    if (!canvas) return value.length * size * 0.56;
    canvas.font = `${size}px Helvetica`;
    return canvas.measureText(value).width;
  }

  /** Breaks text into lines no wider than maxW. With hang, a bullet's continuation lines are indented. */
  function wrap(value, size, maxW, hang = false) {
    const space = widthOf(" ", size);
    const lines = [];
    for (const paragraph of String(value).split("\n")) {
      const bullet = hang ? /^(• |\d+\. )/.exec(paragraph) : null;
      const indent = bullet ? " ".repeat(Math.max(1, Math.round(widthOf(bullet[0], size) / space))) : "";
      let line = "";
      for (const word of paragraph.split(" ")) {
        const candidate = line ? `${line} ${word}` : word;
        if (!line || widthOf(candidate, size) <= maxW) {
          line = candidate;
        } else {
          lines.push(line);
          line = indent + word;
        }
      }
      lines.push(line);
    }
    return lines;
  }

  function add(el, x, y, w, h) {
    out.push(el);
    for (const t of trackers) {
      t.ids.push(el.id);
      t.minX = Math.min(t.minX, x);
      t.minY = Math.min(t.minY, y);
      t.maxX = Math.max(t.maxX, x + w);
      t.maxY = Math.max(t.maxY, y + h);
    }
    return el;
  }

  /** Runs draw and returns the ids and bounds of everything it added. */
  function measure(draw) {
    const t = { ids: [], minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    trackers.push(t);
    draw();
    trackers.pop();
    return t;
  }

  /** Free text. x is always the left edge of the text block, whatever the alignment. */
  function text(x, y, value, size = 16, color = MUTED, o = {}) {
    const lines = String(value).split("\n");
    const w = Math.ceil(Math.max(...lines.map((line) => widthOf(line, size))));
    const h = Math.ceil(lines.length * size * LINE_HEIGHT);
    const align = o.align ?? "left";
    // Excalidraw anchors centred text at its middle and right-aligned text at its right edge.
    const anchorX = align === "center" ? x + w / 2 : align === "right" ? x + w : x;
    const el = {
      type: "text",
      id: nextId("text"),
      x: anchorX,
      y,
      text: String(value),
      fontSize: size,
      fontFamily: 2,
      strokeColor: color,
      textAlign: align,
      groupIds: o.groupIds ?? [],
    };
    add(el, x, y, w, h);
    return { id: el.id, x, y, w, h };
  }

  /** Free text wrapped to maxW, with hanging indents for bullets. */
  function para(x, y, value, size, maxW, color = MUTED) {
    return text(x, y, wrap(value, size, maxW, true).join("\n"), size, color);
  }

  function rect(kind, x, y, w, h, label, o = {}) {
    const k = KINDS[kind];
    const el = {
      type: "rectangle",
      id: nextId(kind),
      x,
      y,
      width: w,
      height: h,
      backgroundColor: k.bg,
      fillStyle: "solid",
      strokeColor: k.stroke ?? "#868e96",
      strokeStyle: o.proposed ? "dashed" : "solid",
      strokeWidth: o.proposed ? 2 : 1,
      roughness: 0,
      roundness: k.round ? { type: 3 } : null,
      groupIds: o.groupIds ?? [],
    };
    if (label) {
      el.label = {
        text: label,
        fontSize: o.fontSize ?? 16,
        fontFamily: 2,
        textAlign: "center",
        verticalAlign: "middle",
        strokeColor: k.ink ?? INK,
      };
    }
    add(el, x, y, w, h);
    return { id: el.id, el, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
  }

  /** Sticky centred on pos; its height grows with the text. */
  function sticky(kind, pos, label, o = {}) {
    const size = o.fontSize ?? 16;
    const w = o.w ?? GRID.w;
    const lines = wrap(label, size, w - 26);
    const h = Math.max(o.minH ?? GRID.h, Math.ceil(lines.length * size * LINE_HEIGHT) + 22);
    return rect(kind, pos.cx - w / 2, pos.cy - h / 2, w, h, lines.join("\n"), { ...o, fontSize: size });
  }

  /** Sticky that covers every grid cell from a to b: a tall data sticky or a wide bar. */
  function span(kind, a, b, label, o = {}) {
    const size = o.fontSize ?? 16;
    const x = Math.min(a.cx, b.cx) - GRID.w / 2;
    const y = Math.min(a.cy, b.cy) - GRID.h / 2;
    const w = Math.abs(a.cx - b.cx) + GRID.w;
    const h = Math.abs(a.cy - b.cy) + GRID.h;
    return rect(kind, x, y, w, h, wrap(label, size, w - 26).join("\n"), { ...o, fontSize: size });
  }

  /** Small label stuck to a sticky: an actor under its bottom-left corner, an open question on its top-right corner. */
  function chip(kind, target, label, o = {}) {
    const size = 13;
    const w = Math.ceil(widthOf(label, size)) + 20;
    const h = 28;
    const onTop = kind === "hotChip";
    const index = o.index ?? 0;
    // Open-question chips line up leftwards along the top edge; actor chips stack downwards.
    const x = onTop ? target.x + target.w - w + 10 - index * (w + 4) : target.x + 10;
    const y = onTop ? target.y - 14 : target.y + target.h - 8 + index * 24;
    if (!target.el.groupIds.length) target.el.groupIds = [nextId("group")];
    return rect(kind, x, y, w, h, label, { fontSize: size, groupIds: [...target.el.groupIds] });
  }

  /** Arrow along explicit points. The label sits beside a segment, never on the line. */
  function path(points, o = {}) {
    const [sx, sy] = points[0];
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const el = {
      type: "arrow",
      id: nextId("arrow"),
      x: sx,
      y: sy,
      points: points.map(([px, py]) => [px - sx, py - sy]),
      strokeColor: o.event ? "#e8590c" : MUTED,
      strokeStyle: o.event ? "dashed" : "solid",
      strokeWidth: 1.5,
      roughness: 0,
      roundness: null,
      startArrowhead: null,
      endArrowhead: "triangle",
    };
    if (o.from) el.start = { id: o.from.id };
    if (o.to) el.end = { id: o.to.id };
    add(el, Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));

    if (o.label) {
      let i = o.labelSeg;
      if (i === undefined) {
        let best = -1;
        for (let j = 0; j < points.length - 1; j += 1) {
          const length = Math.abs(points[j + 1][0] - points[j][0]) + Math.abs(points[j + 1][1] - points[j][1]);
          if (length > best) {
            best = length;
            i = j;
          }
        }
      }
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      const t = o.labelT ?? 0.5;
      const px = ax + (bx - ax) * t;
      const py = ay + (by - ay) * t;
      const size = 14;
      const lines = o.label.split("\n");
      const w = Math.ceil(Math.max(...lines.map((line) => widthOf(line, size))));
      const h = Math.ceil(lines.length * size * LINE_HEIGHT);
      const color = o.event ? "#d9480f" : MUTED;
      if (ay === by) {
        text(px - w / 2, o.labelSide === "below" ? py + 7 : py - h - 7, o.label, size, color, { align: "center" });
      } else if (o.labelSide === "left") {
        text(px - w - 9, py - h / 2, o.label, size, color, { align: "right" });
      } else {
        text(px + 9, py - h / 2, o.label, size, color);
      }
    }
    return el;
  }

  /**
   * Arrow between two stickies. Routes: "h" straight across a row, "v" straight down a column,
   * "hv" out of the side then down or up, "vh" down or up then into the side.
   * Without a route it goes straight when the stickies share a row or a column, otherwise "hv".
   */
  function arrow(from, to, o = {}) {
    const tip = 3;
    const overlapY = from.y < to.y + to.h && to.y < from.y + from.h;
    const overlapX = from.x < to.x + to.w && to.x < from.x + from.w;
    const route = o.route ?? (overlapY ? "h" : overlapX ? "v" : "hv");
    const right = to.cx > from.cx;
    const down = to.cy > from.cy;
    const fromSide = right ? from.x + from.w : from.x;
    const toSide = right ? to.x - tip : to.x + to.w + tip;
    const fromEnd = down ? from.y + from.h : from.y;
    const toEnd = down ? to.y - tip : to.y + to.h + tip;
    let points;
    if (route === "h") {
      const y = o.y ?? (from.h <= to.h ? from.cy : to.cy);
      points = [
        [fromSide, y],
        [toSide, y],
      ];
    } else if (route === "v") {
      const x = o.x ?? (from.w <= to.w ? from.cx : to.cx);
      points = [
        [x, fromEnd],
        [x, toEnd],
      ];
    } else if (route === "hv") {
      const y = from.cy + (o.sy ?? 0);
      const x = to.cx + (o.ex ?? 0);
      points = [
        [fromSide, y],
        [x, y],
        [x, toEnd],
      ];
    } else {
      const x = from.cx + (o.sx ?? 0);
      const y = to.cy + (o.ey ?? 0);
      points = [
        [x, fromEnd],
        [x, y],
        [toSide, y],
      ];
    }
    return path(points, { ...o, from, to });
  }

  function cardSize(head, body, maxW) {
    const size = 15;
    const padX = 14;
    const lines = wrap(body, size, maxW - 2 * padX, true);
    const textW = Math.max(head ? widthOf(head, size) : 0, ...lines.map((line) => widthOf(line, size)));
    return { lines, w: Math.ceil(textW) + 2 * padX };
  }

  /** Note with a coloured heading and left-aligned body: a rule, an open question or a proposal. */
  function card(kind, x, y, head, body, o = {}) {
    const k = KINDS[kind];
    const size = 15;
    const padX = 14;
    const padY = 11;
    const lineH = size * LINE_HEIGHT;
    const measured = cardSize(head, body, o.maxW ?? 470);
    const w = o.w ?? measured.w;
    const headH = head ? lineH + 5 : 0;
    const h = Math.ceil(headH + measured.lines.length * lineH) + 2 * padY;
    const groupIds = [nextId("group")];
    const r = rect(kind, x, y, w, h, null, { proposed: o.proposed, groupIds });
    if (head) text(x + padX, y + padY, head, size, k.head, { groupIds });
    text(x + padX, y + padY + headH, measured.lines.join("\n"), size, k.ink ?? INK, { groupIds });
    return r;
  }

  /** Column of cards of one width (o.w fixes it). Each item is [kind, head, body, options]. Returns the bottom y. */
  function stack(x, y, items, o = {}) {
    const maxW = o.maxW ?? 470;
    const w = o.w ?? Math.max(...items.map(([, head, body]) => cardSize(head, body, maxW).w));
    let cy = y;
    for (const [kind, head, body, options] of items) {
      const r = card(kind, x, cy, head, body, { ...options, w, maxW });
      cy = r.y + r.h + 14;
    }
    return cy - 14;
  }

  /** Box with a larger title line and a list under it. */
  function titled(kind, x, y, w, title, lines, o = {}) {
    const padX = 16;
    const padY = 14;
    const titleH = 17 * LINE_HEIGHT;
    const h = o.h ?? Math.ceil(padY + titleH + 8 + lines.length * 15 * LINE_HEIGHT + padY);
    const groupIds = [nextId("group")];
    const r = rect(kind, x, y, w, h, null, { groupIds });
    text(x + padX, y + padY, title, 17, INK, { groupIds });
    text(x + padX, y + padY + titleH + 8, lines.join("\n"), 15, "#343a40", { groupIds });
    return r;
  }

  function dot(cx, cy) {
    const r = 9;
    const el = {
      type: "ellipse",
      id: nextId("dot"),
      x: cx - r,
      y: cy - r,
      width: 2 * r,
      height: 2 * r,
      backgroundColor: "#343a40",
      fillStyle: "solid",
      strokeColor: "#343a40",
      roughness: 0,
    };
    add(el, cx - r, cy - r, 2 * r, 2 * r);
    return { id: el.id, el, x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, cx, cy };
  }

  /**
   * One sub-process: a title, swimlanes by data owner and a grid inside them.
   * lanes: [{ key, title, rows, rowH }]. at(lane, col, row) gives the centre of a grid cell; columns start at 1.
   * panel(items) stacks rule cards to the right of the lanes.
   */
  function section(x, y, title, lanes, cols) {
    let top = y;
    if (title) {
      text(x, y, title, 22, "#343a40");
      top = y + 46;
    }
    const width = GRID.labelW + cols * GRID.col;
    const laneAt = {};
    let cy = top;
    for (const lane of lanes) {
      const rowH = lane.rowH ?? GRID.row;
      const h = (lane.rows ?? 1) * rowH;
      add(
        {
          type: "rectangle",
          id: nextId("lane"),
          x,
          y: cy,
          width,
          height: h,
          backgroundColor: "#f8f9fa",
          fillStyle: "solid",
          strokeColor: "#ced4da",
          strokeWidth: 1,
          roughness: 0,
          roundness: null,
        },
        x,
        cy,
        width,
        h,
      );
      text(x + 14, cy + 12, lane.title, 16, MUTED);
      laneAt[lane.key] = { y: cy, rowH };
      cy += h;
    }
    let bottom = cy;
    return {
      top,
      right: x + width,
      at: (lane, col, row = 0) => ({
        cx: x + GRID.labelW + (col - 0.5) * GRID.col,
        cy: laneAt[lane].y + (row + 0.5) * laneAt[lane].rowH,
      }),
      panel(items) {
        bottom = Math.max(bottom, stack(x + width + 40, top, items));
      },
      get bottom() {
        return bottom;
      },
    };
  }

  /** Frame with a large title inside. draw(x, y) receives the top-left corner of the content. */
  function frame(name, x, y, title, draw) {
    const pad = 40;
    const t = measure(() => {
      text(x, y, title, 30, INK);
      draw(x, y + 74);
    });
    out.push({
      type: "frame",
      id: nextId("frame"),
      name,
      children: t.ids,
      x: t.minX - pad,
      y: t.minY - pad,
      width: t.maxX - t.minX + 2 * pad,
      height: t.maxY - t.minY + 2 * pad,
    });
    return { left: t.minX - pad, top: t.minY - pad, right: t.maxX + pad, bottom: t.maxY + pad };
  }

  return {
    elements: out,
    GRID,
    INK,
    MUTED,
    widthOf,
    wrap,
    measure,
    text,
    para,
    sticky,
    span,
    chip,
    path,
    arrow,
    card,
    stack,
    titled,
    dot,
    section,
    frame,
  };
}
