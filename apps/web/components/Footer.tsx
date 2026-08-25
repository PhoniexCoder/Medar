import * as React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0C0E] text-slate-400 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Medar
              </span>
            </Link>
            <p className="text-xs text-slate-400 font-serif italic">
              The professional home for mediation in Asia. <br />
              Built on 40 years of legal legacy.
            </p>
          </div>

          {/* Links 1: Programs */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              PROGRAMS
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/programs/foundation-cohort-1" className="hover:text-white transition-colors">Foundation Certificate</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Practitioner Certificate</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Advanced Practitioner</Link></li>
              <li><Link href="/test-prep/in" className="hover:text-white transition-colors">Test Prep — India</Link></li>
              <li><Link href="/test-prep/ae" className="hover:text-white transition-colors">Test Prep — UAE</Link></li>
            </ul>
          </div>

          {/* Links 2: Platform */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              PLATFORM
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mediators" className="hover:text-white transition-colors">Find a Mediator</Link></li>
              <li><Link href="/empanelment" className="hover:text-white transition-colors">Get Empanelled</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Links 3: Organisation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              ORGANISATION
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Medar</Link></li>
              <li><Link href="/corporates" className="hover:text-white transition-colors">For Corporates</Link></li>
              <li><Link href="/accreditation" className="hover:text-white transition-colors">Accreditation</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar in Layout B */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <div>
            © 2025 Medar · All rights reserved
          </div>

          <div className="italic text-slate-400">
            Built on 40 years of legal legacy. Positioned for the next 40.
          </div>
        </div>
      </div>
    </footer>
  );
};
