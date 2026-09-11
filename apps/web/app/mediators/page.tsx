'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';
import { getMediators, MediatorProfile } from '../../lib/mediatorsData';

export default function MediatorsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const allMediators = useMemo(() => getMediators(), []);

  const filteredMediators = useMemo(() => {
    return allMediators.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        m.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJurisdiction =
        selectedJurisdiction === 'ALL' || m.jurisdiction === selectedJurisdiction;

      const matchesDomain =
        selectedDomain === 'ALL' || m.primaryDomain === selectedDomain;

      return matchesSearch && matchesJurisdiction && matchesDomain;
    });
  }, [allMediators, searchTerm, selectedJurisdiction, selectedDomain]);

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Hero Header */}
          <div className="space-y-4 max-w-3xl">
            <Badge variant="gold">VERIFIED INSTITUTIONAL DIRECTORY</Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Empanelled Mediators & <br />
              <span className="text-[#E5C158] italic">Master ADR Neutrals</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Browse credentialed mediators certified under Medar assessment standards, the India Mediation Act 2023, DIFC Courts ADR, and the Singapore Convention.
            </p>
          </div>

          {/* Search and Filters Toolbar */}
          <Card variant="bordered" className="p-6 bg-[#0F1116] border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by mediator name, legal specialty, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#07080A] border border-slate-700 rounded px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Jurisdiction Filters */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Filter by Jurisdiction
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'ALL', label: 'All Jurisdictions' },
                  { key: 'India', label: 'India 🇮🇳' },
                  { key: 'UAE', label: 'UAE (DIFC / ADGM) 🇦🇪' },
                  { key: 'Singapore', label: 'Singapore (SIMI / SICC) 🇸🇬' },
                  { key: 'UK', label: 'United Kingdom (CMC) 🇬🇧' }
                ].map((j) => (
                  <button
                    key={j.key}
                    onClick={() => setSelectedJurisdiction(j.key)}
                    className={`text-xs font-mono px-3.5 py-1.5 rounded transition-all ${
                      selectedJurisdiction === j.key
                        ? 'bg-[#C49B38] text-slate-950 font-bold shadow-lg shadow-[#C49B38]/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {j.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialty Domain Filters */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Filter by Dispute Domain
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'ALL', label: 'All Domains' },
                  { key: 'Commercial', label: 'Commercial & Cross-Border' },
                  { key: 'IP & Tech', label: 'Tech, SaaS & IP' },
                  { key: 'Maritime', label: 'Maritime & Infrastructure' },
                  { key: 'Shareholder', label: 'Shareholder & Corporate' }
                ].map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setSelectedDomain(d.key)}
                    className={`text-xs font-mono px-3 py-1 rounded transition-all ${
                      selectedDomain === d.key
                        ? 'bg-[#C49B38]/20 border border-[#C49B38] text-[#E5C158] font-semibold'
                        : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <div>
              Showing <span className="text-[#E5C158] font-bold">{filteredMediators.length}</span> accredited neutrals
            </div>
            {(searchTerm || selectedJurisdiction !== 'ALL' || selectedDomain !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedJurisdiction('ALL');
                  setSelectedDomain('ALL');
                }}
                className="text-[#C49B38] hover:underline"
              >
                Reset Filters ↺
              </button>
            )}
          </div>

          {/* Mediators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMediators.map((m) => (
              <Card
                key={m.slug}
                variant="default"
                className="flex flex-col justify-between p-6 bg-[#0F1116] border-slate-800/90 hover:border-[#C49B38]/50 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <span>✓</span> VERIFIED NEUTRAL
                    </span>
                    <span className="text-xs font-mono text-slate-400">{m.jurisdictionDisplay}</span>
                  </div>

                  {/* Profile Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-serif font-bold text-white group-hover:text-[#E5C158] transition-colors">
                          {m.name}
                        </h2>
                        <p className="text-xs text-[#C49B38] font-mono mt-0.5 font-medium">{m.title}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#C49B38]/10 border border-[#C49B38]/30 text-[#E5C158] font-serif font-bold flex items-center justify-center shrink-0">
                        {m.name.split(' ').pop()?.charAt(0) || 'M'}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-mono">{m.experience}</p>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center font-mono">
                    <div className="bg-slate-950/60 p-2 rounded">
                      <div className="text-[10px] text-slate-500">Rating</div>
                      <div className="text-xs font-bold text-amber-300">★ {m.rating}</div>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded">
                      <div className="text-[10px] text-slate-500">Resolved</div>
                      <div className="text-xs font-bold text-white">{m.casesResolved} cases</div>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded">
                      <div className="text-[10px] text-slate-500">Success</div>
                      <div className="text-xs font-bold text-emerald-400">{m.successRate}%</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Practice Focus:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Chamber Fee:</span>
                    <span className="text-white font-semibold">{m.hourlyRate}</span>
                  </div>

                  <Link href={`/mediators/${m.slug}`} className="block w-full">
                    <Button
                      variant="primary"
                      className="w-full justify-center text-xs font-mono uppercase tracking-wider py-2.5"
                    >
                      View Dossier & Book Chamber →
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
