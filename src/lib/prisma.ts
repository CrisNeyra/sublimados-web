import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { databaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = databaseUrl();
  if (!connectionString) {
    throw new Error("Falta DATABASE_URL");
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient | null {
  if (!databaseUrl()) return null;
  globalForPrisma.prisma ??= createPrismaClient();
  return globalForPrisma.prisma;
}
