"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── Data ───────────────────────────────────────── */
/*
 * Screenshot files should be placed in:
 *   web/public/cases/content-at-scale/
 *
 * Required filenames:
 *   creative-publishing-loop.png   — production loop diagram or workflow overview
 *   roewe-rx5-campaign.png         — Roewe RX5 Douyin campaign video or content
 *   viral-video-samples.png        — grid or collage of high-reach short-video examples
 */

const CONTEXT_KEYWORDS = [
  "Short Video", "Douyin", "Content Engine", "UGC", "Creative Formats", "Platform Growth",
];

const CHALLENGES = [
  {
    title: "No repeatable creative system",
    body: "Content was produced ad-hoc with no shared format logic, making it difficult to scale output or replicate what worked.",
  },
  {
    title: "Platform algorithm dependency",
    body: "Sustained reach required understanding platform signals and adjusting creative formats, not just making good individual videos.",
  },
  {
    title: "UGC was untapped",
    body: "Organic user participation was possible but needed the right creative hooks and campaign structures to activate at scale.",
  },
];

const STAGES = [
  {
    title: "Platform Signals",
    items: ["Trending Audio", "Hashtag Data", "Algorithm Patterns", "Competitor Analysis"],
  },
  {
    title: "Creative Format",
    items: ["Hook Architecture", "Story Structure", "CTA Pattern", "Format Templates"],
  },
  {
    title: "Video Execution",
    items: ["Script & Storyboard", "Shoot & Edit", "Multi-variant Cuts", "Brand Campaigns"],
  },
  {
    title: "Growth Feedback",
    items: ["Views & Shares", "UGC Activation", "Format Iteration", "Account Growth"],
  },
];

const OUTPUTS = [
  {
    title: "Creative-to-publishing loop",
    label: "Production Loop",
    body: "Ideas moved through brainstorming, voting, scripting, shooting, editing, effects, publishing, and performance review.",
    image: "/cases/content-at-scale/creative-publishing-loop.png",
    imagePosition: "center center",
    imageVersion: "v4",
    imageFit: "contain" as const,
  },
  {
    title: "Roewe RX5 launch campaign",
    label: "Campaign",
    body: "The Roewe RX5 Douyin launch campaign used scenario-based short videos to connect product communication, platform storytelling, and audience participation.",
    image: "/cases/content-at-scale/roewe-rx5-campaign.png",
    imagePosition: "center top",
    imageVersion: "v2",
  },
  {
    title: "Viral video samples",
    label: "Video Samples",
    body: "Selected video cases show how creative hooks, emotional scenarios, and platform-native editing helped individual videos reach large audiences.",
    image: "/cases/content-at-scale/viral-video-samples.png",
    imagePosition: "center top",
    imageVersion: "v3",
  },
];

