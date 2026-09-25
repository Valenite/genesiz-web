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
    time: 'Oct 5 @ 5:00 PM - 6:00 PM',
    title: 'BrainByte',
    category: 'Quiz',
    venue: 'Main Auditorium',
    description: 'High-speed technical intelligence screening followed by live stage buzzer showdown.',
    highlight: true
  },
  {
    time: 'Oct 6 - Oct 7 @ 6:00 PM - 9:00 PM',
    title: 'AlgoArena',
    category: 'Coding',
    venue: 'AlgoLab Supercluster & Discord HQ',
    description: 'Competitive programming contest testing algorithms, dynamic programming, and data structures.',
    highlight: true
  },
  {
    time: 'Oct 8 - Oct 9 @ 5:00 PM - 8:00 PM',
    title: 'WebX & AppForge',
    category: 'Hackathon',
    venue: 'Innovation Hub & Discord HQ',
    description: 'Build Ideas. Ship Solutions. App and Web architecture sprint.',
    highlight: true
  },
  {
    time: 'Oct 10 - Oct 12 @ 12:00 AM ONWARDS',
    title: 'CipherQuest',
    category: 'Coding',
    venue: 'Discord Intelligence HQ & Portal',
    description: 'Decode. Explore. Conquer. 48 Continuous hours of digital forensics and cryptographic vaults.',
    highlight: true
  },
  {
    time: 'Oct 13 - Oct 14 @ 5:00 PM ONWARDS',
    title: 'BedWarz',
    category: 'Esports',
    venue: 'Esports Pods B & Discord Hub',
    description: 'Build. Strategize. Survive. Tactical 4v4 squad PvP in Minecraft.',
    highlight: true
  },
  {
    time: 'Oct 15 - Oct 17 @ 5:00 PM ONWARDS',
    title: 'Valorant Championship',
    category: 'Esports',
    venue: 'Main Esports Arena & Discord Hub',
    description: 'Squad Up. Frag Out. 5v5 tactical FPS battles under official VCT regulation guidelines.',
    highlight: true
  },
  {
    time: 'Oct 18 @ 6:00 PM - 8:00 PM',
    title: 'Surprise Event',
    category: 'Keynote',
    venue: 'Blackbox Stage & Discord HQ',
    description: 'Expect the Unexpected. Classified rapid-adaptation technical challenge.',
    highlight: true
  },
  {
    time: 'Oct 20 - Oct 22',
    title: 'Results Out',
    category: 'Awards',
    venue: 'Online',
    description: 'Champions Rise. Final announcements for all events.',
    highlight: true
  }
];
