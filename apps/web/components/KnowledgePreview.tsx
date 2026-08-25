'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const KnowledgePreview: React.FC = () => {
  const articles = [
    {
      title: 'What the Mediation Act means for every corporate legal team in India',
      category: 'INDIA MEDIATION ACT 2023',
      readTime: 'Analysis · 8 min read',
      excerpt: 'Pre-litigation mediation is now mandatory. Here is what changes, what it costs if you ignore it, and how to prepare your team.',
      slug: 'india-mediation-act-2023-analysis'
    },
    {
      title: 'How to qualify as a mediator in the UAE — a complete guide',
      category: 'JURISDICTION GUIDE',
      readTime: 'Guide · 6 min read',
      excerpt: 'Step-by-step breakdown of DIFC Court accreditation, Dubai Courts ADR panel requirements, and international reciprocity.',
      slug: 'difc-adgm-cross-border-mediation'
    },
    {
      title: 'From lawyer to mediator: the career path no one tells you about',
      category: 'CAREER',
      readTime: 'Career · 5 min read',
      excerpt: 'Strategic insights on transitioning from litigation practice to institutional mediation appointments across commercial jurisdictions.',
      slug: 'building-commercial-mediation-practice'
    }
  ];

  return (
    <section className="py-24 bg-[#EFECE4] text-[#0B0C0E] border-b border-[#E0DACB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal text-[#0B0C0E] leading-tight">
              From the <br />
              <span className="italic text-[#C49B38]">Knowledge Hub</span>
            </h2>
          </div>

          <div>
            <Link
              href="/knowledge"
              className="text-xs font-mono font-semibold tracking-wider text-[#0B0C0E] hover:text-[#B8933E] underline underline-offset-4 transition-colors inline-flex items-center gap-1 group"
            >
              All articles <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>

        {/* 3 White Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={art.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/knowledge/${art.slug}`}
                className="bg-white border border-[#E0DACB] rounded-sm p-8 flex flex-col justify-between space-y-6 hover:border-[#C49B38] transition-all group shadow-sm h-full block"
              >
                <div className="space-y-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#B8933E] font-semibold">
                    {art.category}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#0B0C0E] group-hover:text-[#B8933E] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-400 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span>{art.readTime}</span>
                  <span className="text-[#B8933E] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
