'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@medar/ui';
import { getDisputeCases, DisputeCase } from '../../../lib/casesData';

export default function CandidateCasesPage() {
  const [cases, setCases] = useState<DisputeCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null);

  useEffect(() => {
    setCases(getDisputeCases());
  }, []);

  const getStatusBadge = (status: DisputeCase['status']) => {
    switch (status) {
      case 'INTAKE_REVIEW':
        return <Badge variant="outline">INTAKE UNDER REVIEW</Badge>;
      case 'NEUTRAL_ASSIGNED':
        return <Badge variant="gold">NEUTRAL APPOINTED</Badge>;
      case 'JOINT_SESSION_SCHEDULED':
        return <Badge variant="gold">JOINT HEARING SCHEDULED</Badge>;
      case 'MSA_DRAFTED':
        return <Badge variant="gold">MSA TERMS DRAFTED</Badge>;
      case 'RESOLVED':
        return <Badge variant="success">RESOLVED & EXECUTED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DISPUTE RESOLUTION DOCKET</Badge>
            <span className="text-xs text-emerald-400 font-mono">Institutional ADR</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Dispute Cases & Hearings</h1>
          <p className="text-xs text-slate-400 font-mono">Track active pre-litigation filings, assigned mediators, and joint hearing schedules</p>
        </div>

        <Link href="/app/cases/new">
          <Button variant="primary" className="text-xs uppercase tracking-wider py-2.5 px-5 font-bold shadow-md shadow-amber-900/40 flex items-center gap-2">
            <span>+ File New Dispute Case</span>
          </Button>
        </Link>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {cases.map((c) => (
          <Card key={c.id} variant="default" className="p-6 bg-slate-900/80 border-slate-800 space-y-4 hover:border-slate-700 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-400">{c.caseNumber}</span>
                  <span className="text-xs font-mono text-slate-400">Jurisdiction: {c.jurisdiction}</span>
                  <span className="text-xs font-mono text-slate-400">Filed: {c.filingDate}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-white mt-1">{c.title}</h2>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(c.status)}
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCase(c)}
                  className="text-xs py-1.5 px-3.5 border-slate-700 text-slate-200 hover:text-white"
                >
                  View Docket →
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Claimant vs Respondent</span>
                <span className="text-slate-200 font-semibold">{c.claimantName}</span>
                <span className="text-slate-400 block text-[10px] truncate mt-0.5">vs {c.respondentName}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Claim Amount & Category</span>
                <span className="text-amber-400 font-bold">{c.claimAmount}</span>
                <span className="text-slate-400 block text-[10px]">{c.category}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Appointed Mediator Neutral</span>
                {c.assignedMediator ? (
                  <span className="text-emerald-400 font-semibold">{c.assignedMediator.name}</span>
                ) : (
                  <span className="text-amber-300 font-semibold italic">Awaiting Panel Assignment</span>
                )}
                {c.nextHearingDate && (
                  <span className="text-slate-400 block text-[10px] truncate mt-0.5">{c.nextHearingDate}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-amber-500/50 rounded-lg p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedCase.caseNumber}</span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">{selectedCase.title}</h2>
                <div className="mt-2">{getStatusBadge(selectedCase.status)}</div>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-mono uppercase text-slate-400 font-bold">Dispute Fact Summary:</div>
              <p className="text-slate-300 bg-slate-950 p-4 rounded border border-slate-800 leading-relaxed">
                {selectedCase.disputeSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-4 rounded border border-slate-800">
              <div>
                <span className="text-slate-500 block uppercase">Claimant Contact:</span>
                <span className="text-slate-200">{selectedCase.claimantEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">Respondent Contact:</span>
                <span className="text-slate-200">{selectedCase.respondentEmail}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold">Filed Documents & Pleadings:</div>
              {selectedCase.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-200">📄 {doc.name} ({doc.size})</span>
                  <button 
                    onClick={() => alert(`Downloading: ${doc.name}`)}
                    className="text-amber-400 hover:underline font-mono text-[11px]"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <Button variant="outline" onClick={() => setSelectedCase(null)} className="text-xs">
                Close Docket
              </Button>
              <Link href="/app/ai-diagnosis">
                <Button variant="primary" className="text-xs">
                  AI Conflict Diagnosis for this Case →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
