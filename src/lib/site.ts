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
  name: "¡¡The Shirt!!",
  tagline: "Calidad y vanguardia en sublimaciones",
  description:
    "¡¡The Shirt!!: sublimaciones con calidad y vanguardia. Personalización real y atención directa por WhatsApp.",
  whatsappNumber,
  whatsappMessage:
    "¡Hola! Quiero hacer un pedido en ¡¡The Shirt!!. ¿Me pasan más información?",
  url: resolveSiteUrl(),
  logoSrc: "/brand/logo.png",
};

export const NAV_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#personalizador", label: "Personalizador" },
  { href: "/#productos", label: "Productos" },
  { href: "/#quienes-somos", label: "Quiénes Somos" },
  { href: "/#trabajos", label: "Trabajos" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export function whatsappLink(message: string = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
