"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── Data ───────────────────────────────────────── */
/*
 * Screenshot files should be placed in:
 *   web/public/cases/answer-ready-visibility/
 *
 * Required filenames:
 *   mcx-product-page.png        — MCX product or solution page structured content
 *   supporting-blog-content.png — Blog page answering buyer questions / technical concepts
 *   blog-writing-sop.png        — Blog Writing SOP document or outline
 *   blog-writer-skill.png       — Blog Writer Skill / AI-assisted execution layer
 *   search-ai-evidence.png      — Search result or AI Overview screenshot evidence
 */

const CONTEXT_KEYWORDS = [
  "MCX", "MCPTT", "Mission Critical Services", "Technical Content",
  "Search Visibility", "AI Overview", "Buyer Questions",
];

const CHALLENGES = [
  {
    title: "Technical language",
    body: "Product and standards-related terms needed clearer explanations for non-specialist business readers.",
  },
  {
    title: "Search intent gaps",
    body: "Buyers were likely to search through questions, comparisons, and category terms, not only through product names.",
  },
  {
    title: "Accuracy without overclaiming",
    body: "The content had to explain product value and technical context clearly while avoiding unsupported capability claims.",
  },
];

const STAGES = [
  {
    title: "Buyer Question",
    items: ["What is MCX?", "What is MCPTT?", "How does the solution fit my use case?"],
  },
  {
    title: "Structured Answer",
    items: ["Definition", "Technical Context", "Use Case", "Product Fit"],
  },
  {
    title: "Page Architecture",
    items: ["Core Page", "FAQ", "Internal Links", "CTA"],
  },
  {
    title: "Visibility Path",
    items: ["Google Search", "AI Overview", "Sales Enquiry"],
  },
];

const OUTPUTS = [
  {
    title: "Core product page",
    label: "Product Page",
    body: "MCX-related product content was structured around definitions, technical context, use cases, product fit, and enquiry paths.",
    image: "/cases/answer-ready-visibility/mcx-product-page.png",
    imagePosition: "center top",
  },
  {
    title: "Supporting blog content",
    label: "Blog Content",
    body: "Blog pages were used to answer related buyer questions, explain technical concepts, and connect search intent back to relevant product pages.",
    image: "/cases/answer-ready-visibility/supporting-blog-content.png",
    imagePosition: "center top",
  },
  {
    title: "Blog Writing SOP",
    label: "SOP",
    body: "The SOP defined a repeatable structure for technical blog content, including answer-first summaries, topic framing, terminology handling, metadata, and review preparation.",
    image: "/cases/answer-ready-visibility/blog-writing-sop.png",
    imagePosition: "center top",
  },
  {
    title: "Blog Writer Skill",
    label: "Skill",
    body: "The blog writer skill translated the SOP, references, and templates into an AI-assisted execution layer for drafting more consistent B2B technical content.",
    image: "/cases/answer-ready-visibility/blog-writer-skill.png",
    imagePosition: "center top",
  },
  {
    title: "Search and AI visibility evidence",
    label: "Visibility",
    body: "Search result and AI Overview screenshots were used as evidence that selected technical content became more visible in active research scenarios.",
    image: "/cases/answer-ready-visibility/search-ai-evidence.png",
    imagePosition: "center top",
  },
];

