export const ORDER_SOURCES = ["CATALOGO", "PERSONALIZADOR", "CONTACTO"] as const;

export type OrderSourceValue = (typeof ORDER_SOURCES)[number];

export const ORDER_SOURCE_LABELS: Record<OrderSourceValue, string> = {
  CATALOGO: "Catálogo",
  PERSONALIZADOR: "Personalizador",
  CONTACTO: "Contacto",
};

export const MAX_ORDER_QUANTITY = 500;
export const MAX_DESIGN_PREVIEW_BYTES = 700 * 1024;

export type OrderDraft = {
  clientName: string;
  whatsapp: string;
  quantity: number;
  source: OrderSourceValue;
  tshirtColor: string | null;
  design: string | null;
  size: string | null;
  notes: string | null;
  productName: string | null;
  designPreview: Uint8Array | null;
};

function decodeDesignPreview(
  value: unknown
): { ok: true; data: Uint8Array | null } | { ok: false; error: string } {
  if (value == null || value === "") return { ok: true, data: null };
  if (typeof value !== "string") {
    return { ok: false, error: "La imagen del diseño no es válida" };
  }

  const base64 = value.replace(/^data:image\/jpeg;base64,/i, "").replace(/\s/g, "");
  const maxChars = Math.ceil((MAX_DESIGN_PREVIEW_BYTES * 4) / 3) + 4;
  if (!base64 || base64.length > maxChars) {
    return { ok: false, error: "La imagen del diseño es demasiado grande" };
  }

  let binary: string;
  try {
    binary = atob(base64);
  } catch {
    return { ok: false, error: "La imagen del diseño no es válida" };
  }

  if (binary.length > MAX_DESIGN_PREVIEW_BYTES) {
    return { ok: false, error: "La imagen del diseño es demasiado grande" };
  }

  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  const isJpeg =
    bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!isJpeg) {
    return { ok: false, error: "La imagen del diseño tiene que ser JPEG" };
  }

  return { ok: true, data: bytes };
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

/** Normaliza un celular argentino a dígitos internacionales (549…). */
export function normalizeWhatsapp(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);

  if (digits.startsWith("54")) {
    if (digits.length === 12) digits = `549${digits.slice(2)}`;
  } else {
    digits = digits.replace(/^0+/, "");
    if (digits.length === 10 && digits.startsWith("15")) return null;
    if (digits.length === 10) digits = `549${digits}`;
    else if (digits.length === 11 && digits.startsWith("9")) digits = `54${digits}`;
    else return null;
  }

  if (!digits.startsWith("54") || digits.length < 12 || digits.length > 15) return null;
  return digits;
}

export function parseOrderPayload(
  body: unknown
): { ok: true; data: OrderDraft } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "El pedido está incompleto" };
  }

  const raw = body as Record<string, unknown>;
  const clientName = clip(raw.clientName, 80);
  if (!clientName || clientName.length < 2) {
    return { ok: false, error: "Ingresá tu nombre" };
  }

  const whatsappRaw = typeof raw.whatsapp === "string" ? raw.whatsapp : "";
  const whatsapp = normalizeWhatsapp(whatsappRaw);
  if (!whatsapp) {
    return {
      ok: false,
      error: "Ingresá un WhatsApp con código de área, sin 0 ni 15. Ej: 11 1234 5678",
    };
  }

  const quantityRaw = raw.quantity;
  const quantity =
    quantityRaw === undefined || quantityRaw === null || quantityRaw === ""
      ? 1
      : typeof quantityRaw === "number"
        ? quantityRaw
        : Number(quantityRaw);

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ORDER_QUANTITY) {
    return {
      ok: false,
      error: `La cantidad tiene que ser un número entre 1 y ${MAX_ORDER_QUANTITY}`,
    };
  }

  const source = typeof raw.source === "string" ? raw.source : "";
  if (!ORDER_SOURCES.includes(source as OrderSourceValue)) {
    return { ok: false, error: "Origen de pedido inválido" };
  }

  const designPreview = decodeDesignPreview(raw.designImage);
  if (!designPreview.ok) return designPreview;

  return {
    ok: true,
    data: {
      clientName,
      whatsapp,
      quantity,
      source: source as OrderSourceValue,
      tshirtColor: clip(raw.tshirtColor, 80),
      design: clip(raw.design, 500),
      size: clip(raw.size, 20),
      notes: clip(raw.notes, 4000),
      productName: clip(raw.productName, 120),
      designPreview: designPreview.data,
    },
  };
}
