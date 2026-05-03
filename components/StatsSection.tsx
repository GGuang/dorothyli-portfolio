"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import statsData from "@/_context/stats.json";

interface Stat {
  id: string;
  value: string;
  suffix: string;
  label_en: string;
  label_zh: string;
  footnote_en: string;
  footnote_zh: string;
  source: string;
  year: string;
}

// ─── Syntax colors ───────────────────────────────────────────────────────────
const SC = {
  comment: "#9d937c",
  keyword: "#4a7a96",
  value:   "#5d8a6e",
  plain:   "#3d3b34",
};

const STRIP_LINES = [
  { type: "comment",        text: "/// MARKET_ENTRY" },
  { type: "keyword",        text: "public fun", rest: " expand(geo: str) {" },
  { type: "indent",         text: "  let icp = ", value: '"verified"' },
  { type: "comment-indent", text: "  // 6-week sprint" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " pipeline;" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
  { type: "comment",        text: "/// CONTENT_OPS" },
  { type: "keyword",        text: "public fun", rest: " scale_output() {" },
  { type: "indent",         text: "  let ratio = ", value: '"10x"' },
  { type: "comment-indent", text: "  // same headcount" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " published;" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
  { type: "comment",        text: "/// ATTRIBUTION" },
  { type: "keyword",        text: "public fun", rest: " measure() {" },
  { type: "indent",         text: "  let signals = analyze();" },
  { type: "comment-indent", text: "  // closed-loop model" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " revenue;" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
] as const;

type StripLineType = (typeof STRIP_LINES)[number];

function StripLine({ line }: { line: StripLineType }) {
  const base = "font-mono text-[10px] leading-[1.9] whitespace-pre";
  switch (line.type) {
    case "comment":
    case "comment-indent":
      return <div className={base} style={{ color: SC.comment }}>{line.text}</div>;
    case "keyword":
      return (
        <div className={base} style={{ color: SC.keyword }}>
          {line.text}
          <span style={{ color: SC.plain }}>{"rest" in line ? line.rest : ""}</span>
        </div>
      );
    case "keyword-indent":
      return (
        <div className={base} style={{ color: SC.plain }}>
          {"  "}
          <span style={{ color: SC.keyword }}>{"keyword" in line ? line.keyword : ""}</span>
          {"rest" in line ? line.rest : ""}
        </div>
      );
    case "indent":
      return (
        <div className={base} style={{ color: SC.plain }}>
          {line.text}
          {"value" in line && <span style={{ color: SC.value }}>{line.value}</span>}
        </div>
      );
    default:
      return <div className={base} style={{ color: SC.plain }}>{line.text}</div>;
  }
}

// ─── Animation variants — three-row staircase slide ─────────────────────────
// Each row slides left (x: 0 → -80) on exit and enters from left (x: -80 → 0).
// Exit delays stagger the three rows: 0s / 0.15s / 0.30s.
// Each row uses a separate AnimatePresence mode="wait", so row 1 starts
// entering at t≈0.5s while rows 2/3 are still exiting — creating the cascade.

const STD_EASE  = [0.4, 0, 0.2, 1]    as [number, number, number, number];
const EXPO_OUT  = [0.32, 0.72, 0, 1]  as [number, number, number, number];

const VALUE_ROW_VARIANTS: Variants = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
  exit:    { x: -80, opacity: 0, transition: { duration: 0.5, ease: STD_EASE } },
};

const LABEL_ROW_VARIANTS: Variants = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
  exit:    { x: -80, opacity: 0, transition: { duration: 0.5, ease: STD_EASE, delay: 0.15 } },
};

const FOOTNOTE_ROW_VARIANTS: Variants = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
  exit:    { x: -80, opacity: 0, transition: { duration: 0.5, ease: STD_EASE, delay: 0.30 } },
};

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Geodesic icosphere (frequency-2, computed once at module level) ──────────
type Vec3 = [number, number, number];

function norm3([x, y, z]: Vec3): Vec3 {
  const l = Math.sqrt(x * x + y * y + z * z);
  return [x / l, y / l, z / l];
}

const PHI = (1 + Math.sqrt(5)) / 2;

// 12 icosahedron base vertices (unit sphere)
const ICO_BASE: Vec3[] = [
  [0, 1, PHI],  [0, -1, PHI],  [0, 1, -PHI],  [0, -1, -PHI],
  [1, PHI, 0],  [-1, PHI, 0],  [1, -PHI, 0],  [-1, -PHI, 0],
  [PHI, 0, 1],  [-PHI, 0, 1], [PHI, 0, -1],  [-PHI, 0, -1],
].map(v => norm3(v as Vec3));

