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
    shortDesc: 'A rigorous 4-day cryptographic marathon challenging analytical acumen across multi-layered ciphers, steganography, audio forensics, and network forensics.',
    fullDesc: 'CipherQuest is an intensive 96-hour digital investigation symposium designed for analytical strategists and security researchers. Participants unravel complex multi-stage ciphers, hidden network payloads, audio frequency spectrograms, and obscure computational artifacts. Official intelligence bulletins and progressive lead drops are coordinated via the GENESIZ Discord headquarters.',
    teamSize: '1 - 2 Delegates',
    eligibility: 'Open to all academic delegates and technology scholars',
    format: 'Online 4-Day Hunt',
    duration: '4 Days (96 Continuous Hours)',
    date: 'October 5 - 9, 2026',
    time: 'Commences Oct 5 @ 09:00 AM IST',
    venue: 'Discord Intelligence HQ & Secure Portal',
    badge: '4-DAY DIGITAL SYMPOSIUM',
    iconName: 'Binary',
    rules: [
      'Each level delivers an encrypted artifact embedded in file metadata, compiled bytecode, network captures, or spatial coordinates.',
      'Submissions must strictly conform to normalized alphanumeric format unless explicitly specified by the challenge schema.',
      'Automated brute-force attacks and denial-of-service attempts against infrastructure are strictly prohibited and monitored.',
      'Official intelligence releases and contextual hints are dispatched exclusively through the official Discord server.',
      'Inter-team collusion, credential sharing, and unauthorized disclosure will trigger immediate administrative disqualification.'
    ],
    rounds: [
      {
        title: 'Phase 1: Open-Source Intelligence & Classical Ciphers (Day 1)',
        description: 'Digital reconnaissance, layered substitution frameworks, and metadata extraction.',
        duration: 'Tiers 1 - 15'
      },
      {
        title: 'Phase 2: Deep Forensics & Signal Analysis (Days 2 - 3)',
        description: 'Least-significant-bit steganography, spectral audio breakdown, and packet stream reconstruction.',
        duration: 'Tiers 16 - 35'
      },
      {
        title: 'Phase 3: Core Cryptanalysis & Algorithmic Vault (Day 4)',
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
      { q: 'Where are official intelligence releases provided during the 4 days?', a: 'All official bulletins, announcements, and hint drops will be communicated through the GENESIZ Discord server (discord.gg/RUGtbSYUHb).' },
      { q: 'What is the permitted delegation composition?', a: 'Delegates may participate individually or in collaborative pairings of two.' }
    ]
  },
  {
    id: 'algoarena',
    name: 'AlgoArena',
    category: 'Competitive Coding',
    tagline: 'High-Performance Algorithmic Engineering & Optimization.',
    shortDesc: 'A competitive programming trial evaluating computational complexity, advanced data structures, dynamic programming, and mathematical proofs.',
    fullDesc: 'AlgoArena evaluates algorithmic precision, asymptotic optimization, and rapid problem decomposition under stringent temporal and spatial bounds. Benchmarked against elite competitive programming conventions, delegates architect robust solutions to sophisticated mathematical and structural problem sets.',
    teamSize: '1 - 2 Engineers',
    eligibility: 'Enrolled Academic Delegates',
    format: 'Online & On-Site',
    duration: '3.5 Hours',
    date: 'October 5, 2026',
    time: '10:30 AM - 02:00 PM',
    venue: 'AlgoLab Computational Arena',
    badge: 'ICPC-STANDARD BENCHMARK',
    iconName: 'Code2',
    rules: [
      'Standard runtime environments: C++20 (GCC), Python 3.11, Java 17 LTS, Rust, and Go.',
      'Execution enforced within 1.0-second CPU time and 256MB memory allocations.',
      'Standard ICPC penalty paradigm applied for non-accepted compilation verdicts.',
      'Automated source-code similarity evaluation (MOSS) enforced post-contest.',
      'Generative AI tooling and external synthesis assistance are strictly prohibited during session hours.'
    ],
    rounds: [
      {
        title: 'Division Gamma: Foundation Sprint',
        description: '3 Targeted computational scenarios focusing on two-pointer paradigms, greedy heuristics, and cumulative intervals.',
        duration: '45 Mins'
      },
      {
        title: 'Division Alpha: Advanced Algorithmic Siege',
        description: '5 Sophisticated problems encompassing multi-dimensional DP, segment tree structures, graph traversal, and combinatorics.',
        duration: '2 Hours 45 Mins'
      }
    ],
    judgingCriteria: [
      { metric: 'Verified Problem Verdicts', weight: '70%', detail: 'Rank determined by number of fully passed test suites.' },
      { metric: 'Cumulative Penalty Metrics', weight: '30%', detail: 'Evaluated based on submission duration and verified attempt efficiency.' }
    ],
    toolsAndStack: ['C++20 (GCC 13)', 'Python 3.11+', 'Java 17 LTS', 'Fast I/O Frameworks', 'Sandboxed Judge Engine'],
    faqs: [
      { q: 'What development environments are standard on-site?', a: 'Standard development toolchains including VS Code, CLion, and terminal compilers are configured.' }
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant Championship',
    category: 'Esports',
    tagline: 'Precision Tactical Strategy & Spatial Coordination.',
    shortDesc: 'Premier 5v5 tactical arena tournament. Strategic utility coordination, synchronized execution, and high-caliber competitive FPS play.',
    fullDesc: 'The GENESIZ Valorant Championship is an elite tactical esports competition structured on official VCT competitive guidelines. Featuring dedicated low-latency tournament infrastructure, caster feeds, and spectator analysis, squads execute strategic offensive and defensive playbooks on official competitive map rotations.',
    teamSize: '5 Active + 1 Reserve',
    eligibility: 'Open Division Roster',
    format: 'LAN Arena',
    duration: 'Full Day Championship',
    date: 'October 5, 2026',
    time: '09:30 AM - 07:00 PM',
    venue: 'Main Esports Arena',
    badge: 'VCT REGULATION 5V5',
    iconName: 'Crosshair',
    rules: [
      'Standard Tournament Configuration enabled with Overtime Win-by-2 protocol.',
      'Active Competitive Map Pool: Ascent, Bind, Haven, Lotus, Sunset, Split, Abyss.',
      'Official Map Veto Protocol (Toss -> Ban -> Ban -> Pick -> Pick -> Decider).',
      'Tactical timeouts standard (2 x 60s per map per squad).',
      'Riot Vanguard anti-cheat active across all tournament machines.'
    ],
    rounds: [
      {
        title: 'Swiss System Group Qualifying',
        description: 'Best-of-1 series to determine seeded qualification into the Championship Bracket.',
        duration: 'Morning Session'
      },
      {
        title: 'Championship Bracket Elimination',
        description: 'Single-elimination quarterfinal and semifinal series.',
        duration: 'Afternoon Session'
      },
      {
        title: 'Grand Finals (Main Stage Arena)',
        description: 'Best-of-3 series with custom map drafting and live analytical broadcast.',
        duration: '04:30 PM - 07:00 PM'
      }
    ],
    judgingCriteria: [
      { metric: 'Series Victory', weight: '80%', detail: 'Outcomes determined by official BO1 / BO3 match results.' },
      { metric: 'Round Differential & Combat Rating', weight: '20%', detail: 'Seeding and tie-break metrics.' }
    ],
    toolsAndStack: ['Riot Games Valorant Client', 'High-Refresh 240Hz Monitors', 'Low-Latency LAN Switch'],
    faqs: [
      { q: 'Are personal peripherals permitted?', a: 'Yes, delegates are permitted to connect personal mice, mechanical keyboards, and headsets.' }
    ]
  },
  {
    id: 'bedwarz',
    name: 'Bedwarz',
    category: 'Esports',
    tagline: 'Tactical Resource Management & Squad Defense.',
    shortDesc: 'A competitive 4v4 Minecraft tactical tournament. Fast-paced spatial control, resource prioritization, bridging efficiency, and synchronized objective defense.',
    fullDesc: 'Bedwarz delivers high-precision tactical PvP combat within optimized tournament servers. Squads manage resource allocation, generator control, and spatial fortifications across standardized competitive maps with optimized hit registration and low-latency networking.',
    teamSize: '4 Delegates (Squad)',
    eligibility: 'Java Edition Delegates (1.8.9 PvP Mechanics)',
    format: 'LAN Arena',
    duration: '4 Hours',
    date: 'October 5, 2026',
    time: '11:00 AM - 03:00 PM',
    venue: 'Esports Pods B',
    badge: '4V4 SQUAD ARENA',
    iconName: 'Swords',
    rules: [
      'Minecraft Java Edition 1.8.9 client standard (Lunar / Badlion / Verified Vanilla).',
      'Unmodified client integrity enforced with server-side rate detection.',
      'Squads must defend their objective core while strategically dismantling opposing fortifications.',
      'Map selection drawn randomly from the official tournament rotation.',
      'Unsportsmanlike stalling or unauthorized teaming will incur immediate forfeiture.'
    ],
    rounds: [
      {
        title: 'Phase 1: Double Elimination Brackets',
        description: '16 Squads compete across multi-team qualifying lobbies to determine final seeds.',
        duration: '2 Hours'
      },
      {
        title: 'Phase 2: Championship Showcase',
        description: 'Final 4 squads duel in high-stakes Best-of-3 championship arenas.',
        duration: '2 Hours'
      }
    ],
    judgingCriteria: [
      { metric: 'Last Squad Standing', weight: '75%', detail: 'Primary standing determined by objective victory.' },
      { metric: 'Objective Breaches & Eliminations', weight: '25%', detail: 'Secondary ranking metric for tournament MVP honors.' }
    ],
    toolsAndStack: ['Minecraft Java 1.8.9', 'Custom High-Tick Match Server', 'Anti-Cheat Enforcement Node'],
    faqs: [
      { q: 'Which client modifications are permissible?', a: 'Standard performance clients including Lunar, Badlion, and Vanilla with OptiFine are authorized.' }
    ]
  },
  {
    id: 'brainbyte',
    name: 'Brainbyte',
    category: 'Trivia & Quiz',
    tagline: 'High-Velocity Technical Acumen & Cross-Domain Intelligence.',
    shortDesc: 'A premier live buzzer symposium covering computational history, advanced artificial intelligence, cryptography, system architecture, and tech culture.',
    fullDesc: 'Brainbyte is a high-speed intellectual duel designed to evaluate depth, speed, and breadth of technical comprehension. Featuring rapid-fire qualifying stages, negative-marking buzzer rounds, cross-domain connection matrices, and strategic pounce mechanisms, delegates compete on the grand stage.',
    teamSize: '2 Quiz Delegates',
    eligibility: 'Open to All Enrolled Delegates',
    format: 'Live Stage',
    duration: '3 Hours',
    date: 'October 5, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'Main Auditorium Stage',
    badge: 'LIVE STAGE BUZZER',
    iconName: 'Brain',
    rules: [
      'Preliminary digital assessment will select the top 6 delegate pairings for the stage arena.',
      'Live stage buzzer rounds enforce a 10-second response window with negative marking for incorrect attempts.',
      'Pounce and pass mechanics active on designated specialized question sets.',
      'The Quizmaster ruling is authoritative and final on all interpretive inquiries.',
      'Smart devices and external reference materials are strictly prohibited on stage.'
    ],
    rounds: [
      {
        title: 'Prelims: Digital Assessment Screening',
        description: '30 Inter-disciplinary questions spanning AI architecture, cybersecurity history, and computer science pioneers.',
        duration: '45 Mins'
      },
      {
        title: 'Semifinals: The Connection Matrix',
        description: 'Top 6 pairings analyze visual clues, audio forensics snippets, and multi-layered thematic connections.',
        duration: '1 Hour'
      },
      {
        title: 'Grand Finale: High-Velocity Buzzer Showdown',
        description: 'High-stakes rapid-fire buzzer phase with progressive scoring multipliers.',
        duration: '1 Hour 15 Mins'
      }
    ],
    judgingCriteria: [
      { metric: 'Cumulative Scoreboard Ranking', weight: '100%', detail: 'Total accumulated points across all stage phases after penalty deductions.' }
    ],
    toolsAndStack: ['Hardware Wireless Buzzers', 'Auditorium Display HUD', 'Synchronized Visual Feeds'],
    faqs: [
      { q: 'What domains of knowledge are tested?', a: 'Domains include theoretical computer science, machine learning, cryptography, internet history, hardware architecture, and tech culture.' }
    ]
  },
  {
    id: 'appforge',
    name: 'AppForge',
    category: 'App Dev',
    tagline: 'Next-Generation Mobile Engineering & System Architecture.',
    shortDesc: 'A rigorous 6-hour mobile application engineering hackathon. Architect scalable, responsive, and innovative native or cross-platform applications.',
    fullDesc: 'AppForge challenges software engineers and UI/UX designers to conceptualize, architect, and deploy high-performance mobile applications within a condensed time window. Solutions demonstrate robust state management, offline-first reliability, AI integration, and fluid micro-interactions using industry-standard mobile stacks.',
    teamSize: '2 - 4 Engineers',
    eligibility: 'Software Developers & UI/UX Designers',
    format: 'Hybrid Sprint',
    duration: '6-Hour Development Sprint',
    date: 'October 5, 2026',
    time: '09:00 AM - 03:00 PM',
    venue: 'Innovation Hub Alpha',
    badge: 'MOBILE SPRINT',
    iconName: 'Smartphone',
    rules: [
      'The official problem statement and thematic constraints are disclosed at 09:00 AM on contest day.',
      'All source code must be developed during the event window and maintained in a public repository with an initial commit at 09:00 AM.',
      'Open-source frameworks, third-party libraries, and public APIs are authorized with proper attribution.',
      'Final submission mandates a deployable binary (APK/IPA/Web preview), live emulator demonstration, and technical documentation.',
      'Pre-authored complete solutions will be disqualified upon source inspection.'
    ],
    rounds: [
      {
        title: 'Sprint 1: Architecture, Data Models & UI Scaffolding',
        description: 'System design, API integrations, and core interaction framework.',
        duration: '09:00 AM - 12:00 PM'
      },
      {
        title: 'Sprint 2: Logic Hardening, Edge Cases & Polish',
        description: 'State persistence, background workers, animations, and final optimization.',
        duration: '12:00 PM - 03:00 PM'
      },
      {
        title: 'Phase 3: Executive Technical Demonstrations',
        description: '3-Minute live presentation and architectural review before the jury.',
        duration: '03:30 PM - 05:00 PM'
      }
    ],
    judgingCriteria: [
      { metric: 'Technical Complexity & Architecture', weight: '35%', detail: 'Code modularity, state management robustness, and API efficiency.' },
      { metric: 'UI/UX Polish & Fluidity', weight: '30%', detail: 'Design ergonomics, responsiveness, and seamless micro-interactions.' },
      { metric: 'Innovation & Problem Alignment', weight: '25%', detail: 'Practical efficacy and originality of the solution.' },
      { metric: 'Presentation & Technical Defense', weight: '10%', detail: 'Clarity of presentation and technical rationale during judge evaluation.' }
    ],
    toolsAndStack: ['Flutter / Dart', 'React Native / Expo', 'Kotlin / Jetpack Compose', 'Swift / SwiftUI', 'Firebase / Supabase'],
    faqs: [
      { q: 'Are both native and cross-platform frameworks accepted?', a: 'Yes, applications built with native tools (Swift, Kotlin) and cross-platform frameworks (Flutter, React Native) are evaluated equally based on execution.' }
    ]
  },
  {
    id: 'webx',
    name: 'WebX',
    category: 'Web Dev',
    tagline: 'Modern Web Architecture, 3D Rendering & UI Engineering.',
    shortDesc: 'A state-of-the-art web engineering hackathon. Build immersive, high-performance web applications leveraging WebGL, responsive design, and fluid animation.',
    fullDesc: 'WebX serves as the premier stage for modern web artisans and frontend engineers. Delegates transcend conventional web interfaces to construct immersive digital experiences utilizing WebGL, modern component frameworks, responsive design systems, and fluid physics-based motion design.',
    teamSize: '2 - 3 Web Architects',
    eligibility: 'Frontend & Full-Stack Developers',
    format: 'Hybrid Sprint',
    duration: '6-Hour Engineering Sprint',
    date: 'October 5, 2026',
    time: '09:00 AM - 03:00 PM',
    venue: 'Web Architecture Lab Beta',
    badge: 'WEB ARCHITECTURE',
    iconName: 'Globe',
    rules: [
      'Specific thematic requirements and required interactive capabilities are unveiled at 09:00 AM.',
      'Production deployment on edge hosting platforms (Vercel, Netlify, Cloudflare) is mandatory by the submission deadline.',
      'Lighthouse performance and accessibility scores will be evaluated on the production build.',
      'Codebases must be maintained in a public repository initiated at the event launch.',
      'Novelty of design, bespoke interactions, and smooth performance heavily influence scoring.'
    ],
    rounds: [
      {
        title: 'Phase 1: Layout Scaffold & Visual Canvas Integration',
        description: 'Core DOM structure, responsive typography, and interactive canvas components.',
        duration: '09:00 AM - 12:00 PM'
      },
      {
        title: 'Phase 2: Full-Stack Integration & Motion Design Polish',
        description: 'Endpoint connectivity, persistent state, transition choreography, and cross-device optimization.',
        duration: '12:00 PM - 03:00 PM'
      },
      {
        title: 'Phase 3: Performance Audit & Live Showcase',
        description: 'Comprehensive performance audit and technical showcase before the jury.',
        duration: '03:30 PM - 05:00 PM'
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
      { q: 'Are modern UI component frameworks allowed?', a: 'Yes, component libraries are permitted, with extra evaluation credit awarded to custom design systems.' }
    ]
  },
  {
    id: 'surprise',
    name: 'Surprise?!?!?!!',
    category: 'Mystery',
    tagline: 'Unclassified Challenge. Rapid Technical Adaptation.',
    shortDesc: 'A confidential wildcard challenge with zero advance briefing. Tests technical intuition, composure under pressure, and rapid problem-solving.',
    fullDesc: 'Surprise?!?!?!! is a confidential challenge unveiled only minutes prior to launch. From reverse engineering unfamiliar architectures to real-time crisis simulations and algorithmic speed runs, delegates must rely entirely on raw technical intuition, adaptability, and fundamental engineering principles.',
    teamSize: '1 - 2 Delegates',
    eligibility: 'Open to All Confirmed Delegates',
    format: 'Live Stage',
    duration: '2 Hours of Rapid Problem Solving',
    date: 'October 5, 2026',
    time: '04:00 PM - 06:00 PM',
    venue: 'Blackbox Auditorium Stage',
    badge: 'CLASSIFIED / ON-SITE',
    iconName: 'Sparkles',
    rules: [
      'Mission directives and challenge constraints are revealed precisely 60 seconds before commencement.',
      'External assistance and unapproved network access are strictly forbidden.',
      'Evaluators may introduce dynamic constraints and bonus challenges during active competition.',
      'Delegates demonstrating the highest composure, analytical agility, and robust execution will prevail.',
      'Expect shifting parameters throughout the session.'
    ],
    rounds: [
      {
        title: 'Phase Alpha: Initial Directives',
        description: 'Directive disclosure followed by the first wave of rapid analytical problems.',
        duration: '40 Mins'
      },
      {
        title: 'Phase Beta: Dynamic Constraint Shift',
        description: 'Introduction of novel rules and real-time operational hurdles.',
        duration: '40 Mins'
      },
      {
        title: 'Phase Omega: The Final Synthesis',
        description: 'High-intensity conclusive sprint demanding rapid execution.',
        duration: '40 Mins'
      }
    ],
    judgingCriteria: [
      { metric: 'Adaptability & Analytical Speed', weight: '40%', detail: 'Speed and clarity in analyzing unfamiliar technical scenarios.' },
      { metric: 'Execution Accuracy', weight: '40%', detail: 'Precision of solution under shifting constraints and time pressure.' },
      { metric: 'Engineering Composure', weight: '20%', detail: 'Methodical composure and innovative problem resolution.' }
    ],
    toolsAndStack: ['Classified Toolset', 'Stage Telemetry Display', 'Analytical Intuition'],
    faqs: [
      { q: 'How should delegates prepare for this event?', a: 'Preparation relies on fundamental computer science intuition, problem-solving speed, and mental agility.' }
    ]
  }
];
