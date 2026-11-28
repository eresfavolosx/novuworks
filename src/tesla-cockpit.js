// ─────────────────────────────────────────────────────────────
//  Novu Works — Fullscreen Tesla In-Car Cockpit HUD Dashboard
//  Transforms the portfolio into an edge-to-edge, cinematic,
//  multi-panel telemetry cockpit featuring "About Fabián" metrics,
//  6DoF artificial horizon, live clock/weather/battery, and
//  a real-time streaming news radar (Hacker News Algolia API).
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';
import { bindDialogLightDismissFallback } from './utils.js';

export const CURATED_TESLA_NEWS = [
  {
    id: 't-news-1',
    source: 'OpenAI & Frontier Research',
    time: '24m ago',
    title: 'Autonomous Tool-Calling Agents Turn Open-Ended Questions into Working Prototypes',
    summary: 'How hybrid makers are pairing structured LLM function-calling with interactive canvases to build participatory software experiences in hours.',
    category: 'Frontier Models',
    url: 'https://news.ycombinator.com',
    isLive: false,
  },
  {
    id: 't-news-2',
    source: 'Creative Applications',
    time: '42m ago',
    title: 'WebGPU, WebRTC & Three.js Shaders Bring Tactile Physics and Assistive Vision to the Browser',
    summary: 'Real-time 60 FPS Daltonization shaders and procedural spring physics transform standard web browsers into expressive sensory instruments.',
    category: 'Interactive Experiences',
    url: 'https://news.ycombinator.com',
    isLive: false,
  },
  {
    id: 't-news-3',
    source: 'Hacker News Live',
    time: '1h ago',
    title: 'Databricks Lakehouse Architectures Powering Human-Centric Behavioral Synthesis at Scale',
    summary: 'Synthesizing 40M+ longitudinal learning journeys enables generative discovery systems that adapt empathetically to human curiosity.',
    category: 'Behavioral Synthesis',
    url: 'https://news.ycombinator.com',
    isLive: false,
  },
  {
    id: 't-news-4',
    source: 'Stanford d.school / UIF',
    time: '2h ago',
    title: 'Stanford Innovation Fellows Champion the Hybrid Maker: Storytelling, Design & Code',
    summary: 'Cross-functional creative technologists who bridge computer engineering rigor with humor, optimism, and emotional depth outpace siloed teams.',
    category: 'Human-Centric Design',
    url: 'https://news.ycombinator.com',
    isLive: false,
  },
];

const TOPIC_LABELS = {
  all: 'All Signals',
  ai: 'Frontier AI',
  growth: 'Interactive Design',
  tech: 'Creative Code',
};

export class TeslaCockpitDashboard {
  constructor(app = null) {
    this.app = app;
    this.isOpen = false;
    this.activeTopic = 'all';
    this.newsItems = [...CURATED_TESLA_NEWS];
    this.isFetchingNews = false;
    this.newsAbortController = null;
    this.hasLoadedLiveNews = false;
    this.lastNewsSyncMs = 0;
    this.newsStatusNote = '';
    this.clockInterval = null;
    this.newsSyncInterval = null;
    this._liveTimer = null;
    this.currentPitchPx = 0;
    this.currentRollDeg = 0;

    const horizonRing = document.getElementById('tesla-horizon-ring');
    this.dom = {
      container: document.getElementById('tesla-cockpit-hud'),
      btnClose: document.getElementById('btn-exit-tesla-cockpit'),
      clockDisplay: document.getElementById('tesla-clock-display'),
      weatherTemp: document.getElementById('tesla-weather-temp'),
      weatherIcon: document.getElementById('tesla-weather-icon'),
      gpsDist: document.getElementById('tesla-gps-dist'),
      battLevel: document.getElementById('tesla-batt-level'),
      horizonRing,
      horizonLine: horizonRing?.querySelector('.horizon-line') || null,
      pitchReadout: document.getElementById('tesla-pitch-readout'),
      rollReadout: document.getElementById('tesla-roll-readout'),
      gReadout: document.getElementById('tesla-g-readout'),
      gyroBadge: document.getElementById('tesla-gyro-badge'),
      newsMount: document.getElementById('tesla-news-mount'),
      btnRefreshNews: document.getElementById('btn-tesla-refresh-news'),
      newsSyncLabel: document.getElementById('tesla-news-sync-label'),
      btnOpenRecruiter: document.getElementById('btn-tesla-open-recruiter'),
      btnOpenWa: document.getElementById('btn-tesla-open-wa'),
      statusLive: document.getElementById('tesla-status-live'),
    };
  }

  init() {
    if (!this.dom.container) return;

    this.bindEvents();
    this.initBattery();
    this.renderNews();
  }