// 20 icosahedron faces
const ICO_BASE_FACES: [number, number, number][] = [
  [0,1,8],  [0,8,4],   [0,4,5],  [0,5,9],  [0,9,1],
  [1,6,8],  [8,6,10],  [8,10,4], [4,10,2], [4,2,5],
  [5,2,11], [5,11,9],  [9,11,7], [9,7,1],  [1,7,6],
  [3,6,7],  [3,10,6],  [3,2,10], [3,11,2], [3,7,11],
];

// One subdivision pass → 42 verts, 80 faces
function subdivide(verts: Vec3[], faces: [number, number, number][]) {
  const v = [...verts];
  const cache = new Map<string, number>();
  const mid = (a: number, b: number): number => {
    const k = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (cache.has(k)) return cache.get(k)!;
    const i = v.length;
    v.push(norm3([(v[a][0]+v[b][0])/2, (v[a][1]+v[b][1])/2, (v[a][2]+v[b][2])/2]));
    cache.set(k, i);
    return i;
  };
  const f: [number, number, number][] = [];
  for (const [a, b, c] of faces) {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    f.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }
  return { verts: v, faces: f };
}

const { verts: ICO_VERTS, faces: ICO_FACES } = subdivide(ICO_BASE, ICO_BASE_FACES);

// Extract unique edges
const ICO_EDGES: [number, number][] = (() => {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (const [a, b, c] of ICO_FACES) {
    for (const [x, y] of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const k = x < y ? `${x}:${y}` : `${y}:${x}`;
      if (!seen.has(k)) {
        seen.add(k);
        edges.push([Math.min(x, y), Math.max(x, y)]);
      }
    }
  }
  return edges;
})();

// ─── Vertex highlight map — 6 front-hemisphere verts evenly distributed ───────
// Computed once from ICO_VERTS: filter to vz > 0.2 (clearly front-facing),
// sort by screen angle, pick every n-th for angular coverage.
const HIGHLIGHTED_VERTS: number[] = (() => {
  const candidates = ICO_VERTS
    .map((v, i) => ({ i, v, angle: Math.atan2(v[1], v[0]) }))
    .filter(({ v }) => v[2] > 0.2)
    .sort((a, b) => a.angle - b.angle);
  const step = Math.max(1, Math.floor(candidates.length / 6));
  return Array.from({ length: 6 }, (_, k) => candidates[(k * step) % candidates.length].i);
})();

const STAT_VERTEX_MAP: Record<string, number> = {
  "01": HIGHLIGHTED_VERTS[0], // website
  "02": HIGHLIGHTED_VERTS[1], // brand
  "03": HIGHLIGHTED_VERTS[2], // search
  "04": HIGHLIGHTED_VERTS[3], // demand
  "05": HIGHLIGHTED_VERTS[4], // campaign
  "06": HIGHLIGHTED_VERTS[5], // content
};

// ─── Globe SVG ────────────────────────────────────────────────────────────────
//
// Orthographic projection: x = R·Vx, y = -R·Vy  (z-axis faces viewer)
// Visibility: Vz > 0 (front hemisphere)
// Front edges:      both endpoints Vz > 0 → solid ink/40, stroke 1
// Silhouette edges: one endpoint Vz ≤ 0  → dashed ink/20, stroke 0.5
// Back edges:       both endpoints Vz ≤ 0 → skip

