export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070a13] border-t border-white/[0.02] text-slate-500 py-8 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <div className="flex items-center gap-2 select-none">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white">
            <span>Locker</span><span className="text-blue-500 font-medium">Room</span>
          </span>
        </div>
        <p>© {currentYear} LockerRoom. All rights reserved.</p>
        <p className="italic text-[11px] text-slate-600">
          Strictly Private Family Vault
        </p>
      </div>
    </footer>
  );
}
