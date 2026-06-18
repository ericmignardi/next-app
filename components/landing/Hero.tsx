export default function Hero() {
  return (
    <section className="mt-20">
      <div className="py-24 px-8 max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Span */}
        <span className="flex items-center gap-2 rounded-full border border-muted/25 p-2 text-sm text-muted">
          <span className="flex items-center gap-1 bg-accent/25 rounded-full px-2 text-accent">
            <span className="size-2 rounded-full bg-accent"></span>
            New
          </span>
          Real-time collaboration is here
        </span>

        {/* Title */}
        <div className="max-w-4xl mx-auto text-center ">
          <h1 className="text-6xl font-black leading-[1.05]">
            The workspace where your team actually gets things done
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-muted leading-[1.55]">
            next-app brings your projects, docs, and data into one fast,
            beautiful surface - so your team can focus on the work that matters.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="btnSecondary">Start for free</button>
          <button className="btnPrimary border border-muted/25">
            Watch demo
          </button>
        </div>

        {/* Span 2 */}
        <p className="text-sm text-muted">
          No credit card required · Free 14-day trial{" "}
        </p>

        <div className="flex flex-col items-center gap-8 text-center mt-24">
          <p className="text-muted uppercase font-medium text-sm">
            Trusted By Fast-Moving Teams
          </p>
          <div className="flex items-center gap-8 font-mono text-muted text-lg">
            <p>acme</p>

            <p>globex</p>

            <p>hooli</p>

            <p>initech</p>

            <p>umbra</p>
          </div>
        </div>
      </div>
    </section>
  );
}
