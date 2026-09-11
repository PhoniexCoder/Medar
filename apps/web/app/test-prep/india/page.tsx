import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function IndiaTestPrepPage() {
  const modules = [
    {
      num: '01',
      title: 'Pre-Litigation Mediation & Statutory Scope',
      sections: 'Sections 5, 6, 7 & Schedule I',
      desc: 'Mandatory commercial pre-litigation protocols, non-submittable disputes (criminal, third-party rights, taxation), and voluntary commercial opt-ins.',
      questions: '25 Questions in Bar Pool'
    },
    {
      num: '02',
      title: 'Mediated Settlement Agreement (MSA) & Enforcement',
      sections: 'Sections 27, 28 & 29',
      desc: 'Formulation, authentication by neutral, registration procedures, and legal equivalence to a civil court decree. Grounds for challenge under fraud/impersonation.',
      questions: '30 Questions in Bar Pool'
    },
    {
      num: '03',
      title: 'Confidentiality, Privilege & Neutral Immunity',
      sections: 'Sections 22, 23, 24 & 26',
      desc: 'Absolute evidentiary confidentiality, non-admissibility in subsequent judicial proceedings, conflict of interest disclosures, and mediator statutory immunity.',
      questions: '25 Questions in Bar Pool'
    },
    {
      num: '04',
      title: 'Statutory Timelines, Interim Relief & Institutional Rules',
      sections: 'Sections 8, 18, 19 & 40',
      desc: '120-day standard timeline (+ 60-day extension), seeking urgent interim orders before commercial courts without extinguishing mediation mandate.',
      questions: '20 Questions in Bar Pool'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/test-prep" className="text-[#E5C158] hover:underline">
              ← Back to Test Prep Pathways
            </Link>
            <span>/</span>
            <span className="text-slate-500">India Mediation Act 2023 Bar Exam</span>
          </div>

          {/* Hero Header */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">OFFICIAL STATUTORY PREP</Badge>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                ● 2026 BAR SYLLABUS ALIGNED
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              India Mediation Act 2023 <br />
              <span className="text-[#E5C158] italic">Bar Council & IIAM Assessment Prep</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Master the statutory architecture of the India Mediation Act 2023. Interactive practice exams, section-by-section analysis, and pedagogical feedback for Indian advocates and neutrals.
            </p>
          </div>

          {/* Exam Spec Callout Card */}
          <Card variant="bordered" className="p-6 md:p-8 bg-[#0F1116] border-[#C49B38]/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38]">
                  SIMULATOR BENCHMARK
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">
                  10-Question Timed Statutory Mock Exam
                </h2>
                <p className="text-xs font-mono text-slate-400 max-w-xl">
                  Test your grasp of pre-litigation mandates, settlement enforceability, interim court orders, and confidentiality rules under real exam conditions.
                </p>
              </div>

              <div className="shrink-0">
                <Link href="/test-prep/india/exam">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider py-3.5 px-6 shadow-xl shadow-[#C49B38]/20"
                  >
                    Start Timed Mock Exam Simulator →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 font-mono text-center">
              <div className="bg-slate-950 p-3 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Simulator Questions</div>
                <div className="text-base font-bold text-white mt-0.5">10 Scenarios</div>
              </div>
              <div className="bg-slate-950 p-3 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Allocated Time</div>
                <div className="text-base font-bold text-[#E5C158] mt-0.5">15 Minutes</div>
              </div>
              <div className="bg-slate-950 p-3 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Passing Score</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">70% (7/10)</div>
              </div>
              <div className="bg-slate-950 p-3 rounded">
                <div className="text-[10px] text-slate-500 uppercase">Scoring & Citations</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">Instant AI Audit</div>
              </div>
            </div>
          </Card>

          {/* Syllabus Modules */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-white">
                Exam Syllabus Breakdown
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Four statutory modules mandated by the Mediation Council of India (MCI).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((m) => (
                <Card
                  key={m.num}
                  variant="default"
                  className="p-6 bg-[#0F1116] border-slate-800/90 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl font-serif font-bold text-[#C49B38]/50 font-mono">
                      {m.num}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {m.questions}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{m.title}</h3>
                    <p className="text-xs font-mono text-[#E5C158] mt-0.5">{m.sections}</p>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
