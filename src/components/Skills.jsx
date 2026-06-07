import React from 'react';
import { 
  Cpu, Database, Layout, Terminal, Code2, Globe, Server, Layers, GitBranch, Shield 
} from 'lucide-react';

const SKILLS_DATA = [
  { name: 'JavaScript', category: 'language', icon: <Globe size={18} /> },
  { name: 'TypeScript', category: 'language', icon: <Code2 size={18} /> },
  { name: 'React', category: 'framework', icon: <Layout size={18} /> },
  { name: 'NodeJS', category: 'backend', icon: <Server size={18} /> },
  { name: 'PostgreSQL', category: 'database', icon: <Database size={18} /> },
  { name: 'MongoDB', category: 'database', icon: <Layers size={18} /> },
  { name: 'Docker', category: 'devops', icon: <Cpu size={18} /> },
  { name: 'Git', category: 'version-control', icon: <GitBranch size={18} /> },
  { name: 'GraphQL', category: 'api', icon: <Terminal size={18} /> },
  { name: 'Cybersecurity', category: 'security', icon: <Shield size={18} /> },
];

export default function Skills() {
  // Duplicate array to enable seamless marquee looping
  const doubleSkills = [...SKILLS_DATA, ...SKILLS_DATA, ...SKILLS_DATA];

  return (
    <section id="skills">
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; stack /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Technical <span className="glow-text" style={{ color: 'var(--primary-color)' }}>Capabilities</span>
        </h3>
      </div>

      {/* Code Loop Visualizer */}
      <div className="glass" style={{ padding: '16px 20px', marginBottom: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#a0aec0', border: '1px solid var(--border-color)' }}>
        <div style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>
          <span style={{ color: '#ff79c6' }}>const</span> renderSkills = (stack) =&gt; &#123;
        </div>
        <div style={{ paddingLeft: '20px' }}>
          stack.<span style={{ color: '#50fa7b' }}>forEach</span>((skill) =&gt; &#123;
          <div style={{ paddingLeft: '20px', color: '#f1fa8c' }}>
            marquee.<span style={{ color: '#8be9fd' }}>append</span>(&lt;<span style={{ color: 'var(--secondary-color)' }}>SkillCard</span> key=&#123;skill.id&#125; icon=&#123;skill.icon&#125; /&gt;)
          </div>
          &#125;);
        </div>
        <div>&#125;;</div>
      </div>

      {/* Marquee Wrapper */}
      <div className="marquee-container glass" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="marquee-content">
          {doubleSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="skill-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ color: 'var(--primary-color)' }}>{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-card:hover {
          background: var(--bg-card-hover) !important;
          border-color: var(--primary-color) !important;
          box-shadow: var(--glow-shadow);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
