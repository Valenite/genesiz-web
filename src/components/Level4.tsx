import React, { useState, useEffect } from 'react';

// Cryptographic hash function for client-side validation
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function IcarusLogistics() {
  useEffect(() => {
    console.log("G-ALPHA: 1,1; 1,2; 1,3; 5,1; 5,2; 5,3");
  }, []);

  return (
    <div style={{ background: '#f4f4f4', color: '#111', fontFamily: 'sans-serif', minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ borderBottom: '4px solid #b30000', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>ICARUS LOGISTICS</span>
          <span style={{ fontSize: '0.4em', alignSelf: 'flex-end', color: '#777' }}>EST. 1992</span>
        </h1>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>"Moving the unmovable. Securing the unsecured."</p>
        <p>At Icarus, we specialize in deep-water salvage, high-risk freight, and classified transport.</p>
        <div style={{ marginTop: '40px', padding: '20px', background: '#e9ecef', borderLeft: '4px solid #b30000' }}>
          <h3>INVESTOR RELATIONS (Q3 REPORT)</h3>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            Despite the regulatory pressure, our medical transport division has seen record profits. 
            The board is pleased to announce a new partnership with a leading research facility. 
            Shipments of specialized biotech equipment will commence shortly. Our shareholders can expect 
            significant returns by Q4. We remain committed to our core values: discretion, speed, and 
            absolute security.
          </p>
          <div style={{ marginTop: '20px', fontFamily: 'monospace', fontSize: '0.85em', color: '#888' }}>
            <p>ROUTING DIRECTIVE [Protocol: Paragraph. Word. Letter.]</p>
            <p>[1-1-2] // [1-6-2] // [1-1-1] // [1-13-1] // [1-22-2] // [1-10-3] // [1-18-5] // [1-15-1] // [1-3-1] // [1-20-4] // [1-8-3] // [1-32-1] // [1-11-2]</p>
          </div>
        </div>
        <div style={{ marginTop: '60px', borderTop: '1px solid #ccc', paddingTop: '10px', fontSize: '0.7em', color: '#bbb', display: 'flex', justifyContent: 'space-between' }}>
          <span>ICARUS LOGISTICS INC. — ALL CARGO MANIFESTS CLASSIFIED</span>
          <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>DIRECTOR CLEARANCE: 22-1-12-5-14-9-20-5</span>
        </div>
      </div>
    </div>
  );
}

export function ChironMedical() {
  const [bio, setBio] = useState('');
  const [depth, setDepth] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("G-BETA: 3,1; 3,2; 3,4; 3,5");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('AUTHENTICATING...');
    setError(false);
    
    const combined = (bio.trim() + depth.trim()).toLowerCase().replace(/\s/g, '');
    const hash = await sha256(combined);
    
    setTimeout(() => {
      // hash of dsup10994
      if (hash === '182e8207c5044e22e816a56e24773b25ad85ee6a234469c7a6373470f5207040') {
        setStatus('ACCESS GRANTED. ROUTING...');
        setTimeout(() => {
          window.location.href = '/c5d909a55dd35e1f';
        }, 1000);
      } else {
        setError(true);
        setStatus('ACCESS DENIED. INVALID CREDENTIALS.');
      }
    }, 800);
  };

  return (
    <div style={{ background: '#000a0f', color: '#00ffcc', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '400px', background: '#00111a', padding: '40px', border: '1px solid #004466', borderRadius: '4px', boxShadow: '0 0 20px rgba(0,255,204,0.1)' }}>
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
  useEffect(() => {
    console.log("G-GAMMA: 2,3; 3,3; 4,3");
  }, []);

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
  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');
  const [gamma, setGamma] = useState('');
  const [status, setStatus] = useState('');
  const [gridUnlocked, setGridUnlocked] = useState(false);
  const [relicGuess, setRelicGuess] = useState('');
  const [relicStatus, setRelicStatus] = useState('');

  const parseCoords = (str: string) => {
    const matches = str.match(/\d/g);
    return matches ? matches.join('') : '';
  };

  const handleCalibrate = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('CALIBRATING GRID...');
    
    const aMatch = parseCoords(alpha) === '111213515253';
    const bMatch = parseCoords(beta) === '31323435';
    const gMatch = parseCoords(gamma) === '233343';

    setTimeout(() => {
      if (aMatch && bMatch && gMatch) {
        setStatus('GRID LOCK ESTABLISHED. RELIC VISUALIZED.');
        setGridUnlocked(true);
      } else {
        setStatus('CALIBRATION FAILED. INVALID GRID VECTORS.');
        setGridUnlocked(false);
      }
    }, 1000);
  };

  const handleRelicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRelicStatus('VERIFYING ENTITY...');
    const hash = await sha256(relicGuess.toLowerCase().trim());
    
    setTimeout(() => {
      // hash of "poseidon"
      if (hash === 'f9f66427da5cc2c77c7c049005f56baf213fae6ebc9afb96c26822e80bf5d2cf') {
        setRelicStatus('ENTITY CONFIRMED. DIVING DEEPER...');
        setTimeout(() => {
          window.location.href = '/poseidon';
        }, 1000);
      } else {
        setRelicStatus('ENTITY UNRECOGNIZED.');
      }
    }, 1000);
  };

  const isTrident = (x: number, y: number) => {
    const coords = ['1,1','1,2','1,3','5,1','5,2','5,3', '3,1','3,2','3,4','3,5', '2,3','3,3','4,3'];
    return coords.includes(x + ',' + y);
  };

  return (
    <div style={{ background: '#000508', color: '#00aaff', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      <h2 style={{ fontSize: '2.5em', letterSpacing: '8px', color: '#004466' }}>T A R T A R U S</h2>
      <div style={{ width: '80%', maxWidth: '800px', marginTop: '30px', background: '#00111a', border: '1px solid #004466', padding: '30px', borderRadius: '5px' }}>
        <p style={{ marginBottom: '20px', color: '#00ffaa' }}>ENTER CALIBRATION GRIDS TO VISUALIZE THE DEEP RELIC.</p>
        
        <form onSubmit={handleCalibrate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="GRID ALPHA [x,y; x,y; ...]" value={alpha} onChange={e => setAlpha(e.target.value)}
            style={{ background: '#000a0f', color: '#00aaff', border: '1px solid #004466', padding: '12px', outline: 'none' }} autoComplete="off" spellCheck="false"
          />
          <input 
            type="text" placeholder="GRID BETA [x,y; x,y; ...]" value={beta} onChange={e => setBeta(e.target.value)}
            style={{ background: '#000a0f', color: '#00aaff', border: '1px solid #004466', padding: '12px', outline: 'none' }} autoComplete="off" spellCheck="false"
          />
          <input 
            type="text" placeholder="GRID GAMMA [x,y; x,y; ...]" value={gamma} onChange={e => setGamma(e.target.value)}
            style={{ background: '#000a0f', color: '#00aaff', border: '1px solid #004466', padding: '12px', outline: 'none' }} autoComplete="off" spellCheck="false"
          />
          <button type="submit" style={{ background: '#004466', color: '#fff', border: 'none', padding: '15px', cursor: 'pointer', fontWeight: 'bold' }}>CALIBRATE</button>
        </form>
        
        <div style={{ marginTop: '15px', color: status.includes('FAILED') ? '#ff3333' : '#00ffaa', fontWeight: 'bold' }}>
          {status}
        </div>

        {gridUnlocked && (
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '4px', background: '#000508', padding: '10px', border: '1px solid #004466' }}>
              {Array.from({ length: 25 }).map((_, i) => {
                const x = (i % 5) + 1;
                const y = Math.floor(i / 5) + 1; // 1 to 5 from top to bottom
                const lit = isTrident(x, y);
                return (
                  <div key={i} style={{ width: '50px', height: '50px', background: lit ? '#00ffaa' : '#001a26', boxShadow: lit ? '0 0 10px #00ffaa' : 'none' }} />
                );
              })}
            </div>
            
            <p style={{ marginTop: '30px', color: '#ff3333', fontWeight: 'bold', letterSpacing: '2px' }}>PATTERN RECOGNIZED. IDENTIFY THE GREEK GOD WHO WIELDS THIS.</p>
            <form onSubmit={handleRelicSubmit} style={{ display: 'flex', width: '100%', maxWidth: '400px', marginTop: '15px' }}>
              <input 
                type="text" placeholder="ENTITY_NAME" value={relicGuess} onChange={e => setRelicGuess(e.target.value)}
                style={{ flex: 1, background: '#000a0f', color: '#00aaff', border: '1px solid #ff3333', padding: '12px', outline: 'none', textAlign: 'center' }} autoComplete="off" spellCheck="false"
              />
              <button type="submit" style={{ background: '#ff3333', color: '#fff', border: 'none', padding: '0 20px', cursor: 'pointer', fontWeight: 'bold' }}>VERIFY</button>
            </form>
            <div style={{ marginTop: '15px', color: relicStatus.includes('UNRECOGNIZED') ? '#ff3333' : '#00ffaa' }}>
              {relicStatus}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Poseidon() {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('VALIDATING OPERATION...');
    const combined = inputVal.toLowerCase().replace(/\s/g, '');
    const hash = await sha256(combined);
    
    setTimeout(() => {
      // hash of operationargus
      if (hash === '64f05a11cfd0f0226fba99b15c5c459ccde60c340d84406ea6bd11a845ccbd5f') {
        setStatus('OPERATION CONFIRMED. DECRYPTING MEMO...');
        setUnlocked(true);
        setTimeout(() => {
          window.location.href = '/operationargus';
        }, 12000);
      } else {
        setStatus('INVALID OPERATION DESIGNATION.');
      }
    }, 1000);
  };

  return (
    <div style={{ background: '#1a1a1a', color: '#e6e6e6', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0d0d0d', border: '2px solid #333', padding: '40px', width: '100%', maxWidth: '700px', textAlign: 'center' }}>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '15px' }}>AEGIS BLACKSITE CLEARANCE</h3>
        <p style={{ marginTop: '30px', fontSize: '1.1em', lineHeight: '1.6' }}>
          1958. Task Force 88.<br/>
          High-altitude nuclear detonations over the South Atlantic.<br/>
          Identify the operation.
        </p>
        {!unlocked && (
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
        )}
        <div style={{ marginTop: '20px', minHeight: '24px', color: status.includes('INVALID') ? '#ff4444' : '#88ff88' }}>
          {status}
        </div>

        {unlocked && (
          <div style={{ marginTop: '30px', background: '#000', border: '1px solid #88ff88', padding: '20px', textAlign: 'left', color: '#88ff88' }}>
            <h4 style={{ margin: '0 0 15px 0' }}>// FINAL VAULT SECURITY MEMO</h4>
            <p>Access to the Aegis Vault requires absolute identification. Two cryptographic keys must be generated.</p>
            <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
              <li><strong>USERNAME KEY:</strong> The callsign of the director who sealed this blacksite is embedded somewhere in the logistics terminal. Append an underscore. Append the base-2 representation of the decimal number 90.</li>
              <li><strong>PASSWORD KEY:</strong> The divine shield carried by Olympus, appended with an underscore, appended with the title held by a sovereign power that controls another nation which governs itself internally.</li>
            </ul>
            <p style={{ color: '#ff4444', marginTop: '20px' }}>MEMORIZE THESE REQUIREMENTS. SYSTEM WILL REDIRECT IN 10 SECONDS.</p>
          </div>
        )}
      </div>
    </div>
  );
}
