"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PremiumBackground } from "@/components/PremiumBackground";

export default function PlayEntry() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "unauthenticated" || status === "loading") {
    return null;
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/lobby/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, nickname })
      });
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        // Save playerId to localStorage so the next page knows who they are
        localStorage.setItem("lobbyPlayerId", data.player.id.toString());
        router.push(`/play/${pin}`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to join lobby");
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <PremiumBackground />

      <div className="animate-pop-in" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px', padding: '3rem 2.5rem', background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 10px 20px rgba(0,0,0,0.5)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
        
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', textAlign: 'center', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Join Session</h1>
        <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center' }}>Enter the access code to participate.</p>
        
        {error && (
          <div className="animate-pop-in" style={{ marginBottom: '1.5rem', padding: '0.875rem 1rem', background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 500, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1' }}>Session Code</label>
            <input
              type="text"
              placeholder="e.g., A1B2C3"
              value={pin}
              onChange={(e) => setPin(e.target.value.toUpperCase())}
              required
              style={{ width: '100%', fontSize: '1rem', padding: '0.875rem 1rem', background: 'rgba(0, 0, 0, 0.4)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none', transition: 'all 0.2s ease', fontFamily: 'monospace', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)' }}
              maxLength={6}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'; e.target.style.background = 'rgba(0, 0, 0, 0.6)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(0, 0, 0, 0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)'; }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1' }}>Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              style={{ width: '100%', fontSize: '1rem', padding: '0.875rem 1rem', background: 'rgba(0, 0, 0, 0.4)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none', transition: 'all 0.2s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)' }}
              maxLength={15}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'; e.target.style.background = 'rgba(0, 0, 0, 0.6)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(0, 0, 0, 0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)'; }}
            />
          </div>
          
          <button 
            type="submit" 
            style={{ marginTop: '0.75rem', fontSize: '1rem', padding: '0.875rem 1rem', fontWeight: 600, background: 'linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)', color: '#09090b', border: 'none', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 14px rgba(255,255,255,0.15)' }}
            disabled={loading}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.05)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 0 6px 20px rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 0 4px 14px rgba(255,255,255,0.15)'; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 0 2px 8px rgba(255,255,255,0.1)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 #ffffff, 0 6px 20px rgba(255,255,255,0.2)'; }}
          >
            {loading ? "Connecting..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
