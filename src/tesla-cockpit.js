// ─────────────────────────────────────────────────────────────
//  Novu Works — Fullscreen Tesla In-Car Cockpit HUD Dashboard
//  Transforms the portfolio into an edge-to-edge, cinematic,
//  multi-panel telemetry cockpit featuring "About Fabián" metrics,
//  6DoF artificial horizon, live clock/weather/battery, and
//  a real-time streaming news radar (Hacker News Algolia API).
// ─────────────────────────────────────────────────────────────

import { audio } from './audio.js';
import { logCandidateEvent } from './firebase.js';
import { getLanguage } from './i18n.js';

export const CURATED_TESLA_NEWS = [
  {
    id: 't-news-1',
    source: 'TechCrunch / Growth AI',
    time: '24m ago',
    title: 'Autonomous AI Agents Take Over Enterprise Ad-Tech and B2B Pipeline Orchestration',
    summary: 'How decision science teams are replacing legacy funnel dashboards with real-time multi-agent LLM systems that autonomously balance media spend.',
    category: 'AI & Automation',
    url: 'https://news.ycombinator.com',
  },
  {
    id: 't-news-2',
    source: 'MarTech Today',
    time: '42m ago',
    title: 'Server-Side CAPI and First-Party Identity Resolution Become Table Stakes for Scale',
    summary: 'Meta and Google conversion modeling show -38% CAC reduction when high-frequency event deduplication is deployed on custom cloud edge workers.',
    category: 'Growth & AdTech',
    url: 'https://news.ycombinator.com',
  },
  {
    id: 't-news-3',
    source: 'Hacker News Live',
    time: '1h ago',
    title: 'Databricks and Lakehouse Architectures Powering Next-Gen Decision Science in RevOps',
    summary: 'Normalization of 40M+ telemetry sessions allows quantitative product teams to predict user retention curves before day-7 activation.',
    category: 'Big Data & RevOps',
    url: 'https://news.ycombinator.com',
  },
  {
    id: 't-news-4',
    source: 'VentureBeat',
    time: '2h ago',
    title: 'Stanford Innovation Fellows Highlight The Convergence of Software Engineering and Growth',
    summary: 'Cross-functional technical product leaders who bridge high-performance code with ROI engineering outpace siloed marketing teams.',
    category: 'Engineering & Leadership',
    url: 'https://news.ycombinator.com',
  },
];

export class TeslaCockpitDashboard {
  constructor(app = null) {
    this.app = app;
    this.isOpen = false;
    this.activeTopic = 'all';
    this.newsItems = [...CURATED_TESLA_NEWS];
    this.isFetchingNews = false;
    this.clockInterval = null;
    this.newsSyncInterval = null;

    this.dom = {
      container: document.getElementById('tesla-cockpit-hud'),
      btnClose: document.getElementById('btn-exit-tesla-cockpit'),
      clockDisplay: document.getElementById('tesla-clock-display'),
      weatherTemp: document.getElementById('tesla-weather-temp'),
      weatherIcon: document.getElementById('tesla-weather-icon'),
      gpsDist: document.getElementById('tesla-gps-dist'),
      battLevel: document.getElementById('tesla-batt-level'),
      horizonRing: document.getElementById('tesla-horizon-ring'),
      pitchReadout: document.getElementById('tesla-pitch-readout'),
      rollReadout: document.getElementById('tesla-roll-readout'),
      newsMount: document.getElementById('tesla-news-mount'),
      btnRefreshNews: document.getElementById('btn-tesla-refresh-news'),
      btnOpenRecruiter: document.getElementById('btn-tesla-open-recruiter'),
      btnOpenWa: document.getElementById('btn-tesla-open-wa'),
    };
  }

  init() {
    if (!this.dom.container) return;

    this.bindEvents();
    this.startClock();
    this.initBattery();
    this.renderNews();
    this.fetchLiveNews(false);
  }

