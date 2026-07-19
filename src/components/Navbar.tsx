"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
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
        <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{
            background: 'black',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            ✦
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: pathname === '/' ? '#000' : '#666', fontSize: '15px', fontWeight: pathname === '/' ? 600 : 500, textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
          {session && (
            <>
              <Link href="/dashboard" style={{ color: pathname === '/dashboard' ? '#000' : '#666', fontSize: '15px', fontWeight: pathname === '/dashboard' ? 600 : 500, textDecoration: 'none', transition: 'color 0.2s' }}>Dashboard</Link>
              <Link href="/quizzes" style={{ color: pathname === '/quizzes' ? '#000' : '#666', fontSize: '15px', fontWeight: pathname === '/quizzes' ? 600 : 500, textDecoration: 'none', transition: 'color 0.2s' }}>Quizzes</Link>
            </>
          )}
          <Link href="/play" style={{ color: pathname === '/play' ? '#000' : '#666', fontSize: '15px', fontWeight: pathname === '/play' ? 600 : 500, textDecoration: 'none', transition: 'color 0.2s' }}>Play</Link>
          <Link href="/leaderboard" style={{ color: pathname === '/leaderboard' ? '#000' : '#666', fontSize: '15px', fontWeight: pathname === '/leaderboard' ? 600 : 500, textDecoration: 'none', transition: 'color 0.2s' }}>Rankings</Link>
        </nav>
      </div>

      {/* Right Pill */}
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {session ? (
            <div 
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
                  <Link href="/profile" style={{ padding: '10px 12px', textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: 500, borderRadius: '8px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    My Profile
                  </Link>
                  <Link href="/dashboard" style={{ padding: '10px 12px', textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: 500, borderRadius: '8px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Dashboard
                  </Link>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '4px 0' }}></div>
                  <button onClick={() => signOut()} style={{ padding: '10px 12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#ef4444', textAlign: 'left', borderRadius: '8px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" style={{
                background: 'rgba(255,255,255,0.95)',
                color: 'black',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
            }}>Sign In</Link>
            <Link href="/register" style={{
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
                transition: 'transform 0.2s'
            }}>
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
