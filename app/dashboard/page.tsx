import prisma from "@/lib/prisma";
import { MediaRow } from "@/components/video/media-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, Search } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export const unstable_instant = {
  prefetch: "static",
  samples: [
    {
      searchParams: {
        sport: null,
        q: null,
      },
    },
  ],
};

interface PageProps {
  searchParams?: Promise<{ sport?: string; q?: string }>;
}

// Cached function to fetch completed, stream-ready video records
async function getVideos() {
  "use cache";
  return prisma.video.findMany({
    where: {
      NOT: {
        muxPlaybackId: { startsWith: "pending_" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function DashboardPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="bg-transparent min-h-screen pb-16 animate-pulse">
      {/* Top Navigation & Search Bar Skeleton */}
      <header className="h-16 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/[0.02] bg-transparent backdrop-blur-sm sticky top-0 z-20 gap-4 mb-6">
        <div className="h-4 w-32 bg-slate-800 rounded" />
        <div className="w-full max-w-xs sm:max-w-sm h-8 bg-slate-800/60 rounded-xl" />
      </header>

      {/* Hero Banner Skeleton */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-2xl border border-white/[0.02] flex items-end p-6 sm:p-10">
          <div className="space-y-3 w-full max-w-xl">
            <div className="h-4 w-28 bg-slate-800 rounded" />
            <div className="h-8 w-3/4 bg-slate-800 rounded" />
            <div className="h-4 w-5/6 bg-slate-800 rounded" />
            <div className="h-10 w-32 bg-slate-800 rounded-xl pt-2" />
          </div>
        </div>
      </div>

      {/* Rows Skeleton */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-800 rounded" />
              <div className="h-3 w-60 bg-slate-800/60 rounded" />
            </div>
            <div className="flex gap-5 overflow-hidden">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-3 shrink-0 w-[280px] sm:w-[320px]">
                  <div className="relative aspect-video rounded-xl bg-slate-950 border border-white/[0.04]" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-slate-800 rounded" />
                    <div className="h-3 w-1/2 bg-slate-800/60 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

async function DashboardContent({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedSport = resolvedSearchParams.sport;
  const searchQuery = resolvedSearchParams.q;

  const allVideos = await getVideos();

  // Filter video list based on sidebar selection & search query
  let filteredVideos = allVideos;
  if (selectedSport) {
    filteredVideos = filteredVideos.filter(
      (v) => v.sport.toLowerCase() === selectedSport.toLowerCase()
    );
  }
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredVideos = filteredVideos.filter(
      (v) =>
        v.title.toLowerCase().includes(query) ||
        (v.description && v.description.toLowerCase().includes(query)) ||
        v.team.toLowerCase().includes(query) ||
        v.sport.toLowerCase().includes(query) ||
        v.year.toLowerCase().includes(query)
    );
  }

  // Extract separate category partitions cleanly for layout segregation
  const featuredVideo = filteredVideos[0];
  const hockeyVideos = filteredVideos.filter(
    (v) => v.sport.toLowerCase() === "hockey",
  );
  const baseballVideos = filteredVideos.filter(
    (v) => v.sport.toLowerCase() === "baseball",
  );
  const otherVideos = filteredVideos.filter(
    (v) =>
      v.sport.toLowerCase() !== "hockey" &&
      v.sport.toLowerCase() !== "baseball",
  );

  return (
    <div className="bg-transparent min-h-screen pb-16">
      {/* Top Navigation & Search Bar */}
      <header className="h-16 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/[0.02] bg-transparent backdrop-blur-sm sticky top-0 z-20 gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Vault Collection</span>
          {selectedSport && (
            <>
              <span className="opacity-30">•</span>
              <span className="text-blue-400">{selectedSport}</span>
            </>
          )}
        </div>

        {/* Minimal Search form */}
        <form action="/dashboard" method="GET" className="relative w-full max-w-xs sm:max-w-sm">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery || ""}
            placeholder="Search titles, teams, or years..."
            className="w-full bg-[#111726]/40 border border-white/[0.04] text-white placeholder-slate-500 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
          {selectedSport && <input type="hidden" name="sport" value={selectedSport} />}
        </form>
      </header>

      {/* Top Banner Hero Section */}
      {featuredVideo ? (
        <div className="px-6 max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/[0.02]">
            {/* Displaying an ultra widescreen poster image overlay natively mapped from Mux asset endpoints */}
            <Image
              src={`https://image.mux.com/${featuredVideo.muxPlaybackId}/thumbnail.webp?time=5&width=1200`}
              alt={featuredVideo.title}
              className="object-cover w-full h-full opacity-50 blur-[0.3px]"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            {/* Dark gradient fade for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070a13]/80 via-[#070a13]/10 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-10 space-y-3 sm:space-y-4 max-w-xl text-white">
              <span className="inline-flex text-[9px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10 backdrop-blur-sm">
                Featured Game Archive
              </span>
              <h1 className="text-xl sm:text-3.5xl font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
                {featuredVideo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 font-medium">
                {featuredVideo.description ||
                  "Historical sports video asset preserved cleanly inside your digital family locker room."}
              </p>
              <div className="pt-2">
                <Link href={`/watch/${featuredVideo.id}`}>
                  <Button className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-xs">
                    <Play className="w-3.5 h-3.5 mr-2 fill-slate-950 text-slate-950" />{" "}
                    Stream Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 text-slate-400 max-w-md mx-auto text-sm px-6">
          <div className="h-16 w-16 rounded-full bg-slate-950 border border-white/[0.03] flex items-center justify-center mx-auto mb-4 text-xl shadow-inner">
            🔒
          </div>
          <p className="font-bold text-white text-lg mb-1">
            No video records found.
          </p>
          <p className="text-slate-500 text-xs">
            {searchQuery
              ? `No matches for "${searchQuery}" in your vault. Try adjusting your search query.`
              : "No media matching your selection. Navigate over to the Admin workspace to upload your first sports video archive track."}
          </p>
        </div>
      )}

      {/* Horizontal Collections Container Tracks */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {(!selectedSport || selectedSport.toLowerCase() === "hockey") && (
          <MediaRow
            title="Hockey Vault"
            description="Ice match archives, championships and season reels."
            videos={hockeyVideos}
          />
        )}
        {(!selectedSport || selectedSport.toLowerCase() === "baseball") && (
          <MediaRow
            title="Baseball Diamonds"
            description="Summer regular seasons and tournament runs."
            videos={baseballVideos}
          />
        )}
        {!selectedSport && otherVideos.length > 0 && (
          <MediaRow
            title="Uncategorized Footage"
            description="Miscellaneous sports games and historical family tape transfers."
            videos={otherVideos}
          />
        )}
      </main>
    </div>
  );
}
