"use client";

import { Car, Check, Home, MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Dots, Isotipo } from "./Logo";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useQuote } from "./QuoteContext";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const chips = ["Cotización sin costo", "Atención personalizada", "Corredores de todas las compañías"];

export function Hero({ photo }: { photo?: string }) {
  const { startQuote } = useQuote();

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 pb-20 pt-28 text-white sm:pb-28 sm:pt-36 lg:pb-32">
      {/* Formas de fondo: muy lentas, sutiles */}
      <div aria-hidden className="drift pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-accent-500/15 blur-3xl" />
      <div aria-hidden className="drift-rev pointer-events-none absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-navy-700/60 blur-3xl" />
      <div aria-hidden className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/40 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p style={d(0)} className="rise mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent-400">
            <Dots /> Corredores de seguros · Montevideo
          </p>
          <h1 style={d(0.08)} className="rise font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Protegemos lo que <span className="text-accent-400">más importa.</span>
          </h1>
          <p style={d(0.16)} className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Te asesoramos para elegir el seguro adecuado para tu vehículo, tu hogar, tu familia y tu negocio. Tu tranquilidad, nuestra prioridad.
          </p>

          <div style={d(0.24)} className="rise mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button type="button" onClick={() => startQuote()} className="btn btn-primary w-full text-base sm:w-auto">
              Solicitar cotización
            </button>
            <a
              href={waLink(WA_GENERIC)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { origen: "hero" })}
              className="group inline-flex min-h-11 items-center gap-2 rounded-md text-base font-semibold text-white/90 transition-colors hover:text-white"
            >
              <MessageCircle size={18} aria-hidden className="text-accent-400" />
              <span className="underline decoration-white/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent-400">Prefiero escribir por WhatsApp</span>
            </a>
          </div>

          <ul style={d(0.32)} className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-2">
                <Check size={15} aria-hidden className="text-accent-400" /> {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Composición visual */}
        <div aria-hidden style={d(0.2)} className="rise relative mx-auto h-[22rem] w-full max-w-md sm:h-[27rem]">
          {photo ? (
            <div className="absolute inset-4 overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <Image src={photo} alt="" fill priority sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-900/20" />
              <Dots className="absolute bottom-5 right-5" size={8} />
            </div>
          ) : (
            <>
              <div className="absolute inset-6 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 shadow-2xl" />
              <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.5rem] bg-white shadow-2xl">
                <Isotipo className="w-28" />
              </div>
            </>
          )}
          {[
            { Icon: Car, label: "Tu vehículo", cls: "left-0 top-6", delay: 0.5 },
            { Icon: Home, label: "Tu hogar", cls: "right-0 top-24", delay: 0.62 },
            { Icon: Store, label: "Tu negocio", cls: "bottom-8 left-4", delay: 0.74 },
          ].map(({ Icon, label, cls, delay }) => (
            <div key={label} style={d(delay)} className={`rise absolute ${cls} flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-xl shadow-black/20`}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-navy-800">
                <Icon size={20} />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
