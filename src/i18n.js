// ─────────────────────────────────────────────────────────────
//  Novu Works — Full Bilingual Internationalization (EN / ES)
//  Default Experience: English ('en')
//  Authentic Creative Technologist Spanish: 'es' (San Juan, Puerto Rico)
// ─────────────────────────────────────────────────────────────

import { PROFILE, DISCIPLINES } from './data.js';

export const SUPPORTED_LANGS = ['en', 'es'];
export const DEFAULT_LANG = 'en';

// Capture Pristine English Snapshots at module evaluation time
let PROFILE_EN = null;
let DISCIPLINES_EN = null;

function ensureSnapshots() {
  if (!PROFILE_EN) {
    PROFILE_EN = JSON.parse(JSON.stringify(PROFILE));
  }
  if (!DISCIPLINES_EN) {
    DISCIPLINES_EN = JSON.parse(JSON.stringify(DISCIPLINES));
  }
}

// ─────────────────────────────────────────────────────────────
// Spanish Profile Translations (Creative Technologist & Frontier Maker)
// ─────────────────────────────────────────────────────────────
export const PROFILE_ES = {
  role: 'Tecnólogo Creativo y Líder de Sistemas de IA de Frontera',
  level: 'Creador y Líder ICS4',
  tenure: '8+ Años (Modelos de Frontera, Experiencias Interactivas y Diseño Centrado en el Ser Humano)',
  location: 'San Juan, PR (Remoto en EE.UU. / Global)',
  workAuthorization: 'Ciudadano de EE.UU. (Nacido en Puerto Rico · No Requiere Patrocinio de Visa)',
  summary:
    'Tecnólogo creativo híbrido, diseñador narrativo y creador práctico de sistemas con más de 8 años de experiencia transformando preguntas humanas abiertas en prototipos generativos funcionales, experiencias interactivas y herramientas expresivas impulsadas por modelos de frontera. Combina un promedio de 4.0 GPA en Ingeniería de Computadoras y una beca Stanford University Innovation Fellowship con dominio profundo en orquestación multi-modelo, tool-calling, física WebGL en tiempo real y síntesis conductual a gran escala.',
  status: 'Disponible para Roles de Tecnólogo Creativo, Experimentos de Frontera, Prototipado Interactivo con IA y Sistemas Centrados en el Usuario.',

  headlineStats: [
    { label: 'Prototipos Generativos', value: '20+', sub: 'Money Group (Tiempo Completo) · Orquestación de Modelos de Frontera' },
    { label: 'Impulso en Descubrimiento', value: '+200%', sub: 'Red Ventures (Tiempo Completo, edX) · Interfaces IA Humanas' },
    { label: 'Sistemas Interactivos', value: '110+', sub: 'Link Puerto Rico y Viva Studio · Comunidad y Tecnología Creativa' },
    { label: 'Continuidad de Colaboración', value: '+83%', sub: 'Síntesis predictiva de señales humanas en más de 150 equipos' },
    { label: 'Trayectorias de Aprendizaje', value: '40M+', sub: 'Síntesis conductual con Databricks y Python en edX' },
  ],

  roleVariants: {
    master: {
      id: 'master',
      label: '✨ Tecnólogo Creativo (Maestro)',
      shortTitle: 'Tecnólogo Creativo y Prototipador de Frontera',
      headline: 'Tecnólogo Creativo, Diseñador Narrativo y Creador de Sistemas de Frontera',
      summary:
        'Tecnólogo Creativo multidisciplinario y Arquitecto de Sistemas con más de 8 años de experiencia uniendo diseño centrado en las personas, orquestación de modelos de frontera, experimentos interactivos en WebGL/WebRTC e ingeniería en la nube. Apasionado por construir prototipos expresivos, objetos físico-digitales e historias que invitan a las personas a participar, reflexionar e imaginar.',
      skills: [
        {
          title: 'Modelos de Frontera y Orquestación Agéntica',
          items: 'Modelos de Frontera (OpenAI GPT-4o / o3 / Codex, Anthropic Claude, Gemini) | Tool-Calling y Síntesis de Funciones | Orquestación Multi-Agente | Rúbricas JSON Estructuradas',
        },
        {
          title: 'Experiencias Interactivas y Cómputo Creativo',
          items: 'Shaders Three.js y WebGL | Física Procedural de Partículas | Visión Computarizada WebRTC en Tiempo Real | Puentes de Hardware Web NFC | Síntesis de Voz y Audio Web | Diseño Accesible WCAG AAA',
        },
        {
          title: 'Prototipado Full-Stack y Síntesis de Datos',
          items: 'Python y FastAPI | JavaScript y TypeScript (React, Next.js, Node.js, Vite) | Síntesis Conductual en Databricks y SQL | Cloud Run, Docker y Firebase | APIs REST',
        },
        {
          title: 'Narrativa, Comunidad y Design Thinking',
          items: 'Stanford University Innovation Fellow (d.school) | Diseño Narrativo Interactivo | Liderazgo de Hackathons Cívicos | Narrativa Bilingüe (Inglés / Español)',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Tecnólogo Creativo y Prototipador de IA de Frontera — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Prototipos Generativos y Orquestación de Modelos de Frontera: Concibió y desarrolló **más de 20 habilidades de IA interactivas y flujos autónomos** utilizando **modelos de frontera, tool-calling y síntesis estructurada**, transformando días de análisis manual en **exploración creativa en menos de 4 horas** para una organización de más de 100 personas.',
            'Constructor de Experiencias Interactivas y Síntesis de APIs: Colaboró con Ingeniería de Software en **más de 30 sprints de prototipado rápido** para construir un **generador de experiencias web asistido por IA**, conectando **APIs REST y tool-calling en vivo** en 5 dominios.',
            'Evaluación Centrada en las Personas: Diseñó **rúbricas deterministas con supervisión humana** para lograr un **100% de fidelidad** y lideró **talleres prácticos de IA creativa** para un **equipo multidisciplinario de 15 personas**.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Descubrimiento Interactivo y Síntesis Conductual (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Descubrimiento de Aprendizaje Generativo: Reimaginó cómo millones de estudiantes curiosos descubren conocimiento en la plataforma global **edX**, desplegando **síntesis con IA generativa y experiencias front-end adaptativas** en **más de 1,250 portales educativos**, logrando un **aumento de 3x (+200%) en consultas estudiantiles**.',
            'Síntesis de Telemetría Conductual: Exploró **más de 40 millones de sesiones de aprendizaje humano** usando **Python y SQL en Databricks**, transformando flujos fragmentados en **historias humanas coherentes** sobre cómo aprenden las personas.',
            'Observabilidad Interactiva y Claridad Visual: Creó **lienzos visuales de telemetría** en Looker y Tableau que brindaron claridad inmediata a educadores, escritores e ingenieros.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Director Creativo (Estudio de Narrativa Interactiva e IA) — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Narrativa Interactiva a Gran Escala: Fundó un estudio creativo dedicado a diseñar **experiencias digitales expresivas, historias visuales y campañas interactivas** que alcanzaron **más de 1,000 millones de vistas humanas** en **más de 150 organizaciones aliadas**.',
            'Flujos Creativos Generativos: Integró **OpenAI Codex, modelos de lenguaje de frontera y tool-calling** en el oficio diario del estudio, permitiendo a un **equipo de 15 diseñadores, escritores y programadores** prototipar conceptos interactivos un **40% más rápido**.',
            'Síntesis de Señales con Empatía: Construyó un **sintetizador predictivo de salud colaborativa** en Python y Power BI que detectó momentos tempranos de fricción, cultivando un **95% de relaciones creativas duraderas (+83% en continuidad)**.',
          ],
        },
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Líder de Tecnología Creativa (Prototipos Cívicos y Ecosistema Maker) — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Prototipos Cívicos y Orquestación en la Nube: Dirigió a un **equipo de más de 10 creadores** para diseñar y lanzar **más de 100 plataformas interactivas, servicios en Docker y herramientas web accesibles** para **más de 80 organizaciones comunitarias**, impulsando **más de 50,000 interacciones ciudadanas**.',
            'Bibliotecas Digitales Puente a Puente (Municipio de Loíza): Lideró una intervención rápida de conectividad y hardware durante los cierres escolares globales—adquiriendo **más de 100 computadoras y 50 tabletas en menos de 30 días**, instalando **internet satelital** y transformando **3 centros comunitarios en bibliotecas digitales para más de 1,000 residentes**.',
            'Comunidad Maker de Base: Fundó un **colectivo de más de 2,000 desarrolladores y creadores**, organizando **más de 50 talleres abiertos para 5,000+ participantes** y **4 hackathons cívicos (más de 6,000 horas de creación colaborativa)**.',
          ],
        },
      ],
      resumeProjects: [
        {
          name: 'JobHelper (Prototipo de Síntesis Profesional con Modelos de Frontera)',
          description: '**El Concepto:** Buscar empleo suele sentirse como gritar en un vacío algorítmico; JobHelper reimagina el descubrimiento profesional como una conversación transparente y alentadora con un mentor de IA honesto. **La Tecnología:** Construido con **Python, Next.js 16, Docker y orquestación LLM multi-modelo (OpenAI, Claude y Gemini)** mediante **tool-calling determinista**, una **rúbrica JSON de 100 puntos** y una Extensión de Chrome Manifest V3. **El Impacto:** Reemplaza la ansiedad laboral con claridad constructiva instantánea en menos de dos segundos.',
        },
        {
          name: 'FavoBot (Compañero Conversacional Multi-Agente de Bolsillo)',
          description: '**El Concepto:** ¿Y si la orquestación de sistemas y la lluvia de ideas creativa se sintieran tan naturales como enviarle un mensaje a un amigo ingenioso? **La Tecnología:** Agente autónomo en Telegram creado en **Python** con **tool-calling de modelos de frontera, webhooks asíncronos y síntesis de eventos en tiempo real**. **El Impacto:** Convierte el monitoreo técnico pesado en una experiencia conversacional fluida desde cualquier lugar.',
        },
      ],
      proofPoints: [
        { metric: '20+', title: 'Prototipos Generativos Lanzados', sub: 'Money Group (Orquestación de Modelos de Frontera)', desc: 'Concibió y desplegó más de 20 habilidades de IA interactivas y agentes con tool-calling que redujeron días de síntesis a menos de 4 horas.' },
        { metric: '+200%', title: 'Impulso en Curiosidad Estudiantil', sub: 'Red Ventures (Plataforma Educativa edX)', desc: 'Diseñó experiencias de descubrimiento con IA generativa en más de 1,250 portales educativos, triplicando (+200%) las consultas de estudiantes.' },
        { metric: '110+', title: 'Sistemas Interactivos Creados', sub: 'Link Puerto Rico y Ecosistema Cívico', desc: 'Lideró equipos multidisciplinarios para lanzar más de 110 plataformas web, puentes físico-digitales NFC y herramientas accesibles para 4,000+ vidas.' },
        { metric: '40M+', title: 'Trayectorias Humanas Sintetizadas', sub: 'Síntesis Conductual en Databricks y Python', desc: 'Tradujo más de 40M de sesiones de aprendizaje en hallazgos de diseño centrado en las personas con 100% de fidelidad.' }
      ]
    },

    ai_engineering: {
      id: 'ai_engineering',
      label: '🤖 Modelos de Frontera y Orquestación',
      shortTitle: 'Prototipador de IA de Frontera e Ingeniero de Orquestación',
      headline: 'Prototipador de IA de Frontera, Orquestación Multi-Agente e Ingeniero de Sistemas Interactivos',
      summary:
        'Prototipador práctico de IA e Ingeniero de Sistemas Creativos con más de 8 años de experiencia convirtiendo modelos de frontera en experiencias interactivas confiables, expresivas y centradas en las personas.',
      skills: [
        {
          title: 'Modelos de Frontera y Tool-Calling',
          items: 'OpenAI API y Codex | Anthropic Claude | Google Gemini | Orquestación Multi-Agente | Tool-Calling Determinista | Síntesis JSON Estructurada',
        },
        {
          title: 'Prototipado Interactivo y Lienzo Creativo',
          items: 'Next.js y React | Shaders Three.js y WebGL | Visión Computarizada WebRTC | Síntesis de Voz y Audio Web | UI Liquid Glass',
        },
        {
          title: 'Síntesis de Datos y Telemetría',
          items: 'Python y PySpark | SQL y Databricks | Síntesis de Flujos en Tiempo Real | Reconocimiento de Patrones Conductuales | Looker y Tableau',
        },
        {
          title: 'Arquitectura de Sistemas y Código Abierto',
          items: 'FastAPI y Node.js | Docker y Cloud Run | Firebase y Firestore | Suites de QA Automatizadas | GitHub Actions CI/CD',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Prototipador de IA de Frontera y Líder de Orquestación — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Orquestación Multi-Agente: Desarrolló más de 20 habilidades de IA autónomas y prototipos generativos usando APIs de modelos de frontera y tool-calling, reduciendo ciclos de síntesis a menos de 4 horas.',
            'Herramientas de Experiencias Interactivas: Co-arquitectó un generador web interactivo impulsado por IA utilizado en 5 dominios de consumo.',
            'Guardrails con Supervisión Humana: Diseñó rúbricas deterministas de evaluación en más de 20 experiencias interactivas en vivo.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Ingeniero de Descubrimiento Generativo y Síntesis Conductual (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Personalización Generativa de UI: Desplegó síntesis con IA de frontera en más de 1,250 portales educativos en edX, logrando un aumento del +200% en exploración estudiantil.',
            'Síntesis Conductual a Gran Escala: Escribió flujos de síntesis en Python y SQL en Databricks sobre más de 40 millones de sesiones de aprendizaje.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Director de Tecnología Creativa — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Flujos de Narrativa Generativa: Integró OpenAI Codex y modelos de frontera en la producción creativa de un estudio de 15 personas a través de más de 150 colaboraciones.',
            'Modelado Predictivo de Empatía: Desarrolló modelos de síntesis de señales en Python y Power BI que fortalecieron la continuidad de relaciones en un 83%.',
          ],
        },
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Director Técnico — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Prototipado Cívico y Código Abierto: Dirigió un equipo de más de 10 ingenieros para lanzar más de 100 aplicaciones web y experiencias físico-digitales NFC.',
            'Comunidad de Creadores: Fundó una comunidad de más de 2,000 desarrolladores e impartió más de 50 talleres prácticos para 5,000+ participantes.',
          ],
        },
      ],
      proofPoints: [
        { metric: '20+', title: 'Habilidades de IA de Frontera', sub: 'Money Group (Orquestación Multi-Agente)', desc: 'Desarrolló más de 20 habilidades autónomas y flujos con tool-calling que comprimieron días de síntesis a menos de 4 horas.' },
        { metric: '<4 Horas', title: 'Ritmo de Concepto a Prototipo', sub: 'Prototipado Generativo Rápido', desc: 'Aceleró la ideación creativa y el despliegue de prototipos en 3x usando cadenas de modelos de frontera y esquemas JSON.' },
        { metric: '3x Impulso', title: 'Descubrimiento Interactivo', sub: 'Red Ventures (Plataforma edX)', desc: 'Lanzó módulos de descubrimiento con IA generativa en más de 1,250 páginas educativas, triplicando la curiosidad estudiantil (+200%).' },
        { metric: '50+', title: 'Talleres Maker Impartidos', sub: 'Link PR (Colectivo de 2,000+ Miembros)', desc: 'Empoderó a más de 5,000 estudiantes y creadores en Puerto Rico con talleres prácticos de IA, nube y programación creativa.' }
      ]
    },

    revops_analytics: {
      id: 'revops_analytics',
      label: '🎨 Narrativa Interactiva y Síntesis',
      shortTitle: 'Líder de Narrativa Interactiva y Síntesis de Audiencias',
      headline: 'Líder de Narrativa Interactiva, Experimentos Creativos y Síntesis Conductual',
      summary:
        'Estratega Creativo, Sintetizador de Datos Conductuales y Creador Técnico con más de 8 años de experiencia conectando la curiosidad humana con experiencias digitales expresivas.',
      skills: [
        {
          title: 'Narrativa Interactiva y Experimentos Creativos',
          items: 'Ejecución de Concepto a Prototipo | Arquitectura Narrativa | Experimentación Multimodal | Iteración Rápida | Mapas de Empatía',
        },
        {
          title: 'Síntesis Conductual y Lienzos de Datos',
          items: 'SQL y T-SQL | Databricks Lakehouse | Python y PySpark | Tableau, Looker y Power BI | Telemetría de Interacción en Tiempo Real',
        },
        {
          title: 'IA de Frontera y Herramientas Creativas',
          items: 'Síntesis Generativa Visual y de Texto | Orquestación de Prompts | Plataformas Internas de Estudio IA | APIs REST',
        },
        {
          title: 'Diseño de Experiencias Centrado en el Usuario',
          items: 'WebGL y Canvas Interactivo | Ergonomía Móvil | Accesibilidad Universal (WCAG AAA) | Matiz Cultural Bilingüe (EN/ES)',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Sistemas Creativos y Síntesis con IA — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Lanzamiento de Estudio Interno de IA: Desarrolló más de 20 habilidades de IA y lideró el despliegue creativo de HeyMoney, capacitando a un equipo de 15 personas para crear prototipos en horas.',
            'Claridad de Señales y Telemetría: Reconcilió señales de extremo a extremo garantizando el 100% de fidelidad en 5 dominios de consumo.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Curiosidad y Descubrimiento (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Lienzos Visuales de Curiosidad: Diseñó tableros interactivos en Looker y Tableau siguiendo cómo 100M+ de estudiantes exploran nuevos temas.',
            'Síntesis de Contenido Generativo: Integró flujos de IA de frontera para humanizar más de 1,250 portales educativos (+200% en consultas).',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Director Creativo — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Experiencias Digitales Expresivas: Dirigió narrativa y medios interactivos en más de 150 colaboraciones, superando 1,000 millones de impresiones humanas.',
            'Síntesis Predictiva de Relaciones: Diseñó un modelo predictivo que fortaleció las alianzas creativas a largo plazo en un 83%.',
          ],
        },
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Líder de Arquitectura Comunitaria — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Innovación Cívica Sostenible: Aseguró y dirigió una subvención global de más de $100k para infraestructura solar y digital comunitaria.',
            'Hackathons Colaborativos: Organizó 4 hackathons cívicos (6,000+ horas de creación) y más de 50 talleres para 2,000+ creadores locales.',
          ],
        },
      ],
      proofPoints: [
        { metric: '1B+ Vistas', title: 'Historias Humanas Compartidas', sub: 'Viva Creative Studio (150+ Colaboraciones)', desc: 'Creó narrativas digitales expresivas y experiencias interactivas que resonaron en más de 1,000 millones de impresiones.' },
        { metric: '3x Velocidad', title: 'Ritmo de Ideación Generativa', sub: 'Orquestación de Prompts de Frontera', desc: 'Construyó cadenas de síntesis que triplicaron la velocidad de exploración creativa preservando la calidez humana y el humor.' },
        { metric: '100%', title: 'Fidelidad en Síntesis de Telemetría', sub: 'Money Group y Red Ventures', desc: 'Unificó señales conductuales fragmentadas en historias visuales claras con cero pérdida de datos.' },
        { metric: '+83%', title: 'Salud Colaborativa Duradera', sub: 'Síntesis Predictiva de Señales', desc: 'Utilizó modelado conductual proactivo para cultivar relaciones creativas de confianza (95% de continuidad).' }
      ]
    },

    data_governance: {
      id: 'data_governance',
      label: '📊 Síntesis Conductual y Telemetría',
      shortTitle: 'Líder de Síntesis de Datos Conductuales y Sistemas',
      headline: 'Líder de Síntesis de Datos Conductuales, Arquitectura de Telemetría y Ciencia de Decisiones',
      summary:
        'Sintetizador de Datos Conductuales y Arquitecto de Sistemas con más de 8 años de experiencia transformando flujos masivos de eventos (más de 40M de sesiones) en hallazgos confiables y centrados en las personas.',
      skills: [
        {
          title: 'Síntesis Conductual e Integridad',
          items: 'Normalización de Flujos de Eventos | Validación de Esquemas | Reconciliación de Verdad Fundamental | Modelado Dimensional',
        },
        {
          title: 'Ingeniería de Datos y Lienzo Lakehouse',
          items: 'SQL Avanzado (CTEs, Funciones de Ventana) | Databricks Lakehouse | Python y PySpark | Power BI, Tableau y Looker',
        },
        {
          title: 'Observabilidad de Modelos de Frontera',
          items: 'Rúbricas de Evaluación de Salidas LLM | Centinelas Automatizados de Anomalías | Validación JSON Estructurada',
        },
        {
          title: 'Sistemas Cívicos y Accesibles',
          items: 'Telemetría Educativa y de Salud Accesible | Transparencia en el Sector Público | Arquitectura Privada y Segura',
        },
      ],
      experiences: [
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Síntesis de Datos Conductuales (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Síntesis de 40M+ de Sesiones: Consultó y normalizó más de 40 millones de trayectorias de aprendizaje humano en Databricks SQL y Python con 100% de precisión.',
            'Continuidad de Trayectorias Humanas: Analizó registros de servidores para reconstruir caminos de exploración educativa en más de 1,250 páginas (+50% en descubrimiento).',
          ],
        },
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Síntesis de Telemetría y Evaluación de IA — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Verificación de Modelos de Frontera: Diseñó rúbricas deterministas para verificar salidas de LLMs frente a telemetría real.',
            'Centinelas en Tiempo Real: Desarrolló más de 20 flujos autónomos de IA que inspeccionan flujos de APIs en vivo en menos de 4 horas.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Narrador Principal de Datos — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Lienzos Unificados de Telemetría: Arquitectó ecosistemas en Looker y Power BI para más de 150 organizaciones aliadas.',
            'Modelos Predictivos de Continuidad: Desarrolló algoritmos en PySpark que preservaron el 95% de continuidad colaborativa.',
          ],
        },
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Líder de Arquitectura Relacional — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Más de 100 Arquitecturas Relacionales: Diseñó e implementó más de 110 bases de datos relacionales y en la nube soportando 50,000+ interacciones comunitarias.',
            'Alfabetización de Datos Abiertos: Impartió más de 50 talleres sobre SQL, Python y narrativa de datos a miles de estudiantes.',
          ],
        },
      ],
      proofPoints: [
        { metric: '40M+', title: 'Trayectorias Sintetizadas', sub: 'Red Ventures (edX Lakehouse)', desc: 'Modeló y reconcilió más de 40M de sesiones de aprendizaje humano con PySpark y SQL.' },
        { metric: '100%', title: 'Paridad de Evaluación', sub: 'Rúbricas de Modelos de Frontera', desc: 'Estableció protocolos automatizados de verificación sin pérdida de eventos críticos.' },
        { metric: '110+', title: 'Bases de Datos Arquitectadas', sub: 'Link Puerto Rico', desc: 'Construyó más de 110 esquemas relacionales y en tiempo real optimizados para comunidades.' },
        { metric: '+83%', title: 'Continuidad Colaborativa', sub: 'Síntesis Predictiva', desc: 'Fortaleció relaciones a largo plazo mediante modelado estadístico empático.' }
      ]
    },

    tech_ops: {
      id: 'tech_ops',
      label: '⚙️ Prototipado Rápido y Hardware Cívico',
      shortTitle: 'Líder de Sistemas Creativos y Prototipado Rápido',
      headline: 'Arquitecto de Sistemas Creativos, Prototipador Rápido y Creador Físico-Digital',
      summary:
        'Creador práctico de sistemas e Ingeniero de Computadoras (Promedio 4.0) y Becario de Innovación en Stanford con más de 8 años de experiencia lanzando prototipos funcionales en software, nube y hardware físico.',
      skills: [
        {
          title: 'Prototipado Físico-Digital y Rápido',
          items: 'Programación de Hardware Web NFC (NTAG213/215/216) | Flujos de Cámara WebRTC | Giroscopio 6DoF y Háptica | Gestión MDM | Conectividad Satelital WAN',
        },
        {
          title: 'Orquestación de Nube y Contenedores',
          items: 'Docker y Multi-Stage Builds | Microsoft Azure y Google Cloud | Firebase Hosting y Firestore | APIs REST y Webhooks | CI/CD',
        },
        {
          title: 'Ingeniería de Flujos con IA de Frontera',
          items: 'Agentes Autónomos en Python | Tool-Calling Multi-Modelo | Suites Headless de QA en Python | Rúbricas de Prompts',
        },
        {
          title: 'Liderazgo Maker y Entrega Centrada en el Usuario',
          items: 'Stanford University Innovation Fellow | Lean Six Sigma White Belt | Liderazgo de Equipos Multidisciplinarios (15 Personas) | Logística de Hardware en Crisis',
        },
      ],
      experiences: [
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Arquitecto Líder de Sistemas — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Bibliotecas Digitales Puente a Puente: Adquirió 100+ computadoras y 50+ tabletas en menos de 30 días, desplegando internet satelital y seguridad MDM en 3 centros comunitarios de Loíza.',
            'Más de 100 Despliegues Full-Stack: Lideró a un equipo de 10+ ingenieros para lanzar más de 100 plataformas web y en la nube.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Director Técnico de Estudio — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Liderazgo de Estudio Multidisciplinario: Dirigió a un equipo de 15 desarrolladores, diseñadores y narradores en más de 150 proyectos interactivos (+40% en velocidad).',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Arquitectura de Plataforma y Entrega Técnica (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Modernización de Plataforma Global: Coordinó sprints de ingeniería en Jira para desplegar módulos de descubrimiento con IA generativa en más de 1,250 páginas de edX.',
          ],
        },
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Líder de Automatización de Sistemas y Prototipado IA — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Prototipado Rápido de Flujos: Diseñó más de 20 flujos autónomos de IA y scripts en Python que redujeron configuraciones de días a menos de 4 horas.',
          ],
        },
      ],
      proofPoints: [
        { metric: '150+ Equipos', title: 'Bibliotecas Digitales en <30 Días', sub: 'Puente a Puente · Municipio de Loíza', desc: 'Adquirió 100+ PCs y 50+ tabletas durante la escasez global, instalando internet satelital y MDM en 3 centros de Loíza.' },
        { metric: '4.0 GPA', title: 'Rigor en Ingeniería de Computadoras', sub: 'UPPR y Stanford Innovation Fellow', desc: 'Combina fundamentos de hardware y software (4.0 GPA) con pensamiento de diseño humano de Stanford d.school.' },
        { metric: '110+', title: 'Prototipos y Plataformas en Vivo', sub: 'Nube, WebGL, WebRTC y NFC', desc: 'Dirigió el diseño e implementación de más de 110 plataformas de software y puentes de hardware en producción.' },
        { metric: '4,000+', title: 'Vidas Impulsadas en Puerto Rico', sub: 'Liderazgo en Ecosistema Maker', desc: 'Impulsó el talento creativo y técnico en la isla mediante talleres gratuitos, becas y hackathons.' }
      ]
    }
  },

  caseStudies: [
    {
      id: 'money-group-scale',
      company: 'Money Group (Tiempo Completo)',
      badge: 'Orquestación de Modelos de Frontera (Tiempo Completo)',
      title: 'Orquestación Multi-Agente y Estudio de Prototipos Generativos',
      concept:
        'Los equipos creativos y analíticos pasaban días enterrados en recopilación manual de datos y configuraciones repetitivas en lugar de explorar ideas audaces. Nos preguntamos: ¿cómo pueden los modelos de frontera y el tool-calling actuar como un copiloto colaborativo que asuma el trabajo pesado para que los humanos se concentren en el juicio creativo?',
      technology:
        'Desarrolló más de 20 flujos autónomos de IA utilizando Anthropic Claude y tool-calling de OpenAI, junto con un constructor interno de experiencias web asistido por IA, orquestación de APIs REST y centinelas automatizados de telemetría.',
      impact:
        'Comprimió ciclos de síntesis y prototipado de varios días a menos de 4 horas en una organización de más de 100 personas—devolviendo el enfoque creativo a más de 15 compañeros con un 100% de precisión factual.',
      summary:
        'El Concepto: Liberar a los equipos humanos del trabajo repetitivo convirtiendo los modelos de frontera en copilotos creativos. La Tecnología: Más de 20 flujos autónomos con Claude y OpenAI tool-calling, APIs REST y un constructor web interactivo con IA. El Impacto: Redujo los ciclos de concepto a prototipo de días a menos de 4 horas.',
      challenge:
        'El Concepto: Los equipos en 5 dominios de consumo perdían días en síntesis manual de datos y ensamblaje repetitivo de páginas.',
      strategy:
        'La Tecnología (Parte 1 — Orquestación): Diseñó un estudio interno de IA ("HeyMoney") y más de 20 habilidades de modelos de frontera usando tool-calling estructurado y rúbricas deterministas.',
      execution:
        'La Tecnología (Parte 2 — Constructor Interactivo): Colaboró con Ingeniería de Software en más de 30 sprints para lanzar un generador de experiencias web asistido por IA.',
      metrics: {
        'Prototipos IA': '20+ Habilidades',
        'Ritmo Síntesis': '<4 Horas',
        'Lanzamientos': '30+ Funciones'
      }
    },
    {
      id: 'red-ventures-edx',
      company: 'Red Ventures / edX (Tiempo Completo)',
      badge: 'Descubrimiento IA Centrado en el Usuario (Tiempo Completo)',
      title: 'Descubrimiento de Aprendizaje Generativo y Síntesis Conductual (edX)',
      concept:
        'Elegir qué aprender a continuación en un catálogo de miles de cursos universitarios puede resultar abrumador. Nos propusimos hacer que el descubrimiento educativo en edX se sintiera cercano, alentador e intuitivo—ayudando a millones de mentes curiosas a encontrar el curso ideal.',
      technology:
        'Sintetizó más de 40M de sesiones de aprendizaje en Databricks usando SQL y Python, y desplegó módulos de descubrimiento con IA generativa y personalización front-end en más de 1,250 portales educativos.',
      impact:
        'Inspiró un aumento de 3x (+200%) en consultas estudiantiles guiadas por IA, un +50% en descubrimiento base y un +38.1% en inscripciones verificadas en todo el mundo.',
      summary:
        'El Concepto: Transformar un catálogo abrumador de miles de cursos universitarios en un viaje de descubrimiento intuitivo y alentador. La Tecnología: Síntesis conductual con Databricks SQL y Python en 40M+ de sesiones junto con módulos de IA generativa en 1,250+ portales de edX. El Impacto: Impulsó un +200% en consultas de aprendizaje y +50% en descubrimiento.',
      challenge:
        'El Concepto: Millones de estudiantes potenciales enfrentaban fatiga de decisión al explorar miles de programas universitarios.',
      strategy:
        'La Tecnología (Parte 1 — Síntesis Conductual): Escribió flujos en Databricks SQL y Python para normalizar 40M+ de sesiones y comprender las preguntas reales de los estudiantes.',
      execution:
        'La Tecnología (Parte 2 — Interfaces Generativas): Desplegó síntesis de IA generativa y guía adaptativa en más de 1,250 portales de cursos.',
      metrics: {
        'Consultas con IA': '+200%',
        'Descubrimiento': '+50% Base',
        'Trayectorias': '40M+ Sesiones'
      }
    },
    {
      id: 'viva-advertising',
      company: 'Viva Creative Studio (Mi Empresa / Fundador)',
      url: 'https://viva-advertising.com/',
      urlText: 'Visitar Viva Studio en Vivo (viva-advertising.com) →',
      urlDisplay: 'viva-advertising.com',
      badge: 'Estudio Creativo y Síntesis IA (Fundador)',
      title: 'Estudio de Narrativa Interactiva y Síntesis Predictiva de Empatía',
      concept:
        'El gran trabajo creativo requiere profundidad emocional, calidez cultural y confianza—pero los estudios suelen agotarse en tareas mecánicas repetitivas. Fundé Viva para unir el arte humano con el prototipado generativo y el cuidado proactivo de cada colaboración.',
      technology:
        'Arquitectó cadenas de prompts con OpenAI Codex y Claude para prototipado creativo rápido, junto con lienzos visuales de telemetría en Looker/Power BI y un modelo predictivo de salud colaborativa en PySpark.',
      impact:
        'Permitió a un equipo multidisciplinario de 15 personas en Puerto Rico crear historias vistas más de 1,000 millones de veces en 150+ organizaciones, elevando la velocidad de prototipado en un 40% y manteniendo un 95% de continuidad (+83%).',
      summary:
        'El Concepto: Unir el arte humano, el humor y la calidez cultural con prototipado generativo en un estudio creativo de 15 personas. La Tecnología: Cadenas creativas con OpenAI Codex y Claude, telemetría visual en Looker/Power BI y síntesis predictiva en PySpark. El Impacto: Más de 1B de vistas de historias humanas en 150+ colaboraciones y +83% en continuidad.',
      challenge:
        'El Concepto: Los equipos creativos pierden su chispa cuando quedan atrapados en tareas manuales repetitivas y fricciones inesperadas.',
      strategy:
        'La Tecnología (Parte 1 — Oficio Generativo): Integró flujos con OpenAI Codex y Claude en el diseño y redacción del estudio, triplicando el ritmo de experimentación.',
      execution:
        'La Tecnología (Parte 2 — Empatía Predictiva): Construyó un modelo en PySpark que detectó señales tempranas de fatiga colaborativa con 45 días de anticipación.',
      metrics: {
        'Colaboraciones': '150+ Proyectos',
        'Vistas de Historias': '1,000M+',
        'Continuidad': '+83% (95% Total)'
      }
    },
    {
      id: 'link-puerto-rico',
      company: 'Link Puerto Rico (Mi Empresa / Co-Fundador)',
      url: 'https://linkpuertorico.org/',
      urlText: 'Visitar Link Puerto Rico en Vivo (linkpuertorico.org) →',
      urlDisplay: 'linkpuertorico.org',
      badge: 'Tecnología Cívica y Comunidad Maker (Co-Fundador)',
      title: 'Ecosistema Maker de Base y Prototipos de Tecnología Cívica',
      concept:
        'La tecnología cobra verdadero sentido cuando eleva a la comunidad que te rodea. Co-fundamos Link Puerto Rico para convertir nuestra isla en un laboratorio participativo donde estudiantes, organizaciones sin fines de lucro y creadores construyen soluciones reales para sus propios vecindarios.',
      technology:
        'Dirigió a un equipo de más de 10 ingenieros para arquitectar más de 100 bases de datos relacionales y en la nube, despliegues en Azure/Docker, plataformas NFC sin contacto y bibliotecas digitales satelitales en más de 80 organizaciones.',
      impact:
        'Impactó positivamente más de 4,000 vidas en Puerto Rico, impartió más de 50 talleres técnicos gratuitos para 5,000+ participantes, otorgó más de $100K en subvenciones comunitarias y lanzó más de 110 plataformas cívicas y creativas.',
      summary:
        'El Concepto: Convertir a Puerto Rico en un laboratorio maker participativo donde el talento local construye tecnología para sus propias comunidades. La Tecnología: 100+ bases de datos, despliegues en Azure y Docker, puentes de hardware Web NFC y bibliotecas digitales satelitales. El Impacto: Más de 4,000 vidas impulsadas, 5,000+ estudiantes capacitados y 110+ soluciones creadas.',
      challenge:
        'El Concepto: Las organizaciones comunitarias, estudiantes y municipios necesitaban tecnología accesible y mentoría práctica para resolver retos cívicos urgentes.',
      strategy:
        'La Tecnología (Parte 1 — Nube y Datos): Movilizó a un equipo de 10+ creadores y una red de 2,000+ desarrolladores para construir plataformas escalables en Azure, Docker y SQL/Firestore.',
      execution:
        'La Tecnología (Parte 2 — Prototipos de Campo): Lanzó más de 110 soluciones a medida—desde redes de mentoría juvenil hasta las bibliotecas digitales satelitales de Loíza.',
      metrics: {
        'Vidas Impulsadas': '4,000+',
        'Becas y Fondos': '$100K+',
        'Prototipos Creados': '110+',
        'Talleres y Cumbres': '50+'
      }
    }
  ],

  standaloneProjects: [
    {
      id: 'jobhelper',
      name: 'JobHelper: Prototipo de Síntesis Profesional y Evaluación Interactiva con Modelos de Frontera',
      role: 'Creador e Ingeniero de Sistemas de Frontera',
      organization: 'Experimento Abierto de IA Creativa',
      period: '2026',
      metrics: 'Rúbrica de Síntesis de 100 Puntos · Tool-Calling Multi-Modelo · Extensión Chrome',
      githubUrl: 'https://github.com/eresfavolosx/JobHelper',
      subdomainUrl: 'https://jobhelper.novu.works?from=novuworks',
      mirrorUrl: 'https://jobhelper-c3cd7.web.app?from=novuworks',
      subdomainLabel: 'jobhelper.novu.works',
      concept:
        'Buscar empleo suele sentirse como gritar en un vacío algorítmico donde filtros rígidos de palabras clave ignoran el matiz humano. JobHelper pregunta: ¿y si el descubrimiento profesional se sintiera como conversar con un mentor honesto y optimista que te ayuda a reconocer tus fortalezas y contar tu historia con claridad?',
      technology:
        'Orquesta modelos de frontera (OpenAI, Claude 3.5 y Gemini 2.0 Flash) mediante Python, Next.js 16 y Docker. Utiliza tool-calling determinista, una rúbrica JSON estructurada de 100 puntos, una Extensión de Chrome Manifest V3 de 1 clic y sincronización en tiempo real con Cloud Firestore.',
      impact:
        'Transforma el estrés solitario de buscar trabajo en un diálogo interactivo y libre de sesgos—brindando a creadores e ingenieros claridad constructiva e historias personalizadas en menos de dos segundos.',
      summary:
        'El Concepto: Convierte la evaluación laboral opaca en un diálogo optimista y transparente entre creadores humanos e inteligencia de frontera. La Tecnología: Orquestación LLM multi-modelo (OpenAI, Claude, Gemini), Python, Next.js 16, Docker, Extensión de Chrome Manifest V3 y tool-calling con rúbrica JSON de 100 puntos. El Impacto: Reemplaza la ansiedad de postular con claridad constructiva en menos de dos segundos.',
      tags: ['Modelos de Frontera', 'Tool-Calling', 'Python y Next.js', 'Docker', 'Diseño Humano', 'Prototipos Generativos']
    },
    {
      id: 'picta',
      name: 'Picta: Cámara de Visión Asistiva y Síntesis Perceptual del Color en Tiempo Real',
      role: 'Creador y Arquitecto de Visión Computarizada',
      organization: 'Tecnología Creativa Asistiva / Código Abierto',
      period: '2024 – 2025',
      metrics: 'Daltonización a 60 FPS · 6 Modos Perceptuales · Cuentagotas con Voz',
      githubUrl: 'https://github.com/eresfavolosx/Picta',
      subdomainUrl: 'https://picta.novu.works?from=novuworks',
      mirrorUrl: 'https://picta-novuworks.web.app?from=novuworks',
      subdomainLabel: 'picta.novu.works',
      concept:
        'Para 300 millones de personas con Deficiencia en la Percepción del Color (Protanopía, Deuteranopía, Tritanopía), momentos cotidianos—elegir fruta madura, leer un mapa o combinar ropa—pueden traer frustración silenciosa. Picta nació de la curiosidad: ¿podemos usar visión computarizada en el navegador para que las personas vean y escuchen el contraste perdido, y que sus seres queridos vean el mundo a través de sus ojos?',
      technology:
        'Procesa video en vivo a 60 FPS vía WebRTC (getUserMedia) y aplica convoluciones matriciales de Daltonización en tiempo real mediante shaders acelerados por hardware en SVG y HTML5 Canvas, junto con clasificación perceptual Delta-E y síntesis de voz Web Speech API.',
      impact:
        'Convierte cualquier teléfono o computadora en un compañero visual empático e inmediato—pronunciando en voz alta el nombre exacto de cada color al tocar la pantalla y fomentando la empatía familiar.',
      summary:
        'El Concepto: Invita a las personas con daltonismo—y a sus familias—a ver, escuchar y compartir la calidez emocional del color en tiempo real. La Tecnología: Flujo de cámara WebRTC a 60 FPS, matrices de Daltonización, muestreo Delta-E y síntesis de voz Web Speech. El Impacto: Transforma cualquier navegador en un lente asistivo guiado por voz para más de 300M de personas.',
      tags: ['Visión Computarizada', 'WebRTC 60FPS', 'Shaders de Daltonización', 'Síntesis de Voz', 'Accesibilidad Humana']
    },
    {
      id: 'nfc-platform',
      name: 'Tocaito: Puente Físico-Digital NFC y Prototipo de Experiencias en Vivo',
      role: 'Creador e Ingeniero Full-Stack de Hardware',
      organization: 'Link Puerto Rico · Experimento Físico-Digital',
      period: '2025',
      metrics: 'Toque sin Contacto < 0.4s · API Web NFC · Suite QA en Python',
      githubUrl: 'https://github.com/eresfavolosx/NFC',
      subdomainUrl: 'https://nfc.novu.works?from=novuworks',
      mirrorUrl: 'https://nfc-novuworks.web.app?from=novuworks',
      subdomainLabel: 'nfc.novu.works',
      concept:
        'Los encuentros comunitarios en vivo deberían girar en torno a la conexión humana, no a filas de papel ni gafetes estáticos que quedan obsoletos cuando cambia el programa. Tocaito explora cómo objetos físicos—pulseras, tarjetas y fichas de estudio—pueden convertirse en portales digitales vivos.',
      technology:
        'Programa y lee microchips físicos NTAG213/215/216 directamente desde el navegador con la API Web NFC (NDEFReader), puentes nativos en Capacitor, TypeScript, Vite y Cloud Firestore en tiempo real, respaldados por una suite automatizada de pruebas en Python y Service Workers offline.',
      impact:
        'Lleva magia táctil a los eventos comunitarios—permitiendo actualizar en el aire qué hace una pulsera física en tiempo real y conectando a los asistentes con un toque de 0.4 segundos incluso sin señal celular.',
      summary:
        'El Concepto: Transforma pulseras y objetos físicos en portales digitales vivos mediante un simple toque ("Tocaito"). La Tecnología: Programación de hardware Web NFC (NDEFReader), Capacitor, TypeScript, Vite, Cloud Firestore, Service Workers offline y suite QA en Python. El Impacto: Elimina filas y permite que los objetos físicos se adapten dinámicamente en tiempo real.',
      tags: ['Objetos Físico-Digitales', 'API Web NFC', 'Suite QA en Python', 'Capacitor y Vite', 'Experiencias Interactivas']
    },
    {
      id: 'bizpay',
      name: 'BizPay: Experiencia Humana de Pagos Locales y Liquidación Instantánea',
      role: 'Diseñador Líder de Experiencia y Arquitecto de Sistemas',
      organization: 'Prototipo FinTech Caribeño / Código Abierto',
      period: '2024 – 2025',
      metrics: 'Liquidación Local en 1.2s · API ATH Móvil · Cero Fricción',
      githubUrl: 'https://github.com/eresfavolosx/BizPay',
      subdomainUrl: 'https://bizpay.novu.works?from=novuworks',
      mirrorUrl: 'https://bizpay-novuworks.web.app?from=novuworks',
      subdomainLabel: 'bizpay.novu.works',
      concept:
        'Los creadores independientes, pequeños estudios y trabajadores autónomos en Puerto Rico suelen esperar semanas por cheques en papel o perder ingresos en comisiones internacionales opacas. BizPay reimagina el momento de recibir un pago como un gesto inmediato, transparente y humano de confianza mutua.',
      technology:
        'Construido con JavaScript modular, integración directa con la API de ATH Móvil, matemática de división de tarifas en tiempo real, listeners de webhooks y una interfaz móvil táctil en Material Design.',
      impact:
        'Brinda tranquilidad inmediata a trabajadores independientes y pequeños equipos creativos—convirtiendo cálculos complejos y demoras bancarias de días en una confirmación móvil transparente de 1.2 segundos.',
      summary:
        'El Concepto: Reimagina los pagos a creadores y trabajadores independientes en Puerto Rico como un momento instantáneo y transparente de confianza. La Tecnología: Integración directa con API de ATH Móvil, cálculo matemático en tiempo real, webhooks y diseño móvil Material Design. El Impacto: Reemplaza semanas de espera por cheques con una liquidación transparente en 1.2 segundos.',
      tags: ['Diseño Centrado en el Usuario', 'API ATH Móvil', 'Webhooks en Tiempo Real', 'Prototipo Interactivo', 'JavaScript']
    },
    {
      id: 'hackeaporunacausa',
      name: 'Hackea por una Causa: Descubrimiento de Mentoría Juvenil y Conexión Cívica',
      role: 'Creador Líder y Co-Fundador',
      organization: 'Boys & Girls Clubs de PR · Ganador de Hackathon Cívico',
      period: '2017 – Presente',
      metrics: 'Ganador de Hackathon · 120+ Horas de Mentoría · 6 Centros Comunitarios',
      githubUrl: 'https://github.com/eresfavolosx/hackeaporunacausa',
      subdomainUrl: 'https://hackea.novu.works?from=novuworks',
      mirrorUrl: 'https://hackea-novuworks.web.app?from=novuworks',
      subdomainLabel: 'hackea.novu.works',
      concept:
        'El talento está en cada rincón de Puerto Rico, pero el acceso a mentores no siempre se distribuye por igual. Nacido durante un hackathon cívico, Hackea por una Causa preguntó: ¿cómo podemos hacer que sea sencillo para un joven curioso en un Boys & Girls Club reservar una sesión 1 a 1 con un ingeniero, científico o artista?',
      technology:
        'Desarrollado con React, Node.js, APIs REST de calendarización y un motor de emparejamiento por aspiraciones que conecta los intereses de los estudiantes con mentores verificados, optimizado para conexiones móviles rurales de bajo ancho de banda.',
      impact:
        'Conectó 6 centros regionales de Boys & Girls Clubs con profesionales locales apasionados, desbloqueando más de 120 horas de mentoría humana directa, talleres de programación e imaginación vocacional.',
      summary:
        'El Concepto: Conecta a jóvenes curiosos en comunidades de Puerto Rico con mentores inspiradores en tecnología, ciencia y artes. La Tecnología: React, Node.js, APIs REST y un motor de emparejamiento por aspiraciones optimizado para bajo ancho de banda. El Impacto: Unió 6 centros de Boys & Girls Clubs y brindó más de 120 horas de mentoría juvenil 1 a 1.',
      tags: ['Prototipo Cívico', 'React y Node.js', 'Conexión Humana', 'Síntesis de Mentoría', 'Impacto Social']
    },
    {
      id: 'liza-project',
      name: 'Puente a Puente (Municipio de Loíza): Bibliotecas Digitales Comunitarias y Conectividad Rápida',
      role: 'Director de Proyecto y Arquitecto Líder de Sistemas',
      organization: 'Link Puerto Rico · Municipio de Loíza',
      period: '2020 – 2023',
      metrics: '100+ PCs y 50+ Tabletas (<30 Días) · 3 Bibliotecas Digitales · 1,000+ Residentes',
      githubUrl: 'https://github.com/eresfavolosx/TokenFund',
      subdomainUrl: 'https://linkpuertorico.org',
      mirrorUrl: 'https://linkpuertorico.org',
      subdomainLabel: 'linkpuertorico.org',
      concept:
        'Cuando los cierres globales clausuraron las escuelas, las familias del municipio costero de Loíza enfrentaron un apagón digital repentino—sin computadoras ni internet en casa, los niños no podían tomar clases y los adultos mayores no tenían telemedicina. Puente a Puente fue una carrera contra el tiempo para construir santuarios digitales comunitarios seguros.',
      technology:
        'Ejecutó logística internacional rápida para adquirir más de 100 computadoras y 50 tabletas en menos de 30 días, diseñó enlaces WAN satelitales y de microondas redundantes, instaló perfiles de seguridad MDM y configuró firewalls de protección estudiantil a nivel DNS.',
      impact:
        'Transformó 3 centros comunitarios en bibliotecas digitales resilientes al servicio de más de 1,000 residentes de Loíza diariamente durante 3 años continuos—restaurando el acceso a la educación, herramientas creativas y conexión humana.',
      summary:
        'El Concepto: Construyó bibliotecas digitales comunitarias en Loíza para que más de 1,000 estudiantes y familias no quedaran atrás durante los cierres escolares. La Tecnología: Aprovisionamiento internacional rápido (150+ equipos en <30 días), red WAN satelital, gestión de flotas MDM y firewalls de seguridad estudiantil. El Impacto: Mantuvo conectados a más de 1,000 residentes en 3 centros comunitarios durante 3 años.',
      tags: ['Infraestructura Física', 'Municipio de Loíza', 'WAN Satelital y MDM', 'Impulso Comunitario', 'Ejecución Rápida']
    },
    {
      id: 'viva-advertising',
      name: 'Viva Creative Studio: Plataforma de Narrativa Generativa y Empatía Predictiva',
      role: 'Fundador y Director de Tecnología Creativa',
      organization: 'Viva Creative Studio (Mi Empresa / Fundador)',
      period: '2018 – Presente',
      metrics: '1B+ Vistas de Historias · 150+ Colaboraciones · +83% Continuidad',
      githubUrl: null,
      subdomainUrl: 'https://viva-advertising.com/',
      mirrorUrl: 'https://viva-advertising.com/',
      subdomainLabel: 'viva-advertising.com',
      concept:
        'La comunicación digital suele sentirse ruidosa, repetitiva y desconectada de la emoción humana real. Fundé Viva para explorar cómo la síntesis de datos y las herramientas generativas podían liberar a un colectivo creativo de 15 personas del trabajo mecánico para enfocarse en el humor, la calidez, el matiz cultural y las historias inolvidables.',
      technology:
        'Combina orquestación de modelos de frontera (cadenas de tool-calling con OpenAI Codex y Claude) con almacenes visuales de telemetría en Looker y Power BI y un modelo predictivo de salud colaborativa en PySpark.',
      impact:
        'Permitió a un estudio creativo de 15 personas en Puerto Rico compartir historias que superaron 1,000 millones de vistas en más de 150 organizaciones aliadas, manteniendo un 95% de continuidad colaborativa a largo plazo (+83%).',
      summary:
        'El Concepto: Libera a los equipos creativos del trabajo repetitivo para que puedan crear historias interactivas cálidas y culturalmente resonantes a escala global. La Tecnología: Orquestación LLM de frontera (OpenAI Codex y Claude), telemetría visual en Looker/Power BI y síntesis predictiva en PySpark. El Impacto: Alcanzó más de 1B de vistas humanas en 150+ colaboraciones con un 95% de continuidad.',
      tags: ['Narrativa Generativa', 'Cadenas de Modelos de Frontera', 'Síntesis en PySpark', 'Dirección Creativa', 'viva-advertising.com']
    }
  ],

  education: [
    {
      degree: 'B.S., Ingeniería de Computadoras (Promedio 4.0)',
      institution: 'Universidad Politécnica de Puerto Rico',
      status: 'En Curso',
      coursework:
        'Ingeniería de Software, Estructuras de Datos y Algoritmos, Sistemas de Bases de Datos, Sistemas Operativos, Circuitos Lógicos, Probabilidad y Estadística',
    },
  ],

  certifications: [
    {
      name: 'Microsoft Certified: Power BI Data Analyst Associate',
      issuer: 'Microsoft',
      badge: 'Síntesis de Datos',
    },
    {
      name: 'Estrategia Basada en Datos: Planificación, Reportes y Control con Power BI para Salud e Industrias Reguladas',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'Sistemas de Salud',
    },
    {
      name: 'Implementación Avanzada de Herramientas de Análisis de Datos con Power BI',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'Telemetría Visual',
    },
    {
      name: 'CompTIA IT Fundamentals+ (ITF+) Certified',
      issuer: 'CompTIA',
      badge: 'Sistemas Base',
    },
    {
      name: 'Lean Six Sigma White Belt',
      issuer: 'Management & Strategy Institute / UPPR',
      badge: 'Calidad de Procesos',
    },
    {
      name: 'Herramientas y Técnicas de Gestión de Proyectos en la Práctica',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'Agile Maker',
    },
    {
      name: 'Administración de Fondos Federales',
      issuer: 'Universidad de Puerto Rico (UPR)',
      badge: 'Gobernanza Cívica',
    },
    {
      name: 'Programa University Innovation Fellows (Design Thinking y Estrategia Creativa)',
      issuer: 'Stanford University',
      badge: 'Becario Stanford',
    },
  ],

  awards: [
    {
      title: 'Ganador Premio Red Ventures "Most Likely to say Awesome"',
      year: '2025',
      organization: 'Red Ventures / edX',
      description: 'Otorgado por su optimismo contagioso, curiosidad creativa, excelencia técnica e impacto positivo en los equipos de edX.',
    },
    {
      title: '1er Lugar: Hackatón Include-a-thon por Microsoft',
      year: '2016',
      organization: 'Microsoft',
      description: 'Primer lugar entre decenas de equipos de ingeniería por prototipar software accesible y tecnología asistiva centrada en el ser humano.',
    },
    {
      title: '3er Lugar: American Society for Engineering Education (ASEE)',
      year: '2017',
      organization: 'Conferencia ASEE Zona 2',
      description: 'Reconocido por innovar en el currículo interactivo de ingeniería y la enseñanza técnica práctica.',
    },
    {
      title: 'Mentor de Tecnología Creativa y Startups',
      year: 'Continuo',
      organization: 'Grupo Guayacán',
      description: 'Mentoría a fundadores y creadores emergentes en prototipado rápido, diseño centrado en las personas y arquitectura técnica.',
    },
    {
      title: 'Juez Global de Innovación',
      year: 'Continuo',
      organization: 'Enactus',
      description: 'Evaluación de prototipos universitarios de impacto social e innovaciones comunitarias sostenibles a nivel internacional.',
    },
    {
      title: 'Representante de la Comunidad de Desarrolladores en San Juan',
      year: 'Continuo',
      organization: 'Facebook / Meta Developer Circles',
      description: 'Lideró la comunidad de desarrolladores en San Juan, organizando talleres de programación creativa, hackathons y sesiones de código abierto.',
    },
  ],

  coreCompetencyMatrix: [
    {
      category: 'Modelos de Frontera y Orquestación',
      skills: [
        'OpenAI Codex / GPT-4o, Claude 3.5 y Gemini 2.0',
        'Tool-Calling Determinista y Rúbricas JSON',
        'Orquestación Multi-Agente y Centinelas Autónomos',
        'Cadenas de Narrativa Generativa (3x Velocidad)',
        'Evaluación con Supervisión Humana y Guardrails'
      ]
    },
    {
      category: 'Experiencias Interactivas y Lienzo',
      skills: [
        'Shaders Three.js WebGL y Física a 60 FPS',
        'Visión Computarizada WebRTC y Daltonización',
        'Puentes de Hardware Web NFC y Giroscopio 6DoF',
        'Síntesis de Voz Web Speech y Audio Táctil',
        'Diseño Universal Accesible WCAG 2.2 AAA (EN/ES)'
      ]
    },
    {
      category: 'Sistemas y Síntesis Conductual',
      skills: [
        'Python, FastAPI, Next.js 16, React y TypeScript',
        'SQL, PySpark y Databricks (40M+ Trayectorias)',
        'Docker, Cloud Run, Azure y Firebase Edge',
        '100+ Bases de Datos Relacionales y en Tiempo Real',
        'Ingeniería de Computadoras (4.0 GPA) y Stanford Fellow'
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────
// UI Text Translations Dictionary
// ─────────────────────────────────────────────────────────────
export const I18N_STRINGS = {
  en: {
    // Nav tabs
    intro_enter_btn: 'ENTER EXPERIENCE',
    intro_shortcut_hint: 'Press <kbd class="intro-kbd">ENTER</kbd> anytime to explore creative atelier',
    btn_3d_atelier: '✨ 3D Secondary Screen',
    btn_replay_intro: '🎬 Replay Intro & Sign-Off',
    sig_replay_btn: 'Replay Signature',
    sig_verified_stamp: 'VERIFIED CREATIVE SIGN-OFF',
    nav_overview: 'Overview',
    nav_cases: 'Case Studies',
    nav_projects: 'Live Prototypes',
    nav_ai_lab: 'Live Prototypes',
    nav_planner: 'System Scoper',
    nav_dossier: 'Dossier',
    nav_intel: 'Lab Notes',
    dock_nav_projects: 'Prototypes',
    dock_nav_ai: 'Prototypes',

    // Header controls
    tailor_tag: 'Tailor',
    tools_label: 'Sandbox',
    status_available: 'Available',
    pr_roots_label: 'San Juan, PR',
    spatial_gyro_label: 'Spatial Gyro',
    visualizer_label: 'View 3D',
    theme_label: 'Theme',
    audio_label: 'Sound',
    cmd_text_label: 'Search',
    menu_label: 'Menu',
    nav_drawer_controls: 'CREATIVE ATELIER UTILITIES & SETTINGS:',
    tesla_label: 'Telemetry HUD',
    lang_btn_title: 'Switch language / Cambiar idioma (EN / ES)',

    // Hero Kicker
    hero_kicker_lead: 'CREATIVE TECHNOLOGIST · STORYTELLING × DESIGN × FRONTIER AI',
    hero_kicker_companies: 'MONEY GROUP · RED VENTURES (edX)',
    hero_kicker_degree: 'COMPUTER ENGINEERING (4.0 GPA)',
    hero_kicker_fellow: 'STANFORD INNOVATION FELLOW',
    hero_kicker_auth: '🇺🇸 US CITIZEN (NO SPONSORSHIP REQUIRED)',
    hero_kicker_pr: 'SAN JUAN, PUERTO RICO',

    // The Hybrid Trifecta Banner
    hybrid_badge_title: 'WHERE FRONTIER INTELLIGENCE MEETS THE HUMAN WORLD',
    hybrid_badge_subtitle: 'A hybrid creative thinker and hands-on systems maker building prototypes, interactive experiences, and stories that invite people to participate.',
    pill_trifecta: '✨ The Unified Maker',
    pill_design: '🎨 Human-Centric Design & Storytelling',
    pill_marketing: '🤖 Frontier Models & Orchestration',
    pill_engineering: '⚡ Computer Engineering (4.0 GPA)',

    // Hero Title & Lead
    hero_title: 'Frontier Prototypes.<br /><span class="editorial-serif">Crafted with Empathy, Humor &amp; Code.</span>',
    hero_lead: 'Operating at the intersection of <strong>Human-Centric Design, Interactive Storytelling, and Computer Engineering (4.0 GPA)</strong> to turn open-ended questions into working generative prototypes and physical-to-digital experiences. Shipped <strong>20+ frontier model workflows and interactive web builders</strong> at <strong>Money Group (Full-Time)</strong>, led Generative AI discovery and <strong>40M+ learning journey synthesis</strong> at <strong>Red Ventures (Full-Time, edX)</strong>, and crafted expressive digital platforms and community digital libraries across <strong>150+ collaborations</strong> through <strong>Viva Creative Studio (Founder)</strong>, <strong>Link Puerto Rico (Co-Founder)</strong>, and <strong>Novu Works</strong>.',

    // Hero Buttons
    btn_recruiter: '60s Creative Maker Brief',
    btn_cases: 'Explore Case Studies',
    btn_projects: 'Interactive Prototypes & Subdomains',
    btn_ai_lab: 'Interactive Prototypes & Subdomains',
    btn_resume_card: 'View Maker Resume Card',
    btn_intel: 'Lab Notes & Open Source',
    btn_view_bg: 'View 3D Background',
    btn_lets_chat: "Let's Co-Create",

    // Shipped Systems & Subdomains Showcase
    projects_kicker: 'WORKING PROTOTYPES, ASSISTIVE VISION & PHYSICAL-DIGITAL EXPERIMENTS',
    projects_title: 'Interactive Prototypes & Live Subdomains',
    projects_sub: 'Every experiment is built around a human question—combining frontier model orchestration, real-time computer vision, Web NFC hardware, and procedural physics on live *.novu.works subdomains.',
    featured_subdomains_kicker: 'CONCEPT · TECHNOLOGY · HUMAN IMPACT',
    featured_subdomains_title: 'Interactive Prototypes on Live Subdomains',
    featured_subdomains_sub: 'Working creative technology experiments engineered by Fabián—each structured around The Concept, The Technology, and The Impact.',
    view_all_projects_btn: 'Explore All Interactive Prototypes',

    // Executive Chat & Communications Suite (WhatsApp + Direct Email)
    chat_header_badge: 'Creative Technologist & Maker',
    chat_status_online: '🟢 WhatsApp Direct · Usually replies in minutes',
    chat_status_email: '✉️ Direct Inbox · Response within 2 hours',
    chat_tab_wa_title: 'WhatsApp Live Chat',
    chat_tab_wa_sla: 'Instant',
    chat_tab_wa_sub: 'Direct mobile · Replies in minutes',
    chat_tab_email_title: 'Direct Email',
    chat_tab_email_sla: '< 2h SLA',
    chat_tab_email_sub: 'Priority maker inbox',
    chat_starters_title: 'CHOOSE A CONVERSATION TOPIC (OPENS WHATSAPP DIRECTLY):',
    chat_custom_title: 'OR TYPE A CUSTOM MESSAGE:',
    chat_btn_send_wa: 'Open in WhatsApp',
    chat_nudge_to_email_text: 'Prefer formal written correspondence?',
    chat_nudge_to_email_btn: 'Switch to Direct Email →',
    chat_email_card_label: 'OFFICIAL MAKER INBOX',
    chat_email_verified_tag: '✓ Verified',
    chat_email_response_sla: '⚡ Typical response within 2 hours',
    chat_btn_copy_email: 'Copy Address',
    chat_btn_open_mailto: 'Open Mail Client',
    chat_email_starters_title: 'CHOOSE AN EMAIL TOPIC TEMPLATE:',
    chat_email_composer_title: 'OR COMPOSE DIRECT EMAIL DRAFT:',
    chat_btn_send_email: 'Send via Email Client',
    chat_btn_send_gmail: 'Draft in Gmail Web',
    chat_nudge_to_wa_text: 'Need an immediate answer?',
    chat_nudge_to_wa_btn: 'Switch to WhatsApp Live Chat →',
    chat_alt_phone_label: 'Direct Phone / SMS',
    chat_alt_linkedin_label: 'LinkedIn InMail',
    chat_alt_title: 'OTHER DIRECT CHANNELS:',
    chat_floating_title: 'Chat with Fabián',
    chat_floating_sub: 'WhatsApp & Email',

    // Metrics Ribbon
    metric_1_label: 'Generative Prototypes Shipped',
    metric_1_detail: 'Money Group · Frontier Models',
    metric_2_label: 'Learner Discovery Surge',
    metric_2_detail: 'Red Ventures (edX Platform)',
    metric_3_label: 'Interactive Systems Built',
    metric_3_detail: 'Link PR & Viva Creative Studio',
    metric_4_label: 'Collaboration Continuity',
    metric_4_detail: '95% Sustained via Empathy Synthesis',
    metric_5_label: 'Learning Journeys Mapped',
    metric_5_detail: 'Databricks & Python Synthesis (edX)',

    // Sculpture Dock
    dock_caption: '3D Art Direction:',
    dock_btn_0: '01 · Novu Works Monogram',
    dock_btn_1: '02 · Möbius Flow Ribbon',
    dock_btn_2: '03 · Quantum AI Prism',
    dock_btn_view: '✨ View 3D Background',
    dock_btn_arcade: '✨ 3D Perspective',

    // Case Studies View
    catalog_kicker: 'THE CONCEPT · THE TECHNOLOGY · THE HUMAN IMPACT',
    catalog_title: 'Creative Technology & Frontier AI Case Studies',
    catalog_sub: 'How open-ended human questions became working generative prototypes, empathetic learning journeys, and participatory community infrastructure.',

    // Dossier View
    dossier_auth_pill: 'US Citizen (No Sponsorship Needed)',
    dossier_download_pdf: 'Download Official PDF',
    dossier_heritage_text: 'Puerto Rico Heritage · San Juan · 18.4655° N, 66.1057° W',
    dossier_chime_hint: '(Chime Coquí)',
    role_lens_bar_label: 'EXPLORE MAKER BY CREATIVE & TECHNICAL LENS:',
    role_lens_master: '✨ Creative Tech Master',
    role_lens_ai: '🤖 Frontier Models & AI',
    role_lens_revops: '🎨 Storytelling & Synthesis',
    role_lens_data: '📊 Behavioral Telemetry',
    role_lens_tech: '⚙️ Rapid Prototyping & Hardware',
    section_exp_heading: 'Professional Maker & Creative Technology Experience',
    section_proj_heading: 'Signature Interactive Prototypes & Civic Experiments',
    section_github_heading: 'Open-Source Creative Technology Experiments (Live GitHub API)',
    section_github_sub: 'Live REST sync via GitHub API (<code>@eresfavolosx</code>) · Working open-source prototypes, shaders, computer vision, and tool-calling agents.',
    section_edu_heading: 'Computer Engineering Education & Stanford Fellowship',
    section_awards_heading: 'Honors, Hackathon Wins & Community Leadership',
    section_matrix_heading: 'Creative Technology & Engineering Matrix',
    btn_export_resume: 'Export Maker Resume & Composite Card',
    btn_schedule_chat: 'Schedule a Creative Jam',
    colophon_tag: 'HECHO CON ORGULLO EN PUERTO RICO 🇵🇷',
    colophon_desc: 'Crafted in San Juan, Puerto Rico · Building human-centric frontier AI prototypes and interactive experiences from Puerto Rico for the world.',

    // Recruiter Modal
    rec_kicker: 'CREATIVE EXPERIMENTS FAST-TRACK',
    rec_heading: '60-Second Creative Technologist Brief',
    rec_btn_download: 'Download PDF Resume',
    rec_btn_copy: 'Copy Maker Notes',
    rec_target_prefix: 'Focus:',
    rec_workauth: '<strong>US Citizen (Born in Puerto Rico)</strong> · No Visa Sponsorship Required · Available Immediately for US Remote',
    rec_verdict: 'HYBRID MAKER',
    rec_grade: 'Concept → Prototype',
    rec_checklist_title: 'OpenAI Creative, Experiments Alignment',
    rec_check_1: '<strong>Frontier Model Prototyping:</strong> Shipped 20+ autonomous Claude, OpenAI, and Gemini tool-calling workflows and interactive web builders.',
    rec_check_2: '<strong>Expressive Interactive Canvas:</strong> Custom Three.js WebGL shaders, 60 FPS procedural particle physics, WebRTC computer vision, and Web NFC hardware bridges.',
    rec_check_3: '<strong>Behavioral & Data Synthesis:</strong> Normalized 40M+ human learning sessions in Databricks SQL & Python to power empathetic discovery on edX (+200% lift).',
    rec_check_4: '<strong>Physical-to-Digital Execution:</strong> Sourced 150+ devices and satellite WAN in &lt;30 days to build 3 community digital libraries in Loíza for 1,000+ residents.',
    rec_check_5: '<strong>Humor, Optimism & Storytelling:</strong> Red Ventures "Most Likely to say Awesome" winner, Stanford University Innovation Fellow, and 1st Place Microsoft Include-a-thon winner.',
    rec_btn_view_full: 'View Full Maker Resume & Composite Card',
    rec_btn_email: 'Email Fabián Directly',
    rec_btn_call: 'Call +1 (347) 815-8054',

    // Resume Modal
    res_kicker: 'MAKER COMPOSITE CARD',
    res_heading: 'Creative Technologist Resume Brief',
    res_btn_download: 'Download PDF',
    res_btn_print: 'Print / Save Clean PDF',
    res_btn_copy: 'Copy Text',
    res_sec_summary: 'SUMMARY',
    res_sec_skills: 'SKILLS & CREATIVE CANVAS',
    res_sec_exp: 'EXPERIENCE',
    res_sec_proj: 'SELECTED PROTOTYPES (CONCEPT · TECHNOLOGY · IMPACT)',
    res_sec_edu: 'EDUCATION & FELLOWSHIPS',
    res_sec_awards: 'HONORS, HACKATHONS & COMMUNITY LEADERSHIP',
    res_cta_badge: "LET'S BUILD TOGETHER",
    res_cta_heading: "Ready to turn open-ended questions into working prototypes?",
    res_cta_desc: 'Operating at the convergence of frontier models, human-centric design, and full-stack computer engineering. Excited to build expressive, optimistic interactive experiences.',
    res_cta_btn_chat: 'Start a Conversation',
    res_cta_btn_linkedin: 'Connect on LinkedIn',

    // Visitor Area-of-Interest Concierge Survey Modal
    survey_kicker: 'INTERACTIVE CONCIERGE · TAILORED LENS',
    survey_step: '1-Click Lens Calibration',
    survey_title: "How would you like to explore Fabián's experiments?",
    survey_desc: 'Select a creative lens to highlight the prototypes, engineering canvas, and stories most relevant to your team:',
    survey_opt_1_title: 'Interactive Storytelling & Synthesis',
    survey_opt_1_badge: 'Storytelling & Empathy',
    survey_opt_1_desc: '1B+ story views, generative discovery on edX (+200% lift), and human-centric narrative experiences.',
    survey_opt_2_title: 'Frontier Models & Agentic Orchestration',
    survey_opt_2_badge: 'Frontier AI',
    survey_opt_2_desc: '20+ autonomous Claude & OpenAI tool-calling skills, 100-point structured JSON rubrics, and rapid prototyping.',
    survey_opt_3_title: 'Behavioral Synthesis & Telemetry',
    survey_opt_3_badge: 'Data & Behavior',
    survey_opt_3_desc: '40M+ human learning journeys synthesized in Databricks SQL & Python, plus predictive relationship models.',
    survey_opt_4_title: 'Human-Centric Design & Creative Coding',
    survey_opt_4_badge: 'Design & WebGL',
    survey_opt_4_desc: 'Three.js WebGL shaders, 60 FPS WebRTC Daltonization vision, Web NFC objects, and WCAG AAA accessibility.',
    survey_btn_skip: 'Skip · Explore Unified Creative Technologist Profile',

    // Mobile Dock
    dock_nav_overview: 'Overview',
    dock_nav_cases: 'Cases',
    dock_nav_roi: 'Scoper',
    dock_nav_dossier: 'Dossier',
    dock_nav_intel: 'Lab Notes',

    // Toasts
    toast_lang_switched: 'Language switched to English (Default)',
  },

  es: {
    // Nav tabs
    intro_enter_btn: 'ENTRAR A LA EXPERIENCIA',
    intro_shortcut_hint: 'Presiona <kbd class="intro-kbd">ENTER</kbd> en cualquier momento para explorar',
    btn_3d_atelier: '✨ Pantalla Secundaria 3D',
    btn_replay_intro: '🎬 Repetir Introducción y Firma',
    sig_replay_btn: 'Repetir Firma',
    sig_verified_stamp: 'FIRMA CREATIVA VERIFICADA',
    nav_overview: 'Resumen',
    nav_cases: 'Casos de Estudio',
    nav_projects: 'Prototipos en Vivo',
    nav_ai_lab: 'Prototipos en Vivo',
    nav_planner: 'Arquitectura',
    nav_dossier: 'Expediente',
    nav_intel: 'Notas de Lab',
    dock_nav_projects: 'Prototipos',
    dock_nav_ai: 'Prototipos',

    // Header controls
    tailor_tag: 'Enfoque',
    tools_label: 'Sandbox',
    status_available: 'Disponible',
    pr_roots_label: 'San Juan, PR',
    spatial_gyro_label: 'Giroscopio',
    visualizer_label: 'Ver 3D',
    theme_label: 'Tema',
    audio_label: 'Sonido',
    cmd_text_label: 'Buscar',
    menu_label: 'Menú',
    nav_drawer_controls: 'UTILIDADES Y CONFIGURACIÓN DEL TALLER:',
    tesla_label: 'HUD Telemetría',
    lang_btn_title: 'Cambiar idioma / Switch language (ES / EN)',

    // Hero Kicker
    hero_kicker_lead: 'TECNÓLOGO CREATIVO · NARRATIVA × DISEÑO × IA DE FRONTERA',
    hero_kicker_companies: 'MONEY GROUP · RED VENTURES (edX)',
    hero_kicker_degree: 'INGENIERÍA EN COMPUTADORAS (4.0 GPA)',
    hero_kicker_fellow: 'BECARIO STANFORD INNOVATION',
    hero_kicker_auth: '🇺🇸 CIUDADANO EE.UU. (NO REQUIERE PATROCINIO)',
    hero_kicker_pr: 'SAN JUAN, PUERTO RICO',

    // The Hybrid Trifecta Banner
    hybrid_badge_title: 'DONDE LA INTELIGENCIA DE FRONTERA SE ENCUENTRA CON EL MUNDO HUMANO',
    hybrid_badge_subtitle: 'Pensador creativo híbrido y creador práctico de sistemas construyendo prototipos, experiencias interactivas e historias que invitan a participar.',
    pill_trifecta: '✨ El Creador Unificado',
    pill_design: '🎨 Diseño Humano y Narrativa',
    pill_marketing: '🤖 Modelos de Frontera y Orquestación',
    pill_engineering: '⚡ Ingeniería de Computadoras (4.0 GPA)',

    // Hero Title & Lead
    hero_title: 'Prototipos de Frontera.<br /><span class="editorial-serif">Forjados con Empatía, Humor y Código.</span>',
    hero_lead: 'Operando en la intersección de <strong>Diseño Centrado en las Personas, Narrativa Interactiva e Ingeniería de Computadoras (4.0 GPA)</strong> para transformar preguntas abiertas en prototipos generativos funcionales y experiencias físico-digitales. Desplegó <strong>más de 20 flujos con modelos de frontera y constructores web interactivos</strong> en <strong>Money Group (Tiempo Completo)</strong>, lideró el descubrimiento con IA generativa y la <strong>síntesis de más de 40M de trayectorias de aprendizaje</strong> en <strong>Red Ventures (Tiempo Completo, edX)</strong>, y creó plataformas expresivas y bibliotecas digitales comunitarias en <strong>más de 150 colaboraciones</strong> a través de <strong>Viva Creative Studio (Fundador)</strong>, <strong>Link Puerto Rico (Co-Fundador)</strong> y <strong>Novu Works</strong>.',

    // Hero Buttons
    btn_recruiter: 'Resumen Creativo (60s)',
    btn_cases: 'Explorar Casos de Estudio',
    btn_projects: 'Prototipos Interactivos y Subdominios',
    btn_ai_lab: 'Prototipos Interactivos y Subdominios',
    btn_resume_card: 'Ver Hoja de Vida Maker',
    btn_intel: 'Notas de Lab y Código Abierto',
    btn_view_bg: 'Ver Fondo 3D',
    btn_lets_chat: 'Co-Creemos',

    // Shipped Systems & Subdomains Showcase
    projects_kicker: 'PROTOTIPOS FUNCIONALES, VISIÓN ASISTIVA Y EXPERIMENTOS FÍSICO-DIGITALES',
    projects_title: 'Prototipos Interactivos y Subdominios en Vivo',
    projects_sub: 'Cada experimento nace de una pregunta humana—combinando orquestación de modelos de frontera, visión computarizada en tiempo real, hardware Web NFC y física procedural en subdominios *.novu.works.',
    featured_subdomains_kicker: 'EL CONCEPTO · LA TECNOLOGÍA · EL IMPACTO HUMANO',
    featured_subdomains_title: 'Prototipos Interactivos en Subdominios en Vivo',
    featured_subdomains_sub: 'Experimentos de tecnología creativa desarrollados por Fabián—estructurados en torno a El Concepto, La Tecnología y El Impacto.',
    view_all_projects_btn: 'Explorar Todos los Prototipos',

    // Executive Chat & Communications Suite (WhatsApp + Direct Email)
    chat_header_badge: 'Tecnólogo Creativo y Creador',
    chat_status_online: '🟢 WhatsApp Directo · Suele responder en minutos',
    chat_status_email: '✉️ Bandeja Directa · Respuesta en menos de 2 horas',
    chat_tab_wa_title: 'Chat en Vivo de WhatsApp',
    chat_tab_wa_sla: 'Instantáneo',
    chat_tab_wa_sub: 'Móvil directo · Responde en minutos',
    chat_tab_email_title: 'Correo Directo',
    chat_tab_email_sla: '< 2h SLA',
    chat_tab_email_sub: 'Bandeja prioritaria',
    chat_starters_title: 'ELIGE UN TEMA DE CONVERSACIÓN (ABRE WHATSAPP DIRECTO):',
    chat_custom_title: 'O ESCRIBE UN MENSAJE PERSONALIZADO:',
    chat_btn_send_wa: 'Abrir en WhatsApp',
    chat_nudge_to_email_text: '¿Prefieres correspondencia formal por escrito?',
    chat_nudge_to_email_btn: 'Cambiar a Correo Directo →',
    chat_email_card_label: 'BANDEJA OFICIAL',
    chat_email_verified_tag: '✓ Verificado',
    chat_email_response_sla: '⚡ Respuesta típica en menos de 2 horas',
    chat_btn_copy_email: 'Copiar Correo',
    chat_btn_open_mailto: 'Abrir Cliente de Correo',
    chat_email_starters_title: 'ELIGE UNA PLANTILLA DE CORREO:',
    chat_email_composer_title: 'O REDACTA UN BORRADOR DE CORREO:',
    chat_btn_send_email: 'Enviar con Cliente de Correo',
    chat_btn_send_gmail: 'Redactar en Gmail Web',
    chat_nudge_to_wa_text: '¿Necesitas una respuesta inmediata?',
    chat_nudge_to_wa_btn: 'Cambiar a WhatsApp en Vivo →',
    chat_alt_phone_label: 'Teléfono Directo / SMS',
    chat_alt_linkedin_label: 'LinkedIn InMail',
    chat_alt_title: 'OTROS CANALES DIRECTOS:',
    chat_floating_title: 'Chatea con Fabián',
    chat_floating_sub: 'WhatsApp y Correo',

    // Metrics Ribbon
    metric_1_label: 'Prototipos Generativos',
    metric_1_detail: 'Money Group · Modelos de Frontera',
    metric_2_label: 'Impulso en Descubrimiento',
    metric_2_detail: 'Red Ventures (Plataforma edX)',
    metric_3_label: 'Sistemas Interactivos',
    metric_3_detail: 'Link PR y Viva Creative Studio',
    metric_4_label: 'Continuidad Colaborativa',
    metric_4_detail: '95% Sostenido con Síntesis Empática',
    metric_5_label: 'Trayectorias Sintetizadas',
    metric_5_detail: 'Databricks y Python (edX)',

    // Sculpture Dock
    dock_caption: 'Dirección de Arte 3D:',
    dock_btn_0: '01 · Monograma Novu Works',
    dock_btn_1: '02 · Cinta de Flujo Möbius',
    dock_btn_2: '03 · Prisma Cuántico IA',
    dock_btn_view: '✨ Ver Fondo 3D',
    dock_btn_arcade: '✨ Perspectiva 3D',

    // Case Studies View
    catalog_kicker: 'EL CONCEPTO · LA TECNOLOGÍA · EL IMPACTO HUMANO',
    catalog_title: 'Casos de Estudio de Tecnología Creativa e IA de Frontera',
    catalog_sub: 'Cómo preguntas humanas abiertas se convirtieron en prototipos generativos funcionales, viajes de aprendizaje empáticos e infraestructura comunitaria participativa.',

    // Dossier View
    dossier_auth_pill: 'Ciudadano EE.UU. (No Requiere Patrocinio)',
    dossier_download_pdf: 'Descargar PDF Oficial',
    dossier_heritage_text: 'Herencia Puertorriqueña · San Juan · 18.4655° N, 66.1057° W',
    dossier_chime_hint: '(Cantar Coquí)',
    role_lens_bar_label: 'EXPLORAR PERFIL POR ENFOQUE CREATIVO Y TÉCNICO:',
    role_lens_master: '✨ Tecnólogo Creativo',
    role_lens_ai: '🤖 Modelos de Frontera e IA',
    role_lens_revops: '🎨 Narrativa y Síntesis',
    role_lens_data: '📊 Telemetría Conductual',
    role_lens_tech: '⚙️ Prototipado y Hardware',
    section_exp_heading: 'Experiencia Profesional en Tecnología Creativa y Sistemas',
    section_proj_heading: 'Prototipos Interactivos Emblemáticos y Experimentos Cívicos',
    section_github_heading: 'Experimentos de Código Abierto en Vivo (API de GitHub)',
    section_github_sub: 'Sincronización REST vía API de GitHub (<code>@eresfavolosx</code>) · Prototipos abiertos, shaders, visión computarizada y agentes con tool-calling.',
    section_edu_heading: 'Ingeniería de Computadoras y Beca Stanford',
    section_awards_heading: 'Honores, Premios de Hackathon y Liderazgo Cívico',
    section_matrix_heading: 'Matriz de Tecnología Creativa e Ingeniería',
    btn_export_resume: 'Exportar Hoja de Vida y Tarjeta Compuesta',
    btn_schedule_chat: 'Agendar Sesión de Co-Creación',
    colophon_tag: 'HECHO CON ORGULLO EN PUERTO RICO 🇵🇷',
    colophon_desc: 'Creado en San Juan, Puerto Rico · Construyendo prototipos de IA de frontera y experiencias interactivas centradas en el ser humano desde Puerto Rico para el mundo.',

    // Recruiter Modal
    rec_kicker: 'RESUMEN RÁPIDO · CREATIVE EXPERIMENTS',
    rec_heading: 'Resumen de Tecnólogo Creativo en 60 Segundos',
    rec_btn_download: 'Descargar Hoja de Vida en PDF',
    rec_btn_copy: 'Copiar Notas',
    rec_target_prefix: 'Enfoque:',
    rec_workauth: '<strong>Ciudadano Estadounidense (Nacido en Puerto Rico)</strong> · No Requiere Patrocinio de Visa · Disponible Inmediatamente para Remoto en EE.UU.',
    rec_verdict: 'CREADOR HÍBRIDO',
    rec_grade: 'Concepto → Prototipo',
    rec_checklist_title: 'Alineación con Creative, Experiments (OpenAI)',
    rec_check_1: '<strong>Prototipado con Modelos de Frontera:</strong> Más de 20 flujos autónomos con Claude, OpenAI y Gemini usando tool-calling y constructores web interactivos.',
    rec_check_2: '<strong>Lienzo Interactivo Expresivo:</strong> Shaders Three.js WebGL, física de partículas a 60 FPS, visión computarizada WebRTC y puentes de hardware Web NFC.',
    rec_check_3: '<strong>Síntesis Conductual y de Datos:</strong> Normalizó más de 40M de sesiones de aprendizaje humano en Databricks SQL y Python para impulsar el descubrimiento en edX (+200%).',
    rec_check_4: '<strong>Ejecución Físico-Digital:</strong> Adquirió 150+ equipos e internet satelital en &lt;30 días para construir 3 bibliotecas digitales comunitarias en Loíza para 1,000+ residentes.',
    rec_check_5: '<strong>Humor, Optimismo y Narrativa:</strong> Ganador del premio "Most Likely to say Awesome" en Red Ventures, Stanford University Innovation Fellow y 1er Lugar en Microsoft Include-a-thon.',
    rec_btn_view_full: 'Ver Hoja de Vida Completa',
    rec_btn_email: 'Enviar Correo a Fabián',
    rec_btn_call: 'Llamar al +1 (347) 815-8054',

    // Resume Modal
    res_kicker: 'TARJETA COMPUESTA DE CREADOR',
    res_heading: 'Hoja de Vida de Tecnólogo Creativo',
    res_btn_download: 'Descargar PDF',
    res_btn_print: 'Imprimir / Guardar PDF Limpio',
    res_btn_copy: 'Copiar Texto',
    res_sec_summary: 'RESUMEN',
    res_sec_skills: 'HABILIDADES Y LIENZO TÉCNICO',
    res_sec_exp: 'EXPERIENCIA PROFESIONAL',
    res_sec_proj: 'PROTOTIPOS DESTACADOS (CONCEPTO · TECNOLOGÍA · IMPACTO)',
    res_sec_edu: 'EDUCACIÓN Y BECAS',
    res_sec_awards: 'HONORES, HACKATHONS Y LIDERAZGO COMUNITARIO',
    res_cta_badge: 'CONSTRUYAMOS JUNTOS',
    res_cta_heading: '¿Listo para convertir preguntas abiertas en prototipos vivos?',
    res_cta_desc: 'Operando en la convergencia de modelos de frontera, diseño centrado en las personas e ingeniería de computadoras full-stack.',
    res_cta_btn_chat: 'Iniciar Conversación',
    res_cta_btn_linkedin: 'Conectar en LinkedIn',

    // Visitor Area-of-Interest Concierge Survey Modal
    survey_kicker: 'CONSERJE INTERACTIVO · ENFOQUE PERSONALIZADO',
    survey_step: 'Calibración en 1 Clic',
    survey_title: '¿Cómo te gustaría explorar los experimentos de Fabián?',
    survey_desc: 'Selecciona un lente creativo para destacar los prototipos, la ingeniería y las historias más relevantes para tu equipo:',
    survey_opt_1_title: 'Narrativa Interactiva y Síntesis',
    survey_opt_1_badge: 'Narrativa y Empatía',
    survey_opt_1_desc: 'Más de 1B de vistas de historias, descubrimiento generativo en edX (+200%) y experiencias centradas en las personas.',
    survey_opt_2_title: 'Modelos de Frontera y Orquestación',
    survey_opt_2_badge: 'IA de Frontera',
    survey_opt_2_desc: 'Más de 20 habilidades con Claude y OpenAI tool-calling, rúbricas JSON de 100 puntos y prototipado rápido.',
    survey_opt_3_title: 'Síntesis Conductual y Telemetría',
    survey_opt_3_badge: 'Datos y Conducta',
    survey_opt_3_desc: 'Más de 40M de trayectorias humanas sintetizadas en Databricks SQL y Python, más modelos predictivos de colaboración.',
    survey_opt_4_title: 'Diseño Humano y Programación Creativa',
    survey_opt_4_badge: 'Diseño y WebGL',
    survey_opt_4_desc: 'Shaders Three.js WebGL, visión Daltonizada WebRTC a 60 FPS, objetos Web NFC y accesibilidad universal WCAG AAA.',
    survey_btn_skip: 'Omitir · Explorar Perfil Completo de Tecnólogo Creativo',

    // Mobile Dock
    dock_nav_overview: 'Resumen',
    dock_nav_cases: 'Casos',
    dock_nav_roi: 'Arquitectura',
    dock_nav_dossier: 'Expediente',
    dock_nav_intel: 'Notas Lab',

    // Toasts
    toast_lang_switched: 'Idioma cambiado a Español (Puerto Rico / EE.UU.)',
  }
};

let currentLang = DEFAULT_LANG;

/**
 * Returns the currently active language ('en' | 'es')
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Determines initial language:
 * 1. URL search param ?lang= (if 'en' or 'es')
 * 2. localStorage 'nov_lang' (if 'en' or 'es')
 * 3. Default: 'en' (Strictly English as requested by user)
 */
export function resolveInitialLanguage() {
  ensureSnapshots();
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang')?.toLowerCase();
    if (queryLang && SUPPORTED_LANGS.includes(queryLang)) {
      return queryLang;
    }
  } catch (e) {
    // ignore
  }

  try {
    const saved = localStorage.getItem('nov_lang')?.toLowerCase();
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }
  } catch (e) {
    // ignore
  }

  return DEFAULT_LANG;
}

/**
 * Translates a given key or returns fallback
 */
export function t(key, fallback = '') {
  const dict = I18N_STRINGS[currentLang] || I18N_STRINGS.en;
  return dict[key] !== undefined ? dict[key] : (I18N_STRINGS.en[key] !== undefined ? I18N_STRINGS.en[key] : fallback);
}

/**
 * Applies deep properties into target in-place
 */
function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Updates PROFILE and DISCIPLINES in-place to reflect language
 */
export function updateProfileDataForLanguage(lang) {
  ensureSnapshots();
  if (lang === 'es') {
    mergeDeep(PROFILE, PROFILE_ES);
  } else {
    // Revert to pristine English
    mergeDeep(PROFILE, PROFILE_EN);
  }
}

/**
 * Updates all DOM elements that have data-i18n attributes or targeted IDs
 */
export function updateDomTranslations(lang) {
  const dict = I18N_STRINGS[lang] || I18N_STRINGS.en;

  // 1. Elements with explicit data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // 2. Elements with explicit data-i18n-title attribute
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.setAttribute('title', dict[key]);
    }
  });

  // 3. Document language attribute
  document.documentElement.lang = lang;

  // 4. Update Language toggle pill states in header
  const btnToggle = document.getElementById('btn-lang-toggle');
  if (btnToggle) {
    const enCode = btnToggle.querySelector('.lang-code-en');
    const esCode = btnToggle.querySelector('.lang-code-es');
    if (enCode && esCode) {
      if (lang === 'en') {
        enCode.classList.add('active');
        esCode.classList.remove('active');
      } else {
        enCode.classList.remove('active');
        esCode.classList.add('active');
      }
    }
    btnToggle.setAttribute('title', dict.lang_btn_title || 'Switch language / Cambiar idioma (EN / ES)');
    btnToggle.setAttribute('aria-label', `EN / ES · ${lang === 'es' ? 'Idioma: Español. Clic para cambiar a Inglés' : 'Switch Language (Current: English)'}`);
  }
}

