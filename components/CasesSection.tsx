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
      width="200"
      height="200"
      viewBox="-100 -100 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="0" cy="0" r="70"
        stroke="currentColor" strokeWidth="1.5"
        strokeOpacity={strokeOpacity}
        style={{ transition: "stroke-opacity 400ms" }}
      />
      <rect
        x="-30" y="-30" width="60" height="60"
        stroke="currentColor" strokeWidth="1.5"
        strokeOpacity={strokeOpacity}
        style={{ transition: "stroke-opacity 400ms" }}
      />
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
      className="case-card block flex-none snap-start snap-always focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative w-full h-full bg-ink text-cream flex flex-col overflow-hidden p-6 lg:p-11"
        animate={prefersReduced ? {} : { y: hovered ? -6 : 0 }}
        transition={
          hovered
            ? { duration: 0.4, ease: EXPO_OUT }
            : { duration: 0.5, ease: STD_EASE }
        }
        whileHover={
          prefersReduced
            ? { boxShadow: "0 0 0 1px rgba(239,236,202,0.2)" }
            : { boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(239,236,202,0.12)" }
        }
      >
        {/* Zone 1 — top content */}
        <div className="flex-none flex flex-col">
          <p className="font-mono text-xs tracking-widest uppercase text-cream/55">
            {c.meta}
          </p>
          <h3 className="font-serif text-2xl lg:text-3xl font-normal leading-tight tracking-[-0.02em] text-cream mt-4 lg:mt-5">
            {c.title}
          </h3>
          <p className="font-sans text-sm lg:text-base text-cream/70 leading-relaxed mt-3 lg:mt-4 line-clamp-3">
            {c.description}
          </p>
        </div>

        {/* Zone 2 — icon (absorbs remaining space) */}
        <div
          className="flex-1 flex items-center justify-center text-cream min-h-0"
          style={iconStyle}
        >
          <IconPlaceholder hovered={hovered} />
        </div>

        {/* Zone 3 — footer */}
        <div className="flex-none flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-cream/55">
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
    <section
      className="relative z-30 bg-surface-200 pt-[8vh] pb-[8vh]"
      style={{ minHeight: "max(140vh, calc(60vh + 960px))" }}
    >
      {/* Zone B — header block, 52vh tall on desktop so cards start at ~60vh */}
      <div className="px-6 lg:px-14 xl:px-[5.5vw] mb-6 lg:h-[52vh] flex flex-col">
        <div className="section-label mb-sp-6">{"// 04 — cases"}</div>
        <h2 className="font-serif text-4xl lg:text-7xl font-light tracking-[-0.02em] leading-[1.0] text-ink mb-4 lg:mb-6">
          Selected Systems in Practice
        </h2>
        <p className="font-sans text-sm lg:text-lg text-ink/75 leading-[1.6]">
          Marketing built as systems. Each one a piece of infrastructure.
        </p>
      </div>

      {/* Zone C — horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pl-6 lg:pl-14 xl:pl-[5.5vw] pr-6"
      >
        {cases.map((c) => (
          <CaseCard key={c.id} c={c} prefersReduced={prefersReduced} />
        ))}
        {/* Trailing spacer so last card scrolls fully into view */}
        <div className="flex-none w-6 lg:w-14 xl:w-[5.5vw]" aria-hidden="true" />
      </div>

      {/* Zone D — scroll progress bar, desktop only */}
      <div className="hidden lg:block px-14 xl:px-[5.5vw] mt-10">
        <div className="h-px w-full bg-ink/15 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-ink/60 origin-left"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}
