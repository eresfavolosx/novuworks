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
      name: 'BizPay',
      badge: 'FINTECH & B2B COMMERCIAL INVOICING',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '100% RECONCILED · ZERO SLIPPAGE',
      accent: '#ff671b',
      accentGlow: 'rgba(255, 103, 27, 0.45)',
      title: 'BizPay: B2B Commercial Invoicing & ATH Móvil Gateway',
      role: 'Lead Architect & Full-Stack Engineer: Fabián Vélez Vicente',
      lead: 'Architected a high-converting B2B commercial payment portal featuring multi-tier invoice routing, ATH Móvil Business API integration, real-time transaction fee calculation, and responsive mobile-first material UI.',
      logoSvg: [
        '<svg viewBox="0 0 100 100" class="nps-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '  <defs>',
        '    <linearGradient id="npsBizpayGrad" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="#ff671b"/>',
        '      <stop offset="55%" stop-color="#f59e0b"/>',
        '      <stop offset="100%" stop-color="#d4af37"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="100" height="100" rx="24" fill="#0c111d" stroke="url(#npsBizpayGrad)" stroke-width="2.5"/>',
        '  <rect x="18" y="18" width="64" height="64" rx="16" fill="url(#npsBizpayGrad)"/>',
        '  <path d="M 32,50 L 46,64 L 68,36" stroke="#ffffff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>',
        '  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="4 3"/>',
        '</svg>'
      ].join(''),
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
      name: 'Picta',
      badge: 'ASSISTIVE COMPUTER VISION & DALTONIZATION',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '60 FPS WEBRTC · ZERO CLOUD LATENCY',
      accent: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.45)',
      title: 'Picta: Assistive Computer Vision & Daltonization Camera',
      role: 'Computer Vision & Systems Architect: Fabián Vélez Vicente',
      lead: 'Engineered an assistive computer vision camera application for individuals with Color Vision Deficiency (CVD). Implemented real-time Daltonization boost algorithms and color classification using client-side WebRTC and SVG/WebGL transformation matrices.',
      logoSvg: [
        '<svg viewBox="0 0 100 100" class="nps-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '  <defs>',
        '    <linearGradient id="npsPictaGrad" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="#4f46e5"/>',
        '      <stop offset="50%" stop-color="#06b6d4"/>',
        '      <stop offset="100%" stop-color="#ec4899"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="100" height="100" rx="24" fill="#090f1e" stroke="url(#npsPictaGrad)" stroke-width="2.5"/>',
        '  <circle cx="50" cy="50" r="30" stroke="url(#npsPictaGrad)" stroke-width="3" fill="none"/>',
        '  <circle cx="50" cy="50" r="14" fill="url(#npsPictaGrad)"/>',
        '  <circle cx="50" cy="50" r="6" fill="#ffffff"/>',
        '  <path d="M 50,12 L 50,22 M 50,78 L 50,88 M 12,50 L 22,50 M 78,50 L 88,50" stroke="#00cec9" stroke-width="2.5" stroke-linecap="round"/>',
        '</svg>'
      ].join(''),
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
      name: 'Tocaito NFC',
      badge: 'EVENT ACCESS & CONTACTLESS NFC',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '100% PASS READ RATE · ZERO QUEUES',
      accent: '#8b5cf6',
      accentGlow: 'rgba(139, 92, 246, 0.45)',
      title: 'Tocaito: Cross-Platform NFC Event & Verification Platform',
      role: 'Systems & Mobile App Engineer: Fabián Vélez Vicente',
      lead: 'Developed a cross-platform event registration and verification application using Capacitor, Firebase, and Vite. Architected a custom Python automated verification suite to continuously test UI routing, state persistence, and generate real-time system health reports.',
      logoSvg: [
        '<svg viewBox="0 0 100 100" class="nps-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '  <defs>',
        '    <linearGradient id="npsNfcGrad" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="#8b5cf6"/>',
        '      <stop offset="100%" stop-color="#00cec9"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="100" height="100" rx="24" fill="#090b14" stroke="url(#npsNfcGrad)" stroke-width="2.5"/>',
        '  <circle cx="50" cy="46" r="10" fill="none" stroke="url(#npsNfcGrad)" stroke-width="3"/>',
        '  <circle cx="50" cy="46" r="20" fill="none" stroke="url(#npsNfcGrad)" stroke-width="2" stroke-dasharray="3 3"/>',
        '  <circle cx="50" cy="46" r="30" fill="none" stroke="url(#npsNfcGrad)" stroke-width="1.5" opacity="0.6"/>',
        '  <circle cx="50" cy="46" r="4" fill="#00cec9"/>',
        '  <text x="50" y="80" text-anchor="middle" fill="#f8fafc" font-family="-apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="0.12em">NFC</text>',
        '</svg>'
      ].join(''),
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
      name: 'Hackea por una Causa',
      badge: 'CIVIC TECH & YOUTH MENTORSHIP',
      status: 'PRODUCTION // SOCIAL IMPACT',
      uptime: '120+ MENTOR HOURS · 6 CENTERS',
      accent: '#ff4c1d',
      accentGlow: 'rgba(255, 76, 29, 0.45)',
      title: 'Hackea por una Causa: Youth Mentorship & Scheduling Network',
      role: 'Lead Full-Stack Developer: Fabián Vélez Vicente',
      lead: 'Conceived and built during the Hackea por una Causa hackathon: an appointment scheduling and volunteer recruitment network connecting at-risk youth with professional mentors across Boys & Girls Clubs and community centers in Puerto Rico.',
      logoSvg: [
        '<svg viewBox="0 0 100 100" class="nps-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '  <defs>',
        '    <linearGradient id="npsHackeaGrad" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="#ff4c1d"/>',
        '      <stop offset="50%" stop-color="#f59e0b"/>',
        '      <stop offset="100%" stop-color="#10b981"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="100" height="100" rx="24" fill="#0a0f1d" stroke="url(#npsHackeaGrad)" stroke-width="2.5"/>',
        '  <path d="M 50,18 C 60,30 70,42 66,58 C 62,72 44,76 38,66 C 34,60 38,54 42,50 C 44,47 45,43 44,38 C 47,40 50,30 50,18 Z" fill="url(#npsHackeaGrad)"/>',
        '  <circle cx="50" cy="62" r="5" fill="#ffffff" opacity="0.95"/>',
        '</svg>'
      ].join(''),
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

    /* ── Project Splash Screen Styles ── */
    '#novu-project-splash {',
    '  position: fixed;',
    '  inset: 0;',
    '  background: radial-gradient(ellipse at 50% 35%, rgba(12, 18, 34, 0.96) 0%, rgba(4, 7, 16, 0.99) 100%);',
    '  backdrop-filter: blur(28px) saturate(190%);',
    '  -webkit-backdrop-filter: blur(28px) saturate(190%);',
    '  z-index: 10000000;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 24px 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;',
    '  opacity: 1;',
    '  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '#novu-project-splash.is-dismissing {',
    '  opacity: 0;',
    '  transform: scale(1.03);',
    '  pointer-events: none;',
    '}',
    '.nps-ambient-glow {',
    '  position: absolute;',
    '  inset: 0;',
    '  pointer-events: none;',
    '  opacity: 0.65;',
    '  filter: blur(48px);',
    '}',
    '.nps-card {',
    '  position: relative;',
    '  width: 100%;',
    '  max-width: 440px;',
    '  background: rgba(15, 22, 41, 0.85);',
    '  border: 1px solid rgba(255, 255, 255, 0.12);',
    '  border-top-color: rgba(255, 255, 255, 0.24);',
    '  border-radius: 24px;',
    '  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 0, 0, 0.5);',
    '  padding: 32px 28px 28px;',
    '  box-sizing: border-box;',
    '  text-align: center;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '}',
    '.nps-top-badge {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '  padding: 4px 12px;',
    '  border-radius: 999px;',
    '  background: rgba(255, 255, 255, 0.04);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  margin-bottom: 22px;',
    '}',
    '.nps-badge-text {',
    '  font-size: 10px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.12em;',
    '  color: #d4af37;',
    '  text-transform: uppercase;',
    '}',
    '.nps-logo-wrapper {',
    '  position: relative;',
    '  width: 96px;',
    '  height: 96px;',
    '  margin-bottom: 18px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '}',
    '.nps-logo-aura {',
    '  position: absolute;',
    '  inset: -12px;',
    '  border-radius: 32px;',
    '  background: radial-gradient(circle, ' + project.accentGlow + ' 0%, transparent 70%);',
    '  filter: blur(14px);',
    '  animation: npsAuraPulse 2.4s ease-in-out infinite alternate;',
    '}',
    '@keyframes npsAuraPulse {',
    '  0% { transform: scale(0.9); opacity: 0.5; }',
    '  100% { transform: scale(1.15); opacity: 0.95; }',
    '}',
    '.nps-logo-svg {',
    '  position: relative;',
    '  width: 96px;',
    '  height: 96px;',
    '  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45));',
    '  animation: npsLogoFloat 3s ease-in-out infinite alternate;',
    '}',
    '@keyframes npsLogoFloat {',
    '  0% { transform: translateY(0); }',
    '  100% { transform: translateY(-4px); }',
    '}',
    '.nps-title {',
    '  font-size: 26px;',
    '  font-weight: 800;',
    '  color: #ffffff;',
    '  letter-spacing: 0.06em;',
    '  margin: 0 0 6px;',
    '  text-transform: uppercase;',
    '}',
    '.nps-badge-pill {',
    '  display: inline-block;',
    '  font-size: 10.5px;',
    '  font-weight: 700;',
    '  color: #f5e6be;',
    '  background: rgba(212, 175, 55, 0.12);',
    '  border: 1px solid rgba(212, 175, 55, 0.3);',
    '  padding: 4px 10px;',
    '  border-radius: 999px;',
    '  letter-spacing: 0.06em;',
    '  margin-bottom: 8px;',
    '  text-transform: uppercase;',
    '}',
    '.nps-author {',
    '  font-size: 11.5px;',
    '  color: #94a3b8;',
    '  margin: 0 0 20px;',
    '  font-weight: 500;',
    '}',
    '.nps-progress-container {',
    '  width: 100%;',
    '  height: 4px;',
    '  background: rgba(255, 255, 255, 0.08);',
    '  border-radius: 999px;',
    '  overflow: hidden;',
    '  margin-bottom: 10px;',
    '  position: relative;',
    '}',
    '.nps-progress-bar {',
    '  height: 100%;',
    '  width: 0%;',
    '  background: linear-gradient(90deg, #d4af37 0%, ' + project.accent + ' 100%);',
    '  box-shadow: 0 0 12px ' + project.accent + ';',
    '  border-radius: 999px;',
    '  transition: width 0.08s linear;',
    '}',
    '.nps-telemetry-row {',
    '  width: 100%;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;',
    '  font-size: 10px;',
    '  color: #94a3b8;',
    '  margin-bottom: 18px;',
    '  letter-spacing: 0.04em;',
    '}',
    '.nps-telemetry-pct {',
    '  color: #f5e6be;',
    '  font-weight: 700;',
    '}',
    '.nps-enter-btn {',
    '  width: 100%;',
    '  background: linear-gradient(135deg, rgba(212, 175, 55, 0.32) 0%, rgba(212, 175, 55, 0.12) 100%);',
    '  border: 1px solid rgba(212, 175, 55, 0.6);',
    '  color: #ffffff;',
    '  font-size: 12.5px;',
    '  font-weight: 700;',
    '  padding: 10px 16px;',
    '  border-radius: 999px;',
    '  cursor: pointer;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.08em;',
    '  transition: all 0.2s ease;',
    '}',
    '.nps-enter-btn:hover {',
    '  background: linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.22) 100%);',
    '  border-color: #d4af37;',
    '  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);',
    '  transform: translateY(-1px);',
    '}',

    /* ── Architecture Blueprint Modal Styles ── */
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
    '  background: rgba(15, 23, 42, 0.88);',
    '  border: 1px solid rgba(212, 175, 55, 0.35);',
    '  border-top-color: rgba(212, 175, 55, 0.65);',
    '  border-radius: 20px;',
    '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.15);',
    '  padding: clamp(20px, 3vw, 32px);',
    '  box-sizing: border-box;',
    '  color: #f8fafc;',
    '}',
    '.novuintro-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }',
    '.novuintro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.35); padding: 4px 10px; border-radius: 999px; font-size: 10.5px; font-weight: 700; color: #f5e6be; text-transform: uppercase; letter-spacing: 0.08em; }',
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

  // 5. Project Splash Screen (Animated Entrance with Logo, Name & Telemetry)
  function showProjectSplashScreen(onComplete) {
    if (document.getElementById('novu-project-splash')) return;

    var splash = document.createElement('div');
    splash.id = 'novu-project-splash';
    splash.setAttribute('role', 'dialog');
    splash.setAttribute('aria-modal', 'true');
    splash.setAttribute('aria-label', project.name + ' Launch Splash Screen');

    splash.innerHTML = [
      '<div class="nps-ambient-glow"></div>',
      '<div class="nps-card">',
      '  <div class="nps-top-badge">',
      '    <span class="np-dot"></span>',
      '    <span class="nps-badge-text">NOVU.WORKS // THE RARE HYBRID · SUBSYSTEM</span>',
      '  </div>',
      '  <div class="nps-logo-wrapper">',
      '    <div class="nps-logo-aura"></div>',
      '    ' + project.logoSvg,
      '  </div>',
      '  <h1 class="nps-title">' + project.name.toUpperCase() + '</h1>',
      '  <div class="nps-badge-pill">' + project.badge + '</div>',
      '  <p class="nps-author">Architected &amp; Engineered by Fabián Vélez Vicente</p>',
      '  <div class="nps-progress-container">',
      '    <div class="nps-progress-bar" id="nps-bar"></div>',
      '  </div>',
      '  <div class="nps-telemetry-row">',
      '    <span class="nps-telemetry-text" id="nps-telemetry">AUTHENTICATING SECURE EDGE GATEWAY...</span>',
      '    <span class="nps-telemetry-pct" id="nps-pct">0%</span>',
      '  </div>',
      '  <button type="button" class="nps-enter-btn" id="nps-btn-enter">',
      '    <span>Enter Application &rarr;</span>',
      '  </button>',
      '</div>'
    ].join('');

    document.body.appendChild(splash);

    var bar = splash.querySelector('#nps-bar');
    var telemetry = splash.querySelector('#nps-telemetry');
    var pct = splash.querySelector('#nps-pct');
    var enterBtn = splash.querySelector('#nps-btn-enter');

    var duration = overrideDuration || 2100;
    var startTime = performance.now();
    var isDone = false;

    function dismiss() {
      if (isDone) return;
      isDone = true;
      splash.classList.add('is-dismissing');
      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
        if (typeof onComplete === 'function') onComplete();
      }, 420);
    }

    enterBtn.addEventListener('click', dismiss);
    splash.addEventListener('click', function (e) {
      if (e.target === splash || e.target === enterBtn || e.target.closest('#nps-btn-enter')) {
        dismiss();
      }
    });

    function tick(now) {
      if (isDone) return;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);

      if (bar) bar.style.width = (progress * 100) + '%';
      if (pct) pct.textContent = Math.round(progress * 100) + '%';

      if (telemetry) {
        if (progress < 0.28) {
          telemetry.textContent = 'CALIBRATING PRODUCTION CLOUD CLUSTER...';
        } else if (progress < 0.65) {
          telemetry.textContent = 'INITIALIZING HIGH-PRECISION RUNTIME & DATA FLOWS...';
        } else if (progress < 0.92) {
          telemetry.textContent = 'VERIFYING SUBSYSTEM ARCHITECTURE SPECIFICATIONS...';
        } else {
          telemetry.textContent = '✦ SYSTEM READY // LAUNCHING ' + project.name.toUpperCase();
        }
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(dismiss, 350);
      }
    }

    requestAnimationFrame(tick);
  }

  // Expose global methods for testing & re-launch
  window.showNovuProjectSplash = showProjectSplashScreen;
  window.showNovuBlueprintModal = showBlueprintModal;

  // Execute Splash Screen, followed by Initial Blueprint Modal on first visit
  showProjectSplashScreen(function () {
    var sessionKey = 'seen_subdomain_intro_' + projectId;
    if (!sessionStorage.getItem(sessionKey)) {
      try { sessionStorage.setItem(sessionKey, '1'); } catch (_) {}
      showBlueprintModal();
    }
  });

})();
