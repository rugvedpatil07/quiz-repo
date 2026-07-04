"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Something went wrong");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen flex-center" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Aurora Background is now in layout.tsx */}

      <div className="glass-panel login-card animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '3rem', zIndex: 1 }}>
        <div className="animate-fade-in-up delay-100" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            borderRadius: '50%', 
            background: 'var(--primary-color)',
            boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </div>
        </div>

        <div className="animate-fade-in-up delay-100" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="heading-lg animated-text-gradient" style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Create Account</h2>
          <p className="text-muted">Join QuizMaster to start creating and taking quizzes</p>
        </div>

        {error && <div className="animate-fade-in-up" style={{ color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group animate-fade-in-up delay-200">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group animate-fade-in-up delay-200">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group animate-fade-in-up delay-300">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary animate-fade-in-up delay-400" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }} disabled={loading}>
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <div className="animate-fade-in-up delay-500" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontSize: '1rem' }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
