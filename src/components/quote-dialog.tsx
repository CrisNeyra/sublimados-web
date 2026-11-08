"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareShare } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { usePlaceOrder } from "@/lib/use-place-order";
import { priceFrom } from "@/lib/price";
import { estimateShipping } from "@/lib/shipping";
import type { CatalogProduct } from "@/lib/catalog";

export type EmbroideryChoice = {
  kind: string;
  text: string;
  place: string;
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20";

export function QuoteDialog({
  product,
  size,
  quantity: initialQuantity = "1",
  postalCode: initialPostal = "",
  embroidery,
  onClose,
}: {
  product: CatalogProduct;
  size: string;
  quantity?: string;
  postalCode?: string;
  embroidery?: EmbroideryChoice | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [postalCode, setPostalCode] = useState(initialPostal);
  const { isSending, error, submit } = usePlaceOrder();
  const shipping = estimateShipping(postalCode);
  const reference = priceFrom(product.price);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  }, []);

  const quoteMessage = [
    `¡Hola! Quiero cotizar ${quantity || "1"} ${product.category === "Bordados" ? "prenda" : "remera"}${quantity === "1" ? "" : "s"} "${product.name}".`,
    `Precio de referencia: ${reference}. Se confirma al cotizar.`,
    `Talle ${size}.`,
    embroidery
      ? `Bordado: ${embroidery.kind}${embroidery.text.trim() ? ` (${embroidery.text.trim()})` : ""}, ubicación ${embroidery.place}.`
      : null,
    shipping ? shipping.summary : null,
    `Me llamo ${name.trim() || "—"}.`,
  ]
    .filter(Boolean)
    .join("\n");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saved = await submit(
      {
        clientName: name,
        whatsapp,
        quantity,
        source: "CATALOGO",
        productName: product.name,
        size,
        design: embroidery
          ? `${embroidery.kind} · ${embroidery.place}${embroidery.text.trim() ? ` · ${embroidery.text.trim()}` : ""}`
          : product.category,
        notes: quoteMessage,
      },
      whatsappLink(quoteMessage)
    );
    if (saved) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="quote-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,28rem)] overflow-y-auto rounded-2xl border border-silver bg-white p-6 text-carbon shadow-xl backdrop:bg-carbon/50"
    >
      <form onSubmit={onSubmit}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
          Cotizar
        </p>
        <h3 id="quote-title" className="mt-2 text-xl font-black uppercase tracking-tight">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-smoke">
          {reference} · talle {size}. El precio es de referencia y se confirma por WhatsApp.
        </p>
        {embroidery && (
          <p className="mt-2 text-sm text-carbon">
            {embroidery.kind}
            {embroidery.text.trim() ? `: ${embroidery.text.trim()}` : ""} · {embroidery.place}
          </p>
        )}

        <label className="mt-5 block text-sm font-medium" htmlFor="quote-nombre">
          Tu nombre
          <input
            id="quote-nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Ej: Lucía"
            className={fieldClass}
            required
            autoFocus
          />
        </label>

        <label className="mt-4 block text-sm font-medium" htmlFor="quote-whatsapp">
          WhatsApp
          <input
            id="quote-whatsapp"
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            placeholder="11 1234 5678"
            className={fieldClass}
            required
          />
        </label>
        <p className="mt-1.5 text-xs text-smoke">Código de área, sin 0 ni 15.</p>

        <label className="mt-4 block text-sm font-medium" htmlFor="quote-cantidad">
          Cantidad
          <input
            id="quote-cantidad"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            inputMode="numeric"
            min={1}
            max={500}
            className={fieldClass}
            required
          />
        </label>

        <label className="mt-4 block text-sm font-medium" htmlFor="quote-cp">
          Código postal
          <input
            id="quote-cp"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            inputMode="numeric"
            placeholder="Ej: 1425"
            className={fieldClass}
          />
        </label>
        <p className="mt-1.5 text-xs text-smoke">
          {shipping
            ? shipping.summary
            : "Envío estimado por correo. Con 4 dígitos vemos la zona."}
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            disabled={isSending}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white disabled:opacity-70"
          >
            <MessageSquareShare className="h-4 w-4" aria-hidden="true" />
            {isSending ? "Guardando..." : "Cotizar por WhatsApp"}
          </button>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-full border border-silver px-5 py-3 text-sm font-semibold text-smoke hover:text-carbon"
          >
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  );
}
