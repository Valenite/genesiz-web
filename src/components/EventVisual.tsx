import React from 'react';

interface EventVisualProps {
  eventId: string;
  className?: string;
}

export const EventVisual: React.FC<EventVisualProps> = ({ eventId, className = '' }) => {
  switch (eventId) {
    case 'cipherquest':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c0818] via-[#070510] to-[#040308] border border-violet-900/30 flex items-center justify-center group-hover:border-violet-500/50 transition-all ${className}`}>
          {/* Animated Background Hex Grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Cipher Wheel SVG Illustration */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(167, 139, 250, 0.25)" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" strokeDasharray="12 4" />
            </svg>

            {/* Middle Reverse Ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="1.5" strokeDasharray="2 8" />
              <polygon points="50,22 53,28 47,28" fill="#c084fc" />
              <polygon points="50,78 53,72 47,72" fill="#c084fc" />
              <polygon points="22,50 28,53 28,47" fill="#c084fc" />
              <polygon points="78,50 72,53 72,47" fill="#c084fc" />
            </svg>

            {/* Core Locked Cryptographic Symbol */}
            <div className="relative w-16 h-16 rounded-full bg-violet-950/80 border border-violet-400/60 shadow-[0_0_25px_rgba(139,92,246,0.6)] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-violet-200 tracking-wider">
                0x7F
              </span>
            </div>
          </div>

          {/* Floating Telemetry Chips */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-[9px] font-mono text-violet-300">
            SHA-256 // OSINT
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            4-DAY SPRINT
          </div>
        </div>
      );

    case 'algoarena':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#050c18] via-[#030710] to-[#020408] border border-blue-900/30 flex items-center justify-center group-hover:border-blue-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Binary Tree & Code Architecture Visual */}
          <div className="relative w-44 h-32 flex flex-col justify-between items-center py-2">
            {/* Tree Nodes */}
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center font-mono text-[10px] text-blue-200 font-bold">
                O(1)
              </div>
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

            <div className="flex justify-between w-full px-6">
              <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-500/40 flex items-center justify-center font-mono text-[9px] text-blue-300">
                DP
              </div>
              <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-500/40 flex items-center justify-center font-mono text-[9px] text-blue-300">
                Tree
              </div>
              <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-500/40 flex items-center justify-center font-mono text-[9px] text-blue-300">
                Graph
              </div>
            </div>

            {/* Code snippet banner */}
            <div className="w-full px-3 py-1 rounded bg-black/60 border border-blue-900/40 text-[10px] font-mono text-blue-400 flex items-center justify-between">
              <span>while (l &lt;= r) {'{'} mid = l+(r-l)/2; {'}'}</span>
              <span className="w-1.5 h-3 bg-blue-400 animate-pulse"></span>
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[9px] font-mono text-blue-300">
            ICPC BENCHMARK
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            C++20 / RUST / PY
          </div>
        </div>
      );

    case 'valorant':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#180808] via-[#0f0404] to-[#080202] border border-rose-900/30 flex items-center justify-center group-hover:border-rose-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Tactical Crosshair & Radar Visual */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Rotating Radar Sweep */}
            <div className="absolute inset-0 rounded-full border border-rose-500/30"></div>
            <div className="absolute inset-2 rounded-full border border-rose-500/20"></div>
            <div className="absolute inset-0 rounded-full border-t border-rose-500 animate-[spin_4s_linear_infinite]"></div>

            {/* Grid Crosshair Lines */}
            <div className="absolute w-full h-[1px] bg-rose-500/30"></div>
            <div className="absolute h-full w-[1px] bg-rose-500/30"></div>

            {/* Center Reticle */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="w-3 h-3 border border-rose-400 rounded-sm shadow-[0_0_15px_rgba(244,63,94,0.8)] bg-rose-500/20"></div>
              <div className="absolute top-0 w-1 h-2 bg-rose-400"></div>
              <div className="absolute bottom-0 w-1 h-2 bg-rose-400"></div>
              <div className="absolute left-0 h-1 w-2 bg-rose-400"></div>
              <div className="absolute right-0 h-1 w-2 bg-rose-400"></div>
            </div>

            {/* Enemy Ping Blips */}
            <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
            <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-rose-400"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-[9px] font-mono text-rose-300">
            VCT 5V5 TOURNAMENT
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            240HZ ARENA PODS
          </div>
        </div>
      );

    case 'bedwarz':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#061814] via-[#030f0c] to-[#020806] border border-emerald-900/30 flex items-center justify-center group-hover:border-emerald-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Isometric Diamond / Core Bed Fortress Visual */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Floating Diamond Core */}
            <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-200 rotate-45 rounded-sm shadow-[0_0_25px_rgba(16,185,129,0.7)] border border-emerald-300 animate-bounce flex items-center justify-center">
              <div className="w-6 h-6 bg-emerald-900/40 border border-white/50 rotate-45"></div>
            </div>

            {/* Isometric Island Base Rings */}
            <div className="absolute bottom-4 w-28 h-10 border border-emerald-500/30 rounded-[50%] rotate-[15deg]"></div>
            <div className="absolute bottom-6 w-20 h-8 border border-emerald-400/20 rounded-[50%] rotate-[15deg]"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[9px] font-mono text-emerald-300">
            4V4 SQUADS PVP
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            1.8.9 LOW-LATENCY
          </div>
        </div>
      );

    case 'brainbyte':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#12081c] via-[#0b0412] to-[#06020a] border border-fuchsia-900/30 flex items-center justify-center group-hover:border-fuchsia-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Neural Synapse & Electric Waveform */}
          <div className="relative w-40 h-32 flex flex-col items-center justify-center gap-3">
            {/* Synapse Nodes */}
            <div className="flex items-center gap-6">
              <div className="w-6 h-6 rounded-full bg-fuchsia-600/30 border border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.6)] flex items-center justify-center text-[10px] text-white font-mono">
                α
              </div>
              <div className="w-9 h-9 rounded-full bg-fuchsia-500/40 border border-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.8)] flex items-center justify-center text-xs text-white font-bold animate-pulse">
                ⚡
              </div>
              <div className="w-6 h-6 rounded-full bg-fuchsia-600/30 border border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.6)] flex items-center justify-center text-[10px] text-white font-mono">
                Ω
              </div>
            </div>

            {/* Audio/Frequency Waveform */}
            <div className="flex items-end gap-1 h-8">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 85, 30, 65].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}%` }}
                  className="w-1 bg-gradient-to-t from-fuchsia-600 to-fuchsia-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-fuchsia-950/60 border border-fuchsia-800/40 text-[9px] font-mono text-fuchsia-300">
            STAGE BUZZER ARENA
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            CROSS-DOMAIN QUIZ
          </div>
        </div>
      );

    case 'appforge':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#06121a] via-[#040a10] to-[#020508] border border-cyan-900/30 flex items-center justify-center group-hover:border-cyan-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Mobile Smartphone Wireframe with Glass Layer */}
          <div className="relative w-28 h-36 rounded-2xl bg-zinc-950 border-2 border-cyan-500/40 p-2 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex flex-col justify-between">
            {/* Dynamic Island / Notch */}
            <div className="w-8 h-1.5 bg-cyan-400/50 rounded-full mx-auto"></div>

            {/* Mini App UI Components */}
            <div className="space-y-1.5 py-1">
              <div className="h-4 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center px-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mr-1.5"></div>
                <div className="h-1 w-10 bg-cyan-400/40 rounded"></div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-8 rounded bg-zinc-900 border border-zinc-800"></div>
                <div className="h-8 rounded bg-zinc-900 border border-zinc-800"></div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-10 h-1 bg-zinc-600 rounded-full mx-auto"></div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-[9px] font-mono text-cyan-300">
            MOBILE HACKATHON
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            FLUTTER / REACT NATIVE
          </div>
        </div>
      );

    case 'webx':
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#120822] via-[#090412] to-[#04020a] border border-indigo-900/30 flex items-center justify-center group-hover:border-indigo-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* 3D Wireframe Mesh & Modern Browser Visual */}
          <div className="relative w-40 h-32 flex items-center justify-center">
            {/* Rotating 3D Polygon */}
            <svg className="w-24 h-24 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
              <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="1.5" />
              <line x1="50" y1="10" x2="50" y2="95" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="35" x2="90" y2="75" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="35" x2="10" y2="75" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="14" fill="rgba(99, 102, 241, 0.2)" stroke="#818cf8" strokeWidth="1" />
            </svg>

            {/* Interactive tag pills */}
            <div className="absolute -top-1 -right-2 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-[9px] font-mono text-indigo-300">
              WebGL
            </div>
            <div className="absolute -bottom-1 -left-2 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-[9px] font-mono text-indigo-300">
              Three.js
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-[9px] font-mono text-indigo-300">
            WEB ARCHITECTURE
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            REACT / NEXT.JS / THREE
          </div>
        </div>
      );

    case 'surprise':
    default:
      return (
        <div className={`relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#160824] via-[#0d0416] to-[#06020b] border border-purple-900/30 flex items-center justify-center group-hover:border-purple-500/50 transition-all ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Classified Lock & Energy Core Visual */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Glowing Energy Vortex */}
            <div className="absolute w-24 h-24 rounded-full bg-purple-600/20 border border-purple-500/40 animate-ping"></div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-950 via-purple-700 to-pink-500 border border-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.8)] flex items-center justify-center">
              <span className="text-2xl font-black text-white select-none">
                ?
              </span>
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-[9px] font-mono text-purple-300">
            TOP SECRET // BLACKBOX
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            LIVE DISCLOSURE
          </div>
        </div>
      );
  }
};
