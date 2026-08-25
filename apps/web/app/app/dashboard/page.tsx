import Link from 'next/link';
import { Card, Badge, Button } from '@medar/ui';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="gold">STUDENT DASHBOARD</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Welcome back, Priya</h1>
        <p className="text-xs text-slate-400 font-mono">Cohort 1 · Foundation Certificate in Mediation</p>
      </div>

      {/* Active Enrollment Spotlight */}
      <Card variant="bordered" className="p-8 bg-slate-900/90 border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge variant="gold" className="font-mono">ACTIVE ENROLLMENT</Badge>
            <h2 className="text-2xl font-serif font-bold text-white mt-2">
              Certificate in Mediation — Foundation Program
            </h2>
            <p className="text-xs text-slate-400 mt-1">Cohort 1 · 40 Hours Duration · IMI Aligned Curriculum</p>
          </div>
          <Badge variant="success">IN PROGRESS (65%)</Badge>
        </div>

        {/* Module Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Course Completion Progress</span>
            <span className="text-amber-400 font-bold">26 / 40 Hours Completed</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-amber-500 h-full w-[65%]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono text-slate-300">
          <div className="bg-slate-950 p-3.5 rounded border border-slate-800">
            <span className="text-slate-500 block">Next Live Session:</span>
            <span className="text-amber-400 font-semibold">Sat, Aug 22 at 10:00 AM IST</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded border border-slate-800">
            <span className="text-slate-500 block">Assigned Mentor:</span>
            <span className="text-white font-semibold">Adv. Rajesh Kulkarni</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded border border-slate-800">
            <span className="text-slate-500 block">Final Role-play Assessment:</span>
            <span className="text-emerald-400 font-semibold">Scheduled for Sep 05</span>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Link href="/app/enrollments">
            <Button variant="primary" className="text-xs uppercase tracking-wider py-2.5 px-6">
              Continue Learning →
            </Button>
          </Link>
        </div>
      </Card>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" className="p-6 space-y-2">
          <div className="text-2xl font-serif font-bold text-white">1</div>
          <div className="text-xs font-mono text-slate-400 uppercase">Active Program Cohort</div>
        </Card>
        <Card variant="default" className="p-6 space-y-2">
          <div className="text-2xl font-serif font-bold text-amber-400">3</div>
          <div className="text-xs font-mono text-slate-400 uppercase">Assessment Modules Passed</div>
        </Card>
        <Card variant="default" className="p-6 space-y-2">
          <div className="text-2xl font-serif font-bold text-emerald-400">Pending</div>
          <div className="text-xs font-mono text-slate-400 uppercase">Associate Membership Gate</div>
        </Card>
      </div>
    </div>
  );
}
