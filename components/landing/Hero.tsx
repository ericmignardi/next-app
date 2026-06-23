import Link from "next/link";
import { ShieldCheck, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center bg-[#070a13] py-20 px-6 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        {/* VHS to HLS Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 tracking-wide">
          <span className="bg-blue-500 text-[#070a13] text-[9px] px-1.5 py-0.5 rounded font-black mr-1 uppercase">
            VHS to HLS
          </span>
          <span>Preserving family sports history</span>
        </div>

        {/* Title / Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Your Family&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Sports Legacy</span>, Pinned & Streaming.
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          LockerRoom securely hosts, indexes, and streams your historical home recordings. Convert analog footage into interactive video assets with ease.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sign-up">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2">
              Explore the Vault
            </button>
          </Link>
          <Link href="#pricing">
            <button className="bg-[#111726] hover:bg-[#182238] text-white border border-slate-800 hover:border-slate-700 font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2">
              <Play className="w-4 h-4 fill-white" /> Watch Highlights
            </button>
          </Link>
        </div>

        {/* Strictly Private badge */}
        <div className="flex items-center gap-2 text-slate-500 text-xs select-none">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Strictly private access. Guest login required.</span>
        </div>
      </div>
    </section>
  );
}
