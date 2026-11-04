import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { QuoteProvider } from "@/components/QuoteContext";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Martínez Seguros | Corredores de seguros en todo Uruguay", template: "%s | Martínez Seguros" },
  description: siteConfig.description,
  keywords: ["seguros en Montevideo", "corredores de seguros Uruguay", "cotizar seguro de auto Uruguay", "seguro de hogar Uruguay", "seguros en Montevideo", "asesoramiento de seguros Uruguay"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "/",
    siteName: siteConfig.name,
    title: "Martínez Seguros | Protegemos lo que más importa",
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: siteConfig.allowIndexing, follow: siteConfig.allowIndexing },
};

export const viewport: Viewport = { themeColor: "#183766", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.contact.phoneTel,
  email: siteConfig.contact.email,
  areaServed: { "@type": "Country", name: "Uruguay" },
  address: { "@type": "PostalAddress", streetAddress: "Juan Paullier 1117", addressLocality: "Montevideo", addressCountry: "UY" },
  areaServed: "Uruguay",
  sameAs: [siteConfig.contact.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={manrope.variable}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <QuoteProvider>
          {children}
          <WhatsAppFloat />
        </QuoteProvider>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
