"use client";

import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect, useRef, useState } from "react";
import { useQuote } from "./QuoteContext";

const links = [
  { href: "#inicio", id: "inicio", label: "Inicio" },
  { href: "#seguros", id: "seguros", label: "Seguros" },
  { href: "#nosotros", id: "nosotros", label: "Nosotros" },
  { href: "#faq", id: "faq", label: "Preguntas frecuentes" },
  { href: "#contacto", id: "contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const { startQuote } = useQuote();
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Compactar al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa: la que cruza la línea a ~35 % de la altura de la pantalla
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape cierra el menú y devuelve el foco al botón
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-navy-950/90 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-14" : "h-[4.5rem]"}`}>
        <a href="#inicio" className="logo-link rounded-md text-white">
          <Logo tone="light" animated className={`w-auto transition-[height] duration-300 ${scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"}`} />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-white/75 hover:text-white"}`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-500 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                />
              </a>
            );
          })}
          <button type="button" onClick={() => startQuote()} className="btn btn-primary ml-3 !min-h-10 !px-5 !py-2 text-sm">
            Cotizá tu seguro
          </button>
        </nav>

        <button
          ref={menuBtn}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Móvil" className="menu-in max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 px-4 pb-6 pt-2 lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`flex min-h-12 items-center justify-between border-b border-white/10 text-base font-medium ${active === l.id ? "text-accent-400" : "text-white/90"}`}
                >
                  {l.label}
                  {active === l.id && <span aria-hidden className="h-2 w-2 rounded-full bg-accent-500" />}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              startQuote();
            }}
            className="btn btn-primary mt-5 w-full"
          >
            Cotizá tu seguro
          </button>
        </nav>
      )}
    </header>
  );
}
