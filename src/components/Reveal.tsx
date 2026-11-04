"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Dots } from "./Logo";

/**
 * Aparición al entrar en pantalla (opacity + transform, 600 ms).
 * El contenido es visible por defecto: solo se oculta, una vez cargada la página,
 * lo que está por debajo del primer pantallazo. Sin JavaScript o con
 * "movimiento reducido" nada se oculta.
 */
export function Reveal({ children, delay = 0, className = "", role }: { children: ReactNode; delay?: number; className?: string; role?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("reveal-hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-hidden");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} role={role} className={`reveal ${className}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  const left = align === "left";
  return (
    <Reveal className={left ? "mb-10 max-w-xl" : "mx-auto mb-12 max-w-2xl text-center sm:mb-14"}>
      <Dots className="mb-4" />
      <p className={`mb-3 text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-accent-400" : "text-navy-700"}`}>{eyebrow}</p>
      <h2 className={`font-display text-[1.9rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[1.05rem] leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-slate-soft"}`}>{intro}</p>}
    </Reveal>
  );
}
