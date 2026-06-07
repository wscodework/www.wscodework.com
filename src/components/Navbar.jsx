import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: '// home',     id: 'hero' },
    { label: '// about',    id: 'about' },
    { label: '// skills',   id: 'skills' },
    { label: '// projects', id: 'projects' },
    { label: '// services', id: 'services' },
    { label: '// timeline', id: 'roadmap' },
    { label: '// contact',  id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="liquid-navbar" style={{ backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)' }}>
      {/* ── Text Logo ── */}
      <div
        className="nav-logo"
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
        onClick={() => scrollTo('hero')}
      >
        <Terminal size={20} style={{ color: 'var(--primary-color)' }} />
        <span style={{ fontWeight: '800', letterSpacing: '0.5px' }}>
          &lt;<span style={{ color: 'var(--primary-color)' }}>WS</span>
          <span style={{ color: 'var(--secondary-color)' }}>.CodeWork</span> /&gt;
        </span>
      </div>

      {/* ── Desktop Navigation ── */}
      <ul style={{ display: 'flex', listStyle: 'none', gap: '24px', alignItems: 'center', margin: 0, padding: 0 }} className="desktop-nav">
        {navLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: activeSection === link.id ? 'var(--primary-color)' : 'var(--text-main)',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '4px 8px',
                opacity: activeSection === link.id ? 1 : 0.75,
              }}
              className="nav-btn"
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '8px',
                    right: '8px',
                    height: '2px',
                    backgroundColor: 'var(--primary-color)',
                    boxShadow: 'var(--glow-shadow)',
                    borderRadius: '2px',
                  }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* ── Mobile Menu Toggle ── */}
      <div className="mobile-toggle" style={{ display: 'none' }}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(8,12,24,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 5%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: activeSection === link.id ? 'var(--primary-color)' : 'var(--text-main)',
                textAlign: 'left',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav  { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-btn:hover {
          color: var(--primary-color) !important;
          opacity: 1 !important;
          text-shadow: 0 0 8px rgba(0, 255, 157, 0.4);
        }
      `}</style>
    </nav>
  );
}
