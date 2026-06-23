export default function Testimonial() {
  return (
    <section id="customers" className="bg-[#070a13] py-20 px-6 sm:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Stars */}
        <div className="text-amber-500 text-xl tracking-[4px] select-none font-bold">
          ★★★★★
        </div>

        {/* Quote */}
        <blockquote className="text-white text-lg sm:text-2xl font-bold tracking-tight leading-relaxed max-w-3xl mx-auto">
          &quot;LockerRoom helped us organize and secure our family sports archives. We digitized over 20 years of camcorder game tapes, practices, and season runs, and now the entire extended family streams them buffer-free.&quot;
        </blockquote>

        {/* Author Details */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-white tracking-tight">Jordan Avery</p>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Family Archivist & Team Captain
          </p>
        </div>
      </div>
    </section>
  );
}
