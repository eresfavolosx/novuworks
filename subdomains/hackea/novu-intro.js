/**
 * novu-intro.js
 * Executive Introduction Modal for novu.works Visitors
 * 
 * Behavior:
 * 1. ONLY displays if visitor arrived from novu.works (via ?from=novuworks or document.referrer).
 * 2. ONLY displays on the visitor's first visit to this specific project (persisted via localStorage).
 * 3. Never displays for direct navigation, organic searches, or returning visitors.
 */
(function () {
  'use strict';

  // 1. Detect project ID from script tag attribute or hostname
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

  // 2. Strict Referral Check
  var urlParams = new URLSearchParams(window.location.search);
  var fromParam = urlParams.get('from');
  var referrer = (document.referrer || '').toLowerCase();
  var isLocalDev = host === 'localhost' || host === '127.0.0.1';

  var isFromNovu = (
    fromParam === 'novuworks' ||
    referrer.indexOf('novu.works') !== -1 ||
    referrer.indexOf('novuworks.web.app') !== -1 ||
    referrer.indexOf('novuworks.firebaseapp.com') !== -1 ||
    (isLocalDev && (fromParam === 'novuworks' || referrer.indexOf('localhost') !== -1 || referrer.indexOf('127.0.0.1') !== -1))
  );

  // STRICT RULE: If not arriving from novu.works, do not display
  if (!isFromNovu) {
    return;
  }

  // 3. First-Time Visit Check
  var storageKey = 'seen_novuintro_' + projectId;
  try {
    if (localStorage.getItem(storageKey)) {
      // Already viewed on a prior visit
      return;
    }
  } catch (e) {
    // If localStorage is disabled/restricted, proceed safely
  }

  // 4. Project Content Directory
  var PROJECTS = {
    bizpay: {
      badge: 'Fintech & B2B Invoicing Platform',
      title: 'BizPay: Commercial Payment Gateway',
      role: 'Architected & Engineered by Fabián Vélez Vicente',
      metrics: 'ATH Móvil Business API · Instant Checkout · Real-Time Fee Routing',
      summary: 'Welcome from novu.works! BizPay was architected to eliminate commercial billing friction and payment delays for enterprise vendors in Puerto Rico. It directly integrates ATH Móvil Business APIs with automated fee routing, client ledger reconciliation, and zero checkout slippage.',
      highlights: [
        {
          icon: '💳',
          title: 'Live ATH Móvil Checkout Flow',
          desc: 'Click "Pagar con ATH Móvil" to launch the business transaction modal and test the checkout flow.'
        },
        {
          icon: '📊',
          title: 'Dynamic Fee & Ledger Math',
          desc: 'Real-time percentage and flat processing fee calculations integrated directly into commercial invoicing.'
        },
        {
          icon: '⚡',
          title: 'Responsive Material Architecture',
          desc: 'Lightweight Material Design Lite interface optimized for lightning-fast mobile transactions.'
        }
      ]
    },
    picta: {
      badge: 'Assistive Tech & Computer Vision',
      title: 'Picta: Assistive Color Vision Camera',
      role: 'Architected & Engineered by Fabián Vélez Vicente',
      metrics: 'Real-Time Daltonization · 6 CVD Modes · Live Color Eyedropper',
      summary: 'Welcome from novu.works! Picta is an assistive computer vision camera application designed for people with Color Vision Deficiency (CVD). Running directly in the browser via WebRTC and SVG/WebGL color transformation matrices, it converts invisible color contrasts into distinguishable hues in real time.',
      highlights: [
        {
          icon: '👁️',
          title: 'Hardware Daltonization Boost Filters',
          desc: 'Switch between Protanopia (red-blind), Deuteranopia (green-blind), and Tritanopia (blue-blind) corrective matrices.'
        },
        {
          icon: '🎯',
          title: 'Tap-to-Inspect Pixel Classifier',
          desc: 'Tap or click anywhere on the live video stream to identify the exact color name, hex code, RGB value, and hear speech audio.'
        },
        {
          icon: '🔬',
          title: 'CVD Simulation Mode',
          desc: 'Toggle simulation filters to experience firsthand how color-blind individuals perceive different environments.'
        }
      ]
    },
    nfc: {
      badge: 'Mobile & Cloud Infrastructure',
      title: 'NFC Digital Event & Verification Platform',
      role: 'Architected & Engineered by Fabián Vélez Vicente · Link Puerto Rico',
      metrics: 'Capacitor · Firebase · Automated Python QA Suite',
      summary: 'Welcome from novu.works! Tocaito is a contactless event management and NFC bracelet programming platform engineered for high-density developer conferences. It pairs instant physical credential verification with an automated Python regression test suite.',
      highlights: [
        {
          icon: '📱',
          title: 'Dynamic Link & Badge Programming',
          desc: 'Interactive mobile console for configuring NFC bracelet redirects and attendee credentials on the fly.'
        },
        {
          icon: '⚡',
          title: 'Offline-First Edge Sync',
          desc: 'Built with Firebase and local caching to ensure 100% check-in uptime even in network-constrained event venues.'
        },
        {
          icon: '🧪',
          title: 'Automated Python Regression QA',
          desc: 'Hardened with automated UI routing and state persistence regression tests to guarantee zero check-in downtime.'
        }
      ]
    },
    hackea: {
      badge: 'Civic Innovation & Community Mentorship',
      title: 'Hackea por una Causa: Mentorship Network',
      role: 'Conceived & Co-Founded by Fabián Vélez Vicente',
      metrics: 'Social Impact Hackathon Winner · 120+ Mentor Hours · 6 Partner Centers',
      summary: 'Welcome from novu.works! Conceived and built during the Hackea por una Causa civic hackathon to combat youth dropout rates in Puerto Rico. The platform provides a streamlined intake engine and calendar scheduling system connecting students with professional STEM mentors across Boys & Girls Clubs.',
      highlights: [
        {
          icon: '📅',
          title: 'Volunteer Scheduling Engine',
          desc: 'Automated intake workflow coordinating volunteer availability with youth center schedules.'
        },
        {
          icon: '🤝',
          title: 'Community Impact at Scale',
          desc: 'Over 120 hours of STEM mentorship delivered across 6 community partner centers in Puerto Rico.'
        },
        {
          icon: '🏆',
          title: 'Hackathon Award Winner',
          desc: 'Recognized for civic impact, rapid emergency prototyping, and community empowerment.'
        }
      ]
    },
    default: {
      badge: 'Production System Showcase',
      title: 'Production System Architecture',
      role: 'Architected by Fabián Vélez Vicente',
      metrics: 'Production Deployment · Open Source',
      summary: 'Welcome from novu.works! You are exploring a production system architected and engineered by Fabián Vélez Vicente.',
      highlights: [
        {
          icon: '🚀',
          title: 'Live Deployed System',
          desc: 'Explore the full interactive application directly in your browser.'
        },
        {
          icon: '💻',
          title: 'Open Source Repository',
          desc: 'Review the source code, architecture, and documentation on GitHub.'
        }
      ]
    }
  };

  var project = PROJECTS[projectId] || PROJECTS.default;

  // 5. Build and inject modal
  function showModal() {
    if (document.getElementById('novuintro-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'novuintro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'novuintro-title');

    overlay.innerHTML = [
      '<style>',
      '  #novuintro-overlay {',
      '    position: fixed;',
      '    top: 0;',
      '    left: 0;',
      '    width: 100vw;',
      '    height: 100vh;',
      '    background: rgba(5, 8, 16, 0.82);',
      '    backdrop-filter: blur(10px);',
      '    -webkit-backdrop-filter: blur(10px);',
      '    z-index: 2147483647;',
      '    display: flex;',
      '    align-items: center;',
      '    justify-content: center;',
      '    padding: 16px;',
      '    box-sizing: border-box;',
      '    opacity: 0;',
      '    animation: novuOverlayIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;',
      '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
      '  }',
      '  @keyframes novuOverlayIn {',
      '    to { opacity: 1; }',
      '  }',
      '  @keyframes novuCardSlide {',
      '    from { opacity: 0; transform: translateY(24px) scale(0.96); }',
      '    to { opacity: 1; transform: translateY(0) scale(1); }',
      '  }',
      '  #novuintro-card {',
      '    position: relative;',
      '    width: 100%;',
      '    max-width: 580px;',
      '    max-height: 90vh;',
      '    overflow-y: auto;',
      '    background: linear-gradient(145deg, rgba(20, 27, 45, 0.98) 0%, rgba(10, 14, 26, 0.99) 100%);',
      '    border: 1px solid rgba(255, 255, 255, 0.14);',
      '    border-radius: 20px;',
      '    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(56, 189, 248, 0.15);',
      '    color: #f1f5f9;',
      '    padding: 28px;',
      '    box-sizing: border-box;',
      '    animation: novuCardSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;',
      '  }',
      '  #novuintro-card::-webkit-scrollbar { width: 6px; }',
      '  #novuintro-card::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }',
      '  .novuintro-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }',
      '  .novuintro-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border-radius: 9999px; }',
      '  .novuintro-badge-dot { width: 7px; height: 7px; background: #38bdf8; border-radius: 50%; box-shadow: 0 0 8px #38bdf8; animation: novuPulse 2s infinite; }',
      '  @keyframes novuPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }',
      '  .novuintro-close-btn { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; line-height: 1; transition: all 0.15s ease; }',
      '  .novuintro-close-btn:hover { background: rgba(255, 255, 255, 0.15); color: #ffffff; transform: scale(1.05); }',
      '  .novuintro-header { margin-bottom: 14px; }',
      '  .novuintro-title { font-size: 21px; font-weight: 800; color: #ffffff; line-height: 1.25; margin: 0 0 6px 0; letter-spacing: -0.02em; }',
      '  .novuintro-role { font-size: 13px; color: #38bdf8; font-weight: 600; margin-bottom: 4px; }',
      '  .novuintro-metrics-pill { display: inline-block; font-size: 11px; font-weight: 600; color: #94a3b8; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 4px 10px; border-radius: 6px; margin-top: 6px; }',
      '  .novuintro-summary { font-size: 13.5px; line-height: 1.6; color: #cbd5e1; margin: 14px 0; background: rgba(255, 255, 255, 0.025); border-left: 3px solid #38bdf8; padding: 12px 14px; border-radius: 0 8px 8px 0; }',
      '  .novuintro-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700; margin: 16px 0 10px 0; }',
      '  .novuintro-highlights { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }',
      '  .novuintro-item { display: flex; align-items: flex-start; gap: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); padding: 10px 12px; border-radius: 10px; }',
      '  .novuintro-item-icon { font-size: 18px; flex-shrink: 0; line-height: 1.2; }',
      '  .novuintro-item-content { flex: 1; }',
      '  .novuintro-item-title { font-size: 13px; font-weight: 700; color: #f8fafc; margin-bottom: 2px; }',
      '  .novuintro-item-desc { font-size: 12px; color: #94a3b8; line-height: 1.45; }',
      '  .novuintro-actions { display: flex; align-items: center; gap: 10px; margin-top: 18px; flex-wrap: wrap; }',
      '  .novuintro-btn-primary { flex: 1; min-width: 170px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: 1px solid rgba(56, 189, 248, 0.4); box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35); font-size: 14px; font-weight: 700; padding: 12px 20px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s ease; }',
      '  .novuintro-btn-primary:hover { background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45); }',
      '  .novuintro-btn-secondary { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); color: #cbd5e1; font-size: 13px; font-weight: 600; padding: 12px 16px; border-radius: 10px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.15s ease; }',
      '  .novuintro-btn-secondary:hover { background: rgba(255, 255, 255, 0.1); color: #ffffff; border-color: rgba(255, 255, 255, 0.2); }',
      '  .novuintro-footer-note { margin-top: 14px; font-size: 11px; color: #64748b; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px; }',
      '  @media (max-width: 480px) {',
      '    #novuintro-card { padding: 20px 16px; }',
      '    .novuintro-title { font-size: 18px; }',
      '    .novuintro-actions { flex-direction: column; }',
      '    .novuintro-btn-primary, .novuintro-btn-secondary { width: 100%; }',
      '  }',
      '</style>',
      '<div id="novuintro-card">',
      '  <div class="novuintro-topbar">',
      '    <div class="novuintro-badge">',
      '      <span class="novuintro-badge-dot"></span>',
      '      <span>novu.works · ' + project.badge + '</span>',
      '    </div>',
      '    <button class="novuintro-close-btn" id="novuintro-btn-close" aria-label="Close introduction">&times;</button>',
      '  </div>',
      '  <div class="novuintro-header">',
      '    <h2 class="novuintro-title" id="novuintro-title">' + project.title + '</h2>',
      '    <div class="novuintro-role">' + project.role + '</div>',
      '    <span class="novuintro-metrics-pill">' + project.metrics + '</span>',
      '  </div>',
      '  <div class="novuintro-summary">' + project.summary + '</div>',
      '  <div class="novuintro-section-label">Key Capabilities to Test</div>',
      '  <div class="novuintro-highlights">' +
            project.highlights.map(function (h) {
              return '<div class="novuintro-item">' +
                '<span class="novuintro-item-icon">' + h.icon + '</span>' +
                '<div class="novuintro-item-content">' +
                  '<div class="novuintro-item-title">' + h.title + '</div>' +
                  '<div class="novuintro-item-desc">' + h.desc + '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
      '  </div>',
      '  <div class="novuintro-actions">',
      '    <button class="novuintro-btn-primary" id="novuintro-btn-explore">',
      '      <span>Explore Live System</span>',
      '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
      '    </button>',
      '    <a class="novuintro-btn-secondary" id="novuintro-btn-back" href="https://novu.works#projects">',
      '      <span>&larr; Return to novu.works</span>',
      '    </a>',
      '  </div>',
      '  <div class="novuintro-footer-note">',
      '    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
      '    <span>Showing this introduction because you arrived from novu.works. You will not see this again.</span>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(overlay);

    function dismiss() {
      try {
        localStorage.setItem(storageKey, 'seen');
      } catch (e) {}

      overlay.style.transition = 'opacity 0.2s ease';
      overlay.style.opacity = '0';
      setTimeout(function () {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 200);
    }

    var btnExplore = document.getElementById('novuintro-btn-explore');
    var btnClose = document.getElementById('novuintro-btn-close');
    var btnBack = document.getElementById('novuintro-btn-back');

    if (btnExplore) btnExplore.addEventListener('click', dismiss);
    if (btnClose) btnClose.addEventListener('click', dismiss);
    if (btnBack) {
      btnBack.addEventListener('click', function () {
        try {
          localStorage.setItem(storageKey, 'seen');
        } catch (e) {}
      });
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismiss();
    });

    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        dismiss();
        document.removeEventListener('keydown', onKey);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showModal);
  } else {
    setTimeout(showModal, 150);
  }
})();
