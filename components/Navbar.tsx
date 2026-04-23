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
        "fixed z-50 flex items-center gap-5",
        "bg-[var(--surface-100)]",
        "rounded-full border",
        "transition-[top,padding,border-color] duration-normal ease-standard",
        scrolled
          ? "top-4 px-2 py-2 pl-5 border-black/15"
          : "top-2 px-2 py-2 pl-5 border-black/10",
      ].join(" ")}
    >
      {/* Logo */}
      <a href="/" className="font-serif text-[15px] font-semibold tracking-tight leading-none select-none">
        DL
      </a>

      {/* Nav links */}
      <ul className="flex items-center gap-0.5" role="menubar">
        {NAV_LINKS.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="block px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] rounded-full hover:bg-black/[0.06] transition-colors duration-normal"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA icon button — fill-wipe hover */}
      <a
        href="#work"
        className="fill-wipe-trigger group relative overflow-hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/15 transition-colors duration-normal"
        aria-label="View work"
      >
        <span className="fill-wipe" />
        <svg
          className="relative z-10 group-hover:text-[var(--surface-100)] transition-colors duration-normal"
          width="14"
          height="14"
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
