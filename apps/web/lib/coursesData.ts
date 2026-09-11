export interface CourseReading {
  id?: string;
  title: string;
  type: string;
  size: string;
  url: string;
}

export interface CourseLecture {
  id?: string;
  title: string;
  speaker: string;
  duration: string;
  videoUrl: string;
}

export interface CourseLessonScenario {
  title: string;
  duration: string;
  scenario: string;
  question: string;
  options: string[];
  explanation: string;
}

export interface CourseModule {
  id: string;
  num: string;
  name: string;
  hours: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED' | 'PUBLISHED';
  summary: string;
  quizScore?: string;
  readings: CourseReading[];
  lectures: CourseLecture[];
  currentLesson?: CourseLessonScenario;
}

export interface CourseItem {
  id: string;
  slug: string;
  courseName: string;
  type: 'FOUNDATION' | 'PRACTITIONER' | 'ADVANCED' | 'INTERNSHIP';
  cohort: string;
  duration: string;
  jurisdiction: string;
  price: string;
  description: string;
  badge: string;
  progressPercent: number;
  completedHours: number;
  totalHours: number;
  mentorName: string;
  modules: CourseModule[];
}

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course-1',
    slug: 'foundation-cohort-1',
    courseName: 'Certificate in Mediation — Foundation Program',
    type: 'FOUNDATION',
    cohort: 'Cohort 1 (Active)',
    duration: '40 Hours (Hybrid)',
    jurisdiction: 'India & Global IMI',
    price: '₹45,000',
    description: 'India\'s first IMI-aligned cohort-based mediation certification. 40 hours. Live + async. Designed for lawyers, HR leaders, and practitioners.',
    badge: 'ACTIVE ENROLLMENT',
    progressPercent: 65,
    completedHours: 26,
    totalHours: 40,
    mentorName: 'Adv. Rajesh Kulkarni',
    modules: [
      {
        id: 'mod-1',
        num: '01',
        name: 'Foundations of Mediation & ADR Frameworks',
        hours: '10 hrs',
        status: 'COMPLETED',
        summary: 'Comprehensive introduction to alternative dispute resolution theory, the statutory framework under the India Mediation Act 2023, and international comparisons.',
        quizScore: '94% (Passed with Distinction)',
        readings: [
          { title: 'Medar Official Handbook: ADR Theory & Core Principles', type: 'PDF Document', size: '3.8 MB', url: '/docs/handbook-adr.pdf' },
          { title: 'Statutory Comparison: Mediation Act 2023 vs Section 89 CPC', type: 'Legal Briefing', size: '1.4 MB', url: '/docs/mediation-act-2023.pdf' },
          { title: 'Code of Ethics & Mediator Impartiality Guidelines', type: 'Reference Sheet', size: '850 KB', url: '/docs/ethics-guidelines.pdf' }
        ],
        lectures: [
          { title: 'Lecture 1.1: The Spectrum of Alternative Dispute Resolution', speaker: 'Dr. A. S. Nariman', duration: '45 mins', videoUrl: 'https://vimeo.com/medar/lec-1-1' },
          { title: 'Lecture 1.2: Voluntariness, Confidentiality & Neutrality in Practice', speaker: 'Justice R. V. Raveendran', duration: '55 mins', videoUrl: 'https://vimeo.com/medar/lec-1-2' }
        ]
      },
      {
        id: 'mod-2',
        num: '02',
        name: 'Communication, Caucusing & Negotiation Dynamics',
        hours: '16 hrs',
        status: 'COMPLETED',
        summary: 'Mastering active listening, interest-based bargaining (Harvard Negotiation Project principles), reframing toxic statements, and strategic caucus management.',
        quizScore: '90% (Passed)',
        readings: [
          { title: 'Interest-Based Negotiation: Moving Beyond Positional Bargaining', type: 'Case Study', size: '2.2 MB', url: '/docs/interest-negotiation.pdf' },
          { title: 'Caucus Protocols: Managing Sensitive Commercial Disclosures', type: 'Practice Guide', size: '1.1 MB', url: '/docs/caucus-protocols.pdf' },
          { title: 'Emotional Intelligence & De-escalation in High-Conflict Disputes', type: 'Research Paper', size: '1.9 MB', url: '/docs/emotional-intelligence.pdf' }
        ],
        lectures: [
          { title: 'Lecture 2.1: The Architecture of an Effective Joint Session', speaker: 'Adv. Rajesh Kulkarni', duration: '60 mins', videoUrl: 'https://vimeo.com/medar/lec-2-1' },
          { title: 'Lecture 2.2: Advanced Caucusing Tactics & Reality Testing', speaker: 'Tariq Al-Mansoor', duration: '50 mins', videoUrl: 'https://vimeo.com/medar/lec-2-2' }
        ]
      },
      {
        id: 'mod-3',
        num: '03',
        name: 'Simulated Live Mediation Role-Play Assessment',
        hours: '14 hrs',
        status: 'IN_PROGRESS',
        summary: 'Hands-on simulated mediation hearings in commercial and shareholder disputes. Practice opening statements, agenda setting, reality testing, and term sheet formulation.',
        readings: [
          { title: 'Confidential Case Briefing: TechVentures Ltd. vs Alpha Logistics', type: 'Simulated File', size: '3.1 MB', url: '/docs/simulated-case.pdf' },
          { title: 'Mediated Settlement Agreement (MSA) Standard Clauses Model', type: 'Drafting Template', size: '920 KB', url: '/docs/msa-template.pdf' }
        ],
        lectures: [
          { title: 'Lecture 3.1: Live Simulation Hearing Briefing & Observer Guidelines', speaker: 'Adv. Priya Sharma', duration: '40 mins', videoUrl: 'https://vimeo.com/medar/lec-3-1' }
        ],
        currentLesson: {
          title: 'Lesson 3.2: Reality Testing & Overcoming Deadlock in Commercial Claims',
          duration: '25 mins • Interactive Simulation',
          scenario: 'You are presiding as mediator over a commercial dispute between a software vendor (Claimant) and an enterprise logistics provider (Respondent). The parties are deadlocked over an alleged ₹1.85 Cr SLA breach penalty.',
          question: 'What is the most effective reality-testing question to ask the Respondent in private caucus to test their BATNA without appearing adversarial?',
          options: [
            'Why did you breach the SLA contract in the first place?',
            'If this goes to litigation, what will be your estimated legal costs, management time, and timeline over the next 3 years compared to settling today?',
            'Do you realize the Claimant has a stronger legal team than yours?',
            'Can you just split the difference and pay 50% to finish this today?'
          ],
          explanation: 'Option 2 is the classic, interest-based reality testing probe. It shifts the party from stubborn positional rhetoric to objective cost-benefit analysis without compromising neutrality.'
        }
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'practitioner-certificate',
    courseName: 'Practitioner Certificate in Advanced Mediation',
    type: 'PRACTITIONER',
    cohort: 'Cohort 2 (Upcoming)',
    duration: '60 Hours (Live Simulation)',
    jurisdiction: 'Multi-Jurisdiction',
    price: '₹75,000',
    description: 'Intensive commercial negotiation and dispute resolution masterclass. Required prerequisite for Full Member directory listing.',
    badge: 'PREREQUISITE FOR FULL MEMBERSHIP',
    progressPercent: 0,
    completedHours: 0,
    totalHours: 60,
    mentorName: 'Justice R. V. Raveendran',
    modules: [
      {
        id: 'mod-2-1',
        num: '01',
        name: 'Complex Commercial & Shareholder Deadlocks',
        hours: '20 hrs',
        status: 'LOCKED',
        summary: 'Resolving multi-party equity disputes, valuation disputes, and corporate board disagreements.',
        readings: [
          { title: 'Shareholder Dispute Resolution Protocols', type: 'Practice Guide', size: '2.8 MB', url: '/docs/shareholder-protocols.pdf' },
          { title: 'Valuation & Accounting Mediation Strategies', type: 'Reference Sheet', size: '1.2 MB', url: '/docs/valuation-strategies.pdf' }
        ],
        lectures: [
          { title: 'Masterclass 1.1: Resolving Co-Founder Deadlocks', speaker: 'Justice R. V. Raveendran', duration: '75 mins', videoUrl: 'https://vimeo.com/medar/masterclass-1-1' }
        ]
      },
      {
        id: 'mod-2-2',
        num: '02',
        name: 'Cross-Border Enforcement & Singapore Convention Rules',
        hours: '20 hrs',
        status: 'LOCKED',
        summary: 'Drafting mediated settlement agreements enforceable in 55+ signatory countries under the Singapore Convention.',
        readings: [
          { title: 'Singapore Convention Enforcement Checklist', type: 'Legal Briefing', size: '1.7 MB', url: '/docs/singapore-convention.pdf' }
        ],
        lectures: [
          { title: 'Masterclass 2.1: Cross-Border MSA Enforceability', speaker: 'Tariq Al-Mansoor', duration: '90 mins', videoUrl: 'https://vimeo.com/medar/masterclass-2-1' }
        ]
      },
      {
        id: 'mod-2-3',
        num: '03',
        name: 'Supervised Chamber Practice & Live Assessed Hearings',
        hours: '20 hrs',
        status: 'LOCKED',
        summary: 'Conducting 3 full-length supervised commercial mediation hearings with international assessor evaluation.',
        readings: [
          { title: 'Assessor Rubric: 10 Core Mediation Competencies', type: 'Evaluation Matrix', size: '950 KB', url: '/docs/assessor-rubric.pdf' }
        ],
        lectures: [
          { title: 'Briefing 3.1: Chamber Internship Hearing Guidelines', speaker: 'Adv. Priya Sharma', duration: '45 mins', videoUrl: 'https://vimeo.com/medar/briefing-3-1' }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'advanced-practitioner',
    courseName: 'Advanced Practitioner & Master Mediator Program',
    type: 'ADVANCED',
    cohort: 'Executive Cohort (Fall 2026)',
    duration: '80 Hours + Supervised Practice',
    jurisdiction: 'International ADR',
    price: '₹1,20,000',
    description: 'Master-level dispute resolution certification designed for senior advocates, retired judges, and enterprise dispute officers.',
    badge: 'EXECUTIVE PATHWAY',
    progressPercent: 0,
    completedHours: 0,
    totalHours: 80,
    mentorName: 'Dr. A. S. Nariman',
    modules: [
      {
        id: 'mod-3-1',
        num: '01',
        name: 'Maritime, Infrastructure & Construction ADR',
        hours: '30 hrs',
        status: 'LOCKED',
        summary: 'Specialized dispute resolution techniques for FIDIC contracts, public-private infrastructure projects, and maritime disputes.',
        readings: [
          { title: 'FIDIC Dispute Adjudication & Mediation Manual', type: 'PDF Document', size: '5.2 MB', url: '/docs/fidic-manual.pdf' }
        ],
        lectures: [
          { title: 'Executive Lecture: High-Stakes Construction ADR', speaker: 'Tariq Al-Mansoor', duration: '120 mins', videoUrl: 'https://vimeo.com/medar/construction-adr' }
        ]
      },
      {
        id: 'mod-3-2',
        num: '02',
        name: 'Enterprise Mediation Design & Dispute Systems',
        hours: '30 hrs',
        status: 'LOCKED',
        summary: 'Designing institutional ADR clauses and multi-tiered dispute escalation frameworks for Fortune 500 companies.',
        readings: [
          { title: 'Corporate ADR System Design Framework', type: 'Executive Brief', size: '3.4 MB', url: '/docs/adr-systems-design.pdf' }
        ],
        lectures: [
          { title: 'Executive Lecture: Institutional ADR for Corporates', speaker: 'Dr. A. S. Nariman', duration: '90 mins', videoUrl: 'https://vimeo.com/medar/enterprise-adr' }
        ]
      },
      {
        id: 'mod-3-3',
        num: '03',
        name: 'Master Mediator Accreditation Defense',
        hours: '20 hrs',
        status: 'LOCKED',
        summary: 'Oral defense of 5 mediated dispute settlements before the International Accreditation Board.',
        readings: [
          { title: 'Master Accreditation Portfolio Submission Guide', type: 'Portfolio Guide', size: '1.8 MB', url: '/docs/portfolio-guide.pdf' }
        ],
        lectures: [
          { title: 'Accreditation Board Orientation', speaker: 'Justice R. V. Raveendran', duration: '60 mins', videoUrl: 'https://vimeo.com/medar/board-orientation' }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'internship-program',
    courseName: 'ADR Graduate Internship & Placement Program',
    type: 'INTERNSHIP',
    cohort: 'Residency 2026',
    duration: '3 Months Residency',
    jurisdiction: 'India & UAE',
    price: '₹30,000',
    description: 'Placement support and practical chamber attachment program for recent law graduates transitioning into full-time mediation practice.',
    badge: 'GRADUATE PATHWAY',
    progressPercent: 0,
    completedHours: 0,
    totalHours: 120,
    mentorName: 'Adv. Priya Sharma',
    modules: [
      {
        id: 'mod-4-1',
        num: '01',
        name: 'Chamber Intake & Case Management Protocols',
        hours: '40 hrs',
        status: 'LOCKED',
        summary: 'Screening case files, conducting intake interviews, and statutory filing under pre-litigation rules.',
        readings: [
          { title: 'Mediation Intake & Case Screening Handbook', type: 'Chamber Manual', size: '2.5 MB', url: '/docs/intake-handbook.pdf' }
        ],
        lectures: [
          { title: 'Chamber Training 1.1: Case Docket Management', speaker: 'Adv. Priya Sharma', duration: '60 mins', videoUrl: 'https://vimeo.com/medar/case-docket' }
        ]
      },
      {
        id: 'mod-4-2',
        num: '02',
        name: 'Co-Mediation & Settlement Agreement Drafting Residency',
        hours: '80 hrs',
        status: 'LOCKED',
        summary: 'Serving as co-mediator on 10 live disputes and drafting statutory settlement agreements.',
        readings: [
          { title: 'Standard Settlement Clauses & Precedents Digest', type: 'Precedents Digest', size: '4.1 MB', url: '/docs/settlement-digest.pdf' }
        ],
        lectures: [
          { title: 'Residency Masterclass: Flawless Agreement Drafting', speaker: 'Adv. Rajesh Kulkarni', duration: '75 mins', videoUrl: 'https://vimeo.com/medar/drafting-masterclass' }
        ]
      }
    ]
  }
];

const STORAGE_KEY = 'medar_platform_courses_v1';

export function getCourses(): CourseItem[] {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return INITIAL_COURSES;
}

export function saveCourses(courses: CourseItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch {
    // ignore
  }
}
