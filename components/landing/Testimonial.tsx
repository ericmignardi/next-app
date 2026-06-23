export default function Testimonial() {
  return (
    <section
      id="customers"
      className="max-w-205 mx-auto pt-14 pb-6 px-8 text-center flex flex-col items-center"
    >
      {/* 5-Star Rating */}
      <div className="font-mono text-accent text-[28px] tracking-[2px] leading-none mb-5 select-none">
        ★★★★★
      </div>

      {/* Quote */}
      <p className="text-[24px] sm:text-[28px] leading-[1.45] font-semibold text-foreground tracking-[-0.02em] mb-7 max-w-190">
        &quot;We digitized over 20 years of family hockey and baseball tapes. LockerRoom makes it feel like our own private streaming channel — my grandfather can watch on his iPad and jump straight to the highlight goals.&quot;
      </p>

      {/* Profile Info */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder with striped gradient pattern */}
        <div className="w-11 h-11 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-600 text-sm">
          JA
        </div>
        <div className="text-left">
          <p className="font-bold text-[15px] text-foreground leading-tight">
            Jordan Avery
          </p>
          <p className="text-sm text-muted mt-1">Family Archivist & Team Captain</p>
        </div>
      </div>
    </section>
  );
}
