'use client';

import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@medar/ui';
import { getCourses, CourseItem, CourseModule } from '../../../lib/coursesData';

export default function MyEnrollmentsPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [selectedMaterialsModule, setSelectedMaterialsModule] = useState<CourseModule | null>(null);
  const [activeLessonModule, setActiveLessonModule] = useState<CourseModule | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  useEffect(() => {
    const loaded = getCourses();
    setCourses(loaded);
  }, []);

  const currentCourse = courses[selectedCourseIndex] || courses[0];

  const handleOpenMaterials = (m: CourseModule) => {
    setSelectedMaterialsModule(m);
  };

  const handleStartLesson = (m: CourseModule) => {
    setActiveLessonModule(m);
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
  };

  const handleSelectOption = (index: number) => {
    if (showAnswerFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowAnswerFeedback(true);
  };

  if (!currentCourse) {
    return <div className="p-8 text-white">Loading Enrolled Courses...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">MY ENROLLMENTS</Badge>
            <span className="text-xs text-amber-400 font-mono">{currentCourse.cohort}</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Course Modules & Learning Syllabus</h1>
          <p className="text-xs text-slate-400 font-mono">{currentCourse.courseName} ({currentCourse.duration})</p>
        </div>

        <div className="text-right">
          <div className="text-xs font-mono text-slate-400">Course Progress</div>
          <div className="text-xl font-serif font-bold text-amber-400">{currentCourse.progressPercent}% Complete</div>
        </div>
      </div>

      {/* Course Switcher (Links all 4 Courses) */}
      <div className="flex flex-wrap gap-2 pb-2">
        {courses.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseIndex(idx)}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-sm transition-all cursor-pointer ${
              selectedCourseIndex === idx
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {c.courseName}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {currentCourse.modules.map((m) => (
          <Card 
            key={m.id || m.num} 
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
                <Badge variant={m.status === 'COMPLETED' ? 'success' : m.status === 'IN_PROGRESS' ? 'gold' : 'outline'}>
                  {m.status === 'COMPLETED' ? 'COMPLETED' : m.status === 'IN_PROGRESS' ? 'IN PROGRESS (65%)' : 'PUBLISHED'}
                </Badge>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOpenMaterials(m)}
                    className="text-xs py-2 px-4 border-slate-700 hover:border-amber-500 text-slate-200"
                  >
                    📖 Review Materials ({m.readings.length})
                  </Button>

                  {(m.status === 'IN_PROGRESS' || m.currentLesson) && (
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
                <p className="text-xs font-mono text-slate-400 mt-1">Uploaded notes, statutory references, and masterclass streams</p>
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
                <span>📚</span> Required Reading & Study Notes ({selectedMaterialsModule.readings.length})
              </h3>

              {selectedMaterialsModule.readings.length === 0 ? (
                <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400">
                  No additional documents uploaded for this module yet.
                </div>
              ) : (
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
              )}
            </div>

            {/* Recorded Lectures Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <span>🎥</span> Lecture Archives & Faculty Masterclasses ({selectedMaterialsModule.lectures.length})
              </h3>

              {selectedMaterialsModule.lectures.length === 0 ? (
                <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400">
                  Live lecture stream will be posted before the scheduled session.
                </div>
              ) : (
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
              )}
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
