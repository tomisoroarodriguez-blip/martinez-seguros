"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="nosotros" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy-700">Nosotros</p>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">Tu corredor de seguros en Montevideo</h2>
          <div className="mt-5 space-y-4 text-lg text-slate-soft">
            <p>
              Martínez Seguros es una corredoría de seguros que trabaja con distintas compañías aseguradoras para ayudarte a encontrar la cobertura que necesitás, con cotización sin costo y respuesta ágil.
            </p>
            <p>Nuestro trabajo es escucharte, explicarte las alternativas con claridad y acompañarte antes, durante y después de la contratación.</p>
          </div>
          <p className="mt-5 text-xs text-slate-soft">Texto basado en el perfil de Instagram. Pendiente: historia, equipo y fotografías autorizadas.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Cotización", "sin costo"],
              ["Respuesta", "ágil"],
              ["Trato", "personalizado"],
              ["Ubicación", "Montevideo"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-3xl bg-navy-900 p-6 text-white">
                <p className="text-sm text-white/60">{a}</p>
                <p className="mt-1 font-display text-2xl font-semibold text-accent-400">{b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const c = siteConfig.contact;
  const items = [
    { Icon: Phone, label: "Teléfono", value: c.phoneDisplay, href: `tel:${c.phoneTel}` },
    { Icon: Mail, label: "Correo", value: c.email, href: `mailto:${c.email}` },
    { Icon: InstagramIcon, label: "Instagram", value: c.instagramHandle, href: c.instagram },
    { Icon: MapPin, label: "Dirección", value: c.address, href: c.mapLink },
  ];
  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contacto" title="Hablemos de tu seguro" />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <a
              href={waLink(WA_GENERIC)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { origen: "contacto" })}
              className="btn btn-wa w-full text-base"
            >
              <WhatsAppIcon className="h-5 w-5" /> Escribinos por WhatsApp
            </a>
            {items.map(({ Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex min-h-16 items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-accent-500 hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-slate-soft">{label}</span>
                  <span className="block break-words font-semibold text-navy-900">{value}</span>
                </span>
              </a>
            ))}
            <div className="flex min-h-16 items-center gap-4 rounded-2xl border border-dashed border-slate-300 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-navy-800">
                <Clock size={20} aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-slate-soft">Horarios de atención</span>
                <span className="block font-semibold text-navy-900">{c.hours ?? "Consultanos por WhatsApp"}</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <iframe
              title="Mapa de la ubicación de Martínez Seguros"
              src={c.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-3xl border border-slate-200 lg:h-full lg:min-h-[28rem]"
            />
            <p className="mt-2 text-xs text-slate-soft">Dirección pendiente de validación.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
