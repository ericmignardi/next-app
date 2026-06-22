# LockerRoom 🚀

LockerRoom is a premium, private full-stack web application designed to host, catalog, and preserve historical family sports game footage. Built with a minimal, high-end Apple/Google inspired aesthetic, it gives family members instant access to high-fidelity, buffer-free HLS streaming video complete with custom interactive game highlight markers.

## Tech Stack Overview

- **Frontend Framework:** Next.js (App Router)
- **Styling & UI:** Tailwind CSS, Shadcn UI
- **Type Safety:** TypeScript
- **Authentication:** Clerk (Strict Guest Wall & Role Enforcement)
- **Video Infrastructure:** Cloudflare Stream / Mux (Managed HLS Pipeline)
- **Database ORM:** Drizzle / Prisma ORM

## Key Technical Paradigms

### Dynamic HTTP Live Streaming (HLS)

Rather than serving dense, monolithic raw media files directly to browsers (causing immense layout lag and infinite network buffering), LockerRoom uploads videos straight to an edge-optimized service provider. The files are transcoded instantly into specialized adaptive bitrate playlists (`.m3u8`). This guarantees maximum source quality playback while automatically scaling down delivery seamlessly mid-stream if a user has a fluctuating mobile signal.

### Structured Timeline Seeking

Every video includes a manual metadata array capturing highlight coordinates. The custom player framework syncs these text coordinates directly to the HTML5 video instance context, permitting viewers to click any event marker and skip precisely to that frame of the game.

## Environmental Configuration

Prepare an `.env.local` containing the following environment flags before initiating local runs:

```env
# Database Credentials
DATABASE_URL="your-postgresql-connection-string"

# Clerk Access Configurations
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-pub-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Video Infrastructure Secret Tokens
VIDEO_PROVIDER_API_KEY="your-cloudflare-or-mux-key"
VIDEO_PROVIDER_ACCOUNT_ID="your-provider-id"
```
