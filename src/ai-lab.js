// ─────────────────────────────────────────────────────────────
//  Novu Works — Interactive AI Growth & Prompt Engineering Lab
//  Live interactive showcase demonstrating Fabian's 3x creative
//  velocity prompt architecture and algorithmic bidding models.
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';

export class AIGrowthLab {
  constructor(containerEl) {
    this.container = containerEl;
    this.selectedCohort = 'fintech';
    this.selectedTrigger = 'attribution';
    this.selectedModel = 'claude-3-5';
    this.isGenerating = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="ai-lab-card glass-panel">
        <div class="ai-lab-header">
          <div class="ai-lab-badge">Live Interactive Prototype</div>
          <h3 class="ai-lab-title">Generative AI Creative Velocity & Prompt Matrix</h3>
          <p class="ai-lab-desc">
            Test Fabian's proprietary prompt architecture used to produce 20+ psychological creative variants and algorithmic bid rules in seconds—delivering 3x iteration tempo and 122% target performance.
          </p>
        </div>

        <div class="ai-lab-controls">
          <!-- Cohort Selector -->
          <div class="control-group">
            <label class="control-label">Target Audience Cohort:</label>
            <div class="pill-group" id="cohort-pills">
              <button type="button" class="lab-pill active" data-cohort="fintech">Financial Consumers (LTV Focused)</button>
              <button type="button" class="lab-pill" data-cohort="saas-cto">Enterprise CTOs & Eng Leaders</button>
              <button type="button" class="lab-pill" data-cohort="dtc-growth">High-Growth Founders / DTC</button>
            </div>
          </div>

          <!-- Psychological Hook Trigger -->
          <div class="control-group">
            <label class="control-label">Psychological Angle / Friction Trigger:</label>
            <div class="pill-group" id="trigger-pills">
              <button type="button" class="lab-pill active" data-trigger="attribution">Attribution Loss & Blind Ad Spend</button>
              <button type="button" class="lab-pill" data-trigger="velocity">Slow Engineering & Launch Friction</button>
              <button type="button" class="lab-pill" data-trigger="cost">Cloud Inefficiency & Skyrocketing CAC</button>
            </div>
          </div>

          <!-- Action Button -->
          <button type="button" class="primary-btn pulse-glow" id="btn-run-ai-synthesis" style="width: 100%; margin-top: 10px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span id="ai-btn-text">Synthesize 3x Creative & Algorithmic Matrix</span>
          </button>
        </div>

        <!-- Output Terminal Window -->
        <div class="ai-output-terminal" id="ai-terminal-output">
          <div class="terminal-bar">
            <span class="term-dot red"></span>
            <span class="term-dot yellow"></span>
            <span class="term-dot green"></span>
            <span class="term-title">ai-growth-engine.ts — Synthesized Output</span>
          </div>
          <div class="terminal-body" id="ai-code-display">
            <!-- Initial prompt display -->
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.generateResults();
  }

