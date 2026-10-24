// ─────────────────────────────────────────────────────────────
//  Novu Works — Architectural ROI Planner & System Scoper
//  A genuine executive productivity tool for founders, CTOs & hiring managers.
// ─────────────────────────────────────────────────────────────

import { DISCIPLINES, ROI_PRESETS, PROFILE } from './data.js';
import { audio } from './audio.js';

export class ArchitecturePlanner {
  constructor(containerEl, onPillarHighlight) {
    this.container = containerEl;
    this.onPillarHighlight = onPillarHighlight;

    // Current state
    this.selectedStage = 'seed';
    this.selectedPillars = new Set(['software', 'infra', 'seo']);
    this.teamSize = 4;
    this.cloudMonthlySpend = 2500;

    this.render();
  }

  setPreset(presetId) {
    const preset = ROI_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    this.selectedPillars = new Set(preset.pillars);
    audio.confirm();
    this.update();
  }

  togglePillar(pillarId) {
    if (this.selectedPillars.has(pillarId)) {
      if (this.selectedPillars.size > 1) {
        this.selectedPillars.delete(pillarId);
      }
    } else {
      this.selectedPillars.add(pillarId);
    }
    audio.click(1400);
    if (this.onPillarHighlight) {
      this.onPillarHighlight(pillarId);
    }
    this.update();
  }

