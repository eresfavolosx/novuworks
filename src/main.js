// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Executive Portfolio & Interactive HUD
//  Performance Marketing Lead · Technical Consultant · AI Engineer
// ─────────────────────────────────────────────────────────────

import { SpatialCanvas3D } from './canvas3d.js';
import { ArchitecturePlanner } from './planner.js';
import { CommandPalette } from './command-palette.js';
import { LiveTelemetryManager } from './live-telemetry.js';
import { AIGrowthLab } from './ai-lab.js';
import { audio } from './audio.js';
import { DISCIPLINES, PROFILE } from './data.js';

class FabianPortfolioApp {
  constructor() {
    this.currentView = 'core';
    this.isTeslaMode = localStorage.getItem('fabian_tesla_mode') === 'true';
    this.isFoldMode = false;
    this.canvas3d = null;

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
    // 1. Render all HTML content FIRST to guarantee DOM readiness
    try {
      this.renderCaseStudies();
      this.renderCompetencyMatrix();
      this.renderLiveHudBar();
    } catch (e) {
      console.error('Render error:', e);
    }

    // 2. Bind Event Handlers IMMEDIATELY so buttons are 100% responsive
    try {
      this.bindEvents();
    } catch (e) {
      console.error('Events binding error:', e);
    }

    // 3. Initialize Interactive Components
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
      if (this.dom.aiLabMount) {
        this.aiLab = new AIGrowthLab(this.dom.aiLabMount);
      }
    } catch (e) {
      console.warn('AI Lab init caught:', e);
    }

    // 4. Initialize Live Telemetry
    try {
      this.telemetry = new LiveTelemetryManager((data) => {
        this.updateLiveHud(data);
      });
    } catch (e) {
      console.warn('Telemetry init caught:', e);
    }

    // 5. Initialize Command Palette
    try {
      this.cmdPalette = new CommandPalette({
        onOpenHire: () => this.switchView('dossier'),
        onOpenPlanner: () => this.switchView('planner'),
        onToggleTesla: () => this.toggleTeslaMode(),
        onCycleMorph: () => this.cycleMorph(),
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

        if (this.canvas3d && this.canvas3d.isAvailable) {
          this.canvas3d.onTelemetryUpdate = (metrics) => {
            if (this.dom.telemFps) this.dom.telemFps.textContent = `${metrics.fps} FPS`;
            if (this.dom.telemDraws) this.dom.telemDraws.textContent = `${metrics.drawCalls}`;
          };
        }
      }
    } catch (e) {
      console.warn('3D Canvas safely in fallback mode:', e);
    }

    // 7. Apply saved states
    if (this.isTeslaMode) {
      document.body.classList.add('tesla-mode');
      this.updateTeslaButton(true);
    }
    this.syncAudioButton();
  }

  renderLiveHudBar() {
    const existing = document.getElementById('live-telemetry-hud');
    if (existing) existing.remove();

    const hudBar = document.createElement('div');
    hudBar.id = 'live-telemetry-hud';
    hudBar.className = 'live-hud-strip glass-bar';
    hudBar.innerHTML = `
      <div class="hud-stream-item">
        <span class="hud-label">PUERTO RICO HQ</span>
        <span class="hud-data" id="hud-pr-time">21:45:00 AST</span>
      </div>
      <div class="hud-stream-item">
        <span class="hud-label">EDGE LATENCY</span>
        <span class="hud-data pulse-text" id="hud-ping">24ms (Optimal)</span>
      </div>
      <div class="hud-stream-item market-ticker">
        <span class="hud-label">LIVE DATA</span>
        <span class="hud-data" id="hud-market">BTC $80,800 · ETH $2,375 · SOL $102.4</span>
      </div>
      <div class="hud-stream-item hw-detector">
        <span class="hud-label">DEVICE & GPU</span>
        <span class="hud-data" id="hud-gpu">Hardware Accelerated</span>
      </div>
      <div class="hud-stream-item fold-control">
        <button type="button" class="fold-btn" id="btn-toggle-fold" title="Toggle Foldable Dual-Screen Mode">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
          <span id="fold-btn-text">Fold Mode (135°)</span>
        </button>
      </div>
    `;

    const main = document.querySelector('.main-viewport');
    if (main && main.parentNode) {
      main.parentNode.insertBefore(hudBar, main);
    }

    document.getElementById('btn-toggle-fold')?.addEventListener('click', () => {
      this.toggleFoldMode();
    });
  }

