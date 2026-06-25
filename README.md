# README

## Project Overview
LockerRoom is a **private family sports video vault**. Families can securely upload, store, and stream their sports memories (games, practices, highlights) in a personal, invitation‑only archive. The app removes all SaaS‑style marketing (pricing tiers, testimonials, etc.) and focuses on a premium, cinematic experience.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via Shadcn UI primitives)
- **Auth**: Clerk
- **Video Hosting**: Mux (HLS streaming, video asset management)
- **Database**: PostgreSQL on Neon (via Prisma ORM)
- **State Management**: Server Actions + React Server Components
- **UI Components**: Shadcn UI, TanStack Table, Sonner (toasts)
- **Deployment**: Vercel (Edge Functions)

## Prerequisites
1. **Node.js** (>= 20) and **npm** (or pnpm/yarn)
2. **PostgreSQL** database (Neon recommended)
3. **Clerk** account (for authentication)
4. **Mux** account (for video upload & streaming)
5. **Git** for version control

## Getting Started
```bash
# Clone the repository
git clone <repo-url>
cd next-app

# Install dependencies
npm install   # or pnpm install / yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in the values (see below)

# Set up the database
npx prisma migrate dev --name init   # creates tables in Neon

# Run the development server
npm run dev
```
Open http://localhost:3000 in your browser.

## Environment Variables
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (client side) |
| `CLERK_SECRET_KEY` | Clerk secret key (server side) |
| `MUX_TOKEN_ID` | Mux API token ID |
| `MUX_TOKEN_SECRET` | Mux API token secret |
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `NEXT_PUBLIC_MUX_PLAYBACK_ID` | Optional default playback ID for testing |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the deployed app (e.g., https://lockerroom.vercel.app) |

## Scripts
- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Run production build locally
- `npm run lint` – Lint with ESLint
- `npm run test` – Run Vitest unit/component/integration tests
- `npm run test:e2e` – Run Playwright end‑to‑end tests

## Directory Structure
```
app/                # Next.js App Router pages
  api/              # API routes (webhooks, server actions)
  admin/            # Admin dashboard
  dashboard/        # Guest dashboard
  watch/             # Video playback page
components/         # Reusable UI components
  admin/            # Admin‑specific components (table, forms)
  landing/          # Landing page components (header, hero, etc.)
  video/            # Video card, player, search & filter UI
lib/                # Utility functions (auth, prisma client)
prisma/             # Prisma schema and migrations
public/             # Static assets (fonts, icons)
styles/             # Global CSS (tailwind config)
```

## Deployment (Vercel)
1. Connect the repo to Vercel.
2. Set the same environment variables in the Vercel dashboard.
3. Vercel will run `npm run build` and deploy automatically.

## Testing
- **Unit/Component/Integration tests** are located in `__tests__/` and run with Vitest.
- **E2E tests** are in `e2e/` and run with Playwright.

## Troubleshooting
- **Database errors**: Ensure `DATABASE_URL` points to a reachable Neon instance.
- **Mux errors**: Verify `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET` are correct and have upload permissions.
- **Clerk auth issues**: Check that the Clerk keys match your Clerk application.
- **Missing env variables**: The app will log missing variables at startup.

---

*For more detailed architecture, see `ARCHITECTURE.md`.*
