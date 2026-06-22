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
      <div className="relative aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover State overlay mirroring standard streaming app interactions */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-slate-900 fill-slate-900 translate-x-[1px]" />
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-slate-900/80 text-white font-normal backdrop-blur-sm px-2 py-0.5 border-none">
            {year}
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          {team} • <span className="capitalize">{sport}</span>
        </p>
      </div>
    </Link>
  );
}
