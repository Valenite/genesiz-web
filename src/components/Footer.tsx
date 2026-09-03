import React from 'react';
import { Bot, ArrowUp, MessageSquare } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FooterProps {
  onOpenChatbot: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChatbot, onOpenRegister }) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const DISCORD_URL = "https://discord.gg/RUGtbSYUHb";

  return (
    <footer className="relative bg-[#000000] border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-white text-black font-extrabold flex items-center justify-center text-xs">
                G
              </div>
              <span className="font-extrabold text-lg tracking-widest text-white">
                GENESIZ <span className="text-zinc-500 font-normal text-xs">2026</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Inter-institutional technology convocation uniting algorithmic engineering, multi-day cryptographic intelligence, tactical esports, and software sprints.
            </p>
            <div className="text-xs font-mono text-zinc-400">
              Conceived & Powered by <span className="text-white font-medium">Valenite Electrion</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="space-y-2">
              <span className="text-zinc-600 block uppercase tracking-wider">Disciplines</span>
              <ul className="space-y-1 text-zinc-400">
                <li><a href="#events" className="hover:text-white">CipherQuest</a></li>
                <li><a href="#events" className="hover:text-white">AlgoArena</a></li>
                <li><a href="#events" className="hover:text-white">Brainbyte</a></li>
                <li><a href="#events" className="hover:text-white">AppForge</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-600 block uppercase tracking-wider">Navigation</span>
              <ul className="space-y-1 text-zinc-400">
                <li><a href="#schedule" className="hover:text-white">Timeline</a></li>
                <li><a href="#community" className="hover:text-white">Community</a></li>
                <li><a href="#credits" className="hover:text-white">Credits</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <span className="text-zinc-600 block uppercase tracking-wider">Operations</span>
              <ul className="space-y-1 text-zinc-400">
                <li>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#5865F2]" /> Discord HQ
                  </a>
                </li>
                <li>
                  <button onClick={onOpenChatbot} className="hover:text-violet-400 flex items-center gap-1 cursor-pointer">
                    <Bot className="w-3 h-3 text-violet-400" /> AI Assistant
                  </button>
                </li>
                <li>
                  <button onClick={onOpenRegister} className="hover:text-white cursor-pointer">
                    Accreditation Pass
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div>
            © 2026 GENESIZ. All Rights Reserved. Architectural Credits: Valenite Electrion.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFX.playHover()}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
