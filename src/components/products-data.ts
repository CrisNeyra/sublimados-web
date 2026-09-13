export const PRODUCT_CATEGORIES = [
  "Todas",
  "Geométricos",
  "Tipográficos",
  "Personajes",
  "Corporativos",
  "Eventos",
] as const;

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

// Los productos ahora viven en Neon (tabla Product).
// Para cargarlos/actualizarlos de demo: npm run db:seed