import { Suspense } from "react";
import AdminLoginPage from "./login-form";

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-smoke">Cargando...</p>}>
      <AdminLoginPage />
    </Suspense>
  );
}
