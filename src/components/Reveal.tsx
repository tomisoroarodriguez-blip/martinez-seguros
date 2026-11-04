"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Dots } from "./Logo";

export function Reveal({ children, delay = 0, className, role }: { children: ReactNode; delay?: number; className?: string; role?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      role={role}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro, light }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Dots className="mb-4" />
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.18em] ${light ? "text-accent-400" : "text-navy-700"}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-white/75" : "text-slate-soft"}`}>{intro}</p>}
    </Reveal>
  );
}
