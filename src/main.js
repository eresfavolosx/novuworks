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
import { LOGOS } from './company-logos.js';
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
      revopsTerminalMount: document.getElementById('revops-terminal-mount'),
      intelFeedMount: document.getElementById('intel-feed-mount'),
      caseStudiesMount: document.getElementById('case-studies-mount'),
      aiLabMount: document.getElementById('ai-lab-mount'),
      competencyMatrixMount: document.getElementById('competency-matrix-mount'),
      companyLogoStripMount: document.getElementById('company-logo-strip-mount'),
      recModalLogosMount: document.getElementById('rec-modal-logos-mount'),
      disciplineModal: document.getElementById('discipline-modal'),
      dialogContentBody: document.getElementById('dialog-content-body'),
      resumeModal: document.getElementById('resume-export-modal'),
      recruiterModal: document.getElementById('recruiter-fasttrack-modal'),
      arcadeModal: document.getElementById('cyber-arcade-modal'),
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
      this.renderCompanyLogos();
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
        onOpenPlanner: () => this.switchView('planner'),
        onOpenFeed: () => this.switchView('intel-feed'),
        onOpenArcade: () => this.openArcadeGame(),
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
  // Company Logo Strip Rendering
  // ─────────────────────────────────────────────────────────────
  renderCompanyLogos() {
    const stripHtml = `
      <div class="logo-strip-inner">
        <span class="logo-strip-label">VERIFIED COMMERCIAL TRACK RECORD & ACCREDITATION:</span>
        <div class="logo-strip-row">
          <div class="logo-badge-item" title="Money Group (Media Buyer, $1B+ Scope)">
            ${LOGOS.moneyGroup}
          </div>
          <div class="logo-badge-item" title="Red Ventures (Growth / SEO Analyst, edX)">
            ${LOGOS.redVentures}
          </div>
          <div class="logo-badge-item" title="edX Platform (40M+ Telemetry Sessions)">
            ${LOGOS.edx}
          </div>
          <div class="logo-badge-item" title="Viva Advertising (Co-Founder, $10M+ Pipeline)">
            ${LOGOS.vivaAdvertising}
          </div>
          <div class="logo-badge-item" title="Link Puerto Rico (100+ Relational Databases)">
            ${LOGOS.linkPR}
          </div>
          <div class="logo-badge-item" title="Novu Works (80+ Organizations Mentored)">
            ${LOGOS.novuWorks}
          </div>
          <div class="logo-badge-item" title="Stanford University Innovation Fellows">
            ${LOGOS.stanford}
          </div>
          <div class="logo-badge-item" title="Universidad Politécnica de PR (B.S. Comp Eng 4.0 GPA)">
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
          <div class="modal-logo-cell">${LOGOS.moneyGroup}</div>
          <div class="modal-logo-cell">${LOGOS.redVentures}</div>
          <div class="modal-logo-cell">${LOGOS.edx}</div>
          <div class="modal-logo-cell">${LOGOS.vivaAdvertising}</div>
          <div class="modal-logo-cell">${LOGOS.linkPR}</div>
          <div class="modal-logo-cell">${LOGOS.novuWorks}</div>
          <div class="modal-logo-cell">${LOGOS.stanford}</div>
          <div class="modal-logo-cell">${LOGOS.politecnica}</div>
        </div>
      `;
    }

    this.renderExperienceLogos();
  }

  // ─────────────────────────────────────────────────────────────
  // Inject Logos into Dossier Experience & Printable Resume
  // ─────────────────────────────────────────────────────────────
  renderExperienceLogos() {
    const expLogos = {
      'Money Group': LOGOS.moneyGroup,
      'Red Ventures': LOGOS.redVentures,
      'Viva Advertising': LOGOS.vivaAdvertising,
      'Link Puerto Rico': LOGOS.linkPR,
    };

    // Inject into Dossier timeline
    document.querySelectorAll('.exp-item').forEach((item) => {
      const compEl = item.querySelector('.exp-company');
      if (compEl) {
        const compName = compEl.textContent.trim();
        if (expLogos[compName] && !item.querySelector('.exp-company-logo-slot')) {
          const logoDiv = document.createElement('div');
          logoDiv.className = 'exp-company-logo-slot';
          logoDiv.innerHTML = expLogos[compName];
          const header = item.querySelector('.exp-header');
          if (header) {
            header.insertBefore(logoDiv, header.firstChild);
          }
        }
      }
    });

    // Inject into Printable Resume
    document.querySelectorAll('.res-exp-block').forEach((block) => {
      const compEl = block.querySelector('.res-company');
      if (compEl) {
        const compName = compEl.textContent.trim();
        if (expLogos[compName] && !block.querySelector('.res-company-logo-slot')) {
          const logoDiv = document.createElement('div');
          logoDiv.className = 'res-company-logo-slot';
          logoDiv.innerHTML = expLogos[compName];
          const head = block.querySelector('.res-exp-head');
          if (head) {
            head.insertBefore(logoDiv, head.firstChild);
          }
        }
      }
    });
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
            <div class="case-header-left">
              <div class="case-card-logo">${logoSvg}</div>
              <span class="case-pill">${cs.badge}</span>
            </div>
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
  // Recruiter Fast-Track (60s Scorecard) Modal
  // ─────────────────────────────────────────────────────────────
  openRecruiterModal() {
    if (!this.dom.recruiterModal) return;
    this.dom.recruiterModal.showModal();
    audio.confirm();
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
    this.dom.arcadeModal.showModal();
    audio.confirm();
    this.arcadeGame = new CyberArcadeGame(this.dom.arcadeModal, () => {
      this.closeArcadeGame();
    });
  }

  closeArcadeGame() {
    if (!this.dom.arcadeModal) return;
    if (this.arcadeGame) {
      this.arcadeGame.stop();
      this.arcadeGame = null;
    }
    this.dom.arcadeModal.close();
    audio.click(750);
  }

  copyRecruiterNotes() {
    const text = `CANDIDATE: Fabián Vélez Vicente
TARGET ROLES: Growth Engineering Lead / RevOps Analytics Lead / Head of Growth / Applied AI Lead
LOCATION: San Juan, PR (US Remote / Worldwide)
EMAIL: fabianvvicente1@gmail.com
LINKEDIN: https://linkedin.com/in/fabian-velez-vicente
GITHUB: https://github.com/eresfavolosx
PORTFOLIO: https://novu.works

KEY EXECUTIVE PROOF POINTS:
• Money Group: Delivered at 122% of quarterly bonus target ($4,575 vs $3,750 base) within a $1B+ portfolio scope; restructured partner unit payouts from $125 to $250; automated 20+ enterprise LLM telemetry agents.
• Red Ventures (edX): Led content & SEO intelligence for multi-million-page edX platform; normalized raw telemetry across 40M+ user sessions via Databricks SQL & Python; refreshed 1,250+ priority pages (+50% search lift, +19% YoY conversions).
• Viva Advertising: Co-Founder managing $2M+ direct ad spend and 4B+ impressions across 150+ B2B commercial accounts; generated $10M+ pipeline; slashed churn by 83% (from 30% to 5%) via predictive CRM health models.
• Link Puerto Rico: Technical Lead constructing and maintaining 100+ relational databases for 80+ organizations; unlocked $3M in sponsorships.
• Education & Credentials: B.S. Computer Engineering (4.0 GPA), Universidad Politécnica de PR; Stanford University Innovation Fellow; Lean Six Sigma White Belt; CompTIA ITF+.`;

    navigator.clipboard.writeText(text).then(() => {
      audio.confirm();
      this.showToast('Recruiter ATS Sourcing Notes copied to clipboard');
    }).catch(() => {
      this.showToast('Candidate notes copied to clipboard');
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Executive Resume Modal Handlers
  // ─────────────────────────────────────────────────────────────
  openResumeModal() {
    if (!this.dom.resumeModal) return;
    this.dom.resumeModal.showModal();
    audio.confirm();
  }

  closeResumeModal() {
    if (!this.dom.resumeModal) return;
    this.dom.resumeModal.close();
    audio.click(800);
  }

  copyResumeText() {
    const text = `FABIAN VELEZ VICENTE
Growth & Revenue Operations Analytics Lead
Email: fabianvvicente1@gmail.com | LinkedIn: https://linkedin.com/in/fabian-velez-vicente | GitHub: https://github.com/eresfavolosx | Portfolio: https://novu.works

SUMMARY
Growth & Revenue Operations Analytics Lead with 8+ years of experience sitting at the intersection of Marketing, Sales, and RevOps to analyze content, paid media, and CRM data, turning complex B2B funnel insights into pipeline growth across a $10M+ commercial portfolio.

SKILLS
• Content, SEO & Audience Intelligence: Organic Search & Keyword Performance | Content Refresh & Consolidation Strategy | Website Engagement & Conversion Analytics (GA4) | Search & Audience Behavior Analysis
• Paid Media & Demand Gen Analytics: LinkedIn Ads, Google Ads & Display | Multi-Dimensional Performance Analysis (Creative, Segment, Offer) | Spend-to-Pipeline & Opportunity Attribution | A/B Test Design
• CRM Enrichment & Sales Intelligence: Salesforce & HubSpot CRM Data Quality | Account Deduplication, Normalization & Enrichment | ICP Segmentation & Buying Committee Research | Event & Prospect Prioritization
• Data Stack & BI Platforms: SQL & T-SQL | Databricks | Advanced Spreadsheets (Excel & Google Sheets) | Power BI | Tableau | Looker | Python Data Automation | Bilingual (English & Spanish)

PROFESSIONAL EXPERIENCE
Money Group | Media Buyer (Demand Generation & Revenue Operations Analytics) | March 2026 – October 2026
• Paid Media & Pipeline Attribution: Analyzed multi-channel advertising performance across Google, LinkedIn, and display placements for 5 verticals ($100k+ direct spend within a $1 Billion+ portfolio), moving beyond clicks to tie spend directly to qualified opportunities and revenue.
• Account Intelligence & RevOps Alignment: Partnered with Sales and RevOps to evaluate B2B and consumer partner economics, building standardized opportunity sizing models and restructuring unit payouts from $125 to $250 to prioritize high-value downstream conversions.
• Landing Page & Offer Testing: Partnered with Demand Generation to design and evaluate structured A/B tests across 20+ landing pages, analyzing performance by creative copy and offer to accelerate test velocity by 30%.
• Automated Data Hygiene & Anomaly Detection: Engineered 20+ custom AI workflows and live telemetry agents in an enterprise LLM platform to normalize partner data, flag tracking anomalies, and maintain 100% reporting accuracy in under 4 hours.

Red Ventures | Growth / SEO Analyst (Content & Audience Intelligence, edX) | August 2024 – January 2026
• Content & SEO Performance Strategy: Led content performance analysis across organic search, keyword rankings, and website engagement for the multi-million-page edX platform, refreshing and consolidating 1,250+ priority pages to drive a 50%+ baseline search lift and a 19% YoY conversion gain.
• Audience & Search Opportunity Surfacing: Combined behavioral telemetry with search trends to surface emerging content and LLM search opportunities, partnering with Content and Product teams in Jira to generate a 3x lift (200%+) in high-intent prospective inquiries.
• SQL Data Normalization & Funnel Analysis: Queried and cleaned raw, imperfect datasets from scratch using SQL and Python in Databricks across 40 million+ user sessions, reconciling GA4 and internal databases with 100% reporting accuracy.

Viva Advertising | Co-Founder (B2B Growth, CRM & Event Intelligence) | January 2018 – Present
• B2B Funnel & Demand Gen Analytics: Evaluated paid media, content, and funnel performance across 150+ B2B and commercial accounts, managing $2M+ in direct ad budgets and 4 Billion+ impressions to generate a $10M+ pipeline and $10M+ in realized revenue.
• CRM Data Quality & ICP Segmentation: Partnered with Sales and RevOps across Salesforce and HubSpot to normalize, deduplicate, and enrich account and buying-committee records, building predictive account-health models that reduced client churn by 83% (from 30% to 5%).
• Executive BI & Proactive Recommendations: Architected centralized Power BI and Looker dashboards and directed a 15-person cross-functional team, translating raw marketing and CRM data into clear budget and targeting recommendations that lifted throughput by 40%.

Link Puerto Rico | Co-Founder & Technical Lead (Event & Prospect Intelligence) | November 2017 – Present
• Conference, Event & Attendee Intelligence: Sourced, cleaned, matched, and enriched attendee and company data across 50+ industry workshops and 4 major conferences (5,000+ participants and 2,000+ community members), building prioritized target-account lists that drove $3 Million in sponsorships and B2B sales.
• Market Research & Database Governance: Directed a 10+ person team to build and maintain 100+ relational databases and web platforms for 80+ organizations, normalizing 50,000+ customer and prospect records to uncover untapped market opportunities.

EDUCATION & CERTIFICATIONS
• B.S., Computer Engineering (4.0 GPA) | Universidad Politécnica de Puerto Rico | In Progress
• Automation, Data & IT Certifications: Lean Six Sigma White Belt | Data-driven Strategy: Power BI (UPPR) | CompTIA ITF+
• Governance & Fellowships: Stanford University Innovation Fellows | Project Management Practice (UPPR) | Federal Funds Administration (UPR)

COLLABORATION & LET'S CHAT
Ready to scale high-impact growth systems? Let's chat: fabianvvicente1@gmail.com`;

    navigator.clipboard.writeText(text).then(() => {
      audio.confirm();
      this.showToast('Executive Resume copied to clipboard');
    }).catch(() => {
      this.showToast('Copied to clipboard');
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

    document.getElementById('btn-hero-intel-feed')?.addEventListener('click', () => {
      this.switchView('intel-feed');
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

    // Print Resume (Global Button)
    this.dom.btnPrintResume?.addEventListener('click', () => {
      this.openResumeModal();
    });

    // Keyboard Shortcuts (1-6 for Views)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') this.switchView('core');
      if (e.key === '2') this.switchView('case-studies');
      if (e.key === '3') this.switchView('ai-lab');
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
    const views = ['core', 'case-studies', 'ai-lab', 'planner', 'dossier', 'intel-feed'];
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

    // Dynamic 3D Camera Positioning based on view context
    if (this.canvas3d && this.canvas3d.camera) {
      if (viewName === 'core') this.canvas3d.camera.position.set(0, 0, 46);
      else if (viewName === 'case-studies') this.canvas3d.camera.position.set(0, 14, 52);
      else if (viewName === 'ai-lab') this.canvas3d.camera.position.set(-12, 6, 50);
      else if (viewName === 'planner') this.canvas3d.camera.position.set(14, 5, 52);
      else if (viewName === 'intel-feed') this.canvas3d.camera.position.set(0, -10, 52);
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
