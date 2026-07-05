"use client";

import React from 'react';
import { HeroBackground } from '@/components/HeroBackground';

export default function Contact() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <HeroBackground />
      </div>
      
      <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 1, padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="heading-xl animated-text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Have a question about QuizMaster? Want to request a feature or report a bug? We'd love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Left Side: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(192, 132, 252, 0.2))', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Email Us</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Our friendly team is here to help.</p>
              <a href="mailto:support@quizmaster.com" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>support@quizmaster.com</a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(192, 132, 252, 0.2))', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Live Chat</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Available 9am to 5pm EST.</p>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Response time: Usually within 2 hours</span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(192, 132, 252, 0.2))', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Twitter / X</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Slide into our DMs.</p>
              <a href="#" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>@QuizMasterApp</a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>Send us a message</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.9rem' }}>First Name</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" className="form-input" placeholder="Jane" style={{ paddingLeft: '2.8rem' }} />
                  <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.9rem' }}>Last Name</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" className="form-input" placeholder="Doe" style={{ paddingLeft: '2.8rem' }} />
                  <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input type="email" className="form-input" placeholder="jane@example.com" style={{ paddingLeft: '2.8rem' }} />
                <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.9rem' }}>Topic</label>
              <div style={{ position: 'relative' }}>
                <select className="form-input" style={{ paddingLeft: '2.8rem', appearance: 'none' }}>
                  <option>General Inquiry</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Billing Support</option>
                </select>
                <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <svg style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.9rem' }}>Message</label>
              <div style={{ position: 'relative' }}>
                <textarea className="form-input" rows={5} placeholder="How can we help you today?" style={{ paddingLeft: '2.8rem', paddingTop: '1rem' }}></textarea>
                <svg style={{ position: 'absolute', left: '1rem', top: '1.2rem', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
            </div>
            
            <button type="button" className="btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', width: '100%' }}>
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              By submitting this form, you agree to our privacy policy.
            </p>
          </form>
        </div>

      </div>
    </div>
    </div>
  );
}
