// ─────────────────────────────────────────────────────────────
//  Novu Works — Bilingual & Binary Executive Dev Stream
//  Showcases full bilingual fluency (English & Spanish) alongside
//  deep computer engineering & software development mastery via
//  real-time UTF-8 binary encoding, character scrambling, and
//  interactive matrix decoding of the headline and greetings.
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';
import { getLanguage } from './i18n.js';

/**
 * Encodes any string into space-delimited 8-bit UTF-8 binary bytes
 * @param {string} str
 * @returns {string} e.g. "01001000 01100101 01101100 01101100 01101111" for "Hello"
 */
export function textToBinary(str) {
  if (!str) return '';
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(' ');
}

/**
 * Decodes space-delimited 8-bit UTF-8 binary bytes back into a UTF-8 string
 * @param {string} binStr
 * @returns {string}
 */
export function binaryToText(binStr) {
  try {
    if (!binStr) return '';
    const bytes = binStr.trim().split(/\s+/).map((b) => parseInt(b, 2));
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch (e) {
    return '';
  }
}

export const GREETING_STATES = [
  {
    id: 'en',
    mode: 'en',
    word: 'Hello',
    display: '"Hello"',
    flag: '🇺🇸',
    chipMode: 'en',
    badgeTextEn: '🇺🇸 English · Native Bilingual Fluency',
    badgeTextEs: '🇺🇸 Inglés · Fluidez Bilingüe Nativa',
  },
  {
    id: 'es',
    mode: 'es',
    word: 'Hola',
    display: '"Hola"',
    flag: '🇵🇷',
    chipMode: 'es',
    badgeTextEn: '🇵🇷 Spanish · Native Language (San Juan, PR)',
    badgeTextEs: '🇵🇷 Español · Lengua Materna (San Juan, PR)',
  },
  {
    id: 'bin-hello',
    mode: 'bin',
    word: '01001000 01100101 01101100 01101100 01101111',
    display: '01001000 01100101 01101100 01101100 01101111',
    flag: '⚡',
    chipMode: 'bin',
    badgeTextEn: '⚡ UTF-8 Binary Code for "Hello" · Comp Eng (4.0 GPA)',
    badgeTextEs: '⚡ Código Binario UTF-8 para "Hello" · Ing. Computadoras (4.0 GPA)',
  },
  {
    id: 'bin-hola',
    mode: 'bin',
    word: '01001000 01101111 01101100 01100001',
    display: '01001000 01101111 01101100 01100001',
    flag: '⚡',
    chipMode: 'bin',
    badgeTextEn: '⚡ UTF-8 Binary Code for "Hola" · Comp Eng (4.0 GPA)',
    badgeTextEs: '⚡ Código Binario UTF-8 para "Hola" · Ing. Computadoras (4.0 GPA)',
  },
];

export class BilingualBinaryHero {
  constructor(app) {
    this.app = app;
    this.currentIndex = 0;
    this.cycleTimer = null;
    this.pauseTimer = null;
    this.isCyclePaused = false;
    this.isScrambling = false;
    this.isHeadlineBinary = false;
    this.originalHeadlineHtml = null;

    this.dom = {
      terminal: document.getElementById('hero-greeting-terminal'),
      textDisplay: document.getElementById('hero-greeting-text'),
      annotationText: document.getElementById('hero-greeting-ann-text'),
      btnModeEn: document.getElementById('btn-greeting-mode-en'),
      btnModeEs: document.getElementById('btn-greeting-mode-es'),
      btnModeBin: document.getElementById('btn-greeting-mode-bin'),
      btnHeadlineBinary: document.getElementById('btn-headline-binary-toggle'),
      headlineBinaryLabel: document.getElementById('headline-binary-label'),
      btnCopy: document.getElementById('btn-copy-greeting-binary'),
      heroTitle: document.querySelector('.hero-title'),
      statusText: document.getElementById('greeting-status-text'),
    };
  }

  init() {
    if (!this.dom.terminal || !this.dom.textDisplay) return;

    // Cache pristine headline HTML
    if (this.dom.heroTitle) {
      this.originalHeadlineHtml = this.dom.heroTitle.innerHTML;
    }

    // Set initial display based on current site language
    const currentLang = getLanguage();
    this.currentIndex = currentLang === 'es' ? 1 : 0;
    this.updateDomState(this.currentIndex, false);

    // Bind interaction events
    this.bindEvents();

    // Start auto-cycling sequence (every 4200ms)
    this.startCycle();
  }

  bindEvents() {
    // Mode Chip Click Handlers
    this.dom.btnModeEn?.addEventListener('click', () => {
      this.selectMode('en');
    });

    this.dom.btnModeEs?.addEventListener('click', () => {
      this.selectMode('es');
    });

    this.dom.btnModeBin?.addEventListener('click', () => {
      // Toggle between binary for Hello and binary for Hola
      const nextIndex = this.currentIndex === 2 ? 3 : 2;
      this.selectIndex(nextIndex);
    });

    // Headline Binary Toggle Button
    this.dom.btnHeadlineBinary?.addEventListener('click', () => {
      this.toggleHeadlineBinary();
    });

    // Copy to clipboard
    this.dom.btnCopy?.addEventListener('click', () => {
      this.copyCurrentGreeting();
    });

    // Pause auto-cycle while hovering over terminal to let visitor inspect
    this.dom.terminal?.addEventListener('mouseenter', () => {
      this.isCyclePaused = true;
    });

    this.dom.terminal?.addEventListener('mouseleave', () => {
      this.isCyclePaused = false;
    });

    // Listen to global language change events
    window.addEventListener('novu:language-changed', (e) => {
      const newLang = e.detail?.lang;
      if (newLang) {
        this.setLanguage(newLang);
      }
    });
  }

  selectMode(mode) {
    audio?.click(1300, 0.02);
    const targetIdx = GREETING_STATES.findIndex((s) => s.chipMode === mode);
    if (targetIdx !== -1) {
      this.selectIndex(targetIdx);
    }
  }

  selectIndex(index) {
    this.currentIndex = index % GREETING_STATES.length;
    this.updateDomState(this.currentIndex, true);
    this.pauseCycleTemporarily(12000);

    const st = GREETING_STATES[this.currentIndex];
    logCandidateEvent('greeting_mode_selected', {
      mode: st.mode,
      word: st.word,
      isBinary: st.mode === 'bin',
    });
  }

  startCycle() {
    this.stopCycle();
    this.cycleTimer = setInterval(() => {
      if (this.isCyclePaused || this.isScrambling || document.hidden) return;
      this.currentIndex = (this.currentIndex + 1) % GREETING_STATES.length;
      this.updateDomState(this.currentIndex, true);
    }, 4800);
  }

  stopCycle() {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
      this.cycleTimer = null;
    }
  }

  pauseCycleTemporarily(durationMs = 12000) {
    this.isCyclePaused = true;
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    this.pauseTimer = setTimeout(() => {
      this.isCyclePaused = false;
    }, durationMs);
  }

  updateDomState(index, animate = true) {
    const state = GREETING_STATES[index];
    if (!state) return;

    // Update Chip Active States
    [this.dom.btnModeEn, this.dom.btnModeEs, this.dom.btnModeBin].forEach((btn) => {
      if (!btn) return;
      const isMatch = btn.getAttribute('data-mode') === state.chipMode;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    // Update Annotation Badge
    const currentLang = getLanguage();
    const badgeText = currentLang === 'es' ? state.badgeTextEs : state.badgeTextEn;
    if (this.dom.annotationText) {
      this.dom.annotationText.textContent = badgeText;
    }

    // Animate text transition
    if (animate && this.dom.textDisplay) {
      this.scrambleTransition(this.dom.textDisplay, state.display);
    } else if (this.dom.textDisplay) {
      this.dom.textDisplay.textContent = state.display;
    }
  }

  /**
   * Hacker/Cyber character scrambler effect using binary digits '0' and '1'
   * @param {HTMLElement} element
   * @param {string} targetText
   */
  scrambleTransition(element, targetText) {
    if (!element) return;

    // Check reduced motion preference or low-spec device profile
    if (
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      document.documentElement.classList.contains('low-spec-device') ||
      document.hidden
    ) {
      element.textContent = targetText;
      return;
    }

    this.isScrambling = true;
    const originalText = element.textContent || '';
    const chars = '01';
    const totalFrames = 12;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const resolvedChars = Math.floor(progress * targetText.length);

      let scrambled = targetText.slice(0, resolvedChars);
      for (let i = resolvedChars; i < targetText.length; i++) {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }

      element.textContent = scrambled;

      // Soft audio tick on every third frame
      if (frame % 3 === 0 && audio && !audio.isMuted) {
        audio.click(1800 + Math.random() * 400, 0.008);
      }

      if (frame >= totalFrames) {
        clearInterval(interval);
        element.textContent = targetText;
        this.isScrambling = false;
      }
    }, 28);
  }

  /**
   * Translates the monumental hero title between natural typography and raw UTF-8 binary code
   */
  toggleHeadlineBinary() {
    if (!this.dom.heroTitle) return;

    audio?.click(1500, 0.03);
    const btn = this.dom.btnHeadlineBinary;
    const label = this.dom.headlineBinaryLabel;
    const currentLang = getLanguage();

    if (!this.isHeadlineBinary) {
      // Switch to Binary
      this.isHeadlineBinary = true;
      this.originalHeadlineHtml = this.dom.heroTitle.innerHTML;
      const rawText = this.dom.heroTitle.innerText.replace(/\s+/g, ' ').trim();
      const binaryString = textToBinary(rawText);

      this.dom.heroTitle.classList.add('is-binary-headline');
      this.scrambleTransition(this.dom.heroTitle, binaryString);

      if (btn) btn.classList.add('active');
      if (label) {
        label.textContent = currentLang === 'es' ? 'Restaurar Titular' : 'Restore Headline';
      }

      if (typeof this.app?.showToast === 'function') {
        const msg = currentLang === 'es'
          ? '⚡ Titular decodificado a código binario UTF-8 (Ingeniería en Computadoras 4.0 GPA)'
          : '⚡ Headline decoded to UTF-8 Binary (Computer Engineering 4.0 GPA)';
        this.app.showToast(msg);
      }

      logCandidateEvent('headline_binary_toggled', { mode: 'binary', rawLength: rawText.length });
    } else {
      // Revert to pristine human text
      this.isHeadlineBinary = false;
      this.dom.heroTitle.classList.remove('is-binary-headline');

      // Re-populate from snapshot or dictionary
      if (this.originalHeadlineHtml) {
        this.dom.heroTitle.innerHTML = this.originalHeadlineHtml;
      }

      if (btn) btn.classList.remove('active');
      if (label) {
        label.textContent = currentLang === 'es' ? 'Titular en Binario' : 'Binary Headline';
      }

      if (typeof this.app?.showToast === 'function') {
        const msg = currentLang === 'es'
          ? '✓ Titular restaurado a tipografía editorial'
          : '✓ Headline restored to editorial typography';
        this.app.showToast(msg);
      }

      logCandidateEvent('headline_binary_toggled', { mode: 'restored' });
    }
  }

  copyCurrentGreeting() {
    const state = GREETING_STATES[this.currentIndex];
    if (!state) return;

    audio?.click(1600, 0.02);
    const textToCopy = state.word;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const copyLabel = this.dom.btnCopy?.querySelector('.copy-label');
        const origText = copyLabel ? copyLabel.textContent : 'Copy';
        if (copyLabel) copyLabel.textContent = 'Copied!';

        if (typeof this.app?.showToast === 'function') {
          const currentLang = getLanguage();
          const msg = state.mode === 'bin'
            ? (currentLang === 'es' ? '⚡ Código binario copiado al portapapeles' : '⚡ Binary code copied to clipboard')
            : (currentLang === 'es' ? '✓ Saludo copiado al portapapeles' : '✓ Greeting copied to clipboard');
          this.app.showToast(msg);
        }

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = origText;
        }, 1800);
      }).catch(() => {});
    }
  }

  setLanguage(lang) {
    // If user switches to Spanish, focus greeting on "Hola"
    // If user switches to English, focus greeting on "Hello"
    const targetIdx = lang === 'es' ? 1 : 0;
    this.selectIndex(targetIdx);

    // If headline is in binary, re-sync restored label
    if (this.dom.headlineBinaryLabel) {
      const isEs = lang === 'es';
      if (this.isHeadlineBinary) {
        this.dom.headlineBinaryLabel.textContent = isEs ? 'Restaurar Titular' : 'Restore Headline';
      } else {
        this.dom.headlineBinaryLabel.textContent = isEs ? 'Titular en Binario' : 'Binary Headline';
      }
    }
  }
}