/* ─── Abstract hero diagram ──────────────────────── */
function ContentScaleDiagram() {
  const signals = [
    { cy: 72,  label: "Audio" },
    { cy: 116, label: "Hashtag" },
    { cy: 160, label: "Algorithm" },
    { cy: 204, label: "Trends" },
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
      {/* ── Signal nodes ── */}
      {signals.map(({ cy, label }) => (
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

      {/* ── Format system card — main focus ── */}
      <rect
        x={137} y={22} width={214} height={228} rx={4}
        fill="#f9f9f0"
        stroke="rgba(15,14,11,0.12)"
        strokeWidth="1"
      />
      {/* Peach header band */}
      <rect x={137} y={22} width={214} height={32} rx={4} fill="#f5c9a8" />
      {/* Square-off bottom corners of band */}
      <rect x={137} y={44} width={214} height={10} fill="#f5c9a8" />
      <text
        x={244} y={43}
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="monospace"
        letterSpacing="0.09em"
        fill="rgba(15,14,11,0.52)"
      >
        VIDEO FORMAT SYSTEM
      </text>

      {/* Row 1 — Hook (highlighted) */}
      <rect
        x={150} y={66} width={188} height={40} rx={2.5}
        fill="rgba(245,201,168,0.45)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={91}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.52)"
      >
        Hook Architecture
      </text>

      {/* Row 2 — Story */}
      <rect
        x={150} y={114} width={188} height={40} rx={2.5}
        fill="rgba(15,14,11,0.025)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={139}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.42)"
      >
        Story Arc
      </text>

      {/* Row 3 — Multi-variant */}
      <rect
        x={150} y={162} width={188} height={72} rx={2.5}
        fill="rgba(15,14,11,0.032)"
        stroke="rgba(15,14,11,0.07)"
        strokeWidth="0.6"
      />
      <text
        x={244} y={186}
        textAnchor="middle"
        fontSize="8"
        fontFamily="monospace"
        fill="rgba(15,14,11,0.38)"
      >
        Multi-variant Cuts
      </text>
      {/* Mini publish button */}
      <rect x={206} y={200} width={76} height={22} rx={3} fill="rgba(15,14,11,0.55)" />
      <text
        x={244} y={215}
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="monospace"
        fill="rgba(249,249,240,0.80)"
      >
        Publish
      </text>

      {/* ── Arrow out → Growth card ── */}
      <line
        x1={351} y1={collectorCy} x2={369} y2={collectorCy}
        stroke="rgba(15,14,11,0.22)"
        strokeWidth="1"
      />
      <polygon
        points="367,134.5 373,138 367,141.5"
        fill="rgba(15,14,11,0.24)"
      />

      {/* ── Growth feedback card — dark ── */}
      <rect
        x={373} y={78} width={94} height={120} rx={3}
        fill="#0f0e0b"
      />
      <text
        x={420} y={101}
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="monospace"
        letterSpacing="0.10em"
        fill="rgba(249,249,240,0.32)"
      >
        GROWTH
      </text>
      <line
        x1={382} y1={110} x2={458} y2={110}
        stroke="rgba(249,249,240,0.07)"
        strokeWidth="0.6"
      />
      {["230M Views", "540% UGC", "1B+ Reach"].map((t, i) => (
        <text
          key={t}
          x={420} y={128 + i * 20}
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
export default function ContentAtScalePage() {
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
                  Case 04 / Content at Scale
                </p>

                <h1
                  className="font-serif font-[300] text-ink leading-[1.02] tracking-[-0.03em] mb-5"
                  style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
                >
                  Content at Scale
                </h1>

                <p
                  className="font-serif font-[400] text-ink/68 leading-[1.32] tracking-[-0.01em] mb-10 max-w-[480px]"
                  style={{ fontSize: "clamp(16px, 1.9vw, 22px)" }}
                >
                  Building repeatable creative formats for high-reach short-video growth.
                </p>

                {/* Meta */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-7 max-w-[420px]">
                  {([
                    ["Company", "CREYI"],
                    ["Year",    "2018–2020"],
                    ["Role",    "Content Producer / Creative Strategist"],
                    ["Focus",   "Short-video formats, platform growth, brand campaigns, UGC activation"],
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
                <ContentScaleDiagram />
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
              Turning platform signals into a repeatable engine for short-video growth.
            </h2>

            <p className="font-sans text-[15px] lg:text-[16px] leading-[1.72] text-ink/70 mb-10 max-w-[620px]">
              CREYI needed to produce short-video content at volume across brand campaigns and
              platform accounts. The challenge was building a reliable creative system that could
              read platform signals, produce format-consistent content quickly, and compound into
              account-level growth.
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
            What made high-volume content creation difficult to sustain?
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
              From platform signals to a scalable content engine.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[480px]">
              The system translated real-time platform data into creative format decisions,
              enabling fast production cycles, consistent brand output, and compounding
              organic reach through UGC and algorithmic distribution.
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
            Creative formats and campaigns delivered.
          </h2>

          <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/62 max-w-[600px] mb-12 lg:mb-16">
            Partial samples show the core pattern: video ideas moving through a production loop into campaign content and platform-native short-video output.
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
              From individual videos to repeatable content growth.
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.72] text-ink/70">
              The format system enabled 50+ high-performing videos, accumulating over 230M views and
              driving 540% UGC growth on key campaigns. Brand collaborations on the same creative
              infrastructure reached 1B+ combined views, demonstrating that the system itself, not
              any single video, was the asset.
            </p>
          </div>
        </section>

        {/* ── Bottom navigation ───────────────────── */}
        <section className="bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <Link
              href="/cases/technical-content-localisation"
              className="inline-flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors duration-150"
            >
              <span>←</span>
              <span>Previous: Technical Content Localisation</span>
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
