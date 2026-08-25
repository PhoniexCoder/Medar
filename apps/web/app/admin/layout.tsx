'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '@medar/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const navItems = [
    { label: 'Overview Metrics', href: '/admin/dashboard', icon: '📈' },
    { label: 'Empanelment Queue', href: '/admin/empanelments', icon: '⚖️' },
    { label: 'User Directory', href: '/admin/users', icon: '👥' },
    { label: 'Financial Transactions', href: '/admin/payments', icon: '💳' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-6">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-white">
              Med<span className="text-amber-500 font-sans">ar</span>
            </span>
            <Badge variant="navy">ADMIN</Badge>
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
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
          <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold">ADMIN PRIVILEGES ACTIVE</div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs font-mono text-red-400 hover:text-red-300 py-1"
          >
            ← Exit Admin Portal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950">
          <span className="text-xs font-mono text-slate-400 uppercase">Back-Office Administration Console</span>
          <div className="flex items-center gap-3">
            <Badge variant="gold">SYSTEM ADMIN</Badge>
            <span className="text-xs font-mono text-slate-300">Admin User (Super Admin)</span>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
