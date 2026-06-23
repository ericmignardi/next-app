import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface VideoCardProps {
  id: string;
  title: string;
  sport: string;
  year: string;
  team: string;
  playbackId: string;
}

export function VideoCard({
  id,
  title,
  sport,
  year,
  team,
  playbackId,
}: VideoCardProps) {
  // Mux generates instant image thumbnails for any asset using its unique playbackId
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.webp?time=2`;

  return (
    <Link
      href={`/watch/${id}`}
      className="group block space-y-3 shrink-0 w-[280px] sm:w-[320px]"
    >
      <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-900/80 overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:border-slate-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
          loading="lazy"
        />
        {/* Hover State overlay mirroring standard streaming app interactions */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-500/30 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-5 h-5 fill-white text-white translate-x-[1px]" />
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-slate-950/85 text-white font-semibold backdrop-blur px-2 py-0.5 border border-slate-800 text-[10px]">
            {year}
          </Badge>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <h3 className="font-semibold text-slate-200 text-sm sm:text-base tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 font-medium">
          {team} • <span className="capitalize">{sport}</span>
        </p>
      </div>
    </Link>
  );
}
