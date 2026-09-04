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
  RotateCw,
  LayoutGrid,
  Layers,
  CheckCircle2,
  ListOrdered,
  Zap,
  RotateCcw
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

const eventColorGlowMap: Record<string, string> = {
  cipherquest: 'rgba(16, 185, 129, 0.16)',
  algoarena: 'rgba(99, 102, 241, 0.16)',
  valorant: 'rgba(244, 63, 94, 0.16)',
  bedwarz: 'rgba(245, 158, 11, 0.16)',
  brainbyte: 'rgba(168, 85, 247, 0.16)',
  appforge: 'rgba(6, 182, 212, 0.16)',
  webx: 'rgba(14, 165, 233, 0.16)',
  surprise: 'rgba(244, 114, 182, 0.16)',
};

const defaultGlow = 'rgba(99, 102, 241, 0.12)';

export const EventGrid: React.FC<EventGridProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  
  // 360 Degree Card Rotation State
  const [cardRotationY, setCardRotationY] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  
  // Drag rotation tracking
  const [dragStartX, setDragStartX] = useState<number | null>(null);

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

  const currentActiveEvent = filteredEvents[safeIndex];
  const activeGlowColor = currentActiveEvent 
    ? (eventColorGlowMap[currentActiveEvent.id] || defaultGlow) 
    : defaultGlow;

  // 180 Degree Flip to Back/Front Specs
  const handleFlipCard = () => {
    soundFX.playWarp();
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    setCardRotationY(newFlipped ? 180 : 0);
  };

  // Full 360 Degree Spin Left -> NEXT Card
  const handle360SpinNext = () => {
    if (totalFiltered <= 1 || isSpinning) return;
    soundFX.playWarp();
    setIsSpinning(true);
    setIsFlipped(false);

    // Spin card -360 degrees leftwards
    setCardRotationY(-360);

    // Midway swap content at 240ms when card edge is turned away
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalFiltered);
    }, 240);

    // Reset rotation position cleanly at 500ms after completion
    setTimeout(() => {
      setCardRotationY(0);
      setIsSpinning(false);
    }, 500);
  };

  // Full 360 Degree Spin Right -> PREVIOUS Card
  const handle360SpinPrev = () => {
    if (totalFiltered <= 1 || isSpinning) return;
    soundFX.playWarp();
    setIsSpinning(true);
    setIsFlipped(false);

    // Spin card +360 degrees rightwards
    setCardRotationY(360);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalFiltered) % totalFiltered);
    }, 240);

    setTimeout(() => {
      setCardRotationY(0);
      setIsSpinning(false);
    }, 500);
  };

  // Mouse / Touch Drag 360 Rotation Handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSpinning) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(x);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === null || isSpinning) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = x - dragStartX;
    const newRotation = cardRotationY + deltaX * 0.45;

    // Check if user rotated past threshold via dragging to trigger card swap in that direction
    if (deltaX < -70 && !isSpinning) {
      handle360SpinNext();
      setDragStartX(null);
      return;
    } else if (deltaX > 70 && !isSpinning) {
      handle360SpinPrev();
      setDragStartX(null);
      return;
    }

    setCardRotationY(newRotation);
  };

  const handleDragEnd = () => {
    if (isSpinning) return;
    setDragStartX(null);
    if (!isFlipped && Math.abs(cardRotationY) < 40) {
      setCardRotationY(0);
    }
  };

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Dynamic Smooth Ambient Background Color Glow Aura */}
      <div 
        style={{
          background: `radial-gradient(ellipse 750px 450px at 50% 50%, ${activeGlowColor}, transparent 70%)`,
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="absolute inset-0 pointer-events-none z-0 opacity-90"
      />

      {/* Section Header */}
      <RevealOnScroll className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
              <span>[ 01 ] // COMPETITIVE ARENAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
              Eight Flagship Arenas.
            </h2>
            <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
              Drag left to spin to Next arena, drag right for Previous arena. Ambient lighting morphs smoothly with each card!
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
                  setCardRotationY(0);
                  setIsFlipped(false);
                }}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950/90 border border-zinc-800 rounded-full text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all"
              />
            </div>

            <div className="flex items-center p-1 bg-zinc-950/90 border border-zinc-800 rounded-full shrink-0">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setViewMode('deck');
                }}
                title="360° Interactive 3D Card"
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
      <RevealOnScroll delayMs={100} className="relative z-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat);
                setCurrentIndex(0);
                setCardRotationY(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm scale-105'
                  : 'bg-zinc-950/90 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* 360° REVOLVING CARD DECK MODE */}
      {viewMode === 'deck' && totalFiltered > 0 && (
        <RevealOnScroll delayMs={150} className="relative z-10">
          <div className="relative max-w-xl mx-auto py-4">
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-300 font-bold">
                  ARENA {String(safeIndex + 1).padStart(2, '0')} / {String(totalFiltered).padStart(2, '0')}
                </span>
                <span className="text-zinc-700 text-xs font-mono">•</span>
                <span className="text-xs font-mono text-zinc-400">Drag Left/Right to spin arenas</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handle360SpinPrev}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1 text-xs font-mono"
                  title="Previous Arena (Spin Right)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={handle360SpinNext}
                  onMouseEnter={() => soundFX.playHover()}
                  className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                  title="Next Arena (Spin Left)"
                >
                  <span>Next Arena</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 360-DEGREE ROTATING CARD FRAME WITH EXACT PERFECT 1:1 FACE STACKING & NO OVERFLOW */}
            <div 
              className="relative h-[530px] sm:h-[550px] w-full select-none cursor-grab active:cursor-grabbing [perspective:1200px]"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {currentActiveEvent && (() => {
                const event = currentActiveEvent;
                const Icon = iconMap[event.iconName] || Sparkles;

                return (
                  <div
                    style={{
                      transform: `rotateY(${cardRotationY}deg)`,
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transition: isSpinning 
                        ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                        : (dragStartX === null ? 'transform 0.25s ease-out' : 'none'),
                    }}
                    className="relative w-full h-full shadow-2xl rounded-3xl"
                  >
                    
                    {/* FRONT FACE OF THE CARD */}
                    <div 
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full spotlight-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between border border-white/20 bg-[#0a0a0f] z-20 overflow-hidden"
                    >
                      <div className="space-y-4">
                        {/* Visual Banner Artwork */}
                        <EventVisual eventId={event.id} />

                        {/* Top Meta Info */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                              {event.category}
                            </span>
                          </div>

                          <span className="font-mono text-xs text-zinc-500 font-bold">
                            FRONT FACE // 01
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                            {event.name}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                            {event.tagline}
                          </p>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                          {event.shortDesc}
                        </p>
                      </div>

                      {/* Bottom Strip Controls */}
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
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

                        <button
                          onClick={handleFlipCard}
                          onMouseEnter={() => soundFX.playHover()}
                          className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Flip 180° for Back Specs</span>
                        </button>
                      </div>
                    </div>

                    {/* BACK FACE OF THE CARD (EXACTLY ALIGNED 1:1 INSIDE CARD FRAME) */}
                    <div 
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-full h-full spotlight-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between border border-white/20 bg-[#09090e] z-10 overflow-hidden"
                    >
                      <div className="space-y-3.5 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-tight">
                              {event.name} // BACK SPECIFICATIONS
                            </h4>
                          </div>

                          <span className="text-xs font-mono text-zinc-500 font-bold">
                            BACK FACE // 02
                          </span>
                        </div>

                        {/* Rules Breakdown */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-semibold uppercase">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>COMPETITION DIRECTIVES</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-zinc-300 leading-tight font-normal">
                            {event.rules.slice(0, 3).map((rule, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2 bg-zinc-950/90 p-2 rounded-xl border border-zinc-900">
                                <span className="text-zinc-600 font-mono text-[10px] mt-0.5">•</span>
                                <span className="line-clamp-2">{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Rounds Preview */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-semibold uppercase">
                            <ListOrdered className="w-3.5 h-3.5 text-indigo-400" />
                            <span>PHASE TIMELINE</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {event.rounds.slice(0, 2).map((rnd, rIdx) => (
                              <div key={rIdx} className="p-2 rounded-xl bg-zinc-950 border border-zinc-900">
                                <div className="text-xs font-bold text-white truncate">{rnd.title}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{rnd.duration}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Back Bottom Actions (Padded neatly at exact bottom inside card) */}
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between shrink-0">
                        <button
                          onClick={handleFlipCard}
                          onMouseEnter={() => soundFX.playHover()}
                          className="px-3.5 py-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Flip Front</span>
                        </button>

                        <button
                          onClick={() => {
                            soundFX.playWarp();
                            onSelectEvent(event);
                          }}
                          onMouseEnter={() => soundFX.playHover()}
                          className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105"
                        >
                          <span>Full Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredEvents.map((evt, idx) => (
                <button
                  key={evt.id + idx}
                  onClick={() => {
                    soundFX.playClick();
                    setCurrentIndex(idx);
                    setCardRotationY(0);
                    setIsFlipped(false);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    safeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-800 hover:bg-zinc-600'
                  }`}
                  title={`Go to Arena ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </RevealOnScroll>
      )}

      {/* GRID VIEW MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
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
        <div className="text-center py-16 bg-zinc-950 rounded-3xl border border-zinc-900 p-8 space-y-3 relative z-10">
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
