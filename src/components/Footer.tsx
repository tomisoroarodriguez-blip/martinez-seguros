import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

const nav = [
  { href: "#seguros", label: "Seguros" },
  { href: "#como-funciona", label: "Cómo te ayudamos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const c = siteConfig.contact;
  const link = "inline-flex min-h-9 items-center rounded-md transition-colors duration-200 hover:text-accent-400";
  return (
    <footer className="bg-navy-950 pb-28 pt-14 text-sm text-white/70 sm:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" tagline className="h-16 w-auto" />
          <p className="mt-4 max-w-xs leading-relaxed">Corredores de seguros en Montevideo. Tu tranquilidad, nuestra prioridad.</p>
        </div>
        <nav aria-label="Secciones">
          <p className="mb-2 font-semibold text-white">Secciones</p>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-2 font-semibold text-white">Contacto</p>
          <ul>
            <li>
              <a href={`tel:${c.phoneTel}`} className={link}>
                {c.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} className={`${link} break-all`}>
                {c.email}
              </a>
            </li>
            <li>
              <a href={c.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                Instagram {c.instagramHandle}
              </a>
            </li>
            <li>
              <Link href="/privacidad" className={link}>
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs text-white/55 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name} · {c.addressShort}
      </div>
    </footer>
  );
}
