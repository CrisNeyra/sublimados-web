import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Cómo ${SITE.name} trata los datos que nos dejás en la web y por WhatsApp.`,
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="flex-1 bg-white pt-24 pb-20 sm:pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
            Aviso de privacidad
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-carbon sm:text-4xl">
            Cómo usamos tus datos
          </h1>
          <p className="mt-4 text-sm text-smoke">Última actualización: septiembre 2026.</p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-carbon">
            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Quiénes somos</h2>
              <p className="mt-2 text-smoke">
                {SITE.name} es un taller de sublimación textil. Este aviso explica qué datos
                reunimos cuando usás el sitio o nos escribís para cotizar un pedido.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Qué datos reunimos</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-smoke">
                <li>Nombre, talle y consulta del formulario de contacto.</li>
                <li>
                  Preferencias del personalizador (color, diseño, posición, rotación, talle y notas).
                </li>
                <li>Mensajes que nos mandás por WhatsApp, incluido el archivo de tu diseño.</li>
                <li>Datos técnicos mínimos del navegador (por ejemplo, para que el sitio funcione).</li>
              </ul>
              <p className="mt-2 text-smoke">
                La imagen que subís al personalizador es solo una vista previa en tu dispositivo: no
                la guardamos en nuestro servidor. El archivo de producción lo recibimos por WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Para qué los usamos</h2>
              <p className="mt-2 text-smoke">
                Usamos estos datos para responder cotizaciones, producir el pedido, coordinar envíos y
                mejorar la atención. No vendemos listas de contactos ni usamos tus datos para
                publicidad de terceros.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Dónde se guardan</h2>
              <p className="mt-2 text-smoke">
                Las consultas del sitio pueden registrarse en nuestra base de pedidos (panel interno)
                para no perder el hilo. WhatsApp es un servicio de Meta: su uso se rige también por
                las políticas de esa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Tus opciones</h2>
              <p className="mt-2 text-smoke">
                Podés pedirnos que borremos o corrijamos tus datos de un pedido escribiendo a
                WhatsApp. Si no querés dejar datos en el formulario, contactanos solo por mensaje
                directo.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-tight">Contacto</h2>
              <p className="mt-2 text-smoke">
                Para consultas sobre privacidad, escribinos por WhatsApp desde la web. Este aviso es
                informativo y puede actualizarse si cambia el servicio.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
