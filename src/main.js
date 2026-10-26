// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Executive Portfolio & Interactive Atelier
//  Growth & Revenue Operations Analytics Lead · Computer Engineering
//  Verified Milestones: Money Group, Red Ventures (edX), Viva Advertising, Link PR
// ─────────────────────────────────────────────────────────────

import { SpatialCanvas3D } from './canvas3d.js';
import { ArchitecturePlanner } from './planner.js';
import { CommandPalette } from './command-palette.js';
import { AIGrowthLab } from './ai-lab.js';
import { RevOpsTerminal } from './revops-terminal.js';
import { IntelFeed } from './intel-feed.js';
import { CyberArcadeGame } from './game-easter-egg.js';
import { VisitorTools } from './visitor-tools.js';
import { GitHubRadar } from './github-radar.js';
import { SpatialImmersionEngine } from './spatial-immersion.js';
import { BilingualBinaryHero } from './bilingual-binary-hero.js';
import { ExecutiveChatManager } from './executive-chat.js';
import { TeslaCockpitDashboard } from './tesla-cockpit.js';
import { initFirebase, logCandidateEvent } from './firebase.js';
import { LOGOS } from './company-logos.js';
import { audio } from './audio.js';
import { DISCIPLINES, PROFILE } from './data.js';
import { getLanguage, resolveInitialLanguage, switchLanguage, updateDomTranslations, updateProfileDataForLanguage } from './i18n.js';
import { renderSubdomainLandingHtml, bindSubdomainLandingEvents, PROJECT_TRANSITIONS } from './subdomain-landings.js';
import { renderExecutiveSignatureBlock, initExecutiveSignature } from './executive-signature.js';
import { MinimalParticleMatrix } from './minimal-particles.js';

class FabianPortfolioApp {
  constructor() {
    this.currentView = 'core';
    this.isTeslaMode = localStorage.getItem('fabian_tesla_mode') === 'true';
    this.canvas3d = null;
    this.minimalParticles = null;
    this.activeRoleLens = 'master';
    this.currentLang = resolveInitialLanguage();

    this.dom = {
      webglContainer: document.getElementById('webgl-container'),
      plannerMount: document.getElementById('planner-mount-point'),
      revopsTerminalMount: document.getElementById('revops-terminal-mount'),
      intelFeedMount: document.getElementById('intel-feed-mount'),
      caseStudiesMount: document.getElementById('case-studies-mount'),
      projectsViewMount: document.getElementById('projects-view-mount'),
      featuredSubdomainsMount: document.getElementById('featured-subdomains-mount'),
      aiLabMount: document.getElementById('ai-lab-mount'),
      competencyMatrixMount: document.getElementById('competency-matrix-mount'),
      executiveSignatureMount: document.getElementById('executive-signature-mount'),
      companyLogoStripMount: document.getElementById('company-logo-strip-mount'),
      recModalLogosMount: document.getElementById('rec-modal-logos-mount'),
      dossierTagMount: document.getElementById('dossier-tag-mount'),
      dossierSummaryMount: document.getElementById('dossier-summary-mount'),
      dossierExperienceMount: document.getElementById('dossier-experience-mount'),
      standaloneProjectsMount: document.getElementById('standalone-projects-mount'),
      dossierEducationMount: document.getElementById('dossier-education-mount'),
      dossierAwardsMount: document.getElementById('dossier-awards-mount'),
      dossierLogosMount: document.getElementById('dossier-logos-mount'),
      resRoleMount: document.getElementById('res-role-mount'),
      resSummaryMount: document.getElementById('res-summary-mount'),
      resSkillsMount: document.getElementById('res-skills-mount'),
      resExpMount: document.getElementById('res-exp-mount'),
      resProjectsMount: document.getElementById('res-projects-mount'),
      resEducationMount: document.getElementById('res-education-mount'),
      resAwardsMount: document.getElementById('res-awards-mount'),
      printableResume: document.getElementById('printable-resume'),
      scorecardRolesMount: document.getElementById('scorecard-roles-mount'),
      scorecardProofsMount: document.getElementById('scorecard-proofs-mount'),
      dossierStatsMount: document.getElementById('dossier-stats-mount'),
      disciplineModal: document.getElementById('discipline-modal'),
      dialogContentBody: document.getElementById('dialog-content-body'),
      platformModal: document.getElementById('subdomain-platform-modal'),
      platformModalBody: document.getElementById('subdomain-platform-modal-body'),
      projectTransitionSplash: document.getElementById('project-transition-splash'),
      ptsAmbientGlow: document.getElementById('pts-ambient-glow'),
      ptsLogoSlot: document.getElementById('pts-logo-slot'),
      ptsLogoAura: document.getElementById('pts-logo-aura'),
      ptsProjectName: document.getElementById('pts-project-name'),
      ptsCategoryPill: document.getElementById('pts-category-pill'),
      ptsProgressBar: document.getElementById('pts-progress-bar'),
      ptsStatusText: document.getElementById('pts-status-text'),
      ptsStatusPct: document.getElementById('pts-status-pct'),
      topNavDrawer: document.getElementById('top-navigation-drawer'),
      mobileMenuToggleBtn: document.getElementById('btn-mobile-menu-toggle'),
      resumeModal: document.getElementById('resume-export-modal'),
      recruiterModal: document.getElementById('recruiter-fasttrack-modal'),
      arcadeModal: document.getElementById('cyber-arcade-modal'),
      toastBanner: document.getElementById('toast-banner'),
      visualizerHud: document.getElementById('visualizer-hud'),
      btnToggleVisualizer: document.getElementById('btn-toggle-visualizer'),
      btnHeroViewCanvas: document.getElementById('btn-hero-view-canvas'),
      btnDockViewCanvas: document.getElementById('btn-dock-view-canvas'),
      btnExitVisualizer: document.getElementById('btn-exit-visualizer'),
      btnVizAudio: document.getElementById('btn-viz-audio'),
      btnVizCoqui: document.getElementById('btn-viz-coqui'),
      btnTeslaMode: document.getElementById('btn-tesla-mode'),
      btnThemeToggle: document.getElementById('btn-theme-toggle'),
      btnAudioToggle: document.getElementById('btn-audio-toggle'),
      btnPrRoots: document.getElementById('btn-pr-roots'),
      btnCmdPalette: document.getElementById('btn-cmd-palette'),
      btnPrintResume: document.getElementById('btn-print-resume'),
      visitorSurveyModal: document.getElementById('visitor-survey-modal'),
      btnTailorExperience: document.getElementById('btn-tailor-experience'),
      btnCloseSurveyModal: document.getElementById('btn-close-survey-modal'),
      btnSurveyExploreAll: document.getElementById('btn-survey-explore-all'),
      btnVisitorTools: document.getElementById('btn-visitor-tools'),
      btnSpatialGyro: document.getElementById('btn-spatial-gyro'),
      btnLangToggle: document.getElementById('btn-lang-toggle'),
      githubRadarMount: document.getElementById('github-radar-mount'),
      prWeatherBadge: document.getElementById('pr-weather-badge'),
    };

    this.isVisualizerMode = false;

    this.init();
  }

