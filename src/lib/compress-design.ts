export const MAX_DESIGN_EDGE = 1200;
export const MAX_DESIGN_PREVIEW_BYTES = 700 * 1024;

/** Achica el archivo a un JPEG para guardarlo con el pedido. */
export async function compressDesignFile(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(
      1,
      MAX_DESIGN_EDGE / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("No se pudo preparar la imagen");
    }
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.82);
    });
    if (!blob) {
      throw new Error("No se pudo preparar la imagen");
    }
    if (blob.size > MAX_DESIGN_PREVIEW_BYTES) {
      throw new Error(
        "La imagen sigue siendo muy pesada. Probá con un archivo más chico."
      );
    }
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = "";
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    return btoa(binary);
  } finally {
    bitmap.close();
  }
}
