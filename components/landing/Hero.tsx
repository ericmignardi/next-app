import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-250 mx-auto px-8 pt-24 pb-14 text-center flex flex-col items-center">
      {/* Real-time Collaboration Banner */}
      <div className="inline-flex items-center gap-2 bg-card border border-muted/20 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-secondary shadow-[0_1px_2px_rgba(15,23,42,0.04)] select-none">
        <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold text-[12px]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          New
        </span>
        Real-time collaboration is here
      </div>

      {/* Title */}
      <h1 className="text-[40px] sm:text-[56px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground mt-7 max-w-[820px] mx-auto">
        The workspace where your team
        <br className="hidden sm:inline" />
        actually gets things done
      </h1>

      {/* Description */}
      <p className="text-[17px] sm:text-xl leading-[1.55] text-muted mt-6 max-w-150 mx-auto">
        Lumen brings your projects, docs, and data into one fast, beautiful
        surface — so your team can focus on the work that matters.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-9 w-full sm:w-auto">
        <Link href="/sign-up" className="w-full sm:w-auto">
          <button className="btn-brand-primary w-full">Start for free</button>
        </Link>
        <button className="btn-brand-secondary w-full sm:w-auto flex items-center gap-2">
          <PlayCircle className="size-6" />
          Watch demo
        </button>
      </div>

      {/* Trial info */}
      <p className="text-[13px] text-muted/80 mt-[18px]">
        No credit card required · Free 14-day trial
      </p>
    </section>
  );
}
