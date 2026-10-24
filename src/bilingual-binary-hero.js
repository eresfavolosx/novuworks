// ─────────────────────────────────────────────────────────────
//  Novu Works — The Hybrid Trifecta Executive Showcase
//  Presents the rare synthesis of Engineering Rigor (4.0 GPA),
//  World-Class Product Design, and Commercial Growth Marketing ($10M+).
//  Eliminates overly geeky tropes in favor of executive polish.
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';
import { getLanguage } from './i18n.js';

export const DISCIPLINE_DATA = {
  en: {
    badge_title: 'BEYOND CODE · THE TRIFECTA OF MASTERY',
    badge_subtitle: 'A software engineer with exceptional design taste and multi-million dollar marketing instincts.',
    disciplines: {
      all: {
        id: 'all',
        icon: '✨',
        pillLabel: 'The Unified Hybrid',
        headline: 'Where Engineering Rigor Meets World-Class Design & Commercial Marketing',
        body: 'Most engineers write code without aesthetic empathy or commercial focus. Most marketers lack the technical horsepower to build proprietary ad-tech and autonomous AI systems. Fabián bridges the gap — uniting a 4.0 GPA in Computer Engineering, high-end product design sensibility, and a proven track record driving $10M+ in commercial revenue pipelines.',
        tags: [
          'The Rare Hybrid',
          'Design Craftsmanship',
          'Conversion Architecture',
          'Multi-Channel Growth',
          'Stanford Innovation Fellow'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Product & Experience Design',
        headline: 'Aesthetic Refinement, Human Emotion & Conversion Architecture',
        body: 'Obsessed with editorial typography, visual hierarchy, luxury micro-interactions, and frictionless user journeys. Crafting design systems where aesthetic polish meets rigorous usability to elevate brand equity, suppress churn (-83%), and maximize conversion rates across web and mobile.',
        tags: [
          'Design Systems (Figma)',
          'Editorial Typography',
          'User Psychology & CRO',
          'Interactive 3D / WebGL',
          'Accessible A11y'
        ]
      },
      marketing: {
        id: 'marketing',
        icon: '📈',
        pillLabel: 'Growth & Performance Marketing',
        headline: 'Directing $10M+ Commercial Pipelines & Quantitative Media Buying',
        body: 'Architecting multi-channel paid acquisition (Meta, Google, Programmatic), Server-Side CAPI tracking, full-funnel CRO, and CAC/LTV unit economic models. Scaled 150+ client brand campaigns and produced a verified $10M+ B2B commercial pipeline across digital properties.',
        tags: [
          '$10M+ Realized Pipeline',
          'Performance Media Buying',
          '-83% Churn Suppression',
          'CAC / LTV Modeling',
          'Ad-Tech & CAPI'
        ]
      },
      engineering: {
        id: 'engineering',
        icon: '⚡',
        pillLabel: 'Computer Engineering (4.0 GPA)',
        headline: 'Computer Engineering (4.0 GPA) & Agentic AI Systems',
        body: 'Stanford Innovation Fellow holding a 4.0 GPA in Computer Engineering. Engineering scalable distributed systems, 20+ automated AI agentic workflows (Claude / OpenAI), and enterprise telemetry normalization across 40M+ sessions on edX with zero technical debt.',
        tags: [
          'Computer Engineering (4.0 GPA)',
          'Agentic AI Workflows',
          'Python / SQL / Databricks',
          'Full-Stack Cloud',
          'Zero-Debt Architecture'
        ]
      }
    }
  },
  es: {
    badge_title: 'MÁS ALLÁ DEL CÓDIGO · LA TRIFECTA DE MAESTRÍA',
    badge_subtitle: 'Un ingeniero de software con excepcional gusto por el diseño e instinto de mercadeo multimillonario.',
    disciplines: {
      all: {
        id: 'all',
        icon: '✨',
        pillLabel: 'El Híbrido Unificado',
        headline: 'Donde el Rigor de Ingeniería se Une al Diseño de Clase Mundial y al Mercadeo Comercial',
        body: 'La mayoría de los ingenieros construyen sin empatía estética ni enfoque comercial. La mayoría de los especialistas en mercadeo carecen de la profundidad técnica para construir sistemas de IA y tecnología publicitaria propietaria. Fabián une un GPA de 4.0 en Ingeniería de Computadoras, una alta sensibilidad de diseño y un historial probado generando más de $10M en pipelines comerciales.',
        tags: [
          'Híbrido Excepcional',
          'Maestría de Diseño',
          'Arquitectura de Conversión',
          'Crecimiento Multicanal',
          'Stanford Innovation Fellow'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Diseño de Producto y Experiencia',
        headline: 'Refinamiento Estético, Emoción Humana y Arquitectura de Conversión',
        body: 'Obsesión por la tipografía editorial, la jerarquía visual, las microinteracciones de lujo y los flujos sin fricción. Diseñando sistemas donde la sofisticación estética y la usabilidad se unen para elevar la marca, reducir la deserción (-83%) y maximizar la conversión en web y móvil.',
        tags: [
          'Sistemas de Diseño (Figma)',
          'Tipografía Editorial',
          'Psicología de Usuario y CRO',
          '3D Interactivo / WebGL',
          'Accesibilidad (A11y)'
        ]
      },
      marketing: {
        id: 'marketing',
        icon: '📈',
        pillLabel: 'Mercadeo de Crecimiento y Rendimiento',
        headline: 'Dirigiendo Pipelines de más de $10M y Compra Cuantitativa de Medios',
        body: 'Arquitectando adquisición multicanal paga (Meta, Google, Programática), atribución Server-Side CAPI, optimización de embudos y modelos económicos de CAC/LTV. Más de 150 cuentas de clientes dirigidas y más de $10M en pipeline comercial B2B verificado.',
        tags: [
          'Pipeline Verificado $10M+',
          'Compra de Medios de Alto Rendimiento',
          '-83% Reducción de Deserción',
          'Modelado CAC / LTV',
          'Tecnología Publicitaria'
        ]
      },
      engineering: {
        id: 'engineering',
        icon: '⚡',
        pillLabel: 'Ingeniería de Computadoras (4.0 GPA)',
        headline: 'Ingeniería de Computadoras (4.0 GPA) y Sistemas de IA Agéntica',
        body: 'Stanford Innovation Fellow con 4.0 GPA en Ingeniería de Computadoras. Desarrollando arquitecturas distribuidas escalables, más de 20 flujos agénticos automatizados de IA (Claude / OpenAI) y analítica de más de 40M de sesiones en edX con cero deuda técnica.',
        tags: [
          'Ingeniería de Computadoras (4.0 GPA)',
          'Flujos de IA Agéntica',
          'Python / SQL / Databricks',
          'Nube Full-Stack',
          'Arquitectura Sin Deuda'
        ]
      }
    }
  }
};

export class BilingualBinaryHero {
  constructor(app) {
    this.app = app;
    this.currentDiscipline = 'all';
    this.currentLang = getLanguage() || 'en';

    this.dom = {
      container: document.getElementById('hero-hybrid-bar'),
      statementContainer: document.getElementById('hybrid-statement'),
      badgeTitle: document.querySelector('.hybrid-badge-title'),
      badgeSubtitle: document.querySelector('.hybrid-subtext'),
      pills: document.querySelectorAll('.hybrid-pill')
    };
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    if (!this.dom.container) return;

    this.dom.container.addEventListener('click', (e) => {
      const pill = e.target.closest('.hybrid-pill');
      if (pill && pill.dataset.discipline) {
        this.selectDiscipline(pill.dataset.discipline);
      }
    });
  }

  selectDiscipline(disciplineId) {
    if (this.currentDiscipline === disciplineId) return;
    this.currentDiscipline = disciplineId;

    try {
      audio.click();
    } catch (e) {}

    // Update active state on pills
    const pills = this.dom.container.querySelectorAll('.hybrid-pill');
    pills.forEach((p) => {
      const isActive = p.dataset.discipline === disciplineId;
      p.classList.toggle('active', isActive);
      p.setAttribute('aria-selected', String(isActive));
    });

    this.renderStatement();

    try {
      logCandidateEvent('hybrid_discipline_selected', {
        discipline: disciplineId,
        lang: this.currentLang
      });
    } catch (e) {}
  }

  setLanguage(lang) {
    this.currentLang = lang === 'es' ? 'es' : 'en';
    this.render();
  }

  render() {
    const langData = DISCIPLINE_DATA[this.currentLang] || DISCIPLINE_DATA.en;

    // Update header tags
    if (this.dom.badgeTitle) {
      this.dom.badgeTitle.textContent = langData.badge_title;
    }
    if (this.dom.badgeSubtitle) {
      this.dom.badgeSubtitle.textContent = langData.badge_subtitle;
    }

    // Update pill texts
    const pills = this.dom.container ? this.dom.container.querySelectorAll('.hybrid-pill') : [];
    pills.forEach((p) => {
      const disc = p.dataset.discipline;
      if (disc && langData.disciplines[disc]) {
        const textSpan = p.querySelector('.pill-text');
        if (textSpan) {
          textSpan.textContent = `${langData.disciplines[disc].icon} ${langData.disciplines[disc].pillLabel}`;
        }
      }
    });

    this.renderStatement();
  }

  renderStatement() {
    if (!this.dom.statementContainer) return;

    const langData = DISCIPLINE_DATA[this.currentLang] || DISCIPLINE_DATA.en;
    const disc = langData.disciplines[this.currentDiscipline] || langData.disciplines.all;

    // Smooth transition
    this.dom.statementContainer.style.opacity = '0';
    this.dom.statementContainer.style.transform = 'translateY(4px)';

    setTimeout(() => {
      const tagsHtml = disc.tags
        .map((t) => `<span class="lens-tag">${t}</span>`)
        .join('');

      this.dom.statementContainer.innerHTML = `
        <div class="lens-headline">${disc.headline}</div>
        <p class="lens-body">${disc.body}</p>
        <div class="lens-tags-row">${tagsHtml}</div>
      `;

      this.dom.statementContainer.style.opacity = '1';
      this.dom.statementContainer.style.transform = 'translateY(0)';
    }, 120);
  }
}
