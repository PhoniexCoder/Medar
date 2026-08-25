'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="bg-[#F8F6F0] text-[#0B0C0E] pt-14 pb-20 border-b border-[#E8E4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Hero Header */}
        <motion.div
          className="space-y-4 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-[11px] font-mono tracking-widest text-[#B8933E] uppercase font-semibold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#B8933E]/60 inline-block animate-ping" />
            MEDIATION · ADR · CONFLICT RESOLUTION · ASIA
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#0B0C0E] tracking-tight leading-[1.08]"
          >
            The place where <br />
            <motion.span
              className="italic inline-block"
              whileHover={{ scale: 1.03, color: '#A67E28' }}
              transition={{ duration: 0.2 }}
            >
              conflict
            </motion.span>{' '}
            becomes <br />
            <motion.span
              className="text-[#C49B38] inline-block font-semibold"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              resolution.
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Tri-Panel 3-Column Showcase Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#E8E4D8] items-stretch"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          
          {/* Panel 1: What We Do (Light) */}
          <motion.div
            className="p-8 sm:p-10 flex flex-col justify-between space-y-8 md:border-r border-b md:border-b-0 border-[#E8E4D8] bg-[#FAF8F2] hover:bg-[#F3EFE4] transition-colors duration-300 group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold group-hover:text-[#B8933E] transition-colors">
                WHAT WE DO
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                Certify. Connect. Prepare. Empower. The complete professional ecosystem for mediation in India, UAE, and Singapore.
              </p>
            </div>

            <div>
              <Link
                href="/programs"
                className="text-xs font-mono font-semibold tracking-wider text-[#0B0C0E] group-hover:text-[#B8933E] underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                Explore the platform <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </motion.div>

          {/* Panel 2: Cohort 1 Enrollment (Inverted Solid Black Card) */}
          <motion.div
            className="bg-[#0B0C0E] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden group cursor-pointer"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C49B38]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="space-y-4 relative z-10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38] font-semibold flex items-center justify-between">
                <span>NOW ENROLLING</span>
                <span className="border border-[#C49B38]/40 px-2 py-0.5 rounded text-[8px]">COHORT 1</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-serif leading-snug">
                Certificate in Mediation — Foundation Program. India&apos;s first IMI-aligned cohort-based certification.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
                <div className="group-hover:scale-105 transition-transform">
                  <div className="text-sm font-serif font-bold text-[#C49B38]">40h</div>
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">DURATION</div>
                </div>
                <div className="group-hover:scale-105 transition-transform">
                  <div className="text-sm font-serif font-bold text-[#C49B38]">30</div>
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">SEATS</div>
                </div>
                <div className="group-hover:scale-105 transition-transform">
                  <div className="text-sm font-serif font-bold text-[#C49B38]">IMI</div>
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">ALIGNED</div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <Link
                href="/programs/foundation-cohort-1"
                className="text-xs font-mono font-semibold tracking-wider text-[#C49B38] group-hover:text-white underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                Reserve your seat <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </motion.div>

          {/* Panel 3: Why Now (Light) */}
          <motion.div
            className="p-8 sm:p-10 flex flex-col justify-between space-y-8 md:border-l border-[#E8E4D8] bg-[#FAF8F2] hover:bg-[#F3EFE4] transition-colors duration-300 group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold group-hover:text-[#B8933E] transition-colors">
                WHY NOW
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                India&apos;s Mediation Act 2023 mandates pre-litigation mediation. The demand for certified practitioners has never been greater.
              </p>
            </div>

            <div>
              <Link
                href="/knowledge/india-mediation-act-2023-analysis"
                className="text-xs font-mono font-semibold tracking-wider text-[#0B0C0E] group-hover:text-[#B8933E] underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                Read the brief <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
