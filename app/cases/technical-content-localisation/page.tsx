"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── Data ───────────────────────────────────────── */
/*
 * Screenshot files should be placed in:
 *   web/public/cases/technical-content-localisation/
 *
 * Required filenames:
 *   garmin-product-page.png        — Garmin China product page or localised product narrative
 *   garmin-zhihu-column.png        — Garmin Zhihu column or platform content article
 *   technical-brochure.png         — Technical brochure or presentation material sample
 *   industrial-ad-copy.png         — Industrial or B2B advertising copy sample
 *   product-copywriting-samples.png — Product or campaign copywriting sample collection
 */

const CONTEXT_KEYWORDS = [
  "Garmin", "Product Localisation", "Technical Copywriting",
  "Product Pages", "Brochures", "Platform Content", "Market-Facing Narrative",
];

const CHALLENGES = [
  {
    title: "Technical inputs",
    body: "Product specifications and business information needed to be turned into clearer, more usable market-facing language.",
  },
  {
    title: "Local context",
    body: "Global or technical content had to be adapted for local platforms, reading habits, and audience expectations.",
  },
  {
    title: "Format diversity",
    body: "The work had to fit different formats, from product pages and platform content to brochures, advertisements, and presentation materials.",
  },
];

const STAGES = [
  {
    title: "Product Input",
    items: ["Specifications", "Feature Details", "Brand Guidelines"],
  },
  {
    title: "Scenario Translation",
    items: ["User Need", "Usage Context", "Local Reading Habit"],
  },
  {
    title: "Message Structure",
    items: ["Headline", "Benefit Logic", "Proof Points", "CTA / Next Step"],
  },
  {
    title: "Market Output",
    items: ["Product Page", "Brochure", "Platform Content", "Ad Copy"],
  },
];

const OUTPUTS = [
  {
    title: "Garmin product page localisation",
    label: "Product Page",
    body: "Product specifications and global content were adapted into China-market product-page narratives, connecting features with sports and health scenarios.",
    image: "/cases/technical-content-localisation/garmin-product-page.png",
    imagePosition: "center top",
  },
  {
    title: "Garmin platform content",
    label: "Platform Content",
    body: "Platform-native articles helped translate sports technology, product knowledge, and running-related data topics into readable content for local audiences. Years later, selected pieces remained among Garmin's most-upvoted Zhihu articles.",
    image: "/cases/technical-content-localisation/garmin-zhihu-column.png",
    imagePosition: "center top",
    imageVersion: "v2",
  },
  {
    title: "Technical brochure content",
    label: "Brochure",
    body: "Brochure and presentation materials helped organise product, brand, and solution information into more structured external communication.",
    image: "/cases/technical-content-localisation/technical-brochure.png",
    imagePosition: "center top",
  },
  {
    title: "Industrial advertising copy",
    label: "Industrial Ad",
    body: "Technical and industrial inputs were translated into concise advertising messages for professional or business-facing contexts.",
    image: "/cases/technical-content-localisation/industrial-ad-copy.png",
    imagePosition: "center top",
  },
  {
    title: "Product copywriting samples",
    label: "Copy Samples",
    body: "Selected samples show the early foundation of turning product value into concise market-facing language.",
    image: "/cases/technical-content-localisation/product-copywriting-samples.png",
    imagePosition: "center top",
  },
];

