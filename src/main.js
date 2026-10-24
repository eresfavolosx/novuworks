// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Executive Portfolio & Interactive Atelier
//  Performance Marketing Lead · Level ICS4 · Technical Consultant
//  Minimalist Luxury · Fluid Motion & Choreographed Animations
// ─────────────────────────────────────────────────────────────

import { SpatialCanvas3D } from './canvas3d.js';
import { ArchitecturePlanner } from './planner.js';
import { CommandPalette } from './command-palette.js';
import { AIGrowthLab } from './ai-lab.js';
import { audio } from './audio.js';
import { DISCIPLINES, PROFILE } from './data.js';

class FabianPortfolioApp {
  constructor() {
    this.currentView = 'core';
    this.isTeslaMode = localStorage.getItem('fabian_tesla_mode') === 'true';
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
    };

    this.init();
  }

  init() {
    // 1. Dynamic Cursor Spotlight (Follows mouse/pointer coordinates smoothly)
    window.addEventListener('pointermove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });

    // 2. Render all dynamic content FIRST to guarantee DOM readiness
    try {
      this.renderCaseStudies();
      this.renderCompetencyMatrix();
    } catch (e) {
      console.error('Render error:', e);
    }

    // 3. Bind Event Handlers IMMEDIATELY
    try {
      this.bindEvents();
    } catch (e) {
      console.error('Events binding error:', e);
    }

    // 4. Initialize Interactive Components
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
      }
    } catch (e) {
      console.warn('3D Canvas safely in fallback mode:', e);
    }

    // 7. Apply saved preferences
    if (this.isTeslaMode) {
      document.body.classList.add('tesla-mode');
      this.updateTeslaButton(true);
    }
    this.syncAudioButton();

    // 8. Run initial metric count-up animation
    this.animateCounters();
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
        // EaseOutExpo: 1 - pow(2, -10 * progress)
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
  // Case Studies Rendering
  // ─────────────────────────────────────────────────────────────
  renderCaseStudies() {
    if (!this.dom.caseStudiesMount) return;
    this.dom.caseStudiesMount.innerHTML = PROFILE.caseStudies.map((cs) => `
      <div class="case-card" data-case-id="${cs.id}">
        <div class="case-badge-row">
          <span class="case-pill">${cs.badge}</span>
          <span class="case-company">${cs.company}</span>
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
          <span>Inspect Strategic Case Brief</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
        </button>
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
  // Modal Handlers (Case Studies & Disciplines)
  // ─────────────────────────────────────────────────────────────
  openCaseStudyModal(cs) {
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    this.dom.dialogContentBody.innerHTML = `
      <div class="dialog-header">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-light);">
            ${cs.badge} · ${cs.company}
          </span>
          <h2 id="modal-disc-title" style="font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 4px; line-height: 1.25;">
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
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px;">
          ${Object.entries(cs.metrics).map(([k, val]) => `
            <div style="background: #000000; border: 1px solid var(--hairline-gold); padding: 14px 18px; border-radius: var(--radius-sm);">
              <div style="font-size: 22px; font-weight: 800; color: var(--gold-light);">${val}</div>
              <div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-top: 3px;">${k}</div>
            </div>
          `).join('')}
        </div>

        <!-- 4-Pillar Narrative Cadence -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px;">
          <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid #ff5f56; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #ff857f; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">1. Context & Scaling Friction:</strong>
            <p style="font-size: 14px; color: #ffffff; line-height: 1.65;">${cs.challenge}</p>
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid #ffbd2e; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #ffcf66; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">2. Strategic Hypothesis:</strong>
            <p style="font-size: 14px; color: #ffffff; line-height: 1.65;">${cs.strategy}</p>
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid #3b82f6; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #93c5fd; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">3. Dev & Cross-Functional Execution:</strong>
            <p style="font-size: 14px; color: #ffffff; line-height: 1.65;">${cs.execution}</p>
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid #27c93f; padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
            <strong style="color: #6ee7b7; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">4. Bottom-Line Impact & Permanence:</strong>
            <p style="font-size: 14px; color: #ffffff; line-height: 1.65;">${cs.impact}</p>
          </div>
        </div>

        <a href="mailto:fabianvvicente1@gmail.com?subject=Strategic%20Role%20Inquiry%20-%20${encodeURIComponent(cs.title)}" class="luxury-btn primary-gold" style="width: 100%; justify-content: center;">
          <span>Schedule an Executive Growth Interview</span>
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

  openDisciplineModal(disc) {
    if (!this.dom.disciplineModal || !this.dom.dialogContentBody) return;
    this.dom.dialogContentBody.innerHTML = `
      <div class="dialog-header">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-light);">
            ${disc.number} · Architecture Discipline
          </span>
          <h2 id="modal-disc-title" style="font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 4px;">
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

        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--hairline); border-radius: var(--radius-sm); padding: 20px; margin-bottom: 24px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 12px;">Key Engineering Deliverables:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${disc.deliverables.map((item) => `
              <li style="display: flex; gap: 10px; font-size: 14px; color: #ffffff;">
                <span style="color: var(--gold-primary);">✓</span> ${item}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 28px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Production Tech Stack:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${disc.tech.map((t) => `
              <span style="font-family: var(--font-mono); font-size: 12px; padding: 6px 14px; background: rgba(255,255,255,0.04); border-radius: var(--radius-pill); border: 1px solid var(--hairline); color: #ffffff;">${t}</span>
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
  // Event Binding
  // ─────────────────────────────────────────────────────────────
  bindEvents() {
    // Navigation Tabs (Desktop & Mobile)
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) this.switchView(view);
      });
    });

    // Brand Home Link
    document.getElementById('brand-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('core');
    });

    // Hero Action Buttons
    document.getElementById('btn-explore-case-studies')?.addEventListener('click', () => {
      this.switchView('case-studies');
    });

    document.getElementById('btn-launch-ai-lab')?.addEventListener('click', () => {
      this.switchView('ai-lab');
    });

    // 3D Sculpture Switcher Pills
    document.querySelectorAll('.sculpture-pill, .morph-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sculpture-pill, .morph-btn').forEach((b) => b.classList.remove('active'));
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

    // Print Resume (PDF Export)
    this.dom.btnPrintResume?.addEventListener('click', () => {
      audio.confirm();
      window.print();
    });

    // Keyboard Shortcuts (1-5 for Views)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') this.switchView('core');
      if (e.key === '2') this.switchView('case-studies');
      if (e.key === '3') this.switchView('ai-lab');
      if (e.key === '4') this.switchView('planner');
      if (e.key === '5') this.switchView('dossier');
    });

    // Modal click-outside backdrop dismiss
    this.dom.disciplineModal?.addEventListener('click', (e) => {
      if (e.target === this.dom.disciplineModal) {
        this.dom.disciplineModal.close();
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // View Switcher with Choreographed Animations
  // ─────────────────────────────────────────────────────────────
  switchView(viewName) {
    if (this.currentView === viewName) return;
    this.currentView = viewName;
    audio.click(1300);

    // Update Nav buttons
    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Fade and slide views
    const views = ['core', 'case-studies', 'ai-lab', 'planner', 'dossier'];
    views.forEach((v) => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          // Force reflow for smooth CSS entry transition
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

    // Dynamic 3D Camera Positioning based on view context
    if (this.canvas3d && this.canvas3d.camera) {
      if (viewName === 'core') this.canvas3d.camera.position.set(0, 0, 46);
      else if (viewName === 'case-studies') this.canvas3d.camera.position.set(0, 14, 52);
      else if (viewName === 'ai-lab') this.canvas3d.camera.position.set(-12, 6, 50);
      else if (viewName === 'planner') this.canvas3d.camera.position.set(14, 5, 52);
      else this.canvas3d.camera.position.set(-16, 4, 52);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─────────────────────────────────────────────────────────────
  // Preferences & Toggles
  // ─────────────────────────────────────────────────────────────
  toggleTeslaMode() {
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
    document.querySelectorAll('.sculpture-pill, .morph-btn').forEach((b) => {
      b.classList.toggle('active', parseInt(b.dataset.morph, 10) === next);
    });
    const names = ['NW Monogram', 'Möbius Growth Flow', 'Quantum AI Prism'];
    this.showToast(`3D Matrix: ${names[next]}`);
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

// Boot application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new FabianPortfolioApp();
});
