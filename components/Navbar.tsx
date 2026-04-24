"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = ["Work", "About", "Lab"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
    <nav
      style={{ left: "50%", transform: "translateX(-50%)" }}
      className={[
        "flex fixed z-50 items-center gap-3 md:gap-6",
        "bg-[var(--surface-100)] rounded-full border",
        "transition-[top,border-color] duration-normal ease-standard",
        // Mobile: 88vw wide; md+: auto width
        "w-[92vw] md:w-auto",
        scrolled
          ? "top-3 md:top-4 px-2 md:pr-1.5 py-1.5 md:py-2.5 pl-4 md:pl-6 border-black/15"
          : "top-2 px-2 md:pr-1.5 py-1.5 md:py-2.5 pl-4 md:pl-6 border-black/10",
      ].join(" ")}
    >
      <a href="/" className="font-serif text-[14px] md:text-[17px] font-semibold tracking-tight leading-none select-none shrink-0">
        DL
      </a>
      <ul className="hidden md:flex items-center gap-0 md:gap-1 flex-1 justify-center md:flex-none md:justify-start" role="menubar">
        {NAV_LINKS.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="block px-2.5 md:px-3.5 py-1.5 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.05em] rounded-full hover:bg-black/[0.06] transition-colors duration-normal"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setMenuOpen(true)}
        className="fill-wipe-trigger group relative overflow-hidden inline-flex items-center justify-center w-10 h-10 md:w-10 md:h-10 rounded-full bg-[var(--inv-100)] border-0 transition-colors duration-normal shrink-0 md:hidden"
        aria-label="Open menu"
      >
        <span className="fill-wipe" />
        <svg
          className="relative z-10 text-[var(--surface-100)] transition-colors duration-normal"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 7.5h9m-4-4 4 4-4 4" />
        </svg>
      </button>
      <a
        href="#work"
        className="fill-wipe-trigger group relative overflow-hidden hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--inv-100)] border-0 transition-colors duration-normal shrink-0"
        aria-label="View work"
      >
        <span className="fill-wipe" />
        <svg
          className="relative z-10 text-[var(--surface-100)] transition-colors duration-normal"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 7.5h9m-4-4 4 4-4 4" />
        </svg>
      </a>
    </nav>

    {menuOpen && (
      <div
        role="dialog"
        aria-modal="true"
        className="md:hidden fixed inset-0 z-[60] bg-[var(--surface-100)] flex flex-col"
      >
        {/* 顶部 bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <span className="font-serif text-[17px] font-semibold tracking-tight leading-none">
            DL
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--inv-100)]"
          >
            <svg
              width="15" height="15" viewBox="0 0 15 15"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-[var(--surface-100)]"
            >
              <path d="M3 3l9 9M12 3l-9 9" />
            </svg>
          </button>
        </div>

        {/* 列表 */}
        <ul className="flex-1 flex flex-col px-6 mt-4">
          {NAV_LINKS.map((item) => (
            <li key={item} className="border-b border-black/10">
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-6 font-serif text-[44px] leading-tight"
              >
                {item}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/20">
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 7.5h9m-4-4 4 4-4 4" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* 底部签名 */}
        <div className="px-6 pb-8">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase opacity-60">
            DOROTHYLI.ME
          </span>
        </div>
      </div>
    )}
    </>
  );
}
