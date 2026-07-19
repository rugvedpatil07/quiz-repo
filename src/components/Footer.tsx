"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{
      width: '100%',
      position: 'relative',
      zIndex: 10,
      padding: '0 24px 32px',
      fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .footer-glass {
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(60, 20, 40, 0.92) 50%, rgba(25, 10, 35, 0.95) 100%);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }
        .footer-glass::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(180, 40, 80, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-glass::after {
          content: '';
          position: absolute;
          bottom: -30%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(80, 20, 120, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-link {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s ease;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.95) !important;
        }
        .footer-col-title {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .footer-email-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 12px 20px;
          font-size: 13px;
          color: white;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .footer-email-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .footer-email-input:focus {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.1);
        }
        .footer-submit-btn {
          background: white;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          padding: 12px 28px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
        }
        .footer-submit-btn:hover {
          background: rgba(255,255,255,0.9);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 40px;
        }
        .admin-link {
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .admin-link:hover {
          color: rgba(255,255,255,0.6) !important;
        }
      `}</style>

      <div className="footer-glass">

        {/* Top CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: '72px 40px 60px',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.04em',
            marginBottom: '36px',
            lineHeight: 1.05,
            fontFamily: "'Inter', sans-serif",
          }}>
            Ready to Take Control<br/>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, fontStyle: 'italic' }}>of Your Learning?</span>
          </h2>

          {/* Email CTA */}
          <div style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '480px',
            margin: '0 auto 28px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            padding: '6px 6px 6px 20px',
          }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                flex: 1,
                fontSize: '14px',
                color: 'white',
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button className="footer-submit-btn">
              Get Started →
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/create" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontWeight: 500,
              fontSize: '13px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s ease',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Create a Quiz
            </Link>
            <Link href="/contact" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontWeight: 500,
              fontSize: '13px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s ease',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Main Links Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          padding: '48px 40px',
          position: 'relative',
          zIndex: 2,
        }}>

          {/* Brand Column */}
          <div style={{ flex: '1 1 220px', maxWidth: '260px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '24px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.15)'
              }}>
                <img src="/quiz_logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{
                fontSize: '18px', fontWeight: 800, color: 'white',
                letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif"
              }}>QuizMaster</span>
            </Link>
            <p style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7, fontWeight: 400, maxWidth: '200px'
            }}>
              The premium platform for interactive learning, quizzes & knowledge competitions.
            </p>
          </div>

          {/* Link Columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', flex: '2 1 400px' }}>

            <div>
              <p className="footer-col-title">Explore</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link href="/quizzes" className="footer-link">Browse Quizzes</Link>
                <Link href="/create" className="footer-link">Create a Quiz</Link>
                <Link href="/leaderboard" className="footer-link">Leaderboard</Link>
                <Link href="/categories" className="footer-link">Categories</Link>
              </div>
            </div>

            <div>
              <p className="footer-col-title">Learn</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link href="/blogs" className="footer-link">Blogs</Link>
                <Link href="/research" className="footer-link">Research & Education</Link>
                <Link href="/certifications" className="footer-link">Certifications</Link>
              </div>
            </div>

            <div>
              <p className="footer-col-title">Support</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link href="/help" className="footer-link">Help Center</Link>
                <Link href="/faq" className="footer-link">FAQ&apos;s</Link>
                <Link href="/contact" className="footer-link">Contact Us</Link>
              </div>
            </div>

            <div>
              <p className="footer-col-title">Legal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Link href="/terms" className="footer-link">Terms & Conditions</Link>
                <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                <Link href="/risk" className="footer-link">Risk & Benefits</Link>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 400,
            letterSpacing: '0.01em'
          }}>
            © {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
          <Link href="/admin" className="admin-link">
            Admin Portal
          </Link>
        </div>

      </div>
    </footer>
  );
}
