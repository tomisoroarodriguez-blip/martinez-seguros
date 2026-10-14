"use client";

import { CheckCircle2, Lock, Send } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { getInsurance, insuranceTypes, type InsuranceId } from "@/config/insurance";
import { trackEvent } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { useQuote } from "./QuoteContext";
import { WhatsAppIcon } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";

type FieldDef = { name: string; label: string; type?: "text" | "number" | "select"; options?: string[]; placeholder?: string; required?: boolean };

const USO = ["Particular", "Trabajo / comercial", "Aplicaciones de transporte", "Otro"];
const COBERTURA_VEH = ["No lo sé, necesito orientación", "Responsabilidad civil (terceros)", "Cobertura intermedia", "Cobertura amplia"];
const PROPIEDAD = ["Casa", "Apartamento", "Local", "Otro"];
const COBERTURA_HOGAR = ["No lo sé, necesito orientación", "Incendio y daños edilicios", "Contenido / robo", "Cobertura integral"];
const PROTECCION = ["No lo sé, necesito orientación", "Local y contenido", "Responsabilidad civil", "Equipo de trabajo", "Cobertura integral"];

const vehicleFields: FieldDef[] = [
  { name: "marca", label: "Marca", placeholder: "Ej: Chevrolet", required: true },
  { name: "modelo", label: "Modelo", placeholder: "Ej: Onix", required: true },
  { name: "anio", label: "Año", type: "number", placeholder: "Ej: 2019", required: true },
  { name: "uso", label: "Uso del vehículo", type: "select", options: USO, required: true },
  { name: "cobertura", label: "Cobertura solicitada", type: "select", options: COBERTURA_VEH, required: true },
];

const specificFields: Partial<Record<InsuranceId, FieldDef[]>> = {
  auto: vehicleFields,
  moto: vehicleFields,
  hogar: [
    { name: "localidad", label: "Localidad", placeholder: "Ej: Montevideo", required: true },
    { name: "propiedad", label: "Tipo de propiedad", type: "select", options: PROPIEDAD, required: true },
    { name: "cobertura", label: "Cobertura requerida", type: "select", options: COBERTURA_HOGAR, required: true },
  ],
  empresa: [
    { name: "rubro", label: "Rubro", placeholder: "Ej: Comercio minorista", required: true },
    { name: "localidad", label: "Localidad", placeholder: "Ej: Montevideo", required: true },
    { name: "proteccion", label: "Protección requerida", type: "select", options: PROTECCION, required: true },
  ],
};

type Values = Record<string, string>;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values, fields: FieldDef[], privacy: boolean) {
  const e: Values = {};
  if (v.nombre.trim().length < 3) e.nombre = "Ingresá tu nombre completo.";
  const digits = v.telefono.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 12) e.telefono = "Ingresá un teléfono válido (ej: 099 123 456).";
  if (!emailRe.test(v.email.trim())) e.email = "Ingresá un correo válido (ej: nombre@correo.com).";
  if (!v.tipo) e.tipo = "Elegí el tipo de seguro.";
  for (const f of fields) {
    const val = (v[f.name] ?? "").trim();
    if (f.required && !val) e[f.name] = f.type === "select" ? "Elegí una opción." : "Completá este campo.";
    if (f.name === "anio" && val) {
      const n = Number(val);
      if (!Number.isInteger(n) || n < 1950 || n > new Date().getFullYear() + 1) e.anio = "Ingresá un año válido.";
    }
  }
  if (!privacy) e.privacy = "Necesitamos tu conformidad para contactarte.";
  return e;
}

function buildMessage(v: Values, fields: FieldDef[]) {
  const tipo = getInsurance(v.tipo)?.label ?? v.tipo;
  const lines = [
    "Hola, quiero solicitar una cotización de seguro.",
    "",
    `*Seguro:* ${tipo}`,
    `*Nombre:* ${v.nombre.trim()}`,
    `*Teléfono:* ${v.telefono.trim()}`,
    `*Correo:* ${v.email.trim()}`,
    ...fields.filter((f) => v[f.name]?.trim()).map((f) => `*${f.label}:* ${v[f.name].trim()}`),
  ];
  if (v.info?.trim()) lines.push(`*Información adicional:* ${v.info.trim()}`);
  return lines.join("\n");
}

const empty: Values = { nombre: "", telefono: "", email: "", tipo: "", info: "" };

