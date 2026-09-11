'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const navItems = [
    {
      label: 'Overview Metrics',
      href: '/admin/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      )
    },
    {
      label: 'Empanelment Queue',
      href: '/admin/empanelments',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-16.5-.52c-1.01.143-2.01.317-3 .52m19.5 0v6.75a3 3 0 01-3 3h-1.5a3 3 0 01-3-3V5.49m-9 0v6.75a3 3 0 01-3 3H3a3 3 0 01-3-3V5.49" />
        </svg>
      )
    },
    {
      label: 'User Directory',
      href: '/admin/users',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      label: 'Financial Transactions',
      href: '/admin/payments',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0F1116] border-r border-slate-800/80 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-[#C49B38] transition-colors">
                Medar
              </span>
            </Link>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C49B38] border border-[#C49B38]/30 px-2 py-0.5 rounded-sm">
              ADMIN
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold px-3 pb-2">
              ADMINISTRATION
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-mono transition-all ${
                      active
                        ? 'bg-[#C49B38]/15 text-[#E5C158] border-l-2 border-[#C49B38] font-semibold pl-3'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <span className={active ? 'text-[#C49B38]' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <div className="space-y-1">
            <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Security Clearance</div>
            <div className="text-xs font-mono text-[#E5C158]">Super Administrator</div>
            <div className="text-[10px] font-mono text-emerald-400">● RBAC Verified</div>
          </div>
          
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left text-xs font-mono text-red-400/90 hover:text-red-300 transition-colors pt-1"
            >
              Exit Console
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#07080A]">
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-[#0F1116]/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              Institutional Back-Office Administration
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-wider bg-[#C49B38]/10 border border-[#C49B38]/30 text-[#C49B38] px-2.5 py-1 rounded-sm">
              SUPER ADMIN
            </span>
            <span className="text-xs font-mono text-slate-300">Executive Board</span>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
