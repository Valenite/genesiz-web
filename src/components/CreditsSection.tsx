import React, { useState } from 'react';
import { Cpu, ShieldCheck, Sparkles, Award, UserCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { RevealOnScroll } from './RevealOnScroll';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', onMouseEnter }) => {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export const CreditsSection: React.FC = () => {
  const coreMembers = [
    { name: 'Bhavya', role: 'President' },
    { name: 'Pratyaksh', role: 'President' },
    { name: 'Aarav', role: 'Vice President' },
    { name: 'Om', role: 'Vice President' },
  ];

  return (
    <section id="credits" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <RevealOnScroll>
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>[ 04 ] // FOUNDER CREDITS & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
            The Genesis Vision.
          </h2>
          <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
            Recognizing the founding leadership and core executive team that brought GENESIZ to life.
          </p>
        </div>
      </RevealOnScroll>

      {/* Hero Card for Valenite Electrion */}
      <RevealOnScroll delayMs={150}>
        <TiltCard 
          onMouseEnter={() => soundFX.playHover()}
          className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-white/10 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden shadow-xl group cursor-pointer"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            
            <div className="space-y-5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold tracking-wider">FOUNDING ARCHITECT & VISIONARY</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex flex-wrap items-baseline gap-2.5">
                <span>VALENITE ELECTRION</span>
                <span className="text-zinc-500 font-normal text-base sm:text-xl font-mono">(Bhavya Aggarwal)</span>
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                GENESIZ was conceived, engineered, and powered by <strong className="text-white font-medium">Valenite Electrion</strong> <span className="text-zinc-400">(Bhavya Aggarwal)</span>. Created to give student coders, gamers, developers, and problem solvers a world-class platform to showcase their skills, Valenite Electrion built the entire foundation of GENESIZ.
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
        </TiltCard>
      </RevealOnScroll>

      {/* Core Executive Leadership Grid */}
      <RevealOnScroll delayMs={250}>
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-zinc-400" />
            <span>CORE EXECUTIVE COMMITTEE</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {coreMembers.map((member, idx) => (
              <RevealOnScroll key={member.name + idx} variant="3d-dock" delayMs={idx * 100}>
                <TiltCard 
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-5 rounded-2xl bg-[#09090e] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between h-full cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                      0{idx + 1} // LEADERSHIP
                    </span>
                    <div className="text-lg font-bold text-white tracking-tight">
                      {member.name}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-300 font-semibold">
                      {member.role}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </RevealOnScroll>

    </section>
  );
};
