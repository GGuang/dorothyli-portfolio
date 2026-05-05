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
    label: "Website",
    body: "Reviewed, edited, and uploaded 50+ English pages before launch, while coordinating with developers to resolve content, link, image, and button issues.",
    image: "/cases/web-demand-engine/website-home-new.png",
    imagePosition: "center top",
    imageVersion: "v2",
  },
  {
    title: "Product content structure",
    label: "Product Page",
    body: "Reorganised complex product and solution information into clearer market-facing content, connecting product value, use cases, and enquiry paths for international audiences.",
    image: "/cases/web-demand-engine/website-product-page.png",
    imagePosition: "center top",
    imageVersion: "v2",
  },
  {
    title: "Lead capture path",
    label: "Form Path",
    body: "Created a clearer enquiry path through website forms and campaign landing pages, connecting inbound interest with sales follow-up.",
    image: "/cases/web-demand-engine/demo-request-form.png",
    imagePosition: "center center",
    imageVersion: "v2",
  },
  {
    title: "Campaign landing page",
    label: "Campaign LP",
    body: "Built a campaign path combining landing page, EDM, social posts, and form collection.",
    image: "/cases/web-demand-engine/sample-campaign-lp.png",
    imagePosition: "center top",
    imageVersion: "v2",
  },
  {
    title: "Multilingual foundation",
    label: "Multilingual",
    body: "Supported multilingual website and content adaptation for global and regional market needs.",
    image: "/cases/web-demand-engine/multilingual-pages.png",
    imagePosition: "center top",
  },
];

