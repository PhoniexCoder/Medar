import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function ProgramsPage() {
  const programs = [
    {
      slug: 'foundation-cohort-1',
      title: 'Certificate in Mediation — Foundation Program',
      type: 'FOUNDATION',
      duration: '40 Hours (Hybrid)',
      jurisdiction: 'India & Global IMI',
      seats: '30 Seats (Cohort 1 Open)',
      price: '₹45,000',
      description: 'India\'s first IMI-aligned cohort-based mediation certification. 40 hours. Live + async. Designed for lawyers, HR leaders, and practitioners.',
      badge: 'NOW ENROLLING'
    },
    {
      slug: 'practitioner-certificate',
      title: 'Practitioner Certificate in Advanced Mediation',
      type: 'PRACTITIONER',
      duration: '60 Hours (Live Simulation)',
      jurisdiction: 'Multi-Jurisdiction',
      seats: '20 Seats',
      price: '₹75,000',
      description: 'Intensive commercial negotiation and dispute resolution masterclass. Required prerequisite for Full Member directory listing.',
      badge: 'PREREQUISITE FOR FULL MEMBERSHIP'
    },
    {
      slug: 'advanced-practitioner',
      title: 'Advanced Practitioner & Master Mediator Program',
      type: 'ADVANCED',
      duration: '80 Hours + Supervised Practice',
      jurisdiction: 'International ADR',
      seats: '15 Seats',
      price: '₹1,20,000',
      description: 'Master-level dispute resolution certification designed for senior advocates, retired judges, and enterprise dispute officers.',
      badge: 'EXECUTIVE PATHWAY'
    },
    {
      slug: 'internship-program',
      title: 'ADR Graduate Internship & Placement Program',
      type: 'INTERNSHIP',
      duration: '3 Months Residency',
      jurisdiction: 'India & UAE',
      seats: '25 Seats',
      price: '₹30,000',
      description: 'Placement support and practical chamber attachment program for recent law graduates transitioning into full-time mediation practice.',
      badge: 'GRADUATE PATHWAY'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">ACADEMIA CATALOG</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Mediation Certification <br />
              <span className="text-amber-400 italic">& Academic Programs</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Explore cohort-based certification pathways aligned with the International Mediation Institute (IMI) and India Mediation Act 2023 mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog) => (
              <Card key={prog.slug} variant="bordered" className="flex flex-col justify-between p-8 bg-slate-900/60">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">{prog.badge}</Badge>
                    <span className="text-xl font-serif font-bold text-white">{prog.price}</span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-white leading-snug">{prog.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{prog.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-4 font-mono text-xs text-slate-400">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Duration: {prog.duration}</div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Jurisdiction: {prog.jurisdiction}</div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={`/programs/${prog.slug}`} className="block w-full">
                    <Button variant="primary" className="w-full text-xs uppercase tracking-wider justify-center py-3">
                      View Program Details →
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
