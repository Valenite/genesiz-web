export interface ScheduleItem {
  time: string;
  title: string;
  category: 'Ceremony' | 'Coding' | 'Esports' | 'Hackathon' | 'Quiz' | 'Keynote' | 'Awards';
  venue: string;
  description: string;
  highlight?: boolean;
}

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    time: 'Oct 5 – Oct 7 @ 5:00 PM IST',
    title: 'Valorant Championship (5+1 Roster)',
    category: 'Esports',
    venue: 'Main Esports Arena & Discord Hub',
    description: '3 Evening sessions of 5v5 tactical FPS battles under official VCT regulation guidelines.',
    highlight: true
  },
  {
    time: 'Oct 8 – Oct 9 @ 5:00 PM IST',
    title: 'Minecraft Bedwarz (4+1 Roster)',
    category: 'Esports',
    venue: 'Esports Pods B & Discord Hub',
    description: '2 Evening sessions of tactical 4v4 squad PvP, resource management, and core objective defense.',
    highlight: true
  },
  {
    time: 'Oct 10 @ 5:00 PM IST',
    title: 'Brainbyte: Solo Stage Quiz',
    category: 'Quiz',
    venue: 'Grand Auditorium Stage',
    description: 'High-speed technical intelligence screening followed by live auditorium stage buzzer showdown.',
    highlight: true
  },
  {
    time: 'Oct 10 (Eve) – Oct 11 (Night)',
    title: 'AppForge: Mobile App Engineering Hackathon',
    category: 'Hackathon',
    venue: 'Innovation Hub & Discord HQ',
    description: 'Prompt released Oct 10 evening on Discord. 24-hour mobile development sprint due Oct 11 night.'
  },
  {
    time: 'Oct 10 (Eve) – Oct 11 (Night)',
    title: 'WebX: Modern Web Architecture Hackathon',
    category: 'Hackathon',
    venue: 'Web Architecture Lab & Discord HQ',
    description: 'Prompt released Oct 10 evening on Discord. 24-hour WebGL & UI architecture sprint due Oct 11 night.'
  },
  {
    time: 'Oct 10 (12 AM) – Oct 12 (12 AM)',
    title: 'CipherQuest: 48-Hour Cryptic Hunt',
    category: 'Coding',
    venue: 'Discord Intelligence HQ & Portal',
    description: '48 Continuous hours of digital forensics, OSINT, steganography, and multi-stage cryptographic vaults.',
    highlight: true
  },
  {
    time: 'Oct 12 – Oct 13 @ 6:00 PM IST',
    title: 'AlgoArena: Competitive Programming Arena',
    category: 'Coding',
    venue: 'AlgoLab Supercluster & Discord HQ',
    description: '2 Evening competitive programming contests testing algorithms, dynamic programming, and data structures.',
    highlight: true
  },
  {
    time: 'Commences Oct 14',
    title: 'Surprise?!?!?!!: Confidential Wildcard Arena',
    category: 'Keynote',
    venue: 'Blackbox Stage & Discord HQ',
    description: 'Classified rapid-adaptation technical challenge. Intel, directives, & timings released on Discord.',
    highlight: true
  }
];
