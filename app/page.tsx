import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { StatsSection } from "@/components/StatsSection";
import { CasesSection } from "@/components/CasesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero: sticky so Manifesto slides up over it */}
        <div className="sticky top-0 h-screen z-0">
          <HeroSection />
        </div>

        {/* Manifesto: opaque bg, slides up over Hero */}
        <ManifestoSection />

        {/* Stats: opaque bg, slides up over Manifesto */}
        <StatsSection />

        {/* Cases: opaque bg, slides up over Stats */}
        <CasesSection />
      </main>
    </>
  );
}
