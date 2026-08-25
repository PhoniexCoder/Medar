# Medar Platform

> The professional home for mediation in Asia.

Medar is a professional mediation and Alternative Dispute Resolution (ADR) ecosystem connecting education, membership, mediator credentialing, empanelment, case intake, and corporate ADR services.

---

## 1. Monorepo Architecture

This project is organized as a Turborepo monorepo using `pnpm`:

```text
medar/
├── apps/
│   ├── web/                    # Next.js 15 App (Public Website + App + Admin)
│   ├── api/                    # NestJS API Backend (Domain-oriented modules)
│   └── worker/                 # BullMQ Background Job Processing Worker
│
├── packages/
│   ├── ui/                     # Shared React UI Component Library (@medar/ui)
│   ├── types/                  # Shared TypeScript Interfaces & DTO Types (@medar/types)
│   ├── validation/             # Shared Zod Schemas (@medar/validation)
│   ├── config/                 # Shared Configuration & Constants (@medar/config)
│   ├── eslint-config/          # Shared ESLint Configuration (@medar/eslint-config)
│   └── tsconfig/               # Shared TypeScript Configurations (@medar/tsconfig)
│
├── prisma/
│   ├── schema.prisma           # Master PostgreSQL Data Model
│   └── seed.ts                 # Database Seeding Script
│
├── docs/                       # Technical Specifications & Workflow Diagrams
├── scripts/                    # Utility & Deployment Scripts
├── docker-compose.yml          # Local PostgreSQL & Redis Infrastructure
├── turbo.json                  # Turborepo Pipeline Config
└── pnpm-workspace.yaml         # Workspace Package Resolution
```

---

## 2. Prerequisites

Ensure you have the following installed on your machine:
- Node.js 20+
- pnpm (v10+)
- Docker Desktop (for PostgreSQL & Redis)

---

## 3. Getting Started & Development Commands

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Local Infrastructure (PostgreSQL & Redis)
```bash
docker compose up -d
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```

### 4. Database Setup (Prisma)
Generate the Prisma Client:
```bash
pnpm prisma:generate
```

Run Database Migrations:
```bash
pnpm prisma:migrate
```

Seed Development Data:
```bash
pnpm prisma:seed
```

### 5. Build, Lint, Typecheck & Run Workspace

Run all applications in development mode:
```bash
pnpm dev
```

Build all apps and packages:
```bash
pnpm build
```

Run ESLint across all apps and packages:
```bash
pnpm lint
```

Run TypeScript Typecheck across all apps and packages:
```bash
pnpm typecheck
```

---

## 4. Application Ports

- **Web Frontend**: `http://localhost:3000`
- **NestJS API**: `http://localhost:4000/api/v1`
- **API Health Check**: `http://localhost:4000/api/v1/health`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
