import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { Customizer } from "@/components/customizer";
import { Products } from "@/components/products";
import { About } from "@/components/about";
import { Works } from "@/components/works";
import { Contact } from "@/components/contact";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <Customizer />
        <Products />
        <About />
        <Works />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}