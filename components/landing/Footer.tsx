import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-background dark:bg-foreground text-foreground dark:text-background border-t border-muted/25">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 pt-12 pb-4 px4">
        {/* Grid */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 items-start">
            <Image
              src={logo}
              alt="next-app logo"
              height={12}
              width={12}
              className="h-6 w-auto object-contain"
            />

            <p className="text-sm text-muted max-w-60">
              The fast, beautiful workspace for teams who ship.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 items-start text-sm">
            <p className="font-semibold">Product</p>
            <div className="flex flex-col gap-2 text-muted">
              <Link href={"#features"}>Features</Link>
              <Link href={"#pricing"}>Pricing</Link>
              <Link href={"#integrations"}>Integrations</Link>
              <Link href={"#changelog"}>Changelog</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 items-start text-sm">
            <p className="font-semibold">Company</p>
            <div className="flex flex-col gap-2 text-muted">
              <Link href={"#about"}>About</Link>
              <Link href={"#blog"}>Blog</Link>
              <Link href={"#careers"}>Careers</Link>
              <Link href={"#contact"}>Contact</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 items-start text-sm">
            <p className="font-semibold">Legal</p>
            <div className="flex flex-col gap-2 text-muted">
              <Link href={"#privacy"}>Privacy</Link>
              <Link href={"#terms"}>Terms</Link>
              <Link href={"#security"}>Security</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <span className="text-sm text-muted">
            &copy; {new Date().getFullYear()} next-app inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
