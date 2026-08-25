# Medar Platform — Complete Architecture

> **Status:** Architecture baseline / v1  
> **Source:** Medar Website Layout Options — Team Review Pack  
> **Purpose:** Define a scalable technical architecture for the Medar public website and the authenticated Medar platform.

---

## 1. Executive Summary

Medar is positioned as a professional ecosystem for mediation and Alternative Dispute Resolution (ADR), rather than only a course provider or directory.

The platform is organized around four pillars:

1. **Academia & Test Preparation**
2. **Community & Events**
3. **Dispute Resolution Marketplace**
4. **Corporate B2B**

The supplied design document describes capabilities including:

- Foundation, Practitioner and Advanced Practitioner programs
- Jurisdiction-specific test preparation
- Professional membership
- Knowledge Hub
- Events and summit
- Find a Mediator
- Case Filing
- Mediator Empanelment
- Corporate training
- Retainer partnerships
- White-label certification

The architecture therefore separates the product into two closely connected systems:

```text
┌───────────────────────────────────────────────────────────────┐
│                         MEDAR PLATFORM                        │
├───────────────────────────────┬───────────────────────────────┤
│       PUBLIC EXPERIENCE       │       AUTHENTICATED APP       │
│                               │                               │
│ Website / SEO / Content       │ User Dashboards              │
│ Programs                      │ Enrollment                   │
│ Knowledge Hub                 │ Membership                   │
│ Mediator Discovery            │ Mediator Profiles             │
│ Corporate                     │ Empanelment                  │
│ Events                        │ Case Management               │
│ About / Accreditation         │ Documents / Notifications     │
│                               │ Admin / Operations             │
└───────────────────────────────┴───────────────────────────────┘
                                │
                                ▼
                         NestJS API Layer
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
         PostgreSQL           Redis               S3
          + Prisma          + BullMQ          Private Files
```

---

# 2. Important Scope Boundary

The design PDF is primarily a **product/design direction document**, not a complete functional specification.

It establishes product pillars, target audiences, navigation, content and several proposed workflows, but it does **not** define every operational rule for:

- Case assignment
- Mediator matching
- Credential verification
- Empanelment approval
- Settlement workflows
- Online mediation sessions
- Refunds
- Dispute escalation
- Exact user permissions
- Compliance retention rules
- Internal operational SLAs

Those items must be confirmed with the Medar team before implementation.

### Architecture principle

Do not invent legal or operational rules in code.

Represent uncertain business rules as configurable workflows where practical, and keep them isolated from UI code.

---

# 3. Product Model

## 3.1 Four Core Pillars

### Pillar 1 — Academia & Test Preparation

The platform supports:

- Foundation Certificate
- Practitioner Certificate
- Advanced Practitioner
- Test preparation
- Internship program
- Jurisdiction-specific qualification preparation

The design references India, UAE, Singapore and UK pathways.

### Pillar 2 — Community & Events

The platform supports:

- Membership
- Professional forums/community
- Knowledge library
- Job opportunities
- Events
- Summit
- Regional masterclasses
- Thought leadership

### Pillar 3 — Dispute Resolution Marketplace

The platform is intended to support:

- Find a Mediator
- File a Case
- Get Empanelled
- Verified mediator profiles
- Credential-centric trust infrastructure

### Pillar 4 — Corporate B2B

The platform is intended to support:

- In-house legal and HR training
- Resolution partner retainers
- Corporate access
- Priority intake
- Reporting
- White-label certification

---

# 4. Target User Types

The final role model must be confirmed with Medar, but the architecture should support at least these categories:

```text
PUBLIC
├── Visitor
└── Applicant

INDIVIDUAL
├── Student
├── Graduate
├── Practitioner
├── Mediator
└── Community Member

CORPORATE
├── Corporate Admin
└── Corporate Member

OPERATIONS
├── Content Editor
├── Program Manager
├── Case Manager
├── Membership Manager
├── Mediator Verification Officer
├── Finance/Admin
└── Super Admin
```

A user may have multiple capabilities.

Do not model these solely as a single `role` column if the product later requires multiple organizational memberships or granular permissions.

Use:

```text
User
UserRole
Permission
RolePermission
Organization
OrganizationMembership
```

---

# 5. Recommended Technology Stack

## Frontend

| Area | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Component System | shadcn/ui |
| Animation | Framer Motion |
| Advanced Motion | GSAP where required |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query where appropriate |

## Backend

| Area | Technology |
|---|---|
| API | NestJS |
| Language | TypeScript |
| API Style | REST initially |
| Validation | Zod / class-validator |
| Authentication | Token-based auth |
| Authorization | RBAC + resource-level permissions |
| Background Jobs | BullMQ |
| Queue | Redis |

