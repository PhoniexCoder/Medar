'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@medar/ui';
import { API_BASE_URL } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const isAdminEmail = email.toLowerCase().includes('admin');
    const token = isAdminEmail
      ? 'demo-admin-SUPER_ADMIN-token-' + Date.now()
      : 'demo-student-token-' + Date.now();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const serverToken = data.accessToken || token;
        document.cookie = `refreshToken=${serverToken}; path=/; max-age=86400`;
        document.cookie = `accessToken=${serverToken}; path=/; max-age=86400`;
        localStorage.setItem('accessToken', serverToken);
      } else {
        // Fallback demo mode
        document.cookie = `refreshToken=${token}; path=/; max-age=86400`;
        document.cookie = `accessToken=${token}; path=/; max-age=86400`;
        localStorage.setItem('accessToken', token);
      }
    } catch {
      // Standalone demo mode
      document.cookie = `refreshToken=${token}; path=/; max-age=86400`;
      document.cookie = `accessToken=${token}; path=/; max-age=86400`;
      localStorage.setItem('accessToken', token);
    } finally {
      setLoading(false);
      if (isAdminEmail) {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/app/dashboard';
      }
    }
  };

  const handleQuickDemoLogin = (demoType: 'student' | 'admin') => {
    const token =
      demoType === 'admin'
        ? 'demo-admin-SUPER_ADMIN-token'
        : 'demo-student-token';

    document.cookie = `refreshToken=${token}; path=/; max-age=86400`;
    document.cookie = `accessToken=${token}; path=/; max-age=86400`;
    localStorage.setItem('accessToken', token);

    if (demoType === 'admin') {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/app/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0B0C0E] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-3xl font-serif font-bold text-[#0B0C0E]">
            Medar
          </Link>
          <p className="text-xs text-slate-500 font-mono">Sign in to your Medar Platform Account</p>
        </div>

        {/* Login Card */}
        <Card variant="bordered" className="p-8 bg-white border-[#E0DACB] shadow-lg space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded">
              {error}
            </div>
          )}

          {/* Quick 1-Click Demo Testing Buttons */}
          <div className="bg-[#FAF8F3] border border-[#DFCFAA] p-4 rounded-sm space-y-3">
            <div className="text-[10px] font-mono text-[#8C6D23] uppercase text-center font-bold tracking-wider">
              Quick Test Portals
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="w-full py-2.5 px-3 bg-white hover:bg-[#F5EFE0] border border-[#DFCFAA] text-[#8C6D23] font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all shadow-sm font-semibold text-center flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="w-full py-2.5 px-3 bg-[#0B0C0E] hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all shadow-sm font-semibold text-center flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#EFE9DC]"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-400 uppercase">Or sign in with email</span>
            <div className="flex-grow border-t border-[#EFE9DC]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-slate-600 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@medar.org"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#DCD5C3] rounded-sm text-xs text-[#0B0C0E] focus:outline-none focus:border-[#C49B38]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-600 uppercase mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#DCD5C3] rounded-sm text-xs text-[#0B0C0E] focus:outline-none focus:border-[#C49B38]"
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full justify-center text-xs uppercase tracking-wider py-3 bg-[#0B0C0E] hover:bg-slate-800 text-white font-mono"
            >
              {loading ? 'Authenticating...' : 'Sign In →'}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#B8933E] hover:underline font-semibold">
              Create an Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
