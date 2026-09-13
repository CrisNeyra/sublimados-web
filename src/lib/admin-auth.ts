export const ADMIN_COOKIE = "sublimados_admin";

export async function adminSessionToken(password: string) {
  const data = new TextEncoder().encode(`sublimados-admin:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

export async function isAdminToken(token: string | undefined) {
  const password = getAdminPassword();
  if (!password || !token) return false;
  const expected = await adminSessionToken(password);
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i += 1) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}
