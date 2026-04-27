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

// ─── Animation variants ───────────────────────────────────────────────────────
const PARENT_VARIANTS: Variants = {
  initial: { x: 60 },
  animate: { x: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
  exit:    { x: -60, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

const NUM_CONTAINER_VARIANTS: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
  exit:    { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

const CHAR_VARIANTS: Variants = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 380, damping: 28 } },
  exit:    { opacity: 0, y: -24, filter: "blur(4px)", transition: { duration: 0.25, ease: [0.4, 0, 0.6, 1] } },
};

const BLOCK_VARIANTS: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

// ─── Globe SVG ────────────────────────────────────────────────────────────────
//
// Fixed coordinate system: 380×380 viewBox, R=182, center=(190,190).
// Orthographic projection centered at lat=0, lon=0 (prime meridian facing viewer).
// Visibility: cos(lat)*cos(lon) > 0 → lon ∈ (−90°, 90°).
// Visible market nodes: Spain, Germany, USA East. China+Indonesia are on back hemisphere.

function GlobeDecoration({ mobile = false }: { mobile?: boolean }) {
  const R  = 182;
  const cx = 190;
  const cy = 190;
  const displaySize = mobile ? 240 : 380;
  const clipId    = `globe-clip-${mobile ? "m" : "d"}`;
  const patternId = `globe-stripe-${mobile ? "m" : "d"}`;

  const toRad = (d: number) => (d * Math.PI) / 180;

  // Orthographic projection: x = R·cos(lat)·sin(lon), y = −R·sin(lat)
  const project = (latDeg: number, lonDeg: number) => {
    const lat = toRad(latDeg);
    const lon = toRad(lonDeg);
    return {
      x: cx + R * Math.cos(lat) * Math.sin(lon),
      y: cy - R * Math.sin(lat),
      visible: Math.cos(lat) * Math.cos(lon) > 0,
    };
  };

  // Layer 1 — Primary latitudes (7)
  const primLatDeg = [-67.5, -45, -22.5, 0, 22.5, 45, 67.5];
  const primLats = primLatDeg.map((deg) => {
    const rad = toRad(deg);
    return {
      y:  cy - R * Math.sin(rad),
      rx: Math.max(0, R * Math.cos(rad)),
      ry: Math.max(2, R * 0.072 * Math.cos(rad)),
    };
  });

  // Layer 1 — Primary meridians: 0°, ±15°, ±30°, ±45°, ±60°, ±75° (12 arcs)
  const primLonDeg = [0, 15, 30, 45, 60, 75];
  const primMeridians = primLonDeg.map((deg) => ({
    rx: R * Math.sin(toRad(deg)),
    isLine: deg === 0,
  }));

  // Layer 2 — Secondary dashed latitudes (14)
  const secLatDeg = [-78, -62, -54, -38, -30, -15, -8, 8, 15, 30, 38, 54, 62, 78];
  const secLats = secLatDeg.map((deg) => {
    const rad = toRad(deg);
    return {
      y:  cy - R * Math.sin(rad),
      rx: Math.max(0, R * Math.cos(rad)),
      ry: Math.max(1, R * 0.055 * Math.cos(rad)),
    };
  });

  // Layer 3 — Vertex markers: ~12 hollow squares at primary grid intersections
  const vertexData: [number, number][] = [
    [0, -60], [0, -30], [0, 0], [0, 30], [0, 60],
    [45, -45], [45, 0], [45, 45],
    [-45, -45], [-45, 0], [-45, 45],
    [22.5, -75],
  ];
  const vertices = vertexData.map(([la, lo]) => project(la, lo)).filter((p) => p.visible);

  // Layer 4 — Market nodes (filled; back-hemisphere nodes filtered out)
  const marketRaw = [
    { lat: 35,  lon: 105  },  // China — back hemisphere, filtered
    { lat: 0,   lon: 115  },  // Indonesia — back hemisphere, filtered
    { lat: 40,  lon: -3   },  // Spain
    { lat: 51,  lon: 10   },  // Germany
    { lat: 40,  lon: -75  },  // USA East Coast
  ];
  const markets = marketRaw.map(({ lat, lon }) => project(lat, lon)).filter((p) => p.visible);

  // Layer 5 — Connecting threads (skip if either endpoint is on back hemisphere)
  const threadPairs = [
    [{ lat: 35, lon: 105 }, { lat: 0,  lon: 115 }],  // China–Indonesia (both back)
    [{ lat: 35, lon: 105 }, { lat: 51, lon: 10  }],  // China–Germany (China back)
    [{ lat: 40, lon: -3  }, { lat: 40, lon: -75 }],  // Spain–USA ✓
    [{ lat: 51, lon: 10  }, { lat: 40, lon: -75 }],  // Germany–USA ✓
  ];
  const threads = threadPairs
    .map(([a, b]) => ({ a: project(a.lat, a.lon), b: project(b.lat, b.lon) }))
    .filter(({ a, b }) => a.visible && b.visible);

  return (
    <svg viewBox="0 0 380 380" width={displaySize} height={displaySize} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={R - 1} />
        </clipPath>
        {/* Diagonal stripe pattern for focal circle — 45°, 4px band / 4px gap */}
        <pattern
          id={patternId}
          x="0" y="0" width="8" height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="4" height="8" fill="rgba(23,22,18,0.6)" />
        </pattern>
      </defs>

      {/* Globe outline */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(23,22,18,0.35)" strokeWidth="1" />

      {/* Layer 2 — Secondary dashed latitudes */}
      <g clipPath={`url(#${clipId})`}>
        {secLats.map((lat, i) => (
          <ellipse
            key={i} cx={cx} cy={lat.y} rx={lat.rx} ry={lat.ry}
            fill="none" stroke="rgba(23,22,18,0.15)" strokeWidth="0.5" strokeDasharray="2 3"
          />
        ))}
      </g>

      {/* Layer 1 — Primary latitudes */}
      <g clipPath={`url(#${clipId})`}>
        {primLats.map((lat, i) => (
          <ellipse
            key={i} cx={cx} cy={lat.y} rx={lat.rx} ry={lat.ry}
            fill="none" stroke="rgba(23,22,18,0.35)" strokeWidth="1"
          />
        ))}
      </g>

      {/* Layer 1 — Primary meridians */}
      <g clipPath={`url(#${clipId})`}>
        {primMeridians.map((mer, i) =>
          mer.isLine ? (
            <line
              key={i} x1={cx} y1={cy - R} x2={cx} y2={cy + R}
              stroke="rgba(23,22,18,0.35)" strokeWidth="1"
            />
          ) : (
            <ellipse
              key={i} cx={cx} cy={cy} rx={mer.rx} ry={R}
              fill="none" stroke="rgba(23,22,18,0.35)" strokeWidth="1"
            />
          )
        )}
      </g>

      {/* Layer 5 — Connecting threads */}
      {threads.map(({ a, b }, i) => (
        <line
          key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke="rgba(23,22,18,0.2)" strokeWidth="0.5" strokeDasharray="1 4"
        />
      ))}

      {/* Layer 3 — Vertex markers (hollow squares 4×4) */}
      {vertices.map((pt, i) => (
        <rect
          key={i} x={pt.x - 2} y={pt.y - 2} width={4} height={4}
          fill="none" stroke="rgba(23,22,18,0.5)" strokeWidth="1"
        />
      ))}

      {/* Layer 4 — Market nodes (filled squares 4×4) */}
      {markets.map((pt, i) => (
        <rect
          key={i} x={pt.x - 2} y={pt.y - 2} width={4} height={4}
          fill="rgba(23,22,18,0.7)"
        />
      ))}

      {/* Layer 6 — Striped focal circle at globe center */}
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

  const parentVars = prefersReduced ? REDUCED_VARIANTS : PARENT_VARIANTS;

  return (
    <section className="relative z-20 bg-surface-100">
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={stat.id}
                  variants={parentVars}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Number + suffix — per-character stagger (or plain for reduced-motion) */}
                  {prefersReduced ? (
                    <div className="flex items-baseline">
                      {allChars.map((char, i) => (
                        <span key={i} className={NUM_CLASS}>{char}</span>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      variants={NUM_CONTAINER_VARIANTS}
                      className="flex items-baseline"
                    >
                      {allChars.map((char, i) => (
                        <motion.span
                          key={i}
                          variants={CHAR_VARIANTS}
                          className={NUM_CLASS}
                          style={{ display: "inline-block" }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* Label — block animation */}
                  {prefersReduced ? (
                    <p className="font-serif font-[400] text-3xl lg:text-4xl leading-tight mt-2 text-ink">
                      {stat.label_en}
                    </p>
                  ) : (
                    <motion.p
                      variants={BLOCK_VARIANTS}
                      className="font-serif font-[400] text-3xl lg:text-4xl leading-tight mt-2 text-ink"
                    >
                      {stat.label_en}
                    </motion.p>
                  )}

                  {/* Footnote — block animation, conditional */}
                  {stat.footnote_en && (
                    prefersReduced ? (
                      <p className="font-mono text-xs uppercase tracking-widest text-ink/60 mt-6">
                        {stat.footnote_en}
                      </p>
                    ) : (
                      <motion.p
                        variants={BLOCK_VARIANTS}
                        className="font-mono text-xs uppercase tracking-widest text-ink/60 mt-6"
                      >
                        {stat.footnote_en}
                      </motion.p>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Globe — mobile only (between stat block and paragraph) */}
            <div className="mt-10 flex justify-center lg:hidden" aria-hidden="true">
              <GlobeDecoration mobile />
            </div>

            {/* Static descriptive paragraph */}
            <p className="font-sans font-[400] text-base lg:text-lg leading-[1.6] text-ink/85 max-w-md mt-10 lg:mt-32">
              [DESCRIPTIVE_PARAGRAPH — to be supplied]
            </p>
          </div>

          {/* ── Center column: Globe (desktop only) ── */}
          <div
            className="hidden lg:flex lg:w-[45%] items-center justify-center"
            aria-hidden="true"
          >
            <GlobeDecoration />
          </div>

          {/* ── Right column: Code strip (desktop only) ── */}
          <div
            className="hidden lg:block lg:w-[15%] overflow-hidden relative"
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div>
                {STRIP_LINES.map((line, i) => (
                  <StripLine key={i} line={line} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
