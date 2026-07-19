"use client";

import { useState, useEffect, useCallback } from "react";
import QuizCard from "./QuizCard";

export default function CurvedCarousel({ quizzes }: { quizzes: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % quizzes.length);
  }, [quizzes.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + quizzes.length) % quizzes.length);
  }, [quizzes.length]);

  useEffect(() => {
    if (quizzes.length === 0) return;
    
    // Automatically slide every 3 seconds
    // Reset timer when user manually interacts (activeIndex changes)
    const interval = setInterval(nextSlide, 3000);
    
    return () => clearInterval(interval);
  }, [quizzes.length, activeIndex, nextSlide]);

  if (quizzes.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#555' }}>
        <p>No quizzes available to display.</p>
      </div>
    );
  }

  return (
    <div className="carousel-curved-container" style={{ minHeight: '500px', position: 'relative' }}>
      
      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '2rem',
          zIndex: 20,
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          color: '#333'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      {/* Carousel Cards */}
      {quizzes.map((quiz, index) => {
        // Calculate offset from the active center card
        const offset = (index - activeIndex + quizzes.length) % quizzes.length;
        
        let posClass = 'pos-hidden'; // Hidden/far back default
        if (offset === 0) posClass = 'pos-0';
        else if (offset === 1) posClass = 'pos-1';
        else if (offset === 2) posClass = 'pos-2';
        else if (offset === quizzes.length - 1) posClass = 'pos--1';
        else if (offset === quizzes.length - 2) posClass = 'pos--2';
        else posClass = 'pos-hidden'; // Hide the rest

        return (
          <div key={quiz.id} className={`carousel-card ${posClass}`}>
            <QuizCard quiz={quiz} disableTilt={true} />
          </div>
        );
      })}

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '2rem',
          zIndex: 20,
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          color: '#333'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

    </div>
  );
}
