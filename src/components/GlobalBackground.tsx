"use client";

import { usePathname } from "next/navigation";
import { HeroBackground } from "./HeroBackground";

export function GlobalBackground() {
  const pathname = usePathname();
  
  // Do not show the background animation in the "game section" (take or results)
  if (pathname.startsWith("/take") || pathname.startsWith("/results") || pathname.startsWith("/play")) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <HeroBackground />
    </div>
  );
}