  bindEvents() {
    // 1. Exit Cockpit Button
    this.dom.btnClose?.addEventListener('click', () => {
      this.close();
    });

    // 2. Escape Key to Exit
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // 3. News Filter Chips
    this.dom.container?.querySelectorAll('.tesla-filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic || 'all';
        this.setTopic(topic);
      });
    });

    // 4. Refresh News Button
    this.dom.btnRefreshNews?.addEventListener('click', () => {
      this.fetchLiveNews(true);
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

  open() {
    audio?.confirm();
    if (!this.dom.container) return;

    this.isOpen = true;
    this.dom.container.removeAttribute('hidden');
    this.dom.container.classList.add('active');
    document.body.classList.add('tesla-cockpit-active');
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

    // Synchronize current weather and GPS if spatial engine is active
    if (this.app?.spatial) {
      const geo = this.app.spatial.geodesic;
      if (geo && this.dom.gpsDist) {
        this.dom.gpsDist.textContent = `${geo.distanceMiles} mi away (${geo.cardinal})`;
      }
    }

    this.updateClock();
    this.renderNews();

    // Auto-sync news every 60s while cockpit is open
    this.newsSyncInterval = setInterval(() => {
      if (this.isOpen) this.fetchLiveNews(false);
    }, 60000);

    logCandidateEvent('tesla_cockpit_opened', { view: this.app?.currentView || 'core' });
    if (typeof this.app?.showToast === 'function') {
      this.app.showToast('🚗 Tesla Fullscreen Cockpit Activated (Press ESC to Exit)');
    }
  }

  close(triggerToast = true) {
    audio?.click(900);
    if (!this.dom.container) return;

    this.isOpen = false;
    this.dom.container.setAttribute('hidden', '');
    this.dom.container.classList.remove('active');
    document.body.classList.remove('tesla-cockpit-active');
    this.app?.updateTeslaButton?.(false);

    // Exit fullscreen if active
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}

    if (this.newsSyncInterval) {
      clearInterval(this.newsSyncInterval);
      this.newsSyncInterval = null;
    }

    if (triggerToast && typeof this.app?.showToast === 'function') {
      this.app.showToast('✓ Tesla Cockpit Closed · Standard Viewport Restored');
    }
  }

  startClock() {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    if (!this.dom.clockDisplay) return;
    const now = new Date();
    this.dom.clockDisplay.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
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

    // Pitch: vertical offset of horizon line (-30 to +30px)
    // Roll: rotation in degrees (-45 to +45 deg)
    const pitchPx = THREE_LERP(0, -tiltY * 38, 0.2);
    const rollDeg = THREE_LERP(0, tiltX * 28, 0.2);

    this.dom.horizonRing.style.transform = `rotate(${rollDeg}deg)`;
    const horizonLine = this.dom.horizonRing.querySelector('.horizon-line');
    if (horizonLine) {
      horizonLine.style.transform = `translateY(${pitchPx}px)`;
    }

    if (this.dom.pitchReadout) {
      this.dom.pitchReadout.textContent = `${(tiltY * 30).toFixed(1)}°`;
    }
    if (this.dom.rollReadout) {
      this.dom.rollReadout.textContent = `${(tiltX * 30).toFixed(1)}°`;
    }
  }

  setTopic(topic) {
    audio?.click(1300);
    this.activeTopic = topic;
    this.dom.container?.querySelectorAll('.tesla-filter-chip').forEach((c) => {
      c.classList.toggle('active', (c.dataset.topic || 'all') === topic);
    });
    this.fetchLiveNews(true, topic);
  }

  async fetchLiveNews(playAudio = true, topic = this.activeTopic) {
    if (this.isFetchingNews) return;
    this.isFetchingNews = true;
    if (playAudio) audio?.click(1400);

    const spin = this.dom.btnRefreshNews?.querySelector('.spin-icon');
    if (spin) spin.classList.add('spinning');

    const topicQueries = {
      all: 'artificial intelligence OR adtech OR growth engineering',
      ai: 'artificial intelligence OR LLM OR agents',
      growth: 'growth marketing OR adtech OR conversion rate',
      tech: 'software engineering OR typescript OR rust OR python',
    };

    const query = topicQueries[topic] || topicQueries.all;

    try {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=6`,
        { signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.hits && data.hits.length > 0) {
          const liveNews = data.hits
            .filter((h) => h.title && (h.url || h.story_url))
            .map((h, i) => ({
              id: `live-${h.objectID || i}`,
              source: h.author ? `HN / @${h.author}` : 'Hacker News Live',
              time: this.formatTimeAgo(h.created_at_i),
              title: h.title,
              summary: `Trending discussion with ${h.points || 0} points and ${h.num_comments || 0} engineer comments.`,
              category: topic.toUpperCase(),
              url: h.url || h.story_url || `https://news.ycombinator.com/item?id=${h.objectID}`,
            }));

          if (liveNews.length > 0) {
            this.newsItems = [...liveNews.slice(0, 4), ...CURATED_TESLA_NEWS.slice(0, 2)];
          }
        }
      }
    } catch (e) {
      console.warn('Tesla news fetch notice:', e);
    } finally {
      this.isFetchingNews = false;
      if (spin) spin.classList.remove('spinning');
      this.renderNews();
    }
  }

  renderNews() {
    if (!this.dom.newsMount) return;

    this.dom.newsMount.innerHTML = this.newsItems
      .map(
        (news) => `
        <article class="tesla-news-card">
          <div class="tn-top-row">
            <span class="tn-source">${this.escapeHtml(news.source)}</span>
            <span class="tn-time">${this.escapeHtml(news.time)}</span>
          </div>
          <a href="${this.sanitizeUrl(news.url)}" target="_blank" rel="noopener noreferrer" class="tn-title-link">
            <span>${this.escapeHtml(news.title)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <p class="tn-summary">${this.escapeHtml(news.summary)}</p>
          <div class="tn-footer">
            <span class="tn-category">#${this.escapeHtml(news.category)}</span>
            <span class="tn-pulse-tag">● LIVE STREAM</span>
          </div>
        </article>
      `
      )
      .join('');
  }

  formatTimeAgo(timestampSeconds) {
    if (!timestampSeconds) return 'Just now';
    const seconds = Math.floor(Date.now() / 1000 - timestampSeconds);
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
