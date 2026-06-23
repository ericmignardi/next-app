import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#090d19] border-t border-slate-900/60 py-20 px-6 sm:px-8 relative z-10 overflow-hidden">
      {/* Glow highlight background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Ready to preserve your family&apos;s sports legacy?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
          Create your private vault today to safely upload, catalog, and playback historical family athletic recordings.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sign-up">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Create Free Account
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="bg-[#111726] hover:bg-[#182238] text-white border border-slate-800 hover:border-slate-700 font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>

        {/* Safety indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>No credit card required. Free basic storage tier.</span>
        </div>
      </div>
    </section>
  );
}
