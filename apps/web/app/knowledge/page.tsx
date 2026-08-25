import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge } from '@medar/ui';

export default function KnowledgeHubPage() {
  const articles = [
    {
      slug: 'mediation-act-india-2023',
      category: 'INDIA MEDIATION ACT 2023',
      title: 'What the Mediation Act means for every corporate legal team in India',
      readTime: 'Analysis · 8 min read',
      excerpt: 'Pre-litigation mediation is now mandatory. Here is what changes, what it costs if you ignore it, and how to prepare your team before enforcement window closes.'
    },
    {
      slug: 'uae-mediator-qualification-guide',
      category: 'JURISDICTION GUIDE',
      title: 'How to qualify as a mediator in the UAE — a complete guide',
      readTime: 'Guide · 6 min read',
      excerpt: 'Navigating DIFC Courts, Dubai Courts ADR, and ICAS accreditation requirements for legal practitioners.'
    },
    {
      slug: 'lawyer-to-mediator-career-path',
      category: 'CAREER',
      title: 'From lawyer to mediator: the career path no one tells you about',
      readTime: 'Career · 5 min read',
      excerpt: 'Transitioning your litigation experience into a thriving commercial Alternative Dispute Resolution practice.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">SANITY CMS KNOWLEDGE HUB</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Thought Leadership & <br />
              <span className="text-amber-400 italic">ADR Knowledge Hub</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Curated legal analyses, regulatory jurisdiction guides, and practical mediation career insights written by leading practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <Card key={art.slug} variant="default" className="flex flex-col justify-between p-6 group hover:border-amber-500/40">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                      {art.category}
                    </span>
                    <div className="text-xs text-slate-400 font-mono">{art.readTime}</div>
                  </div>

                  <h2 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed">{art.excerpt}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link href={`/knowledge/${art.slug}`} className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                    Read Article →
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
