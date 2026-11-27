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
import { bindDialogLightDismissFallback, copyTextToClipboard } from './utils.js';

export const WHATSAPP_PHONE = '13478158054';
export const DISPLAY_PHONE = '+1 (347) 815-8054';
export const PRIMARY_EMAIL = 'fabianvvicente1@gmail.com';
export const LINKEDIN_URL = 'https://linkedin.com/in/fabian-velez-vicente';

export const CHAT_STARTERS = {
  en: [
    {
      id: 'recruiting',
      icon: '✨',
      label: 'Creative, Experiments / Maker Role',
      desc: 'Discuss a Creative Technologist, Frontier Prototyping, or AI role',
      text: "Hi Fabián, I explored your interactive prototypes on novu.works and would love to discuss a Creative Technologist / Frontier Experiments role with our team.",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Interactive Prototyping & AI Lab',
      desc: 'Collaborate on frontier model orchestration, WebGL/WebRTC, or interactive stories',
      text: "Hi Fabián, I'm reaching out to collaborate on an interactive AI prototype and creative technology experiment.",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Creative & Technical Introduction',
      desc: 'Connect, share ideas, or discuss storytelling, design, and frontier tech',
      text: "Hi Fabián, I saw your creative technology experiments on novu.works and wanted to connect directly.",
    },
  ],
  es: [
    {
      id: 'recruiting',
      icon: '✨',
      label: 'Rol de Creative Technologist / Maker',
      desc: 'Conversar sobre un rol de Tecnología Creativa, Prototipado de Frontera o IA',
      text: "Hola Fabián, exploré tus prototipos interactivos en novu.works y me gustaría conversar sobre un rol de Creative Technologist en nuestro equipo.",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Prototipado Interactivo y Laboratorio de IA',
      desc: 'Colaborar en orquestación de modelos de frontera, WebGL/WebRTC o narrativa',
      text: "Hola Fabián, me comunico contigo para colaborar en un prototipo interactivo de IA y tecnología creativa.",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Introducción Creativa y Técnica',
      desc: 'Conectar, compartir ideas o conversar sobre narrativa, diseño y tecnología',
      text: "Hola Fabián, vi tus experimentos de tecnología creativa en novu.works y me encantaría conectar directamente contigo.",
    },
  ],
};

export const EMAIL_STARTERS = {
  en: [
    {
      id: 'recruiting',
      icon: '✨',
      label: 'Creative, Experiments / Maker Role',
      desc: 'Discuss a Creative Technologist, Frontier Prototyping, or AI role',
      subject: 'Creative Technologist / Frontier Experiments Opportunity — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI explored your interactive prototypes and creative technology experiments on novu.works and would love to discuss a role on our team.\n\nLooking forward to speaking soon,\n[Your Name]\n[Your Team]",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Interactive Prototyping & AI Collaboration',
      desc: 'Explore frontier model orchestration, WebGL/WebRTC, or interactive stories',
      subject: 'Creative Technology & Prototyping Collaboration — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI'm reaching out regarding an interactive AI prototype and creative technology collaboration.\n\nBest regards,\n[Your Name]\n[Your Organization]",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Creative & Technical Introduction',
      desc: 'Connect, share ideas, or discuss storytelling, design, and frontier tech',
      subject: 'Creative Technology Introduction — Fabián Vélez Vicente',
      body: "Hi Fabián,\n\nI saw your work on novu.works and wanted to connect directly to discuss creative technology, design, and frontier experiments.\n\nBest regards,\n[Your Name]",
    },
  ],
  es: [
    {
      id: 'recruiting',
      icon: '✨',
      label: 'Rol de Creative Technologist / Maker',
      desc: 'Conversar sobre un rol de Tecnología Creativa, Prototipado de Frontera o IA',
      subject: 'Oportunidad de Creative Technologist — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nExploré tus prototipos interactivos en novu.works y me gustaría conversar sobre una oportunidad en nuestro equipo.\n\nSaludos cordiales,\n[Tu Nombre]\n[Tu Equipo]",
    },
    {
      id: 'advisory',
      icon: '🚀',
      label: 'Colaboración de Prototipado Interactivo e IA',
      desc: 'Explorar orquestación de modelos de frontera, WebGL/WebRTC o narrativa',
      subject: 'Colaboración de Tecnología Creativa y Prototipado — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nMe comunico contigo para explorar una colaboración de prototipado interactivo y tecnología creativa.\n\nSaludos cordiales,\n[Tu Nombre]\n[Tu Organización]",
    },
    {
      id: 'general',
      icon: '🤝',
      label: 'Introducción Creativa y Técnica',
      desc: 'Conectar, compartir ideas o conversar sobre narrativa, diseño y tecnología',
      subject: 'Introducción de Tecnología Creativa — Fabián Vélez Vicente',
      body: "Hola Fabián,\n\nVi tu trabajo en novu.works y me encantaría conectar directamente contigo para conversar sobre tecnología creativa e innovación.\n\nSaludos cordiales,\n[Tu Nombre]",
    },
  ],
};

