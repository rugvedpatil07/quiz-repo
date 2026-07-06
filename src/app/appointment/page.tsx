"use client";

import React, { useState } from 'react';
import { HeroBackground } from '@/components/HeroBackground';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to book appointment');
      }

      setStatus('success');
      setFormData({ name: '', email: '', date: '', time: '', message: '' });
    } catch (err: any) {
      console.error('Appointment Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <HeroBackground />
      </div>
      
      <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 1, padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="heading-xl animated-text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Book an Appointment</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Schedule a time to speak with our team about your quiz needs.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#22c55e' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Appointment Requested!</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                We have received your details and will confirm your appointment shortly.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-primary" style={{ padding: '0.8rem 2rem' }}>Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {status === 'error' && (
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', textAlign: 'center' }}>
                  {errorMessage}
                </div>
              )}
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.9rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Jane Doe" style={{ paddingLeft: '2.8rem' }} />
                  <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.9rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="jane@example.com" style={{ paddingLeft: '2.8rem' }} />
                  <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.9rem' }}>Preferred Date</label>
                  <div style={{ position: 'relative' }}>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" style={{ paddingLeft: '2.8rem' }} />
                    <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.9rem' }}>Preferred Time</label>
                  <div style={{ position: 'relative' }}>
                    <input required type="time" name="time" value={formData.time} onChange={handleChange} className="form-input" style={{ paddingLeft: '2.8rem' }} />
                    <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.9rem' }}>Additional Message</label>
                <div style={{ position: 'relative' }}>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="form-input" rows={4} placeholder="Any specific topics you'd like to discuss?" style={{ paddingLeft: '2.8rem', paddingTop: '1rem' }}></textarea>
                  <svg style={{ position: 'absolute', left: '1rem', top: '1.2rem', color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
              </div>
              
              <button disabled={status === 'loading'} type="submit" className="btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Booking...' : 'Confirm Appointment'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
