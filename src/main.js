// ─────────────────────────────────────────────────────────────
//  Novu Works — Main Application Orchestrator & Executive HUD
//  Fabián Vélez Vicente
//  Performance Marketing Lead · Technical Consultant · AI Systems
// ─────────────────────────────────────────────────────────────

import { SpatialCanvas3D } from './canvas3d.js';
import { ArchitecturePlanner } from './planner.js';
import { CommandPalette } from './command-palette.js';
import { LiveTelemetryManager } from './live-telemetry.js';
import { AIGrowthLab } from './ai-lab.js';
import { audio } from './audio.js';
import { DISCIPLINES, PROFILE, ROI_PRESETS } from './data.js';

class NovuApp {
  constructor() {
    this.currentView = 'core';
    this.isTeslaMode = localStorage.getItem('novu_tesla_mode') === 'true';
    this.isFoldMode = false;

    this.dom = {
      webglContainer: document.getElementById('webgl-container'),
      plannerMount: document.getElementById('planner-mount-point'),
      caseStudiesMount: document.getElementById('case-studies-mount'),
      aiLabMount: document.getElementById('ai-lab-mount'),
      competencyMatrixMount: document.getElementById('competency-matrix-mount'),
      disciplineModal: document.getElementById('discipline-modal'),
      dialogContentBody: document.getElementById('dialog-content-body'),
      toastBanner: document.getElementById('toast-banner'),
      btnTeslaMode: document.getElementById('btn-tesla-mode'),
      btnAudioToggle: document.getElementById('btn-audio-toggle'),
      btnCmdPalette: document.getElementById('btn-cmd-palette'),
      btnPrintResume: document.getElementById('btn-print-resume'),
      telemFps: document.getElementById('telem-fps'),
      telemDraws: document.getElementById('telem-draws'),
    };

    this.init();
  }

  init() {
    // 1. Initialize 3D Engine
    this.canvas3d = new SpatialCanvas3D(this.dom.webglContainer, (discipline) => {
      this.openDisciplineModal(discipline);
    });

    this.canvas3d.onTelemetryUpdate = (metrics) => {
      if (this.dom.telemFps) this.dom.telemFps.textContent = `${metrics.fps} FPS`;
      if (this.dom.telemDraws) this.dom.telemDraws.textContent = `${metrics.drawCalls}`;
    };

    // 2. Initialize Architecture Planner & ROI Tool
    this.planner = new ArchitecturePlanner(this.dom.plannerMount, (pillarId) => {
      this.canvas3d.focusPillar(pillarId);
    });

    // 3. Initialize AI Prompt Engineering Lab
    this.aiLab = new AIGrowthLab(this.dom.aiLabMount);

    // 4. Initialize Live Telemetry & Feeds
    this.telemetry = new LiveTelemetryManager((data) => {
      this.updateLiveHud(data);
    });

    // 5. Initialize Command Palette
    this.cmdPalette = new CommandPalette({
      onOpenHire: () => this.switchView('dossier'),
      onOpenPlanner: () => this.switchView('planner'),
      onToggleTesla: () => this.toggleTeslaMode(),
      onCycleMorph: () => this.cycleMorph(),
      onSelectDiscipline: (d) => this.openDisciplineModal(d),
      showToast: (msg) => this.showToast(msg),
    });

    // 6. Render Sections & Modals
    this.renderCaseStudies();
    this.renderCompetencyMatrix();
    this.renderLiveHudBar();

    // 7. Bind Event Handlers
    this.bindEvents();

    // Apply saved Tesla Mode if previously enabled
    if (this.isTeslaMode) {
      document.body.classList.add('tesla-mode');
      this.updateTeslaButton(true);
    }

    // Audio status sync
    this.syncAudioButton();
  }

