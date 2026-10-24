import React from 'react';
import { ArrowRight, ChevronDown, MessageSquare, Sparkles, Shield, Cpu, FileText, Trophy, Flame } from 'lucide-react';
import { soundFX } from '../utils/audio';
import genesizLogoTransparent from '../assets/genesiz-logo-transparent.png';
import { RevealOnScroll } from './RevealOnScroll';

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const DISCORD_URL = "https://discord.gg/narNSeybgR";

  return (
    <section className="relative min-h-[90vh] pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] ambient-glow pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Top Tagline Badge */}
        <RevealOnScroll delayMs={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 font-mono text-xs shadow-md backdrop-blur-xl hover:border-white/20 transition-all hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wider">OCTOBER 05, 2026 · 2K26 EDITION</span>
          </div>
        </RevealOnScroll>

        {/* Pure Transparent Official Logo Emblem with Levitating Float */}
        <RevealOnScroll delayMs={200}>
          <div className="py-2 flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-amber-400/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <img 
                src={genesizLogoTransparent} 
                alt="GENESIZ Official Emblem" 
                className="h-28 sm:h-36 md:h-40 w-auto object-contain select-none drop-shadow-[0_0_28px_rgba(255,200,60,0.3)] hover:scale-105 transition-transform duration-500"
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

        {/* ✨ Redesigned Event Status & Podium Showcase Bar */}
        <RevealOnScroll variant="zoom-in" delayMs={400}>
          <div className="py-2 flex justify-center w-full">
            <a
              href="/results"
              onClick={() => soundFX.playWarp()}
              className="group relative inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-950/90 to-amber-500/10 border border-amber-500/30 hover:border-amber-400/60 backdrop-blur-2xl shadow-[0_0_35px_-8px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_-4px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Shimmer line on top */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />

              {/* Status Indicator Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span>GENESIZ 2K26 CONCLUDED</span>
              </div>

              {/* Center Divider / Details */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-zinc-300">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Official Podiums & Grand Winners Live</span>
              </div>

              {/* View Standings Arrow Pill */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 group-hover:text-amber-200 pl-0 sm:pl-3 sm:border-l sm:border-white/10 transition-colors">
                <span>View Standings</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </RevealOnScroll>

        {/* Action Buttons — Register button removed! Results CTA added */}
        <RevealOnScroll delayMs={500}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="/results"
              onClick={() => soundFX.playWarp()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 group cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>View 2K26 Results</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-5 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
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
              className="px-5 py-3 rounded-full bg-violet-950/70 hover:bg-violet-900/90 text-violet-200 hover:text-white text-xs sm:text-sm font-semibold border border-violet-800/70 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>Official Brochure</span>
            </a>

            <a
              href="#events"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-medium border border-zinc-800 transition-all cursor-pointer hover:border-zinc-600 hover:scale-105 active:scale-95"
            >
              Explore 8 Competitions
            </a>
          </div>
        </RevealOnScroll>

        {/* Clean 3-Column Key Information Ticker */}
        <RevealOnScroll delayMs={600}>
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto border-t border-zinc-800/60 text-left">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>STATUS</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">Event Concluded</div>
              <div className="text-[10px] font-mono text-amber-400 font-semibold">Results Official & Published</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Cpu className="w-3 h-3 text-zinc-400" />
                <span>DISCIPLINES</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">8 Arenas</div>
              <div className="text-[10px] font-mono text-zinc-500">Tech · Hack · Esports · Quiz</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>CHAMPIONS</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">SYMPHONISERS</div>
              <div className="text-[10px] font-mono text-amber-400/90 font-semibold">5× 1st Place Trophies</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Scroll indicator */}
        <RevealOnScroll delayMs={700}>
          <div className="pt-8 flex justify-center">
            <a 
              href="#events" 
              onClick={() => soundFX.playClick()}
              className="text-zinc-600 hover:text-white transition-colors animate-bounce p-2 cursor-pointer"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};
