import React, { useState } from 'react';
import { MessageSquare, ArrowUpRight, ShieldCheck, Users, Radio, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { RevealOnScroll } from './RevealOnScroll';

export const CommunitySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    soundFX.playSuccess();
    setIsDone(true);
    setEmail('');
  };

  const DISCORD_URL = "https://discord.gg/RUGtbSYUHb";

  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <RevealOnScroll>
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>[ 03 ] CENTRAL INTELLIGENCE HQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
            Join Discord Headquarters.
          </h2>
          <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
            The central coordination server for GENESIZ. Connect with delegates, assemble squads, receive 4-day CipherQuest intelligence bulletins, and access tournament operations.
          </p>
        </div>
      </RevealOnScroll>

      {/* Main Discord Spotlight Card */}
      <RevealOnScroll delayMs={150}>
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden mb-8 shadow-xl group">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" />
                <span className="font-semibold tracking-wider">OFFICIAL SERVER INFRASTRUCTURE</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                GENESIZ HQ on Discord
              </h3>

              <p className="text-sm text-zinc-300 font-normal leading-relaxed">
                All official communications, 4-day CipherQuest hint broadcasts, bracket seedings, match coordination, and mentor inquiries take place live on our official server.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Open Registration</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Live Intelligence Feed</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Verified Delegates</span>
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="px-8 py-4 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
              >
                <span>Connect to Discord HQ</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-[11px] font-mono text-zinc-500 text-center">
                discord.gg/RUGtbSYUHb
              </span>
            </div>

          </div>
        </div>
      </RevealOnScroll>

      {/* Clean Newsletter Strip */}
      <RevealOnScroll delayMs={250}>
        <div className="p-8 rounded-3xl bg-[#09090e] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">Subscribe to Updates</h4>
            <p className="text-xs text-zinc-400 font-normal mt-1">Receive challenge directives and schedule bulletins directly via email.</p>
          </div>

          {isDone ? (
            <span className="text-xs font-mono text-emerald-400 font-medium">Email registered successfully.</span>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                placeholder="delegate@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 w-full sm:w-64"
              />
              <button
                type="submit"
                onMouseEnter={() => soundFX.playHover()}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs whitespace-nowrap hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </RevealOnScroll>

    </section>
  );
};
