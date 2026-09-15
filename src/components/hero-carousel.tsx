"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "slide-1",
    badge: "Sublimación textil",
    title: "Somos calidad y vanguardia en sublimaciones",
    highlight: "",
    compact: true,
    description:
      "Remeras con estampados reales, colores vivos y terminación de calidad profesional.",
    image: "/pl/hero-1.svg",
    alt: "Remera negra con estampado geométrico blanco",
  },
  {
    id: "slide-2",
    badge: "Personalización total",
    title: "Diseñamos lo infinito",
    highlight: "",
    compact: false,
    description:
      "Subí tu idea o elegí uno de nuestros diseños. Nosotros la llevamos a tu remera.",
    image: "/pl/hero-2.svg",
    alt: "Remera blanca con estampado tipográfico minimalista",
  },
  {
    id: "slide-3",
    badge: "Pedidos por WhatsApp",
    title: "Tu pedido, a un mensaje.",
    highlight: "Atención rápida y directa.",
    compact: false,
    description:
      "Cotizá al instante, elegí talles y colores, y recibí tu remera lista para estrenar.",
    image: "/pl/hero-3.svg",
    alt: "Remera gris con diseño personalizado",
  },
] as const;

const INTERVAL_MS = 6000;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    void video.play().catch(() => {
      // Autoplay bloqueado: el overlay y el poster cubren el fondo.
    });
  }, [reducedMotion]);

  const togglePause = () => {
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = null;
    }
    setPaused((value) => !value);
  };

  const slide = SLIDES[active];

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Presentación destacada"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-carbon"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        pauseTimeout.current = setTimeout(() => setPaused(false), 500);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => {
        pauseTimeout.current = setTimeout(() => setPaused(false), 500);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {!reducedMotion ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            style={{ filter: "blur(8px)" }}
            autoPlay
            muted
            loop
            playsInline
            poster="/pl/hero-1.svg"
          >
            <source src="/media/hero.webm" type="video/webm" />
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/pl/hero-1.svg"
            alt=""
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-carbon/70" />
      </div>

      {SLIDES.map((item, index) => (
        <div
          key={item.id}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 flex items-center transition-opacity duration-700",
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="pt-24 text-center lg:pt-0 lg:text-left">
              <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-fog">
                {item.badge}
              </p>
              <h1
                className={cn(
                  "font-black uppercase leading-[1.08] tracking-tight text-white",
                  item.compact
                    ? "text-3xl sm:text-4xl lg:text-5xl"
                    : "text-4xl sm:text-5xl lg:text-6xl"
                )}
              >
                {item.title}
                {item.highlight ? (
                  <span className="text-mist"> {item.highlight}</span>
                ) : null}
              </h1>
              <p className="mx-auto mt-6 max-w-md text-base leading-7 text-silver lg:mx-0">
                {item.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href="/#personalizador"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-carbon transition-colors hover:bg-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Armá tu remera
                </a>
                <a
                  href="/#productos"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Ver productos
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div
                className={cn(
                  "overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition-transform duration-700",
                  index === active ? "scale-100" : "scale-95"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={480}
                  height={480}
                  priority={index === 0}
                  className="h-auto w-full"
                />
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-carbon/80 px-3 py-1 text-xs font-medium text-fog backdrop-blur">
                {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Control del carrusel"
        >
          <button
            type="button"
            onClick={togglePause}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={paused ? "Reproducir carrusel" : "Pausar carrusel"}
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  index === active
                    ? "w-8 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Ir a la diapositiva ${index + 1}: ${item.title}`}
                aria-current={index === active}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Diapositiva siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm font-medium text-fog" aria-live="polite">
          {slide.title}
        </p>
      </div>
    </section>
  );
}
