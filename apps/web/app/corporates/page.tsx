import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CorporateSection } from '../../components/CorporateSection';

export default function CorporatesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main>
        <CorporateSection />
      </main>
      <Footer />
    </div>
  );
}
