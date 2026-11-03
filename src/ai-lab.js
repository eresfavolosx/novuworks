// ─────────────────────────────────────────────────────────────
//  Novu Works — Interactive Generative Prototype & Synthesis Lab
//  Live interactive showcase demonstrating Fabian's frontier
//  prompt orchestration and multi-perspective synthesis matrix.
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
          <h3 class="ai-lab-title">Generative Storytelling &amp; Multi-Perspective Synthesis Lab</h3>
          <p class="ai-lab-desc">
            Test Fabian's frontier prompt orchestration architecture used to synthesize 20+ human-centric narrative variants and tool-calling rules in seconds—turning open-ended questions into participatory stories.
          </p>
        </div>

        <div class="ai-lab-controls">
          <!-- Cohort Selector -->
          <div class="control-group">
            <label class="control-label">Human Experience Domain:</label>
            <div class="pill-group" id="cohort-pills">
              <button type="button" class="lab-pill active" data-cohort="fintech">Everyday Financial Clarity</button>
              <button type="button" class="lab-pill" data-cohort="makers">Creative Technologists &amp; Makers</button>
              <button type="button" class="lab-pill" data-cohort="dtc-growth">Lifelong Learners &amp; Educators</button>
            </div>
          </div>

          <!-- Psychological Hook Trigger -->
          <div class="control-group">
            <label class="control-label">Creative &amp; Human Intention:</label>
            <div class="pill-group" id="trigger-pills">
              <button type="button" class="lab-pill active" data-trigger="attribution">Clarity Over Complexity</button>
              <button type="button" class="lab-pill" data-trigger="velocity">Rapid Interactive Prototyping</button>
              <button type="button" class="lab-pill" data-trigger="cost">Empathetic Accessibility</button>
            </div>
          </div>

          <!-- Action Button -->
          <button type="button" class="primary-btn pulse-glow" id="btn-run-ai-synthesis" style="width: 100%; margin-top: 10px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span id="ai-btn-text">Synthesize Interactive Narrative &amp; Tool-Calling Matrix</span>
          </button>
        </div>

        <!-- Output Terminal Window -->
        <div class="ai-output-terminal" id="ai-terminal-output">
          <div class="terminal-bar">
            <span class="term-dot red"></span>
            <span class="term-dot yellow"></span>
            <span class="term-dot green"></span>
            <span class="term-title">frontier-synthesis-engine.ts — Synthesized Output</span>
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
    if (btnText) btnText.textContent = 'Synthesizing with Frontier Model...';
    if (display) {
      display.innerHTML = `<span class="stream-cursor">▊ Synthesizing human context &amp; orchestrating narrative perspectives...</span>`;
    }

    setTimeout(() => {
      this.isGenerating = false;
      if (btnText) btnText.textContent = 'Synthesize Interactive Narrative & Tool-Calling Matrix';
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
          hook: "What if household financial decisions felt like a calm, transparent conversation rather than an intimidating wall of fine print?",
          variants: [
            { angle: "Empathetic Transparency (Emotional Depth)", copy: "See every step of your financial journey in plain language—interactive sliders let you explore 'what-if' scenarios at your own pace.", ctr: "96% Clarity Score" },
            { angle: "Zero-Jargon Guidance (Optimism)", copy: "Every 100ms of interface lag adds cognitive stress. Our sub-second interactive guide turns complex terms into warm, visual stories.", ctr: "3.2x Exploration Tempo" },
            { angle: "Tool-Calling Verification (Technical Craft)", copy: "Rule #402: Automatically verify real-time rate accuracy across partner APIs before rendering the interactive comparison card.", ctr: "100% Signal Fidelity" }
          ]
        },
        velocity: {
          hook: "From open-ended question to working interactive prototype in 90 minutes: how agentic tool-calling transforms creative exploration.",
          variants: [
            { angle: "Participatory Sandbox (Human Agency)", copy: "Explore personalized pathways without commitment—1-tap interactive simulation powered by deterministic edge functions.", ctr: "4.8x Engagement Lift" },
            { angle: "Community Trust (Shared Clarity)", copy: "Why 80+ founders and teams moved from static PDFs to live, touch-responsive web prototypes.", ctr: "95% Satisfaction" }
          ]
        },
        cost: {
          hook: "How we increased learner curriculum discovery by +200% at Red Ventures (edX) by replacing generic menus with generative guidance.",
          variants: [
            { angle: "Respecting Human Attention", copy: "Don't make people dig through 4,000 courses. Synthesize their curiosity into a clear, encouraging 3-step learning roadmap.", ctr: "+200% Discovery Lift" }
          ]
        }
      },
      makers: {
        attribution: {
          hook: "Creative technologists don't stop at slide decks—they build working code, physical hardware, and 60 FPS shaders you can feel.",
          variants: [
            { angle: "Resilient Edge Architecture", copy: "99.99% uptime across interactive installations—see the exact Docker, FastAPI, and Cloudflare edge topology.", ctr: "Sub-30ms Latency" },
            { angle: "Hardware-to-Browser Bridge", copy: "Tap a physical NTAG215 token to launch a spatial WebGL experience in under 300ms with zero app install.", ctr: "60 FPS Tactile UI" }
          ]
        },
        velocity: {
          hook: "Ship a working prototype in 4 days instead of 4 months. How structured tool-calling and modular design systems accelerate craft by 3.2x.",
          variants: [
            { angle: "Zero-Friction Iteration", copy: "Why 80+ creative and civic initiatives partnered with Fabian Velez to turn rough sketches into live web applications.", ctr: "3.2x Build Velocity" }
          ]
        },
        cost: {
          hook: "Can a standard smartphone browser become a real-time assistive lens for 300M+ people with color-blindness?",
          variants: [
            { angle: "Sensory Accessibility (Picta)", copy: "60 FPS WebRTC camera stream, LMS Daltonization matrices, and bilingual Web Speech synthesis running 100% on-device.", ctr: "Zero-Install Access" }
          ]
        }
      },
      'dtc-growth': {
        attribution: {
          hook: "Synthesize 40M+ learning sessions in Databricks SQL to understand how curiosity evolves from a first question to mastery.",
          variants: [
            { angle: "Longitudinal Curiosity Graph", copy: "Reconciling multi-session behavioral signals in Databricks Delta Lake to surface encouraging, timely learning milestones.", ctr: "40M+ Sessions" },
            { angle: "Generative Story Variants", copy: "Synthesize and test 20+ bilingual interactive storytelling hooks weekly with human-in-the-loop LLM orchestration.", ctr: "3x Creative Tempo" }
          ]
        },
        velocity: {
          hook: "3x weekly prototyping tempo: how pairing computer engineering rigor with humor and warmth keeps creative experiments fresh.",
          variants: [
            { angle: "The Human Emotion Matrix", copy: "Design every interaction around five human pillars: curiosity, humor, emotional depth, optimism, and everyday clarity.", ctr: "5/5 Craft Rubric" }
          ]
        },
        cost: {
          hook: "Remove 68% of onboarding friction by turning multi-page forms into an encouraging, voice-and-touch guided conversation.",
          variants: [
            { angle: "Effortless Participation", copy: "Sub-second rendering and bilingual EN/ES voice guidance that welcomes every participant regardless of technical background.", ctr: "+24% Completion Lift" }
          ]
        }
      }
    };

    const cohortData = templates[this.selectedCohort] || templates.fintech;
    const activeData = cohortData[this.selectedTrigger] || cohortData.attribution;

    display.innerHTML = `
<pre><code class="lang-json">// Synthesized via Fabian's Frontier Orchestration Framework
{
  "status": "200_OK",
  "domain": "${this.selectedCohort.toUpperCase()}",
  "intention": "${this.selectedTrigger.toUpperCase()}",
  "guidingQuestion": "${activeData.hook}",
  "narrativePrototypes": [
${activeData.variants.map((v, i) => `    {
      "id": "PROTOTYPE_${String(i + 1).padStart(2, '0')}",
      "creativeLens": "${v.angle}",
      "interactiveExperience": "${v.copy}",
      "humanImpact": "${v.ctr}"
    }`).join(',\n')}
  ],
  "toolCallingOrchestration": {
    "condition": "IF signal_fidelity >= 0.98 AND latency_ms < 50",
    "action": "PROMOTE_INTERACTIVE_PROTOTYPE_TO_LIVE()",
    "humanGuardrail": "PRESERVE_ACCESSIBILITY_AND_PRIVACY(100%)"
  }
}</code></pre>
    `;
  }
}
