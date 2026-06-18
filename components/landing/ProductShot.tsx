export default function ProductShot() {
  return (
    <section className="max-w-[1100px] mx-auto px-8 pb-16">
      <div className="bg-card border border-muted/20 rounded-2xl shadow-[0_30px_60px_-20px_rgba(15,23,42,0.2)] overflow-hidden">
        {/* Browser header (window controls and URL bar) */}
        <div className="flex items-center gap-[7px] px-4 py-[13px] border-b border-muted/10 bg-card">
          <span className="w-[11px] h-[11px] rounded-full bg-[#f87171] inline-block"></span>
          <span className="w-[11px] h-[11px] rounded-full bg-[#fbbf24] inline-block"></span>
          <span className="w-[11px] h-[11px] rounded-full bg-[#34d399] inline-block"></span>
          <div className="ml-3.5 bg-background rounded-md h-[22px] flex-1 max-w-[340px]"></div>
        </div>
        {/* Mock dashboard content area */}
        <div 
          className="h-[460px] flex items-center justify-center relative overflow-hidden bg-background"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, var(--background), var(--background) 11px, var(--background-card) 11px, var(--background-card) 22px)"
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
