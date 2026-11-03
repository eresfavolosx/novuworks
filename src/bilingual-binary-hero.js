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
    badge_title: 'BEYOND CODE · THE HYBRID MAKER',
    badge_subtitle: 'A creative technologist and computer engineer turning open-ended questions into working prototypes, interactive experiences, and human stories.',
    disciplines: {
      all: {
        id: 'all',
        icon: '✨',
        pillLabel: 'The Unified Hybrid Maker',
        headline: 'Where Storytelling, Human-Centric Design & Frontier Engineering Meet',
        body: 'Great creative technology requires more than isolated code or static mockups—it demands someone who can ask an open-ended question, design an emotionally resonant interaction, and engineer the frontier model orchestration or WebGL shaders to make it real. Fabián bridges all three with a 4.0 GPA in Computer Engineering, a Stanford University Innovation Fellowship, and 110+ shipped prototypes.',
        tags: [
          'The Hybrid Maker',
          'Human-Centric Design',
          'Frontier Models',
          'Interactive Experiences',
          'Generative Prototypes'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Human-Centric & Sensory Design',
        headline: 'Tactile Craft, Assistive Accessibility & 60 FPS Sensory Interfaces',
        body: 'Crafting warm, accessible interfaces where every shader, haptics pulse, and typographic detail invites human participation. From 60 FPS WebRTC Daltonization lenses for color-blindness (Picta) to Three.js particle physics and NTAG215 Web NFC physical tokens (Tocaito).',
        tags: [
          'Human-Centric Design',
          '60 FPS WebGL / WebRTC',
          'Assistive Accessibility',
          'Web NFC Physical Tech',
          'Editorial Typography'
        ]
      },
      marketing: {
        id: 'marketing',
        icon: '📖',
        pillLabel: 'Interactive Storytelling & Synthesis',
        headline: 'Turning Complex Systems into Optimistic, Participatory Stories',
        body: 'Synthesizing 40M+ longitudinal learning journeys in Databricks SQL at Red Ventures (edX) to power +200% generative discovery, and directing 150+ bilingual interactive storytelling experiences through Viva Studio with humor, emotional depth, and optimism.',
        tags: [
          '40M+ Journeys Synthesized',
          '+200% Discovery Lift',
          'Narrative Synthesis',
          'Bilingual Cultural Craft',
          'Participatory Stories'
        ]
      },
      engineering: {
        id: 'engineering',
        icon: '⚡',
        pillLabel: 'Computer Engineering (4.0 GPA)',
        headline: 'Stanford Innovation Fellow · 4.0 GPA Computer Engineering & Agentic AI',
        body: 'Stanford Innovation Fellow with a 4.0 GPA in Computer Engineering. Engineering 20+ autonomous agentic tool-calling workflows (OpenAI / Claude / Python / Docker), real-time telemetry synthesis, and resilient full-stack architectures.',
        tags: [
          'Computer Engineering (4.0 GPA)',
          'Agentic Tool-Calling',
          'Python / SQL / Databricks',
          'Docker & Cloud',
          'Frontier Orchestration'
        ]
      }
    }
  },
  es: {
    badge_title: 'MÁS ALLÁ DEL CÓDIGO · EL CREADOR HÍBRIDO',
    badge_subtitle: 'Un tecnólogo creativo e ingeniero de computadoras transformando preguntas abiertas en prototipos funcionales, experiencias interactivas e historias humanas.',
    disciplines: {
      all: {
        id: 'all',
        icon: '✨',
        pillLabel: 'El Creador Híbrido Unificado',
        headline: 'Donde la Narrativa, el Diseño Humano y la Ingeniería de Frontera se Unen',
        body: 'La gran tecnología creativa requiere más que código aislado o bocetos estáticos: exige a alguien capaz de formular una pregunta abierta, diseñar una interacción emocionalmente resonante y programar la orquestación de modelos de frontera o shaders WebGL para hacerla realidad. Fabián une los tres mundos con un GPA de 4.0 en Ingeniería de Computadoras, un Stanford Innovation Fellowship y más de 110 prototipos lanzados.',
        tags: [
          'El Creador Híbrido',
          'Diseño Centrado en el Humano',
          'Modelos de Frontera',
          'Experiencias Interactivas',
          'Prototipos Generativos'
        ]
      },
      design: {
        id: 'design',
        icon: '🎨',
        pillLabel: 'Diseño Sensorial y Humano',
        headline: 'Artesanía Táctil, Accesibilidad Asistiva e Interfaces Sensoriales a 60 FPS',
        body: 'Diseñando interfaces cálidas y accesibles donde cada shader, pulso háptico y jerarquía tipográfica invita a participar. Desde lentes de Daltonización WebRTC a 60 FPS para daltonismo (Picta) hasta física de partículas en Three.js y hardware físico Web NFC (Tocaito).',
        tags: [
          'Diseño Humano',
          '60 FPS WebGL / WebRTC',
          'Accesibilidad Asistiva',
          'Hardware Físico Web NFC',
          'Tipografía Editorial'
        ]
      },
      marketing: {
        id: 'marketing',
        icon: '📖',
        pillLabel: 'Narrativa Interactiva y Síntesis',
        headline: 'Transformando Sistemas Complejos en Historias Participativas y Optimistas',
        body: 'Sintetizando más de 40M de trayectorias de aprendizaje en Databricks SQL en Red Ventures (edX) para impulsar +200% en descubrimiento generativo, y dirigiendo más de 150 experiencias narrativas bilingües en Viva Studio con humor, profundidad emocional y optimismo.',
        tags: [
          '40M+ Trayectorias Sintetizadas',
          '+200% Descubrimiento Generativo',
          'Síntesis Narrativa',
          'Cultura Bilingüe',
          'Historias Participativas'
        ]
      },
      engineering: {
        id: 'engineering',
        icon: '⚡',
        pillLabel: 'Ingeniería de Computadoras (4.0 GPA)',
        headline: 'Stanford Innovation Fellow · Ingeniería de Computadoras (4.0 GPA) e IA Agéntica',
        body: 'Stanford Innovation Fellow con 4.0 GPA en Ingeniería de Computadoras. Desarrollando más de 20 flujos agénticos autónomos con tool-calling (OpenAI / Claude / Python / Docker), síntesis de telemetría en tiempo real y arquitecturas en la nube.',
        tags: [
          'Ingeniería de Computadoras (4.0 GPA)',
          'Tool-Calling Agéntico',
          'Python / SQL / Databricks',
          'Docker y Nube',
          'Orquestación de Frontera'
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
