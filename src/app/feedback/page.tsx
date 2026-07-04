import React from 'react';

export default function Feedback() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Give Feedback</h1>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Help us improve QuizMaster by sharing your thoughts and feature requests.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">What type of feedback is this?</label>
            <select className="form-input">
              <option>Feature Request</option>
              <option>Bug Report</option>
              <option>Design Feedback</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Details</label>
            <textarea className="form-input" rows={6} placeholder="Tell us more about your experience..."></textarea>
          </div>
          <button type="button" className="btn-primary" style={{ padding: '1rem', fontSize: '1.1rem' }}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
