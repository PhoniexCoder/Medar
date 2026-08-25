import { Card, Badge, Button } from '@medar/ui';

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="gold">DIGITAL CERTIFICATES</Badge>
        <h1 className="text-3xl font-serif font-bold text-white">Issued Qualifications & Badges</h1>
        <p className="text-xs text-slate-400 font-mono">Verified Credential Record on Medar Registry</p>
      </div>

      <Card variant="bordered" className="p-8 bg-slate-900/90 border-amber-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="gold">CREDENTIAL ISSUED</Badge>
            <h2 className="text-2xl font-serif font-bold text-white mt-2">
              Certificate in Mediation — Foundation Program
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">Credential ID: MEDAR-CERT-2026-88910</p>
          </div>
          <Badge variant="success" className="font-mono">VERIFIED</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
          <div className="bg-slate-950 p-3 rounded border border-slate-800">Issued to: Priya Sharma</div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">Issue Date: Aug 20, 2026</div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">Accreditation: IMI Aligned</div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800">Verification URL: medar.org/verify/MEDAR-CERT-2026-88910</div>
        </div>

        <div className="pt-4 flex gap-4">
          <Button variant="primary" className="text-xs uppercase tracking-wider py-2.5 px-6">
            Download PDF Certificate →
          </Button>
          <Button variant="outline" className="text-xs uppercase tracking-wider py-2.5 px-6">
            Share on LinkedIn
          </Button>
        </div>
      </Card>
    </div>
  );
}
