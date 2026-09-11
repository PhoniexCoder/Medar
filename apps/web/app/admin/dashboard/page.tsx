'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@medar/ui';

export default function AdminDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<'6M' | '1Y' | 'ALL'>('6M');
  const [hoveredMonth, setHoveredMonth] = React.useState<number | null>(5);

  const monthlyRevenue = [
    { month: 'Apr', amount: 240000, label: '₹2.40L', students: 84 },
    { month: 'May', amount: 480000, label: '₹4.80L', students: 162 },
    { month: 'Jun', amount: 720000, label: '₹7.20L', students: 245 },
    { month: 'Jul', amount: 960000, label: '₹9.60L', students: 390 },
    { month: 'Aug', amount: 1220000, label: '₹12.20L', students: 780 },
    { month: 'Sep', amount: 1485000, label: '₹14.85L', students: 1248 }
  ];

  const maxRevenue = 1600000;

  const subBrandBreakdown = [
    { name: 'Medar Academia', revenue: '₹7,72,200', pct: 52, color: '#C49B38', desc: 'Cohort 1 + Test Prep' },
    { name: 'Medar Resolve', revenue: '₹4,15,800', pct: 28, color: '#4ADE80', desc: 'Dispute Commissions' },
    { name: 'Medar Connect', revenue: '₹1,78,200', pct: 12, color: '#60A5FA', desc: 'Earned Memberships' },
    { name: 'Corporate B2B', revenue: '₹1,18,800', pct: 8, color: '#F472B6', desc: 'Training Retainers' }
  ];

  const recentEvents = [
    { time: '12m ago', title: 'New Cohort 1 Enrollment', desc: 'Adv. Meera Nair completed ₹45,000 tuition checkout', type: 'revenue' },
    { time: '42m ago', title: 'Empanelment Application Submitted', desc: 'Tariq Al-Mansoor (DIFC Bar) applied for commercial panel', type: 'queue' },
    { time: '2h ago', title: 'AI Dispute Diagnosis Completed', desc: 'TechCorp India ran ₹2.5 Cr commercial contract diagnosis', type: 'ai' },
    { time: '5h ago', title: 'Full Member Subscription', desc: 'Adv. Rajesh Kulkarni renewed Annual Full Membership (₹15,000)', type: 'revenue' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-0.5 rounded-sm">
              EXECUTIVE TELEMETRY
            </span>
            <span className="text-[10px] font-mono text-emerald-400">● Live Platform Analytics</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Back-Office Executive Overview</h1>
          <p className="text-xs text-slate-400 font-mono">
            Platform revenue velocity, student acquisition trajectory, and dispute resolution metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/empanelments">
            <Button variant="secondary" className="text-xs font-mono uppercase tracking-wider py-2.5 px-4">
              Review Queue (14) →
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="primary" className="text-xs font-mono uppercase tracking-wider py-2.5 px-4 bg-[#C49B38] hover:bg-[#B38C2E] text-[#0B0C0E] font-bold">
              User Directory →
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="bordered" className="p-6 bg-[#12141C] border-[#C49B38]/30 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-sm">+24.8% MoM</span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#E5C158]">₹14,85,000</div>
          <div className="text-[10px] text-slate-400 font-mono">Total Collected · 18% GST Accounted</div>
        </Card>

        <Card variant="bordered" className="p-6 bg-[#12141C] border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Platform Users</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-sm">+182 this wk</span>
          </div>
          <div className="text-3xl font-serif font-bold text-white">1,248</div>
          <div className="text-[10px] text-slate-400 font-mono">Students, Advocates & Corporates</div>
        </Card>

        <Card variant="bordered" className="p-6 bg-[#12141C] border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Pending Review</span>
            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-sm">Action Needed</span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#C49B38]">14</div>
          <div className="text-[10px] text-slate-400 font-mono">Mediator Empanelment Applications</div>
        </Card>

        <Card variant="bordered" className="p-6 bg-[#12141C] border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Active Cohorts</span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-sm">Cap: 30 / batch</span>
          </div>
          <div className="text-3xl font-serif font-bold text-white">4</div>
          <div className="text-[10px] text-emerald-400 font-mono">Cohort 1 (93% Full · 28/30)</div>
        </Card>
      </div>

      {/* Main Visual Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Revenue Growth Interactive Bar/Area Chart */}
        <Card variant="bordered" className="lg:col-span-8 p-8 bg-[#12141C] border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38]">
                MONTHLY FINANCIAL VELOCITY
              </div>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                Gross Revenue & Candidate Intake Growth
              </h3>
            </div>

            <div className="flex items-center gap-1 bg-[#090A0D] p-1 rounded-sm border border-slate-800 text-[10px] font-mono">
              {(['6M', '1Y', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTimeframe(t)}
                  className={`px-3 py-1 rounded-sm transition-colors ${
                    selectedTimeframe === t
                      ? 'bg-[#C49B38] text-[#0B0C0E] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Visual Bar & Line Graph */}
          <div className="space-y-4 pt-4">
            <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2 px-2 border-b border-slate-800 relative">
              
              {/* Horizontal Grid Guide Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-mono text-slate-600">
                <div className="border-b border-slate-800/40 w-full flex justify-between"><span>₹16.0L</span></div>
                <div className="border-b border-slate-800/40 w-full flex justify-between"><span>₹12.0L</span></div>
                <div className="border-b border-slate-800/40 w-full flex justify-between"><span>₹8.0L</span></div>
                <div className="border-b border-slate-800/40 w-full flex justify-between"><span>₹4.0L</span></div>
                <div className="w-full flex justify-between"><span>₹0</span></div>
              </div>

              {/* Bars */}
              {monthlyRevenue.map((item, idx) => {
                const heightPct = (item.amount / maxRevenue) * 100;
                const isHovered = hoveredMonth === idx;

                return (
                  <div
                    key={item.month}
                    onMouseEnter={() => setHoveredMonth(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer z-10"
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-12 bg-white text-[#0B0C0E] px-2.5 py-1 rounded-sm text-[10px] font-mono shadow-xl font-bold whitespace-nowrap z-20 animate-fadeIn">
                        {item.label} · {item.students} users
                      </div>
                    )}

                    <div
                      className={`w-full max-w-[48px] rounded-t-sm transition-all duration-500 ${
                        isHovered
                          ? 'bg-gradient-to-t from-[#B38C2E] to-[#F5D061] shadow-lg shadow-[#C49B38]/30'
                          : 'bg-gradient-to-t from-[#1C1F2B] to-[#C49B38]/60 hover:to-[#C49B38]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between px-2 text-xs font-mono text-slate-400">
              {monthlyRevenue.map((m, idx) => (
                <div
                  key={m.month}
                  className={`text-center flex-1 transition-colors ${
                    hoveredMonth === idx ? 'text-[#C49B38] font-bold' : ''
                  }`}
                >
                  {m.month}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#C49B38]" />
              <span>Razorpay Captured Orders</span>
            </div>
            <span>Average Order Value: <strong className="text-white">₹38,500</strong></span>
          </div>
        </Card>

        {/* Right 4 Cols: Revenue Breakdown by Sub-Brand */}
        <Card variant="bordered" className="lg:col-span-4 p-8 bg-[#12141C] border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38]">
              SUB-BRAND REVENUE MIX
            </div>
            <h3 className="text-xl font-serif font-bold text-white">4 Pillars Contribution</h3>
          </div>

          {/* Progress Breakdown Bars */}
          <div className="space-y-5">
            {subBrandBreakdown.map((sb) => (
              <div key={sb.name} className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="font-semibold text-white">{sb.name}</span>
                  <span className="font-bold text-[#E5C158]">{sb.revenue} ({sb.pct}%)</span>
                </div>

                <div className="w-full bg-[#090A0D] h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${sb.pct}%`, backgroundColor: sb.color }}
                  />
                </div>

                <div className="text-[10px] text-slate-500">{sb.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#090A0D] border border-slate-800 rounded-sm space-y-1 text-xs font-mono">
            <div className="text-slate-400 uppercase text-[9px]">Primary Revenue Engine:</div>
            <div className="text-emerald-400 font-bold">Medar Academia (Foundation Cohorts)</div>
          </div>
        </Card>

      </div>

      {/* Recent Telemetry Activity Stream */}
      <Card variant="bordered" className="p-8 bg-[#12141C] border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38]">
              REAL-TIME AUDIT STREAM
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Recent System Transactions & Actions</h3>
          </div>

          <span className="text-[10px] font-mono text-slate-400 uppercase">Auto-refreshed</span>
        </div>

        <div className="divide-y divide-slate-800/60 font-mono text-xs">
          {recentEvents.map((evt, i) => (
            <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/20 px-2 rounded-sm transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  evt.type === 'revenue' ? 'bg-emerald-400' : evt.type === 'ai' ? 'bg-[#C49B38]' : 'bg-blue-400'
                }`} />
                <div>
                  <div className="font-semibold text-white">{evt.title}</div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">{evt.desc}</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 sm:text-right shrink-0">
                {evt.time}
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
