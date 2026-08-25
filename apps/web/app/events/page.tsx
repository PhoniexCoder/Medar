import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function EventsPage() {
  const events = [
    {
      title: 'Annual Asia ADR & Mediation Summit 2026',
      date: 'November 14-16, 2026',
      location: 'New Delhi & Online Hybrid',
      tag: 'SUMMIT',
      desc: 'The flagship annual gathering of 500+ commercial mediators, general counsels, judges, and arbitrators across Asia-Pacific.'
    },
    {
      title: 'Masterclass: Pre-Litigation Mediation under 2023 Act',
      date: 'September 28, 2026',
      location: 'Live Virtual Classroom',
      tag: 'MASTERCLASS',
      desc: 'Interactive workshop on drafting enforceable settlement agreements under Section 27 of the India Mediation Act.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">CONFERENCES & MASTERCLASSES</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Events, Summits & <br />
              <span className="text-amber-400 italic">Regional Masterclasses</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((e) => (
              <Card key={e.title} variant="default" className="flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">{e.tag}</Badge>
                    <span className="text-xs font-mono text-slate-400">{e.location}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">{e.title}</h2>
                  <p className="text-xs font-mono text-amber-400">{e.date}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{e.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Button variant="primary" className="w-full justify-center text-xs uppercase tracking-wider py-2.5">
                    Register for Event →
                  </Button>
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