  bindEvents() {
    this.container.querySelectorAll('#cohort-pills .lab-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('#cohort-pills .lab-pill').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCohort = btn.dataset.cohort;
        audio.click(1200);
        this.generateResults();
      });
    });

    this.container.querySelectorAll('#trigger-pills .lab-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('#trigger-pills .lab-pill').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedTrigger = btn.dataset.trigger;
        audio.click(1400);
        this.generateResults();
      });
    });

    const runBtn = this.container.querySelector('#btn-run-ai-synthesis');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        audio.confirm();
        this.simulateAIGeneration();
      });
    }
  }

  simulateAIGeneration() {
    const btnText = this.container.querySelector('#ai-btn-text');
    const display = this.container.querySelector('#ai-code-display');
    if (this.isGenerating) return;

    this.isGenerating = true;
    if (btnText) btnText.textContent = 'Synthesizing with LLM Engine...';
    if (display) {
      display.innerHTML = `<span class="stream-cursor">▊ Parsing cohort data layers & optimizing multivariate angles...</span>`;
    }

    setTimeout(() => {
      this.isGenerating = false;
      if (btnText) btnText.textContent = 'Synthesize 3x Creative & Algorithmic Matrix';
      this.generateResults();
      audio.chime(4);
    }, 450);
  }

  generateResults() {
    const display = this.container.querySelector('#ai-code-display');
    if (!display) return;

    const templates = {
      fintech: {
        attribution: {
          hook: "Most fintech media buys lose 28% of their attribution signal after iOS 14. Here is how server-side CAPI fixes your blended CAC.",
          variants: [
            { angle: "The Silent Ad Waste (Loss Aversion)", copy: "Are you bidding against ghost conversions? Why client-side pixels inflate your CAC by 34%—and how first-party BigQuery telemetry reveals your true high-LTV borrowers.", ctr: "4.2% Est. CTR" },
            { angle: "Speed & Frictionless KYC (Direct Solution)", copy: "Every 100ms delay in loan qualification drops conversion by 7%. How our sub-second post-click funnel increased approved accounts by 24%.", ctr: "3.8% Est. CTR" },
            { angle: "The Algorithmic Bid Rule (Technical Proof)", copy: "Rule #402: Auto-reallocate 40% of ad spend when 7-day cohort payback < 42 days. Powered by real-time conversion API ingestion.", ctr: "3.5x ROAS Target" }
          ]
        },
        velocity: {
          hook: "From loan application to funded in 90 seconds: how algorithmic routing changes consumer decision velocity.",
          variants: [
            { angle: "Instant Gratification (Micro-Commitment)", copy: "Check rate without credit score impact. 1-tap pre-qualification mapped directly to Meta Conversions API.", ctr: "5.1% Est. CTR" },
            { angle: "Comparative Trust (Social Proof)", copy: "Why 80+ companies switched from static lead forms to dynamic multi-step financial funnels.", ctr: "4.4% Est. CTR" }
          ]
        },
        cost: {
          hook: "How we outpaced quarterly performance targets by 122% at Money Group (Full-Time) by eliminating low-intent ad auctions.",
          variants: [
            { angle: "Capital Efficiency (Founder Hook)", copy: "Stop spending $150 to acquire a customer worth $120. Unit-economics modeling directly informing ad set budgets.", ctr: "4.8% Est. CTR" }
          ]
        }
      },
      'saas-cto': {
        attribution: {
          hook: "Engineering leaders don't buy from generic ad copy. They convert on architecture specs and clear SLA benchmarks.",
          variants: [
            { angle: "Zero Single Points of Failure", copy: "99.99% uptime isn't luck—it's automated multi-region failover. See the exact Cloud Run / Kubernetes deployment matrix.", ctr: "3.9% Est. CTR" },
            { angle: "The Microservices Migration Audit", copy: "Cut monthly GCP spend by 40% without touching production traffic. Download our production-tested FinOps checklist.", ctr: "4.1% Est. CTR" }
          ]
        },
        velocity: {
          hook: "Ship in 4 weeks instead of 4 months. How disciplined User Story mapping accelerates engineering sprints by 3.2x.",
          variants: [
            { angle: "Eliminating Product Debt", copy: "Why 80+ startups trusted Fabian Velez to architect their initial technical infrastructure from day one.", ctr: "4.6% Est. CTR" }
          ]
        },
        cost: {
          hook: "Are your AWS/GCP bills bleeding cash? Architectural redesign to slash serverless overhead by 45%.",
          variants: [
            { angle: "The 30-Day Cloud Audit", copy: "Postgres index tuning, Redis caching tiers, and edge caching at Cloudflare. High impact, zero fluff.", ctr: "4.0% Est. CTR" }
          ]
        }
      },
      'dtc-growth': {
        attribution: {
          hook: "Scale past $250k/mo media pacing without watching your blended ROAS crash through the floor.",
          variants: [
            { angle: "Attribution Reconciliation", copy: "Triple Whale vs GA4 vs Meta Ads Manager: how to build a unified first-party BigQuery data lake for true ROAS truth.", ctr: "5.4% Est. CTR" },
            { angle: "Creative Fatigue Crusher", copy: "Generate and validate 20+ psychological creative variants weekly with automated LLM prompt pipelines.", ctr: "4.9% Est. CTR" }
          ]
        },
        velocity: {
          hook: "3x weekly creative iteration tempo: how top 1% media buyers never run out of winning ad hooks.",
          variants: [
            { angle: "The Psychological Trigger Matrix", copy: "Map customer reviews into 5 emotional categories: skepticism, vanity, time-scarcity, loss-aversion, and identity.", ctr: "5.2% Est. CTR" }
          ]
        },
        cost: {
          hook: "Compress blended CAC by 28% through post-click landing page micro-funnels.",
          variants: [
            { angle: "Frictionless Checkout", copy: "Sub-second LCP and dynamic address autofill for 24% conversion rate lift.", ctr: "4.7% Est. CTR" }
          ]
        }
      }
    };

    const cohortData = templates[this.selectedCohort] || templates.fintech;
    const activeData = cohortData[this.selectedTrigger] || cohortData.attribution;

    display.innerHTML = `
<pre><code class="lang-json">// Generated via Fabian's Prompt Architecture Framework
{
  "status": "200_OK",
  "cohort": "${this.selectedCohort.toUpperCase()}",
  "trigger": "${this.selectedTrigger.toUpperCase()}",
  "primaryHook": "${activeData.hook}",
  "creativeMatrix": [
${activeData.variants.map((v, i) => `    {
      "id": "ANGLE_${String(i + 1).padStart(2, '0')}",
      "strategy": "${v.angle}",
      "copyVariant": "${v.copy}",
      "projectedImpact": "${v.ctr}"
    }`).join(',\n')}
  ],
  "algorithmicBiddingRule": {
    "condition": "IF 3_day_cvr > 1.2 * baseline AND event_match_quality >= 9.0",
    "action": "INCREASE_BUDGET_PACING(+18%)",
    "safetyGuard": "CAP_BLENDED_CAC($48.00)"
  }
}</code></pre>
    `;
  }
}
