import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATALOG_PRODUCTS, CATALOG_REVIEWS } from "../src/lib/catalog";

/**
 * Seed = script que carga datos iniciales en la base.
 * Se corre UNA vez (o cuando quieras resetear datos de demo).
 * No es parte de la web en sí: es una herramienta de desarrollo.
 */

const connectionString = (
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? ""
)
  .replace(/([?&])channel_binding=require&?/g, "$1")
  .replace(/[?&]$/, "");

if (!connectionString) {
  throw new Error(
    "Falta DATABASE_URL o DATABASE_URL_UNPOOLED en sublimados-web/.env"
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const products = CATALOG_PRODUCTS.map((product) => ({ ...product }));
const reviews = CATALOG_REVIEWS.map((review) => ({ ...review }));

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
