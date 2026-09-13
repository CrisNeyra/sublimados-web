import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Seed = script que carga datos iniciales en la base.
 * Se corre UNA vez (o cuando quieras resetear datos de demo).
 * No es parte de la web en sí: es una herramienta de desarrollo.
 */

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Falta DATABASE_URL o DATABASE_URL_UNPOOLED en sublimados-web/.env"
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Remera Negra Clásica",
    category: "Geométricos",
    price: "$12.000",
    image: "/catalog/product-1.svg",
    alt: "Remera negra clásica",
  },
  {
    name: "Remera Blanca Oversize",
    category: "Tipográficos",
    price: "$12.500",
    image: "/catalog/product-2.svg",
    alt: "Remera blanca oversize",
  },
  {
    name: "Remera Gris Heather",
    category: "Personajes",
    price: "$13.000",
    image: "/catalog/product-3.svg",
    alt: "Remera gris heather",
  },
  {
    name: "Edición Especial",
    category: "Eventos",
    price: "$14.500",
    image: "/catalog/product-4.svg",
    alt: "Remera negra edición especial",
  },
];

const reviews = [
  {
    name: "Lucía Fernández",
    detail: "Pedido 10 remeras · Geométrico",
    quote:
      "La calidad es impresionante. Los colores quedaron tal cual la muestra y nos llegó todo en el tiempo pactado. ¡Súper recomendados!",
    rating: 5,
  },
  {
    name: "Diego Ramírez",
    detail: "Pedido personalizado · Mascota",
    quote:
      "Subí una foto de mi perro y la estamparon increíble. La remera se ve hermosa y el trato por WhatsApp fue súper rápido.",
    rating: 5,
  },
  {
    name: "Carla Mendoza",
    detail: "Pack corporativo · Logo",
    quote:
      "Hicieron las uniformes para la empresa con nuestro logo y quedaron impecables. Repetimos seguro para eventos internos.",
    rating: 5,
  },
  {
    name: "Julián Torres",
    detail: "Edición especial · Evento",
    quote:
      "Diseñamos la remera para una fiesta temática y fue un éxito. La sublimación tiene terminación premium, se nota el cuidado.",
    rating: 5,
  },
];

async function main() {
  console.log("🌱 Sembrando datos en Neon...");

  // Limpia solo productos y reseñas de demo (no borra pedidos reales)
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: products });
  await prisma.review.createMany({ data: reviews });

  const productCount = await prisma.product.count();
  const reviewCount = await prisma.review.count();

  console.log(`✅ Productos: ${productCount}`);
  console.log(`✅ Reseñas: ${reviewCount}`);
  console.log("Listo. Ya podés verlos en Neon o con: npx prisma studio");
}

main()
  .catch((error) => {
    console.error("❌ Error en el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
