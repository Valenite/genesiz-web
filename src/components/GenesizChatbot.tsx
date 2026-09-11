import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
}

interface GenesizChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (eventId?: string) => void;
}

const LEVEL_ONE_TRIGGERS = ['cat', 'civet', 'luwak', 'changed names', 'old film', 'what did the cat become'];

const LEVEL_ONE_REPLY = `Yesterday's fur still sings.\nUsually names do not survive quietly.\nSome old films kept the sound.\nUnder the later name, find the boy.\nForget the woman.`;

function getBotReply(text: string, hintCount: number): { reply: string; newHintCount: number } {
  const lower = text.toLowerCase().trim();

  // CipherQuest Level 1 scoped triggers
  if (LEVEL_ONE_TRIGGERS.some((t) => lower.includes(t))) {
    if (hintCount >= 1) {
      return { reply: 'bro google has rent to pay too.', newHintCount: hintCount + 1 };
    }
    return { reply: LEVEL_ONE_REPLY, newHintCount: hintCount + 1 };
  }

  // Events
  if (lower.includes('event') || lower.includes('discipline') || lower.includes('competition') || lower.includes('what are')) {
    return {
      reply: 'GENESIZ 2026 has 8 events:\n1. CipherQuest — 48-Hour Cryptic Hunt\n2. AlgoArena — Coding Competition\n3. Valorant Championship — 5v5 FPS\n4. Bedwarz — 4v4 Minecraft\n5. Brainbyte — Live Quiz\n6. AppForge — App Building\n7. WebX — Website Building\n8. Surprise?! — Secret Event',
      newHintCount: hintCount,
    };
  }

  // Register
  if (lower.includes('register') || lower.includes('sign up') || lower.includes('join') || lower.includes('how to')) {
    return {
      reply: 'Registration is FREE! Click the Register button in the top menu, fill in your details, choose your events, and get a unique Operative Code. Share it with teammates so they can join your team!',
      newHintCount: hintCount,
    };
  }

  // CipherQuest general
  if (lower.includes('cipherquest') || lower.includes('cryptic') || lower.includes('hunt')) {
    return {
      reply: 'CipherQuest is a 48-hour online cryptic hunt running Oct 10–12, 2026. Solve multi-stage puzzles covering OSINT, steganography, audio forensics, and code cracking. Teams of 2. Join our Discord for official hints and updates!',
      newHintCount: hintCount,
    };
  }

  // Schedule / dates
  if (lower.includes('schedule') || lower.includes('time') || lower.includes('date') || lower.includes('when') || lower.includes('october')) {
    return {
      reply: 'GENESIZ 2026 event dates:\n• Valorant: Oct 5–7 (5 PM IST daily)\n• Bedwarz: Oct 8–9 (5 PM IST daily)\n• CipherQuest: Oct 10–12 (48-hour hunt)\n• Brainbyte: Oct 10 (5 PM IST)\n• AppForge & WebX: Oct 10–11\n• AlgoArena: Oct 12–13 (6 PM IST)\n• Surprise?!: Oct 14\n\nAll updates posted on Discord!',
      newHintCount: hintCount,
    };
  }

  // Discord
  if (lower.includes('discord') || lower.includes('server') || lower.includes('community')) {
    return {
      reply: 'Join the official GENESIZ Discord: https://discord.gg/narNSeybgR — get live updates, match times, and CipherQuest hints!',
      newHintCount: hintCount,
    };
  }

  // Valenite
  if (lower.includes('valenite') || lower.includes('creator') || lower.includes('founder') || lower.includes('who made')) {
    return {
      reply: 'GENESIZ 2026 was founded and built by Valenite Electrion (Bhavya Aggarwal) — the Architect behind the entire event.',
      newHintCount: hintCount,
    };
  }

  // Brochure
  if (lower.includes('brochure') || lower.includes('pdf') || lower.includes('details')) {
    return {
      reply: 'Download the official GENESIZ 2026 Brochure at /brochure.pdf for all event details, rules, and schedule!',
      newHintCount: hintCount,
    };
  }

  // Default
  return {
    reply: `Hmm, I didn't quite get that. Try asking about events, registration, the schedule, or our Discord server!`,
    newHintCount: hintCount,
  };
}

export const GenesizChatbot: React.FC<GenesizChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      from: 'bot',
      text: 'Hey! I am the GENESIZ AI Assistant. Ask me anything about events, registration, the schedule, or anything about GENESIZ 2026!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (!isOpen) return null;

  const send = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), from: 'user', text: text.trim() };
    setMessages((prev) => [...prev.slice(-40), userMsg]);
    setInput('');
    setIsTyping(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const { reply, newHintCount } = getBotReply(text, hintCount);
      setHintCount(newHintCount);
      setIsTyping(false);
      setMessages((prev) => [...prev.slice(-40), { id: (Date.now() + 1).toString(), from: 'bot', text: reply }]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* window */}
      <div
        className="relative z-10 w-full max-w-lg flex flex-col bg-[#0c0c12] border border-violet-900/40 rounded-2xl shadow-2xl overflow-hidden"
        style={{ height: 'min(560px, 90vh)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950/80 border-b border-zinc-800/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/25 border border-violet-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4 text-violet-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">GENESIZ AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Intelligence Node · Live 24/7</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.from === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="px-3.5 py-3 bg-zinc-950 border-t border-zinc-800/70 flex gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about GENESIZ 2026..."
            className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 disabled:bg-zinc-700 disabled:opacity-40 text-black flex items-center justify-center cursor-pointer disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

// Floating trigger button shown on main site
export const ChatbotTriggerButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-[0_4px_24px_rgba(139,92,246,0.5)] transition-all hover:scale-110 active:scale-95 cursor-pointer"
    title="Open GENESIZ AI Assistant"
    style={{ width: 52, height: 52 }}
  >
    <MessageCircle className="w-5 h-5" />
  </button>
);
