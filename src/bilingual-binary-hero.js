// ─────────────────────────────────────────────────────────────
//  BilingualBinaryHero & Fullscreen Tesla-Style Cinematic Intro
//  Fabián Vélez Vicente — novu.works
//  The Trifecta of Mastery: Design × Marketing × Engineering
// ─────────────────────────────────────────────────────────────

import { getLanguage } from './i18n.js';
import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';

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
        body: 'Most engineers write code without aesthetic empathy or commercial focus. Most marketers lack the technical depth to build proprietary ad-tech and autonomous AI systems. Fabián bridges the gap — uniting a 4.0 GPA in Computer Engineering, high-end product design sensibility, and a proven track record driving $10M+ in verified commercial pipelines.',
        tags: [
          'The Rare Hybrid',
          'Design Craftsmanship',
          'Conversion Architecture',
          'Multi-Channel Growth',
          'Scale Infrastructure'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Product & Experience Design',
        headline: 'Obsessive Craft, Editorial Polish & Conversion-First User Psychology',
        body: 'Crafting luxury, high-conversion interfaces where every micro-interaction and typographic hierarchy reinforces brand equity. Proven experience leading product design sprints, creating scalable Figma design systems, and conducting real-time CRO tests that drive quantifiable retention.',
        tags: [
          'Design Systems (Figma)',
          'Editorial Typography',
          'User Psychology & CRO',
          'Interactive 3D / WebGL',
          'Accessibility (A11y)'
        ]
      },
      marketing: {
        id: 'marketing',
        icon: '📈',
        pillLabel: 'Growth & Performance Marketing',
        headline: 'Driving $10M+ Enterprise Pipelines & Quantitative Programmatic Media',
        body: 'Architecting multi-channel paid acquisition (Meta, Google, Programmatic), Server-Side CAPI attribution, funnel optimization, and CAC/LTV economic models. 150+ client accounts directed and $10M+ in verified commercial B2B pipeline generated.',
        tags: [
          '$10M+ Verified Pipeline',
          'High-ROI Media Buying',
          '-83% Churn Reduction',
          'CAC / LTV Modeling',
          'Ad-Tech Infrastructure'
        ]
      },
      engineering: {
        id: 'engineering',
        icon: '⚡',
        pillLabel: 'Computer Engineering (4.0 GPA)',
        headline: 'Stanford Innovation Fellow · 4.0 GPA Computer Engineering & Agentic AI',
        body: 'Stanford Innovation Fellow with a 4.0 GPA in Computer Engineering. Building scalable distributed architectures, 20+ automated agentic AI workflows (Claude / OpenAI), and Databricks data normalization across 40M+ telemetry sessions with zero technical debt.',
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
    badge_subtitle: 'Un ingeniero de software con gusto excepcional por el diseño e instinto comercial multimillonario.',
    disciplines: {
      all: {
        id: 'all',
        icon: '✨',
        pillLabel: 'El Híbrido Unificado',
        headline: 'Donde el Rigor de Ingeniería se Une al Diseño de Clase Mundial y el Mercadeo Comercial',
        body: 'La mayoría de los ingenieros programan sin empatía estética ni enfoque comercial. La mayoría de los mercadólogos carecen de la profundidad técnica para construir tecnología publicitaria propietaria y flujos agénticos de IA. Fabián une ambos mundos: 4.0 GPA en Ingeniería de Computadoras, sensibilidad de diseño de producto y un récord comprobado generando más de $10M en pipelines comerciales verificados.',
        tags: [
          'El Híbrido Raro',
          'Artesanía de Diseño',
          'Arquitectura de Conversión',
          'Crecimiento Multicanal',
          'Infraestructura a Escala'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Diseño de Producto y Experiencia',
        headline: 'Artesanía Obsesiva, Pulido Editorial y Psicología de Usuario Enfocada en Conversión',
        body: 'Diseñando interfaces de lujo y alta conversión donde cada micro-interacción y jerarquía tipográfica refuerza el valor de marca. Experiencia liderando sprints de diseño de producto, sistemas de diseño escalables en Figma y pruebas de CRO en tiempo real que impulsan retención cuantificable.',
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
    this.autoTimer = null;
    this.isOpen = false;

    this.dom = {
      introOverlay: document.getElementById('cinematic-master-intro'),
      btnSkip: document.getElementById('btn-skip-intro'),
      btnEnter: document.getElementById('btn-enter-portfolio'),
      progressFill: document.getElementById('intro-progress-fill'),
      statementContainer: document.getElementById('intro-statement-display'),
      discCards: document.querySelectorAll('.intro-disc-card'),
      btnTailorExperience: document.getElementById('btn-tailor-experience'),
      heroHybridBar: document.getElementById('hero-hybrid-bar')
    };
  }

  init() {
    this.bindEvents();
    this.render();

    // Do NOT auto-open modal on initial page load.
    // The candidate lands directly on the fluid, editorial Tesla-grade hero.
    // Only opened on demand when visitor clicks "Tailor Experience" or presses 1-4.
  }

  bindEvents() {
    // 1. Skip / Enter buttons
    if (this.dom.btnSkip) {
      this.dom.btnSkip.addEventListener('click', () => this.closeIntro());
    }
    if (this.dom.btnEnter) {
      this.dom.btnEnter.addEventListener('click', () => this.closeIntro());
    }

    // 2. Discipline card clicks in modal
    if (this.dom.discCards) {
      this.dom.discCards.forEach((card) => {
        card.addEventListener('click', () => {
          const disc = card.dataset.discipline;
          if (disc) {
            this.clearAutoTimer();
            this.selectDiscipline(disc);
          }
        });
      });
    }

    // 3. Header nav "Tailor Experience" button opens this fullscreen cinematic modal
    if (this.dom.btnTailorExperience) {
      this.dom.btnTailorExperience.addEventListener('click', () => {
        this.openIntro(false); // open without auto-timer so user can deliberate
      });
    }

    // 4. Keyboard Shortcuts: Escape to close, 1-4 to select discipline
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Escape') {
        this.closeIntro();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.closeIntro();
      } else if (e.key === '1') {
        this.selectDiscipline('all');
      } else if (e.key === '2') {
        this.selectDiscipline('design');
      } else if (e.key === '3') {
        this.selectDiscipline('marketing');
      } else if (e.key === '4') {
        this.selectDiscipline('engineering');
      }
    });

    // 5. Click outside card on backdrop to close
    if (this.dom.introOverlay) {
      this.dom.introOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('cinematic-intro-backdrop') || e.target === this.dom.introOverlay) {
          this.closeIntro();
        }
      });
    }
  }

  openIntro(withAutoTimer = false) {
    if (!this.dom.introOverlay) return;

    this.isOpen = true;
    this.dom.introOverlay.style.display = 'flex';
    void this.dom.introOverlay.offsetWidth; // force reflow
    this.dom.introOverlay.classList.add('is-visible');

    try {
      audio.open();
    } catch (e) {}

    // Synchronize current role lens from app
    const activeLens = (this.app && this.app.activeRoleLens) || 'master';
    const discMap = {
      master: 'all',
      revops_analytics: 'marketing',
      tech_ops: 'design',
      ai_engineering: 'engineering',
      data_governance: 'engineering',
      growth: 'marketing',
      design: 'design',
      systems: 'engineering',
      all: 'all'
    };
    this.currentDiscipline = discMap[activeLens] || 'all';
    this.updateActiveCardUI(this.currentDiscipline);
    this.renderStatement();

    if (withAutoTimer) {
      this.startAutoTimer();
    } else {
      this.clearAutoTimer();
    }
  }

  closeIntro() {
    if (!this.dom.introOverlay || !this.isOpen) return;

    this.clearAutoTimer();
    this.isOpen = false;

    try {
      audio.click();
    } catch (e) {}

    try {
      sessionStorage.setItem('seen_cinematic_intro', '1');
    } catch (e) {}

    this.dom.introOverlay.classList.remove('is-visible');
    this.dom.introOverlay.classList.add('is-closing');

    setTimeout(() => {
      this.dom.introOverlay.style.display = 'none';
      this.dom.introOverlay.classList.remove('is-closing');
    }, 380);

    // Apply the selected discipline to the whole portfolio app
    if (this.app && typeof this.app.setRoleLens === 'function') {
      const lensMap = {
        all: 'master',
        design: 'tech_ops',
        marketing: 'revops_analytics',
        engineering: 'ai_engineering'
      };
      const lens = lensMap[this.currentDiscipline] || 'master';
      this.app.setRoleLens(lens);
    }
  }

  startAutoTimer() {
    this.clearAutoTimer();

    if (this.dom.progressFill) {
      this.dom.progressFill.style.transition = 'none';
      this.dom.progressFill.style.width = '0%';
      void this.dom.progressFill.offsetWidth;
      this.dom.progressFill.style.transition = 'width 3.5s linear';
      this.dom.progressFill.style.width = '100%';
    }

    this.autoTimer = setTimeout(() => {
      this.closeIntro();
    }, 3600);
  }

  clearAutoTimer() {
    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }
    if (this.dom.progressFill) {
      this.dom.progressFill.style.transition = 'none';
      this.dom.progressFill.style.width = '0%';
    }
  }

  selectDiscipline(disciplineId) {
    if (this.currentDiscipline === disciplineId) return;
    this.currentDiscipline = disciplineId;

    try {
      audio.click();
    } catch (e) {}

    this.updateActiveCardUI(disciplineId);
    this.renderStatement();

    // Inform the main app lens
    if (this.app && typeof this.app.setRoleLens === 'function') {
      const lensMap = {
        all: 'master',
        design: 'tech_ops',
        marketing: 'revops_analytics',
        engineering: 'ai_engineering'
      };
      this.app.setRoleLens(lensMap[disciplineId] || 'master');
    }

    try {
      logCandidateEvent('hybrid_discipline_selected', {
        discipline: disciplineId,
        lang: this.currentLang
      });
    } catch (e) {}
  }

  updateActiveCardUI(disciplineId) {
    if (this.dom.discCards) {
      this.dom.discCards.forEach((card) => {
        const isActive = card.dataset.discipline === disciplineId;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-selected', String(isActive));
      });
    }
  }

  setLanguage(lang) {
    this.currentLang = lang === 'es' ? 'es' : 'en';
    this.render();
  }

  render() {
    this.updateActiveCardUI(this.currentDiscipline);
    this.renderStatement();
  }

  renderStatement() {
    if (!this.dom.statementContainer) return;

    const langData = DISCIPLINE_DATA[this.currentLang] || DISCIPLINE_DATA.en;
    const disc = langData.disciplines[this.currentDiscipline] || langData.disciplines.all;

    // Smooth transition
    this.dom.statementContainer.style.opacity = '0';
    this.dom.statementContainer.style.transform = 'translateY(6px)';

    setTimeout(() => {
      const tagsHtml = disc.tags
        .map((t) => `<span class="lens-tag">${t}</span>`)
        .join('');

      this.dom.statementContainer.innerHTML = `
        <div class="intro-statement-header">
          <span class="statement-icon">${disc.icon}</span>
          <h3 class="statement-headline">${disc.headline}</h3>
        </div>
        <p class="statement-body">${disc.body}</p>
        <div class="statement-tags-row">${tagsHtml}</div>
      `;

      this.dom.statementContainer.style.opacity = '1';
      this.dom.statementContainer.style.transform = 'translateY(0)';
    }, 100);
  }
}
