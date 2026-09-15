import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { Customizer } from "@/components/customizer";
import { Products } from "@/components/products";
import { About } from "@/components/about";
import { Works } from "@/components/works";
import { Faq, FAQ_ITEMS } from "@/components/faq";
import { Contact } from "@/components/contact";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site";

export default async function Home() {
  const [products, reviews] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        image: true,
        alt: true,
      },
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        detail: true,
        quote: true,
        rating: true,
      },
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: SITE.name,
            description: SITE.description,
            url: SITE.url,
            telephone: `+${SITE.whatsappNumber}`,
            areaServed: "AR",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <Navbar />
      <main id="contenido">
        <HeroCarousel />
        <Customizer />
        <Products products={products} />
        <About />
        <Works reviews={reviews} />
        <Faq />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
