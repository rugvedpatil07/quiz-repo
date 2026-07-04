import React from 'react';

export default function FAQ() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Is QuizMaster free to use?</h3>
            <p className="text-muted">Yes, QuizMaster is completely free for standard users. We also offer premium features for educators and enterprises.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-color)' }}>How do I create a quiz?</h3>
            <p className="text-muted">Simply sign in, navigate to the "Create Quiz" page from the navigation bar, and follow the step-by-step wizard to add your questions.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Can I share my quizzes?</h3>
            <p className="text-muted">Absolutely! Once you publish a quiz, you will receive a unique link that you can share with friends, students, or colleagues.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
