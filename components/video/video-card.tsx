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
      className="group block space-y-3.5 shrink-0 w-[280px] sm:w-[320px]"
    >
      <div className="relative aspect-video rounded-xl bg-slate-950 border border-white/[0.04] overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] group-hover:border-white/10 group-hover:-translate-y-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
          loading="lazy"
        />
        {/* Hover State overlay mirroring standard streaming app interactions */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-white/10 text-white p-3 rounded-full border border-white/20 shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-md">
            <Play className="w-5 h-5 fill-white text-white translate-x-[1px]" />
          </div>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-slate-950/80 text-slate-350 font-bold backdrop-blur-md px-2 py-0.5 border border-white/[0.05] text-[9px] uppercase tracking-wider">
            {year}
          </Badge>
        </div>
      </div>

      <div className="space-y-1 px-0.5 select-none">
        <h3 className="font-bold text-slate-200 text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          {team} • <span className="text-slate-400">{sport}</span>
        </p>
      </div>
    </Link>
  );
}
