/**
 * Tailor Metric — Bespoke AI Infrastructure
 * Theme Engine (Dark/Light), Systems Architecture Blueprint, & Lead Router
 * Full Keyboard & Screen-Reader Accessibility (WCAG 2.1 AA/AAA Compliant)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Theme Controller: Automatically Syncs with Device OS Appearance + Manual Override
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleText = document.getElementById('themeToggleText');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getEffectiveTheme() {
    const saved = localStorage.getItem('tm-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return systemDarkQuery.matches ? 'dark' : 'light';
  }

  function updateThemeUI(theme, isManual) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
    if (themeToggleText) {
      themeToggleText.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#090d16' : '#f8fafc');
    }
    if (isManual) {
      try {
        localStorage.setItem('tm-theme', theme);
        localStorage.setItem('tm-theme-manual', 'true');
      } catch (e) {}
    }
  }

  // Initialize with device / saved theme immediately
  updateThemeUI(getEffectiveTheme(), false);

  // Automatically update when the device appearance changes (e.g. iOS appearance schedule, sunset/sunrise)
  systemDarkQuery.addEventListener('change', (e) => {
    // If the user hasn't explicitly chosen a manual override, follow device automatically:
    if (!localStorage.getItem('tm-theme-manual')) {
      updateThemeUI(e.matches ? 'dark' : 'light', false);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
      const newTheme = active === 'dark' ? 'light' : 'dark';
      updateThemeUI(newTheme, true);
    });
  }

  // 2. Navigation Scroll Treatment
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===================================================================
  // 3. Bilingual Engine (i18n): Instant English / Spanish In-Place Swapper
  // ===================================================================
  const translations = {
    en: {
      nav_challenge: 'The Challenge',
      nav_solutions: 'Core Solutions',
      nav_process: 'How We Work',
      nav_advantage: 'The Advantage',
      nav_call_full: 'Book a Strategy Call',
      nav_call_short: 'Book Call',
      hero_badge_marker: 'ARCHITECTURAL AI',
      hero_badge_text: 'Enterprise Integration & Operations',
      hero_title: 'The custom AI infrastructure you need. <span class="hero-title-highlight">Built, integrated, and managed.</span>',
      hero_sub: "You know AI is the next step for your operation, but building an internal engineering team is too slow and off-the-shelf tools don't fit. Tailor Metric designs, deploys, and manages the exact AI architecture your business needs to scale—without ripping out the systems you already use.",
      hero_cta_book: 'Book a Strategy Call',
      hero_cta_process: 'See how we build it &rarr;',
      hero_spec1_label: 'ADOPTION FRICTION',
      hero_spec1_val: 'Zero System Migration',
      hero_spec2_label: 'DATA GOVERNANCE',
      hero_spec2_val: '100% Tenant Isolation',
      hero_spec3_label: 'EXECUTION MODEL',
      hero_spec3_val: 'Managed Backend Engineering',
      bp_tag: 'SYSTEM TOPOLOGY // LIVE ROUTING',
      bp_subtag: 'Deterministic Orchestration Layer',
      bp_simulate_btn: 'Simulate AI Trace',
      bp_system_active: 'SYSTEM ACTIVE',
      bp_tab1_label: 'Omnichannel Intake & CRM Sync',
      bp_tab2_label: 'Ledger Reconciliation',
      bp_tab3_label: 'Inventory & Spend Guardrail',
      bp_tier1_label: '1. EXISTING ENTERPRISE STACK',
      bp_node1_note: 'Zero replacement of current software',
      bp_tier2_label: '2. TAILOR METRIC ENGINE',
      bp_tier2_flag: 'CUSTOM LAYER',
      bp_node2_note: 'Deterministic Guardrails &middot; Private Models',
      bp_tier3_label: '3. COMMERCIAL EXECUTION',
      bp_node3_note: 'Direct writes &middot; Audit trail logged',
      bp_telemetry_chip: 'EVENT LOG',
      bp_latency_label: 'LATENCY: <strong id="telemetryLatency">142ms</strong>',
      bp_encryption_label: 'ENCRYPTION: <strong>TLS 1.3 / AES-256</strong>',
      bp_leakage_label: 'DATA LEAKAGE RISK: <strong>0.00%</strong>',
      bp_footer_arch: 'Architecture: Event-Driven Microservices',
      bp_footer_iso: 'Tenant Isolation: Guaranteed',
      bp_footer_mgmt: 'Managed by Tailor Metric Engineering',
      problem_eyebrow: 'THE CHALLENGE',
      problem_heading: 'Stop trying to force generic AI into complex workflows.',
      problem_subtext: "Most businesses face a wall when trying to adopt AI. Generic chatbots don't understand your proprietary data, and replacing your core software stack costs too much in downtime and training. The result? You buy AI tools your team never uses, or you remain stuck on manual processes.",
      problem_callout_tag: 'KEY TAKEAWAY',
      problem_callout_text: "You don't need another software subscription. You need an orchestration layer built specifically for your operation.",
      problem_bad_badge: 'GENERIC AI SUBSCRIPTIONS',
      problem_bad_title: 'Why Off-the-Shelf Tools Stall',
      problem_bad_li1: '<strong>Siloed Browser Windows:</strong> Chatbots sit in isolated tabs with zero access to your ERP, CRM, or live databases.',
      problem_bad_li2: '<strong>Forced Employee Behavior Change:</strong> Staff must manually copy-paste data and write custom prompts, driving high churn.',
      problem_bad_li3: '<strong>Proprietary Data Exposure:</strong> Generic vendors often utilize customer inputs to fine-tune shared foundation weights.',
      problem_bad_li4: '<strong>No Operational Execution:</strong> Off-the-shelf bots can answer questions, but they cannot execute transactions inside your systems.',
      problem_good_badge: 'TAILOR METRIC ARCHITECTURE',
      problem_good_title: 'The Bespoke Orchestration Model',
      problem_good_li1: '<strong>Zero System Migration:</strong> Hardwired directly into your existing software stack (Core ERPs, CRMs, Custom Databases &amp; Internal APIs).',
      problem_good_li2: '<strong>Invisible Output Adoption:</strong> Your team keeps using the software they already know; AI does the heavy lifting in the background.',
      problem_good_li3: '<strong>Complete Data Sovereignty:</strong> Dedicated VPC pipelines with strict zero-training policies on external LLMs.',
      problem_good_li4: '<strong>End-to-End Operational Execution:</strong> Fully manages transactions, reconciles ledgers, and writes clean data back automatically.',
      pillars_eyebrow: 'OUR PILLARS',
      pillars_heading: 'End-to-End AI Engineering. <span class="heading-accent">From strategy to daily operation.</span>',
      pillars_subtext: "We don't hand you software credentials and walk away. We analyze, engineer, deploy, and actively manage custom AI systems tailored to your unique operational footprint.",
      p1_category: 'AI Infrastructure Architecture',
      p1_title: 'Systems Architecture',
      p1_body: "We don't guess. We analyze your existing tech stack, identify the bottlenecks, and design a custom AI architecture that securely leverages your proprietary data to drive efficiency.",
      p1_tag1: 'Legacy Stack Audit',
      p1_tag2: 'Isolated VPC Pipeline',
      p1_tag3: 'Bidirectional API Connectors',
      p2_category: 'Custom Automation Workflows',
      p2_title: 'Custom Workflows',
      p2_body: "We build the data pipelines and logic that connect your existing systems. From automated client onboarding to complex data reconciliation, we make your software talk to each other so your team doesn't have to.",
      p2_tag1: 'Deterministic Automation',
      p2_tag2: 'Multi-System Reconciliation',
      p2_tag3: 'Exception Escalation',
      p3_category: 'Seamless Deployment & Management',
      p3_title: 'Deployment & Management',
      p3_body: "We are your dedicated backend engineering team. We handle the deployment, maintain the integrations, and scale the infrastructure as your business grows. You get the results; we manage the code.",
      p3_tag1: 'SLA Uptime Supervision',
      p3_tag2: 'Continuous Model Tuning',
      p3_tag3: 'Dedicated Engineering Desk',
      process_eyebrow: 'OUR PROCESS',
      process_heading: 'Three steps to a scalable operation. <span class="heading-accent">Zero disruption.</span>',
      process_subtext: 'We implement with surgical engineering precision. No software overhauls, no business downtime, and zero guesswork.',
      step1_timing: 'SCOPING & AUDIT',
      step1_heading: '01 | Strategy & Scoping',
      step1_body: 'We start by understanding your commercial goals. We map your current processes, audit your systems, and define exactly where AI will deliver the highest ROI.',
      step_deliv_label: 'DELIVERABLE:',
      step1_deliv_val: 'Systems architecture blueprint & commercial ROI roadmap',
      step2_timing: 'ENGINEERING & SANDBOX',
      step2_heading: '02 | Architecture & Build',
      step2_body: 'Our engineering team builds your custom orchestration layer. We integrate with your existing CRM, ERP, and communication tools. No migrations required.',
      step2_deliv_val: 'Production-ready connectors & deterministic pipeline test suite',
      step3_timing: 'PRODUCTION & SCALING',
      step3_heading: '03 | Deployment & Optimization',
      step3_body: 'We launch the system, train your team on the output, and actively manage the infrastructure to ensure it adapts and scales with your business.',
      step3_deliv_val: 'Zero-downtime production cutover & continuous managed SLA',
      adv_eyebrow: 'THE TAILOR METRIC ADVANTAGE',
      adv_heading: 'The bridge between commercial strategy and deep engineering.',
      adv_lead: "Tailor Metric isn't just a consulting firm, and we aren't just a dev shop. We are a hybrid team built to bridge the gap. We combine elite, front-end business strategy with hardcore backend technical engineering. We understand how to position a business for growth, and we have the technical firepower to actually build the engine that makes it happen.",
      adv_stat1_caption: 'Software Migrations Required',
      adv_stat2_caption: 'Proprietary Data Sovereignty',
      adv_stat3_caption: 'Dedicated Engineering Oversight',
      adv_d1_title: 'Commercial Business Strategy',
      adv_d1_sub: 'REVENUE, MARGIN & WORKFLOW POSITIONING',
      adv_d1_body: 'We design architecture strictly anchored to economic outcomes: accelerating lead velocity, cutting media burn, and eliminating manual accounting overhead.',
      adv_d2_title: 'Deep Technical Engineering',
      adv_d2_sub: 'SYSTEMS ARCHITECTURE & PRODUCTION CODE',
      adv_d2_body: 'We write production code, orchestrate custom API connectors, enforce deterministic business logic, and maintain low-latency infrastructure on managed SLAs.',
      cta_eyebrow: 'TAKE THE FIRST STEP',
      cta_title: 'Bring us your biggest operational bottleneck. <span class="heading-accent">We’ll show you how to automate it.</span>',
      cta_subtitle: 'Schedule a 30-minute scoping session. No sales deck, just a technical review of your workflows.',
      form_name_label: 'FULL NAME <span class="req" aria-hidden="true">*</span>',
      form_name_ph: 'Your full name',
      form_email_label: 'WORK EMAIL <span class="req" aria-hidden="true">*</span>',
      form_email_ph: 'name@company.com',
      form_company_label: 'COMPANY / ORGANIZATION <span class="req" aria-hidden="true">*</span>',
      form_company_ph: 'Company or organization name',
      form_phone_label: 'PHONE NUMBER <span class="opt">(OPTIONAL)</span>',
      form_phone_ph: '+1 (555) 000-0000',
      form_bottleneck_label: 'PRIMARY OPERATIONAL BOTTLENECK & TECH STACK <span class="req" aria-hidden="true">*</span>',
      form_bottleneck_ph: 'Describe the workflow: e.g. CRM synchronization, ERP data pipelines, automated document reconciliation, database integration...',
      form_submit_btn: 'Book a Strategy Call',
      form_routing_note: 'Direct routing: Form delivers securely to <strong>laura@tailormetric.co</strong>. Zero spam.',
      form_direct_pref: 'Prefer direct contact? Email <a href="mailto:laura@tailormetric.co">laura@tailormetric.co</a> or call <a href="tel:+17872092244">+1 (787) 209-2244</a>',
      modal_badge: 'TECHNICAL EVALUATION',
      modal_title: 'Book a Strategy Call',
      modal_subtitle: 'No sales decks. Tell us about your operational bottleneck and we will walk through the exact technical architecture needed to automate it.',
      modal_routing_note: 'Delivers securely to <strong>laura@tailormetric.co</strong>',
      footer_desc: 'The bridge between commercial strategy and deep engineering. Architecting, deploying, and managing bespoke AI infrastructure for high-growth operations.',
      footer_col_nav: 'Navigation',
      footer_col_company: 'Company',
      footer_col_direct: 'Direct Inquiries',
      footer_link_overview: 'Overview',
      footer_link_challenge: 'The Challenge',
      footer_link_solutions: 'Core Solutions',
      footer_link_process: 'Our Process',
      footer_link_advantage: 'The TM Advantage',
      footer_link_call: 'Strategy Call',
      footer_link_contact: 'Contact',
      footer_location: 'Guaynabo, PR',
      footer_copyright: 'Copyright &copy; 2026 Tailor Metric. All rights reserved. Guaynabo, Puerto Rico.',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Service',
      privacy_title: 'Privacy Policy',
      privacy_subtitle: 'Last updated: November 2026',
      privacy_p1: '<strong>1. Data Sovereignty &amp; Privacy:</strong> Tailor Metric designs AI infrastructure under the strict premise that customer proprietary data remains the sole property of the client. At no point is client data used to train shared public foundation models.',
      privacy_p2: '<strong>2. Information Collection:</strong> When you submit a scoping request, we collect contact information solely to coordinate technical evaluations and direct consultation.',
      privacy_p3: '<strong>3. Security Standards:</strong> All integrations utilize enterprise-grade encryption (TLS 1.3 in transit, AES-256 at rest) with granular role-based access and zero-retention logging options.',
      terms_title: 'Terms of Service',
      terms_subtitle: 'Last updated: November 2026',
      terms_p1: '<strong>1. Services Engagement:</strong> Tailor Metric provides bespoke AI infrastructure architecture, deployment, and ongoing managed engineering services governed by tailored client service level agreements (SLAs).',
      terms_p2: '<strong>2. Intellectual Property:</strong> Custom workflow orchestrations and connectors developed for clients are provisioned under explicit client licensing frameworks agreed upon in formal statements of work.',
      terms_p3: '<strong>3. System Reliability:</strong> System uptime, monitoring, and integration maintenance are actively supervised under dedicated engineering support protocols.'
    },
    es: {
      nav_challenge: 'El Reto',
      nav_solutions: 'Soluciones',
      nav_process: 'Proceso',
      nav_advantage: 'La Ventaja',
      nav_call_full: 'Agendar Llamada Estratégica',
      nav_call_short: 'Agendar',
      hero_badge_marker: 'ARQUITECTURA DE IA',
      hero_badge_text: 'Integración y Operaciones Empresariales',
      hero_title: 'La infraestructura de IA personalizada que tu empresa necesita. <span class="hero-title-highlight">Diseñada, integrada y administrada.</span>',
      hero_sub: 'Sabes que la IA es el siguiente paso para tu operación, pero formar un equipo interno de ingeniería es lento y las herramientas comerciales no se adaptan. Tailor Metric diseña, despliega y administra la arquitectura exacta que tu negocio necesita para escalar—sin reemplazar los sistemas que ya utilizas.',
      hero_cta_book: 'Agendar Llamada Estratégica',
      hero_cta_process: 'Cómo lo construimos &rarr;',
      hero_spec1_label: 'FRICCIÓN DE ADOPCIÓN',
      hero_spec1_val: 'Cero Migración de Sistemas',
      hero_spec2_label: 'GOBERNANZA DE DATOS',
      hero_spec2_val: 'Aislamiento 100% de Inquilinos',
      hero_spec3_label: 'MODELO DE EJECUCIÓN',
      hero_spec3_val: 'Ingeniería Backend Administrada',
      bp_tag: 'TOPOLOGÍA DE SISTEMAS // ENRUTAMIENTO EN VIVO',
      bp_subtag: 'Capa de Orquestación Determinista',
      bp_simulate_btn: 'Simular Ruta de IA',
      bp_system_active: 'SISTEMA ACTIVO',
      bp_tab1_label: 'Captura Omnicanal y CRM',
      bp_tab2_label: 'Reconciliación de Libros',
      bp_tab3_label: 'Control de Presupuesto y Stock',
      bp_tier1_label: '1. STACK EMPRESARIAL EXISTENTE',
      bp_node1_note: 'Cero reemplazo de software actual',
      bp_tier2_label: '2. MOTOR TAILOR METRIC',
      bp_tier2_flag: 'CAPA PERSONALIZADA',
      bp_node2_note: 'Reglas Deterministas &middot; Modelos Privados',
      bp_tier3_label: '3. EJECUCIÓN COMERCIAL',
      bp_node3_note: 'Escritura directa &middot; Registro de auditoría',
      bp_telemetry_chip: 'REGISTRO DE EVENTO',
      bp_latency_label: 'LATENCIA: <strong id="telemetryLatency">142ms</strong>',
      bp_encryption_label: 'ENCRIPTACIÓN: <strong>TLS 1.3 / AES-256</strong>',
      bp_leakage_label: 'RIESGO DE FUGA DE DATOS: <strong>0.00%</strong>',
      bp_footer_arch: 'Arquitectura: Microservicios Basados en Eventos',
      bp_footer_iso: 'Aislamiento de Inquilinos: Garantizado',
      bp_footer_mgmt: 'Administrado por Ingeniería de Tailor Metric',
      problem_eyebrow: 'EL RETO',
      problem_heading: 'Deja de intentar forzar IA genérica en flujos de trabajo complejos.',
      problem_subtext: 'La mayoría de las empresas se topan con una pared al intentar adoptar IA. Los chatbots genéricos no comprenden tus datos privados, y reemplazar tu software central cuesta demasiado en tiempo de inactividad y capacitación. ¿El resultado? Compras suscripciones que tu equipo nunca usa o sigues atrapado en procesos manuales.',
      problem_callout_tag: 'CONCLUSIÓN CLAVE',
      problem_callout_text: 'No necesitas otra suscripción de software. Necesitas una capa de orquestación construida específicamente para tu operación.',
      problem_bad_badge: 'SUSCRIPCIONES DE IA GENÉRICA',
      problem_bad_title: 'Por Qué Falla el Software Comercial',
      problem_bad_li1: '<strong>Pestañas Aisladas en el Navegador:</strong> Los chatbots operan en ventanas desconectadas sin acceso a tu ERP, CRM o bases de datos en vivo.',
      problem_bad_li2: '<strong>Cambio Forzado de Comportamiento:</strong> El equipo debe copiar y pegar datos manualmente y redactar prompts, generando resistencia y abandono.',
      problem_bad_li3: '<strong>Exposición de Datos Confidenciales:</strong> Los proveedores comerciales a menudo usan las entradas del usuario para reentrenar modelos públicos compartidos.',
      problem_bad_li4: '<strong>Cero Ejecución Operativa:</strong> Los bots estándar pueden responder preguntas, pero no pueden ejecutar transacciones dentro de tus sistemas.',
      problem_good_badge: 'ARQUITECTURA TAILOR METRIC',
      problem_good_title: 'El Modelo de Orquestación a Medida',
      problem_good_li1: '<strong>Cero Migración de Sistemas:</strong> Conectado directamente a tu stack de software actual (ERPs centrales, CRMs, bases de datos y APIs internas).',
      problem_good_li2: '<strong>Adopción Invisible:</strong> Tu equipo sigue usando las herramientas que ya conoce; la IA se encarga del trabajo pesado en el backend.',
      problem_good_li3: '<strong>Soberanía Total de Datos:</strong> Ductos dedicados en VPC privada con políticas estrictas de no-entrenamiento en LLMs externos.',
      problem_good_li4: '<strong>Ejecución Operativa de Extremo a Extremo:</strong> Gestiona transacciones, reconcilia libros y actualiza datos limpios automáticamente.',
      pillars_eyebrow: 'NUESTROS PILARES',
      pillars_heading: 'Ingeniería de IA de Extremo a Extremo. <span class="heading-accent">De la estrategia a la operación diaria.</span>',
      pillars_subtext: 'No te entregamos credenciales de software para dejarte solo. Analizamos, diseñamos, desplegamos y administramos sistemas de IA hechos a la medida de tu operación.',
      p1_category: 'Arquitectura de Infraestructura de IA',
      p1_title: 'Arquitectura de Sistemas',
      p1_body: 'No improvisamos. Analizamos tu stack tecnológico actual, identificamos los cuellos de botella y diseñamos una arquitectura de IA personalizada que aprovecha tus datos propietarios de forma segura para impulsar la eficiencia.',
      p1_tag1: 'Auditoría de Stack Actual',
      p1_tag2: 'Ductos en VPC Aislada',
      p1_tag3: 'Conectores API Bidireccionales',
      p2_category: 'Flujos de Automatización a Medida',
      p2_title: 'Flujos Personalizados',
      p2_body: 'Construimos los ductos de datos y la lógica que comunican tus sistemas actuales. Desde la calificación automática de oportunidades hasta la conciliación compleja de datos, hacemos que tus herramientas hablen entre sí para que tu equipo no tenga que hacerlo manualmente.',
      p2_tag1: 'Automatización Determinista',
      p2_tag2: 'Reconciliación Multisistema',
      p2_tag3: 'Escalamiento de Excepciones',
      p3_category: 'Despliegue y Administración Continua',
      p3_title: 'Despliegue y Soporte Continuo',
      p3_body: 'Somos tu equipo dedicado de ingeniería de backend. Nos encargamos del despliegue, mantenemos las integraciones y escalamos la infraestructura conforme crece tu negocio. Tú obtienes los resultados comerciales; nosotros gestionamos el código.',
      p3_tag1: 'Supervisión de SLAs de Disponibilidad',
      p3_tag2: 'Ajuste Continuo de Modelos',
      p3_tag3: 'Mesa de Ingeniería Dedicada',
      process_eyebrow: 'NUESTRO PROCESO',
      process_heading: 'Tres pasos hacia una operación escalable. <span class="heading-accent">Cero interrupciones.</span>',
      process_subtext: 'Implementamos con precisión quirúrgica de ingeniería. Sin cambios de software, sin tiempo de inactividad operativa y sin incertidumbres.',
      step1_timing: 'ALCANCE Y AUDITORÍA',
      step1_heading: '01 | Estrategia y Alcance',
      step1_body: 'Comenzamos entendiendo tus objetivos comerciales. Mapeamos tus procesos actuales, auditamos tus sistemas y definimos exactamente dónde la IA generará el mayor retorno de inversión.',
      step_deliv_label: 'ENTREGABLE:',
      step1_deliv_val: 'Blueprint de arquitectura de sistemas y plan de retorno comercial',
      step2_timing: 'INGENIERÍA Y SANDBOX',
      step2_heading: '02 | Arquitectura y Construcción',
      step2_body: 'Nuestro equipo de ingeniería construye tu capa de orquestación a medida. Nos integramos con tu CRM, ERP y herramientas de comunicación existentes. Sin necesidad de migrar software.',
      step2_deliv_val: 'Conectores listos para producción y suite de pruebas de flujo determinista',
      step3_timing: 'PRODUCCIÓN Y ESCALABILIDAD',
      step3_heading: '03 | Despliegue y Optimización',
      step3_body: 'Lanzamos el sistema, capacitamos a tu equipo sobre los resultados y administramos activamente la infraestructura para asegurar que se adapte y escale con tu negocio.',
      step3_deliv_val: 'Puesta en producción sin tiempo de inactividad y SLA administrado continuo',
      adv_eyebrow: 'LA VENTAJA DE TAILOR METRIC',
      adv_heading: 'El puente entre la estrategia comercial y la ingeniería profunda.',
      adv_lead: 'Tailor Metric no es solo una firma de consultoría ni una simple agencia de software. Somos un equipo híbrido creado para cerrar la brecha. Combinamos estrategia empresarial de alto nivel con ingeniería técnica de backend robusta. Comprendemos cómo posicionar un negocio para crecer y contamos con la capacidad técnica para construir el motor que lo hace posible.',
      adv_stat1_caption: 'Migraciones de Software Requeridas',
      adv_stat2_caption: 'Soberanía de Datos Propietarios',
      adv_stat3_caption: 'Supervisión de Ingeniería Dedicada',
      adv_d1_title: 'Estrategia de Negocio Comercial',
      adv_d1_sub: 'INGRESOS, MARGEN Y POSICIONAMIENTO OPERATIVO',
      adv_d1_body: 'Diseñamos arquitecturas estrictamente ancladas a resultados económicos: acelerar la velocidad de conversión de prospectos, frenar el gasto publicitario en productos sin stock y eliminar la carga de trabajo contable manual.',
      adv_d2_title: 'Ingeniería Técnica Profunda',
      adv_d2_sub: 'ARQUITECTURA DE SISTEMAS Y CÓDIGO EN PRODUCCIÓN',
      adv_d2_body: 'Escribimos código de producción, orquestamos conectores de API personalizados, garantizamos lógica de negocio determinista y mantenemos infraestructura de baja latencia bajo acuerdos formales de nivel de servicio (SLA).',
      cta_eyebrow: 'DA EL PRIMER PASO',
      cta_title: 'Tráenos tu mayor cuello de botella operativo. <span class="heading-accent">Te mostraremos cómo automatizarlo.</span>',
      cta_subtitle: 'Agenda una sesión técnica de 30 minutos. Sin presentaciones de ventas, solo una revisión técnica directa de tus flujos de trabajo.',
      form_name_label: 'TU NOMBRE COMPLETO <span class="req" aria-hidden="true">*</span>',
      form_name_ph: 'Tu nombre completo',
      form_email_label: 'CORREO PROFESIONAL <span class="req" aria-hidden="true">*</span>',
      form_email_ph: 'nombre@empresa.com',
      form_company_label: 'EMPRESA / ORGANIZACIÓN <span class="req" aria-hidden="true">*</span>',
      form_company_ph: 'Nombre de la empresa u organización',
      form_phone_label: 'NÚMERO DE TELÉFONO <span class="opt">(OPTIONAL)</span>',
      form_phone_ph: '+1 (787) 000-0000',
      form_bottleneck_label: 'CUELLO DE BOTELLA OPERATIVO PRINCIPAL Y STACK TÉCNICO <span class="req" aria-hidden="true">*</span>',
      form_bottleneck_ph: 'Describe el flujo: ej. Sincronización de CRM, ductos de datos de ERP, reconciliación automatizada de documentos, integración de bases de datos...',
      form_submit_btn: 'Agendar Llamada Estratégica',
      form_routing_note: 'Enrutamiento directo: El formulario se entrega de forma segura a <strong>laura@tailormetric.co</strong>. Cero spam.',
      form_direct_pref: '¿Prefieres contacto directo? Escribe a <a href="mailto:laura@tailormetric.co">laura@tailormetric.co</a> o llama al <a href="tel:+17872092244">+1 (787) 209-2244</a>',
      modal_badge: 'EVALUACIÓN TÉCNICA',
      modal_title: 'Agendar Llamada Estratégica',
      modal_subtitle: 'Sin presentaciones de ventas. Cuéntanos sobre tu cuello de botella operativo y revisaremos la arquitectura técnica exacta necesaria para automatizarlo.',
      modal_routing_note: 'Se entrega de forma segura a <strong>laura@tailormetric.co</strong>',
      footer_desc: 'El puente entre la estrategia comercial y la ingeniería profunda. Diseñando, desplegando y administrando infraestructura de IA a medida para operaciones en crecimiento.',
      footer_col_nav: 'Navegación',
      footer_col_company: 'Empresa',
      footer_col_direct: 'Consultas Directas',
      footer_link_overview: 'Visión General',
      footer_link_challenge: 'El Reto',
      footer_link_solutions: 'Soluciones',
      footer_link_process: 'Proceso',
      footer_link_advantage: 'La Ventaja',
      footer_link_call: 'Llamada Estratégica',
      footer_link_contact: 'Contacto',
      footer_location: 'Guaynabo, PR',
      footer_copyright: 'Copyright &copy; 2026 Tailor Metric. Todos los derechos reservados. Guaynabo, Puerto Rico.',
      footer_privacy: 'Política de Privacidad',
      footer_terms: 'Términos de Servicio',
      privacy_title: 'Política de Privacidad',
      privacy_subtitle: 'Última actualización: Noviembre 2026',
      privacy_p1: '<strong>1. Soberanía y Privacidad de Datos:</strong> Tailor Metric diseña infraestructura de IA bajo la premisa estricta de que los datos confidenciales del cliente son propiedad exclusiva del cliente. En ningún momento se utilizan datos de clientes para entrenar modelos públicos compartidos.',
      privacy_p2: '<strong>2. Recopilación de Información:</strong> Al enviar una solicitud de evaluación técnica, recopilamos información de contacto únicamente para coordinar evaluaciones técnicas y consultas directas.',
      privacy_p3: '<strong>3. Estándares de Seguridad:</strong> Todas las integraciones utilizan cifrado de nivel empresarial (TLS 1.3 en tránsito, AES-256 en reposo) con control de acceso granular y opciones de registro sin retención.',
      terms_title: 'Términos de Servicio',
      terms_subtitle: 'Última actualización: Noviembre 2026',
      terms_p1: '<strong>1. Contratación de Servicios:</strong> Tailor Metric proporciona arquitectura de infraestructura de IA personalizada, despliegue y servicios de ingeniería administrada continua regidos por acuerdos de nivel de servicio (SLA) a la medida.',
      terms_p2: '<strong>2. Propiedad Intelectual:</strong> Las orquestaciones de flujos de trabajo y los conectores desarrollados para los clientes se suministran bajo marcos explícitos de licencia acordados en declaraciones de trabajo formales.',
      terms_p3: '<strong>3. Confiabilidad del Sistema:</strong> La disponibilidad, el monitoreo y el mantenimiento de las integraciones se supervisan activamente bajo protocolos dedicados de soporte de ingeniería.'
    }
  };

  // 4. Interactive Systems Pipeline Controller with WAI-ARIA Tabs Keyboard Pattern
  const workflows = {
    en: {
      intake: {
        inTitle: 'OMNICHANNEL INGESTION',
        inVal: 'Inbound Channels + Webhooks',
        inNote: 'Zero replacement of current software',
        tmTitle: 'REASONING & VALIDATION',
        tmVal: 'Intent Scoring & Schema Parser',
        tmNote: 'Deterministic Guardrails · Private Models',
        destTitle: 'CORE BUSINESS IMPACT',
        destVal: 'Qualified Opportunity Committed to CRM',
        destNote: 'Direct writes · Audit trail logged',
        telemetry: 'Inquiry ingested <2s · Auto-qualified intent · Synchronized with core CRM'
      },
      reconcile: {
        inTitle: 'DATA SOURCES & LEDGERS',
        inVal: 'Invoices, Banking Feeds & Core ERP',
        inNote: 'Multi-entity transactional streams',
        tmTitle: 'RECONCILIATION ENGINE',
        tmVal: 'Deterministic Matching & Tax Audit',
        tmNote: 'Line-item math proof · Exception tagging',
        destTitle: 'CORE BUSINESS IMPACT',
        destVal: 'Zero-Touch Journal Entry Posted',
        destNote: 'Clean ledger synchronization · Audit ready',
        telemetry: '1,420 invoice line-items matched · 0 discrepancy exceptions · Posted directly to accounting ledger'
      },
      waste: {
        inTitle: 'INVENTORY & AD SPEND APIS',
        inVal: 'Ad Platform APIs & Inventory Feed',
        inNote: 'Real-time SKU & catalog synchronization',
        tmTitle: 'ANOMALY DETECTOR',
        tmVal: 'Zero-Stock Auto-Pause Logic',
        tmNote: 'Sub-second event trigger · Margin protection',
        destTitle: 'CORE BUSINESS IMPACT',
        destVal: 'Ad Groups Paused (<110ms)',
        destNote: 'Eliminates burn on sold inventory',
        telemetry: 'Zero-stock event detected in database · Associated ad group paused within 108ms · Capital waste prevented'
      }
    },
    es: {
      intake: {
        inTitle: 'INGESTIÓN OMNICANAL',
        inVal: 'Canales Entrantes + Webhooks',
        inNote: 'Cero reemplazo de software actual',
        tmTitle: 'RAZONAMIENTO Y VALIDACIÓN',
        tmVal: 'Puntuación de Intención y Esquemas',
        tmNote: 'Reglas Deterministas · Modelos Privados',
        destTitle: 'IMPACTO DIRECTO AL NEGOCIO',
        destVal: 'Oportunidad Calificada Asignada en CRM',
        destNote: 'Escritura directa · Registro de auditoría',
        telemetry: 'Solicitud recibida <2s · Intención y presupuesto calificados · Sincronizado con CRM central'
      },
      reconcile: {
        inTitle: 'FUENTES DE DATOS Y LIBROS',
        inVal: 'Facturas, Feeds Bancarios y ERP Central',
        inNote: 'Flujos transaccionales multientidad',
        tmTitle: 'MOTOR DE RECONCILIACIÓN',
        tmVal: 'Cruce Determinista y Auditoría Fiscal',
        tmNote: 'Prueba matemática de partidas · Excepciones',
        destTitle: 'IMPACTO DIRECTO AL NEGOCIO',
        destVal: 'Asiento Contable Registrado sin Fricción',
        destNote: 'Sincronización limpia de libros · Auditoría lista',
        telemetry: '1,420 partidas cruzadas · 0 discrepancias · Registrado directamente en el libro contable'
      },
      waste: {
        inTitle: 'INVENTARIO Y APIS DE PUBLICIDAD',
        inVal: 'APIs de Plataformas y Feed de Inventario',
        inNote: 'Sincronización en tiempo real de SKUs',
        tmTitle: 'DETECTOR DE ANOMALÍAS',
        tmVal: 'Pausa Automática por Cero Stock',
        tmNote: 'Disparo en submilisegundos · Protección de margen',
        destTitle: 'IMPACTO DIRECTO AL NEGOCIO',
        destVal: 'Grupos de Anuncios Pausados (<110ms)',
        destNote: 'Elimina gasto publicitario en inventario agotado',
        telemetry: 'Cero existencias detectado en BD · Grupo de anuncios pausado en 108ms · Capital preservado'
      }
    }
  };

  let currentLang = 'en';
  let currentWorkflowKey = 'intake';

  const langBtnEn = document.getElementById('langBtnEn');
  const langBtnEs = document.getElementById('langBtnEs');
  const node1Label = document.getElementById('node1Label');
  const node1Val = document.getElementById('node1Val');
  const node2Label = document.getElementById('node2Label');
  const node2Val = document.getElementById('node2Val');
  const node3Label = document.getElementById('node3Label');
  const node3Val = document.getElementById('node3Val');
  const telemetryText = document.getElementById('telemetryText');
  const bpTabs = Array.from(document.querySelectorAll('.bp-tab'));
  const schematicPanel = document.getElementById('schematic-panel');

  function applyWorkflow(key) {
    currentWorkflowKey = key || currentWorkflowKey;
    const langWorkflows = workflows[currentLang] || workflows.en;
    const data = langWorkflows[currentWorkflowKey];
    if (!data) return;

    if (telemetryText) {
      telemetryText.style.opacity = '0';
      setTimeout(() => {
        if (node1Label) node1Label.textContent = data.inTitle;
        if (node1Val) node1Val.textContent = data.inVal;
        if (node2Label) node2Label.textContent = data.tmTitle;
        if (node2Val) node2Val.textContent = data.tmVal;
        if (node3Label) node3Label.textContent = data.destTitle;
        if (node3Val) node3Val.textContent = data.destVal;
        telemetryText.textContent = data.telemetry;
        telemetryText.style.opacity = '1';
      }, 140);
    }
  }

  function setLanguage(lang, persist = true, updateUrl = true) {
    if (lang !== 'en' && lang !== 'es') lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = (lang === 'es')
      ? 'Tailor Metric — Infraestructura de IA Personalizada'
      : 'Tailor Metric — Custom AI Infrastructure';

    const dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (dict[k] !== undefined) {
        el.textContent = dict[k];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.getAttribute('data-i18n-html');
      if (dict[k] !== undefined) {
        el.innerHTML = dict[k];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const k = el.getAttribute('data-i18n-ph');
      if (dict[k] !== undefined) {
        el.setAttribute('placeholder', dict[k]);
      }
    });

    if (langBtnEn && langBtnEs) {
      langBtnEn.classList.toggle('active', lang === 'en');
      langBtnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
      langBtnEs.classList.toggle('active', lang === 'es');
      langBtnEs.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    }

    applyWorkflow(currentWorkflowKey);

    if (persist) {
      try {
        localStorage.setItem('tm-lang', lang);
      } catch (e) {}
    }

    if (updateUrl && !window.location.pathname.includes('/es')) {
      const url = new URL(window.location);
      if (lang === 'es') {
        url.searchParams.set('lang', 'es');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }

  if (langBtnEn) {
    langBtnEn.addEventListener('click', () => setLanguage('en', true, true));
  }
  if (langBtnEs) {
    langBtnEs.addEventListener('click', () => setLanguage('es', true, true));
  }

  // Detect and initialize active language
  function detectInitialLanguage() {
    if (document.documentElement.lang === 'es' || window.location.pathname.includes('/es')) {
      return 'es';
    }
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'es' || urlLang === 'en') return urlLang;
    const saved = localStorage.getItem('tm-lang');
    if (saved === 'es' || saved === 'en') return saved;
    if (navigator.language && navigator.language.startsWith('es')) return 'es';
    return 'en';
  }

  const initialLang = detectInitialLanguage();
  if (initialLang === 'es') {
    setLanguage('es', false, false);
  }

  function activateTab(tab) {
    bpTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    if (schematicPanel) {
      schematicPanel.setAttribute('aria-labelledby', tab.id);
    }
    const wf = tab.getAttribute('data-wf');
    applyWorkflow(wf);
    window.dispatchEvent(new CustomEvent('tm-workflow-change', { detail: { wf } }));
  }

  bpTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % bpTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + bpTabs.length) % bpTabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = bpTabs.length - 1;
      }

      if (targetIndex !== null) {
        bpTabs[targetIndex].focus();
        activateTab(bpTabs[targetIndex]);
      }
    });
  });

  // 4. Smooth Navigation & Field Focus for Lead Links
  document.querySelectorAll('.cta-lead-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

          const leadForm = document.getElementById('inlineLeadForm');
          const nameInput = document.getElementById('inlineName');
          if (leadForm) {
            leadForm.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
            leadForm.style.borderColor = 'var(--accent-brand)';
            leadForm.style.boxShadow = '0 0 0 2px var(--accent-brand-border)';
            setTimeout(() => {
              leadForm.style.borderColor = '';
              leadForm.style.boxShadow = '';
            }, 1800);
          }
          if (nameInput) {
            setTimeout(() => {
              nameInput.focus();
            }, 600);
          }
        }
      }
    });
  });

  // 5. Accessible Modals with Focus Trap & Restoration
  const bookingModal = document.getElementById('bookingModal');
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  let previousActiveElement = null;

  function getFocusableElements(container) {
    return container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(modal) {
    if (!modal) return;
    previousActiveElement = document.activeElement;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hide background from screen readers
    document.getElementById('siteHeader')?.setAttribute('aria-hidden', 'true');
    document.getElementById('main-content')?.setAttribute('aria-hidden', 'true');

    // Focus first focusable item inside the modal
    const focusable = getFocusableElements(modal);
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 50);
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Restore background screen reader visibility
    document.getElementById('siteHeader')?.removeAttribute('aria-hidden');
    document.getElementById('main-content')?.removeAttribute('aria-hidden');

    // Return focus to previous trigger
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  document.querySelectorAll('.open-privacy-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  });

  document.querySelectorAll('.open-terms-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(bookingModal);
      closeModal(privacyModal);
      closeModal(termsModal);
    });
  });

  [bookingModal, privacyModal, termsModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Keyboard Tab trapping inside active modal
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusable = getFocusableElements(modal);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
      closeModal(privacyModal);
      closeModal(termsModal);
    }
  });

  // 6. Lead Form Submission Engine (Delivers to laura@tailormetric.co)
  async function submitLeadToEmail(form, feedbackEl) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const origBtnHTML = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="routing-dot" style="display:inline-block;margin-right:6px;" aria-hidden="true"></span>
        <span>Transmitting brief to laura@tailormetric.co...</span>
      `;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const clientName = data.name || 'Prospective Partner';
    const clientEmail = data.email || '';
    const clientCompany = data.company || 'Enterprise';
    const clientPhone = data.phone || 'Not provided';
    const clientBottleneck = data.bottleneck || 'No bottleneck description provided.';

    const emailSubject = `New Scoping Request: ${clientName} (${clientCompany}) - Tailor Metric`;

    const payload = {
      name: clientName,
      email: clientEmail,
      company: clientCompany,
      phone: clientPhone,
      bottleneck: clientBottleneck,
      _subject: emailSubject,
      _template: 'table',
      _captcha: 'false',
      _replyto: clientEmail
    };

    try {
      await fetch('https://formsubmit.co/ajax/laura@tailormetric.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('FormSubmit AJAX notice:', err);
    }

    const isEs = currentLang === 'es';
    const mailtoBody = encodeURIComponent(
      `Name: ${clientName}\nWork Email: ${clientEmail}\nCompany / Organization: ${clientCompany}\nPhone: ${clientPhone}\n\nPrimary Operational Bottleneck:\n${clientBottleneck}\n\n---\nSent from Tailor Metric (${isEs ? 'ES' : 'EN'})`
    );
    const mailtoUrl = `mailto:laura@tailormetric.co?subject=${encodeURIComponent(emailSubject)}&body=${mailtoBody}`;

    form.style.display = 'none';
    feedbackEl.style.display = 'block';

    const badgeText = isEs ? 'SOLICITUD ENVIADA' : 'BRIEF DISPATCHED';
    const titleText = isEs
      ? 'Solicitud de Evaluación Recibida'
      : 'Scoping Request Sent to Engineering';
    const bodyText = isEs
      ? `Gracias, <strong>${clientName}</strong>. Tu descripción técnica ha sido transmitida directamente a nuestra mesa de ingeniería. Evaluaremos tu arquitectura y te confirmaremos una llamada técnica de 30 minutos en menos de 2 horas laborables.`
      : `Thank you, <strong>${clientName}</strong>. Your operational brief has been transmitted directly to our engineering desk. We are evaluating your systems profile and will confirm a 30-minute technical scoping review within 2 business hours.`;
    const openMailText = isEs ? 'Abrir en Correo' : 'Open in Mail Client';
    const resetText = isEs ? 'Enviar Otra Solicitud' : 'Submit Another Note';

    feedbackEl.innerHTML = `
      <div style="text-align:center;padding:12px 6px;">
        <div class="feedback-badge" style="margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${badgeText}</span>
        </div>
        <h3 style="font-size:1.35rem;font-weight:800;margin-bottom:8px;color:var(--text-primary);">
          ${titleText}
        </h3>
        <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.6;max-width:540px;margin:0 auto 20px;">
          ${bodyText}
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="${mailtoUrl}" class="btn btn-secondary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>${openMailText}</span>
          </a>
          <button type="button" class="btn btn-secondary btn-sm btn-reset-form">
            <span>${resetText}</span>
          </button>
        </div>
      </div>
    `;

    feedbackEl.querySelector('.btn-reset-form')?.addEventListener('click', () => {
      form.reset();
      form.style.display = 'flex';
      feedbackEl.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHTML;
      }
      form.querySelector('input')?.focus();
    });
  }

  // Attach to Inline Form & Modal Form
  const inlineForm = document.getElementById('inlineLeadForm');
  const inlineFeedback = document.getElementById('inlineFeedback');
  if (inlineForm && inlineFeedback) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitLeadToEmail(inlineForm, inlineFeedback);
    });
  }

  const modalForm = document.getElementById('bookingForm');
  const modalFeedback = document.getElementById('bookingFeedback');
  if (modalForm && modalFeedback) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitLeadToEmail(modalForm, modalFeedback);
    });
  }

  // ===================================================================
  // 6. Architectural Vector Highway & Circuit Pipeline Engine
  //    (Directly Aligned with the Tailor Metric Monogram & CAD Metric Grid)
  // ===================================================================
  function initHeroVectorEngine() {
    const canvas = document.getElementById('heroNeuralCanvas');
    const heroSection = document.getElementById('hero');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = null;
    let isVisible = true;
    let tracks = [];
    let pulses = [];
    let gridCrosses = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resize() {
      const rect = heroSection.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildArchitecture();
    }

    function buildArchitecture() {
      tracks = [];
      pulses = [];
      gridCrosses = [];

      // 1. Precision Metric CAD Grid Crosses (spaced at 90px x 90px)
      const step = width < 600 ? 70 : 90;
      for (let x = 30; x < width; x += step) {
        for (let y = 30; y < height; y += step) {
          gridCrosses.push({
            x,
            y,
            size: 4
          });
        }
      }

      // 2. Structured Circuit Bus Tracks (with 45°/55° diagonal facets matching the TM monogram)
      const trackCount = width < 600 ? 6 : 12;
      const isMobile = width < 600;

      for (let i = 0; i < trackCount; i++) {
        const startFromLeft = i % 2 === 0;
        let startX, startY;

        if (startFromLeft) {
          startX = -20;
          startY = (height * 0.1) + ((height * 0.8) / trackCount) * i;
        } else {
          startX = (width * 0.1) + ((width * 0.8) / trackCount) * i;
          startY = -20;
        }

        const points = [{ x: startX, y: startY }];
        let curX = startX;
        let curY = startY;

        // Step 1: Initial horizontal run
        const leg1 = isMobile ? (width * 0.2 + Math.random() * 80) : (width * 0.25 + Math.random() * 150);
        curX += leg1;
        points.push({ x: curX, y: curY });

        // Step 2: Diagonal slant (angle of TM logo monogram)
        const diagLen = isMobile ? (40 + Math.random() * 60) : (80 + Math.random() * 120);
        const diagYDirection = (i % 2 === 0) ? 1 : -1;
        curX += diagLen;
        curY += diagLen * 0.7 * diagYDirection;
        curY = Math.max(20, Math.min(height - 20, curY));
        points.push({ x: curX, y: curY });

        // Step 3: Second horizontal run
        const leg2 = isMobile ? (width * 0.3) : (width * 0.4);
        curX += leg2;
        points.push({ x: curX, y: curY });

        // Compute cumulative segment distances
        let totalLen = 0;
        const segments = [];
        for (let s = 0; s < points.length - 1; s++) {
          const dx = points[s + 1].x - points[s].x;
          const dy = points[s + 1].y - points[s].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          segments.push({
            p1: points[s],
            p2: points[s + 1],
            dist,
            cumDist: totalLen
          });
          totalLen += dist;
        }

        tracks.push({
          points,
          segments,
          totalLen,
          terminals: [points[0], points[points.length - 1]]
        });

        const pulseCount = isMobile ? 1 : 2;
        for (let p = 0; p < pulseCount; p++) {
          pulses.push({
            trackIndex: i,
            progress: (p / pulseCount) + Math.random() * 0.3,
            speed: (0.0016 + Math.random() * 0.0012) * (isMobile ? 1.2 : 1),
            len: isMobile ? 35 : 55
          });
        }
      }
    }

    function getInterpolatedPoint(track, progress) {
      const targetDist = ((progress % 1) + 1) % 1 * track.totalLen;
      for (let s = 0; s < track.segments.length; s++) {
        const seg = track.segments[s];
        if (targetDist >= seg.cumDist && targetDist <= seg.cumDist + seg.dist) {
          const segProgress = (targetDist - seg.cumDist) / seg.dist;
          return {
            x: seg.p1.x + (seg.p2.x - seg.p1.x) * segProgress,
            y: seg.p1.y + (seg.p2.y - seg.p1.y) * segProgress
          };
        }
      }
      return track.points[0];
    }

    function getThemeStyles() {
      const activeTheme = document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      if (activeTheme === 'dark') {
        return {
          gridCross: 'rgba(56, 189, 248, 0.12)',
          trackBase: 'rgba(37, 99, 235, 0.14)',
          trackHighlight: 'rgba(56, 189, 248, 0.45)',
          terminalOuter: 'rgba(56, 189, 248, 0.25)',
          terminalInner: '#38bdf8',
          headGlow: '#06b6d4',
          headCore: '#ffffff',
          tailColorStart: '#38bdf8',
          tailColorEnd: 'rgba(37, 99, 235, 0)'
        };
      } else {
        return {
          gridCross: 'rgba(30, 64, 175, 0.08)',
          trackBase: 'rgba(37, 99, 235, 0.10)',
          trackHighlight: 'rgba(2, 132, 199, 0.40)',
          terminalOuter: 'rgba(37, 99, 235, 0.22)',
          terminalInner: '#0284c7',
          headGlow: '#0284c7',
          headCore: '#1e40af',
          tailColorStart: '#0284c7',
          tailColorEnd: 'rgba(30, 64, 175, 0)'
        };
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const theme = getThemeStyles();

      // 1. Metric CAD Grid Crosses (+)
      ctx.lineWidth = 1;
      ctx.strokeStyle = theme.gridCross;
      for (let i = 0; i < gridCrosses.length; i++) {
        const c = gridCrosses[i];
        const sz = c.size;
        ctx.beginPath();
        ctx.moveTo(c.x - sz, c.y);
        ctx.lineTo(c.x + sz, c.y);
        ctx.moveTo(c.x, c.y - sz);
        ctx.lineTo(c.x, c.y + sz);
        ctx.stroke();
      }

      // 2. Structured Circuit Tracks
      for (let t = 0; t < tracks.length; t++) {
        const track = tracks[t];

        let isNearMouse = false;
        if (mouse.active) {
          for (let p = 0; p < track.points.length; p++) {
            const dx = mouse.x - track.points[p].x;
            const dy = mouse.y - track.points[p].y;
            if (dx * dx + dy * dy < 14400) { // within 120px
              isNearMouse = true;
              break;
            }
          }
        }

        ctx.beginPath();
        ctx.moveTo(track.points[0].x, track.points[0].y);
        for (let p = 1; p < track.points.length; p++) {
          ctx.lineTo(track.points[p].x, track.points[p].y);
        }
        ctx.strokeStyle = isNearMouse ? theme.trackHighlight : theme.trackBase;
        ctx.lineWidth = isNearMouse ? 1.5 : 1;
        ctx.stroke();

        // Terminal Pads (matching TM logo circuit pin)
        for (let tm = 0; tm < track.terminals.length; tm++) {
          const term = track.terminals[tm];
          if (term.x > 0 && term.x < width && term.y > 0 && term.y < height) {
            ctx.beginPath();
            ctx.arc(term.x, term.y, 4, 0, Math.PI * 2);
            ctx.strokeStyle = theme.terminalOuter;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(term.x, term.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = theme.terminalInner;
            ctx.fill();
          }
        }
      }

      // 3. High-Speed Optical Vector Packets
      if (!prefersReducedMotion.matches) {
        for (let p = 0; p < pulses.length; p++) {
          const pulse = pulses[p];
          const track = tracks[pulse.trackIndex];
          if (!track) continue;

          pulse.progress += pulse.speed;
          if (pulse.progress > 1) {
            pulse.progress = 0;
          }

          const head = getInterpolatedPoint(track, pulse.progress);
          const tailProgress = pulse.progress - (pulse.len / track.totalLen);
          const tail = getInterpolatedPoint(track, tailProgress);

          const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          grad.addColorStop(0, theme.tailColorEnd);
          grad.addColorStop(1, theme.tailColorStart);

          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = theme.headCore;
          ctx.shadowColor = theme.headGlow;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 4. Interactive Target Reticle when Hovering
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = theme.trackHighlight;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = theme.terminalInner;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(mouse.x - 22, mouse.y);
        ctx.lineTo(mouse.x - 8, mouse.y);
        ctx.moveTo(mouse.x + 8, mouse.y);
        ctx.lineTo(mouse.x + 22, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 22);
        ctx.lineTo(mouse.x, mouse.y - 8);
        ctx.moveTo(mouse.x, mouse.y + 8);
        ctx.lineTo(mouse.x, mouse.y + 22);
        ctx.stroke();
      }
    }

    function animate() {
      if (!isVisible) return;
      draw();
      if (!prefersReducedMotion.matches) {
        animationId = requestAnimationFrame(animate);
      }
    }

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    heroSection.addEventListener('click', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let nearestTrack = 0;
      let minD = 999999;
      for (let t = 0; t < tracks.length; t++) {
        for (let p = 0; p < tracks[t].points.length; p++) {
          const dx = clickX - tracks[t].points[p].x;
          const dy = clickY - tracks[t].points[p].y;
          const d = dx * dx + dy * dy;
          if (d < minD) {
            minD = d;
            nearestTrack = t;
          }
        }
      }

      pulses.push({
        trackIndex: nearestTrack,
        progress: 0,
        speed: 0.0075,
        len: 80
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId && !prefersReducedMotion.matches) {
          animationId = requestAnimationFrame(animate);
        } else if (!isVisible && animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(heroSection);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    });

    resize();
    draw();
    if (!prefersReducedMotion.matches) {
      animationId = requestAnimationFrame(animate);
    }
  }

  // ===================================================================
  // 7. Interactive Pipeline Trace Simulator (AI Animation Gimmick)
  // ===================================================================
  function initPipelineTraceSimulator() {
    const simulateBtn = document.getElementById('simulateTraceBtn');
    const statusBadge = document.getElementById('pipelineStatusBadge');
    const statusText = document.getElementById('pipelineStatusText');
    const telemetryChip = document.getElementById('telemetryChip');
    const telemetryText = document.getElementById('telemetryText');
    const telemetryLatency = document.getElementById('telemetryLatency');
    const pulse1 = document.getElementById('pulse1');
    const pulse2 = document.getElementById('pulse2');
    const scanLaser = document.getElementById('engineScanLaser');
    const node1Box = document.getElementById('node1Box');
    const node2Box = document.getElementById('node2Box');
    const node3Box = document.getElementById('node3Box');

    if (!simulateBtn) return;

    let isRunning = false;

    const traceScenarios = {
      en: {
        intake: {
          steps: [
            { time: '+18ms', chip: 'INGEST', msg: 'Inbound API & webhook payload received', source: true, lat: '18ms' },
            { time: '+48ms', chip: 'FILTER', msg: 'Deterministic schema parsing & PII mask applied', pulse1: true, lat: '48ms' },
            { time: '+88ms', chip: 'REASONING', msg: 'Intent score 0.96 · Intent & qualification validated', tm: true, laser: true, lat: '88ms' },
            { time: '+138ms', chip: 'COMMIT', msg: 'Lead written & opportunity synchronized to CRM', pulse2: true, dest: true, lat: '138ms' }
          ],
          finalLatency: '138ms',
          summary: 'Inquiry ingested <2s · Auto-qualified intent · Synchronized with core CRM'
        },
        reconcile: {
          steps: [
            { time: '+12ms', chip: 'INGEST', msg: '1,420 invoice line-items streamed from core ERP', source: true, lat: '12ms' },
            { time: '+44ms', chip: 'MATCH', msg: 'Cross-verifying line-items with multi-currency banking feeds', pulse1: true, lat: '44ms' },
            { time: '+89ms', chip: 'AUDIT', msg: 'Deterministic math proof · Zero variance exceptions', tm: true, laser: true, lat: '89ms' },
            { time: '+142ms', chip: 'COMMIT', msg: 'Zero-touch journal entry posted to accounting ledger', pulse2: true, dest: true, lat: '142ms' }
          ],
          finalLatency: '142ms',
          summary: '1,420 invoice line-items matched · 0 discrepancy exceptions · Posted directly to accounting ledger'
        },
        waste: {
          steps: [
            { time: '+14ms', chip: 'EVENT', msg: 'Database webhook: Inventory SKU marked OUT OF STOCK', source: true, lat: '14ms' },
            { time: '+38ms', chip: 'RESOLVE', msg: 'Matching SKU to active ad network campaign groups', pulse1: true, lat: '38ms' },
            { time: '+72ms', chip: 'GUARDRAIL', msg: 'Zero-stock burn alert triggered · Out-of-stock anomaly isolated', tm: true, laser: true, lat: '72ms' },
            { time: '+108ms', chip: 'COMMIT', msg: 'Campaign groups paused in 108ms · Capital waste preserved', pulse2: true, dest: true, lat: '108ms' }
          ],
          finalLatency: '108ms',
          summary: 'Zero-stock event detected in database · Associated ad group paused within 108ms · Capital waste prevented'
        }
      },
      es: {
        intake: {
          steps: [
            { time: '+18ms', chip: 'INGEST', msg: 'Carga útil recibida vía API y webhook entrante', source: true, lat: '18ms' },
            { time: '+48ms', chip: 'FILTER', msg: 'Validación determinista de esquema y máscara de datos privados', pulse1: true, lat: '48ms' },
            { time: '+88ms', chip: 'REASONING', msg: 'Puntuación 0.96 · Calificación de intención y presupuesto validada', tm: true, laser: true, lat: '88ms' },
            { time: '+138ms', chip: 'COMMIT', msg: 'Oportunidad registrada y sincronizada en el CRM central', pulse2: true, dest: true, lat: '138ms' }
          ],
          finalLatency: '138ms',
          summary: 'Solicitud recibida <2s · Intención y presupuesto calificados · Sincronizado con CRM central'
        },
        reconcile: {
          steps: [
            { time: '+12ms', chip: 'INGEST', msg: '1,420 partidas de facturas transmitidas desde el ERP central', source: true, lat: '12ms' },
            { time: '+44ms', chip: 'MATCH', msg: 'Verificación cruzada de partidas con feeds bancarios multidivisa', pulse1: true, lat: '44ms' },
            { time: '+89ms', chip: 'AUDIT', msg: 'Prueba matemática determinista · Cero excepciones de varianza', tm: true, laser: true, lat: '89ms' },
            { time: '+142ms', chip: 'COMMIT', msg: 'Asiento contable registrado automáticamente en el libro mayor', pulse2: true, dest: true, lat: '142ms' }
          ],
          finalLatency: '142ms',
          summary: '1,420 partidas cruzadas · 0 discrepancias · Registrado directamente en el libro contable'
        },
        waste: {
          steps: [
            { time: '+14ms', chip: 'EVENT', msg: 'Webhook de base de datos: SKU marcado SIN EXISTENCIAS', source: true, lat: '14ms' },
            { time: '+38ms', chip: 'RESOLVE', msg: 'Vinculación de SKU con grupos de campaña activos en redes', pulse1: true, lat: '38ms' },
            { time: '+72ms', chip: 'GUARDRAIL', msg: 'Alerta de gasto en inventario agotado activada · Anomalía aislada', tm: true, laser: true, lat: '72ms' },
            { time: '+108ms', chip: 'COMMIT', msg: 'Grupos de campaña pausados en 108ms · Desperdicio evitado', pulse2: true, dest: true, lat: '108ms' }
          ],
          finalLatency: '108ms',
          summary: 'Cero existencias detectado en BD · Grupo de anuncios pausado en 108ms · Capital preservado'
        }
      }
    };

    function clearVisuals() {
      node1Box?.classList.remove('trace-active-source');
      node2Box?.classList.remove('trace-active-tm');
      node3Box?.classList.remove('trace-active-dest');
      pulse1?.classList.remove('pulse-active');
      pulse2?.classList.remove('pulse-active');
      scanLaser?.classList.remove('laser-active');
    }

    function runTrace(workflowKey) {
      if (isRunning) return;
      isRunning = true;

      const activeKey = workflowKey || document.querySelector('.bp-tab.active')?.getAttribute('data-wf') || currentWorkflowKey || 'intake';
      const scenarioMap = traceScenarios[currentLang] || traceScenarios.en;
      const scenario = scenarioMap[activeKey] || scenarioMap.intake;

      simulateBtn.disabled = true;
      simulateBtn.classList.add('is-running');
      if (statusBadge) statusBadge.classList.add('status-running');
      if (statusText) statusText.textContent = (currentLang === 'es') ? 'EJECUTANDO RUTA...' : 'EXECUTING TRACE...';

      clearVisuals();

      let stepIndex = 0;
      const stepInterval = 320;

      function executeStep() {
        if (stepIndex >= scenario.steps.length) {
          setTimeout(() => {
            clearVisuals();
            if (statusBadge) statusBadge.classList.remove('status-running');
            if (statusText) statusText.textContent = (currentLang === 'es') ? 'SISTEMA ACTIVO' : 'SYSTEM ACTIVE';
            if (telemetryChip) {
              telemetryChip.className = 'telemetry-chip chip-success';
              telemetryChip.textContent = (currentLang === 'es') ? 'REGISTRO DE EVENTO' : 'EVENT LOG';
            }
            if (telemetryText) {
              telemetryText.textContent = scenario.summary;
            }
            if (telemetryLatency) {
              telemetryLatency.textContent = scenario.finalLatency;
            }
            simulateBtn.disabled = false;
            simulateBtn.classList.remove('is-running');
            isRunning = false;
          }, 1200);
          return;
        }

        const step = scenario.steps[stepIndex];

        if (telemetryChip) {
          telemetryChip.className = 'telemetry-chip chip-processing';
          telemetryChip.textContent = step.chip;
        }
        if (telemetryText) {
          telemetryText.textContent = `${step.time} · ${step.msg}`;
        }
        if (telemetryLatency && step.lat) {
          telemetryLatency.textContent = step.lat;
        }

        if (step.source && node1Box) {
          node1Box.classList.add('trace-active-source');
        }
        if (step.pulse1 && pulse1) {
          pulse1.classList.remove('pulse-active');
          void pulse1.offsetWidth;
          pulse1.classList.add('pulse-active');
        }
        if (step.tm && node2Box) {
          node2Box.classList.add('trace-active-tm');
        }
        if (step.laser && scanLaser) {
          scanLaser.classList.remove('laser-active');
          void scanLaser.offsetWidth;
          scanLaser.classList.add('laser-active');
        }
        if (step.pulse2 && pulse2) {
          pulse2.classList.remove('pulse-active');
          void pulse2.offsetWidth;
          pulse2.classList.add('pulse-active');
        }
        if (step.dest && node3Box) {
          node3Box.classList.add('trace-active-dest');
        }

        stepIndex++;
        setTimeout(executeStep, stepInterval);
      }

      executeStep();
    }

    simulateBtn.addEventListener('click', () => runTrace());

    window.addEventListener('tm-workflow-change', () => {
      if (!isRunning) {
        if (pulse1) {
          pulse1.classList.remove('pulse-active');
          void pulse1.offsetWidth;
          pulse1.classList.add('pulse-active');
        }
        setTimeout(() => {
          if (scanLaser) {
            scanLaser.classList.remove('laser-active');
            void scanLaser.offsetWidth;
            scanLaser.classList.add('laser-active');
          }
        }, 150);
        setTimeout(() => {
          if (pulse2) {
            pulse2.classList.remove('pulse-active');
            void pulse2.offsetWidth;
            pulse2.classList.add('pulse-active');
          }
        }, 300);
      }
    });
  }

  // Initialize AI Animation Gimmicks
  initHeroVectorEngine();
  initPipelineTraceSimulator();
});