  init() {
    // 0. Ensure root view dataset is set on body for CSS contextual styling
    document.body.dataset.view = 'core';

    // 0b. Initialize Internationalization (Default: English)
    try {
      updateProfileDataForLanguage(this.currentLang);
      updateDomTranslations(this.currentLang);
    } catch (e) {
      console.warn('i18n init error:', e);
    }

    // 1. Dynamic Cursor Spotlight (Follows mouse/pointer coordinates smoothly)
    window.addEventListener('pointermove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });

    // 2. Render all dynamic content FIRST to guarantee DOM readiness
    try {
      this.renderExecutiveSignature();
      this.renderCaseStudies();
      this.renderCompetencyMatrix();
      this.renderCompanyLogos();
      this.renderDossier();
      this.renderProjects();
      this.renderPrintableResume();
      this.updateRecruiterScorecard();
    } catch (e) {
      console.error('Render error:', e);
    }

    // 3. Bind Event Handlers IMMEDIATELY
    try {
      this.bindEvents();
    } catch (e) {
      console.error('Events binding error:', e);
    }

    // 4. Initialize Interactive Engineering Components
    try {
      if (this.dom.plannerMount) {
        this.planner = new ArchitecturePlanner(this.dom.plannerMount, (pillarId) => {
          if (this.canvas3d) this.canvas3d.focusPillar(pillarId);
        });
      }
    } catch (e) {
      console.warn('Planner init caught:', e);
    }

    try {
      if (this.dom.revopsTerminalMount) {
        this.revopsTerminal = new RevOpsTerminal(this.dom.revopsTerminalMount);
      }
    } catch (e) {
      console.warn('RevOps terminal init caught:', e);
    }

    try {
      if (this.dom.aiLabMount) {
        this.aiLab = new AIGrowthLab(this.dom.aiLabMount);
      }
    } catch (e) {
      console.warn('AI Lab init caught:', e);
    }

    try {
      if (this.dom.intelFeedMount) {
        this.intelFeed = new IntelFeed(this.dom.intelFeedMount, (msg) => this.showToast(msg));
      }
    } catch (e) {
      console.warn('Intel feed init caught:', e);
    }

    // 5. Initialize Command Palette
    try {
      this.cmdPalette = new CommandPalette({
        onOpenHire: () => this.openRecruiterModal(),
        onOpenChat: () => this.executiveChat?.open('cmd-palette'),
        onOpenPlanner: () => this.switchView('planner'),
        onOpenProjects: () => this.switchView('projects'),
        onOpenFeed: () => this.switchView('intel-feed'),
        onOpenArcade: () => this.openArcadeGame(),
        onOpenSurvey: () => this.openSurveyModal(),
        onOpenTools: (tab) => this.visitorTools?.open(tab),
        onSelectLens: (lensId) => this.selectVisitorPersona(lensId),
        onToggleTheme: () => this.toggleTheme(),
        onSetTheme: (theme) => this.setTheme(theme, true),
        onSwitchLanguage: (lang) => this.setLanguage(lang),
        onToggleTesla: () => this.toggleTeslaMode(),
        onCycleMorph: () => this.cycleMorph(),
        onToggleVisualizer: () => this.toggleVisualizerMode(),
        onSelectDiscipline: (d) => this.openDisciplineModal(d),
        showToast: (msg) => this.showToast(msg),
      });
    } catch (e) {
      console.warn('Command Palette init caught:', e);
    }

    // 6. Initialize 3D Engine defensively (never blocks UI if WebGL is unavailable)
    try {
      if (this.dom.webglContainer) {
        this.canvas3d = new SpatialCanvas3D(this.dom.webglContainer, (discipline) => {
          this.openDisciplineModal(discipline);
        });
      }
    } catch (e) {
      console.warn('3D Canvas safely in fallback mode:', e);
    }

    // 6b. Initialize Spatial 6DoF Immersion & Hardware Sensor Suite (ON by default)
    try {
      this.spatial = new SpatialImmersionEngine(this.canvas3d);
      this.spatial.init();

      // Spatial 6DoF Gyroscope is ON by default: Auto-request permission on first user interaction (iOS Safari)
      const autoRequestGyro = async () => {
        try {
          if (this.spatial) await this.spatial.requestGyroPermission();
        } catch (_) {}
      };
      window.addEventListener('pointerdown', autoRequestGyro, { once: true, passive: true });
      window.addEventListener('touchstart', autoRequestGyro, { once: true, passive: true });
    } catch (e) {
      console.warn('Spatial Immersion init notice:', e);
    }

    // 6c. Sync 3D Sculpture Morph State (Mode 0: Novu Works Particle Monogram default)
    this.syncMorphPills(0);

    // 6c. Initialize Firebase Analytics & Performance Monitoring
    try {
      initFirebase();
    } catch (e) {
      console.warn('Firebase init notice:', e);
    }

    // 7. Apply saved preferences
    this.initTheme();
    if (this.isTeslaMode) {
      document.body.classList.add('tesla-mode');
      this.updateTeslaButton(true);
    }
    this.syncAudioButton();

    // 7b. Visitor Persona & Onboarding Concierge check
    const savedPersona = localStorage.getItem('fv_visitor_persona');
    if (savedPersona && PROFILE.roleVariants[savedPersona]) {
      this.setRoleLens(savedPersona);
    } else {
      this.updateHeaderPersonaPill('master');
    }

    // Do NOT auto-pop onboarding survey on load; keep page fluid and uninterrupted.

    // 7c. Initialize Visitor Utilities Suite with Spatial & Firebase
    try {
      this.visitorTools = new VisitorTools({
        spatial: this.spatial,
        showToast: (msg) => this.showToast(msg)
      });
    } catch (e) {
      console.warn('Visitor Tools init notice:', e);
    }

    // 7d. Initialize Live GitHub Codebase Radar
    try {
      if (this.dom.githubRadarMount) {
        this.githubRadar = new GitHubRadar(this.dom.githubRadarMount);
      }
    } catch (e) {
      console.warn('GitHub radar init notice:', e);
    }

    // 7e. Initialize Live Puerto Rico Weather (Open-Meteo REST API)
    this.initPuertoRicoWeather();

    // 7f. Initialize Dynamic Bilingual & Binary Headline Greeting Stream
    try {
      this.bilingualHero = new BilingualBinaryHero(this);
      this.bilingualHero.init();
    } catch (e) {
      console.warn('Bilingual Binary Hero init notice:', e);
    }

    // 7g. Initialize Executive WhatsApp & Direct Communications Suite
    try {
      this.executiveChat = new ExecutiveChatManager(this);
      this.executiveChat.init();
    } catch (e) {
      console.warn('Executive Chat init notice:', e);
    }

    // 7h. Initialize Fullscreen Tesla In-Car Cockpit HUD Dashboard
    try {
      this.teslaCockpit = new TeslaCockpitDashboard(this);
      this.teslaCockpit.init();
    } catch (e) {
      console.warn('Tesla Cockpit HUD init notice:', e);
    }

    // 8. Run initial metric count-up animation
    this.animateCounters();

    // 9. Initialize Interactive Cursor Spotlight and Scroll-Driven Reveals
    this.initCardSpotlight();
    this.initScrollReveals();

    // 10. Initialize Creative Computing & Minimalist Particle Matrix
    this.initMinimalParticles();

    // 11. Initialize Cinematic Particle Sculpture Loading Screen
    this.initLoadingScreen();
  }

  // ─────────────────────────────────────────────────────────────
  // Creative Computing: Minimalist NovuWorks Particle Matrix
  // ─────────────────────────────────────────────────────────────
  initMinimalParticles() {
    const canvasEl = document.getElementById('minimal-particle-canvas');
    if (!canvasEl) return;

    try {
      this.minimalParticles = new MinimalParticleMatrix(canvasEl, {
        theme: this.getCurrentResolvedTheme(),
      });

      const warpBtn = document.getElementById('ep-btn-warp');
      if (warpBtn) {
        warpBtn.addEventListener('click', () => {
          if (this.minimalParticles) {
            this.minimalParticles.warp();
            audio.click(820, 0.05);
            this.showToast('⚡ Kinetic Energy Shockwave Emitted');
          }
        });
      }

      const paletteBtn = document.getElementById('ep-btn-palette');
      if (paletteBtn) {
        paletteBtn.addEventListener('click', () => {
          if (this.minimalParticles) {
            const next = this.minimalParticles.cyclePalette();
            audio.click(950, 0.04);
            const name = next === 'gold' ? 'Champagne Gold' : (next === 'emerald' ? 'Cyber Emerald' : 'Novu Signature');
            this.showToast(`🎨 Particle Palette: ${name}`);
          }
        });
      }

      const launch3dBtn = document.getElementById('ep-btn-launch-3d');
      if (launch3dBtn) {
        launch3dBtn.addEventListener('click', () => {
          this.enterVisualizerMode();
          if (this.canvas3d) {
            this.canvas3d.switchMode(0); // 0 = Novu Monogram
          }
        });
      }

      const dossierParticleBtn = document.getElementById('btn-dossier-particle-showcase');
      if (dossierParticleBtn) {
        dossierParticleBtn.addEventListener('click', () => {
          this.switchView('projects');
          const card = document.getElementById('particle-matrix-showcase');
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (this.minimalParticles) this.minimalParticles.warp();
          }
        });
      }
    } catch (e) {
      console.warn('Minimal particle canvas init notice:', e);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Cinematic Epic Intro & Executive Signature Sign-Off Screen
  // ─────────────────────────────────────────────────────────────
  initLoadingScreen() {
    const loadingScreen = document.getElementById('particle-loading-screen');
    if (!loadingScreen) return;

    if (this.loadingSafetyTimer) clearTimeout(this.loadingSafetyTimer);
    if (this.loadingAutoDismissTimer) clearTimeout(this.loadingAutoDismissTimer);

    const progressBar = document.getElementById('loading-bar-progress');
    const statusText = document.getElementById('loading-status-text');
    const percentage = document.getElementById('loading-percentage');
    const skipBtn = document.getElementById('loading-skip-btn');

    let isDismissed = false;
    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;
      if (this.loadingSafetyTimer) clearTimeout(this.loadingSafetyTimer);
      if (this.loadingAutoDismissTimer) clearTimeout(this.loadingAutoDismissTimer);

      if (this.canvas3d && typeof this.canvas3d.finishInitialLoading === 'function') {
        this.canvas3d.finishInitialLoading();
      }
      loadingScreen.classList.add('is-loaded');
      document.body.classList.add('loaded');
      try {
        sessionStorage.setItem('seen_portfolio_intro', '1');
      } catch (_) {}
      try {
        audio.playClick();
      } catch (_) {}
    };

    this.dismissLoadingScreen = dismiss;

    // Check if skipIntro was explicitly requested in URL query
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get('skipIntro') === '1') {
        p.delete('skipIntro');
        const cleanQuery = p.toString() ? '?' + p.toString() : '';
        const cleanUrl = window.location.pathname + cleanQuery + window.location.hash;
        try {
          window.history.replaceState({}, '', cleanUrl);
        } catch (_) {}
        dismiss();
        return;
      }
    } catch (_) {}

    if (skipBtn) {
      skipBtn.onclick = (e) => {
        e.stopPropagation();
        dismiss();
      };
    }

