import { Card, Badge } from '@medar/ui';

export default function AdminUsersPage() {
  const users = [
    { id: 'usr-1', name: 'Priya Sharma', email: 'priya@lawfirm.com', role: 'STUDENT / ADVOCATE', status: 'ACTIVE' },
    { id: 'usr-2', name: 'Tariq Al-Mansoor', email: 'tariq@difc-law.ae', role: 'MEDIATOR', status: 'ACTIVE' },
    { id: 'usr-3', name: 'Rajesh Kulkarni', email: 'rajesh@adrchambers.in', role: 'INSTRUCTOR', status: 'ACTIVE' },
    { id: 'usr-4', name: 'System Admin', email: 'admin@medar.org', role: 'SUPER_ADMIN', status: 'ACTIVE' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="navy">USER MANAGEMENT</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Registered Platform Users</h1>
        <p className="text-xs text-slate-400 font-mono">Manage User Access Credentials & System Roles</p>
      </div>

      <Card variant="default" className="p-6">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase">
              <th className="pb-3">User Name</th>
              <th className="pb-3">Email Address</th>
              <th className="pb-3">System Role</th>
              <th className="pb-3 text-right">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="py-3.5 font-semibold text-white font-serif text-sm">{u.name}</td>
                <td className="py-3.5 text-slate-400">{u.email}</td>
                <td className="py-3.5"><Badge variant="gold">{u.role}</Badge></td>
                <td className="py-3.5 text-right"><span className="text-emerald-400">✓ {u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
