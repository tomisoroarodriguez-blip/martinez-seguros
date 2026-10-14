"use client";

import { BadgeCheck, Car, Home, MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import { Dots, Isotipo } from "./Logo";
import { motion, useReducedMotion } from "motion/react";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useQuote } from "./QuoteContext";

export function Hero({ photo }: { photo?: string }) {
  const { startQuote } = useQuote();
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-accent-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-navy-700/60 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85"
          >
            <BadgeCheck size={16} className="text-accent-400" aria-hidden /> Corredores de seguros en Montevideo
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="font-display text-5xl font-extrabold tracking-tight leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Protegemos lo que <span className="text-accent-400">más importa.</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Tu tranquilidad, nuestra prioridad. Encontrá el seguro adecuado con asesoramiento personalizado.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button type="button" onClick={() => startQuote()} className="btn btn-primary text-base">
              Solicitar cotización
            </button>
            <a
              href={waLink(WA_GENERIC)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { origen: "hero" })}
              className="btn btn-ghost text-base"
            >
              <MessageCircle size={18} aria-hidden /> Hablar por WhatsApp
            </a>
          </motion.div>
          <p className="mt-6 text-sm text-white/60">Cotización sin costo · Atención personalizada · Corredores de seguros de todas las compañías</p>
        </div>

        {/* Composición visual: tarjetas de protección en torno a un escudo */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem]"
        >
          {photo ? (
            <div className="absolute inset-4 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/15">
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
            { Icon: Car, label: "Tu vehículo", cls: "left-0 top-6", d: 0 },
            { Icon: Home, label: "Tu hogar", cls: "right-0 top-24", d: 1.2 },
            { Icon: Store, label: "Tu negocio", cls: "bottom-8 left-4", d: 2.4 },
          ].map(({ Icon, label, cls, d }) => (
            <motion.div
              key={label}
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: d, ease: "easeInOut" }}
              className={`absolute ${cls} flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-xl`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-navy-800">
                <Icon size={20} />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
