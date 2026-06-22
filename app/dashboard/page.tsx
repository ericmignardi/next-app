import prisma from "@/lib/prisma";
import { MediaRow } from "@/components/video/media-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, Shield } from "lucide-react";

export const revalidate = 0; // Ensure new uploads show up instantly without page caching lags

export default async function DashboardPage() {
  // Fetch all completed, stream-ready video records
  const allVideos = await prisma.video.findMany({
    where: {
      NOT: {
        muxPlaybackId: { startsWith: "pending_" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Extract separate category partitions cleanly for layout segregation
  const featuredVideo = allVideos[0];
  const hockeyVideos = allVideos.filter(
    (v) => v.sport.toLowerCase() === "hockey",
  );
  const baseballVideos = allVideos.filter(
    (v) => v.sport.toLowerCase() === "baseball",
  );
  const otherVideos = allVideos.filter(
    (v) =>
      v.sport.toLowerCase() !== "hockey" &&
      v.sport.toLowerCase() !== "baseball",
  );

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* 1. Global Minimalist Navigation Layout Bar */}
      <header className="border-b border-slate-100 px-6 h-16 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <span className="font-bold tracking-tight text-slate-900 text-lg sm:text-xl">
          LockerRoom<span className="text-blue-600 font-black">.</span>
        </span>
        <Link href="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-950 font-medium"
          >
            <Shield className="w-4 h-4 mr-2" /> Admin Panel
          </Button>
        </Link>
      </header>

      {/* 2. Top Banner Hero Section (Apple Photos / Streaming Variant) */}
      {featuredVideo ? (
        <div className="px-6 pt-6 max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            {/* Displaying an ultra widescreen poster image overlay natively mapped from Mux asset endpoints */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://image.mux.com/${featuredVideo.muxPlaybackId}/thumbnail.webp?time=5&width=1200`}
              alt={featuredVideo.title}
              className="object-cover w-full h-full opacity-70 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-10 space-y-2 sm:space-y-4 max-w-xl text-white">
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 backdrop-blur-sm">
                Latest Archive Upload
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
                {featuredVideo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 font-medium">
                {featuredVideo.description ||
                  "Historical sports video asset preserved cleanly inside your digital family locker room."}
              </p>
              <div className="pt-2">
                <Link href={`/watch/${featuredVideo.id}`}>
                  <Button className="bg-white hover:bg-slate-100 text-slate-950 font-semibold px-5 shadow transition-all">
                    <Play className="w-4 h-4 mr-2 fill-slate-950 text-slate-950" />{" "}
                    Stream Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 text-slate-400 max-w-md mx-auto text-sm px-6">
          <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4">
            🔒
          </div>
          <p className="font-semibold text-slate-800 text-base mb-1">
            Your vault is currently empty.
          </p>
          <p className="text-slate-400 text-xs">
            Navigate over to your Admin panel workspace above to upload your
            first sports video archive track.
          </p>
        </div>
      )}

      {/* 3. Horizontal Collections Container Tracks */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        <MediaRow
          title="Hockey Vault"
          description="Ice match archives, championships and season reels."
          videos={hockeyVideos}
        />
        <MediaRow
          title="Baseball Diamonds"
          description="Summer regular seasons and tournament runs."
          videos={baseballVideos}
        />
        <MediaRow
          title="Uncategorized Footage"
          description="Miscellaneous sports games and historical family tape transfers."
          videos={otherVideos}
        />
      </main>
    </div>
  );
}
