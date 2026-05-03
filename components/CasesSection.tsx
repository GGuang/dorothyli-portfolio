"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import casesData from "@/_context/cases.json";

const EXPO_OUT = [0.32, 0.72, 0, 1] as [number, number, number, number];
const STD_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ─── Per-card SVG diagrams ─────────────────────── */

// Card 01 — Web Demand Engine: radial inbound pipeline
function DiagramDemandEngine({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.62 : 0.42;
  // 5 nodes on orbit ring, starting at top (270°), 72° apart
  const cx = 250, cy = 130, r = 95;
  const nodes = [
    [250, 35],          // top — enquiry
    [345, 100],         // upper-right — website  (cos-18°≈0.951, sin-18°≈-0.309)
    [309, 212],         // lower-right — content  (cos54°≈0.588,  sin54°≈0.809)
    [191, 212],         // lower-left  — search
    [155, 100],         // upper-left  — form
  ] as const;
  return (
    <svg width="100%" viewBox="0 0 500 260" fill="none" aria-hidden="true">
      {/* Orbit ring — dashed */}
      <circle cx={cx} cy={cy} r={r}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75"
        strokeDasharray="4 5" />
      {/* Radial spokes from nodes to center */}
      {nodes.map(([nx, ny], i) => (
        <line key={i} x1={nx} y1={ny} x2={cx} y2={cy}
          stroke="currentColor" strokeOpacity={op * 0.35} strokeWidth="0.75" />
      ))}
      {/* Outer node circles */}
      {nodes.map(([nx, ny], i) => (
        <circle key={i} cx={nx} cy={ny} r={5}
          stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      ))}
      {/* Inner orbit ring */}
      <circle cx={cx} cy={cy} r={28}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      {/* Center demand node — filled to mask spoke ends */}
      <circle cx={cx} cy={cy} r={18}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25"
        fill="#171612" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={5}
        fill="currentColor" fillOpacity={op * 0.7} />
    </svg>
  );
}

// Card 02 — Answer-Ready B2B Visibility: query → content blocks → AI answer
function DiagramVisibility({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.62 : 0.42;
  // Content block y positions
  const blockYs = [72, 96, 120, 144, 168];
  const blockLeft = 155, blockW = 100;
  const answerX = 305, answerY = 85, answerW = 130, answerH = 90;
  return (
    <svg width="100%" viewBox="0 0 500 260" fill="none" aria-hidden="true">
      {/* Query node — left circle */}
      <circle cx={68} cy={130} r={26}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      {/* Search lens handle */}
      <line x1={82} y1={144} x2={96} y2={158}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      <circle cx={65} cy={127} r={10}
        stroke="currentColor" strokeOpacity={op * 0.7} strokeWidth="1" />
      {/* Arrow from query to content */}
      <line x1={95} y1={130} x2={148} y2={130}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      <polyline points="143,125 148,130 143,135"
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      {/* Indexed content blocks — middle */}
      {blockYs.map((y, i) => (
        <rect key={i} x={blockLeft} y={y} width={blockW} height={14}
          stroke="currentColor" strokeOpacity={op * (0.5 + i * 0.1)} strokeWidth="0.75" />
      ))}
      {/* Fan lines from content blocks converging to answer frame (prism) */}
      {blockYs.map((y, i) => (
        <line key={i} x1={blockLeft + blockW} y1={y + 7} x2={answerX} y2={answerY + answerH / 2}
          stroke="currentColor" strokeOpacity={op * 0.3} strokeWidth="0.75" />
      ))}
      {/* Answer frame — right */}
      <rect x={answerX} y={answerY} width={answerW} height={answerH}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      {/* Text lines inside answer frame */}
      {[0, 1, 2].map(i => (
        <line key={i} x1={answerX + 14} y1={answerY + 22 + i * 18}
          x2={answerX + 14 + [80, 60, 45][i]} y2={answerY + 22 + i * 18}
          stroke="currentColor" strokeOpacity={op * 0.6} strokeWidth="1" />
      ))}
    </svg>
  );
}

// Card 03 — Technical Content Localisation: spec grid → bridge → narrative text
function DiagramLocalisation({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.62 : 0.42;
  // 4×5 grid of small spec squares — left
  const gridCols = 5, gridRows = 4, sq = 13, gap = 4;
  const gx0 = 55, gy0 = 92;
  const gridSquares = Array.from({ length: gridRows }, (_, r) =>
    Array.from({ length: gridCols }, (_, c) => [
      gx0 + c * (sq + gap),
      gy0 + r * (sq + gap),
    ])
  ).flat();
  // Narrative text lines — right (varying widths)
  const narLines = [
    [305, 97,  130],
    [305, 116, 105],
    [305, 135, 140],
    [305, 154, 88],
    [305, 173, 120],
  ] as const;
  const bridgeMidX = 230, midY = 130;
  return (
    <svg width="100%" viewBox="0 0 500 260" fill="none" aria-hidden="true">
      {/* Spec grid — left */}
      {gridSquares.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={sq} height={sq}
          stroke="currentColor" strokeOpacity={op * 0.7} strokeWidth="0.75" />
      ))}
      {/* Bridge bracket marks */}
      <polyline
        points={`${gx0 + gridCols * (sq + gap) - gap},${gy0} ${bridgeMidX},${midY} ${gx0 + gridCols * (sq + gap) - gap},${gy0 + gridRows * (sq + gap) - gap}`}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" fill="none" />
      {/* Arrow shaft */}
      <line x1={bridgeMidX} y1={midY} x2={298} y2={midY}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      <polyline points="293,125 298,130 293,135"
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      {/* Narrative lines — right */}
      {narLines.map(([x, y, w], i) => (
        <line key={i} x1={x} y1={y} x2={x + w} y2={y}
          stroke="currentColor" strokeOpacity={op * (0.5 + i * 0.08)} strokeWidth="1.25" />
      ))}
      {/* Bracket right side */}
      <polyline
        points={`${303},${97 - 6} ${303 - 8},${97 - 6} ${303 - 8},${173 + 6} ${303},${173 + 6}`}
        stroke="currentColor" strokeOpacity={op * 0.4} strokeWidth="0.75" fill="none" />
    </svg>
  );
}

// Card 04 — Content at Scale: hexagonal engine with radial output nodes
function DiagramContentScale({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.62 : 0.42;
  const cx = 250, cy = 130;
  // Flat-top hexagon vertices at r=34
  const hexR = 34;
  const hexVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180);
    return [cx + hexR * Math.cos(a), cy + hexR * Math.sin(a)];
  });
  const hexPath = hexVerts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";
  // 6 outer nodes at r=95
  const outerR = 95;
  const outerNodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60) * (Math.PI / 180);
    return [cx + outerR * Math.cos(a), cy + outerR * Math.sin(a)];
  });
  return (
    <svg width="100%" viewBox="0 0 500 260" fill="none" aria-hidden="true">
      {/* Outer ring connecting nodes */}
      <polygon
        points={outerNodes.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")}
        stroke="currentColor" strokeOpacity={op * 0.35} strokeWidth="0.75"
        strokeDasharray="4 5" />
      {/* Spoke lines from hex center to outer nodes */}
      {outerNodes.map(([nx, ny], i) => (
        <line key={i} x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="currentColor" strokeOpacity={op * 0.3} strokeWidth="0.75" />
      ))}
      {/* Outer node circles */}
      {outerNodes.map(([nx, ny], i) => (
        <circle key={i} cx={nx} cy={ny} r={6}
          stroke="currentColor" strokeOpacity={op} strokeWidth="1.25" />
      ))}
      {/* Center hexagon */}
      <path d={hexPath}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.25"
        fill="#171612" />
      {/* Inner hex dot */}
      <circle cx={cx} cy={cy} r={6}
        fill="currentColor" fillOpacity={op * 0.7} />
    </svg>
  );
}

