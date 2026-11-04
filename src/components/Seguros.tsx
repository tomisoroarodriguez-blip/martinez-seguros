"use client";

import { ArrowRight, Check } from "lucide-react";
import { insuranceTypes } from "@/config/insurance";
import { insuranceIcons } from "./Icons";
import { useQuote } from "./QuoteContext";
import { Reveal, SectionHeading } from "./Reveal";

export function Seguros() {
  const { startQuote } = useQuote();
  return (
    <section id="seguros" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Nuestros seguros"
          title="Una cobertura para cada necesidad"
          intro="Elegí la categoría y te llevamos al formulario con el seguro ya seleccionado."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((t, i) => {
            const Icon = insuranceIcons[t.id];
            return (
              <li key={t.id} className="flex">
                <Reveal delay={(i % 3) * 0.07} className="flex w-full">
                  <article className="card-hover group relative flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-navy-900/5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-500/60 hover:shadow-xl hover:shadow-navy-900/10 focus-within:border-accent-500/60">
                    <span aria-hidden className="bar-brand absolute inset-x-0 top-0 h-1" />
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-navy-950">
                      <Icon size={26} aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-bold leading-snug text-navy-900">{t.label}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-soft">{t.description}</p>
                    <ul className="mt-4 flex-1 space-y-1.5 text-sm text-navy-900/85">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-coral" /> {p}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => startQuote(t.id)}
                      aria-label={`Cotizar ${t.label}`}
                      className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-md font-semibold text-navy-800 transition-[gap,color] duration-200 hover:gap-3 hover:text-navy-700"
                    >
                      Cotizar <ArrowRight size={16} aria-hidden />
                    </button>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm text-slate-soft">
          ¿No ves lo que buscás? Contanos tu caso desde el formulario o por WhatsApp y te orientamos.
        </p>
      </div>
    </section>
  );
}
