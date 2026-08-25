import { Card, Badge } from '@medar/ui';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="navy">PLATFORM METRICS</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Back-Office Executive Dashboard</h1>
        <p className="text-xs text-slate-400 font-mono">Real-time Platform Revenue, User Registrations & Panel Queue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-amber-500/30 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Gross Platform Revenue</div>
          <div className="text-3xl font-serif font-bold text-amber-400">₹14,85,000</div>
          <div className="text-[10px] text-emerald-400 font-mono">+24% this month</div>
        </Card>

        <Card variant="default" className="p-6 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Total Platform Users</div>
          <div className="text-3xl font-serif font-bold text-white">1,248</div>
          <div className="text-[10px] text-slate-500 font-mono">Active Student & Advocate Accounts</div>
        </Card>

        <Card variant="default" className="p-6 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Pending Empanelments</div>
          <div className="text-3xl font-serif font-bold text-amber-500">14</div>
          <div className="text-[10px] text-amber-400 font-mono">Requires Board Review</div>
        </Card>

        <Card variant="default" className="p-6 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Active Program Cohorts</div>
          <div className="text-3xl font-serif font-bold text-emerald-400">4</div>
          <div className="text-[10px] text-slate-500 font-mono">30 Seats Capacity Limit</div>
        </Card>
      </div>
    </div>
  );
}
