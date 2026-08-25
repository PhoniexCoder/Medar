'use client';

import * as React from 'react';
import { Card, Badge, Button } from '@medar/ui';

export default function AdminEmpanelmentQueuePage() {
  const [applications, setApplications] = React.useState([
    {
      id: 'app-001',
      name: 'Adv. Priya Sharma',
      barNumber: 'D/1842/2012',
      jurisdiction: 'India (Delhi High Court)',
      experience: '12 Years',
      specialties: 'Corporate Contracts, IP Litigation',
      submittedAt: 'Aug 20, 2026',
      status: 'SUBMITTED'
    },
    {
      id: 'app-002',
      name: 'Tariq Al-Mansoor',
      barNumber: 'DIFC-ADR-884',
      jurisdiction: 'UAE (DIFC Courts)',
      experience: '18 Years',
      specialties: 'Maritime & Construction',
      submittedAt: 'Aug 19, 2026',
      status: 'SUBMITTED'
    }
  ]);

  const handleReview = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="navy">EMPANELMENT REVIEW QUEUE</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Practitioner Application Queue</h1>
        <p className="text-xs text-slate-400 font-mono">Review Bar Council Credentials, Training Certifications & Empanel Panelists</p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} variant="default" className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-serif font-bold text-white">{app.name}</h2>
                <Badge variant={app.status === 'APPROVED' ? 'success' : app.status === 'REJECTED' ? 'outline' : 'gold'}>
                  {app.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-400">
                <div>Bar No: <span className="text-slate-200">{app.barNumber}</span></div>
                <div>Jurisdiction: <span className="text-slate-200">{app.jurisdiction}</span></div>
                <div>Experience: <span className="text-slate-200">{app.experience}</span></div>
                <div>Submitted: <span className="text-slate-200">{app.submittedAt}</span></div>
              </div>

              <div className="text-xs text-slate-300">
                Specialties: <span className="text-amber-400">{app.specialties}</span>
              </div>
            </div>

            {app.status === 'SUBMITTED' && (
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => handleReview(app.id, 'APPROVED')}
                  className="text-xs py-2 px-4 uppercase tracking-wider"
                >
                  Approve Panelist ✓
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReview(app.id, 'REJECTED')}
                  className="text-xs py-2 px-4 uppercase tracking-wider border-red-500/30 text-red-400"
                >
                  Reject ✗
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
