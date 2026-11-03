// ─────────────────────────────────────────────────────────────
//  Novu Works — Live GitHub Codebase Radar & Creative Tech Experiments
//  Queries GitHub REST API live for @eresfavolosx
// ─────────────────────────────────────────────────────────────

const CREATIVE_REPO_DESCRIPTIONS = {
  JobHelper:
    'Interactive career synthesis prototype using frontier model orchestration (OpenAI, Claude, Gemini), deterministic tool-calling, a 100-point JSON rubric, and a 1-click Chrome Extension to replace resume anxiety with clarity.',
  BizPay:
    'Human-centric local payment & instant settlement prototype for independent creators in Puerto Rico—pairing ATH Móvil API handshakes with real-time fee-split mathematics for 1.2s payouts.',
  Picta:
    'Assistive 60 FPS WebRTC computer vision camera applying mathematical Daltonization shaders, Euclidean Delta-E pixel sampling, and Web Speech synthesis so 300M+ people with color blindness can see and hear color.',
  NFC:
    'Tocaito: Physical-to-digital Web NFC hardware programmer and progressive web prototype that turns a 0.4s tap of a wristband into a living, over-the-air updatable community pass, verified by a Python QA suite.',
  hackeaporunacausa:
    'Civic hackathon winner: an inviting youth mentorship discovery and scheduling prototype connecting underserved students at Boys & Girls Clubs in Puerto Rico with engineers, scientists, and artists.',
  TokenFund:
    'Puente a Puente & Civic Relief: Open-source community relief and digital library infrastructure connecting 1,000+ citizens across Puerto Rico.',
  FavoBot:
    'Conversational pocket companion built in Python using frontier model tool-calling and asynchronous webhooks to turn system orchestration and creative brainstorming into a natural Telegram chat.',
  novuworks:
    'Fabián Vélez Vicente — Creative Technologist Atelier & Interactive Playground. Three.js WebGL shaders, 60 FPS procedural particle physics, 6DoF gyroscope, and live frontier AI prototypes.',
  Helpr:
    'Community mentorship coordination prototype built for Hackea por una Causa: pairing curious island youth with volunteer creative technologists.',
  'taller-git':
    'Open-source interactive workshop curriculum and hands-on exercises crafted to teach Git & collaborative software making to 5,000+ students in Puerto Rico.',
  CIESESE:
    'Interactive research and fellowship portal connecting Hispanic engineering students with clean-energy and environmental science laboratories.',
  dLiber:
    'Early mobile-first peer-to-peer campus delivery experiment built by students, for students during university hackathon sprints.',
  'HackTurabo-s-Website':
    'Interactive registration and maker hub built with Node.js and Express for the HackTurabo university invention marathon.',
  eresfavolosx:
    'Fabián Vélez Vicente — Creative Technologist, Storytelling Designer & Frontier Systems Maker (Computer Engineering 4.0 GPA · Stanford Innovation Fellow).',
};

const FALLBACK_REPOS = [
  {
    name: 'JobHelper',
    html_url: 'https://github.com/eresfavolosx/JobHelper',
    description: CREATIVE_REPO_DESCRIPTIONS.JobHelper,
    language: 'Python',
    stargazers_count: 5,
    forks_count: 1,
    updated_at: '2026-10-24T17:33:00Z',
  },
  {
    name: 'Picta',
    html_url: 'https://github.com/eresfavolosx/Picta',
    description: CREATIVE_REPO_DESCRIPTIONS.Picta,
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 0,
    updated_at: '2026-10-24T17:28:00Z',
  },
  {
    name: 'NFC',
    html_url: 'https://github.com/eresfavolosx/NFC',
    description: CREATIVE_REPO_DESCRIPTIONS.NFC,
    language: 'TypeScript',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2026-10-24T17:33:37Z',
  },
  {
    name: 'BizPay',
    html_url: 'https://github.com/eresfavolosx/BizPay',
    description: CREATIVE_REPO_DESCRIPTIONS.BizPay,
    language: 'JavaScript',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2026-10-24T17:33:45Z',
  },
  {
    name: 'hackeaporunacausa',
    html_url: 'https://github.com/eresfavolosx/hackeaporunacausa',
    description: CREATIVE_REPO_DESCRIPTIONS.hackeaporunacausa,
    language: 'JavaScript',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: '2026-10-24T17:33:55Z',
  },
  {
    name: 'novuworks',
    html_url: 'https://github.com/eresfavolosx/novuworks',
    description: CREATIVE_REPO_DESCRIPTIONS.novuworks,
    language: 'JavaScript',
    stargazers_count: 6,
    forks_count: 1,
    updated_at: new Date().toISOString(),
  }
];

