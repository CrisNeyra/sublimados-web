import { Palette, Printer, HeartHandshake } from "lucide-react";

const VALUES = [
  {
    icon: Palette,
    title: "Diseño sin límites",
    description:
      "De anime a minimalista, de frases a corporativo: estampamos la idea que tengas en mente.",
  },
  {
    icon: Printer,
    title: "Calidad de impresión",
    description:
      "Sublimación real que fija el color en la fibra: no se agrieta, no se pela y dura lavado tras lavado.",
  },
  {
    icon: HeartHandshake,
    title: "Atención cercana",
    description:
      "Hablamos directo por WhatsApp, respondemos rápido y cuidamos cada pedido como si fuera propio.",
  },
] as const;

export function About() {
  return (
    <section
      id="quienes-somos"
      className="scroll-mt-20 bg-carbon py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
              Quiénes somos
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Un emprendimiento hecho a mano
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-silver">
              Somos un taller de sublimación textil apasionado por los detalles.
              Convertimos remeras en piezas únicas: cada estampado sale de una
              idea, una foto, una banda favorita o un logo que quieras llevar.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-silver">
              Creemos en lo simple: buena calidad, precios claros y trato
              directo. Por eso trabajamos con colores vivos, materiales
              cómodos y un proceso transparente de principio a fin.
            </p>

            <a
              href="#trabajos"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-carbon transition-colors hover:bg-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver nuestros trabajos
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-1">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/25 hover:bg-white/10 sm:flex-row"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-white">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-fog">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}