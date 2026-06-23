export default function ProductShot() {
  return (
    <section className="max-w-285 mx-auto px-8 pb-16">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Browser header (window controls and URL bar) */}
        <div className="flex items-center gap-1.75 px-4 py-3.25 border-b border-slate-800/80 bg-[#0d1321]">
          <span className="w-2.75 h-2.75 rounded-full bg-[#f87171] inline-block"></span>
          <span className="w-2.75 h-2.75 rounded-full bg-[#fbbf24] inline-block"></span>
          <span className="w-2.75 h-2.75 rounded-full bg-[#34d399] inline-block"></span>
          <div className="ml-4.5 bg-[#141b2d] border border-slate-800 rounded-md h-6.5 flex-1 max-w-105 flex items-center px-3">
            <span className="text-[10px] text-slate-500 font-mono select-none">https://lockerroom.family/dashboard</span>
          </div>
        </div>

        {/* Mock dashboard content area */}
        <div className="min-h-125 lg:h-140 flex bg-[#070a13] text-slate-200 text-left font-sans select-none relative">
          
          {/* Mock Sidebar */}
          <div className="w-48 lg:w-56 border-r border-slate-900 bg-[#090d19] p-4 hidden sm:flex flex-col justify-between shrink-0">
            <div className="space-y-6">
              {/* Sidebar Logo */}
              <div className="flex items-center gap-2 px-1">
                <div className="w-6.5 h-6.5 rounded bg-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-bold text-sm tracking-tight text-white">LockerRoom</span>
              </div>

              {/* Sidebar Links */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 block">Browse Vault</span>
                <div className="flex items-center gap-2 bg-blue-900/20 text-blue-400 px-3.5 py-2 rounded-lg font-medium text-xs border border-blue-500/10 cursor-pointer">
                  <span>📺</span>
                  <span>Streaming Home</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800/20 px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer">
                  <span>🏒</span>
                  <span>Hockey Vault</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800/20 px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer">
                  <span>⚾</span>
                  <span>Baseball Diamonds</span>
                </div>
              </div>
            </div>

            {/* User Account / Role Badge */}
            <div className="flex items-center gap-2 border-t border-slate-900 pt-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-500 text-xs">
                JA
              </div>
              <div>
                <p className="text-[11px] font-bold text-white leading-none">Jordan Avery</p>
                <span className="text-[9px] text-amber-500 font-semibold tracking-wider uppercase">Family Captain</span>
              </div>
            </div>
          </div>

          {/* Mock Main Panel */}
          <div className="flex-1 p-5 lg:p-7 overflow-y-auto space-y-6">
            
            {/* Mock Dashboard Top Hero Banner */}
            <div className="relative aspect-[21/9] w-full bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-md flex items-end">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 to-slate-900/60 mix-blend-overlay"></div>
              {/* Simulated Stadium Background Gradients */}
              <div className="absolute inset-0 bg-radial-gradient from-blue-600/10 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Play Badge */}
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-2.5 py-0.75 rounded-md border border-slate-800 text-[10px] font-semibold text-slate-300">
                1998 Championship Season
              </div>

              {/* Hero Copy */}
              <div className="p-4 sm:p-6 space-y-1.5 z-10 max-w-md">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Featured Playback</span>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight leading-snug">1998 Finals Game 7 - Ancaster Rangers VS Dundas Blues</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">PRESIDENT CUP FINAL MATCH. preserverd in full digital HD. includes triple overtime win.</p>
                
                {/* Simulated Seek Timeline Highlights panel preview */}
                <div className="flex gap-1.5 pt-2">
                  <div className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-[10px] px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all cursor-pointer">
                    <span className="text-[8px]">▶</span> Stream Game
                  </div>
                  <div className="bg-[#1e293b]/60 border border-slate-800 text-slate-300 font-semibold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
                    <span className="text-[8px] font-mono text-blue-400 bg-blue-500/10 px-1 py-0.25 rounded border border-blue-500/20">14:20</span>
                    <span>3rd Period Goal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card Rows */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase">Hockey Vault</h4>
                <p className="text-[9px] text-slate-500 font-medium">Ice match archives, championships and season reels.</p>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mock Card 1 */}
                <div className="group border border-slate-900 bg-[#090d19] rounded-xl overflow-hidden shadow-sm hover:border-slate-800 transition-all cursor-pointer">
                  <div className="aspect-video w-full bg-[#131b2d] relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-radial-gradient from-blue-600/5 to-transparent"></div>
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-1.5 py-0.25 rounded text-[9px] font-bold text-slate-400">1996</div>
                    <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600/20 transition-transform">
                      <span className="text-blue-500 text-[10px] translate-x-[0.5px]">▶</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-[11px] font-bold text-white leading-tight">1996 Semifinals Highlights</p>
                    <p className="text-[9px] text-slate-500">Ancaster Rangers • Hockey</p>
                  </div>
                </div>

                {/* Mock Card 2 */}
                <div className="group border border-slate-900 bg-[#090d19] rounded-xl overflow-hidden shadow-sm hover:border-slate-800 transition-all cursor-pointer">
                  <div className="aspect-video w-full bg-[#131b2d] relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-radial-gradient from-amber-600/5 to-transparent"></div>
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-1.5 py-0.25 rounded text-[9px] font-bold text-slate-400">1998</div>
                    <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600/20 transition-transform">
                      <span className="text-blue-500 text-[10px] translate-x-[0.5px]">▶</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-[11px] font-bold text-white leading-tight">1998 President Cup Finals</p>
                    <p className="text-[9px] text-slate-500">Ancaster Rangers • Hockey</p>
                  </div>
                </div>

                {/* Mock Card 3 */}
                <div className="group border border-slate-900 bg-[#090d19] rounded-xl overflow-hidden shadow-sm hover:border-slate-800 transition-all cursor-pointer hidden lg:block">
                  <div className="aspect-video w-full bg-[#131b2d] relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-radial-gradient from-emerald-600/5 to-transparent"></div>
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-1.5 py-0.25 rounded text-[9px] font-bold text-slate-400">2002</div>
                    <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600/20 transition-transform">
                      <span className="text-blue-500 text-[10px] translate-x-[0.5px]">▶</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-[11px] font-bold text-white leading-tight">2002 Tournament Highlights</p>
                    <p className="text-[9px] text-slate-500">Red Sox • Baseball</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
