import { SITE } from "@/lib/site";

export const FAQ_ITEMS = [
  {
    question: "¿Cómo hago un pedido?",
    answer:
      "Armá un mockup en el personalizador o elegí un modelo del catálogo y escribinos por WhatsApp. Confirmamos diseño, talle, color, precio y plazo antes de producir.",
  },
  {
    question: "¿Cómo mando mi diseño?",
    answer:
      "Podés subir una vista previa (PNG, JPG o WebP) en el personalizador. El archivo final en alta resolución lo enviás por WhatsApp. Cuanto más nítida esté la imagen, mejor queda la sublimación.",
  },
  {
    question: "¿Qué talles tienen?",
    answer:
      "Trabajamos S, M, L, XL y XXL. Si necesitás otro talle o un pedido para un grupo, consultanos y te orientamos.",
  },
  {
    question: "¿Cuánto tarda?",
    answer:
      "Los tiempos dependen de la cantidad y de la complejidad del estampado. En general, un pedido simple se coordina en unos días hábiles. Te damos fecha al confirmar.",
  },
  {
    question: "¿Cómo lavo la remera?",
    answer:
      "Lavá del revés, con agua fría o tibia y sin secar a alta temperatura. Así el color se mantiene vivo por más lavados.",
  },
  {
    question: "¿Hacen envíos?",
    answer:
      "Sí, enviamos a todo el país. El costo y el plazo se confirman según destino cuando armamos el pedido.",
  },
  {
    question: "¿Puedo ver cómo queda antes de producir?",
    answer:
      "Sí. El personalizador es una simulación del frente de la remera. No es una prueba de color de imprenta, pero sirve para ubicar el estampado. Ajustes finales los cerramos por WhatsApp.",
  },
] as const;

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-20 bg-fog py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
          Preguntas frecuentes
        </p>
        <h2 className="mt-3 text-center text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
          Antes de cotizar
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base text-smoke">
          Respuestas cortas sobre pedidos en {SITE.name}. Si falta algo, escribinos y lo resolvemos.
        </p>

        <div className="mt-10 divide-y divide-silver overflow-hidden rounded-2xl border border-silver bg-white">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group px-5 py-1">
              <summary className="cursor-pointer list-none py-4 text-left text-sm font-bold text-carbon marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="shrink-0 text-lg font-normal text-mist transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-4 text-sm leading-6 text-smoke">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
