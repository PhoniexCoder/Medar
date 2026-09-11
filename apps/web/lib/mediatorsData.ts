export interface MediatorProfile {
  slug: string;
  name: string;
  title: string;
  designation: string;
  jurisdiction: 'India' | 'UAE' | 'Singapore' | 'UK';
  jurisdictionDisplay: string;
  experience: string;
  specialties: string[];
  primaryDomain: 'Commercial' | 'IP & Tech' | 'Maritime' | 'Shareholder' | 'Banking & Real Estate' | 'Family & Estate';
  rating: number;
  casesResolved: number;
  successRate: number; // e.g. 92%
  hourlyRate: string;
  barNumber: string;
  certifications: string[];
  bio: string;
  detailedExperience: string[];
  languages: string[];
  location: string;
  chamberType: 'Virtual & In-Person' | 'Virtual Only' | 'In-Person London / DIFC';
  verified: boolean;
  featured: boolean;
}

export const INITIAL_MEDIATORS: MediatorProfile[] = [
  {
    slug: 'adv-priya-sharma',
    name: 'Adv. Priya Sharma',
    title: 'Senior Commercial Mediator & Arbitrator',
    designation: 'Senior Advocate (High Court of Delhi) · IMI Certified',
    jurisdiction: 'India',
    jurisdictionDisplay: 'India & DIFC UAE',
    experience: '18 Years Litigation · 8 Years ADR Practice',
    specialties: ['Corporate Disputes', 'Cross-Border Contracts', 'IP Litigation', 'SaaS Licensing'],
    primaryDomain: 'Commercial',
    rating: 4.95,
    casesResolved: 64,
    successRate: 94,
    hourlyRate: '₹25,000 / hour ($300 USD)',
    barNumber: 'D/1482/2006 (Bar Council of Delhi)',
    certifications: [
      'International Mediation Institute (IMI) Certified Neutral',
      'Medar Level-3 Master Commercial Mediator',
      'SIMI Accredited Professional'
    ],
    bio: 'Adv. Priya Sharma has presided over high-stake commercial dispute sessions exceeding ₹500 Crores in aggregate claim value. She is widely regarded as a pioneer in pre-litigation commercial mediation under the India Mediation Act 2023, with deep expertise in cross-border software agreements, tech mergers, and intellectual property deadlocks.',
    detailedExperience: [
      'Empanelled Senior Mediator for Delhi High Court Mediation and Conciliation Centre (Samadhan).',
      'Lead Neutral on 40+ cross-border joint venture dissolutions and IP copyright claims.',
      'Special advisor to legal-tech committees on algorithmic dispute assessment protocols.',
      'Guest lecturer on statutory mediation enforcement at National Law School of India University (NLSIU).'
    ],
    languages: ['English', 'Hindi', 'Punjabi'],
    location: 'New Delhi / Virtual Chambers',
    chamberType: 'Virtual & In-Person',
    verified: true,
    featured: true
  },
  {
    slug: 'tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    title: 'DIFC Certified Master Mediator & Maritime Counsel',
    designation: 'DIFC Courts Registered Neutral · Former Senior Counsel (ADGM)',
    jurisdiction: 'UAE',
    jurisdictionDisplay: 'UAE & United Kingdom',
    experience: '22 Years Commercial Maritime & Energy Law',
    specialties: ['Maritime & Transport', 'Charter Party Claims', 'Banking & Islamic Finance', 'Infrastructure'],
    primaryDomain: 'Maritime',
    rating: 4.98,
    casesResolved: 82,
    successRate: 96,
    hourlyRate: '$550 USD / hour',
    barNumber: 'DIFC-ADR-2015-092',
    certifications: [
      'DIFC Courts Accredited Dispute Resolution Neutral',
      'CIArb Fellow (Chartered Institute of Arbitrators, London)',
      'Medar Middle East Panel Chair'
    ],
    bio: 'Tariq Al-Mansoor is a prominent international neutral based in Dubai, handling complex trade, shipping demurrage, and energy infrastructure disputes across the GCC, Red Sea corridor, and Europe. Known for rigorous procedural neutrality and cross-cultural consensus facilitation.',
    detailedExperience: [
      'Over two decades navigating Gulf and English common law commercial disputes.',
      'Mediated high-value supply chain ruptures following Red Sea transit disruptions.',
      'Panel Mediator for Emirates Maritime Arbitration Centre (EMAC).',
      'Regular contributor to MEA dispute resolution journals and DIFC practice guidelines.'
    ],
    languages: ['Arabic', 'English', 'French'],
    location: 'Dubai International Financial Centre (DIFC) / London',
    chamberType: 'Virtual & In-Person',
    verified: true,
    featured: true
  },
  {
    slug: 'rajesh-kulkarni',
    name: 'Hon. Rajesh Kulkarni',
    title: 'Former High Court Registrar & Master Mediator',
    designation: 'Retd. Judicial Officer · IMI & Bar Council Accredited',
    jurisdiction: 'India',
    jurisdictionDisplay: 'India (Mumbai / Bengaluru)',
    experience: '30 Years Judicial Service · 6 Years Institutional ADR',
    specialties: ['Shareholder Deadlocks', 'Real Estate & Infrastructure', 'Family & Estate Governance', 'Banking'],
    primaryDomain: 'Shareholder',
    rating: 4.91,
    casesResolved: 110,
    successRate: 91,
    hourlyRate: '₹30,000 / hour',
    barNumber: 'MAH/582/1994 (Bar Council of Maharashtra & Goa)',
    certifications: [
      'International Mediation Institute (IMI) Accredited',
      'Supreme Court of India Trained Mediator',
      'Medar Senior Judicial Fellowship'
    ],
    bio: 'Hon. Rajesh Kulkarni served as Registrar of the Bombay High Court before dedicating his career to private institutional mediation. His judicial background provides unparalleled acumen in dissecting complex company law petitions, real estate development pacts, and family enterprise restructuring.',
    detailedExperience: [
      'Presided over 3,000+ judicial hearings during 30 years in the Indian judiciary.',
      'Achieved consensus in major real estate consortia restructuring valued over ₹1,200 Cr.',
      'Master trainer for judicial officers and advocates on interest-based negotiation techniques.',
      'Specialist in preserving long-term commercial relationships while securing legally enforceable MSAs.'
    ],
    languages: ['English', 'Marathi', 'Hindi'],
    location: 'Mumbai & Pune Chambers',
    chamberType: 'Virtual & In-Person',
    verified: true,
    featured: false
  },
  {
    slug: 'sarah-jenkins-kc',
    name: 'Sarah Jenkins KC',
    title: 'King\'s Counsel & International Commercial Mediator',
    designation: 'Commercial Silk (London) · Civil Mediation Council Registered',
    jurisdiction: 'UK',
    jurisdictionDisplay: 'United Kingdom & Singapore',
    experience: '25 Years International Commercial Bar',
    specialties: ['Fintech & Algorithmic IP', 'Insurance & Reinsurance', 'Private Equity Disputes', 'Cross-Border ADR'],
    primaryDomain: 'IP & Tech',
    rating: 4.99,
    casesResolved: 76,
    successRate: 95,
    hourlyRate: '£650 GBP / hour',
    barNumber: 'Lincoln’s Inn (London, 2000)',
    certifications: [
      'Civil Mediation Council (CMC) Registered Fellow',
      'Singapore International Mediation Centre (SIMC) Specialist Panelist',
      'Medar Europe & UK Panelist'
    ],
    bio: 'Sarah Jenkins KC is an internationally celebrated King’s Counsel with extensive practice in the Commercial Court of London and the Singapore International Commercial Court (SICC). Her practice focuses on high-tech patents, algorithmic trading infrastructure, and private equity buyout litigation.',
    detailedExperience: [
      'Appointed King’s Counsel in 2017 with distinction in international commercial law.',
      'Spearheaded mediation panels for multi-million pound international technology joint ventures.',
      'Author of "Multi-Jurisdictional Enforceability under the Singapore Convention" (Oxford Law Review).',
      'Co-drafted digital evidence mediation guidelines for UK commercial chambers.'
    ],
    languages: ['English', 'German'],
    location: 'Temple, London / Singapore Hub',
    chamberType: 'Virtual & In-Person',
    verified: true,
    featured: true
  },
  {
    slug: 'wei-zhang-sg',
    name: 'Wei Zhang',
    title: 'SIMI Certified Principal Mediator',
    designation: 'Director, Asia-Pacific Dispute Resolution Institute',
    jurisdiction: 'Singapore',
    jurisdictionDisplay: 'Singapore & Southeast Asia',
    experience: '16 Years Cross-Border Commercial ADR',
    specialties: ['Cross-Border Trade', 'Supply Chain Tech', 'Shareholder Deadlock', 'Renewable Energy'],
    primaryDomain: 'Commercial',
    rating: 4.93,
    casesResolved: 55,
    successRate: 93,
    hourlyRate: '$480 SGD / hour',
    barNumber: 'Law Society of Singapore (2008)',
    certifications: [
      'Singapore International Mediation Institute (SIMI) Certified Level 4',
      'Medar ASEAN Lead Panelist',
      'WIPO Arbitration and Mediation Center Panelist'
    ],
    bio: 'Wei Zhang is a renowned Singapore-based neutral specializing in APAC regional commerce, multilateral supply-chain agreements, and tech joint ventures under the Singapore Convention on Mediation framework.',
    detailedExperience: [
      'Principal mediator on 50+ multilateral disputes spanning Singapore, Tokyo, Hong Kong, and Bengaluru.',
      'Specialist in multi-tier dispute escalation clauses and hybrid Arb-Med-Arb frameworks.',
      'Advised regional semiconductor consortia on preventative dispute resolution protocols.'
    ],
    languages: ['English', 'Mandarin Chinese', 'Cantonese'],
    location: 'Maxwell Chambers, Singapore',
    chamberType: 'Virtual & In-Person',
    verified: true,
    featured: false
  }
];

