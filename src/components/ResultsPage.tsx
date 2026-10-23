import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Sparkles, 
  Flame, 
  ArrowLeft, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  Code2, 
  Lock, 
  Terminal, 
  Globe, 
  Smartphone, 
  Gamepad2, 
  Swords, 
  PartyPopper,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import genesizLogo from '../assets/genesiz-logo-transparent.png';

interface Winner {
  rank: 1 | 2 | 3;
  team: string;
  note?: string;
}

interface EventResult {
  id: string;
  name: string;
  category: 'code' | 'security' | 'esports' | 'creative';
  categoryLabel: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
  bgGlow: string;
  borderAccent: string;
  description: string;
  winners: Winner[];
}

export function ResultsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'code' | 'security' | 'esports' | 'creative'>('all');
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  useEffect(() => {
    document.title = '🏆 GENESIZ 2026 — Official Results & Winners';
    window.scrollTo(0, 0);

    // Initial celebratory confetti blast
    const timer1 = setTimeout(() => {
      triggerConfetti();
    }, 600);

    const timer2 = setTimeout(() => {
      triggerSideCannons();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const triggerConfetti = () => {
    soundFX.playWarp();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#6366F1', '#EC4899', '#10B981']
    });
  };

  const triggerSideCannons = () => {
    soundFX.playSuccess();
    const end = Date.now() + 1000;
    const colors = ['#FFD700', '#E5E7EB', '#CD7F32', '#6366F1', '#38BDF8'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const toggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };

  const copyAnnouncement = () => {
    soundFX.playClick();
    const text = `🏆 GENESIZ 2026 — GRAND WINNERS ANNOUNCEMENT! 🔥🎉

The competition has come to an end, and it's time to celebrate the teams that conquered their respective events! From cracking cryptic clues to solving coding challenges and dominating the battlefield, these teams proved their skills and earned their places at the top! 🚀

━━━━━━━━━━━━━━━━━━

🧠 BRAINBYTE
🥇 1st Place — SYMPHONISERS
🥈 2nd Place — AADI GOEL DPS

🔐 CRYPTIC HUNT
🥇 1st Place — SYMPHONISERS
🥈 2nd Place — ProjectBeta
🥉 3rd Place — Hellfire-Club

💻 ALGOARENA
🥇 1st Place — SYMPHONISERS
🥈 2nd Place — Frostie

🌐 WEBX
🥇 1st Place — CORE
🥈 2nd Place — SYMPHONISERS
🥉 3rd Place — AAYUSH SQUAD

📱 APPFORGE
🥇 1st Place — SYMPHONISERS

🎭 SURPRISE
🥇 1st Place — Symphonisers
🥈 2nd Place — Hellfire-Club

🎮 VALORANT CHAMPIONSHIP
🥇 1st Place — Paper Rex
🥈 2nd Place — DPSRKP
🥉 3rd Place — Paradigm

⚔️ BEDWARZ
🥇 1st Place — DPSRKP
🥈 2nd Place — YYY
🥉 3rd Place — CORE

━━━━━━━━━━━━━━━━━━

❤️🔥 A HUGE CONGRATULATIONS TO ALL OUR WINNERS!

A special shoutout to SYMPHONISERS for their phenomenal performance across multiple events! 🏆🔥

To every participant and team, thank you for bringing your talent, creativity, enthusiasm, and competitive spirit to GENESIZ 2026. You made this competition truly memorable!

The hunt is over, the matches are done, and the winners have been crowned. Until next time, keep building, keep solving, and keep competing! 🚀

GGs, EVERYONE! 🎉👏

— Team GENESIZ ❤️`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const eventResults: EventResult[] = [
    {
      id: 'brainbyte',
      name: 'BRAINBYTE',
      category: 'code',
      categoryLabel: 'Tech & Logic Quiz',
      icon: <Terminal className="w-5 h-5" />,
      accent: 'from-cyan-400 to-blue-500',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      bgGlow: 'bg-cyan-500/10',
      borderAccent: 'border-cyan-500/30',
      description: 'Rapid-fire computational puzzles, algorithmic trivia, and CS fundamentals.',
      winners: [
        { rank: 1, team: 'SYMPHONISERS', note: 'Flawless logic mastery' },
        { rank: 2, team: 'AADI GOEL DPS', note: 'Outstanding runner-up' }
      ]
    },
    {
      id: 'cryptic-hunt',
      name: 'CRYPTIC HUNT',
      category: 'security',
      categoryLabel: 'CipherQuest / OSINT',
      icon: <Lock className="w-5 h-5" />,
      accent: 'from-emerald-400 to-teal-500',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      bgGlow: 'bg-emerald-500/10',
      borderAccent: 'border-emerald-500/30',
      description: 'Multi-layer steganography, audio spectrograms, forensics & dead-drop decoding.',
      winners: [
        { rank: 1, team: 'SYMPHONISERS', note: 'First to break all vault ciphers' },
        { rank: 2, team: 'ProjectBeta', note: 'Rapid key recovery' },
        { rank: 3, team: 'Hellfire-Club', note: 'Relentless cryptanalysis' }
      ]
    },
    {
      id: 'algoarena',
      name: 'ALGOARENA',
      category: 'code',
      categoryLabel: 'Competitive Programming',
      icon: <Code2 className="w-5 h-5" />,
      accent: 'from-blue-400 to-indigo-500',
      glow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
      bgGlow: 'bg-indigo-500/10',
      borderAccent: 'border-indigo-500/30',
      description: 'High-speed algorithmic problem solving, dynamic programming and edge-case execution.',
      winners: [
        { rank: 1, team: 'SYMPHONISERS', note: 'Perfect score submission' },
        { rank: 2, team: 'Frostie', note: 'Speed benchmark runner-up' }
      ]
    },
    {
      id: 'webx',
      name: 'WEBX',
      category: 'code',
      categoryLabel: 'The Impossible Interface',
      icon: <Globe className="w-5 h-5" />,
      accent: 'from-violet-400 to-purple-500',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      bgGlow: 'bg-purple-500/10',
      borderAccent: 'border-purple-500/30',
      description: 'Building living websites that deconstruct and reconstruct their UI dynamically.',
      winners: [
        { rank: 1, team: 'CORE', note: 'Groundbreaking evolutionary UI architecture' },
        { rank: 2, team: 'SYMPHONISERS', note: 'Exceptional UX adaptation engine' },
        { rank: 3, team: 'AAYUSH SQUAD', note: 'High aesthetic & technical polish' }
      ]
    },
    {
      id: 'appforge',
      name: 'APPFORGE',
      category: 'code',
      categoryLabel: 'Mobile App Innovation',
      icon: <Smartphone className="w-5 h-5" />,
      accent: 'from-pink-400 to-rose-500',
      glow: 'shadow-[0_0_25px_rgba(236,72,153,0.25)]',
      bgGlow: 'bg-pink-500/10',
      borderAccent: 'border-pink-500/30',
      description: 'Product-ready mobile engineering, seamless UX flows, and robust architecture.',
      winners: [
        { rank: 1, team: 'SYMPHONISERS', note: 'Champion product prototype' }
      ]
    },
    {
      id: 'surprise',
      name: 'SURPRISE',
      category: 'creative',
      categoryLabel: 'Operation Chaos Scavenger',
      icon: <Zap className="w-5 h-5" />,
      accent: 'from-amber-400 to-orange-500',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      bgGlow: 'bg-amber-500/10',
      borderAccent: 'border-amber-500/30',
      description: 'Street-level live reconnaissance, rapid IRL challenge completion and chaotic fun.',
      winners: [
        { rank: 1, team: 'Symphonisers', note: 'Ultimate chaos commanders' },
        { rank: 2, team: 'Hellfire-Club', note: 'Exceptional mission clearance' }
      ]
    },
    {
      id: 'valorant',
      name: 'VALORANT CHAMPIONSHIP',
      category: 'esports',
      categoryLabel: 'Tactical FPS Esports',
      icon: <Gamepad2 className="w-5 h-5" />,
      accent: 'from-red-400 to-rose-600',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      bgGlow: 'bg-red-500/10',
      borderAccent: 'border-red-500/30',
      description: '5v5 tactical shooter tournament with high-stakes clutch rounds and site executions.',
      winners: [
        { rank: 1, team: 'Paper Rex', note: 'Undefeated tournament champions' },
        { rank: 2, team: 'DPSRKP', note: 'Grand finals runner-up' },
        { rank: 3, team: 'Paradigm', note: 'Bronze bracket winners' }
      ]
    },
    {
      id: 'bedwarz',
      name: 'BEDWARZ',
      category: 'esports',
      categoryLabel: 'Minecraft Tactical Battle',
      icon: <Swords className="w-5 h-5" />,
      accent: 'from-yellow-400 to-amber-600',
      glow: 'shadow-[0_0_25px_rgba(234,179,8,0.25)]',
      bgGlow: 'bg-yellow-500/10',
      borderAccent: 'border-yellow-500/30',
      description: 'Fast-paced bed defense, aggressive bridging rushes, and final kill team tactics.',
      winners: [
        { rank: 1, team: 'DPSRKP', note: 'Flawless bed breaks and map control' },
        { rank: 2, team: 'YYY', note: 'Relentless defense & rush mechanics' },
        { rank: 3, team: 'CORE', note: 'Podium clutch finish' }
      ]
    }
  ];

  const overallTally = [
    { team: 'SYMPHONISERS', gold: 5, silver: 1, bronze: 0, total: 6, tag: 'Overall Champions' },
    { team: 'DPSRKP', gold: 1, silver: 1, bronze: 0, total: 2, tag: 'Dual Finalists' },
    { team: 'CORE', gold: 1, silver: 0, bronze: 1, total: 2, tag: 'WebX Champions' },
    { team: 'Paper Rex', gold: 1, silver: 0, bronze: 0, total: 1, tag: 'Valorant Champions' },
    { team: 'Hellfire-Club', gold: 0, silver: 1, bronze: 1, total: 2, tag: 'Dual Medalists' },
    { team: 'AADI GOEL DPS', gold: 0, silver: 1, bronze: 0, total: 1, tag: 'BrainByte Silver' },
    { team: 'ProjectBeta', gold: 0, silver: 1, bronze: 0, total: 1, tag: 'Cryptic Silver' },
    { team: 'Frostie', gold: 0, silver: 1, bronze: 0, total: 1, tag: 'AlgoArena Silver' },
    { team: 'YYY', gold: 0, silver: 1, bronze: 0, total: 1, tag: 'Bedwarz Silver' },
    { team: 'AAYUSH SQUAD', gold: 0, silver: 0, bronze: 1, total: 1, tag: 'WebX Bronze' },
    { team: 'Paradigm', gold: 0, silver: 0, bronze: 1, total: 1, tag: 'Valorant Bronze' },
  ];

  const filteredEvents = activeTab === 'all' 
    ? eventResults 
    : eventResults.filter(e => e.category === activeTab);

  const getRankBadge = (rank: 1 | 2 | 3) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-xs font-mono shadow-[0_0_12px_rgba(245,158,11,0.4)]">
          <Crown className="w-3.5 h-3.5 text-yellow-300" />
          <span>1ST PLACE</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-slate-300/10 via-zinc-200/20 to-slate-300/10 border border-zinc-400/50 text-zinc-200 font-bold text-xs font-mono shadow-[0_0_10px_rgba(228,228,231,0.25)]">
          <Medal className="w-3.5 h-3.5 text-zinc-300" />
          <span>2ND PLACE</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-700/20 via-amber-600/30 to-amber-700/20 border border-amber-600/50 text-amber-400 font-bold text-xs font-mono shadow-[0_0_10px_rgba(217,119,6,0.25)]">
        <Trophy className="w-3.5 h-3.5 text-amber-500" />
        <span>3RD PLACE</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#040406] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* Precision Tech Grid Texture Overlay */}
      <div className="fixed inset-0 bg-tech-grid opacity-20 pointer-events-none z-0"></div>

      {/* Atmospheric Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/15 via-violet-600/10 to-transparent blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-indigo-600/10 blur-[150px] pointer-events-none z-0"></div>

      {/* Top Floating Header */}
      <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-2xl bg-[#060609]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portal</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
              <img src={genesizLogo} alt="GENESIZ" className="h-5 w-auto object-contain" />
              <span className="text-[11px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                2K26 EDITION
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
            </button>

            <button
              onClick={triggerConfetti}
              className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <PartyPopper className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span className="hidden sm:inline">Celebrate</span>
            </button>

            <button
              onClick={copyAnnouncement}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Page Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 space-y-16">
        
        {/* Hero Banner */}
        <section className="text-center space-y-6 pt-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/20 to-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.25)] animate-pulse">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>GENESIZ 2K26 OFFICIAL RESULTS ANNOUNCED</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-white">GRAND WINNERS </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                CEREMONY
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
              NATIONAL INTER-SCHOOL & COLLEGE TECH SYMPOSIUM • 2026 EDITION
            </p>
          </div>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            The competition has come to an end, and it's time to celebrate the teams that conquered their respective events! From cracking cryptic clues to solving coding challenges and dominating the battlefield, these teams proved their skills and earned their places at the top! 🚀
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="#winners-grid"
              onClick={() => soundFX.playClick()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>Explore All Events</span>
            </a>

            <a 
              href="#mvp-spotlight"
              onClick={() => soundFX.playClick()}
              className="px-5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-200 text-xs font-mono font-bold flex items-center gap-2 transition-all"
            >
              <Crown className="w-4 h-4 text-yellow-400" />
              <span>MVP Champions</span>
            </a>

            <button
              onClick={triggerSideCannons}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fire Cannons</span>
            </button>
          </div>

        </section>

        {/* MVP Spotlight Banner: SYMPHONISERS */}
        <section id="mvp-spotlight" className="relative">
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-amber-500/15 via-[#0d0d12] to-yellow-500/10 border-2 border-amber-400/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] overflow-hidden">
            
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                  <span>OVERALL TOURNAMENT DOMINATORS • 2K26</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center lg:justify-start gap-3">
                    <span>SYMPHONISERS</span>
                    <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </h2>
                  <p className="text-sm sm:text-base font-mono text-amber-300/90 font-medium">
                    Phenomenal multisport sweep across technical, creative & cryptic disciplines
                  </p>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  A special shoutout to <strong className="text-white">SYMPHONISERS</strong> for their phenomenal performance across multiple events! Taking home <span className="text-amber-300 font-bold">5 Gold First-Place Titles</span> (BrainByte, Cryptic Hunt, AlgoArena, AppForge, Surprise) and <span className="text-zinc-200 font-bold">1 Silver Medal</span> in WebX! 🏆🔥
                </p>
              </div>

              {/* Medals Showcase Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
                
                <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/30 text-center space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">5× 🥇</div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Gold Podiums</div>
                  <div className="text-[10px] text-zinc-500">BB, CH, AA, AF, SUR</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-500/30 text-center space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-zinc-300 font-mono">1× 🥈</div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Silver Medal</div>
                  <div className="text-[10px] text-zinc-500">WebX Finalist</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-400/40 text-center space-y-1 col-span-2 sm:col-span-1">
                  <div className="text-xl sm:text-2xl font-black text-yellow-300 font-mono">6 TOTAL</div>
                  <div className="text-[11px] font-mono text-amber-400 uppercase font-bold">Podium Finishes</div>
                  <div className="text-[10px] text-amber-400/70">#1 on Leaderboard</div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Overall Leaderboard / Medal Tally */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>OFFICIAL PODIUM STANDINGS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                2K26 Medal Tally Overview
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Ranked by Gold Medals, Silver, then Total Podiums
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#07070b]/90 shadow-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 text-center w-12">#</th>
                  <th className="py-3 px-4">Squad / Contingent</th>
                  <th className="py-3 px-3 text-center">🥇 Gold</th>
                  <th className="py-3 px-3 text-center">🥈 Silver</th>
                  <th className="py-3 px-3 text-center">🥉 Bronze</th>
                  <th className="py-3 px-4 text-center font-bold text-white">Total Podiums</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Key Distinction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {overallTally.map((entry, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <tr 
                      key={entry.team}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isFirst ? 'bg-amber-500/[0.06] font-semibold text-amber-200' : 'text-zinc-300'
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-bold">
                        {isFirst ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-yellow-400 text-xs border border-amber-400/40">
                            1
                          </span>
                        ) : (
                          <span className="text-zinc-500">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        {isFirst && <Crown className="w-4 h-4 text-yellow-400 shrink-0" />}
                        <span>{entry.team}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-amber-400">
                        {entry.gold > 0 ? `${entry.gold}` : '—'}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-zinc-300">
                        {entry.silver > 0 ? `${entry.silver}` : '—'}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-amber-600">
                        {entry.bronze > 0 ? `${entry.bronze}` : '—'}
                      </td>
                      <td className="py-3 px-4 text-center font-extrabold text-white">
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                          {entry.total}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-xs hidden sm:table-cell">
                        {entry.tag}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Event Disciplines Filter & Grid */}
        <section id="winners-grid" className="space-y-8 pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span>DISCIPLINE BREAKDOWN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Event-By-Event Winners (2K26)
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs font-mono">
              <button
                onClick={() => { soundFX.playClick(); setActiveTab('all'); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'all' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Events ({eventResults.length})
              </button>
              <button
                onClick={() => { soundFX.playClick(); setActiveTab('code'); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'code' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Coding & Dev (3)
              </button>
              <button
                onClick={() => { soundFX.playClick(); setActiveTab('security'); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'security' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Hunt & Ciphers (1)
              </button>
              <button
                onClick={() => { soundFX.playClick(); setActiveTab('esports'); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'esports' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Esports (2)
              </button>
              <button
                onClick={() => { soundFX.playClick(); setActiveTab('creative'); }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'creative' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Special / Chaos (2)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((evt) => {
              return (
                <div 
                  key={evt.id}
                  className={`relative rounded-3xl p-6 sm:p-7 bg-[#08080d]/90 border ${evt.borderAccent} ${evt.glow} transition-all duration-300 hover:border-white/30 flex flex-col justify-between group overflow-hidden`}
                >
                  {/* Event Background Accent */}
                  <div className={`absolute top-0 right-0 w-48 h-48 ${evt.bgGlow} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

                  <div className="space-y-5 relative z-10">
                    
                    {/* Event Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`p-2 rounded-xl bg-white/5 border border-white/10 text-white`}>
                            {evt.icon}
                          </span>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-semibold">
                              {evt.categoryLabel}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                              {evt.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 uppercase">
                        2K26 Podium
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Winners List */}
                    <div className="space-y-2.5 pt-2">
                      {evt.winners.map((w) => {
                        const isGold = w.rank === 1;
                        const isSilver = w.rank === 2;
                        return (
                          <div 
                            key={`${evt.id}-${w.rank}-${w.team}`}
                            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isGold 
                                ? 'bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border-amber-500/40 shadow-sm' 
                                : isSilver 
                                ? 'bg-white/[0.03] border-zinc-500/30' 
                                : 'bg-white/[0.02] border-amber-700/30'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-base sm:text-lg shrink-0">
                                {w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'}
                              </span>
                              <div className="min-w-0">
                                <div className="font-bold text-sm sm:text-base text-white truncate flex items-center gap-1.5">
                                  <span>{w.team}</span>
                                  {isGold && <Crown className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                                </div>
                                {w.note && (
                                  <div className="text-[11px] font-mono text-zinc-400 truncate">
                                    {w.note}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0">
                              {getRankBadge(w.rank)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Verified by Judging Panel</span>
                    <span className="text-zinc-400">Status: Final Official</span>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* Grand Final Congratulations & Letter from Organizers */}
        <section className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0c0c14] via-[#08080c] to-[#040406] border border-white/10 shadow-2xl text-center space-y-6 overflow-hidden">
          
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-xs font-bold tracking-widest uppercase">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>HEARTFELT ACKNOWLEDGMENT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            A HUGE CONGRATULATIONS TO ALL OUR WINNERS! ❤️🔥
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
            <p>
              To every participant, team mentor, and school contingent: <strong>thank you</strong> for bringing your relentless talent, creativity, enthusiasm, and competitive spirit to <strong>GENESIZ 2026</strong>. You made this competition truly unforgettable!
            </p>
            <p className="font-mono text-zinc-400 text-xs">
              The hunt is over, the matches are done, and the winners have been crowned. Until next time, keep building, keep solving, and keep competing! 🚀
            </p>
          </div>

          <div className="pt-2">
            <div className="inline-block p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="text-base sm:text-lg font-black text-amber-300 font-mono tracking-wider">
                GGs, EVERYONE! 🎉👏
              </div>
              <div className="text-xs font-mono text-zinc-400">
                — Team GENESIZ ❤️
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              onClick={() => soundFX.playClick()}
              className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Portal</span>
            </a>

            <button
              onClick={copyAnnouncement}
              className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4 text-zinc-300" />
              <span>{copied ? 'Announcement Copied!' : 'Copy Shareable Results'}</span>
            </button>

            <a
              href="https://discord.gg/narNSeybgR"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/50 text-indigo-200 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Discord HQ</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-300" />
            </a>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 text-center text-xs font-mono text-zinc-600 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={genesizLogo} alt="GENESIZ" className="h-5 w-auto object-contain opacity-70" />
            <span>GENESIZ 2026 OFFICIAL RESULTS PORTAL</span>
          </div>
          <div>
            © 2026 GENESIZ. Conceived & Powered by Valenite Electrion.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default ResultsPage;
