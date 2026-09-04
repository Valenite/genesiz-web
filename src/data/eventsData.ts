export interface EventDetail {
  id: string;
  name: string;
  category: 'Cryptography' | 'Competitive Coding' | 'Esports' | 'Trivia & Quiz' | 'App Dev' | 'Web Dev' | 'Mystery';
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  teamSize: string;
  eligibility: string;
  format: 'Online 4-Day Hunt' | 'Online & On-Site' | 'LAN Arena' | 'Live Stage' | 'Hybrid Sprint';
  duration: string;
  date: string;
  time: string;
  venue: string;
  badge: string;
  iconName: string;
  rules: string[];
  rounds: {
    title: string;
    description: string;
    duration: string;
  }[];
  judgingCriteria: {
    metric: string;
    weight: string;
    detail: string;
  }[];
  toolsAndStack: string[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const EVENTS_DATA: EventDetail[] = [
  {
    id: 'cipherquest',
    name: 'CipherQuest',
    category: 'Cryptography',
    tagline: 'Cryptographic Forensics, OSINT & Deep Protocol Analysis.',
    shortDesc: 'A 48-hour continuous digital cryptographic hunt challenging analytical acumen across ciphers, steganography, audio forensics, and network analysis.',
    fullDesc: 'CipherQuest is an intensive 48-hour digital investigation symposium designed for analytical strategists and security researchers. Participants unravel complex multi-stage ciphers, hidden network payloads, audio frequency spectrograms, and obscure computational artifacts. Official intelligence bulletins and progressive lead drops are coordinated via the GENESIZ Discord headquarters.',
    teamSize: '2 Delegates',
    eligibility: 'Open to all academic delegates and technology scholars',
    format: 'Online 4-Day Hunt',
    duration: '48 Continuous Hours',
    date: 'October 10 - 12, 2026',
    time: '12:00 AM Oct 10 to 12:00 AM Oct 12 IST',
    venue: 'Discord Intelligence HQ & Secure Portal',
    badge: '48-HOUR CRYPTIC HUNT',
    iconName: 'Binary',
    rules: [
      'Each level delivers an encrypted artifact embedded in file metadata, compiled bytecode, network captures, or spatial coordinates.',
      'Submissions must strictly conform to normalized alphanumeric format unless explicitly specified by the challenge schema.',
      'Official intelligence releases and contextual hints are dispatched exclusively through the official Discord server.',
      'Schedule updates and further details will be communicated via official Discord.',
      'Inter-team collusion, credential sharing, and unauthorized disclosure will trigger immediate administrative disqualification.'
    ],
    rounds: [
      {
        title: 'Phase 1: Open-Source Intelligence & OSINT (Oct 10 12:00 AM)',
        description: 'Digital reconnaissance, layered substitution frameworks, and metadata extraction.',
        duration: 'Tiers 1 - 15'
      },
      {
        title: 'Phase 2: Deep Forensics & Signal Analysis (Oct 11)',
        description: 'Least-significant-bit steganography, spectral audio breakdown, and packet stream reconstruction.',
        duration: 'Tiers 16 - 35'
      },
      {
        title: 'Phase 3: Core Cryptanalysis Vault (Concludes Oct 12 12:00 AM)',
        description: 'Virtual machine bytecode evaluation, lateral logic sequences, and final root key synthesis.',
        duration: 'Tiers 36 - Final'
      }
    ],
    judgingCriteria: [
      { metric: 'Maximum Progression Tier', weight: '70%', detail: 'Primary standing determined by the furthest validated level.' },
      { metric: 'Timestamp Verification', weight: '30%', detail: 'Tie-breaker governed by earliest recorded submission timestamp.' }
    ],
    toolsAndStack: ['CyberChef', 'Wireshark', 'Burp Suite', 'Audacity', 'Python Cryptography', 'ExifTool'],
    faqs: [
      { q: 'Where are official intelligence releases provided during the hunt?', a: 'All official bulletins, announcements, and hint drops will be communicated through the GENESIZ Discord server (discord.gg/RUGtbSYUHb).' },
      { q: 'What is the permitted delegation composition?', a: 'Delegation composition is strictly 2 delegates per team.' }
    ]
  },
  {
    id: 'algoarena',
    name: 'AlgoArena',
    category: 'Competitive Coding',
    tagline: 'High-Performance Algorithmic Engineering & Optimization.',
    shortDesc: 'A competitive programming trial evaluating computational complexity, advanced data structures, dynamic programming, and mathematical proofs.',
    fullDesc: 'AlgoArena evaluates algorithmic precision, asymptotic optimization, and rapid problem decomposition under stringent temporal and spatial bounds. Benchmarked against elite competitive programming conventions, delegates architect robust solutions to sophisticated mathematical and structural problem sets.',
    teamSize: '2 Delegates',
    eligibility: 'Enrolled Academic Delegates',
    format: 'Online & On-Site',
    duration: 'Oct 12 - 13 (6:00 PM IST)',
    date: 'October 12 - 13, 2026',
    time: 'Evening from 6:00 PM IST',
    venue: 'AlgoLab Computational Arena & Discord HQ',
    badge: '2-PERSON PROGRAMMING ARENA',
    iconName: 'Code2',
    rules: [
      'Standard runtime environments: C++20 (GCC), Python 3.11, Java 17 LTS, Rust, and Go.',
      'Execution enforced within 1.0-second CPU time and 256MB memory allocations.',
      'Standard ICPC penalty paradigm applied for non-accepted compilation verdicts.',
      'Schedule updates and further details will be communicated via official Discord.',
      'Generative AI tooling and external synthesis assistance are strictly prohibited during session hours.'
    ],
    rounds: [
      {
        title: 'Session 1: Foundation Sprint (Oct 12 @ 6:00 PM IST)',
        description: 'Targeted computational scenarios focusing on two-pointer paradigms, greedy heuristics, and cumulative intervals.',
        duration: 'Evening Session'
      },
      {
        title: 'Session 2: Advanced Algorithmic Siege (Oct 13 @ 6:00 PM IST)',
        description: 'Sophisticated problems encompassing multi-dimensional DP, segment tree structures, graph traversal, and combinatorics.',
        duration: 'Evening Session'
      }
    ],
    judgingCriteria: [
      { metric: 'Verified Problem Verdicts', weight: '70%', detail: 'Rank determined by number of fully passed test suites.' },
      { metric: 'Cumulative Penalty Metrics', weight: '30%', detail: 'Evaluated based on submission duration and verified attempt efficiency.' }
    ],
    toolsAndStack: ['C++20 (GCC 13)', 'Python 3.11+', 'Java 17 LTS', 'Fast I/O Frameworks', 'Sandboxed Judge Engine'],
    faqs: [
      { q: 'Where are contest links & updates posted?', a: 'All contest portal links, problem statements, and real-time updates will be posted on Discord.' }
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant Championship',
    category: 'Esports',
    tagline: 'Precision Tactical Strategy & Spatial Coordination.',
    shortDesc: 'Premier 5v5 tactical arena tournament. Strategic utility coordination, synchronized execution, and high-caliber competitive FPS play.',
    fullDesc: 'The GENESIZ Valorant Championship is an elite tactical esports competition structured on official VCT competitive guidelines. Featuring dedicated low-latency tournament infrastructure, caster feeds, and spectator analysis, squads execute strategic offensive and defensive playbooks on official competitive map rotations.',
    teamSize: '5 + 1 Reserve',
    eligibility: 'Open Division Roster',
    format: 'LAN Arena',
    duration: 'Oct 5 - 7 (5:00 PM IST)',
    date: 'October 5 - 7, 2026',
    time: 'Evening from 5:00 PM IST',
    venue: 'Main Esports Arena & Discord Tournament Hub',
    badge: 'VCT REGULATION 5+1',
    iconName: 'Crosshair',
    rules: [
      'Squad composition: 5 Main Active Players + 1 Reserve Player.',
      'Tournament matches execute daily starting at 5:00 PM IST from Oct 5 to Oct 7.',
      'Active Competitive Map Pool: Ascent, Bind, Haven, Lotus, Sunset, Split, Abyss.',
      'Official Map Veto Protocol & Tactical timeouts standard.',
      'Schedule updates and further details will be communicated via official Discord.'
    ],
    rounds: [
      {
        title: 'Swiss Group Stage (Oct 5 @ 5:00 PM IST)',
        description: 'BO1 qualifying matches across group lobbies.',
        duration: 'Evening 5:00 PM'
      },
      {
        title: 'Knockout Bracket (Oct 6 @ 5:00 PM IST)',
        description: 'Single-elimination quarterfinal and semifinal series.',
        duration: 'Evening 5:00 PM'
      },
      {
        title: 'Grand Finals (Oct 7 @ 5:00 PM IST)',
        description: 'Best-of-3 series with live analytical stream broadcast.',
        duration: 'Evening 5:00 PM'
      }
    ],
    judgingCriteria: [
      { metric: 'Series Victory', weight: '80%', detail: 'Outcomes determined by official BO1 / BO3 match results.' },
      { metric: 'Round Differential & Combat Rating', weight: '20%', detail: 'Seeding and tie-break metrics.' }
    ],
    toolsAndStack: ['Riot Games Valorant Client', 'High-Refresh 240Hz Monitors', 'Low-Latency LAN Switch'],
    faqs: [
      { q: 'What is the exact squad roster structure?', a: 'Each roster consists of 5 active players + 1 reserve player (5+1).' }
    ]
  },
  {
    id: 'bedwarz',
    name: 'Bedwarz',
    category: 'Esports',
    tagline: 'Tactical Resource Management & Squad Defense.',
    shortDesc: 'A competitive 4v4 Minecraft tactical tournament. Fast-paced spatial control, resource prioritization, bridging efficiency, and synchronized objective defense.',
    fullDesc: 'Bedwarz delivers high-precision tactical PvP combat within optimized tournament servers. Squads manage resource allocation, generator control, and spatial fortifications across standardized competitive maps with optimized hit registration and low-latency networking.',
    teamSize: '4 + 1 Reserve',
    eligibility: 'Java Edition Delegates (1.8.9 PvP Mechanics)',
    format: 'LAN Arena',
    duration: 'Oct 8 - 9 (5:00 PM IST)',
    date: 'October 8 - 9, 2026',
    time: 'Evening from 5:00 PM IST',
    venue: 'Esports Pods B & Discord Hub',
    badge: '4+1 SQUAD PVP',
    iconName: 'Swords',
    rules: [
      'Squad composition: 4 Main Active Players + 1 Reserve Player.',
      'Tournament matches execute daily starting at 5:00 PM IST from Oct 8 to Oct 9.',
      'Minecraft Java Edition 1.8.9 client standard (Lunar / Badlion / Verified Vanilla).',
      'Schedule updates and further details will be communicated via official Discord.',
      'Unsportsmanlike stalling or unauthorized teaming will incur immediate forfeiture.'
    ],
    rounds: [
      {
        title: 'Phase 1: Double Elimination Brackets (Oct 8 @ 5:00 PM IST)',
        description: 'Qualifying squad lobbies to determine final bracket seeds.',
        duration: 'Evening 5:00 PM'
      },
      {
        title: 'Phase 2: Championship Final (Oct 9 @ 5:00 PM IST)',
        description: 'Final squads duel in high-stakes BO3 championship arenas.',
        duration: 'Evening 5:00 PM'
      }
    ],
    judgingCriteria: [
      { metric: 'Last Squad Standing', weight: '75%', detail: 'Primary standing determined by objective victory.' },
      { metric: 'Objective Breaches & Eliminations', weight: '25%', detail: 'Secondary ranking metric for tournament MVP honors.' }
    ],
    toolsAndStack: ['Minecraft Java 1.8.9', 'Custom High-Tick Match Server', 'Anti-Cheat Enforcement Node'],
    faqs: [
      { q: 'What is the squad size required?', a: 'Each team comprises 4 active players + 1 reserve player (4+1).' }
    ]
  },
  {
    id: 'brainbyte',
    name: 'Brainbyte',
    category: 'Trivia & Quiz',
    tagline: 'High-Velocity Technical Acumen & Cross-Domain Intelligence.',
    shortDesc: 'A premier live buzzer symposium covering computational history, advanced artificial intelligence, cryptography, system architecture, and tech culture.',
    fullDesc: 'Brainbyte is a high-speed intellectual duel designed to evaluate depth, speed, and breadth of technical comprehension. Featuring rapid-fire qualifying stages, negative-marking buzzer rounds, cross-domain connection matrices, and strategic pounce mechanisms, delegates compete on the grand stage.',
    teamSize: '1 Delegate',
    eligibility: 'Open to All Enrolled Delegates',
    format: 'Live Stage',
    duration: 'Oct 10 (5:00 PM IST)',
    date: 'October 10, 2026',
    time: 'Evening @ 5:00 PM IST',
    venue: 'Main Auditorium Stage',
    badge: 'SOLO STAGE QUIZ',
    iconName: 'Brain',
    rules: [
      'Participation is strictly individual (1 delegate per registration).',
      'Commences Oct 10 in the evening at 5:00 PM IST.',
      'Prelims digital screening followed by live stage buzzer final.',
      'Schedule updates and further details will be communicated via official Discord.',
      'Smart devices and external reference materials are strictly prohibited during competition.'
    ],
    rounds: [
      {
        title: 'Prelims: Digital Assessment Screening (5:00 PM IST)',
        description: '30 Inter-disciplinary questions spanning AI architecture, cybersecurity history, and computer science pioneers.',
        duration: '45 Mins'
      },
      {
        title: 'Stage Finale: High-Velocity Buzzer Showdown',
        description: 'High-stakes rapid-fire buzzer phase with progressive scoring multipliers on the main auditorium stage.',
        duration: '1 Hour 15 Mins'
      }
    ],
    judgingCriteria: [
      { metric: 'Cumulative Scoreboard Ranking', weight: '100%', detail: 'Total accumulated points across all stage phases after penalty deductions.' }
    ],
    toolsAndStack: ['Hardware Wireless Buzzers', 'Auditorium Display HUD', 'Synchronized Visual Feeds'],
    faqs: [
      { q: 'Is this an individual or team quiz?', a: 'Brainbyte is a solo event (1 delegate).' }
    ]
  },
  {
    id: 'appforge',
    name: 'AppForge',
    category: 'App Dev',
    tagline: 'Next-Generation Mobile Engineering & System Architecture.',
    shortDesc: 'A mobile application engineering hackathon. Architect scalable, responsive, and innovative native or cross-platform applications.',
    fullDesc: 'AppForge challenges software engineers and UI/UX designers to conceptualize, architect, and deploy high-performance mobile applications within a condensed time window. Solutions demonstrate robust state management, offline-first reliability, AI integration, and fluid micro-interactions using industry-standard mobile stacks.',
    teamSize: '1 Delegate',
    eligibility: 'Software Developers & UI/UX Designers',
    format: 'Hybrid Sprint',
    duration: 'Oct 10 Eve - Oct 11 Night',
    date: 'October 10 - 11, 2026',
    time: 'Prompt released Oct 10 Eve (Discord) | Deadline Oct 11 Night',
    venue: 'Innovation Hub & Discord Headquarters',
    badge: 'SOLO MOBILE HACKATHON',
    iconName: 'Smartphone',
    rules: [
      'Participation is individual (1 delegate).',
      'The official problem prompt is released on Oct 10 in the evening (exact time announced on Discord).',
      'Final project submission deadline is Oct 11 at night.',
      'Schedule updates and further details will be communicated via official Discord.',
      'All source code must be developed during the hackathon window in a public repository.'
    ],
    rounds: [
      {
        title: 'Prompt Release & Kickoff (Oct 10 Evening)',
        description: 'Thematic prompt disclosed on Discord. Delegates begin architectural design.',
        duration: 'Oct 10 Eve'
      },
      {
        title: 'Development & Build Window (Oct 11)',
        description: 'State persistence, API integrations, micro-interactions, and documentation.',
        duration: 'Full Day Oct 11'
      },
      {
        title: 'Final Submission Deadline (Oct 11 Night)',
        description: 'Repository link, demo video, and deployable build submitted on portal.',
        duration: 'Oct 11 Night'
      }
    ],
    judgingCriteria: [
      { metric: 'Technical Complexity & Architecture', weight: '35%', detail: 'Code modularity, state management robustness, and API efficiency.' },
      { metric: 'UI/UX Polish & Fluidity', weight: '30%', detail: 'Design ergonomics, responsiveness, and seamless micro-interactions.' },
      { metric: 'Innovation & Problem Alignment', weight: '25%', detail: 'Practical efficacy and originality of the solution.' },
      { metric: 'Presentation & Technical Defense', weight: '10%', detail: 'Clarity of documentation and demo video.' }
    ],
    toolsAndStack: ['Flutter / Dart', 'React Native / Expo', 'Kotlin / Jetpack Compose', 'Swift / SwiftUI', 'Firebase / Supabase'],
    faqs: [
      { q: 'When will the problem prompt be released?', a: 'The prompt will be released on Oct 10 in the evening on our official Discord server.' }
    ]
  },
  {
    id: 'webx',
    name: 'WebX',
    category: 'Web Dev',
    tagline: 'Modern Web Architecture, 3D Rendering & UI Engineering.',
    shortDesc: 'A state-of-the-art web engineering hackathon. Build immersive, high-performance web applications leveraging WebGL, responsive design, and fluid animation.',
    fullDesc: 'WebX serves as the premier stage for modern web artisans and frontend engineers. Delegates transcend conventional web interfaces to construct immersive digital experiences utilizing WebGL, modern component frameworks, responsive design systems, and fluid physics-based motion design.',
    teamSize: '1 Delegate',
    eligibility: 'Frontend & Full-Stack Developers',
    format: 'Hybrid Sprint',
    duration: 'Oct 10 Eve - Oct 11 Night',
    date: 'October 10 - 11, 2026',
    time: 'Prompt released Oct 10 Eve (Discord) | Deadline Oct 11 Night',
    venue: 'Web Architecture Lab & Discord Headquarters',
    badge: 'SOLO WEB ARCHITECTURE',
    iconName: 'Globe',
    rules: [
      'Participation is individual (1 delegate).',
      'The official problem prompt is released on Oct 10 in the evening (exact time announced on Discord).',
      'Final web deployment and repository submission deadline is Oct 11 at night.',
      'Schedule updates and further details will be communicated via official Discord.',
      'Production deployment on edge hosting platforms (Vercel, Netlify) is mandatory.'
    ],
    rounds: [
      {
        title: 'Prompt Release & Architecture Kickoff (Oct 10 Evening)',
        description: 'Requirements unveiled on Discord. Delegates initiate repository & design scaffolding.',
        duration: 'Oct 10 Eve'
      },
      {
        title: 'Full-Stack Integration & Motion Polish (Oct 11)',
        description: 'Endpoint connectivity, persistent state, transition choreography, and cross-device optimization.',
        duration: 'Full Day Oct 11'
      },
      {
        title: 'Deployment & Final Submission (Oct 11 Night)',
        description: 'Live URL deployment, repository submission, and documentation drop.',
        duration: 'Oct 11 Night'
      }
    ],
    judgingCriteria: [
      { metric: 'Visual Polish & Micro-Interactions', weight: '35%', detail: 'Aesthetic depth, motion physics, and visual refinement.' },
      { metric: 'Performance & Engineering Rigor', weight: '25%', detail: 'Clean code architecture, lighthouse benchmarks, and responsive fidelity.' },
      { metric: 'Functional Completeness & Flow', weight: '25%', detail: 'Feature completeness, resilient state handling, and intuitive user journey.' },
      { metric: 'Creative Distinction', weight: '15%', detail: 'Standout architectural decisions and innovation.' }
    ],
    toolsAndStack: ['React / Next.js', 'Vue / Nuxt', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    faqs: [
      { q: 'Where will prompt details be shared?', a: 'All prompt details and submission guidelines will be dispatched via Discord on Oct 10 evening.' }
    ]
  },
  {
    id: 'surprise',
    name: 'Surprise?!?!?!!',
    category: 'Mystery',
    tagline: 'Unclassified Challenge. Rapid Technical Adaptation.',
    shortDesc: 'A confidential wildcard challenge with zero advance briefing. Tests technical intuition, composure under pressure, and rapid problem-solving.',
    fullDesc: 'Surprise?!?!?!! is a confidential challenge unveiled only minutes prior to launch. From reverse engineering unfamiliar architectures to real-time crisis simulations and algorithmic speed runs, delegates must rely entirely on raw technical intuition, adaptability, and fundamental engineering principles.',
    teamSize: '2 Delegates',
    eligibility: 'Open to All Confirmed Delegates',
    format: 'Live Stage',
    duration: 'Commences Oct 14',
    date: 'Commences October 14, 2026',
    time: 'Intel & Timings released via Discord',
    venue: 'Blackbox Auditorium Stage & Discord HQ',
    badge: 'CLASSIFIED / 2 DELEGATES',
    iconName: 'Sparkles',
    rules: [
      'Team structure: 2 Delegates per team.',
      'Commences on October 14, 2026.',
      'Mission directives, exact timing, and briefing constraints are revealed on Discord.',
      'Schedule updates and further details will be communicated via official Discord.',
      'Delegates demonstrating the highest composure, analytical agility, and robust execution will prevail.'
    ],
    rounds: [
      {
        title: 'Phase Alpha: Classified Briefing (Oct 14)',
        description: 'Directive disclosure followed by the first wave of rapid analytical problems.',
        duration: 'Oct 14'
      },
      {
        title: 'Phase Beta: Dynamic Constraint Shift',
        description: 'Introduction of novel rules and real-time operational hurdles.',
        duration: 'Live Session'
      },
      {
        title: 'Phase Omega: The Final Synthesis',
        description: 'High-intensity conclusive sprint demanding rapid execution.',
        duration: 'Live Session'
      }
    ],
    judgingCriteria: [
      { metric: 'Adaptability & Analytical Speed', weight: '40%', detail: 'Speed and clarity in analyzing unfamiliar technical scenarios.' },
      { metric: 'Execution Accuracy', weight: '40%', detail: 'Precision of solution under shifting constraints and time pressure.' },
      { metric: 'Engineering Composure', weight: '20%', detail: 'Methodical composure and innovative problem resolution.' }
    ],
    toolsAndStack: ['Classified Toolset', 'Stage Telemetry Display', 'Analytical Intuition'],
    faqs: [
      { q: 'Where will timing details be released?', a: 'All timing and secret briefing guidelines will be released on Discord.' }
    ]
  }
];
