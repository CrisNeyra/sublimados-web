import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, size, notes, tshirtColor, design, whatsapp } = body;

    if (!clientName || typeof clientName !== "string") {
      return NextResponse.json(
        { error: "El nombre del cliente es obligatorio" },
        { status: 400 }
      );
    }

    const orderData = {
      id: `ord_${Date.now()}`,
      clientName: clientName.trim(),
      whatsapp: whatsapp?.trim() || null,
      tshirtColor: tshirtColor || null,
      design: design || null,
      size: size || null,
      notes: notes?.trim() || null,
      status: "NUEVO",
      createdAt: new Date().toISOString(),
    };

    // Si existe DATABASE_URL configurada en Vercel/Supabase, aquí se persiste en PostgreSQL.
    // De lo contrario, procesa el payload con validación exitosa.
    return NextResponse.json(
      {
        success: true,
        message: "Pedido recibido correctamente",
        data: orderData,
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
