"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { navItems } from "../data/categories";

export default function CategoryNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="category-nav-wrapper" ref={navRef}>
      <div className="category-nav-full">
        <ul className="category-nav-list">
          {navItems.map((item, index) => (
            <li 
              key={index} 
              className={`category-nav-item ${item.subItems && item.subItems.length > 0 ? 'has-dropdown' : ''}`}
              onMouseEnter={() => item.subItems && item.subItems.length > 0 && setActiveDropdown(item.label)}
              onMouseLeave={() => item.subItems && item.subItems.length > 0 && setActiveDropdown(null)}
            >
              <Link 
                href={item.href} 
                className={`category-nav-link ${(item as any).isButton ? 'active' : ''}`}
              >
                {item.label}
                {item.subItems && item.subItems.length > 0 && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`nav-chevron ${activeDropdown === item.label ? 'rotated' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </Link>
              
              {/* Dropdown Menu */}
              {item.subItems && item.subItems.length > 0 && (
                <div className={`nav-dropdown-menu custom-scrollbar ${activeDropdown === item.label ? 'show' : ''}`}>
                  {item.subItems.map((sub, idx) => (
                    <Link key={idx} href={`/quizzes?category=${encodeURIComponent(item.label)}&subcategory=${encodeURIComponent(sub)}`} className="dropdown-item">{sub}</Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
