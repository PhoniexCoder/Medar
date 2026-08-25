'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const MembershipSection: React.FC = () => {
  const tiers = [
    {
      name: 'Associate Member',
      req: 'Requires: Foundation Certificate',
      price: '₹6,000',
      period: 'per year',
      tags: ['Forums', 'Library', 'Job board', 'Event discounts']
    },
    {
      name: 'Full Member',
      req: 'Requires: Practitioner Certificate',
      price: '₹15,000',
      period: 'per year',
      tags: ['All Associate benefits', 'Mediator listing', 'Mentorship', 'Voting rights']
    },
    {
      name: 'Corporate Member',
      req: 'Requires: Corporate agreement',
      price: '₹1,00,000+',
      period: 'per year',
      tags: ['Multi-seat access', 'Priority intake', 'Reporting dashboard']
    }
  ];

  return (
    <section className="py-24 bg-[#F8F6F0] text-[#0B0C0E] border-b border-[#E8E4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4">
              <div className="text-[10px] font-mono tracking-widest text-[#B8933E] uppercase font-semibold">
                MEMBERSHIP
              </div>
              <h2 className="text-4xl sm:text-6xl font-serif font-normal text-[#0B0C0E] leading-tight">
                A community <br />
                <span className="italic">you earn</span> <br />
                the right to.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-md">
              Every Medar member has passed an assessment. That is the entire point. A community where credentials are real, practitioners are serious, and belonging means something.
            </p>

            <div className="pt-2">
              <Link href="/community/apply">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#0B0C0E] hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all shadow-md"
                >
                  Apply for membership →
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Stacked Membership Tiers */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold border-b border-[#E8E4D8] pb-3">
              MEMBERSHIP TIERS
            </div>

            <div className="divide-y divide-[#E8E4D8]">
              {tiers.map((t, idx) => (
                <motion.div
                  key={t.name}
                  className="py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-[#F3EFE4]/60 px-3 -mx-3 rounded-sm transition-colors duration-200"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#0B0C0E]">{t.name}</h3>
                      <div className="text-xs text-slate-500 italic font-serif mt-0.5">{t.req}</div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {t.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          className="text-[10px] font-mono bg-[#EFE9D9] border border-[#DFD7C4] text-[#69562A] px-2.5 py-0.5 rounded-sm cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-2xl font-serif font-bold text-[#0B0C0E]">{t.price}</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">{t.period}</div>
                  </div>

                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
