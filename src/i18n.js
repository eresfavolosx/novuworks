// ─────────────────────────────────────────────────────────────
//  Novu Works — Full Bilingual Internationalization (EN / ES)
//  Default Experience: English ('en')
//  Authentic Executive Spanish: 'es' (San Juan, Puerto Rico)
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
// Spanish Profile Translations (Executive, Professional & Accurate)
// ─────────────────────────────────────────────────────────────
export const PROFILE_ES = {
  role: 'Director de Mercadeo de Rendimiento y Gerente de Producto Técnico',
  level: 'Líder ICS4',
  tenure: '8+ Años (IA para Mercadeo, Analítica RevOps y Sistemas de Software)',
  location: 'San Juan, PR (Remoto en EE.UU. / Global)',
  workAuthorization: 'Ciudadano de EE.UU. (Nacido en Puerto Rico · No Requiere Patrocinio de Visa)',
  summary:
    'Líder dinámico de Mercadeo de Rendimiento y Gerente de Producto Técnico con más de 8 años de experiencia uniendo infraestructura de ad-tech, automatización con IA y compra de medios de alto ROI. Trayectoria comprobada liderando equipos ágiles de mercadeo, ejecutando campañas digitales de 360° que generaron más de $10M en ingresos y optimizando embudos de conversión. Líder sumamente proactivo con profunda fluidez técnica en analítica de datos (Databricks, SQL) y flujos agénticos, permitiendo una colaboración fluida con directivos para impulsar la adquisición de usuarios y maximizar la eficiencia operativa.',
  status: 'Disponible para Roles de Alto Impacto en Empresas de IA y Tecnología (Líder en Ingeniería de Crecimiento, Dueño Técnico de Producto IA, Analítica Avanzada, Director de Operaciones Técnicas).',

  headlineStats: [
    { label: 'Flujos de IA Automatizados', value: '20+', sub: 'Money Group (Tiempo Completo) · Anthropic Claude' },
    { label: 'Aumento de Leads con IA', value: '+200%', sub: 'Red Ventures (Tiempo Completo, edX) · +38.1% Verificaciones' },
    { label: 'Pipeline B2B Generado', value: '$10M+', sub: 'Viva Advertising (Mi Empresa) · 150+ Cuentas' },
    { label: 'Supresión de Pérdida de Clientes', value: '-83%', sub: 'Reducción de churn del 30% al 5% con modelado predictivo en CRM' },
    { label: 'Telemetría en Databricks', value: '40M+', sub: 'Sesiones normalizadas con SQL y Python en edX' },
  ],

  roleVariants: {
    master: {
      id: 'master',
      label: '🚀 Resumen Maestro',
      shortTitle: 'Líder de Mercadeo de Rendimiento y Gerente de Producto Técnico',
      headline: 'Líder de Mercadeo de Rendimiento y Gerente de Producto Técnico',
      summary:
        'Líder dinámico de Mercadeo de Rendimiento y Gerente de Producto Técnico con más de 8 años de experiencia uniendo infraestructura de ad-tech, automatización con IA y compra de medios de alto ROI. Trayectoria comprobada liderando equipos ágiles de mercadeo, ejecutando campañas digitales de 360° que generaron más de $10M en ingresos y optimizando embudos de conversión. Líder sumamente proactivo con profunda fluidez técnica en analítica de datos (Databricks, SQL) y flujos agénticos, permitiendo una colaboración fluida con directivos para impulsar la adquisición de usuarios y maximizar la eficiencia operativa.',
      skills: [
        {
          title: 'Mercadeo de Rendimiento y Operaciones de Ingresos (RevOps)',
          items: 'Compra de Medios | Gestión de Campañas 360° | SEO y Generación de Leads | Optimización de ROAS | Estrategia B2B y B2C',
        },
        {
          title: 'Gestión de Producto y Proyectos',
          items: 'Gestión Técnica de Proyectos | Agile / Scrum | Planificación de Sprints | Jira y Asana | Bilingüe (Inglés/Español)',
        },
        {
          title: 'Arquitectura de Datos y Ad-Tech',
          items: 'Pipelines de Datos (Databricks, SQL) | Infraestructura en la Nube (Azure) | Analítica de Datos (PowerBI, Tableau, Looker)',
        },
        {
          title: 'Estrategia de IA y Automatización',
          items: 'IA Generativa | Flujos Agénticos | APIs de LLMs (Anthropic Claude, OpenAI Codex, Gemini) | Automatización de Procesos',
        },
        {
          title: 'Plataformas de Mercadeo y CRM',
          items: 'Google Ads, Meta Business Suite, TikTok Ads, HubSpot, Salesforce, Google Analytics (GA4)',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Comprador de Medios — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Medios de Rendimiento y Ad-Tech: Gestionó el desarrollo de herramientas propietarias de ad-tech y un generador web impulsado por IA, promoviendo su adopción en toda la empresa para optimizar la compra de medios y las operaciones de ingresos en una organización de más de 100 empleados.',
            'Automatización de Campañas: Dirigió la ingeniería de más de 20 flujos de trabajo agénticos automatizados utilizando Anthropic Claude para generar reportes complejos de rendimiento, rastrear KPIs y ejecutar ajustes en tiempo real en campañas de mercadeo.',
            'Liderazgo Ágil de Mercadeo: Coordinó sprints en Asana y participó en el ciclo de vida de extremo a extremo de más de 30 nuevas funcionalidades MarTech, diseñando integraciones dinámicas mediante APIs REST.',
            'Eficiencia Operativa: Desplegó agentes de IA no supervisados para gestionar autónomamente operaciones internas de negocio, alertas en tiempo real y enrutamiento de correspondencia, ahorrando cientos de horas de trabajo en los equipos de medios y de ingresos.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Crecimiento y SEO (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'SEO y Optimización de Conversión: Lideró el despliegue estratégico de IA Generativa y reglas de personalización front-end basadas en lógica en propiedades digitales, logrando un aumento del +200% en leads impulsados por IA y un incremento de +38.1% en verificaciones.',
            'Analítica de Datos de Mercadeo: Utilizó Python y SQL (Databricks) para supervisar pipelines de datos escalables, consultando y reconciliando conjuntos masivos de datos (más de 40M de sesiones) para estructurar datos limpios para la analítica de ingresos corporativos.',
            'Rastreo Multidisciplinario: Lideró la depuración técnica entre equipos mediante paneles de monitoreo en tiempo real, rastreando fallas de sistema, incidencias de QA y despliegues de sprint en Jira para garantizar un rendimiento de mercadeo sin interrupciones.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Co-Fundador y VP de Mercadeo — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Visión Estratégica y Crecimiento de Ingresos: Diseñó estrategias de GTM basadas en datos para un ecosistema digital global, generando más de 1,000 millones de impresiones y más de $10M en ingresos directos. Gestionó un pipeline comercial de más de $50M, optimizando el gasto programático para maximizar conversiones.',
            'Liderazgo Multidisciplinario: Lideró un equipo ágil multidisciplinario de 15 profesionales (compradores de medios, diseñadores y desarrolladores), implementando herramientas de productividad (Asana, Jira) que incrementaron la velocidad de entrega en un 40% en más de 150 proyectos empresariales concurrentes.',
            'Retención y Optimización de Clientes: Diseñó un marco de habilitación de ventas con analítica predictiva para identificar cuentas en riesgo, reduciendo la pérdida de clientes en un 83% (del 30% al 5%).',
            'Automatización de Mercadeo con IA: Creó flujos de trabajo agénticos integrando OpenAI Codex y LLMs de Anthropic para automatizar pipelines complejos de contenido y eliminar cuellos de botella operativos.',
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
            'Lanzamiento de Productos e Infraestructura Cloud: Gestionó el despliegue de infraestructura escalable en Azure, soportando exitosamente a más de 3,800 usuarios concurrentes en plataformas de alto tráfico para impulsar el compromiso y la retención. Optimizó recursos y costos para proyectos de impacto social.',
            'Creación de Ecosistema Técnico: Fundó y dirigió una comunidad técnica de más de 2,000 desarrolladores, facilitando más de 50 talleres prácticos sobre tecnologías en la nube y desarrollo de software para más de 5,000 innovadores locales. Aseguró y gestionó más de $100K en subvenciones y fondos técnicos.',
            'Asesoría a Startups y Comunicación Técnica: Asesoró a más de 80 startups corporativas en infraestructura de datos escalable y ciclo de vida del software (SDLC) sobre más de 50,000 transacciones pagadas, facilitando más de $3M en financiamiento y ventas acumuladas.',
          ],
        },
      ],
      proofPoints: [
        { metric: '20+', title: 'Flujos de IA Automatizados', sub: 'Money Group (Tiempo Completo, Ad-Tech e IA)', desc: 'Dirigió la ingeniería de más de 20 flujos de trabajo agénticos automatizados con Anthropic Claude para reportes de rendimiento complejos, seguimiento de KPIs y ajustes de campañas en tiempo real.' },
        { metric: '+200%', title: 'Aumento de Leads con IA', sub: 'Red Ventures (Tiempo Completo, Plataforma edX)', desc: 'Lideró el despliegue estratégico de IA Generativa y personalización front-end, logrando un aumento del +200% en leads calificados y +38.1% en verificaciones de cursos.' },
        { metric: '$10M+', title: 'Pipeline Generado y -83% Churn', sub: 'Viva Advertising (Mi Empresa / Fundador)', desc: 'Diseñó estrategias de GTM basadas en datos generando más de 1,000 millones de impresiones y más de $10M en ingresos directos en 150+ proyectos empresariales, reduciendo el churn en un 83%.' },
        { metric: '40M+', title: 'Sesiones Normalizadas en Databricks', sub: 'Red Ventures (Tiempo Completo, Lakehouse edX)', desc: 'Consultó y limpió telemetría cruda con Databricks SQL y Python en más de 40M de sesiones para estructurar datos limpios para la analítica de ingresos corporativos.' }
      ]
    },

    ai_engineering: {
      id: 'ai_engineering',
      label: '🤖 IA e Ingeniería',
      shortTitle: 'Ingeniero de IA Agéntica y Automatización de Mercadeo',
      headline: 'Ingeniero de IA Agéntica y Automatización de Mercadeo de Rendimiento',
      summary:
        'Gerente de Mercadeo de Rendimiento Agéntico e Ingeniero de Automatización de IA con más de 8 años de experiencia gestionando más de $100K en inversión directa de compra de medios, utilizando SQL avanzado y flujos automatizados con LLMs para impulsar la adquisición de clientes B2B en un pipeline comercial de más de $10M. Trayectoria comprobada creando más de 20 habilidades de IA en producción, conectando APIs en todo el ecosistema MarTech y redactando manuales de autoservicio.',
      skills: [
        {
          title: 'Flujos Agénticos e Ingeniería de IA',
          items: 'Automatización con LLMs | Herramientas de IA Empresarial | Ingeniería y Versionado de Prompts | Scripts en Python | Agentes Autónomos | Directrices de Marca',
        },
        {
          title: 'Adquisición Pagada y Compra de Medios',
          items: 'Meta Ads | Google Ads | Rastreo de Rendimiento de Campañas | Control de Presupuesto | Economía Unitaria (CAC, LTV)',
        },
        {
          title: 'Analítica y Optimización de Conversión',
          items: 'SQL y T-SQL | Databricks Lakehouse | Tableau | Looker | GA4 y PostHog | Optimización de Páginas de Destino (CRO)',
        },
        {
          title: 'Estrategia B2B y Arquitectura de Sistemas',
          items: 'Embudos SaaS | Generación de Demanda | Liderazgo de Equipos Multidisciplinarios | Análisis de ROI | APIs REST y Webhooks',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Comprador de Medios (Mercadeo Agéntico y Adquisición Pagada) — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Automatización con LLMs y Flujos de Trabajo: Desarrolló más de 20 habilidades y flujos de trabajo de IA automatizados usando plataformas empresariales de LLM para responder a consultas complejas y reducir los ciclos de reporte a menos de 4 horas.',
            'Compra de Medios y Presupuestos: Gestionó proyecciones financieras diarias y compra de medios en 5 verticales de consumo, optimizando más de $100K en inversión directa para aumentar tarifas unitarias de socios de $25 a $35.',
            'Rastreo de Rendimiento y Operaciones: Colaboró entre Ventas e Ingeniería para asegurar el 100% de precisión en los informes de datos en un equipo de 15 personas.',
            'Auditorías de Calidad y Cumplimiento: Auditó creativos generados por IA y más de 20 páginas de destino bajo estrictas pautas de cumplimiento, evaluando la calidad de la IA frente a KPIs de conversión.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Crecimiento y SEO (Analítica de Mercadeo y CRO, edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'SQL y Analítica de Datos: Consultó datos de interacción digital y tráfico web usando SQL avanzado y Python en Databricks para reconciliar la atribución multicanal en más de 40 millones de sesiones.',
            'Paneles de Rendimiento: Diseñó e implementó paneles automatizados en Tableau y Looker para visualizar conjuntos complejos de datos y aumentar la eficiencia de conversión en un 19% interanual.',
            'Optimización de Páginas de Destino: Colaboró con equipos de activación para gestionar hojas de ruta de CRO que lograron un aumento de 3x en conversiones en más de 1,250 páginas de destino.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Fundador y Director Técnico (Generación de Demanda B2B y Estrategia) — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Rendimiento del Embudo B2B: Diseñó paneles centralizados en Power BI y Looker para monitorear la adquisición B2B y gestionar un pipeline comercial de más de $10M.',
            'Asignación de Medios y Liderazgo: Dirigió un equipo de 15 personas para coordinar tácticas de mercadeo B2B y optimizar presupuestos en más de 150 cuentas comerciales generando más de $10M en ingresos de clientes.',
            'Análisis Predictivo de ROI: Desarrolló modelos estadísticos para predecir el comportamiento del mercado y desplegar flujos predictivos que redujeron el churn de cuentas B2B en un 83% (del 30% al 5%).',
          ],
        },
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Director Técnico (Operaciones y Liderazgo de Ecosistema) — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Gestión Estratégica de Proyectos: Coordinó operaciones de datos y rastreó hitos para desplegar más de 100 plataformas digitales generando más de $3 millones en fondos y ventas.',
            'Comunicación Técnica con Interesados: Asesoró a más de 80 startups sobre infraestructura de datos escalable en más de 50,000 transacciones comerciales.',
            'Capacitación del Ecosistema: Creó una comunidad de más de 2,000 desarrolladores, dictando más de 50 talleres técnicos para más de 5,000 participantes.',
          ],
        },
      ],
      proofPoints: [
        { metric: '20+', title: 'Habilidades de IA en Producción', sub: 'Money Group (Tiempo Completo, Claude Enterprise)', desc: 'Desarrolló más de 20 habilidades de IA y flujos agénticos en plataformas empresariales de LLM, reduciendo ciclos de reportes y creación de campañas a menos de 4 horas.' },
        { metric: '<4 Horas', title: 'Velocidad de Despliegue Rápido', sub: 'Ad-Tech y Operaciones Empresariales', desc: 'Automatizó la creación de campañas complejas con agentes personalizados en Claude Code y Antigravity, logrando una mejora del 40% en eficiencia general.' },
        { metric: '3x Aumento', title: 'Conversiones de Alta Intención con IA', sub: 'Red Ventures (Tiempo Completo, edX)', desc: 'Colaboró con Producto e Ingeniería para desplegar generadores de contenido y flujos CMS en más de 1,250 páginas de destino, logrando +200% en leads calificados.' },
        { metric: '50+', title: 'Talleres Técnicos de IA Realizados', sub: 'Link PR (Mi Empresa / Co-Fundador)', desc: 'Fundó una comunidad de más de 2,000 desarrolladores, impartiendo más de 50 talleres prácticos para más de 5,000 participantes y asesorando a más de 80 organizaciones.' }
      ]
    },

    revops_analytics: {
      id: 'revops_analytics',
      label: '📈 Medios y RevOps',
      shortTitle: 'Líder de Mercadeo de Rendimiento y RevOps',
      headline: 'Estratega de Mercadeo de Rendimiento, Comprador de Medios y Líder de RevOps',
      summary:
        'Analista de Datos, Estratega de Mercadeo de Rendimiento y Operador Técnico con más de 8 años de experiencia gestionando más de $100K en inversión directa en verticales competitivos. Trayectoria comprobada auditando atribución financiera en Databricks SQL, ejecutando integraciones de embudo profundo para asegurar el 100% de precisión contable y expandiendo mercados en un pipeline de más de $10M.',
      skills: [
        {
          title: 'Operaciones de Ingresos (RevOps) y Auditoría Financiera',
          items: 'Gestión de Presupuestos | Seguimiento de Rendimiento | Auditoría de Ingresos | Análisis de EPC y CVR | Procesos de Orden de Inserción (IO) | Metas de CPA/ROAS',
        },
        {
          title: 'Datos y Analítica de Embudo Profundo',
          items: 'SQL y T-SQL | Databricks Lakehouse | Tableau | Looker | Google Sheets Avanzado | Google Analytics 4 (GA4) | Precisión de Datos',
        },
        {
          title: 'Herramientas de IA y Automatización Ad-Tech',
          items: 'HeyMoney (Plataforma Interna de Analítica IA) | Creación de Prompts y Habilidades de IA | Herramientas de Automatización | APIs REST',
        },
        {
          title: 'Adquisición Pagada y Compra de Medios',
          items: 'Mercadeo de Afiliación | Optimización de Campañas | Meta Ads | Google Ads | Anuncios Nativos | Rastreo de Conversiones Multitoque',
        },
      ],
      experiences: [
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Comprador de Medios (Adquisición de Rendimiento y RevOps) — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Auditoría Financiera y Conciliación: Monitoreó métricas de ingresos (EPC, CVR) y concilió registros de comisiones mediante SQL avanzado, asegurando el 100% de precisión financiera en acuerdos de mercadeo de afiliación de alto volumen.',
            'Control de Presupuesto y Pacing: Gestionó proyecciones financieras y pacing de inversión en 5 verticales de consumo en Google Ads, Meta y redes nativas.',
            'Reportes Automatizados con IA: Diseñó flujos de trabajo en Claude para consolidar datos de múltiples redes publicitarias y generar reportes ejecutivos en minutos.',
            'Colaboración Interdepartamental: Coordinó entregas técnicas entre Ventas, Ingeniería y Finanzas para asegurar el cumplimiento estricto de SLAs.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Crecimiento y SEO (Analítica de Datos y Atribución, edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Modelos de Atribución en Databricks: Diseñó modelos de atribución multitoque analizando más de 40M de sesiones de usuarios en Databricks SQL y PySpark.',
            'Paneles Ejecutivos: Creó paneles de control en Tableau y Looker consumidos semanalmente por líderes ejecutivos para dirigir decisiones de inversión en mercadeo.',
            'Optimización de Conversión de Embudo: Identificó puntos de fricción en el embudo de registro, proponiendo pruebas A/B que mejoraron las tasas de verificación en un +38.1%.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Co-Fundador y VP de Mercadeo — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Estrategia de Pipeline Comercial: Diseñó y ejecutó estrategias de generación de demanda para más de 150 clientes corporativos, construyendo un pipeline de más de $10M.',
            'Modelos de Retención de Clientes: Implementó modelos predictivos en el CRM que redujeron la pérdida de clientes del 30% al 5% en un período de 12 meses.',
            'Dirección de Equipos Multidisciplinarios: Lideró a 15 especialistas en medios pagados, analítica, diseño y desarrollo bajo metodologías ágiles.',
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
            'Infraestructura para Proyectos de Alto Tráfico: Desplegó sistemas en la nube en Azure que soportaron a miles de usuarios simultáneos en eventos y plataformas educativas.',
            'Gestión de Subvenciones y Fondos: Aseguró y ejecutó más de $100K en fondos y donaciones para iniciativas tecnológicas en Puerto Rico.',
            'Desarrollo de Soluciones de Software: Supervisó la creación de más de 110 soluciones y bases de datos relacionales personalizadas.',
          ],
        },
      ],
      proofPoints: [
        { metric: '$100K+', title: 'Inversión Directa Gestionada', sub: 'Money Group (Tiempo Completo)', desc: 'Gestionó proyecciones financieras y optimización de medios en 5 verticales de consumo, mejorando los márgenes de ganancia.' },
        { metric: '100%', title: 'Precisión en Auditoría Financiera', sub: 'Conciliación de Comisiones', desc: 'Reconcilió datos de múltiples redes publicitarias y plataformas de afiliación con cero discrepancias contables en Databricks SQL.' },
        { metric: '$10M+', title: 'Pipeline Comercial de Demanda', sub: 'Viva Advertising (Mi Empresa)', desc: 'Generó más de 1,000 millones de impresiones y más de $10M en pipeline calificado para clientes B2B y B2C.' },
        { metric: '-83%', title: 'Reducción de Pérdida de Clientes', sub: 'Retención con CRM Predictivo', desc: 'Redujo el churn de clientes corporativos del 30% al 5% mediante análisis proactivo de puntos de contacto.' }
      ]
    },

    data_governance: {
      id: 'data_governance',
      label: '📊 Gobernanza de Datos',
      shortTitle: 'Líder de Ciencia de Decisiones y Analítica de Datos',
      headline: 'Líder de Analítica de Datos, Ciencia de Decisiones y Gobernanza de Telemetría',
      summary:
        'Líder técnico de analítica de datos con amplia trayectoria diseñando pipelines en Databricks, modelado dimensional en SQL y marcos de gobernanza de datos para plataformas de escala masiva (más de 40M de sesiones). Experto en conectar telemetría cruda con métricas financieras ejecutivas.',
      skills: [
        {
          title: 'Arquitectura y Pipelines de Datos',
          items: 'Databricks Lakehouse | SQL y T-SQL Avanzado | PySpark y Python | Azure Data Factory | Modelado Dimensional',
        },
        {
          title: 'Inteligencia de Negocios y Visualización',
          items: 'Tableau | Power BI | Looker | Modelado Semántico de Datos | Paneles Ejecutivos en Tiempo Real',
        },
        {
          title: 'Gobernanza y Calidad de Datos',
          items: 'Linaje de Datos | Monitoreo de Anomalías | Validación de Esquemas | Privacidad y Cumplimiento (GDPR/CCPA)',
        },
        {
          title: 'Analítica de Producto y Comportamiento',
          items: 'Google Analytics 4 | PostHog | Segment | Atribución Multicanal | Análisis de Cohortes y Retención',
        },
      ],
      experiences: [
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Datos y Gobernanza de Telemetría (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Procesamiento de Grandes Volúmenes de Datos: Consultó y normalizó más de 40 millones de sesiones de usuarios en Databricks SQL y Python para alimentar reportes de ingresos corporativos.',
            'Marcos de Calidad de Datos: Implementó reglas automatizadas de validación de datos para detectar anomalías en la telemetría antes de impactar los tableros ejecutivos.',
            'Integración de Fuentes Heterogéneas: Fusionó registros de servidores web, eventos de analítica y bases de datos transaccionales en esquemas analíticos consistentes.',
          ],
        },
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Operaciones de Datos y Ad-Tech — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Conciliación de Datos Publicitarios: Automatizó la extracción y limpieza de datos provenientes de múltiples redes de anuncios hacia almacenes centrales de datos.',
            'Desarrollo de Flujos con IA: Creó agentes analíticos en Claude que inspeccionan discrepancias en las tasas de conversión y generan diagnósticos automáticos.',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Co-Fundador y Director de Analítica — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Diseño de Almacenes de Datos para Clientes: Implementó soluciones centralizadas en Power BI y Looker para más de 150 empresas clientes.',
            'Modelado Predictivo de Salud de Cuentas: Desarrolló algoritmos de detección temprana de insatisfacción que redujeron el churn en un 83%.',
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
            'Arquitectura de Bases de Datos Relacionales: Diseñó e implementó más de 110 estructuras de bases de datos para plataformas corporativas e institucionales.',
            'Capacitación en Ciencia de Datos: Impartió conferencias y talleres sobre bases de datos y analítica a miles de estudiantes y profesionales.',
          ],
        },
      ],
      proofPoints: [
        { metric: '40M+', title: 'Sesiones Procesadas en Databricks', sub: 'Red Ventures (edX)', desc: 'Modeló y reconcilió más de 40M de registros de sesiones con PySpark y SQL.' },
        { metric: '100%', title: 'Integridad y Gobernanza de Datos', sub: 'Control de Calidad', desc: 'Estableció protocolos de auditoría de esquemas sin pérdida de eventos críticos.' },
        { metric: '110+', title: 'Bases de Datos Arquitectadas', sub: 'Link Puerto Rico', desc: 'Construyó más de 110 esquemas relacionales optimizados para alta concurrencia.' },
        { metric: '-83%', title: 'Reducción de Pérdida de Clientes', sub: 'Analítica Predictiva', desc: 'Mitigó la fuga de clientes mediante modelado estadístico en CRM.' }
      ]
    },

    tech_ops: {
      id: 'tech_ops',
      label: '⚙️ Operaciones Técnicas',
      shortTitle: 'Gerente de Operaciones Técnicas y Sistemas Web',
      headline: 'Gerente de Operaciones Técnicas, Infraestructura Web y Liderazgo de Sistemas',
      summary:
        'Ingeniero de Computadoras (Promedio 4.0, Graduado Summa Cum Laude) y Becario de Innovación en Stanford con 8+ años de experiencia dirigiendo operaciones técnicas, infraestructura en la nube, optimización de velocidad web (Core Web Vitals) y gestión ágil de proyectos de software.',
      skills: [
        {
          title: 'Operaciones Técnicas e Infraestructura',
          items: 'Cloud Computing (Azure, GCP) | Docker | CI/CD | Redes y DNS | Despliegues de Alta Disponibilidad | Active Directory',
        },
        {
          title: 'Ingeniería Web y Optimización CRO',
          items: 'JavaScript / TypeScript | HTML5 / CSS3 Moderno | WebGL / Three.js | Core Web Vitals | Arquitectura Jamstack',
        },
        {
          title: 'Metodologías Ágiles y Liderazgo Técnico',
          items: 'Scrum / Kanban | Jira y Asana | Gestión de Incidentes | Liderazgo de Equipos Multidisciplinarios | Bilingüe (Inglés/Español)',
        },
        {
          title: 'Hardware y Operaciones en Situaciones Críticas',
          items: 'Aprovisionamiento de Hardware en Crisis | Continuidad de Negocio | Protocolos de Seguridad y Respaldo',
        },
      ],
      experiences: [
        {
          company: 'Link Puerto Rico',
          employmentType: 'Mi Empresa / Co-Fundador',
          url: 'https://linkpuertorico.org/',
          urlDisplay: 'linkpuertorico.org',
          role: 'Co-Fundador y Director Técnico — Mi Empresa / Co-Fundador',
          period: 'Noviembre 2017 – Presente',
          bullets: [
            'Liderazgo de Infraestructura en la Nube: Arquitectó despliegues en Azure para plataformas de más de 3,800 usuarios concurrentes.',
            'Liderazgo de Ecosistema Tecnológico: Movilizó una red de más de 2,000 desarrolladores e impartió más de 50 talleres técnicos de vanguardia.',
            'Consultoría Tecnológica para Startups: Asesoró a más de 80 startups en arquitectura escalable y ciclo de desarrollo de software (SDLC).',
          ],
        },
        {
          company: 'Viva Advertising',
          employmentType: 'Mi Empresa / Fundador',
          url: 'https://viva-advertising.com/',
          urlDisplay: 'viva-advertising.com',
          role: 'Co-Fundador y Director de Tecnología — Mi Empresa / Fundador',
          period: 'Enero 2018 – Presente',
          bullets: [
            'Operaciones de Sistemas de Mercadeo: Lideró el equipo técnico responsable de la infraestructura de sitios web y analítica para más de 150 marcas.',
            'Aceleración de Procesos Ágiles: Diseñó flujos en Asana y Jira que aumentaron la productividad del equipo en un 40%.',
          ],
        },
        {
          company: 'Red Ventures',
          employmentType: 'Tiempo Completo',
          role: 'Analista de Operaciones Técnicas y SEO (edX) — Tiempo Completo',
          period: 'Agosto 2024 – Enero 2026',
          bullets: [
            'Rendimiento Web y CRO: Optimizó más de 1,250 páginas de destino logrando mejoras sustanciales en tiempos de carga y conversiones.',
            'Supervisión y Resolución de Incidencias: Lideró la respuesta técnica ante caídas de servicio y fallas de seguimiento en tiempo real.',
          ],
        },
        {
          company: 'Money Group',
          employmentType: 'Tiempo Completo',
          role: 'Comprador de Medios y Operaciones Técnicas — Tiempo Completo',
          period: 'Marzo 2026 – Octubre 2026',
          bullets: [
            'Automatización de Operaciones con Agentes: Diseñó soluciones de automatización basadas en agentes de IA que ahorraron cientos de horas operativas.',
            'Monitoreo Continuo de Sistemas: Garantizó la disponibilidad ininterrumpida de herramientas internas de ad-tech.',
          ],
        },
      ],
      proofPoints: [
        { metric: '4.0 GPA', title: 'Ingeniería en Computadoras', sub: 'Summa Cum Laude (UPRM)', desc: 'Graduado con los más altos honores académicos en la Universidad de Puerto Rico, Recinto de Mayagüez.' },
        { metric: 'UIF', title: 'Stanford Innovation Fellow', sub: 'Stanford University (d.school)', desc: 'Designado y capacitado como líder de cambio e innovación técnica por Stanford d.school.' },
        { metric: '110+', title: 'Soluciones Técnicas Desplegadas', sub: 'Sistemas en Producción', desc: 'Dirigió el diseño e implementación de más de 110 plataformas de software en producción.' },
        { metric: '4,000+', title: 'Vidas Impactadas en Puerto Rico', sub: 'Liderazgo en Ecosistema Tecnológico', desc: 'Impulsó el desarrollo tecnológico en la isla mediante capacitación, becas y conferencias de ingeniería.' }
      ]
    }
  },

  caseStudies: [
    {
      id: 'money-group-scale',
      company: 'Money Group',
      badge: 'Compra de Medios y Ad-Tech con IA',
      title: 'Automatización de Medios y Ad-Tech Agéntico con IA',
      summary:
        'Dirigió el desarrollo de herramientas propietarias de ad-tech y un generador web con IA para optimizar la compra de medios en una organización de más de 100 empleados. Implementó más de 20 flujos agénticos con Claude para análisis de KPIs y ajustes de campañas en tiempo real.',
      challenge:
        'La gestión manual de campañas en 5 verticales de consumo creaba cuellos de botella en la elaboración de reportes y dificultaba la optimización en tiempo real.',
      strategy:
        'Diseñar un sistema agéntico asistido por IA capaz de procesar telemetría de rendimiento y automatizar la generación de reportes y ajustes de puja.',
      execution:
        'Construcción de más de 20 habilidades de IA empresariales con Anthropic Claude conectadas a APIs de redes publicitarias y paneles internos.',
      impact:
        'Reducción de ciclos de reporte a menos de 4 horas, aumento de tarifas unitarias de socios de $25 a $35 y adopción en toda la organización.',
      metrics: {
        'Flujos de IA': '20+',
        'Tiempo de Reporte': '<4 Horas',
        'Inversión Optimizada': '$100K+',
        'Tarifa Unitaria': '$35 (+$10)'
      }
    },
    {
      id: 'red-ventures-edx',
      company: 'Red Ventures / edX',
      badge: 'Analítica de Escala en Databricks Lakehouse',
      title: 'Personalización de Contenido con IA y Analítica en Databricks Lakehouse',
      summary:
        'Lideró el despliegue estratégico de IA Generativa y reglas lógicas de personalización front-end, logrando un aumento del +200% en leads calificados y +38.1% en verificaciones de cursos en edX. Normalizó y analizó más de 40M de sesiones de usuarios en Databricks SQL.',
      challenge:
        'La telemetría de tráfico web masivo y disperso impedía atribuir con precisión el impacto del contenido educativo en las conversiones finales.',
      strategy:
        'Unificar pipelines de datos con Databricks Lakehouse e implementar motores de personalización asistidos por IA generativa en páginas de destino.',
      execution:
        'Consultas avanzadas en SQL y Python sobre más de 40M de sesiones, integrando paneles ejecutivos en Tableau y Looker consumidos por el equipo directivo.',
      impact:
        '+200% de aumento en leads generados por IA, +38.1% en verificaciones y mejora del 19% interanual en la eficiencia de conversión.',
      metrics: {
        'Aumento de Leads con IA': '+200%',
        'Verificaciones': '+38.1%',
        'Sesiones Analizadas': '40M+',
        'Eficiencia CRO': '+19% YoY'
      }
    },
    {
      id: 'viva-advertising',
      company: 'Viva Advertising',
      url: 'https://viva-advertising.com/',
      urlText: 'Visitar Viva Advertising en Vivo (viva-advertising.com) →',
      badge: 'Estrategia de Mercadeo de Rendimiento y GTM',
      title: 'Ecosistema de Crecimiento B2B y Pipeline Comercial de más de $10M',
      summary:
        'Diseñó estrategias de GTM basadas en datos para más de 150 marcas en Viva Advertising, generando más de 1,000 millones de impresiones y más de $10M en pipeline comercial comprobable. Redujo la pérdida de clientes en un 83% mediante CRM predictivo.',
      challenge:
        'Clientes de industrias exigentes (bienes raíces de lujo, salud y servicios B2B) requerían una atribución transparente de ingresos y retención proactiva.',
      strategy:
        'Implementar una infraestructura centralizada de medición en Power BI y Looker junto con un sistema predictivo de satisfacción en CRM.',
      execution:
        'Liderazgo de un equipo de 15 especialistas multidisciplinarios, coordinando sprints en Asana y Jira para entregar más de 150 proyectos con ROI medible.',
      impact:
        'Más de $10M generados en pipeline de clientes, 1B+ de impresiones y retención del 95% (-83% de churn).',
      metrics: {
        'Pipeline Generado': '$10M+',
        'Impresiones Totales': '1,000M+',
        'Supresión de Churn': '-83%',
        'Cuentas Corporativas': '150+'
      }
    },
    {
      id: 'link-puerto-rico',
      company: 'Link Puerto Rico',
      url: 'https://linkpuertorico.org/',
      urlText: 'Visitar Link Puerto Rico en Vivo (linkpuertorico.org) →',
      badge: 'Ingeniería de Software y Liderazgo de Ecosistema',
      title: 'Infraestructura en la Nube y Empoderamiento Tecnológico en Puerto Rico',
      summary:
        'Co-fundó y lideró técnicamente Link Puerto Rico, construyendo más de 110 soluciones de software y bases de datos personalizadas, impactando a más de 4,000 vidas y otorgando más de $100K en subvenciones para emprendedores tecnológicos.',
      challenge:
        'La comunidad tecnológica local necesitaba plataformas robustas y programas estructurados para formar talento técnico y asesorar a nuevas empresas.',
      strategy:
        'Construir infraestructura en la nube en Azure de alta concurrencia combinada con una comunidad de desarrolladores y programas de aceleración técnica.',
      execution:
        'Despliegue de arquitecturas en la nube soportando más de 3,800 usuarios concurrentes, organización de más de 30 cumbres técnicas y 50 talleres para 5,000+ participantes.',
      impact:
        'Más de 4,000 vidas impactadas, $100K+ en fondos otorgados, 110+ soluciones de software entregadas y más de $3M en transacciones comerciales facilitadas.',
      metrics: {
        'Vidas Impactadas': '4,000+',
        'Fondos Otorgados': '$100K+',
        'Soluciones Creadas': '110+',
        'Eventos y Cumbres': '30+'
      }
    }
  ],

  standaloneProjects: [
    {
      id: 'jobhelper',
      name: 'JobHelper: Agente Autónomo de Evaluación y Calificación con LLM',
      role: 'Creador e Ingeniero de Sistemas',
      organization: 'Innovación Independiente / Open Source',
      period: '2026',
      metrics: 'Rúbrica de 100 Puntos · Triaje Autónomo · LLM Multi-Modelo',
      githubUrl: 'https://github.com/eresfavolosx/JobHelper',
      subdomainUrl: 'https://jobhelper.novu.works?from=novuworks',
      mirrorUrl: 'https://jobhelper-c3cd7.web.app?from=novuworks',
      subdomainLabel: 'jobhelper.novu.works',
      summary:
        'Desarrolló un agente autónomo en Python utilizando razonamiento de LLMs multi-modelo (Claude / OpenAI) y rúbricas de evaluación técnica sobre descripciones de trabajo, automatizando el triaje de postulaciones con retroalimentación estructurada en JSON.',
      tags: ['Python', 'Agentes Autónomos', 'Rúbricas para LLMs', 'NLP', 'Next.js', 'Firebase']
    },
    {
      id: 'bizpay',
      name: 'BizPay: Pasarela y Facturación Comercial B2B',
      role: 'Ingeniero Frontend Líder y Arquitecto de Sistemas',
      organization: 'Fintech / Comercio Digital',
      period: '2024 – 2025',
      metrics: 'Checkout Instantáneo · APIs ATH Móvil y Tarjetas · Cero Deslizamiento',
      githubUrl: 'https://github.com/eresfavolosx/BizPay',
      subdomainUrl: 'https://bizpay.novu.works?from=novuworks',
      mirrorUrl: 'https://bizpay-novuworks.web.app?from=novuworks',
      subdomainLabel: 'bizpay.novu.works',
      summary:
        'Arquitectó un portal de pagos comerciales B2B de alta conversión con enrutamiento de facturas multinivel, integración de ATH Móvil Business, cálculo de comisiones en tiempo real e interfaz móvil Material UI.',
      tags: ['JavaScript', 'Fintech', 'ATH Móvil', 'Material Design', 'Facturación B2B']
    },
    {
      id: 'picta',
      name: 'Picta: Motor y Cámara de Asistencia para Daltonismo (CVD)',
      role: 'Ingeniero Líder de Accesibilidad y Arquitecto de Visión Computarizada',
      organization: 'Tecnología Asistiva / Accesibilidad',
      period: '2024 – 2025',
      metrics: 'Daltonización en Tiempo Real · 6 Modos CVD · Cuentagotas de Color',
      githubUrl: 'https://github.com/eresfavolosx/Picta',
      subdomainUrl: 'https://picta.novu.works?from=novuworks',
      mirrorUrl: 'https://picta-novuworks.web.app?from=novuworks',
      subdomainLabel: 'picta.novu.works',
      summary:
        'Diseñó y construyó una aplicación de visión computarizada asistiva para personas con deficiencia en la percepción del color (CVD). Incorpora procesamiento de video WebRTC en vivo con matrices matemáticas de Daltonización (Protanopía, Deuteranopía, Tritanopía), realce de bordes de alto contraste, simulación para usuarios con visión estándar y clasificador interactivo de color por píxel con síntesis de voz.',
      tags: ['Visión Computarizada', 'WebRTC', 'Daltonización', 'Accesibilidad (A11y)', 'Ciencia del Color', 'Canvas API']
    },
    {
      id: 'nfc-platform',
      name: 'Plataforma Digital de Eventos y Verificación NFC',
      role: 'Ingeniero Móvil Full-Stack',
      organization: 'Link Puerto Rico',
      period: '2025',
      metrics: 'Multiplataforma · Firebase · Suite de QA Automatizada en Python',
      githubUrl: 'https://github.com/eresfavolosx/NFC',
      subdomainUrl: 'https://nfc.novu.works?from=novuworks',
      mirrorUrl: 'https://nfc-novuworks.web.app?from=novuworks',
      subdomainLabel: 'nfc.novu.works',
      summary:
        'Desarrolló una aplicación multiplataforma para registro y verificación de eventos utilizando Capacitor, Firebase y Vite. Creó una suite de pruebas automatizadas en Python para verificar enrutamiento de UI, persistencia de estado y reportes de salud del sistema.',
      tags: ['Capacitor', 'Firebase', 'Vite', 'Suite de Pruebas en Python', 'App Móvil']
    },
    {
      id: 'hackeaporunacausa',
      name: 'Hackea por una Causa: Red de Mentoría Comunitaria y Calendario Juvenil',
      role: 'Desarrollador Líder y Co-Fundador',
      organization: 'Boys & Girls Clubs / Ganador de Hackathon',
      period: '2017 – Presente',
      metrics: 'Ganador de Hackathon de Impacto Social · 120+ Horas de Mentoría · 6 Centros Aliados',
      githubUrl: 'https://github.com/eresfavolosx/hackeaporunacausa',
      subdomainUrl: 'https://hackea.novu.works?from=novuworks',
      mirrorUrl: 'https://hackea-novuworks.web.app?from=novuworks',
      subdomainLabel: 'hackea.novu.works',
      summary:
        'Concebido y creado durante el hackathon Hackea por una Causa: una red de calendarización y reclutamiento de mentores voluntarios conectando a jóvenes en riesgo con profesionales a través de Boys & Girls Clubs y centros comunitarios en Puerto Rico.',
      tags: ['React', 'Node.js', 'Impacto Social', 'Mentoría Comunitaria', 'Motor de Citas']
    },
    {
      id: 'liza-project',
      name: 'El Proyecto Liza: Adquisición de TI en Crisis y Bibliotecas Digitales',
      role: 'Director de Proyecto y Arquitecto Líder de Sistemas',
      organization: 'Link Puerto Rico · Apoyo en Crisis',
      period: '2020 – 2023',
      metrics: '100+ PCs · 50+ Tabletas · 3 Centros Comunitarios · 1,000+ Residentes',
      githubUrl: 'https://github.com/eresfavolosx/TokenFund',
      subdomainUrl: 'https://linkpuertorico.org',
      mirrorUrl: 'https://linkpuertorico.org',
      subdomainLabel: 'linkpuertorico.org',
      summary:
        'Durante la crisis global de suministros y cierres escolares, adquirió internacionalmente más de 100 computadoras y 50 tabletas en menos de 30 días. Negoció conectividad satelital para comunidades rurales desconectadas, desplegó software MDM personalizado, configuró firewalls y brindó 3 años de soporte técnico diario para transformar 3 centros comunitarios en bibliotecas digitales seguras.',
      tags: ['Adquisición en Crisis', 'Despliegue MDM', 'Seguridad de Redes', 'Firewalls', 'Aprovisionamiento de Hardware']
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
      badge: 'Analista BI',
    },
    {
      name: 'Estrategia Basada en Datos: Planificación, Reportes y Control con Power BI para Salud e Industrias Reguladas',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'Analítica de Salud',
    },
    {
      name: 'Implementación Avanzada de Herramientas de Análisis de Datos con Power BI',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'BI Avanzado',
    },
    {
      name: 'CompTIA IT Fundamentals+ (ITF+) Certified',
      issuer: 'CompTIA',
      badge: 'Sistemas TI',
    },
    {
      name: 'Lean Six Sigma White Belt',
      issuer: 'Management & Strategy Institute / UPPR',
      badge: 'Calidad de Procesos',
    },
    {
      name: 'Herramientas y Técnicas de Gestión de Proyectos en la Práctica',
      issuer: 'Universidad Politécnica de Puerto Rico',
      badge: 'Agile y PMP',
    },
    {
      name: 'Administración de Fondos Federales',
      issuer: 'Universidad de Puerto Rico (UPR)',
      badge: 'Cumplimiento Federal',
    },
    {
      name: 'Programa University Innovation Fellows (Pensamiento de Diseño y Estrategia Empresarial)',
      issuer: 'Stanford University',
      badge: 'Becario Stanford',
    },
  ],

  awards: [
    {
      title: 'Ganador Premio Red Ventures "Most Likely to say Awesome"',
      year: '2025',
      organization: 'Red Ventures / edX',
      description: 'Reconocimiento otorgado por extraordinario entusiasmo multidisciplinario, excelencia técnica e impacto transversal en el catálogo de edX.',
    },
    {
      title: '1er Lugar: Hackatón Include-a-thon por Microsoft',
      year: '2016',
      organization: 'Microsoft',
      description: 'Primer lugar entre decenas de equipos de ingeniería por el diseño de software accesible e inclusivo con tecnología de asistencia.',
    },
    {
      title: '3er Lugar: American Society for Engineering Education (ASEE)',
      year: '2017',
      organization: 'Conferencia ASEE Zona 2',
      description: 'Reconocido por innovar en el currículo de ingeniería y la enseñanza técnica.',
    },
    {
      title: 'Mentor de Negocios y Emprendimiento',
      year: 'Continuo',
      organization: 'Grupo Guayacán',
      description: 'Mentoría a emprendedores y fundadores en arquitectura tecnológica, economía unitaria y escalamiento comercial go-to-market.',
    },
    {
      title: 'Juez Global',
      year: 'Continuo',
      organization: 'Enactus',
      description: 'Evaluación de innovaciones universitarias de impacto social y modelos sostenibles de negocio a nivel internacional.',
    },
    {
      title: 'Representante de Comunidad en San Juan',
      year: 'Continuo',
      organization: 'Facebook / Meta Developer Circles',
      description: 'Representó a la comunidad de desarrolladores en San Juan, organizando talleres técnicos y conectando talento local con herramientas globales.',
    },
  ],

  coreCompetencyMatrix: [
    {
      category: 'Mercadeo de Rendimiento y RevOps',
      skills: [
        'Compra de Medios en Meta y Google Ads',
        'Modelos de Atribución y Conversions API (CAPI)',
        'Optimización de Tasas de Conversión (CRO)',
        'Monitoreo Financiero de CPA, CVR y ROAS',
        'Modelado Predictivo de Salud de Cuentas en CRM'
      ]
    },
    {
      category: 'Ingeniería de IA y Automatización',
      skills: [
        'Despliegue de Agentes con Anthropic Claude',
        'Ingeniería de Prompts y Versionado de Habilidades',
        'Automatización con OpenAI Codex y Gemini',
        'Evaluación de Calidad y Guardrails de Marca',
        'Pipelines de Generación de Contenido con IA'
      ]
    },
    {
      category: 'Analítica de Datos y Plataformas BI',
      skills: [
        'Databricks Lakehouse (PySpark y SQL)',
        'Modelado Dimensional y Limpieza de Telemetría',
        'Creación de Paneles en Power BI y Tableau',
        'Google Analytics 4 (GA4) y Segment',
        'Detección Automatizada de Anomalías en Datos'
      ]
    },
    {
      category: 'Ingeniería de Software y Sistemas',
      skills: [
        'B.S. en Ingeniería de Computadoras (Promedio 4.0)',
        'Cloud Computing (Microsoft Azure y GCP)',
        'Desarrollo Frontend Moderno y WebGL (Three.js)',
        'Gestión Ágil de Proyectos (Scrum / Jira / Asana)',
        'Bilingüe Completo (Español Nativo / Inglés Fluido)'
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
    nav_overview: 'Overview',
    nav_cases: 'Case Studies',
    nav_projects: 'Live Projects',
    nav_ai_lab: 'Live Projects',
    nav_planner: 'ROI Model',
    nav_dossier: 'Dossier',
    nav_intel: 'Intel Feed',
    dock_nav_projects: 'Projects',
    dock_nav_ai: 'Projects',

    // Header controls
    tailor_tag: 'Tailor',
    tools_label: 'Tools',
    status_available: 'Available',
    pr_roots_label: 'San Juan, PR',
    spatial_gyro_label: 'Spatial Gyro',
    visualizer_label: 'View 3D',
    theme_label: 'Theme',
    tesla_label: 'Tesla HUD',
    lang_btn_title: 'Switch language / Cambiar idioma (EN / ES)',

    // Hero Kicker
    hero_kicker_lead: 'THE RARE HYBRID · DESIGN × MARKETING × ENGINEERING',
    hero_kicker_companies: 'MONEY GROUP · RED VENTURES',
    hero_kicker_degree: 'COMPUTER ENGINEERING (4.0 GPA)',
    hero_kicker_fellow: 'STANFORD INNOVATION FELLOW',
    hero_kicker_auth: '🇺🇸 US CITIZEN (NO SPONSORSHIP REQUIRED)',
    hero_kicker_pr: 'SAN JUAN, PUERTO RICO',

    // The Hybrid Trifecta Banner
    hybrid_badge_title: 'BEYOND CODE · THE TRIFECTA OF MASTERY',
    hybrid_badge_subtitle: 'A software engineer with exceptional design taste and multi-million dollar marketing instincts.',
    pill_trifecta: '✨ The Unified Hybrid',
    pill_design: '🎨 Product & Experience Design',
    pill_marketing: '📈 Growth & Performance Marketing',
    pill_engineering: '⚡ Computer Engineering (4.0 GPA)',

    // Hero Title & Lead
    hero_title: 'Quantitative Growth.<br /><span class="editorial-serif">Crafted by Engineering & Design.</span>',
    hero_lead: 'Operating at the intersection of <strong>Growth Marketing, Human-Centered Product Design, and Computer Engineering (4.0 GPA)</strong> to bridge ad-tech infrastructure, AI automation, and high-ROI media buying across a <strong>$10M+ commercial pipeline</strong>. Engineered 20+ automated agentic workflows and proprietary ad-tech at <strong>Money Group (Full-Time)</strong>, led Generative AI personalization and 40M+ session analytics at <strong>Red Ventures (Full-Time, edX)</strong>, and directed 360° digital campaigns generating $10M+ across 150+ client accounts through his companies <strong>Viva Advertising (My Company / Founder)</strong>, <strong>Link Puerto Rico (My Company / Co-Founder)</strong>, and <strong>Novu Works (Technical Consultant)</strong>.',

    // Hero Buttons
    btn_recruiter: '60s Recruiter Brief',
    btn_cases: 'View Case Studies',
    btn_projects: 'Shipped Projects & Subdomains',
    btn_ai_lab: 'Shipped Projects & Subdomains',
    btn_resume_card: 'View Executive Resume Card',
    btn_intel: 'Live Intel & Radar',
    btn_view_bg: 'View 3D Background',
    btn_3d_atelier: '3D Atelier (Secondary Screen)',
    btn_replay_intro: '🎬 Replay Intro & Sign-Off',
    intro_enter_btn: 'ENTER EXPERIENCE',
    intro_shortcut_hint: 'Press <kbd class="intro-kbd">ENTER</kbd> or click anywhere to explore',
    sig_verified_stamp: 'Verified Sign-Off',
    sig_replay_btn: 'Replay Signature',
    btn_lets_chat: "Let's Chat",

    // Shipped Systems & Subdomains Showcase
    projects_kicker: 'VERIFIED PRODUCTION CODEBASES & CLOUD DEPLOYMENTS',
    projects_title: 'Shipped Systems & Live Subdomains',
    projects_sub: 'Production-deployed systems engineered and architected by Fabián—running live on *.novu.works with direct open-source GitHub repositories.',
    featured_subdomains_kicker: 'ENGINEERED & DEPLOYED IN PRODUCTION',
    featured_subdomains_title: 'Shipped Systems on Live Subdomains',
    featured_subdomains_sub: 'Live production applications engineered by Fabián, deployed to novu.works subdomains with direct GitHub source code.',
    view_all_projects_btn: 'Explore All Shipped Systems',

    // Executive Chat & Communications Suite (WhatsApp + Direct Email)
    chat_header_badge: 'Verified Founder & Lead',
    chat_status_online: '🟢 WhatsApp Direct · Usually replies in minutes',
    chat_status_email: '✉️ Direct Executive Email · Response within 2 hours',
    chat_tab_wa_title: 'WhatsApp Live Chat',
    chat_tab_wa_sla: 'Instant',
    chat_tab_wa_sub: 'Direct mobile · Replies in minutes',
    chat_tab_email_title: 'Executive Direct Email',
    chat_tab_email_sla: '< 2h SLA',
    chat_tab_email_sub: 'Priority executive inbox',
    chat_starters_title: 'CHOOSE A CONVERSATION TOPIC (OPENS WHATSAPP DIRECTLY):',
    chat_custom_title: 'OR TYPE A CUSTOM MESSAGE:',
    chat_btn_send_wa: 'Open in WhatsApp',
    chat_nudge_to_email_text: 'Prefer formal written correspondence?',
    chat_nudge_to_email_btn: 'Switch to Direct Email →',
    chat_email_card_label: 'OFFICIAL EXECUTIVE INBOX',
    chat_email_verified_tag: '✓ Verified',
    chat_email_response_sla: '⚡ Typical executive response within 2 hours',
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
    chat_alt_title: 'OTHER DIRECT EXECUTIVE CHANNELS:',
    chat_floating_title: 'Chat with Fabián',
    chat_floating_sub: 'WhatsApp & Email',

    // Metrics Ribbon
    metric_1_label: 'Automated AI Workflows',
    metric_1_detail: 'Money Group (Full-Time)',
    metric_2_label: 'AI-Driven Lead Lift',
    metric_2_detail: 'Red Ventures (Full-Time, edX)',
    metric_3_label: 'Realized B2B Pipeline',
    metric_3_detail: 'Viva Advertising (My Company)',
    metric_4_label: 'Client Churn Suppression',
    metric_4_detail: 'Reduced Churn from 30% to 5%',
    metric_5_label: 'Sessions Analyzed',
    metric_5_detail: 'Product & Growth Analytics (edX)',

    // Sculpture Dock
    dock_caption: '3D Art Direction:',
    dock_btn_0: '01 · Novu Works Monogram',
    dock_btn_1: '02 · Möbius Growth Curve',
    dock_btn_2: '03 · Geometric AI Prism',
    dock_btn_view: '✨ View 3D Background',
    dock_btn_arcade: '✨ 3D Perspective',

    // Case Studies View
    catalog_kicker: 'VERIFIED MILESTONES & ARCHITECTURE',
    catalog_title: 'Business Engineering Case Studies',
    catalog_sub: 'Not static ad creatives—quantitative systems engineered to suppress CAC, accelerate iteration velocity, and scale revenue predictably.',

    // Dossier View
    dossier_auth_pill: 'US Citizen (No Sponsorship Needed)',
    dossier_download_pdf: 'Download Official PDF',
    dossier_heritage_text: 'Puerto Rico Heritage · San Juan · 18.4655° N, 66.1057° W',
    dossier_chime_hint: '(Chime Coquí)',
    role_lens_bar_label: 'EXPLORE CANDIDATE BY TARGET ROLE LENS:',
    role_lens_master: '🚀 Master Brief',
    role_lens_ai: '🤖 AI & Engineering',
    role_lens_revops: '📈 Media & RevOps',
    role_lens_data: '📊 Data Governance',
    role_lens_tech: '⚙️ Tech Ops & Systems',
    section_exp_heading: 'Verified Professional Experience',
    section_proj_heading: 'Verified Signature Engineering & Crisis Impact Projects',
    section_github_heading: 'Live GitHub Codebase Radar & Open Source Telemetry',
    section_github_sub: 'Live REST sync via GitHub API (<code>@eresfavolosx</code>) · Real-time repository tracking, commit activity & open-source code.',
    section_edu_heading: 'Education & Accredited Certifications',
    section_awards_heading: 'Honors, Awards & Civic Leadership',
    section_matrix_heading: 'Core Competency Matrix',
    btn_export_resume: 'Export Executive Resume & Composite Card',
    btn_schedule_chat: 'Schedule a Strategy Chat',
    colophon_tag: 'HECHO CON ORGULLO EN PUERTO RICO 🇵🇷',
    colophon_desc: 'Engineered in San Juan, Puerto Rico · Scaling global AI, RevOps analytics & software systems from Puerto Rico to the world.',

    // Recruiter Modal
    rec_kicker: 'EXECUTIVE ATS FAST-TRACK',
    rec_heading: '60-Second Recruiter Brief & Scorecard',
    rec_btn_download: 'Download PDF Resume',
    rec_btn_copy: 'Copy ATS Notes',
    rec_target_prefix: 'Target:',
    rec_workauth: '<strong>US Citizen (Born in Puerto Rico)</strong> · No Visa Sponsorship Required · Available Immediately for US Remote',
    rec_verdict: 'TOP 1% CANDIDATE',
    rec_grade: 'Verified Impact',
    rec_checklist_title: 'Recruiter Core Competency Alignment',
    rec_check_1: '<strong>Full-Funnel Ad Spend Management:</strong> Multi-million dollar annual pacing across Google, Meta, LinkedIn, and programmatic display.',
    rec_check_2: '<strong>Data Layer & Server-Side Tracking:</strong> Conversions API (CAPI), Google Tag Manager Server-Side, Databricks SQL, PySpark pipelines.',
    rec_check_3: '<strong>Applied AI & Prompt Frameworks:</strong> Automated creative iteration, 20+ copy variants, automated telemetry anomaly agents in <4 hours.',
    rec_check_4: '<strong>Crisis Procurement & Operations:</strong> Sourced 100+ computers and 50+ tablets in <30 days; managed Active Directory and Mac/PC provisioning for 15-person office.',
    rec_check_5: '<strong>Cross-Functional Leadership:</strong> Bridges Marketing with Software Engineering, BI/Analytics, Sales, and Product teams.',
    rec_btn_view_full: 'View Full Executive Resume & Composite Card',
    rec_btn_email: 'Email Candidate Directly',
    rec_btn_call: 'Call +1 (347) 815-8054',

    // Resume Modal
    res_kicker: 'EXECUTIVE COMPOSITE CARD',
    res_heading: 'Executive Resume Brief',
    res_btn_download: 'Download PDF',
    res_btn_print: 'Print / Save Clean PDF',
    res_btn_copy: 'Copy Text',
    res_sec_summary: 'SUMMARY',
    res_sec_skills: 'SKILLS',
    res_sec_exp: 'PROFESSIONAL EXPERIENCE',
    res_sec_proj: 'PROJECTS',
    res_sec_edu: 'EDUCATION & CERTIFICATIONS',
    res_sec_awards: 'HONORS, AWARDS & CIVIC LEADERSHIP',
    res_cta_badge: "LET'S CONNECT & COLLABORATE",
    res_cta_heading: "Ready to scale high-impact systems? Let's chat.",
    res_cta_desc: 'Operating at the convergence of quantitative growth, revenue operations analytics, and AI automation. Open to select growth leadership, RevOps advisory, and high-impact engineering roles.',
    res_cta_btn_chat: 'Schedule a Strategy Chat',
    res_cta_btn_linkedin: 'Connect on LinkedIn',

    // Visitor Area-of-Interest Concierge Survey Modal
    survey_kicker: 'EXECUTIVE CONCIERGE · TAILORED EXPERIENCE',
    survey_step: '1-Click Personalization',
    survey_title: "How would you like to explore Fabián's work?",
    survey_desc: 'Select your primary area of focus to dynamically reconfigure verified metrics, case studies, and engineering blueprints to your role:',
    survey_opt_1_title: 'Growth & Performance Marketing',
    survey_opt_1_badge: 'Media & Performance',
    survey_opt_1_desc: 'Multi-channel media buying, Server-Side CAPI, +200% AI lead lift, $10M+ commercial pipeline.',
    survey_opt_2_title: 'Applied AI & Agentic Workflows',
    survey_opt_2_badge: 'AI Systems',
    survey_opt_2_desc: '20+ automated Claude agent workflows, LLM prompt engineering, autonomous ops triage & synthetic content.',
    survey_opt_3_title: 'Big Data & Revenue Operations',
    survey_opt_3_badge: 'Analytics & BI',
    survey_opt_3_desc: '40M+ Databricks sessions, PySpark & SQL data pipelines, Microsoft Power BI, Azure/GCP infrastructure.',
    survey_opt_4_title: 'Product Design & UX Systems',
    survey_opt_4_badge: 'Design & UX',
    survey_opt_4_desc: 'Human-centered design systems, conversion architecture, responsive mobile-first UX, luxury typography, and high-converting customer journeys.',
    survey_btn_skip: 'Skip · Explore All-Round Profile',

    // Mobile Dock
    dock_nav_overview: 'Overview',
    dock_nav_cases: 'Cases',
    dock_nav_ai: 'AI Studio',
    dock_nav_roi: 'ROI Model',
    dock_nav_dossier: 'Dossier',
    dock_nav_intel: 'Intel',

    // Toasts
    toast_lang_switched: 'Language switched to English (Default)',
  },

  es: {
    // Nav tabs
    nav_overview: 'Resumen',
    nav_cases: 'Casos de Estudio',
    nav_projects: 'Proyectos en Vivo',
    nav_ai_lab: 'Proyectos en Vivo',
    nav_planner: 'Modelo ROI',
    nav_dossier: 'Expediente',
    nav_intel: 'Noticias y Radar',
    dock_nav_projects: 'Proyectos',
    dock_nav_ai: 'Proyectos',

    // Header controls
    tailor_tag: 'Personalizar',
    tools_label: 'Herramientas',
    status_available: 'Disponible',
    pr_roots_label: 'San Juan, PR',
    spatial_gyro_label: 'Giroscopio',
    visualizer_label: 'Ver 3D',
    theme_label: 'Tema',
    tesla_label: 'HUD Tesla',
    lang_btn_title: 'Cambiar idioma / Switch language (ES / EN)',

    // Hero Kicker
    hero_kicker_lead: 'HÍBRIDO EXCEPCIONAL · DISEÑO × MERCADEO × INGENIERÍA',
    hero_kicker_companies: 'MONEY GROUP · RED VENTURES',
    hero_kicker_degree: 'INGENIERÍA EN COMPUTADORAS (4.0 GPA)',
    hero_kicker_fellow: 'BECARIO STANFORD INNOVATION',
    hero_kicker_auth: '🇺🇸 CIUDADANO EE.UU. (NO REQUIERE PATROCINIO)',
    hero_kicker_pr: 'SAN JUAN, PUERTO RICO',

    // The Hybrid Trifecta Banner
    hybrid_badge_title: 'MÁS ALLÁ DEL CÓDIGO · LA TRIFECTA DE MAESTRÍA',
    hybrid_badge_subtitle: 'Un ingeniero de software con excepcional gusto por el diseño e instinto de mercadeo multimillonario.',
    pill_trifecta: '✨ El Híbrido Unificado',
    pill_design: '🎨 Diseño de Producto y Experiencia',
    pill_marketing: '📈 Mercadeo de Crecimiento y Rendimiento',
    pill_engineering: '⚡ Ingeniería de Computadoras (4.0 GPA)',

    // Hero Title & Lead
    hero_title: 'Crecimiento Cuantitativo.<br /><span class="editorial-serif">Forjado con Diseño e Ingeniería.</span>',
    hero_lead: 'Operando en la intersección de <strong>Mercadeo de Crecimiento, Diseño de Producto Centrado en el Usuario e Ingeniería de Computadoras (4.0 GPA)</strong> para conectar infraestructura ad-tech, automatización con IA y compra de medios de alto ROI a través de un pipeline comercial de más de <strong>$10M</strong>. Desarrolló más de 20 flujos agénticos automatizados y tecnología publicitaria en <strong>Money Group (Tiempo Completo)</strong>, lideró la personalización con IA generativa y analítica de más de 40M de sesiones en <strong>Red Ventures (Tiempo Completo, edX)</strong>, y dirigió campañas digitales de 360° generando más de $10M en más de 150 cuentas de clientes a través de sus empresas <strong>Viva Advertising (Mi Empresa / Fundador)</strong>, <strong>Link Puerto Rico (Mi Empresa / Co-Fundador)</strong> y <strong>Novu Works (Consultor Técnico)</strong>.',

    // Hero Buttons
    btn_recruiter: 'Resumen de Reclutador (60s)',
    btn_cases: 'Ver Casos de Estudio',
    btn_projects: 'Proyectos y Subdominios',
    btn_ai_lab: 'Proyectos y Subdominios',
    btn_resume_card: 'Ver Hoja de Vida Ejecutiva',
    btn_intel: 'Noticias y Radar en Vivo',
    btn_view_bg: 'Ver Fondo 3D',
    btn_3d_atelier: 'Taller 3D (Pantalla Secundaria)',
    btn_replay_intro: '🎬 Reproducir Intro y Firma',
    intro_enter_btn: 'INGRESAR A LA EXPERIENCIA',
    intro_shortcut_hint: 'Presiona <kbd class="intro-kbd">ENTER</kbd> o haz clic en cualquier lugar para explorar',
    sig_verified_stamp: 'Firma Verificada',
    sig_replay_btn: 'Repetir Firma',
    btn_lets_chat: 'Hablemos',

    // Shipped Systems & Subdomains Showcase
    projects_kicker: 'SISTEMAS EN PRODUCCIÓN Y ARQUITECTURA CLOUD',
    projects_title: 'Sistemas Desplegados y Subdominios en Vivo',
    projects_sub: 'Aplicaciones en producción y código abierto desarrollados por Fabián—desplegados en *.novu.works con repositorios directos en GitHub.',
    featured_subdomains_kicker: 'INGENIERÍA Y PRODUCCIÓN',
    featured_subdomains_title: 'Sistemas en Vivo en Subdominios',
    featured_subdomains_sub: 'Aplicaciones web en producción desplegadas en subdominios de novu.works con repositorios directos en GitHub.',
    view_all_projects_btn: 'Explorar Todos los Sistemas',

    // Executive Chat & Communications Suite (WhatsApp + Direct Email)
    chat_header_badge: 'Fundador y Líder Verificado',
    chat_status_online: '🟢 WhatsApp Directo · Suele responder en minutos',
    chat_status_email: '✉️ Correo Ejecutivo Directo · Respuesta en menos de 2 horas',
    chat_tab_wa_title: 'Chat en Vivo de WhatsApp',
    chat_tab_wa_sla: 'Instantáneo',
    chat_tab_wa_sub: 'Móvil directo · Responde en minutos',
    chat_tab_email_title: 'Correo Ejecutivo Directo',
    chat_tab_email_sla: '< 2h SLA',
    chat_tab_email_sub: 'Bandeja ejecutiva prioritaria',
    chat_starters_title: 'ELIGE UN TEMA DE CONVERSACIÓN (ABRE WHATSAPP DIRECTO):',
    chat_custom_title: 'O ESCRIBE UN MENSAJE PERSONALIZADO:',
    chat_btn_send_wa: 'Abrir en WhatsApp',
    chat_nudge_to_email_text: '¿Prefieres correspondencia formal por escrito?',
    chat_nudge_to_email_btn: 'Cambiar a Correo Directo →',
    chat_email_card_label: 'BANDEJA EJECUTIVA OFICIAL',
    chat_email_verified_tag: '✓ Verificado',
    chat_email_response_sla: '⚡ Respuesta ejecutiva típica en menos de 2 horas',
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
    chat_alt_title: 'OTROS CANALES EJECUTIVOS DIRECTOS:',
    chat_floating_title: 'Chatea con Fabián',
    chat_floating_sub: 'WhatsApp y Correo',

    // Metrics Ribbon
    metric_1_label: 'Flujos de IA Automatizados',
    metric_1_detail: 'Money Group (Tiempo Completo)',
    metric_2_label: 'Aumento de Leads con IA',
    metric_2_detail: 'Red Ventures (Tiempo Completo, edX)',
    metric_3_label: 'Pipeline B2B Generado',
    metric_3_detail: 'Viva Advertising (Mi Empresa)',
    metric_4_label: 'Supresión de Pérdida de Clientes',
    metric_4_detail: 'Reducción de churn del 30% al 5%',
    metric_5_label: 'Sesiones Analizadas',
    metric_5_detail: 'Analítica de Producto y Crecimiento (edX)',

    // Sculpture Dock
    dock_caption: 'Dirección de Arte 3D:',
    dock_btn_0: '01 · Monograma Novu Works',
    dock_btn_1: '02 · Curva de Crecimiento Möbius',
    dock_btn_2: '03 · Prisma Geométrico IA',
    dock_btn_view: '✨ Ver Fondo 3D',
    dock_btn_arcade: '✨ Perspectiva 3D',

    // Case Studies View
    catalog_kicker: 'HITOS Y ARQUITECTURA VERIFICADA',
    catalog_title: 'Casos de Estudio de Ingeniería Comercial',
    catalog_sub: 'No creativos publicitarios estáticos: sistemas cuantitativos diseñados para suprimir el CAC, acelerar la velocidad de iteración y escalar ingresos de manera predecible.',

    // Dossier View
    dossier_auth_pill: 'Ciudadano EE.UU. (No Requiere Patrocinio)',
    dossier_download_pdf: 'Descargar PDF Oficial',
    dossier_heritage_text: 'Herencia Puertorriqueña · San Juan · 18.4655° N, 66.1057° W',
    dossier_chime_hint: '(Cantar Coquí)',
    role_lens_bar_label: 'EXPLORAR CANDIDATO POR ENFOQUE DE ROL:',
    role_lens_master: '🚀 Resumen Maestro',
    role_lens_ai: '🤖 IA e Ingeniería',
    role_lens_revops: '📈 Medios y RevOps',
    role_lens_data: '📊 Gobernanza de Datos',
    role_lens_tech: '⚙️ Operaciones Técnicas',
    section_exp_heading: 'Experiencia Profesional Verificada',
    section_proj_heading: 'Proyectos Emblemáticos de Ingeniería e Impacto en Crisis',
    section_github_heading: 'Radar de Código en Vivo y Telemetría de Código Abierto',
    section_github_sub: 'Sincronización REST vía API de GitHub (<code>@eresfavolosx</code>) · Rastreo de repositorios en tiempo real, actividad de commits y código abierto.',
    section_edu_heading: 'Educación y Certificaciones Acreditadas',
    section_awards_heading: 'Honores, Premios y Liderazgo Cívico',
    section_matrix_heading: 'Matriz de Competencias Fundamentales',
    btn_export_resume: 'Exportar Hoja de Vida Ejecutiva y Tarjeta Compuesta',
    btn_schedule_chat: 'Agendar Charla Estratégica',
    colophon_tag: 'HECHO CON ORGULLO EN PUERTO RICO 🇵🇷',
    colophon_desc: 'Ingeniado en San Juan, Puerto Rico · Escalando IA global, analítica RevOps y sistemas de software desde Puerto Rico para el mundo.',

    // Recruiter Modal
    rec_kicker: 'ACCESO RÁPIDO PARA RECLUTADORES',
    rec_heading: 'Resumen y Calificación de 60 Segundos',
    rec_btn_download: 'Descargar Hoja de Vida en PDF',
    rec_btn_copy: 'Copiar Notas ATS',
    rec_target_prefix: 'Objetivo:',
    rec_workauth: '<strong>Ciudadano Estadounidense (Nacido en Puerto Rico)</strong> · No Requiere Patrocinio de Visa · Disponible Inmediatamente para Remoto en EE.UU.',
    rec_verdict: 'CANDIDATO TOP 1%',
    rec_grade: 'Impacto Verificado',
    rec_checklist_title: 'Alineación de Competencias Fundamentales',
    rec_check_1: '<strong>Gestión Integral de Inversión Publicitaria:</strong> Presupuestos multimillonarios anuales en Google, Meta, LinkedIn y compra programática.',
    rec_check_2: '<strong>Capa de Datos y Rastreo Server-Side:</strong> Conversions API (CAPI), Google Tag Manager Server-Side, Databricks SQL y pipelines en PySpark.',
    rec_check_3: '<strong>IA Aplicada y Marcos de Prompts:</strong> Iteración creativa automatizada, más de 20 variantes de copy y agentes de detección de anomalías en menos de 4 horas.',
    rec_check_4: '<strong>Operaciones y Suministros en Crisis:</strong> Adquisición de 100+ computadoras y 50+ tabletas en <30 días; gestión de Active Directory y aprovisionamiento Mac/PC para oficina de 15 personas.',
    rec_check_5: '<strong>Liderazgo Multidisciplinario:</strong> Conecta las áreas de Mercadeo con Ingeniería de Software, Inteligencia de Negocios, Ventas y Producto.',
    rec_btn_view_full: 'Ver Hoja de Vida Ejecutiva Completa',
    rec_btn_email: 'Enviar Correo al Candidato',
    rec_btn_call: 'Llamar al +1 (347) 815-8054',

    // Resume Modal
    res_kicker: 'TARJETA COMPUESTA EJECUTIVA',
    res_heading: 'Resumen Ejecutivo de Hoja de Vida',
    res_btn_download: 'Descargar PDF',
    res_btn_print: 'Imprimir / Guardar PDF Limpio',
    res_btn_copy: 'Copiar Texto',
    res_sec_summary: 'RESUMEN',
    res_sec_skills: 'HABILIDADES',
    res_sec_exp: 'EXPERIENCIA PROFESIONAL',
    res_sec_proj: 'PROYECTOS',
    res_sec_edu: 'EDUCACIÓN Y CERTIFICACIONES',
    res_sec_awards: 'HONORES, PREMIOS Y LIDERAZGO CÍVICO',
    res_cta_badge: 'CONECTEMOS Y COLABOREMOS',
    res_cta_heading: '¿Listo para escalar sistemas de alto impacto? Hablemos.',
    res_cta_desc: 'Operando en la convergencia de crecimiento cuantitativo, analítica de operaciones de ingresos y automatización con IA. Disponible para roles selectos de liderazgo en crecimiento, asesoría en RevOps e ingeniería de alto impacto.',
    res_cta_btn_chat: 'Agendar Charla Estratégica',
    res_cta_btn_linkedin: 'Conectar en LinkedIn',

    // Visitor Area-of-Interest Concierge Survey Modal
    survey_kicker: 'CONSERJE EJECUTIVO · EXPERIENCIA PERSONALIZADA',
    survey_step: 'Personalización en 1 Clic',
    survey_title: '¿Cómo te gustaría explorar el trabajo de Fabián?',
    survey_desc: 'Selecciona tu área de enfoque principal para reconfigurar dinámicamente métricas verificadas, casos de estudio y planos de ingeniería a tu rol:',
    survey_opt_1_title: 'Crecimiento y Mercadeo de Rendimiento',
    survey_opt_1_badge: 'Medios y Rendimiento',
    survey_opt_1_desc: 'Compra de medios multicanal, Server-Side CAPI, +200% aumento de leads con IA, pipeline comercial de más de $10M.',
    survey_opt_2_title: 'IA Aplicada y Flujos Agénticos',
    survey_opt_2_badge: 'Sistemas de IA',
    survey_opt_2_desc: 'Más de 20 flujos de agentes automatizados en Claude, ingeniería de prompts para LLMs, triaje autónomo de operaciones y contenido sintético.',
    survey_opt_3_title: 'Big Data y Operaciones de Ingresos',
    survey_opt_3_badge: 'Analítica y BI',
    survey_opt_3_desc: 'Más de 40M de sesiones en Databricks, pipelines de datos en PySpark y SQL, Microsoft Power BI, infraestructura Azure/GCP.',
    survey_opt_4_title: 'Diseño de Producto y Sistemas UX',
    survey_opt_4_badge: 'Diseño y UX',
    survey_opt_4_desc: 'Sistemas de diseño centrados en las personas, arquitectura de conversión, UX responsivo para móviles, tipografía de lujo y embudos de alta conversión.',
    survey_btn_skip: 'Omitir · Explorar Perfil Completo',

    // Mobile Dock
    dock_nav_overview: 'Resumen',
    dock_nav_cases: 'Casos',
    dock_nav_ai: 'Estudio IA',
    dock_nav_roi: 'Modelo ROI',
    dock_nav_dossier: 'Expediente',
    dock_nav_intel: 'Radar',

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
    btnToggle.setAttribute('aria-label', `Current language: ${lang === 'es' ? 'Español' : 'English'}. Click to switch.`);
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
