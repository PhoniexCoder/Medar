'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@medar/ui';

interface CertificateData {
  id: string;
  title: string;
  recipientName: string;
  issueDate: string;
  accreditation: string;
  credentialId: string;
  verificationUrl: string;
  status: 'VERIFIED' | 'IN_PROGRESS';
  grade: string;
}

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const certificates: CertificateData[] = [
    {
      id: 'cert-1',
      title: 'Certificate in Mediation — Foundation Program',
      recipientName: 'Priya Sharma',
      issueDate: 'August 20, 2026',
      accreditation: 'India Mediation Act 2023 & SIMC Aligned',
      credentialId: 'MEDAR-CERT-2026-88910',
      verificationUrl: 'https://medar.in/verify/MEDAR-CERT-2026-88910',
      status: 'VERIFIED',
      grade: 'Distinction (94%)'
    },
    {
      id: 'cert-2',
      title: 'Advanced Commercial & Cross-Border Dispute Practitioner',
      recipientName: 'Priya Sharma',
      issueDate: 'Scheduled: Oct 2026',
      accreditation: 'CEDR & Singapore Convention Standards',
      credentialId: 'MEDAR-CERT-PENDING',
      verificationUrl: 'https://medar.in/verify/pending',
      status: 'IN_PROGRESS',
      grade: 'Module 3 of 5 (65% Complete)'
    }
  ];

  const handleDownloadPDF = (cert: CertificateData) => {
    setIsDownloading(true);
    
    // Create a dedicated print/PDF document in an iframe or popup window
    const printWindow = window.open('', '_blank', 'width=1000,height=750');
    if (!printWindow) {
      alert('Please allow popups to download your certificate.');
      setIsDownloading(false);
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cert.title} - ${cert.recipientName}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 0;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Georgia', serif;
            background: #fdfbf7;
            color: #0b0c0e;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 40px;
          }
          .certificate-container {
            width: 920px;
            height: 640px;
            padding: 40px;
            background: #ffffff;
            border: 12px double #c49b38;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
          }
          .corner-ornament {
            position: absolute;
            width: 30px;
            height: 30px;
            border: 3px solid #c49b38;
          }
          .top-left { top: 10px; left: 10px; border-right: none; border-bottom: none; }
          .top-right { top: 10px; right: 10px; border-left: none; border-bottom: none; }
          .bottom-left { bottom: 10px; left: 10px; border-right: none; border-top: none; }
          .bottom-right { bottom: 10px; right: 10px; border-left: none; border-top: none; }
          
          .header-brand {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: 6px;
            color: #0b0c0e;
            text-transform: uppercase;
          }
          .header-sub {
            font-size: 11px;
            letter-spacing: 3px;
            color: #8c7335;
            text-transform: uppercase;
            margin-top: 4px;
            font-family: sans-serif;
          }
          .title {
            font-size: 16px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #555;
            margin-top: 15px;
            font-style: italic;
          }
          .recipient {
            font-size: 38px;
            font-weight: 700;
            color: #111;
            margin: 15px 0 10px 0;
            border-bottom: 2px solid #e5d8b8;
            display: inline-block;
            padding: 0 40px 8px 40px;
          }
          .statement {
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            max-width: 650px;
            margin: 0 auto;
          }
          .program-name {
            font-size: 22px;
            font-weight: 700;
            color: #c49b38;
            margin: 8px 0;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 20px;
            border-top: 1px solid #f0e6d2;
          }
          .seal-box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .seal {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            background: linear-gradient(135deg, #dfb75c, #946e1c);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(196,155,56,0.3);
            border: 2px dashed #fff;
          }
          .signature-box {
            text-align: center;
            width: 200px;
          }
          .sig-line {
            border-top: 1px solid #333;
            margin-top: 30px;
            padding-top: 5px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            font-family: sans-serif;
          }
          .sig-title {
            font-size: 9px;
            color: #666;
            font-family: sans-serif;
          }
          .meta-box {
            font-size: 9px;
            font-family: monospace;
            color: #777;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="corner-ornament top-left"></div>
          <div class="corner-ornament top-right"></div>
          <div class="corner-ornament bottom-left"></div>
          <div class="corner-ornament bottom-right"></div>

          <div>
            <div class="header-brand">MEDAR INSTITUTE</div>
            <div class="header-sub">Alternative Dispute Resolution & Mediation Council</div>
            <div class="title">This is to certify that</div>
            <div class="recipient">${cert.recipientName}</div>
            <p class="statement">has successfully fulfilled all statutory curriculum requirements, rigorous assessments, and simulated hearing examinations for the credential of</p>
            <div class="program-name">${cert.title}</div>
            <p class="statement" style="font-size: 12px; color: #666;">Accreditation: ${cert.accreditation} | Result: ${cert.grade}</p>
          </div>

          <div class="footer">
            <div class="meta-box">
              <div><strong>CREDENTIAL ID:</strong> ${cert.credentialId}</div>
              <div><strong>ISSUE DATE:</strong> ${cert.issueDate}</div>
              <div><strong>VERIFICATION:</strong> ${cert.verificationUrl}</div>
            </div>

            <div class="seal-box">
              <div class="seal">MEDAR<br/>VERIFIED</div>
            </div>

            <div class="signature-box">
              <div class="sig-line">Dr. A. S. Nariman</div>
              <div class="sig-title">Director of Academic Affairs</div>
            </div>

            <div class="signature-box">
              <div class="sig-line">Justice R. V. Raveendran</div>
              <div class="sig-title">Chair, Accreditation Council</div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setIsDownloading(false);
  };

  const handleShareLinkedIn = (cert: CertificateData) => {
    const linkedInUrl = new URL('https://www.linkedin.com/profile/add');
    linkedInUrl.searchParams.set('startTask', 'CERTIFICATION_NAME');
    linkedInUrl.searchParams.set('name', cert.title);
    linkedInUrl.searchParams.set('organizationName', 'Medar Institute of Alternative Dispute Resolution');
    linkedInUrl.searchParams.set('issueYear', '2026');
    linkedInUrl.searchParams.set('issueMonth', '8');
    linkedInUrl.searchParams.set('certId', cert.credentialId);
    linkedInUrl.searchParams.set('certUrl', cert.verificationUrl);
    window.open(linkedInUrl.toString(), '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">DIGITAL CERTIFICATES</Badge>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Registry Synced
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Issued Qualifications & Badges</h1>
          <p className="text-xs text-slate-400 font-mono">Official credentials verified on the Medar National & International ADR Registry</p>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="space-y-6">
        {certificates.map((cert) => (
          <Card 
            key={cert.id} 
            variant="bordered" 
            className={`p-8 space-y-6 transition-all ${
              cert.status === 'VERIFIED' 
                ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-500/70 shadow-lg shadow-amber-950/20' 
                : 'bg-slate-900/40 border-slate-800 opacity-75'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={cert.status === 'VERIFIED' ? 'gold' : 'outline'}>
                    {cert.status === 'VERIFIED' ? 'CREDENTIAL ISSUED' : 'IN PROGRESS'}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">Score: {cert.grade}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white mt-2">
                  {cert.title}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Credential ID: <span className="text-amber-400 font-bold">{cert.credentialId}</span></p>
              </div>

              <div className="flex items-center gap-3">
                {cert.status === 'VERIFIED' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    VERIFIED & ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-800/40">
                    ⏳ 65% PROGRESS
                  </span>
                )}
              </div>
            </div>

            {/* Credential Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Issued To</span>
                <span className="text-slate-200 font-bold">{cert.recipientName}</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Issue Date</span>
                <span className="text-slate-200 font-bold">{cert.issueDate}</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Accreditation</span>
                <span className="text-slate-200 font-bold truncate block">{cert.accreditation}</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase">Verification URL</span>
                <span className="text-amber-400 font-bold truncate block">{cert.verificationUrl}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {cert.status === 'VERIFIED' && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button 
                  variant="primary" 
                  onClick={() => handleDownloadPDF(cert)}
                  disabled={isDownloading}
                  className="text-xs uppercase tracking-wider py-2.5 px-6 font-bold flex items-center gap-2 shadow-lg shadow-amber-900/30"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {isDownloading ? 'Generating...' : 'Download PDF Certificate →'}
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs uppercase tracking-wider py-2.5 px-5 border-slate-700 text-slate-300 hover:text-white"
                >
                  👁️ Fullscreen Preview
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => handleShareLinkedIn(cert)}
                  className="text-xs uppercase tracking-wider py-2.5 px-5 border-blue-800/60 text-blue-400 hover:bg-blue-950/40 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  Add to LinkedIn
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Fullscreen Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-white rounded-lg p-8 text-black shadow-2xl border-4 border-[#c49b38]">
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black font-mono text-sm px-2 py-1 bg-slate-100 rounded"
            >
              ✕ Close
            </button>

            <div className="text-center space-y-4 py-6 border-8 double border-[#c49b38]/40 p-8">
              <div className="text-xs font-mono font-bold tracking-widest text-[#8c7335] uppercase">
                MEDAR INSTITUTE OF ALTERNATIVE DISPUTE RESOLUTION
              </div>
              <h2 className="text-xl font-serif text-slate-600 italic">Certificate of Qualification</h2>
              <div className="text-3xl font-serif font-bold text-slate-900 border-b-2 border-[#e5d8b8] inline-block px-8 pb-2">
                {selectedCert.recipientName}
              </div>
              <p className="text-sm text-slate-700 max-w-lg mx-auto">
                Has fulfilled all academic criteria, statutory examinations, and simulated practical mediation hearings for the credential:
              </p>
              <div className="text-2xl font-serif font-bold text-[#c49b38]">
                {selectedCert.title}
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Credential ID: {selectedCert.credentialId} • Issued: {selectedCert.issueDate}
              </p>

              <div className="pt-8 flex items-center justify-between border-t border-slate-200 mt-6 text-xs text-slate-600">
                <div className="text-left font-mono text-[10px]">
                  <div>REGISTRY: Medar ADR Index</div>
                  <div>SECURITY: SHA-256 Verified</div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#dfb75c] to-[#946e1c] text-white flex items-center justify-center font-bold text-[9px] text-center border-2 border-dashed border-white shadow">
                  MEDAR<br/>SEAL
                </div>
                <div className="text-right">
                  <div className="font-bold">Accreditation Council</div>
                  <div className="text-[10px] text-slate-400">Board of Examiners</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedCert(null)} className="text-xs text-slate-700">
                Close
              </Button>
              <Button variant="primary" onClick={() => handleDownloadPDF(selectedCert)} className="text-xs">
                Download / Print PDF →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
