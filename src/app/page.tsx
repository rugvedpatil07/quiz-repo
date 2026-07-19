import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const quizCount = await prisma.quiz.count();
  const userCount = await prisma.user.count();

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .hero-badge {
          animation: fadeUp 0.6s ease both;
        }
        .hero-title {
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .hero-sub {
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .hero-cta {
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .hero-visual {
          animation: fadeUp 0.8s ease 0.4s both;
        }
        .float-card {
          animation: float 4s ease-in-out infinite;
        }
        .float-card-2 {
          animation: float 5s ease-in-out 1s infinite;
        }
        .cta-btn-primary {
          transition: all 0.25s ease;
          animation: pulse-glow 2.5s infinite;
        }
        .cta-btn-primary:hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 20px 60px rgba(99,102,241,0.4) !important;
        }
        .cta-btn-secondary:hover {
          transform: translateY(-3px) !important;
          background: rgba(255,255,255,0.15) !important;
        }
        .cta-btn-secondary {
          transition: all 0.25s ease;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12) !important;
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(99,102,241,0.2) !important;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99,102,241,0.4) !important;
        }
        .nav-cta { transition: all 0.2s ease; }
      `}</style>

      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        background: 'linear-gradient(160deg, #f0f0ff 0%, #fafafa 40%, #fff0fa 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div className="hero-badge" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '9999px', padding: '6px 16px', marginBottom: '2rem',
          fontSize: '14px', fontWeight: 600, color: '#6366f1'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
          🎉 The #1 Quiz Platform for Students & Teams
        </div>

        {/* Title */}
        <h1 className="hero-title" style={{
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: '#0f0f0f',
          maxWidth: '900px',
          marginBottom: '1.5rem'
        }}>
          Learn Faster.<br />
          <span className="shimmer-text">Quiz Smarter.</span><br />
          Win Together.
        </h1>

        {/* Subtitle */}
        <p className="hero-sub" style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#555',
          maxWidth: '560px',
          lineHeight: 1.7,
          marginBottom: '2.5rem'
        }}>
          Create, play, and compete in interactive quizzes with real-time multiplayer, live leaderboards, and powerful analytics — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register" className="cta-btn-primary" style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            padding: '16px 36px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 40px rgba(99,102,241,0.35)'
          }}>
            Start for Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <Link href="/quizzes" className="cta-btn-secondary" style={{
            background: 'rgba(0,0,0,0.06)',
            color: '#333',
            padding: '16px 36px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            Browse Quizzes
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
        </div>

        {/* Social proof */}
        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#888' }}>
          <div style={{ display: 'flex' }}>
            {['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981'].map((color, i) => (
              <div key={i} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: color, border: '2px solid white',
                marginLeft: i === 0 ? 0 : '-8px'
              }} />
            ))}
          </div>
          <span><strong style={{ color: '#333' }}>{(userCount + 500).toLocaleString()}+</strong> students already learning</span>
        </div>

        {/* Floating UI preview cards */}
        <div className="hero-visual" style={{ position: 'relative', marginTop: '5rem', width: '100%', maxWidth: '800px' }}>
          
          {/* Main card */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.06)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '22px' }}>⚡</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a1a' }}>Science Quiz — Chapter 5</div>
                <div style={{ fontSize: '13px', color: '#888' }}>8 questions · 5 min · 24 players</div>
              </div>
              <div style={{ marginLeft: 'auto', background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600 }}>LIVE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['What is the speed of light?', 'Who discovered DNA?', 'What is Newton\'s 2nd Law?'].map((q, i) => (
                <div key={i} style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: i === 0 ? 'linear-gradient(135deg, #ede9fe, #f3e8ff)' : '#f8f8f8',
                  border: i === 0 ? '1.5px solid #c4b5fd' : '1.5px solid transparent',
                  fontSize: '14px', fontWeight: 500, color: i === 0 ? '#5b21b6' : '#555',
                  display: 'flex', alignItems: 'center', gap: '10px'
                }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: i === 0 ? '#7c3aed' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: i === 0 ? 'white' : '#999', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  {q}
                  {i === 0 && <span style={{ marginLeft: 'auto', fontSize: '18px' }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge: score */}
          <div className="float-card" style={{
            position: 'absolute', top: '-20px', right: '-30px',
            background: 'white', borderRadius: '16px', padding: '14px 20px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span style={{ fontSize: '28px' }}>🏆</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '22px', color: '#1a1a1a' }}>9,500</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Your Score</div>
            </div>
          </div>

          {/* Floating badge: streak */}
          <div className="float-card-2" style={{
            position: 'absolute', bottom: '-20px', left: '-30px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '16px', padding: '14px 20px',
            boxShadow: '0 20px 50px rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>🔥</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>7-Day Streak!</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>Keep it up</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS SECTION ─────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 24px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {[
            { emoji: '🧠', num: `${(quizCount + 200).toLocaleString()}+`, label: 'Quizzes Available' },
            { emoji: '👥', num: `${(userCount + 500).toLocaleString()}+`, label: 'Active Learners' },
            { emoji: '⚡', num: '< 5s', label: 'Avg. Response Time' },
            { emoji: '🌍', num: '50+', label: 'Countries Reached' },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{
              background: 'linear-gradient(135deg, #f5f3ff, #faf5ff)',
              borderRadius: '20px',
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid rgba(99,102,241,0.1)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.08)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{s.emoji}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4f46e5', letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ fontSize: '15px', color: '#666', fontWeight: 500, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES SECTION ─────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '6px 18px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Features
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#0f0f0f', letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Everything you need to quiz like a pro
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Powerful features wrapped in a beautiful, easy-to-use experience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { emoji: '⚡', title: 'Real-Time Multiplayer', desc: 'Host live quiz battles with up to 100 players simultaneously. See scores update in real time!', color: '#fef3c7', accent: '#f59e0b' },
              { emoji: '🏆', title: 'Live Leaderboards', desc: 'Dynamic rankings that update after each question — keep the competition exciting and fierce.', color: '#dcfce7', accent: '#16a34a' },
              { emoji: '📊', title: 'Deep Analytics', desc: 'Track performance over time, identify weak spots, and improve with intelligent insights.', color: '#ede9fe', accent: '#7c3aed' },
              { emoji: '🎨', title: 'Beautiful Quiz Builder', desc: 'Create stunning quizzes with images, timers, and multiple question types in minutes.', color: '#fce7f3', accent: '#db2777' },
              { emoji: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and safe. Share quizzes publicly or keep them private with a PIN.', color: '#dbeafe', accent: '#2563eb' },
              { emoji: '📱', title: 'Works Everywhere', desc: 'Fully responsive on mobile, tablet, and desktop. Play quizzes from any device, anywhere.', color: '#d1fae5', accent: '#059669' },
            ].map((f, i) => (
              <div key={i} className="feature-card" style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px', marginBottom: '20px'
                }}>
                  {f.emoji}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6, fontSize: '15px' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '6px 18px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            How It Works
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f0f0f', letterSpacing: '-0.03em', marginBottom: '64px' }}>
            3 steps to quiz mastery
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            {[
              { step: '01', title: 'Create or Browse', desc: 'Build your own quiz in minutes or pick from thousands of ready-made ones.', emoji: '✏️' },
              { step: '02', title: 'Invite & Play', desc: 'Share a PIN with friends, students, or your team and start playing instantly.', emoji: '🎮' },
              { step: '03', title: 'Track & Improve', desc: 'Review detailed results and analytics to identify areas for improvement.', emoji: '📈' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '18px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(99,102,241,0.3)'
                }}>
                  {s.emoji}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1', letterSpacing: '0.1em', marginBottom: '8px' }}>STEP {s.step}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a1a1a', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6, fontSize: '15px' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Ready to Level Up Your Learning?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            Join thousands of students and educators who are already making learning fun with QuizMaster.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/register" style={{
              background: 'white',
              color: '#4f46e5',
              padding: '16px 40px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
              transition: 'all 0.25s ease'
            }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link href="/play" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.25s ease'
            }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
            >
              Try a Live Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
