import { useEffect } from 'react';

// We no longer hardcode the secret paths here.
// Instead, if the user visits a path that doesn't match the main website,
// we send them to the secure edge function to check if it's a valid CipherQuest path.
export function isCipherQuestPath() {
  const p = window.location.pathname.replace(/\/$/, '');
  
  // These are public, safe paths that belong to the main React website
  const mainPaths = [
    '',
    '/', 
    '/brainbyte', 
    '/bb-scores', 
    '/bb2', 
    '/bb2-scores', 
    '/bb-admin2', 
    '/dialer', 
    '/66e37cc61d26d7e6'
  ];
  
  // If the path isn't one of the main ones, assume it's a hidden CipherQuest route
  if (p && !mainPaths.includes(p)) {
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
