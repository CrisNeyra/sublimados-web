import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, size, notes, tshirtColor, design, whatsapp } = body;

    if (!clientName || typeof clientName !== "string" || !clientName.trim()) {
      return NextResponse.json(
        { error: "El nombre del cliente es obligatorio" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        clientName: clientName.trim(),
        whatsapp: whatsapp?.trim() || null,
        tshirtColor: tshirtColor || null,
        design: design || null,
        size: size || null,
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pedido recibido correctamente",
        data: order,
      },
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
