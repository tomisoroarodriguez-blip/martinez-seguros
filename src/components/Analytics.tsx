"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const KEY = "ms-consent";

/**
 * Banner de consentimiento + carga de Google Analytics.
 * GA solo se carga si hay NEXT_PUBLIC_GA_ID y el usuario aceptó.
 * Sin GA configurado, el banner no se muestra.
 */
export function Analytics() {
  const [choice, setChoice] = useState<"granted" | "denied" | null | undefined>(undefined);
  const gaId = siteConfig.gaId;

  useEffect(() => {
    try {
      setChoice((localStorage.getItem(KEY) as "granted" | "denied" | null) ?? null);
    } catch {
      setChoice(null);
    }
  }, []);

  if (!gaId || choice === undefined) return null;

  const save = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setChoice(v);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {choice === null && (
        <div role="dialog" aria-label="Preferencias de cookies" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:bottom-5 sm:left-5 sm:right-auto">
          <p className="text-sm text-slate-soft">Usamos cookies de analítica para mejorar el sitio, solo si lo aceptás.</p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => save("denied")} className="btn flex-1 border-2 border-slate-300 !min-h-10 !py-2 text-sm text-navy-900">
              Rechazar
            </button>
            <button type="button" onClick={() => save("granted")} className="btn btn-navy flex-1 !min-h-10 !py-2 text-sm">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
