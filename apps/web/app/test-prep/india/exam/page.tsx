'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../../components/Navbar';
import { Footer } from '../../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

interface ExamQuestion {
  id: number;
  category: string;
  sectionRef: string;
  scenario: string;
  options: { label: string; text: string }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  statutoryExplanation: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    category: 'Pre-Litigation Mandate',
    sectionRef: 'Section 5(1), India Mediation Act 2023',
    scenario: 'A commercial enterprise intends to institute a suit for recovery of ₹2.50 Crores arising out of a software licensing agreement. Under the India Mediation Act 2023, what is the prerequisite before filing in a commercial court?',
    options: [
      { label: 'A', text: 'Pre-litigation mediation is strictly optional and only required if specified in the master contract.' },
      { label: 'B', text: 'The claimant is mandated to initiate pre-litigation mediation unless urgent interim relief is sought from the competent court.' },
      { label: 'C', text: 'The claimant must deposit 50% of the disputed sum into an escrow account before any court filing.' },
      { label: 'D', text: 'Pre-litigation mediation only applies to family and estate disputes, not commercial matters.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 5(1) of the India Mediation Act 2023 mandates that parties shall undertake pre-litigation mediation before approaching a civil court or tribunal, subject to urgent interim exceptions under Section 8.'
  },
  {
    id: 2,
    category: 'Statutory Timelines',
    sectionRef: 'Section 18(1) & (2), India Mediation Act 2023',
    scenario: 'What is the maximum prescribed statutory timeline for concluding a formal mediation proceeding from the date of first appearance before the appointed neutral?',
    options: [
      { label: 'A', text: '30 days, with no statutory provision for extension.' },
      { label: 'B', text: '60 days, extendable by a further 30 days.' },
      { label: 'C', text: '120 days, extendable by mutual consent of the parties for a maximum additional period of 60 days (total 180 days).' },
      { label: 'D', text: '1 year from the date of issuing notice of dispute.' }
    ],
    correctAnswer: 'C',
    statutoryExplanation: 'Section 18 provides a primary statutory limit of 120 days, which can be extended by a maximum of 60 days upon mutual written consent of all disputing parties.'
  },
  {
    id: 3,
    category: 'Non-Submittable Disputes',
    sectionRef: 'Section 6 & First Schedule, India Mediation Act 2023',
    scenario: 'Which of the following dispute matters is expressly excluded from mediation under the First Schedule of the Act?',
    options: [
      { label: 'A', text: 'Disputes involving allegations of breach of commercial contract SLAs.' },
      { label: 'B', text: 'Shareholder deadlocks in unlisted private limited companies.' },
      { label: 'C', text: 'Criminal prosecutions for non-compoundable offences, tax levy disputes, and matters affecting rights of third parties not party to the mediation.' },
      { label: 'D', text: 'Software intellectual property cross-licensing negotiations.' }
    ],
    correctAnswer: 'C',
    statutoryExplanation: 'The First Schedule to the Act excludes criminal prosecutions, direct/indirect taxation assessments, environmental statutory sanctions, and disputes directly infringing on third-party non-parties.'
  },
  {
    id: 4,
    category: 'Interim Judicial Relief',
    sectionRef: 'Section 8, India Mediation Act 2023',
    scenario: 'If a commercial claimant discovers that the respondent is actively alienating bank assets during pendency of pre-litigation mediation, what recourse is available?',
    options: [
      { label: 'A', text: 'The claimant is barred from approaching any court until the 120-day mediation window expires.' },
      { label: 'B', text: 'The claimant may approach the competent commercial court/tribunal for urgent interim relief without extinguishing the mediation mandate.' },
      { label: 'C', text: 'The mediator can unilaterally issue freezing injunctions and enforce criminal contempt.' },
      { label: 'D', text: 'The claimant must immediately forfeit all mediation escrow guarantees.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 8 permits a party to seek urgent interim orders from a competent court before or during mediation proceedings if exceptional circumstances warrant asset preservation.'
  },
  {
    id: 5,
    category: 'Settlement Enforceability',
    sectionRef: 'Section 27(2), India Mediation Act 2023',
    scenario: 'Once a Mediated Settlement Agreement (MSA) is executed by the parties and authenticated by the neutral, what is its legal effect and enforceability?',
    options: [
      { label: 'A', text: 'It operates merely as a non-binding gentleman\'s agreement requiring fresh civil suit filing.' },
      { label: 'B', text: 'It has the identical legal status and enforceability as a decree or judgment passed by a Civil Court under the Code of Civil Procedure (CPC), 1908.' },
      { label: 'C', text: 'It must be re-adjudicated de novo before the High Court within 30 days.' },
      { label: 'D', text: 'It only binds the mediator, not the signing corporate entities.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 27(2) elevates an authenticated MSA to the status of a final and binding Civil Court decree, directly enforceable under Order XXI of the CPC 1908.'
  },
  {
    id: 6,
    category: 'Challenging an MSA',
    sectionRef: 'Section 28, India Mediation Act 2023',
    scenario: 'What are the strict statutory grounds and limitation period under Section 28 for challenging a registered Mediated Settlement Agreement?',
    options: [
      { label: 'A', text: 'Any commercial dissatisfaction filed within 10 years of signing.' },
      { label: 'B', text: 'Limited strictly to fraud, corruption, gross impersonation, or non-submittable subject matter, filed within 90 days of receipt of the authenticated copy.' },
      { label: 'C', text: 'Market fluctuations causing economic hardship to the respondent.' },
      { label: 'D', text: 'No challenge is permitted under any circumstances whatsoever.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 28 allows an MSA to be challenged exclusively on grounds of fraud, corruption, gross impersonation, or non-arbitrable subject matter within a strict 90-day window (extendable by 30 days for sufficient cause).'
  },
  {
    id: 7,
    category: 'Confidentiality & Privilege',
    sectionRef: 'Sections 22 & 23, India Mediation Act 2023',
    scenario: 'During a private caucus, the respondent admits to an internal accounting discrepancy. If mediation subsequently fails, can the claimant introduce this admission into future litigation?',
    options: [
      { label: 'A', text: 'Yes, because all statements made before any neutral become public judicial record.' },
      { label: 'B', text: 'No. The Act enforces absolute statutory confidentiality; proposals, admissions, and caucus documents are inadmissible as evidence in court or arbitral tribunals.' },
      { label: 'C', text: 'Yes, provided the claimant pays a statutory admissibility penalty to the Bar Council.' },
      { label: 'D', text: 'Only if the trial judge specifically requests audio recordings of the session.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Sections 22 and 23 impose non-derogable confidentiality. No admission, concession, proposal, or document generated during mediation is admissible in subsequent judicial proceedings.'
  },
  {
    id: 8,
    category: 'Mediator Immunity',
    sectionRef: 'Section 26, India Mediation Act 2023',
    scenario: 'An aggrieved party seeks to sue an empanelled mediator personally for damages alleging that the mediator proposed an unfavorable settlement ratio. Does the lawsuit succeed?',
    options: [
      { label: 'A', text: 'Yes, mediators carry unlimited personal tortious liability for settlement outcomes.' },
      { label: 'B', text: 'No. Section 26 grants statutory immunity to mediators from civil or criminal proceedings for any act done or omitted in good faith during mediation.' },
      { label: 'C', text: 'Yes, if approved by a majority vote of the disputants.' },
      { label: 'D', text: 'The suit is diverted to municipal small claims arbitration.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 26 provides comprehensive statutory protection and immunity for mediators acting in good faith in discharge of their functions under the Act.'
  },
  {
    id: 9,
    category: 'Neutral Independence & Disclosures',
    sectionRef: 'Section 19, India Mediation Act 2023',
    scenario: 'Prior to the first joint session, an appointed mediator realizes their spouse holds equity shares in the claimant company. What is the mediator\'s legal obligation?',
    options: [
      { label: 'A', text: 'No action is needed as long as the shareholding is less than 50%.' },
      { label: 'B', text: 'The mediator must immediately disclose in writing any financial, professional, or personal interest that may give rise to justifiable doubts regarding impartiality.' },
      { label: 'C', text: 'The mediator must transfer the shares to the respondent.' },
      { label: 'D', text: 'The mediator may proceed silently if the respondent does not inquire.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 19 mandates continuous written disclosure of any direct or indirect interest that could raise justifiable doubts regarding neutral independence or create a conflict of interest.'
  },
  {
    id: 10,
    category: 'Online Mediation & Digital MSAs',
    sectionRef: 'Section 30, India Mediation Act 2023',
    scenario: 'Under Section 30, what are the statutory standards governing Online Dispute Resolution (ODR) and electronic execution of MSAs?',
    options: [
      { label: 'A', text: 'Online mediation is prohibited; all sessions must be held in physical courtrooms.' },
      { label: 'B', text: 'Online mediation is fully recognized, provided digital integrity, end-to-end encryption, and compliant electronic/digital signatures are maintained.' },
      { label: 'C', text: 'Online MSAs are only valid if witnessed physically by a High Court Registrar.' },
      { label: 'D', text: 'Digital mediation is restricted solely to disputes valued under ₹10,000.' }
    ],
    correctAnswer: 'B',
    statutoryExplanation: 'Section 30 explicitly validates Online Mediation, digital communication channels, encrypted virtual chambers, and legally binding digital execution under the Information Technology Act 2000.'
  }
];

export default function MockBarExamSimulatorPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (examStarted && !isSubmitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optionLabel: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [EXAM_QUESTIONS[currentIdx].id]: optionLabel
    }));
  };

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    EXAM_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });
    return {
      correct,
      total: EXAM_QUESTIONS.length,
      percentage: Math.round((correct / EXAM_QUESTIONS.length) * 100),
      passed: correct >= 7
    };
  };

  const scoreData = isSubmitted ? calculateScore() : null;

  const currentQ = EXAM_QUESTIONS[currentIdx];

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold">BAR EXAM SIMULATOR</Badge>
                <span className="text-xs font-mono text-slate-400">India Mediation Act 2023</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Statutory Bar Assessment Mock Exam
              </h1>
            </div>

            {examStarted && !isSubmitted && (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-md">
                <span className="text-xs font-mono text-slate-400">TIME REMAINING:</span>
                <span
                  className={`text-lg font-mono font-bold ${
                    timeLeft < 120 ? 'text-red-400 animate-pulse' : 'text-[#E5C158]'
                  }`}
                >
                  ⏱ {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>

          {/* Intro Splash Screen before start */}
          {!examStarted && (
            <Card variant="bordered" className="p-8 md:p-12 bg-[#0F1116] border-[#C49B38]/40 space-y-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#C49B38]/20 border border-[#C49B38] text-[#E5C158] mx-auto flex items-center justify-center text-2xl font-bold">
                ⚖
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-white">
                  Official Statutory Mock Assessment
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  You are about to begin a 10-question timed practice exam simulating the Bar Council and IIAM accreditation criteria under the India Mediation Act 2023.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs bg-slate-950 p-4 rounded border border-slate-800">
                <div>
                  <div className="text-slate-500 text-[10px]">QUESTIONS</div>
                  <div className="text-white font-bold mt-0.5">10 MCQs</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">DURATION</div>
                  <div className="text-[#E5C158] font-bold mt-0.5">15 Minutes</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">PASS BENCHMARK</div>
                  <div className="text-emerald-400 font-bold mt-0.5">70% (7/10)</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={() => setExamStarted(true)}
                  className="w-full justify-center text-xs font-mono uppercase tracking-wider py-3.5 shadow-xl shadow-[#C49B38]/20"
                >
                  Start Timed Examination →
                </Button>
                <Link href="/test-prep/india" className="block text-xs font-mono text-slate-400 hover:underline">
                  ← Return to Syllabus Overview
                </Link>
              </div>
            </Card>
          )}

          {/* ACTIVE EXAM INTERFACE */}
          {examStarted && !isSubmitted && (
            <div className="space-y-6">
              {/* Question Navigation Matrix */}
              <Card variant="default" className="p-4 bg-[#0F1116] border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-400">
                    Question <span className="text-[#E5C158] font-bold">{currentIdx + 1}</span> of {EXAM_QUESTIONS.length}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {EXAM_QUESTIONS.map((q, idx) => {
                      const isAnswered = !!userAnswers[q.id];
                      const isFlagged = !!flaggedQuestions[q.id];
                      const isCurrent = idx === currentIdx;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIdx(idx)}
                          className={`w-7 h-7 rounded text-xs font-mono transition-all relative ${
                            isCurrent
                              ? 'bg-[#C49B38] text-slate-950 font-bold ring-2 ring-[#C49B38]/50'
                              : isAnswered
                              ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {idx + 1}
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`text-xs font-mono px-3 py-1 rounded border transition-colors ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🚩 {flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
                  </button>
                </div>
              </Card>

              {/* Question Card */}
              <Card variant="bordered" className="p-6 md:p-8 bg-[#0F1116] border-slate-800 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-[#C49B38] font-semibold">{currentQ.category}</span>
                    <span>·</span>
                    <span>{currentQ.sectionRef}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-relaxed">
                    {currentQ.scenario}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQ.id] === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelectAnswer(opt.label)}
                        className={`w-full text-left p-4 rounded-md border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#C49B38]/15 border-[#C49B38] text-white shadow-lg shadow-[#C49B38]/10'
                            : 'bg-[#07080A] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs shrink-0 font-bold ${
                            isSelected
                              ? 'bg-[#C49B38] text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs sm:text-sm font-sans font-light leading-relaxed pt-0.5">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
                  <Button
                    variant="outline"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((p) => p - 1)}
                    className="text-xs font-mono py-2 px-4 border-slate-700 disabled:opacity-30 text-slate-300"
                  >
                    ← Previous
                  </Button>

                  <div className="flex items-center gap-3">
                    {currentIdx < EXAM_QUESTIONS.length - 1 ? (
                      <Button
                        variant="primary"
                        onClick={() => setCurrentIdx((p) => p + 1)}
                        className="text-xs font-mono uppercase tracking-wider py-2 px-5"
                      >
                        Next Question →
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (confirm('Are you ready to submit your exam answers for scoring?')) {
                            setIsSubmitted(true);
                          }
                        }}
                        className="text-xs font-mono uppercase tracking-wider py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white"
                      >
                        Submit Final Assessment ✓
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* RESULTS DASHBOARD */}
          {isSubmitted && scoreData && (
            <div className="space-y-8 animate-fade-in">
              {/* Scorecard Hero */}
              <Card
                variant="bordered"
                className={`p-8 md:p-10 text-center space-y-6 bg-[#0F1116] ${
                  scoreData.passed ? 'border-emerald-500/50' : 'border-red-500/50'
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold ${
                    scoreData.passed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}
                >
                  {scoreData.passed ? '✓' : '✗'}
                </div>

                <div className="space-y-2">
                  <span
                    className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded font-bold ${
                      scoreData.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {scoreData.passed ? 'ASSESSMENT PASSED · BENCHMARK ACHIEVED' : 'PASS BENCHMARK NOT MET'}
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    You Scored {scoreData.correct} out of {scoreData.total} ({scoreData.percentage}%)
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-xl mx-auto">
                    {scoreData.passed
                      ? 'Exceptional mastery of statutory ADR architecture under the India Mediation Act 2023. You have met the institutional competence threshold.'
                      : 'Review the statutory citations and explanations below to strengthen your understanding before retaking the assessment.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setUserAnswers({});
                      setFlaggedQuestions({});
                      setTimeLeft(900);
                      setIsSubmitted(false);
                      setExamStarted(true);
                      setCurrentIdx(0);
                    }}
                    className="text-xs font-mono uppercase tracking-wider py-2.5 px-5"
                  >
                    Retake Mock Exam ↺
                  </Button>

                  <Link href="/app/certificates">
                    <Button
                      variant="outline"
                      className="text-xs font-mono uppercase tracking-wider py-2.5 px-5 border-slate-700 text-slate-300"
                    >
                      View Medar Certificates →
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Comprehensive Statutory Question-by-Question Review */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white">
                    Detailed Statutory Audit & Explanations
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    10 Questions Audited
                  </span>
                </div>

                <div className="space-y-4">
                  {EXAM_QUESTIONS.map((q, idx) => {
                    const chosen = userAnswers[q.id];
                    const isCorrect = chosen === q.correctAnswer;

                    return (
                      <Card
                        key={q.id}
                        variant="default"
                        className={`p-6 bg-[#0F1116] border transition-colors space-y-4 ${
                          isCorrect ? 'border-emerald-900/40' : 'border-red-900/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                  isCorrect
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                                }`}
                              >
                                {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                              </span>
                              <span className="text-xs font-mono text-slate-400">
                                Question {idx + 1} · {q.category}
                              </span>
                            </div>
                            <h4 className="text-sm font-serif font-bold text-white pt-1">
                              {q.scenario}
                            </h4>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono text-[#E5C158] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-1 rounded">
                              {q.sectionRef}
                            </span>
                          </div>
                        </div>

                        {/* Options summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                            <span className="text-slate-500">Your Selection: </span>
                            <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                              {chosen ? `Option ${chosen}` : 'Unanswered'}
                            </span>
                          </div>

                          <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                            <span className="text-slate-500">Statutory Correct: </span>
                            <span className="text-emerald-400 font-bold">
                              Option {q.correctAnswer}
                            </span>
                          </div>
                        </div>

                        {/* Rationale explanation */}
                        <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded space-y-1">
                          <div className="text-[10px] font-mono uppercase text-[#C49B38] font-semibold">
                            Statutory Ground & Citation Rationale
                          </div>
                          <p className="text-xs font-mono text-slate-300 leading-relaxed">
                            {q.statutoryExplanation}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
