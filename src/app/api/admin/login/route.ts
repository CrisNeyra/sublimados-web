import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminSessionToken,
  getAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const password = getAdminPassword();
  if (!password) {
    return NextResponse.json(
      { error: "Falta ADMIN_PASSWORD en el archivo .env" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const submitted = typeof body.password === "string" ? body.password : "";

  if (submitted !== password) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  const token = await adminSessionToken(password);
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
