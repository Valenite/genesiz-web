import { useEffect } from 'react';
import { Camera, Drama, Activity, Smile, CheckCircle2, AlertTriangle, PenTool } from 'lucide-react';

export function SurprisePage() {
  useEffect(() => {
    // Inject noindex meta tag to keep it hidden
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'GENESIZ | Operation Chaos';
  }, []);

  const tiers = [
    {
      title: 'Phase I — Easy',
      pts: '10-20 PTS',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-500/20',
      icon: <Smile className="w-5 h-5 text-emerald-400" />,
      tasks: [
        { text: 'Take a serious passport photo holding a random object.', pts: 15 },
        { text: 'Wiggle your ears or flare your nostrils while someone speaks to you (1 min).', pts: 15 },
        { text: 'Do any Fortnite dance in the middle of a room for 20 seconds.', pts: 20 },
        { text: 'Do the worm (or attempt it awkwardly) for 15 seconds.', pts: 20 },
        { text: 'Walk around on all fours like a dog for 1 minute.', pts: 20 },
      ]
    },
    {
      title: 'Phase II — Commitment',
      pts: '25-30 PTS',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-500/20',
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      tasks: [
        { text: 'Wear a jacket like a royal cape and demand someone bring you water.', pts: 25 },
        { text: 'Eat Maggi with ketchup and film a serious food review.', pts: 25 },
        { text: 'Greet someone with "Good morning" at night and walk away confidently.', pts: 25 },
        { text: 'Sing a dramatic song loudly while making intense eye contact with a teammate.', pts: 25 },
        { text: 'Eat a lemon slice like an orange and keep a straight face for 10 seconds.', pts: 25 },
        { text: 'Walk backwards in public while acting completely normal.', pts: 30 },
        { text: 'Stand completely still like a mannequin in a visible spot for 1 minute.', pts: 30 },
        { text: 'Comment "Wow, looking majestic!" on an old post of someone you know.', pts: 30 },
        { text: 'Ask a friend to smell their shoes and rank them from best to worst.', pts: 30 },
      ]
    },
    {
      title: 'Phase III — Embarrassing',
      pts: '35-40 PTS',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-500/20',
      icon: <Camera className="w-5 h-5 text-orange-400" />,
      tasks: [
        { text: 'Text your crush or ex: "thinking of you".', pts: 35 },
        { text: 'Hold a potato and ask a stranger: "Excuse me, have you seen my potato?"', pts: 35 },
        { text: 'Go Live on Instagram for 1 minute and silently stare at the camera.', pts: 40 },
        { text: 'Loudly ask friends in public: "Does anyone have a spare pair of pants? Emergency!"', pts: 40 },
        { text: 'Post a selfie to your story: "Feeling cute, might delete later... or never, I\'m gorgeous."', pts: 40 },
      ]
    },
    {
      title: 'Phase IV — Dignity Sacrificed',
      pts: '45+ PTS',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      icon: <Drama className="w-5 h-5 text-rose-500" />,
      tasks: [
        { text: 'Give a willing friend a makeover with your eyes completely closed.', pts: 45 },
        { text: 'Post a 15s apology video on your IG story apologizing to your imaginary pet rock.', pts: 45 },
        { text: 'Hand a stranger a pen, solemnly say "The prophecy is in your hands now," and walk away.', pts: 50 },
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Background textures to match main site */}
      <div className="fixed inset-0 bg-tech-grid opacity-25 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20">
        
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <AlertTriangle className="w-4 h-4" />
            Classified Directives
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            OPERATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">CHAOS</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Dignity is temporary. GENESIZ points are forever. Execute these directives with precision.
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
                    <div className="flex gap-4 items-start sm:items-center">
                      <div className="mt-1 sm:mt-0 flex-shrink-0">
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
              Maintain operational security. Do not harass civilians, obstruct public pathways, or damage property. All directives require raw video or photographic evidence submitted to central command to claim points.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
