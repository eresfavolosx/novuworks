// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Executive Thought Leadership & Intel Radar
//  Better than LinkedIn: 100% signal, zero noise, interactive Databricks/PySpark
//  code execution, verified case metrics, and real-time MarTech API feeds.
// ─────────────────────────────────────────────────────────────

import { INTEL_POSTS, INDUSTRY_PULSE_METRICS, CURATED_INDUSTRY_NEWS } from './data.js';
import { audio } from './audio.js';

export class IntelFeed {
  constructor(containerEl, showToastFn = null) {
    this.container = containerEl;
    this.showToast = showToastFn || ((msg) => console.log(msg));
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.expandedPostIds = new Set(['post-01']); // First post expanded by default
    this.newsItems = [...CURATED_INDUSTRY_NEWS];
    this.radarTopic = 'growth';
    this.isFetchingLiveNews = false;
    this.lastLiveSync = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Load stored reactions or initialize defaults
    this.reactions = this.loadReactions();

    this.render();
    this.bindEvents();
    this.fetchLiveNews(false); // background initial live sync
  }

  loadReactions() {
    try {
      const stored = localStorage.getItem('fv_intel_reactions');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    const defaults = {};
    INTEL_POSTS.forEach((p) => {
      defaults[p.id] = { ...p.reactions };
    });
    return defaults;
  }

  saveReactions() {
    try {
      localStorage.setItem('fv_intel_reactions', JSON.stringify(this.reactions));
    } catch (e) {
      // ignore
    }
  }

  getFilteredPosts() {
    return INTEL_POSTS.filter((post) => {
      const matchesFilter =
        this.activeFilter === 'all' ||
        post.tags.some((t) => t.toLowerCase().includes(this.activeFilter.toLowerCase()));

      const q = this.searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="intel-feed-wrapper">
        <!-- Executive Header & Why This Beats LinkedIn Banner -->
        <header class="feed-top-header">
          <div class="feed-title-block">
            <div class="feed-kicker-row">
              <span class="feed-kicker">EXECUTIVE THOUGHT LEADERSHIP & MARTECH RADAR</span>
              <span class="feed-live-badge">
                <span class="pulse-radar-dot"></span>
                <span>Live Feed Active</span>
              </span>
            </div>
            <h2 class="feed-main-heading">Thought Leadership & Live Industry Radar</h2>
            <p class="feed-main-sub">
              An unconstrained, high-signal stream of growth engineering playbooks, RevOps telemetry analyses, applied AI frameworks, and real-time MarTech/AdTech industry news.
            </p>
          </div>

          <!-- Why This Beats LinkedIn Value Matrix -->
          <div class="linkedin-killer-card">
            <div class="lk-header">
              <span class="lk-title">THE HIGH-SIGNAL ADVANTAGE (VS. LINKEDIN)</span>
              <span class="lk-tag">100% Signal · 0% Fluff</span>
            </div>
            <div class="lk-grid">
              <div class="lk-pill">
                <span class="lk-icon">⚡</span>
                <span class="lk-text"><strong>Zero Algorithmic Throttling:</strong> Unfiltered technical frameworks without sponsored ads or clickbait engagement loops.</span>
              </div>
              <div class="lk-pill">
                <span class="lk-icon">📊</span>
                <span class="lk-text"><strong>Executable Code & Telemetry:</strong> Real Databricks SQL, PySpark classifiers, and TypeScript AI agents rendered natively.</span>
              </div>
              <div class="lk-pill">
                <span class="lk-icon">🔒</span>
                <span class="lk-text"><strong>Direct Candidate Access:</strong> Instant collaboration and strategic scheduling with zero paywalled InMail barriers.</span>
              </div>
              <div class="lk-pill">
                <span class="lk-icon">🌐</span>
                <span class="lk-text"><strong>Live Industry Feeds:</strong> Continuous telemetry monitoring across Google, Meta, Databricks, and global ad auctions.</span>
              </div>
            </div>
          </div>

          <!-- Real-Time Industry Telemetry Ticker Ribbon -->
          <div class="industry-pulse-ticker">
            <div class="pulse-ticker-inner">
              <span class="pulse-label">LIVE AUCTION & MARTECH TELEMETRY:</span>
              <div class="pulse-chips-row">
                ${INDUSTRY_PULSE_METRICS.map(
                  (m) => `
                  <div class="pulse-chip">
                    <span class="chip-name">${m.name}:</span>
                    <span class="chip-val" style="color: ${m.color}; font-weight: 800;">${m.value}</span>
                    <span class="chip-status">(${m.status})</span>
                  </div>
                `
                ).join('')}
              </div>
            </div>
          </div>
        </header>

        <!-- Verified LinkedIn Profile & Live Post Mirror Banner -->
        <section class="linkedin-live-mirror-banner" aria-label="LinkedIn Verified Stream">
          <div class="llm-card">
            <div class="llm-left">
              <div class="llm-avatar-wrap">
                <img src="/assets/fabian-velez.jpg" alt="Fabián Vélez Vicente" class="llm-avatar" />
                <span class="llm-in-badge" title="LinkedIn Verified Profile">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </span>
              </div>
              <div class="llm-details">
                <div class="llm-name-row">
                  <span class="llm-name">Fabián Vélez Vicente</span>
                  <span class="llm-sync-status">
                    <span class="status-pulse-dot"></span>
                    <span>Live LinkedIn Feed Mirror Active</span>
                  </span>
                </div>
                <div class="llm-headline">Performance Marketing Lead & Technical Product Manager · Level ICS4 · 8+ Years</div>
                <div class="llm-meta-row">
                  <span class="llm-stat"><strong>1,500+</strong> Network Connections</span>
                  <span class="llm-dot">·</span>
                  <span class="llm-stat">Money Group (Full-Time) & Red Ventures (edX)</span>
                  <span class="llm-dot">·</span>
                  <span class="llm-stat">San Juan, PR (US Remote)</span>
                </div>
              </div>
            </div>
            <div class="llm-actions">
              <a href="https://linkedin.com/in/fabian-velez-vicente" target="_blank" rel="noopener noreferrer" class="luxury-btn primary-gold llm-connect-btn" title="Open Fabian's LinkedIn profile in new tab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>Connect on LinkedIn</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </section>

        <!-- Dual-Stream Layout: Main Playbooks (Left) + Live Radar (Right) -->
        <div class="feed-dual-layout">
          <!-- Left Stream: Fabián's Verified Playbooks -->
          <section class="feed-main-stream" aria-label="Fabián's Growth Engineering Feed">
            <!-- Filter & Search Controls -->
            <div class="feed-controls-bar">
              <div class="feed-filter-chips">
                <button type="button" class="filter-chip ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">All Playbooks (${INTEL_POSTS.length})</button>
                <button type="button" class="filter-chip ${this.activeFilter === 'Growth Engineering' ? 'active' : ''}" data-filter="Growth Engineering">Growth Engineering</button>
                <button type="button" class="filter-chip ${this.activeFilter === 'RevOps Analytics' ? 'active' : ''}" data-filter="RevOps Analytics">RevOps Analytics</button>
                <button type="button" class="filter-chip ${this.activeFilter === 'Applied AI' ? 'active' : ''}" data-filter="Applied AI">Applied AI</button>
                <button type="button" class="filter-chip ${this.activeFilter === 'AdTech / Attribution' ? 'active' : ''}" data-filter="AdTech / Attribution">AdTech & Attribution</button>
              </div>
              <div class="feed-search-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="feed-search-input" class="feed-search-input" placeholder="Search insights, SQL, PySpark, CAPI..." value="${this.escapeHtml(this.searchQuery)}" />
              </div>
            </div>

            <!-- Posts Stream Mount -->
            <div class="feed-posts-list" id="feed-posts-mount">
              ${this.renderPostsHtml()}
            </div>
          </section>

          <!-- Right Stream: Real-Time MarTech & AdTech Industry Radar -->
          <aside class="feed-sidebar-radar" aria-label="Real-Time Industry News and Telemetry">
            <!-- Live Industry News Widget -->
            <div class="radar-card">
              <div class="radar-card-header">
                <div class="radar-title-group">
                  <span class="radar-badge">
                    <span class="live-dot green"></span>
                    <span>LIVE INDUSTRY RADAR</span>
                  </span>
                  <h3 class="radar-heading">MarTech & AdTech Stream</h3>
                  <span class="radar-sync-time">Synced: ${this.lastLiveSync}</span>
                </div>
                <button type="button" class="radar-refresh-btn ${this.isFetchingLiveNews ? 'spinning' : ''}" id="btn-refresh-radar" title="Fetch Latest Live News & AdTech Updates">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  <span>Sync API</span>
                </button>
              </div>

              <!-- Multi-Topic Real-Time Radar Switcher -->
              <div class="radar-topic-switcher" role="group" aria-label="Select News Feed Topic">
                <button type="button" class="radar-topic-btn ${this.radarTopic === 'growth' ? 'active' : ''}" data-topic="growth">🚀 Growth</button>
                <button type="button" class="radar-topic-btn ${this.radarTopic === 'ai' ? 'active' : ''}" data-topic="ai">🤖 AI</button>
                <button type="button" class="radar-topic-btn ${this.radarTopic === 'data' ? 'active' : ''}" data-topic="data">📊 Big Data</button>
                <button type="button" class="radar-topic-btn ${this.radarTopic === 'tech' ? 'active' : ''}" data-topic="tech">⚡ Startups</button>
              </div>

              <div class="radar-news-list" id="radar-news-mount">
                ${this.renderNewsHtml()}
              </div>
            </div>

            <!-- Global Platform API Health Monitor -->
            <div class="radar-card platform-health-card">
              <div class="radar-card-header">
                <span class="radar-badge">
                  <span class="live-dot blue"></span>
                  <span>INFRASTRUCTURE TELEMETRY</span>
                </span>
                <h4 class="radar-sub-heading">MarTech & Data Stack SLA</h4>
              </div>
              <div class="platform-sla-list">
                <div class="sla-row">
                  <div class="sla-name">
                    <span class="sla-dot green"></span>
                    <span>Google Ads & CAPI Gateway</span>
                  </div>
                  <span class="sla-metric">99.98% · 24ms</span>
                </div>
                <div class="sla-row">
                  <div class="sla-name">
                    <span class="sla-dot green"></span>
                    <span>Meta Graph API & Conversions API</span>
                  </div>
                  <span class="sla-metric">99.95% · 36ms</span>
                </div>
                <div class="sla-row">
                  <div class="sla-name">
                    <span class="sla-dot green"></span>
                    <span>Databricks Delta Lake Cluster</span>
                  </div>
                  <span class="sla-metric">142ms Execution</span>
                </div>
                <div class="sla-row">
                  <div class="sla-name">
                    <span class="sla-dot green"></span>
                    <span>GA4 Measurement Protocol v2</span>
                  </div>
                  <span class="sla-metric">100% Uptime</span>
                </div>
                <div class="sla-row">
                  <div class="sla-name">
                    <span class="sla-dot green"></span>
                    <span>Salesforce CRM Lakehouse Sync</span>
                  </div>
                  <span class="sla-metric">Real-Time</span>
                </div>
              </div>
            </div>

            <!-- Executive Newsletter & Direct Connect Card -->
            <div class="radar-card newsletter-cta-card">
              <div class="nl-kicker">MONTHLY STRATEGIC BRIEFING</div>
              <h4 class="nl-title">The Growth Engineering Memo</h4>
              <p class="nl-desc">
                High-leverage RevOps architectures, prompt engineering templates, and algorithmic media buying case studies sent once a month.
              </p>
              <form class="nl-form" id="feed-newsletter-form">
                <input type="email" class="nl-input" id="nl-email-input" placeholder="your.email@company.com" required />
                <button type="submit" class="nl-submit-btn">Subscribe</button>
              </form>
              <div class="nl-footer-links">
                <a href="https://linkedin.com/in/fabian-velez-vicente" target="_blank" rel="noopener" class="nl-linkedin-link">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>Follow on LinkedIn</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  renderPostsHtml() {
    const posts = this.getFilteredPosts();
    if (posts.length === 0) {
      return `
        <div class="feed-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <div class="empty-title">No matching playbooks found</div>
          <div class="empty-desc">Try clearing your search query or selecting "All Playbooks".</div>
          <button type="button" class="luxury-btn primary-gold" id="btn-reset-feed-filters" style="margin-top: 14px; font-size: 11px;">
            Reset Filters
          </button>
        </div>
      `;
    }

    return posts
      .map((post) => {
        const isExpanded = this.expandedPostIds.has(post.id);
        const reactions = this.reactions[post.id] || post.reactions;

        return `
        <article class="intel-post-card" id="card-${post.id}" data-post-id="${post.id}">
          <!-- Post Author & Accreditations Header -->
          <div class="post-header-row">
            <div class="post-author-block">
              <div class="post-avatar-wrap">
                <img src="${post.author.avatar}" alt="${post.author.name}" class="post-author-img" />
                <span class="post-nw-dot" title="Novu Works Verified"></span>
              </div>
              <div class="post-author-meta">
                <div class="post-author-name-row">
                  <h3 class="post-author-name">${post.author.name}</h3>
                  <span class="post-verified-badge" title="Verified Track Record">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </span>
                </div>
                <span class="post-author-title">${post.author.title}</span>
                <span class="post-employer-pill">${post.author.badge}</span>
              </div>
            </div>
            <div class="post-timestamp-group">
              <a href="https://linkedin.com/in/fabian-velez-vicente" target="_blank" rel="noopener noreferrer" class="post-linkedin-pill" title="Mirrored from Fabian's verified LinkedIn feed">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn Post</span>
              </a>
              <span class="post-date">${post.publishedAt}</span>
              <span class="post-read-time">· ${post.readTime}</span>
            </div>
          </div>

          <!-- Tags & Metrics Highlight -->
          <div class="post-tags-row">
            <div class="post-tag-chips">
              ${post.tags.map((t) => `<span class="post-tag">#${t}</span>`).join('')}
            </div>
            <span class="post-metric-badge">${post.metricsBadge}</span>
          </div>

          <!-- Post Content -->
          <div class="post-body">
            <h4 class="post-title" data-action="toggle-expand">${post.title}</h4>
            <p class="post-summary">${post.summary}</p>

            ${
              isExpanded
                ? `
              <div class="post-expanded-content">
                ${post.content}
              </div>
            `
                : ''
            }
          </div>

          <!-- Expand / Collapse Bar -->
          <div class="post-expand-toggle-bar">
            <button type="button" class="post-toggle-btn" data-action="toggle-expand">
              <span>${isExpanded ? 'Collapse Full Playbook' : 'Read Full Playbook & Code'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: ${isExpanded ? 'rotate(180deg)' : 'none'}; transition: transform 0.2s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          <!-- Post Reactive Footer -->
          <footer class="post-footer">
            <div class="post-reactions-group">
              <button type="button" class="reaction-btn" data-reaction="insightful" title="Insightful Framework">
                <span class="react-emoji">💡</span>
                <span class="react-label">Insight</span>
                <span class="react-count">${reactions.insightful}</span>
              </button>
              <button type="button" class="reaction-btn" data-reaction="applaud" title="Applaud Execution">
                <span class="react-emoji">👏</span>
                <span class="react-label">Applaud</span>
                <span class="react-count">${reactions.applaud}</span>
              </button>
              <button type="button" class="reaction-btn" data-reaction="scale" title="Ready to Scale">
                <span class="react-emoji">🚀</span>
                <span class="react-label">Scale</span>
                <span class="react-count">${reactions.scale}</span>
              </button>
              <button type="button" class="reaction-btn" data-reaction="bookmarked" title="Bookmark Insight">
                <span class="react-emoji">🔖</span>
                <span class="react-label">Save</span>
                <span class="react-count">${reactions.bookmarked}</span>
              </button>
            </div>

            <div class="post-actions-group">
              <a href="https://linkedin.com/in/fabian-velez-vicente" target="_blank" rel="noopener noreferrer" class="post-action-btn post-action-linkedin" title="View & discuss on LinkedIn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <button type="button" class="post-action-btn" data-action="copy-post" title="Copy clean playbook text to clipboard">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
              <a href="mailto:fabianvvicente1@gmail.com?subject=Strategic%20Discussion:%20${encodeURIComponent(post.title)}" class="post-action-btn discuss-btn" title="Discuss this playbook directly with Fabián">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <span>Discuss with Fabián</span>
              </a>
            </div>
          </footer>
        </article>
      `;
      })
      .join('');
  }

  renderNewsHtml() {
    return this.newsItems
      .map(
        (news) => `
        <div class="radar-news-item">
          <div class="r-news-top">
            <span class="r-news-source">${this.escapeHtml(news.source)}</span>
            <span class="r-news-time">${this.escapeHtml(news.time)}</span>
          </div>
          <a href="${this.escapeHtml(news.url)}" target="_blank" rel="noopener noreferrer" class="r-news-title">
            <span>${this.escapeHtml(news.title)}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <p class="r-news-summary">${this.escapeHtml(news.summary)}</p>
          <span class="r-news-cat">#${this.escapeHtml(news.category)}</span>
        </div>
      `
      )
      .join('');
  }

  async fetchLiveNews(playAudio = true, topic = this.radarTopic) {
    if (this.isFetchingLiveNews) return;
    this.isFetchingLiveNews = true;
    if (playAudio) audio.click(1200);

    const refreshBtn = this.container.querySelector('#btn-refresh-radar');
    if (refreshBtn) refreshBtn.classList.add('spinning');

    const topicQueries = {
      growth: 'advertising+analytics+meta+attribution',
      ai: 'claude+anthropic+openai+agentic',
      data: 'databricks+pyspark+sql+analytics',
      tech: 'startups+software+engineering',
    };
    const topicLabels = {
      growth: 'AdTech & Media Stream',
      ai: 'Applied AI & Agents Stream',
      data: 'Big Data & Telemetry Stream',
      tech: 'Engineering & Startups Stream',
    };

    const query = topicQueries[topic] || topicQueries.growth;
    const categoryLabel = topicLabels[topic] || 'Live Industry Stream';

    try {
      // Connect to Hacker News Algolia Search API dynamically
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=6`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.hits && data.hits.length > 0) {
          const liveArticles = data.hits
            .filter((h) => h.title && (h.url || h.story_url))
            .map((h, i) => ({
              id: `live-${h.objectID || i}`,
              source: h.author ? `HN / @${h.author}` : 'Hacker News Live',
              time: this.formatRelativeTime(h.created_at_i),
              title: h.title,
              summary: `Live trending discussion with ${h.points || 0} points and ${h.num_comments || 0} engineer comments.`,
              category: categoryLabel,
              url: h.url || h.story_url || `https://news.ycombinator.com/item?id=${h.objectID}`,
            }));

          if (liveArticles.length > 0) {
            this.newsItems = [...liveArticles.slice(0, 4), ...CURATED_INDUSTRY_NEWS.slice(0, 2)];
          }
        }
      }
    } catch (e) {
      console.warn('Live API news fetch notice (using curated stream):', e);
    } finally {
      this.isFetchingLiveNews = false;
      this.lastLiveSync = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (refreshBtn) refreshBtn.classList.remove('spinning');

      const mount = this.container.querySelector('#radar-news-mount');
      if (mount) mount.innerHTML = this.renderNewsHtml();

      const timeEl = this.container.querySelector('.radar-sync-time');
      if (timeEl) timeEl.textContent = `Synced: ${this.lastLiveSync}`;

      if (playAudio) {
        audio.confirm();
        this.showToast('Live MarTech & AdTech radar synchronized');
      }
    }
  }

  formatRelativeTime(unixSecs) {
    if (!unixSecs) return 'Recently';
    const diffMin = Math.round((Date.now() / 1000 - unixSecs) / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.round(diffHours / 24)}d ago`;
  }

  bindEvents() {
    // 1. Filter Chips
    this.container.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (chip) {
        const filter = chip.dataset.filter;
        this.activeFilter = filter;
        audio.click(900);
        this.container.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.updatePosts();
      }

      // 2. Expand / Collapse Playbook
      const expandTarget = e.target.closest('[data-action="toggle-expand"]');
      if (expandTarget) {
        const card = expandTarget.closest('.intel-post-card');
        if (card) {
          const postId = card.dataset.postId;
          if (this.expandedPostIds.has(postId)) {
            this.expandedPostIds.delete(postId);
            audio.click(750);
          } else {
            this.expandedPostIds.add(postId);
            audio.click(1050);
          }
          this.updatePosts();
        }
      }

      // 3. Reactions
      const reactionBtn = e.target.closest('.reaction-btn');
      if (reactionBtn) {
        const card = reactionBtn.closest('.intel-post-card');
        const reactionKey = reactionBtn.dataset.reaction;
        if (card && reactionKey) {
          const postId = card.dataset.postId;
          if (!this.reactions[postId]) {
            this.reactions[postId] = { insightful: 0, applaud: 0, scale: 0, bookmarked: 0 };
          }
          this.reactions[postId][reactionKey] = (this.reactions[postId][reactionKey] || 0) + 1;
          this.saveReactions();
          audio.click(1400);

          const countSpan = reactionBtn.querySelector('.react-count');
          if (countSpan) countSpan.textContent = this.reactions[postId][reactionKey];
          reactionBtn.classList.add('reacted');
          setTimeout(() => reactionBtn.classList.remove('reacted'), 400);
        }
      }

      // 4. Copy Playbook Action
      const copyBtn = e.target.closest('[data-action="copy-post"]');
      if (copyBtn) {
        const card = copyBtn.closest('.intel-post-card');
        if (card) {
          const postId = card.dataset.postId;
          const post = INTEL_POSTS.find((p) => p.id === postId);
          if (post) {
            const cleanText = `${post.title.toUpperCase()}\nBy Fabián Vélez Vicente (${post.author.badge})\n\n${post.summary}\n\nRead more frameworks at https://novu.works`;
            navigator.clipboard.writeText(cleanText).then(() => {
              audio.confirm();
              this.showToast('Playbook copied to clipboard');
            });
          }
        }
      }

      // 5. Refresh Radar Button
      if (e.target.closest('#btn-refresh-radar')) {
        this.fetchLiveNews(true, this.radarTopic);
      }

      // 5b. News Topic Switcher
      const topicBtn = e.target.closest('.radar-topic-btn');
      if (topicBtn) {
        const topic = topicBtn.dataset.topic;
        if (topic && topic !== this.radarTopic) {
          this.radarTopic = topic;
          this.container.querySelectorAll('.radar-topic-btn').forEach((b) => b.classList.toggle('active', b === topicBtn));
          this.fetchLiveNews(true, topic);
        }
      }

      // 6. Reset Filters Button in Empty State
      if (e.target.closest('#btn-reset-feed-filters')) {
        this.activeFilter = 'all';
        this.searchQuery = '';
        const searchInput = this.container.querySelector('#feed-search-input');
        if (searchInput) searchInput.value = '';
        this.container.querySelectorAll('.filter-chip').forEach((c) => {
          c.classList.toggle('active', c.dataset.filter === 'all');
        });
        audio.click(800);
        this.updatePosts();
      }
    });

    // Search Input
    const searchInput = this.container.querySelector('#feed-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.updatePosts();
      });
    }

    // Newsletter Form
    const nlForm = this.container.querySelector('#feed-newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = nlForm.querySelector('#nl-email-input');
        if (emailInput && emailInput.value) {
          audio.confirm();
          this.showToast(`Subscribed! Strategic Memo will be delivered to ${emailInput.value}`);
          emailInput.value = '';
        }
      });
    }
  }

  updatePosts() {
    const mount = this.container.querySelector('#feed-posts-mount');
    if (mount) {
      mount.innerHTML = this.renderPostsHtml();
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
