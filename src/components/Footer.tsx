"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ width: '100%', position: 'relative', zIndex: 10, paddingBottom: '24px' }}>
      
      {/* Top CTA Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px 60px', color: '#000' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          Ready to Take Control<br/>of Your Learning?
        </h2>
        <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
          Get expert interactive quizzes for knowledge building, test prep, and more — all from the comfort of home, no setup needed.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link 
            href="/create" 
            style={{ 
              background: '#2563eb', // Nice bright blue matching reference
              color: '#fff', 
              padding: '12px 28px', 
              borderRadius: '9999px', 
              fontWeight: 500, 
              fontSize: '0.95rem', 
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.2s'
            }}
          >
            Start Now
          </Link>
          <Link 
            href="/contact" 
            style={{ 
              background: '#ffffff', 
              color: '#000', 
              padding: '12px 28px', 
              borderRadius: '9999px', 
              fontWeight: 500, 
              fontSize: '0.95rem', 
              textDecoration: 'none', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s'
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer Card */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '32px', 
        padding: '60px 50px 30px',
        margin: '0 auto',
        maxWidth: 'calc(100% - 48px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(255,255,255,0.7)'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '60px' }}>
           
           {/* Left Column: Logo + Email Input */}
           <div style={{ flex: '1 1 320px', maxWidth: '380px' }}>
             <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
               <div style={{ width: '28px', height: '28px', background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 22h20L12 2z"/></svg>
               </div>
               <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#000', letterSpacing: '-0.02em' }}>QuizMaster</span>
             </Link>
             
             <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#000', marginBottom: '16px' }}>Sign up to receive learning tips.</p>
             
             <div style={{ 
                display: 'flex', 
                background: '#ffffff', 
                borderRadius: '9999px', 
                padding: '6px', 
                border: '1px solid rgba(0,0,0,0.08)', 
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                marginBottom: '16px' 
              }}>
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={{ flex: 1, background: 'transparent', border: 'none', padding: '8px 16px', fontSize: '0.85rem', outline: 'none' }} 
               />
               <button style={{ 
                  background: '#0f172a', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '9999px', 
                  padding: '8px 24px', 
                  fontWeight: 500, 
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(15, 23, 42, 0.3)'
                }}>
                  Submit
                </button>
             </div>
             
             <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6 }}>
               By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
             </p>
           </div>
           
           {/* Right Columns: Links */}
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
             
             {/* Column 1 */}
             <div>
               <h4 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Explore</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <Link href="/quizzes" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Browse Quizzes</Link>
                 <Link href="/create" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Create a Quiz</Link>
                 <Link href="/leaderboard" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Leaderboard</Link>
                 <Link href="/categories" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Categories</Link>
               </div>
             </div>
             
             {/* Column 2 */}
             <div>
               <h4 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Learn</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <Link href="/blogs" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Blogs</Link>
                 <Link href="/research" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Research & Education</Link>
                 <Link href="/certifications" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Certifications</Link>
               </div>
             </div>
             
             {/* Column 3 */}
             <div>
               <h4 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Support</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <Link href="/help" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Help Center</Link>
                 <Link href="/faq" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>FAQ's</Link>
                 <Link href="/contact" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Contact Us</Link>
               </div>
             </div>

             {/* Column 4 */}
             <div>
               <h4 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Legal</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <Link href="/terms" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Terms & Conditions</Link>
                 <Link href="/privacy" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</Link>
                 <Link href="/risk" style={{ fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>Risk & Benefits</Link>
               </div>
             </div>

           </div>
        </div>
        
        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
            © {new Date().getFullYear()} QuizMaster, All rights reserved.
          </p>
          <Link 
            href="/admin" 
            style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'}
            onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