## Data

| Area | Technology |
|---|---|
| Primary DB | PostgreSQL |
| ORM | Prisma |
| Cache / Queue | Redis |
| Object Storage | Amazon S3 |
| CMS | Sanity |

## Infrastructure

| Area | Recommended |
|---|---|
| Frontend hosting | Vercel |
| Backend | AWS ECS/Fargate or equivalent |
| Database | Managed PostgreSQL |
| Redis | Managed Redis |
| Storage | Private S3 |
| CDN / DNS | Cloudflare |
| CI/CD | GitHub Actions |
| Monitoring | Sentry + infrastructure monitoring |

## External Services

| Requirement | Candidate |
|---|---|
| Payments | Razorpay |
| Email | Resend |
| SMS/OTP | Transactional SMS provider selected by client |
| Video mediation | LiveKit if confirmed in scope |
| Analytics | GA4 + Vercel Analytics |
| Search | PostgreSQL initially; Meilisearch/Typesense/OpenSearch later if required |

---

# 6. High-Level System Architecture

```text
                              ┌───────────────┐
                              │   Internet    │
                              └───────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   Cloudflare  │
                              │ DNS / WAF/CDN │
                              └───────┬───────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
             ┌──────────────┐                    ┌──────────────┐
             │   Next.js    │                    │ API Gateway /│
             │ Web + App    │───────────────────▶│ Load Balancer│
             └──────────────┘                    └──────┬───────┘
                                                        │
                                                        ▼
                                                 ┌──────────────┐
                                                 │   NestJS     │
                                                 │ API Backend  │
                                                 └──────┬───────┘
                                                        │
                 ┌──────────────────┬──────────────────┼─────────────────┐
                 │                  │                  │                 │
                 ▼                  ▼                  ▼                 ▼
          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
          │ PostgreSQL  │    │    Redis    │    │     S3      │   │   Sanity    │
          │   Prisma    │    │  BullMQ     │    │ Private     │   │    CMS      │
          └─────────────┘    └─────────────┘    └─────────────┘   └─────────────┘
                 │                  │
                 │                  └──────────────┐
                 │                                 ▼
                 │                          ┌─────────────┐
                 │                          │   Workers   │
                 │                          │ Background  │
                 │                          │    Jobs     │
                 │                          └─────────────┘
                 │
                 ▼
          Transactional Data
```

---

# 7. Repository Structure

Use a monorepo.

Recommended:

```text
medar/
├── apps/
│   ├── web/                    # Next.js public website + authenticated app
│   ├── api/                    # NestJS API
│   └── worker/                 # Background workers
│
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── config/                 # Shared configuration
│   ├── types/                  # Shared TypeScript types
│   ├── validation/             # Shared Zod schemas
│   ├── eslint-config/
│   └── tsconfig/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── architecture.md
│   ├── api/
│   ├── workflows/
│   ├── decisions/
│   └── security/
│
├── scripts/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### Monorepo tooling

Recommended:

- pnpm
- Turborepo
- TypeScript project references where useful

---

# 8. Next.js Application Architecture

```text
apps/web/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── programs/
│   │   ├── test-prep/
│   │   ├── mediators/
│   │   ├── knowledge/
│   │   ├── community/
│   │   ├── events/
│   │   ├── corporates/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify/
│   │   └── forgot-password/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   ├── programs/
│   │   ├── enrollments/
│   │   ├── memberships/
│   │   ├── certificates/
│   │   ├── profile/
│   │   ├── mediators/
│   │   ├── cases/
│   │   ├── documents/
│   │   └── notifications/
│   │
│   └── admin/
│       ├── dashboard/
│       ├── users/
│       ├── programs/
│       ├── enrollments/
│       ├── memberships/
│       ├── mediators/
│       ├── empanelment/
│       ├── cases/
│       ├── payments/
│       ├── content/
│       ├── organizations/
│       └── audit-logs/
│
├── components/
├── features/
├── lib/
├── hooks/
├── services/
└── middleware.ts
```

---

# 9. NestJS Backend Architecture

Use domain-oriented modules rather than one large controller/service folder.

```text
apps/api/
├── src/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── organizations/
│   ├── programs/
│   ├── courses/
│   ├── enrollments/
│   ├── assessments/
│   ├── certifications/
│   ├── memberships/
│   ├── mediators/
│   ├── credentials/
│   ├── empanelment/
│   ├── cases/
│   ├── parties/
│   ├── documents/
│   ├── sessions/
│   ├── settlements/
│   ├── events/
│   ├── community/
│   ├── corporate/
│   ├── payments/
│   ├── notifications/
│   ├── search/
│   ├── audit/
│   ├── admin/
│   ├── health/
│   └── common/
│
├── main.ts
└── app.module.ts
```

Each domain should generally contain:

```text
module.ts
controller.ts
service.ts
repository.ts
dto/
entities/
policies/
```

Avoid business logic inside controllers.

---

# 10. Core Domain Model

## 10.1 User

```text
User
├── id
├── email
├── phone
├── passwordHash / authProvider
├── firstName
├── lastName
├── status
├── emailVerifiedAt
├── phoneVerifiedAt
├── createdAt
└── updatedAt
```

---

## 10.2 Profile

Keep profile data separate from authentication identity.

```text
Profile
├── userId
├── avatar
├── bio
├── location
├── languages
├── professionalTitle
├── education
└── metadata
```

---

# 11. Programs & Education

```text
Program
├── id
├── title
├── slug
├── type
├── description
├── jurisdiction
├── duration
├── deliveryMode
├── seats
├── price
├── currency
├── status
└── publishedAt

