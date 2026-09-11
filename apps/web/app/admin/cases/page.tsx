'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@medar/ui';
import {
  DisputeCase,
  getDisputeCases,
  updateCaseStatus,
  assignMediatorToCase,
  deleteDisputeCase
} from '../../../lib/casesData';
import { getMediators, MediatorProfile } from '../../../lib/mediatorsData';

export default function AdminCasesCockpitPage() {
  const [cases, setCases] = useState<DisputeCase[]>([]);
  const [mediators, setMediators] = useState<MediatorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('ALL');
  
  // Selected case for detailed cockpit modal
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null);
  const [assigningMediatorId, setAssigningMediatorId] = useState<string>('');
  const [hearingScheduleDate, setHearingScheduleDate] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setCases(getDisputeCases());
    setMediators(getMediators());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.respondentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesJurisdiction = jurisdictionFilter === 'ALL' || c.jurisdiction === jurisdictionFilter;

    return matchesSearch && matchesStatus && matchesJurisdiction;
  });

  const stats = {
    total: cases.length,
    intakeReview: cases.filter((c) => c.status === 'INTAKE_REVIEW').length,
    activeChambers: cases.filter(
      (c) => c.status === 'NEUTRAL_ASSIGNED' || c.status === 'JOINT_SESSION_SCHEDULED'
    ).length,
    resolved: cases.filter((c) => c.status === 'RESOLVED' || c.status === 'MSA_DRAFTED').length
  };

  const handleStatusChange = (caseId: string, newStatus: DisputeCase['status'], customDate?: string) => {
    const updated = updateCaseStatus(caseId, newStatus, customDate);
    setCases(updated);
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(updated.find((c) => c.id === caseId) || null);
    }
    showToast(`Case status updated to ${newStatus.replace(/_/g, ' ')}`);
  };

  const handleAssignMediator = (caseId: string) => {
    if (!assigningMediatorId) return;
    const mediator = mediators.find((m) => m.slug === assigningMediatorId);
    if (!mediator) return;

    const hearingStr = hearingScheduleDate
      ? `Scheduled: ${hearingScheduleDate} (Virtual Chamber)`
      : 'Virtual Chamber Session Scheduling Pending';

    const updated = assignMediatorToCase(
      caseId,
      {
        name: mediator.name,
        title: mediator.title,
        email: `${mediator.slug}@medar.org`
      },
      hearingStr
    );

    setCases(updated);
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(updated.find((c) => c.id === caseId) || null);
    }
    showToast(`Appointed ${mediator.name} as lead institutional neutral`);
  };

  const handleDeleteCase = (caseId: string) => {
    if (!confirm('Are you sure you want to archive and remove this dispute docket?')) return;
    const updated = deleteDisputeCase(caseId);
    setCases(updated);
    setSelectedCase(null);
    showToast('Dispute docket archived from active cockpit');
  };

  const getStatusBadge = (status: DisputeCase['status']) => {
    switch (status) {
      case 'INTAKE_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Intake Review
          </span>
        );
      case 'NEUTRAL_ASSIGNED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Neutral Assigned
          </span>
        );
      case 'JOINT_SESSION_SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Joint Chamber Session
          </span>
        );
      case 'MSA_DRAFTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            MSA Draft Issued
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold">
            ✓ Enforceable Decree
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] border border-[#C49B38] text-white px-5 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="text-[#C49B38] text-base">✓</span>
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">ADMINISTRATION COCKPIT</Badge>
            <span className="text-xs font-mono text-slate-500">· Statutory ADR Case Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Institutional Dispute Docket Management
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Verify filings, assign empanelled neutrals, schedule virtual dispute chambers, and track Settlement Agreements (MSAs).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setCases(getDisputeCases());
              showToast('Dispute dockets refreshed');
            }}
            className="text-xs font-mono py-2 px-3 border-slate-700 text-slate-300 hover:text-white"
          >
            ↻ Sync Dockets
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 border-slate-800 bg-[#0F1116]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Dispute Filings</div>
          <div className="text-2xl font-serif font-bold text-white mt-1">{stats.total}</div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">Institutional dockets</div>
        </Card>

        <Card variant="default" className="p-4 border-amber-900/30 bg-[#14120B]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Intake Review Required</div>
          <div className="text-2xl font-serif font-bold text-amber-300 mt-1">{stats.intakeReview}</div>
          <div className="text-[10px] font-mono text-amber-500/80 mt-1">Pending neutral appointment</div>
        </Card>

        <Card variant="default" className="p-4 border-blue-900/30 bg-[#0B121C]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400">Active Chamber Hearings</div>
          <div className="text-2xl font-serif font-bold text-blue-300 mt-1">{stats.activeChambers}</div>
          <div className="text-[10px] font-mono text-blue-500/80 mt-1">Scheduled or in session</div>
        </Card>

        <Card variant="default" className="p-4 border-emerald-900/30 bg-[#0B1A14]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Resolved / Enforceable MSAs</div>
          <div className="text-2xl font-serif font-bold text-emerald-300 mt-1">{stats.resolved}</div>
          <div className="text-[10px] font-mono text-emerald-500/80 mt-1">Binding Section 27 Decrees</div>
        </Card>
      </div>

      {/* Search & Filter Toolbar */}
      <Card variant="bordered" className="p-4 bg-[#0F1116] border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search case #, claimant, respondent, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#07080A] border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={jurisdictionFilter}
              onChange={(e) => setJurisdictionFilter(e.target.value)}
              className="bg-[#07080A] border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#C49B38]"
            >
              <option value="ALL">All Jurisdictions</option>
              <option value="India">India 🇮🇳</option>
              <option value="UAE">UAE 🇦🇪</option>
              <option value="Singapore">Singapore 🇸🇬</option>
              <option value="UK">United Kingdom 🇬🇧</option>
            </select>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60">
          <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">Status Filter:</span>
          {[
            { key: 'ALL', label: 'All Dockets' },
            { key: 'INTAKE_REVIEW', label: 'Intake Review' },
            { key: 'NEUTRAL_ASSIGNED', label: 'Neutral Assigned' },
            { key: 'JOINT_SESSION_SCHEDULED', label: 'Chamber Scheduled' },
            { key: 'MSA_DRAFTED', label: 'MSA Drafted' },
            { key: 'RESOLVED', label: 'Enforceable Decree' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`text-[11px] font-mono px-3 py-1 rounded transition-colors ${
                statusFilter === tab.key
                  ? 'bg-[#C49B38]/20 border border-[#C49B38] text-[#E5C158] font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Cases List / Table */}
      <div className="space-y-3">
        {filteredCases.length === 0 ? (
          <Card variant="bordered" className="p-12 text-center bg-[#0F1116] border-slate-800">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center text-lg mb-3">
              ⚖
            </div>
            <h3 className="text-sm font-serif font-bold text-white">No Dispute Dockets Match Query</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Try adjusting your search keywords or resetting status filters.
            </p>
          </Card>
        ) : (
          filteredCases.map((c) => (
            <Card
              key={c.id}
              variant="default"
              className="p-5 border-slate-800/80 bg-[#0F1116] hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Main Case Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#E5C158] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-0.5 rounded">
                      {c.caseNumber}
                    </span>
                    {getStatusBadge(c.status)}
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {c.jurisdiction} · {c.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Filed: {c.filingDate}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white hover:text-[#C49B38] transition-colors cursor-pointer" onClick={() => setSelectedCase(c)}>
                    {c.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <div>
                      <span className="text-slate-500">Claimant: </span>
                      <span className="text-slate-200">{c.claimantName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Respondent: </span>
                      <span className="text-slate-200">{c.respondentName}</span>
                    </div>
                  </div>

                  {c.assignedMediator ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 px-3 py-1.5 rounded w-fit">
                      <span>👤 Lead Neutral:</span>
                      <span className="font-semibold text-white">{c.assignedMediator.name}</span>
                      <span className="text-slate-400">({c.assignedMediator.title})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/20 border border-amber-800/30 px-3 py-1.5 rounded w-fit">
                      <span>⚠ Neutral:</span>
                      <span className="font-semibold">Unassigned — Action Required</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Claim & Quick Action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800/80 gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Disputed Amount</div>
                    <div className="text-sm font-mono font-bold text-slate-100">{c.claimAmount}</div>
                    <div className="text-[10px] font-mono text-emerald-400">
                      Suitability: {c.statutorySuitabilityScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedCase(c);
                        setAssigningMediatorId(mediators[0]?.slug || '');
                      }}
                      className="text-xs font-mono uppercase tracking-wider py-2 px-4"
                    >
                      Manage Docket →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Case Management Drawer / Cockpit Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D0F14] border border-slate-700 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative animate-scale-up">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#E5C158] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-0.5 rounded">
                    {selectedCase.caseNumber}
                  </span>
                  {getStatusBadge(selectedCase.status)}
                </div>
                <h2 className="text-xl font-serif font-bold text-white mt-1">
                  {selectedCase.title}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Jurisdiction: {selectedCase.jurisdiction} · Statutory Score: {selectedCase.statutorySuitabilityScore}% · Value: {selectedCase.claimAmount}
                </p>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="w-8 h-8 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Disputant Parties & Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Claimant & Counsel</div>
                <div className="text-xs font-mono text-white font-semibold">{selectedCase.claimantName}</div>
                <div className="text-[11px] font-mono text-slate-400">{selectedCase.claimantEmail}</div>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Respondent & Counsel</div>
                <div className="text-xs font-mono text-white font-semibold">{selectedCase.respondentName}</div>
                <div className="text-[11px] font-mono text-slate-400">{selectedCase.respondentEmail}</div>
              </div>
            </div>

            {/* Dispute Dossier Summary */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#C49B38] font-semibold">
                Factual Narrative & Claim Basis
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800/90 rounded text-xs text-slate-300 font-mono leading-relaxed">
                {selectedCase.disputeSummary}
              </div>
            </div>

            {/* Attached Documents */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Evidentiary Documents & Contracts ({selectedCase.documents?.length || 0})
              </div>
              <div className="space-y-1.5">
                {selectedCase.documents?.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-900/40 border border-slate-800/80 rounded text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-slate-200">
                      <span className="text-[#C49B38]">📄</span>
                      <span>{doc.name}</span>
                      <span className="text-slate-500">({doc.size})</span>
                    </div>
                    <button
                      onClick={() => showToast(`Downloaded evidentiary exhibit: ${doc.name}`)}
                      className="text-[11px] text-[#C49B38] hover:underline"
                    >
                      Download Exhibit ↓
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Hearing Info if scheduled */}
            {selectedCase.nextHearingDate && (
              <div className="p-3.5 bg-purple-950/20 border border-purple-800/40 rounded space-y-1">
                <div className="text-[10px] font-mono uppercase text-purple-300 font-semibold">
                  Scheduled Chamber Session
                </div>
                <div className="text-xs font-mono text-white font-semibold">
                  {selectedCase.nextHearingDate}
                </div>
                <div className="text-[11px] font-mono text-purple-400 flex items-center gap-2 pt-1">
                  <span>🔐 Encrypted Chamber:</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Virtual Chamber link copied to clipboard');
                    }}
                    className="underline hover:text-white"
                  >
                    https://chamber.medar.org/v/{selectedCase.caseNumber.toLowerCase()}
                  </a>
                </div>
              </div>
            )}

            {/* NEUTRAL ASSIGNMENT CONSOLE */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
                  <span>⚖ Neutral Appointment Console</span>
                  {selectedCase.assignedMediator && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      CURRENTLY APPOINTED
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Select Empanelled Neutral
                  </label>
                  <select
                    value={assigningMediatorId}
                    onChange={(e) => setAssigningMediatorId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C49B38]"
                  >
                    {mediators.map((m) => (
                      <option key={m.slug} value={m.slug}>
                        {m.name} ({m.jurisdiction} · {m.experience})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Proposed Hearing Date & Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thu, Sep 24 at 2:00 PM IST"
                    value={hearingScheduleDate}
                    onChange={(e) => setHearingScheduleDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => handleAssignMediator(selectedCase.id)}
                className="w-full justify-center text-xs font-mono uppercase tracking-wider py-2"
              >
                Confirm Neutral Appointment & Issue Chamber Notice →
              </Button>
            </div>

            {/* DOCKET STATUS ADVANCEMENT WORKFLOW */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Advance Procedural Status (Statutory Milestones)
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleStatusChange(selectedCase.id, 'INTAKE_REVIEW')}
                  className={`text-[10px] font-mono p-2 rounded border text-center transition-all ${
                    selectedCase.status === 'INTAKE_REVIEW'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  1. Intake Review
                </button>

                <button
                  onClick={() => handleStatusChange(selectedCase.id, 'JOINT_SESSION_SCHEDULED')}
                  className={`text-[10px] font-mono p-2 rounded border text-center transition-all ${
                    selectedCase.status === 'JOINT_SESSION_SCHEDULED'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  2. Joint Hearing
                </button>

                <button
                  onClick={() => handleStatusChange(selectedCase.id, 'MSA_DRAFTED')}
                  className={`text-[10px] font-mono p-2 rounded border text-center transition-all ${
                    selectedCase.status === 'MSA_DRAFTED'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  3. Draft MSA
                </button>

                <button
                  onClick={() => handleStatusChange(selectedCase.id, 'RESOLVED')}
                  className={`text-[10px] font-mono p-2 rounded border text-center transition-all ${
                    selectedCase.status === 'RESOLVED'
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  4. Enforceable Decree
                </button>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => handleDeleteCase(selectedCase.id)}
                className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
              >
                Archive Docket
              </button>

              <Button
                variant="outline"
                onClick={() => setSelectedCase(null)}
                className="text-xs font-mono py-2 px-4 border-slate-700 text-slate-300"
              >
                Close Cockpit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
