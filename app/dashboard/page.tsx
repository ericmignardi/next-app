import prisma from "@/lib/prisma";
import { MediaRow } from "@/components/video/media-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

export const revalidate = 0; // Ensure new uploads show up instantly without page caching lags

interface PageProps {
  searchParams?: Promise<{ sport?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedSport = resolvedSearchParams.sport;

  // Fetch all completed, stream-ready video records
  const allVideos = await prisma.video.findMany({
    where: {
      NOT: {
        muxPlaybackId: { startsWith: "pending_" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Filter video list based on sidebar search selection
  const filteredVideos = selectedSport
    ? allVideos.filter((v) => v.sport.toLowerCase() === selectedSport.toLowerCase())
    : allVideos;

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
      {/* Top Banner Hero Section */}
      {featuredVideo ? (
        <div className="px-6 pt-6 max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-900">
            {/* Displaying an ultra widescreen poster image overlay natively mapped from Mux asset endpoints */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://image.mux.com/${featuredVideo.muxPlaybackId}/thumbnail.webp?time=5&width=1200`}
              alt={featuredVideo.title}
              className="object-cover w-full h-full opacity-60 blur-[0.5px]"
            />
            {/* Dark gradient fade for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070a13]/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-10 space-y-2 sm:space-y-4 max-w-xl text-white">
              <span className="inline-flex text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 backdrop-blur-sm">
                Latest Archive Upload
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-none text-white drop-shadow">
                {featuredVideo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 font-medium">
                {featuredVideo.description ||
                  "Historical sports video asset preserved cleanly inside your digital family locker room."}
              </p>
              <div className="pt-2">
                <Link href={`/watch/${featuredVideo.id}`}>
                  <Button className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                    <Play className="w-4 h-4 mr-2 fill-slate-950 text-slate-950" />{" "}
                    Stream Game
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 text-slate-400 max-w-md mx-auto text-sm px-6">
          <div className="h-16 w-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-xl">
            🔒
          </div>
          <p className="font-bold text-white text-lg mb-1">
            Your vault is currently empty.
          </p>
          <p className="text-slate-500 text-xs">
            No media matching your selection. Navigate over to the Admin workspace to upload your first sports video archive track.
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
