"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import SearchBar from "./SearchBar";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Hide the navigation interface when taking a quiz
  if (pathname?.startsWith("/take/")) {
    return null;
  }

  return (
    <>
      <Navbar />
      <CategoryNav />
      <div className="global-search-section">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </div>
      </div>
    </>
  );
}
