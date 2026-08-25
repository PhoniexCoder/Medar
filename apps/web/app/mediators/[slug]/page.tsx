import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default async function MediatorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-4">
            <Link href="/mediators" className="text-xs font-mono text-amber-400 hover:underline">
              ← Back to Mediator Directory
            </Link>

            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="success">✓ VERIFIED MEDAR PANELIST</Badge>
                  <span className="text-xs font-mono text-slate-400">DIFC & India Bar Council</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white capitalize">
                  {slug.replace(/-/g, ' ')}
                </h1>
                <p className="text-sm font-mono text-amber-400">Senior Commercial Mediator & ADR Specialist</p>
                <p className="text-xs text-slate-400">18 Years Litigation Experience · 8 Years Mediation Practice</p>
              </div>

              <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/40 font-serif font-bold text-amber-400 text-2xl flex items-center justify-center">
                {slug.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card variant="default" className="p-8 space-y-4">
                <h2 className="text-xl font-serif font-bold text-white">Professional Bio & Experience</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Specializing in complex cross-border commercial contracts, intellectual property disputes, and shareholder agreements under the India Mediation Act 2023 and DIFC Court ADR frameworks.
                </p>
              </Card>

              <Card variant="default" className="p-8 space-y-4">
                <h2 className="text-xl font-serif font-bold text-white">Practice Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {['Corporate Contracts', 'Shareholder Dispute', 'IP Litigation', 'Cross-Border ADR', 'Real Estate'].map((s) => (
                    <span key={s} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card variant="bordered" className="p-6 bg-slate-900/90 space-y-6">
                <h3 className="text-lg font-serif font-bold text-white">Request Consultation</h3>
                <p className="text-xs text-slate-400">
                  Submit a confidential mediation inquiry or tribunal appointment request.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">Your Name</label>
                    <input type="text" placeholder="Counsel Name" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">Dispute Type</label>
                    <input type="text" placeholder="e.g. Commercial Contract" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-white" />
                  </div>
                </div>

                <Button variant="primary" className="w-full justify-center text-xs uppercase tracking-wider py-2.5">
                  Send Appointment Inquiry →
                </Button>
              </Card>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
