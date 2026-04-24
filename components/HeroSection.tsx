"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "Marketing Systems",
  "Search Visibility",
  "Brand Infrastructure",
  "Content Pipelines",
  "Demand Engines",
];

// Syntax colors adapted for cream/warm-white background (readable contrast)
const C = {
  comment: "#9d937c",  // tan — muted, readable
  keyword: "#4a7a96",  // dark blue (cream-readable version of accent-blue)
  value:   "#5d8a6e",  // dark muted green (cream-readable version of mint)
  plain:   "#3d3b34",  // ash — default code text
};

const CODE_LINES = [
  { type: "comment",        text: "/// CONTENT_PIPELINE" },
  { type: "keyword",        text: "public fun", rest: " generate_at_scale() {" },
  { type: "indent",         text: "  let markets = ", value: '["SEA","US","EU"]' },
  { type: "indent",         text: "  let lang = ", value: '["EN","ZH","ID","ES"]' },
  { type: "comment-indent", text: "  // 10× output, same team" },
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

type AnimPhase = "idle" | "exiting" | "pre-enter" | "entering";

const EASE_REVEAL = "cubic-bezier(0.76, 0, 0.24, 1)";

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animPhase, setAnimPhase] = useState<AnimPhase>("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimPhase("exiting");
      const t1 = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setAnimPhase("pre-enter");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimPhase("entering"));
        });
      }, 300);
      return () => clearTimeout(t1);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const wordStyle: React.CSSProperties = {
    display: "inline-block",
    textDecoration: "underline",
    textDecorationColor: "rgba(15,14,11,0.28)",
    textUnderlineOffset: "0.12em",
    textDecorationThickness: "2px",
    ...(animPhase === "exiting"
      ? { opacity: 0, transform: "translateY(-12px)", transition: `opacity 0.3s ${EASE_REVEAL}, transform 0.3s ${EASE_REVEAL}` }
      : animPhase === "pre-enter"
      ? { opacity: 0, transform: "translateY(12px)", transition: "none" }
      : animPhase === "entering"
      ? { opacity: 1, transform: "translateY(0)", transition: `opacity 0.4s ${EASE_REVEAL}, transform 0.4s ${EASE_REVEAL}` }
      : { opacity: 1, transform: "translateY(0)" }),
  };

  return (
    <section
      id="hero"
      className="hero-bg relative min-h-screen flex flex-col overflow-hidden"
    >

      {/* ── Code decoration — desktop only, right 40% (z-index 1, behind stripe) */}
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
            style={{
              height: "32%",
              background: "linear-gradient(transparent, #f9f9f0)",
            }}
          />
          <div className="animate-code-up">
            {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
              <CodeLine key={i} line={line} />
            ))}
          </div>
        </div>
      </div>


      {/* ── Main content (A2: mobile full-width; flex-1 to push stripe down) */}
      <div className="relative z-10 flex-1 flex items-center w-full">
      <div className="w-full px-6 pt-[60px] pb-[20px] md:max-w-content md:mx-auto md:px-14 lg:px-[5.5%] md:py-sp-24">
        {/* B1+B3: three fixed lines, 48px mobile / 90px desktop */}
        <h1 className="font-serif font-[300] tracking-[-0.03em] text-warm-black text-[48px] md:text-[90px] leading-[1.0] md:leading-[0.95]">
          <span className="block">Build</span>
          {/* Line 2: rotating word — min-height prevents collapse during animation */}
          <span className="block" style={{ minHeight: "1.05em" }}>
            <span style={wordStyle}>{WORDS[wordIndex]}</span>
          </span>
          <span className="block">across Borders.</span>
        </h1>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-3">
          <a
            href="#work"
            className="group relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-warm-black/20 transition-colors duration-normal bg-[#0f0e0b]"
            aria-label="View work"
          >
            <span
              className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-[transform] duration-normal"
              style={{
                background: "var(--c-black)",
                transitionTimingFunction: "var(--ease-std)",
              }}
            />
            <svg
              className="relative z-10 text-white transition-colors duration-normal"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 7.5h9m-4-4 4 4-4 4" />
            </svg>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-warm-black">
            View Work
          </span>
        </div>
      </div>{/* end inner content div */}
      </div>{/* end flex-1 wrapper */}

      {/* ── Desktop right stripe column (3b) ──────────────────────────── */}
      <div className="hero-stripe-desktop" aria-hidden="true" />

      {/* ── Mobile stripe transition band ──────────────────────────────── */}
      <div className="hero-stripe" aria-hidden="true" />
    </section>
  );
}
