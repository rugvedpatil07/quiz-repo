import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Terms of Service</h1>
        <p className="text-muted" style={{ marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>1. Acceptance of Terms</h2>
            <p className="text-muted">By accessing and using QuizMaster, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>2. Provision of Services</h2>
            <p className="text-muted">QuizMaster is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the services which QuizMaster provides may change from time to time without prior notice to you.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>3. User Conduct</h2>
            <p className="text-muted">You agree to use the services only for purposes that are permitted by (a) the Terms and (b) any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
