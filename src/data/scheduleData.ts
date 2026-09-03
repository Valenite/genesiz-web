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
    time: '08:00 AM - 09:00 AM',
    title: 'Delegate Accreditation & Credential Verification',
    category: 'Ceremony',
    venue: 'Main Gate & Registration Nexus',
    description: 'Accreditation verification, pass issuance, delegate kit distribution, and computational terminal allocation.'
  },
  {
    time: '09:00 AM - 09:45 AM',
    title: 'GENESIZ 2026 Inaugural Keynote: The Genesis Protocol',
    category: 'Keynote',
    venue: 'Grand Auditorium',
    description: 'Inaugural address presented by Valenite Electrion, unveiling the technological vision, challenge frameworks, and tournament commencement.',
    highlight: true
  },
  {
    time: '09:00 AM (Oct 5 - 9)',
    title: 'CipherQuest: 4-Day Digital Cryptographic Symposium Commences',
    category: 'Coding',
    venue: 'Discord Intelligence HQ & Secure Portal',
    description: 'The 96-hour digital investigation commences globally. Tier 1 unlocks with progressive intelligence bulletins on Discord.',
    highlight: true
  },
  {
    time: '09:30 AM - 03:00 PM',
    title: 'AppForge & WebX Engineering Hackathons Kickoff',
    category: 'Hackathon',
    venue: 'Innovation Hub Alpha & Web Architecture Lab',
    description: 'Thematic directives unveiled. Engineering delegations commence 6 hours of intensive product development.'
  },
  {
    time: '09:45 AM - 02:00 PM',
    title: 'Valorant Championship: Group Stage Swiss Qualifying',
    category: 'Esports',
    venue: 'Esports Arena Stage A (240Hz Tournament Pods)',
    description: '16 Delegations compete in high-precision tactical BO1 group series with live analytical commentary.'
  },
  {
    time: '10:30 AM - 02:00 PM',
    title: 'AlgoArena: Algorithmic Engineering Trial',
    category: 'Coding',
    venue: 'AlgoLab Supercluster Arena',
    description: '3.5 Hours of competitive algorithmic problem-solving with automated sandboxed evaluation.'
  },
  {
    time: '11:00 AM - 03:00 PM',
    title: 'Bedwarz: Tactical Squad Arena Showdown',
    category: 'Esports',
    venue: 'Esports Arena Stage B',
    description: 'Strategic resource management, spatial control, and competitive 4v4 arena combat.'
  },
  {
    time: '01:00 PM - 02:00 PM',
    title: 'Executive Luncheon & Technology Networking',
    category: 'Ceremony',
    venue: 'Developer Lounge & Tech Arcade',
    description: 'Networking banquet, interactive hardware showcases, and delegate collaborations.'
  },
  {
    time: '02:00 PM - 05:00 PM',
    title: 'Brainbyte: High-Velocity Technical Symposium & Stage Quiz',
    category: 'Quiz',
    venue: 'Grand Auditorium Stage',
    description: 'Digital screening prelims followed by the top 6 delegate pairings competing on live wireless buzzers.',
    highlight: true
  },
  {
    time: '03:30 PM - 05:00 PM',
    title: 'AppForge & WebX Executive Demonstrations',
    category: 'Hackathon',
    venue: 'Innovation Hub Stage',
    description: 'Shortlisted delegations demonstrate mobile and web engineering architectures before the evaluation jury.'
  },
  {
    time: '04:00 PM - 06:00 PM',
    title: 'Surprise?!?!?!!: Confidential Wildcard Arena',
    category: 'Keynote',
    venue: 'Blackbox Stage',
    description: 'Classified rapid-adaptation technical challenge disclosed live on the main stage.',
    highlight: true
  },
  {
    time: '04:30 PM - 07:00 PM',
    title: 'Valorant Championship: Grand Finals Series',
    category: 'Esports',
    venue: 'Grand Auditorium Arena',
    description: 'Best-of-3 Grand Final series on the main arena display with live broadcast analysis.',
    highlight: true
  },
  {
    time: '07:30 PM - 09:00 PM',
    title: 'GENESIZ Grand Awards Convocation',
    category: 'Awards',
    venue: 'Grand Auditorium Arena',
    description: 'Felicitation of laureates across all disciplines, closing remarks by Valenite Electrion, and formal symposium conclusion.',
    highlight: true
  }
];