/**
 * Main application language switcher method
 */
export function switchLanguage(lang, appInstance, showNotification = true) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  currentLang = lang;

  try {
    localStorage.setItem('nov_lang', lang);
  } catch (e) {
    // ignore
  }

  // Update data layers in-place
  updateProfileDataForLanguage(lang);

  // Update static DOM labels
  updateDomTranslations(lang);

  // If app instance provided, re-render dynamic sections
  if (appInstance) {
    try {
      if (typeof appInstance.renderCaseStudies === 'function') appInstance.renderCaseStudies();
      if (typeof appInstance.renderCompetencyMatrix === 'function') appInstance.renderCompetencyMatrix();
      if (typeof appInstance.renderDossier === 'function') appInstance.renderDossier();
      if (typeof appInstance.renderProjects === 'function') appInstance.renderProjects();
      if (typeof appInstance.renderPrintableResume === 'function') appInstance.renderPrintableResume();
      if (typeof appInstance.updateRecruiterScorecard === 'function') appInstance.updateRecruiterScorecard();
      if (typeof appInstance.setRoleLens === 'function') appInstance.setRoleLens(appInstance.activeRoleLens || 'master');
      if (appInstance.bilingualHero && typeof appInstance.bilingualHero.setLanguage === 'function') {
        appInstance.bilingualHero.setLanguage(lang);
      }
    } catch (err) {
      console.warn('Re-rendering error upon language switch:', err);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('novu:language-changed', { detail: { lang } }));
    }

    if (showNotification && typeof appInstance.showToast === 'function') {
      const dict = I18N_STRINGS[lang] || I18N_STRINGS.en;
      appInstance.showToast(dict.toast_lang_switched);
    }
  }

  return currentLang;
}
