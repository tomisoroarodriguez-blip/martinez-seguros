"use client";

import { getInsurance } from "@/config/insurance";
import { trackEvent } from "@/lib/analytics";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { useQuote } from "./QuoteContext";

/** Botón flotante: el mensaje cambia según el seguro elegido en el formulario. */
export function WhatsAppFloat() {
  const { selected } = useQuote();
  const ins = selected ? getInsurance(selected) : undefined;
  const message = ins?.waMessage ?? WA_GENERIC;

  return (
    <aside aria-label="Contacto por WhatsApp">
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ins ? `Escribinos por WhatsApp: ${ins.label.toLowerCase()}` : "Escribinos por WhatsApp"}
        onClick={() => trackEvent("whatsapp_click", { origen: "flotante", seguro: ins?.id ?? "general" })}
        className="group fixed bottom-4 right-4 z-50 flex h-14 items-center gap-0 rounded-full bg-[#15803d] pl-0 text-white shadow-xl shadow-black/25 transition-[background-color,transform] duration-200 hover:scale-[1.04] hover:bg-[#116a32] sm:bottom-6 sm:right-6 md:pr-5"
      >
        <span className="relative grid h-14 w-14 place-items-center">
          <span aria-hidden className="ping-once absolute inset-1 rounded-full bg-[#15803d]" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
        <span className="hidden text-sm font-semibold md:inline">Escribinos por WhatsApp</span>
      </a>
    </aside>
  );
}
