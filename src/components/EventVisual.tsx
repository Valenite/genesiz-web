import React from 'react';

interface EventVisualProps {
  eventId: string;
  className?: string;
}

export const EventVisual: React.FC<EventVisualProps> = ({ eventId, className = '' }) => {
  switch (eventId) {
    case 'cipherquest':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Cipher Wheel SVG Illustration */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" strokeDasharray="4 6" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="12 4" />
            </svg>

            {/* Middle Reverse Ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeDasharray="2 8" />
              <polygon points="50,22 53,28 47,28" fill="#ffffff" />
              <polygon points="50,78 53,72 47,72" fill="#ffffff" />
              <polygon points="22,50 28,53 28,47" fill="#ffffff" />
              <polygon points="78,50 72,53 72,47" fill="#ffffff" />
            </svg>

            {/* Core Symbol */}
            <div className="relative w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-md">
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                0x7F
              </span>
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            SHA-256 // OSINT
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            4-DAY SPRINT
          </div>
        </div>
      );

    case 'algoarena':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#080a0f] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-44 h-32 flex flex-col justify-between items-center py-2">
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-white font-bold">
                O(1)
              </div>
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

            <div className="flex justify-between w-full px-6">
              <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-300">
                DP
              </div>
              <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-300">
                Tree
              </div>
              <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-300">
                Graph
              </div>
            </div>

            <div className="w-full px-3 py-1 rounded bg-black/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 flex items-center justify-between">
              <span>while (l &lt;= r) {'{'} mid = l+(r-l)/2; {'}'}</span>
              <span className="w-1.5 h-3 bg-white animate-pulse"></span>
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            ICPC BENCHMARK
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            C++20 / RUST / PY
          </div>
        </div>
      );

    case 'valorant':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#0d0707] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-zinc-700/40"></div>
            <div className="absolute inset-2 rounded-full border border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-t border-rose-500 animate-[spin_4s_linear_infinite]"></div>

            <div className="absolute w-full h-[1px] bg-zinc-800"></div>
            <div className="absolute h-full w-[1px] bg-zinc-800"></div>

            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="w-3 h-3 border border-rose-500 rounded-sm bg-rose-500/20"></div>
              <div className="absolute top-0 w-1 h-2 bg-rose-500"></div>
              <div className="absolute bottom-0 w-1 h-2 bg-rose-500"></div>
              <div className="absolute left-0 h-1 w-2 bg-rose-500"></div>
              <div className="absolute right-0 h-1 w-2 bg-rose-500"></div>
            </div>

            <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-rose-300">
            VCT 5V5 TOURNAMENT
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            240HZ ARENA PODS
          </div>
        </div>
      );

    case 'bedwarz':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#060c0a] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="w-12 h-12 bg-zinc-900 border border-emerald-500/60 rotate-45 rounded-sm flex items-center justify-center animate-bounce">
              <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-400 rotate-45"></div>
            </div>

            <div className="absolute bottom-4 w-28 h-10 border border-zinc-800 rounded-[50%] rotate-[15deg]"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-emerald-300">
            4V4 SQUADS PVP
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            1.8.9 LOW-LATENCY
          </div>
        </div>
      );

    case 'brainbyte':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#0b0710] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-40 h-32 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-6">
              <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] text-white font-mono">
                α
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/40 flex items-center justify-center text-xs text-white font-bold animate-pulse">
                ⚡
              </div>
              <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] text-white font-mono">
                Ω
              </div>
            </div>

            <div className="flex items-end gap-1 h-8">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 85, 30, 65].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}%` }}
                  className="w-1 bg-zinc-500 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            STAGE BUZZER ARENA
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            CROSS-DOMAIN QUIZ
          </div>
        </div>
      );

    case 'appforge':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#070b10] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-28 h-36 rounded-2xl bg-zinc-950 border border-zinc-700 p-2 flex flex-col justify-between shadow-md">
            <div className="w-8 h-1.5 bg-zinc-700 rounded-full mx-auto"></div>

            <div className="space-y-1.5 py-1">
              <div className="h-4 rounded bg-zinc-900 border border-zinc-800 flex items-center px-1.5">
                <div className="w-2 h-2 rounded-full bg-white mr-1.5"></div>
                <div className="h-1 w-10 bg-zinc-700 rounded"></div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-8 rounded bg-zinc-900 border border-zinc-800"></div>
                <div className="h-8 rounded bg-zinc-900 border border-zinc-800"></div>
              </div>
            </div>

            <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            MOBILE HACKATHON
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            FLUTTER / REACT NATIVE
          </div>
        </div>
      );

    case 'webx':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#070710] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-40 h-32 flex items-center justify-center">
            <svg className="w-24 h-24 animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
              <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
              <line x1="50" y1="10" x2="50" y2="95" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="35" x2="90" y2="75" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="35" x2="10" y2="75" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="14" fill="rgba(255, 255, 255, 0.05)" stroke="#ffffff" strokeWidth="1" />
            </svg>

            <div className="absolute -top-1 -right-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
              WebGL
            </div>
            <div className="absolute -bottom-1 -left-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
              Three.js
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            WEB ARCHITECTURE
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            REACT / NEXT.JS / THREE
          </div>
        </div>
      );

    case 'surprise':
    default:
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#0c0710] border border-white/10 flex items-center justify-center transition-all ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full border border-zinc-700 animate-ping"></div>
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-600 shadow-lg flex items-center justify-center">
              <span className="text-2xl font-black text-white select-none">
                ?
              </span>
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300">
            TOP SECRET // BLACKBOX
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            LIVE DISCLOSURE
          </div>
        </div>
      );
  }
};
