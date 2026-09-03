import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Bot, MessageSquare, Sparkles, Shield, Cpu, Network, Radio } from 'lucide-react';
import { HeroHologram } from './HeroHologram';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenChatbot: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister, onOpenChatbot }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const DISCORD_URL = "https://discord.gg/RUGtbSYUHb";

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
    <section className="relative min-h-[92vh] pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] ambient-glow pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-zinc-200 font-mono text-xs shadow-xl backdrop-blur-xl">
          <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wider">OCTOBER 05, 2026</span>
          <span className="text-zinc-600">/</span>
          <span className="text-violet-300 uppercase tracking-wide font-medium">INTER-INSTITUTIONAL TECHNOLOGY SUMMIT</span>
        </div>

        {/* 3D Holographic Visual Centerpiece (Perfect 1:1 Circle) */}
        <div className="py-1 flex items-center justify-center">
          <HeroHologram />
        </div>

        {/* Main Title - Fully Elevated */}
        <div className="space-y-2 -mt-2">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase select-none text-gradient-silver drop-shadow-2xl leading-none">
            GENESIZ
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 font-normal leading-relaxed pt-1">
            The premier technology convocation uniting <strong className="text-white font-semibold">algorithmic engineering</strong>, <strong className="text-white font-semibold">cryptographic forensics</strong>, <strong className="text-white font-semibold">tactical esports</strong>, and <strong className="text-white font-semibold">rapid software architecture</strong>.
          </p>

          <div className="pt-1">
            <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-950/80 border border-violet-900/50 text-[11px] font-mono text-zinc-400 shadow-md">
              Conceived & Powered by <strong className="text-violet-300 font-semibold">VALENITE ELECTRION</strong>
            </span>
          </div>
        </div>

        {/* Minimalist Countdown Timer */}
        <div className="py-1">
          <div className="inline-flex items-center gap-3 sm:gap-6 px-6 sm:px-8 py-3 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={item.label} className="flex items-center gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-mono text-violet-400 tracking-widest mt-0.5 font-semibold">
                    {item.label}
                  </div>
                </div>
                {idx < 3 && <span className="text-zinc-700 text-xl font-mono hidden sm:inline">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              soundFX.playWarp();
              onOpenRegister();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-2 group cursor-pointer"
          >
            <span>Delegate Accreditation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="px-5 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_25px_rgba(88,101,242,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join Discord HQ</span>
          </a>

          <a
            href="#events"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="px-5 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium border border-zinc-700/80 transition-all cursor-pointer"
          >
            Explore 8 Disciplines
          </a>

          <button
            onClick={() => {
              soundFX.playWarp();
              onOpenChatbot();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-4 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            title="Ask GENESIZ AI Assistant"
          >
            <Bot className="w-4 h-4 text-violet-400" />
            <span className="hidden sm:inline">AI Chat</span>
          </button>
        </div>

        {/* Executive Institutional Metrics Ticker */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto border-t border-zinc-800/80 text-left">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900/90 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-2 text-[9px] font-mono text-violet-400 uppercase tracking-wider mb-0.5">
              <Shield className="w-3 h-3" />
              <span>DELEGATION</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">Inter-Institutional</div>
            <div className="text-[10px] font-mono text-zinc-400">National Academic Forum</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900/90 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-2 text-[9px] font-mono text-violet-400 uppercase tracking-wider mb-0.5">
              <Cpu className="w-3 h-3" />
              <span>DISCIPLINES</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">8 Flagship Arenas</div>
            <div className="text-[10px] font-mono text-zinc-400">Engineering & Esports</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900/90 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-2 text-[9px] font-mono text-violet-400 uppercase tracking-wider mb-0.5">
              <Network className="w-3 h-3" />
              <span>INFRASTRUCTURE</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">Supercluster LAN</div>
            <div className="text-[10px] font-mono text-zinc-400">240Hz High-Refresh Pods</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900/90 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-2 text-[9px] font-mono text-violet-400 uppercase tracking-wider mb-0.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>OPERATIONS</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">Discord HQ</div>
            <div className="text-[10px] font-mono text-zinc-400">Central Intelligence Node</div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <a 
        href="#events" 
        onClick={() => soundFX.playClick()}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-white transition-colors"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

    </section>
  );
};
