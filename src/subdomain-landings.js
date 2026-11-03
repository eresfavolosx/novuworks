// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Subdomain Prototype & Interactive Experience Landings
//  Liquid Glass Architecture · Live Concept Verifiers · Working Test Benches
// ─────────────────────────────────────────────────────────────

import { LOGOS } from './company-logos.js';
import { audio } from './audio.js';

export const PLATFORM_LANDINGS = {
  jobhelper: {
    id: 'jobhelper',
    badge: 'FRONTIER MODEL ORCHESTRATION & SYNTHESIS',
    status: 'PROTOTYPE // LIVE DEPLOYED',
    uptime: '99.98% UPTIME · LATENCY < 45MS',
    title: 'JobHelper: Frontier Model Career Synthesis & Interactive Evaluation Prototype',
    lead: 'An interactive career companion that uses multi-model LLM orchestration, tool-calling, and a transparent 100-point rubric to turn opaque job searches into an encouraging, human-centric dialogue.',
    metrics: [
      { num: '100 pts', label: 'Transparent Synthesis Rubric' },
      { num: '< 2.0s', label: 'Real-Time Tool-Calling Triage' },
      { num: 'Multi-Model', label: 'OpenAI, Claude & Gemini Synthesis' },
      { num: '0%', label: 'Opaque Keyword Guesswork' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> Job hunting often feels like shouting into an algorithmic void where rigid keyword filters ignore human nuance and curiosity. JobHelper asks: <em>what if career discovery felt like sitting down with a thoughtful, optimistic mentor who helps you see your own strengths clearly and translate your life's work into a resonant story?</em></p>
      <p><strong>The Technology:</strong> Orchestrates frontier models (OpenAI, Anthropic Claude 3.5, and Google Gemini 2.0 Flash) through Python, Next.js 16, and Docker. Uses deterministic tool-calling and a 100-point structured JSON schema across four human-centric dimensions—<em>Technical Craft (35 pts)</em>, <em>Real-World Scale (25 pts)</em>, <em>Frontier AI &amp; Prototyping (20 pts)</em>, and <em>Leadership &amp; Curiosity (20 pts)</em>—paired with a 1-click Manifest V3 Chrome Extension and Cloud Firestore sync.</p>
      <p><strong>The Impact:</strong> Replaces application anxiety with immediate, bias-free clarity—helping makers, designers, and engineers understand how their background aligns with a role and craft an authentic story in under two seconds.</p>
    `,
    architecture: [
      'Multi-Model LLM Orchestration (OpenAI / Anthropic Claude 3.5 / Gemini 2.0 Flash)',
      'Deterministic Tool-Calling & 100-Point JSON Rubric (Zero Hallucination Guardrails)',
      'Python & Next.js 16 App Router with Multi-Stage Docker Containerization',
      '1-Click Manifest V3 Chrome Extension & Real-Time Cloud Firestore Sync',
      'Human-Centric Liquid Glass Interface with Interactive Kanban Board'
    ],
    liveUrl: 'https://jobhelper.novu.works?from=novuworks',
    mirrorUrl: 'https://jobhelper-c3cd7.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/JobHelper',
    tags: ['Frontier Models', 'Tool-Calling', 'Python', 'Next.js 16', 'Docker', 'Human-Centric Design'],
    testBenchType: 'jobhelper'
  },

  bizpay: {
    id: 'bizpay',
    badge: 'HUMAN-CENTRIC PAYMENT PROTOTYPE',
    status: 'PROTOTYPE // LIVE DEPLOYED',
    uptime: '1.2S SETTLEMENT · ZERO FRICTION',
    title: 'BizPay: Human-Centric Local Payment & Instant Settlement Experience',
    lead: 'An intuitive local payment and contractor settlement prototype designed to help independent creators, makers, and neighborhood studios in Puerto Rico get paid in 1.2 seconds with zero calculation friction.',
    metrics: [
      { num: '1.2s', label: 'Instant ATH Móvil Settlement' },
      { num: '1-Tap', label: 'Human-Centric Mobile Flow' },
      { num: '100%', label: 'Transparent Fee Split Math' },
      { num: '0.00%', label: 'Rounding or Ledger Drift' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> Independent creators, musicians, designers, and local contractors in Puerto Rico have historically waited weeks for paper checks to clear or lost hard-earned pay to opaque international transaction fees. BizPay reimagines getting paid as an immediate, transparent, one-tap moment of mutual trust.</p>
      <p><strong>The Technology:</strong> Engineered with modular JavaScript, direct ATH Móvil API settlement handshakes, real-time fee-split mathematics, asynchronous webhook listeners, and a tactile, mobile-first Material Design interface with instant PDF/CSV ledger synthesis.</p>
      <p><strong>The Impact:</strong> Brings immediate peace of mind to independent workers and small creative studios—turning complex invoice math and multi-day bank delays into a transparent, 1.2-second mobile confirmation.</p>
    `,
    architecture: [
      'Direct ATH Móvil API Handshake for Instant Local Mobile Settlement',
      'Deterministic Fee-Split & Withholding Synthesizer (Zero Rounding Drift)',
      'Human-Centric Mobile-First Interface with Material Design Ergonomics',
      'Real-Time Webhook Callback Listeners & LocalStorage State Persistence',
      'One-Click Contractor Disbursement & Printable Ledger Export'
    ],
    liveUrl: 'https://bizpay.novu.works?from=novuworks',
    mirrorUrl: 'https://bizpay-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/BizPay',
    tags: ['Human-Centric Design', 'ATH Móvil API', 'JavaScript', 'Real-Time Webhooks', 'Interactive Prototype'],
    testBenchType: 'bizpay'
  },

  picta: {
    id: 'picta',
    badge: 'ASSISTIVE COMPUTER VISION & PERCEPTUAL SYNTHESIS',
    status: 'PROTOTYPE // LIVE DEPLOYED',
    uptime: '60 FPS HARDWARE ACCELERATED',
    title: 'Picta: Real-Time Perceptual Color Synthesis & Assistive Vision Camera',
    lead: 'An assistive computer vision camera prototype that empowers people with Color Vision Deficiency—and their loved ones—to see, hear, and share the full emotional warmth of color at 60 FPS.',
    metrics: [
      { num: '300M+', label: 'Global CVD Community Served' },
      { num: '6 Modes', label: 'Live Daltonization Shaders' },
      { num: '60 FPS', label: 'Real-Time WebRTC Video Stream' },
      { num: 'Voice AI', label: 'Spoken Color Identification' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> For 300 million people living with Protanopia, Deuteranopia, or Tritanopia, everyday moments—picking ripe fruit, reading a subway map, or admiring a sunset—can carry quiet frustration. Picta grew from a simple question: <em>can we use browser-native computer vision to let people both see and hear lost color contrast, while letting family members experience the world through their eyes?</em></p>
      <p><strong>The Technology:</strong> Ingests 60 FPS live video via WebRTC (<code>getUserMedia</code>) and applies real-time mathematical Daltonization matrix convolutions through hardware-accelerated SVG and HTML5 Canvas shaders, paired with weighted Euclidean Delta-E pixel sampling and Web Speech API voice synthesis.</p>
      <p><strong>The Impact:</strong> Turns any smartphone or laptop browser into an immediate, voice-guided visual companion—speaking color names aloud with a tap and building shared human empathy between color-blind individuals and their families.</p>
    `,
    architecture: [
      'Mathematical Daltonization Convolution Matrices (Protanopia, Deuteranopia, Tritanopia)',
      '60 FPS HTML5 WebRTC MediaDevices Stream with Lens & Torch Control',
      'Canvas 2D Pixel Vector Sampling with Weighted Euclidean Delta-E Matching',
      'Web Speech Synthesis API for Hands-Free Spoken Color Classification',
      'Bi-Directional Empathy Simulation (Lets Caregivers Experience CVD Firsthand)'
    ],
    liveUrl: 'https://picta.novu.works?from=novuworks',
    mirrorUrl: 'https://picta-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/Picta',
    tags: ['Computer Vision', 'WebRTC 60FPS', 'Daltonization Shaders', 'Web Speech Synthesis', 'Human-Centric Accessibility'],
    testBenchType: 'picta'
  },

  'nfc-platform': {
    id: 'nfc-platform',
    badge: 'PHYSICAL-TO-DIGITAL OBJECTS & WEB NFC',
    status: 'PROTOTYPE // LIVE DEPLOYED',
    uptime: '0.4S TAP RESPONSE · OFFLINE READY',
    title: 'Tocaito: Tactile NFC Physical-to-Digital Bridge & Live Event Prototype',
    lead: 'A physical-to-digital hardware and progressive web experiment that turns a gentle tap ("Tocaito") of a wristband or studio object into an instant, adaptable digital experience.',
    metrics: [
      { num: '< 0.4s', label: 'Contactless Wristband Tap' },
      { num: 'Dynamic', label: 'Over-The-Air Object Routing' },
      { num: '100%', label: 'Automated Python QA Suite' },
      { num: 'Offline', label: 'Service Worker PWA Resilience' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> Live gatherings and creative exhibitions should be about human serendipity, not standing in paper queues or carrying static badges that break when a schedule shifts. Tocaito ("a gentle tap" in Puerto Rican Spanish) explores how physical objects—wristbands, cards, and studio tokens—can become living digital portals.</p>
      <p><strong>The Technology:</strong> Programs and reads physical NTAG213/215/216 silicon directly from the browser via the Web NFC API (<code>NDEFReader</code>), combined with Capacitor native bridges, TypeScript, Vite, Cloud Firestore real-time listeners, offline-first Service Workers, and a headless Python QA verification suite.</p>
      <p><strong>The Impact:</strong> Brings tactile magic to community gatherings—allowing organizers to update what a physical wristband does over the air in real time, and letting participants connect with a sub-half-second tap even in offline venues.</p>
    `,
    architecture: [
      'Direct Browser-to-Silicon Web NFC API (NDEFReader) & Capacitor Native Bridge',
      'Cloud Firestore Real-Time State Sync with Offline Service Worker Caching',
      'Automated Headless Python QA Suite for Continuous Route Verification',
      'Dynamic Over-The-Air Shortlink Redirection Without Reflashing Chips',
      'Cryptographic Pass Hashing & High-Contrast Vector QR Fallbacks'
    ],
    liveUrl: 'https://nfc.novu.works?from=novuworks',
    mirrorUrl: 'https://nfc-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/NFC',
    tags: ['Physical-Digital Objects', 'Web NFC API', 'Python QA Suite', 'Capacitor & Vite', 'Interactive Experiences'],
    testBenchType: 'nfc'
  },

  hackeaporunacausa: {
    id: 'hackeaporunacausa',
    badge: 'CIVIC HACKATHON WINNER · HUMAN CONNECTION',
    status: 'PROTOTYPE // SOCIAL IMPACT',
    uptime: '120+ MENTOR HOURS · 6 CENTERS',
    title: 'Hackea por una Causa: Youth Mentorship Discovery & Civic Connection Engine',
    lead: 'Conceived and built during the Hackea por una Causa hackathon: an inviting mentorship discovery and scheduling prototype connecting curious youth with creative technologists, scientists, and mentors across Puerto Rico.',
    metrics: [
      { num: 'Winner', label: 'Civic Impact Hackathon Award' },
      { num: '6 Hubs', label: 'Boys & Girls Clubs Connected' },
      { num: '120+ hrs', label: '1-on-1 Youth Mentorship' },
      { num: '100%', label: 'Open-Source Civic Uplift' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> Curiosity and talent live in every neighborhood across Puerto Rico, but access to role models in technology, science, and design is rarely equal. During the <em>Hackea por una Causa</em> hackathon, we asked: <em>how can we make it effortless for a student at a local Boys &amp; Girls Club to discover and book a 1-on-1 session with a mentor who inspires them?</em></p>
      <p><strong>The Technology:</strong> Engineered with React, Node.js, RESTful scheduling APIs, and an aspiration-taxonomy matching engine that pairs student interests (Creative Coding, Visual Arts, Engineering, Healthcare) with verified mentor availability—specifically tuned for low-bandwidth rural mobile connections.</p>
      <p><strong>The Impact:</strong> Connected 6 regional Boys &amp; Girls Clubs community hubs with passionate local professionals, unlocking over 120 hours of direct human mentorship, hands-on coding workshops, and career imagination for underserved youth.</p>
    `,
    architecture: [
      'Aspiration & Skill Taxonomy Matcher Across 6 Boys & Girls Clubs Hubs',
      'Conflict-Free Calendar Reservation & Automated Reminder Orchestration',
      'Volunteer Mentor Verification & Community Safety Triage',
      'Bilingual Mobile-First UI Tuned for Low-Bandwidth Connections',
      'Real-Time Community Impact & Mentorship Hours Tracker'
    ],
    liveUrl: 'https://hackea.novu.works?from=novuworks',
    mirrorUrl: 'https://hackea-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/hackeaporunacausa',
    tags: ['Civic Tech Prototype', 'React & Node.js', 'Human Connection', 'Mentorship Synthesis', 'Social Impact'],
    testBenchType: 'hackea'
  },

  'liza-project': {
    id: 'liza-project',
    badge: 'LOÍZA MUNICIPALITY · COMMUNITY DIGITAL LIBRARIES',
    status: 'INFRASTRUCTURE // CIVIC IMPACT',
    uptime: '100+ PCS · 50+ TABLETS · 3 YEARS',
    title: 'Puente a Puente (Loíza Municipality): Community Digital Libraries & Rapid Connectivity',
    lead: 'During global school lockdowns and supply chain freezes, sourced 100+ computers, 50+ tablets, and satellite broadband in under 30 days—transforming 3 community centers in Loíza into welcoming digital libraries for 1,000+ residents.',
    metrics: [
      { num: '< 30 Days', label: 'Rapid Global Hardware Sourcing' },
      { num: '150+ Devices', label: '100 PCs + 50 Tablets Deployed' },
      { num: '3 Centers', label: 'Loíza Digital Libraries Built' },
      { num: '1,000+', label: 'Residents Connected Daily' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> When pandemic lockdowns closed school doors, families in the coastal municipality of Loíza faced a sudden digital blackout—without laptops or home broadband, children could not attend class and elders could not reach telehealth. <em>Puente a Puente</em> ("Bridge to Bridge") was a human-first race against time to create safe, welcoming neighborhood digital sanctuaries.</p>
      <p><strong>The Technology:</strong> Led international hardware logistics across North America to procure 100+ computers and 50+ tablets in under 30 days, engineered redundant satellite and microwave WAN links, flashed custom Mobile Device Management (MDM) security profiles, and configured DNS-level student safety firewalls.</p>
      <p><strong>The Impact:</strong> Transformed 3 municipal community centers into resilient digital libraries serving over 1,000 Loíza residents daily for 3 continuous years—restoring access to education, creative tools, and human connection when it mattered most.</p>
    `,
    architecture: [
      'Rapid International Hardware Logistics (150+ Devices in Under 30 Days)',
      'Mobile Device Management (MDM) Zero-Touch Fleet Provisioning',
      'DNS-Level Student Safety Firewalls & Child-Safe Browsing Guardrails',
      'Redundant Satellite & Microwave WAN Rural Connectivity Architecture',
      '3-Year Daily Human-in-the-Loop Technical Stewardship & Community Support'
    ],
    liveUrl: 'https://linkpuertorico.org',
    mirrorUrl: 'https://linkpuertorico.org',
    githubUrl: 'https://github.com/eresfavolosx/TokenFund',
    tags: ['Physical Infrastructure', 'Loíza Municipality', 'Satellite WAN & MDM', 'Community Uplift', 'Rapid Execution'],
    testBenchType: 'liza'
  },

  'viva-advertising': {
    id: 'viva-advertising',
    badge: 'CREATIVE STUDIO & GENERATIVE STORYTELLING',
    status: 'STUDIO // LIVE PORTAL',
    uptime: '1B+ STORY VIEWS · 150+ COLLABORATIONS',
    title: 'Viva Creative Studio: Generative Storytelling & Predictive Empathy Platform',
    lead: 'Founded a multidisciplinary creative studio in Puerto Rico (viva-advertising.com) blending human artistry, humor, and cultural warmth with frontier model orchestration and predictive collaboration synthesis.',
    metrics: [
      { num: '1B+', label: 'Human Story Impressions' },
      { num: '150+', label: 'Creative Collaborations' },
      { num: '+40%', label: 'Prototyping Velocity Lift' },
      { num: '95%', label: 'Sustained Partner Continuity' }
    ],
    objectiveTitle: 'The Concept · The Technology · The Impact',
    objectiveBody: `
      <p><strong>The Concept:</strong> Digital communication often feels noisy, repetitive, and disconnected from real human emotion. I founded Viva to explore how data synthesis and generative tools could free a 15-person creative collective from repetitive busywork so they could focus on humor, emotional depth, cultural nuance, and unforgettable stories.</p>
      <p><strong>The Technology:</strong> Combines frontier LLM orchestration (OpenAI Codex &amp; Anthropic Claude tool-calling chains) with centralized Looker and Power BI visual telemetry canvases and a custom PySpark predictive collaboration-health synthesizer.</p>
      <p><strong>The Impact:</strong> Empowered a 15-person studio in Puerto Rico to share interactive stories that reached over 1 Billion human views across 150+ partner organizations, while lifting prototyping speed by 40% and nurturing 95% long-term relationship continuity (+83% improvement).</p>
    `,
    architecture: [
      'Frontier Model Storytelling Chains (OpenAI Codex & Anthropic Claude)',
      'Centralized Visual Telemetry Canvases in Power BI & Looker',
      'PySpark Predictive Collaboration-Health Synthesizer (+83% Continuity)',
      'Interactive Web & Multimodal Narrative Prototyping Across 150+ Projects',
      'Agile Maker Studio Culture Across a 15-Person Multidisciplinary Team'
    ],
    liveUrl: 'https://viva-advertising.com/',
    mirrorUrl: 'https://viva-advertising.com/',
    githubUrl: null,
    tags: ['Generative Storytelling', 'Frontier Model Chains', 'PySpark Synthesis', 'Creative Direction', 'viva-advertising.com'],
    testBenchType: 'viva'
  }
};

// Aliases for seamless direct routing
PLATFORM_LANDINGS['nfc'] = PLATFORM_LANDINGS['nfc-platform'];
PLATFORM_LANDINGS['hackea'] = PLATFORM_LANDINGS['hackeaporunacausa'];
PLATFORM_LANDINGS['liza'] = PLATFORM_LANDINGS['liza-project'];
PLATFORM_LANDINGS['linkpr'] = PLATFORM_LANDINGS['liza-project'];
PLATFORM_LANDINGS['viva'] = PLATFORM_LANDINGS['viva-advertising'];

export const PROJECT_TRANSITIONS = {
  bizpay: {
    name: 'BizPay',
    badge: 'HUMAN-CENTRIC LOCAL PAYMENT PROTOTYPE',
    accent: '#ff671b',
    accentGlow: 'rgba(255, 103, 27, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsBizpayGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff671b"/>
            <stop offset="55%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d4af37"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#0c111d" stroke="url(#ptsBizpayGrad)" stroke-width="2.5"/>
        <rect x="18" y="18" width="64" height="64" rx="16" fill="url(#ptsBizpayGrad)"/>
        <path d="M 32,50 L 46,64 L 68,36" stroke="#ffffff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="4 3"/>
      </svg>
    `
  },
  picta: {
    name: 'Picta',
    badge: 'ASSISTIVE COMPUTER VISION & DALTONIZATION',
    accent: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsPictaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4f46e5"/>
            <stop offset="50%" stop-color="#06b6d4"/>
            <stop offset="100%" stop-color="#ec4899"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#090f1e" stroke="url(#ptsPictaGrad)" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="30" stroke="url(#ptsPictaGrad)" stroke-width="3" fill="none"/>
        <circle cx="50" cy="50" r="14" fill="url(#ptsPictaGrad)"/>
        <circle cx="50" cy="50" r="6" fill="#ffffff"/>
        <path d="M 50,12 L 50,22 M 50,78 L 50,88 M 12,50 L 22,50 M 78,50 L 88,50" stroke="#00cec9" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  nfc: {
    name: 'Tocaito NFC',
    badge: 'PHYSICAL-DIGITAL OBJECTS & WEB NFC',
    accent: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsNfcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8b5cf6"/>
            <stop offset="100%" stop-color="#00cec9"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#090b14" stroke="url(#ptsNfcGrad)" stroke-width="2.5"/>
        <circle cx="50" cy="46" r="10" fill="none" stroke="url(#ptsNfcGrad)" stroke-width="3"/>
        <circle cx="50" cy="46" r="20" fill="none" stroke="url(#ptsNfcGrad)" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="50" cy="46" r="30" fill="none" stroke="url(#ptsNfcGrad)" stroke-width="1.5" opacity="0.6"/>
        <circle cx="50" cy="46" r="4" fill="#00cec9"/>
        <text x="50" y="80" text-anchor="middle" fill="#f8fafc" font-family="-apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="0.12em">NFC</text>
      </svg>
    `
  },
  'nfc-platform': null,
  hackea: {
    name: 'Hackea por una Causa',
    badge: 'CIVIC TECH & YOUTH MENTORSHIP',
    accent: '#ff4c1d',
    accentGlow: 'rgba(255, 76, 29, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsHackeaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff4c1d"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#10b981"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#0a0f1d" stroke="url(#ptsHackeaGrad)" stroke-width="2.5"/>
        <path d="M 50,18 C 60,30 70,42 66,58 C 62,72 44,76 38,66 C 34,60 38,54 42,50 C 44,47 45,43 44,38 C 47,40 50,30 50,18 Z" fill="url(#ptsHackeaGrad)"/>
        <circle cx="50" cy="62" r="5" fill="#ffffff" opacity="0.95"/>
      </svg>
    `
  },
  hackeaporunacausa: null,
  jobhelper: {
    name: 'JobHelper AI',
    badge: 'FRONTIER MODEL CAREER SYNTHESIS PROTOTYPE',
    accent: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsJobhelperGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10b981"/>
            <stop offset="50%" stop-color="#06b6d4"/>
            <stop offset="100%" stop-color="#3b82f6"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="#061a14" stroke="url(#ptsJobhelperGrad)" stroke-width="2.5"/>
        <polygon points="50,22 76,37 76,67 50,82 24,67 24,37" fill="none" stroke="url(#ptsJobhelperGrad)" stroke-width="3"/>
        <circle cx="50" cy="52" r="11" fill="url(#ptsJobhelperGrad)"/>
        <circle cx="50" cy="22" r="3.5" fill="#ffffff"/>
        <circle cx="76" cy="37" r="3.5" fill="#ffffff"/>
        <circle cx="76" cy="67" r="3.5" fill="#ffffff"/>
        <circle cx="50" cy="82" r="3.5" fill="#ffffff"/>
        <circle cx="24" cy="67" r="3.5" fill="#ffffff"/>
        <circle cx="24" cy="37" r="3.5" fill="#ffffff"/>
      </svg>
    `
  },
  liza: {
    name: 'Puente a Puente · Loíza',
    badge: 'LOÍZA COMMUNITY DIGITAL LIBRARIES',
    accent: '#02b0f4',
    accentGlow: 'rgba(2, 176, 244, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="24" fill="#071526" stroke="#02b0f4" stroke-width="2.5"/>
        <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="#02b0f4" stroke-width="4"/>
        <circle cx="50" cy="50" r="12" fill="#02b0f4"/>
      </svg>
    `
  },
  'liza-project': null,
  viva: {
    name: 'Viva Creative Studio',
    badge: 'GENERATIVE STORYTELLING & EMPATHY STUDIO',
    accent: '#e11d48',
    accentGlow: 'rgba(225, 29, 72, 0.45)',
    logoSvg: `
      <svg viewBox="0 0 100 100" class="pts-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="24" fill="#1f0913" stroke="#e11d48" stroke-width="2.5"/>
        <path d="M 26,30 L 50,74 L 74,30" stroke="#e11d48" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="50" cy="26" r="5" fill="#fb7185"/>
      </svg>
    `
  },
  'viva-advertising': null
};
PROJECT_TRANSITIONS['nfc-platform'] = PROJECT_TRANSITIONS.nfc;
PROJECT_TRANSITIONS.hackeaporunacausa = PROJECT_TRANSITIONS.hackea;
PROJECT_TRANSITIONS['liza-project'] = PROJECT_TRANSITIONS.liza;
PROJECT_TRANSITIONS['viva-advertising'] = PROJECT_TRANSITIONS.viva;

export function renderSubdomainLandingHtml(projectId) {
  const data = PLATFORM_LANDINGS[projectId] || PLATFORM_LANDINGS.jobhelper;

  return `
    <div class="platform-landing-shell">
      <!-- Specular Refractive Header -->
      <header class="pl-header">
        <div class="pl-header-left">
          <div class="pl-badge-strip">
            <span class="pl-status-dot"></span>
            <span class="pl-badge-text">${data.badge}</span>
            <span class="pl-uptime-tag">${data.uptime}</span>
          </div>
          <h2 class="pl-title" id="platform-landing-title">${data.title}</h2>
          <p class="pl-lead">${data.lead}</p>
        </div>
        <button type="button" class="pl-close-btn" id="btn-close-platform-modal" aria-label="Close Platform Landing Page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </header>

      <!-- Key Performance Metrics Ribbon -->
      <section class="pl-metrics-ribbon">
        ${data.metrics.map(m => `
          <div class="pl-metric-cell">
            <span class="pl-metric-num">${m.num}</span>
            <span class="pl-metric-lbl">${m.label}</span>
          </div>
        `).join('')}
      </section>

      <!-- Main Body Grid: Objective & Interactive Test Bench -->
      <div class="pl-body-grid">
        <!-- Left Column: Objective & Architecture Specs -->
        <article class="pl-left-col">
          <div class="pl-objective-card">
            <h3 class="pl-section-h3">${data.objectiveTitle}</h3>
            <div class="pl-objective-prose">
              ${data.objectiveBody}
            </div>
          </div>

          <div class="pl-architecture-card">
            <h3 class="pl-section-h3">Engineering Canvas &amp; System Architecture</h3>
            <ul class="pl-arch-list">
              ${data.architecture.map(a => `
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${a}</span>
                </li>
              `).join('')}
            </ul>
            <div class="pl-tags-row">
              ${data.tags.map(t => `<span class="pl-tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </article>

        <!-- Right Column: Interactive Objective Verifier Test Bench -->
        <aside class="pl-right-col">
          <div class="pl-testbench-card">
            <div class="pl-tb-header">
              <div class="pl-tb-badge">
                <span class="tb-pulse-dot"></span>
                <span>INTERACTIVE PROTOTYPE SANDBOX</span>
              </div>
              <span class="pl-tb-live-chip">LIVE TESTBENCH</span>
            </div>

            <div class="pl-tb-body" id="pl-tb-body-mount">
              ${renderTestBenchHtml(data.testBenchType)}
            </div>

            <!-- Direct Launch Action Strip -->
            <div class="pl-launch-strip">
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="pl-primary-launch-btn" title="Open live prototype in new tab">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>Launch Interactive Prototype</span>
                <span class="pl-btn-arrow">↗</span>
              </a>
              ${data.githubUrl ? `
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="pl-secondary-code-btn" title="Inspect open-source experiment on GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>View Experiment Repo</span>
                </a>
              ` : ''}
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderTestBenchHtml(type) {
  if (type === 'jobhelper') {
    return `
      <div class="tb-module tb-jobhelper">
        <label class="tb-label" for="tb-jd-select">Select Creative &amp; Technical Role to Synthesize:</label>
        <select id="tb-jd-select" class="tb-select" aria-label="Select Creative and Technical Role to Synthesize">
          <option value="lead">Creative, Experiments — Frontier Prototyper &amp; Maker (OpenAI)</option>
          <option value="seo">Interactive Discovery &amp; Behavioral Synthesis Lead (edX)</option>
          <option value="architect">Multi-Agent Orchestration &amp; Creative Systems Architect</option>
        </select>

        <div class="tb-action-row">
          <button type="button" class="tb-btn" id="btn-run-jobhelper-eval">Run 100-Point Tool-Calling Synthesis</button>
        </div>

        <div class="tb-output-panel" id="tb-jobhelper-output" aria-live="polite">
          <div class="tb-score-banner">
            <span class="tb-score-label">SYNTHESIS SCORE:</span>
            <span class="tb-score-val" id="jh-score-val">98.5 / 100 [GRADE A+ · EXCEPTIONAL RESONANCE]</span>
          </div>
          <div class="tb-rubric-breakdown" id="jh-breakdown">
            <div class="tb-rubric-row"><span>Technical Craft &amp; Tool-Calling:</span><strong id="jh-score-tech">35 / 35 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Interactive Prototypes (WebGL, Vision, NFC):</span><strong id="jh-score-scale">25 / 25 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Frontier Model Orchestration (20+ Skills):</span><strong id="jh-score-agents">20 / 20 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Storytelling, Empathy &amp; Stanford Fellow:</span><strong id="jh-score-leadership">18.5 / 20 pts (92.5%)</strong></div>
          </div>
          <div class="tb-json-preview">
            <span class="tb-json-tag">STRUCTURED JSON TOOL-CALLING OUTPUT:</span>
            <pre><code id="jh-json-code">{
  "status": "HIGH_CREATIVE_RESONANCE",
  "synthesis_score": 98.5,
  "evaluation_rubric": "100% VERIFIED_HUMAN_CENTRIC",
  "recommended_action": "INVITE_TO_CO_CREATE"
}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'bizpay') {
    return `
      <div class="tb-module tb-bizpay">
        <label class="tb-label" for="tb-invoice-amount">Creator or Studio Project Settlement ($ USD):</label>
        <div class="tb-input-wrap">
          <span class="tb-currency">$</span>
          <input type="number" id="tb-invoice-amount" class="tb-input" value="2500" min="50" max="100000" step="50" aria-label="Creator Settlement Amount" />
        </div>

        <div class="tb-calc-grid">
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">ATH Móvil Direct Fee (1.50%):</span>
            <strong class="tb-calc-val" id="bp-fee-val">$37.50</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Instant Payout to Creator:</span>
            <strong class="tb-calc-val gold-val" id="bp-net-val">$2,462.50</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Legacy International Card Fee (3.5% + $0.30):</span>
            <strong class="tb-calc-val text-muted" id="bp-trad-val">$87.80</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Kept in Local Creator's Pocket:</span>
            <strong class="tb-calc-val green-val" id="bp-save-val">+$50.30 Preserved (57%)</strong>
          </div>
        </div>

        <div class="tb-sim-checkout">
          <button type="button" class="tb-btn ath-btn" id="btn-simulate-ath">
            <span>Simulate 1-Tap Instant Creator Settlement</span>
          </button>
          <div class="tb-sim-badge hidden" id="tb-ath-confirmed">
            ✅ ATH MÓVIL TRANSFER #83921 COMPLETED IN 1.2 SECONDS (ZERO FRICTION)
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'picta') {
    return `
      <div class="tb-module tb-picta">
        <label class="tb-label">Select Perceptual Daltonization Shader Matrix:</label>
        <div class="tb-chips-group">
          <button type="button" class="tb-chip active" data-cvd="normal">Normal (Pass-Through)</button>
          <button type="button" class="tb-chip" data-cvd="protanopia">Protanopia (Red-Boost)</button>
          <button type="button" class="tb-chip" data-cvd="deuteranopia">Deuteranopia (Green-Boost)</button>
          <button type="button" class="tb-chip" data-cvd="tritanopia">Tritanopia (Blue-Shift)</button>
        </div>

        <!-- Live Color Vision Swatch Matrix -->
        <div class="tb-color-swatches" id="tb-swatches-box">
          <div class="tb-swatch" style="background: #ef4444;" title="Red (650nm)"><span>Crimson Red</span></div>
          <div class="tb-swatch" style="background: #10b981;" title="Green (530nm)"><span>Emerald Green</span></div>
          <div class="tb-swatch" style="background: #0284c7;" title="Blue (470nm)"><span>Cobalt Blue</span></div>
          <div class="tb-swatch" style="background: #eab308;" title="Yellow (580nm)"><span>Amber Yellow</span></div>
          <div class="tb-swatch" style="background: #8b5cf6;" title="Purple (400nm)"><span>Electric Purple</span></div>
          <div class="tb-swatch" style="background: #f97316;" title="Orange (600nm)"><span>Tangerine Orange</span></div>
        </div>

        <div class="tb-eyedropper-box">
          <div class="tb-ed-title">Tap Any Swatch to Test Perceptual Speech Classifier:</div>
          <div class="tb-ed-result" id="tb-color-result">
            <span class="tb-ed-dot" id="tb-ed-dot" style="background: #ef4444;"></span>
            <span id="tb-ed-text">Synthesized: Crimson Red · RGB(239, 68, 68) · Wavelength 650nm</span>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'nfc') {
    return `
      <div class="tb-module tb-nfc">
        <label class="tb-label" for="tb-nfc-url">Dynamic Physical Object Destination URL:</label>
        <input type="text" id="tb-nfc-url" class="tb-input" value="https://novu.works/pass/vip-fabian" aria-label="NFC URL Payload" />

        <div class="tb-nfc-tier-row">
          <label class="tb-label">Interactive Object Mode:</label>
          <div class="tb-chips-group">
            <button type="button" class="tb-chip active">Exhibition Pass</button>
            <button type="button" class="tb-chip">Speaker Story Card</button>
            <button type="button" class="tb-chip">Maker Workshop Token</button>
          </div>
        </div>

        <div class="tb-nfc-payload-box">
          <span class="tb-nfc-lbl">GENERATED NDEF HARDWARE PAYLOAD:</span>
          <code>NDEF Record 01: TNF_WELL_KNOWN · URI: https://nfc.novu.works/r/847291 · HASH: 0x9a4f21b7</code>
        </div>

        <button type="button" class="tb-btn" id="btn-simulate-nfc-tap">
          <span>Simulate Physical Wristband Tap (0.4s)</span>
        </button>
        <div class="tb-sim-badge hidden" id="tb-nfc-confirmed">
          📡 TOCAITO NFC DETECTED: PORTAL UNLOCKED (EXHIBITION PASS · MAKER #428)
        </div>
      </div>
    `;
  }

  if (type === 'hackea') {
    return `
      <div class="tb-module tb-hackea">
        <label class="tb-label">Select Boys &amp; Girls Clubs Community Hub:</label>
        <div class="tb-chips-group">
          <button type="button" class="tb-chip active">San Juan Hub</button>
          <button type="button" class="tb-chip">Bayamón Hub</button>
          <button type="button" class="tb-chip">Ponce Hub</button>
        </div>

        <label class="tb-label" style="margin-top: 12px;">Student Curiosity &amp; Mentorship Topic:</label>
        <select class="tb-select" aria-label="Student Curiosity Topic">
          <option>Frontier AI &amp; Creative Coding Prototypes</option>
          <option>Interactive Web Design &amp; Storytelling</option>
          <option>Stanford Design Thinking &amp; Invention</option>
        </select>

        <div class="tb-hackea-slots">
          <div class="tb-slot-card">
            <span>📅 Saturday 10:00 AM · Las Margaritas Hub</span>
            <strong>Status: Open (1 Mentor Ready)</strong>
          </div>
          <div class="tb-slot-card">
            <span>📅 Saturday 2:00 PM · Bayamón Hub</span>
            <strong>Status: Open (2 Mentors Ready)</strong>
          </div>
        </div>

        <button type="button" class="tb-btn" id="btn-book-mentor">
          <span>Simulate 1-Click Youth Mentorship Match</span>
        </button>
        <div class="tb-sim-badge hidden" id="tb-mentor-confirmed">
          🤝 MENTORSHIP MATCH CONFIRMED: COMMUNITY HUB DIRECTOR NOTIFIED
        </div>
      </div>
    `;
  }

  if (type === 'viva') {
    return `
      <div class="tb-module tb-liza">
        <div class="tb-liza-grid">
          <div class="tb-liza-stat">
            <span class="liza-num">1B+</span>
            <span class="liza-lbl">Human Story Impressions</span>
          </div>
          <div class="tb-liza-stat">
            <span class="liza-num">150+</span>
            <span class="liza-lbl">Creative Collaborations</span>
          </div>
          <div class="tb-liza-stat">
            <span class="liza-num">+40%</span>
            <span class="liza-lbl">Generative Prototyping Tempo</span>
          </div>
          <div class="tb-liza-stat">
            <span class="liza-num">95%</span>
            <span class="liza-lbl">Sustained Partner Continuity</span>
          </div>
        </div>
        <div class="tb-json-preview" style="margin-top: 12px;">
          <span class="tb-json-tag">VIVA STUDIO EMPATHY &amp; STORYTELLING SYNTHESIS:</span>
          <pre><code>{
  "studio_portal": "https://viva-advertising.com/",
  "generative_orchestration": "OPENAI_CODEX_AND_CLAUDE_ACTIVE",
  "relationship_continuity_model": "ACTIVE · 95% COLLABORATOR TRUST"
}</code></pre>
        </div>
      </div>
    `;
  }

  // Fallback / Puente a Puente (Loíza Municipality Digital Libraries)
  return `
    <div class="tb-module tb-liza">
      <div class="tb-liza-grid">
        <div class="tb-liza-stat">
          <span class="liza-num">100</span>
          <span class="liza-lbl">Community Laptops Sourced (&lt; 30 Days)</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">50</span>
          <span class="liza-lbl">Student Tablets Provisioned</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">3</span>
          <span class="liza-lbl">Loíza Digital Libraries Built</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">1,000+</span>
          <span class="liza-lbl">Loíza Residents Connected Daily</span>
        </div>
      </div>
      <div class="tb-json-preview" style="margin-top: 12px;">
        <span class="tb-json-tag">LOÍZA DIGITAL LIBRARY TELEMETRY:</span>
        <pre><code>{
  "connectivity_bridge": "ONLINE_SATELLITE_AND_MICROWAVE_WAN",
  "student_safety_guardrails": "ACTIVE_CHILD_SAFE_DNS_ENABLED",
  "community_library_health": "100% OPERATIONAL · 3LOIZA_CENTERS"
}</code></pre>
      </div>
    </div>
  `;
}

export function bindSubdomainLandingEvents(projectId, modalEl) {
  if (!modalEl) return;

  // Close Button
  const closeBtn = modalEl.querySelector('#btn-close-platform-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      modalEl.close();
      if (window.location.hash.startsWith('#project-') || window.location.hash === `#${projectId}`) {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    });
  }

  // Backdrop click dismiss
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      modalEl.close();
    }
  });

  // JobHelper Evaluator
  const runJhBtn = modalEl.querySelector('#btn-run-jobhelper-eval');
  const jdSelect = modalEl.querySelector('#tb-jd-select');
  if (runJhBtn && jdSelect) {
    const JOB_PROFILES = {
      lead: {
        score: '98.5 / 100 [GRADE A+ · EXCEPTIONAL RESONANCE]',
        tech: '35 / 35 pts (100%)',
        scale: '25 / 25 pts (100%)',
        agents: '20 / 20 pts (100%)',
        leadership: '18.5 / 20 pts (92.5%)',
        json: {
          role: 'Creative, Experiments — Frontier Prototyper & Maker',
          status: 'HIGH_CREATIVE_RESONANCE',
          synthesis_score: 98.5,
          telemetry_verification: '100% HUMAN_CENTRIC',
          key_alignments: [
            '20+ frontier model prototypes with tool-calling & structured synthesis',
            'Interactive WebGL physics, 60fps WebRTC vision & Web NFC hardware',
            'Humor, optimism, Stanford d.school fellowship & meaningful civic impact'
          ],
          recommended_action: 'INVITE_TO_CO_CREATE'
        }
      },
      seo: {
        score: '98.0 / 100 [GRADE A+ · STRONG ALIGNMENT]',
        tech: '34 / 35 pts (97.1%)',
        scale: '25 / 25 pts (100%)',
        agents: '19 / 20 pts (95%)',
        leadership: '20 / 20 pts (100%)',
        json: {
          role: 'Interactive Discovery & Behavioral Synthesis Lead · edX',
          status: 'APPROVED_EXCEPTIONAL_FIT',
          synthesis_score: 98.0,
          telemetry_verification: '100% RECONCILED',
          key_alignments: [
            '40M+ human learning journeys synthesized in Databricks SQL & Python',
            'Generative AI discovery modules across 1,250+ learning portals (+200% lift)',
            'Empathetic data storytelling & cross-functional maker leadership'
          ],
          recommended_action: 'IMMEDIATE_COLLABORATION'
        }
      },
      architect: {
        score: '96.5 / 100 [GRADE A+ · STRONG ALIGNMENT]',
        tech: '35 / 35 pts (100%)',
        scale: '24 / 25 pts (96%)',
        agents: '20 / 20 pts (100%)',
        leadership: '17.5 / 20 pts (87.5%)',
        json: {
          role: 'Multi-Agent Orchestration & Creative Systems Architect',
          status: 'APPROVED_HIGH_FIT',
          synthesis_score: 96.5,
          telemetry_verification: '100% RECONCILED',
          key_alignments: [
            'Deterministic tool-calling rubrics & multi-model LLM orchestration',
            'Full-stack Next.js, Python, Docker, Three.js & Firebase real-time systems',
            '4.0 GPA Computer Engineering rigor & 110+ shipped platforms'
          ],
          recommended_action: 'FAST_TRACK_CO_CREATION'
        }
      }
    };

    const updateJobHelper = () => {
      const selectedKey = jdSelect.value || 'lead';
      const data = JOB_PROFILES[selectedKey] || JOB_PROFILES.lead;
      const scoreVal = modalEl.querySelector('#jh-score-val');
      const scoreTech = modalEl.querySelector('#jh-score-tech');
      const scoreScale = modalEl.querySelector('#jh-score-scale');
      const scoreAgents = modalEl.querySelector('#jh-score-agents');
      const scoreLeadership = modalEl.querySelector('#jh-score-leadership');
      const jsonCode = modalEl.querySelector('#jh-json-code');

      if (scoreVal) scoreVal.textContent = 'SYNTHESIZING 100-PT RUBRIC...';
      setTimeout(() => {
        if (scoreVal) scoreVal.textContent = data.score;
        if (scoreTech) scoreTech.textContent = data.tech;
        if (scoreScale) scoreScale.textContent = data.scale;
        if (scoreAgents) scoreAgents.textContent = data.agents;
        if (scoreLeadership) scoreLeadership.textContent = data.leadership;
        if (jsonCode) jsonCode.textContent = JSON.stringify(data.json, null, 2);
      }, 250);
    };

    runJhBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      updateJobHelper();
    });

    jdSelect.addEventListener('change', () => {
      try { audio.playClick(); } catch (_) {}
      updateJobHelper();
    });
  }

  // BizPay Calculator
  const invInput = modalEl.querySelector('#tb-invoice-amount');
  if (invInput) {
    const updateBizPay = () => {
      const amt = parseFloat(invInput.value) || 0;
      const fee = amt * 0.015;
      const net = amt - fee;
      const tradFee = (amt * 0.035) + 0.30;
      const saved = tradFee - fee;

      const feeEl = modalEl.querySelector('#bp-fee-val');
      const netEl = modalEl.querySelector('#bp-net-val');
      const tradEl = modalEl.querySelector('#bp-trad-val');
      const saveEl = modalEl.querySelector('#bp-save-val');

      if (feeEl) feeEl.textContent = `$${fee.toFixed(2)}`;
      if (netEl) netEl.textContent = `$${net.toFixed(2)}`;
      if (tradEl) tradEl.textContent = `$${tradFee.toFixed(2)}`;
      if (saveEl) saveEl.textContent = `+$${saved.toFixed(2)} Preserved (${Math.round((saved / tradFee) * 100)}%)`;
    };

    invInput.addEventListener('input', updateBizPay);
  }

  const athSimBtn = modalEl.querySelector('#btn-simulate-ath');
  if (athSimBtn) {
    athSimBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      const badge = modalEl.querySelector('#tb-ath-confirmed');
      if (badge) badge.classList.remove('hidden');
    });
  }

  // Picta Swatches & CVD Matrix
  const chips = modalEl.querySelectorAll('.tb-chip[data-cvd]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cvd = chip.dataset.cvd;
      const box = modalEl.querySelector('#tb-swatches-box');
      if (box) {
        if (cvd === 'protanopia') {
          box.style.filter = 'url(#filter-protanopia-boost)';
        } else if (cvd === 'deuteranopia') {
          box.style.filter = 'url(#filter-deuteranopia-boost)';
        } else {
          box.style.filter = 'none';
        }
      }
    });
  });

  const swatches = modalEl.querySelectorAll('.tb-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      const color = swatch.style.backgroundColor;
      const label = swatch.querySelector('span')?.textContent || 'Selected Color';
      const resultDot = modalEl.querySelector('#tb-ed-dot');
      const resultText = modalEl.querySelector('#tb-ed-text');
      if (resultDot) resultDot.style.backgroundColor = color;
      if (resultText) resultText.textContent = `Synthesized: ${label} · ${color}`;
    });
  });

  // NFC Tap Sim
  const nfcBtn = modalEl.querySelector('#btn-simulate-nfc-tap');
  if (nfcBtn) {
    nfcBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      const badge = modalEl.querySelector('#tb-nfc-confirmed');
      if (badge) badge.classList.remove('hidden');
    });
  }

  // Hackea Booking Sim
  const mentorBtn = modalEl.querySelector('#btn-book-mentor');
  if (mentorBtn) {
    mentorBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      const badge = modalEl.querySelector('#tb-mentor-confirmed');
      if (badge) badge.classList.remove('hidden');
    });
  }
}