export class ExecutiveChatManager {
  constructor(app = null) {
    this.app = app;
    this.modal = null;
    this.floatingBadge = null;
    this.activeChannel = 'whatsapp'; // 'whatsapp' | 'email'
    this._copyResetTimer = null;
    this._composerHighlightTimer = null;
    this._focusTimer = null;
    this._defaultSubjects = {
      en: 'Strategic Role Inquiry — Fabián Vélez Vicente',
      es: 'Consulta de Rol Estratégico — Fabián Vélez Vicente',
    };
  }

  init() {
    this.modal = document.getElementById('executive-chat-modal');
    this.floatingBadge = document.getElementById('floating-whatsapp-badge');

    // Respect previously dismissed floating concierge badge in sessionStorage
    try {
      if (this.floatingBadge && sessionStorage.getItem('fv_wa_badge_dismissed') === 'true') {
        this.floatingBadge.style.display = 'none';
      }
    } catch (e) {}

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
    this.updateHeaderStatus();
    this.updateComposerLocalization();

    // Listen to global language change to re-render starters and update status text
    window.addEventListener('novu:language-changed', () => {
      this.renderStarters();
      this.renderEmailStarters();
      this.updateHeaderStatus();
      this.updateComposerLocalization();
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
      if (e.target.closest('#btn-floating-wa')) {
        this.open('floating-concierge');
      }
    });
  }

