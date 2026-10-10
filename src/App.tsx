import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CipherSandbox } from './components/CipherSandbox';
import { EventGrid } from './components/EventGrid';
import { EventModal } from './components/EventModal';
import { ScheduleSection } from './components/ScheduleSection';
import { CreditsSection } from './components/CreditsSection';
import { CommunitySection } from './components/CommunitySection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminVaultModal } from './components/AdminVaultModal';
import { GenesizChatbot, ChatbotTriggerButton } from './components/GenesizChatbot';
import { CipherQuestPage, isCipherQuestPath } from './components/CipherQuestPages';
import { SurprisePage } from './components/SurprisePage';
import { DialerPage } from './components/DialerPage';
import { BrainByteQuiz, BrainByteScores } from './components/BrainByteQuiz';
import { BrainByte2Quiz, BrainByte2Scores, BrainByte2Admin } from './components/BrainByte2';
import type { EventDetail } from './data/eventsData';

export function App() {
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventDetail | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerInitialEventId, setRegisterInitialEventId] = useState<string | undefined>(undefined);
  const [isCipherSandboxOpen, setIsCipherSandboxOpen] = useState<boolean>(false);
  const [isAdminVaultOpen, setIsAdminVaultOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [adminOverride, setAdminOverride] = useState<boolean>(false);

  // Secret key sequence — type 'gsz' rapidly to bypass registration closure
  const keyBuf = useRef('');
  const keyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      keyBuf.current += e.key.toLowerCase();
      if (keyBuf.current.length > 3) keyBuf.current = keyBuf.current.slice(-3);
      if (keyTimer.current) clearTimeout(keyTimer.current);
      keyTimer.current = setTimeout(() => { keyBuf.current = ''; }, 2000);
      if (keyBuf.current === 'gsz') {
        setAdminOverride(true);
        setIsRegisterOpen(true);
        keyBuf.current = '';
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const p = window.location.pathname.replace(/\/$/, '');
  
  // One-way hash function to hide route strings from the JS bundle
  const getRouteHash = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash >>> 0;
  };

  const pHash = getRouteHash(p);

  if (pHash === 3897530548) return <BrainByteQuiz />;
  if (pHash === 2549185908) return <BrainByteScores />;
  if (pHash === 2088272650) return <BrainByte2Quiz />;
  if (pHash === 1266003046) return <BrainByte2Scores />;
  if (pHash === 1845853312) return <BrainByte2Admin />;

  if (pHash === 379042373) {
    return <DialerPage />;
  }

  if (pHash === 2655396702) {
    return <SurprisePage />;
  }

  if (isCipherQuestPath(pHash)) {
    return <CipherQuestPage />;
  }

  const handleOpenRegister = (eventId?: string) => {
    setRegisterInitialEventId(eventId);
    setSelectedEventForModal(null);
    setIsRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Precision Tech Grid Texture Overlay */}
      <div className="fixed inset-0 bg-tech-grid opacity-25 pointer-events-none z-0"></div>

      {/* Floating Modern Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection
          onOpenRegister={() => handleOpenRegister()}
        />

        <EventGrid
          onSelectEvent={(event) => setSelectedEventForModal(event)}
          onQuickRegister={(eventId) => handleOpenRegister(eventId)}
        />

        <ScheduleSection />

        <CreditsSection />

        <CommunitySection />

        <FAQSection />
      </main>

      {/* Clean Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister()}
        onOpenAdminVault={() => setIsAdminVaultOpen(true)}
      />

      {/* Event Dossier Modal */}
      {selectedEventForModal && (
        <EventModal
          event={selectedEventForModal}
          onClose={() => setSelectedEventForModal(null)}
          onRegisterEvent={(eventId) => handleOpenRegister(eventId)}
        />
      )}

      {/* Delegate Accreditation Modal */}
      {isRegisterOpen && (
        <RegistrationModal
          initialEventId={registerInitialEventId}
          adminOverride={adminOverride}
          onClose={() => {
            setIsRegisterOpen(false);
            setAdminOverride(false);
            setRegisterInitialEventId(undefined);
          }}
        />
      )}

      {/* Organizers Registration Vault Admin Modal */}
      {isAdminVaultOpen && (
        <AdminVaultModal onClose={() => setIsAdminVaultOpen(false)} />
      )}

      {/* Secret CipherQuest Cryptographic Sandbox */}
      <CipherSandbox
        isOpen={isCipherSandboxOpen}
        onClose={() => setIsCipherSandboxOpen(false)}
      />

      {/* GENESIZ AI Chatbot — floating trigger + modal */}
      {!isChatbotOpen && (
        <ChatbotTriggerButton onClick={() => setIsChatbotOpen(true)} />
      )}

      <GenesizChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenRegister={handleOpenRegister}
      />

    </div>
  );
}

export default App;
