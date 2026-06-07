import React, { useState } from 'react';
import { AppWindow, Database, Cpu, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

const SERVICES_DATA = [
  {
    tabName: "frontend_dev.tsx",
    icon: <AppWindow size={16} style={{ color: '#00f0ff' }} />,
    title: "Frontend Development",
    header: "import { Component, Responsive } from 'modern-web';",
    details: [
      "High fidelity user interface design implementation.",
      "Pixel-perfect responsive layout engineering.",
      "State-management using Redux, Context API, or Zustand.",
      "Optimized DOM rendering and asset loading schedules."
    ],
    techStack: "React, Vue, TypeScript, Next.js, WebGL",
    deliverable: "dist/bundle.js"
  },
  {
    tabName: "backend_api.go",
    icon: <Database size={16} style={{ color: '#00ff9d' }} />,
    title: "Backend API Engineering",
    header: "package services // high-throughput microservices",
    details: [
      "RESTful, GraphQL, and gRPC endpoint construction.",
      "Scalable database clustering, indexing, and query tuning.",
      "Session handling, OAuth2, and security token policies.",
      "Distributed task queues and background worker systems."
    ],
    techStack: "Node.js, Go, PostgreSQL, Redis, GraphQL",
    deliverable: "build/server"
  },
  {
    tabName: "devops_infra.yaml",
    icon: <Cpu size={16} style={{ color: '#ffbd2e' }} />,
    title: "DevOps & Cloud Architecture",
    header: "version: '3.8' # robust cluster virtualization",
    details: [
      "CI/CD workflow orchestration using GitHub Actions.",
      "Docker containerization and Kubernetes cluster management.",
      "Cloud architecture configurations on AWS, GCP, and Vercel.",
      "Server monitoring, security hardening, and telemetry setup."
    ],
    techStack: "AWS, Docker, K8s, GitHub Actions, Linux",
    deliverable: ".github/workflows/deploy.yml"
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const currentService = SERVICES_DATA[activeTab];

  return (
    <section id="services">
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; services /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Solutions &amp; <span className="glow-text-cyan" style={{ color: 'var(--secondary-color)' }}>Architectures</span>
        </h3>
      </div>

      {/* VS Code styled services viewer */}
      <div className="glass vscode-container" style={{ border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '420px', overflow: 'hidden' }}>
        {/* Editor tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {SERVICES_DATA.map((service, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`tab-button ${activeTab === idx ? 'active-tab' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === idx ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                color: activeTab === idx ? 'var(--text-main)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative'
              }}
            >
              {service.icon}
              <span>{service.tabName}</span>
              {activeTab === idx && (
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--secondary-color)'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Editor Body */}
        <div style={{ flex: 1, padding: '30px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', background: 'rgba(0,0,0,0.1)' }} className="editor-body">
          {/* Code panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-mono)' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>// {currentService.title}</div>
              <div style={{ color: '#ff79c6', fontSize: '0.9rem' }}>{currentService.header}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentService.details.map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--primary-color)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-main)' }}>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata/Result panel */}
          <div className="glass" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>[SERVICE SPECIFICATION]</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#ff79c6' }}>const</span> techStack = [
                  <div style={{ paddingLeft: '16px', color: 'var(--secondary-color)' }}>"{currentService.techStack}"</div>
                  ];
                </div>
                <div>
                  <span style={{ color: '#ff79c6' }}>const</span> output = <span style={{ color: 'var(--primary-color)' }}>"{currentService.deliverable}"</span>;
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
            >
              <FileCode size={14} /> // init_project
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .tab-button:hover {
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-main);
        }
        .active-tab {
          background: var(--bg-card) !important;
          color: var(--text-main) !important;
        }
        @media (max-width: 800px) {
          .editor-body {
            grid-template-columns: 1fr !important;
            height: auto;
            gap: 20px;
          }
          .vscode-container {
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
