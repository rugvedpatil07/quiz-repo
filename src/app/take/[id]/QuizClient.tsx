"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function QuizClient({ quiz }: { quiz: any }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [globalTimeLeft, setGlobalTimeLeft] = useState<number | null>(quiz.timeLimit || null);

  const [animationClass, setAnimationClass] = useState("slide-in-right");

  useEffect(() => {
    if (globalTimeLeft === null || submitting || timeUp) return;
    
    if (globalTimeLeft <= 0) {
      setTimeUp(true);
      handleSubmit(true);
      return;
    }

    const timerId = setInterval(() => {
      setGlobalTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [globalTimeLeft, submitting, timeUp]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleClearResponse = (questionId: number) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleMarkForReview = (questionId: number) => {
    setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const triggerAnimation = (direction: "left" | "right") => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass(direction === "right" ? "slide-in-right" : "slide-in-left");
    }, 10);
  };

  const goToQuestion = (idx: number) => {
    if (idx === currentQuestion) return;
    triggerAnimation(idx > currentQuestion ? "right" : "left");
    setCurrentQuestion(idx);
    setVisited((prev) => ({ ...prev, [idx]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit && !showConfirmModal) {
      setShowConfirmModal(true);
      return;
    }
    setShowConfirmModal(false);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (res.ok) {
        const data = await res.json();
        router.refresh(); // Force Next.js to invalidate client-side cache
        router.push(`/results/${data.attemptId}`);
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.error || "Failed to submit quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const getQuestionStatus = (idx: number) => {
    const qId = quiz.questions[idx].id;
    const isAnswered = answers[qId] !== undefined;
    const isMarked = markedForReview[qId];
    const isVisited = visited[idx];
    
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    if (isVisited && !isAnswered) return 'not-answered';
    return 'not-visited';
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'answered': return 'status-answered';
      case 'marked': return 'status-marked';
      case 'not-answered': return 'status-not-answered';
      case 'not-visited': default: return 'status-not-visited';
    }
  };

  const question = quiz.questions[currentQuestion];
  const selectedOption = answers[question.id];

  return (
    <div className="quiz-container">
      <style>{`
        @keyframes pulse-danger { 
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } 
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes imageReveal {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes floatingImage {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-in-left { animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        
        .premium-image-container {
          position: relative;
          margin-bottom: 2.5rem;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(255,255,255,0.3));
          box-shadow: 0 15px 35px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.6);
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: imageReveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          backdrop-filter: blur(20px);
        }
        
        [data-theme='dark'] .premium-image-container {
          background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.6));
          box-shadow: 0 15px 35px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .premium-image-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, rgba(59, 130, 246, 0.1), transparent 30%);
          animation: rotate 4s linear infinite;
          pointer-events: none;
        }

        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }

        .premium-image {
          max-width: 100%;
          max-height: 400px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatingImage 6s ease-in-out infinite;
          z-index: 2;
          position: relative;
        }
        
        .premium-image:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
        }
        
        .quiz-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: calc(100vh - 80px);
        }

        .top-nav-bar {
          background: #3178b7;
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          width: 100%;
        }

        .status-btn {
          height: 40px;
          min-width: 40px;
          border-radius: 8px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
          padding: 0 1rem;
          flex-shrink: 0;
          background-color: rgba(255,255,255,0.15);
        }
        .status-btn:hover:not(:disabled) {
          background-color: rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }
        .status-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .status-btn-num {
          background-color: #9ca3af;
          padding: 0;
          color: white;
          border-radius: 6px;
        }
        
        .status-answered { background-color: #22c55e !important; color: white !important; border: 1px solid #22c55e; }
        .status-marked { background-color: #ea580c !important; color: white !important; border: 1px solid #ea580c; }
        .status-not-answered { background-color: #fff !important; color: #3178b7 !important; border: 1px solid #3178b7 !important; }
        .status-not-visited { background-color: #9ca3af !important; color: white !important; border: 1px solid #9ca3af; }
        
        [data-theme='dark'] .status-not-answered { background-color: #1e293b !important; color: #60a5fa !important; border: 1px solid #60a5fa !important; }

        .status-active-outline { 
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.6); 
          transform: scale(1.1); 
          z-index: 10;
        }
        .status-active-outline:hover:not(:disabled) {
          transform: scale(1.1) translateY(-2px) !important;
        }

        .nav-timer {
          background: #ea580c;
          color: white;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.25rem;
          font-weight: 700;
          margin-left: auto;
          box-shadow: 0 4px 10px rgba(234, 88, 12, 0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 1px;
        }
        .nav-timer.danger {
          background: #dc2626;
          animation: pulse-danger 1.5s infinite;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
          flex: 1;
        }
        
        @media (max-width: 900px) {
          .main-layout {
            grid-template-columns: 1fr;
          }
        }

        .question-panel {
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }

        [data-theme='dark'] .question-panel {
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        
        [data-theme='dark'] .question-header {
          border-color: rgba(255,255,255,0.1);
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .options-grid {
            grid-template-columns: 1fr;
          }
        }

        .option-item {
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 10px;
          padding: 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-theme='dark'] .option-item {
          background: #334155;
          color: #f8fafc;
        }

        .option-item:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.05);
        }
        
        [data-theme='dark'] .option-item:hover {
          background: #475569;
        }

        .option-item.selected {
          background: #eff6ff;
          border-color: #3b82f6;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
        }
        
        [data-theme='dark'] .option-item.selected {
          background: rgba(59, 130, 246, 0.15);
        }

        .bottom-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          flex-wrap: wrap;
        }
        
        .btn-outline-red {
          border: 1px solid #ef4444;
          color: #ef4444;
          background: transparent;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline-red:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        
        .btn-outline-orange {
          border: 1px solid #ea580c;
          color: #ea580c;
          background: transparent;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline-orange:hover {
          background: rgba(234, 88, 12, 0.1);
        }

        .btn-solid-blue {
          background: #3b82f6;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          margin-left: auto;
        }
        .btn-solid-blue:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
        }
        
        .btn-solid-red {
          background: #dc2626;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          width: 100%;
          text-align: center;
          margin-top: 1.5rem;
        }
        .btn-solid-red:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(220, 38, 38, 0.3);
        }
        .btn-solid-red:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .sidebar-panel {
          background: white;
          border-radius: 12px;
          padding: 1.75rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }
        
        [data-theme='dark'] .sidebar-panel {
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #4b5563;
        }
        
        [data-theme='dark'] .legend-item {
          color: #cbd5e1;
        }

        .legend-box {
          width: 22px;
          height: 22px;
          border-radius: 6px;
        }
        
        .radio-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .option-item.selected .radio-circle {
          border-color: #3b82f6;
        }
        .option-item.selected .radio-circle::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3b82f6;
        }
      `}</style>

      {timeUp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="sidebar-panel" style={{ textAlign: 'center', padding: '3rem', animation: 'slideInRight 0.3s ease-out' }}>
            <h2 style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Time's Up!</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Submitting your quiz automatically...</p>
          </div>
        </div>
      )}

      {/* Top Nav Bar */}
      <div className="top-nav-bar animate-fade-in-up">
        <button className="status-btn" onClick={handlePrev} disabled={currentQuestion === 0} title="Previous">
          ‹
        </button>
        <button className="status-btn" onClick={handlePrev} disabled={currentQuestion === 0}>
          Previous
        </button>

        <div style={{ display: 'flex', gap: '0.4rem', padding: '0 0.5rem', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {quiz.questions.map((_: any, idx: number) => {
            const status = getQuestionStatus(idx);
            const isActive = currentQuestion === idx;
            return (
              <button
                key={idx}
                className={`status-btn status-btn-num ${getStatusClass(status)} ${isActive ? 'status-active-outline' : ''}`}
                onClick={() => goToQuestion(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button className="status-btn" style={{ backgroundColor: '#22c55e' }} onClick={() => handleSubmit(false)}>
            Submit
          </button>
        ) : (
          <button className="status-btn" style={{ backgroundColor: '#22c55e' }} onClick={handleNext}>
            Next
          </button>
        )}
        <button className="status-btn" onClick={handleNext} disabled={currentQuestion === quiz.questions.length - 1} title="Next">
          ›
        </button>

        {globalTimeLeft !== null && (
          <div className={`nav-timer ${globalTimeLeft <= 10 ? 'danger' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatTime(globalTimeLeft)}
          </div>
        )}
      </div>

      <div className="main-layout" style={{ gridTemplateColumns: currentQuestion === 0 ? '1fr 320px' : '1fr', transition: 'grid-template-columns 0.4s ease' }}>
        {/* Main Question Panel */}
        <div className="question-panel animate-fade-in-up delay-100">
          <div className={animationClass} key={currentQuestion}>
            <div className="question-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </h3>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Marks: 1</span>
            </div>
            
            <p style={{ fontSize: '1.25rem', marginBottom: question.imageUrl ? '1.5rem' : '2rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {question.text}
            </p>

            {question.imageUrl && (
              <div className="premium-image-container">
                <img 
                  src={question.imageUrl} 
                  alt="Question Image" 
                  className="premium-image"
                />
              </div>
            )}
            
            <div className="options-grid">
              {question.options.map((opt: any) => (
                <div 
                  key={opt.id}
                  className={`option-item ${selectedOption === opt.id ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(question.id, opt.id)}
                >
                  <div className="radio-circle"></div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{opt.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bottom-actions">
            <button className="btn-outline-red" onClick={() => handleClearResponse(question.id)}>
              Clear Response
            </button>
            <button 
              className="btn-outline-orange" 
              onClick={() => handleMarkForReview(question.id)}
            >
              {markedForReview[question.id] ? "Unmark Review" : "Mark For Review"}
            </button>
            
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {currentQuestion !== 0 && (
                <button 
                  className="btn-solid-red" 
                  style={{ marginTop: 0, padding: '0.6rem 1.5rem', width: 'auto' }}
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Test"}
                </button>
              )}
              <button className="btn-solid-blue" onClick={handleNext} disabled={currentQuestion === quiz.questions.length - 1} style={{ marginLeft: 0 }}>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Legend (Only on first question) */}
        {currentQuestion === 0 && (
          <div className="sidebar-panel animate-fade-in-up delay-200" style={{ border: '1px solid rgba(59, 130, 246, 0.2)', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Legend
              </h3>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                {quiz.questions.length} Qs
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1.25rem', background: 'rgba(243, 244, 246, 0.4)', borderRadius: '12px', border: '1px solid rgba(229, 231, 235, 0.5)' }}>
              <div className="legend-item" style={{ margin: 0 }}>
                <div className="legend-box status-not-visited" style={{ boxShadow: '0 4px 10px rgba(156, 163, 175, 0.3)' }}></div>
                <span style={{ fontWeight: 600 }}>Not Visited</span>
              </div>
              <div className="legend-item" style={{ margin: 0 }}>
                <div className="legend-box status-not-answered" style={{ boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)' }}></div>
                <span style={{ fontWeight: 600 }}>Not Answered</span>
              </div>
              <div className="legend-item" style={{ margin: 0 }}>
                <div className="legend-box status-answered" style={{ boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)' }}></div>
                <span style={{ fontWeight: 600 }}>Answered</span>
              </div>
              <div className="legend-item" style={{ margin: 0 }}>
                <div className="legend-box status-marked" style={{ boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)' }}></div>
                <span style={{ fontWeight: 600 }}>Marked for Review</span>
              </div>
            </div>

            <div style={{ flex: 1 }}></div>

            <button 
              className="btn-solid-red" 
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              style={{ boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)' }}
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)'
        }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', textAlign: 'center', padding: '2.5rem 2rem', animation: 'imageReveal 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#3b82f6' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Submit Test?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
              Are you sure you want to submit? You have answered {Object.keys(answers).length} out of {quiz.questions.length} questions. You won't be able to change your answers after submission.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSubmit(true)}
                className="btn-primary"
                style={{ flex: 1, padding: '0.75rem', background: '#3b82f6' }}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
