'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@medar/ui';

interface ModuleItem {
  num: string;
  name: string;
  hours: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED';
  summary: string;
  readings: { title: string; type: string; size: string }[];
  lectures: { title: string; duration: string; speaker: string }[];
  quizScore?: string;
  currentLesson?: {
    title: string;
    duration: string;
    scenario: string;
    question: string;
    options: string[];
    explanation: string;
  };
}

export default function MyEnrollmentsPage() {
  const [selectedMaterialsModule, setSelectedMaterialsModule] = useState<ModuleItem | null>(null);
  const [activeLessonModule, setActiveLessonModule] = useState<ModuleItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const modules: ModuleItem[] = [
    {
      num: '01',
      name: 'Foundations of Mediation & ADR Frameworks',
      hours: '10 hrs',
      status: 'COMPLETED',
      summary: 'Comprehensive introduction to alternative dispute resolution theory, the statutory framework under the India Mediation Act 2023, and international comparisons (Singapore Convention, UNCITRAL Model Law).',
      quizScore: '94% (Passed with Distinction)',
      readings: [
        { title: 'Medar Official Handbook: ADR Theory & Core Principles', type: 'PDF Document', size: '3.8 MB' },
        { title: 'Statutory Comparison: Mediation Act 2023 vs Section 89 CPC', type: 'Legal Briefing', size: '1.4 MB' },
        { title: 'Code of Ethics & Mediator Impartiality Guidelines', type: 'Reference Sheet', size: '850 KB' }
      ],
      lectures: [
        { title: 'Lecture 1.1: The Spectrum of Alternative Dispute Resolution', duration: '45 mins', speaker: 'Dr. A. S. Nariman' },
        { title: 'Lecture 1.2: Voluntariness, Confidentiality & Neutrality in Practice', duration: '55 mins', speaker: 'Justice R. V. Raveendran' }
      ]
    },
    {
      num: '02',
      name: 'Communication, Caucusing & Negotiation Dynamics',
      hours: '16 hrs',
      status: 'COMPLETED',
      summary: 'Mastering active listening, interest-based bargaining (Harvard Negotiation Project principles), reframing toxic statements, and strategic caucus management.',
      quizScore: '90% (Passed)',
      readings: [
        { title: 'Interest-Based Negotiation: Moving Beyond Positional Bargaining', type: 'Case Study', size: '2.2 MB' },
        { title: 'Caucus Protocols: Managing Sensitive Commercial Disclosures', type: 'Practice Guide', size: '1.1 MB' },
        { title: 'Emotional Intelligence & De-escalation in High-Conflict Disputes', type: 'Research Paper', size: '1.9 MB' }
      ],
      lectures: [
        { title: 'Lecture 2.1: The Architecture of an Effective Joint Session', duration: '60 mins', speaker: 'Adv. Rajesh Kulkarni' },
        { title: 'Lecture 2.2: Advanced Caucusing Tactics & Reality Testing', duration: '50 mins', speaker: 'Tariq Al-Mansoor' }
      ]
    },
    {
      num: '03',
      name: 'Simulated Live Mediation Role-Play Assessment',
      hours: '14 hrs',
      status: 'IN_PROGRESS',
      summary: 'Hands-on simulated mediation hearings in commercial and shareholder disputes. Practice opening statements, agenda setting, reality testing, and term sheet formulation.',
      readings: [
        { title: 'Confidential Case Briefing: TechVentures Ltd. vs Alpha Logistics', type: 'Simulated File', size: '3.1 MB' },
        { title: 'Mediated Settlement Agreement (MSA) Standard Clauses Model', type: 'Drafting Template', size: '920 KB' }
      ],
      lectures: [
        { title: 'Lecture 3.1: Live Simulation Hearing Briefing & Observer Guidelines', duration: '40 mins', speaker: 'Adv. Priya Sharma' }
      ],
      currentLesson: {
        title: 'Lesson 3.2: Reality Testing & Overcoming Deadlock in Commercial Claims',
        duration: '25 mins • Interactive Simulation',
        scenario: 'You are presiding as mediator over a commercial dispute between a software vendor (Claimant) and an enterprise logistics provider (Respondent). The parties are deadlocked over an alleged ₹1.85 Cr SLA breach penalty. The Claimant demands immediate payment; the Respondent threatens countersuing in High Court.',
        question: 'What is the most effective reality-testing question to ask the Respondent in private caucus to test their BATNA (Best Alternative to a Negotiated Agreement)?',
        options: [
          'Why did you breach the SLA contract in the first place?',
          'If this goes to litigation, what will be your estimated legal costs, management time, and timeline over the next 3 years compared to settling today?',
          'Do you realize the Claimant has a stronger legal team than yours?',
          'Can you just split the difference and pay 50% to finish this today?'
        ],
        explanation: 'Option 2 is the classic, interest-based reality testing probe. It shifts the party from stubborn positional rhetoric to objective cost-benefit analysis (legal fees, lost executive focus, judicial delay) without compromising mediator neutrality.'
      }
    }
  ];

  const handleOpenMaterials = (m: ModuleItem) => {
    setSelectedMaterialsModule(m);
  };

  const handleStartLesson = (m: ModuleItem) => {
    setActiveLessonModule(m);
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
    setLessonCompleted(false);
  };

  const handleSelectOption = (index: number) => {
    if (showAnswerFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowAnswerFeedback(true);
    if (selectedAnswer === 1) {
      setLessonCompleted(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">MY ENROLLMENTS</Badge>
            <span className="text-xs text-amber-400 font-mono">Cohort 1 • Active</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Course Modules & Learning Syllabus</h1>
          <p className="text-xs text-slate-400 font-mono">Certificate in Mediation — Foundation Program (40 Hours Total Duration)</p>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xs font-mono text-slate-400">Total Program Progress</div>
          <div className="text-xl font-serif font-bold text-amber-400">65% Complete</div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((m) => (
          <Card 
            key={m.num} 
            variant="default" 
            className={`p-6 transition-all ${
              m.status === 'IN_PROGRESS' 
                ? 'border-amber-500/50 bg-slate-900/90 shadow-lg shadow-amber-950/20' 
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-500 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    MODULE {m.num}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Duration: {m.hours}</span>
                  {m.quizScore && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                      ✓ {m.quizScore}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-serif font-bold text-white">{m.name}</h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{m.summary}</p>
              </div>

              <div className="flex sm:flex-col items-end gap-3 w-full lg:w-auto justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
                <Badge variant={m.status === 'COMPLETED' ? 'success' : 'gold'}>
                  {m.status === 'COMPLETED' ? 'COMPLETED' : 'IN PROGRESS (65%)'}
                </Badge>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOpenMaterials(m)}
                    className="text-xs py-2 px-4 border-slate-700 hover:border-amber-500 text-slate-200"
                  >
                    📖 Review Materials
                  </Button>

                  {m.status === 'IN_PROGRESS' && (
                    <Button 
                      variant="primary" 
                      onClick={() => handleStartLesson(m)}
                      className="text-xs py-2 px-5 font-bold uppercase tracking-wider shadow-md shadow-amber-900/40 flex items-center gap-1.5"
                    >
                      ▶ Start Lesson
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 1. REVIEW MATERIALS MODAL */}
      {selectedMaterialsModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-amber-500/40 rounded-lg p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <Badge variant="gold">MODULE {selectedMaterialsModule.num} RESOURCE VAULT</Badge>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  {selectedMaterialsModule.name}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Official readings, statutory references, and recorded lectures</p>
              </div>

              <button
                onClick={() => setSelectedMaterialsModule(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase rounded transition-all cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Readings Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <span>📚</span> Required Reading & Statutory Guides
              </h3>

              <div className="space-y-2">
                {selectedMaterialsModule.readings.map((reading, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📄</span>
                      <div>
                        <div className="text-sm font-semibold text-white">{reading.title}</div>
                        <div className="text-[10px] font-mono text-slate-400">{reading.type} • {reading.size}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Downloading: ${reading.title}`)}
                      className="px-3 py-1 bg-slate-800 hover:bg-amber-600 hover:text-black text-amber-400 font-mono text-xs rounded transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recorded Lectures Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <span>🎥</span> Lecture Archives & Faculty Masterclasses
              </h3>

              <div className="space-y-2">
                {selectedMaterialsModule.lectures.map((lec, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">▶️</span>
                      <div>
                        <div className="text-sm font-semibold text-white">{lec.title}</div>
                        <div className="text-[10px] font-mono text-slate-400">Speaker: {lec.speaker} • Duration: {lec.duration}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Opening stream for: ${lec.title}`)}
                      className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-300 font-mono text-xs rounded transition-all cursor-pointer font-semibold"
                    >
                      Watch Stream
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">Status: Verified in Medar LMS</span>
              <Button 
                variant="outline" 
                onClick={() => setSelectedMaterialsModule(null)}
                className="text-xs px-5"
              >
                Close Vault
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. START LESSON INTERACTIVE SIMULATION MODAL */}
      {activeLessonModule && activeLessonModule.currentLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-amber-500/50 rounded-lg p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="gold">LIVE INTERACTIVE LESSON</Badge>
                  <span className="text-xs font-mono text-amber-400">Module {activeLessonModule.num}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  {activeLessonModule.currentLesson.title}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">{activeLessonModule.currentLesson.duration}</p>
              </div>

              <button
                onClick={() => setActiveLessonModule(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase rounded transition-all cursor-pointer"
              >
                ✕ Exit Lesson
              </button>
            </div>

            {/* Video/Simulation Brief Card */}
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
                <span>📋</span> Simulated Dispute Case Scenario
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLessonModule.currentLesson.scenario}
              </p>
            </div>

            {/* Interactive Question */}
            <div className="space-y-4">
              <div className="text-sm font-serif font-bold text-white">
                💡 Practical Mediator Prompt:
              </div>
              <div className="text-xs font-mono text-slate-200 bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-lg">
                {activeLessonModule.currentLesson.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activeLessonModule.currentLesson.options.map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3.5 rounded-lg border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                      selectedAnswer === idx
                        ? 'bg-amber-500/15 border-amber-500 text-white font-medium'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5 ${
                      selectedAnswer === idx ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback / Results */}
            {showAnswerFeedback && (
              <div className={`p-4 rounded-lg border text-xs space-y-2 ${
                selectedAnswer === 1
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                  : 'bg-red-950/40 border-red-800/40 text-red-200'
              }`}>
                <div className="font-bold font-mono uppercase">
                  {selectedAnswer === 1 ? '✓ Correct Strategy Selected!' : '⚠️ Needs Reconsideration'}
                </div>
                <p className="leading-relaxed text-slate-300">
                  {activeLessonModule.currentLesson.explanation}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => setActiveLessonModule(null)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Close
              </button>

              {!showAnswerFeedback ? (
                <Button 
                  variant="primary" 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="text-xs py-2.5 px-6 font-bold"
                >
                  Submit Response →
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={() => {
                    alert('Lesson 3.2 completed! Progress recorded in Medar LMS.');
                    setActiveLessonModule(null);
                  }}
                  className="text-xs py-2.5 px-6 font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Complete Lesson & Save Progress ✓
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
