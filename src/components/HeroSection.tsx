import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Bot, MessageSquare, Sparkles, Shield, Cpu, Radio } from 'lucide-react';
import { soundFX } from '../utils/audio';
import genesizLogoTransparent from '../assets/genesiz-logo-transparent.png';
import { RevealOnScroll } from './RevealOnScroll';

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
    <section className="relative min-h-[90vh] pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] ambient-glow pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Top Tagline Badge */}
        <RevealOnScroll delayMs={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-mono text-xs shadow-md backdrop-blur-xl hover:border-white/20 transition-all">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wider">OCTOBER 05, 2026</span>
          </div>
        </RevealOnScroll>

        {/* Pure Transparent Official Logo Emblem with Floating Animation */}
        <RevealOnScroll delayMs={200}>
          <div className="py-2 flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <img 
                src={genesizLogoTransparent} 
                alt="GENESIZ Official Emblem" 
                className="h-28 sm:h-36 md:h-40 w-auto object-contain select-none drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Big Premium GENESIZ Title */}
        <RevealOnScroll delayMs={300}>
          <div className="space-y-3 -mt-2">
            <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase select-none text-gradient-silver leading-none">
              GENESIZ
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed pt-1">
              The premier student technology summit bringing together <strong className="text-white font-semibold">competitive coding</strong>, <strong className="text-white font-semibold">cryptographic hunts</strong>, <strong className="text-white font-semibold">esports</strong>, and <strong className="text-white font-semibold">hackathons</strong>.
            </p>

            <div className="pt-1">
              <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-950/90 border border-white/10 text-[11px] font-mono text-zinc-400">
                Conceived & Powered by <strong className="text-white font-semibold">VALENITE ELECTRION</strong> <span className="text-zinc-500 font-normal">(Bhavya Aggarwal)</span>
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Countdown Timer with Emerging Portal Animation */}
        <RevealOnScroll variant="zoom-in" delayMs={400}>
          <div className="py-2 flex justify-center">
            <div className="inline-flex items-center gap-3 sm:gap-6 px-6 sm:px-8 py-3.5 rounded-2xl bg-zinc-950/90 border border-white/15 backdrop-blur-xl shadow-2xl animate-portal">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={item.label} className="flex items-center gap-3 sm:gap-6">
                  <div className="text-center">
                    <div className="font-mono font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500 tracking-widest mt-0.5 font-semibold">
                      {item.label}
                    </div>
                  </div>
                  {idx < 3 && <span className="text-zinc-700 text-xl font-mono hidden sm:inline">:</span>}
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Action Buttons */}
        <RevealOnScroll delayMs={500}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => {
                soundFX.playWarp();
                onOpenRegister();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="px-7 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm transition-all flex items-center gap-2 group cursor-pointer shadow-md hover:scale-105"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-5 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join Discord HQ</span>
            </a>

            <a
              href="#events"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium border border-zinc-800 transition-all cursor-pointer hover:border-zinc-600"
            >
              Explore 8 Competitions
            </a>

            <button
              onClick={() => {
                soundFX.playWarp();
                onOpenChatbot();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="px-4 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer hover:border-zinc-600"
              title="Ask GENESIZ AI Assistant"
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">AI Chat</span>
            </button>
          </div>
        </RevealOnScroll>

        {/* Clean 3-Column Key Information Ticker */}
        <RevealOnScroll delayMs={600}>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto border-t border-zinc-800/60 text-left">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>ELIGIBILITY</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">All Colleges</div>
              <div className="text-[10px] font-mono text-zinc-500">Open to Students Nationwide</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Cpu className="w-3.5 h-3 text-zinc-400" />
                <span>EVENTS</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">8 Competitions</div>
              <div className="text-[10px] font-mono text-zinc-500">Coding, Esports & Hackathons</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 transition-colors">
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
