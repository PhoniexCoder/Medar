import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function TestPrepPage() {
  const pathways = [
    {
      country: 'India 🇮🇳',
      code: 'india',
      exam: 'IIAM Mediator Certification & Bar Council Assessment',
      status: 'AVAILABLE NOW',
      active: true,
      desc: 'Structured test preparation for Indian advocates navigating pre-litigation mediation requirements under the India Mediation Act 2023.'
    },
    {
      country: 'UAE 🇦🇪',
      code: 'uae',
      exam: 'DIFC Mediator Qualification & Dubai Courts ADR',
      status: 'YEAR 2 — JOIN WAITLIST',
      active: false,
      desc: 'Preparation pathway for DIFC court mediation accreditation and Middle East commercial dispute resolution practice.'
    },
    {
      country: 'Singapore 🇸🇬',
      code: 'singapore',
      exam: 'SIMI Accredited Mediator & SMC Preparation',
      status: 'YEAR 2 — JOIN WAITLIST',
      active: false,
      desc: 'Preparation for Singapore International Mediation Institute (SIMI) Level 1 and Level 2 accreditation exams.'
    },
    {
      country: 'United Kingdom 🇬🇧',
      code: 'uk',
      exam: 'Civil Mediation Council (CMC) Accreditation',
      status: 'YEAR 3 — JOIN WAITLIST',
      active: false,
      desc: 'Preparation for UK Civil Mediation Council registered mediator status and SRA CPD qualifying credentials.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">JURISDICTION QUALIFICATION</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Test Preparation Pathways <br />
              <span className="text-amber-400 italic">Across Asia & Europe</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Structured, outcome-driven exam coaching designed to prepare you for jurisdiction-specific mediation bar assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pathways.map((p) => (
              <Card key={p.code} variant="default" className="flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-serif font-bold text-white">{p.country}</h2>
                    <Badge variant={p.active ? 'gold' : 'outline'}>{p.status}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-amber-400 font-mono">{p.exam}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-800">
                  {p.active ? (
                    <Link href={`/test-prep/${p.code}`} className="block w-full">
                      <Button variant="primary" className="w-full justify-center text-xs uppercase tracking-wider py-3">
                        Enroll in Test Prep →
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/test-prep/${p.code}/waitlist`} className="block w-full">
                      <Button variant="outline" className="w-full justify-center text-xs uppercase tracking-wider py-3 border-amber-500/30 text-amber-400">
                        Join Waitlist →
                      </Button>
                    </Link>
                  )}
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
