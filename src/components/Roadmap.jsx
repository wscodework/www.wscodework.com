import React from 'react';
import { GitCommit, GitBranch, GitPullRequest, Milestone } from 'lucide-react';

const TIMELINE_DATA = [
  {
    phase: "PAST",
    branch: "archive/v1-legacy",
    title: "The Genesis & Core Systems",
    date: "2023 - 2025",
    description: "Designed core library integrations, database migrations, and early client custom dashboard builds. Hardened backend microservice architectures.",
    commits: ["init repository", "refactor backend pipeline", "v1.4.0 release tag"],
    color: "var(--text-muted)",
    glow: "rgba(100, 116, 139, 0.2)"
  },
  {
    phase: "PRESENT",
    branch: "main",
    title: "High-Performance Fullstack Systems",
    date: "2025 - CURRENT",
    description: "Focusing on low-latency dashboard products, WebGL animations, and automated testing integrations. Building state-of-the-art interactive user experiences.",
    commits: ["feat: next-gen visualizer", "perf: optimization bundle", "deploy production success"],
    color: "var(--primary-color)",
    glow: "rgba(0, 255, 157, 0.3)"
  },
  {
    phase: "FUTURE",
    branch: "feature/next-gen-ai",
    title: "AI Integrations & Edge Orchestration",
    date: "2026 ROADMAP",
    description: "Expanding capabilities into serverless edge gateways, customized local model orchestration, and automated agent integration protocols.",
    commits: ["docs: roadmap draft", "feat: webgpu inference engine", "v3.0.0-beta release"],
    color: "var(--secondary-color)",
    glow: "rgba(0, 240, 255, 0.3)"
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap">
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; plan /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Development <span className="glow-text" style={{ color: 'var(--primary-color)' }}>Roadmap</span>
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
        {/* Decorative background git line */}
        <div style={{
          position: 'absolute',
          left: '33px',
          top: '30px',
          bottom: '30px',
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(100,116,139,0.3), var(--primary-color), var(--secondary-color))',
          zIndex: 0
        }} className="git-line" />

        {TIMELINE_DATA.map((item, index) => (
          <div 
            key={index} 
            style={{ display: 'flex', gap: '30px', zIndex: 1, position: 'relative' }}
            className="roadmap-row"
          >
            {/* Git node icon */}
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'var(--bg-dark)',
              border: `2px solid ${item.color}`,
              boxShadow: `0 0 15px ${item.glow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {index === 0 && <GitCommit size={24} style={{ color: item.color }} />}
              {index === 1 && <GitBranch size={24} style={{ color: item.color }} />}
              {index === 2 && <GitPullRequest size={24} style={{ color: item.color }} />}
            </div>

            {/* Content card */}
            <div className="glass" style={{ padding: '24px', flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', border: `1px solid ${index === 1 ? 'var(--border-color)' : 'rgba(255,255,255,0.05)'}` }} className="roadmap-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: item.color,
                    border: `1px solid ${item.color}`,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {item.phase}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    git branch: {item.branch}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.description}</p>
              </div>

              {/* Mock Commit history log */}
              <div className="commits-box" style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '16px',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Milestone size={12} /> COMMIT_HISTORY
                </div>
                {item.commits.map((commit, cIdx) => (
                  <div key={cIdx} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: item.color }}>*</span>
                    <span style={{ color: 'var(--text-main)' }}>{commit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .roadmap-card {
            grid-template-columns: 1fr !important;
          }
          .git-line {
            left: 23px !important;
          }
          .roadmap-row > div:first-child {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
