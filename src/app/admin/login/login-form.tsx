"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "No se pudo iniciar sesión");
      return;
    }

    router.push(searchParams.get("from") || "/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-fog px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-silver bg-white p-8 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
          Panel interno
        </p>
        <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-carbon">
          Pedidos
        </h1>
        <p className="mt-3 text-sm leading-6 text-smoke">
          Ingresá la contraseña de ADMIN_PASSWORD (archivo .env).
        </p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-smoke">
          Contraseña
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-silver bg-fog px-4 py-3 text-sm text-carbon focus:border-carbon focus:outline-none focus:ring-2 focus:ring-carbon/20"
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-carbon px-5 py-3 text-sm font-bold text-white hover:bg-graphite disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
