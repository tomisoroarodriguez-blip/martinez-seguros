/**
 * Configuración central del sitio. Los datos de contacto provienen de una
 * ficha comercial y están PENDIENTES DE VALIDAR por Martínez Seguros.
 * Editar acá es suficiente: el resto de la web los consume desde este archivo.
 */
export const siteConfig = {
  name: "Martínez Seguros",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://martinez-seguros.vercel.app",
  /** Hasta el lanzamiento el sitio no se indexa. Para habilitarlo: NEXT_PUBLIC_ALLOW_INDEXING=1 */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "1",
  description:
    "Corredores de seguros en todo Uruguay. Asesoramiento personalizado en seguros de auto, hogar, vida, comercio y más. Pedí tu cotización sin costo.",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  contact: {
    // Fuente: publicaciones de Instagram (099 419 210, también para WhatsApp).
    // La ficha comercial indicaba otro teléfono (098 808 293) y correo
    // (info.martinezseguros@gmail.com): confirmar con el cliente cuál vale.
    phoneDisplay: "099 419 210",
    /** Formato internacional sin "+" ni espacios (Uruguay = 598, sin el 0 inicial) */
    whatsappNumber: "59899419210",
    phoneTel: "+59899419210",
    email: "shmartinez66@hotmail.com",
    /** Horarios no confirmados: dejar null hasta tener el dato real. */
    hours: null as string | null,
    instagram: "https://instagram.com/martinezseguros",
    instagramHandle: "@martinezseguros",
  },
};