  bindEvents() {
    // 1. Exit Cockpit Button
    this.dom.btnClose?.addEventListener('click', () => {
      this.close();
    });

    // 2. Native <dialog> light-dismiss fallback (Safari) & close sync
    bindDialogLightDismissFallback(this.dom.container, () => this.close());
    this.dom.container.addEventListener('close', () => {
      this.dom.container.returnValue = '';
      if (this.isOpen) {
        this._teardown({ triggerToast: true, playAudio: true });
      } else {
        this.dom.container.classList.remove('active');
      }
    });

    // 3. News Filter Tabs (WAI-ARIA manual-activation tablist: arrows move focus, Enter/Space activates)
    const filterChips = Array.from(this.dom.container.querySelectorAll('.tesla-filter-chip'));
    filterChips.forEach((chip, idx) => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic || 'all';
        this.setTopic(topic);
      });

      chip.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        let nextIdx = idx;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % filterChips.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + filterChips.length) % filterChips.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = filterChips.length - 1;
        const targetTab = filterChips[nextIdx];
        if (targetTab) {
          targetTab.focus();
          targetTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      });
    });

    // 4. Refresh News Button
    this.dom.btnRefreshNews?.addEventListener('click', () => {
      this.fetchLiveNews(true, this.activeTopic);
    });

    // 5. Quick Touch Pedals
    this.dom.btnOpenRecruiter?.addEventListener('click', () => {
      this.close(false);
      this.app?.openRecruiterModal();
    });

    this.dom.btnOpenWa?.addEventListener('click', () => {
      this.app?.executiveChat?.open('tesla-pedal');
    });

    // 6. Listen to Spatial Tilt for Artificial Horizon
    window.addEventListener('novu:spatial-tilt', (e) => {
      if (!this.isOpen) return;
      const { tiltX, tiltY } = e.detail || {};
      this.updateArtificialHorizon(tiltX, tiltY);
    });
  }

  announceStatus(message) {
    const liveEl = this.dom.statusLive;
    if (!liveEl || !message) return;
    if (this._liveTimer) {
      clearTimeout(this._liveTimer);
      this._liveTimer = null;
    }
    liveEl.textContent = '';
    this._liveTimer = setTimeout(() => {
      this._liveTimer = null;
      if (this.dom.statusLive) {
        this.dom.statusLive.textContent = message;
      }
    }, 20);
  }

  open() {
    audio?.confirm();
    if (!this.dom.container) return;

    this.isOpen = true;
    this.currentPitchPx = 0;
    this.currentRollDeg = 0;

    if (typeof this.dom.container.showModal === 'function') {
      try {
        if (!this.dom.container.open) this.dom.container.showModal();
      } catch (e) {
        this.dom.container.setAttribute('open', '');
      }
    } else {
      this.dom.container.setAttribute('open', '');
    }

    this.dom.container.classList.add('active');
    this.app?.updateTeslaButton?.(true);

    // Attempt browser fullscreen if user triggered
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    // Synchronize current weather if available
    if (this.app?.prWeather) {
      const w = this.app.prWeather;
      this.updateWeather(`${w.tempC}°C / ${w.tempF}°F`, w.cond?.split(' ')[0] || '☀️');
    }

    // Synchronize current GPS if spatial engine is active
    if (this.app?.spatial) {
      const geo = this.app.spatial.geodesicTelemetry;
      if (geo && this.dom.gpsDist) {
        this.dom.gpsDist.textContent = `${geo.distanceMiles} mi away (${geo.cardinal})`;
      }
    }

    if (this.dom.gyroBadge) {
      this.dom.gyroBadge.textContent = this.app?.spatial?.hasGyro ? '6DoF GYRO LIVE' : 'CURSOR PARALLAX';
    }

    this.startClock();
    this.renderNews();

    if (!this.hasLoadedLiveNews || Date.now() - this.lastNewsSyncMs > 60000) {
      this.fetchLiveNews(false, this.activeTopic);
    }

    // Auto-sync news every 60s while cockpit is open
    if (this.newsSyncInterval) clearInterval(this.newsSyncInterval);
    this.newsSyncInterval = setInterval(() => {
      if (this.isOpen) this.fetchLiveNews(false, this.activeTopic);
    }, 60000);

    this.announceStatus('Tesla Executive Cockpit opened. Press Escape to exit.');
    logCandidateEvent('tesla_cockpit_opened', { view: this.app?.currentView || 'core' });
  }

  _teardown({ triggerToast = true, playAudio = true } = {}) {
    if (playAudio) audio?.click(900);
    this.isOpen = false;
    this.dom.container?.classList.remove('active');
    this.app?.updateTeslaButton?.(false);

    if (this.newsAbortController) {
      try {
        this.newsAbortController.abort();
      } catch (_) {}
      this.newsAbortController = null;
    }

    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }

    if (this.newsSyncInterval) {
      clearInterval(this.newsSyncInterval);
      this.newsSyncInterval = null;
    }

    if (this._liveTimer) {
      clearTimeout(this._liveTimer);
      this._liveTimer = null;
    }

    // Exit fullscreen if active
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}

    if (triggerToast && typeof this.app?.showToast === 'function') {
      this.app.showToast('✓ Tesla Cockpit Closed · Standard Viewport Restored');
    }
  }

  close(triggerToast = true) {
    if (!this.dom.container) return;
    if (!this.isOpen && !this.dom.container.open) return;

    this._teardown({ triggerToast, playAudio: triggerToast });

    if (typeof this.dom.container.close === 'function') {
      try {
        if (this.dom.container.open) this.dom.container.close();
      } catch (e) {
        this.dom.container.removeAttribute('open');
      }
    } else {
      this.dom.container.removeAttribute('open');
    }
  }

  startClock() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.updateClock();
    this.clockInterval = setInterval(() => {
      if (this.isOpen) {
        this.updateClock();
      }
    }, 1000);
  }

  updateClock() {
    if (!this.dom.clockDisplay || !this.isOpen) return;
    const now = new Date();
    this.dom.clockDisplay.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Puerto_Rico',
    });
  }

  initBattery() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBatt = () => {
          if (!this.dom.battLevel) return;
          const pct = Math.round(battery.level * 100);
          const chargingStr = battery.charging ? ' (Charging)' : ' (Discharging)';
          this.dom.battLevel.textContent = `${pct}% Charged${chargingStr}`;
        };
        updateBatt();
        battery.addEventListener('levelchange', updateBatt);
        battery.addEventListener('chargingchange', updateBatt);
      }).catch(() => {});
    }
  }

  updateWeather(tempStr, icon = '☀️') {
    if (this.dom.weatherTemp) this.dom.weatherTemp.textContent = tempStr;
    if (this.dom.weatherIcon) this.dom.weatherIcon.textContent = icon;
  }

  updateArtificialHorizon(tiltX = 0, tiltY = 0) {
    if (!this.dom.horizonRing) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Smooth Pitch: vertical offset of horizon line (-38 to +38px)
      // Smooth Roll: rotation in degrees (-28 to +28 deg)
      this.currentPitchPx = THREE_LERP(this.currentPitchPx, -tiltY * 38, 0.2);
      this.currentRollDeg = THREE_LERP(this.currentRollDeg, tiltX * 28, 0.2);

      this.dom.horizonRing.style.transform = `rotate(${this.currentRollDeg.toFixed(2)}deg)`;
      if (this.dom.horizonLine) {
        this.dom.horizonLine.style.transform = `translateY(${this.currentPitchPx.toFixed(2)}px)`;
      }
    }

    if (this.dom.pitchReadout) {
      this.dom.pitchReadout.textContent = `${(tiltY * 30).toFixed(1)}°`;
    }
    if (this.dom.rollReadout) {
      this.dom.rollReadout.textContent = `${(tiltX * 30).toFixed(1)}°`;
    }
    if (this.dom.gReadout) {
      const inertialG = 1 + Math.hypot(tiltX, tiltY) * 0.35;
      this.dom.gReadout.textContent = `${inertialG.toFixed(2)} G`;
    }
  }

  setTopic(topic) {
    audio?.click(1300);
    this.activeTopic = topic;

    let activeChip = null;
    this.dom.container?.querySelectorAll('.tesla-filter-chip').forEach((c) => {
      const isActive = (c.dataset.topic || 'all') === topic;
      c.classList.toggle('active', isActive);
      c.setAttribute('aria-selected', String(isActive));
      c.setAttribute('tabindex', isActive ? '0' : '-1');
      if (isActive) activeChip = c;
    });

    if (activeChip) {
      if (activeChip.id && this.dom.newsMount) {
        this.dom.newsMount.setAttribute('aria-labelledby', activeChip.id);
      }
      activeChip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    this.fetchLiveNews(true, topic);
  }

  async fetchLiveNews(playAudio = true, topic = this.activeTopic) {
    if (this.newsAbortController) {
      try {
        this.newsAbortController.abort();
      } catch (_) {}
    }

    const controller = new AbortController();
    this.newsAbortController = controller;
    this.isFetchingNews = true;
    if (playAudio) audio?.click(1400);

    const spin = this.dom.btnRefreshNews?.querySelector('.spin-icon');
    if (spin) spin.classList.add('spinning');
    this.dom.btnRefreshNews?.setAttribute('aria-busy', 'true');
    this.dom.newsMount?.setAttribute('aria-busy', 'true');
    if (this.dom.newsSyncLabel) this.dom.newsSyncLabel.textContent = 'Syncing...';

    const topicQueries = {
      all: 'artificial intelligence OR creative coding OR webgl',
      ai: 'artificial intelligence OR LLM OR agents',
      growth: 'interactive design OR accessibility OR storytelling',
      tech: 'software engineering OR typescript OR rust OR python',
    };

    const query = topicQueries[topic] || topicQueries.all;
    const topicLabel = TOPIC_LABELS[topic] || TOPIC_LABELS.all;
    let timeoutId = null;
    let syncedLive = false;

    try {
      timeoutId = setTimeout(() => controller.abort(new Error('timeout')), 6000);
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=6`,
        { signal: controller.signal }
      );
      if (res.ok) {
        const data = await res.json();
        const liveNews = Array.isArray(data.hits)
          ? data.hits
              .filter((h) => h.title && (h.url || h.story_url))
              .map((h, i) => ({
                id: `live-${h.objectID || i}`,
                source: h.author ? `HN / @${h.author}` : 'Hacker News Live',
                time: this.formatTimeAgo(h.created_at_i),
                title: h.title,
                summary: `Trending discussion with ${h.points || 0} points and ${h.num_comments || 0} engineer comments.`,
                category: topic.toUpperCase(),
                url: h.url || h.story_url || `https://news.ycombinator.com/item?id=${h.objectID}`,
                isLive: true,
              }))
          : [];

        if (liveNews.length > 0) {
          this.newsItems = [...liveNews.slice(0, 4), ...CURATED_TESLA_NEWS.slice(0, 2)];
          this.newsStatusNote = '';
          this.hasLoadedLiveNews = true;
          this.lastNewsSyncMs = Date.now();
          syncedLive = true;
        } else {
          this.newsItems = [...CURATED_TESLA_NEWS];
          this.newsStatusNote = `No live matches for ${topicLabel} — showing curated signal archive.`;
        }
      } else {
        this.newsItems = [...CURATED_TESLA_NEWS];
        this.newsStatusNote = `Live radar returned HTTP ${res.status} — showing curated signal archive.`;
      }
    } catch (e) {
      if (e?.name === 'AbortError' && this.newsAbortController !== controller) {
        return;
      }
      this.newsItems = [...CURATED_TESLA_NEWS];
      this.newsStatusNote = 'Showing curated signal archive (live radar offline).';
      console.warn('Tesla news fetch notice:', e);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      if (this.newsAbortController !== controller) return;

      this.newsAbortController = null;
      this.isFetchingNews = false;
      if (spin) spin.classList.remove('spinning');
      this.dom.btnRefreshNews?.removeAttribute('aria-busy');
      this.dom.newsMount?.removeAttribute('aria-busy');
      if (this.dom.newsSyncLabel) this.dom.newsSyncLabel.textContent = 'Sync';
      this.renderNews();

      if (playAudio) {
        this.announceStatus(
          syncedLive
            ? `${topicLabel} radar synced with ${this.newsItems.length} signals.`
            : `${topicLabel} showing ${this.newsItems.length} curated signals.`
        );
      }
    }
  }

  renderNews() {
    if (!this.dom.newsMount) return;

    const statusHtml = this.newsStatusNote
      ? `<div class="tesla-news-status">${this.escapeHtml(this.newsStatusNote)}</div>`
      : '';

    const cardsHtml = this.newsItems
      .map(
        (news) => `
        <article class="tesla-news-card">
          <div class="tn-top-row">
            <span class="tn-source">${this.escapeHtml(news.source)}</span>
            <span class="tn-time">${this.escapeHtml(news.time)}</span>
          </div>
          <a href="${this.sanitizeUrl(news.url)}" target="_blank" rel="noopener noreferrer" class="tn-title-link">
            <span>${this.escapeHtml(news.title)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <p class="tn-summary">${this.escapeHtml(news.summary)}</p>
          <div class="tn-footer">
            <span class="tn-category">#${this.escapeHtml(news.category)}</span>
            <span class="tn-pulse-tag ${news.isLive ? '' : 'is-curated'}"><span aria-hidden="true">●</span> ${news.isLive ? 'LIVE STREAM' : 'CURATED ARCHIVE'}</span>
          </div>
        </article>
      `
      )
      .join('');

    this.dom.newsMount.innerHTML = statusHtml + cardsHtml;
  }

  formatTimeAgo(timestampSeconds) {
    if (!timestampSeconds) return 'Just now';
    const seconds = Math.max(0, Math.floor(Date.now() / 1000 - timestampSeconds));
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  sanitizeUrl(url) {
    if (!url) return '#';
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        return parsed.href;
      }
    } catch (e) {}
    return '#';
  }
}

function THREE_LERP(a, b, t) {
  return a + (b - a) * t;
}
