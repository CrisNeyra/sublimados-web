"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, MessageSquareShare, Check, RefreshCw } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
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
            {SITE.name}
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

const PRINT_POSITIONS = [
  { id: "top", label: "Superior", top: 22 },
  { id: "center", label: "Centro", top: 35 },
  { id: "bottom", label: "Inferior", top: 52 },
] as const;

const PRINT_HORIZONTAL = [
  { id: "left", label: "Izquierda", left: 38 },
  { id: "center", label: "Centro", left: 50 },
  { id: "right", label: "Derecha", left: 62 },
] as const;

const PRINT_SCALES = [
  { id: "s", label: "Chico", value: 0.7 },
  { id: "m", label: "Medio", value: 1 },
  { id: "l", label: "Grande", value: 1.3 },
] as const;

const PRINT_ROTATIONS = [
  { id: "left", label: "−15°", value: -15 },
  { id: "none", label: "0°", value: 0 },
  { id: "right", label: "+15°", value: 15 },
] as const;

const TORSO = { minX: 34, maxX: 66, minY: 20, maxY: 56 };

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const customDesign = DESIGNS[3];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Customizer() {
  const [selectedColor, setSelectedColor] = useState<(typeof TSHIRT_COLORS)[number]>(TSHIRT_COLORS[0]);
  const [selectedDesign, setSelectedDesign] = useState<(typeof DESIGNS)[number]>(DESIGNS[0]);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [customNote, setCustomNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [printPosition, setPrintPosition] = useState<(typeof PRINT_POSITIONS)[number]>(PRINT_POSITIONS[1]);
  const [printHorizontal, setPrintHorizontal] = useState<(typeof PRINT_HORIZONTAL)[number]>(PRINT_HORIZONTAL[1]);
  const [printScale, setPrintScale] = useState<(typeof PRINT_SCALES)[number]>(PRINT_SCALES[1]);
  const [printRotation, setPrintRotation] = useState<(typeof PRINT_ROTATIONS)[number]>(PRINT_ROTATIONS[1]);
  const [printX, setPrintX] = useState(50);
  const [printY, setPrintY] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shirtRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  const isCustomDesign = selectedDesign.id === "custom";

  useEffect(() => {
    return () => {
      if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    };
  }, [uploadPreview]);

  const clearUpload = () => {
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadPreview(null);
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetAll = () => {
    setSelectedColor(TSHIRT_COLORS[0]);
    setSelectedDesign(DESIGNS[0]);
    setSelectedSize("L");
    setCustomNote("");
    setPrintPosition(PRINT_POSITIONS[1]);
    setPrintHorizontal(PRINT_HORIZONTAL[1]);
    setPrintScale(PRINT_SCALES[1]);
    setPrintRotation(PRINT_ROTATIONS[1]);
    setPrintX(50);
    setPrintY(35);
    clearUpload();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError("");
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      setUploadError("Usá PNG, JPG o WebP.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploadError("La imagen no puede superar 5 MB.");
      return;
    }

    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadPreview(URL.createObjectURL(file));
    setSelectedDesign(customDesign);
  };

  const applyVertical = (pos: (typeof PRINT_POSITIONS)[number]) => {
    setPrintPosition(pos);
    setPrintY(pos.top);
  };

  const applyHorizontal = (pos: (typeof PRINT_HORIZONTAL)[number]) => {
    setPrintHorizontal(pos);
    setPrintX(pos.left);
  };

  const onPrintPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX: printX,
      origY: printY,
    };
    setIsDragging(true);
  };

  const onPrintPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !shirtRef.current) return;
    const rect = shirtRef.current.getBoundingClientRect();
    const dx = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
    const dy = ((event.clientY - dragRef.current.startY) / rect.height) * 100;
    setPrintX(clamp(dragRef.current.origX + dx, TORSO.minX, TORSO.maxX));
    setPrintY(clamp(dragRef.current.origY + dy, TORSO.minY, TORSO.maxY));
  };

  const onPrintPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
  };

  const message = `¡Hola! Usé el personalizador de ${SITE.name} y quiero cotizar esta remera:
- Modelo: ${selectedColor.name}
- Estampado: ${selectedDesign.name}${isCustomDesign && customNote ? ` (Detalle: ${customNote})` : ""}
- Posición vertical: ${printPosition.label} (${Math.round(printY)}%)
- Posición horizontal: ${printHorizontal.label} (${Math.round(printX)}%)
- Rotación: ${printRotation.label}
- Tamaño del estampado: ${printScale.label}
- Imagen subida en la web: ${uploadPreview ? "sí (vista previa; mando el archivo original por acá)" : "no"}
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
          design: [
            selectedDesign.name,
            `V ${printPosition.label} ${Math.round(printY)}%`,
            `H ${printHorizontal.label} ${Math.round(printX)}%`,
            `rotación ${printRotation.label}`,
            `tamaño ${printScale.label}`,
            uploadPreview ? "con imagen de vista previa" : null,
            isCustomDesign && customNote ? customNote : null,
          ]
            .filter(Boolean)
            .join(" · "),
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

  const printBoxPx = Math.round(112 * printScale.value);

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
            Elegí color, diseño, posición, rotación y talle. Arrastrá el estampado sobre el torso y cotizá por WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-silver bg-fog p-8 lg:col-span-6">
            <div ref={shirtRef} className="relative flex aspect-square w-full max-w-[380px] items-center justify-center">
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full drop-shadow-2xl transition-colors duration-500"
              >
                <path
                  d="M130 50 L165 85 C185 92 215 92 235 85 L270 50 L360 100 L320 170 L285 150 L285 360 L115 360 L115 150 L80 170 L40 100 Z"
                  fill={selectedColor.hex}
                  stroke={selectedColor.border}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M165 85 C185 105 215 105 235 85 C215 90 185 90 165 85 Z"
                  fill="none"
                  stroke={selectedColor.border}
                  strokeWidth="2.5"
                />
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

              <div
                role="img"
                aria-label="Estampado: arrastrá para moverlo sobre el torso"
                className={cn(
                  "absolute flex cursor-grab items-center justify-center overflow-hidden touch-none select-none active:cursor-grabbing",
                  isDragging ? "transition-none" : "transition-all duration-300"
                )}
                style={{
                  top: `${printY}%`,
                  left: `${printX}%`,
                  width: printBoxPx,
                  height: printBoxPx,
                  transform: `translate(-50%, -50%) rotate(${printRotation.value}deg)`,
                }}
                onPointerDown={onPrintPointerDown}
                onPointerMove={onPrintPointerMove}
                onPointerUp={onPrintPointerUp}
                onPointerCancel={onPrintPointerUp}
              >
                {uploadPreview && isCustomDesign ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={uploadPreview}
                    alt="Vista previa del estampado"
                    className="pointer-events-none h-full w-full object-contain"
                    draggable={false}
                  />
                ) : (
                  selectedDesign.render(selectedColor.hex)
                )}
              </div>

              <span className="pointer-events-none absolute bottom-3 left-4 rounded-lg bg-carbon/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                Talle: {selectedSize}
              </span>
              <span className="pointer-events-none absolute bottom-3 right-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-carbon shadow-sm backdrop-blur">
                {selectedColor.name}
              </span>
            </div>

            <p className="mt-3 text-center text-[11px] text-smoke">
              Arrastrá el estampado sobre el torso. Los botones también lo alinean.
            </p>

            <button
              type="button"
              onClick={resetAll}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-smoke hover:text-carbon transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restablecer simulador
            </button>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-6">
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
                <div className="mt-3 space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onFileChange}
                    className="block w-full text-xs text-smoke file:mr-3 file:rounded-full file:border-0 file:bg-carbon file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                  />
                  {uploadPreview && (
                    <button
                      type="button"
                      onClick={clearUpload}
                      className="text-xs font-semibold text-smoke underline hover:text-carbon"
                    >
                      Quitar imagen
                    </button>
                  )}
                  {uploadError && (
                    <p className="text-xs text-red-700" role="alert">
                      {uploadError}
                    </p>
                  )}
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Ej: Logo de mi banda, foto con mi perro, frase especial..."
                    className="w-full rounded-xl border border-silver bg-fog px-4 py-2.5 text-xs text-carbon placeholder:text-mist focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
                  />
                  <p className="text-[11px] text-smoke">
                    La foto es una vista previa; el archivo final en alta resolución lo mandás por WhatsApp.
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="block text-xs font-bold uppercase tracking-wider text-smoke">
                3. Ubicación vertical
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRINT_POSITIONS.map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => applyVertical(pos)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-xs font-semibold transition-all",
                      printPosition.id === pos.id
                        ? "border-carbon bg-carbon text-white"
                        : "border-silver bg-white text-carbon hover:border-mist"
                    )}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="block text-xs font-bold uppercase tracking-wider text-smoke">
                4. Ubicación horizontal
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRINT_HORIZONTAL.map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => applyHorizontal(pos)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-xs font-semibold transition-all",
                      printHorizontal.id === pos.id
                        ? "border-carbon bg-carbon text-white"
                        : "border-silver bg-white text-carbon hover:border-mist"
                    )}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="block text-xs font-bold uppercase tracking-wider text-smoke">
                5. Rotación
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRINT_ROTATIONS.map((rot) => (
                  <button
                    key={rot.id}
                    type="button"
                    onClick={() => setPrintRotation(rot)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-xs font-semibold transition-all",
                      printRotation.id === rot.id
                        ? "border-carbon bg-carbon text-white"
                        : "border-silver bg-white text-carbon hover:border-mist"
                    )}
                  >
                    {rot.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="block text-xs font-bold uppercase tracking-wider text-smoke">
                6. Tamaño del estampado
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRINT_SCALES.map((scale) => (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setPrintScale(scale)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-xs font-semibold transition-all",
                      printScale.id === scale.id
                        ? "border-carbon bg-carbon text-white"
                        : "border-silver bg-white text-carbon hover:border-mist"
                    )}
                  >
                    {scale.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="block text-xs font-bold uppercase tracking-wider text-smoke">
                7. Seleccioná el Talle
              </p>
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

            <div className="rounded-2xl border border-silver bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-1 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
                <span>Resumen de selección:</span>
                <span className="font-bold text-carbon">
                  {selectedColor.name} · {selectedDesign.name} · {printPosition.label}/{printHorizontal.label} · {printRotation.label} · {printScale.label} · {selectedSize}
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
