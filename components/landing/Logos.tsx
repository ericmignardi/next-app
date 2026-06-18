export default function Logos() {
  const logos = ["acme", "globex", "hooli", "initech", "umbra"];
  return (
    <section className="max-w-[1100px] mx-auto px-8 pt-2 pb-18 text-center">
      <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-muted/80 mb-7 select-none">
        Trusted by fast-moving teams
      </p>
      <div className="flex flex-wrap items-center justify-center gap-[48px]">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-mono text-lg font-medium text-muted/60 tracking-[-0.02em] select-none hover:text-muted transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
