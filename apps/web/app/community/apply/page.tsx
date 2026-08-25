'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function MembershipApplyPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = React.useState('ASSOCIATE');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleApply = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login?callbackUrl=/community/apply');
        return;
      }

      const res = await fetch('http://localhost:4000/api/v1/memberships/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ planCode: selectedPlan })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Membership subscription failed');
      }

      router.push('/app/dashboard?membershipActive=true');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Subscription processing error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-2">
            <Link href="/community" className="text-xs font-mono text-amber-400 hover:underline">
              ← Back to Community Info
            </Link>
            <Badge variant="gold">EARNED MEMBERSHIP GATEWAY</Badge>
            <h1 className="text-3xl font-serif font-bold text-white">Apply for Medar Community Membership</h1>
            <p className="text-xs text-slate-400 font-mono">Select your membership tier according to your certification credentials</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded">
              {error}
            </div>
          )}

          <Card variant="bordered" className="p-8 bg-slate-900/90 space-y-6">
            <div className="space-y-4">
              <div
                onClick={() => setSelectedPlan('ASSOCIATE')}
                className={`p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === 'ASSOCIATE'
                    ? 'bg-slate-950 border-amber-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold">Associate Member</h3>
                  <span className="text-lg font-serif font-bold text-amber-400">₹6,000 / yr</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Prerequisite: Passed Foundation Certificate (40 hrs)</p>
              </div>

              <div
                onClick={() => setSelectedPlan('FULL_MEMBER')}
                className={`p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === 'FULL_MEMBER'
                    ? 'bg-slate-950 border-amber-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold">Full Member</h3>
                  <span className="text-lg font-serif font-bold text-amber-400">₹15,000 / yr</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Prerequisite: Passed Practitioner Certificate (60 hrs)</p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleApply}
              disabled={loading}
              className="w-full justify-center text-xs uppercase tracking-wider py-3"
            >
              {loading ? 'Verifying Prerequisite...' : 'Proceed to Membership Subscription →'}
            </Button>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
