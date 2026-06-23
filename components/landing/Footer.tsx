import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090d19] border-t border-slate-900 text-slate-400 py-12 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
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
          <p className="text-xs text-slate-500 max-w-[200px]">
            Preserving family sports legacies, VHS to HLS, securely locked for generations.
          </p>
        </div>

        {/* Product Column */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            </li>
            <li>
              <Link href="#integrations" className="hover:text-white transition-colors">Integrations</Link>
            </li>
            <li>
              <Link href="#changelog" className="hover:text-white transition-colors">Changelog</Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="#about" className="hover:text-white transition-colors">About</Link>
            </li>
            <li>
              <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
            </li>
            <li>
              <Link href="#careers" className="hover:text-white transition-colors">Careers</Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="#privacy" className="hover:text-white transition-colors">Privacy</Link>
            </li>
            <li>
              <Link href="#terms" className="hover:text-white transition-colors">Terms</Link>
            </li>
            <li>
              <Link href="#security" className="hover:text-white transition-colors">Security</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {currentYear} LockerRoom Inc. All rights reserved.</p>
        <p className="italic">
          Made with care for sporting families.
        </p>
      </div>
    </footer>
  );
}
