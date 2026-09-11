'use client';

import * as React from 'react';
import { Card, Badge, Button } from '@medar/ui';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  joinedDate: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserItem[]>([
    {
      id: 'usr-1',
      name: 'Priya Sharma',
      email: 'priya.sharma@lawchambers.in',
      role: 'STUDENT',
      status: 'ACTIVE',
      joinedDate: 'Aug 14, 2026'
    },
    {
      id: 'usr-2',
      name: 'Tariq Al-Mansoor',
      email: 'tariq@difc-adr.ae',
      role: 'MEDIATOR',
      status: 'ACTIVE',
      joinedDate: 'Aug 18, 2026'
    },
    {
      id: 'usr-3',
      name: 'Adv. Rajesh Kulkarni',
      email: 'rajesh@mumbaibar.org',
      role: 'CASE_MANAGER',
      status: 'ACTIVE',
      joinedDate: 'Aug 21, 2026'
    },
    {
      id: 'usr-4',
      name: 'Ananya Deshmukh',
      email: 'ananya@commercialadr.in',
      role: 'FINANCE_ADMIN',
      status: 'ACTIVE',
      joinedDate: 'Aug 22, 2026'
    },
    {
      id: 'usr-5',
      name: 'Suresh Menon',
      email: 'suresh.menon@corplegal.com',
      role: 'CORPORATE_ADMIN',
      status: 'ACTIVE',
      joinedDate: 'Aug 24, 2026'
    },
    {
      id: 'usr-6',
      name: 'Executive Board',
      email: 'admin@medar.org',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      joinedDate: 'Aug 01, 2026'
    }
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('ALL');
  const [notification, setNotification] = React.useState<string | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    name: '',
    email: '',
    role: 'STUDENT',
    status: 'ACTIVE' as const
  });

  const availableRoles = [
    'SUPER_ADMIN',
    'ADMIN',
    'FINANCE_ADMIN',
    'CASE_MANAGER',
    'MEDIATOR_VERIFICATION_OFFICER',
    'PROGRAM_MANAGER',
    'CONTENT_EDITOR',
    'MEDIATOR',
    'PRACTITIONER',
    'STUDENT',
    'CORPORATE_ADMIN',
    'COMMUNITY_MEMBER'
  ];

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          setNotification(`Updated ${u.name}'s role to ${newRole}`);
          setTimeout(() => setNotification(null), 3500);
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleStatusChange = (userId: string, newStatus: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION') => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          setNotification(`Updated ${u.name}'s status to ${newStatus}`);
          setTimeout(() => setNotification(null), 3500);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created: UserItem = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      joinedDate: 'Just now'
    };

    setUsers([created, ...users]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'STUDENT', status: 'ACTIVE' });
    setNotification(`Successfully created user ${created.name} as ${created.role}`);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49B38] bg-[#C49B38]/10 border border-[#C49B38]/30 px-2 py-0.5 rounded-sm">
              BACK-OFFICE RBAC
            </span>
            <span className="text-[10px] font-mono text-slate-400">Total Users: {users.length}</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">User Access & Role Management</h1>
          <p className="text-xs text-slate-400 font-mono">
            Assign platform roles, modify RBAC clearances, and manage account statuses
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="text-xs uppercase tracking-wider py-2.5 px-5 bg-[#C49B38] hover:bg-[#B38C2E] text-[#0B0C0E] font-bold font-mono"
        >
          + Add New User / Role
        </Button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#C49B38]/15 border border-[#C49B38]/40 text-[#E5C158] text-xs p-3.5 rounded-sm flex items-center justify-between font-mono animate-fadeIn">
          <span>✓ {notification}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#12141C] p-4 rounded-sm border border-slate-800">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B38] font-mono"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-[#090A0D] border border-slate-800 rounded-sm text-xs text-white focus:outline-none focus:border-[#C49B38] font-mono"
          >
            <option value="ALL">All Roles ({users.length})</option>
            {availableRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Directory Table */}
      <Card variant="bordered" className="p-6 bg-[#12141C] border-slate-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="pb-3 px-3">User & Contact</th>
              <th className="pb-3 px-3">Assigned System Role</th>
              <th className="pb-3 px-3">Account Status</th>
              <th className="pb-3 px-3 text-right">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-3">
                  <div className="font-semibold text-white font-serif text-sm">{u.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{u.email}</div>
                </td>

                {/* Interactive Role Dropdown */}
                <td className="py-4 px-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="px-2.5 py-1.5 bg-[#090A0D] border border-slate-700 hover:border-[#C49B38] rounded-sm text-xs font-mono text-[#E5C158] font-semibold focus:outline-none focus:border-[#C49B38] cursor-pointer"
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role} className="bg-slate-900 text-white">
                        {role}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Interactive Status Dropdown */}
                <td className="py-4 px-3">
                  <select
                    value={u.status}
                    onChange={(e) => handleStatusChange(u.id, e.target.value as any)}
                    className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold focus:outline-none cursor-pointer border ${
                      u.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : u.status === 'SUSPENDED'
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    }`}
                  >
                    <option value="ACTIVE" className="bg-slate-900 text-emerald-400">ACTIVE</option>
                    <option value="SUSPENDED" className="bg-slate-900 text-red-400">SUSPENDED</option>
                    <option value="PENDING_VERIFICATION" className="bg-slate-900 text-amber-400">PENDING_VERIFICATION</option>
                  </select>
                </td>

                <td className="py-4 px-3 text-right text-slate-400 text-[11px]">
                  {u.joinedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No users match the selected query or filter.
          </div>
        )}
      </Card>

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card variant="bordered" className="max-w-md w-full p-8 bg-[#12141C] border-slate-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">Create New User Account</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 uppercase text-[10px] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adv. Meera Nair"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-white focus:outline-none focus:border-[#C49B38]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="meera@chambers.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-white focus:outline-none focus:border-[#C49B38]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase text-[10px] mb-1">System Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-slate-800 rounded-sm text-[#E5C158] font-bold focus:outline-none focus:border-[#C49B38]"
                >
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-3">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 text-[10px] uppercase tracking-wider py-2.5 justify-center"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex-1 text-[10px] uppercase tracking-wider py-2.5 justify-center bg-[#C49B38] text-[#0B0C0E] font-bold"
                >
                  Save & Provision →
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
