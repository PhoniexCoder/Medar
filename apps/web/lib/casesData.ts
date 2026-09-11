export interface DisputeCase {
  id: string;
  caseNumber: string;
  title: string;
  claimantName: string;
  claimantEmail: string;
  respondentName: string;
  respondentEmail: string;
  jurisdiction: 'India' | 'UAE' | 'Singapore' | 'UK';
  category: 'Commercial Contract' | 'Shareholder Deadlock' | 'IP & Tech' | 'Real Estate' | 'Employment' | 'Family & Estate';
  claimAmount: string;
  status: 'INTAKE_REVIEW' | 'NEUTRAL_ASSIGNED' | 'JOINT_SESSION_SCHEDULED' | 'MSA_DRAFTED' | 'RESOLVED';
  filingDate: string;
  assignedMediator?: {
    name: string;
    title: string;
    email: string;
  };
  disputeSummary: string;
  documents: { name: string; size: string; uploadDate: string }[];
  nextHearingDate?: string;
  statutorySuitabilityScore: number;
}

export const INITIAL_CASES: DisputeCase[] = [
  {
    id: 'case-101',
    caseNumber: 'MEDAR-CASE-2026-0842',
    title: 'TechVentures Ltd. vs Alpha Logistics Corp.',
    claimantName: 'Vikramaditya Rao (MD, TechVentures)',
    claimantEmail: 'vikram@techventures.io',
    respondentName: 'Sunil Nair (Director, Alpha Logistics)',
    respondentEmail: 'sunil.nair@alphalogistics.com',
    jurisdiction: 'India',
    category: 'Commercial Contract',
    claimAmount: '₹1,85,00,000',
    status: 'JOINT_SESSION_SCHEDULED',
    filingDate: 'Aug 14, 2026',
    assignedMediator: {
      name: 'Adv. Priya Sharma',
      title: 'Senior Commercial Mediator (IMI)',
      email: 'priya.sharma@medar.org'
    },
    disputeSummary: 'Breach of cloud software supply SLA and disputed liquidated damages penalty following server migration downtime in Q2 2026.',
    documents: [
      { name: 'Master_Services_Agreement_2024.pdf', size: '2.4 MB', uploadDate: 'Aug 14, 2026' },
      { name: 'Claimant_Notice_of_Dispute.pdf', size: '1.1 MB', uploadDate: 'Aug 15, 2026' }
    ],
    nextHearingDate: 'Sat, Sep 19 at 11:00 AM IST (Virtual Chamber 2)',
    statutorySuitabilityScore: 94
  },
  {
    id: 'case-102',
    caseNumber: 'MEDAR-CASE-2026-0915',
    title: 'Apex Global Trade vs Emirates Maritime Holdings',
    claimantName: 'Karan Mehra (Legal Counsel, Apex Global)',
    claimantEmail: 'karan@apexglobal.ae',
    respondentName: 'Rashid Al-Futtaim (Emirates Maritime)',
    respondentEmail: 'rashid@emiratesmaritime.ae',
    jurisdiction: 'UAE',
    category: 'Commercial Contract',
    claimAmount: '$450,000 USD',
    status: 'NEUTRAL_ASSIGNED',
    filingDate: 'Aug 28, 2026',
    assignedMediator: {
      name: 'Tariq Al-Mansoor',
      title: 'DIFC Certified Master Mediator',
      email: 'tariq.mansoor@medar.org'
    },
    disputeSummary: 'Demurrage and cargo delivery timeline conflict under maritime charter party agreement.',
    documents: [
      { name: 'Charter_Party_Contract_Clause12.pdf', size: '3.6 MB', uploadDate: 'Aug 28, 2026' }
    ],
    nextHearingDate: 'Tue, Sep 22 at 2:30 PM GST',
    statutorySuitabilityScore: 91
  },
  {
    id: 'case-103',
    caseNumber: 'MEDAR-CASE-2026-0978',
    title: 'BioGenix Labs Co-Founders Deadlock',
    claimantName: 'Dr. Ananya Sen (Co-Founder & CTO)',
    claimantEmail: 'ananya@biogenix.in',
    respondentName: 'Rohan Deshmukh (Co-Founder & CEO)',
    respondentEmail: 'rohan@biogenix.in',
    jurisdiction: 'India',
    category: 'Shareholder Deadlock',
    claimAmount: '₹4,20,00,000',
    status: 'INTAKE_REVIEW',
    filingDate: 'Sep 02, 2026',
    disputeSummary: 'Deadlock between equal 50-50 shareholders regarding Series A dilution and intellectual property licensing valuation.',
    documents: [
      { name: 'Founders_Agreement_2023.pdf', size: '1.8 MB', uploadDate: 'Sep 02, 2026' }
    ],
    statutorySuitabilityScore: 96
  }
];

const STORAGE_KEY = 'medar_dispute_cases_v1';

export function getDisputeCases(): DisputeCase[] {
  if (typeof window === 'undefined') return INITIAL_CASES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return INITIAL_CASES;
}

export function saveDisputeCases(cases: DisputeCase[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch {
    // ignore
  }
}

export function createDisputeCase(newCase: Omit<DisputeCase, 'id' | 'caseNumber' | 'filingDate'>): DisputeCase {
  const cases = getDisputeCases();
  const caseId = `case-${Date.now()}`;
  const caseNum = `MEDAR-CASE-2026-0${Math.floor(100 + Math.random() * 900)}`;
  
  const created: DisputeCase = {
    ...newCase,
    id: caseId,
    caseNumber: caseNum,
    filingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const updated = [created, ...cases];
  saveDisputeCases(updated);
  return created;
}

export function updateCaseStatus(caseId: string, status: DisputeCase['status'], nextHearingDate?: string): DisputeCase[] {
  const cases = getDisputeCases();
  const updated = cases.map((c) => {
    if (c.id === caseId) {
      return {
        ...c,
        status,
        ...(nextHearingDate ? { nextHearingDate } : {})
      };
    }
    return c;
  });
  saveDisputeCases(updated);
  return updated;
}

export function assignMediatorToCase(
  caseId: string,
  mediator: { name: string; title: string; email: string },
  hearingDate?: string
): DisputeCase[] {
  const cases = getDisputeCases();
  const updated = cases.map((c) => {
    if (c.id === caseId) {
      return {
        ...c,
        assignedMediator: mediator,
        status: 'NEUTRAL_ASSIGNED' as const,
        ...(hearingDate ? { nextHearingDate: hearingDate } : {})
      };
    }
    return c;
  });
  saveDisputeCases(updated);
  return updated;
}

export function deleteDisputeCase(caseId: string): DisputeCase[] {
  const cases = getDisputeCases();
  const updated = cases.filter((c) => c.id !== caseId);
  saveDisputeCases(updated);
  return updated;
}
