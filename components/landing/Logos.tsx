import { Film, Disc, Clapperboard, Video, Tv } from "lucide-react";

const formats = [
  { name: "VHS Tapes", icon: Video },
  { name: "8mm Film", icon: Film },
  { name: "MiniDV", icon: Clapperboard },
  { name: "Hi8 Tape", icon: Disc },
  { name: "Digital HD", icon: Tv },
];

export default function Logos() {
  return (
    <section className="bg-[#070a13] border-t border-slate-900/60 py-12 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <h3 className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none">
          Supported Archival Formats
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-2">
          {formats.map((format) => (
            <div
              key={format.name}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-350 transition-colors select-none group cursor-default"
            >
              <format.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-semibold tracking-tight">
                {format.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
