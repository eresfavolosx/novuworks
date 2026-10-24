// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive Command Palette (Cmd + K / Quick Action)
// ─────────────────────────────────────────────────────────────

import { DISCIPLINES, PROFILE } from './data.js';
import { audio } from './audio.js';

export class CommandPalette {
  constructor(options = {}) {
    this.options = options;
    this.isOpen = false;
    this.selectedIndex = 0;
    this.query = '';

    this.commands = [
      {
        id: 'hire',
        title: 'Hire Fabian Velez / View Executive Dossier',
        category: 'Recruiter & Careers',
        shortcut: 'H',
        action: () => options.onOpenHire && options.onOpenHire(),
      },
      {
        id: 'whatsapp-chat',
        title: "Let's Chat: Direct WhatsApp & Executive Communications",
        category: 'Direct Connection',
        shortcut: 'W',
        action: () => options.onOpenChat && options.onOpenChat(),
      },
      {
        id: 'projects',
        title: 'View Shipped Systems & Live Subdomains (*.novu.works)',
        category: 'Shipped Systems',
        shortcut: '3',
        action: () => options.onOpenProjects && options.onOpenProjects(),
      },
      {
        id: 'subdomain-bizpay',
        title: 'Launch BizPay (bizpay.novu.works) — B2B Financial Architecture & Invoicing',
        category: 'Live Subdomain App',
        shortcut: 'PAY',
        action: () => window.open('https://bizpay.novu.works?from=novuworks', '_blank'),
      },
      {
        id: 'subdomain-picta',
        title: 'Launch Picta (picta.novu.works) — Assistive CVD WebGL Camera & Daltonization',
        category: 'Live Subdomain App',
        shortcut: 'PIC',
        action: () => window.open('https://picta.novu.works?from=novuworks', '_blank'),
      },
      {
        id: 'subdomain-nfc',
        title: 'Launch NFC Platform (nfc.novu.works) — Event Verification & Automated QA',
        category: 'Live Subdomain App',
        shortcut: 'NFC',
        action: () => window.open('https://nfc.novu.works?from=novuworks', '_blank'),
      },
      {
        id: 'subdomain-hackea',
        title: 'Launch Hackea PR (hackea.novu.works) — Civic Hackathon Platform',
        category: 'Live Subdomain App',
        shortcut: 'HAC',
        action: () => window.open('https://hackea.novu.works?from=novuworks', '_blank'),
      },
      {
        id: 'subdomain-jobhelper',
        title: 'Launch JobHelper (jobhelper.novu.works) — Autonomous LLM Rubric Agent',
        category: 'Live Subdomain App',
        shortcut: 'JOB',
        action: () => window.open('https://jobhelper.novu.works?from=novuworks', '_blank'),
      },
      {
        id: 'roi',
        title: 'Open Architecture Planner & ROI Calculator',
        category: 'Productivity Tool',
        shortcut: 'P',
        action: () => options.onOpenPlanner && options.onOpenPlanner(),
      },
      {
        id: 'feed',
        title: 'Open Intel Feed & Real-Time Industry Radar',
        category: 'Thought Leadership',
        shortcut: 'F',
        action: () => options.onOpenFeed && options.onOpenFeed(),
      },
      {
        id: 'tailor-survey',
        title: 'Tailor Portfolio Experience (Executive Concierge Survey)',
        category: 'Personalization',
        shortcut: 'O',
        action: () => options.onOpenSurvey && options.onOpenSurvey(),
      },
      {
        id: 'tools-suite',
        title: 'Open Visitor Utilities Suite (CAPI Generator, ROAS Calculator, ATS Resume Export)',
        category: 'Interactive Tools',
        shortcut: 'U',
        action: () => options.onOpenTools && options.onOpenTools('capi-builder'),
      },
      {
        id: 'tools-capi',
        title: 'Visitor Tool: Server-Side Meta CAPI Payload & Clean UTM Builder',
        category: 'Interactive Tools',
        shortcut: 'UTM',
        action: () => options.onOpenTools && options.onOpenTools('capi-builder'),
      },
      {
        id: 'tools-roas',
        title: 'Visitor Tool: Paid Media CAC & ROAS Break-Even Modeler',
        category: 'Interactive Tools',
        shortcut: 'ROI',
        action: () => options.onOpenTools && options.onOpenTools('roas-calc'),
      },
      {
        id: 'tools-ats',
        title: 'Visitor Tool: Recruiter ATS JSON Resume & schema.org Export',
        category: 'Interactive Tools',
        shortcut: 'ATS',
        action: () => options.onOpenTools && options.onOpenTools('ats-export'),
      },
      {
        id: 'tools-telemetry',
        title: 'Visitor Tool: Live Edge POP Latency & Client Hardware Diagnostics',
        category: 'Interactive Tools',
        shortcut: 'LAT',
        action: () => options.onOpenTools && options.onOpenTools('edge-telemetry'),
      },
      {
        id: 'lens-growth',
        title: 'Tailor Lens: Growth & Performance Marketing (Media Buying, CAPI)',
        category: 'Personalization',
        shortcut: '1',
        action: () => options.onSelectLens && options.onSelectLens('revops_analytics'),
      },
      {
        id: 'lens-ai',
        title: 'Tailor Lens: Applied AI & Agentic Workflows (Claude, LLMs, Automation)',
        category: 'Personalization',
        shortcut: '2',
        action: () => options.onSelectLens && options.onSelectLens('ai_engineering'),
      },
      {
        id: 'lens-data',
        title: 'Tailor Lens: Big Data & Revenue Operations (Databricks, Power BI, SQL)',
        category: 'Personalization',
        shortcut: '3',
        action: () => options.onSelectLens && options.onSelectLens('data_governance'),
      },
      {
        id: 'lens-leadership',
        title: 'Tailor Lens: Technical Product & Engineering Leadership (4.0 GPA, Agile)',
        category: 'Personalization',
        shortcut: '4',
        action: () => options.onSelectLens && options.onSelectLens('tech_ops'),
      },
      {
        id: 'lens-master',
        title: 'Tailor Lens: All-Round Master View (Holistic Overview)',
        category: 'Personalization',
        shortcut: '0',
        action: () => options.onSelectLens && options.onSelectLens('master'),
      },
      {
        id: 'arcade',
        title: 'Play Cyber Growth Racer (3D Easter Egg Game)',
        category: 'Interactive Easter Egg',
        shortcut: 'G',
        action: () => options.onOpenArcade && options.onOpenArcade(),
      },
      {
        id: 'lang-es',
        title: 'Switch Language to Spanish / Cambiar a Español',
        category: 'Language / Idioma',
        shortcut: 'ES',
        action: () => options.onSwitchLanguage && options.onSwitchLanguage('es'),
      },
      {
        id: 'lang-en',
        title: 'Switch Language to English / Cambiar a Inglés (Default)',
        category: 'Language / Idioma',
        shortcut: 'EN',
        action: () => options.onSwitchLanguage && options.onSwitchLanguage('en'),
      },
      {
        id: 'theme-toggle',
        title: 'Toggle Dark / Light Theme',
        category: 'Appearance',
        shortcut: 'D',
        action: () => options.onToggleTheme && options.onToggleTheme(),
      },
      {
        id: 'theme-light',
        title: 'Switch to Light Theme',
        category: 'Appearance',
        shortcut: 'L',
        action: () => options.onSetTheme && options.onSetTheme('light'),
      },
      {
        id: 'theme-dark',
        title: 'Switch to Dark Theme',
        category: 'Appearance',
        shortcut: 'K',
        action: () => options.onSetTheme && options.onSetTheme('dark'),
      },
      {
        id: 'theme-system',
        title: 'Reset Theme to System Default (Auto)',
        category: 'Appearance',
        shortcut: 'S',
        action: () => options.onSetTheme && options.onSetTheme('system'),
      },
      {
        id: 'tesla',
        title: 'Toggle Tesla In-Car Touchscreen Cockpit Mode',
        category: 'Display / Vehicle',
        shortcut: 'T',
        action: () => options.onToggleTesla && options.onToggleTesla(),
      },
      {
        id: 'visualizer',
        title: 'View 3D Background Visualization (Zen Mode / Canvas View)',
        category: '3D Graphics',
        shortcut: 'Z',
        action: () => options.onToggleVisualizer && options.onToggleVisualizer(),
      },
      {
        id: 'morph',
        title: 'Cycle 3D Morph (Monogram → Topology → Quantum Core)',
        category: '3D Graphics',
        shortcut: 'M',
        action: () => options.onCycleMorph && options.onCycleMorph(),
      },
      {
        id: 'audio',
        title: 'Toggle Ambient Focus Soundscape',
        category: 'Audio',
        shortcut: 'A',
        action: () => {
          const state = audio.toggleAmbient();
          options.showToast && options.showToast(state ? 'Focus Ambient Audio: ON' : 'Focus Ambient Audio: OFF');
        },
      },
      {
        id: 'mute',
        title: 'Toggle Master Audio Mute',
        category: 'Audio',
        shortcut: 'U',
        action: () => {
          const muted = audio.toggleMute();
          options.showToast && options.showToast(muted ? 'Audio Muted' : 'Audio Enabled');
        },
      },
      {
        id: 'coqui',
        title: 'Chime Puerto Rico Coquí (Authentic Island Two-Tone Sound)',
        category: 'Culture & Heritage',
        shortcut: 'PR',
        action: () => {
          audio.coqui();
          options.showToast && options.showToast('🇵🇷 San Juan, Puerto Rico · 18°28′N 66°06′W · Puerto Rico Heritage');
        },
      },
      {
        id: 'contact',
        title: `Email Fabian directly (${PROFILE.emails.primary})`,
        category: 'Contact',
        shortcut: 'C',
        action: () => {
          window.location.href = `mailto:${PROFILE.emails.primary}?subject=Executive%20Inquiry%20-%20Let's%20Chat`;
        },
      },
      // Append the 8 disciplines
      ...DISCIPLINES.map((d) => ({
        id: `disc-${d.id}`,
        title: `${d.number} · ${d.title} — ${d.subtitle}`,
        category: 'Disciplines',
        shortcut: d.number,
        action: () => options.onSelectDiscipline && options.onSelectDiscipline(d),
      })),
    ];

    this.filteredCommands = [...this.commands];
    this.render();
    this.bindEvents();
  }

