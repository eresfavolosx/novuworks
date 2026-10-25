// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Subdomain Platform Interactive Landing Showcases
//  Liquid Glass Architecture · Live Objective Verifiers · Working Test Benches
// ─────────────────────────────────────────────────────────────

import { LOGOS } from './company-logos.js';
import { audio } from './audio.js';

export const PLATFORM_LANDINGS = {
  jobhelper: {
    id: 'jobhelper',
    badge: 'AUTONOMOUS MULTI-MODEL LLM TRIAGE',
    status: 'PRODUCTION // LIVE DEPLOYED',
    uptime: '99.98% UPTIME · LATENCY < 45MS',
    title: 'JobHelper: Autonomous LLM Evaluation & Scoring Agent',
    lead: 'Engineered an autonomous Python agent utilizing multi-model LLM reasoning (Claude 3.5 / OpenAI) and strict constraint rubrics to evaluate complex technical job descriptions against candidate backgrounds using a 100-point scoring scaffold.',
    metrics: [
      { num: '100 pts', label: 'Quantitative Rubric Scaffold' },
      { num: '< 2.0s', label: 'Autonomous Intake Triage' },
      { num: 'Multi-Model', label: 'Claude 3.5 & OpenAI Reasoning' },
      { num: '0%', label: 'Human Bias / Keyword Guesswork' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> Engineering leaders and recruiters are flooded with hundreds of unformatted resumes, while traditional Keyword ATS algorithms indiscriminately reject top-tier candidates who use non-standard terminology or favor candidates with keyword-stuffed fluff.</p>
      <p><strong>How JobHelper Works Its Objective:</strong> JobHelper parses both the Candidate Dossier and the Target Job Description into mathematical vector tokens, applying a deterministic 100-point rubric across four critical dimensions: <em>Technical Core Alignment (35 pts)</em>, <em>Scale & Volume Proof Points (25 pts)</em>, <em>Autonomous AI & Systems Integration (20 pts)</em>, and <em>Leadership & Engineering Education (20 pts)</em>. It outputs structured JSON containing precise fit percentages, detected qualification gaps, and automated bullet optimizations.</p>
    `,
    architecture: [
      'Multi-Model LLM Orchestration (Anthropic Claude 3.5 Sonnet / OpenAI Codex)',
      'Deterministic Constraint-Bound Rubric Prompts (Zero Hallucination Guardrails)',
      'FastAPI Microservice Backend with Structured JSON Schema Validation',
      'Firebase Hosting & Real-Time Cloud Firestore Persistence',
      'Next.js High-Refraction Liquid Glass Interface'
    ],
    liveUrl: 'https://jobhelper.novu.works?from=novuworks',
    mirrorUrl: 'https://jobhelper-c3cd7.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/JobHelper',
    tags: ['Python', 'FastAPI', 'Claude 3.5', 'OpenAI', 'Next.js', 'Firebase', 'Rubrics'],
    testBenchType: 'jobhelper'
  },

  bizpay: {
    id: 'bizpay',
    badge: 'FINTECH & B2B COMMERCIAL INVOICING',
    status: 'PRODUCTION // LIVE DEPLOYED',
    uptime: '100% RECONCILED · ZERO SLIPPAGE',
    title: 'BizPay: B2B Commercial Invoicing & ATH Móvil Gateway',
    lead: 'Architected a high-converting B2B commercial payment portal featuring multi-tier invoice routing, ATH Móvil Business API integration, real-time transaction fee calculation, and responsive mobile-first material UI.',
    metrics: [
      { num: '1.50%', label: 'Ultra-Low B2B Merchant Fee' },
      { num: 'Instant', label: 'ATH Móvil Commercial Settlement' },
      { num: '100%', label: 'Automated Revenue Auditing' },
      { num: '0.00%', label: 'Transaction Slippage' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> B2B transactions in Puerto Rico and the Caribbean have historically been plagued by multi-day check clearing delays, 3.5%+ international credit card fees, and complex manual invoice reconciliation between suppliers and corporate clients.</p>
      <p><strong>How BizPay Works Its Objective:</strong> BizPay directly interfaces with the local ATH Móvil Business API and card tokenization vaults. When an enterprise issues an invoice, BizPay generates a dynamic secure checkout URL that calculates real-time fees, routes payouts into segregated merchant accounts, and emits webhook notifications for automated ERP and accounting reconciliation.</p>
    `,
    architecture: [
      'ATH Móvil Business API Integration (Direct Commercial Bank Settling)',
      'Real-Time Dynamic Fee Split Calculator (Zero Rounding Errors)',
      'Responsive Mobile-First Interface with Material Design Lite Ergonomics',
      'Static Asset Parallax Optimization & Fast CDN Edge Routing',
      'Strict Payment Card Industry (PCI) Tokenization Standards'
    ],
    liveUrl: 'https://bizpay.novu.works?from=novuworks',
    mirrorUrl: 'https://bizpay-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/BizPay',
    tags: ['JavaScript', 'ATH Móvil API', 'Fintech', 'B2B Invoicing', 'Material Design'],
    testBenchType: 'bizpay'
  },

  picta: {
    id: 'picta',
    badge: 'ACCESSIBILITY & COMPUTER VISION',
    status: 'PRODUCTION // LIVE DEPLOYED',
    uptime: '60 FPS HARDWARE ACCELERATED',
    title: 'Picta: Assistive Camera & Color Vision Deficiency Engine',
    lead: 'Engineered an assistive computer vision camera application designed for individuals with Color Vision Deficiency (CVD). Features real-time WebRTC camera filtering with mathematical Daltonization matrices, high-contrast edge enhancement, and tap-to-inspect pixel color identification with speech synthesis.',
    metrics: [
      { num: '300M+', label: 'Global CVD Population Addressed' },
      { num: '6 Modes', label: 'Hardware Daltonization Filters' },
      { num: 'Real-Time', label: '60 FPS WebRTC Video Stream' },
      { num: 'Speech AI', label: 'Voice Color Identification' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> Individuals affected by Protanopia (red-blindness), Deuteranopia (green-blindness), or Tritanopia (blue-blindness) experience severe daily friction deciphering charts, public signage, color-coded electrical wires, and product freshness.</p>
      <p><strong>How Picta Works Its Objective:</strong> Picta leverages WebGL and SVG hardware-accelerated color matrix filters directly on the user\'s mobile or desktop camera feed. The Daltonization algorithm calculates wavelength discrepancies and shifts lost contrast into the user\'s healthy visual spectrum. A tap on any pixel reads out the exact color name using text-to-speech audio.</p>
    `,
    architecture: [
      'Mathematical Daltonization Matrices (Protanopia, Deuteranopia, Tritanopia)',
      'HTML5 WebRTC MediaDevices Stream with Camera Facing-Mode Switching',
      'Canvas API 2D Context Direct Pixel Color Vector Sampling',
      'Web Speech Synthesis API for Hands-Free Color Classification',
      'Dual-Mode Simulation (Allows Non-Color-Blind Caregivers to Experience CVD)'
    ],
    liveUrl: 'https://picta.novu.works?from=novuworks',
    mirrorUrl: 'https://picta-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/Picta',
    tags: ['Computer Vision', 'WebRTC', 'Daltonization', 'Accessibility (A11y)', 'Color Science'],
    testBenchType: 'picta'
  },

  'nfc-platform': {
    id: 'nfc-platform',
    badge: 'EVENT ACCESS & NFC LOGISTICS',
    status: 'PRODUCTION // LIVE DEPLOYED',
    uptime: '100% PASS READ RATE · ZERO QUEUES',
    title: 'Tocaito: Cross-Platform NFC Event & Verification Platform',
    lead: 'Developed a cross-platform event registration and verification application using Capacitor, Firebase, and Vite. Architected a custom Python automated verification suite to continuously test UI routing, state persistence, and generate real-time system health reports.',
    metrics: [
      { num: '< 0.5s', label: 'NFC Wristband Scan & Verify' },
      { num: 'Dynamic', label: 'Over-The-Air Pass Link Updates' },
      { num: '100%', label: 'Automated Python QA Coverage' },
      { num: 'PWA + Native', label: 'iOS, Android & Web Unified' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> Event organizers battle chaotic paper queues, ticket scalping, and static wristbands that cannot adapt when multi-stage conference schedules change.</p>
      <p><strong>How Tocaito Works Its Objective:</strong> Tocaito equips attendees with reusable, waterproof NFC wristbands and QR badges. Organizers manage dynamic NDEF link redirects from a real-time admin console. When scanned, attendees are instantly authenticated and routed to live schedules, contact cards, or stage passes, while a Python test suite guarantees 100% gateway uptime.</p>
    `,
    architecture: [
      'Capacitor Native Bridge for iOS and Android NFC Hardware Interfaces',
      'Cloud Firestore Real-Time Listener Architecture with Offline Persistence',
      'Automated Python Headless QA Test Suite for Regression Prevention',
      'Service Worker PWA with Instant Offline Caching',
      'Dynamic URL Routing & Cryptographic Ticket Hash Generation'
    ],
    liveUrl: 'https://nfc.novu.works?from=novuworks',
    mirrorUrl: 'https://nfc-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/NFC',
    tags: ['Capacitor', 'Firebase', 'Vite', 'Python Test Suite', 'Mobile App', 'NFC'],
    testBenchType: 'nfc'
  },

  hackeaporunacausa: {
    id: 'hackeaporunacausa',
    badge: 'SOCIAL IMPACT HACKATHON WINNER',
    status: 'PRODUCTION // SOCIAL IMPACT',
    uptime: '120+ MENTOR HOURS · 6 CENTERS',
    title: 'Hackea por una Causa: Youth Mentorship & Scheduling Network',
    lead: 'Conceived and built during the Hackea por una Causa hackathon: an appointment scheduling and volunteer recruitment network connecting at-risk youth with professional mentors across Boys & Girls Clubs and community centers in Puerto Rico.',
    metrics: [
      { num: 'Winner', label: 'Social Impact Hackathon Award' },
      { num: '6 Centers', label: 'Active Partner Community Hubs' },
      { num: '120+ hrs', label: 'Verified Youth Mentorship' },
      { num: '100%', label: 'Non-Profit Community Impact' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> Underprivileged youth in regional Boys & Girls Clubs often lack direct exposure to professional role models in technology, software development, and design.</p>
      <p><strong>How Hackea Works Its Objective:</strong> The platform establishes a streamlined coordination bridge. Professional mentors across STEM, marketing, and arts publish verified availability slots. Center directors pair students with mentors for 1-on-1 tutoring, coding bootcamps, and career coaching, with automated SMS and email reminders ensuring zero no-shows.</p>
    `,
    architecture: [
      'Boys & Girls Clubs Community Center Regional Database (San Juan, Bayamón, Ponce)',
      'Calendar Slot Reservation & Double-Booking Prevention Logic',
      'Automated Volunteer Vetting & Intake Triage Pipeline',
      'Bilingual Interface Optimized for Low-Bandwidth Rural Connections',
      'Social Impact Reporting & Mentorship Hours Accreditation'
    ],
    liveUrl: 'https://hackea.novu.works?from=novuworks',
    mirrorUrl: 'https://hackea-novuworks.web.app?from=novuworks',
    githubUrl: 'https://github.com/eresfavolosx/hackeaporunacausa',
    tags: ['React', 'Node.js', 'Social Impact', 'Community Mentorship', 'Scheduling Engine'],
    testBenchType: 'hackea'
  },

  'liza-project': {
    id: 'liza-project',
    badge: 'CRISIS IT SOURCING & DIGITAL LIBRARIES',
    status: 'PRODUCTION // INFRASTRUCTURE',
    uptime: '100+ PCS · 50+ TABLETS · 3 YEARS SLA',
    title: 'The Liza Project: Crisis IT Sourcing & Digital Libraries',
    lead: 'During the height of the global supply chain crisis and school/workplace shutdowns, internationally sourced and procured over 100 computers and 50 tablets in under 30 days. Transformed 3 community centers into secure digital libraries serving 1,000+ residents.',
    metrics: [
      { num: '< 30 Days', label: 'International Sourcing Turnaround' },
      { num: '150+ Devices', label: '100 PCs + 50 Tablets Deployed' },
      { num: '3 Centers', label: 'Digital Libraries Operational' },
      { num: '1,000+', label: 'Rural Residents Connected' }
    ],
    objectiveTitle: 'Platform Objective & Mission',
    objectiveBody: `
      <p><strong>The Core Challenge:</strong> When global supply chains froze during mandatory school lockdowns, disconnected mountain communities faced catastrophic educational disruptions without hardware or internet.</p>
      <p><strong>How The Liza Project Worked Its Objective:</strong> Led international procurement negotiations with hardware suppliers across North America. Sourced 100 enterprise laptops and 50 tablets at non-profit concession pricing in under 30 days. Negotiated satellite connectivity, flashed custom Mobile Device Management (MDM) profiles with content filtering, and maintained daily technical support for 3 continuous years.</p>
    `,
    architecture: [
      'Rapid Hardware Procurement & Global Supply Chain Logistics',
      'Mobile Device Management (MDM) Bulk Provisioning & Security Profiles',
      'Firewall & DNS-Level Content Filtering for Student Safety',
      'Satellite & Redundant Microwave WAN Network Architecture',
      'Hardware Maintenance Lifecycle SLA Management'
    ],
    liveUrl: 'https://linkpuertorico.org',
    mirrorUrl: 'https://linkpuertorico.org',
    githubUrl: 'https://github.com/eresfavolosx/TokenFund',
    tags: ['Crisis Procurement', 'MDM Deployment', 'Network Security', 'Firewalls', 'Hardware Provisioning'],
    testBenchType: 'liza'
  }
};

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
            <h3 class="pl-section-h3">Technical Stack &amp; Architecture</h3>
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
                <span>INTERACTIVE OBJECTIVE VERIFIER</span>
              </div>
              <span class="pl-tb-live-chip">LIVE TESTBENCH</span>
            </div>

            <div class="pl-tb-body" id="pl-tb-body-mount">
              ${renderTestBenchHtml(data.testBenchType)}
            </div>

            <!-- Direct Launch Action Strip -->
            <div class="pl-launch-strip">
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="pl-primary-launch-btn" title="Open live platform in new tab">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>Launch Live Platform</span>
                <span class="pl-btn-arrow">↗</span>
              </a>
              ${data.githubUrl ? `
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="pl-secondary-code-btn" title="Inspect source code on GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>View Codebase</span>
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
        <label class="tb-label" for="tb-jd-select">Select Technical Target Job Description:</label>
        <select id="tb-jd-select" class="tb-select">
          <option value="lead">Senior AI & Performance Marketing Automation Engineer (Money Group)</option>
          <option value="seo">Growth & Revenue Analytics Lead · edX Platform (Red Ventures)</option>
          <option value="architect">Autonomous Systems & Enterprise SDLC Architect</option>
        </select>

        <div class="tb-action-row">
          <button type="button" class="tb-btn" id="btn-run-jobhelper-eval">Run 100-Point Rubric Evaluation</button>
        </div>

        <div class="tb-output-panel" id="tb-jobhelper-output">
          <div class="tb-score-banner">
            <span class="tb-score-label">MATCH SCORE:</span>
            <span class="tb-score-val" id="jh-score-val">96 / 100 [GRADE A+]</span>
          </div>
          <div class="tb-rubric-breakdown">
            <div class="tb-rubric-row"><span>Technical Core & APIs:</span><strong>35 / 35 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Scale (40M+ sessions, $10M+ pipeline):</span><strong>25 / 25 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Autonomous Agent Workflows (20+ skills):</span><strong>20 / 20 pts (100%)</strong></div>
            <div class="tb-rubric-row"><span>Leadership & Degrees (Stanford / 4.0 GPA):</span><strong>16 / 20 pts (80%)</strong></div>
          </div>
          <div class="tb-json-preview">
            <span class="tb-json-tag">STRUCTURED JSON FEEDBACK:</span>
            <pre><code>{
  "status": "APPROVED_HIGH_FIT",
  "match_score": 96.5,
  "telemetry_verification": "100% RECONCILED",
  "recommended_action": "FAST_TRACK_OFFER"
}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'bizpay') {
    return `
      <div class="tb-module tb-bizpay">
        <label class="tb-label" for="tb-invoice-amount">B2B Commercial Invoice Amount ($ USD):</label>
        <div class="tb-input-wrap">
          <span class="tb-currency">$</span>
          <input type="number" id="tb-invoice-amount" class="tb-input" value="2500" min="50" max="100000" step="50" />
        </div>

        <div class="tb-calc-grid">
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">ATH Móvil Business Fee (1.50%):</span>
            <strong class="tb-calc-val" id="bp-fee-val">$37.50</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Net Settled Payout to Merchant:</span>
            <strong class="tb-calc-val gold-val" id="bp-net-val">$2,462.50</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Traditional Credit Card Fee (3.5% + $0.30):</span>
            <strong class="tb-calc-val text-muted" id="bp-trad-val">$87.80</strong>
          </div>
          <div class="tb-calc-item">
            <span class="tb-calc-lbl">Direct Enterprise Savings:</span>
            <strong class="tb-calc-val green-val" id="bp-save-val">+$50.30 Saved (57%)</strong>
          </div>
        </div>

        <div class="tb-sim-checkout">
          <button type="button" class="tb-btn ath-btn" id="btn-simulate-ath">
            <span>Simulate ATH Móvil Business 1-Click Pay</span>
          </button>
          <div class="tb-sim-badge hidden" id="tb-ath-confirmed">
            ✅ ATH MÓVIL TRANSACTION #83921 SETTLED IN 1.2 SECONDS (0% SLIPPAGE)
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'picta') {
    return `
      <div class="tb-module tb-picta">
        <label class="tb-label">Select Daltonization Color Vision Matrix:</label>
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
          <div class="tb-ed-title">Tap Any Swatch to Test Color Speech Classifier:</div>
          <div class="tb-ed-result" id="tb-color-result">
            <span class="tb-ed-dot" id="tb-ed-dot" style="background: #ef4444;"></span>
            <span id="tb-ed-text">Detected: Crimson Red · RGB(239, 68, 68) · Wavelength 650nm</span>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'nfc') {
    return `
      <div class="tb-module tb-nfc">
        <label class="tb-label" for="tb-nfc-url">Dynamic Attendee Pass Redirect URL:</label>
        <input type="text" id="tb-nfc-url" class="tb-input" value="https://novu.works/pass/vip-fabian" />

        <div class="tb-nfc-tier-row">
          <label class="tb-label">Access Credential Tier:</label>
          <div class="tb-chips-group">
            <button type="button" class="tb-chip active">VIP All-Access</button>
            <button type="button" class="tb-chip">Speaker Pass</button>
            <button type="button" class="tb-chip">Technical Workshop</button>
          </div>
        </div>

        <div class="tb-nfc-payload-box">
          <span class="tb-nfc-lbl">GENERATED NDEF PAYLOAD (ENCRYPTED):</span>
          <code>NDEF Record 01: TNF_WELL_KNOWN · URI: https://nfc.novu.works/r/847291 · SIGNATURE: 0x9a4f21b7</code>
        </div>

        <button type="button" class="tb-btn" id="btn-simulate-nfc-tap">
          <span>Simulate Wristband NFC Contactless Tap (0.4s)</span>
        </button>
        <div class="tb-sim-badge hidden" id="tb-nfc-confirmed">
          📡 NFC WRISTBAND DETECTED: ACCESS GRANTED (VIP ALL-ACCESS · ATTENDEE #428)
        </div>
      </div>
    `;
  }

  if (type === 'hackea') {
    return `
      <div class="tb-module tb-hackea">
        <label class="tb-label">Select Boys &amp; Girls Clubs Partner Center:</label>
        <div class="tb-chips-group">
          <button type="button" class="tb-chip active">San Juan Center</button>
          <button type="button" class="tb-chip">Bayamón Center</button>
          <button type="button" class="tb-chip">Ponce Center</button>
        </div>

        <label class="tb-label" style="margin-top: 12px;">Mentorship Focus Area:</label>
        <select class="tb-select">
          <option>Artificial Intelligence &amp; Autonomous Agents</option>
          <option>Full-Stack Web Development &amp; Cloud</option>
          <option>Design Thinking &amp; Entrepreneurship</option>
        </select>

        <div class="tb-hackea-slots">
          <div class="tb-slot-card">
            <span>📅 Saturday 10:00 AM · Las Margaritas Center</span>
            <strong>Status: Available (1 Spot)</strong>
          </div>
          <div class="tb-slot-card">
            <span>📅 Saturday 2:00 PM · Bayamón Center</span>
            <strong>Status: Available (2 Spots)</strong>
          </div>
        </div>

        <button type="button" class="tb-btn" id="btn-book-mentor">
          <span>Simulate 1-Click Mentorship Session Booking</span>
        </button>
        <div class="tb-sim-badge hidden" id="tb-mentor-confirmed">
          🤝 MENTORSHIP SESSION RESERVED: NOTIFICATION DISPATCHED TO COMMUNITY DIRECTOR
        </div>
      </div>
    `;
  }

  // Fallback / Liza Project
  return `
    <div class="tb-module tb-liza">
      <div class="tb-liza-grid">
        <div class="tb-liza-stat">
          <span class="liza-num">100</span>
          <span class="liza-lbl">Enterprise Laptops Procured (< 30 Days)</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">50</span>
          <span class="liza-lbl">Student Tablets Configured</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">3</span>
          <span class="liza-lbl">Rural Digital Libraries Established</span>
        </div>
        <div class="tb-liza-stat">
          <span class="liza-num">1,000+</span>
          <span class="liza-lbl">Students &amp; Residents Supported Daily</span>
        </div>
      </div>
      <div class="tb-json-preview" style="margin-top: 12px;">
        <span class="tb-json-tag">MDM FLEET TELEMETRY:</span>
        <pre><code>{
  "network_status": "ONLINE_SATELLITE_LINK",
  "content_filtering": "ACTIVE_STUDENT_SAFETY_ENABLED",
  "hardware_health": "100% OPERATIONAL · ZERO COMPROMISES"
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
  if (runJhBtn) {
    runJhBtn.addEventListener('click', () => {
      try { audio.playClick(); } catch (_) {}
      const scoreVal = modalEl.querySelector('#jh-score-val');
      if (scoreVal) {
        scoreVal.textContent = 'EVALUATING 100-PT RUBRIC...';
        setTimeout(() => {
          scoreVal.textContent = '96 / 100 [GRADE A+ · STRONG FIT]';
        }, 350);
      }
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
      if (saveEl) saveEl.textContent = `+$${saved.toFixed(2)} Saved (${Math.round((saved / tradFee) * 100)}%)`;
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
      if (resultText) resultText.textContent = `Identified: ${label} · ${color}`;
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
