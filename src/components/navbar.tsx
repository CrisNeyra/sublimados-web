"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/site";
import { BrandLogo } from "@/components/brand-logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-carbon/70 backdrop-blur-md"
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6"
      >
        <a
          href="/#inicio"
          className={cn(
            "flex items-center gap-2 font-black tracking-tight",
            scrolled || open ? "text-carbon" : "text-white"
          )}
          onClick={() => setOpen(false)}
        >
          <BrandLogo size={44} />
          <span className="hidden sm:inline">{SITE.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-4 xl:text-base",
                  scrolled || open
                    ? "text-smoke hover:bg-fog hover:text-carbon focus-visible:outline-carbon"
                    : "text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-white"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#personalizador"
          className={cn(
            "hidden rounded-full px-5 py-2.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex",
            scrolled || open
              ? "bg-carbon text-white hover:bg-graphite focus-visible:outline-carbon"
              : "bg-white text-carbon hover:bg-fog focus-visible:outline-white"
          )}
        >
          Armá tu remera
        </a>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden",
            scrolled || open
              ? "text-carbon hover:bg-fog focus-visible:outline-carbon"
              : "text-white hover:bg-white/10 focus-visible:outline-white"
          )}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="menu-movil"
        className={cn(
          "lg:hidden",
          open
            ? "pointer-events-auto max-h-[80vh] overflow-y-auto border-t border-silver bg-white opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-carbon transition-colors hover:bg-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="/#personalizador"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-carbon px-5 py-3 text-center text-base font-semibold text-white"
            >
              Armá tu remera
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}