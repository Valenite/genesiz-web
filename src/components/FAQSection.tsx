import React, { useState } from 'react';
import { ChevronDown, Search, Sparkles, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { soundFX } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Registration', 'Events', 'Discord & Community'];

  const toggleAccordion = (idx: number) => {
    soundFX.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>[ 05 ] // FREQUENT INQUIRIES & PROTOCOLS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver">
          Everything you need to know.
        </h2>
        <p className="text-sm text-zinc-400 font-normal max-w-xl leading-relaxed">
          Comprehensive directives on delegate accreditation, 4-day CipherQuest schedules, on-site hardware allocations, and credential validation.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-3xl bg-[#09090e] border transition-all overflow-hidden ${
                isOpen ? 'border-white/20' : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                onMouseEnter={() => soundFX.playHover()}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-300 font-bold shrink-0">
                    0{idx + 1}
                  </div>
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                </div>

                <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-white' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed border-t border-zinc-800/60 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
