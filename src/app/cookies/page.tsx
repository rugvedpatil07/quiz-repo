import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="container min-h-screen animate-fade-in-up" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Cookie Policy</h1>
        <p className="text-muted" style={{ marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>What are cookies?</h2>
            <p className="text-muted">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>How we use cookies</h2>
            <p className="text-muted">We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>Types of cookies we use</h2>
            <ul className="text-muted" style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Essential cookies:</strong> Required for the basic operation of the website, such as authenticating your login session.</li>
              <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
              <li><strong>Functionality cookies:</strong> Used to recognize you when you return to our website and personalize our content for you.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
