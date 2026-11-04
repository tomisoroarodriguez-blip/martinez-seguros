"use client";

import { ChevronDown, ClipboardList, FileSearch, Handshake, HeartHandshake, LifeBuoy, ListChecks, MessageCircle, Route, ShieldAlert, Siren, UserCheck, Wrench, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/config/insurance";
import { trackEvent } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { Dots } from "./Logo";
import { Reveal, SectionHeading } from "./Reveal";

/* ───────── Cómo te ayudamos ───────── */
const steps = [
  { Icon: MessageCircle, title: "Contanos qué necesitás", text: "Completá el formulario o escribinos por WhatsApp. Es sin costo." },
  { Icon: ClipboardList, title: "Recibí asesoramiento", text: "Te presentamos alternativas de cobertura y te explicamos cada una con claridad." },
  { Icon: HeartHandshake, title: "Elegí la mejor opción", text: "Decidís la que mejor se adapte a tus necesidades, y te acompañamos en la contratación." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Cómo te ayudamos" title="Tres pasos, sin complicaciones" intro="De la primera consulta a la póliza, con una persona que te acompaña." />
        <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
          {/* línea que une los pasos (solo escritorio) */}
          <span aria-hidden className="absolute left-[16%] right-[16%] top-[2.1rem] hidden border-t-2 border-dashed border-navy-900/15 md:block" />
          {steps.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.1} className="h-full">
                <div className="relative h-full rounded-3xl bg-mist p-7 pt-9 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10">
                  <span className="absolute -top-0 left-7 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-navy-900 font-display text-lg font-bold text-accent-400 ring-4 ring-white">
                    {i + 1}
                  </span>
                  <Icon className="text-navy-700" size={30} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-soft">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── Nosotros ───────── */
const whyItems: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: UserCheck, title: "Asesoramiento personalizado", text: "Escuchamos tu situación antes de proponer cualquier alternativa." },
  { Icon: FileSearch, title: "Entendés lo que contratás", text: "Te explicamos coberturas, exclusiones y condiciones en lenguaje claro." },
  { Icon: Handshake, title: "Acompañamiento en la contratación", text: "Te guiamos en cada paso, desde la consulta hasta la póliza." },
  { Icon: LifeBuoy, title: "Orientación ante siniestros", text: "Si algo ocurre, no estás solo: te orientamos sobre cómo proceder." },
  { Icon: ListChecks, title: "Soluciones a tu medida", text: "Buscamos la opción que se adapta a tu necesidad, no una solución genérica." },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Dots className="mb-4" />
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-navy-700">Nosotros</p>
          <h2 className="font-display text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-navy-900 sm:text-4xl">Tu corredor de seguros en todo Uruguay</h2>
          <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-slate-soft">
            <p>Martínez Seguros es una corredoría de seguros que trabaja con distintas compañías aseguradoras para ayudarte a encontrar la cobertura que necesitás, con cotización sin costo y respuesta ágil. Atendemos a clientes de todo el país.</p>
            <p>Nuestro trabajo es escucharte, explicarte las alternativas con claridad y acompañarte antes, durante y después de la contratación.</p>
          </div>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {whyItems.map(({ Icon, title, text }, i) => (
            <li key={title} className={i === 4 ? "sm:col-span-2" : ""}>
              <Reveal delay={(i % 2) * 0.07} className="h-full">
                <div className="h-full rounded-3xl bg-white p-6 shadow-sm shadow-navy-900/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-100 text-navy-800">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-slate-soft">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Siniestros ───────── */
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
        <ul className="grid gap-5 md:grid-cols-3">
          {claims.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:bg-white/[0.08]">
                  <Icon className="text-accent-400" size={30} aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-8 rounded-3xl bg-white/5 p-7">
          <h3 className="font-display text-xl font-bold">Cómo contactar a la aseguradora</h3>
          <p className="mt-2 leading-relaxed text-white/75">
            Los datos de contacto y el procedimiento de denuncia figuran en tu póliza o en el sitio de tu compañía. Si no los encontrás, escribinos y te orientamos.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/65">
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

/* ───────── Preguntas frecuentes ───────── */
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
              <Reveal key={f.q} delay={Math.min(i, 3) * 0.05}>
                <div className={`rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${isOpen ? "border-accent-500/70 shadow-md shadow-navy-900/5" : "border-slate-200 hover:border-slate-300"}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-navy-900"
                    >
                      {f.q}
                      <ChevronDown className={`shrink-0 text-accent-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  </h3>
                  {/* El contenido queda en el DOM (útil para buscadores); cerrado se vuelve inerte */}
                  <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} data-open={isOpen} inert={!isOpen} className="acc-panel">
                    <div>
                      <p className="px-5 pb-5 leading-relaxed text-slate-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