ProgramCohort
├── programId
├── startDate
├── endDate
├── seats
├── enrollmentDeadline
└── status

Enrollment
├── userId
├── cohortId
├── status
├── paymentId
├── enrolledAt
└── completedAt
```

Potential program types:

```text
FOUNDATION
PRACTITIONER
ADVANCED_PRACTITIONER
TEST_PREP
INTERNSHIP
CORPORATE
```

Do not hardcode these in UI.

---

# 12. Assessments & Certifications

```text
Assessment
├── programId
├── title
├── type
├── passingScore
├── duration
└── status

AssessmentAttempt
├── assessmentId
├── userId
├── score
├── result
├── startedAt
└── completedAt

Certification
├── userId
├── programId
├── certificateNumber
├── issuedAt
├── expiresAt
├── status
└── documentUrl
```

Certificate numbers should be unique.

---

# 13. Membership

The design references:

- Associate Member
- Full Member
- Corporate Member

with annual pricing shown in the design. These amounts should remain configurable rather than hardcoded. fileciteturn2file5L184-L202

```text
MembershipPlan
├── id
├── name
├── description
├── eligibility
├── price
├── currency
├── duration
└── status

Membership
├── userId / organizationId
├── planId
├── status
├── startsAt
├── expiresAt
├── paymentId
└── autoRenew
```

Membership should be tied to verified eligibility where required.

---

# 14. Mediator Marketplace

This is one of the most important platform modules.

```text
MediatorProfile
├── userId
├── displayName
├── professionalBio
├── yearsOfExperience
├── practiceAreas
├── languages
├── locations
├── jurisdictions
├── availability
├── feeRange
├── profileStatus
└── publicProfileSlug
```

Credential model:

```text
Credential
├── mediatorId
├── type
├── issuingBody
├── credentialNumber
├── issueDate
├── expiryDate
├── documentId
├── verificationStatus
└── verifiedBy
```

Only verified credentials should be displayed as verified.

---

# 15. Empanelment

The PDF explicitly includes "Get Empanelled". fileciteturn2file0L24-L29

Architecture:

```text
EmpanelmentApplication
├── mediatorId
├── panel
├── applicationStatus
├── submittedAt
├── reviewedAt
├── reviewedBy
├── rejectionReason
└── notes
```

Possible status:

```text
DRAFT
SUBMITTED
UNDER_REVIEW
DOCUMENTS_REQUIRED
ASSESSMENT_REQUIRED
APPROVED
REJECTED
WITHDRAWN
```

These states are architecture suggestions, not confirmed Medar business rules.

---

# 16. Case Management

This module requires detailed client confirmation before final implementation.

Conceptual model:

```text
Case
├── caseNumber
├── createdBy
├── caseType
├── jurisdiction
├── status
├── priority
├── description
├── createdAt
└── updatedAt

CaseParty
├── caseId
├── userId / externalParty
├── role
├── invitationStatus
└── joinedAt

CaseMediator
├── caseId
├── mediatorId
├── role
├── status
└── assignedAt
```

Potential case statuses:

```text
DRAFT
SUBMITTED
UNDER_REVIEW
AWAITING_PARTIES
MEDIATOR_SELECTION
MEDIATOR_ASSIGNED
SCHEDULED
IN_MEDIATION
SETTLEMENT_REACHED
CLOSED
CANCELLED
```

These are placeholders until the legal/operations team approves the actual state machine.

---

# 17. Case Documents

Never store sensitive documents directly as public URLs.

```text
Document
├── id
├── ownerId
├── caseId
├── type
├── fileName
├── mimeType
├── size
├── storageKey
├── checksum
├── uploadedBy
├── visibility
├── createdAt
└── deletedAt
```

Storage flow:

```text
Client
  ↓