const MEDIATORS_KEY = 'medar_mediators_v1';
const BOOKINGS_KEY = 'medar_mediator_bookings_v1';

export interface MediatorBooking {
  id: string;
  bookingRef: string;
  mediatorSlug: string;
  mediatorName: string;
  counselName: string;
  counselEmail: string;
  counselPhone: string;
  disputeTitle: string;
  disputeCategory: string;
  preferredDate: string;
  preferredTime: string;
  chamberType: string;
  caseRef?: string;
  status: 'CONFIRMED' | 'CHAMBERS_PREPARING' | 'HEARING_COMPLETED';
  createdAt: string;
}

export function getMediators(): MediatorProfile[] {
  if (typeof window === 'undefined') return INITIAL_MEDIATORS;
  try {
    const saved = localStorage.getItem(MEDIATORS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return INITIAL_MEDIATORS;
}

export function getMediatorBySlug(slug: string): MediatorProfile | undefined {
  const list = getMediators();
  return list.find((m) => m.slug.toLowerCase() === slug.toLowerCase()) || list[0];
}

export function getMediatorBookings(): MediatorBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [];
}

export function createMediatorBooking(
  booking: Omit<MediatorBooking, 'id' | 'bookingRef' | 'status' | 'createdAt'>
): MediatorBooking {
  const bookings = getMediatorBookings();
  const id = `book-${Date.now()}`;
  const bookingRef = `MEDAR-CHAMBER-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newBooking: MediatorBooking = {
    ...booking,
    id,
    bookingRef,
    status: 'CONFIRMED',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const updated = [newBooking, ...bookings];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return newBooking;
}
