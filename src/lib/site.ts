export const SITE = {
  name: "Sublimados",
  tagline: "Estampados de infinitos diseños",
  description:
    "Remeras sublimadas con estampados de infinitos diseños. Personalización real, calidad de impresión y atención directa por WhatsApp.",
  whatsappNumber: "5491100000000",
  whatsappMessage:
    "¡Hola! Quiero hacer un pedido de remeras sublimadas. ¿Me pasan más información?",
} as const;

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