API authorization
  ↓
Pre-signed upload URL
  ↓
Private S3
  ↓
Document metadata stored in PostgreSQL
```

Download:

```text
Client requests document
        ↓
API checks permissions
        ↓
API generates short-lived signed URL
        ↓
Client downloads
```

Never expose raw S3 paths.

---

# 18. Mediation Sessions

If online mediation is confirmed as part of scope:

```text
MediationSession
├── caseId
├── scheduledAt
├── duration
├── status
├── meetingProvider
├── meetingRoomId
└── endedAt
```

Potential supporting entities:

```text
SessionParticipant
SessionMessage
SessionDocument
SessionNote
```

For video:

```text
Next.js
   ↓
NestJS
   ↓
LiveKit
```

The application should control authorization to the meeting room.

---

# 19. Settlement

Do not implement the legal settlement model until the client's legal/operations team defines it.

Potential architecture:

```text
Settlement
├── caseId
├── status
├── draftDocumentId
├── finalDocumentId
├── agreedAt
├── signedAt
└── registeredAt
```

Digital signatures, e-signatures and registration requirements must be confirmed separately.

---

# 20. Corporate Platform

The design describes corporate training, retainer partnerships, priority intake and reporting. fileciteturn2file3L121-L133

Use organizations:

```text
Organization
├── id
├── name
├── type
├── legalName
├── billingEmail
├── status
└── metadata

OrganizationMembership
├── organizationId
├── userId
├── role
└── status
```

Corporate features can then be scoped to:

```text
organizationId
```

rather than duplicating corporate tables.

---

# 21. Events & Community

```text
Event
├── title
├── slug
├── description
├── eventType
├── location
├── startAt
├── endAt
├── capacity
├── status
└── publishedAt

EventRegistration
├── eventId
├── userId
├── status
├── paymentId
└── registeredAt
```

Community:

```text
CommunityMembership
Forum
ForumThread
ForumPost
Comment
Reaction
```

Community moderation must be handled through explicit permissions.

---

# 22. Knowledge Hub

Use Sanity for editorial content.

Content types:

```text
Article
Guide
Case Study
Career Article
Jurisdiction Guide
News
Event Article
```

Example:

```text
Article
├── title
├── slug
├── excerpt
├── body
├── category
├── author
├── coverImage
├── readingTime
├── SEO metadata
└── publishedAt
```

The PDF references content such as India Mediation Act analysis, UAE qualification guides and mediation career articles. fileciteturn2file4L149-L165

---

# 23. Payments

Create a payment abstraction instead of coupling business logic directly to Razorpay.

```text
Payment
├── id
├── provider
├── providerPaymentId
├── amount
├── currency
├── status
├── userId
├── organizationId
├── purpose
├── referenceType
├── referenceId
├── paidAt
└── metadata
```

Payment statuses:

```text
CREATED
PENDING
AUTHORIZED
CAPTURED
FAILED
REFUNDED
PARTIALLY_REFUNDED
```

### Critical rule

Frontend payment success is not the source of truth.

Use:

```text
Razorpay
   ↓
Webhook
   ↓
NestJS
   ↓
Verify signature
   ↓
Idempotency check
   ↓
Database transaction
   ↓
Business action
```

---

# 24. Notifications

Central notification service:

```text
Notification
├── userId
├── type
├── title
├── body
├── channel
├── status
├── readAt
└── createdAt
```

Channels:

```text
EMAIL
SMS
IN_APP
```

Use BullMQ for asynchronous delivery.

---

# 25. Background Jobs

Examples:

```text
send-email
send-sms
process-payment-webhook
generate-certificate
expire-membership
membership-reminder
event-reminder
case-notification
document-processing
search-index
analytics-export
```

Architecture:

```text
NestJS
   ↓
BullMQ
   ↓
Redis
   ↓
Worker
```

Jobs must be idempotent.

---

# 26. Search Architecture

### Phase 1

Use PostgreSQL indexes and full-text search.

Search mediator by:

- name
- jurisdiction
- location
- language
- practice area
- credential
- experience

### Phase 2

If search complexity or volume justifies it:

```text
PostgreSQL
    ↓
Search index
    ↓
Meilisearch / Typesense / OpenSearch
```

Do not add a search engine prematurely.

---

# 27. Authorization Architecture

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to access?

Use both:

### RBAC

```text
ADMIN
MEDIATOR
STUDENT
CORPORATE_ADMIN
CONTENT_EDITOR
CASE_MANAGER
```

and resource-level checks:

```text
canViewCase(user, case)
canEditMediatorProfile(user, mediator)
canDownloadDocument(user, document)
canManageOrganization(user, organization)
```

A user must never gain access simply because they know a URL.

---

# 28. API Design

Base:

```text
/api/v1
```

Example endpoints:

```text
POST   /auth/login
POST   /auth/register
POST   /auth/refresh

