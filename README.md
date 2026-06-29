# Kya Khana

Meal planning for shared households — decide what to eat, vote, track groceries.

In a shared household with 3–4 housemates and one cook, two daily decisions keep recurring with friction:

1. **What to eat** — disagreement, last-minute chaos, no structured decision process
2. **What groceries are needed** — ingredients are missing when the cook arrives, ad-hoc store runs

Kya Khana solves both by:

- Suggesting **complete meal combos** built from user-defined food components
- Letting housemates vote on which combo to have
- Auto-computing the grocery gap between all chosen dishes and current inventory
- Producing a shareable grocery list — all before the cook arrives

## Stack

| Layer    | Tech                           |
| -------- | ------------------------------ |
| Frontend | Next.js 15, React 19, Tailwind |
| Backend  | Fastify, Better Auth           |
| Database | PostgreSQL + Prisma            |
| Monorepo | pnpm workspaces + Turborepo    |

## Prerequisites

- **Node.js ≥ 24**
- **pnpm ≥ 9.15** (included via `packageManager` in `package.json`, enable with `corepack enable`)
- **PostgreSQL** (local or remote)

## Project Structure

```
kya-khana/
├── apps/
│   ├── api/          # Fastify backend (port 4000)
│   └── web/          # Next.js frontend (port 3000)
├── packages/
│   ├── db/           # Prisma client + schema + seed
│   ├── types/        # Shared TypeScript types
│   └── core/         # Business logic (combos, voting, inventory)
└── docs/             # Design docs, PRD, seed-data.json
```

## Setup

### 1. Install dependencies

```bash
corepack enable
pnpm install
```

### 2. Set up environment variables

**`packages/db/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kya-khana"
```

**`apps/api/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kya-khana"
BETTER_AUTH_SECRET="your-secret-here"
# Optional: BETTER_AUTH_URL=http://localhost:4000
# Optional: PORT=4000
```

Generate a secret with:

```bash
openssl rand -hex 32
```

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Set up the database

#### Option A: Docker (quickest)

```bash
# Create and start PostgreSQL container (one-time)
docker run -d --name kya-khana-db \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -p 5432:5432 \
  postgres:18

# Create the database
docker exec -i kya-khana-db createdb -U postgres kya-khana

# After reboots, just start the existing container:
docker start kya-khana-db
```

Use this `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/kya-khana"
```

#### Option B: Local PostgreSQL

```bash
# Push the schema to your PostgreSQL
pnpm -F @kya-khana/db db:push

# Seed with sample data (4 users, 40 dishes, inventory)
pnpm -F @kya-khana/db db:seed
```

### 4. Start the app

```bash
# Start both API and Web in dev mode
pnpm dev
```

- **Frontend** → <http://localhost:3000>
- **API** → <http://localhost:4000>
- **Health check** → <http://localhost:4000/health>

## Seeded Accounts

| Name         | Email              | Password    | Role      |
| ------------ | ------------------ | ----------- | --------- |
| Cook Bhaiya  | <cook@example.com>   | password123 | cook      |
| Housemate 1  | <hm1@example.com>    | password123 | housemate |
| Housemate 2  | <hm2@example.com>    | password123 | housemate |
| Housemate 3  | <hm3@example.com>    | password123 | housemate |

New signups default to the `housemate` role. Role is sticky — cannot be changed after onboarding.

## Useful Commands

```bash
pnpm dev          # Start all apps in dev mode
pnpm build        # Build all packages and apps
pnpm typecheck    # Type-check everything
pnpm lint         # Lint everything

# Database
pnpm -F @kya-khana/db db:push     # Push schema changes to DB
pnpm -F @kya-khana/db db:studio   # Open Prisma Studio (DB GUI)
```

## Design Docs

- [PRD](docs/PRD.md)
- [Design System](docs/kya-khana-design-system/)
- [Food List](docs/foodlist.md)
