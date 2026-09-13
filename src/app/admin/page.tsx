import { prisma } from "@/lib/prisma";
import { OrdersTable } from "./orders-table";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

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
          Acá ves lo que llega desde la web. Cambiá el estado a medida que
          cotizás, producís o enviás. Las fotos del catálogo se reemplazan en{" "}
          <code className="text-carbon">public/catalog/</code>.
        </p>
        <div className="mt-8">
          <OrdersTable
            orders={orders.map((order) => ({
              ...order,
              createdAt: order.createdAt.toISOString().slice(0, 16).replace("T", " "),
            }))}
          />
        </div>
      </div>
    </main>
  );
}
