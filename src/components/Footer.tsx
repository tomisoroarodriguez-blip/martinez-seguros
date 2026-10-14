import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-950 pb-28 pt-10 text-white/70 sm:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Logo tone="light" tagline className="h-14 w-auto self-start" />
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.contact.addressShort}
          </p>
        </div>
        <nav aria-label="Legal" className="flex gap-5">
          <Link href="/privacidad" className="hover:text-accent-400">
            Privacidad
          </Link>
          <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