/* ─── Abstract hero diagram ──────────────────────── */
function DemandPathDiagram() {
  const sources = [
    { cy: 62,  label: "Search" },
    { cy: 100, label: "Social" },
    { cy: 138, label: "EDM"    },
    { cy: 176, label: "Events" },
  ];
  const collectorCy = 119; // midpoint of sources

  // Main card geometry
  const cardX = 126, cardY = 12, cardW = 222, cardH = 256;
  const rowX = cardX + 12, rowW = cardW - 24;

  return (
    <svg
      viewBox="0 0 480 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[540px]"
      aria-hidden="true"
    >
      {/* ── Source nodes ── */}
      {sources.map(({ cy, label }) => (
        <g key={cy}>
          <circle
            cx={22} cy={cy} r={5.5}
            fill="rgba(15,14,11,0.06)"
            stroke="rgba(15,14,11,0.18)"
            strokeWidth="0.9"
          />
          <text
            x={22} y={cy - 11}
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="monospace"
            fill="rgba(15,14,11,0.40)"
          >
            {label}
          </text>
          <line
            x1={28} y1={cy} x2={96} y2={collectorCy}
            stroke="rgba(15,14,11,0.10)"
            strokeWidth="0.7"
            strokeDasharray="3.5 2.5"
          />
        </g>
      ))}

      {/* ── Collector node ── */}
      <circle
        cx={96} cy={collectorCy} r={9}
        fill="rgba(15,14,11,0.07)"
        stroke="rgba(15,14,11,0.18)"
        strokeWidth="0.9"
      />
      {/* Arrow into main card */}
      <line
        x1={105} y1={collectorCy} x2={cardX - 2} y2={collectorCy}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points={`${cardX - 4},${collectorCy - 3.5} ${cardX},${collectorCy} ${cardX - 4},${collectorCy + 3.5}`}
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Website Content Hub — main card ── */}
      <rect
        x={cardX} y={cardY} width={cardW} height={cardH} rx={4}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.12)"
        strokeWidth="1"
      />
      {/* Mint header band */}
      <rect x={cardX} y={cardY} width={cardW} height={32} rx={4} fill="#d5fad3" />
      <rect x={cardX} y={cardY + 24} width={cardW} height={8} fill="#d5fad3" />
      <text
        x={cardX + cardW / 2} y={cardY + 21}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.54)"
      >
        WEBSITE CONTENT HUB
      </text>

      {/* Row 1 — Product & Solution Content (highlighted) */}
      <rect
        x={rowX} y={52} width={rowW} height={36} rx={2.5}
        fill="rgba(213,250,211,0.55)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={cardX + cardW / 2} y={75}
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.54)"
      >
        Product &amp; Solution Content
      </text>

      {/* Row 2 — Campaign Landing Pages */}
      <rect
        x={rowX} y={94} width={rowW} height={30} rx={2.5}
        fill="rgba(15,14,11,0.022)"
        stroke="rgba(15,14,11,0.06)"
        strokeWidth="0.6"
      />
      <text
        x={cardX + cardW / 2} y={113}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.44)"
      >
        Campaign Landing Pages
      </text>

      {/* Row 3 — Multilingual Pages */}
      <rect
        x={rowX} y={130} width={rowW} height={30} rx={2.5}
        fill="rgba(15,14,11,0.016)"
        stroke="rgba(15,14,11,0.06)"
        strokeWidth="0.6"
      />
      <text
        x={cardX + cardW / 2} y={149}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.40)"
      >
        Multilingual Pages
      </text>

      {/* Row 4 — Resource / Blog Content */}
      <rect
        x={rowX} y={166} width={rowW} height={30} rx={2.5}
        fill="rgba(15,14,11,0.012)"
        stroke="rgba(15,14,11,0.06)"
        strokeWidth="0.6"
      />
      <text
        x={cardX + cardW / 2} y={185}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.36)"
      >
        Resource / Blog Content
      </text>

      {/* Forms strip — bridge at bottom of card */}
      <rect
        x={rowX} y={202} width={rowW} height={54} rx={2.5}
        fill="rgba(15,14,11,0.038)"
        stroke="rgba(15,14,11,0.08)"
        strokeWidth="0.6"
      />
      <text
        x={cardX + cardW / 2} y={220}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.44)"
      >
        Forms
      </text>
      <text
        x={cardX + cardW / 2} y={238}
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.28)"
      >
        Demo Request · Contact · Download
      </text>

      {/* ── Arrow from forms area → Sales Follow-up ── */}
      <line
        x1={cardX + cardW} y1={229} x2={358} y2={229}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points="356,225.5 362,229 356,232.5"
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Sales Follow-up card — dark ── */}
      <rect
        x={362} y={168} width={108} height={124} rx={3}
        fill="#0f0e0b"
      />
      <text
        x={416} y={190}
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="0.10em"
        fill="rgba(249,249,240,0.30)"
      >
        SALES FOLLOW-UP
      </text>
      <line
        x1={372} y1={199} x2={460} y2={199}
        stroke="rgba(249,249,240,0.07)"
        strokeWidth="0.6"
      />
      {["Source Context", "Sales Handoff", "Light Nurture"].map((t, i) => (
        <text
          key={t}
          x={416} y={216 + i * 20}
          textAnchor="middle"
          fontSize="8"
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
        {/* Mac dots — muted red / yellow / green */}
        <div className="flex items-center gap-[5px] flex-none">
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#e8847a" }} />
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#e8c47a" }} />
          <span className="w-[10px] h-[10px] rounded-full flex-none" style={{ background: "#7ac87a" }} />
        </div>

        {/* URL / title pill */}
        <div className="flex-1 flex justify-center pr-8">
          <span
            className="font-mono text-[8px] uppercase tracking-[0.10em] px-3 py-[3px] rounded-full"
            style={{ color: "rgba(15,14,11,0.30)", background: "rgba(15,14,11,0.06)" }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Viewport — 16:10 below the bar */}
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
            <div className="grid grid-cols-1 lg:grid-cols-[54%_46%] gap-10 lg:gap-12 items-center">

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
              <div className="flex items-center justify-center lg:justify-start">
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
        <section className="bg-surface-400 px-6 lg:px-14 xl:px-[5.5vw] py-16 lg:py-24">
          <div className="max-w-[720px]">
            <p className="section-label mb-8">05 / Impact</p>
            <h2
              className="font-serif font-[300] text-ink leading-[1.1] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
            >
              A clearer path from content to demand.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/70">
              The rebuilt website and content structure created a more reliable foundation for
              global-facing communication, search discovery, enquiry capture, and sales follow-up.
              Early launch signals and later reporting showed stronger visibility and a more stable
              inbound enquiry pattern, with exact lead volumes omitted for confidentiality and context.
            </p>
          </div>
        </section>

        {/* ── Bottom navigation ───────────────────── */}
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
              href="/cases/answer-ready-visibility"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>Next: Answer-Ready B2B Visibility</span>
              <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