  renderLiveHudBar() {
    const hudBar = document.createElement('div');
    hudBar.id = 'live-telemetry-hud';
    hudBar.className = 'live-hud-strip glass-bar';
    hudBar.innerHTML = `
      <div class="hud-stream-item">
        <span class="hud-label">PR HQ CLOCK</span>
        <span class="hud-data" id="hud-pr-time">--:--:-- AST</span>
      </div>
      <div class="hud-stream-item">
        <span class="hud-label">EDGE LATENCY</span>
        <span class="hud-data pulse-text" id="hud-ping">24ms (Optimal)</span>
      </div>
      <div class="hud-stream-item market-ticker">
        <span class="hud-label">MARKET FEEDS</span>
        <span class="hud-data" id="hud-market">BTC $-- | ETH $-- | SOL $--</span>
      </div>
      <div class="hud-stream-item hw-detector">
        <span class="hud-label">HARDWARE / GPU</span>
        <span class="hud-data" id="hud-gpu">Detecting...</span>
      </div>
      <div class="hud-stream-item fold-control">
        <button type="button" class="fold-btn" id="btn-toggle-fold" title="Toggle Foldable Dual-Screen Simulation">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
          <span id="fold-btn-text">Fold Mode (135°)</span>
        </button>
      </div>
    `;

    const main = document.querySelector('.main-viewport');
    main.parentNode.insertBefore(hudBar, main);

    document.getElementById('btn-toggle-fold')?.addEventListener('click', () => {
      this.toggleFoldMode();
    });
  }

  updateLiveHud(data) {
    const prTimeEl = document.getElementById('hud-pr-time');
    const pingEl = document.getElementById('hud-ping');
    const marketEl = document.getElementById('hud-market');
    const gpuEl = document.getElementById('hud-gpu');

    if (prTimeEl) prTimeEl.textContent = data.clocks.prTime;
    if (pingEl) pingEl.textContent = `${data.ping.edgeLatency}ms (${data.ping.status})`;
    if (marketEl) {
      marketEl.textContent = `BTC $${data.markets.btc} · ETH $${data.markets.eth} · SOL $${data.markets.sol}`;
    }
    if (gpuEl) {
      gpuEl.textContent = `${data.hardware.gpu.slice(0, 24)} · ${data.hardware.battery}`;
    }
  }

  toggleFoldMode() {
    this.isFoldMode = !this.isFoldMode;
    const active = this.telemetry.toggleVirtualFold(this.isFoldMode);
    const btnText = document.getElementById('fold-btn-text');
    if (btnText) {
      btnText.textContent = active ? 'Flat Mode (180°)' : 'Fold Mode (135°)';
    }
    audio.confirm();
    this.showToast(active ? 'Foldable Dual-Screen Mode: Active' : 'Standard Viewport Restored');
  }

