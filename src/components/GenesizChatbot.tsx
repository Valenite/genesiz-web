import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isSecretUnlock?: boolean;
}

interface GenesizChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (eventId?: string) => void;
  onLaunchCipherSandbox: () => void;
}

const SECRET_COMMANDS = [
  '/anshika060613',
  'anshika060613',
];

export const GenesizChatbot: React.FC<GenesizChatbotProps> = ({
  isOpen,
  onClose,
  onLaunchCipherSandbox,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hey! I am the GENESIZ AI Assistant. Ask me anything about events, how to register, the schedule, or anything else about GENESIZ 2026!',
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickPrompts = [
    'What events are there?',
    'Tell me about CipherQuest',
    'How do I register?',
    'Who is Valenite Electrion?',
    'What is the schedule for Oct 5?',
    'Discord server link',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const generateBotReply = (userText: string): { reply: string; isSecret?: boolean } => {
    const lower = userText.toLowerCase().trim();

    // Check for Secret Cryptic Hunt Command
    if (SECRET_COMMANDS.some((cmd) => lower.includes(cmd))) {
      return {
        reply: '⚡ [SECURITY OVERRIDE DETECTED]\nAccess Granted: CipherQuest Sandbox Unlocked.\nStarting CipherQuest Level 0 Terminal...',
        isSecret: true,
      };
    }

    if (lower.includes('cipherquest') || lower.includes('cryptic') || lower.includes('hunt') || lower.includes('4 day')) {
      return {
        reply: 'CipherQuest is a 4-Day Online Cryptic Hunt running non-stop from Oct 5 to Oct 9, 2026 (96 hours). You will solve puzzles covering OSINT, steganography, audio clues, and code cracking. Hints and updates are posted live on our Discord server.',
      };
    }

    if (lower.includes('event') || lower.includes('discipline') || lower.includes('competition') || lower.includes('what are')) {
      return {
        reply: 'GENESIZ has 8 Events:\n1. CipherQuest (4-Day Cryptic Hunt)\n2. AlgoArena (Coding Competition)\n3. Valorant Championship (5v5)\n4. Bedwarz (4v4 Minecraft)\n5. Brainbyte (Live Quiz)\n6. AppForge (App Building)\n7. WebX (Website Building)\n8. Surprise?!?!?!! (Secret Event)',
      };
    }

    if (lower.includes('register') || lower.includes('accreditation') || lower.includes('pass') || lower.includes('ticket')) {
      return {
        reply: 'Registration is completely FREE for all students! Just click the "Register" button in the menu, fill in your details, pick your events, and you will get your own unique registration code. Share that code with your teammates so they can join your team!',
      };
    }

    if (lower.includes('valenite') || lower.includes('electrion') || lower.includes('architect') || lower.includes('who made') || lower.includes('credit')) {
      return {
        reply: 'Valenite Electrion is the Founder and Creator of GENESIZ 2026. They built and organized the entire event from the ground up to bring students together through technology and competition.',
      };
    }

    if (lower.includes('schedule') || lower.includes('time') || lower.includes('date') || lower.includes('october 5') || lower.includes('timeline')) {
      return {
        reply: 'GENESIZ is on October 5, 2026:\n• 08:00 AM: Check-in & Verification\n• 09:00 AM: Opening Speech\n• 09:00 AM: CipherQuest Starts (Oct 5-9 on Discord)\n• 09:30 AM: AppForge & WebX Start\n• 10:30 AM: AlgoArena Coding Round\n• 02:00 PM: Brainbyte Live Quiz\n• 04:30 PM: Valorant Grand Final\n• 07:30 PM: Prize Ceremony & Closing',
      };
    }

    if (lower.includes('discord') || lower.includes('community') || lower.includes('server')) {
      return {
        reply: 'Join the official GENESIZ Discord server at https://discord.gg/narNSeybgR for live updates, match timings, and CipherQuest puzzle hints!',
      };
    }

    return {
      reply: `Thanks for your question about "${userText}"! For info on any of our 8 events, how to register, or the schedule, check the menu on the website or join our Discord (discord.gg/narNSeybgR).`,
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    soundFX.playKey();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, isSecret } = generateBotReply(textToSend);
      setIsTyping(false);
      soundFX.playSuccess();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        timestamp: 'Just now',
        isSecretUnlock: isSecret,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If secret command was triggered, launch the Cryptographic Sandbox modal!
      if (isSecret) {
        setTimeout(() => {
          soundFX.playWarp();
          onLaunchCipherSandbox();
        }, 1200);
      }
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Chatbot Window */}
      <div className="relative w-full max-w-xl h-[580px] bg-[#0a0a0f] border border-violet-900/50 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-zinc-950/90 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white tracking-wide">
                  GENESIZ AI Concierge
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400">
                Official Intelligence Node // Live 24/7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3.5 text-xs font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-violet-600 text-white font-medium rounded-tr-sm shadow-md'
                    : msg.isSecretUnlock
                    ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 font-mono text-xs shadow-lg'
                    : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 w-20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-900/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-white whitespace-nowrap cursor-pointer transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSubmit} className="p-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything about GENESIZ 2026..."
            className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-500 transition-colors"
          />
          <button
            type="submit"
            onMouseEnter={() => soundFX.playHover()}
            className="p-2.5 rounded-full bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
