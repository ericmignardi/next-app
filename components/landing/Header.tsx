import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-muted/20">
      <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px] select-none hover:opacity-90 transition-opacity">
          <div className="w-[30px] h-[30px] rounded-lg bg-primary flex items-center justify-center">
            <div className="w-[13px] h-[13px] bg-white rotate-45 rounded-[2px]"></div>
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
            <SignInButton>
              <button className="btn-brand-header-secondary">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="btn-brand-header-primary">
                Get started
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </header>
  );
}

