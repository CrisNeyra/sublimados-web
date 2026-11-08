"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { priceFrom } from "@/lib/price";
import { estimateShipping } from "@/lib/shipping";
import { SIZES } from "@/components/products-data";
import { QuoteDialog, type EmbroideryChoice } from "@/components/quote-dialog";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const EMBROIDERY_KINDS = ["Nombre o iniciales", "Logo", "Frase corta"] as const;
const EMBROIDERY_PLACES = ["Pecho", "Espalda", "Manga"] as const;

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20";

export function ProductSheet({
  product,
  related,
}: {
  product: CatalogProduct;
  related: CatalogProduct[];
}) {
  const isEmbroidery = product.category === "Bordados";
  const [size, setSize] = useState<string>("L");
  const [quantity, setQuantity] = useState("1");
  const [postalCode, setPostalCode] = useState("");
  const [kind, setKind] = useState<(typeof EMBROIDERY_KINDS)[number]>(EMBROIDERY_KINDS[0]);
  const [text, setText] = useState("");
  const [place, setPlace] = useState<(typeof EMBROIDERY_PLACES)[number]>("Pecho");
  const [quoting, setQuoting] = useState(false);
  const shipping = estimateShipping(postalCode);
  const others = related.filter((item) => item.id !== product.id).slice(0, 4);

  const embroidery: EmbroideryChoice | null = isEmbroidery
    ? { kind, text, place }
    : null;

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-28 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-silver bg-fog">
          <Image
            src={product.image}
            alt={product.alt}
            width={900}
            height={900}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-smoke">
            <Link href="/#productos" className="hover:text-carbon">
              Catálogo
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-carbon">{product.name}</span>
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-black text-carbon">{priceFrom(product.price)}</p>
          <p className="mt-2 text-sm leading-6 text-smoke">
            Precio de referencia por prenda. Se confirma al cotizar, según cantidad y diseño.
          </p>
          {isEmbroidery && (
            <p className="mt-3 text-sm leading-6 text-smoke">
              La foto es una prenda de referencia. Elegí qué bordar y la ubicación.
            </p>
          )}

          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-carbon">Talle</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold",
                    size === option
                      ? "border-carbon bg-carbon text-white"
                      : "border-silver text-carbon hover:border-carbon"
                  )}
                  aria-pressed={size === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          {isEmbroidery && (
            <div className="mt-8 space-y-5">
              <fieldset>
                <legend className="text-sm font-bold text-carbon">Qué bordar</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EMBROIDERY_KINDS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setKind(option)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium",
                        kind === option
                          ? "border-carbon bg-carbon text-white"
                          : "border-silver text-smoke hover:text-carbon"
                      )}
                      aria-pressed={kind === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm font-medium text-carbon" htmlFor="bordado-texto">
                Texto o detalle
                <input
                  id="bordado-texto"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder={kind === "Logo" ? "Ej: logo de la empresa" : "Ej: Ana"}
                  className={fieldClass}
                />
              </label>
              <fieldset>
                <legend className="text-sm font-bold text-carbon">Ubicación</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EMBROIDERY_PLACES.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPlace(option)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium",
                        place === option
                          ? "border-carbon bg-carbon text-white"
                          : "border-silver text-smoke hover:text-carbon"
                      )}
                      aria-pressed={place === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          <label className="mt-8 block text-sm font-medium text-carbon" htmlFor="cantidad-ficha">
            Cantidad
            <input
              id="cantidad-ficha"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              inputMode="numeric"
              min={1}
              max={500}
              className={fieldClass}
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-carbon" htmlFor="cp-ficha">
            Código postal
            <input
              id="cp-ficha"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              inputMode="numeric"
              placeholder="Ej: 1425"
              className={fieldClass}
            />
          </label>
          <p className="mt-1.5 text-sm text-smoke">
            {shipping
              ? shipping.summary
              : "Envío estimado por correo. Con 4 dígitos vemos si es CABA, GBA o interior."}
          </p>

          <button
            type="button"
            onClick={() => setQuoting(true)}
            className="mt-8 w-full rounded-full bg-carbon px-6 py-3.5 text-sm font-bold text-white hover:bg-graphite"
          >
            Cotizar por WhatsApp
          </button>
        </div>
      </div>

      {others.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <h2 className="text-lg font-black uppercase tracking-tight text-carbon">
            Otras remeras
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <li key={item.id}>
                <Link href={`/producto/${item.id}`} className="block overflow-hidden rounded-2xl border border-silver">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={320}
                    height={320}
                    className="aspect-square w-full object-cover"
                  />
                  <span className="block px-4 py-3 text-sm font-bold text-carbon">{item.name}</span>
                  <span className="block px-4 pb-4 text-sm text-smoke">{priceFrom(item.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quoting && (
        <QuoteDialog
          product={product}
          size={size}
          quantity={quantity}
          postalCode={postalCode}
          embroidery={embroidery}
          onClose={() => setQuoting(false)}
        />
      )}
    </div>
  );
}
