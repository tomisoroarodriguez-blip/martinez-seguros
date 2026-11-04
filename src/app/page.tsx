import { Contact } from "@/components/AboutContact";
import { Cotizador } from "@/components/Cotizador";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Seguros } from "@/components/Seguros";
import { Claims, Faq, HowItWorks, Nosotros } from "@/components/Sections";
import { faqs } from "@/config/insurance";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const heroPhoto = "/images/hero.jpg";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero photo={heroPhoto} />
        <Seguros />
        <HowItWorks />
        <Cotizador />
        <Nosotros />
        <Claims />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
