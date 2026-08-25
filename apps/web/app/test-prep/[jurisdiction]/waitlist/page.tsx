'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '../../../../components/Navbar';
import { Footer } from '../../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function WaitlistPage({ params }: { params: Promise<{ jurisdiction: string }> }) {
  const [jurisdictionName, setJurisdictionName] = React.useState('Jurisdiction');
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    params.then((p) => {
      setJurisdictionName(p.jurisdiction.toUpperCase());
    });
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <Badge variant="gold">FUTURE JURISDICTION PATHWAY</Badge>
            <h1 className="text-3xl font-serif font-bold text-white">
              Join {jurisdictionName} Test Prep Waitlist
            </h1>
            <p className="text-sm text-slate-300">
              Be the first to get notified when our {jurisdictionName} jurisdiction qualification course opens for registration.
            </p>
          </div>

          <Card variant="bordered" className="p-8 bg-slate-900/80">
            {submitted ? (
              <div className="text-center space-y-4 py-6">
                <div className="text-4xl">✨</div>
                <h2 className="text-xl font-serif font-bold text-emerald-400">You are on the Waitlist!</h2>
                <p className="text-xs text-slate-300">
                  We have saved <strong>{email}</strong> for early access notifications for {jurisdictionName}.
                </p>
                <Link href="/test-prep">
                  <Button variant="outline" className="text-xs uppercase tracking-wider mt-4">
                    Back to Test Prep
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="advocate@lawfirm.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <Button variant="primary" type="submit" className="w-full justify-center text-xs uppercase tracking-wider py-3">
                  Join Priority Waitlist →
                </Button>
              </form>
            )}
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
