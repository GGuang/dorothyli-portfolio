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

/* Longest word by character count — used as the invisible layout spacer
   so the headline never reflows as words rotate.                         */
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
  /*
   * Numeric px MotionValue. String em keyframes are unreliable in framer-motion's
   * imperative animate(); font-size is read from the DOM so pixel values
   * correctly represent the intended em fractions at every viewport size.
   */
  const phraseX = useMotionValue(0);
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

    const push = fontSize * 0.65;
    const over = -fontSize * 0.035;

    /*
     * x starts at 0 (phrase fully aligned). Drifts right during the handoff,
     * peaks just as the last char settles, then snaps back and rests at 0.
     * The leading gap is a consequence of the drift — no pre-offset at start.
     */
    const ctrl = animate(
      phraseX,
      [0, push * 0.25, push * 0.55, push, over, 0],
      {
        times: [0, 0.28, 0.58, 0.82, 0.94, 1],
        duration: 1.1,
        ease: EASE,
      }
    );
    return () => ctrl.stop();
  }, [word]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Reduced-motion: plain opacity crossfade, no push */
  if (prefersRM) {
    return (
      <span
        style={{
          display: "inline-block",
          position: "relative",
          borderBottom: "2px solid rgba(15,14,11,0.28)",
          paddingBottom: "0.05em",
        }}
      >
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

  /* True only on the very first render before any word has cycled */
  const isInitial = word === prevWord;

  return (
    /*
     * phraseX wrapper — both word layers and the underline live here so they
     * all translate together during the rightward push and snap-back.
     */
    <motion.span
      ref={phraseRef}
      className="relative inline-block"
      style={{ x: phraseX, paddingBottom: "0.05em" }}
    >
      {/*
       * Invisible layout spacer: always renders LONGEST_WORD so the wrapper
       * width is stable and the headline never reflows between rotations.
       */}
      <span
        aria-hidden="true"
        className="whitespace-pre select-none"
        style={{ visibility: "hidden" }}
      >
        {LONGEST_WORD}
      </span>

      {/*
       * OUTGOING word layer — absolute, same origin as spacer.
       * Chars animate to opacity 0 via the animate prop (not exit), so they
       * start fading immediately on mount rather than waiting for the next
       * word change. Key tied to prevWord forces a fresh mount each cycle.
       */}
      {!isInitial && (
        <span
          key={`out-${prevWord}`}
          aria-hidden="true"
          className="absolute left-0 top-0 whitespace-pre pointer-events-none select-none"
        >
          {prevWord.split("").map((char, i) => (
            <motion.span
              key={`o-${i}-${prevWord}`}
              className="inline-block"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.26, delay: i * 0.03, ease: "easeIn" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </span>
      )}

      {/*
       * INCOMING word layer — absolute, same origin as spacer.
       * Key tied to word forces a fresh mount each cycle. When this span
       * remounts, the outgoing layer simultaneously mounts at full opacity,
       * so the word is never blank between cycles.
       * On the very first render (isInitial) chars appear with no animation.
       */}
      <span
        key={`in-${word}`}
        className="absolute left-0 top-0 whitespace-pre"
      >
        {word.split("").map((char, i) => (
          <motion.span
            key={`n-${i}-${word}`}
            className="inline-block"
            initial={isInitial ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              isInitial
                ? { duration: 0 }
                /* +0.06 s after the matching outgoing char starts exiting */
                : { duration: 0.32, delay: i * 0.03 + 0.06, ease: EASE }
            }
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>

      {/* Underline — inside phraseX wrapper, moves with text */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0"
        style={{ height: "2px", background: "rgba(15,14,11,0.28)" }}
      />
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
