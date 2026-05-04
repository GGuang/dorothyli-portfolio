"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── Data ───────────────────────────────────────── */
/*
 * Screenshot files should be placed in:
 *   web/public/cases/web-demand-engine/
 *
 * Required filenames:
 *   website-home-new.png       — new POCSTARS homepage or global website overview
 *   website-product-page.png   — product or solution page showing structured content
 *   demo-request-form.png      — enquiry / demo request form (blur any customer data)
 *   sample-campaign-lp.png     — campaign landing page or EDM landing path
 *   multilingual-pages.png     — EN / ES / ID pages or multilingual website structure
 */

const CONTEXT_KEYWORDS = [
  "PoC", "MCX", "Public Safety", "MNO", "Global Website", "Multilingual Content",
];

const CHALLENGES = [
  {
    title: "Technical product information",
    body: "Product and solution information needed to be reorganised into clearer market-facing pages for international audiences.",
  },
  {
    title: "Disconnected touchpoints",
    body: "Website, social, EDM, events, and forms were not yet working as one connected demand path.",
  },
  {
    title: "Lean resources",
    body: "The system had to be built with a small team and practical execution constraints.",
  },
];

const STAGES = [
  {
    title: "Traffic Sources",
    items: ["Organic Search", "Social", "EDM", "Events"],
  },
  {
    title: "Website & Landing Pages",
    items: ["Product Pages", "Solution Pages", "Campaign LPs", "Multilingual Pages"],
  },
  {
    title: "Lead Capture",
    items: ["Demo Request", "Contact Form", "Download Form"],
  },
  {
    title: "Follow-up Path",
    items: ["Source Tagging", "Sales Handoff", "Light Nurture"],
  },
];

const OUTPUTS = [
  {
    title: "Website rebuild",
    body: "Reviewed, edited, and uploaded 50+ English pages before launch, while coordinating with developers to resolve content, link, image, and button issues.",
    image: "/cases/web-demand-engine/website-home-new.png",
  },
  {
    title: "Product content structure",
    body: "Reorganised complex product and solution information into clearer market-facing content, connecting product value, use cases, and enquiry paths for international audiences.",
    image: "/cases/web-demand-engine/website-product-page.png",
  },
  {
    title: "Lead capture path",
    body: "Created a clearer enquiry path through website forms and campaign landing pages, connecting inbound interest with sales follow-up.",
    image: "/cases/web-demand-engine/demo-request-form.png",
  },
  {
    title: "Campaign landing page",
    body: "Built a campaign path combining landing page, EDM, social posts, and form collection.",
    image: "/cases/web-demand-engine/sample-campaign-lp.png",
  },
  {
    title: "Multilingual foundation",
    body: "Supported multilingual website and content adaptation for global and regional market needs.",
    image: "/cases/web-demand-engine/multilingual-pages.png",
  },
];

const METRICS = [
  {
    value: "50+",
    label: "Pages reviewed, edited, and uploaded before the English website launch.",
  },
  {
    value: "Launch-day enquiries",
    label: "The English website received demo requests on the day it went live, providing an early signal that the enquiry path was working.",
  },
  {
    value: "2,500+ visits",
    label: "Reached during the first launch week, as the new website became the main traffic destination for launch-period communications.",
  },
  {
    value: "2x+ lead lift",
    label: "Monthly online qualified enquiries more than doubled from the previous baseline and remained more stable from H2 2025 to Feb 2026.",
  },
  {
    value: "Page 1 visibility",
    label: "The MCX solution page appeared in Google AI Overview recommendations and was reported on the first page of organic results, at position 3 for \"MCX solution\".",
  },
];

const CAPABILITIES = [
  "Product content structure",
  "Website information architecture",
  "Demand pathway thinking",
  "Sales-aligned marketing execution",
];

