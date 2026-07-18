"use client";

import Link from "next/link";
import TiltCard from "@/components/TiltCard";

export default function Home() {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section className="container" style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%', margin: 'auto' }}>
          
          {/* Left Column: Hero Text */}
          <div className="animate-fade-in-up hero-col">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', padding: '0.5rem 1.25rem', borderRadius: '9999px', marginBottom: '2rem', boxShadow: 'var(--shadow-depth-1), var(--rim-light)' }}>
              <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: '#d4a843', boxShadow: '0 0 12px #d4a843, 0 0 4px #d4a843' }}></span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>QuizMaster 2.0 is Live</span>
            </div>
            
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Master Any Subject with{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #2e3192 0%, #4f54b4 50%, #d4a843 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                display: 'inline-block',
                filter: 'drop-shadow(0 4px 12px rgba(46,49,146,0.2))',
              }}>Interactive</span>{' '}
              Quizzes
            </h1>
            
            <p style={{ marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.7, color: 'var(--text-secondary)', fontFamily: 'Montserrat, sans-serif' }}>
              Create engaging quizzes, challenge your friends, and track your progress in real-time. The ultimate platform for knowledge sharing.
            </p>
            
            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/create" style={{ 
                padding: '1rem 2.25rem', 
                fontSize: '1rem', 
                fontWeight: 700, 
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(135deg, #2e3192 0%, #15157d 100%)', 
                color: '#ffffff', 
                borderRadius: '14px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 8px rgba(46,49,146,0.2), 0 12px 28px rgba(46,49,146,0.15), 0 0 20px rgba(212,168,67,0.2)', 
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                gap: '0.5rem',
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 20px rgba(46,49,146,0.25), 0 20px 50px rgba(46,49,146,0.2), 0 0 35px rgba(212,168,67,0.35)'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 8px rgba(46,49,146,0.2), 0 12px 28px rgba(46,49,146,0.15), 0 0 20px rgba(212,168,67,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create a Quiz
              </Link>
              <Link href="/play" style={{ 
                padding: '1rem 2.25rem', 
                fontSize: '1rem', 
                fontWeight: 600, 
                fontFamily: 'Montserrat, sans-serif',
                background: 'var(--glass-bg)', 
                color: 'var(--text-primary)', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '14px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backdropFilter: 'blur(12px)', 
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-depth-1)',
                gap: '0.5rem',
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-depth-2)'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-depth-1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Join Game
              </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>10k+</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.25rem', fontFamily: 'Montserrat, sans-serif' }}>Active Quizzes</p>
              </div>
              <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
              <div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>2M+</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.25rem', fontFamily: 'Montserrat, sans-serif' }}>Questions Answered</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Premium 3D Floating Mockup */}
          <div className="animate-fade-in-up delay-200 hero-col-right">
            <TiltCard>
              <div style={{ height: '100%', padding: '2.5rem', background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-depth-2), var(--rim-light)' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', marginBottom: '2rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(46,49,146,0.06) 0%, transparent 70%)' }}></div>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    {[
                      { l: 'JD', c: '#fff', bg: '#2e3192' },
                      { l: 'SK', c: '#2a2520', bg: '#d4a843' },
                      { l: '+12', c: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.6)' },
                    ].map((avatar, i) => (
                      <div key={i} style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', background: avatar.bg, color: avatar.c, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem',
                        marginLeft: i === 0 ? '0' : '-15px', border: '3px solid var(--bg-gradient-start)', boxShadow: 'var(--shadow-depth-1)',
                        zIndex: 3 - i, transform: `translateY(${i * 2}px)`, fontFamily: 'Montserrat, sans-serif'
                      }}>
                        {avatar.l}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{ background: 'rgba(46,49,146,0.08)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#2e3192', border: '1px solid rgba(46,49,146,0.15)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>Massive Multiplayer</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif' }}>Host live sessions where hundreds of participants join instantly. WebSockets ensure sub-millisecond sync across all devices.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '6rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d4a843', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>Platform Features</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>Built for the Modern Classroom</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65, fontFamily: 'Montserrat, sans-serif' }}>Everything you need to host engaging, real-time quiz experiences that look stunning on any device.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', gridAutoRows: 'minmax(320px, auto)' }}>
          
          <TiltCard
            maxTilt={6}
            glare={true}
            scale={1.01}
            style={{ 
              gridColumn: 'span 6',
              background: 'var(--glass-bg)', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-depth-2), var(--rim-light)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div style={{ background: 'rgba(46,49,146,0.08)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#2e3192', border: '1px solid rgba(46,49,146,0.12)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>Massive Multiplayer</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif' }}>Host live sessions where hundreds of participants join instantly. WebSockets ensure sub-millisecond sync across all devices.</p>
          </TiltCard>
          
          <TiltCard
            maxTilt={6}
            glare={true}
            scale={1.01}
            style={{ 
              gridColumn: 'span 6',
              background: 'var(--glass-bg)', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-depth-2), var(--rim-light)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div style={{ background: 'rgba(212,168,67,0.1)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#d4a843', border: '1px solid rgba(212,168,67,0.15)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>Live Scoreboards</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif' }}>Track rankings instantly after every question with dramatic visuals that keep everyone engaged.</p>
          </TiltCard>
          
        </div>
      </section>

      {/* 3. HOW IT WORKS TIMELINE */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '8rem 0', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d4a843', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>How it works</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>Three Steps to Liftoff</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65, fontFamily: 'Montserrat, sans-serif' }}>From creation to live gameplay in minutes.</p>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(180deg, rgba(212,168,67,0) 0%, rgba(212,168,67,0.3) 20%, rgba(212,168,67,0.3) 80%, rgba(212,168,67,0) 100%)', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '24px', background: '#d4a843', borderRadius: '4px', boxShadow: '0 0 12px rgba(212,168,67,0.4)', filter: 'blur(1px)' }}></div>
          </div>
          
          {[
            { n: '1', label: 'Create', desc: 'Build an engaging quiz with multiple choice questions, timers, and custom point values. AI-powered question generation available.', color: '#2e3192' },
            { n: '2', label: 'Share PIN', desc: 'Launch the lobby and share the unique 6-digit access code with your audience. Works on any device, no app download needed.', color: '#4f54b4' },
            { n: '3', label: 'Play Live', desc: 'Players answer in real-time on their devices while watching the host screen update live. Celebrate winners with a podium reveal.', color: '#d4a843' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', marginBottom: '4rem', position: 'relative' }}>
              <div style={{ 
                width: '90px', height: '90px', 
                borderRadius: '50%', 
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${step.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 700, color: step.color,
                fontFamily: 'Playfair Display, serif',
                boxShadow: `var(--shadow-depth-2), 0 0 30px ${step.color}15`,
                position: 'relative', zIndex: 2
              }}>{step.n}</div>
              
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [i % 2 === 0 ? 'left' : 'right']: '140px', width: '320px', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{step.label}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '10rem 0 8rem' }}>
        <div style={{ 
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: '6rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-depth-3), var(--rim-light)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '200px', background: 'radial-gradient(ellipse, rgba(46,49,146,0.06) 0%, rgba(212,168,67,0.04) 40%, transparent 65%)', zIndex: 0, pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d4a843', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem', fontFamily: 'Montserrat, sans-serif' }}>Ready to begin?</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.15 }}>Ready to engage your audience?</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.65, fontFamily: 'Montserrat, sans-serif' }}>Join thousands of educators and event hosts who use QuizMaster to create unforgettable interactive experiences.</p>
            
            <Link href="/create" 
              style={{ 
                display: 'inline-flex',
                padding: '1.1rem 3rem', 
                fontSize: '1.05rem', 
                fontWeight: 700, 
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(135deg, #2e3192 0%, #15157d 100%)', 
                color: '#ffffff', 
                borderRadius: '16px', 
                alignItems: 'center', 
                justifyContent: 'center', 
                boxShadow: 'var(--shadow-depth-2), 0 0 20px rgba(212,168,67,0.2)', 
                transition: 'transform 0.22s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease', 
                textDecoration: 'none',
                letterSpacing: '0.02em',
                gap: '0.6rem',
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-depth-3), 0 0 35px rgba(212,168,67,0.35)'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-depth-2), 0 0 20px rgba(212,168,67,0.2)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
