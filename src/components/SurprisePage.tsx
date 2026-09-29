import { useEffect, useState } from 'react';
import { Camera, Drama, Activity, Smile, AlertTriangle, ShieldAlert, Video } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function SurprisePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'CLASSIFIED | Operation Chaos';
    setMounted(true);
  }, []);

  const tiers = [
    {
      title: 'Phase I — Warm-Ups',
      pts: '10 PTS',
      color: 'text-emerald-400',
      glow: 'group-hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]',
      borderHover: 'group-hover:border-emerald-500/50',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      icon: <Smile className="w-5 h-5 text-emerald-400" />,
      tasks: [
        { text: 'Take a photo with the official event logo clearly visible on your phone or laptop screen. Your full face must be in the shot.', pts: 10 },
        { text: 'Find a stray dog or cat on the street. Take a photo with it where you AND the animal are clearly visible. No chasing — the animal must look completely unbothered.', pts: 10 },
        { text: 'Find a real street sign, shop board, or building name that starts with the letter G. Take a photo in front of it pointing at it dramatically.', pts: 10 },
        { text: 'Walk up to a complete stranger on the street, explain absolutely nothing, and get a high-five from them. Record a 10-second video. No event participants allowed.', pts: 10 },
      ]
    },
    {
      title: 'Phase II — Street Operatives',
      pts: '30 PTS',
      color: 'text-amber-400',
      glow: 'group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      borderHover: 'group-hover:border-amber-500/50',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      tasks: [
        { text: 'Enter any open grocery store or pharmacy. With complete seriousness, ask the cashier if they stock "Blinker Fluid," "Pre-Holed Donuts," or "Dehydrated Water." Record their reaction.', pts: 30 },
        { text: 'Buy the single cheapest item in any open shop using only the smallest denomination coins you have. Bring a computerised receipt (shop name, item, price, date clearly printed). If you record the full transaction on video — no receipt needed.', pts: 30 },
        { text: 'Stand outside a completely shut, shuttered shop at night. Record a passionate 30-second food review as if you just had the meal of your life from that very shop. The more dramatic, the better.', pts: 30 },
        { text: 'Find a late-night tea stall or food cart. Perform a song, dance, or full dramatic speech for the vendor in an attempt to negotiate a discount on anything. Record their complete reaction.', pts: 30 },
      ]
    },
    {
      title: 'Phase III — Chaos Agents',
      pts: '60 PTS',
      color: 'text-orange-400',
      glow: 'group-hover:shadow-[0_0_15px_rgba(251,146,60,0.3)]',
      borderHover: 'group-hover:border-orange-500/50',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      icon: <Camera className="w-5 h-5 text-orange-400" />,
      tasks: [
        { text: 'Find a zebra crossing on an empty street at night. Recreate the iconic Beatles Abbey Road album cover as accurately as possible. The photo must clearly show the full crossing.', pts: 60 },
        { text: 'Walk up to a busy late-night food counter completely on foot, but act as if you are driving a car. Roll down the invisible window, rev the invisible engine, and place your full order in character. Full video required.', pts: 60 },
        { text: 'Stop a random stranger on the street. Shine your phone flashlight dramatically at yourself and ask with complete urgency: "What year is it?! Did the machine work?!" — then run away cheering no matter what they say. Full video required.', pts: 60 },
      ]
    },
    {
      title: 'Phase IV — Dignity Sacrificed',
      pts: '100 PTS',
      color: 'text-rose-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]',
      borderHover: 'group-hover:border-rose-500/50',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      icon: <Drama className="w-5 h-5 text-rose-500" />,
      tasks: [
        { text: 'Find a night-shift security guard or an open shop owner. Sit across from them, place your phone recording on the surface, and conduct a dead-serious 60-second mock police interrogation about a completely fictional crime. Stay fully in character throughout.', pts: 100 },
        { text: '⭐ JACKPOT — The Rarest Find: Search streets and shops near the venue for the most rare, unusual, or unexpected object you can physically get your hands on. Authentication rules: (1) Hold the item clearly in your hand in the photo. (2) Hold a handwritten note next to it with your name and today\'s date. (3) Outdoors only — real-world background, no blank walls or bedrooms. (4) Physical item must be brought back to organizers for verification. Panel judges all entries — rarest item wins 100 pts, runner-up wins 50 pts.', pts: 100 },
      ]
    }
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#030305] text-zinc-100 font-sans selection:bg-rose-500 selection:text-white pb-24 overflow-hidden">
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-tech-grid opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-rose-900/10 blur-[150px] pointer-events-none z-0"></div>
      
      {/* Classified Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] overflow-hidden select-none">
        <h1 className="text-[15rem] font-black tracking-tighter text-white rotate-[-30deg] whitespace-nowrap">
          CHAOS
        </h1>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24">

        {/* Header Section */}
        <header className="mb-16 text-center">
          
          <RevealOnScroll variant="zoom-in" delayMs={100}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                <ShieldAlert className="w-4 h-4" />
                Classified Field Directives
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold tracking-widest uppercase">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                Evidence Required
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up" delayMs={200}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase drop-shadow-2xl">
              Operation <span className="text-transparent bg-clip-text bg-gradient-to-br from-rose-400 via-orange-400 to-rose-600 animate-pulse">Chaos</span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll variant="fade-up" delayMs={300}>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-rose-500/50 pl-4 text-left">
              Night Edition. The city is your arena. Execute these field directives and bring back video evidence. <strong className="text-white">Dignity is optional. Points are not.</strong>
            </p>
          </RevealOnScroll>
        </header>

        {/* Directives List */}
        <div className="space-y-24">
          {tiers.map((tier, i) => (
            <section key={i} className="relative">
              
              {/* Tier Header */}
              <RevealOnScroll variant="swipe-left" delayMs={100}>
                <div className="flex items-end justify-between border-b border-zinc-800/80 pb-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${tier.bg} ${tier.border} border backdrop-blur-sm shadow-lg`}>
                      {tier.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-500 mb-1 tracking-widest uppercase">Clearance Level {i + 1}</div>
                      <h2 className="text-2xl font-black text-white tracking-wide uppercase">{tier.title}</h2>
                    </div>
                  </div>
                  <div className={`text-lg font-black tracking-widest ${tier.color} drop-shadow-md`}>
                    {tier.pts}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Tasks Grid */}
              <div className="grid gap-4">
                {tier.tasks.map((task, j) => (
                  <RevealOnScroll 
                    key={j} 
                    variant="3d-dock" 
                    delayMs={j * 100} // Staggered reveal effect
                  >
                    <div
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 transition-all duration-300 hover:-translate-y-1 ${tier.borderHover} ${tier.glow}`}
                    >
                      <div className="flex gap-4 items-start">
                        <div className="mt-1 flex-shrink-0">
                          <Video className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-zinc-300 group-hover:text-white transition-colors text-[1.05rem] leading-relaxed">
                          {task.text}
                        </p>
                      </div>
                      <div className={`flex-shrink-0 sm:self-center self-end px-4 py-2 rounded-lg font-black text-sm tracking-wider ${tier.bg} ${tier.color} border ${tier.border} shadow-inner`}>
                        {task.pts} PTS
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Warning Footer */}
        <RevealOnScroll variant="fade-up" delayMs={200}>
          <div className="mt-28 p-8 rounded-2xl bg-rose-950/20 border border-rose-900/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50"></div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex-shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-rose-100 mb-2 uppercase tracking-widest drop-shadow-md">Rules of Engagement</h3>
                <p className="text-rose-200/70 leading-relaxed text-lg">
                  Maintain operational security. Do not harass civilians, obstruct public pathways, or damage property. All directives require raw, unedited video or photographic evidence submitted to central command to claim points.
                </p>
                <div className="mt-4 inline-block px-4 py-1 rounded bg-black/50 border border-rose-500/30 text-rose-400 font-mono text-sm font-bold">
                  MAX SCORE: 560 POINTS
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
