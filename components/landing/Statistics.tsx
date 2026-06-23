const stats = [
  {
    value: "100%",
    label: "Private Access",
  },
  {
    value: "240+ Hrs",
    label: "Tapes Digitized",
  },
  {
    value: "< 50ms",
    label: "Highlight Seek",
  },
  {
    value: "1080p",
    label: "Preserved Quality",
  },
];

export default function Statistics() {
  return (
    <section className="bg-[#070a13] py-16 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#090d19] border border-slate-900 p-6 rounded-2xl text-center space-y-2 hover:border-slate-800 transition-all select-none"
            >
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
