import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ProductSheet } from "@/components/product-sheet";
import { loadCatalogProduct } from "@/lib/catalog-products";
import { priceFrom } from "@/lib/price";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { product } = await loadCatalogProduct(id);
  if (!product) return { title: "Artículo" };
  return {
    title: product.name,
    description: `${product.name}. ${priceFrom(product.price)}. Precio de referencia, se confirma al cotizar.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, related } = await loadCatalogProduct(id);
  if (!product) notFound();

  return (
    <>
      <Navbar solid />
      <main id="contenido">
        <ProductSheet product={product} related={related} />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
