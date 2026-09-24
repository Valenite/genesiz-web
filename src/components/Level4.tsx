import React, { useState } from 'react';

export function IcarusLogistics() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, backgroundColor: '#f4f4f9', color: '#333', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#002244', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2.5em', letterSpacing: '2px' }}>ICARUS LOGISTICS</h1>
        <p style={{ margin: '5px 0 0 0', fontStyle: 'italic' }}>We deliver where others cannot.</p>
      </header>
      <nav style={{ backgroundColor: '#003366', padding: '10px', textAlign: 'center' }}>
        <a href="#" style={{ color: 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
        <a href="#" style={{ color: 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>About Us</a>
        <a href="#" style={{ color: 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>Investors</a>
        <a href="#" style={{ color: 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>Contact</a>
      </nav>
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', background: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Corporate History</h2>
        <p>Icarus Logistics was founded on the principle of unparalleled global reach. We deliver where others cannot. Our specialized fleets are equipped for extreme environments, ensuring your assets remain completely secure.</p>
        <p>Innovation drives our core infrastructure. By acquiring cutting edge subsidiaries, we maintain a technological monopoly over the transport sector. The future is built on highly encrypted, decentralized logistics networks.</p>
        <p>Security is our absolute highest priority. We employ advanced cryptographic protocols and ex-military personnel. When you entrust us with your cargo, it disappears from the public grid until it reaches its final destination.</p>
        <hr style={{ margin: '40px 0' }} />
        <h2>Investor Relations</h2>
        <p>Following our successful Series C funding round, we are proud to announce the silent acquisition of a leading bio-research firm. This allows us to transport Class-4 biological assets with unprecedented stability.</p>
        
        <div style={{ backgroundColor: '#eef', padding: '15px', borderLeft: '4px solid #002244', marginTop: '30px' }}>
          <p><strong>ENCRYPTED ROUTING DIRECTIVE (INTERNAL USE ONLY):</strong></p>
          <p style={{ fontFamily: 'monospace', letterSpacing: '1px', wordBreak: 'break-all' }}>
            [1-1-2] // [1-6-2] // [1-1-1] // [1-1-4] // [1-2-2] // [1-4-4] // [1-23-6] // [1-4-6] // [1-4-5] // [1-1-1] // [1-1-2] // [1-1-3] // [1-2-1]
          </p>
          <p style={{ fontSize: '0.8em', color: '#666' }}>Protocol: Paragraph. Word. Letter.</p>
        </div>
      </div>
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#002244', color: 'white', marginTop: '40px' }}>
        &copy; 2026 Icarus Logistics Corp. All rights reserved.
      </footer>
    </div>
  );
}

// Helper to perform SHA-256 hash without pulling in heavy external crypto libs
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function ChironMedical() {
  const [bio, setBio] = useState('');
  const [depth, setDepth] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('AUTHENTICATING...');
    setError(false);
    
    // dsup10994
    const combined = (bio.trim() + depth.trim()).toLowerCase().replace(/\s/g, '');
    const hash = await sha256(combined);
    
    setTimeout(() => {
      // The hash of "dsup10994"
      if (hash === 'b3e401b44ecb94a8f95c024d08a54d683709b119101ff6c927f1ce6bc1363403') {
        setStatus('ACCESS GRANTED. ROUTING...');
        setTimeout(() => {
          // Navigates to the hidden route
          window.location.href = '/c5d909a55dd35e1f';
        }, 1000);
      } else {
        setError(true);
        setStatus('ACCESS DENIED. INVALID CREDENTIALS.');
      }
    }, 1200);
  };

  return (
    <div style={{ background: '#051014', color: '#00ffcc', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ border: '1px solid #00ffcc', padding: '40px', maxWidth: '600px', width: '90%', background: 'rgba(0, 255, 204, 0.05)', boxShadow: '0 0 20px rgba(0, 255, 204, 0.2)' }}>
        <h2 style={{ letterSpacing: '3px', borderBottom: '1px solid #00ffcc', paddingBottom: '10px', textAlign: 'center' }}>CHIRON MEDICAL - SECURE TERMINAL</h2>
        <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
          Authentication Protocol:<br/>
          1. Biometric resilience marker (radiation).<br/>
          2. Maximum oceanic depth (2010 UNH-CCOM / meters).
        </p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          <input 
            type="text" 
            placeholder="Marker" 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ background: '#001a22', color: '#00ffcc', border: '1px solid #00ffcc', padding: '12px', outline: 'none' }} 
            autoComplete="off"
            spellCheck="false"
          />
          <input 
            type="password" 
            placeholder="Depth" 
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            style={{ background: '#001a22', color: '#00ffcc', border: '1px solid #00ffcc', padding: '12px', outline: 'none' }} 
            autoComplete="off"
          />
          <button type="submit" style={{ background: '#00ffcc', color: '#000', padding: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none', letterSpacing: '2px', marginTop: '10px' }}>
            INITIATE LOGIN
          </button>
        </form>
        <div style={{ marginTop: '20px', minHeight: '24px', fontWeight: 'bold', color: error ? '#ff3333' : '#00ffcc', textAlign: 'center' }}>
          {status}
        </div>
      </div>
    </div>
  );
}

export function ChironDatabase() {
  return (
    <div style={{ background: '#0a0a0a', color: '#00ffcc', fontFamily: 'monospace', minHeight: '100vh', padding: '40px' }}>
      <h2 style={{ letterSpacing: '2px', color: '#fff' }}>[ CHIRON DATABASE - ACCESS GRANTED ]</h2>
      <br/>
      <div style={{ borderLeft: '3px solid #00ffcc', paddingLeft: '15px', margin: '20px 0' }}>
        <strong>Log Entry 002:</strong> ...Active key: The ferryman of the river Styx.<br/><br/>
        <strong>Log Entry 004:</strong> ...Multi-layer encryption detected: 16-symbol outer shell, 64-symbol transport layer, Styx cipher core.
      </div>
      <br/>
      <div style={{ background: '#111', padding: '20px', wordBreak: 'break-all', color: '#ccc', border: '1px solid #333' }}>
        51317054566b6767525564545431525052307457546942555130464955464a4555314575494652575655745851556b675155386753315a5349456c5a52565a5a49453545526c4e4b4c694249565563675331564656564a5256534250567942495655636751556c4c5430465649456858556c64485653343d
      </div>
      
      <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ color: '#555', fontSize: '0.8em', marginBottom: '10px' }}>[ AUDIO STREAM ]</p>
        <audio controls style={{ filter: 'sepia(100%) hue-rotate(130deg) saturate(300%)' }}>
          <source src="/a9f8b7c6d5e4f3.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
}

export function Tartarus() {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('');

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PINGING DEEP SEA COORDINATES...');
    const combined = inputVal.toLowerCase().replace(/\s/g, '');
    const hash = await sha256(combined);
    
    setTimeout(() => {
      // hash of clementine6895baronblood
      if (hash === '5e2373c4f923dcbc8476d33306db7c2fb24818c3973950cfb63dc4f89fbff249') {
        setStatus('ECHO RECEIVED. DIVING DEEPER...');
        setTimeout(() => {
          window.location.href = '/clementine6895baronblood';
        }, 1000);
      } else {
        setStatus('NO ECHO. DEAD WATER.');
      }
    }, 1500);
  };

  return (
    <div style={{ background: '#000508', color: '#00aaff', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      <h2 style={{ fontSize: '2.5em', letterSpacing: '8px', color: '#004466' }}>T A R T A R U S</h2>
      <div style={{ width: '80%', maxWidth: '800px', marginTop: '30px', background: '#00111a', border: '1px solid #004466', padding: '30px', borderRadius: '5px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#ff3333' }}>[TARGET 1]</span> Project Azorian. The capture vehicle. Lockheed's nickname for the claw.
        </div>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#ff3333' }}>[TARGET 2]</span> Battle off Samar. The deepest shipwreck discovered in 2022. The exact depth in meters.
        </div>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#ff3333' }}>[TARGET 3]</span> Kola Superdeep Borehole hoax. The 1972 cinematic source of the screaming souls.
        </div>
        
        <form onSubmit={handlePing} style={{ display: 'flex', marginTop: '40px' }}>
          <input 
            type="text" 
            placeholder="CONCATENATE_TARGETS" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{ flex: 1, background: '#000a0f', color: '#00aaff', border: '1px solid #004466', padding: '12px', outline: 'none' }} 
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" style={{ background: '#004466', color: '#fff', border: 'none', padding: '0 20px', cursor: 'pointer', fontWeight: 'bold' }}>PING</button>
        </form>
        <div style={{ marginTop: '15px', color: status.includes('DEAD') ? '#ff3333' : '#00ffaa' }}>
          {status}
        </div>
      </div>
    </div>
  );
}

export function Clementine() {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('VALIDATING OPERATION...');
    const combined = inputVal.toLowerCase().replace(/\s/g, '');
    const hash = await sha256(combined);
    
    setTimeout(() => {
      // hash of operationargus
      if (hash === '5e6cbf4d8122c222ff47e09ef961e6c46ddddbd6b8c8d8c2d58fb4cd35b88c3a') {
        setStatus('OPERATION CONFIRMED. ACCESSING TERMINAL...');
        setTimeout(() => {
          window.location.href = '/operationargus';
        }, 1000);
      } else {
        setStatus('INVALID OPERATION DESIGNATION.');
      }
    }, 1000);
  };

  return (
    <div style={{ background: '#1a1a1a', color: '#e6e6e6', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#0d0d0d', border: '2px solid #333', padding: '40px', width: '90%', maxWidth: '600px', textAlign: 'center' }}>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>AEGIS BLACKSITE CLEARANCE</h3>
        <p style={{ marginTop: '30px', fontSize: '1.1em', lineHeight: '1.6' }}>
          1958. Task Force 88.<br/>
          High-altitude nuclear detonations over the South Atlantic.<br/>
          Identify the operation.
        </p>
        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
          <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{ width: '100%', background: '#000', color: '#e6e6e6', border: '1px solid #444', padding: '12px', boxSizing: 'border-box', outline: 'none', textAlign: 'center' }} 
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div style={{ marginTop: '20px', minHeight: '24px', color: status.includes('INVALID') ? '#ff4444' : '#88ff88' }}>
          {status}
        </div>
      </div>
    </div>
  );
}
