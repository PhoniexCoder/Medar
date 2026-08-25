import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge } from '@medar/ui';

export default function AccreditationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <Badge variant="gold">ACCREDITATION STANDARDS</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              International Standards & <br />
              <span className="text-amber-400 italic">Institutional Alignment</span>
            </h1>
          </div>

          <Card variant="default" className="p-8 space-y-6 text-slate-300">
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
                <h2 className="font-semibold text-amber-400">International Mediation Institute (IMI)</h2>
                <p className="text-xs text-slate-400">Curriculum design aligned with IMI Certified Mediator Competency Criteria.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
                <h2 className="font-semibold text-amber-400">India Mediation Act 2023 Compliance</h2>
                <p className="text-xs text-slate-400">Full statutory compliance with Section 27 settlement agreement enforceability standards.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
                <h2 className="font-semibold text-amber-400">IIAM & DIFC Recognition</h2>
                <p className="text-xs text-slate-400">Recognized by Indian Institute of Arbitration & Mediation and DIFC Courts ADR pathways.</p>
              </div>
            </div>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