GET    /programs
GET    /programs/:slug
POST   /programs/:id/enroll

GET    /mediators
GET    /mediators/:slug
POST   /mediators/applications

POST   /empanelment/applications
GET    /empanelment/applications/:id

POST   /cases
GET    /cases
GET    /cases/:id
POST   /cases/:id/parties
POST   /cases/:id/documents
POST   /cases/:id/mediator

GET    /memberships/plans
POST   /memberships/subscribe

POST   /payments/create
POST   /payments/webhooks/razorpay

GET    /events
POST   /events/:id/register

GET    /notifications
PATCH  /notifications/:id/read
```

Actual endpoints should be finalized from the approved product specification.

---

# 29. API Security

Every protected endpoint should have:

```text
Authentication
      ↓
Authorization
      ↓
Input validation
      ↓
Business rule validation
      ↓
Database transaction
```

Never trust:

- user IDs from the client
- role values from the client
- payment status from the client
- document access claims
- case ownership claims

Resolve identity from the authenticated server-side context.

---

# 30. Database Transaction Rules

Use transactions for multi-step business operations.

Example enrollment:

```text
BEGIN
  Create Payment
  Verify payment
  Create Enrollment
  Update Cohort seats
COMMIT
```

Example membership:

```text
BEGIN
  Verify payment
  Create Membership
  Record payment reference
  Create audit event
COMMIT
```

If one operation fails, roll back the transaction.

---

# 31. Idempotency

Important for:

- payment webhooks
- enrollment
- membership renewal
- certificate generation
- notification jobs
- case creation

Example:

```text
Idempotency-Key
```

Store processed request identifiers where necessary.

A payment webhook may arrive more than once.

Your system must not create two memberships because of that.

---

# 32. Audit Logging

Because the platform handles professional credentials and potentially sensitive dispute information, audit logging should be a first-class feature.

```text
AuditLog
├── id
├── actorUserId
├── action
├── resourceType
├── resourceId
├── ipAddress
├── userAgent
├── metadata
└── createdAt
```

Examples:

```text
MEDIATOR_CREDENTIAL_VERIFIED
EMPANELMENT_APPROVED
CASE_ASSIGNED
CASE_DOCUMENT_VIEWED
MEMBERSHIP_ACTIVATED
PAYMENT_CAPTURED
USER_ROLE_CHANGED
```

Do not store unnecessary sensitive document contents in logs.

---

# 33. Security Architecture

## Required

- HTTPS everywhere
- Secure HTTP headers
- CSRF protection where applicable
- Rate limiting
- Strong password hashing
- Refresh-token rotation
- Secure cookies where applicable
- Input validation
- SQL injection protection through Prisma/parameterization
- XSS protection
- File-type validation
- File-size limits
- Malware scanning for uploaded files if required
- Private object storage
- Short-lived signed URLs
- Audit logs
- Access control
- Secrets stored outside source control

## Sensitive documents

Case documents should be:

```text
PRIVATE
NOT PUBLIC
NOT INDEXED
NOT ACCESSIBLE WITHOUT AUTHORIZATION
```

---

# 34. Privacy & Data Protection

This is a legal-services platform.

Before production, Medar should establish:

- Data retention policy
- Data deletion policy
- Document retention policy
- User consent requirements
- Privacy policy
- Terms of service
- Cookie policy
- Data access process
- Data breach response
- Jurisdiction-specific requirements
- Legal basis for processing

The engineering team should implement the approved policy, not invent it.

---

# 35. SEO Architecture

Public pages should be server-rendered/indexable.

Use:

```text
Metadata API
sitemap.xml
robots.txt
canonical URLs
Open Graph
Twitter/X metadata
JSON-LD
Breadcrumbs
```

Structured data where appropriate:

```text
Organization
Article
Event
Course
BreadcrumbList
Person
```

Do not expose private platform routes to search engines.

---

# 36. Public vs Private Route Strategy

```text
PUBLIC
/
 /programs
 /programs/:slug
 /test-prep
 /mediators
 /mediators/:slug
 /knowledge
 /knowledge/:slug
 /events
 /corporates
 /about

AUTHENTICATED
/app
/app/profile
/app/programs
/app/enrollments
/app/memberships
/app/certificates
/app/cases
/app/documents
/app/notifications

