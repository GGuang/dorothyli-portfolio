"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── Data ───────────────────────────────────────── */
/*
 * Screenshot files should be placed in:
 *   web/public/cases/ai-marketing-team/
 *
 * Required filenames:
 *   ai-marketing-team-blueprint.png   — four-step design logic or team structure map
 *   agent-role-system.png             — agent roles overview or role card system
 *   local-knowledge-structure.png     — local folder structure or knowledge layer view
 *   blog-writing-workflow.png         — blog SOP, skill definition, or workflow diagram
 *   expandable-marketing-skills.png   — skills overview or expansion map
 */

const CONTEXT_KEYWORDS = [
  "AI Workflow", "Agent Roles", "Skills", "SOPs", "Templates", "References",
  "B2B Content", "Human Review",
];

const CHALLENGES = [
  {
    title: "Fragmented marketing knowledge",
    body: "Product context, brand tone, terminology, examples, SOPs, and reference materials were spread across different documents, folders, and conversations.",
  },
  {
    title: "Repetitive tasks with judgement",
    body: "Blogs, EDMs, social content, and campaign materials may look repetitive, but each task still needs judgement around accuracy, claims, tone, channel fit, and market context.",
  },
  {
    title: "AI output needed boundaries",
    body: "Without roles, skills, references, templates, and review logic, AI output can look complete but still be inaccurate, generic, or unsuitable for B2B use.",
  },
];

const STAGES = [
  {
    title: "Task",
    items: ["Blog", "Social", "EDM", "Campaign", "Research", "Sales Enablement"],
  },
  {
    title: "Agent",
    items: ["Market Researcher", "Content Creator", "Data Analyst", "Creative Designer", "Campaign Strategist"],
  },
  {
    title: "Skill",
    items: ["Blog Writer", "Social Copy", "Campaign Brief", "Data Visualisation", "Branded Deck"],
  },
  {
    title: "Knowledge Inputs",
    items: ["Context Files", "SOPs", "Templates", "References", "Best Examples"],
  },
  {
    title: "Output + Review",
    items: ["Draft Output", "Human Review", "Final Asset"],
  },
];

const OUTPUTS = [
  {
    title: "AI Marketing Team blueprint",
    label: "Blueprint",
    body: "A design logic mapped recurring marketing tasks into agent roles, skills, and a structured workflow.",
    image: "/cases/ai-marketing-team/ai-marketing-team-blueprint.png",
    imagePosition: "center center",
    imageVersion: "v3",
    imageFit: "contain" as const,
  },
  {
    title: "Agent role system",
    label: "Agent Roles",
    body: "Five agent roles map to practical functions: research, content creation, data analysis, creative support, and campaign strategy.",
    image: "/cases/ai-marketing-team/agent-role-system.png",
    imagePosition: "center top",
    imageVersion: "v1",
    imageFit: "contain" as const,
  },
  {
    title: "Local knowledge structure",
    label: "Folder System",
    body: "Folders separate context, SOPs, templates, references, agents, skills, scripts, and outputs, keeping the workflow modular and easier to maintain.",
    image: "/cases/ai-marketing-team/local-knowledge-structure.png",
    imagePosition: "center top",
    imageVersion: "v1",
    imageFit: "contain" as const,
  },
  {
    title: "Blog writing workflow",
    label: "Blog Workflow",
    body: "Blog writing became the most mature applied workflow, with a clearer SOP, skill definition, references, and repeatable structure for B2B technical content.",
    image: "/cases/ai-marketing-team/blog-writing-workflow.png",
    imagePosition: "center top",
    imageVersion: "v1",
    imageFit: "contain" as const,
  },
  {
    title: "Expandable marketing skills",
    label: "Skills",
    body: "Built to expand beyond blog writing into social copy, EDM, case studies, campaign briefs, sales enablement, and reporting.",
    image: "/cases/ai-marketing-team/expandable-marketing-skills.png",
    imagePosition: "center top",
    imageVersion: "v1",
    imageFit: "contain" as const,
  },
];

