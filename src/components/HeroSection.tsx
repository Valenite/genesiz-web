import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, Sparkles, Shield, Cpu, Radio, FileText } from 'lucide-react';
import { soundFX } from '../utils/audio';
import genesizLogoTransparent from '../assets/genesiz-logo-transparent.png';
import { RevealOnScroll } from './RevealOnScroll';

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const DISCORD_URL = "https://discord.gg/narNSeybgR";

  useEffect(() => {
    const target = new Date('2026-10-05T09:00:00+05:30').getTime();
    const updateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] ambient-glow pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Top Tagline Badge */}
        <RevealOnScroll delayMs={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-mono text-xs shadow-md backdrop-blur-xl hover:border-white/20 transition-all hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wider">OCTOBER 05, 2026</span>
          </div>
        </RevealOnScroll>

        {/* Pure Transparent Official Logo Emblem with Levitating Float */}
        <RevealOnScroll delayMs={200}>
          <div className="py-2 flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <img 
                src={genesizLogoTransparent} 
                alt="GENESIZ Official Emblem" 
                className="h-28 sm:h-36 md:h-40 w-auto object-contain select-none drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Big Premium GENESIZ Title */}
        <RevealOnScroll delayMs={300}>
          <div className="space-y-3 -mt-2">
            <h1 className="font-extrabold text-4xl sm:text-7xl md:text-8xl tracking-tighter uppercase select-none text-gradient-silver leading-none">
              GENESIZ
            </h1>

            <p className="max-w-2xl mx-auto text-xs sm:text-base text-zinc-400 font-normal leading-relaxed pt-1 px-2">
              The premier student technology summit bringing together <strong className="text-white font-semibold">competitive coding</strong>, <strong className="text-white font-semibold">cryptographic hunts</strong>, <strong className="text-white font-semibold">esports</strong>, and <strong className="text-white font-semibold">hackathons</strong>.
            </p>

            <div className="pt-1">
              <span className="inline-block px-3 py-1.5 rounded-full bg-zinc-950/90 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-400 hover:border-zinc-700 transition-colors">
                Conceived & Powered by <strong className="text-white font-semibold">VALENITE ELECTRION</strong> <span className="text-zinc-500 font-normal">(Bhavya Aggarwal)</span>
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Sleek, Modern Timer Bar */}
        <RevealOnScroll variant="zoom-in" delayMs={400}>
          <div className="py-2 flex justify-center w-full">
            <div className="inline-flex items-center px-6 sm:px-9 py-3 rounded-2xl sm:rounded-full bg-zinc-950/85 border border-white/12 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.03)] hover:border-white/20 transition-all max-w-full overflow-x-auto scrollbar-none">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.minutes },
                { label: 'SECS', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center">
                  <div className="text-center px-2.5 sm:px-4">
                    <div className="font-mono font-bold text-xl sm:text-2xl text-white tracking-tight">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-mono text-zinc-500 tracking-widest uppercase mt-0.5 font-medium">
                      {item.label}
                    </div>
                  </div>
                  {idx < 3 && <div className="h-6 w-px bg-white/10 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Action Buttons — Register Now removed, clean standard summit buttons */}
        <RevealOnScroll delayMs={500}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-6 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join Discord HQ</span>
            </a>

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-6 py-3 rounded-full bg-violet-950/70 hover:bg-violet-900/90 text-violet-200 hover:text-white text-xs sm:text-sm font-semibold border border-violet-800/70 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>Official Brochure</span>
            </a>

            <a
              href="#events"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium border border-zinc-800 transition-all cursor-pointer hover:border-zinc-600 hover:scale-105 active:scale-95"
            >
              Explore 8 Competitions
            </a>
          </div>
        </RevealOnScroll>

        {/* Clean 3-Column Key Information Ticker — restored to standard permanent summit info */}
        <RevealOnScroll delayMs={600}>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto border-t border-zinc-800/60 text-left">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>ELIGIBILITY</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">All Colleges</div>
              <div className="text-[10px] font-mono text-zinc-500">Open to Students Nationwide</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Cpu className="w-3.5 h-3 text-zinc-400" />
                <span>EVENTS</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">8 Competitions</div>
              <div className="text-[10px] font-mono text-zinc-500">Coding, Esports & Hackathons</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>COMMUNITY</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">Discord Server</div>
              <div className="text-[10px] font-mono text-zinc-500">Live Updates & Squad Matchmaking</div>
            </div>
          </div>
        </RevealOnScroll>

      </div>

      {/* Scroll Indicator */}
      <a 
        href="#events" 
        onClick={() => soundFX.playClick()}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-white transition-colors"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

    </section>
  );
};
