import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Binary, 
  Code2, 
  Crosshair, 
  Swords, 
  Brain, 
  Smartphone, 
  Globe, 
  Sparkles,
  Users,
  Clock
} from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import type { EventDetail } from '../data/eventsData';
import { EventVisual } from './EventVisual';
import { soundFX } from '../utils/audio';
import { RevealOnScroll } from './RevealOnScroll';

interface EventGridProps {
  onSelectEvent: (event: EventDetail) => void;
  onQuickRegister?: (eventId: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Binary,
  Code2,
  Crosshair,
  Swords,
  Brain,
  Smartphone,
  Globe,
  Sparkles,
};

export const EventGrid: React.FC<EventGridProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Coding',
    'Esports',
    'Hackathon',
    'Cryptography & Quiz',
    'Mystery'
  ];

  const filteredEvents = EVENTS_DATA.filter((event) => {
    let matchesCategory = false;
    if (activeCategory === 'All') matchesCategory = true;
    else if (activeCategory === 'Coding') matchesCategory = event.category === 'Competitive Coding';
    else if (activeCategory === 'Esports') matchesCategory = event.category === 'Esports';
    else if (activeCategory === 'Hackathon') matchesCategory = event.category === 'App Dev' || event.category === 'Web Dev';
    else if (activeCategory === 'Cryptography & Quiz') matchesCategory = event.category === 'Cryptography' || event.category === 'Trivia & Quiz';
    else if (activeCategory === 'Mystery') matchesCategory = event.category === 'Mystery';

    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      event.name.toLowerCase().includes(q) ||
      event.tagline.toLowerCase().includes(q) ||
      event.shortDesc.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
              <span>[ 01 ] // COMPETITIVE ARENAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
              Eight Flagship Disciplines.
            </h2>
            <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
              Select your arena. From 4-day cryptographic investigations and high-speed algorithmic trials to live 240Hz LAN esports and mobile software sprints.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search disciplines or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all"
            />
          </div>
        </div>
      </RevealOnScroll>

      {/* Filter Tabs */}
      <RevealOnScroll delayMs={100}>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event, idx) => {
          const Icon = iconMap[event.iconName] || Sparkles;

          return (
            <RevealOnScroll key={event.id} delayMs={(idx % 2) * 150}>
              <div
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => {
                  soundFX.playWarp();
                  onSelectEvent(event);
                }}
                className="group spotlight-card p-5 sm:p-6 rounded-3xl cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  
                  {/* Visual Artwork Banner */}
                  <EventVisual eventId={event.id} />

                  {/* Card Top Row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">
                        {event.category}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-zinc-600">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">
                      {event.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                    {event.shortDesc}
                  </p>

                </div>

                {/* Card Bottom Strip */}
                <div className="pt-5 mt-5 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {event.duration}
                    </span>
                    <span className="text-zinc-800">•</span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      {event.teamSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                    <span>Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-900 p-8 space-y-3">
          <p className="font-mono text-zinc-400 text-xs">NO DISCIPLINES MATCHING SEARCH QUERY.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};
