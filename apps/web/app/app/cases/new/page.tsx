'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button } from '@medar/ui';
import { createDisputeCase } from '../../../../lib/casesData';

export default function NewCaseFilingWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);
  const [createdCaseNumber, setCreatedCaseNumber] = useState<string | null>(null);

  // Form State
  const [caseTitle, setCaseTitle] = useState('');
  const [jurisdiction, setJurisdiction] = useState<'India' | 'UAE' | 'Singapore' | 'UK'>('India');
  const [category, setCategory] = useState<'Commercial Contract' | 'Shareholder Deadlock' | 'IP & Tech' | 'Real Estate' | 'Employment' | 'Family & Estate'>('Commercial Contract');
  const [claimAmount, setClaimAmount] = useState('');
  
  const [claimantName, setClaimantName] = useState('Priya Sharma (Legal Counsel)');
  const [claimantEmail, setClaimantEmail] = useState('priya.sharma@lawfirm.com');
  const [respondentName, setRespondentName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');
  const [disputeSummary, setDisputeSummary] = useState('');
  const [preMediationAgreed, setPreMediationAgreed] = useState(true);

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const created = createDisputeCase({
        title: caseTitle || 'Commercial Dispute Filing',
        claimantName,
        claimantEmail,
        respondentName,
        respondentEmail,
        jurisdiction,
        category,
        claimAmount: claimAmount || '₹50,00,000',
        status: 'INTAKE_REVIEW',
        disputeSummary,
        documents: [
          { name: 'Disputed_Contract_Pleading.pdf', size: '2.1 MB', uploadDate: new Date().toLocaleDateString() }
        ],
        statutorySuitabilityScore: 92
      });

      setCreatedCaseId(created.id);
      setCreatedCaseNumber(created.caseNumber);
      setLoading(false);
      setStep(4);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Link href="/app/cases" className="text-xs font-mono text-amber-400 hover:underline">
          ← Back to Dispute Dockets
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="gold">STATUTORY DISPUTE INTAKE</Badge>
          <span className="text-xs text-slate-400 font-mono">India Mediation Act 2023 & International ADR</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">File a New Dispute Case</h1>
        <p className="text-xs text-slate-400 font-mono">Submit case facts to initiate institutional pre-litigation mediation and neutral appointment</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded border border-slate-800 text-xs font-mono">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
          <span>Overview</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
          <span>Parties & Claims</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
          <span>Dispute Facts</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-2 ${step >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">✓</span>
          <span>Docket Issued</span>
        </div>
      </div>

      {/* Step 1: Overview */}
      {step === 1 && (
        <Card variant="bordered" className="p-8 bg-slate-900/90 border-slate-800 space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <h2 className="text-xl font-serif font-bold text-white">Step 1: Dispute Framing & Jurisdiction</h2>
            <p className="text-xs text-slate-400">Select the applicable legal jurisdiction and dispute classification.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Dispute Caption / Case Title *</label>
              <input
                type="text"
                required
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                placeholder="e.g. Sterling Infrastructure vs Horizon Construction Consortium"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Primary Jurisdiction</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="India">India (Mediation Act 2023)</option>
                  <option value="UAE">UAE (DIFC Court ADR)</option>
                  <option value="Singapore">Singapore (SIMC Rules)</option>
                  <option value="UK">United Kingdom (CMC / CEDR)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Dispute Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Commercial Contract">Commercial Contract</option>
                  <option value="Shareholder Deadlock">Shareholder Deadlock</option>
                  <option value="IP & Tech">IP & Tech Licensing</option>
                  <option value="Real Estate">Real Estate & Construction</option>
                  <option value="Employment">Executive Employment</option>
                  <option value="Family & Estate">Family Business & Estate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Estimated Claim / Consideration Amount *</label>
              <input
                type="text"
                required
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="e.g. ₹1,25,00,000 or $250,000 USD"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              variant="primary" 
              onClick={() => setStep(2)}
              disabled={!caseTitle.trim()}
              className="text-xs uppercase tracking-wider py-2.5 px-6 font-bold"
            >
              Continue to Parties & Claims →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Parties */}
      {step === 2 && (
        <Card variant="bordered" className="p-8 bg-slate-900/90 border-slate-800 space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <h2 className="text-xl font-serif font-bold text-white">Step 2: Disputant Parties & Opposing Counsel</h2>
            <p className="text-xs text-slate-400">Specify contact information for the Claimant and Respondent.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">Claimant / Initiating Party</div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="Claimant Name"
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                />
                <input
                  type="email"
                  value={claimantEmail}
                  onChange={(e) => setClaimantEmail(e.target.value)}
                  placeholder="Claimant Email"
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">Respondent / Opposing Party *</div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  placeholder="e.g. Horizon Construction Pvt Ltd"
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="email"
                  required
                  value={respondentEmail}
                  onChange={(e) => setRespondentEmail(e.target.value)}
                  placeholder="e.g. legal@horizonconstruction.com"
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)} className="text-xs">
              ← Back
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setStep(3)}
              disabled={!respondentName.trim() || !respondentEmail.trim()}
              className="text-xs uppercase tracking-wider py-2.5 px-6 font-bold"
            >
              Continue to Dispute Facts →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Dispute Facts & File Upload */}
      {step === 3 && (
        <form onSubmit={handleSubmitCase}>
          <Card variant="bordered" className="p-8 bg-slate-900/90 border-slate-800 space-y-6">
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-serif font-bold text-white">Step 3: Dispute Fact Summary & Contract</h2>
              <p className="text-xs text-slate-400">Summarize the core contention and attach the underlying agreement.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Concise Dispute Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={disputeSummary}
                  onChange={(e) => setDisputeSummary(e.target.value)}
                  placeholder="Summarize the genesis of the dispute, breach of obligations, key negotiation stumbling blocks, and desired commercial settlement..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              <div className="border-2 border-dashed border-slate-800 p-6 rounded text-center space-y-1 bg-slate-950/60">
                <div className="text-2xl">📄</div>
                <div className="text-xs text-slate-300 font-semibold">Attach Commercial Contract / Formal Notice of Dispute</div>
                <div className="text-[10px] text-slate-500 font-mono">PDF, DOCX up to 25MB (Encrypted in Private S3 Vault)</div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={preMediationAgreed}
                  onChange={(e) => setPreMediationAgreed(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <label htmlFor="consent">
                  I confirm this filing complies with institutional pre-litigation ADR confidentiality protocols.
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" type="button" onClick={() => setStep(2)} className="text-xs">
                ← Back
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading || !disputeSummary.trim() || !preMediationAgreed}
                className="text-xs uppercase tracking-wider py-2.5 px-6 font-bold shadow-lg shadow-amber-900/40"
              >
                {loading ? 'Issuing Institutional Docket...' : 'Submit Dispute & Issue Docket →'}
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* Step 4: Success Docket Created */}
      {step === 4 && (
        <Card variant="bordered" className="p-8 bg-slate-900/90 border-emerald-500/40 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-950/40">
            ✓
          </div>

          <div className="space-y-2">
            <Badge variant="success">DISPUTE DOCKET ISSUED</Badge>
            <h2 className="text-2xl font-serif font-bold text-white">Dispute Case Successfully Registered</h2>
            <div className="text-lg font-mono font-bold text-amber-400">{createdCaseNumber}</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              An official institutional intake notice has been transmitted to <strong className="text-white">{respondentEmail}</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-left space-y-2 max-w-md mx-auto">
            <div className="text-slate-400 font-bold uppercase">Next Statutory Steps:</div>
            <div className="text-slate-300">1. Medar Case Manager reviews docket within 24 hours.</div>
            <div className="text-slate-300">2. Empanelled Neutral appointed based on domain compatibility.</div>
            <div className="text-slate-300">3. Joint preliminary briefing session scheduled.</div>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <Link href="/app/cases">
              <Button variant="primary" className="text-xs uppercase tracking-wider py-2.5 px-6 font-bold">
                View My Dispute Dockets →
              </Button>
            </Link>
            <Link href="/app/ai-diagnosis">
              <Button variant="outline" className="text-xs uppercase tracking-wider py-2.5 px-6">
                Run AI Diagnosis Studio
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
