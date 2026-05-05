"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const TIMELINE = [
  {
    id: "01",
    year: "2025–Present",
    capability: "Global B2B Marketing Systems",
    context: "POCSTARS · Global Marketing Manager",
    description:
      "Built global-facing website, multilingual content, search visibility, sales enablement, and inbound demand pathways.",
  },
  {
    id: "02",
    year: "Now",
    capability: "AI-Assisted Marketing Workflows",
    context: "Independent Practice",
    description:
      "Building AI-assisted workflows for content production, localisation, research, and marketing operations.",
  },
  {
    id: "03",
    year: "2024",
    capability: "B2B Technical Content",
    context: "Aeson Power · Content Marketing Manager",
    description:
      "Translated complex energy storage topics into clearer B2B market-facing content.",
  },
  {
    id: "04",
    year: "2018–2020",
    capability: "Content Growth Systems",
    context: "CREYI · Creative Planning Director",
    description:
      "Led creative direction and repeatable content formats for short-video growth across platforms.",
  },
  {
    id: "05",
    year: "2017–2018",
    capability: "Global Brand Localisation",
    context: "Garmin · Content Planning",
    description:
      "Translated global product messages and technical features into local, user-facing content.",
  },
  {
    id: "06",
    year: "2014–2017",
    capability: "Brand Campaign Foundations",
    context: "FAJI Advertising · Senior Copywriter",
    description:
      "Foundation in brand messaging, campaign thinking, and creative execution for international brands.",
  },
] as const;

type TimelineItem = (typeof TIMELINE)[number];

// Line geometry helpers
const N_ITEMS = TIMELINE.length; // 6
const LINE_OVERHANG = 32; // px before first marker / after last marker

function computeLineMetrics(): { left: number; width: number } {
  if (typeof window === "undefined") {
    // SSR safe: use lg defaults (pl-14 = 56px, item 340px)
    return { left: 56 - LINE_OVERHANG, width: (N_ITEMS - 1) * 340 + LINE_OVERHANG * 2 };
  }
  const isXl = window.innerWidth >= 1280;
  // Leading padding: pl-14 = 3.5rem = 56px; xl:pl-[5.5vw]
  const leadingPx = isXl ? window.innerWidth * 0.055 : 56;
  // Item width: w-[340px] lg, xl:w-[360px]
  const itemW = isXl ? 360 : 340;
  return {
    left: leadingPx - LINE_OVERHANG,
    width: (N_ITEMS - 1) * itemW + LINE_OVERHANG * 2,
  };
}

