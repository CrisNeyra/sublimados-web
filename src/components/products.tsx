"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  SIZES,
} from "./products-data";
import { whatsappLink } from "@/lib/site";

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  const [size, setSize] = useState<string>("L");

  const message = `¡Hola! Quiero cotizar la remera "${product.name}" (${product.price}), talle ${size}. ¿Tienen este diseño disponible?`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:border-mist hover:shadow-xl hover:shadow-carbon/5">
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
          <p className="shrink-0 text-sm font-bold text-carbon">{product.price}</p>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-smoke">
            Talle
          </legend>
          <div className="flex flex-wrap gap-2" role="group">
            {SIZES.map((option) => (
              <label
                key={option}
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  name={`size-${product.id}`}
                  value={option}
                  checked={size === option}
                  onChange={() => setSize(option)}
                  className="peer sr-only"
                />
                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-silver px-2 text-sm font-medium text-smoke transition-colors peer-checked:border-carbon peer-checked:bg-carbon peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-carbon">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
        >
          Cotizar por WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function Products() {
  const [category, setCategory] = useState<string>("Todas");

  const visibleProducts =
    category === "Todas"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === category);

  return (
    <section
      id="productos"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            Catálogo
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Nuestras remeras
          </h2>
          <p className="mt-4 text-base leading-7 text-smoke">
            Diseños infinitos que se subliman en cada prenda. Elegí un modelo
            y contanos tu idea, nosotros la estampamos.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {PRODUCT_CATEGORIES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon",
                category === option
                  ? "border-carbon bg-carbon text-white"
                  : "border-silver text-smoke hover:border-carbon hover:text-carbon"
              )}
              aria-pressed={category === option}
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

        <div className="mt-10 rounded-2xl border border-silver bg-fog p-6 text-center sm:p-8">
          <p className="text-sm leading-6 text-smoke">
            ¿No encontraste lo que buscás? Trabajamos con{" "}
            <span className="font-semibold text-carbon">
              infinitos diseños y personalización completa
            </span>
            . Enviá tu imagen o idea y la sublimamos.
          </p>
          <a
            href={whatsappLink(
              "¡Hola! Quiero un diseño personalizado para una remera sublimada."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
          >
            Pedir diseño personalizado
          </a>
        </div>
      </div>
    </section>
  );
}