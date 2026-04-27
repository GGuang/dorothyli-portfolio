"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

// ─── Syntax colors (same palette as Hero code strip) ───────────────────────
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

// ─── Globe SVG ─────────────────────────────────────────────────────────────
function GlobeDecoration({ mobile = false }: { mobile?: boolean }) {
  const size = mobile ? 240 : 380;
  const cx   = size / 2;
  const cy   = size / 2;
  const r    = size / 2 - 8;
  const clipId = `globe-clip-${mobile ? "m" : "d"}`;

  // Latitude parallels in orthographic projection
  const lats = [-67.5, -45, -22.5, 0, 22.5, 45, 67.5].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      y:  cy - r * Math.sin(rad),
      rx: r * Math.cos(rad),
      ry: Math.max(2.5, r * 0.072 * Math.cos(rad)),
    };
  });

  // Meridians: central line + ellipses at ±30° and ±60°
  const meridianAngles = [30, 60];

  return (
    <div style={{ perspective: "1200px", perspectiveOrigin: "center" }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="text-ink/30 animate-globe-spin"
        style={{ willChange: "transform", transformOrigin: "center" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx={cx} cy={cy} r={r - 1} />
          </clipPath>
        </defs>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <circle cx={cx} cy={cy} r={r} />
          <g clipPath={`url(#${clipId})`}>
            {lats.map((lat, i) => (
              <ellipse key={i} cx={cx} cy={lat.y} rx={lat.rx} ry={lat.ry} />
            ))}
          </g>
          <g clipPath={`url(#${clipId})`}>
            <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
            {meridianAngles.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <ellipse key={deg} cx={cx} cy={cy} rx={r * Math.sin(rad)} ry={r} />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
const INTERVAL_MS = 4000;
const WIPE_DUR    = 0.28;

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

  const exitAnim    = prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 0% 0 100%)" };
  const enterInit   = prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0%)" };
  const enterTarget = prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0%)" };

  return (
    <section className="relative z-20 bg-surface-100">
      <div className="w-full px-6 pt-20 pb-20 lg:max-w-content lg:mx-auto lg:px-14 xl:px-[5.5%] lg:pt-32 lg:pb-32">

        {/* ── Three-column flex (desktop) / stacked (mobile) ── */}
        <div className="flex lg:items-stretch">

          {/* Left column */}
          <div className="w-full lg:w-[40%] lg:flex-none flex flex-col">
            <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-12 lg:mb-16">
              // 03 — proof
            </p>

            {/* Animated stat block */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stat.id}
                  initial={enterInit}
                  animate={enterTarget}
                  exit={exitAnim}
                  transition={{ duration: WIPE_DUR, ease: [0.76, 0, 0.24, 1] }}
                >
                  {/* Number + suffix */}
                  <div className="flex items-baseline">
                    <span className="font-serif font-[400] tracking-tight text-6xl lg:text-7xl xl:text-8xl leading-none text-ink">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="font-serif font-[400] tracking-tight text-6xl lg:text-7xl xl:text-8xl leading-none text-ink">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="font-serif font-[400] text-3xl lg:text-4xl leading-tight mt-2 text-ink">
                    {stat.label_en}
                  </p>

                  {/* Footnote */}
                  {stat.footnote_en && (
                    <p className="font-mono text-xs uppercase tracking-widest text-ink/60 mt-6">
                      {stat.footnote_en}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Globe — mobile only (between stat and paragraph) */}
            <div className="mt-10 flex justify-center lg:hidden" aria-hidden="true">
              <GlobeDecoration mobile />
            </div>

            {/* Static descriptive paragraph */}
            <p className="font-sans font-[400] text-base lg:text-lg leading-[1.6] text-ink/85 max-w-md mt-10 lg:mt-32">
              [DESCRIPTIVE_PARAGRAPH — to be supplied]
            </p>
          </div>

          {/* Center column: Globe — desktop only */}
          <div
            className="hidden lg:flex lg:w-[45%] items-center justify-center"
            aria-hidden="true"
          >
            <GlobeDecoration />
          </div>

          {/* Right column: code strip — desktop only */}
          <div
            className="hidden lg:block lg:w-[15%] overflow-hidden relative"
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-code-up">
                {[...STRIP_LINES, ...STRIP_LINES].map((line, i) => (
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
