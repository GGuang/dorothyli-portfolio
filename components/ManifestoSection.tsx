export function ManifestoSection() {
  return (
    <section
      id="about"
      className="relative z-10 bg-surface-400 scroll-mt-20"
    >
      <div className="w-full px-6 pt-20 pb-20 lg:max-w-content lg:mx-auto lg:px-14 lg:pt-32 lg:pb-32 xl:px-[5.5%]">

        {/* Label */}
        <p className="font-mono text-xs tracking-widest uppercase text-ink/60 mb-16">
          {"// 02 — manifesto"}
        </p>

        {/* Positioning sentence — constrained to ~65% on desktop */}
        <h2 className="font-serif font-[400] tracking-tight text-4xl leading-[1.15] lg:text-4xl xl:text-5xl lg:leading-[1.1] lg:max-w-[65%] text-ink">
          Good B2B marketing turns technical complexity into systems people can understand, find, and use.
        </h2>

        {/* Rule */}
        <hr className="border-0 border-t border-ink/20 my-12 lg:my-16" />

        {/* Bio — bottom-right, ~42% width on desktop */}
        <div className="lg:flex lg:justify-end">
          <p className="font-sans font-[400] text-base leading-[1.65] lg:text-lg lg:leading-[1.6] text-ink/80 lg:max-w-[42%]">
            Across product content, website structure, search visibility, sales enablement, localisation, and AI-assisted workflows, my work focuses on building clearer paths between products, markets, and global-facing teams.
          </p>
        </div>

      </div>
    </section>
  );
}
