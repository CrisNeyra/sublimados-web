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
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6"
      >
        <a
          href="/#inicio"
          className="flex items-center gap-2 font-black tracking-tight text-carbon"
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
                className="rounded-full px-3 py-2 text-sm font-medium text-smoke transition-colors hover:bg-fog hover:text-carbon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon xl:px-4 xl:text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#personalizador"
          className="hidden rounded-full bg-carbon px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon lg:inline-flex"
        >
          Armá tu remera
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-carbon transition-colors hover:bg-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon lg:hidden"
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