"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  animate,
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

/* ── Easing ──────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Rotating word ───────────────────────────────── */
function RotatingWord({ word, prevWord }: { word: string; prevWord: string }) {
  const prefersRM = useReducedMotion();
  const phraseX = useMotionValue(0);
  const wipeX = useMotionValue(-9999);
  const phraseRef = useRef<HTMLSpanElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (prefersRM || word === prevWord) return;

    const fontSize = phraseRef.current
      ? parseFloat(getComputedStyle(phraseRef.current).fontSize)
      : 96;

    /* Wipe: ~1.3em wide band sweeps left to right */
    const wipeWidthPx = fontSize * 1.3;
    /* Travel far enough to clear the longest phrase at any viewport size */
    const wipeTravelPx = fontSize * 14;

    /* Reset wipe to just off the left edge before animating */
    wipeX.set(-wipeWidthPx);

    const push = fontSize * 0.42;
    const over = -fontSize * 0.018;

    const c1 = animate(
      phraseX,
      [0, push * 0.25, push * 0.7, push, over, 0],
      { times: [0, 0.32, 0.68, 0.84, 0.95, 1], duration: 0.95, ease: EASE }
    );
    const c2 = animate(
      wipeX,
      [-wipeWidthPx, wipeTravelPx],
      { duration: 0.78, ease: EASE }
    );

    return () => { c1.stop(); c2.stop(); };
  }, [word]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Reduced-motion: simple opacity crossfade only */
  if (prefersRM) {
    return (
      <span style={{ display: "inline-block", position: "relative" }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={word}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  const isInitial = word === prevWord;

  return (
    <motion.span
      ref={phraseRef}
      className="relative inline-block whitespace-pre overflow-hidden align-baseline"
      style={{ x: phraseX }}
    >
      {/* Invisible spacer — reserves LONGEST_WORD width so headline never reflows */}
      <span
        aria-hidden="true"
        className="whitespace-pre select-none"
        style={{ visibility: "hidden" }}
      >
        {LONGEST_WORD}
      </span>

      {/* Old word — clips out left → right in sync with wipe passage */}
      {!isInitial && (
        <motion.span
          key={`old-${prevWord}`}
          aria-hidden="true"
          className="absolute left-0 top-0 whitespace-pre pointer-events-none select-none"
          initial={{ clipPath: "inset(0 0% 0 0%)" }}
          animate={{ clipPath: "inset(0 0% 0 100%)" }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          {prevWord}
        </motion.span>
      )}

      {/* New word — clips in left → right, trails just behind the wipe */}
      <motion.span
        key={`new-${word}`}
        className="absolute left-0 top-0 whitespace-pre"
        style={{ zIndex: 20 }}
        initial={isInitial ? false : { clipPath: "inset(0 100% 0 0%)" }}
        animate={{ clipPath: "inset(0 0% 0 0%)" }}
        transition={
          isInitial
            ? { duration: 0 }
            : { duration: 0.72, delay: 0.08, ease: EASE }
        }
      >
        {word}
      </motion.span>

      {/* Wipe — Hero mint band sweeps across, covering the old word */}
      {!isInitial && (
        <motion.span
          key={`wipe-${word}`}
          aria-hidden="true"
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: "1.3em",
            x: wipeX,
            background: "#d5fad3",
            zIndex: 10,
          }}
        />
      )}
    </motion.span>
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
  const prevWord = WORDS[prevIndexRef.current];

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
          <h1 className="font-serif font-[300] tracking-[-0.03em] text-warm-black text-[clamp(42px,12vw,60px)] md:text-[clamp(90px,7.5vw,108px)] leading-[1.0] md:leading-[0.95]">
            <span className="block">Build</span>
            <span className="block" style={{ minHeight: "1.08em" }}>
              <RotatingWord word={word} prevWord={prevWord} />
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