export function Cotizador() {
  const { selected, setSelected } = useQuote();
  const [values, setValues] = useState<Values>(empty);
  const [privacy, setPrivacy] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  // El seguro elegido en las tarjetas manda sobre el valor local.
  const tipo = selected || (values.tipo as InsuranceId | "");
  const merged = useMemo(() => ({ ...values, tipo }), [values, tipo]);
  const fields = tipo ? specificFields[tipo] ?? [] : [];
  const errors = touched ? validate(merged, fields, privacy) : {};

  const set = (name: string, value: string) => setValues((p) => ({ ...p, [name]: value }));

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setTouched(true);
    const errs = validate(merged, fields, privacy);
    if (Object.keys(errs).length) {
      const first = ["nombre", "telefono", "email", "tipo", ...fields.map((f) => f.name), "privacy"].find((k) => errs[k]);
      document.getElementById(first === "privacy" ? "privacy" : first!)?.focus();
      return;
    }
    const url = waLink(buildMessage(merged, fields));
    trackEvent("quote_submit", { seguro: tipo });
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
  }

  function reset() {
    setValues(empty);
    setSelected("");
    setPrivacy(false);
    setTouched(false);
    setSent(null);
  }

  const err = (n: string) => errors[n];
  const common = (n: string) => ({
    id: n,
    name: n,
    "aria-invalid": err(n) ? true : undefined,
    "aria-describedby": err(n) ? `${n}-err` : undefined,
  });
  const Err = ({ n }: { n: string }) =>
    err(n) ? (
      <p id={`${n}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-600">
        {err(n)}
      </p>
    ) : null;

  return (
    <section id="cotizar" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div aria-hidden className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Solicitá tu cotización"
          title="Contanos qué necesitás"
          intro="Completá lo básico y se abre WhatsApp con tus datos ordenados. Un asesor te responde con alternativas; no mostramos precios automáticos."
        />
        <Reveal>
          {sent ? (
            <div role="status" className="rounded-3xl bg-white p-8 text-center text-ink shadow-2xl">
              <CheckCircle2 className="mx-auto text-accent-500" size={48} aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-semibold text-navy-900">¡Listo! Ya podés enviar tu consulta</h3>
              <p className="mt-2 text-slate-soft">
                Abrimos WhatsApp con tus datos. Si no se abrió, usá el botón. Recién se envía cuando presionás “Enviar” en WhatsApp.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={sent} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" /> Abrir WhatsApp
                </a>
                <button type="button" onClick={reset} className="btn border-2 border-slate-300 text-navy-900">
                  Hacer otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-9">
              <div>
                <label htmlFor="tipo" className="mb-1.5 block text-sm font-semibold text-navy-900">
                  Tipo de seguro *
                </label>
                <select
                  {...common("tipo")}
                  className="field"
                  value={tipo}
                  onChange={(e) => {
                    setSelected(e.target.value as InsuranceId | "");
                    set("tipo", e.target.value);
                  }}
                >
                  <option value="">Elegí una opción</option>
                  {insuranceTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <Err n="tipo" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-navy-900">
                    Nombre completo *
                  </label>
                  <input {...common("nombre")} className="field" autoComplete="name" value={values.nombre} onChange={(e) => set("nombre", e.target.value)} />
                  <Err n="nombre" />
                </div>
                <div>
                  <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold text-navy-900">
                    Teléfono *
                  </label>
                  <input {...common("telefono")} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="099 123 456" value={values.telefono} onChange={(e) => set("telefono", e.target.value)} />
                  <Err n="telefono" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-900">
                    Correo electrónico *
                  </label>
                  <input {...common("email")} className="field" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
                  <Err n="email" />
                </div>
              </div>

              {fields.length > 0 && (
                <fieldset className="grid gap-5 rounded-2xl bg-mist p-5 sm:grid-cols-2">
                  <legend className="px-2 text-sm font-semibold text-navy-800">
                    Datos de {getInsurance(tipo)?.label.toLowerCase()}
                  </legend>
                  {fields.map((f) => (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="mb-1.5 block text-sm font-semibold text-navy-900">
                        {f.label} *
                      </label>
                      {f.type === "select" ? (
                        <select {...common(f.name)} className="field" value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                          <option value="">Elegí una opción</option>
                          {f.options!.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          {...common(f.name)}
                          className="field"
                          type={f.type === "number" ? "number" : "text"}
                          inputMode={f.type === "number" ? "numeric" : undefined}
                          placeholder={f.placeholder}
                          value={values[f.name] ?? ""}
                          onChange={(e) => set(f.name, e.target.value)}
                        />
                      )}
                      <Err n={f.name} />
                    </div>
                  ))}
                </fieldset>
              )}

              <div>
                <label htmlFor="info" className="mb-1.5 block text-sm font-semibold text-navy-900">
                  Información adicional <span className="font-normal text-slate-soft">(opcional)</span>
                </label>
                <textarea id="info" name="info" rows={3} maxLength={500} className="field" value={values.info} onChange={(e) => set("info", e.target.value)} />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-soft">
                  <input
                    id="privacy"
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                    aria-invalid={err("privacy") ? true : undefined}
                    aria-describedby={err("privacy") ? "privacy-err" : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-accent-500"
                  />
                  <span>
                    Acepto que Martínez Seguros use estos datos solo para responder mi consulta. Leé la{" "}
                    <Link href="/privacidad" className="font-semibold text-navy-800 underline">
                      política de privacidad
                    </Link>
                    .
                  </span>
                </label>
                <Err n="privacy" />
              </div>

              {touched && Object.keys(errors).length > 0 && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  Revisá los campos marcados para continuar.
                </p>
              )}

              <button type="submit" className="btn btn-primary w-full text-base">
                <Send size={18} aria-hidden /> Enviar consulta por WhatsApp
              </button>
              <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-soft">
                <Lock size={13} aria-hidden /> No pedimos documentos ni datos sensibles. Esta solicitud no es una cotización definitiva.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
