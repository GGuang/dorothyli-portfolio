import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { StatsSection } from "@/components/StatsSection";
import { CasesSection } from "@/components/CasesSection";
import { CareerTimelineSection } from "@/components/CareerTimelineSection";
import { AILabSection } from "@/components/AILabSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        {/* Hero: sticky so Manifesto slides up over it */}
        <div className="sticky top-0 h-screen z-0">
          <HeroSection />
        </div>

        {/* Manifesto: opaque bg, slides up over Hero */}
        <ManifestoSection />

        {/* Stats: opaque bg, slides up over Manifesto */}
        <StatsSection />

        {/* Cases: mint bg, slides up over Stats */}
        <CasesSection />

        {/* Career Timeline: light bg, slides up over Cases */}
        <CareerTimelineSection />

        {/* AI Lab: warm tan bg, slides up over Career Timeline */}
        <AILabSection />
      </main>

      <Footer />
    </>
  );
}