function DesktopTimelineItem({
  item,
  isCurrent,
}: {
  item: TimelineItem;
  isCurrent: boolean;
}) {
  return (
    <div className="group flex-none w-[340px] xl:w-[360px] pr-12 cursor-default">
      {/* Marker — sits on the horizontal line */}
      <div
        className={`relative z-10 w-[7px] h-[7px] mt-[11px] mb-8 rounded-full transition-colors duration-200 ${
          isCurrent
            ? "bg-ink/62 border border-ink/50"
            : "border border-ink/25 bg-surface-100 group-hover:bg-ink/45 group-hover:border-ink/55"
        }`}
        style={
          isCurrent ? { boxShadow: "0 0 0 2.5px rgba(23,22,18,0.14)" } : undefined
        }
      />
      {/* Content */}
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/40 mb-3">
        {item.year}
      </p>
      <h3
        className={`font-serif text-[19px] font-[400] leading-[1.1] tracking-[-0.01em] mb-2 transition-colors duration-200 ${
          isCurrent
            ? "text-ink/90"
            : "text-ink/78 group-hover:text-ink"
        }`}
      >
        {item.capability}
      </h3>
      <p className="font-mono text-[10px] tracking-[0.08em] text-ink/42 mb-4">
        {item.context}
      </p>
      <p
        className={`font-sans text-[13px] lg:text-[14px] leading-[1.65] max-w-[270px] ${
          isCurrent ? "text-ink/68" : "text-ink/55"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}

function MobileTimelineItem({
  item,
  isActive,
  isLast,
  itemRef,
  index,
}: {
  item: TimelineItem;
  isActive: boolean;
  isLast: boolean;
  itemRef: (el: HTMLDivElement | null) => void;
  index: number;
}) {
  return (
    <div
      ref={itemRef}
      data-index={index}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Left marker + vertical connector */}
      <div className="flex-none flex flex-col items-center pt-[3px]">
        <div
          className={`w-[7px] h-[7px] rounded-full flex-none relative z-10 transition-all duration-200 ${
            isActive
              ? "bg-ink/62 border border-ink/50"
              : "border border-ink/25 bg-surface-100"
          }`}
          style={
            isActive
              ? { boxShadow: "0 0 0 2.5px rgba(23,22,18,0.14), 0 0 0 8px rgba(23,22,18,0.09)" }
              : undefined
          }
        />
        {/* Connector line: full-height for non-final, short fixed for final */}
        {isLast ? (
          <div
            className="h-[72px] w-px mt-2"
            style={{ background: "rgba(23,22,18,0.10)" }}
          />
        ) : (
          <div
            className="flex-1 w-px mt-2"
            style={{ background: "rgba(23,22,18,0.10)" }}
          />
        )}
      </div>
      {/* Content */}
      <div className="flex-1 pb-1">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/40 mb-2">
          {item.year}
        </p>
        <h3
          className={`font-serif text-[18px] font-[400] leading-[1.1] tracking-[-0.01em] mb-2 transition-colors duration-200 ${
            isActive ? "text-ink/90" : "text-ink/78"
          }`}
        >
          {item.capability}
        </h3>
        <p className="font-mono text-[10px] tracking-[0.08em] text-ink/42 mb-3">
          {item.context}
        </p>
        <p
          className={`font-sans text-[14px] leading-[1.65] transition-colors duration-200 ${
            isActive ? "text-ink/68" : "text-ink/55"
          }`}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function CareerTimelineSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lineMetrics, setLineMetrics] = useState<{ left: number; width: number }>({
    left: 56 - LINE_OVERHANG,
    width: (N_ITEMS - 1) * 340 + LINE_OVERHANG * 2,
  });
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
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

  useEffect(() => {
    setLineMetrics(computeLineMetrics());
    const onResize = () => setLineMetrics(computeLineMetrics());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMobileIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { root: null, rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="career-timeline"
      className="relative z-40 bg-surface-100 pt-20 lg:pt-24 pb-20 lg:pb-24"
    >
      {/* Header */}
      <div className="px-6 lg:px-14 xl:px-[5.5vw] mb-16 lg:mb-20">
        <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-12 lg:mb-16">
          {"// 05 — CAREER TIMELINE"}
        </p>
        <h2
          className="font-serif font-[400] tracking-tight leading-[1.02] text-ink max-w-[760px] mb-6"
          style={{ fontSize: "clamp(2.25rem, 3.5vw, 3.75rem)" }}
        >
          A career built through content, systems, and markets.
        </h2>
        <p className="font-sans font-[400] text-[15px] lg:text-[17px] leading-[1.65] text-ink/65 max-w-[560px]">
          A path from brand and content foundations to technical B2B marketing,
          global systems, and AI-assisted workflows.
        </p>
      </div>

      {/* Desktop horizontal timeline */}
      <div
        ref={trackRef}
        className="hidden lg:block overflow-x-auto no-scrollbar overscroll-x-contain"
      >
        <div className="relative flex w-max min-w-full pl-14 xl:pl-[5.5vw]">
          {/* Base timeline line */}
          <div
            className="absolute top-[14px] h-px pointer-events-none"
            style={{ left: lineMetrics.left, width: lineMetrics.width, background: "rgba(23,22,18,0.10)" }}
          />
          {/* Active progress fill */}
          <div
            aria-hidden="true"
            className="absolute top-[14px] pointer-events-none origin-left"
            style={{
              left: lineMetrics.left,
              width: lineMetrics.width,
              height: "1.5px",
              background: "rgba(23,22,18,0.35)",
              transform: `scaleX(${progress})`,
            }}
          />
          {TIMELINE.map((item) => (
            <DesktopTimelineItem
              key={item.id}
              item={item}
              isCurrent={item.id === "01"}
            />
          ))}
          <div className="flex-none w-14 xl:w-[5.5vw]" aria-hidden="true" />
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="lg:hidden px-6 relative">
        {TIMELINE.map((item, i) => (
          <MobileTimelineItem
            key={item.id}
            item={item}
            isActive={activeMobileIndex === i}
            isLast={i === TIMELINE.length - 1}
            itemRef={(el) => { itemRefs.current[i] = el; }}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
