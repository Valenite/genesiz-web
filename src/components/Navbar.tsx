import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  ArrowRight,
  FileText,
  Trophy
} from 'lucide-react';
import { soundFX } from '../utils/audio';
import genesizLogo from '../assets/genesiz-logo-transparent.png';

interface NavbarProps {
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFX.playClick();
    }
  };

  const navLinks = [
    { label: 'Disciplines', href: '#events', num: '01' },
    { label: 'Timeline', href: '#schedule', num: '02' },
    { label: 'Community', href: '#community', num: '03' },
    { label: 'About', href: '#credits', num: '04' },
    { label: 'FAQ', href: '#faq', num: '05' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3.5 px-4 sm:px-6 lg:px-8">
      {/* Floating Modern Navbar Container */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#07070b]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_25px_rgba(245,158,11,0.06)] relative transition-all">
        
        {/* Subtle top shimmer rim */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

        {/* Official Brand Logo */}
        <a 
          href="#" 
          onClick={() => soundFX.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <img 
            src={genesizLogo} 
            alt="GENESIZ Logo" 
            className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full tracking-wider">
            '26
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-zinc-600 text-[10px]">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundFX.playHover()}
            title={isMuted ? 'Enable Sound Synthesis' : 'Mute Sound'}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
          </button>

          {/* Official Brochure Link */}
          <a
            href="/brochure.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="hidden lg:flex px-3 py-1.5 rounded-full bg-violet-950/50 hover:bg-violet-900/70 border border-violet-800/40 text-violet-200 hover:text-white text-xs font-mono items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-violet-400" />
            <span>Brochure</span>
          </a>

          {/* 🏆 Primary Action: 2K26 Results Button */}
          <a
            href="/results"
            onClick={() => soundFX.playWarp()}
            onMouseEnter={() => soundFX.playHover()}
            className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs transition-all flex items-center gap-1.5 group cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)] hover:scale-105 active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5 text-black" />
            <span>2K26 Results</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick results link on mobile header */}
          <a
            href="/results"
            onClick={() => soundFX.playWarp()}
            className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1"
          >
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Results</span>
          </a>

          <button
            onClick={toggleAudio}
            className="p-1.5 text-zinc-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
          </button>
          
          <button
            onClick={() => {
              soundFX.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-1.5 text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 rounded-3xl bg-[#08080c]/95 backdrop-blur-2xl border border-white/10 max-w-6xl mx-auto space-y-3 shadow-2xl animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFX.playClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-xl text-sm font-mono text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <span className="text-zinc-600 mr-2">{link.num}</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="/results"
              onClick={() => {
                soundFX.playWarp();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>VIEW 2K26 RESULTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                soundFX.playClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-violet-950/80 border border-violet-800/80 text-violet-200 font-mono text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              OFFICIAL BROCHURE
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
