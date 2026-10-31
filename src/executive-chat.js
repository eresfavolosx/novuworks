// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive WhatsApp & Direct Communications Suite
//  100% Client-Side, Zero-Third-Party, Air-Tight Security Protocol
//  Provides dual-channel access: Instant WhatsApp Live Chat and
//  Direct Executive Email with topic templates, 1-click clipboard copy,
//  Gmail Web integration, telephone/SMS, and LinkedIn routing.
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

export const EMAIL_STARTERS = {
  en: [
    {
      id: 'recruiting',
      icon: '💼',
      label: 'Executive / Leadership Role',
      desc: 'Discuss a strategic VP/Director Growth, TPM, or RevOps opportunity',
      subject: 'Strategic Executive Leadership Opportunity — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI reviewed your executive portfolio on novu.works and would like to discuss a high-impact leadership opportunity at our organization.\n\nLooking forward to speaking soon,\n[Your Name]\n[Your Company]",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Growth Advisory / Consulting',
      desc: 'Explore ad-tech infrastructure, AI automation, or high-ROI media buying',
      subject: 'Growth Advisory & Architecture Engagement — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI'm reaching out regarding a growth architecture and RevOps advisory engagement for our business.\n\nBest regards,\n[Your Name]\n[Your Company]",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'General Strategic Introduction',
      desc: 'Connect, network, or discuss technology and business engineering',
      subject: 'Strategic Introduction & Network — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI saw your portfolio on novu.works and wanted to connect directly to discuss technology and business innovation.\n\nBest regards,\n[Your Name]",
    },
  ],
  es: [
    {
      id: 'recruiting',
      icon: '💼',
      label: 'Rol Ejecutivo / Liderazgo',
      desc: 'Discutir una oportunidad de VP/Director de Crecimiento, TPM o RevOps',
      subject: 'Consulta sobre Rol Ejecutivo y Liderazgo — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nRevisé tu portafolio ejecutivo en novu.works y me gustaría conversar sobre una oportunidad de liderazgo de alto impacto en nuestra empresa.\n\nSaludos cordiales,\n[Tu Nombre]\n[Tu Empresa]",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Consultoría y Asesoría de Crecimiento',
      desc: 'Explorar infraestructura ad-tech, automatización con IA y compra de medios',
      subject: 'Consulta de Asesoría de Crecimiento y RevOps — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nMe comunico contigo para explorar una consultoría de arquitectura de crecimiento y RevOps para nuestra empresa.\n\nSaludos cordiales,\n[Tu Nombre]\n[Tu Empresa]",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Introducción Estratégica General',
      desc: 'Conectar, hacer networking o conversar sobre tecnología e ingeniería comercial',
      subject: 'Introducción Estratégica — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nVi tu portafolio en novu.works y me encantaría conectar directamente contigo para conversar sobre tecnología e innovación comercial.\n\nSaludos cordiales,\n[Tu Nombre]",
    },
  ],
};

export class ExecutiveChatManager {
  constructor(app = null) {
    this.app = app;
    this.modal = null;
    this.floatingBadge = null;
    this.activeChannel = 'whatsapp'; // 'whatsapp' | 'email'
  }

  init() {
    this.modal = document.getElementById('executive-chat-modal');
    this.floatingBadge = document.getElementById('floating-whatsapp-badge');

    // Retrieve user's stored channel preference if available
    try {
      const stored = localStorage.getItem('fabian_preferred_chat_channel');
      if (stored === 'email' || stored === 'whatsapp') {
        this.activeChannel = stored;
      }
    } catch (e) {}

    this.bindTriggers();
    this.bindModalEvents();
    this.renderStarters();
    this.renderEmailStarters();

    // Listen to global language change to re-render starters and update status text
    window.addEventListener('novu:language-changed', () => {
      this.renderStarters();
      this.renderEmailStarters();
      this.updateHeaderStatus();
    });
  }

