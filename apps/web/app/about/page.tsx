import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge } from '@medar/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <Badge variant="gold">ABOUT MEDAR</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Built on 40 Years of Legal Legacy. <br />
              <span className="text-amber-400 italic">Positioned for the Next 40.</span>
            </h1>
          </div>

          <Card variant="default" className="p-8 sm:p-12 space-y-6 text-slate-300 leading-relaxed">
            <p className="text-lg text-white font-serif">
              Medar was established to bridge the structural gap in commercial Alternative Dispute Resolution (ADR) across Asia and the Middle East.
            </p>

            <p className="text-sm">
              While litigation remains adversarial, slow, and expensive, mediation offers confidential, interest-based, and enforceable commercial resolution. Medar provides the integrated platform — encompassing academia, community, directory marketplace, and corporate retainers — necessary to professionalize mediation practice.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800 font-serif">
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="text-2xl font-bold text-amber-400">4 Pillars</div>
                <div className="text-xs text-slate-400 font-sans mt-1">Academia, Community, Marketplace, Corporate</div>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="text-2xl font-bold text-amber-400">6 Jurisdictions</div>
                <div className="text-xs text-slate-400 font-sans mt-1">India, UAE, Singapore, UK, EU, US</div>
              </div>
            </div>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
