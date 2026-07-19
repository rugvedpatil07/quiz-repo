"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { navItems } from "../data/categories";

export default function CategoryNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
    <div 
      ref={navRef} 
      onMouseLeave={() => { setActiveDropdown(null); setHoveredItem(null); }}
      style={{
        position: 'relative',
        zIndex: 50,
        marginTop: '100px', // Push below the main Navbar (Navbar is fixed at top 24px)
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none' // allow clicking through empty space
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
        width: '100%',
        maxWidth: '1200px',
        pointerEvents: 'auto'
      }}>
        <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            padding: '6px 12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            maxWidth: '100%'
        }}>
          {navItems.map((item, index) => {
            const isActive = activeDropdown === item.label;
            const isHovered = hoveredItem === item.label;
            const isButton = (item as any).isButton || item.label === "Programming";
            
            return (
              <div
                key={index}
                onMouseEnter={() => {
                  setHoveredItem(item.label);
                  if (item.subItems && item.subItems.length > 0) setActiveDropdown(item.label);
                }}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ position: 'relative' }}
              >
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: isButton || isActive ? 600 : 500,
                    color: isButton || isActive ? '#000' : '#666',
                    background: isActive ? 'rgba(0,0,0,0.06)' : (isButton ? 'rgba(0,0,0,0.04)' : (isHovered ? 'rgba(0,0,0,0.03)' : 'transparent')),
                    transition: 'all 0.2s ease',
                    border: isButton ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
                    whiteSpace: 'nowrap'
                  }}
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
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        opacity: isActive ? 1 : 0.5
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Mega Menu Dropdown */}
      <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: activeDropdown ? 'auto' : 'none',
          opacity: activeDropdown ? 1 : 0,
          transform: activeDropdown ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          paddingTop: '8px'
      }}>
          {navItems.find(i => i.label === activeDropdown)?.subItems && (
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)',
                border: '1px solid rgba(255,255,255,0.4)',
                maxWidth: '900px',
                width: '90%',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
              {navItems.find(i => i.label === activeDropdown)?.subItems?.map((sub, idx) => (
                <Link 
                  key={idx} 
                  href={`/quizzes?category=${encodeURIComponent(activeDropdown || '')}&subcategory=${encodeURIComponent(sub)}`} 
                  style={{
                      background: '#fff',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                  }}
                  onMouseOver={(e) => {
                      e.currentTarget.style.background = '#000';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#000';
                  }}
                  onMouseOut={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#444';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                  }}
                >
                  {sub}
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
