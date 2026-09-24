/**
 * Neon a veces agrega channel_binding=require.
 * En Vercel (serverless) eso suele fallar; Node local a veces no.
 */
export function databaseUrl() {
  const raw = (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL_UNPOOLED ??
    ""
  ).trim();
  if (!raw) return undefined;
  return raw
    .replace(/([?&])channel_binding=require&?/g, "$1")
    .replace(/[?&]$/, "");
}
