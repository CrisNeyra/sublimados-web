/** Precio de referencia. El valor guardado no cambia. */
export function priceFrom(price: string) {
  const value = price.trim();
  if (/^desde\b/i.test(value)) return value;
  return `desde ${value}`;
}
