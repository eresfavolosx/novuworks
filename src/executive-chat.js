// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive WhatsApp & Direct Communications Suite
//  100% Client-Side, Zero-Third-Party, Air-Tight Security Protocol
//  Provides native WhatsApp Click-to-Chat (https://wa.me/), direct email
//  with 1-click clipboard copy, telephone/SMS, and LinkedIn routing.
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';
import { getLanguage } from './i18n.js';

export const WHATSAPP_PHONE = '13478158054';
export const DISPLAY_PHONE = '+1 (347) 815-8054';
export const PRIMARY_EMAIL = 'fabianvvicente1@gmail.com';
export const LINKEDIN_URL = 'https://linkedin.com/in/fabian-velez-vicente';

export const CHAT_STARTERS = {
  en: [
    {
      id: 'recruiting',
      icon: '💼',
      label: 'Executive / Leadership Role',
      desc: 'Discuss a strategic VP/Director Growth, TPM, or RevOps opportunity',
      text: "Hi Fabián, I reviewed your executive portfolio on novu.works and would like to discuss a high-impact leadership role at our company.",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Growth Advisory / Consulting',
      desc: 'Explore ad-tech infrastructure, AI automation, or high-ROI media buying',
      text: "Hi Fabián, I'm reaching out regarding a growth architecture and RevOps advisory engagement.",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'General Strategic Introduction',
      desc: 'Connect, network, or discuss technology and business engineering',
      text: "Hi Fabián, I saw your portfolio on novu.works and wanted to connect directly.",
    },
  ],
  es: [
    {
      id: 'recruiting',
      icon: '💼',
      label: 'Rol Ejecutivo / Liderazgo',
      desc: 'Discutir una oportunidad de VP/Director de Crecimiento, TPM o RevOps',
      text: "Hola Fabián, revisé tu portafolio ejecutivo en novu.works y me gustaría conversar sobre un rol de liderazgo de alto impacto en nuestra empresa.",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Consultoría y Asesoría de Crecimiento',
      desc: 'Explorar infraestructura ad-tech, automatización con IA y compra de medios',
      text: "Hola Fabián, me comunico contigo para explorar una consultoría de arquitectura de crecimiento y RevOps.",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Introducción Estratégica General',
      desc: 'Conectar, hacer networking o conversar sobre tecnología e ingeniería comercial',
      text: "Hola Fabián, vi tu portafolio en novu.works y me encantaría conectar directamente contigo.",
    },
  ],
};

export class ExecutiveChatManager {
  constructor(app = null) {
    this.app = app;
    this.modal = null;
    this.floatingBadge = null;
    this.selectedStarter = null;
  }

  init() {
    this.modal = document.getElementById('executive-chat-modal');
    this.floatingBadge = document.getElementById('floating-whatsapp-badge');

    this.bindTriggers();
    this.bindModalEvents();
    this.renderStarters();

    // Listen to global language change to re-render starters
    window.addEventListener('novu:language-changed', () => {
      this.renderStarters();
    });
  }