ADMIN
/admin
/admin/users
/admin/programs
/admin/mediators
/admin/empanelment
/admin/cases
/admin/payments
/admin/content
/admin/audit-logs
```

---

# 37. Frontend State Strategy

Do not put everything into global state.

Use:

### Server state

TanStack Query / server components / API fetching.

### Local UI state

React state.

### Form state

React Hook Form.

### URL state

Search/filter/pagination state should often live in URL parameters.

Example:

```text
/mediators?
jurisdiction=india
&language=english
&practiceArea=commercial
&page=2
```

---

# 38. Caching Strategy

Cache public content aggressively.

Examples:

```text
Program pages
Knowledge articles
Public mediator profiles
Events
Accreditation information
```

Do not cache sensitive:

```text
Cases
Documents
Private messages
Payment records
Admin information
```

Redis should be used selectively rather than as a default cache for everything.

---

# 39. File Upload Pipeline

```text
User
 ↓
Request upload
 ↓
API validates permission/type/size
 ↓
Generate signed upload URL
 ↓
Client uploads to S3
 ↓
S3 event / API confirmation
 ↓
Document metadata saved
 ↓
Optional malware scan
 ↓
Document becomes available according to policy
```

Allowed file types and limits must be configurable.

---

# 40. Observability

Production stack:

```text
Frontend errors
    ↓
Sentry

Backend errors
    ↓
Sentry

Infrastructure metrics
    ↓
Cloud monitoring

Application logs
    ↓
Centralized logging
```

Track:

- API latency
- Error rates
- Database performance
- Queue failures
- Payment webhook failures
- Authentication failures
- Storage failures

---

# 41. Testing Strategy

## Unit tests

Test:

- business rules
- permissions
- calculations
- state transitions
- payment logic

## Integration tests

Test:

```text
API
+
Database
+
Authentication
+
Payments
```

## E2E tests

Critical workflows:

```text
Registration
Login
Program enrollment
Payment
Membership
Mediator application
Empanelment
Case filing
Mediator assignment
Document upload
Admin approval
```

Use Playwright for E2E.

---

# 42. CI/CD

GitHub Actions:

```text
Pull Request
    ↓
Lint
    ↓
Typecheck
    ↓
Unit tests
    ↓
Build
    ↓
Integration tests
    ↓
Preview deployment
```

Production:

```text
main
 ↓
CI
 ↓
Build
 ↓
Migration check
 ↓
Deploy
 ↓
Health check
```

Never automatically run destructive database operations in production.

---

# 43. Environment Strategy

```text
.env.local
.env.development
.env.staging
.env.production
```

Secrets:

```text
DATABASE_URL
REDIS_URL
S3_ACCESS_KEY
S3_SECRET_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RESEND_API_KEY
AUTH_SECRET
SANITY_PROJECT_ID
SANITY_DATASET
SENTRY_DSN
```

Never commit `.env` files.

---

# 44. Environment Separation

At minimum:

```text
Development
    ↓
Staging
    ↓
Production
```

Each environment should have separate:

- database
- Redis
- storage bucket
- payment credentials
- CMS dataset where appropriate

Never test payments against production credentials.

---

# 45. Admin Architecture

Admin is not simply a hidden frontend route.

Admin actions should be:

```text
Authenticated
+
Authorized
+
Audited
```

Admin dashboard modules:

```text
Overview
Users
Programs
Cohorts
Enrollments
Memberships
Mediators
Credentials
Empanelment
Cases
Documents
Payments
Organizations
Events
Knowledge Hub
Notifications
Audit Logs
System Settings
```

---

# 46. Configuration Management

Avoid hardcoding:

```text
Membership prices
Program prices
Cohort seats
Jurisdictions
Membership duration
Notification templates
Case statuses
```

where the business expects them to change.

Use database configuration where appropriate.

Example:

```text
PlatformSetting
├── key
├── value
├── type
└── updatedBy
```

For complex configuration, use strongly typed configuration schemas rather than arbitrary JSON everywhere.

---

# 47. Domain Events

As the platform grows, use domain events for decoupling.

Examples:

```text
UserRegistered
EnrollmentCreated
PaymentCaptured
MembershipActivated
CredentialVerified
EmpanelmentApproved
CaseCreated
MediatorAssigned
DocumentUploaded
EventRegistered
CertificateIssued
```

Example:

```text
PaymentCaptured
       │
       ├── Activate enrollment
       ├── Send confirmation email
       ├── Create notification
       └── Write audit event
```

These can be processed through BullMQ where asynchronous behavior is appropriate.

---

# 48. Core Business Workflows

## 48.1 Program Enrollment

```text
Visitor
 ↓
Program page
 ↓
Register / Login
 ↓
Select cohort
 ↓
Complete application
 ↓
Payment
 ↓
Payment webhook
 ↓
Enrollment activated
 ↓
