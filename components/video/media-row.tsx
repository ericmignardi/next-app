import { VideoCard } from "@/components/video/video-card";

interface MediaRowProps {
  title: string;
  description?: string;
  videos: Array<{
    id: string;
    title: string;
    sport: string;
    year: string;
    team: string;
    muxPlaybackId: string;
  }>;
}

export function MediaRow({ title, description, videos }: MediaRowProps) {
  if (videos.length === 0) return null;

  return (
    <div className="space-y-3 py-4">
      <div className="select-none">
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{description}</p>
        )}
      </div>

      {/* Track listing displaying items in an auto-snapping horizontal flow */}
      <div className="flex gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {videos.map((video) => (
          <div key={video.id} className="snap-start">
            <VideoCard
              id={video.id}
              title={video.title}
              sport={video.sport}
              year={video.year}
              team={video.team}
              playbackId={video.muxPlaybackId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