/* ─── Abstract hero diagram ──────────────────────── */
function AITeamDiagram() {
  const tasks = [
    { cy: 58,  label: "Blog" },
    { cy: 98,  label: "Social" },
    { cy: 138, label: "EDM" },
    { cy: 178, label: "Research" },
    { cy: 218, label: "Sales" },
  ];
  const collectorCy = 138;

  return (
    <svg
      viewBox="0 0 480 272"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[540px]"
      aria-hidden="true"
    >
      {/* ── Task input nodes ── */}
      {tasks.map(({ cy, label }) => (
        <g key={cy}>
          <circle
            cx={28} cy={cy} r={5.5}
            fill="rgba(15,14,11,0.06)"
            stroke="rgba(15,14,11,0.18)"
            strokeWidth="0.9"
          />
          <text
            x={28} y={cy - 11}
            textAnchor="middle"
            fontSize="7"
            fontFamily="monospace"
            fill="rgba(15,14,11,0.38)"
          >
            {label}
          </text>
          <line
            x1={34} y1={cy} x2={108} y2={collectorCy}
            stroke="rgba(15,14,11,0.10)"
            strokeWidth="0.7"
            strokeDasharray="3.5 2.5"
          />
        </g>
      ))}

      {/* ── Collector node ── */}
      <circle
        cx={108} cy={collectorCy} r={9}
        fill="rgba(15,14,11,0.07)"
        stroke="rgba(15,14,11,0.18)"
        strokeWidth="0.9"
      />
      <line
        x1={117} y1={collectorCy} x2={133} y2={collectorCy}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points={`131,${collectorCy - 3.5} 137,${collectorCy} 131,${collectorCy + 3.5}`}
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Workflow card — main focus ── */}
      <rect
        x={137} y={16} width={214} height={240} rx={4}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.12)"
        strokeWidth="1"
      />
      {/* Lavender header band */}
      <rect x={137} y={16} width={214} height={32} rx={4} fill="#cdc5e8" />
      {/* Square-off bottom corners of band */}
      <rect x={137} y={38} width={214} height={10} fill="#cdc5e8" />
      <text
        x={244} y={37}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.52)"
      >
        AI MARKETING TEAM
      </text>

      {/* Row 1 — Agent Role (highlighted) */}
      <rect
        x={150} y={60} width={188} height={38} rx={2.5}
        fill="rgba(205,197,232,0.40)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={83}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.52)"
      >
        Agent Role
      </text>

      {/* Row 2 — Skill */}
      <rect
        x={150} y={106} width={188} height={38} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={129}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Skill
      </text>

      {/* Row 3 — Knowledge */}
      <rect
        x={150} y={152} width={188} height={38} rx={2.5}
        fill="rgba(15,14,11,0.018)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={175}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.36)"
      >
        SOP / Template / Reference
      </text>

      {/* Row 4 — Draft */}
      <rect
        x={150} y={198} width={188} height={42} rx={2.5}
        fill="rgba(15,14,11,0.032)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={218}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.38)"
      >
        Draft Output
      </text>
      <rect x={196} y={226} width={96} height={9} rx={2} fill="rgba(15,14,11,0.07)" />

      {/* ── Arrow from Draft Output row → Review card ── */}
      <line
        x1={351} y1={219} x2={369} y2={219}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points="367,215.5 373,219 367,222.5"
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Review card — dark, aligned to Draft Output level ── */}
      <rect
        x={373} y={155} width={94} height={110} rx={3}
        fill="#0f0e0b"
      />
      <text
        x={420} y={176}
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="monospace"
        letterSpacing="0.10em"
        fill="rgba(249,249,240,0.32)"
      >
        REVIEW
      </text>
      <line
        x1={382} y1={185} x2={458} y2={185}
        stroke="rgba(249,249,240,0.07)"
        strokeWidth="0.6"
      />
      {["Human Review", "Final Asset"].map((t, i) => (
        <text
          key={t}
          x={420} y={202 + i * 20}
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="monospace"
          fill="rgba(249,249,240,0.62)"
        >
          {t}
        </text>
      ))}
      <text
        x={420} y={248}
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        fill="rgba(249,249,240,0.28)"
      >
        approved
      </text>
    </svg>
  );
}

