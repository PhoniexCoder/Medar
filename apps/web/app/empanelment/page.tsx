import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function EmpanelmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <Badge variant="gold">PRACTITIONER EMPANELMENT</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Apply for Panel <br />
              <span className="text-amber-400 italic">Empanelment</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Get listed on Medar&apos;s verified mediator marketplace. Connect with corporate clients, law firms, and institutional dispute referrals.
            </p>
          </div>

          <Card variant="bordered" className="p-8 space-y-6 bg-slate-900/90">
            <h2 className="text-2xl font-serif font-bold text-white">Empanelment Prerequisites</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Minimum 40 hours of accredited mediation training (IMI, IIAM, Bar Council, or Medar Certified).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>Proof of active practice or bar registration in good standing.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Submission of 2 professional references or dispute log transcripts.</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <Link href="/app/empanelment/apply">
                <Button variant="primary" className="text-xs uppercase tracking-wider py-3 px-8">
                  Start Empanelment Application →
                </Button>
              </Link>
            </div>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