  render() {
    let modal = document.getElementById('command-palette-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'command-palette-modal';
      modal.className = 'cmd-palette-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Command Palette');
      modal.innerHTML = `
        <div class="cmd-palette-window glass-panel">
          <div class="cmd-input-bar">
            <svg class="cmd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="cmd-input" placeholder="Type a command or search (e.g. 'hire', 'architecture', 'tesla')..." autocomplete="off" spellcheck="false" />
            <kbd class="cmd-esc-badge">ESC</kbd>
          </div>
          <div class="cmd-results" id="cmd-results-list"></div>
          <div class="cmd-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to execute</span>
            <span><kbd>ESC</kbd> to dismiss</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    this.modal = modal;
    this.input = modal.querySelector('#cmd-input');
    this.resultsList = modal.querySelector('#cmd-results-list');
  }

  bindEvents() {
    // Keyboard shortcut Cmd+K or Ctrl+K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
          this.renderList();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
          this.renderList();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSelected();
        }
      }
    });

    // Input filter
    this.input.addEventListener('input', (e) => {
      this.query = e.target.value.toLowerCase().trim();
      this.filter();
    });

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  filter() {
    if (!this.query) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(this.query) ||
          cmd.category.toLowerCase().includes(this.query) ||
          (cmd.shortcut && cmd.shortcut.toLowerCase() === this.query)
      );
    }
    this.selectedIndex = 0;
    this.renderList();
  }

  renderList() {
    if (this.filteredCommands.length === 0) {
      this.resultsList.innerHTML = `<div class="cmd-empty">No matching commands found.</div>`;
      return;
    }

    this.resultsList.innerHTML = this.filteredCommands
      .map((cmd, i) => `
        <div class="cmd-item ${i === this.selectedIndex ? 'active' : ''}" data-index="${i}">
          <div class="cmd-item-left">
            <span class="cmd-category-tag">${cmd.category}</span>
            <span class="cmd-item-title">${cmd.title}</span>
          </div>
          ${cmd.shortcut ? `<kbd class="cmd-shortcut">${cmd.shortcut}</kbd>` : ''}
        </div>
      `)
      .join('');

    // Click to select
    this.resultsList.querySelectorAll('.cmd-item').forEach((item) => {
      item.addEventListener('click', () => {
        this.selectedIndex = parseInt(item.dataset.index, 10);
        this.executeSelected();
      });
    });

    // Scroll active into view
    const activeEl = this.resultsList.querySelector('.cmd-item.active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeSelected() {
    const cmd = this.filteredCommands[this.selectedIndex];
    if (cmd && cmd.action) {
      audio.confirm();
      this.close();
      cmd.action();
    }
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add('visible');
    this.input.value = '';
    this.query = '';
    this.filter();
    audio.click(1400);
    setTimeout(() => this.input.focus(), 60);
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove('visible');
    audio.click(800);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
}
