import Link from "next/link";

export default function Home() {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section className="container" style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%', margin: 'auto' }}>
          
          {/* Left Column: Hero Text */}
          <div className="animate-fade-in-up hero-col">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(9, 9, 11, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.5rem 1.25rem', borderRadius: '9999px', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: '#E7D4BB', boxShadow: '0 0 12px #E7D4BB' }}></span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.02em' }}>QuizMaster 2.0 is Live</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em', color: '#ffffff' }}>
              Master Any Subject with <span style={{ background: 'linear-gradient(to right, #E7D4BB, #857861, #48252F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Interactive</span> Quizzes
            </h1>
            
            <p style={{ marginBottom: '3rem', fontSize: '1.125rem', maxWidth: '500px', lineHeight: 1.6, color: '#94a3b8' }}>
              Create engaging quizzes, challenge your friends, and track your progress in real-time. The ultimate platform for knowledge sharing.
            </p>
            
            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/create" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600, background: 'linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)', color: '#09090b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 #ffffff, 0 8px 25px rgba(255,255,255,0.15)', transition: 'all 0.2s ease' }}>
                Create a Quiz
              </Link>
              <Link href="/play" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600, background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.2s ease' }}>
                Join Game
              </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>10k+</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Quizzes</p>
              </div>
              <div>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>2M+</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions Answered</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Premium Floating Mockup */}
          <div className="animate-fade-in-up delay-200 hero-col-right">
            <div className="mockup-card" style={{ 
              transform: 'rotateY(-12deg) rotateX(6deg)', 
              boxShadow: '-30px 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 40px rgba(255,255,255,0.05)',
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              padding: '2.5rem',
              transition: 'transform 0.5s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>Advanced Web Dev</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>Question 4 of 10</p>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  00:09
                </div>
              </div>
              
              <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', fontWeight: 600, lineHeight: 1.5, color: '#f1f5f9' }}>What is the primary benefit of React Server Components?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #475569' }}></div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 500, color: '#cbd5e1' }}>They replace Client Components entirely</span>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(231, 212, 187, 0.5)', background: 'linear-gradient(90deg, rgba(133, 120, 97, 0.2) 0%, rgba(133, 120, 97, 0.05) 100%)', display: 'flex', alignItems: 'center', gap: '1.25rem', boxShadow: 'inset 0 0 20px rgba(231, 212, 187, 0.1)', transform: 'translateX(10px)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E7D4BB', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(231, 212, 187, 0.5)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff' }}>They reduce client bundle size by rendering on server</span>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #475569' }}></div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 500, color: '#cbd5e1' }}>They allow direct DOM manipulation</span>
                </div>
              </div>
            </div>
            
            {/* Glowing orbs behind card */}
            <div style={{ position: 'absolute', top: '10%', right: '0%', width: '200px', height: '200px', background: '#48252F', opacity: 0.15, filter: 'blur(50px)', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: '250px', height: '250px', background: '#857861', opacity: 0.15, filter: 'blur(60px)', zIndex: -1 }}></div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '6rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Built for the Modern Classroom</h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Everything you need to host engaging, real-time quiz experiences that look stunning on any device.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', gridAutoRows: 'minmax(340px, auto)' }}>
          
          {/* Card 1: Multiplayer Mockup */}
          <div className="bento-card" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '3rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%)', zIndex: 0 }}></div>
            
            {/* Visual Detail: Floating Avatars/Players */}
            <div style={{ position: 'absolute', top: '15%', right: '10%', display: 'flex', gap: '-10px', zIndex: 1 }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #E7D4BB, #857861)', border: '3px solid #0f172a', zIndex: 3, boxShadow: '0 10px 20px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>JD</div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #857861, #48252F)', border: '3px solid #0f172a', zIndex: 2, transform: 'translateX(-20px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>SK</div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #E7D4BB, #101211)', border: '3px solid #0f172a', zIndex: 1, transform: 'translateX(-40px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>+12</div>
            </div>
            
            {/* Visual Detail: Connecting lines */}
            <div style={{ position: 'absolute', top: '40%', right: '20%', width: '150px', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0))', zIndex: 1, transform: 'rotate(-15deg)' }}></div>
            
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Massive Multiplayer</h3>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6 }}>Host live sessions where hundreds of participants join instantly. WebSockets ensure sub-millisecond sync across all devices.</p>
            </div>
          </div>
          
          {/* Card 3: Scoreboard Mockup */}
          <div className="bento-card" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '3rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(133, 120, 97, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
             
             {/* Visual Detail: Animated Bar Chart Mockup */}
             <div style={{ position: 'absolute', top: '15%', right: '10%', width: '40%', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 1 }}>
               <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                 <div style={{ height: '100%', width: '85%', background: '#48252F', borderRadius: '4px', boxShadow: '0 0 10px #48252F' }}></div>
               </div>
               <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                 <div style={{ height: '100%', width: '60%', background: '#E7D4BB', borderRadius: '4px' }}></div>
               </div>
               <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                 <div style={{ height: '100%', width: '45%', background: '#857861', borderRadius: '4px' }}></div>
               </div>
             </div>

             <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Live Scoreboards</h3>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>Track rankings instantly after every question with dramatic visuals.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. HOW IT WORKS TIMELINE */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '8rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>How It Works</h2>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>From creation to live gameplay in three simple steps.</p>
        </div>
        
        <div className="timeline-grid" style={{ position: 'relative' }}>
          
          {/* Connecting Line (Only visible on larger screens via flex magic, but we simulate it with background grid lines) */}
          <div className="timeline-line" style={{ position: 'absolute', top: '48px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)', zIndex: -1 }}>
            {/* Animated glowing dot moving across the line */}
            <div style={{ position: 'absolute', top: '-3px', left: '0', width: '8px', height: '8px', borderRadius: '50%', background: '#E7D4BB', boxShadow: '0 0 20px 4px rgba(231, 212, 187, 0.6)', animation: 'moveAcross 4s infinite linear' }}>
              <style>{`
                @keyframes moveAcross {
                  0% { left: 0%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { left: 100%; opacity: 0; }
                }
              `}</style>
            </div>
          </div>
          
          {/* Step 1 */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#101211', border: '1px solid rgba(231, 212, 187, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 800, color: '#E7D4BB', boxShadow: 'inset 0 0 30px rgba(231, 212, 187, 0.2), 0 0 40px rgba(231, 212, 187, 0.1)' }}>1</div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Create</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '280px' }}>Build an engaging quiz with multiple choice questions, timers, and point values.</p>
          </div>
          
          {/* Step 2 */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#101211', border: '1px solid rgba(133, 120, 97, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 800, color: '#857861', boxShadow: 'inset 0 0 30px rgba(133, 120, 97, 0.2), 0 0 40px rgba(133, 120, 97, 0.1)' }}>2</div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Share PIN</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '280px' }}>Launch the lobby and share the unique 6-digit access code with your audience.</p>
          </div>
          
          {/* Step 3 */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#101211', border: '1px solid rgba(72, 37, 47, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 800, color: '#48252F', boxShadow: 'inset 0 0 30px rgba(72, 37, 47, 0.2), 0 0 40px rgba(72, 37, 47, 0.1)' }}>3</div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Play Live</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '280px' }}>Players answer in real-time on their devices while watching the host screen.</p>
          </div>
        </div>
      </section>

      {/* 4. GRAND CTA */}
      <section className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 0 8rem 0' }}>
        <div style={{ background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '32px', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(133, 120, 97, 0.15) 0%, transparent 60%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.1 }}>Ready to engage your audience?</h2>
            <p style={{ fontSize: '1.15rem', color: '#94a3b8', marginBottom: '3rem' }}>Join thousands of educators and event hosts who use QuizMaster to create unforgettable interactive experiences.</p>
            
            <Link href="/create" style={{ display: 'inline-flex', padding: '1.25rem 3rem', fontSize: '1.15rem', fontWeight: 700, background: 'linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)', color: '#09090b', borderRadius: '16px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 #ffffff, 0 10px 30px rgba(255,255,255,0.2)', transition: 'transform 0.2s ease' }}>
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
