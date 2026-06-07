import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

const DEFAULT_CSS = `:root {
  --primary-color: #00ff9d;
  --secondary-color: #00f0ff;
  --bg-dark: #07080d;
  --bg-card: #0f111a;
  --liquid-blur: blur(16px);
}`;

export default function Hero() {
  const [code, setCode] = useState(DEFAULT_CSS);
  const [terminalLogs, setTerminalLogs] = useState([
    'System ready. Edit variables above and click [COMPILE & RUN] to modify site aesthetics.',
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setTerminalLogs(prev => [...prev, '> init theme_compilation.sh', '>> parsing stylesheet...']);

    setTimeout(() => {
      try {
        // Parse the code for CSS custom properties
        const varRegex = /--([\w-]+)\s*:\s*([^;}\n]+)/g;
        let match;
        let count = 0;

        while ((match = varRegex.exec(code)) !== null) {
          const varName = `--${match[1].trim()}`;
          const varValue = match[2].trim();
          document.documentElement.style.setProperty(varName, varValue);
          count++;
        }

        setTerminalLogs(prev => [
          ...prev,
          `>> compilation successful. injected ${count} custom tokens.`,
          `>> system state: ACTIVE [${new Date().toLocaleTimeString()}]`
        ]);
      } catch (err) {
        setTerminalLogs(prev => [...prev, `>> Error: compilation failed: ${err.message}`]);
      } finally {
        setIsCompiling(false);
      }
    }, 800);
  };

  const handleReset = () => {
    setCode(DEFAULT_CSS);
    // Reset properties to default
    const defaults = {
      '--primary-color': '#00ff9d',
      '--secondary-color': '#00f0ff',
      '--bg-dark': '#07080d',
      '--bg-card': '#0f111a',
      '--liquid-blur': 'blur(16px)',
    };
    Object.entries(defaults).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
    setTerminalLogs([
      '>> System rolled back to baseline config.',
      'System ready. Edit variables above and click [COMPILE & RUN] to modify site aesthetics.'
    ]);
  };

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '140px' }}>
      <div className="grid-2" style={{ width: '100%' }}>
        {/* Left Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 255, 157, 0.1)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            borderRadius: '20px',
            width: 'fit-content',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--primary-color)'
          }}>
            <Sparkles size={14} />
            <span>AVAILABLE FOR AGENCY CONTRACTS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', fontFamily: 'var(--font-sans)' }}>
            Design <span className="glow-text" style={{ color: 'var(--primary-color)' }}>Compilable</span> Interfaces.
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px' }}>
            We are a premier software engineering agency crafting high-fidelity, high-performance web products. Try modifying the theme styles on the right to compile your own live system.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              &lt; Hire Us /&gt;
            </button>
            <button className="btn" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              // view_projects.log
            </button>
          </div>
        </div>

        {/* Right Code Compiler Panel */}
        <div className="glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <Terminal size={16} style={{ color: 'var(--secondary-color)' }} />
              <span>theme_config.css</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCompile}
                disabled={isCompiling}
                className="compiler-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(0, 255, 157, 0.15)',
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  boxShadow: '0 0 10px rgba(0, 255, 157, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Play size={12} fill="var(--primary-color)" />
                {isCompiling ? 'COMPILING...' : 'COMPILE & RUN'}
              </button>
              <button
                onClick={handleReset}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-main)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                title="Reset Theme"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Text Area styling like an IDE */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                height: '180px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                color: '#6df0ff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                padding: '12px',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5',
              }}
            />
          </div>

          {/* Output log */}
          <div style={{
            background: '#040508',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '6px',
            padding: '10px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            height: '100px',
            overflowY: 'auto',
            color: '#a0aec0',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {terminalLogs.map((log, idx) => (
              <div key={idx} style={{
                color: log.startsWith('>> Error') ? '#ff4d4d' : log.startsWith('>> compilation successful') ? 'var(--primary-color)' : '#a0aec0'
              }}>
                {log}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldAlert size={12} />
            <span>A refresh will restore system baseline colors.</span>
          </div>
        </div>
      </div>

      <style>{`
        .compiler-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--bg-dark) !important;
          box-shadow: var(--glow-shadow) !important;
        }
      `}</style>
    </section>
  );
}
