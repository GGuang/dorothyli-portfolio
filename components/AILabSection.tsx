"use client";

import Link from "next/link";

const ENTRIES = [
  {
    id: "01",
    meta: "AI WORKFLOW · POCSTARS",
    title: "AI Marketing Team",
    description:
      "Agent-based workflow design for repeatable B2B marketing tasks, including content planning, SOP-based execution, references, and review logic.",
    href: "#",
  },
  {
    id: "02",
    meta: "AUTOMATION · N8N",
    title: "Automation Workflows",
    description:
      "n8n-assisted workflows for content review, publishing support, notifications, and lightweight marketing operations.",
    href: "#",
  },
  {
    id: "03",
    meta: "AI BUILD · DOROTHYLI.ME",
    title: "This Portfolio",
    description:
      "An AI-assisted portfolio build, using visual extraction, structured prompts, Claude Code, and iterative design judgment to turn positioning into a working site.",
    href: "#",
  },
] as const;

type Entry = (typeof ENTRIES)[number];

function LabEntryRow({ entry }: { entry: Entry }) {
  return (
    <Link
      href={entry.href}
      className="group block py-10 lg:py-11 border-b border-ink/10 last:border-b-0 hover:border-ink/25 active:border-ink/25 hover:bg-ink/[0.025] active:bg-ink/[0.035] focus-visible:border-ink/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30 focus-visible:ring-offset-4 outline-none transition-all duration-300 ease-out -mx-4 px-4 lg:-mx-6 lg:px-6"
      aria-label={`View experiment: ${entry.title}`}
    >
      <div className="flex items-baseline justify-between gap-6 mb-5">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/45 group-hover:text-ink/65 group-active:text-ink/65 transition-colors duration-300">
          {entry.meta}
        </p>
        <span className="font-mono text-[12px] lg:text-[10px] tracking-[0.12em] lg:tracking-[0.08em] text-ink/65 group-hover:text-ink/90 group-active:text-ink/90 whitespace-nowrap flex-none transition-colors duration-300">
          View experiment{" "}
          <span className="inline-block translate-x-0 group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300 ease-out">
            →
          </span>
        </span>
      </div>
      <h3
        className="font-serif font-[400] leading-[1.05] tracking-[-0.02em] text-ink/85 group-hover:text-ink group-active:text-ink group-hover:translate-x-1 group-active:translate-x-1 mb-4 transition-[color,transform] duration-300 ease-out"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.125rem)" }}
      >
        {entry.title}
      </h3>
      <p className="font-sans text-[15px] lg:text-[16px] leading-[1.6] text-ink/65 group-hover:text-ink/78 group-active:text-ink/78 max-w-[540px] transition-colors duration-300">
        {entry.description}
      </p>
    </Link>
  );
}

/* ── Stripe band ──────────────────────────────────── */

function StripeBand() {
  return (
    <div
      aria-hidden="true"
      className="ai-lab-stripe relative w-full h-[96px] lg:h-[240px] flex-none overflow-hidden"
    >
      {/* Desktop: large arc — circle extends above/below band, overflow-hidden clips it.
          At band bottom the visible chord is ~760px wide — bold graphic presence. */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          width: "820px",
          height: "820px",
          borderRadius: "50%",
          background: "#C9E9F9",
          mixBlendMode: "difference",
          bottom: "-560px",
          left: "calc(44% - 410px)",
        }}
      />
      {/* Desktop: accent circle — lower-left, showing top arc */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "#C9E9F9",
          mixBlendMode: "difference",
          bottom: "-100px",
          left: "8%",
        }}
      />
      {/* Mobile: single centred arc */}
      <div
        className="lg:hidden"
        style={{
          position: "absolute",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "#C9E9F9",
          mixBlendMode: "difference",
          bottom: "-165px",
          left: "calc(50% - 120px)",
        }}
      />
    </div>
  );
}

const WORKFLOW_SNIPPET = `prompt    → reference
reference → draft
draft     → review
review    → refine
refine    → publish

input     → analyse
analyse   → plan
plan      → output
output    → iterate

observe   → decide
decide    → act
act       → verify
verify    → iterate`;

export function AILabSection() {
  return (
    <section
      id="ai-lab"
      className="relative z-50 bg-surface-400 flex flex-col"
      style={{ minHeight: "105vh" }}
    >
      {/* Decorative workflow snippet — behind right entries column */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 right-0 overflow-hidden pointer-events-none"
        style={{ width: "55%", opacity: 0.09 }}
      >
        <pre
          className="absolute font-mono text-[11px] leading-[2.2] text-ink select-none"
          style={{ top: "18%", right: "8%" }}
        >
          {WORKFLOW_SNIPPET}
        </pre>
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 px-6 lg:px-14 xl:px-[5.5vw] pt-[120px] lg:pt-[150px] pb-[80px] lg:pb-[110px]">
        <div className="lg:flex lg:gap-[8vw] xl:gap-[9vw] lg:items-start">

          {/* Left — label, heading, intro */}
          <div className="lg:w-[40%] xl:w-[38%] lg:flex-none mb-14 lg:mb-0 lg:sticky lg:top-24">
            <p className="font-mono text-xs tracking-widest uppercase text-ink/55 mb-10 lg:mb-14">
              {"// 06 — AI LAB"}
            </p>
            <h2
              className="font-serif font-[400] tracking-tight leading-[0.95] text-ink max-w-[580px] lg:max-w-[640px] mb-7"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              Built with AI, guided by marketing judgment.
            </h2>
            <p className="font-sans font-[400] text-[16px] lg:text-[18px] leading-[1.6] text-ink/80 max-w-[480px] lg:max-w-[520px]">
              Selected experiments in agent workflows, automation, and
              AI-assisted content systems, built to make marketing work faster,
              clearer, and more repeatable.
            </p>
          </div>

          {/* Right — lab entries */}
          <div className="lg:flex-1 border-t border-ink/15">
            {ENTRIES.map((entry) => (
              <LabEntryRow key={entry.id} entry={entry} />
            ))}
          </div>

        </div>
      </div>

      {/* Bottom stripe band */}
      <StripeBand />
    </section>
  );
}
