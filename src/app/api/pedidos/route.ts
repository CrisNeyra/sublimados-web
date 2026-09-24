import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json(
        { error: "Falta DATABASE_URL en el servidor" },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const clientName = clip(body.clientName, 80);
    const whatsapp = clip(body.whatsapp, 40);
    const tshirtColor = clip(body.tshirtColor, 80);
    const design = clip(body.design, 500);
    const size = clip(body.size, 20);
    const notes = clip(body.notes, 4000);

    if (!clientName) {
      return NextResponse.json(
        { error: "El nombre del cliente es obligatorio" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        clientName,
        whatsapp,
        tshirtColor,
        design,
        size,
        notes,
      },
    });

    return NextResponse.json(
      { success: true, id: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al procesar el pedido:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el pedido" },
      { status: 500 }
    );
  }
}
