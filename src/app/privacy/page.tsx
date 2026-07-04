import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Privacy Policy</h1>
        <p className="text-muted" style={{ marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>1. Information We Collect</h2>
            <p className="text-muted">We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>2. How We Use Information</h2>
            <p className="text-muted">We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, and develop new features.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>3. Sharing of Information</h2>
            <p className="text-muted">We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including with third party service providers who perform services on our behalf.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
