import { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
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
import { GenesizChatbot } from './components/GenesizChatbot';
import type { EventDetail } from './data/eventsData';

export function App() {
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventDetail | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerInitialEventId, setRegisterInitialEventId] = useState<string | undefined>(undefined);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isCipherSandboxOpen, setIsCipherSandboxOpen] = useState<boolean>(false);

  const handleOpenRegister = (eventId?: string) => {
    setRegisterInitialEventId(eventId);
    setSelectedEventForModal(null);
    setIsRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-zinc-100 font-sans selection:bg-violet-500 selection:text-white">
      
      {/* Background Interactive Particle Constellation */}
      <ParticleCanvas />

      {/* Floating Modern Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection
          onOpenRegister={() => handleOpenRegister()}
          onOpenChatbot={() => setIsChatbotOpen(true)}
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
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenRegister={() => handleOpenRegister()}
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

      {/* GENESIZ AI Intelligence Chatbot */}
      <GenesizChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenRegister={(eventId) => handleOpenRegister(eventId)}
        onLaunchCipherSandbox={() => {
          setIsChatbotOpen(false);
          setIsCipherSandboxOpen(true);
        }}
      />

      {/* Secret CipherQuest Cryptographic Sandbox (Hidden Modal unlocked via Secret Chatbot Command) */}
      <CipherSandbox
        isOpen={isCipherSandboxOpen}
        onClose={() => setIsCipherSandboxOpen(false)}
      />

    </div>
  );
}

export default App;
