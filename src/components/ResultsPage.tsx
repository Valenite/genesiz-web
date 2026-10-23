import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Crown,
  Sparkles,
  Star,
  ArrowLeft,
  Volume2,
  VolumeX,
  Code2,
  Lock,
  Terminal,
  Globe,
  Smartphone,
  Gamepad2,
  Swords,
  Zap,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import genesizLogo from '../assets/genesiz-logo-transparent.png';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function fadeUp(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  };
}

function scalePop(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'scale(1)' : 'scale(0.88)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Winner { rank: 1 | 2 | 3; team: string; }
interface EventResult {
  id: string; name: string; emoji: string; tagline: string;
  icon: React.ReactNode; accentBorder: string; accentText: string; accentBg: string;
  glow: string;
  winners: Winner[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EVENTS: EventResult[] = [
  {
    id: 'brainbyte', name: 'BRAINBYTE', emoji: '🧠', tagline: 'Tech & Logic',
    icon: <Terminal className="w-3.5 h-3.5" />,
    accentBorder: 'border-sky-500/35', accentText: 'text-sky-400', accentBg: 'bg-sky-500/8',
    glow: 'rgba(14,165,233,0.15)',
    winners: [{ rank: 1, team: 'SYMPHONISERS' }, { rank: 2, team: 'AADI GOEL DPS' }],
  },
  {
    id: 'cryptic', name: 'CRYPTIC HUNT', emoji: '🔐', tagline: 'CipherQuest',
    icon: <Lock className="w-3.5 h-3.5" />,
    accentBorder: 'border-emerald-500/35', accentText: 'text-emerald-400', accentBg: 'bg-emerald-500/8',
    glow: 'rgba(16,185,129,0.15)',
    winners: [{ rank: 1, team: 'SYMPHONISERS' }, { rank: 2, team: 'ProjectBeta' }, { rank: 3, team: 'Hellfire-Club' }],
  },
  {
    id: 'algoarena', name: 'ALGOARENA', emoji: '💻', tagline: 'Competitive Programming',
    icon: <Code2 className="w-3.5 h-3.5" />,
    accentBorder: 'border-violet-500/35', accentText: 'text-violet-400', accentBg: 'bg-violet-500/8',
    glow: 'rgba(139,92,246,0.15)',
    winners: [{ rank: 1, team: 'SYMPHONISERS' }, { rank: 2, team: 'Frostie' }],
  },
  {
    id: 'webx', name: 'WEBX', emoji: '🌐', tagline: 'Web Innovation',
    icon: <Globe className="w-3.5 h-3.5" />,
    accentBorder: 'border-fuchsia-500/35', accentText: 'text-fuchsia-400', accentBg: 'bg-fuchsia-500/8',
    glow: 'rgba(217,70,239,0.15)',
    winners: [{ rank: 1, team: 'CORE' }, { rank: 2, team: 'SYMPHONISERS' }, { rank: 3, team: 'AAYUSH SQUAD' }],
  },
  {
    id: 'appforge', name: 'APPFORGE', emoji: '📱', tagline: 'Mobile Innovation',
    icon: <Smartphone className="w-3.5 h-3.5" />,
    accentBorder: 'border-rose-500/35', accentText: 'text-rose-400', accentBg: 'bg-rose-500/8',
    glow: 'rgba(244,63,94,0.15)',
    winners: [{ rank: 1, team: 'SYMPHONISERS' }],
  },
  {
    id: 'surprise', name: 'SURPRISE', emoji: '🎭', tagline: 'Wildcard Event',
    icon: <Zap className="w-3.5 h-3.5" />,
    accentBorder: 'border-amber-500/35', accentText: 'text-amber-400', accentBg: 'bg-amber-500/8',
    glow: 'rgba(245,158,11,0.15)',
    winners: [{ rank: 1, team: 'Symphonisers' }, { rank: 2, team: 'Hellfire-Club' }],
  },
  {
    id: 'valorant', name: 'VALORANT', emoji: '🎮', tagline: 'Tactical FPS',
    icon: <Gamepad2 className="w-3.5 h-3.5" />,
    accentBorder: 'border-red-500/35', accentText: 'text-red-400', accentBg: 'bg-red-500/8',
    glow: 'rgba(239,68,68,0.15)',
    winners: [{ rank: 1, team: 'Paper Rex' }, { rank: 2, team: 'DPSRKP' }, { rank: 3, team: 'Paradigm' }],
  },
  {
    id: 'bedwarz', name: 'BEDWARZ', emoji: '⚔️', tagline: 'Tactical Minecraft',
    icon: <Swords className="w-3.5 h-3.5" />,
    accentBorder: 'border-yellow-500/35', accentText: 'text-yellow-400', accentBg: 'bg-yellow-500/8',
    glow: 'rgba(234,179,8,0.15)',
    winners: [{ rank: 1, team: 'DPSRKP' }, { rank: 2, team: 'YYY' }, { rank: 3, team: 'CORE' }],
  },
];

const RANK_CONFIG = {
  1: {
    pill: 'bg-gradient-to-r from-amber-500/25 to-yellow-500/15 border-amber-400/50 text-amber-200',
    row: 'bg-gradient-to-r from-amber-500/12 to-transparent border-amber-500/40',
    team: 'text-white font-extrabold',
    label: '1ST',
  },
  2: {
    pill: 'bg-white/8 border-white/18 text-zinc-300',
    row: 'bg-white/[0.035] border-white/10',
    team: 'text-zinc-100 font-bold',
    label: '2ND',
  },
  3: {
    pill: 'bg-white/5 border-white/10 text-zinc-400',
    row: 'bg-white/[0.018] border-white/[0.07]',
    team: 'text-zinc-300 font-semibold',
    label: '3RD',
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const WinnerRow: React.FC<{ w: Winner; accentText: string; delay: number; parentVisible: boolean }> = ({
  w, accentText, delay, parentVisible,
}) => {
  const cfg = RANK_CONFIG[w.rank];
  return (
    <div
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${cfg.row}`}
    >
      {/* Rank pill */}
      <span className={`shrink-0 text-[10px] font-black font-mono tracking-widest px-2 py-0.5 rounded-md border ${cfg.pill}`}>
        {cfg.label}
      </span>

      {/* Trophy */}
      <Trophy className={`shrink-0 w-3.5 h-3.5 ${w.rank === 1 ? accentText : 'text-zinc-600'}`} />

      {/* Team */}
      <span className={`text-sm tracking-wide truncate font-mono ${cfg.team}`}>
        {w.team}
      </span>

      {w.rank === 1 && (
        <Crown className="shrink-0 ml-auto w-3.5 h-3.5 text-amber-400" />
      )}
    </div>
  );
};


const EventCard: React.FC<{ evt: EventResult; index: number }> = ({ evt, index }) => {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.6s ease ${index * 70}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
        ['--card-glow' as any]: evt.glow,
      }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden
                  border ${evt.accentBorder} bg-[#07070d]
                  hover:shadow-[0_8px_32px_-4px_var(--card-glow)]
                  transition-shadow duration-500`}
    >
      {/* Accent top bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${evt.accentBorder.replace('border-', '').replace('/35','')}`}
           style={{ background: `linear-gradient(to right, transparent, ${evt.glow.replace('0.15','0.8')}, transparent)` }} />

      {/* Hover glow blob */}
      <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${evt.accentBg}`} />

      <div className="relative z-10 p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl leading-none">{evt.emoji}</span>
            <div>
              <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.18em] ${evt.accentText} mb-0.5`}>
                {evt.tagline}
              </div>
              <h3 className="text-base font-black text-white tracking-tight leading-none">
                {evt.name}
              </h3>
            </div>
          </div>
          <span className={`p-2 rounded-xl border ${evt.accentBorder} ${evt.accentBg} ${evt.accentText}`}>
            {evt.icon}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5" />

        {/* Winners */}
        <div className="flex flex-col gap-2 flex-1">
          {evt.winners.map((w, i) => (
            <WinnerRow
              key={w.rank}
              w={w}
              accentText={evt.accentText}
              delay={index * 70 + i * 100}
              parentVisible={visible}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


function CountUp({ target, delay, visible }: { target: number; delay: number; visible: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now() + delay;
    let raf: number;
    function tick(now: number) {
      if (now < start) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min((now - start) / 900, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, delay]);
  return <>{val}</>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ResultsPage() {
  const [isMuted, setIsMuted]     = useState(soundFX.getMuted());
  const [heroIn, setHeroIn]       = useState(false);
  const mvp                        = useReveal(0.1);
  const stats                      = useReveal(0.3);
  const closing                    = useReveal(0.12);

  useEffect(() => {
    document.title = '🏆 GENESIZ 2026 — Results';
    window.scrollTo(0, 0);
    const t0 = setTimeout(() => setHeroIn(true), 80);
    const t1 = setTimeout(fireCenter, 700);
    const t2 = setTimeout(fireSides, 2000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const fireCenter = () => {
    soundFX.playWarp();
    confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.45 },
      colors: ['#FFD700', '#FFA500', '#ffffff', '#818CF8', '#F472B6'] });
  };

  const fireSides = () => {
    soundFX.playSuccess();
    const end = Date.now() + 1800;
    const colors = ['#FFD700', '#E5E7EB', '#818CF8', '#38BDF8', '#F472B6'];
    (function frame() {
      confetti({ particleCount: 7, angle: 55,  spread: 60, origin: { x: 0,   y: 0.65 }, colors });
      confetti({ particleCount: 7, angle: 125, spread: 60, origin: { x: 1.0, y: 0.65 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const toggleAudio = () => {
    const m = soundFX.toggleMute();
    setIsMuted(m);
    if (!m) soundFX.playClick();
  };

  return (
    <div className="min-h-screen bg-[#040406] text-zinc-100 relative overflow-x-hidden">

      {/* ── Textures & glows ── */}
      <div className="fixed inset-0 bg-tech-grid opacity-[0.15] pointer-events-none z-0" />

      {/* Top golden aurora */}
      <div className="fixed top-0 inset-x-0 h-[55vh] pointer-events-none z-0"
           style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,158,11,0.18) 0%, rgba(99,102,241,0.08) 55%, transparent 100%)' }} />

      {/* Bottom purple */}
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0 blur-[120px]"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} className="fixed pointer-events-none z-0 rounded-full"
             style={{
               left: `${(i * 7.3 + 5) % 100}%`,
               top:  `${(i * 11.7 + 8) % 100}%`,
               width:  `${2 + (i % 3)}px`,
               height: `${2 + (i % 3)}px`,
               background: i % 3 === 0 ? 'rgba(245,158,11,0.35)' : i % 3 === 1 ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.15)',
               animation: `float ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate`,
             }} />
      ))}

      {/* ══════════ HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#040406]/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <a href="/" onClick={() => soundFX.playClick()}
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                          bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/18
                          text-[11px] font-mono text-zinc-400 hover:text-white transition-all group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </a>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/8">
              <img src={genesizLogo} alt="GENESIZ" className="h-5 w-auto opacity-90" />
              <span className="text-[10px] font-mono font-black tracking-[0.2em] text-amber-400
                               bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                2K26 Results
              </span>
            </div>
          </div>

          <button onClick={toggleAudio}
                  className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ══════════ MAIN */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-28">

        {/* ───────────────────────── HERO */}
        <section className="text-center mb-24 space-y-8">

          {/* Edition badge */}
          <div style={fadeUp(heroIn, 0)} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
              bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15
              border border-amber-400/30 text-amber-300 text-[11px] font-mono font-bold tracking-[0.18em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            GENESIZ 2K26 · Grand Winners Revealed
          </div>

          {/* Logo */}
          <div style={scalePop(heroIn, 120)} className="flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-[-20px] rounded-full blur-3xl pointer-events-none"
                   style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)', animation: 'pulse 2.5s ease-in-out infinite' }} />
              <img src={genesizLogo} alt="GENESIZ"
                   className="h-28 sm:h-36 w-auto select-none relative z-10"
                   style={{ filter: 'drop-shadow(0 0 36px rgba(245,158,11,0.5))' }} />
            </div>
          </div>

          {/* Title */}
          <div style={fadeUp(heroIn, 220)}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.92] mb-4">
              <span className="text-gradient-silver block">THE FINAL</span>
              <span className="block"
                    style={{ background: 'linear-gradient(135deg,#FFE066 0%,#F59E0B 40%,#FBBF24 70%,#FFE066 100%)',
                             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                PODIUM
              </span>
            </h1>
            <p className="text-[11px] font-mono text-zinc-500 tracking-[0.25em] uppercase">
              National Tech Symposium · 2026 Edition
            </p>
          </div>

          {/* Subtext */}
          <p style={fadeUp(heroIn, 340)}
             className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            Eight events. Hundreds of competitors. One legendary night.
            Here are the teams who rose above all and claimed their spot at the top.
          </p>

          {/* Scroll CTA */}
          <div style={fadeUp(heroIn, 460)} className="flex justify-center gap-3 pt-2">
            <a href="#mvp"
               className="group px-7 py-3 rounded-full font-black text-xs font-mono uppercase tracking-wider text-black
                          flex items-center gap-2 transition-all hover:scale-105"
               style={{ background: 'linear-gradient(135deg,#FBBF24,#F59E0B)', boxShadow: '0 0 28px rgba(245,158,11,0.45)' }}
               onClick={() => soundFX.playClick()}>
              <Trophy className="w-3.5 h-3.5" />
              View Winners
            </a>
            <a href="#events"
               className="px-7 py-3 rounded-full font-bold text-xs font-mono uppercase tracking-wider
                          text-zinc-300 hover:text-white bg-white/5 hover:bg-white/8 border border-white/10
                          hover:border-white/20 flex items-center gap-2 transition-all"
               onClick={() => soundFX.playClick()}>
              All Events
            </a>
          </div>

          {/* Decorative horizontal rule */}
          <div style={fadeUp(heroIn, 560)} className="flex items-center gap-4 pt-4 max-w-sm mx-auto">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(245,158,11,0.4))' }} />
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,rgba(245,158,11,0.4))' }} />
          </div>
        </section>

        {/* ───────────────────────── MVP SPOTLIGHT */}
        <section id="mvp" className="mb-24">

          {/* Section label */}
          <div ref={mvp.ref} style={fadeUp(mvp.visible, 0)} className="mb-6 flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
              Outstanding Performer
            </p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* MVP panel */}
          <div style={{
                 ...fadeUp(mvp.visible, 80),
                 background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(7,7,13,1) 50%, rgba(99,102,241,0.05) 100%)',
               }}
               className="relative rounded-3xl overflow-hidden border-2 border-amber-500/25">

            {/* Shimmer top line */}
            <div className="absolute top-0 inset-x-0 h-0.5 shimmer-border opacity-60" />

            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(245,158,11,0.14) 0%, transparent 70%)' }} />

            <div className="relative z-10 p-8 sm:p-12">
              {/* Team name */}
              <div style={fadeUp(mvp.visible, 160)} className="mb-8">
                <p className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-2">
                  Tournament Champion
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                    SYMPHONISERS
                  </h2>
                  <Crown className="w-10 h-10 text-yellow-400 shrink-0"
                         style={{ filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.7))' }} />
                </div>
                <p className="text-sm text-zinc-400 mt-3 max-w-lg leading-relaxed">
                  An extraordinary sweep across five disciplines, with additional podium appearances throughout the day.
                  A performance that redefined what a single team could achieve in a multi-event competition.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/6 mb-8" />

              {/* Stats + Tags row */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Stats — fixed width boxes, no overflow */}
                <div ref={stats.ref} className="flex gap-3 shrink-0">
                  {[
                    { n: 5, label: '1st Place', sub: 'Wins' },
                    { n: 1, label: '2nd Place', sub: 'Finish' },
                    { n: 6, label: 'Podiums',   sub: 'Total' },
                  ].map(({ n, label, sub }, i) => (
                    <div key={label}
                         style={scalePop(stats.visible, i * 120)}
                         className="w-20 sm:w-24 p-4 rounded-2xl text-center border border-amber-500/18
                                    bg-black/60 flex-shrink-0">
                      <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono leading-none mb-1">
                        <CountUp target={n} delay={i * 120} visible={stats.visible} />
                      </div>
                      <div className="text-[9px] font-mono font-black text-amber-400 uppercase tracking-widest leading-tight">
                        {label}
                      </div>
                      <div className="text-[9px] font-mono text-zinc-600 mt-0.5">
                        {sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Event tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    'BrainByte 🏆','Cryptic Hunt 🏆','AlgoArena 🏆','AppForge 🏆','Surprise 🏆','WebX 🥈',
                  ].map((tag, i) => (
                    <span key={tag}
                          style={fadeUp(mvp.visible, 200 + i * 65)}
                          className="text-[11px] font-mono px-3 py-1.5 rounded-full
                                     border border-amber-400/18 bg-amber-500/8 text-amber-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── EVENT RESULTS */}
        <section id="events" className="mb-24">

          {/* Heading */}
          <div style={fadeUp(mvp.visible, 0)} className="mb-10 text-center">
            <p className="text-[10px] font-mono text-zinc-600 tracking-[0.25em] uppercase mb-2">
              All 8 Disciplines
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Event-by-Event Podiums
            </h2>
            <p className="text-sm text-zinc-500 mt-2">
              Every winner, every discipline, every moment — officially recorded.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {EVENTS.map((evt, i) => (
              <EventCard key={evt.id} evt={evt} index={i} />
            ))}
          </div>
        </section>

        {/* ───────────────────────── CLOSING */}
        <section ref={closing.ref}>
          <div style={{
                 ...scalePop(closing.visible, 0),
                 background: 'linear-gradient(135deg,rgba(99,102,241,0.06) 0%,rgba(7,7,13,1) 40%, rgba(245,158,11,0.06) 100%)',
               }}
               className="relative rounded-3xl overflow-hidden border border-white/6 text-center p-12 sm:p-16">

            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

            <div className="relative z-10 space-y-5">
              <div style={scalePop(closing.visible, 80)} className="flex justify-center mb-2">
                <Sparkles className="w-9 h-9 text-amber-400 animate-pulse" style={{ animationDuration: '2s' }} />
              </div>

              <div style={fadeUp(closing.visible, 120)}>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                  To Every Competitor
                </h2>
                <h3 className="text-lg sm:text-2xl font-bold"
                    style={{ background: 'linear-gradient(90deg,#FBBF24,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  You made GENESIZ 2026 unforgettable. ❤️
                </h3>
              </div>

              <p style={fadeUp(closing.visible, 200)}
                 className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
                Whether you claimed a trophy or pushed your limits on the floor —
                every participant shaped what this event became.
                The energy you brought, the problems you solved, the battles you fought —
                that's the spirit of GENESIZ.
              </p>

              <p style={fadeUp(closing.visible, 280)}
                 className="text-xs font-mono text-zinc-600 italic">
                The scoreboard has closed. The memories haven't.
                See you at the next one. 🚀
              </p>

              {/* Sign-off */}
              <div style={scalePop(closing.visible, 360)}
                   className="inline-block px-8 py-5 rounded-2xl border border-white/8 bg-white/[0.025] mt-2">
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  GGs, Everyone! 🎉
                </div>
                <div className="text-xs font-mono text-zinc-600 mt-1">
                  — Team GENESIZ ❤️
                </div>
              </div>

              {/* Back link */}
              <div style={fadeUp(closing.visible, 440)} className="pt-2">
                <a href="/"
                   onClick={() => soundFX.playClick()}
                   className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs font-mono uppercase tracking-wider
                              text-black transition-all hover:scale-105"
                   style={{ background: 'linear-gradient(135deg,#FBBF24,#F59E0B)', boxShadow: '0 0 24px rgba(245,158,11,0.35)' }}>
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portal
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════ FOOTER */}
      <footer className="border-t border-zinc-900 py-6 px-4 bg-black/60 backdrop-blur">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between
                        gap-2 text-[10px] font-mono text-zinc-700">
          <div className="flex items-center gap-2">
            <img src={genesizLogo} alt="" className="h-4 w-auto opacity-40" />
            <span>GENESIZ 2026 — Official Results</span>
          </div>
          <span>© 2026 GENESIZ. Powered by Valenite Electrion.</span>
        </div>
      </footer>

    </div>
  );
}

export default ResultsPage;
