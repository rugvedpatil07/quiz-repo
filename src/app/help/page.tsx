import React from 'react';

export default function HelpCenter() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }} className="animated-text-gradient">Help Center</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>How can we help you today?</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Getting Started</h3>
            <p className="text-muted">Learn how to create your first quiz, invite friends, and track your scores.</p>
          </div>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Account Management</h3>
            <p className="text-muted">Update your profile, change your password, and manage your preferences.</p>
          </div>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Billing & Subscriptions</h3>
            <p className="text-muted">View your payment history, upgrade your plan, or cancel your subscription.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