    const keyHandler = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        dismiss();
        window.removeEventListener('keydown', keyHandler);
      }
    };
    window.addEventListener('keydown', keyHandler);
    loadingScreen.onclick = (e) => {
      // Don't dismiss if clicking signature replay button
      if (e.target.closest('#btn-replay-signature')) {
        return;
      }
      // On mobile and desktop, dismiss on general click ONLY once ready (100%),
      // preventing accidental touch dismissal while the signature is animating!
      if (loadingScreen.classList.contains('is-ready')) {
        dismiss();
      }
    };

    // Cinematic progress counter (~2600ms) showcasing identity & vector signature sign-off
    const startTime = performance.now();
    const duration = 2600;

    // Safety timeout ensures dismissal even if RAF is throttled or suspended
    this.loadingSafetyTimer = setTimeout(() => {
      dismiss();
    }, 7000);

    const steps = [
      { at: 0.05, text: 'QUANTUM PARTICLES // NOVUWORKS MATRIX' },
      { at: 0.20, text: 'AUTHENTICATING IDENTITY // FABIÁN VÉLEZ VICENTE' },
      { at: 0.45, text: 'EXECUTING HANDWRITTEN CALLIGRAPHIC SIGN-OFF...' },
      { at: 0.75, text: 'ACCREDITING VERIFIED SIGN-OFF // 40M+ SESSIONS' },
      { at: 0.95, text: '✦ SYSTEM READY // ENTER NOVU.WORKS' }
    ];

    const frame = (now) => {
      if (isDismissed) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const pct = Math.round(progress * 100);

      if (progressBar) progressBar.style.width = `${pct}%`;
      if (percentage) percentage.textContent = `${pct}%`;

      const currentStep = steps.slice().reverse().find(s => progress >= s.at);
      if (currentStep && statusText) {
        statusText.textContent = currentStep.text;
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        if (this.loadingSafetyTimer) clearTimeout(this.loadingSafetyTimer);
        if (statusText) statusText.textContent = '✦ SYSTEM READY // IDENTITY VERIFIED';
        if (percentage) percentage.textContent = '100%';
        loadingScreen.classList.add('is-ready');

        // Snappy dwell time (1200ms) before smooth auto-dismissal into portfolio
        this.loadingAutoDismissTimer = setTimeout(() => {
          dismiss();
        }, 1200);
      }
    };

    requestAnimationFrame(frame);
  }

  replayEpicIntro() {
    const loadingScreen = document.getElementById('particle-loading-screen');
    if (!loadingScreen) return;

    if (this.loadingSafetyTimer) clearTimeout(this.loadingSafetyTimer);
    if (this.loadingAutoDismissTimer) clearTimeout(this.loadingAutoDismissTimer);

    document.body.classList.remove('loaded');
    loadingScreen.classList.remove('is-loaded');
    loadingScreen.classList.remove('is-ready');

    const progressBar = document.getElementById('loading-bar-progress');
    const percentage = document.getElementById('loading-percentage');
    const statusText = document.getElementById('loading-status-text');
    if (progressBar) progressBar.style.width = '0%';
    if (percentage) percentage.textContent = '0%';
    if (statusText) statusText.textContent = 'INITIALIZING 3D PARTICLE MATRIX...';

    if (this.canvas3d) {
      this.canvas3d.isInitialLoading = true;
      this.canvas3d.isPaused = false;
      this.canvas3d.isVisibleInViewport = true;
      this.canvas3d.resume();
    }

    initExecutiveSignature();
    this.initLoadingScreen();
  }

  // ─────────────────────────────────────────────────────────────
  // Company Logo Strip Rendering
  // ─────────────────────────────────────────────────────────────
  renderCompanyLogos() {
    const stripHtml = `
      <div class="logo-strip-inner">
        <span class="logo-strip-label">COMPANIES & INSTITUTIONS STUDIED OR WORKED AT:</span>
        <div class="logo-strip-row">
          <div class="logo-badge-item" title="Money Group (Media Buyer, Full-Time · $1B+ Scope)">
            ${LOGOS.moneyGroup}
          </div>
          <div class="logo-badge-item" title="Red Ventures (Growth / SEO Analyst, Full-Time · edX)">
            ${LOGOS.redVentures}
          </div>
          <div class="logo-badge-item" title="edX Platform (Red Ventures, Full-Time · 40M+ Sessions)">
            ${LOGOS.edx}
          </div>
          <a href="https://viva-advertising.com/" target="_blank" rel="noopener noreferrer" class="logo-badge-item is-link" title="Viva Advertising (Founder · $10M+ Pipeline) — Visit Official Site (viva-advertising.com)">
            ${LOGOS.vivaAdvertising}
          </a>
          <a href="https://linkpuertorico.org/" target="_blank" rel="noopener noreferrer" class="logo-badge-item is-link" title="Link Puerto Rico (Co-Founder · 100+ Relational Databases) — Visit Official Site (linkpuertorico.org)">
            ${LOGOS.linkPR}
          </a>
          <div class="logo-badge-item" title="NovuWorks (Founder & Technical Consultant · Enterprise AI & Cloud Systems)">
            ${LOGOS.novuWorks}
          </div>
          <div class="logo-badge-item" title="Stanford University (Innovation Fellow · Design Thinking & Strategy)">
            ${LOGOS.stanford}
          </div>
          <div class="logo-badge-item" title="Universidad Politécnica de Puerto Rico (B.S. Computer Engineering, 4.0 GPA)">
            ${LOGOS.politecnica}
          </div>
        </div>
      </div>
    `;

    if (this.dom.companyLogoStripMount) {
      this.dom.companyLogoStripMount.innerHTML = stripHtml;
    }

    if (this.dom.recModalLogosMount) {
      this.dom.recModalLogosMount.innerHTML = `
        <div class="modal-logos-row">
          <div class="modal-logo-cell" title="Money Group (Full-Time)">${LOGOS.moneyGroup}</div>
          <div class="modal-logo-cell" title="Red Ventures (Full-Time)">${LOGOS.redVentures}</div>
          <div class="modal-logo-cell" title="edX Platform (Full-Time)">${LOGOS.edx}</div>
          <a href="https://viva-advertising.com/" target="_blank" rel="noopener noreferrer" class="modal-logo-cell is-link" title="Viva Advertising (Founder)">${LOGOS.vivaAdvertising}</a>
          <a href="https://linkpuertorico.org/" target="_blank" rel="noopener noreferrer" class="modal-logo-cell is-link" title="Link Puerto Rico (Co-Founder)">${LOGOS.linkPR}</a>
          <div class="modal-logo-cell" title="NovuWorks (Founder)">${LOGOS.novuWorks}</div>
          <div class="modal-logo-cell" title="Stanford University (Fellow)">${LOGOS.stanford}</div>
          <div class="modal-logo-cell" title="Universidad Politécnica de PR (B.S. 4.0 GPA)">${LOGOS.politecnica}</div>
        </div>
      `;
    }

    this.renderDossier();
    this.renderPrintableResume();
    this.updateRecruiterScorecard();
  }

  // ─────────────────────────────────────────────────────────────
  // Dynamic Role Lens / Persona Switcher
  // ─────────────────────────────────────────────────────────────
  setRoleLens(lensId) {
    if (!PROFILE.roleVariants[lensId]) return;
    this.activeRoleLens = lensId;

    // Update active button state across all lens button groups
    document.querySelectorAll('#dossier-role-lens-pills .role-lens-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lens === lensId);
    });
    document.querySelectorAll('#resume-modal-lens-pills .modal-lens-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lens === lensId);
    });
    document.querySelectorAll('#recruiter-modal-lens-pills .modal-lens-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lens === lensId);
    });

    this.renderDossier(lensId);
    this.renderPrintableResume(lensId);
    this.updateRecruiterScorecard(lensId);
    this.updateHeaderPersonaPill(lensId);

    // Dynamically update downloadable PDF resume URLs tailored to active role lens
    const resumePath = PROFILE.links?.resumes?.[lensId] || PROFILE.links?.resumes?.master || '/assets/resumes/Fabian_Velez_Resume_Product_Marketing_AI.pdf';
    const resumeFilename = `Fabian_Velez_Resume_${lensId}_2026.pdf`;

    const dlRec = document.getElementById('btn-download-recruiter-pdf');
    if (dlRec) {
      dlRec.setAttribute('href', resumePath);
      dlRec.setAttribute('download', resumeFilename);
    }
    const dlRes = document.getElementById('btn-download-resume-pdf');
    if (dlRes) {
      dlRes.setAttribute('href', resumePath);
      dlRes.setAttribute('download', resumeFilename);
    }
    const dlDos = document.getElementById('dossier-download-resume-btn');
    if (dlDos) {
      dlDos.setAttribute('href', resumePath);
      dlDos.setAttribute('download', resumeFilename);
    }
    const dlTools = document.getElementById('btn-tools-download-pdf');
    if (dlTools) {
      dlTools.setAttribute('href', resumePath);
      dlTools.setAttribute('download', resumeFilename);
    }

    if (this.dom.dossierStatsMount) {
      this.dom.dossierStatsMount.classList.remove('lens-animating');
      void this.dom.dossierStatsMount.offsetWidth;
      this.dom.dossierStatsMount.classList.add('lens-animating');
    }
    if (this.dom.scorecardProofsMount) {
      this.dom.scorecardProofsMount.classList.remove('lens-animating');
      void this.dom.scorecardProofsMount.offsetWidth;
      this.dom.scorecardProofsMount.classList.add('lens-animating');
    }

    audio.click(850);
    try {
      logCandidateEvent('role_lens_selected', { lens: lensId });
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────
  // Render Dossier View (Role Narrative, Experience, Projects, Certs)
  // ─────────────────────────────────────────────────────────────
  renderDossier(lensId = this.activeRoleLens) {
    const variant = PROFILE.roleVariants[lensId] || PROFILE.roleVariants.master;

    // 1. Tagline & Summary
    if (this.dom.dossierTagMount) {
      this.dom.dossierTagMount.textContent = variant.headline;
    }
    if (this.dom.dossierSummaryMount) {
      this.dom.dossierSummaryMount.textContent = variant.summary;
    }

    // 2. Headline Stats Grid (from active role lens proofPoints)
    if (this.dom.dossierStatsMount && variant.proofPoints) {
      this.dom.dossierStatsMount.innerHTML = variant.proofPoints.map((p) => `
        <div class="stat-card">
          <span class="stat-number gold-num">${p.metric}</span>
          <span class="stat-title">${p.title}</span>
          <span class="stat-desc">${p.desc}</span>
        </div>
      `).join('');
    }

    // 3. Experience Timeline
    if (this.dom.dossierExperienceMount) {
      const expLogos = {
        'Money Group': LOGOS.moneyGroup,
        'Money Group (Full-Time)': LOGOS.moneyGroup,
        'Red Ventures': LOGOS.redVentures,
        'Red Ventures (Full-Time)': LOGOS.redVentures,
        'Red Ventures / edX': `${LOGOS.redVentures} ${LOGOS.edx}`,
        'Viva Advertising': LOGOS.vivaAdvertising,
        'Viva Advertising (My Company / Founder)': LOGOS.vivaAdvertising,
        'Link Puerto Rico': LOGOS.linkPR,
        'Link Puerto Rico (My Company / Co-Founder)': LOGOS.linkPR,
        'Novu Works': LOGOS.novuWorks,
        'NovuWorks': LOGOS.novuWorks,
      };

      this.dom.dossierExperienceMount.innerHTML = variant.experiences.map((exp) => {
        const logoSvg = expLogos[exp.company] || '';
        return `
          <div class="exp-item">
            <div class="exp-header">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                ${logoSvg ? `<div class="exp-company-logo-slot">${logoSvg}</div>` : ''}
                <div>
                  <h4 class="exp-role">${exp.role}</h4>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 3px;">
                    <span class="exp-company">${exp.company}</span>
                    ${exp.employmentType ? `<span class="exp-type-pill ${exp.employmentType.includes('Full-Time') || exp.employmentType.includes('Tiempo Completo') ? 'pill-fulltime' : 'pill-founder'}">${exp.employmentType}</span>` : ''}
                    ${exp.url ? `
                      <a href="${exp.url}" target="_blank" rel="noopener noreferrer" class="exp-outbound-link" title="Visit ${exp.company} official website (${exp.urlDisplay || exp.url})">
                        <span>${exp.urlDisplay || 'Official Site'}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
              <span class="exp-date">${exp.period}</span>
            </div>
            <ul class="exp-bullet-list">
              ${exp.bullets.map((b) => {
                const formatBold = (text) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                const parts = b.split(': ');
                if (parts.length > 1) {
                  return `<li><strong>${formatBold(parts[0])}:</strong> ${formatBold(parts.slice(1).join(': '))}</li>`;
                }
                return `<li>${formatBold(b)}</li>`;
              }).join('')}
            </ul>
          </div>
        `;
      }).join('');
    }

    // 3. Standalone Projects
    if (this.dom.standaloneProjectsMount && PROFILE.standaloneProjects) {
      this.renderProjectCards(PROFILE.standaloneProjects, this.dom.standaloneProjectsMount);
    }

    // 4. Education & Certifications
    if (this.dom.dossierEducationMount) {
      const edu = PROFILE.education[0];
      this.dom.dossierEducationMount.innerHTML = `
        <div class="edu-card">
          <div style="margin-bottom: 8px;">${LOGOS.politecnica}</div>
          <h4 class="edu-degree">${edu.degree}</h4>
          <span class="edu-school">${edu.institution} · ${edu.status}</span>
          <p class="edu-desc"><strong>Coursework:</strong> ${edu.coursework}</p>
        </div>

        <div class="edu-card">
          <div style="margin-bottom: 8px; display: flex; gap: 10px; flex-wrap: wrap;">
            ${LOGOS.powerbi}
          </div>
          <h4 class="edu-degree">Professional Certifications & Badges</h4>
          <span class="edu-school">Microsoft · CompTIA · Lean Six Sigma · UPPR</span>
          <ul style="list-style: none; padding: 0; margin-top: 8px; display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-body);">
            ${PROFILE.certifications.map((c) => `
              <li style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px;">
                <span>• <strong>${c.name}</strong> (${c.issuer})</span>
                <span style="font-family: var(--font-mono); font-size: 10px; color: var(--gold-light); background: rgba(212,175,55,0.1); padding: 2px 6px; border-radius: 4px;">${c.badge}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="edu-card">
          <div style="margin-bottom: 8px;">${LOGOS.stanford}</div>
          <h4 class="edu-degree">Fellowships & Institutional Governance</h4>
          <span class="edu-school">Stanford University & UPR</span>
          <p class="edu-desc">
            <strong>Stanford University Innovation Fellows:</strong> Selected for elite design thinking and higher education innovation fellowship.<br/>
            <strong>Project Management Practice Tools & Techniques:</strong> UPPR structured Agile & Waterfall delivery.<br/>
            <strong>Federal Funds Administration:</strong> UPR federal grant governance and compliance.
          </p>
        </div>
      `;
    }

    // 5. Awards & Civic Leadership
    if (this.dom.dossierAwardsMount && PROFILE.awards) {
      this.dom.dossierAwardsMount.innerHTML = PROFILE.awards.map((a) => `
        <div class="award-card">
          <div class="award-head">
            <h4 class="award-title">${a.title}</h4>
            <span class="award-year">${a.year}</span>
          </div>
          <div class="award-org">${a.organization}</div>
          <p class="award-desc">${a.description}</p>
        </div>
      `).join('');
    }

    // 6. Dossier Company Logos Strip (Accredited Employers, Partners & Affiliations)
    if (this.dom.dossierLogosMount) {
      this.dom.dossierLogosMount.innerHTML = `
        <div class="logo-strip-inner">
          <span class="logo-strip-label">ACCREDITED PARTNERS, EMPLOYERS &amp; AFFILIATIONS:</span>
          <div class="logo-strip-row">
            <div class="logo-badge-item" title="Money Group (Full-Time)">${LOGOS.moneyGroup}</div>
            <div class="logo-badge-item" title="Red Ventures (Full-Time)">${LOGOS.redVentures}</div>
            <div class="logo-badge-item" title="edX Platform">${LOGOS.edx}</div>
            <div class="logo-badge-item" title="Databricks Lakehouse">${LOGOS.databricks}</div>
            <div class="logo-badge-item" title="Anthropic Claude">${LOGOS.claude}</div>
            <div class="logo-badge-item" title="ATH Móvil Business">${LOGOS.athMovil}</div>
            <a href="https://viva-advertising.com/" target="_blank" rel="noopener noreferrer" class="logo-badge-item is-link" title="Viva Advertising (My Company / Founder · $10M+ Pipeline) — Visit Official Site">${LOGOS.vivaAdvertising}</a>
            <a href="https://linkpuertorico.org/" target="_blank" rel="noopener noreferrer" class="logo-badge-item is-link" title="Link Puerto Rico (My Company / Co-Founder · 100+ Relational Databases) — Visit Official Site">${LOGOS.linkPR}</a>
            <div class="logo-badge-item" title="NovuWorks (Founder & Technical Consultant)">${LOGOS.novuWorks}</div>
            <div class="logo-badge-item" title="IBM">${LOGOS.ibm}</div>
            <div class="logo-badge-item" title="Google">${LOGOS.google}</div>
            <div class="logo-badge-item" title="AWS">${LOGOS.aws}</div>
            <div class="logo-badge-item" title="Salesforce">${LOGOS.salesforce}</div>
            <div class="logo-badge-item" title="CompTIA">${LOGOS.comptia}</div>
            <div class="logo-badge-item" title="Boys &amp; Girls Clubs de PR">${LOGOS.boysAndGirlsClubs}</div>
            <div class="logo-badge-item" title="Microsoft">${LOGOS.microsoft}</div>
            <div class="logo-badge-item" title="Meta">${LOGOS.meta}</div>
            <div class="logo-badge-item" title="Stanford University">${LOGOS.stanford}</div>
            <div class="logo-badge-item" title="UPPR">${LOGOS.politecnica}</div>
            <div class="logo-badge-item" title="Grupo Guayacán">${LOGOS.guayacan}</div>
            <div class="logo-badge-item" title="Enactus">${LOGOS.enactus}</div>
            <div class="logo-badge-item trigger-pr-coqui" title="Sol de Jayuya · Puerto Rico Heritage">${LOGOS.tainoSun}</div>
          </div>
        </div>
      `;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Render Project Cards (Reusable across Dossier, Overview, and Projects View)
  // ─────────────────────────────────────────────────────────────
  renderProjectCards(projects, containerEl) {
    if (!containerEl || !projects) return;
    const projectLogoMap = {
      jobhelper: LOGOS.jobhelper,
      bizpay: LOGOS.bizpay,
      picta: LOGOS.picta,
      'nfc-platform': LOGOS.nfcPlatform,
      hackeaporunacausa: LOGOS.hackea,
      'liza-project': LOGOS.linkPR,
      'viva-advertising': LOGOS.vivaAdvertising,
    };
    containerEl.innerHTML = projects.map((p) => {
      const projLogo = projectLogoMap[p.id] || LOGOS.novuWorks;

      let subUrl = p.subdomainUrl;
      if (subUrl) {
        try {
          const u = new URL(subUrl, window.location.href);
          u.searchParams.set('theme', this.getCurrentResolvedTheme());
          subUrl = u.toString();
        } catch (_) {}
      }

      return `
      <div class="standalone-project-card">
        <div class="proj-top-row">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${projLogo ? `<div style="height: 20px; display: inline-flex; align-items: center;">${projLogo}</div>` : ''}
            <h4 class="proj-name">${p.name}</h4>
            ${p.subdomainUrl ? `
              <span class="proj-live-badge">
                <span class="proj-live-dot"></span>
                <span>Live Subdomain</span>
              </span>
            ` : ''}
          </div>
          <span class="proj-period">${p.period}</span>
        </div>
        <div class="proj-meta">${p.role} · ${p.organization}</div>
        <span class="proj-metric-pill">${p.metrics}</span>
        <p class="proj-summary">${p.summary}</p>
        <div class="proj-tags-row">
          ${p.tags.map((t) => `<span class="proj-tag-pill">${t}</span>`).join('')}
        </div>
        <div class="proj-actions-row">
          <button type="button" class="proj-action-btn showcase-landing-btn" data-landing-id="${p.id}" title="Open Interactive Liquid Glass Landing Page for ${p.name}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Platform Landing</span>
          </button>
          ${subUrl ? `
            <a href="${subUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn subdomain-btn" data-project-id="${p.id}" title="Open live production app at ${subUrl}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>${p.subdomainLabel || 'Live App'}</span>
            </a>
          ` : ''}
          ${p.githubUrl ? `
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn github-btn" title="View open-source repository on GitHub">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
    }).join('');
  }

  // ─────────────────────────────────────────────────────────────
  // Trigger Project Transition Splash Screen (Full-Screen Gateway)
  // ─────────────────────────────────────────────────────────────
  triggerProjectTransitionSplash(projectId, options = {}, onComplete) {
    const splash = this.dom.projectTransitionSplash;
    if (!splash) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    let targetId = (projectId || 'bizpay').toLowerCase();
    if (targetId.startsWith('project-')) targetId = targetId.replace('project-', '');
    const meta = PROJECT_TRANSITIONS[targetId] || PROJECT_TRANSITIONS.bizpay;

    // Apply specific project brand visuals
    if (this.dom.ptsAmbientGlow) {
      this.dom.ptsAmbientGlow.style.background = `radial-gradient(circle at 50% 45%, ${meta.accentGlow} 0%, transparent 70%)`;
    }
    if (this.dom.ptsLogoSlot) {
      this.dom.ptsLogoSlot.innerHTML = meta.logoSvg;
    }
    if (this.dom.ptsLogoAura) {
      this.dom.ptsLogoAura.style.background = `radial-gradient(circle, ${meta.accentGlow} 0%, transparent 70%)`;
    }
    if (this.dom.ptsProjectName) {
      this.dom.ptsProjectName.textContent = meta.name.toUpperCase();
    }
    if (this.dom.ptsCategoryPill) {
      this.dom.ptsCategoryPill.textContent = meta.badge;
      this.dom.ptsCategoryPill.style.color = meta.accent;
      this.dom.ptsCategoryPill.style.borderColor = meta.accent;
    }
    if (this.dom.ptsProgressBar) {
      this.dom.ptsProgressBar.style.width = '0%';
      this.dom.ptsProgressBar.style.background = `linear-gradient(90deg, #d4af37 0%, ${meta.accent} 100%)`;
      this.dom.ptsProgressBar.style.boxShadow = `0 0 14px ${meta.accent}`;
    }
    if (this.dom.ptsStatusText) {
      this.dom.ptsStatusText.textContent = options.isLiveOutbound
        ? `CALIBRATING CLOUD CLUSTER // CONNECTING TO ${meta.name.toUpperCase()}...`
        : `CALIBRATING SUBSYSTEM RUNTIME // LAUNCHING ${meta.name.toUpperCase()}...`;
    }
    if (this.dom.ptsStatusPct) {
      this.dom.ptsStatusPct.textContent = '0%';
    }

    // Audio cue
    try {
      audio.click(950, 0.05);
    } catch (_) {}

    // Activate splash view
    splash.classList.remove('hidden', 'is-exiting');
    void splash.offsetWidth;
    splash.classList.add('is-active');

    const duration = options.duration || 850;
    const startTime = performance.now();
    let isExited = false;

    const finish = () => {
      if (isExited) return;
      isExited = true;
      splash.classList.add('is-exiting');
      setTimeout(() => {
        splash.classList.remove('is-active', 'is-exiting');
        splash.classList.add('hidden');
        if (typeof onComplete === 'function') onComplete();
      }, 300);
    };

    const tick = (now) => {
      if (isExited) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (this.dom.ptsProgressBar) {
        this.dom.ptsProgressBar.style.width = `${Math.round(progress * 100)}%`;
      }
      if (this.dom.ptsStatusPct) {
        this.dom.ptsStatusPct.textContent = `${Math.round(progress * 100)}%`;
      }

      if (this.dom.ptsStatusText) {
        if (progress < 0.35) {
          this.dom.ptsStatusText.textContent = options.isLiveOutbound
            ? `ESTABLISHING SECURE GATEWAY // ${meta.name.toUpperCase()}...`
            : `AUTHENTICATING RUNTIME MATRIX // ${meta.name.toUpperCase()}...`;
        } else if (progress < 0.75) {
          this.dom.ptsStatusText.textContent = options.isLiveOutbound
            ? `RESOLVING LIVE EDGE CDN & PRODUCTION ASSETS...`
            : `VERIFYING SUBSYSTEM BLUEPRINT & ARCHITECTURE...`;
        } else {
          this.dom.ptsStatusText.textContent = `✦ SYSTEM READY // LAUNCHING ${meta.name.toUpperCase()}`;
        }
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 120);
      }
    };

    requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────────────────────────
  // Open Subdomain Platform Interactive Landing Showcase
  // ─────────────────────────────────────────────────────────────
  openSubdomainLanding(projectId, skipSplash = false) {
    if (!this.dom.platformModal || !this.dom.platformModalBody) return;

    let targetId = projectId;
    if (targetId === 'nfc') targetId = 'nfc-platform';
    if (targetId === 'hackea') targetId = 'hackeaporunacausa';
    if (targetId === 'liza' || targetId === 'linkpr') targetId = 'liza-project';

    if (!skipSplash) {
      this.triggerProjectTransitionSplash(targetId, {}, () => {
        this.openSubdomainLanding(targetId, true);
      });
      return;
    }

    this.dom.platformModalBody.innerHTML = renderSubdomainLandingHtml(targetId);
    bindSubdomainLandingEvents(targetId, this.dom.platformModal);

    try {
      this.dom.platformModal.showModal();
      audio.playClick();
    } catch (_) {
      this.dom.platformModal.setAttribute('open', '');
    }

    try {
      history.replaceState(null, document.title, `#project-${targetId}`);
    } catch (_) {}
  }

  closeTopNavDrawer() {
    if (this.dom.topNavDrawer) {
      this.dom.topNavDrawer.classList.remove('is-open');
    }
    if (this.dom.mobileMenuToggleBtn) {
      this.dom.mobileMenuToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Render Projects & Live Subdomain Ecosystem
  // ─────────────────────────────────────────────────────────────
  renderProjects() {
    if (!PROFILE.standaloneProjects) return;
    this.renderProjectCards(PROFILE.standaloneProjects, this.dom.projectsViewMount);
    this.renderProjectCards(PROFILE.standaloneProjects, this.dom.standaloneProjectsMount);
    const subdomains = PROFILE.standaloneProjects.filter((p) => p.subdomainUrl);
    this.renderProjectCards(subdomains, this.dom.featuredSubdomainsMount);
  }

  // ─────────────────────────────────────────────────────────────
  // Render Printable Executive Resume & Composite Card
  // ─────────────────────────────────────────────────────────────
  renderPrintableResume(lensId = this.activeRoleLens) {
    const variant = PROFILE.roleVariants[lensId] || PROFILE.roleVariants.master;

    // Subtle re-render pulse animation for instant visual feedback on lens switch
    if (this.dom.printableResume) {
      this.dom.printableResume.classList.remove('lens-animating');
      void this.dom.printableResume.offsetWidth; // trigger reflow
      this.dom.printableResume.classList.add('lens-animating');
    }

    // Summary (Full Verbatim Tailored Text)
    if (this.dom.resSummaryMount) {
      this.dom.resSummaryMount.textContent = variant.summary;
    }

    // Skills (Tailored Categorized List)
    if (this.dom.resSkillsMount) {
      this.dom.resSkillsMount.innerHTML = variant.skills.map((s) => `
        <li><strong>${s.title}:</strong> ${s.items}</li>
      `).join('');
    }

    // Experience (Compact Format: Company | Role | Period)
    if (this.dom.resExpMount) {
      this.dom.resExpMount.innerHTML = variant.experiences.map((exp) => {
        // Convert **bold** markers to <strong> tags
        const formatBold = (text) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `
        <div class="res-exp-block">
          <div class="res-exp-head-compact">
            <span class="res-company">${exp.company}</span>
            <span class="res-sep-inline">|</span>
            <span class="res-role-inline">${exp.role}</span>
            <span class="res-sep-inline">|</span>
            <span class="res-date-inline">${exp.period}</span>
          </div>
          <ul class="res-bullets">
            ${exp.bullets.map((b) => {
              const parts = b.split(': ');
              if (parts.length > 1) {
                return `<li><strong>${parts[0]}:</strong> ${formatBold(parts.slice(1).join(': '))}</li>`;
              }
              return `<li>${formatBold(b)}</li>`;
            }).join('')}
          </ul>
        </div>
      `;
      }).join('');
    }

    // Projects (Compact: name + description with bold markers)
    if (this.dom.resProjectsMount && variant.resumeProjects) {
      const formatBold = (text) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      this.dom.resProjectsMount.innerHTML = `<ul class="res-bullets">${variant.resumeProjects.map((p) =>
        `<li><strong>${p.name}:</strong> ${formatBold(p.description)}</li>`
      ).join('')}</ul>`;
    }

    // Education & Certifications (3-line format matching image)
    if (this.dom.resEducationMount) {
      this.dom.resEducationMount.innerHTML = `
        <li><strong>B.S., Computer Engineering (4.0 GPA)</strong> | Universidad Politécnica de Puerto Rico | In Progress (Coursework: Data Structures & Algorithms, Software Engineering, Database Management Systems, Object-Oriented Programming, Systems Architecture)</li>
        <li><strong>Cloud, Analytics & IT Certifications:</strong> CompTIA IT Fundamentals+ (ITF+) | Data-driven Strategy: Planning, Reporting & Control with Power BI (UPPR) | Advanced Implementation of Data Analysis Tools with Power BI (UPPR) | Lean Six Sigma White Belt</li>
        <li><strong>Public Sector & Innovation Governance:</strong> Federal Funds Administration (UPR) | Project Management Practice Tools & Techniques (UPPR) | Stanford University Innovation Fellows</li>
      `;
    }


  }

  updateRecruiterScorecard(lensId = this.activeRoleLens) {
    const variant = PROFILE.roleVariants[lensId] || PROFILE.roleVariants.master;
    if (this.dom.scorecardRolesMount) {
      this.dom.scorecardRolesMount.innerHTML = `Active Lens: <strong>${variant.shortTitle}</strong> (Targeting Level ICS4 Lead / Senior IC / Manager)`;
    }

    // Dynamic Quantitative Proof Cards (All 4 cards tailored per specialty)
    if (this.dom.scorecardProofsMount && variant.proofPoints) {
      const metricColors = ['gold-num', '#38bdf8', '#4ade80', '#d4af37'];
      this.dom.scorecardProofsMount.innerHTML = variant.proofPoints.map((p, idx) => {
        const colorStyle = idx === 0 ? 'class="score-metric gold-num"' : `class="score-metric" style="color: ${metricColors[idx % metricColors.length]};"`;
        return `
          <div class="score-proof-card">
            <div ${colorStyle}>${p.metric}</div>
            <div class="score-title">${p.title}</div>
            <div class="score-sub">${p.sub}</div>
            <p class="score-desc">${p.desc}</p>
          </div>
        `;
      }).join('');
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Inject Logos into Dossier Experience & Printable Resume
  // ─────────────────────────────────────────────────────────────
  renderExperienceLogos() {
    // Handled dynamically via renderDossier & renderPrintableResume
  }

  // ─────────────────────────────────────────────────────────────
  // Smooth Ease-Out-Expo Number Counter Animation
  // ─────────────────────────────────────────────────────────────
  animateCounters() {
    const counterElements = document.querySelectorAll('.m-number[data-target]');
    counterElements.forEach((el) => {
      const target = parseFloat(el.dataset.target) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.round(target * easeProgress);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Interactive Cursor Spotlight Glow Effect
  // ─────────────────────────────────────────────────────────────
  initCardSpotlight() {
    const selector =
      '.standalone-project-card, .case-card, .proof-card, .cluster-item, .tesla-gauge-card, .edu-card, .award-card, .hero-metric-card, .scorecard-card';
    const attachGlow = () => {
      document.querySelectorAll(selector).forEach((card) => {
        if (card.dataset.glowAttached) return;
        card.dataset.glowAttached = 'true';
        card.addEventListener('pointermove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    };
    attachGlow();
    window.addEventListener('novu:view-changed', () => setTimeout(attachGlow, 60));
    window.addEventListener('novu:lang-changed', () => setTimeout(attachGlow, 60));
  }

  // ─────────────────────────────────────────────────────────────
  // Smooth Scroll-Driven Entry Reveal Observers (Progressive Enhancement)
  // ─────────────────────────────────────────────────────────────
  initScrollReveals() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const observeElements = () => {
      document
        .querySelectorAll(
          '.standalone-project-card, .case-card, .proof-card, .edu-card, .award-card, .hero-metric-card, .cluster-item, .scorecard-card'
        )
        .forEach((el) => {
          el.classList.add('scroll-reveal-target');
          observer.observe(el);
        });
    };
    observeElements();
    window.addEventListener('novu:view-changed', () => setTimeout(observeElements, 60));
    window.addEventListener('novu:lang-changed', () => setTimeout(observeElements, 60));
  }

  // ─────────────────────────────────────────────────────────────
  // Executive Signature & Certified Identity Block
  // ─────────────────────────────────────────────────────────────
  renderExecutiveSignature() {
    const mount = this.dom.executiveSignatureMount || document.getElementById('executive-signature-mount');
    if (!mount) return;
    mount.innerHTML = renderExecutiveSignatureBlock();
    initExecutiveSignature();
  }

  // ─────────────────────────────────────────────────────────────
  // Case Studies Rendering
  // ─────────────────────────────────────────────────────────────
  renderCaseStudies() {
    if (!this.dom.caseStudiesMount) return;
    this.dom.caseStudiesMount.innerHTML = PROFILE.caseStudies.map((cs) => {
      let logoSvg = LOGOS.novuWorks;
      if (cs.company.includes('Money Group')) logoSvg = LOGOS.moneyGroup;
      else if (cs.company.includes('Red Ventures')) logoSvg = `${LOGOS.redVentures}`;
      else if (cs.company.includes('Viva Advertising')) logoSvg = LOGOS.vivaAdvertising;
      else if (cs.company.includes('Link Puerto Rico')) logoSvg = LOGOS.linkPR;

      return `
        <div class="case-card" data-case-id="${cs.id}">
          <div class="case-badge-row">
            <div class="case-card-logo">${logoSvg}</div>
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span class="case-pill">${cs.badge}</span>
              ${cs.url ? `
                <a href="${cs.url}" target="_blank" rel="noopener noreferrer" class="case-live-badge" title="Visit ${cs.urlDisplay} live site" onclick="event.stopPropagation();">
                  <span class="live-dot" aria-hidden="true"></span>
                  <span>${cs.urlDisplay}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              ` : ''}
            </div>
          </div>
          <h3 class="case-title">${cs.title}</h3>
          <p class="case-summary">${cs.summary}</p>

          <!-- 3 Executive Metrics -->
          <div class="case-metric-row">
            ${Object.entries(cs.metrics).map(([k, val]) => `
              <div class="case-metric-box">
                <span class="case-m-val">${val}</span>
                <span class="case-m-key">${k.toUpperCase()}</span>
              </div>
            `).join('')}
          </div>

          <button type="button" class="case-action-btn">
            <span>Inspect Strategic Architecture & Code</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </button>
        </div>
      `;
    }).join('');

    this.dom.caseStudiesMount.querySelectorAll('.case-card').forEach((card) => {
      card.addEventListener('click', () => {
        const csId = card.dataset.caseId;
        const cs = PROFILE.caseStudies.find((c) => c.id === csId);
        if (cs) {
          audio.click(1600);
          this.openCaseStudyModal(cs);
        }
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Competency Matrix Table
  // ─────────────────────────────────────────────────────────────
  renderCompetencyMatrix() {
    if (!this.dom.competencyMatrixMount) return;
    this.dom.competencyMatrixMount.innerHTML = `
      <table class="matrix-table">
        <thead>
          <tr>
            ${PROFILE.coreCompetencyMatrix.map((col) => `<th>${col.category}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${[0, 1, 2, 3, 4].map((rowIndex) => `
            <tr>
              ${PROFILE.coreCompetencyMatrix.map((col) => `
                <td>${col.skills[rowIndex] || '—'}</td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // ─────────────────────────────────────────────────────────────
  // Modal Handlers (Case Studies, Disciplines, Recruiter)
  // ─────────────────────────────────────────────────────────────
  openCaseStudyModal(cs) {
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    let logoSvg = LOGOS.novuWorks;
    if (cs.company.includes('Money Group')) logoSvg = LOGOS.moneyGroup;
    else if (cs.company.includes('Red Ventures')) logoSvg = `${LOGOS.redVentures} ${LOGOS.edx}`;
    else if (cs.company.includes('Viva Advertising')) logoSvg = LOGOS.vivaAdvertising;
    else if (cs.company.includes('Link Puerto Rico')) logoSvg = LOGOS.linkPR;

    this.dom.dialogContentBody.innerHTML = `
      <div class="dialog-header">
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
            <div style="height: 28px;">${logoSvg}</div>
            <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-light);">
              ${cs.badge}
            </span>
          </div>
          <h2 id="modal-disc-title" style="font-size: 26px; font-weight: 800; color: var(--titanium-white); margin-top: 4px; line-height: 1.25;">
            ${cs.title}
          </h2>
        </div>
        <button type="button" class="dialog-close-btn" id="btn-close-modal" aria-label="Close dialog">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="dialog-body">
        <p style="color: var(--text-body); font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          ${cs.summary}
        </p>

        <!-- Key Metrics Row -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 28px;">
          ${Object.entries(cs.metrics).map(([k, val]) => `
            <div class="cs-modal-metric-box" style="border: 1px solid var(--hairline-gold); padding: 14px 18px; border-radius: var(--radius-sm);">
              <div style="font-size: 22px; font-weight: 800; color: var(--gold-light);">${val}</div>
              <div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-top: 3px;">${k}</div>
            </div>
          `).join('')}
        </div>

        <!-- 4-Pillar Narrative Cadence -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px;">
          <div class="cs-modal-narrative-box" style="border-left: 3px solid #ff5f56; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #e11d48; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">1. Context & Scaling Friction:</strong>
            <p style="font-size: 14px; color: var(--titanium-white); line-height: 1.65;">${cs.challenge}</p>
          </div>

          <div class="cs-modal-narrative-box" style="border-left: 3px solid #ffbd2e; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #d97706; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">2. Strategic Hypothesis:</strong>
            <p style="font-size: 14px; color: var(--titanium-white); line-height: 1.65;">${cs.strategy}</p>
          </div>

          <div class="cs-modal-narrative-box" style="border-left: 3px solid #3b82f6; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #2563eb; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">3. Dev & Cross-Functional Execution:</strong>
            <p style="font-size: 14px; color: var(--titanium-white); line-height: 1.65;">${cs.execution}</p>
          </div>

          <div class="cs-modal-narrative-box" style="border-left: 3px solid #27c93f; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #059669; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">4. Bottom-Line Impact & Permanence:</strong>
            <p style="font-size: 14px; color: var(--titanium-white); line-height: 1.65;">${cs.impact}</p>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
          ${cs.url ? `
            <a href="${cs.url}" target="_blank" rel="noopener noreferrer" class="luxury-btn outline-platinum" style="flex: 1; justify-content: center; min-width: 220px;" title="Visit official site: ${cs.url}">
              <span>${cs.urlText || 'Visit Official Site'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
          <a href="mailto:fabianvvicente1@gmail.com?subject=Strategic%20Role%20Inquiry%20-%20${encodeURIComponent(cs.title)}" class="luxury-btn primary-gold" style="flex: 1; justify-content: center; min-width: 240px;">
            <span>Schedule Executive Interview</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>
        </div>
      </div>
    `;

    this.dom.disciplineModal.showModal();
    this.dom.dialogContentBody.querySelector('#btn-close-modal')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      audio.click(800);
    });
  }

  openDisciplineModal(disc) {
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    this.dom.dialogContentBody.innerHTML = `
      <div class="dialog-header">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-light);">
            ${disc.number} · Architecture Discipline
          </span>
          <h2 id="modal-disc-title" style="font-size: 26px; font-weight: 800; color: var(--titanium-white); margin-top: 4px;">
            ${disc.title}
          </h2>
        </div>
        <button type="button" class="dialog-close-btn" id="btn-close-modal" aria-label="Close dialog">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="dialog-body">
        <p style="color: var(--text-body); font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          ${disc.subtitle}
        </p>

        <div class="cs-modal-narrative-box" style="border: 1px solid var(--hairline); border-radius: var(--radius-sm); padding: 20px; margin-bottom: 24px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 12px;">Key Engineering Deliverables:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${disc.deliverables.map((item) => `
              <li style="display: flex; gap: 10px; font-size: 14px; color: var(--titanium-white);">
                <span style="color: var(--gold-primary);">✓</span> ${item}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Production Tech Stack:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${disc.tech.map((t) => `
              <span class="cs-modal-metric-box" style="font-family: var(--font-mono); font-size: 12px; padding: 6px 14px; border-radius: var(--radius-pill); border: 1px solid var(--hairline); color: var(--titanium-white);">${t}</span>
            `).join('')}
          </div>
        </div>

        <a href="mailto:fabianvvicente1@gmail.com?subject=Consulting%20Inquiry%20-%20${encodeURIComponent(disc.title)}" class="luxury-btn primary-gold" style="width: 100%; justify-content: center;">
          <span>Schedule Strategy Consultation</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
        </a>
      </div>
    `;

    this.dom.disciplineModal.showModal();
    this.dom.dialogContentBody.querySelector('#btn-close-modal')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      audio.click(800);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Recruiter Fast-Track (60s Scorecard) Modal
  // ─────────────────────────────────────────────────────────────
  openRecruiterModal() {
    if (!this.dom.recruiterModal) return;
    this.dom.recruiterModal.showModal();
    audio.confirm();
    try {
      logCandidateEvent('recruiter_modal_opened', { lens: this.activeRoleLens });
    } catch (e) {}
  }

  closeRecruiterModal() {
    if (!this.dom.recruiterModal) return;
    this.dom.recruiterModal.close();
    audio.click(800);
  }

  // ─────────────────────────────────────────────────────────────
  // Cyber Arcade 3D Easter Egg Game
  // ─────────────────────────────────────────────────────────────
  openArcadeGame() {
    if (!this.dom.arcadeModal) return;
    if (this.canvas3d) {
      this.canvas3d.pause();
    }
    this.dom.arcadeModal.showModal();
    audio.confirm();
    this.arcadeGame = new CyberArcadeGame(this.dom.arcadeModal, () => {
      this.closeArcadeGame();
    });
  }

  closeArcadeGame() {
    if (!this.dom.arcadeModal) return;
    const game = this.arcadeGame;
    this.arcadeGame = null;
    if (game) {
      game.stop();
    }
    if (this.dom.arcadeModal.open) {
      this.dom.arcadeModal.close();
    }
    if (this.canvas3d) {
      this.canvas3d.resume();
    }
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#arcade') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      if (window.location.search.includes('arcade=1')) {
        const u = new URL(window.location.href);
        u.searchParams.delete('arcade');
        history.replaceState(null, '', u.toString());
      }
    }
    audio.click(750);
  }

  copyRecruiterNotes() {
    const variant = PROFILE.roleVariants[this.activeRoleLens] || PROFILE.roleVariants.master;
    const text = `CANDIDATE: Fabián Vélez Vicente
TARGET ROLE: ${variant.headline}
ACTIVE SOURCING LENS: ${variant.label}
LOCATION: San Juan, PR (US Remote / Worldwide)
WORK AUTHORIZATION: US Citizen (Born in Puerto Rico · No Visa Sponsorship Required)
PHONE: +1 (347) 815-8054
EMAIL: fabianvvicente1@gmail.com
LINKEDIN: https://linkedin.com/in/fabian-velez-vicente
GITHUB: https://github.com/eresfavolosx
PORTFOLIO: https://novu.works

EXECUTIVE SUMMARY:
${variant.summary}

CORE SKILLS:
${variant.skills.map((s) => `• ${s.title}: ${s.items}`).join('\n')}

KEY PROOF POINTS & METRICS:
${variant.proofPoints ? variant.proofPoints.map((p) => `• [${p.metric}] ${p.title} (${p.sub}): ${p.desc}`).join('\n') : ''}
• Education & Credentials: B.S. Computer Engineering (4.0 GPA), Universidad Politécnica de PR; Microsoft Certified Power BI Data Analyst Associate; Stanford University Innovation Fellow; Lean Six Sigma White Belt; CompTIA ITF+.`;

    navigator.clipboard.writeText(text).then(() => {
      audio.confirm();
      this.showToast(`Recruiter ATS Notes (${variant.shortTitle}) copied to clipboard`);
    }).catch(() => {
      this.showToast('Candidate notes copied to clipboard');
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Visitor Area-of-Interest Onboarding Concierge Modal
  // ─────────────────────────────────────────────────────────────
  openSurveyModal() {
    if (!this.dom.visitorSurveyModal) return;
    document.querySelectorAll('.survey-card-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lens === this.activeRoleLens);
    });
    this.dom.visitorSurveyModal.showModal();
    audio.confirm();
  }

  closeSurveyModal() {
    if (!this.dom.visitorSurveyModal) return;
    this.dom.visitorSurveyModal.close();
    audio.click(800);
  }

  selectVisitorPersona(lensId) {
    if (!PROFILE.roleVariants[lensId]) lensId = 'master';
    localStorage.setItem('fv_visitor_persona', lensId);
    localStorage.setItem('fv_onboarding_completed', 'true');
    this.setRoleLens(lensId);
    this.closeSurveyModal();

    const variant = PROFILE.roleVariants[lensId];
    this.showToast(`✨ Tailored Portfolio: ${variant.shortTitle || variant.label}`);
  }

  updateHeaderPersonaPill(lensId) {
    if (!this.dom.btnTailorExperience) return;
    const labelSpan = this.dom.btnTailorExperience.querySelector('.persona-label');
    const dotSpan = this.dom.btnTailorExperience.querySelector('.persona-dot');
    const variant = PROFILE.roleVariants[lensId] || PROFILE.roleVariants.master;

    const icons = {
      master: '✨',
      revops_analytics: '🎯',
      ai_engineering: '🤖',
      data_governance: '📊',
      tech_ops: '⚡',
    };

    if (labelSpan) {
      labelSpan.textContent = variant.shortTitle || variant.label;
    }
    if (dotSpan) {
      dotSpan.textContent = icons[lensId] || '✨';
    }

    this.dom.btnTailorExperience.setAttribute(
      'title',
      `Currently tailored to: ${variant.label}. Click to re-tailor experience.`
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Live Puerto Rico Weather API (Open-Meteo REST API)
  // ─────────────────────────────────────────────────────────────
  async initPuertoRicoWeather() {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=18.4655&longitude=-66.1057&current_weather=true',
        { signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined }
      );
      if (res.ok) {
        const data = await res.json();
        const cw = data.current_weather;
        if (cw && typeof cw.temperature === 'number' && Number.isFinite(cw.temperature)) {
          const tempC = Math.round(cw.temperature);
          const tempF = Math.round((tempC * 9) / 5 + 32);
          const wind = typeof cw.windspeed === 'number' && Number.isFinite(cw.windspeed) ? Math.round(cw.windspeed) : 10;

          const weatherIcons = {
            0: '☀️ Clear',
            1: '🌤️ Mostly Clear',
            2: '⛅ Partly Cloudy',
            3: '☁️ Overcast',
            45: '🌫️ Fog',
            51: '🌦️ Light Drizzle',
            61: '🌧️ Rain',
            80: '🌧️ Showers',
            95: '⛈️ Thunderstorm',
          };
          const cond = weatherIcons[cw.weathercode] || '☀️ Tropical';

          this.prWeather = { tempC, tempF, wind, cond };

          if (this.teslaCockpit) {
            this.teslaCockpit.updateWeather(`${tempF}°F / ${tempC}°C`, cond.split(' ')[0] || '☀️');
          }

          const badge = this.dom.prWeatherBadge;
          if (badge) {
            badge.textContent = `${tempC}°C / ${tempF}°F`;
          }

          const pill = this.dom.btnPrRoots;
          if (pill) {
            pill.setAttribute(
              'title',
              `San Juan, Puerto Rico · ${tempC}°C / ${tempF}°F · ${cond} · Wind: ${wind} km/h · 18.4655° N, 66.1057° W (Click for Coquí chime)`
            );
          }
        }
      }
    } catch (e) {
      console.warn('Open-Meteo Weather notice:', e);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Executive Resume Modal Handlers
  // ─────────────────────────────────────────────────────────────
  openResumeModal() {
    if (!this.dom.resumeModal) return;
    this.dom.resumeModal.showModal();
    audio.confirm();
    try {
      logCandidateEvent('resume_modal_opened', { lens: this.activeRoleLens });
    } catch (e) {}
  }

  closeResumeModal() {
    if (!this.dom.resumeModal) return;
    this.dom.resumeModal.close();
    audio.click(800);
  }

  copyResumeText() {
    const variant = PROFILE.roleVariants[this.activeRoleLens] || PROFILE.roleVariants.master;
    // Strip **bold** markers for plain text copy
    const stripBold = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1');
    const projText = (variant.resumeProjects || []).map((p) => `• ${p.name}: ${stripBold(p.description)}`).join('\n');

    const text = `FABIAN VELEZ VICENTE
fabianvvicente1@gmail.com | +1 (347) 815-8054 | linkedin.com/in/fabian-velez-vicente | github.com/eresfavolosx

SUMMARY
${variant.summary}

SKILLS
${variant.skills.map((s) => `• ${s.title}: ${s.items}`).join('\n')}

PROFESSIONAL EXPERIENCE
${variant.experiences.map((exp) => `${exp.company} | ${exp.role} | ${exp.period}\n${exp.bullets.map((b) => `• ${stripBold(b)}`).join('\n')}`).join('\n\n')}

PROJECTS
${projText}

EDUCATION & CERTIFICATIONS
• B.S., Computer Engineering (4.0 GPA) | Universidad Politécnica de Puerto Rico | In Progress (Coursework: Data Structures & Algorithms, Software Engineering, Database Management Systems, Object-Oriented Programming, Systems Architecture)
• Cloud, Analytics & IT Certifications: CompTIA IT Fundamentals+ (ITF+) | Data-driven Strategy: Planning, Reporting & Control with Power BI (UPPR) | Advanced Implementation of Data Analysis Tools with Power BI (UPPR) | Lean Six Sigma White Belt
• Public Sector & Innovation Governance: Federal Funds Administration (UPR) | Project Management Practice Tools & Techniques (UPPR) | Stanford University Innovation Fellows`;

    navigator.clipboard.writeText(text).then(() => {
      audio.confirm();
      this.showToast(`Executive Resume (${variant.shortTitle}) copied to clipboard`);
    }).catch(() => {
      this.showToast('Copied to clipboard');
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Event Binding
  // ─────────────────────────────────────────────────────────────
  bindEvents() {
    // Navigation Tabs (Desktop & Top Navigation Drawer)
    document.querySelectorAll('.nav-tab, .top-nav-tab, .dock-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) {
          this.switchView(view);
          this.closeTopNavDrawer();
        }
      });
    });

    // Mobile Top Navigation Menu Toggle (Appears smoothly from top)
    const mobileMenuBtn = document.getElementById('btn-mobile-menu-toggle');
    const topNavDrawer = document.getElementById('top-navigation-drawer');
    if (mobileMenuBtn && topNavDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = topNavDrawer.classList.toggle('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        try { audio.playClick(); } catch (_) {}
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && topNavDrawer.classList.contains('is-open')) {
          this.closeTopNavDrawer();
        }
      });
    }

    // Platform Landing Triggers (from Top Drawer, Project Cards, and Direct Clicks)
    document.addEventListener('click', (e) => {
      const landingBtn = e.target.closest('[data-landing-id], [data-landing]');
      if (landingBtn) {
        const id = landingBtn.dataset.landingId || landingBtn.dataset.landing;
        if (id) {
          e.preventDefault();
          this.openSubdomainLanding(id);
          this.closeTopNavDrawer();
        }
      }
    });

    // Live Subdomain Outbound Triggers (Splash Transition on Click with Dynamic Theme Preservation)
    document.addEventListener('click', (e) => {
      const subBtn = e.target.closest('.subdomain-btn');
      if (subBtn) {
        let href = subBtn.href;
        try {
          const u = new URL(href, window.location.href);
          u.searchParams.set('theme', this.getCurrentResolvedTheme());
          href = u.toString();
        } catch (_) {}
        const projId = subBtn.dataset.projectId || 'bizpay';
        e.preventDefault();
        this.triggerProjectTransitionSplash(projId, { isLiveOutbound: true }, () => {
          window.open(href, '_blank', 'noopener,noreferrer');
        });
      }
    });

    // URL Hash Routing for direct deep links (#jobhelper, #bizpay, #project-picta, etc.)
    const checkHashRoute = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (!hash) return;
      if (hash.startsWith('project-')) {
        const id = hash.replace('project-', '');
        this.openSubdomainLanding(id);
      } else if (['jobhelper', 'bizpay', 'picta', 'nfc', 'nfc-platform', 'hackea', 'hackeaporunacausa', 'liza', 'linkpr', 'liza-project'].includes(hash)) {
        this.openSubdomainLanding(hash);
      } else if (hash === 'menu' || hash === 'navigation') {
        const topNavDrawer = document.getElementById('top-navigation-drawer');
        const mobileMenuBtn = document.getElementById('btn-mobile-menu-toggle');
        topNavDrawer?.classList.add('is-open');
        mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      }
    };
    window.addEventListener('hashchange', checkHashRoute);
    setTimeout(checkHashRoute, 400);

    // Brand Home Link
    document.getElementById('brand-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('core');
    });

    // Hero Action Buttons
    document.getElementById('btn-explore-case-studies')?.addEventListener('click', () => {
      this.switchView('case-studies');
    });

    document.getElementById('btn-explore-projects')?.addEventListener('click', () => {
      this.switchView('projects');
    });

    document.getElementById('btn-view-all-projects')?.addEventListener('click', () => {
      this.switchView('projects');
    });

    document.getElementById('btn-launch-ai-lab')?.addEventListener('click', () => {
      this.switchView('projects');
    });

    document.getElementById('btn-hero-intel-feed')?.addEventListener('click', () => {
      this.switchView('intel-feed');
    });

    // Dynamic Target Role Lens Selectors
    document.querySelectorAll('.role-lens-btn, .modal-lens-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const lensId = e.currentTarget.dataset.lens;
        if (lensId) {
          this.setRoleLens(lensId);
        }
      });
    });

    // Recruiter Brief Trigger
    document.getElementById('btn-recruiter-brief')?.addEventListener('click', () => {
      this.openRecruiterModal();
    });

    document.getElementById('btn-close-recruiter-modal')?.addEventListener('click', () => {
      this.closeRecruiterModal();
    });

    document.getElementById('btn-copy-recruiter-notes')?.addEventListener('click', () => {
      this.copyRecruiterNotes();
    });

    document.getElementById('btn-open-full-resume-from-rec')?.addEventListener('click', () => {
      this.closeRecruiterModal();
      this.openResumeModal();
    });

    // Resume Modal Triggers
    document.getElementById('btn-open-resume-card')?.addEventListener('click', () => {
      this.openResumeModal();
    });

    document.getElementById('btn-open-resume-card-bottom')?.addEventListener('click', () => {
      this.openResumeModal();
    });

    document.getElementById('btn-close-resume-modal')?.addEventListener('click', () => {
      this.closeResumeModal();
    });

    document.getElementById('btn-print-from-modal')?.addEventListener('click', () => {
      audio.confirm();
      window.print();
    });

    document.getElementById('btn-copy-resume-text')?.addEventListener('click', () => {
      this.copyResumeText();
    });

    // Visitor Concierge / Tailor Experience Triggers
    this.dom.btnTailorExperience?.addEventListener('click', () => {
      if (this.bilingualHero && typeof this.bilingualHero.openIntro === 'function') {
        this.bilingualHero.openIntro(false);
      } else {
        this.openSurveyModal();
      }
    });

    this.dom.btnCloseSurveyModal?.addEventListener('click', () => {
      this.closeSurveyModal();
      localStorage.setItem('fv_onboarding_completed', 'true');
    });

    this.dom.btnSurveyExploreAll?.addEventListener('click', () => {
      this.selectVisitorPersona('master');
    });

    document.querySelectorAll('.survey-card-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lens = btn.dataset.lens;
        if (lens) {
          this.selectVisitorPersona(lens);
        }
      });
    });

    this.dom.visitorSurveyModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.visitorSurveyModal) {
        this.closeSurveyModal();
      }
    });

    // Executive Visitor Utilities Trigger
    this.dom.btnVisitorTools?.addEventListener('click', () => {
      if (this.visitorTools) {
        this.visitorTools.open();
      }
    });

    // 3D Background Visualizer Mode Triggers
    const triggerVisualizer = () => {
      this.toggleVisualizerMode();
    };

    this.dom.btnToggleVisualizer?.addEventListener('click', triggerVisualizer);
    this.dom.btnHeroViewCanvas?.addEventListener('click', triggerVisualizer);
    this.dom.btnDockViewCanvas?.addEventListener('click', triggerVisualizer);
    document.getElementById('btn-top-drawer-3d')?.addEventListener('click', () => {
      this.closeTopNavDrawer();
      this.enterVisualizerMode();
    });
    document.getElementById('btn-top-drawer-replay-intro')?.addEventListener('click', () => {
      this.closeTopNavDrawer();
      this.replayEpicIntro();
    });
    this.dom.btnExitVisualizer?.addEventListener('click', () => {
      this.exitVisualizerMode();
    });

    this.dom.btnVizAudio?.addEventListener('click', () => {
      this.toggleAudio();
    });

    this.dom.btnVizCoqui?.addEventListener('click', (e) => {
      triggerCoqui(e);
    });

    // 3D Sculpture Switcher Pills across all docks & HUD
    document.querySelectorAll('.sculpture-pill, .morph-btn, .viz-morph-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const morphIndex = parseInt(btn.dataset.morph, 10);
        if (isNaN(morphIndex)) return;
        this.syncMorphPills(morphIndex);
        if (this.canvas3d) this.canvas3d.setMorphState(morphIndex);
      });
    });

    // Bilingual Language Toggle (English / Español)
    this.dom.btnLangToggle?.addEventListener('click', () => {
      audio.click(1200);
      const nextLang = this.currentLang === 'en' ? 'es' : 'en';
      this.setLanguage(nextLang);
    });

    // Theme Toggle (Dark / Light Mode)
    this.dom.btnThemeToggle?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Tesla Mode Toggle
    this.dom.btnTeslaMode?.addEventListener('click', () => {
      this.toggleTeslaMode();
    });

    // Audio Toggle
    this.dom.btnAudioToggle?.addEventListener('click', () => {
      this.toggleAudio();
    });

    // Spatial 6DoF Gyroscope Toggle / Permission Trigger
    this.dom.btnSpatialGyro?.addEventListener('click', async () => {
      audio.click();
      if (this.spatial) {
        const granted = await this.spatial.requestGyroPermission();
        if (granted) {
          this.showToast('🧭 6DoF Spatial Gyroscope & Inertial Parallax Active');
          this.dom.btnSpatialGyro?.classList.add('active');
        } else {
          this.showToast('🧭 Spatial Parallax active in Desktop Cursor mode');
        }
      }
    });

    // Puerto Rico Cultural Roots & Coquí Sound Chime
    const triggerCoqui = (e) => {
      if (e) e.preventDefault();
      audio.coqui();
      const w = this.prWeather;
      const weatherSnippet = w ? ` · ${w.tempC}°C / ${w.tempF}°F · ${w.cond}` : '';
      const geo = this.spatial?.geodesicTelemetry;
      const geoSnippet = geo ? ` · ${geo.distanceMiles.toLocaleString()} mi away (${geo.cardinal})` : '';
      this.showToast(`🇵🇷 San Juan, Puerto Rico${weatherSnippet}${geoSnippet} · 18°28′N 66°06′W · Puerto Rico Heritage`);
      const pill = this.dom.btnPrRoots;
      if (pill) {
        pill.classList.add('pr-chime-active');
        setTimeout(() => pill.classList.remove('pr-chime-active'), 800);
      }
      try {
        logCandidateEvent('puerto_rico_coqui_triggered', {
          weather: w?.cond || 'N/A',
          distance_mi: geo?.distanceMiles || null,
        });
      } catch (err) {}
    };

    this.dom.btnPrRoots?.addEventListener('click', triggerCoqui);
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.trigger-pr-coqui');
      if (target) {
        triggerCoqui(e);
      }
    });

    // Command Palette Trigger
    this.dom.btnCmdPalette?.addEventListener('click', () => {
      if (this.cmdPalette) this.cmdPalette.open();
    });

    // Print Resume (Global Button)
    this.dom.btnPrintResume?.addEventListener('click', () => {
      this.openResumeModal();
    });

    // Keyboard Shortcuts (1-6 for Views, Esc to exit visualizer, Z to toggle visualizer)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisualizerMode) {
        e.preventDefault();
        this.exitVisualizerMode();
        return;
      }
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.key === 'z' || e.key === 'Z') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        this.toggleVisualizerMode();
        return;
      }
      if (e.key === '1') this.switchView('core');
      if (e.key === '2') this.switchView('case-studies');
      if (e.key === '3') this.switchView('projects');
      if (e.key === '4') this.switchView('planner');
      if (e.key === '5') this.switchView('dossier');
      if (e.key === '6') this.switchView('intel-feed');
    });

    // Arcade Easter Egg triggers
    document.getElementById('btn-open-arcade-pill')?.addEventListener('click', () => {
      this.openArcadeGame();
    });

    // Triple-click on brand avatar
    let avatarClicks = 0;
    let avatarClickTimer = null;
    document.querySelector('.brand-avatar-box')?.addEventListener('click', () => {
      avatarClicks++;
      clearTimeout(avatarClickTimer);
      if (avatarClicks >= 3) {
        avatarClicks = 0;
        this.openArcadeGame();
      } else {
        avatarClickTimer = setTimeout(() => {
          avatarClicks = 0;
        }, 800);
      }
    });

    // Konami Code sequence listener (↑ ↑ ↓ ↓ ← → ← → B A)
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === konamiSequence[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          konamiIndex = 0;
          this.showToast('🎮 KONAMI CODE UNLOCKED! LAUNCHING CYBER ARCADE...');
          this.openArcadeGame();
        }
      } else {
        konamiIndex = 0;
      }
    });

    // Modal click-outside backdrop dismiss
    this.dom.disciplineModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.disciplineModal) {
        this.dom.disciplineModal.close();
      }
    });

    this.dom.resumeModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.resumeModal) {
        this.closeResumeModal();
      }
    });

    this.dom.recruiterModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.recruiterModal) {
        this.closeRecruiterModal();
      }
    });

    this.dom.arcadeModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.arcadeModal) {
        this.closeArcadeGame();
      }
    });

    this.dom.arcadeModal?.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeArcadeGame();
    });
  }

  // ─────────────────────────────────────────────────────────────
  // View Switcher with Choreographed Animations
  // ─────────────────────────────────────────────────────────────
  switchView(viewName) {
    if (viewName === 'ai-lab') viewName = 'projects';
    if (this.currentView === viewName) return;
    this.currentView = viewName;
    document.body.dataset.view = viewName;
    audio.click(1300);

    // Update Nav buttons
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      const v = btn.dataset.view === 'ai-lab' ? 'projects' : btn.dataset.view;
      btn.classList.toggle('active', v === viewName);
    });

    // Fade and slide views
    const views = ['core', 'case-studies', 'projects', 'ai-lab', 'planner', 'dossier', 'intel-feed'];
    views.forEach((v) => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          void el.offsetWidth;
          el.classList.add('active');
        } else {
          el.classList.remove('active');
          setTimeout(() => {
            if (this.currentView !== v) el.classList.add('hidden');
          }, 350);
        }
      }
    });

    // Trigger number counter animations on returning to overview
    if (viewName === 'core') {
      this.animateCounters();
    }

    // Refresh Minimalist Particle Matrix layout when entering projects view
    if (viewName === 'projects' && this.minimalParticles) {
      setTimeout(() => {
        this.minimalParticles.resize();
        this.minimalParticles.warp();
      }, 60);
    }

    // Dynamic 3D Camera & Pause Management (Conserves GPU/CPU on subviews)
    if (this.canvas3d) {
      if (viewName === 'core') {
        this.canvas3d.resume();
        if (this.canvas3d.camera) this.canvas3d.camera.position.set(0, 0, 46);
      } else if (!this.canvas3d.isVisualizerMode) {
        // Pausing 3D canvas when viewing heavy content views prevents device overheating
        this.canvas3d.pause();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─────────────────────────────────────────────────────────────
  // Preferences & Toggles: Automatic Device & Cross-Domain Theme Sync
  // ─────────────────────────────────────────────────────────────
  initTheme() {
    // 1. Check URL parameters first (e.g. returning from subdomain with ?theme=dark|light)
    let initialTheme = null;
    try {
      const urlParam = new URLSearchParams(window.location.search).get('theme');
      if (urlParam === 'light' || urlParam === 'dark') {
        initialTheme = urlParam;
      }
    } catch (_) {}

    // 2. Read stored override from localStorage
    if (!initialTheme) {
      try {
        const saved = localStorage.getItem('color-scheme');
        if (saved === 'light' || saved === 'dark') initialTheme = saved;
      } catch (_) {}
    }

    // 3. Read document.cookie fallback
    if (!initialTheme) {
      try {
        const match = document.cookie.match(/(?:^|; )color-scheme=([^;]+)/);
        if (match && (match[1] === 'light' || match[1] === 'dark')) initialTheme = match[1];
      } catch (_) {}
    }

    // 4. Resolve directly from device preference
    if (!initialTheme) {
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = isSystemDark ? 'dark' : 'light';
    }

    this.applyTheme(initialTheme, false);

    // Multi-tab synchronization (modern-web-guidance)
    window.addEventListener('storage', (e) => {
      if (e.key === 'color-scheme') {
        const newTheme = e.newValue;
        if (newTheme === 'light' || newTheme === 'dark') {
          this.applyTheme(newTheme, false);
        }
      }
    });

    // System preference change listener
    if (window.matchMedia) {
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleDeviceThemeChange = (e) => {
        const savedTheme = localStorage.getItem('color-scheme');
        // Only adapt automatically if no explicit user override is locked
        if (!savedTheme || savedTheme === 'system') {
          const newSystemTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newSystemTheme, false);
          this.showToast(newSystemTheme === 'light' ? '☀️ Auto-switched to Device Light Mode' : '🌙 Auto-switched to Device Dark Mode');
        }
      };

      if (typeof darkQuery.addEventListener === 'function') {
        darkQuery.addEventListener('change', handleDeviceThemeChange);
      } else if (typeof darkQuery.addListener === 'function') {
        darkQuery.addListener(handleDeviceThemeChange);
      }
    }
  }

  getCurrentResolvedTheme() {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const content = meta ? meta.getAttribute('content') : 'light dark';
    if (content === 'light') return 'light';
    if (content === 'dark') return 'dark';
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  toggleTheme() {
    // Directly toggle between light and dark mode cleanly and predictably
    const current = this.getCurrentResolvedTheme();
    const target = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(target, true);
  }

  setTheme(theme, isUserAction = true) {
    this.applyTheme(theme, isUserAction);
  }

  applyTheme(theme, isUserAction = false) {
    if (theme !== 'light' && theme !== 'dark') return;
    try {
      localStorage.setItem('color-scheme', theme);
      document.cookie = `color-scheme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
      if (location.hostname.endsWith('novu.works')) {
        document.cookie = `color-scheme=${theme}; path=/; domain=.novu.works; max-age=31536000; SameSite=Lax`;
      }
    } catch (e) {}

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;
    const themeColorMeta = document.getElementById('meta-theme-color') || document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.content = theme === 'light' ? '#f8fafc' : '#050507';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.documentElement.style.backgroundColor = theme === 'light' ? '#f8fafc' : '#050507';
    if (document.body) {
      document.body.style.backgroundColor = theme === 'light' ? '#f8fafc' : '#050507';
    }

    this.updateThemeButton(theme, false);
    if (this.canvas3d) this.canvas3d.setTheme(theme);
    if (this.minimalParticles) this.minimalParticles.setTheme(theme);

    // Keep all subdomain and external links synchronized with active theme!
    this.syncSubdomainThemeLinks(theme);

    if (isUserAction) {
      audio.chime(theme === 'light' ? 2 : 0);
      this.showToast(theme === 'light' ? '☀️ Light Theme Active' : '🌙 Dark Theme Active');
    }
  }

  syncSubdomainThemeLinks(theme) {
    const targetTheme = theme || this.getCurrentResolvedTheme();
    document.querySelectorAll('.subdomain-btn, a[href*="bizpay"], a[href*="picta"], a[href*="nfc"], a[href*="hackea"]').forEach((a) => {
      try {
        const url = new URL(a.href, window.location.href);
        if (url.hostname.includes('novu.works') || url.hostname.includes('web.app') || url.pathname.includes('subdomains')) {
          url.searchParams.set('theme', targetTheme);
          a.href = url.toString();
        }
      } catch (_) {}
    });
  }

  updateThemeButton(activeTheme, isSystem = false) {
    const btn = this.dom.btnThemeToggle;
    if (!btn) return;

    const sunIcon = btn.querySelector('.icon-theme-sun');
    const moonIcon = btn.querySelector('.icon-theme-moon');

    if (activeTheme === 'light') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
      btn.title = isSystem ? 'Auto Theme (Following Device: Light) · Click to switch' : 'Manual Light Mode · Click to return to Auto Device Sync';
      btn.setAttribute('aria-label', isSystem ? 'Auto Device Theme: Light' : 'Switch Theme');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
      btn.title = isSystem ? 'Auto Theme (Following Device: Dark) · Click to switch' : 'Manual Dark Mode · Click to return to Auto Device Sync';
      btn.setAttribute('aria-label', isSystem ? 'Auto Device Theme: Dark' : 'Switch Theme');
    }

    if (isSystem) {
      btn.classList.add('is-device-auto');
    } else {
      btn.classList.remove('is-device-auto');
    }
  }

  toggleTeslaMode() {
    if (this.teslaCockpit) {
      if (this.teslaCockpit.isOpen) {
        this.teslaCockpit.close();
      } else {
        this.teslaCockpit.open();
      }
      return;
    }
    this.isTeslaMode = !this.isTeslaMode;
    localStorage.setItem('fabian_tesla_mode', String(this.isTeslaMode));
    document.body.classList.toggle('tesla-mode', this.isTeslaMode);
    this.updateTeslaButton(this.isTeslaMode);
    audio.confirm();
    this.showToast(this.isTeslaMode ? 'Tesla Touch HUD: Enabled' : 'Standard Viewport Restored');
  }

  updateTeslaButton(active) {
    const btn = this.dom.btnTeslaMode;
    if (btn) {
      btn.classList.toggle('active', active);
      const text = btn.querySelector('.btn-text');
      if (text) text.textContent = active ? 'Tesla ON' : 'Tesla HUD';
    }
  }

  toggleAudio() {
    const isMuted = audio.toggleMute();
    this.syncAudioButton();
    this.showToast(isMuted ? 'Acoustic Feedback Muted' : 'Tactile Audio Active');
  }

  setLanguage(lang) {
    audio.confirm();
    this.currentLang = switchLanguage(lang, this, true);
    if (this.bilingualHero && typeof this.bilingualHero.setLanguage === 'function') {
      this.bilingualHero.setLanguage(lang);
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  syncAudioButton() {
    const isMuted = audio.isMuted;
    const soundOn = this.dom.btnAudioToggle?.querySelector('.icon-sound-on');
    const soundOff = this.dom.btnAudioToggle?.querySelector('.icon-sound-off');
    if (soundOn && soundOff) {
      soundOn.classList.toggle('hidden', isMuted);
      soundOff.classList.toggle('hidden', !isMuted);
    }
  }

  cycleMorph() {
    if (!this.canvas3d) return;
    const current = this.canvas3d.activeMode;
    const next = (current + 1) % 3;
    this.canvas3d.setMorphState(next);
    this.syncMorphPills(next);
    const names = ['Novu Works Monogram', 'Möbius Growth Flow', 'Quantum AI Prism'];
    this.showToast(`3D Matrix: ${names[next]}`);
  }

  syncMorphPills(index) {
    document.querySelectorAll('.sculpture-pill, .morph-btn, .viz-morph-pill').forEach((b) => {
      const morphVal = parseInt(b.dataset.morph, 10);
      b.classList.toggle('active', morphVal === index);
    });
  }

  canTransitionDisplay() {
    if (this._supportsDisplayTransition !== undefined) return this._supportsDisplayTransition;
    if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
      this._supportsDisplayTransition = false;
      return false;
    }
    const probe = document.createElement('div');
    probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
    document.body.appendChild(probe);
    getComputedStyle(probe).display;
    probe.style.display = 'none';
    this._supportsDisplayTransition = getComputedStyle(probe).display === 'block';
    probe.remove();
    return this._supportsDisplayTransition;
  }

  showVisualizerHud() {
    const el = this.dom.visualizerHud;
    if (!el) return;
    el.removeAttribute('data-closing');
    el.hidden = false;
  }

  async hideVisualizerHud() {
    const el = this.dom.visualizerHud;
    if (!el || el.hidden) return;

    if (this.canTransitionDisplay()) {
      el.hidden = true;
    } else {
      el.setAttribute('data-closing', '');
    }

    const animations = el.getAnimations();
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 600)),
      ]);
    }

    if (el.hasAttribute('data-closing')) {
      el.removeAttribute('data-closing');
      el.hidden = true;
    }
  }

  enterVisualizerMode() {
    if (this.isVisualizerMode) return;
    this.isVisualizerMode = true;
    document.body.classList.add('visualizer-mode');

    if (this.canvas3d) {
      this.syncMorphPills(this.canvas3d.activeMode);
      this.canvas3d.setVisualizerMode(true);
    }

    this.showVisualizerHud();
    audio.confirm();
    this.showToast('✨ 3D Background Visualization · Drag to orbit · Scroll to zoom · Press ESC to exit');
  }

  async exitVisualizerMode() {
    if (!this.isVisualizerMode) return;
    this.isVisualizerMode = false;

    // Failsafe: Remove visualizer-mode class so UI is immediately interactable
    document.body.classList.remove('visualizer-mode');

    if (this.canvas3d) {
      this.canvas3d.setVisualizerMode(false);
    }

    await this.hideVisualizerHud();
    audio.confirm();
    this.showToast('Portfolio View Restored');
  }

  toggleVisualizerMode() {
    if (this.isVisualizerMode) {
      this.exitVisualizerMode();
    } else {
      this.enterVisualizerMode();
    }
  }

  showToast(message) {
    const banner = this.dom.toastBanner;
    if (!banner) return;
    banner.textContent = message;
    banner.classList.add('visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      banner.classList.remove('visible');
    }, 2400);
  }
}

// Boot application when DOM is ready (foolproof for ES modules)
function bootPortfolioApp() {
  if (window.portfolioApp) return;
  const instance = new FabianPortfolioApp();
  window.portfolioApp = instance;
  window.fabianApp = instance;
  window.app = instance; // Explicitly override <div id="app"> DOM global reference
  window.__fabianApp = instance;

  // Deep-linking shortcuts
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  setTimeout(() => {
    const viewParam = params.get('view');
    if (viewParam) {
      instance.switchView(viewParam);
    } else if (hash.startsWith('#view-') || hash.startsWith('#')) {
      const v = hash.replace('#view-', '').replace('#', '');
      if (['core', 'case-studies', 'projects', 'ai-lab', 'planner', 'dossier', 'intel-feed'].includes(v)) {
        instance.switchView(v);
      }
    }

    if (params.get('arcade') === '1' || hash === '#arcade') {
      instance.openArcadeGame();
    } else if (params.get('resume') === '1' || hash === '#resume') {
      instance.openResumeModal();
    } else if (params.get('hire') === '1' || hash === '#hire') {
      instance.openRecruiterModal();
    } else if (params.get('tailor') === '1' || hash === '#tailor') {
      instance.bilingualHero?.openIntro(false);
    } else if (params.get('hud') === '1' || params.get('tesla') === '1' || hash === '#tesla' || hash === '#hud') {
      instance.toggleTeslaMode();
    }
  }, 150);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootPortfolioApp);
} else {
  bootPortfolioApp();
}