/* ─── Abstract hero diagram ──────────────────────── */
function VisibilityDiagram() {
  const questions = [
    { cy: 62,  label: "What is MCX?"    },
    { cy: 102, label: "How MCX works?"  },
    { cy: 142, label: "MCPTT / MCDATA"  },
    { cy: 182, label: "Vendor eval"     },
  ];
  const collectorCy = 122; // midpoint of question chips

  return (
    <svg
      viewBox="0 0 480 252"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[540px]"
      aria-hidden="true"
    >
      {/* ── Question chips — left ── */}
      {questions.map(({ cy, label }) => (
        <g key={cy}>
          <rect
            x={6} y={cy - 11} width={92} height={22} rx={3}
            fill="rgba(15,14,11,0.04)"
            stroke="rgba(15,14,11,0.14)"
            strokeWidth="0.8"
          />
          <text
            x={52} y={cy + 4}
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="monospace"
            fill="rgba(15,14,11,0.42)"
          >
            {label}
          </text>
          {/* Dashed line to collector */}
          <line
            x1={98} y1={cy} x2={116} y2={collectorCy}
            stroke="rgba(15,14,11,0.10)"
            strokeWidth="0.7"
            strokeDasharray="3.5 2.5"
          />
        </g>
      ))}

      {/* ── Collector node ── */}
      <circle
        cx={116} cy={collectorCy} r={8}
        fill="rgba(15,14,11,0.06)"
        stroke="rgba(15,14,11,0.18)"
        strokeWidth="0.9"
      />
      {/* Arrow into content card */}
      <line
        x1={124} y1={collectorCy} x2={140} y2={collectorCy}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points={`138,${collectorCy - 3.5} 144,${collectorCy} 138,${collectorCy + 3.5}`}
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Content card — main focus ── */}
      <rect
        x={144} y={18} width={200} height={216} rx={4}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.12)"
        strokeWidth="1"
      />
      {/* Blue header band — #badbee */}
      <rect x={144} y={18} width={200} height={30} rx={4} fill="#badbee" />
      <rect x={144} y={38} width={200} height={10} fill="#badbee" />
      <text
        x={244} y={38}
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.55)"
      >
        STRUCTURED CONTENT
      </text>

      {/* Row 1 — Definition (highlighted) */}
      <rect
        x={157} y={62} width={174} height={38} rx={2.5}
        fill="rgba(186,219,238,0.42)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={85}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.52)"
      >
        Definition
      </text>

      {/* Row 2 — Use Case */}
      <rect
        x={157} y={108} width={174} height={38} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={131}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Use Case
      </text>

      {/* Row 3 — Product Context */}
      <rect
        x={157} y={154} width={174} height={38} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={177}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Product Context
      </text>

      {/* Row 4 — FAQ / CTA */}
      <rect
        x={157} y={200} width={174} height={26} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={217}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.38)"
      >
        FAQ &amp; CTA
      </text>

      {/* ── Arrow out → Visibility card ── */}
      <line
        x1={344} y1={126} x2={362} y2={126}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points="360,122.5 366,126 360,129.5"
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Visibility card — dark ── */}
      <rect
        x={366} y={68} width={104} height={116} rx={3}
        fill="#0f0e0b"
      />
      <text
        x={418} y={90}
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="0.10em"
        fill="rgba(249,249,240,0.32)"
      >
        VISIBILITY
      </text>
      {/* Separator */}
      <line
        x1={376} y1={98} x2={460} y2={98}
        stroke="rgba(249,249,240,0.07)"
        strokeWidth="0.6"
      />
      {["AI Overview", "Page 1", "Enquiry"].map((t, i) => (
        <text
          key={t}
          x={418} y={116 + i * 20}
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="monospace"
          fill="rgba(249,249,240,0.62)"
        >
          {t}
        </text>
      ))}
    </svg>
  );
}

