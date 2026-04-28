"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import casesData from "@/_context/cases.json";

const EXPO_OUT = [0.32, 0.72, 0, 1] as [number, number, number, number];
const STD_EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ─── Icon placeholder ─────────────────────────── */
function IconPlaceholder({ hovered }: { hovered: boolean }) {
  const strokeOpacity = hovered ? 0.7 : 0.3;
  return (
    <svg
      width="280"
      height="280"
      viewBox="-100 -100 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="0" cy="0" r="70"
        stroke="currentColor" strokeWidth="1"
        strokeOpacity={strokeOpacity}
        style={{ transition: "stroke-opacity 400ms" }}
      />
      <rect
        x="-30" y="-30" width="60" height="60"
        stroke="currentColor" strokeWidth="1"
        strokeOpacity={strokeOpacity}
        style={{ transition: "stroke-opacity 400ms" }}
      />
      {[[-100, -100], [100, -100], [-100, 100], [100, 100]].map(([cx, cy], i) => (
        <g key={i}>
          <line
            x1={cx} y1={cy} x2={cx + (cx < 0 ? 8 : -8)} y2={cy}
            stroke="currentColor" strokeWidth="0.75"
            strokeOpacity={strokeOpacity * 0.5}
            style={{ transition: "stroke-opacity 400ms" }}
          />
          <line
            x1={cx} y1={cy} x2={cx} y2={cy + (cy < 0 ? 8 : -8)}
            stroke="currentColor" strokeWidth="0.75"
            strokeOpacity={strokeOpacity * 0.5}
            style={{ transition: "stroke-opacity 400ms" }}
          />
        </g>
      ))}
    </svg>
  );
}

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

  const iconStyle: React.CSSProperties = {
    animationName: hovered && !prefersReduced ? "icon-spin" : "none",
    animationDuration: "24s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: hovered && !prefersReduced ? "running" : "paused",
  };

  return (
    <Link
      href={`/cases/${c.slug}`}
      className="block flex-none snap-start snap-always focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60 rounded-sm
        w-[min(86vw,380px)] h-[min(120vw,540px)]
        lg:w-[700px] lg:h-[980px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative w-full h-full bg-ink text-cream flex flex-col overflow-hidden
          p-7 lg:p-12"
        animate={prefersReduced ? {} : { y: hovered ? -6 : 0 }}
        transition={
          hovered
            ? { duration: 0.4, ease: EXPO_OUT }
            : { duration: 0.5, ease: STD_EASE }
        }
        whileHover={
          prefersReduced
            ? { boxShadow: "0 0 0 1px rgba(239,236,202,0.2)" }
            : { boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,236,202,0.12)" }
        }
      >
        {/* Zone 1 — top content */}
        <div className="flex flex-col">
          <p className="font-mono text-xs tracking-widest uppercase text-cream/55">
            {c.meta}
          </p>
          <h3 className="font-serif text-2xl lg:text-4xl font-normal leading-[1.1] tracking-[-0.02em] text-cream mt-4">
            {c.title}
          </h3>
          <p
            className="font-sans text-sm lg:text-base text-cream/70 leading-[1.55] mt-4"
            style={{ maxWidth: "80%" }}
          >
            {c.description}
          </p>
        </div>

        {/* Zone 2 — icon (grows to fill remaining space) */}
        <div
          className="flex-1 flex items-center justify-center text-cream min-h-0"
          style={iconStyle}
        >
          <IconPlaceholder hovered={hovered} />
        </div>

        {/* Zone 3 — footer */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-cream/50">
            {"// " + c.id}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cream/85">View case</span>
            <motion.span
              className="font-mono text-xs text-cream/85 inline-block"
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
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const cases = casesData.cases as Case[];

  return (
    <section className="relative z-30 bg-surface-200 pt-32 pb-32">
      {/* Section header */}
      <div className="px-6 lg:px-14 xl:px-[5.5vw] mb-20">
        <div className="section-label mb-sp-6">{"// 04 — cases"}</div>
        <h2 className="font-serif text-token-3xl lg:text-token-4xl font-light tracking-[-0.02em] leading-[1.0] text-ink mb-sp-6 max-w-[70vw]">
          Selected Systems in Practice
        </h2>
        <p className="font-sans text-token-sm text-ink/55 leading-[1.6]">
          Marketing built as systems. Each one a piece of infrastructure.
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 lg:gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar
          pl-6 lg:pl-14 xl:pl-[5.5vw] pr-6"
      >
        {cases.map((c) => (
          <CaseCard key={c.id} c={c} prefersReduced={prefersReduced} />
        ))}
        {/* Trailing spacer so last card can scroll fully into view */}
        <div className="flex-none w-6 lg:w-14 xl:w-[5.5vw]" aria-hidden="true" />
      </div>

      {/* Scroll progress bar — desktop only */}
      <div className="hidden lg:block px-14 xl:px-[5.5vw] mt-12">
        <div className="h-px w-full bg-ink/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-ink/40 origin-left"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}
