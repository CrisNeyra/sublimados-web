"use client";

import { useState } from "react";
import { Clock, MapPin, MessageCircle, Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { usePlaceOrder } from "@/lib/use-place-order";

const CONTACT_INFO = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Respuesta rápida para cotizar tu pedido.",
  },
  {
    icon: Clock,
    title: "Horarios",
    text: "Lunes a sábados, de 9 a 20 hs.",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    text: "Enviamos a todo el país.",
  },
] as const;

const INITIAL_MESSAGE = `¡Hola! Me contacto desde la web para consultar por remeras sublimadas.

Mi consulta:`;

export function Contact() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");
  const { isSending, error, submit } = usePlaceOrder();

  const composed = [
    name.trim() && `Me llamo ${name.trim()}.`,
    `Cantidad: ${quantity || "1"}.`,
    size.trim() && `Busco talle ${size}.`,
    message.trim() && message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = whatsappLink(`${INITIAL_MESSAGE}\n${composed}`);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit(
      {
        clientName: name,
        whatsapp,
        quantity,
        source: "CONTACTO",
        size: size || null,
        notes: composed,
      },
      whatsappHref
    );
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            Contacto
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Cotizá tu pedido
          </h2>
          <p className="mt-4 text-base leading-7 text-smoke">
            Completá el formulario y te llevamos a WhatsApp con tu consulta
            lista. O escribinos directamente, respondemos rápido.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="grid gap-4">
              {CONTACT_INFO.map((info) => (
                <li
                  key={info.title}
                  className="flex items-start gap-4 rounded-2xl border border-silver bg-fog p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-carbon text-white">
                    <info.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-carbon">{info.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-smoke">
                      {info.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-carbon px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon lg:hidden"
            >
              Abrir WhatsApp directo
            </a>
          </div>

          <form
            className="rounded-2xl border border-silver bg-white p-6 shadow-sm lg:col-span-3 sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-1.5 block text-sm font-medium text-carbon"
                >
                  Tu nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej: Lucía"
                  required
                  className="w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                />
              </div>
              <div>
                <label
                  htmlFor="whatsapp"
                  className="mb-1.5 block text-sm font-medium text-carbon"
                >
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  placeholder="11 1234 5678"
                  required
                  className="w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                />
                <p className="mt-1.5 text-xs text-smoke">Código de área, sin 0 ni 15.</p>
              </div>
              <div>
                <label
                  htmlFor="talle"
                  className="mb-1.5 block text-sm font-medium text-carbon"
                >
                  Talle de interés
                </label>
                <select
                  id="talle"
                  name="talle"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  className="w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                >
                  <option value="">Seleccionar…</option>
                  {["S", "M", "L", "XL", "XXL"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="cantidad"
                  className="mb-1.5 block text-sm font-medium text-carbon"
                >
                  Cantidad
                </label>
                <input
                  id="cantidad"
                  name="cantidad"
                  inputMode="numeric"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  required
                  className="w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="mensaje"
                  className="mb-1.5 block text-sm font-medium text-carbon"
                >
                  Tu consulta o diseño
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Contanos qué diseño tenés en mente…"
                  className="w-full resize-none rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                />
              </div>
            </div>
            {error && (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-carbon px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon disabled:opacity-75"
            >
              {isSending ? "Procesando..." : "Enviar por WhatsApp"}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-smoke">
              Al enviar, se abrirá WhatsApp con tu consulta armada y se registrará tu pedido.
              Tratamos esos datos según el{" "}
              <a
                href="/privacidad"
                className="font-semibold text-carbon underline underline-offset-2 hover:no-underline"
              >
                aviso de privacidad
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}