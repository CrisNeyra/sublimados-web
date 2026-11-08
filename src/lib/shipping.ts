/**
 * Fase 1: estimación por zona a partir del código postal.
 * No consulta a OCA. Los importes son referencia y se confirman al cotizar.
 * Fase 2: reemplazar estimateShipping por el webservice cuando haya usuario,
 * contraseña y número de operativa.
 */

export type ShippingZone = "CABA" | "GBA" | "INTERIOR";

const ZONES: Record<ShippingZone, { label: string; priceLabel: string }> = {
  CABA: { label: "CABA", priceLabel: "$4.500" },
  GBA: { label: "GBA", priceLabel: "$6.500" },
  INTERIOR: { label: "interior del país", priceLabel: "$9.500" },
};

/** Acepta 1425, C1425 o C1425ABC y devuelve los 4 dígitos. */
export function parsePostalCode(value: string): number | null {
  const match = value.toUpperCase().match(/[A-Z]?(\d{4})/);
  if (!match) return null;
  const code = Number(match[1]);
  if (code < 1000 || code > 9999) return null;
  return code;
}

export function estimateShipping(value: string) {
  const code = parsePostalCode(value);
  if (code == null) return null;

  const zone: ShippingZone = code <= 1499 ? "CABA" : code <= 1999 ? "GBA" : "INTERIOR";
  const info = ZONES[zone];

  return {
    zone,
    code,
    label: info.label,
    priceLabel: info.priceLabel,
    summary: `Envío estimado por correo a ${info.label} (CP ${code}): ${info.priceLabel}. Es una referencia, no una cotización de OCA.`,
  };
}
