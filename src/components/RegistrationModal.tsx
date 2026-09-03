import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Check, 
  Plus, 
  Trash2, 
  AlertCircle,
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS_DATA } from '../data/eventsData';
import { HolographicPass } from './HolographicPass';
import type { PassData } from './HolographicPass';
import { soundFX } from '../utils/audio';

interface RegistrationModalProps {
  initialEventId?: string;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  initialEventId, 
  onClose 
}) => {
  const [leadName, setLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [teamName, setTeamName] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    initialEventId ? [initialEventId] : []
  );
  const [teamMembers, setTeamMembers] = useState<{ name: string; tag: string }[]>([]);
  const [passData, setPassData] = useState<PassData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleEventSelection = (eventId: string) => {
    soundFX.playClick();
    setSelectedEvents((prev) => 
      prev.includes(eventId) 
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const addTeamMember = () => {
    soundFX.playClick();
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { name: '', tag: '' }]);
    }
  };

  const updateTeamMember = (index: number, field: 'name' | 'tag', value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const removeTeamMember = (index: number) => {
    soundFX.playClick();
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadName.trim() || !email.trim() || !institution.trim()) {
      setErrorMessage('Please provide your full legal name, institutional email, and institution name.');
      return;
    }

    if (selectedEvents.length === 0) {
      setErrorMessage('Please select at least one discipline for accreditation.');
      return;
    }

    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const operativeId = `GSZ-2026-${randomHex}`;

    const eventNames = selectedEvents.map((id) => {
      const found = EVENTS_DATA.find((e) => e.id === id);
      return found ? found.name : id;
    });

    soundFX.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#ffffff', '#c4b5fd'],
      });
    } catch {
      // Ignore
    }

    setPassData({
      operativeId,
      name: leadName.trim(),
      email: email.trim(),
      teamName: teamName.trim() || 'Individual Delegate',
      institution: institution.trim(),
      selectedEvents: eventNames,
      registrationDate: '05 OCT 2026',
    });
  };

  if (passData) {
    return <HolographicPass passData={passData} onClose={onClose} />;
  }

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
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-violet-900/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Delegate Accreditation Portal
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              GENESIZ 2026 // Official Inter-Institutional Accreditation
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-300 font-sans text-sm">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-900 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-violet-400 uppercase font-semibold block">1. Primary Delegate Information</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Institutional / Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="delegate@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Discord Handle / Contact Phone</label>
                <input
                  type="text"
                  placeholder="username / +91-XXXXXXXXXX"
                  value={discordTag}
                  onChange={(e) => setDiscordTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Affiliated Institution / University *</label>
                <input
                  type="text"
                  required
                  placeholder="Institution or University Name"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Delegation / Squad Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Apex Protocol"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {/* Events Matrix */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-violet-400 uppercase font-semibold">2. Select Disciplines ({selectedEvents.length}/8)</span>
              <span className="text-[10px] text-zinc-400 font-mono">Concurrent participation authorized</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EVENTS_DATA.map((event) => {
                const isSelected = selectedEvents.includes(event.id);
                return (
                  <div
                    key={event.id}
                    onClick={() => toggleEventSelection(event.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-violet-950/40 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${isSelected ? 'bg-violet-500 text-white' : 'border border-zinc-700'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white">{event.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{event.teamSize}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-violet-300">
                      {event.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Squad Members */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-violet-400 uppercase font-semibold">3. Co-Delegates & Team Members (Optional)</span>
              {teamMembers.length < 4 && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="text-xs font-mono text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Co-Delegate
                </button>
              )}
            </div>

            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-900">
                <span className="text-xs font-mono text-zinc-500 w-5">#{idx + 2}</span>
                <input
                  type="text"
                  placeholder="Co-Delegate Name"
                  value={member.name}
                  onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Discord / Email"
                  value={member.tag}
                  onChange={(e) => updateTeamMember(idx, 'tag', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeTeamMember(idx)}
                  className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-zinc-800/80">
            <button
              type="submit"
              onMouseEnter={() => soundFX.playHover()}
              className="w-full py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <span>Authorize Accreditation & Issue Credential</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
