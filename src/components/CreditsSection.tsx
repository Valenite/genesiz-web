import React from 'react';
import { Cpu, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const CreditsSection: React.FC = () => {
  return (
    <section id="credits" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>[ 04 ] // ARCHITECTURAL CONVOCATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
          The Genesis Vision.
        </h2>
        <p className="text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
          Recognizing the founding intellect, strategic vision, and architectural leadership that brought GENESIZ to reality.
        </p>
      </div>

      {/* Hero Card for Valenite Electrion */}
      <div 
        onMouseEnter={() => soundFX.playHover()}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0e0a1a] via-[#090712] to-[#050408] border border-violet-900/40 hover:border-violet-500/50 transition-all duration-300 relative overflow-hidden shadow-2xl group"
      >
        {/* Ambient background glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-600/20 transition-all"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-800/50 text-xs font-mono text-violet-300">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-semibold tracking-wider">FOUNDING ARCHITECT & VISIONARY</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
              VALENITE ELECTRION
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              GENESIZ was conceived, engineered, and powered by <strong className="text-white font-medium">Valenite Electrion</strong>. Driven by the mission to provide young software engineers, algorithmic researchers, and competitive esports strategists an uncompromising arena to compete and innovate, Valenite Electrion structured the entire technological and organizational blueprint of the symposium.
            </p>

            <blockquote className="text-xs sm:text-sm font-mono text-violet-300 italic border-l-2 border-violet-500 pl-4 py-1.5 bg-violet-950/20 rounded-r-lg">
              "We architect the arena for the next vanguard of innovators, builders, and strategists."
            </blockquote>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3.5 min-w-[220px]">
            <div className="p-4 rounded-2xl bg-black/70 border border-violet-900/40 text-left backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ETHOS</span>
              </div>
              <span className="text-sm font-bold text-white mt-1 block">Community-First</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/70 border border-violet-900/40 text-left backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400 uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>STANDARD</span>
              </div>
              <span className="text-sm font-bold text-white mt-1 block">Pure Meritocracy</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
