import { MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#inicio" className="flex items-center gap-2 font-black uppercase tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-bold text-carbon">
                S
              </span>
              {SITE.name}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-fog">
              {SITE.description}
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Secciones
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-fog transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-fog">
              <li>Envios a todo el país</li>
              <li>Respuesta por WhatsApp directa</li>
            </ul>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-carbon transition-colors hover:bg-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Escribinos
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-mist">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}