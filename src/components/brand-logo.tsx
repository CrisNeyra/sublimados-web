"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  const [src, setSrc] = useState(SITE.logoSrc);

  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden bg-fog", className)}
      style={{
        width: size,
        height: size,
        borderRadius: "15%",
      }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-cover"
        aria-hidden
        onError={() => {
          if (src !== "/brand/logo.svg") setSrc("/brand/logo.svg");
        }}
      />
    </span>
  );
}