// Card 05 — Global Marketing Infrastructure: connected block blueprint
function DiagramInfrastructure({ hovered }: { hovered: boolean }) {
  const op = hovered ? 0.62 : 0.42;
  // 6 blocks: hub + 5 modules
  const hub  = { x: 200, y: 107, w: 100, h: 46 };
  const blocks = [
    { x: 200, y: 30,  w: 100, h: 40 },  // website (top)
    { x: 330, y: 68,  w:  90, h: 38 },  // brand (right-top)
    { x: 330, y: 150, w:  90, h: 38 },  // social (right-bottom)
    { x: 80,  y: 68,  w:  90, h: 38 },  // events (left-top)
    { x: 80,  y: 150, w:  90, h: 38 },  // sales (left-bottom)
  ];
  // Connection endpoints: center of hub → center of each block
  const hubCx = hub.x + hub.w / 2, hubCy = hub.y + hub.h / 2;
  // Faint grid lines (blueprint feel)
  const gridLines: [number, number, number, number][] = [];
  for (let x = 20; x <= 480; x += 40) gridLines.push([x, 20, x, 240]);
  for (let y = 30; y <= 230; y += 40) gridLines.push([20, y, 480, y]);
  return (
    <svg width="100%" viewBox="0 0 500 260" fill="none" aria-hidden="true">
      {/* Blueprint grid */}
      {gridLines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor" strokeOpacity={op * 0.15} strokeWidth="0.5" />
      ))}
      {/* Connection lines from hub to each module */}
      {blocks.map((b, i) => {
        const bCx = b.x + b.w / 2, bCy = b.y + b.h / 2;
        return (
          <line key={i} x1={hubCx} y1={hubCy} x2={bCx} y2={bCy}
            stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="1" />
        );
      })}
      {/* Junction dots */}
      {blocks.map((b, i) => {
        const bCx = b.x + b.w / 2, bCy = b.y + b.h / 2;
        const mx = (hubCx + bCx) / 2, my = (hubCy + bCy) / 2;
        return <circle key={i} cx={mx} cy={my} r={2.5}
          fill="currentColor" fillOpacity={op * 0.6} />;
      })}
      {/* Module blocks */}
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h}
          stroke="currentColor" strokeOpacity={op * 0.8} strokeWidth="1" />
      ))}
      {/* Inner detail lines in module blocks */}
      {blocks.map((b, i) => (
        <line key={i}
          x1={b.x + 8} y1={b.y + b.h / 2}
          x2={b.x + b.w - 8} y2={b.y + b.h / 2}
          stroke="currentColor" strokeOpacity={op * 0.45} strokeWidth="0.75" />
      ))}
      {/* Hub block */}
      <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h}
        stroke="currentColor" strokeOpacity={op} strokeWidth="1.5" />
      {/* Hub inner cross */}
      <line x1={hubCx} y1={hub.y + 10} x2={hubCx} y2={hub.y + hub.h - 10}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
      <line x1={hub.x + 12} y1={hubCy} x2={hub.x + hub.w - 12} y2={hubCy}
        stroke="currentColor" strokeOpacity={op * 0.5} strokeWidth="0.75" />
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
  meta: string;
  title: string;
  description: string;
};

