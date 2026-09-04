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
  Clock,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  
  // Touch / Drag swipe state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [animatingDir, setAnimatingDir] = useState<'left' | 'right' | null>(null);

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

  const totalFiltered = filteredEvents.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, totalFiltered - 1));

  const triggerSwipeLeft = () => {
    if (totalFiltered === 0 || animatingDir !== null) return;
    soundFX.playWarp();
    setAnimatingDir('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalFiltered);
      setSwipeOffset(0);
      setAnimatingDir(null);
    }, 220);
  };

  const triggerSwipeRight = () => {
    if (totalFiltered === 0 || animatingDir !== null) return;
    soundFX.playWarp();
    setAnimatingDir('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalFiltered) % totalFiltered);
      setSwipeOffset(0);
      setAnimatingDir(null);
    }, 220);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (animatingDir !== null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchStartX(clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX === null || !isSwiping || animatingDir !== null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - touchStartX;
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isSwiping || animatingDir !== null) return;
    setIsSwiping(false);
    if (swipeOffset < -45) {
      triggerSwipeLeft();
    } else if (swipeOffset > 45) {
      triggerSwipeRight();
    } else {
      setSwipeOffset(0);
    }
    setTouchStartX(null);
  };

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
              Eight Flagship Arenas.
            </h2>
            <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
              Swipe through the interactive arena deck below to explore each competition specification.
            </p>
          </div>

          {/* Search & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search arenas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all"
              />
            </div>

            <div className="flex items-center p-1 bg-zinc-950 border border-zinc-800 rounded-full shrink-0">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setViewMode('deck');
                }}
                title="Interactive Swipe Deck"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'deck' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setViewMode('grid');
                }}
                title="Grid View"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
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
                setCurrentIndex(0);
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

      {/* SWIPE DECK MODE (Default Interactive Deck) */}
      {viewMode === 'deck' && totalFiltered > 0 && (
        <RevealOnScroll delayMs={150}>
          <div className="relative max-w-xl mx-auto py-4">
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 font-bold">
                  CARD {String(safeIndex + 1).padStart(2, '0')} / {String(totalFiltered).padStart(2, '0')}
                </span>
                <span className="text-zinc-700 text-xs font-mono">•</span>
                <span className="text-xs font-mono text-zinc-500">Swipe card or use arrows</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerSwipeRight}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shadow-md active:scale-95"
                  title="Previous Card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={triggerSwipeLeft}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shadow-md active:scale-95"
                  title="Next Card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Card Deck Stack Container */}
            <div 
              className="relative min-h-[460px] sm:min-h-[480px] touch-pan-y select-none cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              {/* Stacked Preview Card Behind */}
              {totalFiltered > 1 && (
                <div 
                  className="absolute inset-0 rounded-3xl bg-[#08080c] border border-zinc-800/60 pointer-events-none transition-all duration-300 transform translate-y-3 scale-95 opacity-40 z-0"
                />
              )}

              {/* Active Foreground Card */}
              {filteredEvents[safeIndex] && (() => {
                const event = filteredEvents[safeIndex];
                const Icon = iconMap[event.iconName] || Sparkles;

                // Compute smooth card transform during drag or animation
                let cardTransform = `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.03}deg)`;
                let cardOpacity = 1;

                if (animatingDir === 'left') {
                  cardTransform = `translateX(-120%) rotate(-12deg)`;
                  cardOpacity = 0;
                } else if (animatingDir === 'right') {
                  cardTransform = `translateX(120%) rotate(12deg)`;
                  cardOpacity = 0;
                }

                return (
                  <div
                    style={{
                      transform: cardTransform,
                      opacity: cardOpacity,
                      transition: isSwiping ? 'none' : 'transform 0.28s ease-out, opacity 0.28s ease-out',
                    }}
                    className="relative z-10 spotlight-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between min-h-[460px] sm:min-h-[480px] shadow-2xl border border-white/15 bg-[#0a0a0f]"
                  >
                    <div className="space-y-5">
                      {/* Visual Banner Artwork */}
                      <EventVisual eventId={event.id} />

                      {/* Top Meta Info */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                            {event.category}
                          </span>
                        </div>

                        <span className="font-mono text-xs text-zinc-500 font-bold">
                          {safeIndex + 1} OF {totalFiltered}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-3xl font-extrabold text-white">
                          {event.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 font-mono">
                          {event.tagline}
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {event.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Strip */}
                    <div className="pt-5 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <span className="text-white font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          {event.duration}
                        </span>
                        <span className="text-zinc-800">•</span>
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Users className="w-3.5 h-3.5 text-zinc-500" />
                          {event.teamSize}
                        </span>
                      </div>

                      {/* Explicit Open Modal Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFX.playWarp();
                          onSelectEvent(event);
                        }}
                        onMouseEnter={() => soundFX.playHover()}
                        className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                      >
                        <span>Open Specification</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFX.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    safeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-800 hover:bg-zinc-600'
                  }`}
                  title={`Go to Card ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </RevealOnScroll>
      )}

      {/* GRID VIEW MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event, idx) => {
            const Icon = iconMap[event.iconName] || Sparkles;

            return (
              <RevealOnScroll key={event.id} variant={idx % 2 === 0 ? 'swipe-left' : 'swipe-right'} delayMs={100}>
                <div
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => {
                    soundFX.playWarp();
                    onSelectEvent(event);
                  }}
                  className="group spotlight-card p-5 sm:p-6 rounded-3xl cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <EventVisual eventId={event.id} />

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

                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">
                        {event.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                      {event.shortDesc}
                    </p>
                  </div>

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
      )}

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-900 p-8 space-y-3">
          <p className="font-mono text-zinc-400 text-xs">NO ARENAS MATCHING SEARCH QUERY.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setCurrentIndex(0);
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
