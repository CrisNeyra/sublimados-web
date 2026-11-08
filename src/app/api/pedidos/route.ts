import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { parseOrderPayload } from "@/lib/order-payload";

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json(
        { error: "Falta DATABASE_URL en el servidor" },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = parseOrderPayload(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        clientName: parsed.data.clientName,
        whatsapp: parsed.data.whatsapp,
        quantity: parsed.data.quantity,
        source: parsed.data.source,
        tshirtColor: parsed.data.tshirtColor,
        design: parsed.data.design,
        size: parsed.data.size,
        notes: parsed.data.notes,
        productName: parsed.data.productName,
        designPreview: parsed.data.designPreview,
        hasDesignPreview: Boolean(parsed.data.designPreview),
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, id: order.id }, { status: 201 });
  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el pedido" },
      { status: 500 }
    );
  }
}
