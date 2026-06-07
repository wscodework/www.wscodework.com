import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '40px 5% 30px 5%',
      background: '#040508'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }} className="footer-content">

        {/* JSON Code Footer */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#a0aec0' }} className="footer-json">
          <span style={{ color: 'var(--primary-color)' }}>const</span> metadata = &#123;
          <div style={{ paddingLeft: '16px' }}>
            author: <span style={{ color: 'var(--secondary-color)' }}>"WS.CodeWork"</span>,
            status: <span style={{ color: 'var(--primary-color)' }}>"available_for_contracts"</span>,
            version: <span style={{ color: '#ffbd2e' }}>"{currentYear}.2.0"</span>,
            license: <span style={{ color: '#ff79c6' }}>"MIT"</span>
          </div>
          &#125;;
        </div>

        {/* Info & links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }} className="footer-right">
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            <a href="https://github.com/wscodework" target="_blank" rel="noreferrer" className="footer-link">// github</a>
            <a href="https://linkedin.com/in/ws-codework" target="_blank" rel="noreferrer" className="footer-link">// linkedin</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Shield size={12} />
            <span>Secure connection &amp; content authenticated</span>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginTop: '10px',
              transition: 'all 0.3s'
            }}
            className="top-scroll-btn"
          >
            <ArrowUp size={12} /> scroll_to_top()
          </button>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        marginTop: '30px',
        fontFamily: 'var(--font-mono)'
      }}>
        © {currentYear} WS.CodeWork. All rights reserved. // compiled_successfully
      </div>

      <style>{`
        .footer-link {
          opacity: 0.7;
          transition: all 0.3s;
        }
        .footer-link:hover {
          color: var(--primary-color);
          opacity: 1;
        }
        .top-scroll-btn:hover {
          text-shadow: 0 0 8px var(--primary-color);
          transform: translateY(-2px);
        }
        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-right {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
