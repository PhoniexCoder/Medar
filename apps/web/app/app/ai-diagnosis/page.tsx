'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@medar/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosisResult {
  suitabilityScore: number;
  statutoryReference: string;
  suitabilityLevel: 'EXCELLENT' | 'MODERATE' | 'NOT_RECOMMENDED';
  estimatedTime: string;
  estimatedCourtTime: string;
  estimatedCostSavings: string;
  keyFactors: string[];
  recommendedMediators: {
    name: string;
    designation: string;
    specialty: string;
    experience: string;
    rate: string;
    slug: string;
  }[];
  draftTermSheet: {
    recitals: string;
    settlementAmount: string;
    timelines: string;
    confidentialityClause: string;
    enforceabilityNote: string;
  };
}

export default function AiDiagnosisPage() {
  const [disputeType, setDisputeType] = React.useState('Commercial Contract Breach');
  const [claimAmount, setClaimAmount] = React.useState('₹2,50,00,000');
  const [jurisdiction, setJurisdiction] = React.useState('India (Mediation Act 2023)');
  const [disputeSummary, setDisputeSummary] = React.useState(
    'Vendor delayed enterprise software deployment by 7 months. Client withheld remaining 40% milestone payment and issued legal notice claiming liquidated damages. Both parties wish to avoid a 5-year court litigation if a revised delivery timeline and settlement can be reached.'
  );
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<DiagnosisResult | null>(null);
  const [activeTab, setActiveTab] = React.useState<'diagnosis' | 'mediators' | 'termSheet'>('diagnosis');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        suitabilityScore: 94,
        suitabilityLevel: 'EXCELLENT',
        statutoryReference: 'Section 5 & First Schedule, Mediation Act 2023 (Commercial Dispute — Pre-Litigation Mediation Mandatory)',
        estimatedTime: '3 to 5 Mediation Sessions (Approx. 21 Days)',
        estimatedCourtTime: '4.5 to 6.5 Years (Commercial Court + Appeals)',
        estimatedCostSavings: '₹22.40 Lakhs (approx. 84% savings vs litigation)',
        keyFactors: [
          'Commercial relationship preservation is mutual priority for both parties.',
          'Liquidated damages dispute is quantifiable and suited for structured compromise.',
          'Statutory settlement agreement is legally binding as a court decree under Section 27.',
          'Confidentiality ensures trade secrets and business reputation remain protected.'
        ],
        recommendedMediators: [
          {
            name: 'Vikramjit Roy, FCIArb',
            designation: 'Senior Commercial Mediator & Empanelled Panelist',
            specialty: 'Tech Contracts, Joint Ventures, Commercial Damages',
            experience: '18+ Years Experience · 340+ Resolved Disputes',
            rate: '₹35,000 / Session',
            slug: 'vikramjit-roy'
          },
          {
            name: 'Ananya Deshmukh',
            designation: 'Certified IMI Practitioner & Former High Court Advocate',
            specialty: 'Enterprise Software, IT Vendor Disputes, IP Licensing',
            experience: '14+ Years Experience · 210+ Resolved Disputes',
            rate: '₹28,000 / Session',
            slug: 'ananya-deshmukh'
          }
        ],
        draftTermSheet: {
          recitals: 'WHEREAS Party A (Client) and Party B (Vendor) entered into Master Services Agreement dated 12/04/2024; and WHEREAS differences arose concerning Milestone 3 and final payments.',
          settlementAmount: 'Party A shall disburse ₹65,00,000 (adjusted for delivery delays) within 14 business days of signing.',
          timelines: 'Party B shall complete deployment bug-fixes and hand over documentation by October 15, 2026.',
          confidentialityClause: 'All proceedings, admissions, and financial adjustments are strictly confidential under Section 22 of the Mediation Act 2023.',
          enforceabilityNote: 'This Mediated Settlement Agreement is authenticated by the Empanelled Mediator and possesses the force of a decree passed by a Civil Court under Section 27(2).'
        }
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-0.5 rounded-sm">
              MEDAR RESOLVE · AI LAYER
            </span>
            <span className="text-[10px] font-mono text-slate-400">v2.4 Neural Diagnostic Engine</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">AI Conflict Diagnosis & Resolution Studio</h1>
          <p className="text-xs text-slate-400 font-mono">
            Automated statutory suitability analysis, cost/time projection, mediator matching, and settlement drafting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="gold">IMI & STATUTORY COMPLIANT</Badge>
        </div>
      </div>

      {/* Input Form */}
      <Card variant="bordered" className="p-8 bg-[#12141C] border-slate-800/80 shadow-xl space-y-6">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800 pb-3">
          1. Input Case & Dispute Parameters
        </div>

        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1.5">
                Dispute Classification
              </label>
              <select
                value={disputeType}
                onChange={(e) => setDisputeType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white focus:outline-none focus:border-[#C49B38] font-mono"
              >
                <option>Commercial Contract Breach</option>
                <option>Shareholder & Boardroom Dispute</option>
                <option>IT & Software Vendor Delivery</option>
                <option>Cross-Border Maritime & Trade</option>
                <option>Real Estate & Infrastructure Delay</option>
                <option>Intellectual Property & Licensing</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1.5">
                Estimated Claim Value
              </label>
              <input
                type="text"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white focus:outline-none focus:border-[#C49B38] font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1.5">
                Target Legal Jurisdiction
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white focus:outline-none focus:border-[#C49B38] font-mono"
              >
                <option>India (Mediation Act 2023)</option>
                <option>UAE (DIFC Courts ADR Regulations)</option>
                <option>Singapore (SIMI / SMC Protocol)</option>
                <option>United Kingdom (CMC Civil Rules)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1.5">
              Factual Dispute Brief & Core Contentions
            </label>
            <textarea
              rows={3}
              value={disputeSummary}
              onChange={(e) => setDisputeSummary(e.target.value)}
              placeholder="Describe the background, milestones missed, amounts claimed, and willingness of parties to resolve..."
              className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white focus:outline-none focus:border-[#C49B38] leading-relaxed font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] font-mono text-slate-500">
              Confidentiality Guaranteed · End-to-End Encrypted Analysis
            </span>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="text-xs uppercase tracking-wider py-3 px-8 bg-[#C49B38] hover:bg-[#B38C2E] text-[#0B0C0E] font-bold font-mono shadow-md shadow-[#C49B38]/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-[#0B0C0E] border-t-transparent rounded-full animate-spin" />
                  Running Neural Diagnosis...
                </span>
              ) : (
                'Run AI Conflict Diagnosis →'
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Results View */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex border-b border-slate-800 gap-6">
              <button
                onClick={() => setActiveTab('diagnosis')}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'diagnosis'
                    ? 'border-[#C49B38] text-[#C49B38] font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                1. Statutory Diagnosis & Projections
              </button>

              <button
                onClick={() => setActiveTab('mediators')}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'mediators'
                    ? 'border-[#C49B38] text-[#C49B38] font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                2. Smart Mediator Match ({result.recommendedMediators.length})
              </button>

              <button
                onClick={() => setActiveTab('termSheet')}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'termSheet'
                    ? 'border-[#C49B38] text-[#C49B38] font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                3. AI Draft Settlement Term Sheet
              </button>
            </div>

            {/* Tab 1: Diagnosis & Projections */}
            {activeTab === 'diagnosis' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Card: Score */}
                <Card variant="bordered" className="lg:col-span-4 p-6 bg-[#12141C] border-slate-800 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Mediation Suitability Score
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-serif font-bold text-[#C49B38]">
                        {result.suitabilityScore}%
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                        {result.suitabilityLevel}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full"
                        style={{ width: `${result.suitabilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Statutory Governing Mandate</div>
                    <div className="text-xs text-slate-300 font-sans leading-relaxed">
                      {result.statutoryReference}
                    </div>
                  </div>
                </Card>

                {/* Right Card: Comparative Projections */}
                <Card variant="bordered" className="lg:col-span-8 p-6 bg-[#12141C] border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#0A0B0E] p-4 rounded-sm border border-slate-800/80 space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase">Mediation Timeline</div>
                      <div className="text-sm font-serif font-bold text-emerald-400">{result.estimatedTime}</div>
                      <div className="text-[9px] font-mono text-slate-500">vs 5+ yrs in court</div>
                    </div>

                    <div className="bg-[#0A0B0E] p-4 rounded-sm border border-slate-800/80 space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase">Litigation Court Timeline</div>
                      <div className="text-sm font-serif font-bold text-red-400">{result.estimatedCourtTime}</div>
                      <div className="text-[9px] font-mono text-slate-500">Trial + High Court Appeal</div>
                    </div>

                    <div className="bg-[#0A0B0E] p-4 rounded-sm border border-slate-800/80 space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase">Projected Cost Savings</div>
                      <div className="text-sm font-serif font-bold text-[#C49B38]">{result.estimatedCostSavings}</div>
                      <div className="text-[9px] font-mono text-slate-500">Legal fees & discovery costs</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                      Neural Diagnostic Analysis Findings:
                    </div>
                    <div className="space-y-2">
                      {result.keyFactors.map((kf, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                          <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                          <span>{kf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

              </div>
            )}

            {/* Tab 2: Smart Mediator Matcher */}
            {activeTab === 'mediators' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.recommendedMediators.map((med) => (
                  <Card key={med.name} variant="bordered" className="p-6 bg-[#12141C] border-slate-800 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[9px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                            98% Case Compatibility Match
                          </div>
                          <h3 className="text-xl font-serif font-bold text-white mt-1">{med.name}</h3>
                          <p className="text-xs text-[#C49B38] font-mono">{med.designation}</p>
                        </div>
                        <div className="w-10 h-10 rounded-sm bg-[#C49B38]/20 border border-[#C49B38]/40 text-[#C49B38] font-bold font-serif flex items-center justify-center text-sm">
                          {med.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300 font-light">
                        <div><strong className="text-slate-400 font-mono text-[10px] uppercase">Specialty:</strong> {med.specialty}</div>
                        <div><strong className="text-slate-400 font-mono text-[10px] uppercase">Track Record:</strong> {med.experience}</div>
                        <div><strong className="text-slate-400 font-mono text-[10px] uppercase">Standard Fee:</strong> <span className="text-[#C49B38] font-mono font-semibold">{med.rate}</span></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex gap-3">
                      <Link href={`/mediators/${med.slug}`} className="flex-1">
                        <Button variant="secondary" className="w-full text-[10px] uppercase tracking-wider py-2 font-mono justify-center">
                          View Verified Credentials →
                        </Button>
                      </Link>
                      <Button variant="primary" className="flex-1 text-[10px] uppercase tracking-wider py-2 font-mono justify-center bg-[#C49B38] text-[#0B0C0E] font-bold">
                        Appoint for Dispute
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Tab 3: Draft Term Sheet */}
            {activeTab === 'termSheet' && (
              <Card variant="bordered" className="p-8 bg-[#12141C] border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#C49B38] uppercase tracking-widest">
                      STATUTORY DRAFT TEMPLATE
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                      Mediated Settlement Agreement (MSA) Preliminary Terms
                    </h3>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => alert('Term Sheet copied to clipboard for mediator review.')}
                    className="text-[10px] font-mono uppercase tracking-wider py-2 px-4"
                  >
                    Copy Term Sheet 📋
                  </Button>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300 bg-[#090A0D] p-6 rounded-sm border border-slate-800/80 leading-relaxed">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px]">1. RECITALS & JURISDICTION</span>
                    <p className="mt-1 text-slate-200">{result.draftTermSheet.recitals}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60">
                    <span className="text-slate-500 uppercase text-[10px]">2. SETTLEMENT CONSIDERATION & ADJUSTMENT</span>
                    <p className="mt-1 text-slate-200">{result.draftTermSheet.settlementAmount}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60">
                    <span className="text-slate-500 uppercase text-[10px]">3. PERFORMANCE OBLIGATIONS & DISCHARGE</span>
                    <p className="mt-1 text-slate-200">{result.draftTermSheet.timelines}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60">
                    <span className="text-slate-500 uppercase text-[10px]">4. STATUTORY CONFIDENTIALITY</span>
                    <p className="mt-1 text-slate-200">{result.draftTermSheet.confidentialityClause}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 bg-[#C49B38]/5 p-3 rounded-sm border border-[#C49B38]/20 text-[#C49B38]">
                    <span className="uppercase text-[10px] font-bold">5. LEGAL ENFORCEABILITY</span>
                    <p className="mt-0.5">{result.draftTermSheet.enforceabilityNote}</p>
                  </div>
                </div>
              </Card>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
