"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinkStyle = (isActive: boolean) => ({
  color: isActive ? '#000' : '#666',
  fontSize: '15px',
  fontWeight: isActive ? 600 : 500,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  padding: '6px 10px',
  borderRadius: '8px',
  display: 'inline-block',
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <style>{`
        .nav-link:hover {
          color: #000 !important;
          background: rgba(0,0,0,0.05) !important;
          transform: translateY(-1px);
        }
        .logo-btn:hover {
          transform: scale(1.12) rotate(8deg) !important;
        }
        .logo-btn {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .signin-btn:hover {
          background: rgba(0,0,0,0.08) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
        }
        .signin-btn {
          transition: all 0.25s ease !important;
        }
        .getstarted-btn:hover {
          background: #222 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3) !important;
        }
        .getstarted-btn {
          transition: all 0.25s ease !important;
        }
        .getstarted-btn:hover svg {
          transform: translateX(4px);
        }
        .getstarted-btn svg {
          transition: transform 0.2s ease;
        }
        .profile-pill:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
          transform: translateY(-1px);
        }
        .profile-pill {
          transition: all 0.2s ease !important;
        }
        .dropdown-link:hover {
          background: rgba(0,0,0,0.05) !important;
          padding-left: 16px !important;
        }
        .dropdown-link {
          transition: all 0.2s ease !important;
        }
        .signout-btn:hover {
          background: rgba(239,68,68,0.1) !important;
          padding-left: 16px !important;
        }
        .signout-btn {
          transition: all 0.2s ease !important;
        }
      `}</style>

      <header 
        style={{
          position: 'fixed',
          top: '24px',
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 40px',
          pointerEvents: 'none'
        }}
      >
        {/* Left Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '9999px',
          padding: '6px 24px 6px 6px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          pointerEvents: 'auto',
          gap: '24px'
        }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="logo-btn">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="/quiz_logo.png" alt="Quiz Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/" className="nav-link" style={navLinkStyle(pathname === '/')}>Home</Link>
            <Link href="/quizzes" className="nav-link" style={navLinkStyle(pathname === '/quizzes')}>Quizzes</Link>
            {session && (
              <Link href="/dashboard" className="nav-link" style={navLinkStyle(pathname === '/dashboard')}>Dashboard</Link>
            )}
            <Link href="/play" className="nav-link" style={navLinkStyle(pathname === '/play')}>Play</Link>
            <Link href="/leaderboard" className="nav-link" style={navLinkStyle(pathname === '/leaderboard')}>Rankings</Link>
          </nav>
        </div>

        {/* Right Pill */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {session ? (
              <div 
                className="profile-pill"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
                style={{ 
                  position: 'relative',
                  display: 'flex', 
                  alignItems: 'center', 
                  background: 'rgba(255,255,255,0.95)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '9999px',
                  padding: '6px 16px 6px 6px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  gap: '10px',
                  cursor: 'pointer'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2e3192, #d4a843)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 'bold', fontSize: '15px'
                }}>
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    session.user?.name?.[0] || 'U'
                  )}
                </div>
                
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#000', paddingRight: '4px' }}>
                  {session.user?.name?.split(' ')[0] || 'Profile'}
                </span>

                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>

                {profileOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    padding: '8px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '160px',
                    zIndex: 100
                  }}>
                    <div style={{ padding: '8px 12px', marginBottom: '4px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{session.user?.name || 'User'}</div>
                      <div style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.email || ''}</div>
                    </div>
                    <Link href="/profile" className="dropdown-link" style={{ padding: '10px 12px', textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: 500, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      My Profile
                    </Link>
                    <Link href="/dashboard" className="dropdown-link" style={{ padding: '10px 12px', textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: 500, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                      Dashboard
                    </Link>
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '4px 0' }}></div>
                    <button onClick={() => signOut()} className="signout-btn" style={{ padding: '10px 12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#ef4444', textAlign: 'left', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/login" className="signin-btn" style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: 'black',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              }}>Sign In</Link>
              <Link href="/register" className="getstarted-btn" style={{
                  background: 'black',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              }}>
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
