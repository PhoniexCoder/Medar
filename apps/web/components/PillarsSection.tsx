'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Academia & Test Preparation',
      tags: ['CERTIFICATES', 'TEST PREP', 'PLACEMENTS'],
      desc: 'Foundation to Advanced Practitioner certificates, plus the only structured test prep for India, UAE, Singapore and UK mediation qualifications.',
      href: '/programs'
    },
    {
      num: '02',
      title: 'Community & Events',
      tags: ['MEMBERSHIP', 'SUMMIT', 'THOUGHT LEADERSHIP'],
      desc: 'Gated professional community, earned through assessment. Annual summit, regional masterclasses, and the definitive knowledge hub for ADR in Asia.',
      href: '/community'
    },
    {
      num: '03',
      title: 'Dispute Resolution Marketplace',
      tags: ['FIND A MEDIATOR', 'CASE FILING', 'EMPANELMENT'],
      desc: 'The trust infrastructure that connects clients with verified, credentialed mediators. File a case, find a practitioner, or join the panel.',
      href: '/mediators'
    },
    {
      num: '04',
      title: 'Corporate B2B',
      tags: ['TRAINING', 'RETAINER', 'WHITE-LABEL'],
      desc: 'In-house training for legal and HR teams. Retainer partnerships. White-label certification for law firms navigating the post-Mediation Act landscape.',
      href: '/corporates'
    }
  ];

  return (
    <section className="py-24 bg-[#F8F6F0] text-[#0B0C0E] border-b border-[#E8E4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:col-span-6 space-y-2">
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#0B0C0E] leading-tight">
              Four pillars. <br />
              <span className="italic text-[#C49B38]">One platform.</span> <br />
              One profession.
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-lg">
              Medar is not a course provider. It is the complete professional infrastructure — from first certification to empanelled mediator to corporate resolution partner.
            </p>
          </div>
        </motion.div>

        {/* 4 Wide Stacked Horizontal Rows */}
        <div className="border-t border-[#E8E4D8] divide-y divide-[#E8E4D8]">
          {pillars.map((p, index) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            >
              <Link
                href={p.href}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-[#F3EFE4] transition-all duration-300 px-4 -mx-4 rounded-sm block"
              >
                {/* Left Title & Tags */}
                <div className="md:col-span-6 space-y-3 flex items-start gap-5">
                  <span className="text-xs font-mono text-slate-400 mt-1 group-hover:text-[#B8933E] transition-colors">
                    {p.num}
                  </span>
                  
                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-serif font-semibold text-[#0B0C0E] group-hover:text-[#B8933E] transition-colors">
                      {p.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <motion.span
                          key={t}
                          className="text-[9px] font-mono uppercase tracking-wider bg-[#EDE7D5] border border-[#E0D8C3] text-[#7C6633] px-2 py-0.5 rounded-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Description */}
                <div className="md:col-span-5">
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed group-hover:text-slate-900 transition-colors">
                    {p.desc}
                  </p>
                </div>

                {/* Right Arrow */}
                <div className="md:col-span-1 text-right text-slate-400 group-hover:text-[#0B0C0E] group-hover:translate-x-2 transition-all duration-300 text-lg">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
