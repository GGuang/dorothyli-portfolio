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

// ─── Animation constants (cubic-bezier only, no spring, no blur) ─────────────
const EXPO_OUT = [0.32, 0.72, 0, 1] as [number, number, number, number];

// Stagger container for char spans — no visual properties, just orchestration
const NUM_CONTAINER_VARIANTS: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.025 } },
  exit:    { transition: { staggerChildren: 0.018 } },
};

const LABEL_VARIANTS: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0,   transition: { duration: 0.45, ease: EXPO_OUT, delay: 0.1 } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.45, ease: EXPO_OUT } },
};

const FOOTNOTE_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: EXPO_OUT, delay: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.35, ease: EXPO_OUT } },
};

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

// ─── Per-character drift ──────────────────────────────────────────────────────

function charGroup(i: number, total: number): "anchor" | "drift" | "tail" {
  if (total <= 3) return "drift";
  if (total <= 7) return i === 0 ? "anchor" : i === total - 1 ? "tail" : "drift";
  return i < Math.ceil(total * 0.2) ? "anchor" : i >= Math.floor(total * 0.75) ? "tail" : "drift";
}

function charVariants(i: number, total: number): Variants {
  const group = charGroup(i, total);

  if (group === "anchor") {
    return {
      initial: { opacity: 0, x: 8 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.4,  ease: EXPO_OUT } },
      exit:    { opacity: 0, x: -8, transition: { duration: 0.4, ease: EXPO_OUT } },
    };
  }
  if (group === "tail") {
    return {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0,   transition: { duration: 0.45, ease: EXPO_OUT } },
      exit:    { opacity: 0, x: 30,  transition: { duration: 0.45, ease: EXPO_OUT } },
    };
  }
  // drift: alternating x and slight y per index
  const driftI = total <= 3 ? i : i - 1; // relative position within drift group
  const even   = driftI % 2 === 0;
  return {
    initial: { opacity: 0, x: even ? 50 : -35, y: even ? 8 : -6 },
    animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EXPO_OUT } },
    exit:    { opacity: 0, x: even ? -50 : 35, y: even ? -8 : 6, transition: { duration: 0.5, ease: EXPO_OUT } },
  };
}

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

// ─── Globe SVG ────────────────────────────────────────────────────────────────
//
// Orthographic projection: x = R·Vx, y = -R·Vy  (z-axis faces viewer)
// Visibility: Vz > 0 (front hemisphere)
// Front edges:      both endpoints Vz > 0 → solid ink/40, stroke 1
// Silhouette edges: one endpoint Vz ≤ 0  → dashed ink/20, stroke 0.5
// Back edges:       both endpoints Vz ≤ 0 → skip

function GlobeDecoration({ mobile = false }: { mobile?: boolean }) {
  const displaySize = mobile ? 240 : 520;
  const cx = displaySize / 2;
  const cy = displaySize / 2;
  const R  = displaySize / 2 - 15;
  const clipId    = `geo-clip-${mobile ? "m" : "d"}`;
  const patternId = `geo-stripe-${mobile ? "m" : "d"}`;

  // Project unit-sphere vertex to SVG coordinates
  const proj = ([vx, vy, vz]: Vec3) => ({ x: cx + R * vx, y: cy - R * vy, vz });
  const projected = ICO_VERTS.map(proj);

  // Categorize edges
  const frontEdges: [number, number][] = [];
  const silEdges:   [number, number][] = [];
  for (const [a, b] of ICO_EDGES) {
    const af = projected[a].vz > 0;
    const bf = projected[b].vz > 0;
    if (af && bf)        frontEdges.push([a, b]);
    else if (af || bf)   silEdges.push([a, b]);
  }

  // Antenna sources: 7 front-hemisphere verts closest to silhouette (smallest +vz)
  const antennas = ICO_VERTS
    .map((v, i) => ({ v, p: projected[i] }))
    .filter(({ v }) => v[2] > 0)
    .sort((a, b) => a.v[2] - b.v[2])
    .slice(0, 7)
    .map(({ v: [vx, vy] }) => {
      const pLen = Math.sqrt(vx * vx + vy * vy);
      const s    = pLen > 0.001 ? 1.3 / pLen : 1.3;
      return {
        x1: cx + R * vx,    y1: cy - R * vy,
        x2: cx + R * vx * s, y2: cy - R * vy * s,
      };
    });

  return (
    <svg
      viewBox={`0 0 ${displaySize} ${displaySize}`}
      width={displaySize}
      height={displaySize}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
        {/* 45° diagonal stripe pattern for focal circle */}
        <pattern
          id={patternId} x="0" y="0" width="8" height="8"
          patternUnits="userSpaceOnUse" patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="4" height="8" fill="rgba(23,22,18,0.6)" />
        </pattern>
      </defs>

      {/* Silhouette-crossing edges (dashed, clipped to globe) */}
      <g clipPath={`url(#${clipId})`}>
        {silEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={projected[a].x} y1={projected[a].y}
            x2={projected[b].x} y2={projected[b].y}
            stroke="rgba(23,22,18,0.2)" strokeWidth="0.5" strokeDasharray="2 3"
          />
        ))}
      </g>

      {/* Front-facing edges (solid, clipped to globe) */}
      <g clipPath={`url(#${clipId})`}>
        {frontEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={projected[a].x} y1={projected[a].y}
            x2={projected[b].x} y2={projected[b].y}
            stroke="rgba(23,22,18,0.4)" strokeWidth="1"
          />
        ))}
      </g>

      {/* Globe outline ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(23,22,18,0.3)" strokeWidth="1" />

      {/* Antenna lines — extend outside silhouette, not clipped */}
      {antennas.map((a, i) => (
        <line
          key={i}
          x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
          stroke="rgba(23,22,18,0.2)" strokeWidth="0.5" strokeDasharray="1 3"
        />
      ))}

      {/* Vertex markers: hollow 3×3 squares at every front-hemisphere vertex */}
      <g clipPath={`url(#${clipId})`}>
        {projected
          .filter(p => p.vz > 0)
          .map((p, i) => (
            <rect
              key={i}
              x={p.x - 1.5} y={p.y - 1.5} width={3} height={3}
              fill="none" stroke="rgba(23,22,18,0.5)" strokeWidth="1"
            />
          ))}
      </g>

      {/* Antenna endpoint markers: hollow 4×4 squares outside silhouette */}
      {antennas.map((a, i) => (
        <rect
          key={i}
          x={a.x2 - 2} y={a.y2 - 2} width={4} height={4}
          fill="none" stroke="rgba(23,22,18,0.4)" strokeWidth="1"
        />
      ))}

      {/* Striped focal circle at visual center */}
      <circle cx={cx} cy={cy} r={12} fill={`url(#${patternId})`} />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const INTERVAL_MS = 4000;

