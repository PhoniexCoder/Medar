'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const JurisdictionGrid: React.FC = () => {
  const jurisdictions = [
    {
      flag: '🇮🇳',
      country: 'India',
      details: 'IIAM Mediator Certification · Bar Council Assessment · MCPC Compliance',
      action: 'ENROLLING NOW',
      code: 'in',
      active: true,
      href: '/programs/foundation-cohort-1'
    },
    {
      flag: '🇦🇪',
      country: 'UAE',
      details: 'DIFC Mediator Qualification · Dubai Courts ADR · ICAS Accreditation',
      action: 'YEAR 2 — JOIN WAITLIST',
      code: 'ae',
      active: false,
      href: '/test-prep/ae/waitlist'
    },
    {
      flag: '🇸🇬',
      country: 'Singapore',
      details: 'SIMI Accredited Mediator · Singapore Mediation Centre',
      action: 'YEAR 2 — JOIN WAITLIST',
      code: 'sg',
      active: false,
      href: '/test-prep/sg/waitlist'
    },
    {
      flag: '🇬🇧',
      country: 'United Kingdom',
      details: 'Civil Mediation Council (CMC) · SRA CPD Qualifying',
      action: 'YEAR 3 — JOIN WAITLIST',
      code: 'uk',
      active: false,
      href: '/test-prep/uk/waitlist'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0C0E] text-white border-b border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-6xl font-serif font-normal text-white tracking-tight leading-tight">
              <span className="italic text-[#C49B38]">Anywhere</span> you choose.
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-lg">
              The platform that prepares you for every major ADR assessment — structured, outcome-driven, expert-coached.
            </p>
          </div>
        </motion.div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-800">
          {jurisdictions.map((j, idx) => (
            <motion.div
              key={j.code}
              className="space-y-6 flex flex-col justify-between p-5 rounded-sm bg-[#121317]/50 border border-slate-800/60 hover:border-[#C49B38]/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {j.flag}
                </motion.div>
                <h3 className="text-xl font-serif font-bold text-white">{j.country}</h3>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {j.details}
                </p>
              </div>

              <div className="pt-4">
                <Link href={j.href} className="block w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2.5 px-3 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all text-center ${
                      j.active
                        ? 'bg-[#B8933E] hover:bg-[#A58232] text-[#0B0C0E] font-bold shadow-md shadow-[#B8933E]/20'
                        : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {j.action}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
