"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "Marketing Systems",
  "Search Visibility",
  "Brand Infrastructure",
  "Content Pipelines",
  "Global Demand Engines",
];

const CODE_LINES = [
  { type: "comment", text: "/// CONTENT_PIPELINE" },
  { type: "keyword", text: "public fun", rest: " generate_at_scale() {" },
  { type: "indent", text: "  let markets = ", value: '["SEA","US","EU"]' },
  { type: "indent", text: "  let lang = ", value: '["EN","ZH","ID","ES"]' },
  { type: "comment-indent", text: "  // 10× output, same team" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " publish(markets, lang);" },
  { type: "plain", text: "}" },
  { type: "blank", text: " " },
  { type: "comment", text: "/// SEO_ARCHITECTURE" },
  { type: "keyword", text: "public fun", rest: " build_organic() {" },
  { type: "indent", text: "  let clusters = analyze_gaps();" },
  { type: "comment-indent", text: "  // zero ad spend model" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " top3_ranking;" },
  { type: "plain", text: "}" },
  { type: "blank", text: " " },
  { type: "comment", text: "/// BRAND_INFRASTRUCTURE" },
  { type: "keyword", text: "public fun", rest: " localize(market: str) {" },
  { type: "indent", text: "  let tone = ", value: '"authoritative"' },
  { type: "comment-indent", text: "  // consistent across 12 markets" },
  { type: "keyword-indent", text: "  ", keyword: "return", rest: " brand_system;" },
  { type: "plain", text: "}" },
  { type: "blank", text: " " },
];

function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  const base = "font-mono text-[10px] leading-[1.9] whitespace-pre";
  switch (line.type) {
    case "comment":
      return <div className={base} style={{ color: "var(--c-sand)" }}>{line.text}</div>;
    case "comment-indent":
      return <div className={base} style={{ color: "var(--c-sand)" }}>{line.text}</div>;
    case "keyword":
      return (
        <div className={base} style={{ color: "var(--c-blue)" }}>
          {line.text}
          <span style={{ color: "var(--c-sand)" }}>{line.rest}</span>
        </div>
      );
    case "keyword-indent":
      return (
        <div className={base} style={{ color: "var(--c-sand)" }}>
          {line.text}
          <span style={{ color: "var(--c-blue)" }}>{(line as { keyword?: string }).keyword}</span>
          {(line as { rest?: string }).rest}
        </div>
      );
    case "indent":
      return (
        <div className={base} style={{ color: "var(--c-sand)" }}>
          {line.text}
          {"value" in line && line.value && (
            <span style={{ color: "var(--c-mint)" }}>{line.value}</span>
          )}
        </div>
      );
    default:
      return <div className={base} style={{ color: "var(--c-sand)" }}>{line.text}</div>;
  }
}

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 280);
      return () => clearTimeout(timeout);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen bg-mint flex items-center relative overflow-hidden"
    >
      <div className="w-full max-w-content mx-auto px-8 sm:px-14 lg:px-[5.5%] grid grid-cols-1 lg:grid-cols-2 gap-sp-10 items-center py-sp-24">

        {/* Left — title + CTA */}
        <div>
          <h1
            className="font-serif font-[300] tracking-[-0.03em] leading-[0.94] text-warm-black"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 7.5rem)" }}
          >
            Build
            <br />
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
            <br />
            for Companies
            <br />
            Going Global.
          </h1>

          <div className="mt-8 flex items-center gap-3">
            {/* Icon button — fill-wipe */}
            <a
              href="#work"
              className="fill-wipe-trigger group relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-warm-black/20 transition-colors duration-normal"
              aria-label="View work"
            >
              <span
                className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-[transform] duration-normal"
                style={{ background: "var(--c-black)", transitionTimingFunction: "var(--ease-std)" }}
              />
              <svg
                className="relative z-10 group-hover:text-mint transition-colors duration-normal"
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
        </div>

        {/* Right — code decoration */}
        <div
          className="hidden lg:block relative rounded overflow-hidden"
          style={{
            background: "rgba(15,14,11,0.06)",
            padding: "24px",
            height: "320px",
          }}
        >
          {/* Fade-out gradient at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: "80px",
              background: "linear-gradient(transparent, rgba(213,250,211,0.85))",
            }}
          />
          {/* Scrolling code block */}
          <div className="animate-code-up">
            {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
              <CodeLine key={i} line={line} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