function GlobeDecoration({
  mobile = false,
  activeVertex,
  prefersReduced = false,
}: {
  mobile?: boolean;
  activeVertex?: number;
  prefersReduced?: boolean;
}) {
  const displaySize = mobile ? 240 : 520;
  const cx = displaySize / 2;
  const cy = displaySize / 2;
  const R  = displaySize / 2 - 15;
  const clipId    = `geo-clip-${mobile ? "m" : "d"}`;
  const patternId = `geo-stripe-${mobile ? "m" : "d"}`;

  const proj = ([vx, vy, vz]: Vec3) => ({ x: cx + R * vx, y: cy - R * vy, vz });
  const projected = ICO_VERTS.map(proj);

  const frontEdges: [number, number][] = [];
  const silEdges:   [number, number][] = [];
  for (const [a, b] of ICO_EDGES) {
    const af = projected[a].vz > 0;
    const bf = projected[b].vz > 0;
    if (af && bf)        frontEdges.push([a, b]);
    else if (af || bf)   silEdges.push([a, b]);
  }

  // Outer markers — 8, mostly dots, 1 square, close to globe at 1.16–1.26R
  const outerMarkers = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI + (i % 2 === 0 ? 0.06 : -0.05);
    const radiusFactor = i % 3 === 0 ? 1.16 : i % 3 === 1 ? 1.21 : 1.26;
    return {
      x: cx + R * radiusFactor * Math.cos(angle),
      y: cy + R * radiusFactor * Math.sin(angle),
      angle,
      type: (i === 3 ? "square" : "dot") as "square" | "dot",
      opacity: i % 4 === 0 ? 0.24 : 0.16,
    };
  });

  // Connecting threads — 6, from front-hemisphere verts to nearest outer markers
  const frontAngledVerts = ICO_VERTS
    .map((_v, i) => ({ p: projected[i], screenAngle: Math.atan2(projected[i].y - cy, projected[i].x - cx) }))
    .filter(({ p }) => p.vz > 0)
    .sort((a, b) => a.screenAngle - b.screenAngle);

  const threadStep = Math.max(1, Math.floor(frontAngledVerts.length / 6));
  const threads = Array.from({ length: 6 }, (_, i) => {
    const vert = frontAngledVerts[(i * threadStep) % frontAngledVerts.length];
    let nearest = outerMarkers[0];
    let minDiff = Infinity;
    for (const m of outerMarkers) {
      let diff = Math.abs(m.angle - vert.screenAngle);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      if (diff < minDiff) { minDiff = diff; nearest = m; }
    }
    return { x1: vert.p.x, y1: vert.p.y, x2: nearest.x, y2: nearest.y, i };
  });

  return (
    <svg
      viewBox={`0 0 ${displaySize} ${displaySize}`}
      width={displaySize}
      height={displaySize}
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
        <pattern
          id={patternId} x="0" y="0" width="8" height="8"
          patternUnits="userSpaceOnUse" patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="4" height="8" fill="rgba(23,22,18,0.6)" />
        </pattern>
      </defs>

      {/* Globe outline ring — static boundary */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(23,22,18,0.23)" strokeWidth="0.8" />

      {/* Internal arcs — 3 max, tilted, suggest spatial depth */}
      <g clipPath={`url(#${clipId})`}>
        <ellipse cx={cx} cy={cy} rx={R * 0.34} ry={R * 0.91}
          fill="none" stroke="rgba(23,22,18,0.11)" strokeWidth="0.6"
          transform={`rotate(-16 ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={R * 0.91} ry={R * 0.25}
          fill="none" stroke="rgba(23,22,18,0.09)" strokeWidth="0.55" strokeDasharray="2 6"
          transform={`rotate(10 ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={R * 0.60} ry={R * 0.78}
          fill="none" stroke="rgba(23,22,18,0.08)" strokeWidth="0.5"
          transform={`rotate(-46 ${cx} ${cy})`} />
      </g>

      {/* Geodesic edges — slow drift oscillation */}
      <motion.g
        animate={prefersReduced ? {} : { rotate: [-1, 1, -1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <g clipPath={`url(#${clipId})`}>
          {silEdges.map(([a, b], i) => (
            <line key={i}
              x1={projected[a].x} y1={projected[a].y}
              x2={projected[b].x} y2={projected[b].y}
              stroke="rgba(23,22,18,0.13)" strokeWidth="0.5" strokeDasharray="2 3"
            />
          ))}
        </g>
        <g clipPath={`url(#${clipId})`}>
          {frontEdges.map(([a, b], i) => (
            <line key={i}
              x1={projected[a].x} y1={projected[a].y}
              x2={projected[b].x} y2={projected[b].y}
              stroke="rgba(23,22,18,0.34)" strokeWidth="0.75"
            />
          ))}
        </g>
        {/* Vertex markers — hollow 3×3 squares, active excluded */}
        <g clipPath={`url(#${clipId})`}>
          {projected
            .filter((p, i) => p.vz > 0 && i !== activeVertex)
            .map((p, i) => (
              <rect key={i}
                x={p.x - 1.5} y={p.y - 1.5} width={3} height={3}
                fill="none" stroke="rgba(23,22,18,0.38)" strokeWidth="0.8"
              />
            ))}
        </g>
      </motion.g>

      {/* Connecting threads — 6 signal paths, varied dash */}
      {threads.map((t, i) => (
        <line key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="rgba(23,22,18,0.11)" strokeWidth="0.5"
          strokeDasharray={i % 2 === 0 ? "1 5" : "2 6"}
        />
      ))}

      {/* Outer markers — mixed types, irregular radii */}
      {outerMarkers.map((m, i) =>
        m.type === "dot"
          ? <circle key={i} cx={m.x} cy={m.y} r={1.6} fill={`rgba(23,22,18,${m.opacity})`} />
          : <rect key={i} x={m.x - 2} y={m.y - 2} width={4} height={4}
              fill="none" stroke={`rgba(23,22,18,${m.opacity})`} strokeWidth="0.8" />
      )}

      {/* Active vertex — pulsing signal ring + filled dot */}
      <g clipPath={`url(#${clipId})`}>
        <AnimatePresence>
          {activeVertex !== undefined && projected[activeVertex]?.vz > 0 && (() => {
            const p = projected[activeVertex];
            return (
              <motion.g
                key={activeVertex}
                initial={prefersReduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                animate={prefersReduced
                  ? { opacity: 1, transition: { duration: 0.2 } }
                  : { scale: 1, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT, delay: 0.2 } }
                }
                exit={prefersReduced
                  ? { opacity: 0, transition: { duration: 0.2 } }
                  : { scale: 0.6, opacity: 0, transition: { duration: 0.4, ease: STD_EASE } }
                }
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              >
                <motion.circle
                  cx={p.x} cy={p.y} r={8}
                  fill="none" stroke="rgba(23,22,18,0.20)" strokeWidth="0.6"
                  animate={prefersReduced ? {} : { r: [7, 11, 7], opacity: [0.28, 0.10, 0.28] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle cx={p.x} cy={p.y} r={3.0} fill="rgba(23,22,18,0.58)" />
              </motion.g>
            );
          })()}
        </AnimatePresence>
      </g>

      {/* Center anchor — quiet */}
      <g opacity="0.38">
        <circle cx={cx} cy={cy} r={12} fill={`url(#${patternId})`} />
      </g>
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const INTERVAL_MS = 4000;

const NUM_CLASS =
  "font-display font-[500] tracking-[-0.02em] tabular-nums text-6xl lg:text-7xl xl:text-8xl leading-none text-ink";

export function StatsSection() {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced      = useReducedMotion();
  const stats               = statsData.stats as Stat[];
  const stat                = stats[index];
  const activeVertex        = STAT_VERTEX_MAP[stat.id];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % stats.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, stats.length]);

  return (
    <section className="relative z-20 bg-surface-100 overflow-x-hidden">
      <div className="w-full px-6 pt-20 pb-20 lg:max-w-content lg:mx-auto lg:px-14 xl:px-[5.5%] lg:pt-32 lg:pb-32">
        <div className="flex lg:items-stretch">

          {/* ── Left column ── */}
          <div className="w-full lg:w-[40%] lg:flex-none flex flex-col">
            <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-12 lg:mb-16">
              {"// 03 — proof"}
            </p>

            {/* Animated stat block — three-row staircase slide */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Row 1: value + suffix */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stat.id}
                  variants={prefersReduced ? REDUCED_VARIANTS : VALUE_ROW_VARIANTS}
                  initial="initial" animate="animate" exit="exit"
                >
                  <span className={NUM_CLASS}>{stat.value}{stat.suffix}</span>
                </motion.div>
              </AnimatePresence>

              {/* Row 2: label */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={stat.id}
                  variants={prefersReduced ? REDUCED_VARIANTS : LABEL_ROW_VARIANTS}
                  initial="initial" animate="animate" exit="exit"
                  className="font-serif font-[400] text-3xl lg:text-4xl leading-tight mt-2 text-ink"
                >
                  {stat.label_en}
                </motion.p>
              </AnimatePresence>

              {/* Row 3: footnote */}
              <AnimatePresence mode="wait">
                {stat.footnote_en ? (
                  <motion.p
                    key={stat.id}
                    variants={prefersReduced ? REDUCED_VARIANTS : FOOTNOTE_ROW_VARIANTS}
                    initial="initial" animate="animate" exit="exit"
                    className="font-mono text-xs uppercase tracking-widest text-ink/60 mt-6"
                  >
                    {stat.footnote_en}
                  </motion.p>
                ) : (
                  <div key={stat.id} className="mt-6 h-4" />
                )}
              </AnimatePresence>
            </div>

            {/* Globe — mobile only (sits between stat and paragraph) */}
            <div className="mt-10 flex justify-center lg:hidden" aria-hidden="true">
              <GlobeDecoration mobile activeVertex={activeVertex} prefersReduced={!!prefersReduced} />
            </div>

            {/* Static descriptive paragraph */}
            <p className="font-sans font-[400] text-base lg:text-lg leading-[1.6] text-ink/85 max-w-md mt-10 lg:mt-32">
              A selected set of measurable proof points across brand, content, search, website, and demand work, showing how scattered marketing efforts can become repeatable systems, not one-off execution.
            </p>
          </div>

        </div>
      </div>

      {/* ── Globe: desktop only, center anchored to 52vw ── */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{ left: "52vw", top: "50%", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      >
        <GlobeDecoration activeVertex={activeVertex} prefersReduced={!!prefersReduced} />
      </div>

      {/* ── Code strip: absolute right edge, bleeds off viewport — desktop only ── */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ width: "70px" }}
        aria-hidden="true"
      >
        <div className="pt-6">
          {[...STRIP_LINES, ...STRIP_LINES, ...STRIP_LINES].map((line, i) => (
            <StripLine key={i} line={line} />
          ))}
        </div>
      </div>

    </section>
  );
}
