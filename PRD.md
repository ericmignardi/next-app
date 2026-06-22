# Product Requirements Document (PRD) - Project "LockerRoom"

## 1. Executive Summary

LockerRoom is a private, full-stack video streaming and archiving web application designed specifically for hosting, organizing, and playing back historical family sports footage (hockey, baseball, etc.). The platform preserves the absolute highest quality of the original footage using industry-standard HTTP Live Streaming (HLS) without complex infrastructure setup. It features a streaming-style interface for authenticated family members and a robust admin data table for content management.

## 2. User Personas

- **The Creator/Admin (You):** Digitizes, uploads, and manually manages the extensive catalog of sports videos and metadata via a structured admin dashboard.
- **The Guest Viewer (Family Members):** Logs in securely to browse historical footage across rows, filter by specific metadata, and jump straight to key match highlights.

## 3. Core Features & Scope

### 3.1 Authentication & Authorization (Clerk)

- **Strict Guest Wall:** The entire platform sits behind an authentication gate. Unauthenticated users cannot see any media.
- **Role-Based Access Control (RBAC):**
  - `GUEST` role can view, search, and navigate timeline highlights.
  - `ADMIN` role has exclusive access to the `/admin` path and write mutations.

### 3.2 Media Delivery & Streaming (Managed HLS)

- **No Custom Compressions:** Uses an industry-standard managed platform API (e.g., Cloudflare Stream or Mux) to manage video hosting and dynamic transcoding.
- **High Fidelity Playback:** Delivers buffer-free stream streaming using a customizable video player framework (e.g., Video.js or Shaka Player) running `.m3u8` playlists.

### 3.3 Media Discovery Layout (Streaming Archetype)

- **Featured Hero Layout:** Top banner features a prominent high-resolution video.
- **Horizontal Classification Rows:** Videos sorted contextually by Sport Type, Era, or Season rows.
- **Granular Filters:** Sidebar or panel supporting filters for Year/Season, Team, Game Type (Playoffs, Regular Season), Jersey Number, and Highlights.

### 3.4 Interactive Playback Markers

- **Timestamp Highlight Indexing:** Metadata stores structural moments tied to timestamps.
- **Deep-Linking Player Seek:** Clicking a highlight component natively shifts the video player playhead to the indexed timestamp.

### 3.5 Admin Dashboard

- **Data Table Architecture:** A powerful, search-optimized spreadsheet-style grid listing all assets.
- **Metadata Creation Suite:** Simple asset creation forms capturing:
  - Title, Description
  - Sport, Year, Team Name, Game Type, Jersey Number
  - Array of key highlights with custom text and timestamp coordinates.

## 4. Future Enhancements (Out of Scope)

- Social interaction components (Comments, emojis, clips).
- AI automatic thumbnail or tag generation.
