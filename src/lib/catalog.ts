export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  alt: string;
};

export const CATALOG_PRODUCTS = [
  {
    name: "Remera The Shirt",
    category: "Corporativos",
    price: "$12.000",
    image: "/catalog/remera_TS.jpg",
    alt: "Remera sublimada The Shirt",
  },
  {
    name: "Remera Aura Dev",
    category: "Corporativos",
    price: "$12.500",
    image: "/catalog/remera_auradev.jpg",
    alt: "Remera sublimada Aura Dev",
  },
  {
    name: "Remera Aura Pro",
    category: "Corporativos",
    price: "$13.000",
    image: "/catalog/remera_aurapro.jpg",
    alt: "Remera sublimada Aura Pro",
  },
  {
    name: "Remera Laxmar",
    category: "Eventos",
    price: "$14.500",
    image: "/catalog/remera_laxmar.jpg",
    alt: "Remera sublimada Laxmar",
  },
  {
    name: "Bordado a elección",
    category: "Bordados",
    price: "$15.000",
    image: "/catalog/remera_TS.jpg",
    alt: "Prenda de referencia para bordado. El motivo se elige en la ficha.",
  },
] as const;

export const CATALOG_REVIEWS = [
  {
    name: "Lucía Fernández",
    detail: "Pedido 10 remeras · Geométrico",
    quote:
      "La calidad es impresionante. Los colores quedaron tal cual la muestra y nos llegó todo en el tiempo pactado. ¡Súper recomendados!",
    rating: 5,
  },
  {
    name: "Diego Ramírez",
    detail: "Pedido personalizado · Mascota",
    quote:
      "Subí una foto de mi perro y la estamparon increíble. La remera se ve hermosa y el trato por WhatsApp fue súper rápido.",
    rating: 5,
  },
  {
    name: "Carla Mendoza",
    detail: "Pack corporativo · Logo",
    quote:
      "Hicieron las uniformes para la empresa con nuestro logo y quedaron impecables. Repetimos seguro para eventos internos.",
    rating: 5,
  },
  {
    name: "Julián Torres",
    detail: "Edición especial · Evento",
    quote:
      "Diseñamos la remera para una fiesta temática y fue un éxito. La sublimación tiene terminación premium, se nota el cuidado.",
    rating: 5,
  },
] as const;

export function catalogProductsFallback() {
  return CATALOG_PRODUCTS.map((product, index) => ({
    id: `catalog-${index}`,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    alt: product.alt,
  }));
}

export function catalogReviewsFallback() {
  return CATALOG_REVIEWS.map((review, index) => ({
    id: `review-${index}`,
    name: review.name,
    detail: review.detail,
    quote: review.quote,
    rating: review.rating,
  }));
}
