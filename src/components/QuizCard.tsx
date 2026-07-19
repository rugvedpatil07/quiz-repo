"use client";

import Link from "next/link";
import TiltCard from "./TiltCard";
import HostLiveButton from "./HostLiveButton";

interface QuizCardProps {
  quiz: {
    id: string | number;
    title: string;
    description: string | null;
    timeLimit?: number | null;
    creator?: { name: string | null } | null;
    _count: { questions: number };
  };
  attempt?: {
    score: number;
  };
}

export default function QuizCard({ quiz, attempt, disableTilt }: QuizCardProps & { disableTilt?: boolean }) {
  // Use sleek, premium CSS gradients matching the user's reference image colors
  const gradients = [
    'linear-gradient(135deg, #232526 0%, #414345 100%)', // Dark card
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // Pink to Light Blue
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Soft Pink
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // Soft Blue
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // Orange Peach
    'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)', // Silver White
    'linear-gradient(135deg, #ebbba7 0%, #cfc7f8 100%)', // Orange to Purple
  ];
  
  // Pick a gradient deterministically based on quiz.id
  const gradientIndex = typeof quiz.id === 'number' 
    ? quiz.id % gradients.length 
    : String(quiz.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    
  const cardBackground = gradients[gradientIndex];

  const CardWrapper = disableTilt ? 'div' : TiltCard;
  const wrapperProps = disableTilt 
    ? { className: "quiz-card-wrapper", style: { height: '100%', width: '100%' } }
    : { scale: 1.02, maxTilt: 5, className: "quiz-card-wrapper", style: { height: '100%', width: '100%' } };

  return (
    <CardWrapper {...wrapperProps}>
      <div 
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          background: cardBackground,
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {/* Dark overlay gradient for text readability - mimicking the reference card */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 30%, #0a0a0a 70%, #0a0a0a 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Badges positioned at the top */}
        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
             {attempt && (
               <span style={{ 
                 background: 'rgba(255,255,255,0.1)', 
                 backdropFilter: 'blur(10px)',
                 color: '#fff', 
                 padding: '0.3rem 0.8rem',
                 borderRadius: '99px',
                 fontSize: '0.75rem',
                 fontWeight: 600, 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.3rem',
                 border: '1px solid rgba(255,255,255,0.2)'
               }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Score: {attempt.score}/{quiz._count.questions}
               </span>
             )}
           </div>
           {quiz.timeLimit ? (
             <span style={{ 
               background: 'rgba(0,0,0,0.4)', 
               backdropFilter: 'blur(10px)',
               color: 'rgba(255,255,255,0.9)', 
               padding: '0.3rem 0.8rem',
               borderRadius: '99px',
               fontSize: '0.75rem',
               fontWeight: 600, 
               display: 'flex', 
               alignItems: 'center', 
               gap: '0.4rem',
               border: '1px solid rgba(255,255,255,0.1)'
             }}>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
               {Math.floor(quiz.timeLimit / 60)}:{String(quiz.timeLimit % 60).padStart(2, '0')}
             </span>
           ) : null}
        </div>

        {/* Content area */}
        <div style={{ position: 'relative', zIndex: 2, padding: '2rem 1.75rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
          
          <h3 style={{ 
            fontFamily: "var(--font-playfair), 'Playfair Display', serif", 
            fontSize: disableTilt ? '1.25rem' : '1.75rem', 
            fontWeight: 500, 
            color: '#ffffff',
            marginBottom: disableTilt ? '0.25rem' : '0.5rem',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            wordWrap: 'break-word',
            hyphens: 'auto',
            display: '-webkit-box',
            WebkitLineClamp: disableTilt ? 3 : 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {quiz.title}
          </h3>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.65)', 
            fontSize: disableTilt ? '0.8rem' : '0.95rem', 
            marginBottom: disableTilt ? '1rem' : '1.75rem',
            display: '-webkit-box',
            WebkitLineClamp: disableTilt ? 1 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
            fontWeight: 400
          }}>
            {quiz.description || "No description provided."}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Link 
              href={`/take/${quiz.id}`} 
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.7rem 1.25rem',
                borderRadius: '99px',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                flex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              {attempt ? 'Retake Quiz' : 'Solo Practice'}
            </Link>
            <div style={{ flex: 1 }}>
              <HostLiveButton 
                quizId={Number(quiz.id)} 
                className=""
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: '99px',
                  transition: 'all 0.2s ease',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.08)', 
            paddingTop: '1rem',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}>
            <span>by {quiz.creator?.name || 'Unknown'}</span>
            <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
               ✦ {quiz._count.questions} questions ✦
            </span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
