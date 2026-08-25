import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge } from '@medar/ui';

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-4">
            <Link href="/knowledge" className="text-xs font-mono text-amber-400 hover:underline">
              ← Back to Knowledge Hub
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="gold">ANALYSIS</Badge>
              <span className="text-xs font-mono text-slate-400">8 min read · Published by Medar Legal Research Team</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white capitalize leading-tight">
              {slug.replace(/-/g, ' ')}
            </h1>
          </div>

          <Card variant="default" className="p-8 sm:p-12 space-y-6 leading-relaxed text-slate-300">
            <p className="text-lg text-amber-300 font-serif italic border-l-2 border-amber-500 pl-4">
              Pre-litigation mediation is now mandatory. Here is what changes for every in-house counsel, general counsel, and corporate executive.
            </p>

            <h2 className="text-xl font-serif font-bold text-white pt-4">1. Mandatory Pre-Litigation Mediation Requirement</h2>
            <p className="text-sm">
              The enactment of the India Mediation Act 2023 establishes a statutory obligation for commercial disputants to attempt mediation prior to approaching civil courts or tribunals. This shift transforms mediation from a voluntary alternative into a mandatory legal prerequisite.
            </p>

            <h2 className="text-xl font-serif font-bold text-white pt-4">2. Time-Bound Resolution Framework</h2>
            <p className="text-sm">
              Mediation proceedings must be completed within 180 days from the date of initial appearance, extendable by a maximum of 60 days with mutual consent. This strict timeline drastically reduces commercial dispute resolution latency compared to litigation.
            </p>

            <h2 className="text-xl font-serif font-bold text-white pt-4">3. Enforceability of Mediated Settlement Agreements</h2>
            <p className="text-sm">
              Under Section 27, a Mediated Settlement Agreement (MSA) resulting from mediation is final, binding, and enforceable in the same manner as a decree of a court.
            </p>
          </Card>

        </article>
      </main>
      <Footer />
    </div>
  );
}
