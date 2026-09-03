import React, { useState } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/scheduleData';
import { soundFX } from '../utils/audio';
import { RevealOnScroll } from './RevealOnScroll';

export const ScheduleSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = ['All', 'Keynote', 'Coding', 'Esports', 'Hackathon', 'Quiz', 'Awards'];

  const filteredSchedule = SCHEDULE_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="schedule" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>[ 02 ] // EXECUTIVE TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
              October 05, 2026.
            </h2>
            <p className="text-sm text-zinc-400 font-normal max-w-lg leading-relaxed">
              A synchronized sequence of hackathons, algorithmic jury trials, live auditorium showdowns, and championship series.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-sm scale-105'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Timeline List */}
      <div className="space-y-3.5 relative">
        {filteredSchedule.map((item, idx) => (
          <RevealOnScroll key={idx} variant="fade-up" delayMs={(idx % 4) * 80}>
            <div
              onMouseEnter={() => {
                soundFX.playHover();
                setHoveredIdx(idx);
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-6 rounded-3xl bg-[#0a0a0e] border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group relative overflow-hidden ${
                item.highlight
                  ? 'border-white/25 bg-zinc-900/70 shadow-lg'
                  : 'border-zinc-800/80 hover:border-zinc-600 hover:bg-zinc-900/40'
              } ${hoveredIdx === idx ? '-translate-y-1' : ''}`}
            >
              {/* Active Indicator Light Beam on Hover */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                  hoveredIdx === idx ? 'bg-white' : item.highlight ? 'bg-indigo-500' : 'bg-transparent'
                }`}
              />

              <div className="space-y-2 flex-1 pl-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {item.time}
                  </span>
                  <span className="text-zinc-800 font-mono text-xs">•</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    {item.venue}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 font-normal leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 pl-2">
                <span className="text-[10px] font-mono px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase font-semibold group-hover:border-zinc-600 transition-colors">
                  {item.category}
                </span>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

    </section>
  );
};
