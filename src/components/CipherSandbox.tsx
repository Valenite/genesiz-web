import React, { useState } from 'react';
import { CheckCircle2, KeyRound, Sparkles, ArrowRight, X, Lock } from 'lucide-react';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CipherPuzzle {
  id: number;
  type: string;
  encrypted: string;
  hint: string;
  solution: string;
  lore: string;
}

const PUZZLES: CipherPuzzle[] = [
  {
    id: 1,
    type: 'HEXADECIMAL BYTE STREAM',
    encrypted: '56 41 4C 45 4E 49 54 45',
    hint: 'Convert 8-bit ASCII hex pairs into plain text characters.',
    solution: 'VALENITE',
    lore: 'Identity hash of the Founding Architect.',
  },
  {
    id: 2,
    type: 'ROT-13 CRYPTOGRAPHIC SHIFT',
    encrypted: 'TRARFVM',
    hint: 'Rotate alphabet by 13 positions (Caesar symmetric cipher).',
    solution: 'GENESIZ',
    lore: 'Codename of the 2026 technological convocation.',
  },
  {
    id: 3,
    type: 'BINARY OCTET PROTOCOL',
    encrypted: '01001111 01000011 01010100 00110101',
    hint: 'Decode binary chunks into 4 ASCII characters (Month & Date).',
    solution: 'OCT5',
    lore: 'Commencement date of the symposium.',
  },
];

interface CipherSandboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CipherSandbox: React.FC<CipherSandboxProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  if (!isOpen) return null;

  const puzzle = PUZZLES[currentIdx];

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim().toUpperCase();

    if (clean === puzzle.solution) {
      soundFX.playSuccess();
      setIsSolved(true);
      setSolvedCount((prev) => Math.max(prev, currentIdx + 1));
      try {
        confetti({
          particleCount: 70,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#3b82f6', '#10b981'],
        });
      } catch {
        // Ignore
      }
    } else {
      soundFX.playKey();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    setIsSolved(false);
    setInputVal('');
    setShowHint(false);
    setCurrentIdx((prev) => (prev + 1) % PUZZLES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#0e0a1e] via-[#090714] to-[#040308] border border-violet-500/50 p-6 sm:p-10 shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-violet-900/40 pb-6 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-xs font-mono text-violet-300">
              <Lock className="w-3.5 h-3.5 text-violet-400" />
              <span>CLASSIFIED PROTOCOL // CIPHERQUEST LEVEL 0 ENIGMA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-2">
              Secret Cryptographic Sandbox
            </h3>
            <p className="text-xs text-zinc-300 font-light max-w-lg">
              Security override confirmed. Solve encrypted telemetry streams to test cryptographic agility.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Puzzle Body */}
        <div className="overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Encrypted Stream Box */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-violet-400 uppercase font-semibold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  ENIGMA #{puzzle.id}: {puzzle.type}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  {showHint ? 'Hide Hint' : 'Request Hint'}
                </button>
              </div>

              {/* Cipher Display Terminal */}
              <div className="p-5 rounded-2xl bg-black/90 border border-violet-500/40 font-mono text-center relative overflow-hidden shadow-inner">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                  INTERCEPTED TRANSMISSION PAYLOAD
                </div>
                <div className="text-lg sm:text-2xl font-black text-violet-300 tracking-widest select-all py-2 break-all">
                  {puzzle.encrypted}
                </div>
                <div className="text-[11px] text-zinc-500 italic mt-1">
                  Context: {puzzle.lore}
                </div>
              </div>

              {showHint && (
                <div className="p-3.5 rounded-xl bg-violet-950/50 border border-violet-800/40 text-xs font-mono text-violet-300 animate-fadeIn">
                  💡 HINT: {puzzle.hint}
                </div>
              )}
            </div>

            {/* Right: Decryption Input & Validation */}
            <div className="md:col-span-5 bg-zinc-950/90 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold block">
                  DECRYPTED VERDICT
                </span>
                <span className="text-[10px] font-mono text-violet-400 font-bold">
                  {solvedCount}/3 SOLVED
                </span>
              </div>

              {isSolved ? (
                <div className="space-y-4 text-center py-2 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ACCEPTED: {puzzle.solution}</span>
                  </div>

                  <p className="text-xs text-zinc-300 font-light">
                    Decryption verified. Access token authorized for the next stream.
                  </p>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Next Enigma Stream</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleValidate} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="ENTER DECODED TEXT"
                    className={`w-full px-4 py-3 bg-black border rounded-xl text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 uppercase tracking-widest transition-all ${
                      errorShake ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />

                  <button
                    type="submit"
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Decryption</span>
                  </button>

                  {errorShake && (
                    <div className="text-[11px] font-mono text-rose-400 text-center">
                      INCORRECT VERDICT. CHECK HINT & RETRY.
                    </div>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
