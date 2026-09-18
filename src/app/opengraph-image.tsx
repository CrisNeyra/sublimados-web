import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "¡¡The Shirt!! — remeras personalizadas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function logoDataUrl() {
  const bytes = await readFile(join(process.cwd(), "public/brand/logo.png"));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logo = await logoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#0b0b0b",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img
            src={logo}
            width={120}
            height={120}
            alt=""
            style={{
              borderRadius: 18,
              objectFit: "cover",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                letterSpacing: -1,
                lineHeight: 1.1,
              }}
            >
              ¡¡The Shirt!!
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 28,
                color: "#d1d5db",
                maxWidth: 820,
              }}
            >
              Calidad y vanguardia en sublimaciones
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          Remeras personalizadas · Pedidos por WhatsApp
        </div>
      </div>
    ),
    { ...size }
  );
}