/* ─── System flow diagram — 5 stages ────────────── */
function SystemDiagram() {
  return (
    <div className="w-full border border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-ink/08">
        {STAGES.map((stage, i) => (
          <div key={i} className="relative p-5 lg:p-7 bg-surface-100">
            <p className="font-mono text-[8px] text-ink/22 mb-4 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="font-serif font-[400] text-[14px] lg:text-[15px] leading-snug tracking-tight text-ink mb-4">
              {stage.title}
            </h4>
            <ul className="space-y-2">
              {stage.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[5px] w-[5px] h-[1px] bg-ink/25 flex-none" />
                  <span className="font-sans text-[12px] leading-snug text-ink/58">{item}</span>
                </li>
              ))}
            </ul>
            {i < STAGES.length - 1 && (
              <div className="hidden md:flex absolute -right-[13px] top-1/2 -translate-y-1/2 z-10 w-[26px] h-[26px] items-center justify-center bg-surface-100 rounded-full border border-ink/10">
                <span className="text-ink/28 text-[10px] leading-none">›</span>
              </div>
            )}
            {i < STAGES.length - 1 && (
              <div className="md:hidden flex justify-center pt-5 pb-1">
                <span className="font-mono text-[10px] text-ink/18">↓</span>
              </div>
            )}
            <span
              className="absolute bottom-4 right-4 font-serif font-[300] leading-none select-none pointer-events-none"
              style={{ fontSize: "44px", color: "rgba(15,14,11,0.03)" }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mac-style browser mockup ───────────────────── */
function BrowserMockup({
  src, alt, title, label, imagePosition = "center top", imageFit = "cover",
}: {
  src: string; alt: string; title: string; label: string; imagePosition?: string; imageFit?: "cover" | "contain";
}) {
  const [err, setErr] = useState(false);

  return (
    <div
      className="rounded-lg border border-black/10 overflow-hidden mb-5"
      style={{ boxShadow: "0 12px 30px rgba(20,20,20,0.08), 0 2px 6px rgba(20,20,20,0.04)" }}
    >
      <div
        className="flex items-center gap-0 px-3 border-b border-black/[0.06]"
        style={{ height: "32px", background: "#f3f0e6" }}
      >
        <div className="flex items-center gap-[5px] flex-none">
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#e8847a" }} />
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#e8c47a" }} />
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#7ac87a" }} />
        </div>
        <div className="flex-1 flex justify-center pr-8">
          <span
            className="font-mono text-[8px] uppercase tracking-[0.10em] px-3 py-[3px] rounded-full"
            style={{ color: "rgba(15,14,11,0.30)", background: "rgba(15,14,11,0.06)" }}
          >
            {label}
          </span>
        </div>
      </div>

      <div className="aspect-[16/10] relative overflow-hidden" style={{ background: "#f7f5ee" }}>
        {!err ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: imageFit, objectPosition: imagePosition }}
            onError={() => setErr(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <div className="w-full max-w-[100px] space-y-[5px]">
              {[100, 62, 78, 46, 68].map((w, i) => (
                <div key={i} className="h-[2px] rounded-full" style={{ width: `${w}%`, background: "rgba(15,14,11,0.10)" }} />
              ))}
            </div>
            <span className="font-mono text-[7px] uppercase tracking-[0.13em]" style={{ color: "rgba(15,14,11,0.25)" }}>
              Screenshot placeholder
            </span>
            <span className="font-mono text-[8px] text-center leading-snug max-w-[120px]" style={{ color: "rgba(15,14,11,0.35)" }}>
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Output card ────────────────────────────────── */
function OutputCard({
  title, label, body, image, index, imagePosition, imageVersion, imageFit,
}: {
  title: string; label: string; body: string; image: string;
  index: number; imagePosition?: string; imageVersion?: string; imageFit?: "cover" | "contain";
}) {
  const src = imageVersion ? `${image}?${imageVersion}` : image;

  return (
    <article className="flex flex-col">
      <BrowserMockup src={src} alt={title} title={title} label={label} imagePosition={imagePosition} imageFit={imageFit} />
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/30 mb-2">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-serif font-[400] text-[18px] lg:text-[20px] leading-snug tracking-tight text-ink mb-2.5">
        {title}
      </h3>
      <p className="font-sans text-[13px] lg:text-[14px] leading-[1.68] text-ink/62">
        {body}
      </p>
    </article>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function AIMarketingTeamPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ── 1. Case Hero ────────────────────────── */}
        <section className="bg-mint">
          <div className="px-6 lg:px-14 xl:px-[5.5vw] pt-[80px] pb-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[54%_46%] gap-10 lg:gap-12 items-center">

              {/* Left — text */}
              <div className="pt-10 lg:pt-14">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-ink/40 mb-8 lg:mb-10">
                  Case 05 / AI Marketing Team
                </p>

                <h1
                  className="font-serif font-[300] text-ink leading-[1.02] tracking-[-0.03em] mb-5"
                  style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
                >
                  AI Marketing Team
                </h1>

                <p
                  className="font-serif font-[400] text-ink/68 leading-[1.32] tracking-[-0.01em] mb-10 max-w-[480px]"
                  style={{ fontSize: "clamp(16px, 1.9vw, 22px)" }}
                >
                  Turning recurring marketing work into agent-assisted workflows.
                </p>

                {/* Meta */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-7 max-w-[420px]">
                  {([
                    ["Project",  "Independent Practice / POCSTARS"],
                    ["Period",   "2025–2026"],
                    ["Role",     "Workflow Designer / Global Marketing Manager"],
                    ["Focus",    "AI workflows, agent roles, skills, SOPs, references, templates, human review"],
                  ] as const).map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[7.5px] uppercase tracking-[0.13em] text-ink/32 mb-[3px]">
                        {label}
                      </dt>
                      <dd className="font-sans text-[12.5px] text-ink/70 leading-snug">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right — abstract diagram */}
              <div className="flex items-center justify-center lg:justify-start">
                <AITeamDiagram />
              </div>

            </div>
          </div>

          {/* Bottom edge rule */}
          <div className="h-px bg-ink/08" />
        </section>

        {/* ── 2. Context ──────────────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <div className="max-w-[860px]">
            <p className="section-label mb-8 lg:mb-12">01 / Context</p>

            <h2
              className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
            >
              AI needs structure before it can support marketing work.
            </h2>

            <p className="font-sans text-[15px] lg:text-[16px] leading-[1.72] text-ink/70 mb-10 max-w-[620px]">
              In lean B2B marketing, recurring tasks from blogs to campaign briefs need to be produced
              quickly but still require judgement. The challenge was not faster drafting but building
              a workflow structure that preserves context, terminology, and review quality.
            </p>

            {/* Keyword cluster */}
            <div className="flex flex-wrap gap-2">
              {CONTEXT_KEYWORDS.map(kw => (
                <span
                  key={kw}
                  className="font-mono text-[8.5px] uppercase tracking-[0.10em] text-ink/52 px-3 py-[5px] border border-ink/14 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Challenge ────────────────────────── */}
        <section className="bg-surface-200 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <p className="section-label mb-8 lg:mb-12">02 / Challenge</p>

          <h2
            className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-12 lg:mb-16 max-w-[640px]"
            style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            Why one-off prompting was not enough.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {CHALLENGES.map((c, i) => (
              <article
                key={i}
                className="bg-surface-100 border border-ink/09 p-6 lg:p-8 flex flex-col"
              >
                <p className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-ink/25 mb-5">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif font-[400] text-[16px] lg:text-[17px] leading-snug tracking-tight text-ink mb-3">
                  {c.title}
                </h3>
                <p className="font-sans text-[13px] lg:text-[13.5px] leading-[1.68] text-ink/60">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 4. System Built ─────────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <p className="section-label mb-8 lg:mb-12">03 / System Built</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <h2
              className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
            >
              A local AI Marketing Team built around roles, skills, and knowledge layers.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The system separates marketing work into layers: tasks are mapped to agent roles, agents
              call relevant skills, skills are supported by SOPs, templates, references, and context
              files, and final output remains subject to human review.
            </p>
          </div>

          <SystemDiagram />
        </section>

        {/* ── 5. Output ───────────────────────────── */}
        <section className="bg-surface-200 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <p className="section-label mb-8 lg:mb-12">04 / Output</p>

          <h2
            className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-6 max-w-[520px]"
            style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            Selected workflow artefacts.
          </h2>

          <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[600px] mb-12 lg:mb-16">
            A local folder-based workflow separating tasks, agents, skills, SOPs, templates,
            references, and outputs so recurring marketing work is easier to brief, reproduce, and review.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {OUTPUTS.map((output, i) => (
              <OutputCard key={i} {...output} index={i} />
            ))}
          </div>
        </section>

        {/* ── 6. Impact ───────────────────────────── */}
        <section className="bg-surface-400 px-6 lg:px-14 xl:px-[5.5vw] py-16 lg:py-24">
          <div className="max-w-[720px]">
            <p className="section-label mb-8">05 / Impact</p>
            <h2
              className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
            >
              Making AI usable inside real marketing work.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/70">
              The system turned AI from a one-off drafting tool into a more controlled workflow layer,
              making recurring marketing work easier to brief, reproduce, and adapt, while final
              judgement remained human-led.
            </p>
          </div>
        </section>

        {/* ── Bottom navigation ───────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <Link
              href="/cases/content-at-scale"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>←</span>
              <span>Previous: Content at Scale</span>
            </Link>

            <Link
              href="/#cases"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>Back to Selected Systems</span>
              <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
