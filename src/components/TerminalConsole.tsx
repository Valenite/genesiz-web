import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundFX } from '../utils/audio';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerRegister: (eventId?: string) => void;
}

interface CommandHistory {
  type: 'input' | 'output' | 'error' | 'success' | 'ascii';
  text: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ 
  isOpen, 
  onClose,
  onTriggerRegister 
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { 
      type: 'ascii', 
      text: [
        "  ██████╗ ███████╗███╗   ██╗███████╗███████╗██╗███████╗",
        " ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔════╝██║╚══███╔╝",
        " ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ███████╗██║  ███╔╝ ",
        " ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║██║ ███╔╝  ",
        " ╚██████╔╝███████╗██║ ╚████║███████╗███████║██║███████╗",
        "  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝╚══════╝"
      ].join('\n')
    },
    { type: 'success', text: 'GENESIZ v2.6.0 KERNEL ONLINE // OCTOBER 05, 2026' },
    { type: 'output', text: 'GENESIZ 2026 // ALL SYSTEMS NORMAL' },
    { type: 'output', text: 'Type "help" for command matrix, or "discord" to connect to HQ.' },
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    soundFX.playKey();
    const newHistory: CommandHistory[] = [...history, { type: 'input', text: `> ${cmd}` }];
    const lowerCmd = cmd.toLowerCase();
    const parts = lowerCmd.split(' ');
    const root = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (root) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `
AVAILABLE COMMANDS:
  events          - List all 8 events
  event <name>    - Get info on a specific event (e.g. "event cipherquest")
  discord         - Open official Discord server (discord.gg/RUGtbSYUHb)
  valenite        - About the creator, Valenite Electrion
  schedule        - Show full timetable for October 5, 2026
  date            - Show countdown to GENESIZ 2026
  register        - Open registration form
  matrix          - Toggle matrix visual mode
  clear           - Clear the terminal
  exit            - Close terminal
          `.trim(),
        });
        break;

      case 'discord':
        newHistory.push({
          type: 'success',
          text: 'OFFICIAL DISCORD: https://discord.gg/RUGtbSYUHb\n(Join for CipherQuest hints, live schedules, and updates)',
        });
        window.open('https://discord.gg/RUGtbSYUHb', '_blank');
        break;

      case 'events':
      case 'disciplines':
        newHistory.push({
          type: 'output',
          text: `
GENESIZ 2026 EVENTS:
  1. CipherQuest          [CRYPTIC HUNT]          (4-Day Online Event)
  2. AlgoArena            [CODING COMPETITION]    (ICPC Style)
  3. Valorant Championship[FPS ESPORTS]           (5v5 LAN)
  4. Bedwarz              [MINECRAFT 4v4]         (LAN)
  5. Brainbyte            [LIVE QUIZ]             (Stage Buzzer)
  6. AppForge             [APP BUILDING]          (6h Sprint)
  7. WebX                 [WEBSITE BUILDING]      (6h Sprint)
  8. Surprise?!?!?!!      [SECRET EVENT]          (Live Stage)

Type "event <name>" to see full details.
          `.trim(),
        });
        break;

      case 'event': {
        if (!arg) {
          newHistory.push({ type: 'error', text: 'ERROR: Please specify an event name. Example: "event cipherquest"' });
          break;
        }
        const match = EVENTS_DATA.find(
          (ev) => ev.id.toLowerCase().includes(arg) || ev.name.toLowerCase().includes(arg)
        );
        if (match) {
          newHistory.push({
            type: 'success',
            text: `
[EVENT: ${match.name.toUpperCase()}]
Category:    ${match.category}
Format:      ${match.format} | ${match.duration}
Team Size:   ${match.teamSize}
Venue:       ${match.venue}
Description: ${match.fullDesc}
            `.trim(),
          });
        } else {
          newHistory.push({ type: 'error', text: `ERROR: Event "${arg}" not found.` });
        }
        break;
      }

      case 'valenite':
      case 'credits':
        newHistory.push({
          type: 'success',
          text: `
======================================================================
  FOUNDING LEADERSHIP: BHAVYA & PRATYAKSH (CO-PRESIDENTS)
======================================================================
  Co-Presidents & Organizers of GENESIZ 2026.
  Built and organized the entire event alongside the executive team
  to bring students together through technology and competition.
======================================================================
          `.trim(),
        });
        break;

      case 'date': {
        const target = new Date('2026-10-05T09:00:00+05:30').getTime();
        const now = new Date().getTime();
        const days = Math.floor((target - now) / (1000 * 60 * 60 * 24));
        newHistory.push({
          type: 'output',
          text: `EVENT DATE: October 5, 2026 @ 09:00 AM IST\nCOUNTDOWN: ${days} DAYS UNTIL GENESIZ 2026`,
        });
        break;
      }

      case 'schedule':
        newHistory.push({
          type: 'output',
          text: `
OCTOBER 5, 2026 SCHEDULE:
  08:00 AM - Check-in & Verification
  09:00 AM - Opening Address & Keynote
  09:00 AM - CipherQuest 4-Day Hunt Starts (on Discord)
  09:30 AM - AppForge & WebX Sprint Begins
  09:45 AM - Valorant Swiss Qualifier Rounds
  10:30 AM - AlgoArena Coding Round
  11:00 AM - Bedwarz 4v4 Minecraft Showdown
  02:00 PM - Brainbyte Live Quiz
  04:00 PM - Surprise?!?!?!! Secret Event
  04:30 PM - Valorant Grand Final
  07:30 PM - Prize Ceremony & Closing
          `.trim(),
        });
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        newHistory.push({
          type: 'success',
          text: `Matrix Visual Mode: ${!isMatrixMode ? 'ACTIVATED' : 'DEACTIVATED'}`,
        });
        break;

      case 'register':
        onClose();
        onTriggerRegister();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Terminal Window */}
      <div className={`relative w-full max-w-2xl h-[520px] bg-[#050505] border ${isMatrixMode ? 'border-emerald-500 shadow-2xl' : 'border-zinc-800 shadow-2xl'} rounded-2xl overflow-hidden z-10 flex flex-col font-mono text-xs`}>
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#0a0a0a] border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="text-zinc-400 font-mono text-xs ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>genesiz-cli:~#</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 rounded text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2 text-zinc-300">
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'ascii' && (
                <pre className={`text-[8px] sm:text-[9px] md:text-[10px] leading-tight font-black overflow-x-auto ${isMatrixMode ? 'text-emerald-400' : 'text-white'}`}>
                  {line.text}
                </pre>
              )}
              {line.type === 'input' && (
                <div className="text-white font-bold flex items-center gap-1">
                  <span className="text-violet-400">&gt;</span>
                  <span>{line.text.replace(/^> /, '')}</span>
                </div>
              )}
              {line.type === 'output' && (
                <pre className="whitespace-pre-wrap text-zinc-400 font-mono text-xs">
                  {line.text}
                </pre>
              )}
              {line.type === 'success' && (
                <pre className={`whitespace-pre-wrap font-mono text-xs ${isMatrixMode ? 'text-emerald-400' : 'text-violet-300'}`}>
                  {line.text}
                </pre>
              )}
              {line.type === 'error' && (
                <pre className="whitespace-pre-wrap text-rose-400 font-mono text-xs">
                  {line.text}
                </pre>
              )}
            </div>
          ))}
          <div ref={terminalEndRef}></div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="p-3 bg-[#080808] border-t border-zinc-900 flex items-center gap-2">
          <span className="text-violet-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={() => soundFX.playKey()}
            placeholder="Type 'help', 'events', 'discord', 'valenite', 'schedule'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-zinc-600"
          />
          <button 
            type="submit"
            className="px-3 py-1 rounded-md bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200"
          >
            Run
          </button>
        </form>

      </div>
    </div>
  );
};
