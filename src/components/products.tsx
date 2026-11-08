"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "./products-data";
import { priceFrom } from "@/lib/price";
import type { CatalogProduct } from "@/lib/catalog";

export type { CatalogProduct };

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:border-mist hover:shadow-xl hover:shadow-carbon/5">
      <Link href={`/producto/${product.id}`} className="flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-fog">
          <Image
            src={product.image}
            alt={product.alt}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-carbon/85 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-carbon">{product.name}</h3>
            <p className="shrink-0 text-sm font-bold text-carbon">{priceFrom(product.price)}</p>
          </div>
          <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-5 py-3 text-sm font-semibold text-white">
            Ver artículo
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function Products({ products }: { products: CatalogProduct[] }) {
  const [category, setCategory] = useState<string>("Todas");

  const categories = [
    ...PRODUCT_CATEGORIES.filter(
      (option) =>
        option === "Todas" ||
        products.some((product) => product.category === option)
    ),
    ...Array.from(new Set(products.map((product) => product.category))).filter(
      (option) =>
        !PRODUCT_CATEGORIES.includes(
          option as (typeof PRODUCT_CATEGORIES)[number]
        )
    ),
  ];

  const activeCategory = categories.includes(
    category as (typeof categories)[number]
  )
    ? category
    : "Todas";

  const visibleProducts =
    activeCategory === "Todas"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="productos" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            Catálogo
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Nuestras remeras
          </h2>
          <p className="mt-4 text-base leading-7 text-smoke">
            Diseños infinitos que se subliman en cada prenda. Entrá a un
            artículo para elegir talle, envío y cotizar.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon",
                activeCategory === option
                  ? "border-carbon bg-carbon text-white"
                  : "border-silver text-smoke hover:border-carbon hover:text-carbon"
              )}
              aria-pressed={activeCategory === option}
            >
              {option}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        {visibleProducts.length === 0 && (
          <p className="mt-8 text-center text-sm text-smoke">
            No hay productos en esta categoría todavía.
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-silver bg-fog p-6 text-center sm:p-8">
          <p className="text-sm leading-6 text-smoke">
            ¿No encontraste lo que buscás? Trabajamos con{" "}
            <span className="font-semibold text-carbon">
              infinitos diseños y personalización completa
            </span>
            . Enviá tu imagen o idea y la sublimamos.
          </p>
          <a
            href="#personalizador"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
          >
            Armarlo en el personalizador
          </a>
        </div>
      </div>
    </section>
  );
}
