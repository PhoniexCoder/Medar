import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <Badge variant="gold">GET IN TOUCH</Badge>
            <h1 className="text-4xl font-serif font-bold text-white">Contact Medar Platform</h1>
            <p className="text-sm text-slate-300">
              Have questions about Cohort 1 enrollment, corporate retainers, or mediator empanelment?
            </p>
          </div>

          <Card variant="bordered" className="p-8 bg-slate-900/80 max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Your Full Name</label>
              <input type="text" placeholder="Adv. Ramesh Kumar" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Email Address</label>
              <input type="email" placeholder="ramesh@lawfirm.com" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Message</label>
              <textarea rows={4} placeholder="How can we assist you?" className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500" />
            </div>

            <Button variant="primary" className="w-full justify-center text-xs uppercase tracking-wider py-3">
              Send Inquiry →
            </Button>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
