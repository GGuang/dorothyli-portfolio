export function Footer() {
  return (
    <footer id="contact" className="relative bg-surface-100 px-6 lg:px-14 xl:px-[5.5vw] pt-10 pb-9 lg:pt-12 lg:pb-10">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ink/10" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">

        {/* Name */}
        <p className="font-serif font-[400] text-[22px] lg:text-[24px] leading-none text-ink">
          Dorothy Li
        </p>

        {/* Contact cluster + copyright */}
        <div className="flex flex-col items-start sm:items-end gap-3">

          {/* Icon row */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@dorothyli.me"
              aria-label="Email Dorothy Li"
              title="hello@dorothyli.me"
              className="w-10 h-10 rounded-full border border-ink/12 flex items-center justify-center font-mono text-[15px] text-ink/60 hover:text-ink hover:border-ink/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
            >
              @
            </a>
            <a
              href="https://www.linkedin.com/in/dorothyli-me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dorothy Li on LinkedIn"
              title="LinkedIn"
              className="w-10 h-10 rounded-full border border-ink/12 flex items-center justify-center font-mono text-[13px] tracking-tight text-ink/60 hover:text-ink hover:border-ink/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
            >
              in
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              title="Back to top"
              className="w-10 h-10 rounded-full border border-ink/12 flex items-center justify-center font-mono text-[16px] text-ink/60 hover:text-ink hover:-translate-y-0.5 hover:border-ink/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
            >
              ↑
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] tracking-[0.08em] text-ink/35">
            © {new Date().getFullYear()} Dorothy Li
          </p>

        </div>

      </div>
    </footer>
  );
}