/* ─── Abstract hero diagram ──────────────────────── */
function LocalisationDiagram() {
  const inputs = [
    { y: 52,  label: "Specifications"   },
    { y: 88,  label: "Product Features" },
    { y: 124, label: "Technical Claims" },
    { y: 160, label: "Brand Guidelines" },
  ];
  const collectorCy = 106; // midpoint of input rows

  return (
    <svg
      viewBox="0 0 480 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[540px]"
      aria-hidden="true"
    >
      {/* ── Input spec blocks — left ── */}
      {inputs.map(({ y, label }) => (
        <g key={y}>
          <rect
            x={6} y={y - 11} width={96} height={22} rx={2}
            fill="rgba(15,14,11,0.04)"
            stroke="rgba(15,14,11,0.14)"
            strokeWidth="0.8"
          />
          <text
            x={54} y={y + 4}
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="monospace"
            fill="rgba(15,14,11,0.42)"
          >
            {label}
          </text>
          {/* Dashed line to collector */}
          <line
            x1={102} y1={y} x2={118} y2={collectorCy}
            stroke="rgba(15,14,11,0.10)"
            strokeWidth="0.7"
            strokeDasharray="3.5 2.5"
          />
        </g>
      ))}

      {/* ── Collector node ── */}
      <circle
        cx={118} cy={collectorCy} r={8}
        fill="rgba(15,14,11,0.06)"
        stroke="rgba(15,14,11,0.18)"
        strokeWidth="0.9"
      />
      {/* Arrow into localisation card */}
      <line
        x1={126} y1={collectorCy} x2={142} y2={collectorCy}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points={`140,${collectorCy - 3.5} 146,${collectorCy} 140,${collectorCy + 3.5}`}
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Localisation card — main focus ── */}
      <rect
        x={146} y={18} width={200} height={196} rx={4}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.12)"
        strokeWidth="1"
      />
      {/* Sand header band — #ccc5a3 */}
      <rect x={146} y={18} width={200} height={30} rx={4} fill="#ccc5a3" />
      <rect x={146} y={38} width={200} height={10} fill="#ccc5a3" />
      <text
        x={246} y={38}
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.58)"
      >
        LOCALISATION
      </text>

      {/* Row 1 — User Scenario (highlighted) */}
      <rect
        x={159} y={62} width={174} height={40} rx={2.5}
        fill="rgba(204,197,163,0.44)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={246} y={86}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.52)"
      >
        User Scenario
      </text>

      {/* Row 2 — Message Structure */}
      <rect
        x={159} y={110} width={174} height={40} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={246} y={134}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Message Structure
      </text>

      {/* Row 3 — Tone Adaptation */}
      <rect
        x={159} y={158} width={174} height={40} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={246} y={182}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Tone Adaptation
      </text>

      {/* ── Arrow out → Output card ── */}
      <line
        x1={346} y1={116} x2={364} y2={116}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points="362,112.5 368,116 362,119.5"
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Output card — dark ── */}
      <rect
        x={368} y={58} width={104} height={116} rx={3}
        fill="#0f0e0b"
      />
      <text
        x={420} y={79}
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="0.10em"
        fill="rgba(249,249,240,0.32)"
      >
        OUTPUT
      </text>
      {/* Separator */}
      <line
        x1={378} y1={87} x2={462} y2={87}
        stroke="rgba(249,249,240,0.07)"
        strokeWidth="0.6"
      />
      {["Product Page", "Brochure", "Platform", "Ad Copy"].map((t, i) => (
        <text
          key={t}
          x={420} y={103 + i * 18}
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
export default function TechnicalContentLocalisationPage() {
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
                  Case 03 / Technical Content Localisation
                </p>

                <h1
                  className="font-serif font-[300] text-ink leading-[1.02] tracking-[-0.03em] mb-5"
                  style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
                >
                  Technical Content Localisation
                </h1>

                <p
                  className="font-serif font-[400] text-ink/68 leading-[1.32] tracking-[-0.01em] mb-10 max-w-[480px]"
                  style={{ fontSize: "clamp(16px, 1.9vw, 22px)" }}
                >
                  Translating product and technical information into market-facing content.
                </p>

                {/* Meta */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-7 max-w-[420px]">
                  {([
                    ["Selected work", "Garmin / FAJI Advertising"],
                    ["Period",        "2014–2018"],
                    ["Roles",         "Content Planner / Senior Copywriter"],
                    ["Focus",         "Product localisation, technical copywriting, product pages, brochures, campaign content"],
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
                <LocalisationDiagram />
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
              Before B2B systems, the foundation was product translation.
            </h2>

            <p className="font-sans text-[15px] lg:text-[16px] leading-[1.72] text-ink/70 mb-10 max-w-[620px]">
              Earlier work focused on turning product information, specifications, and brand inputs into
              content readable in a local market. Garmin was the main engagement; selected agency
              projects added technical brochures, industrial advertising, and campaign content.
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
            What made the work more than translation?
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
              A repeatable way to turn product input into localised content.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The work followed a recurring pattern: understand the product input, identify the user
              or buyer scenario, restructure the message, and adapt it into the right market-facing
              format.
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
              Selected product and technical content outputs.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              Work samples are partial but show a consistent pattern: technical and product information
              reshaped into clearer, localised content across multiple formats.
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
              A foundation for later technical product marketing.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/70">
              Early work across product pages, platform content, brochures, and advertising helped
              make product information more readable and locally usable. Years later, selected Garmin
              Zhihu articles remained among the brand&apos;s most-upvoted content, translating sports
              data and GPS metrics into audience-friendly explanations.
            </p>
          </div>
        </section>

        {/* ── Bottom navigation ───────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <Link
              href="/cases/answer-ready-visibility"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>←</span>
              <span>Previous: Answer-Ready B2B Visibility</span>
            </Link>

            <Link
              href="/cases/content-at-scale"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>Next: Content at Scale</span>
              <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
