"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        
        {/* Left Side: Brand Logo */}
        <div style={{ justifySelf: 'start' }}>
          <Link href="/" className="nav-brand">
            QuizMaster
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div style={{ justifySelf: 'center', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link link-underline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          
          {session && (
            <>
              <Link href="/dashboard" className="nav-link link-underline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Dashboard
              </Link>
              <Link href="/quizzes" className="nav-link link-underline">
                Browse Quizzes
              </Link>
              <Link href="/create" className="nav-link link-underline">
                Create Quiz
              </Link>
            </>
          )}

          <Link href="/play" className="nav-link link-underline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <path d="M6 12h4"></path>
              <path d="M8 10v4"></path>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="18" cy="12" r="1"></circle>
            </svg>
            Join Live Game
          </Link>
          
          <Link href="/leaderboard" className="nav-link link-underline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            Rankings
          </Link>
        </div>
        
        {/* Right Side: Auth & Theme */}
        <div className="nav-links" style={{ justifySelf: 'end' }}>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
              <Link href="/profile" style={{ textDecoration: 'none' }}>
                <div 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.5)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; }}
                  title={`${session.user?.name || 'User'}'s Profile`}
                >
                  {(session.user as any)?.image ? (
                    <img src={(session.user as any).image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    session.user?.name?.[0] || 'U'
                  )}
                </div>
              </Link>
              <button
                onClick={() => signOut()}
                style={{ 
                  padding: "0.5rem 1rem", 
                  fontSize: "0.95rem", 
                  fontWeight: "600",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.textShadow = "0 0 8px rgba(239, 68, 68, 0.4)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.textShadow = "none"; }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="nav-link link-underline">
                Log In
              </Link>
              <Link href="/register" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
