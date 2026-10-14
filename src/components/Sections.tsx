"use client";

import { ChevronDown, ClipboardList, FileSearch, Handshake, HeartHandshake, LifeBuoy, ListChecks, MessageCircle, Route, ShieldAlert, Siren, UserCheck, Wrench, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/config/insurance";
import { trackEvent } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { Reveal, SectionHeading } from "./Reveal";

const whyItems: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: UserCheck, title: "Asesoramiento personalizado", text: "Escuchamos tu situación antes de proponer cualquier alternativa." },
  { Icon: FileSearch, title: "Entendés lo que contratás", text: "Te explicamos las coberturas, exclusiones y condiciones en lenguaje claro." },
  { Icon: Handshake, title: "Acompañamiento en la contratación", text: "Te guiamos en cada paso, desde la consulta hasta la póliza." },
  { Icon: LifeBuoy, title: "Orientación ante siniestros", text: "Si algo ocurre, no estás solo: te orientamos sobre cómo proceder." },
  { Icon: ListChecks, title: "Soluciones a tu medida", text: "Buscamos la opción que se adapta a tu necesidad, no una solución genérica." },
];

export function WhyUs() {
  return (
    <section id="por-que" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Por qué elegirnos" title="Contratar con un asesor hace la diferencia" intro="Un corredor de seguros te ayuda a decidir con información, no a ciegas." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="h-full rounded-3xl bg-mist p-7 transition hover:bg-accent-100/60">
                <Icon className="text-navy-700" size={30} aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">{title}</h3>
                <p className="mt-2 text-slate-soft">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { Icon: MessageCircle, title: "Contanos qué necesitás", text: "Completá el formulario o escribinos por WhatsApp." },
  { Icon: ClipboardList, title: "Recibí asesoramiento", text: "Te presentamos alternativas de cobertura y te explicamos cada una." },
  { Icon: HeartHandshake, title: "Elegí la mejor opción", text: "Decidís la que mejor se adapte a tus necesidades." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Cómo funciona" title="Tres pasos, sin complicaciones" />
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <li className="relative h-full rounded-3xl bg-white p-8 shadow-sm">
                <span className="absolute -top-5 left-8 grid h-10 w-10 place-items-center rounded-full bg-navy-900 font-display text-lg font-semibold text-accent-400">{i + 1}</span>
                <Icon className="mt-3 text-navy-700" size={34} aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 text-slate-soft">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const claims = [
  { Icon: Route, title: "Accidente de tránsito", text: "Cuidá tu seguridad y la de los demás, avisá a emergencias si hay heridos, y registrá la escena y los datos de los involucrados." },
  { Icon: Wrench, title: "Daños en el hogar", text: "Evitá mayores daños si es seguro hacerlo, sacá fotos de lo afectado y conservá comprobantes." },
  { Icon: Siren, title: "Robo o hurto", text: "Realizá la denuncia policial y reuní la información de lo sustraído. Luego avisá a tu aseguradora o a nosotros." },
];

export function Claims() {
  return (
    <section id="siniestros" className="bg-navy-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading light eyebrow="Para clientes" title="¿Qué hacer en caso de siniestro?" intro="Pautas generales para mantener la calma y actuar con orden." />
        <div className="grid gap-5 md:grid-cols-3">
          {claims.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                <Icon className="text-accent-400" size={30} aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/75">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 rounded-3xl bg-white/5 p-7">
          <h3 className="font-display text-xl font-semibold">Cómo contactar a la aseguradora</h3>
          <p className="mt-2 text-white/75">
            Los datos de contacto y el procedimiento de denuncia figuran en tu póliza o en el sitio de tu compañía. Si no los encontrás, escribinos y te orientamos.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/60">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-accent-400" aria-hidden />
            Esta información es general. Los procedimientos específicos, plazos y requisitos dependen de la compañía y de tu póliza.
          </p>
          <a
            href={waLink("Hola, tuve un siniestro y necesito asesoramiento.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { origen: "siniestro" })}
            className="btn btn-primary mt-6"
          >
            Necesito asesoramiento
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Respuestas claras para decidir tranquilo" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-white">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900"
                  >
                    {f.q}
                    <ChevronDown className={`shrink-0 text-accent-500 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen} className="px-5 pb-5 text-slate-soft">
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
