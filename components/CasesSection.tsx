"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import casesData from "@/_context/cases.json";

const EXPO_OUT = [0.32, 0.72, 0, 1] as [number, number, number, number];
const STD_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ─── Per-card SVG diagrams ─────────────────────── */

// Card 01 — Web Demand Engine: traffic sources → website hub → form → lead
function DiagramDemandEngine({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.70 : 0.52;
  const srcX = 58, srcYs = [72, 120, 168];
  const hubX = 128, hubY = 90, hubW = 108, hubH = 60;
  const hubCy = hubY + hubH / 2;
  const formX = 262, formY = 104, formW = 68, formH = 32;
  const formCy = formY + formH / 2;
  const leadX = 354, leadY = 88, leadW = 90, leadH = 64;
  const leadCy = leadY + leadH / 2;
  return (
    <svg width="100%" viewBox="0 0 460 240" fill="none" aria-hidden="true">
      <g transform="translate(-14, 0)">
      {/* Source → hub convergence lines */}
      {srcYs.map((sy, i) => (
        <line key={i} x1={srcX + 13} y1={sy} x2={hubX} y2={hubCy}
          stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      ))}
      {/* Source nodes */}
      {srcYs.map((sy, i) => (
        <circle key={i} cx={srcX} cy={sy} r={i === 1 ? 13 : 9}
          stroke="currentColor" strokeOpacity={op * (i === 1 ? 1 : 0.7)} strokeWidth={i === 1 ? 1.35 : 1.0} />
      ))}
      {/* Website hub block — accent fill */}
      <rect x={hubX} y={hubY} width={hubW} height={hubH}
        fill="currentColor" fillOpacity={op * 0.09} />
      <rect x={hubX} y={hubY} width={hubW} height={hubH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      <line x1={hubX + 10} y1={hubCy - 9} x2={hubX + hubW - 10} y2={hubCy - 9}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      <line x1={hubX + 10} y1={hubCy + 9} x2={hubX + hubW - 10} y2={hubCy + 9}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      {/* Hub → form arrow */}
      <line x1={hubX + hubW} y1={hubCy} x2={formX} y2={formCy}
        stroke="currentColor" strokeOpacity={op * 0.52} strokeWidth="1.0" />
      <polyline points={`${formX - 6},${formCy - 4} ${formX},${formCy} ${formX - 6},${formCy + 4}`}
        stroke="currentColor" strokeOpacity={op * 0.52} strokeWidth="1.0" />
      {/* Form / CTA strip */}
      <rect x={formX} y={formY} width={formW} height={formH}
        stroke="currentColor" strokeOpacity={op * 0.88} strokeWidth="1.1" />
      {/* Form → lead arrow */}
      <line x1={formX + formW} y1={formCy} x2={leadX} y2={leadCy}
        stroke="currentColor" strokeOpacity={op * 0.52} strokeWidth="1.0" />
      <polyline points={`${leadX - 6},${leadCy - 4} ${leadX},${leadCy} ${leadX - 6},${leadCy + 4}`}
        stroke="currentColor" strokeOpacity={op * 0.52} strokeWidth="1.0" />
      {/* Lead / sales output block */}
      <rect x={leadX} y={leadY} width={leadW} height={leadH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      {/* Accent: filled dot + ring inside lead block */}
      <circle cx={leadX + leadW / 2} cy={leadCy} r={10}
        stroke="currentColor" strokeOpacity={op * 0.3} strokeWidth="1" />
      <circle cx={leadX + leadW / 2} cy={leadCy} r={5}
        fill="currentColor" fillOpacity={op * 0.6} />
      </g>
    </svg>
  );
}

// Card 02 — Answer-Ready B2B Visibility: question node → indexed blocks → answer frame
function DiagramVisibility({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.70 : 0.52;
  const qx = 64, qy = 120, qr = 26;
  const blockX = 140, blockW = 96, blockH = 17, blockGap = 7;
  const blockYs = [68, 68 + blockH + blockGap, 68 + 2*(blockH + blockGap), 68 + 3*(blockH + blockGap), 68 + 4*(blockH + blockGap)];
  const ansX = 270, ansY = 72, ansW = 132, ansH = 104;
  const ansCy = ansY + ansH / 2;
  return (
    <svg width="100%" viewBox="0 0 460 240" fill="none" aria-hidden="true">
      <g transform="translate(10, -5)">
      {/* Question node */}
      <circle cx={qx} cy={qy} r={qr}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      <circle cx={qx} cy={qy - 5} r={4}
        fill="currentColor" fillOpacity={op * 0.5} />
      <circle cx={qx} cy={qy + 10} r={2}
        fill="currentColor" fillOpacity={op * 0.5} />
      {/* Question → blocks arrow */}
      <line x1={qx + qr} y1={qy} x2={blockX} y2={qy}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="1.0" />
      <polyline points={`${blockX - 5},${qy - 4} ${blockX},${qy} ${blockX - 5},${qy + 4}`}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="1.0" />
      {/* Indexed content blocks — top block accent-filled */}
      <rect x={blockX} y={blockYs[0]} width={blockW} height={blockH}
        fill="currentColor" fillOpacity={op * 0.12} />
      {blockYs.map((y, i) => (
        <rect key={i} x={blockX} y={y} width={blockW} height={blockH}
          stroke="currentColor" strokeOpacity={op * (0.5 + i * 0.07)} strokeWidth={i === 0 ? 1.1 : 0.9} />
      ))}
      {/* Fan lines blocks → answer frame */}
      {blockYs.map((y, i) => (
        <line key={i} x1={blockX + blockW} y1={y + blockH / 2} x2={ansX} y2={ansCy}
          stroke="currentColor" strokeOpacity={op * 0.27} strokeWidth="1" />
      ))}
      {/* Answer / AI frame */}
      <rect x={ansX} y={ansY} width={ansW} height={ansH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      {/* Rank accent bar top-right */}
      <rect x={ansX + ansW - 26} y={ansY + 8} width={18} height={10}
        fill="currentColor" fillOpacity={op * 0.22} />
      {/* Text lines inside answer frame */}
      {[0, 1, 2, 3].map(i => (
        <line key={i}
          x1={ansX + 14} y1={ansY + 26 + i * 18}
          x2={ansX + 14 + [90, 68, 76, 50][i]} y2={ansY + 26 + i * 18}
          stroke="currentColor" strokeOpacity={op * (i === 0 ? 0.75 : 0.52)} strokeWidth={i === 0 ? 1.1 : 0.9} />
      ))}
      </g>
    </svg>
  );
}

// Card 03 — Technical Content Localisation: spec block → transform → market outputs
function DiagramLocalisation({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.70 : 0.52;
  const specX = 40, specY = 76, specW = 92, specH = 96;
  const specCy = specY + specH / 2;
  const sq = 15, sqGap = 5;
  const gx0 = specX + 9, gy0 = specY + 12;
  const grid = Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => [gx0 + c * (sq + sqGap), gy0 + r * (sq + sqGap)])
  ).flat();
  const tfX = 166, tfY = 98, tfW = 52, tfH = 52;
  const tfCy = tfY + tfH / 2;
  const outX = 250, outW = 104, outH = 22, outGap = 10;
  const outYs = [76, 76 + outH + outGap, 76 + 2 * (outH + outGap)];
  return (
    <svg width="100%" viewBox="0 0 460 240" fill="none" aria-hidden="true">
      <g transform="translate(34, -4)">
      {/* Spec input block */}
      <rect x={specX} y={specY} width={specW} height={specH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      {/* Grid inside spec block */}
      {grid.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={sq} height={sq}
          stroke="currentColor" strokeOpacity={op * 0.55} strokeWidth="0.9" />
      ))}
      {/* Spec → transform arrow */}
      <line x1={specX + specW} y1={specCy} x2={tfX} y2={tfCy}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="1.0" />
      <polyline points={`${tfX - 5},${tfCy - 4} ${tfX},${tfCy} ${tfX - 5},${tfCy + 4}`}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="1.0" />
      {/* Transform block — accent fill */}
      <rect x={tfX} y={tfY} width={tfW} height={tfH}
        fill="currentColor" fillOpacity={op * 0.1} />
      <rect x={tfX} y={tfY} width={tfW} height={tfH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      <line x1={tfX + 9} y1={tfY + 9} x2={tfX + tfW - 9} y2={tfY + tfH - 9}
        stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="1.0" />
      <line x1={tfX + tfW - 9} y1={tfY + 9} x2={tfX + 9} y2={tfY + tfH - 9}
        stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="1.0" />
      {/* Fan lines transform → market outputs */}
      {outYs.map((oy, i) => (
        <line key={i} x1={tfX + tfW} y1={tfCy} x2={outX} y2={oy + outH / 2}
          stroke="currentColor" strokeOpacity={op * 0.38} strokeWidth="1" />
      ))}
      {/* Market output blocks */}
      {outYs.map((oy, i) => (
        <rect key={i} x={outX} y={oy} width={outW} height={outH}
          stroke="currentColor" strokeOpacity={op * (0.7 + i * 0.09)} strokeWidth="1.1" />
      ))}
      {/* Inner text line in each output */}
      {outYs.map((oy, i) => (
        <line key={i} x1={outX + 8} y1={oy + outH / 2}
          x2={outX + [72, 56, 64][i]} y2={oy + outH / 2}
          stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="1" />
      ))}
      </g>
    </svg>
  );
}

// Card 04 — Content at Scale: 4-stage video loop with feedback arc
function DiagramContentScale({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.70 : 0.52;
  const blockW = 72, blockH = 44, blockGap = 14;
  const totalW = 4 * blockW + 3 * blockGap;
  const startX = Math.round((460 - totalW) / 2);
  const blockY = 88;
  const blockCy = blockY + blockH / 2;
  const loopY = blockY + blockH + 30;
  const lastBx = startX + 3 * (blockW + blockGap);
  const loopEndX = lastBx + blockW / 2;
  const loopStartX = startX + blockW / 2;
  return (
    <svg width="100%" viewBox="0 0 460 240" fill="none" aria-hidden="true">
      <g transform="translate(0, -8)">
      {/* Publish block accent fill (last block) */}
      <rect x={lastBx} y={blockY} width={blockW} height={blockH}
        fill="currentColor" fillOpacity={op * 0.1} />
      {/* Stage blocks */}
      {[0, 1, 2, 3].map(i => {
        const bx = startX + i * (blockW + blockGap);
        const isLast = i === 3;
        return (
          <rect key={i} x={bx} y={blockY} width={blockW} height={blockH}
            stroke="currentColor"
            strokeOpacity={op * (isLast ? 1 : 0.72)}
            strokeWidth={isLast ? 1.35 : 1.0} />
        );
      })}
      {/* Arrows between blocks */}
      {[0, 1, 2].map(i => {
        const x1 = startX + (i + 1) * (blockW + blockGap) - blockGap;
        const x2 = x1 + blockGap;
        return (
          <g key={i}>
            <line x1={x1} y1={blockCy} x2={x2} y2={blockCy}
              stroke="currentColor" strokeOpacity={op * 0.54} strokeWidth="1.0" />
            <polyline points={`${x2 - 5},${blockCy - 3.5} ${x2},${blockCy} ${x2 - 5},${blockCy + 3.5}`}
              stroke="currentColor" strokeOpacity={op * 0.54} strokeWidth="1.0" />
          </g>
        );
      })}
      {/* Feedback loop */}
      <line x1={loopEndX} y1={blockY + blockH} x2={loopEndX} y2={loopY}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      <line x1={loopEndX} y1={loopY} x2={loopStartX} y2={loopY}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      <line x1={loopStartX} y1={loopY} x2={loopStartX} y2={blockY + blockH}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      <polyline
        points={`${loopStartX - 3.5},${blockY + blockH + 7} ${loopStartX},${blockY + blockH} ${loopStartX + 3.5},${blockY + blockH + 7}`}
        stroke="currentColor" strokeOpacity={op * 0.44} strokeWidth="1.0" />
      {/* Loop midpoint accent dot */}
      <circle cx={(loopStartX + loopEndX) / 2} cy={loopY} r={4}
        fill="currentColor" fillOpacity={op * 0.5} />
      {/* Accent dots inside publish block */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={lastBx + 14 + i * 14} cy={blockCy} r={3}
          fill="currentColor" fillOpacity={op * (0.38 + i * 0.14)} />
      ))}
      </g>
    </svg>
  );
}

// Card 05 — Global Marketing Infrastructure: blueprint grid + connected blocks
function DiagramInfrastructure({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.70 : 0.52;
  const gridLines: [number, number, number, number][] = [];
  for (let x = 25; x <= 460; x += 45) gridLines.push([x, 18, x, 222]);
  for (let y = 28; y <= 222; y += 45) gridLines.push([25, y, 460, y]);
  const hub = { x: 178, y: 98, w: 104, h: 44 };
  const hubCx = hub.x + hub.w / 2, hubCy = hub.y + hub.h / 2;
  const sats = [
    { x: 178, y: 34,  w: 104, h: 34 },
    { x: 316, y: 68,  w:  86, h: 34 },
    { x: 316, y: 136, w:  86, h: 34 },
    { x: 58,  y: 68,  w:  86, h: 34 },
    { x: 58,  y: 136, w:  86, h: 34 },
  ];
  return (
    <svg width="100%" viewBox="0 0 460 240" fill="none" aria-hidden="true">
      <g transform="translate(0, 18)">
      {/* Blueprint grid — very faint */}
      {gridLines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor" strokeOpacity={op * 0.1} strokeWidth="0.5" />
      ))}
      {/* Connection lines hub → satellites */}
      {sats.map((b, i) => {
        const bCx = b.x + b.w / 2, bCy = b.y + b.h / 2;
        return (
          <line key={i} x1={hubCx} y1={hubCy} x2={bCx} y2={bCy}
            stroke="currentColor" strokeOpacity={op * 0.4} strokeWidth="1.0" />
        );
      })}
      {/* Satellite blocks */}
      {sats.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h}
          stroke="currentColor" strokeOpacity={op * 0.7} strokeWidth="1.0" />
      ))}
      {/* Inner line in each satellite */}
      {sats.map((b, i) => (
        <line key={i} x1={b.x + 8} y1={b.y + b.h / 2} x2={b.x + b.w - 8} y2={b.y + b.h / 2}
          stroke="currentColor" strokeOpacity={op * 0.4} strokeWidth="1" />
      ))}
      {/* Hub block */}
      <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.35" />
      <line x1={hubCx} y1={hub.y + 10} x2={hubCx} y2={hub.y + hub.h - 10}
        stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="1" />
      <line x1={hub.x + 14} y1={hubCy} x2={hub.x + hub.w - 14} y2={hubCy}
        stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="1" />
      </g>
    </svg>
  );
}

