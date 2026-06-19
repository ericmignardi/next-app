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
          <div className="w-7.5 h-7.5 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-3.25 h-3.25 bg-white rotate-45 rounded-xs"></div>
          </div>
          <span className="font-bold text-[19px] tracking-[-0.02em] text-foreground">
            Lumen
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
