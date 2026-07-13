"use client";

import { usePathname } from "next/navigation";
import { HeroBackground } from "./HeroBackground";

export function GlobalBackground() {
  const pathname = usePathname();
  
  const isHome = pathname === "/";
  const isGame = pathname.startsWith("/play") || pathname.startsWith("/game") || pathname.startsWith("/take") || pathname.startsWith("/results");
  
  if (!isHome && !isGame) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <HeroBackground />
    </div>
  );
}
