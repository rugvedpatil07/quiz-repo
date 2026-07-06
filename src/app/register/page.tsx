"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'test.com', 'example.com', 'fake.com'];
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
      setError("Please use a real, permanent email address.");
      setLoading(false);
      return;
    }

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

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      const signInResult = await signIn("firebase", {
        idToken,
        isSignUp: "true",
        redirect: false,
      });

      if (signInResult?.error) {
        setError(signInResult.error === "CredentialsSignin" ? "Failed to sign up with Google" : signInResult.error);
        setLoading(false);
      } else {
        router.push("/quizzes");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred with Google Sign-In");
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

        <div className="animate-fade-in-up delay-400" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            <span style={{ padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          </div>
          
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="btn-secondary" 
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'white',
              color: '#333'
            }} 
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="animate-fade-in-up delay-500" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontSize: '1rem' }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
