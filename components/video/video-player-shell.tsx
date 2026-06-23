"use client";

import { useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import { Trophy } from "lucide-react";

interface HighlightItem {
  id: string;
  timestamp: string;
  label: string;
}

interface VideoPlayerShellProps {
  playbackId: string;
  highlights: HighlightItem[];
}

export function VideoPlayerShell({
  playbackId,
  highlights,
}: VideoPlayerShellProps) {
  // Bind the ref specifically to MuxPlayer's native DOM element attributes
  const playerRef = useRef<MuxPlayerRefAttributes>(null);

  // Helper utility to convert standard game metadata timestamps into raw seconds
  const parseTimestampToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parts[0] * 60 + parts[1];
  };

  const handleSeekToHighlight = (timestamp: string) => {
    if (!playerRef.current) return;

    const seconds = parseTimestampToSeconds(timestamp);

    // playerRef.current is now fully typed, exposing safe native parameters
    playerRef.current.currentTime = seconds;

    // MuxPlayer's play() returns a promise, so we chain a standard catch block
    playerRef.current.play()?.catch((err: unknown) => {
      console.warn("Playback focus interception failed:", err);
    });
  };

  return (
    <div className="flex flex-col">
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        metadataVideoTitle="Historical Sports Archive Game"
        streamType="on-demand"
        className="w-full aspect-video"
        primaryColor="#2563eb"
      />

      {/* Under-Player Interactive Highlights Panel */}
      <div className="bg-[#090d19] border-t border-slate-900 p-6 space-y-3.5">
        <div className="flex items-center gap-2.5 text-white">
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/10" />
          <h2 className="text-sm font-bold tracking-wider uppercase select-none">
            Game Index & Highlight Markers
          </h2>
        </div>

        {highlights.length === 0 ? (
          <p className="text-xs text-slate-500 font-medium italic">
            No interactive timeline highlight tags were pinned to this video
            asset.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5 pt-1">
            {highlights.map((marker) => (
              <button
                key={marker.id}
                onClick={() => handleSeekToHighlight(marker.timestamp)}
                className="inline-flex items-center gap-2.5 text-left bg-[#111726] hover:bg-[#182238] border border-slate-800/80 hover:border-blue-900/60 px-3.5 py-2 rounded-xl transition-all duration-200 group cursor-pointer active:scale-[0.98]"
              >
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/20 shadow-sm">
                  {marker.timestamp}
                </span>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {marker.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
