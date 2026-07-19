import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
        .policy-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          margin-bottom: 24px;
        }
        .policy-section h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .policy-section p, .policy-section li {
          color: #555;
          line-height: 1.7;
          font-size: 1rem;
          margin-bottom: 12px;
        }
        .policy-section ul {
          padding-left: 20px;
          margin-bottom: 16px;
        }
      `}</style>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Legal
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px', textAlign: 'center' }}>
            At QuizMaster, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        {/* Sections */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          
          <section className="policy-section">
            <h2><span style={{ color: '#6366f1' }}>01.</span> Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and services, including quiz participation, scores, and analytics.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2><span style={{ color: '#6366f1' }}>02.</span> How We Use Your Information</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing access to quizzes).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
              <li>To improve our website, products/services, marketing, customer relationships and experiences.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2><span style={{ color: '#6366f1' }}>03.</span> Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. For more details on our security infrastructure, please visit our <Link href="/security" style={{ color: '#6366f1', textDecoration: 'underline' }}>Security & Trust</Link> page.
            </p>
            <p>
              In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
          </section>

          <section className="policy-section">
            <h2><span style={{ color: '#6366f1' }}>04.</span> Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
            </ul>
            <p style={{ marginTop: '16px' }}>
              If you wish to exercise any of the rights set out above, please contact us at privacy@quizmaster.com.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
