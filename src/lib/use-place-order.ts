"use client";

import { useRef, useState } from "react";
import { parseOrderPayload } from "@/lib/order-payload";

export function usePlaceOrder() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function submit(body: unknown, whatsappUrl: string) {
    if (lock.current) return false;

    const parsed = parseOrderPayload(body);
    if (!parsed.ok) {
      setError(parsed.error);
      return false;
    }

    lock.current = true;
    setError("");
    setIsSending(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(
          typeof data.error === "string"
            ? data.error
            : "Se abrió WhatsApp, pero no pudimos guardar el pedido en el panel."
        );
        return false;
      }
      return true;
    } catch {
      setError("Se abrió WhatsApp, pero no pudimos guardar el pedido en el panel.");
      return false;
    } finally {
      lock.current = false;
      setIsSending(false);
    }
  }

  return { isSending, error, setError, submit };
}
