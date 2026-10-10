import { useEffect } from 'react';

// We no longer hardcode the secret paths here.
// Instead, if the user visits a path that doesn't match the main website,
// we send them to the secure edge function to check if it's a valid CipherQuest path.
export function isCipherQuestPath(pHash: number) {
  const p = window.location.pathname.replace(/\/$/, '');
  
  // Public routes stored as hashes to prevent extraction
  const mainHashes = [
    5381,         // ''
    177620,       // '/'
    3897530548,   // '/brainbyte'
    2549185908,   // '/bb-scores'
    2088272650,   // '/bb2'
    1266003046,   // '/bb2-scores'
    1845853312,   // '/bb-admin2'
    379042373,    // '/dialer'
    2655396702    // '/66e37cc61d26d7e6'
  ];
  
  if (p && !mainHashes.includes(pHash)) {
    return true;
  }
  
  return false;
}

export function CipherQuestPage() {
  const p = window.location.pathname.replace(/\/$/, '');
  
  useEffect(() => {
    // Redirect immediately to the server-side edge function
    // The browser bundle NO LONGER CONTAINS ANY PUZZLE DATA OR ROUTE NAMES!
    window.location.replace('/api/cipher?path=' + p);
  }, [p]);

  return (
    <div style={{
      background: '#050505', 
      color: '#00ff41', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'monospace',
      letterSpacing: '4px'
    }}>
      INITIALIZING SECURE PROTOCOL...
    </div>
  );
}
