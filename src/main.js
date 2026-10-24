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
import { LOGOS } from './company-logos.js';
import { audio } from './audio.js';
import { DISCIPLINES, PROFILE } from './data.js';

class FabianPortfolioApp {
  constructor() {
    this.currentView = 'core';
    this.isTeslaMode = localStorage.getItem('fabian_tesla_mode') === 'true';
    this.canvas3d = null;
    this.activeRoleLens = 'master';

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
      githubRadarMount: document.getElementById('github-radar-mount'),
      prWeatherBadge: document.getElementById('pr-weather-badge'),
    };

    this.isVisualizerMode = false;

    this.init();
  }

  init() {
    // 0. Ensure root view dataset is set on body for CSS contextual styling
    document.body.dataset.view = 'core';

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
      this.renderDossier();
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
        onOpenPlanner: () => this.switchView('planner'),
        onOpenFeed: () => this.switchView('intel-feed'),
        onOpenArcade: () => this.openArcadeGame(),
        onOpenSurvey: () => this.openSurveyModal(),
        onOpenTools: (tab) => this.visitorTools?.open(tab),
        onSelectLens: (lensId) => this.selectVisitorPersona(lensId),
        onToggleTheme: () => this.toggleTheme(),
        onSetTheme: (theme) => this.setTheme(theme, true),
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

    if (localStorage.getItem('fv_onboarding_completed') !== 'true') {
      setTimeout(() => {
        // Only open automatically if no other modal has been opened yet
        if (!this.dom.resumeModal?.open && !this.dom.recruiterModal?.open && !this.dom.arcadeModal?.open && !this.dom.disciplineModal?.open) {
          this.openSurveyModal();
        }
      }, 1200);
    }

    // 7c. Initialize Visitor Utilities Suite
    try {
      this.visitorTools = new VisitorTools({
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
          <div class="logo-badge-item" title="Money Group (Media Buyer, Full-Time · $1B+ Scope)">
            ${LOGOS.moneyGroup}
          </div>
          <div class="logo-badge-item" title="Red Ventures (Growth / SEO Analyst, Full-Time · edX)">
            ${LOGOS.redVentures}
          </div>
          <div class="logo-badge-item" title="edX Platform (40M+ Telemetry Sessions)">
            ${LOGOS.edx}
          </div>
          <div class="logo-badge-item" title="Meta (San Juan Community Lead)">
            ${LOGOS.meta}
          </div>
          <div class="logo-badge-item" title="Microsoft (Certified Power BI Analyst)">
            ${LOGOS.microsoft}
          </div>
          <div class="logo-badge-item" title="Viva Advertising (My Company / Founder · $10M+ Pipeline)">
            ${LOGOS.vivaAdvertising}
          </div>
          <div class="logo-badge-item" title="Link Puerto Rico (My Company / Co-Founder · 100+ Relational Databases)">
            ${LOGOS.linkPR}
          </div>
          <div class="logo-badge-item" title="Stanford University Innovation Fellows">
            ${LOGOS.stanford}
          </div>
          <div class="logo-badge-item" title="Universidad Politécnica de PR (B.S. Comp Eng 4.0 GPA)">
            ${LOGOS.politecnica}
          </div>
          <div class="logo-badge-item" title="Grupo Guayacán (Fellow & Mentor)">
            ${LOGOS.guayacan}
          </div>
          <div class="logo-badge-item" title="Enactus (National / Global Judge)">
            ${LOGOS.enactus}
          </div>
          <div class="logo-badge-item" title="Novu Works (Studio & Enterprise Lab)">
            ${LOGOS.novuWorks}
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
        'Viva Advertising': LOGOS.vivaAdvertising,
        'Viva Advertising (My Company / Founder)': LOGOS.vivaAdvertising,
        'Link Puerto Rico': LOGOS.linkPR,
        'Link Puerto Rico (My Company / Co-Founder)': LOGOS.linkPR,
        'Novu Works': LOGOS.novuWorks,
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
                    ${exp.employmentType ? `<span class="exp-type-pill ${exp.employmentType.includes('Full-Time') ? 'pill-fulltime' : 'pill-founder'}">${exp.employmentType}</span>` : ''}
                  </div>
                </div>
              </div>
              <span class="exp-date">${exp.period}</span>
            </div>
            <ul class="exp-bullet-list">
              ${exp.bullets.map((b) => {
                const parts = b.split(': ');
                if (parts.length > 1) {
                  return `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(': ')}</li>`;
                }
                return `<li>${b}</li>`;
              }).join('')}
            </ul>
          </div>
        `;
      }).join('');
    }

    // 3. Standalone Projects
    if (this.dom.standaloneProjectsMount && PROFILE.standaloneProjects) {
      this.dom.standaloneProjectsMount.innerHTML = PROFILE.standaloneProjects.map((p) => `
        <div class="standalone-project-card">
          <div class="proj-top-row">
            <h4 class="proj-name">${p.name}</h4>
            <span class="proj-period">${p.period}</span>
          </div>
          <div class="proj-meta">${p.role} · ${p.organization}</div>
          <span class="proj-metric-pill">${p.metrics}</span>
          <p class="proj-summary">${p.summary}</p>
          <div class="proj-tags-row">
            ${p.tags.map((t) => `<span class="proj-tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
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

    // 6. Dossier Company Logos Strip
    if (this.dom.dossierLogosMount) {
      this.dom.dossierLogosMount.innerHTML = `
        <div class="logo-strip-inner">
          <span class="logo-strip-label">ACCREDITED PARTNERS & AFFILIATIONS:</span>
          <div class="logo-strip-row">
            <div class="logo-badge-item" title="Money Group (Full-Time)">${LOGOS.moneyGroup}</div>
            <div class="logo-badge-item" title="Red Ventures (Full-Time)">${LOGOS.redVentures}</div>
            <div class="logo-badge-item" title="edX Platform">${LOGOS.edx}</div>
            <div class="logo-badge-item" title="Viva Advertising (My Company / Founder)">${LOGOS.vivaAdvertising}</div>
            <div class="logo-badge-item" title="Link Puerto Rico (My Company / Co-Founder)">${LOGOS.linkPR}</div>
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

    // Header Role
    if (this.dom.resRoleMount) {
      this.dom.resRoleMount.textContent = variant.headline;
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

    // Experience (Authentic Tailored Bullets per Specialty)
    if (this.dom.resExpMount) {
      const expLogos = {
        'Money Group': LOGOS.moneyGroup,
        'Money Group (Full-Time)': LOGOS.moneyGroup,
        'Red Ventures': LOGOS.redVentures,
        'Red Ventures (Full-Time)': LOGOS.redVentures,
        'Viva Advertising': LOGOS.vivaAdvertising,
        'Viva Advertising (My Company / Founder)': LOGOS.vivaAdvertising,
        'Link Puerto Rico': LOGOS.linkPR,
        'Link Puerto Rico (My Company / Co-Founder)': LOGOS.linkPR,
        'Novu Works': LOGOS.novuWorks,
      };

      this.dom.resExpMount.innerHTML = variant.experiences.map((exp) => {
        const logoSvg = expLogos[exp.company] || '';
        return `
        <div class="res-exp-block">
          <div class="res-exp-head">
            <div>
              <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                ${logoSvg ? `<div class="res-company-logo-slot">${logoSvg}</div>` : ''}
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span class="res-company">${exp.company}</span>
                  ${exp.employmentType ? `<span class="exp-type-pill ${exp.employmentType.includes('Full-Time') ? 'pill-fulltime' : 'pill-founder'}">${exp.employmentType}</span>` : ''}
                </div>
              </div>
              <span class="res-role">${exp.role}</span>
            </div>
            <span class="res-date">${exp.period}</span>
          </div>
          <ul class="res-bullets">
            ${exp.bullets.map((b) => {
              const parts = b.split(': ');
              if (parts.length > 1) {
                return `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(': ')}</li>`;
              }
              return `<li>${b}</li>`;
            }).join('')}
          </ul>
        </div>
      `;
      }).join('');
    }

    // Projects
    if (this.dom.resProjectsMount && PROFILE.standaloneProjects) {
      this.dom.resProjectsMount.innerHTML = PROFILE.standaloneProjects.slice(0, 3).map((p) => `
        <div class="res-exp-block" style="margin-bottom: 12px;">
          <div class="res-exp-head">
            <div>
              <span class="res-company">${p.name}</span>
              <span class="res-role">(${p.role} · ${p.organization})</span>
            </div>
            <span class="res-date">${p.period}</span>
          </div>
          <div style="font-size: 11.5px; color: var(--gold-light); font-family: var(--font-mono); margin-bottom: 4px;">${p.metrics}</div>
          <p style="font-size: 12.5px; color: #d6d6de; line-height: 1.55;">${p.summary}</p>
        </div>
      `).join('');
    }

    // Education & Certifications
    if (this.dom.resEducationMount) {
      const edu = PROFILE.education[0];
      const certsText = PROFILE.certifications.map((c) => `${c.name} (${c.issuer})`).join(' | ');
      this.dom.resEducationMount.innerHTML = `
        <li><strong>${edu.degree}</strong> | ${edu.institution} | ${edu.status} (Coursework: ${edu.coursework})</li>
        <li><strong>Accredited Certifications:</strong> ${certsText}</li>
        <li><strong>Fellowships:</strong> Stanford University Innovation Fellows | Project Management Practice (UPPR) | Federal Funds Administration (UPR)</li>
      `;
    }

    // Awards & Leadership
    if (this.dom.resAwardsMount && PROFILE.awards) {
      this.dom.resAwardsMount.innerHTML = PROFILE.awards.map((a) => `
        <li><strong>${a.title}</strong> (${a.year}, ${a.organization}) — ${a.description}</li>
      `).join('');
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
            <span class="case-pill">${cs.badge}</span>
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
        'https://api.open-meteo.com/v1/forecast?latitude=18.4655&longitude=-66.1057&current_weather=true'
      );
      if (res.ok) {
        const data = await res.json();
        const cw = data.current_weather;
        if (cw) {
          const tempC = Math.round(cw.temperature);
          const tempF = Math.round((tempC * 9) / 5 + 32);
          const wind = Math.round(cw.windspeed);

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
  }

  closeResumeModal() {
    if (!this.dom.resumeModal) return;
    this.dom.resumeModal.close();
    audio.click(800);
  }

  copyResumeText() {
    const variant = PROFILE.roleVariants[this.activeRoleLens] || PROFILE.roleVariants.master;
    const edu = PROFILE.education[0];
    const certsText = PROFILE.certifications.map((c) => `• ${c.name} (${c.issuer})`).join('\n');
    const awardsText = PROFILE.awards.map((a) => `• ${a.title} (${a.year}, ${a.organization})`).join('\n');

    const text = `FABIAN VELEZ VICENTE
${variant.headline}
Email: fabianvvicente1@gmail.com | LinkedIn: https://linkedin.com/in/fabian-velez-vicente | GitHub: https://github.com/eresfavolosx | Portfolio: https://novu.works
Location: San Juan, PR (US Remote)

SUMMARY
${variant.summary}

SKILLS
${variant.skills.map((s) => `• ${s.title}: ${s.items}`).join('\n')}

PROFESSIONAL EXPERIENCE
${variant.experiences.map((exp) => `${exp.company} | ${exp.role} | ${exp.period}\n${exp.bullets.map((b) => `• ${b}`).join('\n')}`).join('\n\n')}

SIGNATURE ENGINEERING & CRISIS IMPACT PROJECTS
${PROFILE.standaloneProjects.map((p) => `${p.name} | ${p.role} · ${p.organization} | ${p.period}\nMetrics: ${p.metrics}\n${p.summary}`).join('\n\n')}

EDUCATION & ACCREDITED CERTIFICATIONS
• ${edu.degree} | ${edu.institution} | ${edu.status} (Coursework: ${edu.coursework})
${certsText}
• Stanford University Innovation Fellows (Design Thinking & Business Strategy)
• Federal Funds Administration (Universidad de Puerto Rico)

HONORS, AWARDS & CIVIC LEADERSHIP
${awardsText}

COLLABORATION & LET'S CHAT
Ready to scale high-impact systems? Let's chat: fabianvvicente1@gmail.com | Schedule a strategy conversation at https://novu.works`;

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
      this.openSurveyModal();
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

    // Puerto Rico Cultural Roots & Coquí Sound Chime
    const triggerCoqui = (e) => {
      if (e) e.preventDefault();
      audio.coqui();
      const w = this.prWeather;
      const weatherSnippet = w ? ` · ${w.tempC}°C / ${w.tempF}°F · ${w.cond}` : '';
      this.showToast(`🇵🇷 San Juan, Puerto Rico${weatherSnippet} · 18°28′N 66°06′W · Puerto Rico Heritage`);
      const pill = this.dom.btnPrRoots;
      if (pill) {
        pill.classList.add('pr-chime-active');
        setTimeout(() => pill.classList.remove('pr-chime-active'), 800);
      }
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

    this.dom.arcadeModal?.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeArcadeGame();
    });
  }

  // ─────────────────────────────────────────────────────────────
  // View Switcher with Choreographed Animations
  // ─────────────────────────────────────────────────────────────
  switchView(viewName) {
    if (this.currentView === viewName) return;
    this.currentView = viewName;
    document.body.dataset.view = viewName;
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
  initTheme() {
    // 1. Read current override from localStorage, or infer from document/system
    const saved = localStorage.getItem('color-scheme');
    if (saved === 'light' || saved === 'dark') {
      this.applyTheme(saved, false);
    } else {
      // System mode
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.updateThemeButton(isSystemDark ? 'dark' : 'light', true);
    }

    // 2. Multi-tab synchronization (modern-web-guidance)
    window.addEventListener('storage', (e) => {
      if (e.key === 'color-scheme') {
        const newTheme = e.newValue;
        if (newTheme === 'light' || newTheme === 'dark') {
          this.applyTheme(newTheme, false);
        } else {
          this.setTheme('system', false);
        }
      }
    });

    // 3. System preference change listener (modern-web-guidance)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem('color-scheme');
      if (!savedTheme) {
        // Only adapt automatically if no explicit user override exists
        const systemTheme = e.matches ? 'dark' : 'light';
        this.updateThemeButton(systemTheme, true);
        if (this.canvas3d) this.canvas3d.setTheme(systemTheme);
      }
    });
  }

  getCurrentResolvedTheme() {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const content = meta ? meta.getAttribute('content') : 'light dark';
    if (content === 'light') return 'light';
    if (content === 'dark') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggleTheme() {
    const current = this.getCurrentResolvedTheme();
    const target = current === 'dark' ? 'light' : 'dark';
    this.setTheme(target, true);
  }

  setTheme(theme, isUserAction = true) {
    if (theme === 'system') {
      try {
        localStorage.removeItem('color-scheme');
      } catch (e) {}
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.content = 'light dark';
      document.documentElement.removeAttribute('data-theme');
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = isSystemDark ? 'dark' : 'light';
      this.updateThemeButton(resolved, true);
      if (this.canvas3d) this.canvas3d.setTheme(resolved);
      if (isUserAction) {
        audio.nav();
        this.showToast('Theme: System Preference Active');
      }
      return;
    }

    this.applyTheme(theme, isUserAction);
  }

  applyTheme(theme, isUserAction = false) {
    if (theme !== 'light' && theme !== 'dark') return;
    try {
      localStorage.setItem('color-scheme', theme);
    } catch (e) {}

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;
    document.documentElement.setAttribute('data-theme', theme);

    this.updateThemeButton(theme, false);
    if (this.canvas3d) this.canvas3d.setTheme(theme);

    if (isUserAction) {
      audio.chime(theme === 'light' ? 2 : 0);
      this.showToast(theme === 'light' ? '☀️ Light Theme Active' : '🌙 Dark Theme Active');
    }
  }

  updateThemeButton(activeTheme, isSystem = false) {
    const btn = this.dom.btnThemeToggle;
    if (!btn) return;

    const sunIcon = btn.querySelector('.icon-theme-sun');
    const moonIcon = btn.querySelector('.icon-theme-moon');

    if (activeTheme === 'light') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
      btn.title = isSystem ? 'System Theme (Light) · Click to switch to Dark' : 'Switch to Dark Theme';
      btn.setAttribute('aria-label', 'Switch to Dark Theme');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
      btn.title = isSystem ? 'System Theme (Dark) · Click to switch to Light' : 'Switch to Light Theme';
      btn.setAttribute('aria-label', 'Switch to Light Theme');
    }
  }

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
    this.syncMorphPills(next);
    const names = ['NW Monogram', 'Möbius Growth Flow', 'Quantum AI Prism'];
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
  window.app = instance; // Explicitly override <div id="app"> DOM global reference

  // Deep-linking shortcuts
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  setTimeout(() => {
    const viewParam = params.get('view');
    if (viewParam) {
      instance.switchView(viewParam);
    } else if (hash.startsWith('#view-') || hash.startsWith('#')) {
      const v = hash.replace('#view-', '').replace('#', '');
      if (['core', 'case-studies', 'ai-lab', 'planner', 'dossier', 'intel-feed'].includes(v)) {
        instance.switchView(v);
      }
    }

    if (params.get('arcade') === '1' || hash === '#arcade') {
      instance.openArcadeGame();
    } else if (params.get('resume') === '1' || hash === '#resume') {
      instance.openResumeModal();
    } else if (params.get('hire') === '1' || hash === '#hire') {
      instance.openRecruiterModal();
    }
  }, 150);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootPortfolioApp);
} else {
  bootPortfolioApp();
}