function CaseCard({ c, prefersReduced }: { c: Case; prefersReduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Diagram = DIAGRAMS[c.id] ?? DiagramDemandEngine;

  return (
    <Link
      href={`/cases/${c.slug}`}
      className="case-card relative overflow-hidden block snap-start snap-always focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative w-full h-full bg-ink text-cream flex flex-col overflow-hidden px-7 py-8 lg:p-10"
        animate={prefersReduced ? {} : { y: hovered ? -5 : 0 }}
        transition={
          hovered
            ? { duration: 0.4, ease: EXPO_OUT }
            : { duration: 0.5, ease: STD_EASE }
        }
        whileHover={
          prefersReduced
            ? { boxShadow: "0 0 0 1px rgba(239,236,202,0.18)" }
            : { boxShadow: "0 18px 56px rgba(0,0,0,0.42), 0 0 0 1px rgba(239,236,202,0.1)" }
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
        <div className="flex-none flex items-center justify-center text-cream h-[160px] py-2 lg:h-auto lg:flex-1 lg:min-h-[260px]">
          <div className="w-[58vw] min-w-[190px] max-w-[250px] lg:w-[88%] lg:max-w-[460px] mx-auto">
            <Diagram hovered={hovered} />
          </div>
        </div>

        {/* Zone 3 — footer CTA */}
        <div className="mt-auto flex-none flex items-end justify-between pt-5 lg:pt-6">
          <span className="font-mono text-[11px] tracking-[0.08em] text-cream/45">
            {"// " + c.id}
          </span>
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
        </div>
      </motion.div>
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
      className="relative z-30 bg-mint pt-20 lg:pt-24 pb-20 lg:pb-24"
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
