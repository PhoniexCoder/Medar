import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function MediatorsDirectoryPage() {
  const mediators = [
    {
      slug: 'adv-priya-sharma',
      name: 'Adv. Priya Sharma',
      title: 'Senior Commercial Mediator',
      jurisdiction: 'India & DIFC UAE',
      experience: '18 Years Litigation · 8 Years ADR',
      specialties: ['Corporate Disputes', 'Cross-Border Contracts', 'IP Litigation'],
      verified: true
    },
    {
      slug: 'tariq-al-mansoor',
      name: 'Tariq Al-Mansoor',
      title: 'DIFC Certified Master Mediator',
      jurisdiction: 'UAE & UK',
      experience: '22 Years Commercial Law',
      specialties: ['Maritime & Construction', 'Banking & Finance'],
      verified: true
    },
    {
      slug: 'rajesh-kulkarni',
      name: 'Rajesh Kulkarni',
      title: 'Former High Court Registrar & IMI Mediator',
      jurisdiction: 'India',
      experience: '30 Years Judicial Service',
      specialties: ['Shareholder Disputes', 'Real Estate ADR'],
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">VERIFIED MARKETPLACE DIRECTORY</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Find a Verified Mediator <br />
              <span className="text-amber-400 italic">Across Asia & Middle East</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Browse credentialed mediators certified through Medar assessment standards. Filter by jurisdiction, specialty, and years of experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediators.map((m) => (
              <Card key={m.slug} variant="default" className="flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ✓ VERIFIED PANELIST
                    </span>
                    <span className="text-xs font-mono text-slate-400">{m.jurisdiction}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-bold text-white">{m.name}</h2>
                    <p className="text-xs text-amber-400 font-mono mt-0.5">{m.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.experience}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {m.specialties.map((s) => (
                      <span key={s} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link href={`/mediators/${m.slug}`} className="block w-full">
                    <Button variant="outline" className="w-full justify-center text-xs uppercase tracking-wider py-2.5">
                      Request Consultation →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
