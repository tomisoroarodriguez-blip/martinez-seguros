"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { insuranceTypes } from "@/config/insurance";
import { trackEvent } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { insuranceIcons } from "./Icons";
import { Dots } from "./Logo";
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((t, i) => {
            const Icon = insuranceIcons[t.id];
            return (
              <Reveal key={t.id} delay={(i % 4) * 0.06}>
                <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-accent-500/50 hover:shadow-xl hover:shadow-navy-900/10">
                  <Dots className="absolute right-6 top-6 opacity-30 transition group-hover:opacity-100" size={5} />
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-navy-950">
                    <Icon size={26} aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy-900">{t.label}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-slate-soft">{t.description}</p>
                  <button
                    type="button"
                    onClick={() => startQuote(t.id)}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-800 transition hover:gap-3 hover:text-navy-700"
                  >
                    Solicitar cotización <ArrowRight size={16} aria-hidden />
                  </button>
                  <a
                    href={waLink(t.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { origen: `seguro_${t.id}` })}
                    className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-slate-soft hover:text-[#178a45]"
                  >
                    <MessageCircle size={15} aria-hidden /> Consultar por WhatsApp
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-slate-soft">
          Motos, comercio y empresas, y otros seguros: disponibilidad a confirmar por Martínez Seguros.
        </p>
      </div>
    </section>
  );
}
