// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive Command Palette (Cmd + K / Quick Action)
// ─────────────────────────────────────────────────────────────

import { DISCIPLINES, PROFILE } from './data.js';
import { audio } from './audio.js';
import { bindDialogLightDismissFallback } from './utils.js';

export class CommandPalette {
  constructor(options = {}) {
    this.options = options;
    this.isOpen = false;
    this.selectedIndex = 0;
    this.query = '';
    this._announceTimer = null;
    this._lastPointer = { x: null, y: null };

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
        title: 'Launch BizPay (bizpay.novu.works) — Human-Centric Financial Clarity & Operations',
        category: 'Live Subdomain App',
        shortcut: 'PAY',
        action: () => window.open('https://bizpay.novu.works?from=novuworks', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'subdomain-picta',
        title: 'Launch Picta (picta.novu.works) — Assistive CVD WebGL Camera & Daltonization',
        category: 'Live Subdomain App',
        shortcut: 'PIC',
        action: () => window.open('https://picta.novu.works?from=novuworks', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'subdomain-nfc',
        title: 'Launch NFC Platform (nfc.novu.works) — Tactile Physical-Digital Web NFC Bridge',
        category: 'Live Subdomain App',
        shortcut: 'NFC',
        action: () => window.open('https://nfc.novu.works?from=novuworks', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'subdomain-hackea',
        title: 'Launch Hackea PR (hackea.novu.works) — Civic Innovation & Hackathon Platform',
        category: 'Live Subdomain App',
        shortcut: 'HAC',
        action: () => window.open('https://hackea.novu.works?from=novuworks', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'subdomain-jobhelper',
        title: 'Launch JobHelper (jobhelper.novu.works) — Autonomous LLM Career Coach & Tool-Calling',
        category: 'Live Subdomain App',
        shortcut: 'JOB',
        action: () => window.open('https://jobhelper.novu.works?from=novuworks', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'planner',
        title: 'Open Interactive Prototype & Architecture Scoper',
        category: 'Productivity Tool',
        shortcut: 'P',
        action: () => options.onOpenPlanner && options.onOpenPlanner(),
      },
      {
        id: 'feed',
        title: 'Open Frontier Pulse & Live Creative AI Radar',
        category: 'Thought Leadership',
        shortcut: 'F',
        action: () => options.onOpenFeed && options.onOpenFeed(),
      },
      {
        id: 'tailor-survey',
        title: 'Tailor Portfolio Experience (Creative Lens Selector)',
        category: 'Personalization',
        shortcut: 'O',
        action: () => options.onOpenSurvey && options.onOpenSurvey(),
      },
      {
        id: 'tools-suite',
        title: 'Open Interactive Maker Utilities (Event Deduplication, Synthesis Simulator, JSON Resume)',
        category: 'Interactive Tools',
        shortcut: 'U',
        action: () => options.onOpenTools && options.onOpenTools('capi-builder'),
      },
      {
        id: 'tools-capi',
        title: 'Visitor Tool: First-Party Event Deduplication & Clean URL Builder',
        category: 'Interactive Tools',
        shortcut: 'UTM',
        action: () => options.onOpenTools && options.onOpenTools('capi-builder'),
      },
      {
        id: 'tools-roas',
        title: 'Visitor Tool: Interactive Prototype Velocity & Impact Simulator',
        category: 'Interactive Tools',
        shortcut: 'SIM',
        action: () => options.onOpenTools && options.onOpenTools('roas-calc'),
      },
      {
        id: 'tools-ats',
        title: 'Visitor Tool: Structured JSON Resume & schema.org Export',
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
        title: 'Tailor Lens: Interactive Storytelling & Synthesis (edX, Viva Studio)',
        category: 'Personalization',
        shortcut: '1',
        action: () => options.onSelectLens && options.onSelectLens('revops_analytics'),
      },
      {
        id: 'lens-ai',
        title: 'Tailor Lens: Frontier Models & Agentic Prototypes (OpenAI, Claude, Tool-Calling)',
        category: 'Personalization',
        shortcut: '2',
        action: () => options.onSelectLens && options.onSelectLens('ai_engineering'),
      },
      {
        id: 'lens-data',
        title: 'Tailor Lens: Behavioral Telemetry & Synthesis (40M+ Databricks Sessions, SQL)',
        category: 'Personalization',
        shortcut: '3',
        action: () => options.onSelectLens && options.onSelectLens('data_governance'),
      },
      {
        id: 'lens-leadership',
        title: 'Tailor Lens: Physical Computing & Civic Resilience (WebRTC, Web NFC, 4.0 GPA)',
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
        title: 'Toggle Executive Telemetry & Systems HUD (Tesla Viewport)',
        category: 'Telemetry & HUD',
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

  escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render() {
    let modal = document.getElementById('command-palette-modal');
    if (!modal) {
      modal = document.createElement('dialog');
      modal.id = 'command-palette-modal';
      modal.className = 'cmd-palette-backdrop';
      modal.setAttribute('closedby', 'any');
      modal.setAttribute('aria-label', 'Command Palette');
      modal.innerHTML = `
        <div class="cmd-palette-window glass-panel">
          <div class="cmd-input-bar">
            <svg class="cmd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              id="cmd-input"
              role="combobox"
              aria-expanded="false"
              aria-controls="cmd-results-list"
              aria-autocomplete="list"
              placeholder="Type a command or search (e.g. 'hire', 'architecture', 'tesla')..."
              autocomplete="off"
              spellcheck="false"
              aria-label="Search commands"
              autofocus
            />
            <button type="button" class="cmd-esc-badge" id="cmd-close-btn" aria-label="Close command palette (ESC)">
              <kbd>ESC</kbd>
            </button>
          </div>
          <div class="cmd-results" id="cmd-results-list" role="listbox" aria-label="Available commands"></div>
          <div id="cmd-live-status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
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
    this.closeBtn = modal.querySelector('#cmd-close-btn');
    this.resultsList = modal.querySelector('#cmd-results-list');
    this.liveStatus = modal.querySelector('#cmd-live-status');
  }

  bindEvents() {
    // Global Cmd+K / Ctrl+K toggle (native <dialog> handles Escape)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Scope listbox keyboard navigation to the combobox input so buttons inside the dialog keep native Enter behavior
    this.input.addEventListener('keydown', (e) => {
      if (!this.isOpen || e.isComposing) return;
      const count = this.filteredCommands.length;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (count === 0) return;
        this.setSelectedIndex((this.selectedIndex + 1) % count, { scroll: true });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (count === 0) return;
        this.setSelectedIndex((this.selectedIndex - 1 + count) % count, { scroll: true });
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        if (count === 0) return;
        this.setSelectedIndex(Math.min(count - 1, this.selectedIndex + 5), { scroll: true });
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        if (count === 0) return;
        this.setSelectedIndex(Math.max(0, this.selectedIndex - 5), { scroll: true });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.executeSelected();
      }
    });

    this.closeBtn?.addEventListener('click', () => this.close());

    // Delegated click & pointer tracking on listbox results
    this.resultsList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item[data-index]');
      if (!item) return;
      const idx = parseInt(item.dataset.index, 10);
      if (Number.isNaN(idx)) return;
      this.selectedIndex = idx;
      this.executeSelected();
    });

    this.resultsList.addEventListener('pointermove', (e) => {
      if (e.clientX === this._lastPointer.x && e.clientY === this._lastPointer.y) return;
      this._lastPointer.x = e.clientX;
      this._lastPointer.y = e.clientY;
      const item = e.target.closest('.cmd-item[data-index]');
      if (!item) return;
      const idx = parseInt(item.dataset.index, 10);
      if (!Number.isNaN(idx) && idx !== this.selectedIndex) {
        this.setSelectedIndex(idx, { scroll: false });
      }
    });

    // Input filter
    this.input.addEventListener('input', (e) => {
      this.query = e.target.value.toLowerCase().trim();
      this.filter({ announce: true });
    });

    // Sync state on native <dialog> close (Escape or light-dismiss)
    this.modal.addEventListener('close', () => {
      this.clearLiveAnnouncement();
      this.input?.setAttribute('aria-expanded', 'false');
      this.input?.removeAttribute('aria-activedescendant');
      if (this.isOpen) {
        this.isOpen = false;
        this.modal.classList.remove('visible');
        audio.click(800);
      }
    });

    // Outside-rect fallback for browsers without native closedby="any"
    bindDialogLightDismissFallback(this.modal, () => this.close());
  }

  filter({ announce = false } = {}) {
    const tokens = this.query.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter((cmd) => {
        const haystack = `${cmd.title} ${cmd.category} ${cmd.shortcut || ''}`.toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      });
    }
    this.selectedIndex = 0;
    this.renderList();
    if (announce) {
      this.announceResults();
    }
  }

  clearLiveAnnouncement() {
    if (this._announceTimer) {
      clearTimeout(this._announceTimer);
      this._announceTimer = null;
    }
    if (this.liveStatus) {
      this.liveStatus.textContent = '';
    }
  }

  announceResults() {
    clearTimeout(this._announceTimer);
    this._announceTimer = setTimeout(() => {
      this._announceTimer = null;
      if (!this.isOpen || !this.liveStatus) return;
      const count = this.filteredCommands.length;
      if (count === 0) {
        this.liveStatus.textContent = 'No matching commands found.';
      } else if (count === 1) {
        this.liveStatus.textContent = '1 command available.';
      } else {
        this.liveStatus.textContent = `${count} commands available.`;
      }
    }, 200);
  }

  renderList() {
    if (this.filteredCommands.length === 0) {
      this.resultsList.innerHTML = `<div class="cmd-empty" role="presentation">No matching commands found.</div>`;
      this.input?.removeAttribute('aria-activedescendant');
      return;
    }

    this.resultsList.innerHTML = this.filteredCommands
      .map((cmd, i) => {
        const isActive = i === this.selectedIndex;
        return `
        <div class="cmd-item ${isActive ? 'active' : ''}" id="cmd-opt-${this.escapeHtml(cmd.id)}" role="option" aria-selected="${isActive ? 'true' : 'false'}" data-index="${i}">
          <div class="cmd-item-left">
            <span class="cmd-category-tag">${this.escapeHtml(cmd.category)}</span>
            <span class="cmd-item-title">${this.escapeHtml(cmd.title)}</span>
          </div>
          ${cmd.shortcut ? `<kbd class="cmd-shortcut">${this.escapeHtml(cmd.shortcut)}</kbd>` : ''}
        </div>
      `;
      })
      .join('');

    this.updateActiveOption({ scroll: true });
  }

  setSelectedIndex(index, options = { scroll: true }) {
    const count = this.filteredCommands.length;
    if (count === 0) {
      this.selectedIndex = 0;
      this.input?.removeAttribute('aria-activedescendant');
      return;
    }
    const clamped = Math.max(0, Math.min(index, count - 1));
    this.selectedIndex = clamped;
    this.updateActiveOption(options);
  }

  updateActiveOption({ scroll = true } = {}) {
    this.resultsList.querySelectorAll('.cmd-item.active, .cmd-item[aria-selected="true"]').forEach((el) => {
      el.classList.remove('active');
      el.setAttribute('aria-selected', 'false');
    });

    const activeEl = this.resultsList.querySelector(`.cmd-item[data-index="${this.selectedIndex}"]`);
    if (activeEl) {
      activeEl.classList.add('active');
      activeEl.setAttribute('aria-selected', 'true');
      this.input?.setAttribute('aria-activedescendant', activeEl.id);
      if (scroll) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    } else {
      this.input?.removeAttribute('aria-activedescendant');
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
    if (!this.modal) return;
    this.clearLiveAnnouncement();
    this._lastPointer = { x: null, y: null };
    this.isOpen = true;
    this.input.value = '';
    this.query = '';
    this.input.setAttribute('aria-expanded', 'true');
    this.filter({ announce: false });
    if (typeof this.modal.showModal === 'function') {
      try {
        if (!this.modal.open) this.modal.showModal();
      } catch (_) {
        this.modal.setAttribute('open', '');
      }
    } else {
      this.modal.setAttribute('open', '');
    }
    this.modal.classList.add('visible');
    audio.click(1400);
    if (document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  close() {
    if (!this.modal || !this.isOpen) return;
    this.clearLiveAnnouncement();
    this.input?.setAttribute('aria-expanded', 'false');
    this.input?.removeAttribute('aria-activedescendant');
    this.isOpen = false;
    this.modal.classList.remove('visible');
    if (typeof this.modal.close === 'function') {
      try {
        if (this.modal.open) this.modal.close();
      } catch (_) {
        this.modal.removeAttribute('open');
      }
    } else {
      this.modal.removeAttribute('open');
    }
    audio.click(800);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
}
