# AGENTS.md

## Monorepo

- **pnpm** 9.15 workspaces (`apps/*`, `packages/*`)
- **Turbo** build orchestrator (`turbo run typecheck`, `turbo run build`, `turbo run dev`)
- Node >= 24

## Global Commands

| Command | What it does |
|---------|-------------|
| `pnpm turbo run typecheck` | Full-project TypeScript check |
| `pnpm turbo run build` | Full-project build |
| `pnpm turbo run dev` | Start all dev servers |
| `pnpm turbo run lint` | Run linters across all packages |

---

## apps/web — Frontend PWA

### Stack

- **Next.js 15** + React 19 + Tailwind v4
- **@tanstack/react-query** for server state
- **better-auth** client for auth
- **@serwist/next** for PWA service worker
- **Lucide** icons, **Radix UI** primitives
- Fonts: **Plus Jakarta Sans** (display, 700–800) + **Be Vietnam Pro** (body, 400–600)

### CSS Class vs Tailwind Segregation (hard rules)

- **Custom CSS class (globals.css)** — use when a style pattern:
  - Repeats 2+ times across components/pages
  - Has 4+ properties that always travel together
  - Carries semantic meaning (state variants like `.card-active`, named components like `.meal-top`)
  - Has nested selectors, pseudo-elements, keyframe animations, or browser-specific CSS
- **Inline Tailwind utilities** — use when a style is:
  - A one-off layout tweak used in only 1 place
  - 1-3 simple properties (padding, margin, flex, color, font-size)
  - Not semantically meaningful enough to name
- **Never** create a custom class for a single-use padding wrapper or trivial flex container.
- **Never** leave a 5+ utility chain inline if it repeats 2+ times — extract it.

### Design System (hard rules)

- **ALWAYS** load `skill:kya-khana-design-system` before editing any `.tsx`/`.css`/`.ts` under `apps/web/src/`
- **ALWAYS** load `skill:frontend-design` when building new components or pages
- **ALWAYS** load `skill:shadcn-ui` when creating, modifying, or composing UI components
- Tokens are in `globals.css` (`@theme` directives): bg `#FBF5EC`, accent `#E65100`, ink `#2A211B`, muted `#8C8076`, line `#EDE3D6`
- Spacing uses **4px grid**. Device width is **390px**.
- Shadows must be **warm brown tint** — never grey/black.
- If no DS screen HTML exists for a page, read the **closest existing screen** (`Dashboard.html`, `More.html`, `Inventory.html`) and derive layout patterns from it.
- If anything is uncertain (layout structure, spacing, component shape), **ASK the user** before writing code.

### API Calls

- Use `apiFetch(path, init?)` from `@/lib/api` for raw fetch calls (credentials included automatically).
- Use `api.get<T>()`, `api.post<T>()`, `api.patch<T>()`, `api.delete<T>()` for typed calls.
- **Never use raw `fetch`** — always go through `@/lib/api`.
- Auth: `authClient.signIn.email()`, `authClient.signUp.email()` from `@/lib/auth`.
- Me endpoint: `api.get("/auth/me")` → `{ onboarded: boolean }`.
- Auth flow: not authenticated → `/login`, not onboarded → `/onboarding`, onboarded → `/`.

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard (protected) |
| `/welcome` | Landing / marketing page |
| `/login` | Sign in (email or mobile tabs, Google button placeholder) |
| `/signup` | Create account |
| `/forgot-password` | Dummy password reset flow |
| `/onboarding` | Multi-step role/cuisine setup |
| `/cook` | Cook / deduction view |

### Component Patterns

- **Screens**: `components/screens/` — `DashboardScreen`, `InventoryScreen`, `MoreScreen`
- **UI primitives**: `components/ui/` — `AppHeader`, `BottomNav`, `MealCard`, `Button`, `Input`, `Label`, etc.
- **Auth pages** use `.auth-page`, `.auth-card`, `.auth-input`, `.auth-btn`, `.auth-label`, `.auth-link`, `.auth-wordmark`, `.auth-subtitle` classes from `globals.css`.
- **Hooks**: `@/lib/hooks.ts` — `useMealsFeed()`, `useVote()`, `useInventory()`, `useMe()`, `useOnboarding()`, etc. (all TanStack Query hooks)

### Build

| Command | What |
|---------|------|
| `pnpm --filter=@kya-khana/web run dev` | Start dev server |
| `pnpm --filter=@kya-khana/web run build` | Production build |
| `pnpm --filter=@kya-khana/web run typecheck` | TS check |
| `pnpm --filter=@kya-khana/web run lint` | ESLint |

---

## apps/api — Backend

### Stack

- **Fastify** 5.x
- **better-auth** with email/password + Prisma adapter
- **Prisma** (PostgreSQL) via `@kya-khana/db`
- Business logic in `@kya-khana/core`
- Shared types in `@kya-khana/types`

### Auth

- `BETTER_AUTH_SECRET` env var required (generate: `openssl rand -hex 32`)
- Base path: `/api/auth/*`
- User additional fields: `role` (`"housemate"` | `"cook"`), `householdId`
- Onboarding endpoint: `POST /auth/onboarding`

### Build

| Command | What |
|---------|------|
| `pnpm --filter=@kya-khana/api run dev` | Start dev server |
| `pnpm --filter=@kya-khana/api run typecheck` | TS check |
| `pnpm --filter=@kya-khana/api run build` | Production build |

---

## packages/core

Shared business logic (framework-agnostic):

- `auth.ts`, `voting.ts`, `suggestions.ts`, `scheduling.ts`, `grocery.ts`, `push.ts`, `times.ts`

---

## packages/db

Prisma client and database access. All DB schemas and queries live here.

---

## packages/types

Shared TypeScript types across `apps/api` and `apps/web`. Single source of truth for DTOs.

---
