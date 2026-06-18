export default function CTA() {
  return (
    <section>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center p-20 rounded-xl bg-linear-to-r from-primary to-foreground dark:to-background">
        {/* Title */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-black text-background dark:text-foreground leading-[1.05] text-5xl">
            Ready to give your team momentum?
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted text-lg leading-[1.55]">
          Join thousands of teams already building faster with next-app.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="btnPrimary">Start for free</button>
          <button className="btnSecondary">Talk to sales</button>
        </div>
      </div>
    </section>
  );
}
