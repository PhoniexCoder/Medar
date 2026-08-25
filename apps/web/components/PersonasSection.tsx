'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const PersonasSection: React.FC = () => {
  const personas = [
    {
      role: 'STUDENTS & GRADUATES',
      title: 'Law Graduates & Students',
      desc: 'Get certified before the competition does. Placement support. Internship program. A credential that means something the moment you graduate.',
      cta: 'Explore Programs →',
      link: '/programs'
    },
    {
      role: 'PRACTITIONERS',
      title: 'Practicing Lawyers',
      desc: 'Your clients need mediation. Your career requires it. Get empanelled, upskill, and be ahead of the post-Mediation Act landscape.',
      cta: 'Get Empanelled →',
      link: '/empanelment'
    },
    {
      role: 'HR & CORPORATES',
      title: 'HR & Corporate Leaders',
      desc: 'Conflict resolution is now a core leadership capability, not a soft skill. Certify your team. Retain your talent. Reduce litigation spend.',
      cta: 'Partner With Us →',
      link: '/corporates'
    }
  ];

  return (
    <section className="py-24 bg-[#0A192F] text-white border-b border-[#142C4C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-mono tracking-widest text-[#B8933E] uppercase font-semibold">
            — WHO WE SERVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-white tracking-tight leading-tight">
            Built for everyone who takes <br />
            <span className="text-[#C59B27] italic">conflict resolution seriously.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            From first-year law student to Fortune 500 general counsel — Medar provides targeted accreditation pathways tailored to your career stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((p, idx) => (
            <motion.div
              key={p.title}
              className="bg-[#0C1E36]/80 border border-[#1A385C] rounded-sm p-8 flex flex-col justify-between shadow-sm space-y-6 hover:border-[#C59B27]/50 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest block font-semibold">
                  {p.role}
                </span>

                <h3 className="text-xl font-serif font-bold text-white">{p.title}</h3>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-6 border-t border-[#162E4A]">
                <Link href={p.link} className="text-xs font-mono font-semibold tracking-wider text-[#C59B27] hover:text-white transition-colors uppercase inline-flex items-center gap-1 group">
                  {p.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
