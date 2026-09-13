"use client";

import { useState } from "react";
import { Sparkles, MessageSquareShare, Check, RefreshCw } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const TSHIRT_COLORS = [
  { id: "black", name: "Negro Carbón", hex: "#0b0b0b", textColor: "#ffffff", border: "#374151" },
  { id: "white", name: "Blanco Puro", hex: "#f9fafb", textColor: "#0b0b0b", border: "#d1d5db" },
  { id: "gray", name: "Gris Melange", hex: "#9ca3af", textColor: "#111827", border: "#6b7280" },
  { id: "charcoal", name: "Gris Oscuro", hex: "#1f2937", textColor: "#f3f4f6", border: "#4b5563" },
] as const;

const DESIGNS = [
  {
    id: "geometric",
    name: "Geométrico Minimal",
    type: "vector",
    render: (colorHex: string) => {
      const isDark = colorHex === "#0b0b0b" || colorHex === "#1f2937";
      const strokeColor = isDark ? "#ffffff" : "#111827";
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <polygon points="50,20 78,70 22,70" fill="none" stroke={strokeColor} strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="70" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    },
  },
  {
    id: "typography",
    name: "Tipografía Bold",
    type: "text",
    render: (colorHex: string) => {
      const isDark = colorHex === "#0b0b0b" || colorHex === "#1f2937";
      const textColor = isDark ? "#ffffff" : "#111827";
      const subColor = isDark ? "#9ca3af" : "#4b5563";
      return (
        <div className="flex h-full w-full flex-col items-center justify-center text-center select-none">
          <span className="text-xl font-black uppercase tracking-widest leading-none" style={{ color: textColor }}>
            INFINITO
          </span>
          <span className="mt-1 text-[9px] font-semibold tracking-wider uppercase" style={{ color: subColor }}>
            Sublimados Urban
          </span>
        </div>
      );
    },
  },
  {
    id: "emblem",
    name: "Emblema Circular",
    type: "vector",
    render: (colorHex: string) => {
      const isDark = colorHex === "#0b0b0b" || colorHex === "#1f2937";
      const strokeColor = isDark ? "#ffffff" : "#111827";
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="50" cy="50" r="18" fill="none" stroke={strokeColor} strokeWidth="2" />
          <path d="M40 50 L47 57 L62 42" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    },
  },
  {
    id: "custom",
    name: "Mi Propio Diseño",
    type: "custom",
    render: (colorHex: string) => {
      const isDark = colorHex === "#0b0b0b" || colorHex === "#1f2937";
      const textColor = isDark ? "#e5e7eb" : "#374151";
      return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed p-3 text-center" style={{ borderColor: textColor }}>
          <Sparkles className="h-6 w-6" style={{ color: textColor }} />
          <span className="mt-1 text-[10px] font-bold uppercase tracking-tight" style={{ color: textColor }}>
            Tu Imagen Aquí
          </span>
        </div>
      );
    },
  },
] as const;

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export function Customizer() {
  const [selectedColor, setSelectedColor] = useState<(typeof TSHIRT_COLORS)[number]>(TSHIRT_COLORS[0]);
  const [selectedDesign, setSelectedDesign] = useState<(typeof DESIGNS)[number]>(DESIGNS[0]);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [customNote, setCustomNote] = useState("");
  const [isSending, setIsSending] = useState(false);

  const resetAll = () => {
    setSelectedColor(TSHIRT_COLORS[0]);
    setSelectedDesign(DESIGNS[0]);
    setSelectedSize("L");
    setCustomNote("");
  };

  const isCustomDesign = selectedDesign.id === "custom";

  const message = `¡Hola! Usé el personalizador de la web y quiero cotizar esta remera:
- Modelo: ${selectedColor.name}
- Estampado: ${selectedDesign.name}${isCustomDesign && customNote ? ` (Detalle: ${customNote})` : ""}
- Talle: ${selectedSize}

¿Podrían indicarme precio y tiempos de entrega?`;

  const sendQuote = async () => {
    setIsSending(true);
    try {
      await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: "Cliente Personalizador",
          size: selectedSize,
          tshirtColor: selectedColor.name,
          design:
            isCustomDesign && customNote
              ? `${selectedDesign.name}: ${customNote}`
              : selectedDesign.name,
          notes: message,
        }),
      });
    } catch {
      // El pedido en DB es un respaldo; WhatsApp sigue siendo el canal principal.
    } finally {
      setIsSending(false);
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="personalizador" className="scroll-mt-20 border-y border-silver/60 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-silver bg-fog px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-carbon">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador Interactivo
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Personalizá tu remera en vivo
          </h2>
          <p className="mt-3 text-base text-smoke">
            Elegí color, diseño y talle. Visualizá el mockup en tiempo real y envialo directo a cotizar por WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Mockup Preview */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-silver bg-fog p-8 lg:col-span-6">
            <div className="relative flex aspect-square w-full max-w-[380px] items-center justify-center">
              {/* T-Shirt SVG Canvas */}
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full drop-shadow-2xl transition-colors duration-500"
              >
                {/* Remera Base */}
                <path
                  d="M130 50 L165 85 C185 92 215 92 235 85 L270 50 L360 100 L320 170 L285 150 L285 360 L115 360 L115 150 L80 170 L40 100 Z"
                  fill={selectedColor.hex}
                  stroke={selectedColor.border}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Cuello */}
                <path
                  d="M165 85 C185 105 215 105 235 85 C215 90 185 90 165 85 Z"
                  fill="none"
                  stroke={selectedColor.border}
                  strokeWidth="2.5"
                />
                {/* Pliegues sutiles de tela */}
                <path
                  d="M125 160 Q135 240 125 340"
                  fill="none"
                  stroke={selectedColor.border}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <path
                  d="M275 160 Q265 240 275 340"
                  fill="none"
                  stroke={selectedColor.border}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              </svg>

              {/* Contenedor del Estampado en el pecho */}
              <div
                className="absolute flex h-28 w-28 items-center justify-center transition-all duration-300 pointer-events-none"
                style={{ top: "35%", left: "50%", transform: "translate(-50%, -50%)" }}
              >
                {selectedDesign.render(selectedColor.hex)}
              </div>

              {/* Tag del talle */}
              <span className="absolute bottom-3 left-4 rounded-lg bg-carbon/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                Talle: {selectedSize}
              </span>

              {/* Tag del color */}
              <span className="absolute bottom-3 right-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-carbon shadow-sm backdrop-blur">
                {selectedColor.name}
              </span>
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-smoke hover:text-carbon transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restablecer simulador
            </button>
          </div>

          {/* Panel de Controles */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            {/* Selector de Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-smoke">
                1. Seleccioná el Color de Remera
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TSHIRT_COLORS.map((c) => {
                  const active = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                        active
                          ? "border-carbon bg-carbon text-white shadow-md"
                          : "border-silver bg-white text-carbon hover:border-mist"
                      )}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-full border border-silver"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Diseño */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-smoke">
                2. Seleccioná el Diseño del Estampado
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {DESIGNS.map((d) => {
                  const active = selectedDesign.id === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDesign(d)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-all",
                        active
                          ? "border-carbon bg-carbon text-white shadow-md"
                          : "border-silver bg-white text-carbon hover:border-mist"
                      )}
                    >
                      <span>{d.name}</span>
                      {active && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {isCustomDesign && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Ej: Logo de mi banda, foto con mi perro, frase especial..."
                    className="w-full rounded-xl border border-silver bg-fog px-4 py-2.5 text-xs text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                  />
                  <p className="mt-1.5 text-[11px] text-smoke">
                    💡 Podrás adjuntar tu archivo en alta resolución al abrir el chat de WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Selector de Talle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-smoke">
                3. Seleccioná el Talle
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all",
                        active
                          ? "border-carbon bg-carbon text-white shadow-md"
                          : "border-silver bg-white text-carbon hover:border-mist"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Final */}
            <div className="rounded-2xl border border-silver bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-smoke">
                <span>Resumen de selección:</span>
                <span className="font-bold text-carbon">
                  {selectedColor.name} · {selectedDesign.name} · {selectedSize}
                </span>
              </div>
              <button
                type="button"
                onClick={sendQuote}
                disabled={isSending}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                <MessageSquareShare className="h-4 w-4" />
                {isSending ? "Guardando pedido..." : "Cotizar este Mockup por WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}