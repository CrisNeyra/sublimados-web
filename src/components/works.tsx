import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKS = [
  {
    id: "work-1",
    src: "/catalog/remera_TS.jpg",
    alt: "Remera sublimada The Shirt",
    caption: "The Shirt · Marca",
    client: "¡¡The Shirt!!",
  },
  {
    id: "work-2",
    src: "/catalog/remera_auradev.jpg",
    alt: "Remera sublimada Aura Dev",
    caption: "Pedido · Aura Dev",
    client: "Aura Dev",
  },
  {
    id: "work-3",
    src: "/catalog/remera_aurapro.jpg",
    alt: "Remera sublimada Aura Pro",
    caption: "Pedido · Aura Pro",
    client: "Aura Pro",
  },
  {
    id: "work-4",
    src: "/catalog/remera_laxmar.jpg",
    alt: "Remera sublimada Laxmar",
    caption: "Pedido · Laxmar",
    client: "Laxmar",
  },
] as const;

export type CatalogReview = {
  id: string;
  name: string;
  detail: string;
  quote: string;
  rating: number;
};

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${count} de 5 estrellas`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            index < count
              ? "fill-carbon text-carbon"
              : "fill-silver text-silver"
          )}
        />
      ))}
    </div>
  );
}

export function Works({ reviews }: { reviews: CatalogReview[] }) {
  return (
    <section id="trabajos" className="scroll-mt-20 bg-fog py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            Trabajos realizados
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Piezas que ya cuentan una historia
          </h2>
          <p className="mt-4 text-base leading-7 text-smoke">
            Cada pedido terminado es una nueva historia. Mirá algunos de
            nuestros trabajos y lo que dicen quienes ya los recibieron.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <li key={work.id}>
              <figure className="group overflow-hidden rounded-2xl border border-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-carbon/5">
                <div className="aspect-[3/2] overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-bold text-carbon">{work.caption}</p>
                    <p className="text-sm text-smoke">{work.client}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-fog px-3 py-1 text-xs font-medium text-smoke">
                    Terminado
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="text-center text-2xl font-black uppercase tracking-tight text-carbon">
            Opiniones de nuestros clientes
          </h3>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="flex flex-col gap-4 rounded-2xl border border-silver bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-carbon text-sm font-bold text-white"
                    >
                      {review.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <div>
                      <p className="font-bold text-carbon">{review.name}</p>
                      <p className="text-xs text-smoke">{review.detail}</p>
                    </div>
                  </div>
                  <Stars count={review.rating} />
                </div>
                <blockquote className="text-sm leading-7 text-smoke">
                  “{review.quote}”
                </blockquote>
              </li>
            ))}
          </ul>

          {reviews.length === 0 && (
            <p className="mt-8 text-center text-sm text-smoke">
              Todavía no hay opiniones publicadas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
