"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/quizzes");
      router.refresh();
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
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
        
        <div className="animate-fade-in-up delay-100" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="heading-lg animated-text-gradient" style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Welcome Back</h2>
          <p className="text-muted">Enter your credentials to access your account</p>
        </div>

        {error && <div className="animate-fade-in-up" style={{ color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
            <div className="flex-between">
              <label className="form-label">Password</label>
              <a href="#" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="animate-fade-in-up delay-500" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontSize: '1rem' }}>
            Don't have an account? <Link href="/register" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
