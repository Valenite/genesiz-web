import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Binary, 
  Code2, 
  Crosshair, 
  Swords, 
  Brain, 
  Smartphone, 
  Globe, 
  Sparkles,
  Layers,
  Shield,
  ListOrdered,
  Scale,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import type { EventDetail } from '../data/eventsData';
import { EventVisual } from './EventVisual';
import { soundFX } from '../utils/audio';

interface EventModalProps {
  event: EventDetail | null;
  onClose: () => void;
  onRegisterEvent: (eventId: string) => void;
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

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onRegisterEvent }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'rounds' | 'judging' | 'faq'>('overview');

  if (!event) return null;

  const Icon = iconMap[event.iconName] || Sparkles;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'rules', label: 'Directives & Rules', icon: Shield },
    { id: 'rounds', label: 'Tournament Stages', icon: ListOrdered },
    { id: 'judging', label: 'Evaluation Rubric', icon: Scale },
    { id: 'faq', label: 'Inquiries', icon: HelpCircle },
  ];

  const DISCORD_URL = "https://discord.gg/narNSeybgR";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => {
          soundFX.playClick();
          onClose();
        }}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0a0a0f] border border-violet-900/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-zinc-800/80 flex items-start justify-between gap-4 bg-zinc-950/80">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0 shadow-lg mt-0.5">
              <Icon className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-violet-400 uppercase font-semibold">
                  {event.category}
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span className="text-[11px] font-mono text-zinc-300">
                  {event.format}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {event.name}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-0.5">
                {event.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Meta Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 px-4 sm:px-8 py-3 bg-[#0d0d12] border-b border-zinc-800/80 text-xs font-mono text-zinc-400">
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">FORMAT</div>
            <div className="text-zinc-200 font-semibold mt-0.5 text-[11px] sm:text-xs">{event.format}</div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">DURATION</div>
            <div className="text-violet-300 font-semibold mt-0.5 text-[11px] sm:text-xs">{event.duration}</div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">DELEGATION</div>
            <div className="text-zinc-200 font-semibold mt-0.5 text-[11px] sm:text-xs">{event.teamSize}</div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">VENUE / PORTAL</div>
            <div className="text-zinc-200 font-semibold mt-0.5 truncate text-[11px] sm:text-xs">{event.venue}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-8 py-2.5 sm:py-3 border-b border-zinc-800/80 overflow-x-auto scrollbar-none bg-zinc-950/60">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-violet-500 text-white font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-300 font-sans text-sm leading-relaxed">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Event Visual Banner */}
              <div className="max-w-md mx-auto">
                <EventVisual eventId={event.id} />
              </div>

              <div>
                <h4 className="text-xs font-mono text-violet-400 uppercase font-semibold mb-2">Symposium Scope & Objectives</h4>
                <p className="text-zinc-200 font-light leading-relaxed text-sm">
                  {event.fullDesc}
                </p>
              </div>

              {event.id === 'cipherquest' && (
                <div className="p-4 rounded-2xl bg-[#5865F2]/15 border border-[#5865F2]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-white block">4-Day Intelligence Feeds on Discord HQ</span>
                    <span className="text-xs text-zinc-300 font-light">Progressive clue releases and hint broadcasts are dispatched via the verified Discord server.</span>
                  </div>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Connect to Discord
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-violet-400 uppercase font-semibold block">Eligibility</span>
                  <p className="text-xs text-zinc-300">{event.eligibility}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-violet-400 uppercase font-semibold block">Recommended Toolchain</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.toolsAndStack.map((tool) => (
                      <span key={tool} className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-zinc-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-violet-400 uppercase font-semibold mb-3">Guidelines & Evaluation Directives</h4>
              {event.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <span className="font-mono text-xs text-violet-400 font-bold pt-0.5">0{idx + 1}</span>
                  <p className="text-xs text-zinc-200 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-violet-400 uppercase font-semibold mb-3">Schedule Phases & Progression</h4>
              {event.rounds.map((round, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{round.title}</span>
                    <span className="text-xs font-mono text-violet-400 font-semibold">{round.duration}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{round.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'judging' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-violet-400 uppercase font-semibold mb-3">Evaluation Rubrics & Scoring Distribution</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {event.judgingCriteria.map((crit, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{crit.metric}</span>
                      <span className="text-xs font-mono text-violet-400 font-bold">{crit.weight}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{crit.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-violet-400 uppercase font-semibold mb-3">Specific Inquiries</h4>
              {event.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
                  <div className="text-xs font-semibold text-white">Q: {faq.q}</div>
                  <p className="text-xs text-zinc-300">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-[#0a0a0e] border-t border-zinc-800/80 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
          >
            Dismiss
          </button>

          <button
            onClick={() => {
              soundFX.playWarp();
              onRegisterEvent(event.id);
            }}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <span>Accreditation for {event.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
