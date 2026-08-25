import { Card, Badge, Button } from '@medar/ui';

export default function MyEnrollmentsPage() {
  const modules = [
    { num: '01', name: 'Foundations of Mediation & ADR Frameworks', hours: '10 hrs', status: 'COMPLETED' },
    { num: '02', name: 'Communication, Caucusing & Negotiation Dynamics', hours: '16 hrs', status: 'COMPLETED' },
    { num: '03', name: 'Simulated Live Mediation Role-Play Assessment', hours: '14 hrs', status: 'IN PROGRESS' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="gold">MY ENROLLMENTS</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Course Modules & Learning Syllabus</h1>
        <p className="text-xs text-slate-400 font-mono">Certificate in Mediation — Foundation Program (Cohort 1)</p>
      </div>

      <div className="space-y-4">
        {modules.map((m) => (
          <Card key={m.num} variant="default" className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-amber-500 font-bold">Module {m.num}</span>
                <span className="text-xs font-mono text-slate-400">({m.hours})</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white">{m.name}</h2>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={m.status === 'COMPLETED' ? 'success' : 'gold'}>
                {m.status}
              </Badge>
              <Button variant="outline" className="text-xs py-1.5 px-4">
                {m.status === 'COMPLETED' ? 'Review Materials' : 'Start Lesson'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
