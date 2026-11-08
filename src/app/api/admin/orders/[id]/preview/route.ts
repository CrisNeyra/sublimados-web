import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json(
      { error: "Falta DATABASE_URL en el servidor" },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  const order = await prisma.order.findUnique({
    where: { id },
    select: { designPreview: true, hasDesignPreview: true },
  });

  if (!order?.hasDesignPreview || !order.designPreview) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(Buffer.from(order.designPreview), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
