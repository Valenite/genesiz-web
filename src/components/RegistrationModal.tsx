import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Check, 
  AlertCircle,
  ShieldCheck,
  UserPlus,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS_DATA } from '../data/eventsData';
import { HolographicPass } from './HolographicPass';
import type { PassData } from './HolographicPass';
import { soundFX } from '../utils/audio';
import { registerNewTeam, joinExistingTeam, getRegistrations } from '../utils/registrationStorage';

interface RegistrationModalProps {
  initialEventId?: string;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  initialEventId, 
  onClose 
}) => {
  // Mode: 'new' (Team Leader / Solo) or 'join' (Team Member)
  const [regMode, setRegMode] = useState<'new' | 'join'>('new');

  // Mode 1: New Team / Solo / Update State
  const [leadName, setLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [teamName, setTeamName] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    initialEventId ? [initialEventId] : []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Pre-fill from existing LocalStorage registration on mount
  React.useEffect(() => {
    const existing = getRegistrations();
    if (existing.length > 0) {
      const lastReg = existing[existing.length - 1];
      setLeadName(lastReg.leaderName || '');
      setEmail(lastReg.leaderEmail || '');
      setTeamPassword(lastReg.teamPassword || '');
      setTeamName(lastReg.teamName || '');
      setInstitution(lastReg.institution || '');
      setDiscordTag(lastReg.discordTag || '');
      if (lastReg.selectedEvents && lastReg.selectedEvents.length > 0) {
        setSelectedEvents(lastReg.selectedEvents);
        setIsUpdating(true);
      }
    }
  }, []);

  // Mode 2: Join Team State
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [joinLeaderEmail, setJoinLeaderEmail] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [memberDiscordTag, setMemberDiscordTag] = useState('');

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

  const handleRegisterNewTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!leadName.trim() || !email.trim() || !institution.trim() || !teamPassword.trim()) {
      setErrorMessage('Please provide your name, institutional email, institution name, and a team security password.');
      return;
    }

    if (selectedEvents.length === 0) {
      setErrorMessage('Please select at least one discipline for accreditation.');
      return;
    }

    const eventNames = selectedEvents.map((id) => {
      const found = EVENTS_DATA.find((e) => e.id === id);
      return found ? found.name : id;
    });

    try {
      const record = registerNewTeam({
        leaderName: leadName.trim(),
        leaderEmail: email.trim(),
        teamPassword: teamPassword.trim(),
        teamName: teamName.trim() || `${leadName.trim()}'s Squad`,
        institution: institution.trim(),
        discordTag: discordTag.trim(),
        selectedEvents,
        selectedEventNames: eventNames,
      });

      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#ffffff', '#c4b5fd'],
        });
      } catch {
        // Ignore
      }

      setPassData({
        operativeId: record.id,
        name: record.leaderName,
        email: record.leaderEmail,
        teamName: record.teamName,
        institution: record.institution,
        selectedEvents: record.selectedEventNames,
        registrationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleJoinExistingTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!memberName.trim() || !memberEmail.trim() || !joinLeaderEmail.trim() || !joinPassword.trim()) {
      setErrorMessage('Please fill in your name, email, Team Leader Email, and Team Security Password.');
      return;
    }

    try {
      const record = joinExistingTeam({
        memberName: memberName.trim(),
        memberEmail: memberEmail.trim(),
        leaderEmail: joinLeaderEmail.trim(),
        teamPassword: joinPassword.trim(),
        discordTag: memberDiscordTag.trim(),
      });

      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#ffffff', '#a7f3d0'],
        });
      } catch {
        // Ignore
      }

      // Issue the EXACT SAME operative ID and pass details as the Team Captain!
      setPassData({
        operativeId: record.id,
        name: memberName.trim(),
        email: memberEmail.trim(),
        teamName: record.teamName,
        institution: record.institution,
        selectedEvents: record.selectedEventNames,
        registrationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'No registered team found matching that Captain Email and Password.');
    }
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
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-violet-900/40 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Team Registration Portal
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              GENESIZ 2026 - Official Event Registration
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

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 p-2 bg-zinc-950/90 border-b border-zinc-800/80">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setRegMode('new');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              regMode === 'new'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>1. Register / Update Events</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setRegMode('join');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              regMode === 'join'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Join Existing Team</span>
          </button>
        </div>

        {/* Existing Registration Update Banner */}
        {isUpdating && regMode === 'new' && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-violet-950/60 border border-violet-800/80 text-violet-200 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-sm">🔄</span>
              <span><strong>Your registration was found!</strong> Add or remove events below to update your pass.</span>
            </span>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body: MODE 1 (New Team / Solo) */}
        {regMode === 'new' && (
          <form onSubmit={handleRegisterNewTeam} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-300 text-sm">
            
            {/* Primary Details */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-violet-400 uppercase font-semibold block">Team Leader / Your Details</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Full Name *</label>
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
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-violet-300 mb-1.5">
                    Team Password * <span className="text-[10px] text-zinc-500 font-normal">(Teammates use this to join)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CyberSquad2026"
                    value={teamPassword}
                    onChange={(e) => setTeamPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-violet-900/60 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">School / College *</label>
                  <input
                    type="text"
                    required
                    placeholder="School or College Name"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Team Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Squad"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Discord Username / Phone</label>
                  <input
                    type="text"
                    placeholder="username / +91-XXXXXXXXXX"
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Events Selection */}
            <div className="space-y-3 pt-2 border-t border-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-400 uppercase font-semibold">Choose Your Events ({selectedEvents.length}/8)</span>
                <span className="text-[10px] text-zinc-400 font-mono">You can pick more than one</span>
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

            {/* Submit New Team */}
            <div className="pt-4 border-t border-zinc-800/80">
              <button
                type="submit"
                onMouseEnter={() => soundFX.playHover()}
                className="w-full py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Register Team & Issue Unique Operative Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* Form Body: MODE 2 (Join Existing Team) */}
        {regMode === 'join' && (
          <form onSubmit={handleJoinExistingTeam} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-300 text-sm">
            
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-xs font-mono text-emerald-200 space-y-1">
              <strong className="text-white block font-sans text-sm">Joining an Existing Team?</strong>
              <p className="leading-relaxed">
                Enter your Team Captain's Email and the Team Security Password they configured during registration. You will be assigned to their squad and issued the <strong>exact same Operative Code</strong>!
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block">1. Your Delegate Details</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Lee"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="member@institution.edu"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Your Discord Handle / Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="username / +91-XXXXXXXXXX"
                  value={memberDiscordTag}
                  onChange={(e) => setMemberDiscordTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-zinc-900">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block">2. Team Captain Verification</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Team Captain Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="captain@institution.edu"
                    value={joinLeaderEmail}
                    onChange={(e) => setJoinLeaderEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-emerald-900/60 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Team Security Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Set by Team Captain"
                    value={joinPassword}
                    onChange={(e) => setJoinPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-emerald-900/60 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit Join Team */}
            <div className="pt-4 border-t border-zinc-800/80">
              <button
                type="submit"
                onMouseEnter={() => soundFX.playHover()}
                className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Verify Credentials & Join Team Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
