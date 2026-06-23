import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-muted/20 bg-card text-foreground">
      <div className="max-w-300 mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        {/* Column 1 */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2.5 select-none mb-3.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-foreground">Locker<span className="text-blue-600">Room</span></span>
          </div>

          <p className="text-[14px] text-muted max-w-65 leading-[1.55] m-0">
            Secure, high-fidelity digital sports video archives for families.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-start">
          <h5 className="text-[13px] font-semibold text-foreground mb-3.5">
            Product
          </h5>
          <div className="flex flex-col gap-2.5 text-[14px] text-muted">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors duration-150"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground transition-colors duration-150"
            >
              Pricing
            </Link>
            <Link
              href="#integrations"
              className="hover:text-foreground transition-colors duration-150"
            >
              Integrations
            </Link>
            <Link
              href="#changelog"
              className="hover:text-foreground transition-colors duration-150"
            >
              Changelog
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-start">
          <h5 className="text-[13px] font-semibold text-foreground mb-3.5">
            Company
          </h5>
          <div className="flex flex-col gap-2.5 text-[14px] text-muted">
            <Link
              href="#about"
              className="hover:text-foreground transition-colors duration-150"
            >
              About
            </Link>
            <Link
              href="#blog"
              className="hover:text-foreground transition-colors duration-150"
            >
              Blog
            </Link>
            <Link
              href="#careers"
              className="hover:text-foreground transition-colors duration-150"
            >
              Careers
            </Link>
            <Link
              href="#contact"
              className="hover:text-foreground transition-colors duration-150"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-start">
          <h5 className="text-[13px] font-semibold text-foreground mb-3.5">
            Legal
          </h5>
          <div className="flex flex-col gap-2.5 text-[14px] text-muted">
            <Link
              href="#privacy"
              className="hover:text-foreground transition-colors duration-150"
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              className="hover:text-foreground transition-colors duration-150"
            >
              Terms
            </Link>
            <Link
              href="#security"
              className="hover:text-foreground transition-colors duration-150"
            >
              Security
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/10 bg-card">
        <div className="max-w-300 mx-auto px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[13px] text-muted/80 select-none">
            © {new Date().getFullYear()} LockerRoom Inc. All rights reserved.
          </span>
          <span className="font-mono text-[12px] text-muted/60 select-none">
            made with care
          </span>
        </div>
      </div>
    </footer>
  );
}
