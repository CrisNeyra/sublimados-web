import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

const STATUSES = new Set<string>(Object.values(OrderStatus));

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = body.status;

    if (typeof status !== "string" || !STATUSES.has(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el pedido" },
      { status: 500 }
    );
  }
}
