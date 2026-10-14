"use client";

import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useQuote } from "./QuoteContext";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#seguros", label: "Seguros" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { startQuote } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled || open ? "bg-navy-950/95 shadow-lg backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" aria-label={`${siteConfig.name} — inicio`} className="text-white">
          <Logo tone="light" className="h-9 w-auto sm:h-10" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 transition hover:text-accent-400">
              {l.label}
            </a>
          ))}
          <button type="button" onClick={() => startQuote()} className="btn btn-primary !min-h-10 !px-5 !py-2 text-sm">
            Cotizá tu seguro
          </button>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg text-white lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Móvil" className="border-t border-white/10 px-4 pb-5 pt-2 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-white/90">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              startQuote();
            }}
            className="btn btn-primary mt-2 w-full"
          >
            Cotizá tu seguro
          </button>
        </nav>
      )}
    </header>
  );
}
