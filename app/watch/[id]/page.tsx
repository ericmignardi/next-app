import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { VideoPlayerShell } from "@/components/video/video-player-shell";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic data loading

export default async function WatchPage({ params }: WatchPageProps) {
  const resolvedParams = await params;

  // 1. Query the database for the exact asset matching the URL segment
  const video = await prisma.video.findUnique({
    where: { id: resolvedParams.id },
    include: {
      highlights: {
        orderBy: {
          timestamp: "asc", // Order timestamps sequentially from start to finish
        },
      },
    },
  });

  if (!video) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Back to Discovery Navigation */}
      <nav className="h-16 px-6 max-w-7xl mx-auto flex items-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors gap-1 group"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Back to LockerRoom
        </Link>
      </nav>

      {/* Main Structural Watch Layout Split Grid */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2-Columns: Dynamic Interactive Mux Player Component */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-black overflow-hidden shadow-md">
            <VideoPlayerShell
              playbackId={video.muxPlaybackId}
              highlights={video.highlights}
            />
          </div>

          <div className="space-y-1 pt-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {video.title}
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {video.team} • {video.year} {video.gameType}
            </p>
            {video.description && (
              <p className="text-sm text-slate-600 font-medium pt-2 max-w-2xl leading-relaxed">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