  renderCaseStudies() {
    this.dom.caseStudiesMount.innerHTML = PROFILE.caseStudies.map((cs) => `
      <div class="case-card glass-panel" data-case-id="${cs.id}" style="--case-color: ${cs.color};">
        <div class="case-badge-row">
          <span class="case-pill" style="color: ${cs.color}; border-color: ${cs.color};">${cs.badge}</span>
          <span class="case-company">${cs.company}</span>
        </div>
        <h3 class="case-title">${cs.title}</h3>
        <p class="case-summary">${cs.summary}</p>

        <!-- 3 Executive Metrics -->
        <div class="case-metric-row">
          ${Object.entries(cs.metrics).map(([k, val]) => `
            <div class="case-metric-box">
              <span class="case-m-val text-gradient">${val}</span>
              <span class="case-m-key">${k.toUpperCase()}</span>
            </div>
          `).join('')}
        </div>

        <div class="case-cta-strip">
          <span>Read Full 4-Pillar Architectural Breakdown</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    `).join('');

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

  renderCompetencyMatrix() {
    this.dom.competencyMatrixMount.innerHTML = `
      <div class="comp-matrix-grid">
        ${PROFILE.coreCompetencyMatrix.map((col) => `
          <div class="comp-matrix-col">
            <h4 class="comp-col-title">${col.category}</h4>
            <ul class="comp-skill-list">
              ${col.skills.map((s) => `<li><span class="comp-bullet">▹</span> ${s}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  openCaseStudyModal(cs) {
    this.dom.dialogContentBody.innerHTML = `
      <button type="button" class="modal-close-btn" id="btn-close-modal" aria-label="Close modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; color: ${cs.color}; margin-bottom: 6px;">
        ${cs.badge} · ${cs.company}
      </div>
      <h2 id="modal-disc-title" style="font-family: var(--font-display); font-size: 2.1rem; font-weight: 800; margin-bottom: 12px;">${cs.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 24px;">${cs.summary}</p>

      <!-- Key Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px;">
        ${Object.entries(cs.metrics).map(([k, val]) => `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); padding: 14px; border-radius: 8px;">
            <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: ${cs.color};">${val}</div>
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">${k}</div>
          </div>
        `).join('')}
      </div>

      <!-- 4-Pillar Narrative Cadence -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px;">
        <div style="background: rgba(0,0,0,0.25); border-left: 3px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
          <strong style="color: #fca5a5; font-size: 0.85rem; text-transform: uppercase;">1. Context & Friction:</strong>
          <p style="font-size: 0.92rem; color: var(--text-main); margin-top: 4px;">${cs.challenge}</p>
        </div>

        <div style="background: rgba(0,0,0,0.25); border-left: 3px solid #f59e0b; padding: 12px 16px; border-radius: 0 8px 8px 0;">
          <strong style="color: #fde68a; font-size: 0.85rem; text-transform: uppercase;">2. Strategic Hypothesis:</strong>
          <p style="font-size: 0.92rem; color: var(--text-main); margin-top: 4px;">${cs.strategy}</p>
        </div>

        <div style="background: rgba(0,0,0,0.25); border-left: 3px solid #3b82f6; padding: 12px 16px; border-radius: 0 8px 8px 0;">
          <strong style="color: #93c5fd; font-size: 0.85rem; text-transform: uppercase;">3. Execution & Cross-Functional Delivery:</strong>
          <p style="font-size: 0.92rem; color: var(--text-main); margin-top: 4px;">${cs.execution}</p>
        </div>

        <div style="background: rgba(0,0,0,0.25); border-left: 3px solid #10b981; padding: 12px 16px; border-radius: 0 8px 8px 0;">
          <strong style="color: #6ee7b7; font-size: 0.85rem; text-transform: uppercase;">4. Bottom-Line Impact & Permanent Infrastructure:</strong>
          <p style="font-size: 0.92rem; color: var(--text-main); margin-top: 4px;">${cs.impact}</p>
        </div>
      </div>

      <div style="display: flex; gap: 14px;">
        <a href="mailto:fabianvvicente1@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(cs.title)}" class="primary-btn" style="flex: 1;">
          <span>Discuss Similar Growth Architecture for Your Company</span>
        </a>
      </div>
    `;

    this.dom.disciplineModal.showModal();

    this.dom.dialogContentBody.querySelector('#btn-close-modal')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      audio.click(800);
    });
  }

  openDisciplineModal(disc) {
    this.dom.dialogContentBody.innerHTML = `
      <button type="button" class="modal-close-btn" id="btn-close-modal" aria-label="Close modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="modal-badge" style="color: ${disc.color}; font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">
        ${disc.number} · Core Discipline
      </div>
      <h2 id="modal-disc-title" style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; margin-bottom: 8px;">${disc.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 24px;">${disc.subtitle}</p>

      <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; text-transform: uppercase; color: #a5b4fc; margin-bottom: 8px;">Key Deliverables & Architecture:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${disc.deliverables.map((item) => `<li style="display: flex; gap: 8px; font-size: 0.92rem; color: var(--text-main);"><span style="color:${disc.color};">✔</span> ${item}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px;">Core Tech Stack:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${disc.tech.map((t) => `<span style="font-family: var(--font-mono); font-size: 0.8rem; padding: 4px 10px; background: rgba(255,255,255,0.06); border-radius: 4px; border: 1px solid var(--border-subtle);">${t}</span>`).join('')}
        </div>
      </div>

      <div style="background: rgba(139, 82, 200, 0.1); border-left: 3px solid ${disc.color}; padding: 14px 18px; margin-bottom: 28px; border-radius: 0 8px 8px 0;">
        <strong style="color: #fff; font-size: 0.9rem;">Proven Portfolio Impact:</strong>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${disc.metrics}</p>
      </div>

      <div style="display: flex; gap: 14px;">
        <a href="mailto:fabianvvicente1@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(disc.title)}" class="primary-btn" style="flex: 1;">
          <span>Request Technical Strategy Session</span>
        </a>
        <button type="button" class="secondary-btn" id="btn-focus-in-3d">
          <span>Focus in 3D Core</span>
        </button>
      </div>
    `;

    this.dom.disciplineModal.showModal();

    this.dom.dialogContentBody.querySelector('#btn-close-modal')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      audio.click(800);
    });

    this.dom.dialogContentBody.querySelector('#btn-focus-in-3d')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      this.switchView('core');
      this.canvas3d.focusPillar(disc.id);
    });
  }

  bindEvents() {
    // Navigation Tabs (Desktop & Mobile)
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // Brand click returns to core view
    document.getElementById('brand-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('core');
    });

    // Hero buttons
    document.getElementById('btn-explore-case-studies')?.addEventListener('click', () => {
      this.switchView('case-studies');
    });

    document.getElementById('btn-launch-ai-lab')?.addEventListener('click', () => {
      this.switchView('ai-lab');
    });

    document.getElementById('btn-view-dossier')?.addEventListener('click', () => {
      this.switchView('dossier');
    });

    // 3D Morph buttons
    document.querySelectorAll('.morph-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.morph-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const morphIndex = parseInt(btn.dataset.morph, 10);
        this.canvas3d.setMorphState(morphIndex);
      });
    });

    // Tesla Mode Toggle
    this.dom.btnTeslaMode?.addEventListener('click', () => {
      this.toggleTeslaMode();
    });

    // Audio Toggle
    this.dom.btnAudioToggle?.addEventListener('click', () => {
      this.toggleAudio();
    });

    // Command Palette Trigger
    this.dom.btnCmdPalette?.addEventListener('click', () => {
      this.cmdPalette.open();
    });

    // Print Resume
    this.dom.btnPrintResume?.addEventListener('click', () => {
      audio.confirm();
      window.print();
    });

    // Global Key Shortcuts (1-5 to switch views)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') this.switchView('core');
      if (e.key === '2') this.switchView('case-studies');
      if (e.key === '3') this.switchView('ai-lab');
      if (e.key === '4') this.switchView('planner');
      if (e.key === '5') this.switchView('dossier');
    });

    // Modal light-dismiss on backdrop click
    this.dom.disciplineModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.disciplineModal) {
        this.dom.disciplineModal.close();
      }
    });
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;
    this.currentView = viewName;
    audio.click(1300);

    // Update Nav buttons
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Toggle View Sections
    const views = ['core', 'case-studies', 'ai-lab', 'planner', 'dossier'];
    views.forEach((v) => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          el.classList.add('active');
        } else {
          el.classList.add('hidden');
          el.classList.remove('active');
        }
      }
    });

    // Camera positioning based on view
    if (viewName === 'core') {
      this.canvas3d.camera.position.set(0, 0, 48);
    } else if (viewName === 'case-studies') {
      this.canvas3d.camera.position.set(0, 16, 54);
    } else if (viewName === 'ai-lab') {
      this.canvas3d.camera.position.set(-14, 8, 52);
    } else if (viewName === 'planner') {
      this.canvas3d.camera.position.set(16, 6, 56);
    } else {
      this.canvas3d.camera.position.set(-18, 5, 54);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleTeslaMode() {
    this.isTeslaMode = !this.isTeslaMode;
    localStorage.setItem('novu_tesla_mode', String(this.isTeslaMode));
    document.body.classList.toggle('tesla-mode', this.isTeslaMode);
    this.updateTeslaButton(this.isTeslaMode);
    audio.confirm();
    this.showToast(this.isTeslaMode ? 'Tesla In-Car Touch HUD Activated' : 'Tesla Mode Disabled');
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
    this.showToast(isMuted ? 'Audio Feedback Muted' : 'Executive Audio Active');
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
    const current = this.canvas3d.targetMorph;
    const next = (current + 1) % 3;
    this.canvas3d.setMorphState(next);
    document.querySelectorAll('.morph-btn').forEach((b) => {
      b.classList.toggle('active', parseInt(b.dataset.morph, 10) === next);
    });
    this.showToast(`3D Matrix: ${['NW Monogram', 'Growth Topology', 'Quantum AI Core'][next]}`);
  }

  showToast(message) {
    const banner = this.dom.toastBanner;
    if (!banner) return;
    banner.textContent = message;
    banner.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      banner.classList.remove('show');
    }, 2400);
  }
}

// Boot application
window.addEventListener('DOMContentLoaded', () => {
  new NovuApp();
});
