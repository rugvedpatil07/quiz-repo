import Link from "next/link";
import { prisma } from "@/lib/prisma";
import QuizCard from "@/components/QuizCard";
import CurvedCarousel from "@/components/CurvedCarousel";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch latest quizzes to populate the curved carousel
  const trendingQuizzes = await prisma.quiz.findMany({
    include: {
      creator: {
        select: { name: true }
      },
      _count: {
        select: { questions: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 7
  });

  return (
    <div className="flowblox-theme" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden', position: 'relative', zIndex: 10 }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, color: '#1A1A1A', marginBottom: '1.5rem' }}>
            <span className="flowblox-serif" style={{ display: 'block', fontWeight: 400, fontStyle: 'italic', color: '#333' }}>
              Streamline Your Learning,
            </span>
            <span style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
              Supercharge Your Knowledge
            </span>
          </h1>
          
          <p style={{ color: '#555555', fontSize: '1.15rem', maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            All-in-one platform to plan, collaborate, and deliver interactive quizzes — faster and smarter.
          </p>
          
          <Link href="/create" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: '#1A1A1A', 
            color: '#ffffff', 
            padding: '1rem 2.5rem', 
            borderRadius: '9999px', 
            fontWeight: 600, 
            fontSize: '1rem',
            transition: 'transform 0.2s',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }}>
            Get started for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
          
        </div>
      </section>

      {/* 2. CURVED CAROUSEL SECTION */}
      <section style={{ width: '100%', paddingBottom: '4rem', overflow: 'hidden' }}>
        <CurvedCarousel quizzes={trendingQuizzes} />
        
        {/* Three Features below Carousel */}
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem', flexWrap: 'wrap', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '3rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '280px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1A1A1A' }}>Real-Time Multiplayer</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Communicate seamlessly and keep everyone in sync with built-in messaging, live sharing, and live updates.</p>
          </div>
          
          <div style={{ textAlign: 'center', maxWidth: '280px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1A1A1A' }}>Live Score & Tracking</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Assign tasks, set deadlines, and visualize progress with boards tailored to your team's style.</p>
          </div>
          
          <div style={{ textAlign: 'center', maxWidth: '280px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1A1A1A' }}>Performance Insights</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Make smarter decisions with analytics that show productivity trends, bottlenecks, and team balance.</p>
          </div>
          
        </div>
      </section>

      {/* 3. BENTO GRID SECTION */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Everything Your Team Needs to<br/>Work Smarter
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            From task tracking to real-time chat, our features are built to keep your team connected, organized, and moving forward — together.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', gridAutoRows: 'minmax(280px, auto)' }}>
          
          {/* Top Left: Large Built-In Team Chat (Image style placeholder) */}
          <div className="flowblox-card-dark" style={{ gridColumn: 'span 8', backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', borderRadius: '20px' }}></div>
            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Built-In Team Chat</h3>
              <p style={{ fontSize: '1rem', color: '#ddd', maxWidth: '80%' }}>Communicate instantly within projects — no need to switch apps.</p>
            </div>
          </div>
          
          {/* Top Right: Small Light Cream */}
          <div className="flowblox-card-cream" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>Task Assignment</h3>
            <p style={{ fontSize: '1rem', color: '#555' }}>Easily create, assign, and track tasks to keep everyone aligned and accountable.</p>
          </div>
          
          {/* Bottom Left: Small Tan */}
          <div className="flowblox-card-tan" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>Real-Time Scheduling</h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>Plan meetings, set deadlines, and sync calendars so your team stays on the same page.</p>
          </div>
          
          {/* Bottom Right: Large Sage Green */}
          <div className="flowblox-card-sage" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '50%', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Progress Tracking</h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>Visualize team performance with dashboards that highlight what's done and what's next.</p>
            </div>
            {/* Cutout style portrait placeholder */}
            <div style={{ position: 'absolute', right: '0', bottom: '0', width: '45%', height: '120%', backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1, maskImage: 'linear-gradient(to right, transparent, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }}>
            </div>
          </div>
          
        </div>
      </section>

      {/* 4. PROVEN RESULTS */}
      <section className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Proven Results, Real Impact
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto 4rem' }}>
          See how teams around the world are working faster, communicating better, and getting more done with our all-in-one management platform.
        </p>
      </section>

    </div>
  );
}
