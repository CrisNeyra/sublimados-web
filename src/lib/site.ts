const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
  "5491100000000";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "Sublimados",
  tagline: "Estampados de infinitos diseños",
  description:
    "Remeras sublimadas con estampados de infinitos diseños. Personalización real, calidad de impresión y atención directa por WhatsApp.",
  whatsappNumber,
  whatsappMessage:
    "¡Hola! Quiero hacer un pedido de remeras sublimadas. ¿Me pasan más información?",
  url: resolveSiteUrl(),
};

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function whatsappLink(message: string = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
