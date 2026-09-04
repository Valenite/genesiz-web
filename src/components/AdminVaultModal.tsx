import React, { useState } from 'react';
import { X, Shield, Copy, Check, Users, Database, FileSpreadsheet } from 'lucide-react';
import { getRegistrations, exportRegistrationsCSV } from '../utils/registrationStorage';
import { soundFX } from '../utils/audio';

interface AdminVaultModalProps {
  onClose: () => void;
}

export const AdminVaultModal: React.FC<AdminVaultModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const registrations = getRegistrations();

  const totalTeams = registrations.length;
  const totalMembers = registrations.reduce((acc, curr) => acc + curr.members.length, 0);
  const totalDelegates = totalTeams + totalMembers;

  const handleCopyJSON = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(JSON.stringify(registrations, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => {
          soundFX.playClick();
          onClose();
        }}
      />

      {/* Vault Modal */}
      <div className="relative w-full max-w-4xl bg-[#08080c] border border-indigo-900/50 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col font-sans">
        
        {/* Vault Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                GENESIZ 2026 // Registration Vault
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              Executive Organizers & Jury Telemetry Portal
            </p>
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

        {/* Stats Bar & Export Actions */}
        <div className="px-6 sm:px-8 py-4 bg-zinc-950/60 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Teams/Squads: <strong className="text-white">{totalTeams}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Total Delegates: <strong className="text-white">{totalDelegates}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyJSON}
              className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'JSON Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                exportRegistrationsCSV();
              }}
              className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Export to Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {registrations.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Shield className="w-12 h-12 text-zinc-700 mx-auto animate-pulse" />
              <p className="text-sm font-mono text-zinc-400">No delegate registrations recorded yet.</p>
              <p className="text-xs text-zinc-600">Registrations submitted via the modal will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((team, idx) => (
                <div 
                  key={team.id + idx}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3 font-mono text-xs"
                >
                  {/* Team Header */}
                  <div className="flex flex-wrap items-center justify-between border-b border-zinc-800/60 pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold text-xs tracking-wider">
                        {team.id}
                      </span>
                      <span className="text-sm font-bold text-white font-sans">{team.teamName}</span>
                    </div>

                    <div className="text-zinc-400 text-[11px]">
                      Pass: <span className="text-zinc-200 font-semibold">{team.teamPassword}</span> | Registered: {new Date(team.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Leader Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CAPTAIN / LEADER:</span>
                      <strong className="text-white font-sans text-xs">{team.leaderName}</strong>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px]">EMAIL:</span>
                      <span className="text-zinc-300">{team.leaderEmail}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px]">INSTITUTION:</span>
                      <span className="text-zinc-300">{team.institution}</span>
                    </div>
                  </div>

                  {/* Roster Members */}
                  {team.members.length > 0 && (
                    <div className="pt-2 border-t border-zinc-900 space-y-1.5">
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">Joined Team Members ({team.members.length}):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                        {team.members.map((m, mIdx) => (
                          <div key={mIdx} className="p-2 rounded bg-zinc-900/60 border border-zinc-800/50 flex items-center justify-between text-[11px]">
                            <span className="text-white font-sans font-medium">{m.name}</span>
                            <span className="text-zinc-400">{m.email}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-zinc-500 uppercase">Disciplines:</span>
                    {team.selectedEventNames.map((evt, eIdx) => (
                      <span key={eIdx} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 text-[10px] border border-zinc-800">
                        {evt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
