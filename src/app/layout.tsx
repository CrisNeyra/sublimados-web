import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sublimados & Estampados | Remeras Personalizadas",
    template: "%s | Sublimados",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE.url,
    siteName: SITE.name,
    title: "Sublimados & Estampados | Remeras Personalizadas",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sublimados & Estampados | Remeras Personalizadas",
    description: SITE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-carbon focus:outline-2 focus:outline-offset-2 focus:outline-carbon"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
