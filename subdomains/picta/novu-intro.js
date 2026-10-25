/**
 * novu-intro.js — Universal Liquid Glass Platform Architecture & Initial Page
 * Powered by novu.works · Architected by Fabián Vélez Vicente
 */
(function () {
  'use strict';

  // 1. Detect Project ID
  var currentScript = document.currentScript;
  var projectId = currentScript ? currentScript.getAttribute('data-project') : null;
  var host = window.location.hostname.toLowerCase();
  var path = window.location.pathname.toLowerCase();

  if (!projectId) {
    if (host.indexOf('bizpay') !== -1 || path.indexOf('bizpay') !== -1) projectId = 'bizpay';
    else if (host.indexOf('picta') !== -1 || path.indexOf('picta') !== -1) projectId = 'picta';
    else if (host.indexOf('nfc') !== -1 || path.indexOf('nfc') !== -1) projectId = 'nfc';
    else if (host.indexOf('hackea') !== -1 || path.indexOf('hackea') !== -1) projectId = 'hackea';
    else projectId = 'bizpay';
  }

  var PROJECTS = {
    bizpay: {
      badge: 'FINTECH & B2B COMMERCIAL INVOICING',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '100% RECONCILED · ZERO SLIPPAGE',
      title: 'BizPay: B2B Commercial Invoicing & ATH Móvil Gateway',
      role: 'Lead Architect & Full-Stack Engineer: Fabián Vélez Vicente',
      lead: 'Architected a high-converting B2B commercial payment portal featuring multi-tier invoice routing, ATH Móvil Business API integration, real-time transaction fee calculation, and responsive mobile-first material UI.',
      metrics: [
        { num: '1.50%', label: 'Ultra-Low B2B Merchant Fee' },
        { num: 'Instant', label: 'ATH Móvil Settlement' },
        { num: '100%', label: 'Automated Revenue Auditing' },
        { num: '0.00%', label: 'Transaction Slippage' }
      ],
      challengeTitle: 'The Core Business & Settlement Bottleneck',
      challenge: 'B2B transactions in Puerto Rico and the Caribbean have historically been plagued by multi-day check clearing delays, 3.5%+ international credit card fees, and complex manual invoice reconciliation between suppliers and corporate clients.',
      solutionTitle: 'Engineered Technical Solution',
      solution: 'BizPay directly interfaces with the local ATH Móvil Business API and card tokenization vaults. When an enterprise issues an invoice, BizPay generates a dynamic secure checkout URL that calculates real-time fees, routes payouts into segregated merchant accounts, and emits webhook notifications for automated ERP and accounting reconciliation.',
      architecture: [
        'ATH Móvil Business API Webhook Dispatcher & IPN Listener',
        'Real-Time Merchant Fee Dynamic Routing (1.5% Settlement vs 3.5% Card Gateways)',
        'Firebase Cloud Firestore Transaction Audit Logs & Multi-Tier Routing',
        'Material Design Responsive Front-End with Mobile-First Checkout Flow',
        'Automated PDF Invoice Generator with QR Payment Payloads'
      ],
      githubUrl: 'https://github.com/eresfavolosx/bizpay',
      portfolioUrl: 'https://novu.works#project-bizpay'
    },

    picta: {
      badge: 'ASSISTIVE COMPUTER VISION & DALTONIZATION',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '60 FPS WEBRTC · ZERO CLOUD LATENCY',
      title: 'Picta: Assistive Computer Vision & Daltonization Camera',
      role: 'Computer Vision & Systems Architect: Fabián Vélez Vicente',
      lead: 'Engineered an assistive computer vision camera application for individuals with Color Vision Deficiency (CVD). Implemented real-time Daltonization boost algorithms and color classification using client-side WebRTC and SVG/WebGL transformation matrices.',
      metrics: [
        { num: '60 FPS', label: 'Real-Time Daltonization Shaders' },
        { num: '6 Modes', label: 'Protanopia, Deuteranopia, Tritanopia' },
        { num: '< 16ms', label: 'Hardware Transform Frame Time' },
        { num: '100%', label: 'Pure In-Browser Edge Processing' }
      ],
      challengeTitle: 'The Visual Accessibility Challenge',
      challenge: 'Over 300 million people worldwide suffer from Color Vision Deficiency (CVD). Traditional digital tools only simulate how CVD users see, rather than dynamically correcting or augmenting the visual feed in real-time.',
      solutionTitle: 'Engineered Technical Solution',
      solution: 'Picta captures real-time video streams using WebRTC, applying mathematical LMS-to-RGB Daltonization matrices that shift indistinguishable color wavelengths into visible contrast frequencies. Users can tap anywhere on screen to inspect pixel RGB values with voice synthesis pronunciation.',
      architecture: [
        'Hardware-Accelerated WebRTC Video Stream Processor (60 FPS)',
        'LMS Cone Color Space & Mathematical Daltonization Shift Matrices',
        'Speech Synthesis API for Audio Color Pronunciation & Identification',
        'Progressive Web App (PWA) with Offline Camera Cache',
        'Client-Side Privacy: 0 Bytes Transmitted to Cloud'
      ],
      githubUrl: 'https://github.com/eresfavolosx/Picta',
      portfolioUrl: 'https://novu.works#project-picta'
    },

    nfc: {
      badge: 'EVENT ACCESS & NFC LOGISTICS',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '100% PASS READ RATE · ZERO QUEUES',
      title: 'Tocaito: Cross-Platform NFC Event & Verification Platform',
      role: 'Systems & Mobile App Engineer: Fabián Vélez Vicente',
      lead: 'Developed a cross-platform event registration and verification application using Capacitor, Firebase, and Vite. Architected a custom Python automated verification suite to continuously test UI routing, state persistence, and generate real-time system health reports.',
      metrics: [
        { num: '0.4s', label: 'Contactless Wristband Read Latency' },
        { num: '100%', label: 'Offline Ticket Verification Rate' },
        { num: 'Zero', label: 'Entry Bottlenecks / Line Slippage' },
        { num: 'Auto-QA', label: 'Headless Python Test Suite' }
      ],
      challengeTitle: 'The Event Queue & Counterfeiting Challenge',
      challenge: 'Event attendees at major festivals and tech summits suffer from long queue delays, paper ticket counterfeiting, and connectivity drops in crowded convention centers.',
      solutionTitle: 'Engineered Technical Solution',
      solution: 'Tocaito writes encrypted NDEF URL payloads onto standard NTAG213/215/216 RFID wristbands. Gate staff scan attendees using native NFC sensors. The app verifies cryptographic hashes against an offline-synced local cache, guaranteeing sub-second admittance even during total cellular outage.',
      architecture: [
        'Capacitor Hardware Bridge for Native iOS/Android NFC Controller Access',
        'Cloud Firestore Real-Time Listener Architecture with Offline Persistence',
        'Automated Python Headless QA Test Suite for Regression Prevention',
        'Service Worker PWA with Instant Offline Caching',
        'Dynamic URL Routing & Cryptographic Ticket Hash Generation'
      ],
      githubUrl: 'https://github.com/eresfavolosx/NFC',
      portfolioUrl: 'https://novu.works#project-nfc-platform'
    },

    hackea: {
      badge: 'SOCIAL IMPACT HACKATHON WINNER',
      status: 'PRODUCTION // SOCIAL IMPACT',
      uptime: '120+ MENTOR HOURS · 6 CENTERS',
      title: 'Hackea por una Causa: Youth Mentorship & Scheduling Network',
      role: 'Lead Full-Stack Developer: Fabián Vélez Vicente',
      lead: 'Conceived and built during the Hackea por una Causa hackathon: an appointment scheduling and volunteer recruitment network connecting at-risk youth with professional mentors across Boys & Girls Clubs and community centers in Puerto Rico.',
      metrics: [
        { num: 'Winner', label: 'Social Impact Hackathon Award' },
        { num: '6 Centers', label: 'Active Partner Community Hubs' },
        { num: '120+ hrs', label: 'Verified Youth Mentorship Hours' },
        { num: '100%', label: 'Non-Profit Community Enablement' }
      ],
      challengeTitle: 'The Youth Opportunity Gap',
      challenge: 'Underprivileged youth in regional Boys & Girls Clubs often lack direct exposure to professional role models in technology, software development, and design.',
      solutionTitle: 'Engineered Technical Solution',
      solution: 'The platform establishes a streamlined coordination bridge. Professional mentors across STEM, marketing, and arts publish verified availability slots. Center directors pair students with mentors for 1-on-1 tutoring, coding bootcamps, and career coaching, with automated notifications preventing no-shows.',
      architecture: [
        'Boys & Girls Clubs Community Center Regional Database (San Juan, Bayamón, Ponce)',
        'Calendar Slot Reservation & Double-Booking Prevention Logic',
        'Automated Volunteer Vetting & Intake Triage Pipeline',
        'Bilingual Interface Optimized for Low-Bandwidth Rural Connections',
        'Social Impact Reporting & Mentorship Hours Accreditation'
      ],
      githubUrl: 'https://github.com/eresfavolosx/hackeaporunacausa',
      portfolioUrl: 'https://novu.works#project-hackeaporunacausa'
    }
  };

  var project = PROJECTS[projectId] || PROJECTS.bizpay;

  // 2. Inject CSS Styles
  var style = document.createElement('style');
  style.textContent = [
    '#novu-platform-topbar {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  right: 0;',
    '  height: 42px;',
    '  background: rgba(10, 14, 26, 0.94);',
    '  backdrop-filter: blur(24px) saturate(180%);',
    '  -webkit-backdrop-filter: blur(24px) saturate(180%);',
    '  border-bottom: 1px solid rgba(212, 175, 55, 0.25);',
    '  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);',
    '  z-index: 9999999;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 0 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;',
    '  font-size: 11.5px;',
    '  color: #e2e8f0;',
    '}',
    'body { margin-top: 42px !important; }',
    '.np-left { display: flex; align-items: center; gap: 10px; }',
    '.np-badge { display: inline-flex; align-items: center; gap: 6px; color: #d4af37; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; }',
    '.np-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; animation: npPulse 1.8s infinite; }',
    '@keyframes npPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }',
    '.np-name { font-weight: 600; color: #ffffff; }',
    '.np-right { display: flex; align-items: center; gap: 10px; }',
    '.np-btn-blueprint { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.1) 100%); border: 1px solid rgba(212, 175, 55, 0.55); color: #f5e6be; padding: 5px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 0 12px rgba(212, 175, 55, 0.15); }',
    '.np-btn-blueprint:hover { background: linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.2) 100%); border-color: #d4af37; color: #ffffff; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35); }',
    '.np-btn-github { color: #cbd5e1; text-decoration: none; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.04); transition: all 0.2s ease; }',
    '.np-btn-github:hover { color: #ffffff; border-color: rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.1); }',
    '.np-btn-home { color: #94a3b8; text-decoration: none; font-size: 11px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; transition: color 0.2s ease; }',
    '.np-btn-home:hover { color: #ffffff; background: rgba(255, 255, 255, 0.06); }',
    '#novuintro-overlay {',
    '  position: fixed;',
    '  inset: 0;',
    '  background: radial-gradient(ellipse at 50% 40%, rgba(8, 12, 22, 0.88) 0%, rgba(3, 5, 12, 0.98) 100%);',
    '  backdrop-filter: blur(18px) saturate(180%);',
    '  -webkit-backdrop-filter: blur(18px) saturate(180%);',
    '  z-index: 10000000;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: clamp(16px, 3vh, 32px) 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;',
    '  opacity: 1;',
    '  transition: opacity 0.3s ease;',
    '}',
    '#novuintro-card {',
    '  width: 100%;',
    '  max-width: 720px;',
    '  max-height: 92vh;',
    '  overflow-y: auto;',
    '  scrollbar-width: thin;',
    '  background: linear-gradient(145deg, rgba(22, 27, 44, 0.94) 0%, rgba(8, 12, 22, 0.98) 100%);',
    '  border: 1px solid rgba(212, 175, 55, 0.35);',
    '  border-radius: 24px;',
    '  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), 0 32px 80px -10px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.18);',
    '  color: #f1f5f9;',
    '  padding: clamp(20px, 3vw, 28px);',
    '  box-sizing: border-box;',
    '  animation: introPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '@keyframes introPop { 0% { opacity: 0; transform: scale(0.96) translateY(12px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }',
    '.novuintro-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); flex-wrap: wrap; gap: 8px; }',
    '.novuintro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.35); color: #d4af37; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.1em; }',
    '.novuintro-uptime { font-size: 9.5px; font-family: monospace; color: #10b981; letter-spacing: 0.08em; text-transform: uppercase; }',
    '.novuintro-close-btn { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); color: #94a3b8; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }',
    '.novuintro-close-btn:hover { background: rgba(255, 255, 255, 0.15); color: #ffffff; }',
    '.novuintro-title { font-size: clamp(20px, 2.5vw, 24px); font-weight: 800; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.02em; line-height: 1.25; }',
    '.novuintro-role { font-size: 12.5px; color: #d4af37; font-weight: 600; margin-bottom: 12px; letter-spacing: 0.02em; }',
    '.novuintro-lead { font-size: 13.5px; line-height: 1.6; color: #cbd5e1; margin-bottom: 18px; }',
    '.novuintro-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }',
    '.novuintro-metric-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 12px 10px; text-align: center; }',
    '.novuintro-metric-num { font-size: 18px; font-weight: 800; color: #f5e6be; margin-bottom: 4px; font-family: -apple-system, sans-serif; }',
    '.novuintro-metric-lbl { font-size: 9.5px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.3; }',
    '.novuintro-section-title { font-size: 11px; font-weight: 700; color: #d4af37; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }',
    '.novuintro-body-text { font-size: 12.5px; line-height: 1.6; color: #94a3b8; margin-bottom: 14px; background: rgba(255, 255, 255, 0.02); border-left: 2px solid #d4af37; padding: 8px 12px; border-radius: 0 8px 8px 0; }',
    '.novuintro-arch-list { list-style: none; padding: 0; margin: 0 0 22px; display: flex; flex-direction: column; gap: 6px; }',
    '.novuintro-arch-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #cbd5e1; background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.06); padding: 8px 12px; border-radius: 8px; }',
    '.novuintro-arch-bullet { color: #10b981; font-weight: 700; font-size: 12px; }',
    '.novuintro-actions { display: flex; gap: 10px; flex-wrap: wrap; }',
    '.novuintro-btn-primary { flex: 1; min-width: 200px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.15) 100%); border: 1px solid #d4af37; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 18px; border-radius: 999px; cursor: pointer; text-align: center; transition: all 0.2s ease; box-shadow: 0 4px 18px rgba(212, 175, 55, 0.25); text-transform: uppercase; letter-spacing: 0.08em; }',
    '.novuintro-btn-primary:hover { background: linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.25) 100%); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(212, 175, 55, 0.4); }',
    '.novuintro-btn-secondary { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.16); color: #cbd5e1; font-size: 12px; font-weight: 600; padding: 12px 16px; border-radius: 999px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; }',
    '.novuintro-btn-secondary:hover { background: rgba(255, 255, 255, 0.12); color: #ffffff; border-color: rgba(255, 255, 255, 0.3); }',
    '@media (max-width: 600px) {',
    '  .np-name { display: none; }',
    '  .novuintro-metrics-grid { grid-template-columns: repeat(2, 1fr); }',
    '  .novuintro-actions { flex-direction: column; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // 3. Inject Top Bar
  var topBar = document.createElement('div');
  topBar.id = 'novu-platform-topbar';
  topBar.innerHTML = [
    '<div class="np-left">',
    '  <span class="np-badge"><span class="np-dot"></span> NOVU.WORKS // ' + project.badge + '</span>',
    '  <span class="np-name">' + project.title + '</span>',
    '</div>',
    '<div class="np-right">',
    '  <button class="np-btn-blueprint" id="np-btn-open-blueprint">📐 Architecture Blueprint &amp; Info</button>',
    '  <a class="np-btn-github" href="' + project.githubUrl + '" target="_blank" rel="noopener">GitHub</a>',
    '  <a class="np-btn-home" href="https://novu.works#projects">&larr; Return to Portfolio</a>',
    '</div>'
  ].join('');
  document.body.prepend(topBar);

  // 4. Modal Injection (Full Initial Page with All the Info)
  function showBlueprintModal() {
    if (document.getElementById('novuintro-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'novuintro-overlay';
    overlay.innerHTML = [
      '<div id="novuintro-card">',
      '  <div class="novuintro-topbar">',
      '    <div class="novuintro-badge">',
      '      <span>novu.works · ' + project.badge + '</span>',
      '    </div>',
      '    <span class="novuintro-uptime">' + project.uptime + '</span>',
      '    <button class="novuintro-close-btn" id="novuintro-btn-close" aria-label="Close Blueprint">&times;</button>',
      '  </div>',
      '  <h2 class="novuintro-title">' + project.title + '</h2>',
      '  <div class="novuintro-role">' + project.role + '</div>',
      '  <div class="novuintro-lead">' + project.lead + '</div>',
      '  <div class="novuintro-metrics-grid">' +
           project.metrics.map(function (m) {
             return '<div class="novuintro-metric-card">' +
               '<div class="novuintro-metric-num">' + m.num + '</div>' +
               '<div class="novuintro-metric-lbl">' + m.label + '</div>' +
             '</div>';
           }).join('') +
      '  </div>',
      '  <div class="novuintro-section-title"><span>✦</span> ' + project.challengeTitle + '</div>',
      '  <div class="novuintro-body-text">' + project.challenge + '</div>',
      '  <div class="novuintro-section-title"><span>✦</span> ' + project.solutionTitle + '</div>',
      '  <div class="novuintro-body-text">' + project.solution + '</div>',
      '  <div class="novuintro-section-title"><span>✦</span> Verified Systems Architecture Stack</div>',
      '  <ul class="novuintro-arch-list">' +
           project.architecture.map(function (item) {
             return '<li class="novuintro-arch-item"><span class="novuintro-arch-bullet">✓</span> <span>' + item + '</span></li>';
           }).join('') +
      '  </ul>',
      '  <div class="novuintro-actions">',
      '    <button class="novuintro-btn-primary" id="novuintro-btn-explore">Explore Live Interactive Application &rarr;</button>',
      '    <a class="novuintro-btn-secondary" href="' + project.githubUrl + '" target="_blank" rel="noopener">GitHub Repository</a>',
      '    <a class="novuintro-btn-secondary" href="https://novu.works#projects">&larr; Return to Portfolio</a>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    overlay.querySelector('#novuintro-btn-close').addEventListener('click', close);
    overlay.querySelector('#novuintro-btn-explore').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  }

  document.getElementById('np-btn-open-blueprint').addEventListener('click', showBlueprintModal);

  // Auto-display initial page with all the info unless closed in this session
  var sessionKey = 'seen_subdomain_intro_' + projectId;
  if (!sessionStorage.getItem(sessionKey)) {
    try { sessionStorage.setItem(sessionKey, '1'); } catch (_) {}
    showBlueprintModal();
  }
})();
