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

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const id = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 280);
      return () => clearTimeout(id);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Mobile layout (hidden md+) ─────────────────────────────── */}
      <div className="flex flex-col min-h-screen md:hidden">
        {/* Upper mint panel — title + CTA */}
        <div className="flex-1 bg-[#d5fad3] px-8 pt-20 pb-10 flex flex-col justify-center relative">
          <h1
            className="font-serif font-[300] tracking-[-0.03em] leading-[0.94] text-[#0f0e0b]"
            style={{ fontSize: "clamp(2.75rem, 13vw, 3.5rem)" }}
          >
            <span className="block">
              Build{" "}
              <span
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(15,14,11,0.28)",
                  textUnderlineOffset: "0.12em",
                  textDecorationThickness: "2px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 0.28s ease, transform 0.28s ease",
                }}
              >
                {WORDS[wordIndex]}
              </span>
            </span>
            <span className="block">for Companies Going Global.</span>
          </h1>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#work"
              className="group relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#0f0e0b]/20 transition-colors duration-normal"
              aria-label="View work"
            >
              <span
                className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-[transform] duration-normal"
                style={{ background: "#0f0e0b", transitionTimingFunction: "var(--ease-std)" }}
              />
              <svg
                className="relative z-10 group-hover:text-[#d5fad3] transition-colors duration-normal"
                width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M3 7.5h9m-4-4 4 4-4 4" />
              </svg>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-[#0f0e0b]">
              View Work
            </span>
          </div>

          {/* Orange accent dot */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{ width: "8px", height: "8px", borderRadius: "9999px", background: "#E8754E", left: "32px", bottom: "28px" }}
          />
        </div>

        {/* Lower stripe panel */}
        <div
          aria-hidden="true"
          className="shrink-0"
          style={{
            height: "38vh",
            background: "repeating-linear-gradient(to right, #0f0e0b 0, #0f0e0b 9px, #f9f9f0 9px, #f9f9f0 18px)",
          }}
        />
      </div>

      {/* ── Desktop layout (hidden below md) ──────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen items-center overflow-hidden hidden md:flex"
        style={{ background: "linear-gradient(to right, #d5fad3 65%, #f9f9f0 65%)" }}
      >
        {/* Stripe block — top-right of cream panel, below navbar */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute"
          style={{
            top: "72px",
            right: "32px",
            width: "180px",
            height: "180px",
            background: "repeating-linear-gradient(to right, #0f0e0b 0, #0f0e0b 9px, #f9f9f0 9px, #f9f9f0 18px)",
          }}
        />

        {/* Code decoration — sits cleanly on the cream panel */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{ width: "35%" }}
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

        {/* Orange accent dot */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute"
          style={{ width: "10px", height: "10px", borderRadius: "9999px", background: "#E8754E", left: "5.5vw", bottom: "33%" }}
        />

        {/* Main content — left panel */}
        <div className="relative z-10 w-full max-w-content mx-auto px-8 sm:px-14 lg:px-[5.5%] py-sp-24">
          <h1
            className="font-serif font-[300] tracking-[-0.03em] leading-[0.94] text-warm-black"
            style={{ fontSize: "clamp(2.5rem, 5.8vw, 5.75rem)" }}
          >
            <span className="block lg:whitespace-nowrap">
              Build{" "}
              <span
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(15,14,11,0.28)",
                  textUnderlineOffset: "0.12em",
                  textDecorationThickness: "2px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 0.28s ease, transform 0.28s ease",
                }}
              >
                {WORDS[wordIndex]}
              </span>
            </span>
            <span className="block lg:whitespace-nowrap">for Companies Going Global.</span>
          </h1>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#work"
              className="group relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-warm-black/20 transition-colors duration-normal"
              aria-label="View work"
            >
              <span
                className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-[transform] duration-normal"
                style={{ background: "var(--c-black)", transitionTimingFunction: "var(--ease-std)" }}
              />
              <svg
                className="relative z-10 group-hover:text-[#d5fad3] transition-colors duration-normal"
                width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M3 7.5h9m-4-4 4 4-4 4" />
              </svg>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-warm-black">
              View Work
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
