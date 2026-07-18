"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Library", path: "/library" },
  ];

  return (
    <header 
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: 'all 0.3s ease',
        transform: isScrolled ? 'translateY(0)' : 'translateY(10px)',
        width: isScrolled ? '100%' : 'calc(100% - 40px)',
        margin: isScrolled ? '0' : '0 auto',
        borderRadius: isScrolled ? '0' : '20px',
        marginTop: isScrolled ? '0' : '10px'
      }}
    >
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link href="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          QuizMaster
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-btn"
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Navigation Wrapper */}
        <div className={`nav-menu-wrapper ${mobileMenuOpen ? "open" : ""}`}>
          <nav className="nav-center nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`nav-link ${isActive ? "active" : "link-underline"}`}
                  style={{
                    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.02em',
                    fontSize: '0.95rem'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="nav-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link 
              href="/login" 
              className="nav-link" 
              style={{ fontWeight: 600, fontSize: '0.95rem' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem', borderRadius: '12px' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
