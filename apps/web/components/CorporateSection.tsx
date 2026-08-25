'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export const CorporateSection: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#0A192F] text-white border-b border-[#142C4C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-mono tracking-widest text-[#B8933E] uppercase font-semibold">
              — FOR CORPORATES & LAW FIRMS
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-white tracking-tight leading-tight">
              Become <br />
              <span className="text-[#C59B27] italic">resolution-ready.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              India&apos;s Mediation Act 2023 changes the rules for every in-house legal and HR team. Medar trains your people, partners in your disputes, and keeps you ahead of the compliance curve.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-2" />
                <div>
                  <h4 className="text-sm font-semibold text-white">In-house legal & HR training</h4>
                  <p className="text-xs text-slate-400 font-light">Certified programs delivered to your team, in-person or online.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-2" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Resolution partner retainer</h4>
                  <p className="text-xs text-slate-400 font-light">Priority case intake, dedicated account manager, quarterly dispute analytics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-2" />
                <div>
                  <h4 className="text-sm font-semibold text-white">White-label certification</h4>
                  <p className="text-xs text-slate-400 font-light">Co-branded programs for law firms with bulk employee enrollment.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Lead Capture Form */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#0C1E36]/90 border border-[#1A385C] rounded-sm p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">Talk to Our B2B Team</h3>
                <p className="text-xs text-slate-400 font-light">
                  Request a corporate training brochure or discuss a resolution partnership.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#081424] border border-[#163255] rounded-sm p-6 text-center space-y-2"
                >
                  <div className="text-2xl">✓</div>
                  <h4 className="text-base font-serif font-bold text-[#C59B27]">Inquiry Received</h4>
                  <p className="text-xs text-slate-300 font-light">
                    Our Corporate Resolution Director will reach out to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">Company / Firm Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata Consultancy / Khaitan & Co"
                      className="w-full px-3.5 py-2.5 bg-[#081324] border border-[#173050] rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="counsel@company.com"
                      className="w-full px-3.5 py-2.5 bg-[#081324] border border-[#173050] rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-300 uppercase mb-1">Interest Area</label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-[#081324] border border-[#173050] rounded-sm text-xs text-white focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="training">In-House Corporate Training</option>
                      <option value="retainer">Resolution Partner Retainer</option>
                      <option value="whitelabel">White-Label Law Firm Certification</option>
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#B8933E] hover:bg-[#A58232] text-[#0A192F] font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-all shadow-md"
                  >
                    Submit Corporate Inquiry →
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
