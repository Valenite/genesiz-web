import { useState } from 'react';
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
import type { EventDetail } from './data/eventsData';

export function App() {
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventDetail | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerInitialEventId, setRegisterInitialEventId] = useState<string | undefined>(undefined);
  const [isCipherSandboxOpen, setIsCipherSandboxOpen] = useState<boolean>(false);
  const [isAdminVaultOpen, setIsAdminVaultOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  if (isCipherQuestPath()) {
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
          onClose={() => {
            setIsRegisterOpen(false);
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
