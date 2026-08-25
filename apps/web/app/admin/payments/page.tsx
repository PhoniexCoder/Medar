import { Card, Badge } from '@medar/ui';

export default function AdminPaymentsPage() {
  const payments = [
    { id: 'pay_99810', user: 'Priya Sharma', amount: '₹45,000.00', purpose: 'Cohort 1 Tuition', provider: 'RAZORPAY', date: 'Aug 20, 2026', status: 'CAPTURED' },
    { id: 'pay_99811', user: 'Rohan Mehta', amount: '₹15,000.00', purpose: 'Full Membership Fee', provider: 'RAZORPAY', date: 'Aug 19, 2026', status: 'CAPTURED' },
    { id: 'pay_99812', user: 'Khaitan & Co', amount: '₹1,50,000.00', purpose: 'Corporate Training Retainer', provider: 'BANK_WIRE', date: 'Aug 18, 2026', status: 'CAPTURED' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="navy">TRANSACTION LOGS</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Financial & Payment Audit Stream</h1>
        <p className="text-xs text-slate-400 font-mono">Itemized Payment Log, Gateway Provider IDs & Receipts</p>
      </div>

      <Card variant="default" className="p-6">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase">
              <th className="pb-3">Transaction ID</th>
              <th className="pb-3">Payer / Customer</th>
              <th className="pb-3">Purpose</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Gateway Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="py-3.5 text-amber-400 font-bold">{p.id}</td>
                <td className="py-3.5 text-white font-serif text-sm">{p.user}</td>
                <td className="py-3.5 text-slate-400">{p.purpose}</td>
                <td className="py-3.5 font-bold text-white">{p.amount}</td>
                <td className="py-3.5 text-slate-400">{p.date}</td>
                <td className="py-3.5 text-right"><Badge variant="success">{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