  bindModalEvents() {
    if (!this.modal) return;

    // Close button
    this.modal.querySelector('#btn-close-chat-modal')?.addEventListener('click', () => {
      this.close();
    });

    // Outside-rect light-dismiss fallback & native close sync (no manual Escape handler)
    bindDialogLightDismissFallback(this.modal, () => this.close());
    this.modal.addEventListener('close', () => {
      if (this._focusTimer) {
        clearTimeout(this._focusTimer);
        this._focusTimer = null;
      }
      this.modal?.classList.remove('active');
      document.body.classList.remove('modal-open');
    });

    // Channel Switcher Tabs & WAI-ARIA Arrow/Home/End Navigation
    const tabWa = this.modal.querySelector('#tab-chat-whatsapp');
    const tabEmail = this.modal.querySelector('#tab-chat-email');
    const channelTabs = [
      { btn: tabWa, channel: 'whatsapp' },
      { btn: tabEmail, channel: 'email' },
    ].filter((t) => t.btn);

    channelTabs.forEach(({ btn, channel }, idx) => {
      btn.addEventListener('click', () => {
        this.switchChannel(channel);
      });

      btn.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        let nextIdx = idx;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % channelTabs.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + channelTabs.length) % channelTabs.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = channelTabs.length - 1;
        const target = channelTabs[nextIdx];
        if (target) {
          this.switchChannel(target.channel, { focusTab: true });
        }
      });
    });

    // Sync active tab when browser Find-in-Page matches inside hidden="until-found" panel
    this.modal.querySelector('#panel-chat-whatsapp')?.addEventListener('beforematch', () => {
      this.switchChannel('whatsapp', { silent: true });
    });
    this.modal.querySelector('#panel-chat-email')?.addEventListener('beforematch', () => {
      this.switchChannel('email', { silent: true });
    });

    // Channel Switch Nudges (move focus to newly selected tab before hiding current panel)
    this.modal.querySelector('#btn-nudge-to-email')?.addEventListener('click', () => {
      this.switchChannel('email', { focusTab: true });
    });

    this.modal.querySelector('#btn-nudge-to-wa')?.addEventListener('click', () => {
      this.switchChannel('whatsapp', { focusTab: true });
    });

    // WhatsApp: Send Custom Message Button & Cmd/Ctrl+Enter Shortcut
    const sendWaBtn = this.modal.querySelector('#btn-send-custom-wa');
    const waTextarea = this.modal.querySelector('#custom-chat-message');
    const sendCustomWhatsApp = () => {
      const msg = waTextarea?.value?.trim();
      const currentLang = getLanguage();
      const defaultMsg = currentLang === 'es'
        ? "Hola Fabián, vi tu portafolio en novu.works y me gustaría conversar."
        : "Hi Fabián, saw your portfolio on novu.works and would love to chat.";
      this.launchWhatsApp(msg || defaultMsg, 'custom-input');
    };

    sendWaBtn?.addEventListener('click', sendCustomWhatsApp);
    waTextarea?.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        sendCustomWhatsApp();
      }
    });

    // Email: Copy Email Buttons (handles all instances inside modal)
    this.modal.querySelectorAll('#btn-copy-chat-email, .btn-copy-email-action').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.copyEmail();
      });
    });

    // Email: Direct Mailto Link Click
    this.modal.querySelector('#btn-direct-mailto')?.addEventListener('click', () => {
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

    // Email: Custom Email Compose & Send Buttons + Cmd/Ctrl+Enter Shortcut
    const sendEmailBtn = this.modal.querySelector('#btn-send-custom-email');
    const sendGmailBtn = this.modal.querySelector('#btn-send-custom-gmail');
    const emailSubject = this.modal.querySelector('#custom-email-subject');
    const emailBody = this.modal.querySelector('#custom-email-body');
    const sendCustomEmail = (client, source) => {
      const isEs = getLanguage() === 'es';
      const fallbackSubject = isEs ? this._defaultSubjects.es : this._defaultSubjects.en;
      const fallbackBody = isEs
        ? 'Hola Fabián,\n\nMe comunico contigo desde tu portafolio ejecutivo en novu.works.'
        : 'Hi Fabián,\n\nReaching out from your executive portfolio on novu.works.';
      const subject = emailSubject?.value?.trim() || fallbackSubject;
      const body = emailBody?.value?.trim() || fallbackBody;
      this.launchEmail(subject, body, client, source);
    };

    sendEmailBtn?.addEventListener('click', () => {
      sendCustomEmail('default', 'custom-composer-mailto');
    });

    sendGmailBtn?.addEventListener('click', () => {
      sendCustomEmail('gmail', 'custom-composer-gmail');
    });

    emailBody?.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        sendCustomEmail('default', 'custom-composer-shortcut');
      }
    });
  }

  /**
   * Switch between WhatsApp live chat and Executive direct email
   * @param {'whatsapp' | 'email'} channel
   * @param {{ silent?: boolean, focusTab?: boolean }} [options]
   */
  switchChannel(channel, { silent = false, focusTab = false } = {}) {
    if (channel !== 'whatsapp' && channel !== 'email') channel = 'whatsapp';
    this.activeChannel = channel;

    if (!silent) {
      audio?.click(channel === 'whatsapp' ? 1200 : 1000);
      try {
        localStorage.setItem('fabian_preferred_chat_channel', channel);
      } catch (e) {}
    }

    const tabWa = this.modal?.querySelector('#tab-chat-whatsapp');
    const tabEmail = this.modal?.querySelector('#tab-chat-email');
    const panelWa = this.modal?.querySelector('#panel-chat-whatsapp');
    const panelEmail = this.modal?.querySelector('#panel-chat-email');
    const isWa = channel === 'whatsapp';

    if (tabWa) {
      tabWa.classList.toggle('active', isWa);
      tabWa.setAttribute('aria-selected', String(isWa));
      tabWa.setAttribute('tabindex', isWa ? '0' : '-1');
    }
    if (tabEmail) {
      tabEmail.classList.toggle('active', !isWa);
      tabEmail.setAttribute('aria-selected', String(!isWa));
      tabEmail.setAttribute('tabindex', !isWa ? '0' : '-1');
    }

    if (panelWa) {
      if (isWa) {
        panelWa.removeAttribute('hidden');
        panelWa.classList.add('active');
      } else {
        panelWa.hidden = 'until-found';
        panelWa.classList.remove('active');
      }
    }

    if (panelEmail) {
      if (!isWa) {
        panelEmail.removeAttribute('hidden');
        panelEmail.classList.add('active');
      } else {
        panelEmail.hidden = 'until-found';
        panelEmail.classList.remove('active');
      }
    }

    if (focusTab) {
      (isWa ? tabWa : tabEmail)?.focus();
    }

    this.updateHeaderStatus();
    if (!silent) {
      logCandidateEvent('executive_chat_channel_switched', { channel });
    }
  }

  updateHeaderStatus() {
    const isEs = getLanguage() === 'es';
    const statusText = this.modal?.querySelector('#chat-header-status-text');
    const statusDot = this.modal?.querySelector('#chat-header-status-dot');

    if (this.activeChannel === 'whatsapp') {
      if (statusText) {
        statusText.dataset.channel = 'whatsapp';
        statusText.setAttribute('data-i18n', 'chat_status_online');
        statusText.textContent = isEs
          ? '🟢 WhatsApp Directo · Suele responder en minutos'
          : '🟢 WhatsApp Direct · Usually replies in minutes';
      }
      if (statusDot) {
        statusDot.dataset.channel = 'whatsapp';
      }
    } else {
      if (statusText) {
        statusText.dataset.channel = 'email';
        statusText.setAttribute('data-i18n', 'chat_status_email');
        statusText.textContent = isEs
          ? '✉️ Bandeja Directa · Respuesta en menos de 2 horas'
          : '✉️ Direct Inbox · Response within 2 hours';
      }
      if (statusDot) {
        statusDot.dataset.channel = 'email';
      }
    }
  }

  updateComposerLocalization() {
    if (!this.modal) return;
    const lang = getLanguage() === 'es' ? 'es' : 'en';
    const isEs = lang === 'es';

    const waTextarea = this.modal.querySelector('#custom-chat-message');
    if (waTextarea) {
      waTextarea.placeholder = isEs ? 'Escribe tu mensaje aquí...' : 'Write your message here...';
    }

    const emailSubject = this.modal.querySelector('#custom-email-subject');
    if (emailSubject) {
      emailSubject.placeholder = isEs
        ? 'Asunto: Consulta de Rol Estratégico / Colaboración...'
        : 'Subject: Strategic Role / Advisory Inquiry...';
      const val = emailSubject.value.trim();
      if (!val || val === this._defaultSubjects.en || val === this._defaultSubjects.es) {
        emailSubject.value = this._defaultSubjects[lang];
      }
    }

    const emailBody = this.modal.querySelector('#custom-email-body');
    if (emailBody) {
      emailBody.placeholder = isEs ? 'Escribe tu mensaje aquí...' : 'Write your message here...';
    }

    const subjLabel = this.modal.querySelector('#label-custom-email-subject');
    if (subjLabel) {
      subjLabel.textContent = isEs ? 'Asunto del correo' : 'Executive Email Subject';
    }

    const bodyLabel = this.modal.querySelector('#label-custom-email-body');
    if (bodyLabel) {
      bodyLabel.textContent = isEs ? 'Cuerpo del correo' : 'Executive Email Message Body';
    }
  }

  announceStatus(message) {
    const region = this.modal?.querySelector('#chat-modal-live-status');
    if (!region || !message) return;
    if (region.textContent === message) {
      region.textContent = '';
      requestAnimationFrame(() => {
        if (region) region.textContent = message;
      });
    } else {
      region.textContent = message;
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
          <span class="starter-icon-col" aria-hidden="true">${s.icon}</span>
          <span class="starter-text-col">
            <span class="starter-label">${s.label}</span>
            <span class="starter-desc">${s.desc}</span>
          </span>
          <span class="starter-arrow-col" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
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
          <span class="starter-icon-col" aria-hidden="true">${s.icon}</span>
          <span class="starter-text-col">
            <span class="starter-label">${s.label}</span>
            <span class="starter-desc">${s.desc}</span>
          </span>
          <span class="starter-arrow-col email-arrow-col" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </span>
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
          if (this._composerHighlightTimer) {
            clearTimeout(this._composerHighlightTimer);
          }
          composer.classList.add('composer-highlight');
          this._composerHighlightTimer = setTimeout(() => {
            composer.classList.remove('composer-highlight');
            this._composerHighlightTimer = null;
          }, 1200);
        }

        const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) {
          bodyInput?.focus();
        } else {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          composer?.scrollIntoView({ block: 'nearest', behavior: prefersReduced ? 'auto' : 'smooth' });
        }

        const isEs = getLanguage() === 'es';
        this.announceStatus(isEs ? 'Plantilla de correo cargada en el borrador' : 'Email template loaded into draft');
        if (typeof this.app?.showToast === 'function') {
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

    const isEs = getLanguage() === 'es';
    this.announceStatus(isEs ? 'Abriendo WhatsApp...' : 'Connecting to WhatsApp...');
    if (typeof this.app?.showToast === 'function') {
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
      this.announceStatus(isEs ? 'Abriendo Gmail Web...' : 'Opening Gmail Web...');
      if (typeof this.app?.showToast === 'function') {
        this.app.showToast(isEs ? '✉️ Abriendo Gmail Web...' : '✉️ Opening Gmail Web...');
      }
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      this.announceStatus(isEs ? 'Abriendo cliente de correo...' : 'Opening email client...');
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

    const showFeedback = (copiedOk) => {
      if (this._copyResetTimer) {
        clearTimeout(this._copyResetTimer);
      }

      this.modal?.querySelectorAll('#copy-email-label').forEach((lbl) => {
        lbl.textContent = copiedText;
      });

      this._copyResetTimer = setTimeout(() => {
        const resetLabel = getLanguage() === 'es' ? 'Copiar Correo' : 'Copy Address';
        this.modal?.querySelectorAll('#copy-email-label').forEach((lbl) => {
          lbl.textContent = resetLabel;
        });
        this._copyResetTimer = null;
      }, 2000);

      const statusMsg = copiedOk
        ? (isEs ? 'Correo copiado al portapapeles' : 'Email address copied to clipboard')
        : PRIMARY_EMAIL;
      this.announceStatus(statusMsg);

      if (typeof this.app?.showToast === 'function') {
        this.app.showToast(
          copiedOk
            ? (isEs ? '✓ Correo copiado al portapapeles' : '✓ Email address copied to clipboard')
            : PRIMARY_EMAIL
        );
      }
    };

    copyTextToClipboard(PRIMARY_EMAIL).then(showFeedback);
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
    this.switchChannel(channel, { silent: true });

    this.renderStarters();
    this.renderEmailStarters();
    this.updateComposerLocalization();

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
    if (this._focusTimer) {
      clearTimeout(this._focusTimer);
      this._focusTimer = null;
    }
    const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) {
      this._focusTimer = setTimeout(() => {
        this._focusTimer = null;
        if (!this.modal?.open) return;
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
    if (this._focusTimer) {
      clearTimeout(this._focusTimer);
      this._focusTimer = null;
    }
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
      const hadFocus = this.floatingBadge.contains(document.activeElement);
      this.floatingBadge.style.display = 'none';
      if (hadFocus) {
        document.getElementById('main-content')?.focus();
      }
      try {
        sessionStorage.setItem('fv_wa_badge_dismissed', 'true');
      } catch (e) {}
    }
  }
}