/* ─── Abstract hero diagram ──────────────────────── */
function DemandPathDiagram() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[400px]"
      aria-hidden="true"
    >
      {/* Traffic source nodes */}
      {[52, 96, 140, 184].map((cy, i) => {
        const labels = ["Organic", "Social", "EDM", "Events"];
        return (
          <g key={i}>
            <circle
              cx={26} cy={cy} r={4.5}
              fill="rgba(15,14,11,0.07)"
              stroke="rgba(15,14,11,0.18)"
              strokeWidth="0.8"
            />
            <line
              x1={31} y1={cy} x2={110} y2={118}
              stroke="rgba(15,14,11,0.09)"
              strokeWidth="0.6"
              strokeDasharray="3 2"
            />
            <text
              x={26} y={cy - 8}
              textAnchor="middle"
              fontSize="5.5"
              fontFamily="monospace"
              fill="rgba(15,14,11,0.38)"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}

      {/* Collector node */}
      <circle
        cx={110} cy={118} r={7}
        fill="rgba(15,14,11,0.08)"
        stroke="rgba(15,14,11,0.18)"
        strokeWidth="0.8"
      />
      <line
        x1={117} y1={118} x2={136} y2={118}
        stroke="rgba(15,14,11,0.20)"
        strokeWidth="0.8"
      />
      {/* Arrowhead */}
      <polygon
        points="134,115 140,118 134,121"
        fill="rgba(15,14,11,0.22)"
      />

      {/* Website card — centre */}
      <rect
        x={142} y={34} width={152} height={200} rx={2.5}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.13)"
        strokeWidth="0.9"
      />
      {/* Header bar */}
      <rect x={142} y={34} width={152} height={22} rx={2.5} fill="#d5fad3" />
      <rect x={142} y={46} width={152} height={10} fill="#d5fad3" />
      <text
        x={218} y={48}
        textAnchor="middle"
        fontSize="5.5"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.52)"
      >
        WEBSITE & PAGES
      </text>

      {/* Page rows */}
      {[
        { y: 68,  label: "Product Pages",    accent: true  },
        { y: 90,  label: "Solution Pages",   accent: false },
        { y: 112, label: "Campaign LPs",     accent: false },
        { y: 134, label: "Multilingual",     accent: false },
        { y: 156, label: "SEO / Blog",       accent: false },
      ].map(({ y, label, accent }) => (
        <g key={y}>
          <rect
            x={154} y={y} width={128} height={17} rx={1.5}
            fill={accent ? "rgba(213,250,211,0.55)" : "rgba(15,14,11,0.025)"}
            stroke="rgba(15,14,11,0.07)"
            strokeWidth="0.5"
          />
          <text
            x={218} y={y + 11}
            textAnchor="middle"
            fontSize="5.5"
            fontFamily="monospace"
            fill="rgba(15,14,11,0.45)"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Form area */}
      <rect
        x={154} y={184} width={128} height={40} rx={1.5}
        fill="rgba(15,14,11,0.035)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.5"
      />
      <text
        x={218} y={198}
        textAnchor="middle"
        fontSize="5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.32)"
      >
        Demo Request Form
      </text>
      <rect x={162} y={205} width={112} height={5} rx={0.8} fill="rgba(15,14,11,0.07)" />
      <rect x={162} y={214} width={52} height={7} rx={1} fill="rgba(15,14,11,0.65)" />
      <text
        x={188} y={219.5}
        textAnchor="middle"
        fontSize="4.5"
        fontFamily="monospace"
        fill="rgba(249,249,240,0.75)"
      >
        Submit
      </text>

      {/* Output arrow */}
      <line
        x1={294} y1={134} x2={318} y2={134}
        stroke="rgba(15,14,11,0.20)"
        strokeWidth="0.8"
      />
      <polygon
        points="316,131 322,134 316,137"
        fill="rgba(15,14,11,0.20)"
      />

      {/* Follow-up card — dark */}
      <rect
        x={324} y={98} width={68} height={72} rx={2}
        fill="#0f0e0b"
      />
      <text
        x={358} y={116}
        textAnchor="middle"
        fontSize="5"
        fontFamily="monospace"
        letterSpacing="0.08em"
        fill="rgba(249,249,240,0.38)"
      >
        FOLLOW-UP
      </text>
      {["Source Tag", "Sales Handoff", "Light Nurture"].map((t, i) => (
        <text
          key={i}
          x={358} y={132 + i * 14}
          textAnchor="middle"
          fontSize="5.5"
          fontFamily="monospace"
          fill="rgba(249,249,240,0.60)"
        >
          {t}
        </text>
      ))}

      {/* Decorative orbit rings top-right */}
      <circle cx={368} cy={44} r={18} fill="none" stroke="rgba(15,14,11,0.055)" strokeWidth="0.7" />
      <circle cx={368} cy={44} r={10} fill="none" stroke="rgba(15,14,11,0.07)" strokeWidth="0.6" />
      <circle cx={368} cy={44} r={3}  fill="rgba(15,14,11,0.08)" />

      {/* Grid dots bottom-left */}
      {[0,1,2,3].map(col =>
        [0,1,2].map(row => (
          <circle
            key={`${col}-${row}`}
            cx={20 + col * 12} cy={248 + row * 12} r={1.2}
            fill="rgba(15,14,11,0.08)"
          />
        ))
      )}
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
            {/* Stage number */}
            <p className="font-mono text-[8px] text-ink/22 mb-4 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </p>

            {/* Stage title */}
            <h4 className="font-serif font-[400] text-[15px] lg:text-[16px] leading-snug tracking-tight text-ink mb-5">
              {stage.title}
            </h4>

            {/* Items */}
            <ul className="space-y-2.5">
              {stage.items.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[5px] w-[5px] h-[1px] bg-ink/25 flex-none" />
                  <span className="font-sans text-[13px] leading-snug text-ink/58">{item}</span>
                </li>
              ))}
            </ul>

            {/* Desktop arrow connector */}
            {i < STAGES.length - 1 && (
              <div className="hidden md:flex absolute -right-[13px] top-1/2 -translate-y-1/2 z-10 w-[26px] h-[26px] items-center justify-center bg-surface-100 rounded-full border border-ink/10">
                <span className="text-ink/28 text-[10px] leading-none">›</span>
              </div>
            )}

            {/* Mobile arrow connector */}
            {i < STAGES.length - 1 && (
              <div className="md:hidden flex justify-center pt-5 pb-1">
                <span className="font-mono text-[10px] text-ink/18">↓</span>
              </div>
            )}

            {/* Watermark number */}
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

/* ─── Output card ────────────────────────────────── */
function OutputCard({
  title, body, image, index,
}: {
  title: string; body: string; image: string; index: number;
}) {
  const [err, setErr] = useState(false);

  return (
    <article className="flex flex-col">
      {/* Image / placeholder — 16:10 frame, consistent across all cards */}
      <div className="aspect-[16/10] bg-surface-200 border border-ink/09 rounded-sm mb-5 relative overflow-hidden">
        {!err ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={() => setErr(true)}
          />
        ) : (
          /* Placeholder occupies the same 16:10 frame */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <div className="w-full max-w-[140px] space-y-[5px]">
              {[100, 72, 88, 55, 80].map((w, i) => (
                <div
                  key={i}
                  className="h-[2px] bg-ink/08 rounded-full"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink/28">
              Screenshot placeholder
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
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
export default function WebDemandEnginePage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ── 1. Case Hero ────────────────────────── */}
        <section className="bg-mint">
          <div className="px-6 lg:px-14 xl:px-[5.5vw] pt-[80px] pb-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — text */}
              <div className="pt-10 lg:pt-14">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-ink/40 mb-8 lg:mb-10">
                  Case 01 / Web Demand Engine
                </p>

                <h1
                  className="font-serif font-[300] text-ink leading-[1.02] tracking-[-0.03em] mb-5"
                  style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
                >
                  Web Demand Engine
                </h1>

                <p
                  className="font-serif font-[400] text-ink/68 leading-[1.32] tracking-[-0.01em] mb-10 max-w-[480px]"
                  style={{ fontSize: "clamp(16px, 1.9vw, 22px)" }}
                >
                  Turning a fragmented global website into a clearer inbound demand path.
                </p>

                {/* Meta */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-7 max-w-[420px]">
                  {([
                    ["Company", "POCSTARS"],
                    ["Year",    "2025–2026"],
                    ["Role",    "Global Marketing Manager"],
                    ["Focus",   "Website, product content, search visibility, forms, lead path, sales follow-up"],
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
              <div className="flex items-start justify-center lg:justify-end pt-8 lg:pt-14">
                <DemandPathDiagram />
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
              A clearer global-facing foundation for complex B2B technology products.
            </h2>

            <p className="font-sans text-[15px] lg:text-[16px] leading-[1.72] text-ink/70 mb-10 max-w-[620px]">
              POCSTARS needed a clearer global-facing digital foundation for complex communication
              products and solutions. The website had to support product understanding, multilingual
              content, search discovery, and lead capture across international markets.
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
            What was unclear, fragmented, or underperforming?
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
              From scattered touchpoints to one demand path.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The work focused on connecting product content, search visibility, website structure,
              lead capture, and sales follow-up into a clearer inbound path.
            </p>
          </div>

          <SystemDiagram />
        </section>

        {/* ── 5. Output ───────────────────────────── */}
        <section className="bg-surface-200 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-b border-ink/08">
          <p className="section-label mb-8 lg:mb-12">04 / Output</p>

          <h2
            className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-12 lg:mb-16 max-w-[520px]"
            style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            Market-facing assets and pathways delivered.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {OUTPUTS.map((output, i) => (
              <OutputCard key={i} {...output} index={i} />
            ))}
          </div>
        </section>

        {/* ── 6. Impact ───────────────────────────── */}
        <section className="bg-warm-black px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-cream/30 mb-8 lg:mb-12">
            05 / Impact
          </p>

          <h2
            className="font-serif font-[300] text-cream leading-[1.08] tracking-[-0.025em] mb-14 lg:mb-16 max-w-[560px]"
            style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            Early signals and longer-term demand results.
          </h2>

          {/* Metric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/06">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-warm-black p-7 lg:p-8">
                <p
                  className="font-serif font-[300] text-cream leading-none tracking-tight mb-4"
                  style={{ fontSize: "clamp(26px, 3vw, 44px)" }}
                >
                  {m.value}
                </p>
                <p className="font-sans text-[12px] lg:text-[12.5px] leading-[1.65] text-cream/48 max-w-[240px]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="font-mono text-[7.5px] leading-[1.65] text-cream/22 mt-8 max-w-[480px]">
            Results are presented as portfolio-level summaries based on internal reporting records.
            Exact lead volumes and sensitive operational details have been omitted for confidentiality and context.
          </p>
        </section>

        {/* ── 7. What This Shows ──────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-20 lg:py-28 border-t border-ink/08 border-b border-ink/08">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div>
              <p className="section-label mb-8 lg:mb-10">06 / What This Shows</p>
              <h2
                className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
              >
                B2B marketing as infrastructure, not isolated execution.
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/68 mb-9">
                This case shows how I approach B2B marketing as an infrastructure problem: clarifying
                the product message, rebuilding the content path, connecting traffic sources to website
                forms, and making the system easier for sales to follow up. For complex B2B products,
                the goal is not only to publish content, but to make the product easier to understand,
                easier to find, and easier for sales to explain.
              </p>

              <div className="flex flex-wrap gap-2">
                {CAPABILITIES.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-ink/55 px-3 py-[5px] bg-surface-200 border border-ink/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── 8. Bottom navigation ────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <Link
              href="/#cases"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>←</span>
              <span>Back to Selected Systems</span>
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
