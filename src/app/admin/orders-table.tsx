"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { OrderStatus } from "@prisma/client";

const STATUS_LABELS: Record<OrderStatus, string> = {
  NUEVO: "Nuevo",
  EN_PROCESO: "En proceso",
  ENVIADO: "Enviado",
  COMPLETADO: "Completado",
  CANCELADO: "Cancelado",
};

const STATUSES = Object.keys(STATUS_LABELS) as OrderStatus[];

export type AdminOrder = {
  id: string;
  clientName: string;
  whatsapp: string | null;
  tshirtColor: string | null;
  design: string | null;
  size: string | null;
  notes: string | null;
  status: OrderStatus;
  createdAt: string;
};

export function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function updateStatus(id: string, status: OrderStatus) {
    setPendingId(id);
    setError("");
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setPendingId(null);
    if (!response.ok) {
      setError("No se pudo actualizar el estado");
      return;
    }
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (orders.length === 0) {
    return (
      <div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={logout}
            className="text-sm font-semibold text-smoke hover:text-carbon"
          >
            Cerrar sesión
          </button>
        </div>
        <p className="mt-8 rounded-2xl border border-silver bg-white p-8 text-center text-sm text-smoke">
          Todavía no hay pedidos. Cuando alguien use Contacto o el personalizador,
          aparecen acá.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={logout}
          className="text-sm font-semibold text-smoke hover:text-carbon"
        >
          Cerrar sesión
        </button>
      </div>
      {error && (
        <p className="mb-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-silver bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-silver bg-fog text-xs uppercase tracking-wider text-smoke">
            <tr>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Cliente</th>
              <th className="px-4 py-3 font-semibold">Detalle</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-silver last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-smoke">
                  {order.createdAt}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-carbon">{order.clientName}</p>
                  {order.whatsapp && (
                    <p className="text-xs text-smoke">{order.whatsapp}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-smoke">
                  {[order.tshirtColor, order.design, order.size]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                  {order.notes && (
                    <p className="mt-1 text-xs">{order.notes}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    disabled={pendingId === order.id}
                    onChange={(event) =>
                      updateStatus(order.id, event.target.value as OrderStatus)
                    }
                    className="rounded-lg border border-silver bg-white px-2 py-1.5 text-xs font-semibold text-carbon"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