  calculateMetrics() {
    const pCount = this.selectedPillars.size;
    const hasAI = this.selectedPillars.has('ai');
    const hasAuto = this.selectedPillars.has('automation');
    const hasInfra = this.selectedPillars.has('infra');
    const hasSEO = this.selectedPillars.has('seo');

    // 1. Time to delivery
    let deliveryWeeks = 4;
    if (this.selectedStage === 'seed') deliveryWeeks = Math.max(3, pCount * 1.5);
    else if (this.selectedStage === 'series-a') deliveryWeeks = Math.max(6, pCount * 2.2);
    else deliveryWeeks = Math.max(8, pCount * 2.8);

    // 2. Velocity multiplier
    let velocityBoost = 1.8 + (hasAuto ? 0.8 : 0) + (hasAI ? 0.9 : 0) + (hasInfra ? 0.5 : 0);

    // 3. Projected monthly ops/cloud cost savings
    let estimatedMonthlySavings = 0;
    if (hasInfra) estimatedMonthlySavings += this.cloudMonthlySpend * 0.38;
    if (hasAuto) estimatedMonthlySavings += this.teamSize * 650; // hours saved in automation
    if (hasAI) estimatedMonthlySavings += 1400; // customer/ops triage reduction

    // 4. Annual financial impact
    const annualSavings = Math.round(estimatedMonthlySavings * 12);

    return {
      deliveryWeeks: Math.round(deliveryWeeks),
      velocityBoost: velocityBoost.toFixed(1) + 'x',
      annualSavings: annualSavings.toLocaleString(),
      slaTarget: '99.99%',
      activeCount: pCount
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="planner-card glass-panel">
        <div class="planner-header">
          <div class="planner-badge">Executive Utility</div>
          <h2 class="planner-title">System Architecture & ROI Planner</h2>
          <p class="planner-desc">Configure your engineering goals to calculate architectural topology, delivery velocity, and operational cost savings.</p>
        </div>

        <!-- Presets Row -->
        <div class="planner-presets">
          <span class="preset-label">Templates:</span>
          ${ROI_PRESETS.map((p) => `
            <button type="button" class="preset-pill" data-preset="${p.id}">
              ${p.name}
            </button>
          `).join('')}
        </div>

        <!-- Stage Selector -->
        <div class="planner-row">
          <label class="section-label">Company Stage & Scope</label>
          <div class="stage-toggles">
            <button type="button" class="stage-btn active" data-stage="seed">
              <strong>Pre-Seed / Seed</strong>
              <span>Fast MVP & Launch</span>
            </button>
            <button type="button" class="stage-btn" data-stage="series-a">
              <strong>Series A / Growth</strong>
              <span>Scale & Reliability</span>
            </button>
            <button type="button" class="stage-btn" data-stage="enterprise">
              <strong>Enterprise / Scale</strong>
              <span>Optimization & FinOps</span>
            </button>
          </div>
        </div>

        <!-- Disciplines Matrix (Checkboxes) -->
        <div class="planner-row">
          <label class="section-label">Select Consulting & Technical Pillars</label>
          <div class="pillars-grid">
            ${DISCIPLINES.map((d) => `
              <button type="button" class="pillar-chip ${this.selectedPillars.has(d.id) ? 'selected' : ''}" data-pillar="${d.id}" style="--chip-color: ${d.color};">
                <span class="chip-dot"></span>
                <span class="chip-name">${d.number} · ${d.title}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Live Metrics Cards -->
        <div class="metrics-grid">
          <div class="metric-box">
            <span class="metric-kicker">Deployment Velocity</span>
            <div class="metric-val text-gradient" id="metric-velocity">3.2x</div>
            <span class="metric-sub">Faster sprint delivery</span>
          </div>
          <div class="metric-box">
            <span class="metric-kicker">Est. Annual Value</span>
            <div class="metric-val text-gradient" id="metric-savings">$42,000</div>
            <span class="metric-sub">Saved in infra & manual ops</span>
          </div>
          <div class="metric-box">
            <span class="metric-kicker">Target Schedule</span>
            <div class="metric-val text-gradient" id="metric-timeline">5 Weeks</div>
            <span class="metric-sub">From kickoff to production</span>
          </div>
          <div class="metric-box">
            <span class="metric-kicker">Architecture Target</span>
            <div class="metric-val text-gradient" id="metric-sla">99.99%</div>
            <span class="metric-sub">Zero single points of failure</span>
          </div>
        </div>

        <!-- Architecture Topology Blueprint -->
        <div class="blueprint-section">
          <div class="blueprint-header">
            <span class="blueprint-title">System Architecture Topology (Interactive Blueprint)</span>
            <button type="button" class="action-btn copy-btn" id="btn-copy-blueprint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy Architectural Spec</span>
            </button>
          </div>
          <div class="blueprint-display" id="blueprint-code"></div>
        </div>

        <!-- CTA footer -->
        <div class="planner-footer">
          <a href="mailto:${PROFILE.emails.primary}?subject=Executive%20ROI%20Architecture%20Inquiry%20-%20Fabian%20Velez" class="primary-btn pulse-glow">
            <span>Execute This Architecture with Fabian</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <span class="guarantee-note">8+ years · 80+ startups mentored · Puerto Rico & Remote</span>
        </div>
      </div>
    `;

    this.bindEvents();
    this.update();
  }

  bindEvents() {
    // Stage buttons
    this.container.querySelectorAll('.stage-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.stage-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedStage = btn.dataset.stage;
        audio.click(1100);
        this.update();
      });
    });

    // Preset pills
    this.container.querySelectorAll('.preset-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setPreset(btn.dataset.preset);
      });
    });

    // Pillar chips
    this.container.querySelectorAll('.pillar-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.togglePillar(chip.dataset.pillar);
      });
    });

    // Copy blueprint
    const copyBtn = this.container.querySelector('#btn-copy-blueprint');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = this.generateBlueprintMarkdown();
        navigator.clipboard.writeText(text).then(() => {
          audio.confirm();
          const span = copyBtn.querySelector('span');
          const original = span.textContent;
          span.textContent = 'Copied to Clipboard!';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            span.textContent = original;
            copyBtn.classList.remove('copied');
          }, 2000);
        });
      });
    }
  }

  generateBlueprintMarkdown() {
    const metrics = this.calculateMetrics();
    const activeNames = Array.from(this.selectedPillars).map(
      (id) => DISCIPLINES.find((d) => d.id === id)?.title
    );

    return `# NOVU WORKS — ARCHITECTURAL SPECIFICATION & BLUEPRINT
Prepared by: Fabian Velez (Technical Consultant & Senior Software Engineer)
Scope: ${this.selectedStage.toUpperCase()} Engineering Roadmap
Selected Pillars (${metrics.activeCount}): ${activeNames.join(', ')}

============================================================
PROJECTED VALUE & IMPACT:
• Delivery Velocity:   ${metrics.velocityBoost}
• Est. Annual Savings: $${metrics.annualSavings}
• Delivery Timeline:   ${metrics.deliveryWeeks} Weeks
• Target SLA:          ${metrics.slaTarget}

SYSTEM TOPOLOGY:
[ Global Users / Tesla HUD / Devices ]
               │
               ▼  (Edge Caching & SSL)
   [ Cloudflare / Edge CDN ]
               │
   ┌───────────┴───────────┐
   ▼                       ▼
[ Next.js SSR Web ]    [ Event Ingress API ]
   │                       │
   └───────────┬───────────┘
               ▼
[ Microservices & AI Agent Fabric ]
   ├── High-throughput Cloud Compute (GCP / Firebase)
   ├── Vector Knowledge Base (RAG)
   └── Automated Multi-system Webhooks (CRM/Data)
               │
               ▼
[ Resilient Persistence & Cache ]
   ├── PostgreSQL / ACID Data Store
   └── Redis Low-Latency Distributed Cache
============================================================
Contact: ${PROFILE.emails.primary} | https://${PROFILE.domain}
Novu Works · Puerto Rico · Remote Worldwide
`;
  }

  update() {
    const metrics = this.calculateMetrics();

    // Update Chips
    this.container.querySelectorAll('.pillar-chip').forEach((chip) => {
      chip.classList.toggle('selected', this.selectedPillars.has(chip.dataset.pillar));
    });

    // Update Metric values
    const velEl = this.container.querySelector('#metric-velocity');
    const savEl = this.container.querySelector('#metric-savings');
    const timEl = this.container.querySelector('#metric-timeline');
    const slaEl = this.container.querySelector('#metric-sla');

    if (velEl) velEl.textContent = metrics.velocityBoost;
    if (savEl) savEl.textContent = `$${metrics.annualSavings}`;
    if (timEl) timEl.textContent = `${metrics.deliveryWeeks} Weeks`;
    if (slaEl) slaEl.textContent = metrics.slaTarget;

    // Update Blueprint display
    const codeEl = this.container.querySelector('#blueprint-code');
    if (codeEl) {
      codeEl.innerHTML = `
<pre><code class="ascii-diagram">
[ Client Traffic & Touch Interfaces ]
           │
           ▼ (Edge Caching, Security & Sub-50ms Routing)
[ Cloudflare / Global Anycast CDN ]
           │
 ┌─────────┴─────────┐
 ▼                   ▼
[ Edge SSR App ]    [ High-Concurrency API ]
 │                   │
 └─────────┬─────────┘
           ▼
[ Resilient Infrastructure & AI Orchestration ]
 ├── Containerized Microservices (${Array.from(this.selectedPillars).slice(0, 3).join(', ')})
 ├── Real-Time Webhook Fabric & Event Brokers
 └── Vector Index & LLM Safety Guards
           │
           ▼
[ Scalable Storage Layer ]
 └── PostgreSQL + Multi-region Replicas (99.99% SLA)
</code></pre>
      `;
    }
  }
}
