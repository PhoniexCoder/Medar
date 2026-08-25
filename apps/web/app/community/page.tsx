import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">GATED COMMUNITY ECOSYSTEM</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              A Community You Earn <br />
              <span className="text-amber-400 italic">the Right to Belong To</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Every Medar member has passed an assessment. That is the entire point. A community where credentials are real, practitioners are serious, and belonging means something.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="default" className="p-8 space-y-4">
              <span className="text-3xl">💬</span>
              <h2 className="text-xl font-serif font-bold text-white">Practitioner Discussion Forums</h2>
              <p className="text-sm text-slate-300">Gated peer discussion channels on complex commercial dispute strategies and case law updates.</p>
            </Card>

            <Card variant="default" className="p-8 space-y-4">
              <span className="text-3xl">🤝</span>
              <h2 className="text-xl font-serif font-bold text-white">Mentorship Pairing</h2>
              <p className="text-sm text-slate-300">Connect senior certified master mediators with Associate Members for structured chamber guidance.</p>
            </Card>

            <Card variant="default" className="p-8 space-y-4">
              <span className="text-3xl">💼</span>
              <h2 className="text-xl font-serif font-bold text-white">ADR Job Board</h2>
              <p className="text-sm text-slate-300">Exclusive access to mediator panel vacancies, corporate in-house roles, and tribunal clerkships.</p>
            </Card>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-8 border border-amber-500/30 text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-white">Ready to Earn Your Membership Credentials?</h2>
            <p className="text-sm text-slate-300">
              Complete our Foundation or Practitioner Certificate programs to unlock Associate or Full Member access.
            </p>
            <Link href="/programs">
              <Button variant="primary" className="text-xs uppercase tracking-wider py-3 px-8">
                Explore Qualification Programs →
              </Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
