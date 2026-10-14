import { siteConfig } from "@/config/site";

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_GENERIC = "Hola, quiero recibir asesoramiento sobre seguros.";
