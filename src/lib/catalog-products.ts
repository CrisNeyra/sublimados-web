import { getPrisma } from "@/lib/prisma";
import { catalogProductsFallback, type CatalogProduct } from "@/lib/catalog";

export async function loadCatalogProducts(): Promise<CatalogProduct[]> {
  const prisma = getPrisma();
  if (!prisma) return catalogProductsFallback();

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        image: true,
        alt: true,
      },
    });
    if (products.length === 0) return catalogProductsFallback();
    return products;
  } catch (error) {
    console.error("No se pudieron cargar productos desde Neon:", error);
    return catalogProductsFallback();
  }
}

export async function loadCatalogProduct(id: string) {
  const products = await loadCatalogProducts();
  return {
    product: products.find((item) => item.id === id) ?? null,
    related: products,
  };
}
