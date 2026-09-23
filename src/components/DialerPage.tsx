import { useState } from 'react';

export function DialerPage() {
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const handleDigit = (digit: string) => {
    if (!isCalling) {
      setNumber(prev => prev + digit);
      setStatus('');
    }
  };

  const handleClear = () => {
    if (!isCalling) {
      setNumber(prev => prev.slice(0, -1));
      setStatus('');
    }
  };

  const handleCall = async () => {
    if (!number || isCalling) return;
    
    setIsCalling(true);
    setStatus('CALLING...');
    
    try {
      const res = await fetch('/api/dialer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number })
      });
      
      if (res.ok) {
        setStatus('CONNECTED');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play().catch(e => console.error("Audio playback failed:", e));
        audio.onended = () => {
          setIsCalling(false);
          setStatus('');
        };
      } else {
        setStatus('NUMBER NOT IN SERVICE');
        setIsCalling(false);
      }
    } catch (err) {
      setStatus('NUMBER NOT IN SERVICE');
      setIsCalling(false);
    }
  };

  const padStyle = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-full text-2xl font-bold text-zinc-300 hover:bg-zinc-800 transition-colors active:scale-95";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-sm w-full">
        
        {/* Display */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl h-24 mb-8 flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div className="text-3xl tracking-widest font-black text-zinc-100 mb-1 z-10">{number || ' '}</div>
          <div className={`text-xs font-bold tracking-widest z-10 ${status === 'CONNECTED' ? 'text-emerald-400' : 'text-rose-500'}`}>
            {status}
          </div>
          {/* Subtle CRT scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/10 pointer-events-none"></div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 justify-items-center mb-8">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit => (
            <button key={digit} onClick={() => handleDigit(digit)} className={padStyle}>
              {digit}
            </button>
          ))}
          <button onClick={() => handleDigit('*')} className={padStyle}>*</button>
          <button onClick={() => handleDigit('0')} className={padStyle}>0</button>
          <button onClick={() => handleDigit('#')} className={padStyle}>#</button>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button 
            onClick={handleClear} 
            disabled={isCalling}
            className="flex-1 py-4 rounded-xl font-bold tracking-widest bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
          >
            CLEAR
          </button>
          <button 
            onClick={handleCall}
            disabled={isCalling}
            className="flex-1 py-4 rounded-xl font-bold tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 shadow-lg shadow-indigo-500/20"
          >
            CALL
          </button>
        </div>

      </div>
    </div>
  );
}

