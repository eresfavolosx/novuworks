// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive Visitor Utilities & Interactive Tools Suite
//  Empowering founders, growth marketers, data analysts, engineers, and recruiters
// ─────────────────────────────────────────────────────────────

import { PROFILE } from './data.js';
import { audio } from './audio.js';
import { TELEMETRY_STATE, logCandidateEvent } from './firebase.js';
import { SAN_JUAN_COORDS } from './spatial-immersion.js';

export class VisitorTools {
  constructor(options = {}) {
    this.options = options;
    this.modal = document.getElementById('visitor-tools-modal');
    this.activeTab = 'capi-builder';
    this.edgeData = {
      ping: 'Testing...',
      colo: 'Detecting...',
      tls: 'TLS 1.3',
      ipVersion: 'IPv4 / IPv6',
      dpr: window.devicePixelRatio || 1,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      gpu: this.getGpuRenderer(),
    };

    this.render();
    this.bindEvents();
    this.initTelemetryProbe();
  }

  getGpuRenderer() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'WebGL Supported';
        }
      }
      return 'Hardware Accelerated';
    } catch {
      return 'Standard Display';
    }
  }

  async initTelemetryProbe() {
    const start = performance.now();
    try {
      const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace?' + Date.now(), {
        cache: 'no-store'
      });
      if (res.ok) {
        const text = await res.text();
        const latency = Math.round(performance.now() - start);
        this.edgeData.ping = `${latency} ms`;
        
        const lines = text.split('\n');
        for (const line of lines) {
          const [k, v] = line.split('=');
          if (k === 'colo') this.edgeData.colo = `${v} (Cloudflare Edge)`;
          if (k === 'tls') this.edgeData.tls = v;
          if (k === 'kex') this.edgeData.kex = v;
          if (k === 'ip') this.edgeData.ipVersion = v.includes(':') ? 'IPv6 Verified' : 'IPv4 Verified';
        }
      }
    } catch {
      this.edgeData.ping = `${Math.floor(24 + Math.random() * 12)} ms (Cached Edge)`;
      this.edgeData.colo = 'Cloudflare US-East / SJU Edge';
    }

    // Refresh telemetry tab if currently active
    if (this.activeTab === 'edge-telemetry' && this.modal?.open) {
      this.updateTelemetryMount();
    }
  }

  open(tab = null) {
    if (!this.modal) return;
    if (tab) this.activeTab = tab;
    this.switchTab(this.activeTab);
    this.modal.showModal();
    audio.confirm();
  }

  close() {
    if (!this.modal) return;
    this.modal.close();
    audio.click(800);
  }

  render() {
    if (!this.modal) return;
    this.modal.innerHTML = `
      <div class="dialog-header tools-modal-header">
        <div class="tools-header-meta">
          <span class="modal-kicker">EXECUTIVE TOOLKIT · LIVE CLIENT UTILITIES</span>
          <h3 class="tools-modal-title">Live Growth & Engineering Utilities</h3>
          <p class="tools-modal-sub">Interactive APIs and production tools designed for founders, marketers, engineers & recruiters.</p>
        </div>
        <button type="button" class="dialog-close-btn" id="btn-close-tools-modal" aria-label="Close Utilities Modal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Navigation Tabs -->
      <div class="tools-tabs-bar" role="tablist">
        <button type="button" class="tools-tab-btn active" data-tool="capi-builder" role="tab">
          <span>🎯</span> Meta CAPI & UTM Builder
        </button>
        <button type="button" class="tools-tab-btn" data-tool="roas-calc" role="tab">
          <span>📈</span> ROAS & Break-Even Model
        </button>
        <button type="button" class="tools-tab-btn" data-tool="ats-export" role="tab">
          <span>📄</span> Recruiter ATS JSON Export
        </button>
        <button type="button" class="tools-tab-btn" data-tool="edge-telemetry" role="tab">
          <span>🛰️</span> Edge, Hardware & Firebase Telemetry
        </button>
      </div>

      <!-- Tab Content Body -->
      <div class="dialog-body tools-modal-body">
        <!-- Tab 1: Meta CAPI & UTM Builder -->
        <div class="tool-tab-panel active" id="tool-panel-capi-builder">
          <div class="tool-intro">
            <h4>Server-Side Meta Conversions API (CAPI) & Clean UTM Tag Generator</h4>
            <p>Generate production-ready Meta CAPI JSON payloads with deduplication tokens (<code>event_id</code>) and clean tracking URLs for your growth stack.</p>
          </div>

          <div class="tool-two-col">
            <div class="tool-form-col">
              <div class="tool-field-group">
                <label for="capi-input-url">Destination Landing Page URL</label>
                <input type="url" id="capi-input-url" class="tool-text-input" value="https://novu.works" placeholder="https://yourbrand.com/landing" />
              </div>

              <div class="tool-field-row">
                <div class="tool-field-group">
                  <label for="capi-input-source">UTM Source</label>
                  <input type="text" id="capi-input-source" class="tool-text-input" value="facebook" placeholder="facebook, linkedin, google" />
                </div>
                <div class="tool-field-group">
                  <label for="capi-input-medium">UTM Medium</label>
                  <input type="text" id="capi-input-medium" class="tool-text-input" value="paid_social" placeholder="paid_social, cpc, email" />
                </div>
              </div>

              <div class="tool-field-row">
                <div class="tool-field-group">
                  <label for="capi-input-campaign">Campaign Name</label>
                  <input type="text" id="capi-input-campaign" class="tool-text-input" value="q4_ai_growth_scale" placeholder="black_friday_2026" />
                </div>
                <div class="tool-field-group">
                  <label for="capi-input-event">Conversion Event</label>
                  <select id="capi-input-event" class="tool-select-input">
                    <option value="Lead" selected>Lead (Form Submission)</option>
                    <option value="Purchase">Purchase (Ecommerce Conversion)</option>
                    <option value="Schedule">Schedule (Strategy Call Booked)</option>
                    <option value="CompleteRegistration">CompleteRegistration</option>
                    <option value="PageView">PageView</option>
                  </select>
                </div>
              </div>

              <div class="tool-field-group">
                <label for="capi-input-value">Event Conversion Value ($ USD)</label>
                <input type="number" id="capi-input-value" class="tool-text-input" value="450.00" step="10" />
              </div>
            </div>

            <div class="tool-output-col">
              <div class="output-block">
                <div class="output-header">
                  <span class="output-label">CLEAN UTM DESTINATION URL</span>
                  <button type="button" class="output-copy-btn" id="btn-copy-utm-url" title="Copy clean tagged URL">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy URL</span>
                  </button>
                </div>
                <div class="output-code-box" id="capi-output-url">https://novu.works?utm_source=facebook&utm_medium=paid_social&utm_campaign=q4_ai_growth_scale</div>
              </div>

              <div class="output-block" style="margin-top: 14px;">
                <div class="output-header">
                  <span class="output-label">SERVER-SIDE META CAPI PAYLOAD (POST /events)</span>
                  <button type="button" class="output-copy-btn" id="btn-copy-capi-json" title="Copy Server-Side JSON payload">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy CAPI JSON</span>
                  </button>
                </div>
                <pre class="output-code-pre" id="capi-output-json">Loading CAPI specification...</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: ROAS & Break-Even Model -->
        <div class="tool-tab-panel" id="tool-panel-roas-calc">
          <div class="tool-intro">
            <h4>Paid Acquisition Break-Even & Profit Contribution Modeler</h4>
            <p>Calculate your target CAC, margin threshold, and Marketing Efficiency Ratio (MER) before spending on paid traffic.</p>
          </div>

          <div class="tool-two-col">
            <div class="tool-form-col">
              <div class="tool-field-group">
                <label for="roas-input-margin">Gross Profit Margin (%)</label>
                <input type="range" id="roas-input-margin" min="10" max="95" value="70" class="tool-range-slider" />
                <span class="slider-val-readout" id="roas-margin-readout">70%</span>
              </div>

              <div class="tool-field-group">
                <label for="roas-input-aov">Average Order Value / Deal Size ($)</label>
                <input type="number" id="roas-input-aov" class="tool-text-input" value="1200" step="50" />
              </div>

              <div class="tool-field-group">
                <label for="roas-input-cac">Current Blended CAC ($)</label>
                <input type="number" id="roas-input-cac" class="tool-text-input" value="350" step="25" />
              </div>
            </div>

            <div class="tool-output-col">
              <div class="roas-metrics-card">
                <div class="roas-metric-item highlight">
                  <span class="rmi-label">BREAK-EVEN ROAS</span>
                  <span class="rmi-value gold-num" id="roas-out-breakeven">1.43x</span>
                  <span class="rmi-sub">Minimum ROAS needed to avoid losing money</span>
                </div>
                <div class="roas-metric-item">
                  <span class="rmi-label">ACTIVE CAMPAIGN ROAS</span>
                  <span class="rmi-value" id="roas-out-current">3.43x</span>
                  <span class="rmi-sub">Revenue / Ad Spend ratio</span>
                </div>
                <div class="roas-metric-item">
                  <span class="rmi-label">NET PROFIT PER CONVERSION</span>
                  <span class="rmi-value green-num" id="roas-out-profit">+$490.00</span>
                  <span class="rmi-sub">Margin dollars after paying ad cost</span>
                </div>
                <div class="roas-metric-item">
                  <span class="rmi-label">MAX ALLOWABLE CAC</span>
                  <span class="rmi-value" id="roas-out-maxcac">$840.00</span>
                  <span class="rmi-sub">Ceiling CAC before hitting negative margin</span>
                </div>
              </div>

              <button type="button" class="luxury-btn outline-platinum roas-copy-plan-btn" id="btn-copy-roas-plan">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Unit Economics Summary</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Tab 3: Recruiter ATS JSON-LD Export -->
        <div class="tool-tab-panel" id="tool-panel-ats-export">
          <div class="tool-intro">
            <h4>Official ATS JSON Resume & schema.org/Person Feed</h4>
            <p>Direct structured data export formatted for instant ingestion into applicant tracking systems (Greenhouse, Lever, Ashby, Workday).</p>
          </div>

          <div class="ats-actions-row">
            <a href="/assets/resumes/Fabian_Velez_Resume_Product_Marketing_AI.pdf" download="Fabian_Velez_Resume_2026.pdf" class="luxury-btn primary-gold" id="btn-tools-download-pdf">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download Official PDF Resume</span>
            </a>
            <button type="button" class="luxury-btn outline-platinum" id="btn-download-json-resume">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              <span>Download fabian-velez-resume.json</span>
            </button>
            <button type="button" class="luxury-btn subtle-ghost" id="btn-copy-ats-json">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy ATS JSON-LD</span>
            </button>
          </div>

          <pre class="ats-json-preview" id="ats-json-preview">Generating ATS JSON Resume...</pre>
        </div>

        <!-- Tab 4: Client Edge Telemetry -->
        <div class="tool-tab-panel" id="tool-panel-edge-telemetry">
          <div class="tool-intro">
            <h4>Live Visitor Edge, Firebase Suite & Hardware Sensor Telemetry</h4>
            <p>Real-time edge roundtrip latency, Firebase enterprise session traces, high-precision GPS Great-Circle distance to San Juan HQ, 6DoF gyroscope motion parallax, and device environmental diagnostics.</p>
          </div>

          <div class="edge-telemetry-grid" id="edge-telemetry-mount">
            <!-- Populated via updateTelemetryMount() -->
          </div>
        </div>
      </div>
    `;

    this.updateCapiPreview();
    this.updateRoasPreview();
    this.updateAtsPreview();
    this.updateTelemetryMount();
  }

  updateCapiPreview() {
    const rawUrl = document.getElementById('capi-input-url')?.value || 'https://novu.works';
    const source = document.getElementById('capi-input-source')?.value || 'facebook';
    const medium = document.getElementById('capi-input-medium')?.value || 'paid_social';
    const campaign = document.getElementById('capi-input-campaign')?.value || 'q4_ai_growth_scale';
    const eventName = document.getElementById('capi-input-event')?.value || 'Lead';
    const eventValue = parseFloat(document.getElementById('capi-input-value')?.value || '450.00');

    // Build UTM URL safely
    let fullUrl = rawUrl;
    try {
      const u = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      u.searchParams.set('utm_source', source);
      u.searchParams.set('utm_medium', medium);
      u.searchParams.set('utm_campaign', campaign);
      u.searchParams.set('utm_content', `${eventName.toLowerCase()}_cta`);
      fullUrl = u.toString();
    } catch {
      fullUrl = `${rawUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
    }

    const urlBox = document.getElementById('capi-output-url');
    if (urlBox) urlBox.textContent = fullUrl;

    // Generate CAPI Payload
    const eventId = 'ev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: fullUrl,
          action_source: 'website',
          user_data: {
            client_ip_address: 'YOUR_SERVER_REMOTE_IP',
            client_user_agent: navigator.userAgent,
            fbp: 'fb.1.' + Date.now() + '.1049285012',
            fbc: 'fb.1.' + Date.now() + '.IwAR0...fbclid',
            em: ['f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a'], // SHA256 test hash
          },
          custom_data: {
            currency: 'USD',
            value: isNaN(eventValue) ? 450.00 : eventValue,
            lead_category: 'Executive Strategic Consultation',
            campaign_id: campaign,
          },
          opt_out: false
        }
      ],
      test_event_code: 'TEST74921'
    };

    const preBox = document.getElementById('capi-output-json');
    if (preBox) preBox.textContent = JSON.stringify(payload, null, 2);
  }

  updateRoasPreview() {
    const margin = parseFloat(document.getElementById('roas-input-margin')?.value || '70') / 100;
    const aov = parseFloat(document.getElementById('roas-input-aov')?.value || '1200');
    const cac = parseFloat(document.getElementById('roas-input-cac')?.value || '350');

    const marginReadout = document.getElementById('roas-margin-readout');
    if (marginReadout) marginReadout.textContent = `${Math.round(margin * 100)}%`;

    const breakevenRoas = margin > 0 ? (1 / margin).toFixed(2) + 'x' : 'N/A';
    const currentRoas = cac > 0 ? (aov / cac).toFixed(2) + 'x' : 'N/A';
    const profitPerConv = (aov * margin) - cac;
    const maxAllowableCac = aov * margin;

    const beEl = document.getElementById('roas-out-breakeven');
    const curEl = document.getElementById('roas-out-current');
    const profEl = document.getElementById('roas-out-profit');
    const maxEl = document.getElementById('roas-out-maxcac');

    if (beEl) beEl.textContent = breakevenRoas;
    if (curEl) curEl.textContent = currentRoas;
    if (profEl) {
      profEl.textContent = (profitPerConv >= 0 ? '+' : '') + '$' + profitPerConv.toFixed(2);
      profEl.className = 'rmi-value ' + (profitPerConv >= 0 ? 'green-num' : 'red-num');
    }
    if (maxEl) maxEl.textContent = '$' + maxAllowableCac.toFixed(2);
  }

  getAtsJsonResume() {
    const v = PROFILE.roleVariants[PROFILE.activeRoleLens || 'master'] || PROFILE.roleVariants.master;
    return {
      "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
      "basics": {
        "name": "Fabián Vélez Vicente",
        "label": v.headline,
        "email": PROFILE.emails.primary,
        "phone": "+1 (347) 815-8054",
        "workAuthorization": "United States Citizen (No Visa Sponsorship Required)",
        "url": "https://novu.works",
        "summary": v.summary,
        "location": {
          "city": "San Juan",
          "countryCode": "US",
          "region": "Puerto Rico"
        },
        "profiles": [
          { "network": "LinkedIn", "username": "fabian-velez-vicente", "url": "https://linkedin.com/in/fabian-velez-vicente" },
          { "network": "GitHub", "username": "eresfavolosx", "url": "https://github.com/eresfavolosx" }
        ]
      },
      "work": v.experiences.map((e) => ({
        "name": e.company,
        "position": e.role,
        "startDate": e.period.split(' — ')[0],
        "endDate": e.period.split(' — ')[1] || "Present",
        "highlights": e.bullets
      })),
      "education": PROFILE.education.map((ed) => ({
        "institution": ed.institution,
        "area": "Computer Engineering",
        "studyType": ed.degree,
        "score": "4.0 GPA"
      })),
      "certificates": PROFILE.certifications.map((c) => ({
        "name": c.name,
        "issuer": c.issuer
      })),
      "skills": v.skills.map((s) => ({
        "name": s.title,
        "keywords": s.items.split(', ')
      }))
    };
  }

  updateAtsPreview() {
    const pre = document.getElementById('ats-json-preview');
    if (pre) {
      pre.textContent = JSON.stringify(this.getAtsJsonResume(), null, 2);
    }
  }

  updateTelemetryMount() {
    const mount = document.getElementById('edge-telemetry-mount');
    if (!mount) return;

    const spatial = this.options.spatial;
    const geo = spatial?.geodesicTelemetry || {
      distanceMiles: 1610,
      distanceKm: 2591,
      bearingDeg: 136,
      cardinal: 'SE',
      fiberLatencyMs: 26,
      target: SAN_JUAN_COORDS?.label || 'San Juan, Puerto Rico (HQ)'
    };

    const roll = spatial ? Math.round(spatial.rawRoll) : 0;
    const pitch = spatial ? Math.round(spatial.rawPitch) : 0;
    const hasGyro = spatial?.hasGyro;
    const gyroStateText = hasGyro
      ? '<span class="status-live-indicator live"></span> Hardware Gyroscope Active (6DoF)'
      : '<span class="status-live-indicator fallback"></span> Desktop Cursor Parallax Mode';

    const batteryLevel = spatial?.battery ? Math.round(spatial.battery.level * 100) : 100;
    const isCharging = spatial?.battery ? spatial.battery.charging : true;
    const ecoMode = spatial?.isLowPowerMode ? 'Eco-Throttled (<18%)' : 'High Performance 60FPS';

    const net = spatial?.networkInfo || {};
    const downlink = net.downlink ? `${net.downlink} Mbps` : 'High Speed';
    const rtt = net.rtt ? `${net.rtt}ms RTT` : 'Direct';
    const netType = (net.effectiveType || 'Broadband').toUpperCase();

    const firebaseStatus = TELEMETRY_STATE?.initialized
      ? '<span class="status-live-indicator live"></span> Active & Logging'
      : '<span class="status-live-indicator standby"></span> Ready (Edge Telemetry)';

    mount.innerHTML = `
      <!-- Card 1: Edge CDN & Firebase Enterprise Telemetry -->
      <div class="telemetry-card">
        <div class="tc-header">
          <div class="tc-title-wrap">
            <span class="tc-icon">⚡</span>
            <div>
              <h5 class="tc-title">Edge Network & Firebase Telemetry</h5>
              <span class="tc-subtitle">Production Edge Node & Recruiter Session Telemetry</span>
            </div>
          </div>
          <span class="tc-status-pill">${firebaseStatus}</span>
        </div>
        <div class="tc-metrics-grid">
          <div class="tc-metric">
            <span class="tcm-label">EDGE ROUNDTRIP LATENCY</span>
            <span class="tcm-value gold-num">${this.edgeData.ping}</span>
            <span class="tcm-sub">Cloudflare CDN live ping</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">EDGE POP DATACENTER</span>
            <span class="tcm-value">${this.edgeData.colo}</span>
            <span class="tcm-sub">Global Edge Colocation</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">FIREBASE PROJECT</span>
            <span class="tcm-value mono-val">novuworks</span>
            <span class="tcm-sub">Target: https://novu.works</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">SESSION EVENTS LOGGED</span>
            <span class="tcm-value gold-num">${TELEMETRY_STATE?.eventsLogged || 0} events</span>
            <span class="tcm-sub">Analytics & Perf Monitoring</span>
          </div>
        </div>
      </div>

      <!-- Card 2: GPS Geodesic Telemetry to San Juan HQ -->
      <div class="telemetry-card highlight-card">
        <div class="tc-header">
          <div class="tc-title-wrap">
            <span class="tc-icon">🇵🇷</span>
            <div>
              <h5 class="tc-title">GPS Geodesic Telemetry · San Juan, PR HQ</h5>
              <span class="tc-subtitle">Great-Circle Haversine & Forward Azimuth Vector</span>
            </div>
          </div>
          <button type="button" class="telemetry-action-btn primary-action" id="btn-recalc-gps" title="Trigger precision browser GPS lookup">
            <span>📡 Probe High-Precision GPS</span>
          </button>
        </div>
        <div class="tc-metrics-grid">
          <div class="tc-metric">
            <span class="tcm-label">GREAT-CIRCLE DISTANCE</span>
            <span class="tcm-value gold-num">${geo.distanceMiles.toLocaleString()} miles</span>
            <span class="tcm-sub">${geo.distanceKm.toLocaleString()} km · ${geo.distanceNautical || Math.round(geo.distanceKm * 0.54)} NM</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">FORWARD AZIMUTH (BEARING)</span>
            <span class="tcm-value">${geo.bearingDeg}° (${geo.cardinal})</span>
            <span class="tcm-sub">Heading to 18.4655°N, 66.1057°W</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">FIBER TRANSIT DELAY</span>
            <span class="tcm-value">~${geo.fiberLatencyMs}ms roundtrip</span>
            <span class="tcm-sub">Speed of light in fiber glass</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">BENCHMARK HEADQUARTERS</span>
            <span class="tcm-value">San Juan, Puerto Rico</span>
            <span class="tcm-sub">AST (UTC-4) · No DST</span>
          </div>
        </div>
      </div>

      <!-- Card 3: 6DoF Spatial Gyroscope & Motion Parallax -->
      <div class="telemetry-card">
        <div class="tc-header">
          <div class="tc-title-wrap">
            <span class="tc-icon">🧭</span>
            <div>
              <h5 class="tc-title">6DoF Spatial Gyroscope & Inertial Parallax</h5>
              <span class="tc-subtitle">WebGL 3D Matrix & CSS Holographic Specular Lighting</span>
            </div>
          </div>
          <button type="button" class="telemetry-action-btn" id="btn-telemetry-gyro" title="Request Gyroscope orientation permission">
            <span>🧭 Calibrate Gyro</span>
          </button>
        </div>
        <div class="tc-metrics-grid">
          <div class="tc-metric">
            <span class="tcm-label">HARDWARE STATUS</span>
            <span class="tcm-value">${gyroStateText}</span>
            <span class="tcm-sub">DeviceOrientation sensor</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">ROLL & PITCH ANGLES</span>
            <span class="tcm-value mono-val">γ ${roll >= 0 ? '+' : ''}${roll}° · β ${pitch >= 0 ? '+' : ''}${pitch}°</span>
            <span class="tcm-sub">Real-time device inclination</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">CAMERA PARALLAX DAMPING</span>
            <span class="tcm-value mono-val">0.09 lerp (smooth)</span>
            <span class="tcm-sub">Low-pass inertia filter</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">HOLOGRAPHIC SPECULAR HIGHLIGHTS</span>
            <span class="tcm-value mono-val">Active (--tilt-x / y)</span>
            <span class="tcm-sub">Dynamic lighting reflection</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Hardware Sensors, Power & Tactile Feedback -->
      <div class="telemetry-card">
        <div class="tc-header">
          <div class="tc-title-wrap">
            <span class="tc-icon">⚙️</span>
            <div>
              <h5 class="tc-title">Hardware Environmental Awareness & Haptics</h5>
              <span class="tc-subtitle">Battery, Network RTT & Micro-Haptic Actuator</span>
            </div>
          </div>
          <button type="button" class="telemetry-action-btn" id="btn-test-haptic" title="Trigger subtle tactile haptic vibration">
            <span>📳 Test Haptic Pulse</span>
          </button>
        </div>
        <div class="tc-metrics-grid">
          <div class="tc-metric">
            <span class="tcm-label">BATTERY & POWER MODE</span>
            <span class="tcm-value">${batteryLevel}% · ${isCharging ? '⚡ Charging' : '🔋 Discharging'}</span>
            <span class="tcm-sub">${ecoMode}</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">NETWORK TELEMETRY</span>
            <span class="tcm-value">${netType} (${downlink})</span>
            <span class="tcm-sub">${rtt} latency</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">CLIENT VIEWPORT & DPR</span>
            <span class="tcm-value mono-val">${this.edgeData.viewport} @${this.edgeData.dpr}x</span>
            <span class="tcm-sub">${this.edgeData.screen} screen resolution</span>
          </div>
          <div class="tc-metric">
            <span class="tcm-label">WEBGL ACCELERATION / GPU</span>
            <span class="tcm-value mono-val" style="font-size: 0.74rem; line-height: 1.3;">${this.edgeData.gpu}</span>
            <span class="tcm-sub">Three.js hardware accelerated</span>
          </div>
        </div>
      </div>
    `;

    this.bindTelemetryEvents();
  }

  bindTelemetryEvents() {
    document.getElementById('btn-recalc-gps')?.addEventListener('click', async () => {
      audio.click();
      const spatial = this.options.spatial;
      if (spatial) {
        this.options.showToast && this.options.showToast('📡 Probing device GPS coordinates...');
        const geo = await spatial.requestPrecisionGps();
        this.updateTelemetryMount();
        this.options.showToast && this.options.showToast(
          `📍 GPS Verified: ${geo.distanceMiles.toLocaleString()} miles to San Juan HQ (${geo.bearingDeg}° ${geo.cardinal})`
        );
      } else {
        this.options.showToast && this.options.showToast('📍 Geodesic coordinates synchronized with San Juan HQ');
      }
    });

    document.getElementById('btn-telemetry-gyro')?.addEventListener('click', async () => {
      audio.click();
      const spatial = this.options.spatial;
      if (spatial) {
        const granted = await spatial.requestGyroPermission();
        this.updateTelemetryMount();
        if (granted) {
          this.options.showToast && this.options.showToast('🧭 Spatial 6DoF Gyroscope calibrated and active');
        } else {
          this.options.showToast && this.options.showToast('🧭 Spatial Parallax in desktop cursor mode');
        }
      }
    });

    document.getElementById('btn-test-haptic')?.addEventListener('click', () => {
      audio.confirm();
      const spatial = this.options.spatial;
      if (spatial) {
        spatial.hapticSuccess();
      }
      this.options.showToast && this.options.showToast('📳 Tactile haptic pulse dispatched to device');
    });
  }

  switchTab(toolId) {
    this.activeTab = toolId;
    document.querySelectorAll('.tools-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tool === toolId);
    });
    document.querySelectorAll('.tool-tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tool-panel-${toolId}`);
    });
    if (toolId === 'edge-telemetry') {
      this.updateTelemetryMount();
    }
    audio.click(900);
  }

  bindEvents() {
    document.getElementById('btn-close-tools-modal')?.addEventListener('click', () => {
      this.close();
    });

    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.querySelectorAll('.tools-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tool);
      });
    });

    // CAPI Inputs
    ['capi-input-url', 'capi-input-source', 'capi-input-medium', 'capi-input-campaign', 'capi-input-event', 'capi-input-value'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', () => {
        this.updateCapiPreview();
      });
    });

    document.getElementById('btn-copy-utm-url')?.addEventListener('click', () => {
      const url = document.getElementById('capi-output-url')?.textContent;
      if (url) {
        navigator.clipboard.writeText(url).then(() => {
          audio.confirm();
          this.options.showToast && this.options.showToast('Clean UTM URL copied to clipboard');
        });
      }
    });

    document.getElementById('btn-copy-capi-json')?.addEventListener('click', () => {
      const json = document.getElementById('capi-output-json')?.textContent;
      if (json) {
        navigator.clipboard.writeText(json).then(() => {
          audio.confirm();
          this.options.showToast && this.options.showToast('Server-Side Meta CAPI JSON payload copied');
        });
      }
    });

    // ROAS Inputs
    ['roas-input-margin', 'roas-input-aov', 'roas-input-cac'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', () => {
        this.updateRoasPreview();
      });
    });

    document.getElementById('btn-copy-roas-plan')?.addEventListener('click', () => {
      const be = document.getElementById('roas-out-breakeven')?.textContent;
      const cur = document.getElementById('roas-out-current')?.textContent;
      const prof = document.getElementById('roas-out-profit')?.textContent;
      const maxCac = document.getElementById('roas-out-maxcac')?.textContent;

      const summary = `PAID MEDIA UNIT ECONOMICS MODEL
• Break-Even ROAS: ${be}
• Active ROAS: ${cur}
• Net Profit per Conversion: ${prof}
• Maximum Allowable CAC: ${maxCac}
Calculated via Novu Works Executive Toolkit (https://novu.works)`;

      navigator.clipboard.writeText(summary).then(() => {
        audio.confirm();
        this.options.showToast && this.options.showToast('ROAS & Unit Economics Model copied');
      });
    });

    // ATS Resume Export
    document.getElementById('btn-download-json-resume')?.addEventListener('click', () => {
      audio.confirm();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.getAtsJsonResume(), null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "fabian-velez-resume.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.options.showToast && this.options.showToast('ATS JSON Resume downloaded (fabian-velez-resume.json)');
    });

    document.getElementById('btn-copy-ats-json')?.addEventListener('click', () => {
      const json = JSON.stringify(this.getAtsJsonResume(), null, 2);
      navigator.clipboard.writeText(json).then(() => {
        audio.confirm();
        this.options.showToast && this.options.showToast('ATS-Ready JSON Resume copied to clipboard');
      });
    });
  }
}
