export const PRODUCT_CATEGORIES = [
  "Todas",
  "Geométricos",
  "Tipográficos",
  "Personajes",
  "Corporativos",
  "Eventos",
] as const;

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export const PRODUCTS = [
  {
    id: "product-1",
    name: "Remera Negra Clásica",
    category: "Geométricos",
    price: "$12.000",
    image: "/pl/product-1.svg",
    alt: "Remera negra clásica",
  },
  {
    id: "product-2",
    name: "Remera Blanca Oversize",
    category: "Tipográficos",
    price: "$12.500",
    image: "/pl/product-2.svg",
    alt: "Remera blanca oversize",
  },
  {
    id: "product-3",
    name: "Remera Gris Heather",
    category: "Personajes",
    price: "$13.000",
    image: "/pl/product-3.svg",
    alt: "Remera gris heather",
  },
  {
    id: "product-4",
    name: "Edición Especial",
    category: "Eventos",
    price: "$14.500",
    image: "/pl/product-4.svg",
    alt: "Remera negra edición especial",
  },
] as const;