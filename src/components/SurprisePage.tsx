import { useEffect } from 'react';
import { Camera, Drama, Activity, Smile, CheckCircle2, AlertTriangle, PenTool } from 'lucide-react';

export function SurprisePage() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'GENESIZ | Operation Chaos';
  }, []);

  const tiers = [
    {
      title: 'Phase I — Easy',
      pts: '10 PTS',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
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
      bg: 'bg-amber-400/10',
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
      bg: 'bg-orange-400/10',
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
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      icon: <Drama className="w-5 h-5 text-rose-500" />,
      tasks: [
        { text: 'Find a night-shift security guard or an open shop owner. Sit across from them, place your phone recording on the surface, and conduct a dead-serious 60-second mock police interrogation about a completely fictional crime. Stay fully in character throughout.', pts: 100 },
        { text: '⭐ JACKPOT — The Rarest Find: Search streets and shops near the venue for the most rare, unusual, or unexpected object you can physically get your hands on. Authentication rules: (1) Hold the item clearly in your hand in the photo. (2) Hold a handwritten note next to it with your name and today\'s date. (3) Outdoors only — real-world background, no blank walls or bedrooms. (4) Physical item must be brought back to organizers for verification. Panel judges all entries — rarest item wins 100 pts, runner-up wins 50 pts.', pts: 100 },
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      <div className="fixed inset-0 bg-tech-grid opacity-25 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20">

        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <AlertTriangle className="w-4 h-4" />
            Classified Field Directives
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            OPERATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">CHAOS</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Night Edition. The city is your arena. Execute these field directives and bring back evidence. Dignity is optional. Points are not.
          </p>
        </header>

        <div className="space-y-16">
          {tiers.map((tier, i) => (
            <section key={i} className="relative">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tier.bg} ${tier.border} border`}>
                    {tier.icon}
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-wide">{tier.title}</h2>
                </div>
                <div className={`text-sm font-black tracking-widest ${tier.color}`}>
                  {tier.pts}
                </div>
              </div>

              <div className="grid gap-3">
                {tier.tasks.map((task, j) => (
                  <div
                    key={j}
                    className="group flex items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-zinc-700 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-white transition-colors text-[1.05rem] leading-snug">
                        {task.text}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 px-3 py-1.5 rounded-md font-bold text-sm ${tier.bg} ${tier.color} border ${tier.border}`}>
                      {task.pts} PTS
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex gap-6 items-start">
          <div className="p-3 rounded-full bg-zinc-800 text-zinc-400">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Rules of Engagement</h3>
            <p className="text-zinc-400 leading-relaxed">
              Maintain operational security. Do not harass civilians, obstruct public pathways, or damage property. All directives require raw video or photographic evidence submitted to central command to claim points. Max possible score: 560 points.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
