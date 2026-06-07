import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Roadmap from './components/Roadmap';
import ContactJarvis from './components/ContactJarvis';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      {/* Background Matrix/Coder Grid Lines effect */}
      <div className="bg-grid-overlay" />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Roadmap />
      <ContactJarvis />
      <Footer />

      <style>{`
        .app-container {
          position: relative;
          min-height: 100vh;
        }

        /* Subtle grid pattern background */
        .bg-grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          pointer-events: none;
          z-index: -1;
        }

        /* Ambient glowing background blobs */
        .app-container::before {
          content: '';
          position: fixed;
          top: 10%;
          left: 10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 255, 157, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: -2;
        }

        .app-container::after {
          content: '';
          position: fixed;
          bottom: 10%;
          right: 10%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: -2;
        }
      `}</style>
    </div>
  );
}

export default App;
