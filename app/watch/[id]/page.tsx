import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Play, Calendar } from "lucide-react";
import { VideoPlayerShell } from "@/components/video/video-player-shell";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import Image from "next/image";

export const unstable_instant = {
  prefetch: "runtime",
  samples: [
    {
      params: { id: "sample-id" },
    },
  ],
};

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  return (
    <div className="bg-[#070a13] text-slate-100 min-h-screen pb-16 relative">
      {/* Dynamic ambient backlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Back to Discovery Navigation */}
      <nav className="h-16 px-6 max-w-7xl mx-auto flex items-center relative z-10 border-b border-white/[0.02] bg-transparent backdrop-blur-md sticky top-0 mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors gap-1.5 group select-none"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform text-blue-500" />
          Back to LockerRoom Vault
        </Link>
      </nav>

      {/* Main Structural Watch Layout Split Grid */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <Suspense fallback={<WatchSkeleton />}>
          {params.then(({ id }) => (
            <WatchContent id={id} />
          ))}
        </Suspense>
      </main>
    </div>
  );
}

function WatchSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2-Columns Skeleton */}
      <div className="lg:col-span-2 space-y-6 animate-pulse">
        <div className="rounded-2xl aspect-video bg-slate-950 border border-white/[0.03] shadow-2xl" />
        <div className="space-y-4 pt-4 border-t border-white/[0.03]">
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-slate-800 rounded" />
            <div className="h-4 w-20 bg-slate-800 rounded" />
          </div>
          <div className="h-8 w-3/4 bg-slate-800 rounded" />
          <div className="h-4 w-1/2 bg-slate-800 rounded" />
        </div>
      </div>
      {/* Right Column Skeleton */}
      <div className="space-y-5 animate-pulse">
        <div className="bg-[#090d19]/80 border border-white/[0.03] rounded-2xl p-5 shadow-xl h-64" />
      </div>
    </div>
  );
}

async function getVideo(id: string) {
  "use cache";
  return prisma.video.findUnique({
    where: { id },
    include: {
      highlights: {
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });
}

async function getRecommendedVideos(excludeId: string) {
  "use cache";
  return prisma.video.findMany({
    where: {
      NOT: {
        id: excludeId,
        muxPlaybackId: { startsWith: "pending_" },
      },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
}

async function WatchContent({ id }: { id: string }) {
  // 1. Query the database for the exact asset matching the URL segment using cached helper
  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  // 2. Fetch other recommendations using cached helper
  const otherVideos = await getRecommendedVideos(video.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2-Columns: Dynamic Interactive Mux Player Component */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-white/[0.03] bg-slate-950 overflow-hidden shadow-2xl">
          <VideoPlayerShell
            playbackId={video.muxPlaybackId}
            highlights={video.highlights}
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-white/[0.03] select-none">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-white font-extrabold text-[9px] uppercase border-none px-2.5 py-0.5 tracking-wider rounded">
              {video.sport}
            </Badge>
            <Badge className="bg-slate-950 text-slate-400 border border-white/[0.04] font-bold text-[9px] px-2.5 py-0.5 uppercase tracking-wider rounded">
              {video.gameType}
            </Badge>
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3.5xl font-extrabold tracking-tight text-white leading-tight">
              {video.title}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{video.team} • {video.year}</span>
            </p>
          </div>
          {video.description && (
            <p className="text-sm text-slate-400 font-medium pt-2 max-w-3xl leading-relaxed select-text">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Other Videos Recommendations */}
      <div className="space-y-5">
        <div className="bg-[#090d19]/80 border border-white/[0.03] rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-md">
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-slate-500 px-1 border-b border-white/[0.03] pb-3">
            More from the Vault
          </h3>

          {otherVideos.length === 0 ? (
            <p className="text-xs text-slate-500 font-medium italic px-1">
              No other archived games cataloged yet.
            </p>
          ) : (
            <div className="space-y-3">
              {otherVideos.map((item) => (
                <Link
                  key={item.id}
                  href={`/watch/${item.id}`}
                  className="group flex gap-3 hover:bg-white/[0.02] p-2 rounded-xl transition-all border border-transparent hover:border-white/[0.02]"
                >
                  <div className="relative aspect-video w-24 shrink-0 rounded-lg bg-slate-950 border border-white/[0.04] overflow-hidden">
                    <Image
                      src={`https://image.mux.com/${item.muxPlaybackId}/thumbnail.webp?time=2&width=200`}
                      alt={item.title}
                      className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="space-y-1 select-none min-w-0 flex-1 justify-center flex flex-col">
                    <h4 className="font-bold text-white text-xs tracking-tight line-clamp-1 leading-snug group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider truncate">
                      {item.year} • {item.team}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