/* ─── System flow diagram ────────────────────────── */
function SystemDiagram() {
  return (
    <div className="w-full border border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/08">
        {STAGES.map((stage, i) => (
          <div key={i} className="relative p-6 lg:p-8 bg-surface-100">
            <p className="font-mono text-[8px] text-ink/22 mb-4 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="font-serif font-[400] text-[15px] lg:text-[16px] leading-snug tracking-tight text-ink mb-5">
              {stage.title}
            </h4>
            <ul className="space-y-2.5">
              {stage.items.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[5px] w-[5px] h-[1px] bg-ink/25 flex-none" />
                  <span className="font-sans text-[13px] leading-snug text-ink/58">{item}</span>
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
              className="absolute bottom-4 right-5 font-serif font-[300] leading-none select-none pointer-events-none"
              style={{ fontSize: "52px", color: "rgba(15,14,11,0.03)" }}
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
  src, alt, title, label, imagePosition = "center top",
}: {
  src: string; alt: string; title: string; label: string; imagePosition?: string;
}) {
  const [err, setErr] = useState(false);

  return (
    <div
      className="rounded-lg border border-black/10 overflow-hidden mb-5"
      style={{ boxShadow: "0 12px 30px rgba(20,20,20,0.08), 0 2px 6px rgba(20,20,20,0.04)" }}
    >
      {/* Top bar */}
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

      {/* Viewport */}
      <div className="aspect-[16/10] relative overflow-hidden" style={{ background: "#f7f5ee" }}>
        {!err ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: imagePosition }}
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
  title, label, body, image, index, imagePosition, imageVersion,
}: {
  title: string; label: string; body: string; image: string;
  index: number; imagePosition?: string; imageVersion?: string;
}) {
  const src = imageVersion ? `${image}?${imageVersion}` : image;

  return (
    <article className="flex flex-col">
      <BrowserMockup src={src} alt={title} title={title} label={label} imagePosition={imagePosition} />
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
export default function AnswerReadyVisibilityPage() {
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
                  Case 02 / Answer-Ready B2B Visibility
                </p>

                <h1
                  className="font-serif font-[300] text-ink leading-[1.02] tracking-[-0.03em] mb-5"
                  style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
                >
                  Answer-Ready B2B Visibility
                </h1>

                <p
                  className="font-serif font-[400] text-ink/68 leading-[1.32] tracking-[-0.01em] mb-10 max-w-[480px]"
                  style={{ fontSize: "clamp(16px, 1.9vw, 22px)" }}
                >
                  Structuring technical product content for search and AI-assisted discovery.
                </p>

                {/* Meta */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-7 max-w-[420px]">
                  {([
                    ["Company", "POCSTARS"],
                    ["Year",    "2025–2026"],
                    ["Role",    "Global Marketing Manager"],
                    ["Focus",   "Technical content, search visibility, AI Overview, product pages, buyer questions"],
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
                <VisibilityDiagram />
              </div>

            </div>
          </div>
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
              Technical products need to be findable before they can be evaluated.
            </h2>

            <p className="font-sans text-[15px] lg:text-[16px] leading-[1.72] text-ink/70 mb-10 max-w-[620px]">
              MCX and mission-critical communications are technical B2B categories. Potential buyers
              may search for definitions, standards, use cases, vendor options, and solution fit before
              contacting sales. The content needed to support both human understanding and search-based
              discovery.
            </p>

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
            What made the content difficult to discover and understand?
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
              An answer-ready content structure.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The work focused on turning technical product information into structured content that
              could answer buyer questions, support search visibility, and connect readers to relevant
              product pages and enquiry paths.
            </p>
          </div>

          <SystemDiagram />
        </section>

        {/* ── 5. Output ───────────────────────────── */}
        <section className="bg-surface-200 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <p className="section-label mb-8 lg:mb-12">04 / Output</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <h2
              className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
            >
              Technical content structured for discovery and evaluation.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The output was not a single page update. It combined core product pages, supporting
              articles, and reusable AI-assisted content workflows, helping technical information
              become easier to search, understand, and reproduce.
            </p>
          </div>

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
              A clearer route into technical product discovery.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/70">
              By restructuring MCX-related content around technical definitions, product context,
              buyer questions, and search intent, the website became easier to discover in active
              research scenarios. The MCX solution page appeared in Google AI Overview recommendations
              and was reported on the first page of organic results for &quot;MCX solution&quot;, supporting a
              clearer route from technical search to product evaluation.
            </p>
          </div>
        </section>

        {/* ── Bottom navigation ───────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <Link
              href="/cases/web-demand-engine"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>←</span>
              <span>Previous: Web Demand Engine</span>
            </Link>

            <Link
              href="/#cases"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>Next: From Product Complexity to Sales-Ready Content</span>
              <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
