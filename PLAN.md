# Implementation Plan - Project "LockerRoom"

This phased implementation roadmap minimizes architectural complexity by building out core authentication and full-stack video rendering before refining data structures.

## Phase 1: Foundations & Architecture Setup

- Initialize Next.js App Router workspace with TypeScript and Tailwind CSS.
- Configure Shadcn UI components and global fonts (Inter or Plus Jakarta Sans).
- Integrate Clerk Auth middleware to lock down all client paths, separating Admin and Guest schemas.
- Set up Prisma or Drizzle ORM with your preferred database (e.g., PostgreSQL / Supabase) to model video records.

## Phase 2: Managed Video Pipe Integration

- Establish developer environment accounts with Cloudflare Stream or Mux.
- Build a secure API Route handler in Next.js to fetch direct upload signing URLs from your video provider.
- Implement a simple file upload test block to verify raw media smoothly moves from client directly to the media cloud provider.

## Phase 3: Admin Workspace & Data Entry

- Construct the `/admin` workspace using TanStack Table (Shadcn Data Table component).
- Implement standard CRUD operations: Create, Read, Update, Delete for video rows.
- Build out the manual metadata entry sheet, specifically formatting string inputs for timestamp highlights into structured arrays (e.g., `[{ time: "14:20", label: "3rd Period Goal" }]`).

## Phase 4: Guest Streaming Hub & Search

- Design the Netflix-style streaming homepage with a featured top banner asset.
- Construct horizontal multi-item carousel track layouts utilizing Tailwind utility classes.
- Write search utilities filtering dynamic state over Sport, Year, Team, and Jersey keys.

## Phase 5: Advanced Video View & Timeline Seeks

- Deploy an HLS-compatible client player component (e.g., using `hls.js` natively or `react-player`).
- Wire highlight elements to fire imperative state methods changing the video window `currentTime` property directly on click.
- Conduct cross-device optimization sweeps to ensure optimal streaming experiences on tablet and mobile viewports.
