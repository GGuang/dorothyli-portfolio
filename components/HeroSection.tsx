"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from "framer-motion";

const WORDS = [
  "Product Narratives",
  "Content Engines",
  "Search Visibility",
  "Sales Enablement",
  "Demand Pathways",
  "Marketing Systems",
];

const LONGEST_WORD = WORDS.reduce((a, b) => (a.length >= b.length ? a : b));

const C = {
  comment: "#9d937c",
  keyword: "#4a7a96",
  value:   "#5d8a6e",
  plain:   "#3d3b34",
};

const CODE_LINES = [
  { type: "comment",        text: "/// CONTENT_PIPELINE" },
  { type: "keyword",        text: "public fun", rest: " generate_at_scale() {" },
  { type: "indent",         text: "  let markets = ", value: '["SEA","US","EU"]' },
  { type: "indent",         text: "  let lang = ", value: '["EN","ZH","ID","ES"]' },
  { type: "comment-indent", text: "  // 10x output, same team" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " publish(markets, lang);" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
  { type: "comment",        text: "/// SEO_ARCHITECTURE" },
  { type: "keyword",        text: "public fun", rest: " build_organic() {" },
  { type: "indent",         text: "  let clusters = analyze_gaps();" },
  { type: "comment-indent", text: "  // zero ad spend model" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " top3_ranking;" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
  { type: "comment",        text: "/// BRAND_INFRASTRUCTURE" },
  { type: "keyword",        text: "public fun", rest: " localize(market: str) {" },
  { type: "indent",         text: "  let tone = ", value: '"authoritative"' },
  { type: "comment-indent", text: "  // consistent across 12 markets" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " brand_system;" },
  { type: "plain",          text: "}" },
  { type: "blank",          text: " " },
] as const;

type CodeLineType = (typeof CODE_LINES)[number];

function CodeLine({ line }: { line: CodeLineType }) {
  const base = "font-mono text-[10px] leading-[1.9] whitespace-pre";
  switch (line.type) {
    case "comment":
    case "comment-indent":
      return <div className={base} style={{ color: C.comment }}>{line.text}</div>;
    case "keyword":
      return (
        <div className={base} style={{ color: C.keyword }}>
          {line.text}
          <span style={{ color: C.plain }}>{"rest" in line ? line.rest : ""}</span>
        </div>
      );
    case "keyword-indent":
      return (
        <div className={base} style={{ color: C.plain }}>
          {"  "}
          <span style={{ color: C.keyword }}>{"keyword" in line ? line.keyword : ""}</span>
          {"rest" in line ? line.rest : ""}
        </div>
      );
    case "indent":
      return (
        <div className={base} style={{ color: C.plain }}>
          {line.text}
          {"value" in line && <span style={{ color: C.value }}>{line.value}</span>}
        </div>
      );
    default:
      return <div className={base} style={{ color: C.plain }}>{line.text}</div>;
  }
}

/* ── Easings ─────────────────────────────────────── */
const EXPO_OUT = [0.32, 0.72, 0, 1] as const;
const STD_EASE = [0.4, 0, 0.2, 1]  as const;

/* ── Word transition variants — calm vertical fade ── */
const WORD_VARIANTS: Variants = {
  initial: { y: 14, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.58, ease: EXPO_OUT } },
  exit:    { y: -10, opacity: 0, transition: { duration: 0.32, ease: STD_EASE } },
};

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

/* ── Rotating word ───────────────────────────────── */
function RotatingWord({ word }: { word: string }) {
  const prefersRM = useReducedMotion();
  const variants = prefersRM ? REDUCED_VARIANTS : WORD_VARIANTS;

  return (
    <span className="relative inline-block whitespace-pre align-baseline overflow-visible">
      {/* Invisible spacer — keeps wrapper width stable across rotations */}
      <span
        aria-hidden="true"
        className="whitespace-pre select-none"
        style={{ visibility: "hidden" }}
      >
        {LONGEST_WORD}
      </span>

      <AnimatePresence initial={false}>
        <motion.span
          key={word}
          className="absolute left-0 top-0 whitespace-pre overflow-visible"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Hero section ────────────────────────────────── */
export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => {
        prevIndexRef.current = i;
        return (i + 1) % WORDS.length;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const word = WORDS[wordIndex];

  return (
    <section
      id="hero"
      className="hero-bg relative h-full flex flex-col overflow-hidden"
    >
      {/* Code decoration — desktop only, right 40% */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 right-0 bottom-0 pointer-events-none"
        style={{ width: "40%", zIndex: 1 }}
      >
        <div
          className="absolute overflow-hidden"
          style={{ top: "22%", bottom: "18%", left: "16%", right: "6%" }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 z-10"
            style={{ height: "32%", background: "linear-gradient(transparent, #f9f9f0)" }}
          />
          <div className="animate-code-up">
            {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
              <CodeLine key={i} line={line} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="w-full px-6 pt-[60px] pb-[20px] md:max-w-content md:mx-auto md:px-14 lg:px-[5.5%] md:py-sp-24">
          <h1 className="font-serif font-[300] tracking-[-0.03em] text-warm-black text-[clamp(42px,12vw,60px)] md:text-[clamp(90px,7.5vw,108px)] leading-[1.08] md:leading-[1.04]">
            <span className="block">Build</span>
            <span
              className="block overflow-visible"
              style={{ minHeight: "1.28em", paddingBottom: "0.12em" }}
            >
              <RotatingWord word={word} />
            </span>
            <span className="block">across Borders.</span>
          </h1>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#work"
              className="shimmer-trigger group relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-warm-black/20 transition-colors duration-normal bg-[#0f0e0b]"
              aria-label="View work"
            >
              <span className="shimmer" />
              <svg
                className="relative z-10 text-white transition-colors duration-normal"
                width="15" height="15" viewBox="0 0 15 15"
                fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M3 7.5h9m-4-4 4 4-4 4" />
              </svg>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-warm-black">
              View Work
            </span>
          </div>
        </div>
      </div>

      {/* Desktop right stripe column */}
      <div className="hero-stripe-desktop" aria-hidden="true" />

      {/* Mobile stripe transition band */}
      <div className="hero-stripe" aria-hidden="true" />
    </section>
  );
}
