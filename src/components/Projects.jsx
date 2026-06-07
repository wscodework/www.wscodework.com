import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Code, Images, X, FolderOpen } from 'lucide-react';

// ─── Auto-discover images from gallery folders ──────────────────────────────
const rawIms      = import.meta.glob('../assets/gallery/ims/*',      { eager: true });
const rawEcogreen = import.meta.glob('../assets/gallery/ecogreen/*', { eager: true });
const rawCv       = import.meta.glob('../assets/gallery/cv/*',       { eager: true });

const toImgList = (raw) =>
  Object.entries(raw).map(([path, mod]) => ({
    src: mod.default,
    title: path.split('/').pop().replace(/[-_]/g, ' ').replace(/\.\w+$/, ''),
  }));

const GALLERY_IMAGES = {
  ims:      toImgList(rawIms),
  ecogreen: toImgList(rawEcogreen),
  cv:       toImgList(rawCv),
};

// ─── Project Data ────────────────────────────────────────────────────────────
const PROJECTS_DATA = [
  {
    id: 'ims',
    title: 'IMS',
    subtitle: 'Inventory Management System',
    tech: ['React', 'Node.js', 'Supabase', 'JWT', 'Chart.js'],
    description: 'A full-stack inventory management platform with real-time stock tracking, role-based access control, analytics dashboards, and automated low-stock alerts.',
    codeSnippet: `// IMS – Real-time Stock Controller
const StockController = () => {
  const [items] = useInventory();
  const alerts  = useLowStockAlerts(items);
  return (
    <Dashboard>
      <StockTable data={items} />
      <AnalyticsChart metrics={items} />
      <AlertPanel alerts={alerts} />
    </Dashboard>
  );
};`,
    folderHint: 'src/assets/gallery/ims/',
  },
  {
    id: 'ecogreen',
    title: 'EcoGreen',
    subtitle: 'Sustainability Web Platform',
    tech: ['Next.js', 'TailwindCSS', 'Strapi CMS', 'PostgreSQL'],
    description: 'A modern eco-focused company website with a CMS-driven blog, project showcase, donation integration, and interactive carbon-footprint calculator.',
    codeSnippet: `// EcoGreen – Carbon Calculator
const CarbonCalc = ({ userData }) => {
  const footprint = calcFootprint(userData);
  return (
    <EcoPage>
      <HeroSection theme="green" />
      <FootprintMeter value={footprint} />
      <TipsCarousel tips={ecoTips} />
    </EcoPage>
  );
};`,
    folderHint: 'src/assets/gallery/ecogreen/',
  },
  {
    id: 'cv',
    title: 'CV Analyzer',
    subtitle: 'AI-Powered Resume Parser',
    tech: ['Python', 'FastAPI', 'React', 'OpenAI', 'PostgreSQL'],
    description: 'An intelligent CV parsing and scoring tool that extracts skills, experience, and education from uploaded resumes and ranks candidates against job descriptions.',
    codeSnippet: `// CV Analyzer – Resume Scorer
const ResumeScorer = ({ file }) => {
  const parsed = useParser(file);
  const score  = useAIScore(parsed);
  return (
    <AnalyzerUI>
      <UploadZone onFile={setFile} />
      <ParsedProfile data={parsed} />
      <ScoreGauge value={score} />
    </AnalyzerUI>
  );
};`,
    folderHint: 'src/assets/gallery/cv/',
  },
];

