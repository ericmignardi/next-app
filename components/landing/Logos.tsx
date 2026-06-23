export default function Logos() {
  const logos = ["VHS Tapes", "8mm Film", "MiniDV", "Hi8 Tape", "Digital HD"];
  return (
    <section className="max-w-275 mx-auto px-8 pt-2 pb-18 text-center">
      <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-muted/80 mb-7 select-none">
        Supported Archival Formats
      </p>
      <div className="flex flex-wrap items-center justify-center gap-12">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-mono text-sm font-semibold tracking-wide text-muted/60 uppercase select-none hover:text-muted transition-colors cursor-default border border-muted/10 px-3.5 py-1.5 rounded-lg bg-card shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
