import { useState } from 'react';

// Hash is checked client side against SHA-256 of the dialed number.
// The correct number and audio filename are never stored as plaintext.
const H = 'c25f0f7c8e18a1eaaff750a9274b742510662bd8fb6d843ae0633110195c1c42';
const A = '/d57b3a1ca2ec4e00.wav';

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

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

    const hash = await sha256(number);

    if (hash === H) {
      setStatus('CONNECTED');
      const audio = new Audio(A);
      audio.play().catch(() => {});
      audio.onended = () => {
        setIsCalling(false);
        setStatus('');
      };
    } else {
      setStatus('NUMBER NOT IN SERVICE');
      setIsCalling(false);
    }
  };

  const padStyle = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-full text-2xl font-bold text-zinc-300 hover:bg-zinc-800 transition-colors active:scale-95";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-sm w-full">
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl h-24 mb-8 flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div className="text-3xl tracking-widest font-black text-zinc-100 mb-1 z-10">{number || '\u00a0'}</div>
          <div className={`text-xs font-bold tracking-widest z-10 ${status === 'CONNECTED' ? 'text-emerald-400' : 'text-rose-500'}`}>
            {status}
          </div>
        </div>

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
