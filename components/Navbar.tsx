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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Mobile header bar (hidden md+) ─────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14",
          "transition-colors duration-150 md:hidden",
          menuOpen ? "bg-[#f9f9f0]" : "bg-transparent",
        ].join(" ")}
      >
        <a
          href="/"
          className="font-serif text-[16px] font-semibold tracking-tight leading-none text-[#0f0e0b]"
        >
          DL
        </a>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="w-8 h-8 flex items-center justify-center text-[#0f0e0b]"
        >
          {menuOpen ? (
            // Close (×)
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          ) : (
            // Hamburger
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6">
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="6" x2="18" y2="6" />
              <line x1="0" y1="11" x2="18" y2="11" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Mobile full-screen menu ─────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f9f9f0] flex flex-col px-8 pt-20 pb-12 md:hidden">
          <nav className="flex flex-col flex-1 justify-center gap-0">
            {NAV_LINKS.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-serif font-[300] tracking-[-0.02em] leading-[1.0] text-[#0f0e0b] border-b border-black/10 py-6"
                style={{ fontSize: "clamp(3rem, 14vw, 4.5rem)" }}
              >
                <span className="text-[#9d937c] font-mono text-[10px] uppercase tracking-[0.06em] mr-3 align-middle">
                  0{i + 1}
                </span>
                {item}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[9px] uppercase tracking-[0.07em] text-[#9d937c]">
            dorothyli.me
          </p>
        </div>
      )}

      {/* ── Desktop pill navbar (hidden below md) ──────────────────── */}
      <nav
        style={{ left: "50%", transform: "translateX(-50%)" }}
        className={[
          "hidden md:flex fixed z-50 items-center gap-5",
          "bg-[var(--surface-100)] rounded-full border",
          "transition-[top,padding,border-color] duration-normal ease-standard",
          scrolled
            ? "top-4 px-2 py-2 pl-5 border-black/15"
            : "top-2 px-2 py-2 pl-5 border-black/10",
        ].join(" ")}
      >
        <a href="/" className="font-serif text-[15px] font-semibold tracking-tight leading-none select-none">
          DL
        </a>
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
    </>
  );
}
