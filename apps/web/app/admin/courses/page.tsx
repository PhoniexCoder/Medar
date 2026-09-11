'use client';

import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@medar/ui';
import { getCourses, saveCourses, CourseItem, CourseReading, CourseLecture } from '../../../lib/coursesData';

export default function CourseContentAdminPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewModuleModalOpen, setIsNewModuleModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'reading' | 'lecture'>('reading');

  // Form states for adding notes/reading
  const [readingTitle, setReadingTitle] = useState('');
  const [readingType, setReadingType] = useState('PDF Document');
  const [readingSize, setReadingSize] = useState('2.5 MB');

  // Form states for adding lecture
  const [lectureTitle, setLectureTitle] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [lectureDuration, setLectureDuration] = useState('45 mins');
  const [videoUrl, setVideoUrl] = useState('');

  // Form states for new module
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleHours, setNewModuleHours] = useState('15 hrs');
  const [newModuleSummary, setNewModuleSummary] = useState('');

  useEffect(() => {
    const loaded = getCourses();
    setCourses(loaded);
    if (loaded.length > 0 && loaded[0].modules.length > 0) {
      setSelectedModuleId(loaded[0].modules[0].id);
    }
  }, []);

  const currentCourse = courses[selectedCourseIndex] || courses[0];
  const currentModule = currentCourse?.modules?.find(m => m.id === selectedModuleId) || currentCourse?.modules?.[0];

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readingTitle.trim() || !currentModule) return;

    const newReading: CourseReading = {
      title: readingTitle,
      type: readingType,
      size: readingSize,
      url: `/uploads/${readingTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`
    };

    const updated = [...courses];
    const course = updated[selectedCourseIndex];
    const mod = course.modules.find(m => m.id === currentModule.id);
    if (mod) {
      mod.readings.push(newReading);
    }
    setCourses(updated);
    saveCourses(updated);

    setReadingTitle('');
    setIsUploadModalOpen(false);
    alert(`Success: "${newReading.title}" uploaded and published live to ${currentCourse.courseName}!`);
  };

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureTitle.trim() || !currentModule) return;

    const newLecture: CourseLecture = {
      title: lectureTitle,
      speaker: speakerName || 'Faculty Speaker',
      duration: lectureDuration,
      videoUrl: videoUrl || 'https://vimeo.com/medar/stream'
    };

    const updated = [...courses];
    const course = updated[selectedCourseIndex];
    const mod = course.modules.find(m => m.id === currentModule.id);
    if (mod) {
      mod.lectures.push(newLecture);
    }
    setCourses(updated);
    saveCourses(updated);

    setLectureTitle('');
    setSpeakerName('');
    setVideoUrl('');
    setIsUploadModalOpen(false);
    alert(`Success: "${newLecture.title}" stream published live to ${currentCourse.courseName}!`);
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName.trim() || !currentCourse) return;

    const newNum = String(currentCourse.modules.length + 1).padStart(2, '0');
    const newMod = {
      id: `mod-${currentCourse.id}-${Date.now()}`,
      num: newNum,
      name: newModuleName,
      hours: newModuleHours,
      status: 'PUBLISHED' as const,
      summary: newModuleSummary || 'Course module curriculum & practical assessment.',
      readings: [],
      lectures: []
    };

    const updated = [...courses];
    updated[selectedCourseIndex].modules.push(newMod);
    setCourses(updated);
    saveCourses(updated);

    setSelectedModuleId(newMod.id);
    setNewModuleName('');
    setNewModuleSummary('');
    setIsNewModuleModalOpen(false);
    alert(`New Module ${newNum} created in ${currentCourse.courseName}!`);
  };

  const handleDeleteReading = (idx: number) => {
    if (!currentModule) return;
    const updated = [...courses];
    const course = updated[selectedCourseIndex];
    const mod = course.modules.find(m => m.id === currentModule.id);
    if (mod) {
      mod.readings.splice(idx, 1);
    }
    setCourses(updated);
    saveCourses(updated);
  };

  const handleDeleteLecture = (idx: number) => {
    if (!currentModule) return;
    const updated = [...courses];
    const course = updated[selectedCourseIndex];
    const mod = course.modules.find(m => m.id === currentModule.id);
    if (mod) {
      mod.lectures.splice(idx, 1);
    }
    setCourses(updated);
    saveCourses(updated);
  };

  if (!currentCourse) {
    return <div className="p-8 text-white">Loading Course Studio...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">ACADEMIC CONTENT MANAGEMENT</Badge>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              ● Synchronized with Candidate Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">Course & Lecture Studio</h1>
          <p className="text-xs text-slate-400 font-mono">Manage syllabus notes, PDFs, case precedents, and video masterclasses across all 4 Medar Programs</p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            onClick={() => {
              setUploadType('reading');
              setIsUploadModalOpen(true);
            }}
            className="text-xs uppercase tracking-wider py-2.5 px-4 font-bold flex items-center gap-1.5 shadow-md shadow-amber-900/30"
          >
            <span>+ Upload Note / PDF</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => {
              setUploadType('lecture');
              setIsUploadModalOpen(true);
            }}
            className="text-xs uppercase tracking-wider py-2.5 px-4 border-slate-700 hover:border-amber-500 text-slate-200 flex items-center gap-1.5"
          >
            <span>▶ Add Video Lecture</span>
          </Button>
        </div>
      </div>

      {/* Course Selector Tabs (All 4 Mock Courses from Catalog) */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {courses.map((course, idx) => (
          <button
            key={course.id}
            onClick={() => {
              setSelectedCourseIndex(idx);
              if (course.modules.length > 0) {
                setSelectedModuleId(course.modules[0].id);
              }
            }}
            className={`px-4 py-2 text-xs font-mono rounded-sm transition-all cursor-pointer ${
              selectedCourseIndex === idx
                ? 'bg-[#C49B38] text-black font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {course.courseName} <span className="text-[10px] opacity-80">({course.price})</span>
          </button>
        ))}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Modules Navigation */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center justify-between">
            <span>Course Modules</span>
            <button
              onClick={() => setIsNewModuleModalOpen(true)}
              className="text-amber-400 hover:underline text-xs lowercase font-mono cursor-pointer"
            >
              + add module
            </button>
          </div>

          <div className="space-y-2">
            {currentCourse.modules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-4 rounded-sm border transition-all cursor-pointer ${
                  currentModule?.id === mod.id
                    ? 'bg-slate-900 border-[#C49B38] text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-500">MODULE {mod.num}</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                    {mod.status}
                  </span>
                </div>
                <div className="text-sm font-serif font-bold text-slate-100 mt-1">{mod.name}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-2 flex items-center gap-3">
                  <span>📄 {mod.readings.length} Notes/PDFs</span>
                  <span>🎥 {mod.lectures.length} Lectures</span>
                  <span>⏱️ {mod.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Module Content Manager */}
        <div className="lg:col-span-2 space-y-6">
          {currentModule ? (
            <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-500 font-bold">MODULE {currentModule.num} CONTENT</span>
                  <h2 className="text-xl font-serif font-bold text-white mt-0.5">{currentModule.name}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">{currentModule.summary}</p>
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">Duration: {currentModule.hours}</span>
              </div>

              {/* 1. Uploaded Notes & Readings List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <span>📚</span> Notes & Study Materials ({currentModule.readings.length})
                  </h3>
                  <button
                    onClick={() => {
                      setUploadType('reading');
                      setIsUploadModalOpen(true);
                    }}
                    className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    + Add New Note
                  </button>
                </div>

                {currentModule.readings.length === 0 ? (
                  <div className="text-center p-6 bg-slate-950/40 rounded border border-dashed border-slate-800 text-xs text-slate-500">
                    No notes or reading materials uploaded yet for this module. Click "+ Add New Note" above.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentModule.readings.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📄</span>
                          <div>
                            <div className="text-sm font-semibold text-white">{r.title}</div>
                            <div className="text-[10px] font-mono text-slate-400">{r.type} • {r.size} • <span className="text-emerald-400">Live in Candidate Portal</span></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Previewing document: ${r.title}`)}
                            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleDeleteReading(i)}
                            className="px-2 py-1 text-xs font-mono text-red-400 hover:bg-red-950/40 rounded cursor-pointer"
                            title="Delete Note"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Video Lectures & Masterclasses List */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <span>🎥</span> Video Lectures & Masterclasses ({currentModule.lectures.length})
                  </h3>
                  <button
                    onClick={() => {
                      setUploadType('lecture');
                      setIsUploadModalOpen(true);
                    }}
                    className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    + Add Lecture Stream
                  </button>
                </div>

                {currentModule.lectures.length === 0 ? (
                  <div className="text-center p-6 bg-slate-950/40 rounded border border-dashed border-slate-800 text-xs text-slate-500">
                    No video lectures added yet. Click "+ Add Lecture Stream" above.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentModule.lectures.map((l, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">▶️</span>
                          <div>
                            <div className="text-sm font-semibold text-white">{l.title}</div>
                            <div className="text-[10px] font-mono text-slate-400">Speaker: {l.speaker} • Duration: {l.duration} • <span className="text-blue-400">{l.videoUrl}</span></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Playing test stream for: ${l.title}`)}
                            className="px-2.5 py-1 text-xs font-mono bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/30 rounded cursor-pointer"
                          >
                            Play
                          </button>
                          <button
                            onClick={() => handleDeleteLecture(i)}
                            className="px-2 py-1 text-xs font-mono text-red-400 hover:bg-red-950/40 rounded cursor-pointer"
                            title="Delete Lecture"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </Card>
          ) : (
            <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded">
              Select a module from the left to view and upload its syllabus.
            </div>
          )}
        </div>

      </div>

      {/* Upload Note / Lecture Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-slate-900 border border-amber-500/50 rounded-lg p-6 sm:p-8 text-white shadow-2xl space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <Badge variant="gold">
                  {uploadType === 'reading' ? 'UPLOAD STUDY MATERIAL / NOTE' : 'ADD VIDEO LECTURE STREAM'}
                </Badge>
                <h3 className="text-lg font-serif font-bold text-white mt-1">
                  {currentCourse.courseName} — Module {currentModule?.num}
                </h3>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {uploadType === 'reading' ? (
              <form onSubmit={handleAddReading} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={readingTitle}
                    onChange={(e) => setReadingTitle(e.target.value)}
                    placeholder="e.g. Model Mediation Agreement & Precedents Guide"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Material Type</label>
                    <select
                      value={readingType}
                      onChange={(e) => setReadingType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="PDF Document">PDF Document</option>
                      <option value="Legal Briefing">Legal Briefing</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Reference Sheet">Reference Sheet</option>
                      <option value="Drafting Template">Drafting Template</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">File Size</label>
                    <input
                      type="text"
                      value={readingSize}
                      onChange={(e) => setReadingSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-800 p-6 rounded text-center space-y-1 bg-slate-950/60">
                  <div className="text-2xl">📁</div>
                  <div className="text-xs text-slate-300 font-semibold">Click to select PDF or drag and drop</div>
                  <div className="text-[10px] text-slate-500 font-mono">Supports PDF, DOCX, EPUB up to 50MB</div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="text-xs">
                    Upload & Publish to Candidate Vault →
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddLecture} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Lecture Title *</label>
                  <input
                    type="text"
                    required
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    placeholder="e.g. Masterclass 2.3: Overcoming Hostility in Commercial Caucus"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Faculty / Speaker</label>
                    <input
                      type="text"
                      value={speakerName}
                      onChange={(e) => setSpeakerName(e.target.value)}
                      placeholder="Dr. A. S. Nariman"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Duration</label>
                    <input
                      type="text"
                      value={lectureDuration}
                      onChange={(e) => setLectureDuration(e.target.value)}
                      placeholder="45 mins"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Video Stream URL (Vimeo / YouTube / AWS S3) *</label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://vimeo.com/medar/stream-78901"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="text-xs">
                    Add Lecture Stream →
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Add New Module Modal */}
      {isNewModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-slate-900 border border-amber-500/50 rounded-lg p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <Badge variant="gold">CREATE NEW COURSE MODULE</Badge>
                <h3 className="text-lg font-serif font-bold text-white mt-1">
                  {currentCourse.courseName}
                </h3>
              </div>
              <button
                onClick={() => setIsNewModuleModalOpen(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Module Name *</label>
                <input
                  type="text"
                  required
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="e.g. Cross-Border Enforcement & Singapore Convention"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Estimated Hours</label>
                <input
                  type="text"
                  value={newModuleHours}
                  onChange={(e) => setNewModuleHours(e.target.value)}
                  placeholder="15 hrs"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Module Overview / Summary</label>
                <textarea
                  rows={3}
                  value={newModuleSummary}
                  onChange={(e) => setNewModuleSummary(e.target.value)}
                  placeholder="Brief summary of learning outcomes and case studies..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewModuleModalOpen(false)} className="text-xs">
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="text-xs">
                  Create Module →
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
