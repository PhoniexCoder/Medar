'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const AiEcosystemSection: React.FC = () => {
  const subBrands = [
    {
      name: 'MEDAR ACADEMIA',
      tagline: 'Professional university-style mediator certification & IMI-aligned test prep',
      link: '/programs',
      badge: 'ACADEMIA'
    },
    {
      name: 'MEDAR RESOLVE',
      tagline: 'On-demand commercial mediator marketplace & institutional case intake',
      link: '/mediators',
      badge: 'MARKETPLACE'
    },
    {
      name: 'MEDAR INSIGHT',
      tagline: 'Thought leadership, daily case law tracking & ADR research subscriptions',
      link: '/knowledge',
      badge: 'RESEARCH'
    },
    {
      name: 'MEDAR CONNECT',
      tagline: 'Gated professional community hosting flagship summits for 2,000+ practitioners',
      link: '/community',
      badge: 'COMMUNITY'
    }
  ];

  return (
    <section className="py-24 bg-[#090A0E] text-white border-b border-slate-900 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C49B38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Top Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] font-mono tracking-widest text-[#C49B38] uppercase font-bold">
            INTEGRATED BRAND ARCHITECTURE
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
            The Future of the <br />
            <span className="italic text-[#C49B38]">Mediation Ecosystem.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            A unified dual-focus system combining elite professional academia, verified dispute resolution marketplace, global community summits, and an AI-integrated diagnostic layer.
          </p>
        </motion.div>

        {/* 4 Sub-Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subBrands.map((sb, idx) => (
            <motion.div
              key={sb.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={sb.link}
                className="p-6 rounded-sm bg-[#12141C]/70 border border-slate-800/80 hover:border-[#C49B38]/50 transition-all flex flex-col justify-between h-full space-y-6 group"
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#C49B38] font-bold border border-[#C49B38]/30 px-2 py-0.5 rounded-sm">
                    {sb.badge}
                  </span>
                  
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C49B38] transition-colors">
                    {sb.name}
                  </h3>

                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {sb.tagline}
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>Explore Sub-Brand</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The AI-Integrated Layer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#12141C] via-[#1A1813] to-[#12141C] border border-[#C49B38]/40 p-8 sm:p-12 rounded-sm relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C49B38] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2.5 py-1 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-[#C49B38] animate-pulse" />
                THE AI-INTEGRATED LAYER
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                AI for Conflict Diagnosis, Mediator Matching & Settlement Drafting
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                The first major ADR platform to combine statutory compliance algorithms with neural diagnostic matching — predicting mediation success rates, calculating litigation cost savings, and drafting preliminary settlement term sheets.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link href="/app/ai-diagnosis">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 bg-[#C49B38] hover:bg-[#B38C2E] text-[#0B0C0E] font-bold text-xs uppercase font-mono tracking-wider rounded-sm transition-all shadow-lg shadow-[#C49B38]/20 text-center"
                >
                  Launch AI Diagnosis Studio →
                </motion.button>
              </Link>

              <Link href="/knowledge/india-mediation-act-2023-analysis">
                <button className="w-full py-3.5 px-6 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs uppercase font-mono tracking-wider rounded-sm transition-all text-center">
                  Read Technical Paper
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 3-Phase Global Expansion Timeline */}
        <div className="border-t border-slate-800 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-[#C49B38] uppercase font-bold">PHASE 1 · INDIA (ACTIVE)</div>
            <h4 className="text-base font-serif font-bold text-white">Mediation Act 2023 Rollout</h4>
            <p className="text-xs text-slate-400 font-light">Mandatory commercial pre-litigation certification, institutional mediator empanelment, and nationwide B2B legal training.</p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">PHASE 2 · WEST ASIA / UAE</div>
            <h4 className="text-base font-serif font-bold text-white">DIFC & ADGM Expansion</h4>
            <p className="text-xs text-slate-400 font-light">Dubai Courts ADR accreditation, cross-border commercial maritime and joint venture dispute panels.</p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">PHASE 3 · GLOBAL PRESENCE</div>
            <h4 className="text-base font-serif font-bold text-white">Singapore SIMI & UK CMC</h4>
            <p className="text-xs text-slate-400 font-light">International reciprocity, Singapore Convention enforcement, and global ADR summit summits.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
