import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Cpu, Lock, Globe, Upload } from 'lucide-react';

export default function ContactJarvis() {
  // 0: Welcome, 1: Enter Name, 2: Enter Email, 3: Enter Message, 4: Upload File, 5: Transmitting, 6: Done
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [cliHistory, setCliHistory] = useState([
    'J.A.R.V.I.S. Uplink Interface [v4.1.2]',
    'Status: SECURE CONNECTED',
    'Type "init" or press the button below to establish communication.'
  ]);

  const terminalEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() && step !== 4) return;

    const cmd = inputValue.trim();
    setInputValue('');

    if (step !== 4) {
      setCliHistory(prev => [...prev, `guest@jarvis:~$ ${cmd}`]);
    }

    // Jarvis Chat CLI State Machine
    if (step === 0) {
      if (cmd.toLowerCase() === 'init' || cmd.toLowerCase() === 'hello' || cmd.toLowerCase() === 'start') {
        setCliHistory(prev => [...prev, '>> ACCESS GRANTED. INITIALIZING SECURE UPLINK...', '>> Enter your name:']);
        setStep(1);
      } else {
        setCliHistory(prev => [...prev, `Command "${cmd}" not recognized. Try "init"`]);
      }
    } else if (step === 1) {
      setFormData(prev => ({ ...prev, name: cmd }));
      setCliHistory(prev => [...prev, `>> Name recorded: ${cmd}`, '>> Enter your email address:']);
      setStep(2);
    } else if (step === 2) {
      if (!cmd.includes('@')) {
        setCliHistory(prev => [...prev, '>> Invalid email. Retrying...', '>> Enter your email address:']);
      } else {
        setFormData(prev => ({ ...prev, email: cmd }));
        setCliHistory(prev => [...prev, `>> Email recorded: ${cmd}`, '>> Enter your message:']);
        setStep(3);
      }
    } else if (step === 3) {
      setFormData(prev => ({ ...prev, message: cmd }));
      setCliHistory(prev => [
        ...prev,
        `>> Message recorded: "${cmd.substring(0, 30)}..."`,
        '>> OPTIONAL: Attach technical payload (PDF/ZIP). Use the panel button or type "skip" to proceed.'
      ]);
      setStep(4);
    } else if (step === 4) {
      if (cmd.toLowerCase() === 'skip') {
        setCliHistory(prev => [...prev, 'guest@jarvis:~$ skip', '>> No payload attached. Ready for routing.', '>> Execute command "send" to transmit payload.']);
        setStep(5);
      } else if (cmd.toLowerCase() === 'send') {
        executeTransmission();
      } else {
        setCliHistory(prev => [...prev, '>> Awaiting action. Upload file via interface, type "skip", or type "send" to confirm transmission.']);
      }
    } else if (step === 5) {
      if (cmd.toLowerCase() === 'send') {
        executeTransmission();
      } else {
        setCliHistory(prev => [...prev, '>> Awaiting transmission approval. Type "send" to confirm.']);
      }
    }
  };

  const initButtonTrigger = () => {
    if (step === 0) {
      setCliHistory(prev => [...prev, 'guest@jarvis:~$ init', '>> ACCESS GRANTED. INITIALIZING SECURE UPLINK...', '>> Enter your name:']);
      setStep(1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional validations
    const allowedExtensions = /(\.pdf|\.zip)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setCliHistory(prev => [...prev, '>> ERROR: Core security restriction. Only .PDF and .ZIP matrices are permitted.']);
      return;
    }

    setSelectedFile(file);
    setCliHistory(prev => [
      ...prev,
      `>> PAYLOAD DETECTED: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      '>> STAGING COMPLETED.',
      '>> Execute command "send" or press the button below to transmit payload.'
    ]);
    setStep(5);
  };

  const executeTransmission = async (isSkip = false) => {
    setStep(6);
    setCliHistory(prev => [
      ...prev,
      isSkip ? 'guest@jarvis:~$ skip' : 'guest@jarvis:~$ send',
      '>> ESTABLISHING SECURE PROTOCOL...',
      '>> ENCRYPTING METADATA (AES-256)...',
      selectedFile ? `>> CONVERTING UPLOAD STREAM: ${selectedFile.name}...` : '>> PACKAGING DATA STRIP...',
      '>> ROUTING PACKETS THROUGH EDGE GATEWAYS...',
    ]);

    try {
      const targetEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

      // Construct URL parameters manually to accommodate Apps Script constraints
      let urlParams = `name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&message=${encodeURIComponent(formData.message)}`;

      // If a file exists, convert it to Base64 first
      if (selectedFile) {
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Extract only the raw base64 string data component
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
          reader.onerror = error => reject(error);
          reader.readAsDataURL(selectedFile);
        });

        urlParams += `&fileData=${encodeURIComponent(base64Data)}`;
        urlParams += `&filename=${encodeURIComponent(selectedFile.name)}`;
        urlParams += `&mimeType=${encodeURIComponent(selectedFile.type)}`;
      }

      const response = await fetch(targetEndpoint, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlParams,
      });

      if (response.ok || response.status === 0) {
        setCliHistory(prev => [
          ...prev,
          '>> TRANSMISSION SUCCESSFUL.',
          '>> J.A.R.V.I.S.: Thank you! Details and secure links successfully logged to database core.',
          '>> Uplink terminated.'
        ]);
      } else {
        throw new Error('Network failure response code');
      }
    } catch (error) {
      setCliHistory(prev => [
        ...prev,
        '>> CRITICAL REJECTION: Uplink broken during packet injection.',
        '>> SYSTEM LOG: ' + error.message
      ]);
    }
    setStep(7);
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      {/* Hidden native input for React file staging */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.zip"
        style={{ display: 'none' }}
      />

      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          &lt; interface /&gt;
        </h2>
        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginTop: '10px' }}>
          Uplink <span className="glow-text" style={{ color: 'var(--primary-color)' }}>Console</span>
        </h3>
      </div>

      <div className="grid-2">
        {/* Radar Panel Component */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '320px' }} className="hud-panel">
          <div className="radar-ring outer-ring" style={{ border: '1px dashed var(--primary-color)', width: '260px', height: '260px', borderRadius: '50%', position: 'absolute', opacity: 0.3 }} />
          <div className="radar-ring mid-ring" style={{ border: '1px solid var(--secondary-color)', borderLeftColor: 'transparent', borderWidth: '1px', width: '200px', height: '200px', borderRadius: '50%', position: 'absolute', opacity: 0.5 }} />
          <div className="radar-ring inner-ring" style={{ border: '1px dashed var(--primary-color)', width: '130px', height: '130px', borderRadius: '50%', position: 'absolute', opacity: 0.6 }} />

          <div className="radar-core" style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, animation: 'pulse 2s infinite'
          }}>
            <Cpu size={20} style={{ color: 'var(--bg-dark)' }} />
          </div>

          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
            <span style={{ color: 'var(--primary-color)' }}><Lock size={10} style={{ marginRight: '4px' }} /> ENCRYPT: ACTIVE</span>
            <span>PING: 14ms</span>
          </div>

          <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
            <span style={{ color: 'var(--secondary-color)' }}><Globe size={10} style={{ marginRight: '4px' }} /> NODE: SG-EDGE-09</span>
            <span>SYS_LOAD: 2.14%</span>
          </div>
        </div>

        {/* Console CLI Terminal */}
        <div className="glass" style={{ border: '1px solid var(--border-color)', height: '360px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)', padding: '10px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem'
          }}>
            <Terminal size={14} style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-main)' }}>secure_uplink_session.sh</span>
          </div>

          <div style={{
            flex: 1, padding: '20px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            display: 'flex', flexDirection: 'column', gap: '6px', background: '#040508'
          }}>
            {cliHistory.map((text, idx) => (
              <div key={idx} style={{
                color: text.startsWith('guest@jarvis') ? 'var(--secondary-color)' : text.startsWith('>>') ? 'var(--primary-color)' : '#a0aec0',
                wordBreak: 'break-all'
              }}>
                {text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive footer actions map */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0, 0, 0, 0.2)' }}>
            {step === 0 ? (
              <button onClick={initButtonTrigger} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px' }}>
                &lt; Initialize Jarvis Uplink /&gt;
              </button>
            ) : step === 4 ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', gap: '8px', display: 'flex', alignItems: 'center', border: '1px solid var(--primary-color)', padding: '8px', color: '#fff', cursor: 'pointer', background: 'transparent' }}
                >
                  <Upload size={14} /> STAGE FILE (PDF/ZIP)
                </button>
                <button
                  onClick={() => executeTransmission(true)}
                  className="btn"
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px 16px', color: '#ccc', cursor: 'pointer' }}
                >
                  SKIP
                </button>
              </div>
            ) : step === 5 ? (
              <button onClick={executeTransmission} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px', background: 'var(--primary-color)', color: '#000', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                <Send size={14} /> TRANSMIT PAYLOAD NOW
              </button>
            ) : step === 6 ? (
              <div style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center' }}>
                TRANSMITTING BYTES DETECTED...
              </div>
            ) : (
              <button
                onClick={() => {
                  setStep(0);
                  setFormData({ name: '', email: '', message: '' });
                  setSelectedFile(null);
                  setCliHistory([
                    'J.A.R.V.I.S. Uplink Interface [v4.1.2]',
                    'Status: SECURE CONNECTED',
                    'Type "init" or press the button below to establish communication.'
                  ]);
                }}
                className="btn"
                style={{ width: '100%', justifyContent: 'center', padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#777', border: 'none', cursor: 'pointer' }}
              >
                // clear_session.sh (Reset)
              </button>
            )}

            {/* Render input CLI for textual entry stages */}
            {[1, 2, 3].includes(step) && (
              <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center' }}>&gt;</span>
                <input
                  type={step === 2 ? "email" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    step === 1 ? "Enter your name..." :
                      step === 2 ? "Enter your email..." :
                        "Enter your message..."
                  }
                  autoFocus
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem'
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .outer-ring { animation: spin 30s linear infinite; top: 30px; }
        .mid-ring { animation: spinReverse 20s linear infinite; top: 60px; }
        .inner-ring { animation: spin 10s linear infinite; top: 95px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
      `}</style>
    </section>
  );
}