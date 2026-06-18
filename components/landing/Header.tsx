import logo from "@/public/logo.svg";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 h-20 w-full backdrop-blur-md border-b border-b-muted/25 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-4 h-full">
        {/* Logo */}
        <Image
          src={logo}
          alt="next-app logo"
          height={32}
          width={32}
          className="h-8 w-auto object-contain"
        />

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link href={"#features"}>Features</Link>
            </li>
            <li>
              <Link href={"#pricing"}>Pricing</Link>
            </li>
            <li>
              <Link href={"#docs"}>Docs</Link>
            </li>
            <li>
              <Link href={"#customers"}>Customers</Link>
            </li>
          </ul>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Show when={"signed-in"}>
            <UserButton />
          </Show>

          <Show when={"signed-out"}>
            <SignInButton>
              <button className="btnPrimary">Sign in</button>
            </SignInButton>
            <SignUpButton>
              <button className="btnSecondary">Get started</button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </header>
  );
}
