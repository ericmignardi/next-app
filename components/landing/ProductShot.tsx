export default function ProductShot() {
  return (
    <section className="max-w-275 mx-auto px-8 pb-16">
      <div className="bg-card border border-muted/20 rounded-2xl shadow-[0_30px_60px_-20px_rgba(15,23,42,0.2)] overflow-hidden">
        {/* Browser header (window controls and URL bar) */}
        <div className="flex items-center gap-1.75 px-4 py-3.25 border-b border-muted/10 bg-card">
          <span className="w-2.75 h-2.75 rounded-full bg-[#f87171] inline-block"></span>
          <span className="w-2.75 h-2.75 rounded-full bg-[#fbbf24] inline-block"></span>
          <span className="w-2.75 h-2.75 rounded-full bg-[#34d399] inline-block"></span>
          <div className="ml-3.5 bg-background rounded-md h-5.5 flex-1 max-w-85"></div>
        </div>
        {/* Mock dashboard content area */}
        <div
          className="h-115 flex items-center justify-center relative overflow-hidden bg-background"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--background), var(--background) 11px, var(--background-card) 11px, var(--background-card) 22px)",
          }}
        >
          <span className="font-mono text-[13px] text-muted bg-card px-3.5 py-2 rounded-lg border border-muted/20 shadow-sm select-none z-10">
            [ product dashboard screenshot ]
          </span>
        </div>
      </div>
    </section>
  );
}
