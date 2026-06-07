import React from 'react';
import { User, ShieldCheck, Zap, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'EXPERIENCE', value: '2+ Years' },
    { label: 'COMPLETED_PROJECTS', value: '10+' },
    { label: 'CLIENTS_SERVED', value: '6+' },
    { label: 'UPLINK_RATING', value: '5.0 / 5' }
  ];

  return (
    <section id="about">
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; about_us /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Engineering <span className="glow-text" style={{ color: 'var(--primary-color)' }}>Solutions</span> for Growth
        </h3>
      </div>

      <div className="grid-2">
        {/* Bio Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
            Hello! We are a passionate team of full-stack engineers and designers dedicated to helping businesses and startups launch robust software solutions. We specialize in building scalable web architectures with high visual polish.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Our approach is highly technical and data-driven: We optimize server response times, implement secure database architectures, and design intuitive, gorgeous frontend layouts that keep clients engaged and boost conversion rates.
          </p>

          {/* Features check */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }} className="about-features">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>Fast Load Times</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--secondary-color)' }} />
              <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>Secure Pipelines</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={18} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>Scalable Codebases</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={18} style={{ color: 'var(--secondary-color)' }} />
              <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>Dedicated Support</span>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="glass" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--border-color)', position: 'relative' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            $ cat system_diagnostics.log
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                paddingBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--secondary-color)' }}>
                  {stat.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-color)' }} className="glow-text">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right' }}>
            [SYSTEM_STATUS: OK]
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .about-features {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
