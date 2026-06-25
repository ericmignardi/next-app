# LockerRoom 📹

LockerRoom is a **private family sports video vault** built to securely archive, index, and stream family sports memories. Families can digitize historical footage (games, practices, championships, highlights) and view them in a private, invitation‑only cinematic web application. 

By design, LockerRoom strips away all commercial SaaS elements—such as pricing matrices, feature tables, and marketing testimonials—in favor of a clean, premium, Apple‑inspired dark‑mode user interface.

---

## 🚀 Key Features

* **Invitation‑Only Privacy**: Complete application locking behind [Clerk](https://clerk.com) authentication. Unauthenticated requests are blocked, ensuring memories remain secure.
* **Direct‑to‑Mux Video Uploads**: Scalable uploads bypass serverless limits by transmitting video bytes directly from the user's browser to [Mux](https://mux.com) using signed secure upload parameters.
* **Cinematic Adaptive Bitrate Streaming**: Optimized video streaming using HLS protocol powered by Mux and `@mux/mux-player-react`.
* **Interactive Timeline Highlights**: Ability to index specific timestamps (e.g., `12:40` - `Opening Goal`) so viewers can instantly seek to key moments of the game.
* **Dynamic Collections & Search**: Automatic segregation into sports categories (e.g. "Hockey Vault", "Baseball Diamonds") with a global search that indexes title, year, team, and description.
* **Admin Dashboard & Bulk Cleanup**: Full metadata editing capabilities and robust multi-select bulk deletions that cancel pending Mux uploads and remove encoded assets concurrently.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Database & ORM**: [PostgreSQL (Neon)](https://neon.tech/) & [Prisma Client](https://www.prisma.io/)
* **Authentication**: [Clerk Core Middleware](https://clerk.com/)
* **Video Management**: [Mux Video Engine](https://mux.com/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
* **Unit & Component Testing**: [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/)
* **End-to-End Testing**: [Playwright](https://playwright.dev/)

---

## 💻 Getting Started

### Prerequisites
* **Node.js** (v20 or higher)
* **npm** (or pnpm / yarn)
* Active accounts for **Clerk**, **Mux**, and **Neon** (or local PostgreSQL)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd next-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:password@neon-host/dbname?sslmode=require"

   # Clerk Auth Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Mux Integration Keys
   MUX_TOKEN_ID=your_mux_token_id
   MUX_TOKEN_SECRET=your_mux_token_secret
   MUX_WEBHOOK_SECRET=your_mux_webhook_secret

   # Application Base URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Initialize Database Schema**
   Deploy the database tables and generate the local Prisma Client:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## ⚡ Webhook Integrations

To synchronize user auth data and video assets, you must configure Clerk and Mux webhook events.

### 1. Clerk Webhooks (Auth Syncing)
* **Goal**: Synchronize Clerk sign-ups, profile updates, and account deletions to the PostgreSQL database.
* **Webhook Endpoint**: `http://<your-domain>/api/webhooks/clerk`
* **Subscribed Events**:
  * `user.created`
  * `user.updated`
  * `user.deleted`

### 2. Mux Webhooks (Video Processing Syncing)
* **Goal**: Catch the finished, trans-encoded HLS asset keys and duration once a user finishes uploading a video.
* **Webhook Endpoint**: `http://<your-domain>/api/webhooks/mux`
* **Subscribed Events**:
  * `video.asset.ready`
* **Local Webhook Testing**: Use the Mux CLI or a proxy tunneling service like `ngrok` or `localtunnel` to route webhooks back to your local server.

---

## 🧪 Running Tests

The application utilizes a dual testing framework separating unit/component logic from end-to-end user browser interactions.

### Unit, Component & Integration Tests (Vitest)
Unit, component, and integration tests are isolated within the `__tests__` directory and run via **Vitest**.
```bash
# Run tests once
npm run test

# Run tests in watch/development mode
npm run test:watch

# Generate code coverage reports
npm run test:coverage
```

### End-to-End Tests (Playwright)
Browser-level user flows are isolated within the `e2e` directory and run via **Playwright**.
```bash
# Install browsers (first time setup)
npm run test:e2e:install

# Run E2E tests headless
npm run test:e2e

# Run E2E tests in Playwright interactive UI mode
npm run test:e2e:ui
```

---

## 📂 Directory Structure

```
.
├── __tests__/             # Unit, component, and integration test specs
│   ├── component/         # React Testing Library component tests
│   ├── integration/       # API and system flow tests
│   └── unit/              # Pure functions and logic unit tests
├── actions/               # Next.js Server Actions (upload, updates, bulk deletions)
├── app/                   # Next.js App Router root layout and routing nodes
│   ├── api/               # API Router folders (Upload handlers, Webhooks)
│   ├── admin/             # Video cataloging & list manager views
│   ├── dashboard/         # Viewer grid, categories and search dashboards
│   ├── watch/             # Streaming page with highlights sidepanel
│   └── layout.tsx         # Global provider bindings (Clerk, Sonner toaster)
├── components/            # UI Components grouped by workspace
│   ├── admin/             # Upload forms, edit modules, and database tables
│   ├── landing/           # Landing page elements (headers, footers)
│   ├── ui/                # Shared base components (dialogs, buttons, inputs)
│   └── video/             # Playback players, cards, and row carousels
├── e2e/                   # Playwright E2E browser specs
├── lib/                   # Shared client initializers (Prisma, Axios, Mux Client)
├── prisma/                # Database configuration and migrations
└── vitest.setup.ts        # Global setup definitions for Vitest environment
```

---

## 🛡️ Troubleshooting

* **Vercel Edge Functions Timeout**: Large video file uploads might trigger execution timeout limits. Ensure the client upload form is performing direct-to-Mux upload calls instead of posting files back to local Next.js API route endpoints.
* **Missing Video Details**: If your video appears as a spinner indefinitely, verify that your local development proxy (e.g. `ngrok`) is successfully routing `video.asset.ready` events from Mux to your `/api/webhooks/mux` endpoint.
* **Database Outages**: Verify your `DATABASE_URL` uses `sslmode=require` when connecting to Neon.

*For details on the project requirements and feature design specs, read the [Product Requirements Document](file:///c:/Users/migna/OneDrive/Desktop/next-app/PRD.md).*
