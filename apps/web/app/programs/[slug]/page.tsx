import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <Link href="/programs" className="text-xs font-mono text-amber-400 hover:underline">
              ← Back to All Programs
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="gold">COHORT 1 OPEN</Badge>
              <span className="text-xs font-mono text-slate-400 uppercase">IMI Aligned Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white capitalize">
              {slug.replace(/-/g, ' ')}
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Complete professional mediation qualification program designed for advocates, corporate counsel, and conflict resolution specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card variant="default" className="p-8 space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">Curriculum & Learning Modules</h2>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <h3 className="font-semibold text-amber-400">Module 1: Foundations of Mediation & ADR Frameworks</h3>
                    <p className="text-xs text-slate-400 mt-1">Understanding pre-litigation mediation, legal mandates under India Mediation Act 2023, and global standards.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <h3 className="font-semibold text-amber-400">Module 2: Communication, Caucusing & Negotiation Dynamics</h3>
                    <p className="text-xs text-slate-400 mt-1">Reframing positions into underlying interests, active listening techniques, private caucusing strategy.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <h3 className="font-semibold text-amber-400">Module 3: Simulated Live Mediation Exercises & Assessment</h3>
                    <p className="text-xs text-slate-400 mt-1">Role-play scenarios evaluated by senior IMI certified master mediators with individualized feedback.</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card variant="bordered" className="p-6 bg-slate-900/90 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs uppercase font-mono text-slate-400">Tuition Fee</div>
                  <div className="text-3xl font-serif font-bold text-white">₹45,000</div>
                  <div className="text-[11px] text-slate-400">Includes examination & certification fees</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex justify-between"><span>Duration:</span><span className="text-amber-400">40 Hours</span></div>
                  <div className="flex justify-between"><span>Format:</span><span className="text-amber-400">Hybrid (Live+Async)</span></div>
                  <div className="flex justify-between"><span>Cohort Capacity:</span><span className="text-amber-400">30 Seats</span></div>
                  <div className="flex justify-between"><span>Accreditation:</span><span className="text-amber-400">IMI Aligned</span></div>
                </div>

                <Link href={`/checkout?program=${slug}`} className="block w-full">
                  <Button variant="primary" className="w-full justify-center text-xs uppercase tracking-wider py-3">
                    Enroll Now →
                  </Button>
                </Link>
              </Card>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
