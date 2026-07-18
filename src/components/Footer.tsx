"use client";

import Link from "next/link";

const socialIcons = [
  {
    label: "Twitter",
    frontPath: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    backChar: "𝕏",
  },
  {
    label: "GitHub",
    frontPath: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    backChar: "★",
  },
  {
    label: "LinkedIn",
    frontPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    backChar: "in",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="nav-brand" style={{ fontSize: "1.75rem", marginBottom: "1rem", display: "inline-block" }}>
              QuizMaster
            </Link>
            <p className="text-muted" style={{ maxWidth: "240px", marginTop: "1rem", lineHeight: 1.7, color: 'rgba(247, 231, 206, 0.55)' }}>
              Elevate your knowledge with interactive quizzes, tailored to challenge and inspire.
            </p>
            <div className="social-icons" style={{ gap: '0.875rem' }}>
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  className="flip-card"
                  aria-label={icon.label}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                  }}
                >
                  <div
                    className="flip-card-inner"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                    }}
                  >
                    {/* Front */}
                    <div
                      className="flip-card-front"
                      style={{
                        background: 'rgba(247,231,206,0.06)',
                        border: '1px solid rgba(212,168,67,0.15)',
                        boxShadow: 'var(--shadow-depth-1), var(--rim-light)',
                        borderRadius: '50%',
                        color: 'rgba(247, 231, 206, 0.6)',
                      }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon.frontPath} />
                      </svg>
                    </div>
                    {/* Back */}
                    <div
                      className="flip-card-back"
                      style={{
                        fontSize: icon.backChar.length > 1 ? '0.75rem' : '1rem',
                        fontWeight: 700,
                        borderRadius: '50%',
                        boxShadow: '0 0 20px rgba(212,168,67,0.3)',
                      }}
                    >
                      {icon.backChar}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link href="/quizzes" className="footer-link">Browse Quizzes</Link></li>
              <li><Link href="/create" className="footer-link">Create a Quiz</Link></li>
              <li><Link href="/leaderboard" className="footer-link">Leaderboard</Link></li>
              <li><Link href="/quizzes" className="footer-link">Categories</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link href="/help" className="footer-link">Help Center</Link></li>
              <li><Link href="/faq" className="footer-link">FAQ</Link></li>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="/feedback" className="footer-link">Feedback</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link href="/cookies" className="footer-link">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(247, 231, 206, 0.4)', fontSize: '0.85rem' }}>© {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
          <Link 
            href="/admin" 
            style={{ color: 'rgba(212,168,67,0.2)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.25s ease' }} 
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#d4a843'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(212,168,67,0.2)'; }}
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
