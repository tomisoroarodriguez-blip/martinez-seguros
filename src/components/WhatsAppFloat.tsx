"use client";

import { trackEvent } from "@/lib/analytics";
import { waLink, WA_GENERIC } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA_GENERIC)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { origen: "flotante" })}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1fa855] text-white shadow-xl transition hover:scale-110 hover:bg-[#178a45]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