Confirmation
 ↓
User dashboard
```

---

## 48.2 Membership

```text
Eligible user
 ↓
Membership plan
 ↓
Apply / Subscribe
 ↓
Payment
 ↓
Webhook verification
 ↓
Membership activated
 ↓
Community access
 ↓
Member benefits
```

The PDF describes membership as assessment-based rather than simply purchasable. Eligibility rules therefore need to be enforced by the backend. fileciteturn2file8L348-L352

---

## 48.3 Mediator Application

```text
Mediator
 ↓
Create profile
 ↓
Upload credentials
 ↓
Submit verification
 ↓
Admin review
 ↓
Credential verification
 ↓
Approved / Rejected / More information
 ↓
Public profile eligibility
```

---

## 48.4 Empanelment

```text
Mediator
 ↓
Apply for panel
 ↓
Submit required documents
 ↓
Review
 ↓
Assessment if required
 ↓
Decision
 ↓
Panel membership
 ↓
Eligible for marketplace/case assignment
```

Exact steps must be approved by Medar.

---

## 48.5 Case Filing

```text
Client
 ↓
Create account
 ↓
Case intake
 ↓
Upload documents
 ↓
Submit
 ↓
Operations review
 ↓
Determine next step
 ↓
Mediator matching / assignment
 ↓
Parties notified
 ↓
Mediation
 ↓
Settlement / closure
```

This workflow is intentionally incomplete until the client's legal/operations requirements are provided.

---

# 49. API Versioning

Use:

```text
/api/v1
```

Never make breaking changes silently.

When needed:

```text
/api/v2
```

Document API contracts using OpenAPI/Swagger.

---

# 50. Database Design Principles

### Use UUIDs

Prefer UUIDs/UUID-like IDs for public resources.

### Use timestamps

Every major entity:

```text
createdAt
updatedAt
```

### Soft deletion

Use carefully for records that must be retained.

```text
deletedAt
```

Do not use soft deletion as a substitute for an actual retention policy.

### Foreign keys

Enforce relationships in PostgreSQL.

### Indexes

Index:

- email
- slug
- caseNumber
- certificateNumber
- payment provider IDs
- foreign keys
- search/filter fields
- timestamps used for sorting

---

# 51. Recommended Initial Database Entities

```text
User
Profile
Role
Permission
UserRole

Organization
OrganizationMembership

Program
ProgramCohort
Enrollment
Assessment
AssessmentAttempt
Certification

MembershipPlan
Membership

MediatorProfile
Credential
EmpanelmentApplication

Case
CaseParty
CaseMediator
MediationSession
Settlement

Document

Event
EventRegistration

Notification

Payment
Refund

AuditLog

PlatformSetting
```

This is a starting model, not a final schema.

---

# 52. What Should NOT Be Built Yet Without Confirmation

Do not implement these based solely on the design PDF:

- Automatic mediator matching
- Legal settlement registration
- Digital signatures
- Online mediation video
- AI mediator matching
- Automated credential verification
- Case fee calculation
- Refund policy
- Legal document generation
- Court integration
- Government API integration
- WhatsApp workflows
- Jurisdiction-specific compliance automation

These require product/legal requirements.

---

# 53. Development Phases

## Phase 0 — Discovery

Before coding:

- Finalize selected visual layout
- Confirm exact user roles
- Confirm program workflows
- Confirm membership eligibility
- Confirm mediator verification
- Confirm empanelment workflow
- Confirm case lifecycle
- Confirm payment rules
- Confirm corporate workflow
- Confirm document requirements
- Confirm online mediation scope
- Confirm admin responsibilities

Deliverables:

```text
PRD
User flows
Role matrix
ERD
API specification
UI specification
Security requirements
```

---

## Phase 1 — Foundation

Build:

- Monorepo
- Next.js
- NestJS
- PostgreSQL
- Prisma
- Redis
- Authentication
- RBAC
- CI/CD
- Logging
- S3
- Sanity
- Base admin

---

## Phase 2 — Public Platform

Build:

- Home
- Programs
- Program detail
- Test preparation
- Membership
- Community
- Events
- Knowledge Hub
- Corporate pages
- About
- Accreditation
- Contact
- Public mediator profiles

---

## Phase 3 — Education

Build:

- Program enrollment
- Cohorts
- Payments
- Student dashboard
- Assessments
- Certificates
- Program administration

---

## Phase 4 — Professional Network

Build:

- Mediator profiles
- Credentials
- Verification
- Empanelment
- Membership
- Community
- Events
- Mediator discovery

---

## Phase 5 — Dispute Resolution

Build:

- Case intake
- Parties
- Documents
- Case dashboard
- Mediator assignment
- Notifications
- Session management
- Settlement workflow

Only after approved workflows are received.

---

## Phase 6 — Corporate

Build:

- Organization accounts
- Corporate memberships
- Employee management
- Training programs
- Priority intake
- Reporting dashboard
- Retainer workflows
- White-label programs

---

## Phase 7 — Advanced Mediation

If confirmed:

- Online mediation
- Live video
- Secure chat
- Session rooms
- E-signature
- Settlement generation
- Advanced case analytics

---

# 54. MVP Recommendation

If the client expects an MVP rather than the complete vision, build:

```text
PUBLIC
✓ Website
✓ Programs
✓ Knowledge Hub
✓ Corporate
✓ Events
✓ Mediator discovery