  updateLiveHud(data) {
    const prTimeEl = document.getElementById('hud-pr-time');
    const pingEl = document.getElementById('hud-ping');
    const marketEl = document.getElementById('hud-market');
    const gpuEl = document.getElementById('hud-gpu');

    if (prTimeEl && data.clocks) prTimeEl.textContent = data.clocks.prTime;
    if (pingEl && data.ping) pingEl.textContent = `${data.ping.edgeLatency}ms (${data.ping.status})`;
    if (marketEl && data.markets) {
      marketEl.textContent = `BTC $${data.markets.btc} · ETH $${data.markets.eth} · SOL $${data.markets.sol}`;
    }
    if (gpuEl && data.hardware) {
      gpuEl.textContent = `${data.hardware.gpu.slice(0, 24)} · ${data.hardware.battery}`;
    }
  }

  toggleFoldMode() {
    this.isFoldMode = !this.isFoldMode;
    let active = this.isFoldMode;
    if (this.telemetry) {
      active = this.telemetry.toggleVirtualFold(this.isFoldMode);
    } else {
      document.body.classList.toggle('virtual-fold-mode', this.isFoldMode);
    }

    const btnText = document.getElementById('fold-btn-text');
    if (btnText) {
      btnText.textContent = active ? 'Flat Mode (180°)' : 'Fold Mode (135°)';
    }
    audio.confirm();
    this.showToast(active ? 'Foldable Dual-Screen Posture: Active' : 'Standard Viewport Restored');
  }

