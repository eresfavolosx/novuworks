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
        id: 'tesla',
        title: 'Toggle Tesla In-Car Touchscreen Cockpit Mode',
        category: 'Display / Vehicle',
        shortcut: 'T',
        action: () => options.onToggleTesla && options.onToggleTesla(),
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
        id: 'contact',
        title: 'Email Fabian directly (fabian.velez1996@gmail.com)',
        category: 'Contact',
        shortcut: 'C',
        action: () => {
          window.location.href = PROFILE.contact.calendarUrl;
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
