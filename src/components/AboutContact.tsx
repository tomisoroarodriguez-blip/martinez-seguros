"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact() {
  const c = siteConfig.contact;
  const items = [
    { Icon: Phone, label: "Teléfono", value: c.phoneDisplay, href: `tel:${c.phoneTel}` },
    { Icon: Mail, label: "Correo", value: c.email, href: `mailto:${c.email}` },
    { Icon: InstagramIcon, label: "Instagram", value: c.instagramHandle, href: c.instagram },
    { Icon: MapPin, label: "Dirección", value: c.address, href: c.mapLink },
  ];
  return (
    <section id="contacto" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contacto" title="Hablemos de tu seguro" intro="Elegí el medio que te quede más cómodo. Te respondemos a la brevedad." />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-3">
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
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-500 hover:shadow-md"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-400 transition-colors duration-200 group-hover:bg-accent-500 group-hover:text-navy-950">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-slate-soft">{label}</span>
                  <span className="block break-words font-semibold text-navy-900">{value}</span>
                </span>
              </a>
            ))}
            <div className="flex min-h-16 items-center gap-4 rounded-2xl border border-dashed border-slate-300 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-navy-800">
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
              className="h-80 w-full rounded-3xl border border-slate-200 bg-white lg:h-full lg:min-h-[28rem]"
            />
            <p className="mt-2 text-xs text-slate-soft">Dirección pendiente de validación.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
