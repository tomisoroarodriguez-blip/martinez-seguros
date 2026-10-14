import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Martínez Seguros trata los datos que enviás al solicitar una cotización.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6" id="contenido">
      <Link href="/" className="text-sm font-semibold text-navy-700">
        ← Volver al inicio
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold text-navy-900">Política de privacidad</h1>
      <p className="mt-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
        Borrador inicial: debe ser revisado y validado por Martínez Seguros (y su asesor legal) conforme a la Ley N.º 18.331 de Protección de Datos Personales de Uruguay.
      </p>
      <div className="mt-8 space-y-6 text-slate-soft">
        <section>
          <h2 className="font-semibold text-navy-900">Qué datos recibimos</h2>
          <p>Nombre, teléfono, correo y los datos del seguro que completes en el formulario. No solicitamos documentos de identidad ni datos bancarios.</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy-900">Cómo se usan</h2>
          <p>Esta versión del sitio no guarda los datos en ningún servidor: al enviar el formulario se abre WhatsApp con un mensaje con tu información, que recién se envía cuando vos lo confirmás. Usamos esos datos solo para responder tu consulta.</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy-900">Cookies y analítica</h2>
          <p>Solo se cargan herramientas de medición (Google Analytics) si están configuradas y si das tu consentimiento.</p>
        </section>
        <section>
          <h2 className="font-semibold text-navy-900">Tus derechos</h2>
          <p>
            Podés solicitar acceso, rectificación o eliminación de tus datos escribiendo a{" "}
            <a className="font-semibold underline" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
