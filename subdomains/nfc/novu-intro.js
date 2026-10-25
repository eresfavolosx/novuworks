/**
 * novu-intro.js
 * Universal Liquid Glass Platform Architecture & Objective Bar
 * Powered by novu.works · Fabián Vélez Vicente
 */
(function () {
  'use strict';

  // 1. Detect project ID
  var currentScript = document.currentScript;
  var projectId = currentScript ? currentScript.getAttribute('data-project') : null;
  var host = window.location.hostname.toLowerCase();
  var path = window.location.pathname.toLowerCase();

  if (!projectId) {
    if (host.indexOf('bizpay') !== -1 || path.indexOf('bizpay') !== -1) projectId = 'bizpay';
    else if (host.indexOf('picta') !== -1 || path.indexOf('picta') !== -1) projectId = 'picta';
    else if (host.indexOf('nfc') !== -1 || path.indexOf('nfc') !== -1) projectId = 'nfc';
    else if (host.indexOf('hackea') !== -1 || path.indexOf('hackea') !== -1) projectId = 'hackea';
    else if (host.indexOf('jobhelper') !== -1 || path.indexOf('jobhelper') !== -1) projectId = 'jobhelper';
    else projectId = 'default';
  }

  var PROJECTS = {
    bizpay: {
      badge: 'B2B Commercial Invoicing',
      title: 'BizPay: Commercial Payment Gateway',
      role: 'Lead Architect: Fabián Vélez Vicente',
      metrics: 'ATH Móvil API · Instant Checkout · Zero Slippage',
      summary: 'BizPay was engineered to eliminate commercial billing delays for Puerto Rico enterprises by coupling ATH Móvil Business APIs with automated fee routing, client ledger reconciliation, and responsive mobile-first material UI.',
      highlights: [
        { icon: '💳', title: 'ATH Móvil Business Flow', desc: 'Direct commercial checkout integration with real-time merchant fee calculations.' },
        { icon: '⚡', title: 'Instant Settlement', desc: 'Eliminates 3.5% international card fees with local 1.5% instant debit clearance.' },
        { icon: '📊', title: 'Ledger Reconciliation', desc: 'Automated invoice status tracking with zero transaction slippage.' }
      ]
    },
    picta: {
      badge: 'Assistive Computer Vision',
      title: 'Picta: Daltonization CVD Camera',
      role: 'Lead Architect: Fabián Vélez Vicente',
      metrics: 'Real-Time Daltonization · 6 CVD Modes · Speech Eyedropper',
      summary: 'Picta is an assistive computer vision camera application designed for people with Color Vision Deficiency (CVD). Running directly in the browser via WebRTC and SVG/WebGL transformation matrices, it converts invisible color contrasts into perceptible hues in real time.',
      highlights: [
        { icon: '👁️', title: 'Hardware Daltonization Boost', desc: 'Switch between Protanopia, Deuteranopia, and Tritanopia corrective matrices.' },
        { icon: '🎯', title: 'Tap-to-Inspect Classifier', desc: 'Tap anywhere on the live video stream to identify exact colors with speech audio.' },
        { icon: '🌐', title: '60 FPS WebRTC Pipeline', desc: 'Zero cloud latency: pure client-side mathematical color filtering.' }
      ]
    },
    nfc: {
      badge: 'Event Logistics & NFC Routing',
      title: 'Tocaito: Dynamic NFC Event Platform',
      role: 'Lead Architect: Fabián Vélez Vicente',
      metrics: 'Capacitor Bridge · Firebase Firestore · Python QA Suite',
      summary: 'Tocaito manages dynamic NFC event credentials and attendee passes with automated Python verification for continuous system reliability across conferences and community festivals.',
      highlights: [
        { icon: '📡', title: 'Dynamic NFC Rewriting', desc: 'Update attendee destinations over-the-air without replacing physical wristbands.' },
        { icon: '⚡', title: 'Sub-Second Verification', desc: 'Instant RFID/NFC pass reading with offline caching for zero queue latency.' },
        { icon: '🧪', title: 'Automated Python QA', desc: 'Headless end-to-end testing suite validating routing and state integrity.' }
      ]
    },
    hackea: {
      badge: 'Social Impact Mentorship',
      title: 'Hackea por una Causa: Mentorship Network',
      role: 'Lead Architect: Fabián Vélez Vicente',
      metrics: 'Boys & Girls Clubs Winner · 120+ Mentor Hours · 6 Centers',
      summary: 'An appointment scheduling and volunteer recruitment network connecting at-risk youth with professional STEM mentors across Boys & Girls Clubs and community centers in Puerto Rico.',
      highlights: [
        { icon: '🤝', title: '1-on-1 Mentor Matching', desc: 'Connects students directly with verified software and design mentors.' },
        { icon: '📅', title: 'Center Slot Reservation', desc: 'Live booking pipeline across San Juan, Bayamón, and Ponce hubs.' },
        { icon: '🏆', title: 'Hackathon Grand Prize', desc: 'Recognized for measurable social impact and community tech enablement.' }
      ]
    },
    default: {
      badge: 'Production Engineering Project',
      title: 'Novu Works Verified Platform',
      role: 'Architected by Fabián Vélez Vicente',
      metrics: 'Full-Stack Architecture · Zero Downtime',
      summary: 'This platform is engineered by Fabián Vélez Vicente as part of the Novu Works enterprise and social impact ecosystem.',
      highlights: [
        { icon: '🚀', title: 'Live Production Architecture', desc: 'Deployed with high-availability cloud infrastructure and strict QA.' }
      ]
    }
  };

  var project = PROJECTS[projectId] || PROJECTS.default;

  // 2. Inject CSS Styles
  var style = document.createElement('style');
  style.textContent = [
    '#novu-platform-topbar {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  right: 0;',
    '  height: 38px;',
    '  background: rgba(10, 12, 18, 0.92);',
    '  backdrop-filter: blur(24px) saturate(180%);',
    '  -webkit-backdrop-filter: blur(24px) saturate(180%);',
    '  border-bottom: 1px solid rgba(255, 255, 255, 0.12);',
    '  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);',
    '  z-index: 9999999;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 0 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '  font-size: 11.5px;',
    '  color: #e2e8f0;',
    '}',
    'body { margin-top: 38px !important; }',
    '.np-left { display: flex; align-items: center; gap: 10px; }',
    '.np-badge { display: inline-flex; align-items: center; gap: 5px; color: #d4af37; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }',
    '.np-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981; }',
    '.np-name { font-weight: 600; color: #ffffff; }',
    '.np-right { display: flex; align-items: center; gap: 8px; }',
    '.np-btn-blueprint { background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #f3e5ab; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }',
    '.np-btn-blueprint:hover { background: rgba(212, 175, 55, 0.28); color: #ffffff; }',
    '.np-btn-home { color: #94a3b8; text-decoration: none; font-size: 11px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; transition: color 0.2s ease; }',
    '.np-btn-home:hover { color: #ffffff; background: rgba(255, 255, 255, 0.06); }',
    '#novuintro-overlay {',
    '  position: fixed;',
    '  inset: 0;',
    '  background: rgba(5, 8, 16, 0.85);',
    '  backdrop-filter: blur(16px);',
    '  -webkit-backdrop-filter: blur(16px);',
    '  z-index: 10000000;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 16px;',
    '  box-sizing: border-box;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '}',
    '#novuintro-card {',
    '  width: 100%;',
    '  max-width: 560px;',
    '  max-height: 90vh;',
    '  overflow-y: auto;',
    '  background: linear-gradient(135deg, rgba(20, 24, 38, 0.98) 0%, rgba(10, 12, 20, 0.99) 100%);',
    '  border: 1px solid rgba(255, 255, 255, 0.14);',
    '  border-radius: 20px;',
    '  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 175, 55, 0.12);',
    '  color: #f1f5f9;',
    '  padding: 28px;',
    '  box-sizing: border-box;',
    '}',
    '.novuintro-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }',
    '.novuintro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.35); color: #d4af37; font-size: 10.5px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; }',
    '.novuintro-close-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; }',
    '.novuintro-title { font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.01em; }',
    '.novuintro-role { font-size: 12.5px; color: #d4af37; font-weight: 600; margin-bottom: 6px; }',
    '.novuintro-metrics-pill { display: inline-block; font-size: 11px; color: #94a3b8; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 4px 10px; border-radius: 6px; margin-bottom: 12px; }',
    '.novuintro-summary { font-size: 13px; line-height: 1.6; color: #cbd5e1; margin-bottom: 16px; background: rgba(255, 255, 255, 0.03); border-left: 3px solid #d4af37; padding: 12px; border-radius: 0 8px 8px 0; }',
    '.novuintro-highlights { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }',
    '.novuintro-item { display: flex; align-items: flex-start; gap: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); padding: 10px 12px; border-radius: 10px; }',
    '.novuintro-item-icon { font-size: 18px; flex-shrink: 0; }',
    '.novuintro-item-title { font-size: 12.5px; font-weight: 700; color: #f8fafc; margin-bottom: 2px; }',
    '.novuintro-item-desc { font-size: 11.5px; color: #94a3b8; line-height: 1.4; }',
    '.novuintro-actions { display: flex; gap: 10px; }',
    '.novuintro-btn-primary { flex: 1; background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.12) 100%); border: 1px solid #d4af37; color: #ffffff; font-size: 13px; font-weight: 700; padding: 11px 16px; border-radius: 10px; cursor: pointer; }',
    '.novuintro-btn-secondary { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); color: #cbd5e1; font-size: 12.5px; font-weight: 600; padding: 11px 14px; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; }',
    '@media (max-width: 540px) {',
    '  .np-name { display: none; }',
    '  .novuintro-actions { flex-direction: column; }',
    '}'
  ].join('
');
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
    '  <button class="np-btn-blueprint" id="np-btn-open-blueprint">Platform Objective Blueprint</button>',
    '  <a class="np-btn-home" href="https://novu.works#projects">&larr; Return to Portfolio</a>',
    '</div>'
  ].join('');
  document.body.prepend(topBar);

  // 4. Modal Injection
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
      '    <button class="novuintro-close-btn" id="novuintro-btn-close">&times;</button>',
      '  </div>',
      '  <h2 class="novuintro-title">' + project.title + '</h2>',
      '  <div class="novuintro-role">' + project.role + '</div>',
      '  <div class="novuintro-metrics-pill">' + project.metrics + '</div>',
      '  <div class="novuintro-summary">' + project.summary + '</div>',
      '  <div class="novuintro-highlights">' +
           project.highlights.map(function (h) {
             return '<div class="novuintro-item">' +
               '<span class="novuintro-item-icon">' + h.icon + '</span>' +
               '<div>' +
                 '<div class="novuintro-item-title">' + h.title + '</div>' +
                 '<div class="novuintro-item-desc">' + h.desc + '</div>' +
               '</div>' +
             '</div>';
           }).join('') +
      '  </div>',
      '  <div class="novuintro-actions">',
      '    <button class="novuintro-btn-primary" id="novuintro-btn-explore">Launch Interactive Features &rarr;</button>',
      '    <a class="novuintro-btn-secondary" href="https://novu.works#projects">&larr; Back to novu.works</a>',
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

  // Auto-display modal if arriving from novu.works for the first time
  var urlParams = new URLSearchParams(window.location.search);
  var fromParam = urlParams.get('from');
  var storageKey = 'seen_blueprint_' + projectId;
  if (fromParam === 'novuworks' && !localStorage.getItem(storageKey)) {
    try { localStorage.setItem(storageKey, '1'); } catch (_) {}
    showBlueprintModal();
  }
})();
