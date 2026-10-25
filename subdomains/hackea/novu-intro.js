/**
 * novu-intro.js — Universal Liquid Glass Platform Architecture & Initial Page
 * Powered by novu.works · Architected by Fabián Vélez Vicente
 * Features:
 *   1. Cross-Domain Theme Synchronization (Bidirectional URL + Cookie + LocalStorage)
 *   2. Topbar Theme Switcher (☀️ Light / 🌙 Dark)
 *   3. Executive Subsystem Brief directly visible on Splash Screen before entering
 *   4. Direct Application Access with zero modal blocking
 *   5. Full Systems Architecture Blueprint Modal
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

  // 2. Cross-Domain Theme Detection & Synchronization
  function getPortfolioBaseUrl() {
    var h = window.location.hostname.toLowerCase();
    var port = window.location.port ? ':' + window.location.port : '';
    if (h === 'localhost' || h === '127.0.0.1') {
      return window.location.protocol + '//' + h + port + '/';
    }
    if (h.indexOf('web.app') !== -1 || h.indexOf('firebaseapp.com') !== -1) {
      return 'https://novuworks.web.app/';
    }
    return 'https://novu.works/';
  }

  var urlParams = new URLSearchParams(window.location.search);
  var urlTheme = urlParams.get('theme');
  var savedTheme = (urlTheme === 'light' || urlTheme === 'dark') ? urlTheme : null;
  if (!savedTheme) {
    try { savedTheme = localStorage.getItem('color-scheme'); } catch (_) {}
  }
  if (!savedTheme) {
    var cookieMatch = document.cookie.match(/(?:^|; )color-scheme=([^;]+)/);
    if (cookieMatch && (cookieMatch[1] === 'light' || cookieMatch[1] === 'dark')) {
      savedTheme = cookieMatch[1];
    }
  }
  var isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var currentTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : (isSystemDark ? 'dark' : 'light');

  function applyNovuTheme(theme) {
    currentTheme = theme;
    try {
      localStorage.setItem('color-scheme', theme);
      document.cookie = 'color-scheme=' + theme + '; path=/; max-age=31536000; SameSite=Lax';
      if (location.hostname.endsWith('novu.works')) {
        document.cookie = 'color-scheme=' + theme + '; path=/; domain=.novu.works; max-age=31536000; SameSite=Lax';
      }
    } catch (_) {}

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');

    var meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;

    // Update all return links dynamically to preserve theme
    var returnLinks = document.querySelectorAll('.np-btn-home, .novuintro-btn-home, .nps-back-link, a[href*="projects"]');
    returnLinks.forEach(function (link) {
      try {
        var base = getPortfolioBaseUrl();
        link.href = base + '?theme=' + theme + '&skipIntro=1#projects';
      } catch (_) {}
    });

    // Update toggle buttons in DOM
    var toggleBtns = document.querySelectorAll('.np-theme-toggle-btn');
    toggleBtns.forEach(function (btn) {
      btn.innerHTML = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
      btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    });
  }

  function toggleNovuTheme() {
    var next = currentTheme === 'dark' ? 'light' : 'dark';
    applyNovuTheme(next);
  }

  // 3. Project Metadata Definitions
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
      lead: 'High-converting B2B commercial invoicing platform directly integrating the ATH Móvil Business API with multi-tier merchant routing, dynamic 1.5% fee split, and automated ERP reconciliation to eliminate check-clearing delays and credit card fees.',
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
      lead: 'Assistive computer vision camera app engineered for individuals with Color Vision Deficiency (CVD). Delivers 60 FPS client-side LMS Daltonization filters, tap-to-inspect color identification, and voice synthesis pronunciation via WebRTC and WebGL.',
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
      challengeTitle: 'The Color Vision Accessibility Barrier',
      challenge: 'Over 300 million people globally live with Color Vision Deficiency, creating daily friction when interpreting medical charts, traffic indicators, wire diagrams, and UI indicators with insufficient contrast.',
      solutionTitle: 'Engineered Technical Solution',
      solution: 'Picta runs entirely inside the browser using WebRTC video streams and custom Daltonization matrix transforms. In real-time, the app re-maps indistinguishable color wavelengths into high-contrast perceptual channels, identifies target colors under the user\'s crosshair, and speaks the color name aloud via Web Speech synthesis.',
      architecture: [
        'Client-Side WebRTC Camera Pipeline with Low-Latency Canvas2D/WebGL Shading',
        'LMS Color Space Daltonization Algorithms for Protanopia, Deuteranopia & Tritanopia',
        'Real-Time Pixel Hex/RGB Sampling & Nearest Color Categorization Model',
        'Web Speech API SpeechSynthesis Integration for Auditory Feedback',
        'Zero-Server Privacy Guarantee (All Camera Frames Processed Locally)'
      ],
      githubUrl: 'https://github.com/eresfavolosx/picta',
      portfolioUrl: 'https://novu.works#project-picta'
    },

    nfc: {
      name: 'Tocaito NFC',
      badge: 'CONTACTLESS RFID TICKETING & PWA',
      status: 'PRODUCTION // LIVE DEPLOYED',
      uptime: '0.4s READ LATENCY · 100% OFFLINE',
      accent: '#3b82f6',
      accentGlow: 'rgba(59, 130, 246, 0.45)',
      title: 'Tocaito: Contactless Event Ticketing & Hardware Bridge',
      role: 'Mobile & Cloud Systems Architect: Fabián Vélez Vicente',
      lead: 'Cross-platform contactless event ticketing & registration system running on Capacitor and Firebase. Programs encrypted NDEF RFID wristbands with instant offline ticket verification and an automated Python QA test suite.',
      logoSvg: [
        '<svg viewBox="0 0 100 100" class="nps-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '  <defs>',
        '    <linearGradient id="npsNfcGrad" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="#3b82f6"/>',
        '      <stop offset="50%" stop-color="#8b5cf6"/>',
        '      <stop offset="100%" stop-color="#ec4899"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="100" height="100" rx="24" fill="#090f1d" stroke="url(#npsNfcGrad)" stroke-width="2.5"/>',
        '  <path d="M 28,68 A 32,32 0 0,1 28,32" stroke="url(#npsNfcGrad)" stroke-width="5" stroke-linecap="round"/>',
        '  <path d="M 38,60 A 20,20 0 0,1 38,40" stroke="url(#npsNfcGrad)" stroke-width="5" stroke-linecap="round"/>',
        '  <path d="M 48,53 A 8,8 0 0,1 48,47" stroke="url(#npsNfcGrad)" stroke-width="5" stroke-linecap="round"/>',
        '  <circle cx="70" cy="50" r="10" fill="#3b82f6"/>',
        '  <circle cx="70" cy="50" r="4" fill="#ffffff"/>',
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
      lead: 'Award-winning social impact mentorship coordination app built for Boys & Girls Clubs in Puerto Rico, pairing at-risk youth with verified professional mentors in STEM and technology.',
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

  // 4. Inject Dynamic CSS Styles (Dark + Light Themes)
  var style = document.createElement('style');
  style.textContent = [
    '/* ── Universal Platform Topbar ── */',
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
    '  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;',
    '}',
    ':root[data-theme="light"] #novu-platform-topbar, html.light-theme #novu-platform-topbar {',
    '  background: rgba(255, 255, 255, 0.94) !important;',
    '  border-bottom-color: rgba(212, 175, 55, 0.35) !important;',
    '  color: #1e293b !important;',
    '  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;',
    '}',
    'body { margin-top: 42px !important; }',
    '.np-left { display: flex; align-items: center; gap: 10px; }',
    '.np-badge { display: inline-flex; align-items: center; gap: 6px; color: #d4af37; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; }',
    ':root[data-theme="light"] .np-badge, html.light-theme .np-badge { color: #b45309 !important; }',
    '.np-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; animation: npPulse 1.8s infinite; }',
    '@keyframes npPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }',
    '.np-name { font-weight: 600; color: #ffffff; }',
    ':root[data-theme="light"] .np-name, html.light-theme .np-name { color: #0f172a !important; }',
    '.np-right { display: flex; align-items: center; gap: 8px; }',
    '.np-theme-toggle-btn {',
    '  background: rgba(255, 255, 255, 0.06);',
    '  border: 1px solid rgba(255, 255, 255, 0.14);',
    '  color: #cbd5e1;',
    '  padding: 4px 10px;',
    '  border-radius: 999px;',
    '  font-size: 10.5px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '  transition: all 0.2s ease;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 4px;',
    '}',
    '.np-theme-toggle-btn:hover { background: rgba(255, 255, 255, 0.14); color: #ffffff; }',
    ':root[data-theme="light"] .np-theme-toggle-btn, html.light-theme .np-theme-toggle-btn {',
    '  background: rgba(15, 23, 42, 0.05) !important;',
    '  border-color: rgba(15, 23, 42, 0.15) !important;',
    '  color: #334155 !important;',
    '}',
    ':root[data-theme="light"] .np-theme-toggle-btn:hover, html.light-theme .np-theme-toggle-btn:hover {',
    '  background: rgba(15, 23, 42, 0.1) !important;',
    '  color: #0f172a !important;',
    '}',
    '.np-btn-blueprint { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.1) 100%); border: 1px solid rgba(212, 175, 55, 0.55); color: #f5e6be; padding: 5px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 0 12px rgba(212, 175, 55, 0.15); }',
    '.np-btn-blueprint:hover { background: linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.2) 100%); border-color: #d4af37; color: #ffffff; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35); }',
    ':root[data-theme="light"] .np-btn-blueprint, html.light-theme .np-btn-blueprint {',
    '  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.08) 100%) !important;',
    '  border-color: #d4af37 !important;',
    '  color: #92400e !important;',
    '}',
    '.np-btn-github { color: #cbd5e1; text-decoration: none; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.04); transition: all 0.2s ease; }',
    '.np-btn-github:hover { color: #ffffff; border-color: rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.1); }',
    ':root[data-theme="light"] .np-btn-github, html.light-theme .np-btn-github {',
    '  color: #334155 !important;',
    '  border-color: rgba(15, 23, 42, 0.15) !important;',
    '  background: rgba(15, 23, 42, 0.04) !important;',
    '}',
    '.np-btn-home { color: #94a3b8; text-decoration: none; font-size: 11px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; transition: color 0.2s ease; }',
    '.np-btn-home:hover { color: #ffffff; background: rgba(255, 255, 255, 0.06); }',
    ':root[data-theme="light"] .np-btn-home, html.light-theme .np-btn-home {',
    '  color: #64748b !important;',
    '}',
    ':root[data-theme="light"] .np-btn-home:hover, html.light-theme .np-btn-home:hover {',
    '  color: #0f172a !important;',
    '  background: rgba(15, 23, 42, 0.06) !important;',
    '}',
    '',
    '/* ── Enhanced Project Splash Screen Styles ── */',
    '#novu-project-splash {',
    '  position: fixed;',
    '  inset: 0;',
    '  background: radial-gradient(ellipse at 50% 35%, rgba(12, 18, 34, 0.97) 0%, rgba(4, 7, 16, 0.99) 100%);',
    '  backdrop-filter: blur(28px) saturate(190%);',
    '  -webkit-backdrop-filter: blur(28px) saturate(190%);',
    '  z-index: 10000000;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 20px 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;',
    '  opacity: 1;',
    '  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
    '  overflow-y: auto;',
    '}',
    ':root[data-theme="light"] #novu-project-splash, html.light-theme #novu-project-splash {',
    '  background: radial-gradient(ellipse at 50% 35%, rgba(248, 250, 252, 0.98) 0%, rgba(226, 232, 240, 0.99) 100%) !important;',
    '}',
    '#novu-project-splash.is-dismissing {',
    '  opacity: 0;',
    '  transform: scale(1.02);',
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
    '  max-width: 520px;',
    '  background: rgba(15, 22, 41, 0.90);',
    '  border: 1px solid rgba(255, 255, 255, 0.14);',
    '  border-top-color: rgba(255, 255, 255, 0.28);',
    '  border-radius: 24px;',
    '  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 0, 0, 0.5);',
    '  padding: 26px 24px 22px;',
    '  box-sizing: border-box;',
    '  text-align: center;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  max-height: 94vh;',
    '  overflow-y: auto;',
    '}',
    ':root[data-theme="light"] .nps-card, html.light-theme .nps-card {',
    '  background: rgba(255, 255, 255, 0.94) !important;',
    '  border-color: rgba(212, 175, 55, 0.35) !important;',
    '  border-top-color: rgba(212, 175, 55, 0.65) !important;',
    '  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12), 0 0 35px rgba(212, 175, 55, 0.1) !important;',
    '  color: #0f172a !important;',
    '}',
    '.nps-header-bar {',
    '  width: 100%;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  margin-bottom: 16px;',
    '}',
    '.nps-top-badge {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '  padding: 4px 12px;',
    '  border-radius: 999px;',
    '  background: rgba(255, 255, 255, 0.04);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '}',
    ':root[data-theme="light"] .nps-top-badge, html.light-theme .nps-top-badge {',
    '  background: rgba(15, 23, 42, 0.04) !important;',
    '  border-color: rgba(15, 23, 42, 0.1) !important;',
    '}',
    '.nps-badge-text {',
    '  font-size: 9.5px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.12em;',
    '  color: #d4af37;',
    '  text-transform: uppercase;',
    '}',
    ':root[data-theme="light"] .nps-badge-text, html.light-theme .nps-badge-text {',
    '  color: #b45309 !important;',
    '}',
    '.nps-logo-wrapper {',
    '  position: relative;',
    '  width: 80px;',
    '  height: 80px;',
    '  margin-bottom: 12px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '}',
    '.nps-logo-aura {',
    '  position: absolute;',
    '  inset: -10px;',
    '  border-radius: 28px;',
    '  background: radial-gradient(circle, ' + project.accentGlow + ' 0%, transparent 70%);',
    '  filter: blur(12px);',
    '  animation: npsAuraPulse 2.4s ease-in-out infinite alternate;',
    '}',
    '@keyframes npsAuraPulse {',
    '  0% { transform: scale(0.9); opacity: 0.5; }',
    '  100% { transform: scale(1.15); opacity: 0.95; }',
    '}',
    '.nps-logo-svg {',
    '  position: relative;',
    '  width: 80px;',
    '  height: 80px;',
    '  filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.45));',
    '  animation: npsLogoFloat 3s ease-in-out infinite alternate;',
    '}',
    '@keyframes npsLogoFloat {',
    '  0% { transform: translateY(0); }',
    '  100% { transform: translateY(-3px); }',
    '}',
    '.nps-title {',
    '  font-size: 24px;',
    '  font-weight: 800;',
    '  color: #ffffff;',
    '  letter-spacing: 0.05em;',
    '  margin: 0 0 4px;',
    '  text-transform: uppercase;',
    '}',
    ':root[data-theme="light"] .nps-title, html.light-theme .nps-title {',
    '  color: #0f172a !important;',
    '}',
    '.nps-badge-pill {',
    '  display: inline-block;',
    '  font-size: 9.5px;',
    '  font-weight: 700;',
    '  color: #f5e6be;',
    '  background: rgba(212, 175, 55, 0.12);',
    '  border: 1px solid rgba(212, 175, 55, 0.3);',
    '  padding: 3px 10px;',
    '  border-radius: 999px;',
    '  letter-spacing: 0.06em;',
    '  margin-bottom: 6px;',
    '  text-transform: uppercase;',
    '}',
    ':root[data-theme="light"] .nps-badge-pill, html.light-theme .nps-badge-pill {',
    '  color: #92400e !important;',
    '  background: rgba(212, 175, 55, 0.14) !important;',
    '  border-color: rgba(212, 175, 55, 0.4) !important;',
    '}',
    '.nps-author {',
    '  font-size: 11px;',
    '  color: #94a3b8;',
    '  margin: 0 0 14px;',
    '  font-weight: 500;',
    '}',
    ':root[data-theme="light"] .nps-author, html.light-theme .nps-author {',
    '  color: #64748b !important;',
    '}',
    '',
    '/* ── Dedicated Executive Subsystem Brief Box ── */',
    '.nps-brief-box {',
    '  width: 100%;',
    '  background: rgba(212, 175, 55, 0.06);',
    '  border: 1px solid rgba(212, 175, 55, 0.25);',
    '  border-left: 3px solid #d4af37;',
    '  border-radius: 12px;',
    '  padding: 12px 14px;',
    '  box-sizing: border-box;',
    '  text-align: left;',
    '  margin-bottom: 14px;',
    '}',
    ':root[data-theme="light"] .nps-brief-box, html.light-theme .nps-brief-box {',
    '  background: rgba(212, 175, 55, 0.08) !important;',
    '  border-color: rgba(212, 175, 55, 0.35) !important;',
    '  border-left-color: #b45309 !important;',
    '}',
    '.nps-brief-title {',
    '  font-size: 9.5px;',
    '  font-weight: 800;',
    '  color: #d4af37;',
    '  letter-spacing: 0.1em;',
    '  text-transform: uppercase;',
    '  margin-bottom: 4px;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '}',
    ':root[data-theme="light"] .nps-brief-title, html.light-theme .nps-brief-title {',
    '  color: #92400e !important;',
    '}',
    '.nps-brief-text {',
    '  font-size: 12px;',
    '  line-height: 1.55;',
    '  color: #cbd5e1;',
    '  margin: 0;',
    '}',
    ':root[data-theme="light"] .nps-brief-text, html.light-theme .nps-brief-text {',
    '  color: #334155 !important;',
    '}',
    '',
    '/* ── Splash Metrics Pills ── */',
    '.nps-metrics-grid {',
    '  width: 100%;',
    '  display: grid;',
    '  grid-template-columns: repeat(4, 1fr);',
    '  gap: 8px;',
    '  margin-bottom: 14px;',
    '}',
    '.nps-metric-pill {',
    '  background: rgba(255, 255, 255, 0.03);',
    '  border: 1px solid rgba(255, 255, 255, 0.08);',
    '  border-radius: 8px;',
    '  padding: 8px 6px;',
    '  box-sizing: border-box;',
    '}',
    ':root[data-theme="light"] .nps-metric-pill, html.light-theme .nps-metric-pill {',
    '  background: rgba(15, 23, 42, 0.03) !important;',
    '  border-color: rgba(15, 23, 42, 0.1) !important;',
    '}',
    '.nps-metric-num {',
    '  font-size: 13.5px;',
    '  font-weight: 800;',
    '  color: #f5e6be;',
    '  line-height: 1.2;',
    '  margin-bottom: 2px;',
    '}',
    ':root[data-theme="light"] .nps-metric-num, html.light-theme .nps-metric-num {',
    '  color: #b45309 !important;',
    '}',
    '.nps-metric-label {',
    '  font-size: 8.5px;',
    '  color: #94a3b8;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.04em;',
    '  line-height: 1.2;',
    '}',
    ':root[data-theme="light"] .nps-metric-label, html.light-theme .nps-metric-label {',
    '  color: #64748b !important;',
    '}',
    '',
    '/* ── Splash Telemetry & Action Buttons ── */',
    '.nps-progress-container {',
    '  width: 100%;',
    '  height: 4px;',
    '  background: rgba(255, 255, 255, 0.08);',
    '  border-radius: 999px;',
    '  overflow: hidden;',
    '  margin-bottom: 8px;',
    '  position: relative;',
    '}',
    ':root[data-theme="light"] .nps-progress-container, html.light-theme .nps-progress-container {',
    '  background: rgba(15, 23, 42, 0.08) !important;',
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
    '  font-size: 9.5px;',
    '  color: #94a3b8;',
    '  margin-bottom: 16px;',
    '  letter-spacing: 0.04em;',
    '}',
    ':root[data-theme="light"] .nps-telemetry-row, html.light-theme .nps-telemetry-row {',
    '  color: #64748b !important;',
    '}',
    '.nps-telemetry-pct {',
    '  color: #f5e6be;',
    '  font-weight: 700;',
    '}',
    ':root[data-theme="light"] .nps-telemetry-pct, html.light-theme .nps-telemetry-pct {',
    '  color: #b45309 !important;',
    '}',
    '.nps-actions-row {',
    '  width: 100%;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 8px;',
    '}',
    '.nps-enter-btn {',
    '  width: 100%;',
    '  background: linear-gradient(135deg, rgba(212, 175, 55, 0.38) 0%, rgba(212, 175, 55, 0.18) 100%);',
    '  border: 1px solid rgba(212, 175, 55, 0.7);',
    '  color: #ffffff;',
    '  font-size: 12.5px;',
    '  font-weight: 800;',
    '  padding: 11px 18px;',
    '  border-radius: 999px;',
    '  cursor: pointer;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.08em;',
    '  transition: all 0.2s ease;',
    '  box-shadow: 0 4px 18px rgba(212, 175, 55, 0.25);',
    '}',
    '.nps-enter-btn:hover {',
    '  background: linear-gradient(135deg, rgba(212, 175, 55, 0.55) 0%, rgba(212, 175, 55, 0.28) 100%);',
    '  border-color: #d4af37;',
    '  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.45);',
    '  transform: translateY(-1px);',
    '}',
    ':root[data-theme="light"] .nps-enter-btn, html.light-theme .nps-enter-btn {',
    '  background: linear-gradient(135deg, #d4af37 0%, #b45309 100%) !important;',
    '  border-color: #92400e !important;',
    '  color: #ffffff !important;',
    '  box-shadow: 0 4px 18px rgba(180, 83, 9, 0.25) !important;',
    '}',
    '.nps-blueprint-btn {',
    '  width: 100%;',
    '  background: rgba(255, 255, 255, 0.05);',
    '  border: 1px solid rgba(255, 255, 255, 0.14);',
    '  color: #cbd5e1;',
    '  font-size: 11.5px;',
    '  font-weight: 600;',
    '  padding: 9px 16px;',
    '  border-radius: 999px;',
    '  cursor: pointer;',
    '  transition: all 0.2s ease;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 6px;',
    '}',
    '.nps-blueprint-btn:hover {',
    '  background: rgba(255, 255, 255, 0.12);',
    '  color: #ffffff;',
    '  border-color: rgba(255, 255, 255, 0.28);',
    '}',
    ':root[data-theme="light"] .nps-blueprint-btn, html.light-theme .nps-blueprint-btn {',
    '  background: rgba(15, 23, 42, 0.05) !important;',
    '  border-color: rgba(15, 23, 42, 0.15) !important;',
    '  color: #334155 !important;',
    '}',
    '.nps-back-link {',
    '  color: #94a3b8;',
    '  text-decoration: none;',
    '  font-size: 11px;',
    '  font-weight: 500;',
    '  margin-top: 4px;',
    '  transition: color 0.2s ease;',
    '}',
    '.nps-back-link:hover { color: #d4af37; }',
    ':root[data-theme="light"] .nps-back-link, html.light-theme .nps-back-link { color: #64748b !important; }',
    ':root[data-theme="light"] .nps-back-link:hover, html.light-theme .nps-back-link:hover { color: #b45309 !important; }',
    '',
    '/* ── Architecture Blueprint Modal Styles ── */',
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
    ':root[data-theme="light"] #novuintro-overlay, html.light-theme #novuintro-overlay {',
    '  background: radial-gradient(ellipse at 50% 40%, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.96) 100%) !important;',
    '}',
    '#novuintro-card {',
    '  width: 100%;',
    '  max-width: 720px;',
    '  max-height: 92vh;',
    '  overflow-y: auto;',
    '  background: rgba(15, 23, 42, 0.92);',
    '  border: 1px solid rgba(212, 175, 55, 0.35);',
    '  border-top-color: rgba(212, 175, 55, 0.65);',
    '  border-radius: 20px;',
    '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.15);',
    '  padding: clamp(20px, 3vw, 32px);',
    '  box-sizing: border-box;',
    '  color: #f8fafc;',
    '}',
    ':root[data-theme="light"] #novuintro-card, html.light-theme #novuintro-card {',
    '  background: rgba(255, 255, 255, 0.95) !important;',
    '  border-color: rgba(212, 175, 55, 0.4) !important;',
    '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 35px rgba(212, 175, 55, 0.1) !important;',
    '  color: #0f172a !important;',
    '}',
    '.novuintro-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }',
    '.novuintro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.35); padding: 4px 10px; border-radius: 999px; font-size: 10.5px; font-weight: 700; color: #f5e6be; text-transform: uppercase; letter-spacing: 0.08em; }',
    ':root[data-theme="light"] .novuintro-badge, html.light-theme .novuintro-badge { color: #92400e !important; background: rgba(212, 175, 55, 0.12) !important; border-color: rgba(212, 175, 55, 0.35) !important; }',
    '.novuintro-uptime { font-size: 9.5px; font-family: monospace; color: #10b981; letter-spacing: 0.08em; text-transform: uppercase; }',
    '.novuintro-close-btn { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); color: #94a3b8; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }',
    '.novuintro-close-btn:hover { background: rgba(255, 255, 255, 0.15); color: #ffffff; }',
    ':root[data-theme="light"] .novuintro-close-btn, html.light-theme .novuintro-close-btn { background: rgba(15, 23, 42, 0.06) !important; border-color: rgba(15, 23, 42, 0.15) !important; color: #475569 !important; }',
    ':root[data-theme="light"] .novuintro-close-btn:hover, html.light-theme .novuintro-close-btn:hover { background: rgba(15, 23, 42, 0.12) !important; color: #0f172a !important; }',
    '.novuintro-title { font-size: clamp(20px, 2.5vw, 24px); font-weight: 800; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.02em; line-height: 1.25; }',
    ':root[data-theme="light"] .novuintro-title, html.light-theme .novuintro-title { color: #0f172a !important; }',
    '.novuintro-role { font-size: 12.5px; color: #d4af37; font-weight: 600; margin-bottom: 12px; letter-spacing: 0.02em; }',
    ':root[data-theme="light"] .novuintro-role, html.light-theme .novuintro-role { color: #b45309 !important; }',
    '.novuintro-lead { font-size: 13.5px; line-height: 1.6; color: #cbd5e1; margin-bottom: 18px; }',
    ':root[data-theme="light"] .novuintro-lead, html.light-theme .novuintro-lead { color: #334155 !important; }',
    '.novuintro-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }',
    '.novuintro-metric-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 12px 10px; text-align: center; }',
    ':root[data-theme="light"] .novuintro-metric-card, html.light-theme .novuintro-metric-card { background: rgba(15, 23, 42, 0.03) !important; border-color: rgba(212, 175, 55, 0.25) !important; }',
    '.novuintro-metric-num { font-size: 18px; font-weight: 800; color: #f5e6be; margin-bottom: 4px; font-family: -apple-system, sans-serif; }',
    ':root[data-theme="light"] .novuintro-metric-num, html.light-theme .novuintro-metric-num { color: #b45309 !important; }',
    '.novuintro-metric-lbl { font-size: 9.5px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.3; }',
    ':root[data-theme="light"] .novuintro-metric-lbl, html.light-theme .novuintro-metric-lbl { color: #64748b !important; }',
    '.novuintro-section-title { font-size: 11px; font-weight: 700; color: #d4af37; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }',
    ':root[data-theme="light"] .novuintro-section-title, html.light-theme .novuintro-section-title { color: #b45309 !important; }',
    '.novuintro-body-text { font-size: 12.5px; line-height: 1.6; color: #94a3b8; margin-bottom: 14px; background: rgba(255, 255, 255, 0.02); border-left: 2px solid #d4af37; padding: 8px 12px; border-radius: 0 8px 8px 0; }',
    ':root[data-theme="light"] .novuintro-body-text, html.light-theme .novuintro-body-text { color: #475569 !important; background: rgba(15, 23, 42, 0.02) !important; border-left-color: #b45309 !important; }',
    '.novuintro-arch-list { list-style: none; padding: 0; margin: 0 0 22px; display: flex; flex-direction: column; gap: 6px; }',
    '.novuintro-arch-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #cbd5e1; background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.06); padding: 8px 12px; border-radius: 8px; }',
    ':root[data-theme="light"] .novuintro-arch-item, html.light-theme .novuintro-arch-item { color: #334155 !important; background: rgba(15, 23, 42, 0.02) !important; border-color: rgba(15, 23, 42, 0.08) !important; }',
    '.novuintro-arch-bullet { color: #10b981; font-weight: 700; font-size: 12px; }',
    '.novuintro-actions { display: flex; gap: 10px; flex-wrap: wrap; }',
    '.novuintro-btn-primary { flex: 1; min-width: 200px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.15) 100%); border: 1px solid #d4af37; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 18px; border-radius: 999px; cursor: pointer; text-align: center; transition: all 0.2s ease; box-shadow: 0 4px 18px rgba(212, 175, 55, 0.25); text-transform: uppercase; letter-spacing: 0.08em; }',
    '.novuintro-btn-primary:hover { background: linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.25) 100%); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(212, 175, 55, 0.4); }',
    ':root[data-theme="light"] .novuintro-btn-primary, html.light-theme .novuintro-btn-primary { background: linear-gradient(135deg, #d4af37 0%, #b45309 100%) !important; border-color: #92400e !important; color: #ffffff !important; }',
    '.novuintro-btn-secondary { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.16); color: #cbd5e1; font-size: 12px; font-weight: 600; padding: 12px 16px; border-radius: 999px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; }',
    '.novuintro-btn-secondary:hover { background: rgba(255, 255, 255, 0.12); color: #ffffff; border-color: rgba(255, 255, 255, 0.3); }',
    ':root[data-theme="light"] .novuintro-btn-secondary, html.light-theme .novuintro-btn-secondary { background: rgba(15, 23, 42, 0.05) !important; border-color: rgba(15, 23, 42, 0.15) !important; color: #334155 !important; }',
    '@media (max-width: 600px) {',
    '  .np-name { display: none; }',
    '  .novuintro-metrics-grid, .nps-metrics-grid { grid-template-columns: repeat(2, 1fr); }',
    '  .novuintro-actions { flex-direction: column; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // Apply resolved theme immediately
  applyNovuTheme(currentTheme);

  // 5. Inject Top Bar
  var topBar = document.createElement('div');
  topBar.id = 'novu-platform-topbar';
  topBar.innerHTML = [
    '<div class="np-left">',
    '  <span class="np-badge"><span class="np-dot"></span> NOVU.WORKS // ' + project.badge + '</span>',
    '  <span class="np-name">' + project.title + '</span>',
    '</div>',
    '<div class="np-right">',
    '  <button type="button" class="np-theme-toggle-btn" id="np-btn-theme-topbar" aria-label="Toggle Theme">' + (currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode') + '</button>',
    '  <button type="button" class="np-btn-blueprint" id="np-btn-open-blueprint">📐 Architecture Blueprint &amp; Info</button>',
    '  <a class="np-btn-github" href="' + project.githubUrl + '" target="_blank" rel="noopener">GitHub</a>',
    '  <a class="np-btn-home" href="' + getPortfolioBaseUrl() + '?theme=' + currentTheme + '&skipIntro=1#projects">&larr; Return to Portfolio</a>',
    '</div>'
  ].join('');
  document.body.prepend(topBar);

  topBar.querySelector('#np-btn-theme-topbar').addEventListener('click', toggleNovuTheme);

  // 6. Architecture Blueprint Modal (Full Technical Deep-Dive)
  function showBlueprintModal() {
    if (document.getElementById('novuintro-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'novuintro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', project.title + ' Architecture Blueprint');

    overlay.innerHTML = [
      '<div id="novuintro-card">',
      '  <div class="novuintro-topbar">',
      '    <div class="novuintro-badge">',
      '      <span>novu.works · ' + project.badge + '</span>',
      '    </div>',
      '    <span class="novuintro-uptime">' + project.uptime + '</span>',
      '    <div style="display: flex; align-items: center; gap: 8px;">',
      '      <button type="button" class="np-theme-toggle-btn np-theme-toggle-blueprint">' + (currentTheme === 'light' ? '🌙 Dark' : '☀️ Light') + '</button>',
      '      <button type="button" class="novuintro-close-btn" id="novuintro-btn-close" aria-label="Close Blueprint">&times;</button>',
      '    </div>',
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
      '    <button type="button" class="novuintro-btn-primary" id="novuintro-btn-explore">🚀 Launch Interactive Application &rarr;</button>',
      '    <a class="novuintro-btn-secondary" href="' + project.githubUrl + '" target="_blank" rel="noopener">GitHub Repository</a>',
      '    <a class="novuintro-btn-secondary novuintro-btn-home" href="' + getPortfolioBaseUrl() + '?theme=' + currentTheme + '&skipIntro=1#projects">&larr; Return to Portfolio</a>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    overlay.querySelector('#novuintro-btn-close').addEventListener('click', close);
    overlay.querySelector('#novuintro-btn-explore').addEventListener('click', close);
    var blueprintThemeBtn = overlay.querySelector('.np-theme-toggle-blueprint');
    if (blueprintThemeBtn) {
      blueprintThemeBtn.addEventListener('click', function () {
        toggleNovuTheme();
        blueprintThemeBtn.innerHTML = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';
      });
    }
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  }

  document.getElementById('np-btn-open-blueprint').addEventListener('click', showBlueprintModal);

  // 7. Project Splash Screen (Executive Brief + Metrics + Direct Launch)
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
      '  <div class="nps-header-bar">',
      '    <div class="nps-top-badge">',
      '      <span class="np-dot"></span>',
      '      <span class="nps-badge-text">NOVU.WORKS // THE RARE HYBRID · SUBSYSTEM</span>',
      '    </div>',
      '    <button type="button" class="np-theme-toggle-btn np-theme-toggle-splash" aria-label="Toggle Theme">' + (currentTheme === 'light' ? '🌙 Dark' : '☀️ Light') + '</button>',
      '  </div>',
      '  <div class="nps-logo-wrapper">',
      '    <div class="nps-logo-aura"></div>',
      '    ' + project.logoSvg,
      '  </div>',
      '  <h1 class="nps-title">' + project.name.toUpperCase() + '</h1>',
      '  <div class="nps-badge-pill">' + project.badge + '</div>',
      '  <p class="nps-author">Architected &amp; Engineered by Fabián Vélez Vicente</p>',
      '',
      '  <!-- Executive Subsystem Brief & Mission Box (Displayed before accessing) -->',
      '  <div class="nps-brief-box">',
      '    <div class="nps-brief-title"><span>✦</span> EXECUTIVE SUBSYSTEM BRIEF &amp; PURPOSE</div>',
      '    <p class="nps-brief-text">' + project.lead + '</p>',
      '  </div>',
      '',
      '  <!-- Subsystem Key Performance Metrics -->',
      '  <div class="nps-metrics-grid">' +
           project.metrics.map(function (m) {
             return '<div class="nps-metric-pill">' +
               '<div class="nps-metric-num">' + m.num + '</div>' +
               '<div class="nps-metric-label">' + m.label + '</div>' +
             '</div>';
           }).join('') +
      '  </div>',
      '',
      '  <!-- Telemetry Bar -->',
      '  <div class="nps-progress-container">',
      '    <div class="nps-progress-bar" id="nps-bar"></div>',
      '  </div>',
      '  <div class="nps-telemetry-row">',
      '    <span class="nps-telemetry-text" id="nps-telemetry">AUTHENTICATING SECURE EDGE GATEWAY...</span>',
      '    <span class="nps-telemetry-pct" id="nps-pct">0%</span>',
      '  </div>',
      '',
      '  <!-- Actions: Direct Application Access & Blueprint Option -->',
      '  <div class="nps-actions-row">',
      '    <button type="button" class="nps-enter-btn" id="nps-btn-enter">',
      '      <span>🚀 Launch Interactive Application &rarr;</span>',
      '    </button>',
      '    <button type="button" class="nps-blueprint-btn" id="nps-btn-blueprint-open">',
      '      <span>📐 View Full Systems Blueprint &amp; Specs</span>',
      '    </button>',
      '    <a class="nps-back-link" href="' + getPortfolioBaseUrl() + '?theme=' + currentTheme + '&skipIntro=1#projects">&larr; Return to Portfolio</a>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(splash);

    var bar = splash.querySelector('#nps-bar');
    var telemetry = splash.querySelector('#nps-telemetry');
    var pct = splash.querySelector('#nps-pct');
    var enterBtn = splash.querySelector('#nps-btn-enter');
    var blueprintBtn = splash.querySelector('#nps-btn-blueprint-open');
    var splashThemeBtn = splash.querySelector('.np-theme-toggle-splash');

    if (splashThemeBtn) {
      splashThemeBtn.addEventListener('click', function () {
        toggleNovuTheme();
        splashThemeBtn.innerHTML = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';
      });
    }

    var duration = 2400;
    var startTime = performance.now();
    var isDone = false;

    function dismissToApp() {
      if (isDone) return;
      isDone = true;
      splash.classList.add('is-dismissing');
      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
        if (typeof onComplete === 'function') onComplete();
      }, 350);
    }

    // Direct access to app
    enterBtn.addEventListener('click', dismissToApp);

    // Option to view full architecture blueprint
    if (blueprintBtn) {
      blueprintBtn.addEventListener('click', function () {
        dismissToApp();
        showBlueprintModal();
      });
    }

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
        // Bar reaches 100%, user can launch or it automatically transitions
        if (enterBtn) {
          enterBtn.style.transform = 'scale(1.02)';
          enterBtn.style.borderColor = '#d4af37';
        }
      }
    }

    requestAnimationFrame(tick);
  }

  // Expose global methods for testing & re-launch
  window.showNovuProjectSplash = showProjectSplashScreen;
  window.showNovuBlueprintModal = showBlueprintModal;
  window.applyNovuTheme = applyNovuTheme;
  window.toggleNovuTheme = toggleNovuTheme;

  // Execute Splash Screen on entrance (cleanly dismissible with zero blocking)
  showProjectSplashScreen();

})();
