import React from 'react';
import { Cpu, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const CreditsSection: React.FC = () => {
  return (
    <section id="credits" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>[ 04 ] // FOUNDER CREDITS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
          The Genesis Vision.
        </h2>
        <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
          Recognizing the founding leadership and vision that brought GENESIZ to life.
        </p>
      </div>

      {/* Hero Card for Valenite Electrion */}
      <div 
        onMouseEnter={() => soundFX.playHover()}
        className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-white/10 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden shadow-xl group"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-semibold tracking-wider">FOUNDING ARCHITECT & VISIONARY</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              VALENITE ELECTRION
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              GENESIZ was conceived, engineered, and powered by <strong className="text-white font-medium">Valenite Electrion</strong>. Created to give student coders, gamers, developers, and problem solvers a world-class platform to showcase their skills, Valenite Electrion built the entire foundation of GENESIZ.
            </p>

            <blockquote className="text-xs sm:text-sm font-mono text-zinc-300 italic border-l-2 border-zinc-500 pl-4 py-1.5 bg-zinc-950/60 rounded-r-lg">
              "We build the platform for the next generation of builders and problem solvers."
            </blockquote>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3.5 min-w-[220px]">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VALUES</span>
              </div>
              <span className="text-sm font-bold text-white mt-1 block">Community First</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>JUDGING</span>
              </div>
              <span className="text-sm font-bold text-white mt-1 block">100% Fair & Skill-Based</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