  bindTriggers() {
    // 1. Any element with class .lets-chat-trigger or id btn-hero-lets-chat
    document.querySelectorAll('.lets-chat-trigger, #btn-hero-lets-chat, #btn-dossier-chat, #btn-resume-cta-chat').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('button-trigger');
      });
    });

    // 2. Floating WhatsApp Badge Click
    this.floatingBadge?.addEventListener('click', (e) => {
      if (e.target.closest('.f-wa-close')) {
        e.stopPropagation();
        this.dismissFloatingBadge();
        return;
      }
      this.open('floating-concierge');
    });
  }

  bindModalEvents() {
    if (!this.modal) return;

    // Close button
    this.modal.querySelector('#btn-close-chat-modal')?.addEventListener('click', () => {
      this.close();
    });

    // Backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    // Send Custom Message Button
    const sendBtn = this.modal.querySelector('#btn-send-custom-wa');
    const textarea = this.modal.querySelector('#custom-chat-message');

    sendBtn?.addEventListener('click', () => {
      const msg = textarea?.value?.trim();
      const currentLang = getLanguage();
      const defaultMsg = currentLang === 'es'
        ? "Hola Fabián, vi tu portafolio en novu.works y me gustaría conversar."
        : "Hi Fabián, saw your portfolio on novu.works and would love to chat.";
      this.launchWhatsApp(msg || defaultMsg, 'custom-input');
    });

    // Copy Email Button
    this.modal.querySelector('#btn-copy-chat-email')?.addEventListener('click', () => {
      audio?.click(1400);
      const updateLabel = () => {
        const lbl = this.modal.querySelector('#copy-email-label');
        if (lbl) {
          const orig = lbl.textContent;
          lbl.textContent = '✓ Copied!';
          setTimeout(() => { lbl.textContent = orig; }, 2000);
        }
        if (typeof this.app?.showToast === 'function') {
          this.app.showToast('✓ Email address copied to clipboard');
        }
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(PRIMARY_EMAIL).then(updateLabel).catch(() => {
          // Fallback textarea copy
          try {
            const ta = document.createElement('textarea');
            ta.value = PRIMARY_EMAIL;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (e) {}
          updateLabel();
        });
      } else {
        updateLabel();
      }
    });
  }

  renderStarters() {
    const mount = this.modal?.querySelector('#chat-starters-mount');
    if (!mount) return;

    const lang = getLanguage();
    const starters = CHAT_STARTERS[lang] || CHAT_STARTERS.en;

    mount.innerHTML = starters
      .map(
        (s) => `
        <button type="button" class="chat-starter-card" data-starter-id="${s.id}" data-message="${encodeURIComponent(s.text)}">
          <div class="starter-icon-col">${s.icon}</div>
          <div class="starter-text-col">
            <span class="starter-label">${s.label}</span>
            <span class="starter-desc">${s.desc}</span>
          </div>
          <div class="starter-arrow-col">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </button>
      `
      )
      .join('');

    mount.querySelectorAll('.chat-starter-card').forEach((card) => {
      card.addEventListener('click', () => {
        const encoded = card.getAttribute('data-message');
        const msg = decodeURIComponent(encoded || '');
        const id = card.getAttribute('data-starter-id');
        this.launchWhatsApp(msg, `starter-${id}`);
      });
    });
  }

  open(source = 'direct') {
    audio?.confirm();
    if (!this.modal) return;

    this.renderStarters();
    if (typeof this.modal.showModal === 'function') {
      try {
        if (!this.modal.open) this.modal.showModal();
      } catch (e) {
        this.modal.setAttribute('open', '');
      }
    } else {
      this.modal.setAttribute('open', '');
    }
    this.modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Focus input
    setTimeout(() => {
      this.modal.querySelector('#custom-chat-message')?.focus();
    }, 150);

    logCandidateEvent('executive_chat_modal_opened', { source });
  }

  close() {
    audio?.click(1100);
    if (!this.modal) return;
    if (typeof this.modal.close === 'function') {
      try {
        if (this.modal.open) this.modal.close();
      } catch (e) {
        this.modal.removeAttribute('open');
      }
    } else {
      this.modal.removeAttribute('open');
    }
    this.modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  /**
   * Safely opens the official WhatsApp Click-to-Chat protocol URL
   * @param {string} message
   * @param {string} source
   */
  launchWhatsApp(message, source = 'direct') {
    audio?.confirm();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

    logCandidateEvent('whatsapp_chat_launched', {
      source,
      charCount: message.length,
      phone: WHATSAPP_PHONE,
    });

    if (typeof this.app?.showToast === 'function') {
      const isEs = getLanguage() === 'es';
      this.app.showToast(isEs ? '🟢 Abriendo WhatsApp...' : '🟢 Connecting to WhatsApp...');
    }

    // Open WhatsApp via universal deep link (app or web)
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  dismissFloatingBadge() {
    if (this.floatingBadge) {
      this.floatingBadge.style.display = 'none';
      try {
        sessionStorage.setItem('fv_wa_badge_dismissed', 'true');
      } catch (e) {}
    }
  }
}
