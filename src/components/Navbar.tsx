import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Bot, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '../utils/audio';
import genesizLogo from '../assets/genesiz-logo-transparent.png';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenChatbot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRegister, 
  onOpenChatbot
}) => {
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
    { label: 'Events', href: '#events', num: '01' },
    { label: 'Schedule', href: '#schedule', num: '02' },
    { label: 'Community', href: '#community', num: '03' },
    { label: 'About', href: '#credits', num: '04' },
    { label: 'FAQ', href: '#faq', num: '05' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-full bg-[#08080c]/85 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        
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
          <span className="text-[10px] font-mono text-zinc-400 font-semibold">
            '26
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-zinc-600 text-[10px]">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundFX.playHover()}
            title={isMuted ? 'Enable Sound Synthesis' : 'Mute Sound'}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
          </button>

          {/* AI Chatbot Trigger */}
          <button
            onClick={() => {
              soundFX.playWarp();
              onOpenChatbot();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-zinc-300" />
            <span>AI Assistant</span>
          </button>

          {/* Register CTA */}
          <button
            onClick={() => {
              soundFX.playWarp();
              onOpenRegister();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-all flex items-center gap-1.5 group cursor-pointer shadow-md"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center gap-2">
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
            <button
              onClick={() => {
                soundFX.playWarp();
                setIsMobileMenuOpen(false);
                onOpenChatbot();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-zinc-400" />
              GENESIZ AI ASSISTANT
            </button>
            <button
              onClick={() => {
                soundFX.playWarp();
                setIsMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
