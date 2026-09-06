export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Registration' | 'Events' | 'Discord & Community';
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'General',
    question: 'What is GENESIZ and who is the founding architect?',
    answer: 'GENESIZ is a premier inter-institutional technology symposium, competitive algorithmic arena, and tactical esports summit taking place on October 5, 2026. The symposium was conceived, architected, and powered by Valenite Electrion as a landmark technology convocation.'
  },
  {
    category: 'General',
    question: 'What is the operational structure of the symposium?',
    answer: 'GENESIZ operates a hybrid architecture: CipherQuest runs as a 4-day digital symposium via our secure Discord infrastructure (October 5 - 9), while algorithmic engineering, hackathons, quizzes, and esports take place on-site within dedicated computational arenas.'
  },
  {
    category: 'Registration',
    question: 'What is the delegation accreditation protocol?',
    answer: 'Accreditation to GENESIZ 2026 is fully open to all verified student delegates and academic institutions through the official accreditation portal. Once accredited, delegates receive verified access to all selected arenas.'
  },
  {
    category: 'Registration',
    question: 'Can delegates participate across multiple disciplines?',
    answer: 'Yes. Delegates may register for multiple disciplines provided there are no physical schedule conflicts. The 4-day online CipherQuest cryptic hunt is structured to allow concurrent participation alongside any on-site discipline.'
  },
  {
    category: 'Registration',
    question: 'What credentials are provided upon registration confirmation?',
    answer: 'Confirmed delegates receive an official Digital Operative Pass bearing a unique Operative ID and cryptographic QR verification code, downloadable in high resolution directly from this portal.'
  },
  {
    category: 'Events',
    question: 'What is the format and duration of CipherQuest?',
    answer: 'CipherQuest runs continuously for 4 days (96 consecutive hours), commencing on October 5, 2026 at 09:00 AM IST. Progressive intelligence releases and official lead bulletins will be broadcast on the official Discord server.'
  },
  {
    category: 'Events',
    question: 'What hardware provisions are supplied on-site?',
    answer: 'Delegates participating in software engineering sprints (AppForge, WebX) must bring personal laptops and chargers. For esports disciplines (Valorant & Bedwarz), high-refresh 240Hz tournament workstations are supplied on-site.'
  },
  {
    category: 'Discord & Community',
    question: 'How do delegates access the official Discord server?',
    answer: 'Delegates can join the official Discord server at https://discord.gg/RUGtbSYUHb to access community channels, squad formations, and real-time announcements.'
  }
];