export class GitHubRadar {
  constructor(mountPoint, options = {}) {
    this.mount = mountPoint;
    this.options = options;
    this.userData = null;
    this.repos = [];
    this.isLoading = true;

    this.renderLoading();
    this.fetchData();
  }

  renderLoading() {
    if (!this.mount) return;
    this.mount.innerHTML = `
      <div class="gh-radar-loading">
        <span class="status-pulse-dot"></span>
        <span>Connecting to GitHub REST API (<code>api.github.com/users/eresfavolosx</code>)...</span>
      </div>
    `;
  }

  async fetchData() {
    try {
      // 1. Fetch User Profile with strict timeout and error boundary
      const userRes = await fetch('https://api.github.com/users/eresfavolosx', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined,
      });
      if (userRes.ok) {
        this.userData = await userRes.json();
      }

      // 2. Fetch Repositories with strict timeout
      const reposRes = await fetch('https://api.github.com/users/eresfavolosx/repos?sort=updated&per_page=6', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined,
      });
      if (reposRes.ok) {
        const data = await reposRes.json();
        if (Array.isArray(data) && data.length > 0) {
          this.repos = data.map((r) => ({
            ...r,
            description: CREATIVE_REPO_DESCRIPTIONS[r.name] || r.description || 'Open-source creative technology experiment and working prototype.',
          }));
        } else {
          this.repos = FALLBACK_REPOS;
        }
      } else {
        this.repos = FALLBACK_REPOS;
      }
    } catch {
      this.repos = FALLBACK_REPOS;
    } finally {
      this.isLoading = false;
      this.render();
    }
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

  sanitizeGithubUrl(url) {
    if (!url) return 'https://github.com/eresfavolosx';
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'https:' && parsed.hostname === 'github.com') {
        return parsed.href;
      }
    } catch (e) {}
    return 'https://github.com/eresfavolosx';
  }

  formatDate(dateStr) {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return this.escapeHtml(dateStr);
    }
  }

  getLangColor(lang) {
    const colors = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'HTML': '#e34c26',
      'HTML / Solidity': '#aa67fe',
      'CSS': '#563d7c',
    };
    return colors[lang] || '#d4af37';
  }

  render() {
    if (!this.mount) return;

    const rawRepos = Number(this.userData?.public_repos);
    const rawFollowers = Number(this.userData?.followers);
    const publicReposCount = Number.isFinite(rawRepos) && rawRepos >= 0 ? rawRepos : 15;
    const followers = Number.isFinite(rawFollowers) && rawFollowers >= 0 ? rawFollowers : 7;

    this.mount.innerHTML = `
      <div class="gh-radar-container">
        <!-- Live GitHub Telemetry Bar -->
        <div class="gh-telemetry-bar">
          <div class="gh-user-badge">
            <span class="gh-dot-live"></span>
            <span class="gh-handle">GitHub Live: @eresfavolosx</span>
            <span class="gh-verified-tag">Open-Source Creative Technologist</span>
          </div>
          <div class="gh-stats-cluster">
            <span class="gh-stat-pill"><strong>${publicReposCount}</strong> Experiments &amp; Repos</span>
            <span class="gh-stat-pill"><strong>${followers}</strong> Followers</span>
            <span class="gh-stat-pill"><strong>Puerto Rico</strong> Maker Lab</span>
            <a href="https://github.com/eresfavolosx" target="_blank" rel="noopener noreferrer" class="gh-view-all-link">
              <span>Explore All Open-Source Experiments</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <!-- Repository Grid -->
        <div class="gh-repos-grid">
          ${this.repos.map((repo) => `
            <a href="${this.sanitizeGithubUrl(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="gh-repo-card" title="Open creative experiment ${this.escapeHtml(repo.name)} on GitHub">
              <div class="gh-card-header">
                <div class="gh-card-title-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  <h3 class="gh-repo-name">${this.escapeHtml(repo.name)}</h3>
                </div>
                <span class="gh-badge-public">Open Experiment</span>
              </div>
              <p class="gh-repo-desc">${this.escapeHtml(CREATIVE_REPO_DESCRIPTIONS[repo.name] || repo.description || 'Open-source creative technology experiment and working prototype.')}</p>
              <div class="gh-card-footer">
                <div class="gh-lang-tag">
                  <span class="gh-lang-dot" style="background: ${this.getLangColor(repo.language || 'JavaScript')}"></span>
                  <span>${this.escapeHtml(repo.language || 'JavaScript')}</span>
                </div>
                ${Number(repo.stargazers_count) > 0 ? `
                  <span class="gh-metric-tag" title="${Number(repo.stargazers_count)} GitHub stars">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span>${Number(repo.stargazers_count)}</span>
                  </span>
                ` : ''}
                <span class="gh-updated-time">Updated ${this.formatDate(repo.updated_at)}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
}
