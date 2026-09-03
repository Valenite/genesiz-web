import React, { useRef } from 'react';
import { Download, QrCode, CheckCircle2, MessageSquare } from 'lucide-react';
import { soundFX } from '../utils/audio';

export interface PassData {
  operativeId: string;
  name: string;
  email: string;
  teamName: string;
  institution: string;
  selectedEvents: string[];
  registrationDate: string;
}

interface HolographicPassProps {
  passData: PassData;
  onClose: () => void;
}

export const HolographicPass: React.FC<HolographicPassProps> = ({ passData, onClose }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const DISCORD_URL = "https://discord.gg/RUGtbSYUHb";

  const handleDownload = () => {
    soundFX.playClick();
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 950;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark Monochrome Minimal Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 800, 950);

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 740, 890);

    // Header
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('GENESIZ 2026', 60, 95);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText('OFFICIAL ACCREDITATION CREDENTIAL // ARCHITECT: VALENITE ELECTRION', 60, 130);

    // ID
    ctx.font = '14px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('CREDENTIAL ID:', 60, 210);
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText(passData.operativeId, 60, 245);

    // Name
    ctx.font = '14px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('DELEGATE NAME:', 60, 310);
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(passData.name, 60, 345);

    // Team
    ctx.font = '14px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('DELEGATION / SQUAD:', 420, 310);
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(passData.teamName || 'INDIVIDUAL', 420, 345);

    // Institution
    ctx.font = '14px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('AFFILIATED INSTITUTION:', 60, 420);
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#e4e4e7';
    ctx.fillText(passData.institution, 60, 455);

    // Disciplines
    ctx.font = '14px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('ACCREDITED DISCIPLINES:', 60, 530);

    let y = 570;
    passData.selectedEvents.forEach((ev) => {
      ctx.fillStyle = '#121216';
      ctx.fillRect(60, y - 22, 680, 34);
      ctx.fillStyle = '#e4e4e7';
      ctx.font = '15px monospace';
      ctx.fillText(`• ${ev.toUpperCase()}`, 80, y);
      y += 42;
    });

    // Barcode
    ctx.fillStyle = '#ffffff';
    for (let x = 60; x < 740; x += Math.floor(Math.random() * 8 + 4)) {
      ctx.fillRect(x, 820, Math.random() > 0.5 ? 2.5 : 1, 40);
    }

    ctx.font = '11px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('OCTOBER 05, 2026 // CRYPTOGRAPHICALLY VERIFIED // DISCORD: discord.gg/RUGtbSYUHb', 60, 890);

    const link = document.createElement('a');
    link.download = `GENESIZ-CREDENTIAL-${passData.operativeId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Accreditation Validated</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            {passData.registrationDate}
          </span>
        </div>

        {/* Badge Card */}
        <div 
          ref={cardRef}
          className="rounded-2xl bg-[#0e0e0e] border border-zinc-800 p-6 space-y-4 text-left"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="font-extrabold text-xl text-white tracking-widest">
                GENESIZ 2026
              </h3>
              <p className="text-[10px] font-mono text-zinc-500">
                ARCHITECT: VALENITE ELECTRION
              </p>
            </div>
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-400">
              <QrCode className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">CREDENTIAL ID</span>
              <span className="text-violet-400 font-bold text-base">{passData.operativeId}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">DELEGATE NAME</span>
                <span className="text-white font-medium truncate block">{passData.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">DELEGATION</span>
                <span className="text-zinc-300 font-medium truncate block">{passData.teamName || 'Individual'}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">INSTITUTION</span>
              <span className="text-zinc-300 truncate block">{passData.institution}</span>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                DISCIPLINES ({passData.selectedEvents.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {passData.selectedEvents.map((ev) => (
                  <span key={ev} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {ev}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Discord reminder on pass */}
        <div className="p-3.5 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-between text-xs">
          <div className="text-zinc-300">
            <span className="font-semibold block text-white">Join the Discord Headquarters</span>
            <span className="text-[11px] text-zinc-400">Required for 4-day CipherQuest & operations.</span>
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-[11px] font-medium flex items-center gap-1 shrink-0"
          >
            <MessageSquare className="w-3 h-3" />
            Connect
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            onMouseEnter={() => soundFX.playHover()}
            className="flex-1 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download Pass (PNG)
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white text-xs font-mono border border-zinc-800"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
};
