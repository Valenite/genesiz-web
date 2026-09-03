import React from 'react';
import genesizLogo from '../assets/genesiz-logo.png';

export const HeroHologram: React.FC = () => {
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto flex items-center justify-center pointer-events-none select-none">
      
      {/* Ambient background lighting */}
      <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>

      {/* Outer Precision Compass Ring */}
      <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_35s_linear_infinite]"></div>

      {/* Dashed Secondary Orbital Ring */}
      <div className="absolute inset-4 rounded-full border border-white/10 border-dashed animate-[spin_25s_linear_infinite_reverse]"></div>

      {/* Inner Tech Ring with Axis Tick Marks */}
      <div className="absolute inset-8 rounded-full border border-white/10 flex items-center justify-center">
        <div className="absolute top-0 w-[1px] h-2 bg-indigo-400/40"></div>
        <div className="absolute bottom-0 w-[1px] h-2 bg-indigo-400/40"></div>
        <div className="absolute left-0 h-[1px] w-2 bg-indigo-400/40"></div>
        <div className="absolute right-0 h-[1px] w-2 bg-indigo-400/40"></div>
      </div>

      {/* Central Official GENESIZ Logo Emblem */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-black/90 border border-white/15 shadow-2xl flex items-center justify-center p-4 backdrop-blur-xl group">
        <img 
          src={genesizLogo} 
          alt="GENESIZ Official Emblem" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        />
      </div>

      {/* Floating Micro Status Nodes */}
      <div className="absolute -top-1 px-3 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-400 shadow-sm">
        OCTOBER 05, 2026
      </div>
      <div className="absolute -bottom-1 px-3 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-emerald-400 flex items-center gap-1 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        OFFICIAL EMBLEM
      </div>

    </div>
  );
};
