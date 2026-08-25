'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '@medar/ui';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/app/dashboard', icon: '📊' },
    { label: 'My Enrollments', href: '/app/enrollments', icon: '🎓' },
    { label: 'Certificates', href: '/app/certificates', icon: '📜' },
    { label: 'Profile Settings', href: '/app/profile', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 border-r border-slate-800 flex flex-col justify-between p-6">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-white">
              Med<span className="text-amber-500 font-sans">ar</span>
            </span>
            <Badge variant="gold">PORTAL</Badge>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                    active
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Authenticated Session</div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs font-mono text-red-400 hover:text-red-300 py-1"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950">
          <span className="text-xs font-mono text-slate-400 uppercase">Student Portal v1.0</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300">Priya Sharma (Student)</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold font-serif flex items-center justify-center text-xs">
              PS
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
