'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Programs', href: '/programs' },
    { label: 'Test Prep', href: '/test-prep' },
    { label: 'Community', href: '/community' },
    { label: 'Corporates', href: '/corporates' },
    { label: 'Knowledge', href: '/knowledge' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E8E4D8] text-[#0B0C0E]">
      {/* Top Brand & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#0B0C0E]">
              Medar
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-[#DCD6C5]">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              PROFESSIONAL HOME FOR MEDIATION IN ASIA
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-sans tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#B8933E] font-semibold'
                    : 'text-slate-600 hover:text-[#0B0C0E]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions (Sign In & Enroll) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-mono uppercase tracking-wider text-slate-700 hover:text-[#0B0C0E] px-3 py-2 transition-colors font-medium hover:underline underline-offset-4"
          >
            Sign In
          </Link>
          <Link href="/programs/foundation-cohort-1">
            <button className="bg-[#0B0C0E] hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-all shadow-sm">
              Enroll — Cohort 1
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-700 hover:text-black p-2"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Ticker Sub-bar (Layout B) */}
      <div className="border-t border-[#E8E4D8] bg-[#F3F0E6]/80 text-[10px] font-mono text-slate-600 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8933E] inline-block animate-pulse" />
            <span>Cohort 1 · Now Open for Enrollment</span>
          </div>

          <div className="hidden sm:block border border-[#D5CAA8] bg-[#F7F4EB] text-[#A67E28] font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
            BUILT ON 40 YEARS OF LEGAL LEGACY
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F6F0] border-b border-[#E8E4D8] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-sans text-slate-700 hover:text-[#B8933E]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#E8E4D8] flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full border border-[#D8D2C2] bg-white text-[#0B0C0E] font-mono text-xs uppercase tracking-wider py-2.5 rounded-sm">
                Sign In
              </button>
            </Link>
            <Link href="/programs/foundation-cohort-1" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#0B0C0E] text-white font-mono text-xs uppercase tracking-wider py-2.5 rounded-sm">
                Enroll — Cohort 1
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
