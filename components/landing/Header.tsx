import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-muted/20">
      <div className="max-w-300 mx-auto px-8 py-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 select-none hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-[20px] tracking-tight text-foreground">
            Locker<span className="text-blue-600">Room</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          <Link href="#features" className="nav-link">
            Features
          </Link>
          <Link href="#pricing" className="nav-link">
            Pricing
          </Link>
          <Link href="#docs" className="nav-link">
            Docs
          </Link>
          <Link href="#customers" className="nav-link">
            Customers
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Show when={"signed-in"}>
            <div className="flex items-center gap-4">
              <UserButton />
            </div>
          </Show>

          <Show when={"signed-out"}>
            <Link href="/sign-in" className="btn-brand-header-secondary">
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-brand-header-primary">
              Get started
            </Link>
          </Show>
        </div>
      </div>
    </header>
  );
}
