"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = ["Work", "About", "Lab"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{ left: "50%", transform: "translateX(-50%)" }}
      className={[
        "flex fixed z-50 items-center gap-3 md:gap-5",
        "bg-[var(--surface-100)] rounded-full border",
        "transition-[top,border-color] duration-normal ease-standard",
        // Mobile: 88vw wide; md+: auto width
        "w-[88vw] md:w-auto",
        scrolled
          ? "top-3 md:top-4 px-2 py-1.5 md:py-2 pl-4 md:pl-5 border-black/15"
          : "top-2 px-2 py-1.5 md:py-2 pl-4 md:pl-5 border-black/10",
      ].join(" ")}
    >
      <a href="/" className="font-serif text-[14px] md:text-[15px] font-semibold tracking-tight leading-none select-none shrink-0">
        DL
      </a>
      <ul className="flex items-center gap-0 md:gap-0.5 flex-1 justify-center md:flex-none md:justify-start" role="menubar">
        {NAV_LINKS.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="block px-2.5 md:px-3 py-1.5 font-mono text-[11px] md:text-[10px] uppercase tracking-[0.05em] rounded-full hover:bg-black/[0.06] transition-colors duration-normal"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#work"
        className="fill-wipe-trigger group relative overflow-hidden inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-black/15 transition-colors duration-normal shrink-0"
        aria-label="View work"
      >
        <span className="fill-wipe" />
        <svg
          className="relative z-10 group-hover:text-[var(--surface-100)] transition-colors duration-normal"
          width="13"
          height="13"
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 7.5h9m-4-4 4 4-4 4" />
        </svg>
      </a>
    </nav>
  );
}