  renderCaseStudies() {
    if (!this.dom.caseStudiesMount) return;
    this.dom.caseStudiesMount.innerHTML = PROFILE.caseStudies.map((cs) => `
      <div class="case-card solid-card" data-case-id="${cs.id}" style="--case-color: ${cs.color};">
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
          <span>Read Full Architectural Breakdown</span>
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
    if (!this.dom.competencyMatrixMount) return;
    this.dom.competencyMatrixMount.innerHTML = `
      <div class="comp-matrix-grid">
        ${PROFILE.coreCompetencyMatrix.map((col) => `
          <div class="comp-matrix-col solid-card">
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
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    this.dom.dialogContentBody.innerHTML = `
      <button type="button" class="modal-close-btn" id="btn-close-modal" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: ${cs.color}; margin-bottom: 6px;">
        ${cs.badge} · ${cs.company}
      </div>
      <h2 id="modal-disc-title" style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.2;">${cs.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 24px;">${cs.summary}</p>

      <!-- Key Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 24px;">
        ${Object.entries(cs.metrics).map(([k, val]) => `
          <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 10px;">
            <div style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: #ffffff;">${val}</div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #a5b4fc; text-transform: uppercase; margin-top: 4px;">${k}</div>
          </div>
        `).join('')}
      </div>

      <!-- 4-Pillar Narrative Cadence -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px;">
        <div style="background: rgba(18, 14, 30, 0.9); border-left: 4px solid #ef4444; padding: 16px; border-radius: 0 10px 10px 0;">
          <strong style="color: #fca5a5; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.04em;">1. Context & Scaling Friction:</strong>
          <p style="font-size: 0.98rem; color: #ffffff; margin-top: 6px; line-height: 1.6;">${cs.challenge}</p>
        </div>

        <div style="background: rgba(18, 14, 30, 0.9); border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 10px 10px 0;">
          <strong style="color: #fde68a; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.04em;">2. Strategic Hypothesis:</strong>
          <p style="font-size: 0.98rem; color: #ffffff; margin-top: 6px; line-height: 1.6;">${cs.strategy}</p>
        </div>

        <div style="background: rgba(18, 14, 30, 0.9); border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 10px 10px 0;">
          <strong style="color: #93c5fd; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.04em;">3. Execution & Cross-Functional Delivery:</strong>
          <p style="font-size: 0.98rem; color: #ffffff; margin-top: 6px; line-height: 1.6;">${cs.execution}</p>
        </div>

        <div style="background: rgba(18, 14, 30, 0.9); border-left: 4px solid #10b981; padding: 16px; border-radius: 0 10px 10px 0;">
          <strong style="color: #6ee7b7; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.04em;">4. Bottom-Line Impact & Permanent Infrastructure:</strong>
          <p style="font-size: 0.98rem; color: #ffffff; margin-top: 6px; line-height: 1.6;">${cs.impact}</p>
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="mailto:fabianvvicente1@gmail.com?subject=Growth%20Engineering%20Inquiry%20-%20${encodeURIComponent(cs.title)}" class="primary-btn" style="flex: 1;">
          <span>Contact Fabián to Discuss Similar Architecture</span>
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
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    this.dom.dialogContentBody.innerHTML = `
      <button type="button" class="modal-close-btn" id="btn-close-modal" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="modal-badge" style="color: ${disc.color}; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
        ${disc.number} · Core Discipline
      </div>
      <h2 id="modal-disc-title" style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">${disc.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 24px;">${disc.subtitle}</p>

      <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.85rem; text-transform: uppercase; color: #a5b4fc; margin-bottom: 10px;">Key Deliverables:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${disc.deliverables.map((item) => `<li style="display: flex; gap: 10px; font-size: 0.96rem; color: #ffffff;"><span style="color:${disc.color}; font-weight: bold;">✔</span> ${item}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px;">Core Tech Stack:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${disc.tech.map((t) => `<span style="font-family: var(--font-mono); font-size: 0.84rem; padding: 6px 12px; background: rgba(255,255,255,0.08); border-radius: 6px; border: 1px solid var(--border-subtle); color: #ffffff;">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="mailto:fabianvvicente1@gmail.com?subject=Consulting%20Inquiry%20-%20${encodeURIComponent(disc.title)}" class="primary-btn" style="flex: 1;">
          <span>Schedule Strategy Session</span>
        </a>
      </div>
    `;

    this.dom.disciplineModal.showModal();

    this.dom.dialogContentBody.querySelector('#btn-close-modal')?.addEventListener('click', () => {
      this.dom.disciplineModal.close();
      audio.click(800);
    });
  }

  bindEvents() {
    // Navigation Tabs (Desktop & Mobile)
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) this.switchView(view);
      });
    });

    // Brand click returns to core view
    document.getElementById('brand-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('core');
    });

    // Hero action buttons
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
        if (this.canvas3d) this.canvas3d.setMorphState(morphIndex);
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
      if (this.cmdPalette) this.cmdPalette.open();
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

    // Adjust 3D Camera if canvas exists
    if (this.canvas3d && this.canvas3d.camera) {
      if (viewName === 'core') this.canvas3d.camera.position.set(0, 0, 48);
      else if (viewName === 'case-studies') this.canvas3d.camera.position.set(0, 16, 54);
      else if (viewName === 'ai-lab') this.canvas3d.camera.position.set(-14, 8, 52);
      else if (viewName === 'planner') this.canvas3d.camera.position.set(16, 6, 56);
      else this.canvas3d.camera.position.set(-18, 5, 54);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleTeslaMode() {
    this.isTeslaMode = !this.isTeslaMode;
    localStorage.setItem('fabian_tesla_mode', String(this.isTeslaMode));
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
    if (!this.canvas3d) return;
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

// Boot application immediately
window.addEventListener('DOMContentLoaded', () => {
  new FabianPortfolioApp();
});