// ─── Gallery Modal (via portal – never clipped by card overflow) ─────────────
function GalleryModal({ project, images, onClose }) {
  const [previewIdx, setPreviewIdx] = useState(null);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setPreviewIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setPreviewIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return createPortal(
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
      }}
    >
      <div
        className="glass gallery-modal"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '18px',
          border: '1px solid rgba(0,240,255,0.18)',
          background: 'rgba(8,12,24,0.97)',
          padding: '32px',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-color)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
              &lt; gallery /&gt;
            </p>
            <h3 style={{ fontSize: '1.7rem', fontWeight: '800', lineHeight: 1.2 }}>
              {project.title}{' '}
              <span style={{ color: 'var(--secondary-color)' }}>{project.subtitle}</span>
            </h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
              <FolderOpen size={13} style={{ color: '#ffbd2e' }} />
              <code style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {project.folderHint}
              </code>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; e.currentTarget.style.color = '#ff5f56'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Image grid */}
        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', border: '2px dashed rgba(255,255,255,0.07)', borderRadius: '14px' }}>
            <Images size={44} style={{ opacity: 0.25, display: 'block', margin: '0 auto 16px' }} />
            <p style={{ marginBottom: '8px' }}>No images yet</p>
            <p style={{ fontSize: '0.78rem', opacity: 0.6 }}>
              Drop images into <code style={{ color: 'var(--primary-color)' }}>{project.folderHint}</code> and save
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewIdx(idx)}
                className="gallery-img-card"
                style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.25s', cursor: 'pointer' }}
              >
                <div style={{ height: '170px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                  />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'capitalize' }}>
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Preview Overlay */}
      {previewIdx !== null && images[previewIdx] && (
        <div
          onClick={() => setPreviewIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '24px',
            animation: 'fadeInLightbox 0.3s ease-out forwards',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setPreviewIdx(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              zIndex: 10002,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.2)'; e.currentTarget.style.color = '#ff5f56'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
          >
            <X size={22} />
          </button>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  zIndex: 10001,
                  transition: 'all 0.25s ease',
                  fontSize: '1.25rem',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  zIndex: 10001,
                  transition: 'all 0.25s ease',
                  fontSize: '1.25rem',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                &rarr;
              </button>
            </>
          )}

          {/* Image Containment Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '85vw',
              maxHeight: '75vh',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.2)',
              overflow: 'hidden',
              background: '#040508',
              animation: 'zoomInLightbox 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}
          >
            <img
              key={previewIdx}
              src={images[previewIdx].src}
              alt={images[previewIdx].title}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                animation: 'slideFadeInImg 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            />
          </div>

          {/* Metadata Display */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', textTransform: 'capitalize', margin: '0 0 5px 0', letterSpacing: '1px' }}>
              {images[previewIdx].title}
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary-color)' }}>
              Image {previewIdx + 1} of {images.length}
            </span>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

// ─── Main Projects Component ─────────────────────────────────────────────────
export default function Projects() {
  const [compiledProjects, setCompiledProjects] = useState({});
  const [typingText, setTypingText]             = useState({});
  const [compilingState, setCompilingState]     = useState({});
  const [activeGallery, setActiveGallery]       = useState(null);
  const sectionRef = useRef(null);
  const timersRef = useRef({});

  useEffect(() => {
    let timeouts = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          PROJECTS_DATA.forEach((project, index) => {
            const t = setTimeout(() => triggerCompilation(project), index * 1300);
            timeouts.push(t);
          });
        } else {
          // Cancel pending trigger timeouts
          timeouts.forEach(clearTimeout);
          timeouts = [];
          // Reset project states and clear active intervals/timeouts
          PROJECTS_DATA.forEach((project) => {
            if (timersRef.current[project.id]) {
              clearInterval(timersRef.current[project.id].interval);
              clearTimeout(timersRef.current[project.id].timeout);
            }
            setCompiledProjects(prev => ({ ...prev, [project.id]: false }));
            setCompilingState(prev => ({ ...prev, [project.id]: 'idle' }));
            setTypingText(prev => ({ ...prev, [project.id]: '' }));
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
      PROJECTS_DATA.forEach((project) => {
        if (timersRef.current[project.id]) {
          clearInterval(timersRef.current[project.id].interval);
          clearTimeout(timersRef.current[project.id].timeout);
        }
      });
    };
  }, []);

  const triggerCompilation = (project) => {
    if (timersRef.current[project.id]) {
      clearInterval(timersRef.current[project.id].interval);
      clearTimeout(timersRef.current[project.id].timeout);
    }

    const fullCode = project.codeSnippet;
    let currentLength = 0;
    setCompiledProjects(prev => ({ ...prev, [project.id]: false }));
    setCompilingState(prev =>   ({ ...prev, [project.id]: 'typing' }));

    const interval = setInterval(() => {
      currentLength += 4;
      if (currentLength >= fullCode.length) {
        clearInterval(interval);
        setTypingText(prev =>     ({ ...prev, [project.id]: fullCode }));
        setCompilingState(prev => ({ ...prev, [project.id]: 'compiling' }));
        const timeout = setTimeout(() => {
          setCompilingState(prev => ({ ...prev, [project.id]: 'done' }));
          setCompiledProjects(prev => ({ ...prev, [project.id]: true }));
        }, 1200);
        timersRef.current[project.id] = { ...timersRef.current[project.id], timeout };
      } else {
        setTypingText(prev => ({ ...prev, [project.id]: fullCode.substring(0, currentLength) }));
      }
    }, 18);

    timersRef.current[project.id] = { interval };
  };

  const activeProject = PROJECTS_DATA.find(p => p.id === activeGallery);

  return (
    <section id="projects" ref={sectionRef}>
      {/* Section header */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; portfolio /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Featured{' '}
          <span className="glow-text-cyan" style={{ color: 'var(--secondary-color)' }}>Projects</span>
        </h3>
      </div>

      {/* Cards */}
      <div className="grid-3">
        {PROJECTS_DATA.map((project) => {
          const isCompiled   = compiledProjects[project.id];
          const state        = compilingState[project.id] || 'idle';
          const typedSnippet = typingText[project.id] || '';
          const imgs         = GALLERY_IMAGES[project.id] || [];
          const imgCount     = imgs.length;
          const previewSrc   = imgs[0]?.src;

          return (
            <div
              key={project.id}
              className="glass project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.4s ease',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(10,14,24,0.4)',
              }}
            >
              {/* ── macOS-style window bar ── */}
              <div style={{ background: 'rgba(0,0,0,0.35)', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {isCompiled ? `${project.id}_system.exe` : 'compiler.bin'}
                </div>
              </div>

              {/* ── Banner thumbnail (always shown) ── */}
              {previewSrc && (
                <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                  <img
                    src={previewSrc}
                    alt={`${project.title} preview`}
                    className="card-thumb"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  />
                </div>
              )}

              {/* ── Card body ── */}
              <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {!isCompiled ? (
                  /* Compile animation */
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
                    <pre style={{ fontSize: '0.78rem', color: 'var(--secondary-color)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: '1.5', flex: 1 }}>
                      {typedSnippet}
                      <span className="cursor-blink">|</span>
                    </pre>
                    {state === 'compiling' && (
                      <div style={{ marginTop: '12px', background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.15)', padding: '10px', borderRadius: '6px' }}>
                        <div style={{ fontSize: '0.73rem', color: 'var(--primary-color)', display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>[BUILD] compiling bundle…</span><span>100%</span>
                        </div>
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div className="progress-bar-fill" style={{ height: '100%', background: 'var(--primary-color)' }} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Compiled product card */
                  <div className="morphed-card-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.6s ease forwards' }}>
                    {/* Tech badges */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {project.tech.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', background: 'rgba(0,240,255,0.08)', color: 'var(--secondary-color)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0,240,255,0.12)' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '4px' }}>{project.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--secondary-color)', fontFamily: 'var(--font-mono)', marginBottom: '10px', opacity: 0.8 }}>
                      {project.subtitle}
                    </p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', flex: 1, lineHeight: 1.6 }}>
                      {project.description}
                    </p>

                    {/* Gallery button */}
                    <div style={{ marginTop: '18px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                      <button
                        onClick={() => setActiveGallery(project.id)}
                        className="gallery-btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '0.83rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-color)', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '7px', padding: '8px 16px', cursor: 'pointer', transition: 'all 0.25s' }}
                      >
                        <Images size={15} />
                        Gallery
                        {imgCount > 0 && (
                          <span style={{ background: 'var(--primary-color)', color: '#000', fontSize: '0.66rem', fontWeight: '800', borderRadius: '10px', padding: '1px 6px', lineHeight: 1.4 }}>
                            {imgCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Re-compile trigger */}
              {isCompiled && (
                <button
                  onClick={() => triggerCompilation(project)}
                  title="Recompile"
                  className="re-trigger-btn"
                  style={{ position: 'absolute', top: '9px', right: '14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                >
                  <Code size={15} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Gallery modal portal */}
      {activeGallery && activeProject && (
        <GalleryModal
          project={activeProject}
          images={GALLERY_IMAGES[activeGallery] || []}
          onClose={() => setActiveGallery(null)}
        />
      )}

      <style>{`
        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0,240,255,0.3) !important;
          box-shadow: 0 16px 48px -12px rgba(0,240,255,0.18);
        }
        .project-card:hover .card-thumb { transform: scale(1.06); }
        .gallery-btn:hover {
          background: rgba(0,255,157,0.16) !important;
          box-shadow: 0 0 20px rgba(0,255,157,0.2);
          color: #fff !important;
        }
        .gallery-img-card:hover {
          border-color: rgba(0,240,255,0.25) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .gallery-img-card:hover img { transform: scale(1.08); }
        .re-trigger-btn:hover { color: var(--primary-color) !important; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes zoomInLightbox {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes slideFadeInImg {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .progress-bar-fill {
          width: 0;
          animation: progressRun 1s ease-in-out forwards;
        }
        @keyframes progressRun {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .gallery-modal::-webkit-scrollbar { width: 6px; }
        .gallery-modal::-webkit-scrollbar-track { background: transparent; }
        .gallery-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </section>
  );
}
