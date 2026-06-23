import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-250 mx-auto px-8 pt-24 pb-14 text-center flex flex-col items-center">
      {/* Archive Preserve Banner */}
      <div className="inline-flex items-center gap-2 bg-card border border-muted/20 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-secondary shadow-[0_1px_2px_rgba(15,23,42,0.04)] select-none">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold text-[12px]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          VHS to HLS
        </span>
        Preserving family sports history in full HD
      </div>

      {/* Title */}
      <h1 className="text-[40px] sm:text-[56px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground mt-7 max-w-220 mx-auto">
        Preserve and stream your
        <br className="hidden sm:inline" />
        family&apos;s sports legacy
      </h1>

      {/* Description */}
      <p className="text-[17px] sm:text-xl leading-[1.55] text-muted mt-6 max-w-170 mx-auto">
        LockerRoom securely hosts, indexes, and streams your digitized home sports footage in high-fidelity HLS. Jump straight to the action with interactive timestamp highlights.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-9 w-full sm:w-auto">
        <Link href="/sign-up" className="w-full sm:w-auto">
          <button className="btn-brand-primary w-full shadow-lg shadow-primary/20">Explore the Vault</button>
        </Link>
        <Link href="/sign-in" className="w-full sm:w-auto">
          <button className="btn-brand-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            <PlayCircle className="size-5" />
            Watch Highlights
          </button>
        </Link>
      </div>

      {/* Trial info */}
      <p className="text-[13px] text-muted/80 mt-4.5">
        Strictly private · Family guest access codes available
      </p>
    </section>
  );
}
