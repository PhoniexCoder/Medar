import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { PillarsSection } from '../components/PillarsSection';
import { JurisdictionGrid } from '../components/JurisdictionGrid';
import { PersonasSection } from '../components/PersonasSection';
import { MembershipSection } from '../components/MembershipSection';
import { KnowledgePreview } from '../components/KnowledgePreview';
import { CorporateSection } from '../components/CorporateSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0B0C0E] flex flex-col justify-between selection:bg-[#C49B38] selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <PillarsSection />
        <JurisdictionGrid />
        <PersonasSection />
        <MembershipSection />
        <KnowledgePreview />
        <CorporateSection />
      </main>
      <Footer />
    </div>
  );
}
