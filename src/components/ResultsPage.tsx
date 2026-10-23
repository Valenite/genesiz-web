import React, { useState, useEffect } from 'react';
import {
  Trophy,
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
  Zap,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import genesizLogo from '../assets/genesiz-logo-transparent.png';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Winner {
  rank: 1 | 2 | 3;
  team: string;
}

interface EventResult {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  icon: React.ReactNode;
  accent: string;          // Tailwind gradient classes
  accentBorder: string;    // border colour
  accentText: string;      // text colour
  accentBg: string;        // subtle bg tint
  winners: Winner[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const EVENTS: EventResult[] = [
  {
    id: 'brainbyte',
    name: 'BRAINBYTE',
    emoji: '🧠',
    tagline: 'Tech & Logic Quiz',
    icon: <Terminal className="w-4 h-4" />,
    accent: 'from-cyan-400 to-blue-500',
    accentBorder: 'border-cyan-500/40',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/8',
    winners: [
      { rank: 1, team: 'SYMPHONISERS' },
      { rank: 2, team: 'AADI GOEL DPS' },
    ],
  },
  {
    id: 'cryptic',
    name: 'CRYPTIC HUNT',
    emoji: '🔐',
    tagline: 'CipherQuest & OSINT',
    icon: <Lock className="w-4 h-4" />,
    accent: 'from-emerald-400 to-teal-500',
    accentBorder: 'border-emerald-500/40',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/8',
    winners: [
      { rank: 1, team: 'SYMPHONISERS' },
      { rank: 2, team: 'ProjectBeta' },
      { rank: 3, team: 'Hellfire-Club' },
    ],
  },
  {
    id: 'algoarena',
    name: 'ALGOARENA',
    emoji: '💻',
    tagline: 'Competitive Programming',
    icon: <Code2 className="w-4 h-4" />,
    accent: 'from-violet-400 to-indigo-500',
    accentBorder: 'border-violet-500/40',
    accentText: 'text-violet-400',
    accentBg: 'bg-violet-500/8',
    winners: [
      { rank: 1, team: 'SYMPHONISERS' },
      { rank: 2, team: 'Frostie' },
    ],
  },
  {
    id: 'webx',
    name: 'WEBX',
    emoji: '🌐',
    tagline: 'The Impossible Interface',
    icon: <Globe className="w-4 h-4" />,
    accent: 'from-fuchsia-400 to-purple-500',
    accentBorder: 'border-fuchsia-500/40',
    accentText: 'text-fuchsia-400',
    accentBg: 'bg-fuchsia-500/8',
    winners: [
      { rank: 1, team: 'CORE' },
      { rank: 2, team: 'SYMPHONISERS' },
      { rank: 3, team: 'AAYUSH SQUAD' },
    ],
  },
  {
    id: 'appforge',
    name: 'APPFORGE',
    emoji: '📱',
    tagline: 'Mobile App Innovation',
    icon: <Smartphone className="w-4 h-4" />,
    accent: 'from-rose-400 to-pink-500',
    accentBorder: 'border-rose-500/40',
    accentText: 'text-rose-400',
    accentBg: 'bg-rose-500/8',
    winners: [
      { rank: 1, team: 'SYMPHONISERS' },
    ],
  },
  {
    id: 'surprise',
    name: 'SURPRISE',
    emoji: '🎭',
    tagline: 'Operation Chaos',
    icon: <Zap className="w-4 h-4" />,
    accent: 'from-amber-400 to-orange-500',
    accentBorder: 'border-amber-500/40',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/8',
    winners: [
      { rank: 1, team: 'Symphonisers' },
      { rank: 2, team: 'Hellfire-Club' },
    ],
  },
  {
    id: 'valorant',
    name: 'VALORANT',
    emoji: '🎮',
    tagline: 'Tactical FPS Championship',
    icon: <Gamepad2 className="w-4 h-4" />,
    accent: 'from-red-400 to-rose-600',
    accentBorder: 'border-red-500/40',
    accentText: 'text-red-400',
    accentBg: 'bg-red-500/8',
    winners: [
      { rank: 1, team: 'Paper Rex' },
      { rank: 2, team: 'DPSRKP' },
      { rank: 3, team: 'Paradigm' },
    ],
  },
  {
    id: 'bedwarz',
    name: 'BEDWARZ',
    emoji: '⚔️',
    tagline: 'Minecraft Tactical Battle',
    icon: <Swords className="w-4 h-4" />,
    accent: 'from-yellow-400 to-amber-500',
    accentBorder: 'border-yellow-500/40',
    accentText: 'text-yellow-400',
    accentBg: 'bg-yellow-500/8',
    winners: [
      { rank: 1, team: 'DPSRKP' },
      { rank: 2, team: 'YYY' },
      { rank: 3, team: 'CORE' },
    ],
  },
];

const ANNOUNCEMENT = `🏆 GENESIZ 2026 — GRAND WINNERS ANNOUNCEMENT! 🔥🎉

The competition has come to an end, and it's time to celebrate the teams that conquered their respective events! 🚀

━━━━━━━━━━━━━━━━━━

🧠 BRAINBYTE
🏆 1st Place — SYMPHONISERS
🏆 2nd Place — AADI GOEL DPS

🔐 CRYPTIC HUNT
🏆 1st Place — SYMPHONISERS
🏆 2nd Place — ProjectBeta
🏆 3rd Place — Hellfire-Club

💻 ALGOARENA
🏆 1st Place — SYMPHONISERS
🏆 2nd Place — Frostie

🌐 WEBX
🏆 1st Place — CORE
🏆 2nd Place — SYMPHONISERS
🏆 3rd Place — AAYUSH SQUAD

📱 APPFORGE
🏆 1st Place — SYMPHONISERS

🎭 SURPRISE
🏆 1st Place — Symphonisers
🏆 2nd Place — Hellfire-Club

🎮 VALORANT CHAMPIONSHIP
🏆 1st Place — Paper Rex
🏆 2nd Place — DPSRKP
🏆 3rd Place — Paradigm

⚔️ BEDWARZ
🏆 1st Place — DPSRKP
🏆 2nd Place — YYY
🏆 3rd Place — CORE

━━━━━━━━━━━━━━━━━━

❤️🔥 A HUGE CONGRATULATIONS TO ALL OUR WINNERS!

Special shoutout to SYMPHONISERS for their phenomenal sweep across multiple events! 🏆🔥

GGs, EVERYONE! 🎉👏 — Team GENESIZ ❤️`;

// ─── Helper Components ────────────────────────────────────────────────────────

const RankRow: React.FC<{ winner: Winner; accentText: string }> = ({
  winner, accentText,
}) => {
  const isFirst  = winner.rank === 1;
  const isSecond = winner.rank === 2;

  const rowBg    = isFirst  ? 'bg-amber-500/10 border-amber-500/50'
                 : isSecond ? 'bg-white/[0.04] border-white/10'
                 :            'bg-white/[0.02] border-white/[0.06]';

  const teamColor = isFirst ? 'text-white' : isSecond ? 'text-zinc-100' : 'text-zinc-300';

  const label    = isFirst ? '1st Place' : isSecond ? '2nd Place' : '3rd Place';
  const labelClr = isFirst ? 'text-amber-300 bg-amber-500/20 border-amber-400/40'
                 : isSecond ? 'text-zinc-300 bg-white/8 border-white/15'
                 :            'text-zinc-400 bg-white/5 border-white/10';

  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border ${rowBg} transition-all`}>
      <div className="flex items-center gap-3 min-w-0">
        {/* Trophy icon */}
        <span className={`shrink-0 ${isFirst ? accentText : isSecond ? 'text-zinc-400' : 'text-zinc-500'}`}>
          <Trophy className="w-4 h-4" />
        </span>
        {/* Team name */}
        <span className={`font-bold text-sm truncate font-mono tracking-wide ${teamColor}`}>
          {winner.team}
        </span>
        {isFirst && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
      </div>
      {/* Rank pill */}
      <span className={`shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest ${labelClr}`}>
        {label}
      </span>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ResultsPage() {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  useEffect(() => {
    document.title = '🏆 GENESIZ 2026 — Results';
    window.scrollTo(0, 0);

    const t1 = setTimeout(shoot, 500);
    const t2 = setTimeout(sideCannons, 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const shoot = () => {
    soundFX.playWarp();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 },
      colors: ['#FFD700', '#FFA500', '#ffffff', '#6366F1', '#EC4899', '#10B981'] });
  };

  const sideCannons = () => {
    soundFX.playSuccess();
    const end = Date.now() + 1200;
    const colors = ['#FFD700', '#E5E7EB', '#6366F1', '#38BDF8'];
    (function frame() {
      confetti({ particleCount: 5, angle: 60,  spread: 50, origin: { x: 0, y: 0.75 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 50, origin: { x: 1, y: 0.75 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const toggleAudio = () => {
    const m = soundFX.toggleMute();
    setIsMuted(m);
    if (!m) soundFX.playClick();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ANNOUNCEMENT).then(() => {
      setCopied(true);
      soundFX.playSuccess();
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#040406] text-zinc-100 font-sans selection:bg-amber-500/80 selection:text-black relative overflow-x-hidden">

      {/* ── Grid texture ── */}
      <div className="fixed inset-0 bg-tech-grid opacity-[0.18] pointer-events-none z-0" />

      {/* ── Ambient glows ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px]
                      bg-gradient-to-b from-amber-500/12 via-violet-600/8 to-transparent
                      blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[350px]
                      bg-indigo-700/8 blur-[140px] pointer-events-none z-0" />

      {/* ══════════════════════════════════════ HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07]
                         bg-[#040406]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5
                        flex items-center justify-between">

          {/* Left: back + logo */}
          <div className="flex items-center gap-4">
            <a href="/" onClick={() => soundFX.playClick()}
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                          bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                          text-xs font-mono text-zinc-400 hover:text-white transition-all group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-4">
              <img src={genesizLogo} alt="GENESIZ" className="h-5 w-auto object-contain" />
              <span className="text-[11px] font-mono font-bold tracking-wider
                               text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full
                               border border-amber-500/25">
                2K26 RESULTS
              </span>
            </div>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            <button onClick={toggleAudio}
                    className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
              {isMuted
                ? <VolumeX className="w-4 h-4" />
                : <Volume2 className="w-4 h-4 text-zinc-300" />}
            </button>

            <button onClick={shoot}
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                               bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30
                               text-amber-300 hover:text-amber-200 text-xs font-mono font-bold
                               transition-all cursor-pointer">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Celebrate</span>
            </button>

            <button onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full
                               bg-white hover:bg-zinc-200 text-black
                               text-xs font-mono font-bold transition-all shadow cursor-pointer">
              {copied
                ? <><Check className="w-3.5 h-3.5 text-emerald-600" /><span>Copied!</span></>
                : <><Copy className="w-3.5 h-3.5" /><span>Copy Announcement</span></>}
            </button>
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════════ MAIN */}
      <main className="relative z-10 max-w-6xl mx-auto
                       px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-32 space-y-20">

        {/* ── HERO ── */}
        <section className="text-center space-y-7">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-amber-500/10 border border-amber-400/30
                          text-amber-300 text-[11px] font-mono font-bold tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            GENESIZ 2K26 · OFFICIAL RESULTS ANNOUNCEMENT
          </div>

          {/* Floating logo */}
          <div className="flex justify-center py-2">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />
              <img src={genesizLogo} alt="GENESIZ"
                   className="h-24 sm:h-32 w-auto object-contain select-none
                              drop-shadow-[0_0_30px_rgba(255,200,60,0.35)]" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
              <span className="text-gradient-silver">GRAND</span>{' '}
              <span className="text-transparent bg-clip-text
                               bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                WINNERS
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-[0.2em]">
              NATIONAL TECH SYMPOSIUM · 2026 EDITION
            </p>
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            The competition has come to an end. From cracking cryptic clues to solving coding challenges
            and dominating the battlefield — these teams proved their skills and earned their place on the podium.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a href="#events" onClick={() => soundFX.playClick()}
               className="px-6 py-2.5 rounded-full font-bold text-xs font-mono uppercase tracking-wider
                          bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300
                          text-black flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)]
                          transition-all hover:scale-105">
              <Trophy className="w-4 h-4" />
              See All Winners
            </a>
            <a href="#mvp" onClick={() => soundFX.playClick()}
               className="px-6 py-2.5 rounded-full font-bold text-xs font-mono uppercase tracking-wider
                          bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                          text-zinc-200 flex items-center gap-2 transition-all">
              <Crown className="w-4 h-4 text-amber-400" />
              MVP Spotlight
            </a>
          </div>

        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── MVP SPOTLIGHT ── */}
        <section id="mvp">
          <div className="relative rounded-3xl overflow-hidden
                          border-2 border-amber-400/30
                          bg-gradient-to-br from-amber-500/10 via-[#0a0a10] to-[#040406]
                          shadow-[0_0_60px_-10px_rgba(245,158,11,0.25)]">

            {/* Background shimmer */}
            <div className="absolute inset-0 shimmer-border opacity-30 pointer-events-none" />

            {/* Glow blobs */}
            <div className="absolute -top-10 -right-10 w-72 h-72
                            bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72
                            bg-yellow-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-7 sm:p-10 lg:p-12">

              {/* Top label */}
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Tournament Dominators · 2K26
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                {/* Text */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white
                                 flex items-center gap-4 flex-wrap">
                    SYMPHONISERS
                    <Crown className="w-9 h-9 text-yellow-400
                                     drop-shadow-[0_0_16px_rgba(250,204,21,0.7)]" />
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
                    A special shoutout to <strong className="text-white">SYMPHONISERS</strong> for their
                    phenomenal performance across multiple events — taking home{' '}
                    <span className="text-amber-300 font-bold">5 First-Place Trophies</span> and
                    additional podium finishes. Truly unstoppable. 🔥
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['BrainByte 🏆', 'Cryptic Hunt 🏆', 'AlgoArena 🏆', 'AppForge 🏆', 'Surprise 🏆', 'WebX 🥈'].map(tag => (
                      <span key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-full
                                       bg-amber-500/10 border border-amber-400/20 text-amber-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="w-full lg:w-auto shrink-0 grid grid-cols-3 gap-3">
                  {[
                    { n: '5', sub: '1st Place', detail: 'Trophies' },
                    { n: '1', sub: '2nd Place', detail: 'Trophy' },
                    { n: '6', sub: 'Total', detail: 'Podiums' },
                  ].map(({ n, sub, detail }) => (
                    <div key={sub}
                         className="p-4 sm:p-5 rounded-2xl text-center
                                    bg-black/50 border border-amber-500/20 space-y-0.5">
                      <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono leading-none">
                        {n}
                      </div>
                      <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wide">
                        {sub}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {detail}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── EVENT CARDS ── */}
        <section id="events" className="space-y-8">

          {/* Section heading */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                All 8 Disciplines
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Event-By-Event Results
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {EVENTS.map((evt) => (
              <div key={evt.id}
                   className={`group relative rounded-3xl overflow-hidden
                               bg-[#07070c]/90 border ${evt.accentBorder}
                               hover:border-white/20 transition-all duration-300
                               flex flex-col`}>

                {/* Glow blob */}
                <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl
                                 pointer-events-none ${evt.accentBg}
                                 group-hover:scale-150 transition-transform duration-500 opacity-60`} />

                <div className="relative z-10 flex flex-col h-full p-5 sm:p-6">

                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="space-y-1">
                      {/* Category pill */}
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono
                                       font-bold uppercase tracking-widest px-2.5 py-1 rounded-full
                                       border ${evt.accentBorder} ${evt.accentText} ${evt.accentBg}`}>
                        {evt.icon}
                        <span>{evt.tagline}</span>
                      </div>
                      {/* Event name */}
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <span>{evt.emoji}</span>
                        <span>{evt.name}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Winners */}
                  <div className="space-y-2 flex-1">
                    {evt.winners.map((w) => (
                      <RankRow
                        key={w.rank}
                        winner={w}
                        accentText={evt.accentText}
                      />
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-white/[0.05]
                                  flex items-center justify-between text-[10px] font-mono text-zinc-600">
                    <span>GENESIZ 2K26</span>
                    <span className={`${evt.accentText} font-semibold`}>Official Podium</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING ── */}
        <section className="relative rounded-3xl overflow-hidden text-center
                            border border-white/8 bg-[#06060a]/90
                            p-10 sm:p-14 space-y-6">

          <div className="absolute inset-0 bg-gradient-to-br
                          from-indigo-500/5 via-transparent to-amber-500/5
                          pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Congratulations to All Winners! ❤️🔥
            </h2>

            <p className="max-w-2xl mx-auto text-sm text-zinc-400 leading-relaxed">
              To every participant, team mentor, and school contingent — thank you for bringing your
              talent, creativity, enthusiasm, and competitive spirit to <strong className="text-white">GENESIZ 2026</strong>.
              You made this unforgettable.
            </p>

            <p className="text-xs font-mono text-zinc-500">
              The hunt is over, the matches are done, and the winners have been crowned.
              Until next time — keep building, keep solving, keep competing! 🚀
            </p>

            {/* Sign-off card */}
            <div className="inline-block px-7 py-4 rounded-2xl
                            bg-white/[0.03] border border-white/8 space-y-0.5 mx-auto">
              <div className="text-lg sm:text-2xl font-black text-amber-300 font-mono">
                GGs, EVERYONE! 🎉👏
              </div>
              <div className="text-xs font-mono text-zinc-500">
                — Team GENESIZ ❤️
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a href="/" onClick={() => soundFX.playClick()}
                 className="px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-black
                            font-bold text-xs font-mono uppercase tracking-wider
                            flex items-center gap-2 shadow-lg transition-all hover:scale-105">
                <ArrowLeft className="w-4 h-4" />
                Back to Portal
              </a>

              <button onClick={handleCopy}
                      className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800
                                 border border-white/12 hover:border-white/20 text-white
                                 font-bold text-xs font-mono uppercase tracking-wider
                                 flex items-center gap-2 transition-all cursor-pointer">
                <Copy className="w-4 h-4 text-zinc-400" />
                {copied ? 'Copied!' : 'Copy Results'}
              </button>

              <a href="https://discord.gg/narNSeybgR" target="_blank" rel="noreferrer"
                 onClick={() => soundFX.playClick()}
                 className="px-6 py-3 rounded-full bg-[#5865F2]/15 hover:bg-[#5865F2]/25
                            border border-[#5865F2]/40 text-indigo-200 hover:text-white
                            font-bold text-xs font-mono uppercase tracking-wider
                            flex items-center gap-2 transition-all">
                Discord HQ
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900/80 py-7 px-4 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-[11px] font-mono text-zinc-600">
          <div className="flex items-center gap-2">
            <img src={genesizLogo} alt="" className="h-4 w-auto object-contain opacity-50" />
            <span>GENESIZ 2026 — OFFICIAL RESULTS</span>
          </div>
          <span>© 2026 GENESIZ. Powered by Valenite Electrion.</span>
        </div>
      </footer>

    </div>
  );
}

export default ResultsPage;
