"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPasskey() {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === "1804") {
      setError(false);
      setSuccess(true);
      // Set a cookie to remember the admin session
      document.cookie = "admin_auth=true; path=/; max-age=86400"; // 1 day expiration
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } else {
      setError(true);
      setPasskey("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="container min-h-screen flex-center" style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}>
      {/* Premium Background Effects */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 60%)', zIndex: 0 }}></div>
      
      <div className={`glass-panel login-card ${success ? 'animate-fade-out' : 'animate-fade-in-up'}`} style={{ 
        width: '100%', 
        maxWidth: '440px', 
        padding: '4rem 3rem', 
        zIndex: 1, 
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
        borderRadius: '24px'
      }}>
        
        {/* Premium Admin Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 100%)',
            boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Admin Portal</h2>
          <p style={{ color: '#888', fontSize: '0.95rem', letterSpacing: '1px' }}>RESTRICTED ACCESS</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', animation: 'pulse 1.5s infinite' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '1.5rem', fontWeight: 600 }}>Authenticating...</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ position: 'relative' }}>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter Passkey"
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: `2px solid ${error ? '#ef4444' : 'rgba(212, 175, 55, 0.3)'}`,
                  borderRadius: '12px',
                  color: '#D4AF37',
                  fontSize: '1.25rem',
                  letterSpacing: '5px',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: error ? '0 0 15px rgba(239, 68, 68, 0.3)' : 'none'
                }}
                autoFocus
                required
              />
            </div>
            
            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '1.25rem', 
                marginTop: '1.5rem', 
                fontSize: '1.1rem', 
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 100%)', 
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }} 
            >
              Access Portal
            </button>
          </form>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .animate-fade-out {
          animation: fadeOut 1.5s forwards;
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
      `}} />
    </div>
  );
}