const DIAGRAMS: Record<string, React.ComponentType<{ hovered: boolean }>> = {
  "01": DiagramDemandEngine,
  "02": DiagramVisibility,
  "03": DiagramLocalisation,
  "04": DiagramContentScale,
  "05": DiagramInfrastructure,
};

/* ─── Case card ────────────────────────────────── */
type Case = {
  id: string;
  slug: string;
  href?: string | null;
  meta: string;
  title: string;
  description: string;
};

function CaseCard({ c, prefersReduced }: { c: Case; prefersReduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Diagram = DIAGRAMS[c.id] ?? DiagramDemandEngine;
  const linked = c.href !== null;

  const inner = (
    <motion.div
      className="relative w-full h-full bg-ink text-cream flex flex-col overflow-hidden px-7 py-8 lg:p-10"
      animate={prefersReduced ? {} : { y: linked && hovered ? -5 : 0 }}
      transition={
        hovered
          ? { duration: 0.4, ease: EXPO_OUT }
          : { duration: 0.5, ease: STD_EASE }
      }
      whileHover={
        linked
          ? prefersReduced
            ? { boxShadow: "0 0 0 1px rgba(239,236,202,0.18)" }
            : { boxShadow: "0 18px 56px rgba(0,0,0,0.42), 0 0 0 1px rgba(239,236,202,0.1)" }
          : {}
      }
    >
      {/* Zone 1 — text content */}
      <div className="flex-none flex flex-col min-h-[200px] lg:min-h-[220px]">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/45 leading-none">
          {c.meta}
        </p>
        <h3 className="font-serif text-[28px] lg:text-[36px] font-[400] leading-[1.04] tracking-[-0.025em] text-cream mt-5 max-w-[92%]">
          {c.title}
        </h3>
        <p className="font-sans text-[15px] lg:text-[16px] text-cream/64 leading-[1.62] mt-4 max-w-[88%]">
          {c.description}
        </p>
      </div>

      {/* Zone 2 — diagram */}
      <div className="flex-none flex items-center justify-center text-cream h-[160px] pb-6 lg:h-auto lg:flex-1 lg:min-h-[240px] lg:pb-12">
        <div className="w-[56vw] min-w-[180px] max-w-[240px] lg:w-[82%] lg:max-w-[420px] mx-auto">
          <Diagram hovered={hovered} />
        </div>
      </div>

      {/* Zone 3 — footer */}
      <div className="mt-auto flex-none flex items-end justify-between pt-5 lg:pt-6">
        <span className="font-mono text-[11px] tracking-[0.08em] text-cream/45">
          {"// " + c.id}
        </span>
        {linked && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.08em] text-cream/70">View case</span>
            <motion.span
              className="font-mono text-[11px] tracking-[0.08em] text-cream/70 inline-block"
              animate={prefersReduced ? {} : { x: hovered ? 4 : 0 }}
              transition={
                hovered
                  ? { duration: 0.3, ease: EXPO_OUT }
                  : { duration: 0.4, ease: STD_EASE }
              }
            >
              →
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!linked) {
    return (
      <div
        className="case-card relative overflow-hidden block snap-start snap-always"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={c.href ?? `/cases/${c.slug}`}
      className="case-card relative overflow-hidden block snap-start snap-always focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </Link>
  );
}

/* ─── Cases section ────────────────────────────── */
export function CasesSection() {
  const prefersReduced = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  const cases = casesData.cases as Case[];

  return (
    <section
      id="cases"
      className="relative z-30 bg-mint pt-20 lg:pt-24 pb-20 lg:pb-24 scroll-mt-20"
    >
      {/* Header */}
      <div className="px-6 lg:px-14 xl:px-[5.5vw] mb-16 lg:mb-20">
        <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-12 lg:mb-16">
          {"// 04 — CASES"}
        </p>
        <h2
          className="font-serif font-[400] tracking-tight leading-[1.02] text-ink max-w-[880px] mb-6"
          style={{ fontSize: "clamp(2.75rem, 4.1vw, 4.75rem)" }}
        >
          Selected Systems in Practice
        </h2>
        <p className="font-sans font-[400] text-[15px] lg:text-[17px] leading-[1.65] text-ink/70 max-w-[560px]">
          Marketing built as systems. Each one a piece of infrastructure.
        </p>
      </div>

      {/* Card track — horizontal scroll */}
      <div
        ref={trackRef}
        className="flex gap-[28px] overflow-x-auto snap-x snap-mandatory no-scrollbar
          pl-6 lg:pl-14 xl:pl-[5.5vw]
          scroll-pl-6 lg:scroll-pl-14 xl:scroll-pl-[5.5vw]"
      >
        {cases.map((c) => (
          <CaseCard key={c.id} c={c} prefersReduced={prefersReduced} />
        ))}
        {/* Trailing spacer so last card scrolls fully into view */}
        <div className="flex-none w-6 lg:w-14 xl:w-[5.5vw]" aria-hidden="true" />
      </div>

      {/* Scroll progress indicator */}
      <div aria-hidden="true" className="flex justify-center mt-9 lg:mt-16">
        <div className="relative h-[2px] w-[48vw] min-w-[140px] max-w-[220px] lg:w-[44vw] lg:min-w-[260px] lg:max-w-[520px]">
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/15" />
          <div
            className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 origin-left bg-ink/55"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
