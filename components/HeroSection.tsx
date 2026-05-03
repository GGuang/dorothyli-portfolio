"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, animate } from "framer-motion";

const WORDS = [
  "Product Narratives",
  "Content Engines",
  "Search Visibility",
  "Sales Enablement",
  "Demand Pathways",
  "Marketing Systems",
];

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

/* ── Rotating word — slot replacement ───────────── */
function RotatingWord({ word, prevWord }: { word: string; prevWord: string }) {
  const prefersRM = useReducedMotion();
  const phraseX = useMotionValue("0em");
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (prefersRM || word === prevWord) return;

    /*
     * Starts at 0em (phrase aligned), drifts right while chars replace,
     * then snaps back. Leading gap appears naturally from the drift —
     * there is no pre-offset at the start.
     */
    const ctrl = animate(
      phraseX,
      ["0em", "0.16em", "0.38em", "0.72em", "0.88em", "-0.04em", "0em"],
      {
        times: [0, 0.18, 0.42, 0.68, 0.82, 0.94, 1],
        duration: 1.1,
        ease: EASE,
      }
    );
    return () => ctrl.stop();
  }, [word]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Reduced-motion: simple crossfade, no push */
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

  const numSlots = Math.max(word.length, prevWord.length);

  return (
    /*
     * Phrase-level motion wrapper — phraseX drives both chars and underline
     * so the underline tracks the rightward push and snap-back.
     */
    <motion.span
      style={{
        x: phraseX,
        display: "inline-block",
        position: "relative",
        paddingBottom: "0.05em",
      }}
    >
      {/* Character slots */}
      <span style={{ display: "inline-flex", whiteSpace: "pre" }}>
        {Array.from({ length: numSlots }, (_, i) => {
          const nc = i < word.length ? word[i] : null;
          const oc = i < prevWord.length ? prevWord[i] : null;
          const changed = nc !== oc;
          const delay = i * 0.035;

          return (
            <span key={i} style={{ display: "inline-block", position: "relative" }}>
              {/*
               * Width reference uses the incoming char so the layout width
               * reflects the new word immediately. Trailing exit-only slots
               * (nc=null) are 0-width; their old chars exit from absolute pos.
               */}
              <span aria-hidden style={{ visibility: "hidden", userSelect: "none" }}>
                {nc !== null ? (nc === " " ? " " : nc) : ""}
              </span>

              {/*
               * Old char uses animate (not exit) so it fires immediately on
               * mount, not 2.8 s later when prevWord changes on the next tick.
               */}
              {changed && oc !== null && (
                <motion.span
                  key={`old-${i}-${prevWord}`}
                  style={{ position: "absolute", left: 0, top: 0, display: "inline-block" }}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.22, delay, ease: "easeIn" }}
                >
                  {oc === " " ? " " : oc}
                </motion.span>
              )}

              {/* New char enters from left, overlapping with old during replacement */}
              {nc !== null && (
                <motion.span
                  /*
                   * Unchanged chars keep key=stable-${i} so React does not
                   * remount them. Changed chars get a word-scoped key to
                   * trigger a fresh enter animation each cycle.
                   */
                  key={changed ? `new-${i}-${word}` : `stable-${i}`}
                  style={{ position: "absolute", left: 0, top: 0, display: "inline-block" }}
                  initial={changed ? { opacity: 0, x: -4 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={changed ? { duration: 0.28, delay, ease: EASE } : { duration: 0 }}
                >
                  {nc === " " ? " " : nc}
                </motion.span>
              )}
            </span>
          );
        })}
      </span>

      {/* Underline — inside phrase motion wrapper so it moves with phraseX */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          background: "rgba(15,14,11,0.28)",
        }}
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