  bindTriggers() {
    // 1. Any element with class .lets-chat-trigger or ids
    document.querySelectorAll('.lets-chat-trigger, #btn-hero-lets-chat, #btn-dossier-chat, #btn-resume-cta-chat').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preferredChannel = btn.getAttribute('data-chat-channel') || null;
        this.open('button-trigger', preferredChannel);
      });
    });

    // 2. Floating WhatsApp Concierge Badge Click
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

    // Channel Switcher Tabs
    const tabWa = this.modal.querySelector('#tab-chat-whatsapp');
    const tabEmail = this.modal.querySelector('#tab-chat-email');

    tabWa?.addEventListener('click', () => {
      this.switchChannel('whatsapp');
    });

    tabEmail?.addEventListener('click', () => {
      this.switchChannel('email');
    });

    // Channel Switch Nudges
    this.modal.querySelector('#btn-nudge-to-email')?.addEventListener('click', () => {
      this.switchChannel('email');
    });

    this.modal.querySelector('#btn-nudge-to-wa')?.addEventListener('click', () => {
      this.switchChannel('whatsapp');
    });

    // WhatsApp: Send Custom Message Button
    const sendWaBtn = this.modal.querySelector('#btn-send-custom-wa');
    const waTextarea = this.modal.querySelector('#custom-chat-message');

    sendWaBtn?.addEventListener('click', () => {
      const msg = waTextarea?.value?.trim();
      const currentLang = getLanguage();
      const defaultMsg = currentLang === 'es'
        ? "Hola Fabián, vi tu portafolio en novu.works y me gustaría conversar."
        : "Hi Fabián, saw your portfolio on novu.works and would love to chat.";
      this.launchWhatsApp(msg || defaultMsg, 'custom-input');
    });

    // Email: Copy Email Buttons (handles all instances inside modal)
    this.modal.querySelectorAll('#btn-copy-chat-email, .btn-copy-email-action').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.copyEmail();
      });
    });

    // Email: Direct Mailto Link Click
    this.modal.querySelector('#btn-direct-mailto')?.addEventListener('click', (e) => {
      audio?.confirm();
      logCandidateEvent('email_inquiry_launched', { client: 'mailto-direct' });
    });

    // Email: Open in Gmail Web Pill
    this.modal.querySelector('#btn-open-gmail-web')?.addEventListener('click', () => {
      const isEs = getLanguage() === 'es';
      const defaultSubject = isEs ? 'Consulta Ejecutiva — Fabián Vélez Vicente' : 'Strategic Executive Inquiry — Fabián Vélez Vicente';
      const defaultBody = isEs ? 'Hola Fabián, me comunico contigo desde tu portafolio novu.works.' : 'Hi Fabián, reaching out from your portfolio on novu.works.';
      this.launchEmail(defaultSubject, defaultBody, 'gmail', 'gmail-web-pill');
    });

    // Email: Custom Email Compose & Send Buttons
    const sendEmailBtn = this.modal.querySelector('#btn-send-custom-email');
    const sendGmailBtn = this.modal.querySelector('#btn-send-custom-gmail');
    const emailSubject = this.modal.querySelector('#custom-email-subject');
    const emailBody = this.modal.querySelector('#custom-email-body');

    sendEmailBtn?.addEventListener('click', () => {
      const subject = emailSubject?.value?.trim() || 'Strategic Role Inquiry — Fabián Vélez Vicente';
      const body = emailBody?.value?.trim() || 'Hi Fabián,\n\nReaching out from your executive portfolio on novu.works.';
      this.launchEmail(subject, body, 'default', 'custom-composer-mailto');
    });

    sendGmailBtn?.addEventListener('click', () => {
      const subject = emailSubject?.value?.trim() || 'Strategic Role Inquiry — Fabián Vélez Vicente';
      const body = emailBody?.value?.trim() || 'Hi Fabián,\n\nReaching out from your executive portfolio on novu.works.';
      this.launchEmail(subject, body, 'gmail', 'custom-composer-gmail');
    });
  }

  /**
   * Switch between WhatsApp live chat and Executive direct email
   * @param {'whatsapp' | 'email'} channel
   */
  switchChannel(channel) {
    if (channel !== 'whatsapp' && channel !== 'email') channel = 'whatsapp';
    this.activeChannel = channel;

    audio?.click(channel === 'whatsapp' ? 1200 : 1000);

    // Save user preference
    try {
      localStorage.setItem('fabian_preferred_chat_channel', channel);
    } catch (e) {}

    const tabWa = this.modal?.querySelector('#tab-chat-whatsapp');
    const tabEmail = this.modal?.querySelector('#tab-chat-email');
    const panelWa = this.modal?.querySelector('#panel-chat-whatsapp');
    const panelEmail = this.modal?.querySelector('#panel-chat-email');

    if (channel === 'whatsapp') {
      tabWa?.classList.add('active');
      tabWa?.setAttribute('aria-selected', 'true');
      tabEmail?.classList.remove('active');
      tabEmail?.setAttribute('aria-selected', 'false');

      if (panelWa) {
        panelWa.removeAttribute('hidden');
        panelWa.classList.add('active');
      }
      if (panelEmail) {
        panelEmail.setAttribute('hidden', '');
        panelEmail.classList.remove('active');
      }
    } else {
      tabEmail?.classList.add('active');
      tabEmail?.setAttribute('aria-selected', 'true');
      tabWa?.classList.remove('active');
      tabWa?.setAttribute('aria-selected', 'false');

      if (panelEmail) {
        panelEmail.removeAttribute('hidden');
        panelEmail.classList.add('active');
      }
      if (panelWa) {
        panelWa.setAttribute('hidden', '');
        panelWa.classList.remove('active');
      }
    }

    this.updateHeaderStatus();
    logCandidateEvent('executive_chat_channel_switched', { channel });
  }

  updateHeaderStatus() {
    const isEs = getLanguage() === 'es';
    const statusText = this.modal?.querySelector('#chat-header-status-text');
    const statusDot = this.modal?.querySelector('#chat-header-status-dot');

    if (this.activeChannel === 'whatsapp') {
      if (statusText) {
        statusText.textContent = isEs
          ? '🟢 WhatsApp Directo · Suele responder en minutos'
          : '🟢 WhatsApp Direct · Usually replies in minutes';
        statusText.style.color = '#a7f3d0';
      }
      if (statusDot) {
        statusDot.style.background = '#25D366';
        statusDot.style.boxShadow = '0 0 8px #25D366';
      }
    } else {
      if (statusText) {
        statusText.textContent = isEs
          ? '✉️ Correo Ejecutivo Directo · Respuesta en menos de 2 horas'
          : '✉️ Direct Executive Email · Response within 2 hours';
        statusText.style.color = '#fde68a';
      }
      if (statusDot) {
        statusDot.style.background = 'var(--gold-primary)';
        statusDot.style.boxShadow = '0 0 8px var(--gold-primary)';
      }
    }
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

  renderEmailStarters() {
    const mount = this.modal?.querySelector('#email-starters-mount');
    if (!mount) return;

    const lang = getLanguage();
    const starters = EMAIL_STARTERS[lang] || EMAIL_STARTERS.en;

    mount.innerHTML = starters
      .map(
        (s) => `
        <button type="button" class="chat-starter-card email-starter-card" data-email-id="${s.id}" data-subject="${encodeURIComponent(s.subject)}" data-body="${encodeURIComponent(s.body)}">
          <div class="starter-icon-col">${s.icon}</div>
          <div class="starter-text-col">
            <span class="starter-label">${s.label}</span>
            <span class="starter-desc">${s.desc}</span>
          </div>
          <div class="starter-arrow-col email-arrow-col">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
        </button>
      `
      )
      .join('');

    mount.querySelectorAll('.email-starter-card').forEach((card) => {
      card.addEventListener('click', () => {
        audio?.click(1250);
        const subj = decodeURIComponent(card.getAttribute('data-subject') || '');
        const body = decodeURIComponent(card.getAttribute('data-body') || '');

        const subjInput = this.modal?.querySelector('#custom-email-subject');
        const bodyInput = this.modal?.querySelector('#custom-email-body');

        if (subjInput) subjInput.value = subj;
        if (bodyInput) bodyInput.value = body;

        // Visual flash indication on the composer
        const composer = this.modal?.querySelector('.email-composer-box');
        if (composer) {
          composer.classList.add('composer-highlight');
          setTimeout(() => composer.classList.remove('composer-highlight'), 1200);
        }

        bodyInput?.focus();
        if (typeof this.app?.showToast === 'function') {
          const isEs = getLanguage() === 'es';
          this.app.showToast(isEs ? '📋 Plantilla de correo cargada' : '📋 Email template loaded');
        }
      });
    });
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

  /**
   * Safely opens the direct executive email channel (mailto or Gmail Web)
   * @param {string} subject
   * @param {string} body
   * @param {'default' | 'gmail'} client
   * @param {string} source
   */
  launchEmail(subject, body, client = 'default', source = 'direct') {
    audio?.confirm();
    const isEs = getLanguage() === 'es';

    logCandidateEvent('executive_email_launched', {
      client,
      source,
      subjectLen: subject.length,
      bodyLen: body.length,
    });

    if (client === 'gmail') {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PRIMARY_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (typeof this.app?.showToast === 'function') {
        this.app.showToast(isEs ? '✉️ Abriendo Gmail Web...' : '✉️ Opening Gmail Web...');
      }
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (typeof this.app?.showToast === 'function') {
        this.app.showToast(isEs ? '✉️ Abriendo cliente de correo...' : '✉️ Opening email client...');
      }
      // Trigger via anchor click to ensure clean cross-browser mail client opening
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 200);
    }
  }

  /**
   * Copies the primary executive email to clipboard with feedback
   */
  copyEmail() {
    audio?.click(1400);
    const isEs = getLanguage() === 'es';
    const copiedText = isEs ? '✓ ¡Copiado!' : '✓ Copied!';

    const updateLabels = () => {
      this.modal?.querySelectorAll('#copy-email-label').forEach((lbl) => {
        const orig = lbl.getAttribute('data-orig') || lbl.textContent;
        lbl.setAttribute('data-orig', orig);
        lbl.textContent = copiedText;
        setTimeout(() => {
          lbl.textContent = orig;
        }, 2000);
      });

      if (typeof this.app?.showToast === 'function') {
        this.app.showToast(isEs ? '✓ Correo copiado al portapapeles' : '✓ Email address copied to clipboard');
      }
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PRIMARY_EMAIL).then(updateLabels).catch(() => {
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
        updateLabels();
      });
    } else {
      updateLabels();
    }
  }

  /**
   * Opens the communications popup modal with channel pre-selection
   * @param {string} source
   * @param {'whatsapp' | 'email' | null} preferredChannel
   */
  open(source = 'direct', preferredChannel = null) {
    audio?.confirm();
    if (!this.modal) return;

    const channel = preferredChannel || this.activeChannel || 'whatsapp';
    this.switchChannel(channel);

    this.renderStarters();
    this.renderEmailStarters();

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

    // Reset scroll position to top
    const modalBody = this.modal.querySelector('.chat-modal-body');
    if (modalBody) modalBody.scrollTop = 0;

    // Focus active channel's primary input only on desktop (avoids viewport shift / keyboard popup on mobile)
    const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) {
      setTimeout(() => {
        if (this.activeChannel === 'whatsapp') {
          this.modal.querySelector('#custom-chat-message')?.focus();
        } else {
          this.modal.querySelector('#custom-email-body')?.focus();
        }
      }, 150);
    }

    logCandidateEvent('executive_chat_modal_opened', { source, channel });
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

  dismissFloatingBadge() {
    if (this.floatingBadge) {
      this.floatingBadge.style.display = 'none';
      try {
        sessionStorage.setItem('fv_wa_badge_dismissed', 'true');
      } catch (e) {}
    }
  }
}
