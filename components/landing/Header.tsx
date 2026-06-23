import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#070a13]/70 backdrop-blur-md border-b border-slate-900/80 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 px-6 sm:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-[19px] tracking-tight text-white">
            <span>Locker</span><span className="text-blue-500">Room</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#docs" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Docs
          </Link>
          <Link href="#customers" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Customers
          </Link>
        </div>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