AUTHENTICATION
✓ Registration
✓ Login
✓ Profile

EDUCATION
✓ Program enrollment
✓ Payments
✓ Enrollment dashboard
✓ Certificates

MEMBERSHIP
✓ Plans
✓ Eligibility
✓ Payment
✓ Membership dashboard

MEDIATORS
✓ Profile
✓ Credential upload
✓ Verification
✓ Empanelment application
✓ Public profile

ADMIN
✓ Users
✓ Programs
✓ Payments
✓ Mediators
✓ Empanelment
✓ Content
✓ Memberships
```

Defer:

```text
Case management
Online mediation
Complex settlement workflow
Advanced corporate reporting
AI
Advanced search
```

unless the client explicitly requires them for launch.

---

# 55. Architectural Principles

1. **Modular monolith first.**
2. **PostgreSQL for transactional data.**
3. **Sanity for editorial content.**
4. **Private S3 for sensitive documents.**
5. **NestJS for backend business logic.**
6. **Next.js for public and authenticated UI.**
7. **RBAC plus resource-level authorization.**
8. **Every sensitive action is auditable.**
9. **Payment state comes from verified server-side webhooks.**
10. **Background work goes through queues.**
11. **Do not introduce microservices until scale or team boundaries justify them.**
12. **Do not implement legal workflows without approved requirements.**
13. **Keep business rules out of UI components.**
14. **Design for extensibility, not hypothetical scale.**
15. **Treat case data and documents as sensitive by default.**

---

# 56. Final Architecture Decision

### Recommended stack

```text
┌──────────────────────────────────────────┐
│                  FRONTEND                │
│ Next.js + TypeScript + Tailwind + React │
│ shadcn/ui + Framer Motion + GSAP        │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│                   API                    │
│        NestJS + TypeScript + REST       │
└────────────────────┬─────────────────────┘
                     │
        ┌────────────┼─────────────┐
        ▼            ▼             ▼
 PostgreSQL       Redis           S3
  + Prisma       BullMQ        Private Files
        │
        └──────────────────────────────┐
                                       │
                                       ▼
                                   Sanity CMS

External:
- Razorpay
- Resend
- SMS provider
- LiveKit if online mediation is confirmed
- Cloudflare
- Sentry
```

### Core architectural choice

**Do not start with microservices.**

Start with:

> **Modular monolith + background worker**

and maintain clear domain boundaries inside NestJS.

If Medar eventually becomes a large platform with separate engineering teams, high case volume, or independent scaling requirements, individual domains can be extracted into services later.

---

# 57. Critical Next Step

Before writing the Prisma schema or API controllers, obtain a **functional requirements document** from Medar.

At minimum, ask them to define:

```text
1. All user roles
2. What each role can do
3. Complete enrollment workflow
4. Membership eligibility rules
5. Mediator verification workflow
6. Empanelment workflow
7. Case filing workflow
8. Mediator assignment workflow
9. Case status lifecycle
10. Document types and access rules
11. Payment/refund rules
12. Corporate workflow
13. Whether online mediation is required
14. Whether community/forums are required
15. Admin workflow
16. Notification requirements
17. Required integrations
18. Launch scope / MVP
```

**Do not let the visual design become the product specification.** The PDF tells you what Medar wants to present and the broad platform pillars; it does not define every backend behavior.

---

## Architecture maturity target

The project should evolve like this:

```text
                 CURRENT
                    │
                    ▼
        Design / Product Discovery
                    │
                    ▼
             Architecture
                    │
                    ▼
             Modular Monolith
                    │
                    ▼
        Production Platform / MVP
                    │
                    ▼
       Scale only where necessary
                    │
                    ▼
       Extract individual services
       only when there is a reason
```

**Recommended first implementation:** Next.js + NestJS + PostgreSQL/Prisma + Redis/BullMQ + S3 + Sanity + Razorpay + Resend, deployed with Vercel for the frontend and AWS/managed infrastructure for the backend/data layer.
