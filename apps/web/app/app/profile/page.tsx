'use client';

import * as React from 'react';
import { Card, Badge, Button } from '@medar/ui';

export default function ProfilePage() {
  const [saved, setSaved] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@lawchambers.in',
    phone: '+91 98110 44231',
    barNumber: 'D/1842/2012',
    jurisdiction: 'India (Delhi High Court)',
    primaryLanguage: 'English, Hindi',
    bio: 'Commercial dispute resolution advocate with 12 years of practice in corporate contracts, arbitration, and commercial mediation.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="gold">USER PROFILE</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Profile & Account Settings</h1>
        <p className="text-xs text-slate-400 font-mono">Manage your personal credentials, contact info, and legal accreditations</p>
      </div>

      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-sm flex items-center justify-between">
          <span>✓ Profile settings updated successfully.</span>
        </div>
      )}

      {/* Profile Form Card */}
      <Card variant="bordered" className="p-8 bg-slate-900/90 border-slate-800 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Bar Council Registration No.</label>
              <input
                type="text"
                value={formData.barNumber}
                onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Primary Jurisdiction</label>
              <input
                type="text"
                value={formData.jurisdiction}
                onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Professional Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-sm text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              Account Status: <span className="text-emerald-400 font-semibold">Active Member</span>
            </div>
            
            <Button
              variant="primary"
              type="submit"
              className="text-xs uppercase tracking-wider py-2.5 px-6"
            >
              Save Profile Changes →
            </Button>
          </div>

        </form>
      </Card>

      {/* Active Badges Card */}
      <Card variant="default" className="p-6 space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Verified Accreditations & Badges</div>
        <div className="flex flex-wrap gap-3">
          <Badge variant="gold">IMI ALIGNED CURRICULUM</Badge>
          <Badge variant="navy">INDIA MEDIATION ACT 2023 COMPLIANT</Badge>
          <Badge variant="success">FOUNDATION PROGRAM (COHORT 1)</Badge>
        </div>
      </Card>
    </div>
  );
}
