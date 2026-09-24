import { getPrisma } from "@/lib/prisma";
import { OrdersTable } from "./orders-table";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const prisma = getPrisma();

  if (!prisma) {
    return (
      <main className="min-h-full bg-fog px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-silver bg-white p-8">
          <h1 className="text-2xl font-black uppercase text-carbon">Pedidos</h1>
          <p className="mt-3 text-sm leading-6 text-smoke">
            Falta <code className="text-carbon">DATABASE_URL</code> en Vercel.
            Sin esa variable el panel no puede leer Neon.
          </p>
        </div>
      </main>
    );
  }

  let orders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];
  let loadError = "";

  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("No se pudieron cargar pedidos:", error);
    loadError =
      "No se pudo conectar a Neon. Revisá DATABASE_URL (pooled) en Vercel y volvé a desplegar.";
  }

  return (
    <main className="min-h-full bg-fog px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
          Panel interno
        </p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-carbon">
          Pedidos
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-smoke">
          Acá ves lo que llega desde Contacto y el personalizador. Cambiá el
          estado a medida que cotizás, producís o enviás.
        </p>
        {loadError ? (
          <p className="mt-8 rounded-2xl border border-red-200 bg-white p-8 text-sm text-red-700">
            {loadError}
          </p>
        ) : (
          <div className="mt-8">
            <OrdersTable
              orders={orders.map((order) => ({
                ...order,
                createdAt: order.createdAt
                  .toISOString()
                  .slice(0, 16)
                  .replace("T", " "),
              }))}
            />
          </div>
        )}
      </div>
    </main>
  );
}
