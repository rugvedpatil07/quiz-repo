import React from 'react';

export default function SecurityTrust() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafafa',
      padding: '120px 24px 80px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease both;
        }
        .security-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .security-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
      `}</style>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Trust & Security
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Enterprise-grade security<br/>for your peace of mind.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            At QuizMaster, protecting your data is our top priority. We employ industry-leading security measures to ensure your information is safe.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div className="security-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              🔒
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Data Encryption</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3. Data at rest is encrypted using AES-256 encryption.
            </p>
          </div>

          <div className="security-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              🛡️
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Infrastructure Security</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Our platform is hosted on world-class cloud infrastructure providers with rigorous physical and network security protocols, ensuring maximum uptime and safety.
            </p>
          </div>

          <div className="security-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              🔑
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Access Control</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              We implement strict role-based access control (RBAC). Only authorized personnel have access to sensitive systems, protected by mandatory multi-factor authentication.
            </p>
          </div>

          <div className="security-card animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              👁️
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Privacy by Design</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              We don't sell your personal data. We only collect what is strictly necessary to provide and improve our services, strictly adhering to global privacy regulations.
            </p>
          </div>

          <div className="security-card animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffe4e6', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              🚨
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Vulnerability Management</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              We conduct regular security audits, automated vulnerability scanning, and third-party penetration testing to identify and remediate potential security flaws.
            </p>
          </div>

          <div className="security-card animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              📜
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Compliance Ready</h3>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              QuizMaster is committed to maintaining compliance with leading frameworks. We are actively working towards formal SOC 2 Type II and GDPR certifications.
            </p>
          </div>

        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.7s', marginTop: '60px', padding: '40px', background: 'white', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '16px' }}>Report a Vulnerability</h2>
          <p style={{ color: '#666', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            We deeply appreciate the efforts of the security community. If you believe you have found a security vulnerability in our platform, please let us know immediately.
          </p>
          <a href="mailto:security@quizmaster.com" style={{ display: 'inline-block', background: '#1a1a1a', color: 'white', padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
            security@quizmaster.com
          </a>
        </div>
      </div>
    </div>
  );
}