const NUM_CLASS =
  "font-serif font-[400] tracking-tight tabular-nums text-6xl lg:text-7xl xl:text-8xl leading-none text-ink";

export function StatsSection() {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced      = useReducedMotion();
  const stats               = statsData.stats as Stat[];
  const stat                = stats[index];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % stats.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, stats.length]);

  const allChars = [
    ...stat.value.split(""),
    ...(stat.suffix ? stat.suffix.split("") : []),
  ];
  const total = allChars.length;

  return (
    <section className="relative z-20 bg-surface-100 overflow-x-hidden">
      <div className="w-full px-6 pt-20 pb-20 lg:max-w-content lg:mx-auto lg:px-14 xl:px-[5.5%] lg:pt-32 lg:pb-32">
        <div className="flex lg:items-stretch">

          {/* ── Left column ── */}
          <div className="w-full lg:w-[40%] lg:flex-none flex flex-col">
            <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-12 lg:mb-16">
              {"// 03 — proof"}
            </p>

            {/* Animated stat block */}
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Number + suffix: per-character x/y drift */}
              <AnimatePresence mode="wait">
                {prefersReduced ? (
                  <motion.div
                    key={stat.id}
                    variants={REDUCED_VARIANTS}
                    initial="initial" animate="animate" exit="exit"
                    className="flex items-baseline"
                  >
                    {allChars.map((char, i) => (
                      <span key={i} className={NUM_CLASS}>{char}</span>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={stat.id}
                    variants={NUM_CONTAINER_VARIANTS}
                    initial="initial" animate="animate" exit="exit"
                    className="flex items-baseline"
                  >
                    {allChars.map((char, i) => (
                      <motion.span
                        key={i}
                        variants={charVariants(i, total)}
                        className={NUM_CLASS}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Label — separate AnimatePresence, block animation */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={stat.id}
                  variants={prefersReduced ? REDUCED_VARIANTS : LABEL_VARIANTS}
                  initial="initial" animate="animate" exit="exit"
                  className="font-serif font-[400] text-3xl lg:text-4xl leading-tight mt-2 text-ink"
                >
                  {stat.label_en}
                </motion.p>
              </AnimatePresence>

              {/* Footnote — separate AnimatePresence, opacity only */}
              <AnimatePresence mode="wait">
                {stat.footnote_en ? (
                  <motion.p
                    key={stat.id}
                    variants={prefersReduced ? REDUCED_VARIANTS : FOOTNOTE_VARIANTS}
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
              <GlobeDecoration mobile />
            </div>

            {/* Static descriptive paragraph */}
            <p className="font-sans font-[400] text-base lg:text-lg leading-[1.6] text-ink/85 max-w-md mt-10 lg:mt-32">
              A selected set of measurable proof points across brand, content, search, website, and demand work — showing how marketing communication can be turned into repeatable systems, not one-off execution.
            </p>
          </div>

          {/* ── Center column: Globe (desktop only, fills remaining width) ── */}
          <div
            className="hidden lg:flex lg:flex-1 items-center justify-center"
            aria-hidden="true"
          >
            <div style={{ transform: "translateX(-120px)" }}>
              <GlobeDecoration />
            </div>
          </div>

        </div>
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
