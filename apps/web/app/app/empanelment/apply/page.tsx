'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button } from '@medar/ui';
import { API_BASE_URL } from '../../../../lib/api';

export default function EmpanelmentApplyPage() {
  const router = useRouter();
  const [barNumber, setBarNumber] = React.useState('');
  const [jurisdiction, setJurisdiction] = React.useState('India');
  const [experienceYears, setExperienceYears] = React.useState(5);
  const [bio, setBio] = React.useState('');
  const [specialties, setSpecialties] = React.useState('Corporate Disputes, Commercial ADR');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login?callbackUrl=/app/empanelment/apply');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/mediators/empanelment/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          barNumber,
          jurisdiction,
          experienceYears: Number(experienceYears),
          specialties: specialties.split(',').map((s) => s.trim()),
          bio
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Empanelment application failed');
      }

      router.push('/app/dashboard?empanelmentSubmitted=true');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Submission error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <Link href="/empanelment" className="text-xs font-mono text-amber-400 hover:underline">
          ← Back to Empanelment Info
        </Link>
        <Badge variant="gold">PRACTITIONER EMPANELMENT WIZARD</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Apply for Medar Mediator Panel</h1>
        <p className="text-xs text-slate-400 font-mono">Submit your credentials for verification by the Medar Empanelment Board</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded">
          {error}
        </div>
      )}

      <Card variant="bordered" className="p-8 bg-slate-900/90 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Bar Council / Registration No.</label>
              <input
                type="text"
                required
                value={barNumber}
                onChange={(e) => setBarNumber(e.target.value)}
                placeholder="D/1842/2012"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Primary Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="India">India</option>
                <option value="UAE">UAE (DIFC)</option>
                <option value="Singapore">Singapore (SIMI)</option>
                <option value="UK">United Kingdom (CMC)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Years of Legal / ADR Experience</label>
            <input
              type="number"
              required
              min={1}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Practice Specialties (Comma Separated)</label>
            <input
              type="text"
              required
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              placeholder="Corporate Contracts, IP Litigation, Shareholder Disputes"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Professional Bio</label>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief summary of your litigation and mediation background..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full justify-center text-xs uppercase tracking-wider py-3"
          >
            {loading ? 'Submitting Application...' : 'Submit Panel Application →'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
