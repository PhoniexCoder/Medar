'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';
import {
  getMediatorBySlug,
  createMediatorBooking,
  MediatorBooking
} from '../../../lib/mediatorsData';

export default function MediatorProfilePage() {
  const params = useParams();
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string) || 'adv-priya-sharma';

  const mediator = useMemo(() => {
    return getMediatorBySlug(rawSlug) || getMediatorBySlug('adv-priya-sharma')!;
  }, [rawSlug]);

  // Booking Form State
  const [counselName, setCounselName] = useState('');
  const [counselEmail, setCounselEmail] = useState('');
  const [counselPhone, setCounselPhone] = useState('');
  const [disputeTitle, setDisputeTitle] = useState('');
  const [disputeCategory, setDisputeCategory] = useState(mediator?.primaryDomain || 'Commercial');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM (Chamber Standard Time)');
  const [chamberType, setChamberType] = useState<'Virtual Secure Chamber' | 'In-Person Private Chamber'>('Virtual Secure Chamber');
  const [caseRef, setCaseRef] = useState('');

  // Confirmation modal
  const [bookingConfirmed, setBookingConfirmed] = useState<MediatorBooking | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselName || !counselEmail || !disputeTitle || !preferredDate) {
      alert('Please complete all required fields including preferred date.');
      return;
    }

    const newBooking = createMediatorBooking({
      mediatorSlug: mediator.slug,
      mediatorName: mediator.name,
      counselName,
      counselEmail,
      counselPhone,
      disputeTitle,
      disputeCategory,
      preferredDate,
      preferredTime,
      chamberType,
      caseRef: caseRef || undefined
    });

    setBookingConfirmed(newBooking);
  };

  if (!mediator) {
    return (
      <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 px-4 text-center">
          <h1 className="text-2xl font-serif font-bold text-white">Mediator Dossier Not Found</h1>
          <Link href="/mediators" className="mt-4 inline-block text-xs font-mono text-[#C49B38] underline">
            ← Return to Directory
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/mediators" className="text-[#E5C158] hover:underline">
              ← Back to Mediator Directory
            </Link>
            <span>/</span>
            <span className="text-slate-500">{mediator.name}</span>
          </div>

          {/* Mediator Hero Header */}
          <div className="p-8 bg-[#0F1116] border border-slate-800 rounded-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-800/80 pb-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded font-semibold">
                    ✓ VERIFIED INSTITUTIONAL NEUTRAL
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {mediator.jurisdictionDisplay}
                  </span>
                  <span className="text-xs font-mono text-[#C49B38]">
                    Bar Ref: {mediator.barNumber}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  {mediator.name}
                </h1>
                
                <p className="text-sm font-mono text-[#E5C158]">
                  {mediator.designation}
                </p>

                <p className="text-xs text-slate-400 font-mono">
                  {mediator.experience} · Base: {mediator.location}
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                <div className="w-20 h-20 rounded-full bg-[#C49B38]/15 border-2 border-[#C49B38]/40 font-serif font-bold text-[#E5C158] text-3xl flex items-center justify-center shadow-lg shadow-[#C49B38]/10">
                  {mediator.name.split(' ').pop()?.charAt(0) || 'M'}
                </div>
                <span className="text-xs font-mono text-amber-300 font-semibold">
                  ★ {mediator.rating} / 5.0 Rating
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-3 rounded border border-slate-850">
                <div className="text-[10px] text-slate-500 uppercase">Cases Resolved</div>
                <div className="text-sm font-bold text-white mt-0.5">{mediator.casesResolved} ADR Dockets</div>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-850">
                <div className="text-[10px] text-slate-500 uppercase">Success Rate</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{mediator.successRate}% Settlement</div>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-850">
                <div className="text-[10px] text-slate-500 uppercase">Chamber Fee</div>
                <div className="text-sm font-bold text-[#E5C158] mt-0.5">{mediator.hourlyRate}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-850">
                <div className="text-[10px] text-slate-500 uppercase">Chamber Type</div>
                <div className="text-sm font-bold text-slate-300 mt-0.5">{mediator.chamberType}</div>
              </div>
            </div>
          </div>

          {/* Two-Column Layout: Dossier & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Bio & Track Record */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Executive Bio */}
              <Card variant="default" className="p-6 bg-[#0F1116] border-slate-800 space-y-4">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>🏛</span>
                  <span>Executive ADR Profile</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {mediator.bio}
                </p>
              </Card>

              {/* Practice Specialties */}
              <Card variant="default" className="p-6 bg-[#0F1116] border-slate-800 space-y-4">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>⚖</span>
                  <span>Practice Focus & Dispute Specializations</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mediator.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 font-mono"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Career Highlights & Track Record */}
              <Card variant="default" className="p-6 bg-[#0F1116] border-slate-800 space-y-4">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>📜</span>
                  <span>Judicial & Institutional Track Record</span>
                </h2>
                <ul className="space-y-3 font-mono text-xs text-slate-300">
                  {mediator.detailedExperience.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#C49B38] font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Accreditations & Languages */}
              <Card variant="default" className="p-6 bg-[#0F1116] border-slate-800 space-y-4">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>🎖</span>
                  <span>Accreditations & Languages</span>
                </h2>
                
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">Institutional Accreditations:</div>
                  <div className="space-y-1.5">
                    {mediator.certifications.map((c, i) => (
                      <div key={i} className="text-xs font-mono text-[#E5C158] flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Spoken Languages:</div>
                  <div className="text-xs font-mono text-slate-200 mt-1">
                    {mediator.languages.join(' · ')}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Interactive Chamber Appointment Form */}
            <div className="space-y-6">
              <Card variant="bordered" className="p-6 bg-[#0F1116] border-[#C49B38]/40 space-y-5 sticky top-24 shadow-2xl">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38]">
                      CHAMBERS APPOINTMENT
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">● Available</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Book Mediation Chamber
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Initiate a confidential mediation appointment or pre-hearing case intake.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                      Counsel / Disputant Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adv. Rohit Verma"
                      value={counselName}
                      onChange={(e) => setCounselName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="counsel@firm.com"
                        value={counselEmail}
                        onChange={(e) => setCounselEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+91 / +971"
                        value={counselPhone}
                        onChange={(e) => setCounselPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                      Dispute Title & Parties *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nexus Tech vs CloudScale Logistics"
                      value={disputeTitle}
                      onChange={(e) => setDisputeTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                        Dispute Category
                      </label>
                      <select
                        value={disputeCategory}
                        onChange={(e) => setDisputeCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-[#C49B38]"
                      >
                        <option value="Commercial">Commercial Contract</option>
                        <option value="Shareholder">Shareholder Deadlock</option>
                        <option value="IP & Tech">IP & Tech Licensing</option>
                        <option value="Maritime">Maritime & Transport</option>
                        <option value="Banking & Real Estate">Real Estate & Banking</option>
                        <option value="Family & Estate">Family & Estate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                        Existing Case Ref
                      </label>
                      <input
                        type="text"
                        placeholder="Optional (e.g. MEDAR-0842)"
                        value={caseRef}
                        onChange={(e) => setCaseRef(e.target.value)}
                        className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                      Preferred Hearing Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-[#C49B38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">
                      Hearing Chamber Mode
                    </label>
                    <select
                      value={chamberType}
                      onChange={(e) => setChamberType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#07080A] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-[#C49B38]"
                    >
                      <option value="Virtual Secure Chamber">Virtual Video Chamber (End-to-End Encrypted)</option>
                      <option value="In-Person Private Chamber">In-Person Private Chamber (Delhi / Dubai / London)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full justify-center text-xs font-mono uppercase tracking-wider py-3 shadow-lg shadow-[#C49B38]/20"
                    >
                      Confirm Chamber Appointment →
                    </Button>
                  </div>

                  <p className="text-[10px] font-mono text-slate-500 text-center">
                    🔒 Confidentiality guaranteed under Section 22 of India Mediation Act 2023.
                  </p>
                </form>
              </Card>
            </div>

          </div>

        </div>
      </main>

      {/* Confirmation Booking Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1116] border border-[#C49B38] rounded-lg max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl text-center relative animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-[#C49B38]/20 border border-[#C49B38] text-[#E5C158] mx-auto flex items-center justify-center text-2xl font-bold">
              ✓
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                CHAMBERS APPOINTMENT CONFIRMED
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Hearing Chamber Reserved
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Booking Reference: <span className="text-[#E5C158] font-bold">{bookingConfirmed.bookingRef}</span>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-850 pb-1.5">
                <span className="text-slate-500">Appointed Neutral:</span>
                <span className="text-white font-semibold">{bookingConfirmed.mediatorName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-1.5">
                <span className="text-slate-500">Dispute Matter:</span>
                <span className="text-slate-200">{bookingConfirmed.disputeTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-1.5">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="text-[#E5C158] font-bold">{bookingConfirmed.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Chamber Protocol:</span>
                <span className="text-emerald-400">{bookingConfirmed.chamberType}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              An encrypted calendar invitation and statutory intake dossier have been dispatched to <span className="text-white">{bookingConfirmed.counselEmail}</span>.
            </p>

            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={() => setBookingConfirmed(null)}
                className="w-full justify-center text-xs font-mono uppercase tracking-wider py-2.5"
              >
                Done
              </Button>
              <Link href="/app/cases" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-center text-xs font-mono uppercase tracking-wider py-2.5 border-slate-700 text-slate-300"
                >
                  View Cases Docket →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
