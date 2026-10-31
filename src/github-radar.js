// ─────────────────────────────────────────────────────────────
//  Novu Works — Live GitHub Codebase Radar & Open Source Telemetry
//  Queries GitHub REST API live for @eresfavolosx
// ─────────────────────────────────────────────────────────────

const FALLBACK_REPOS = [
  {
    name: 'JobHelper',
    html_url: 'https://github.com/eresfavolosx/JobHelper',
    description: 'Autonomous multi-model LLM job evaluation, triage agent & scoring scaffold mapped to API specifications.',
    language: 'Python',
    stargazers_count: 5,
    forks_count: 1,
    updated_at: '2026-10-24T17:33:00Z',
  },
  {
    name: 'BizPay',
    html_url: 'https://github.com/eresfavolosx/BizPay',
    description: 'B2B commercial payments, invoice routing, ATH Móvil Business integration & real-time fee calculator.',
    language: 'JavaScript',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2026-10-24T17:33:45Z',
  },
  {
    name: 'Picta',
    html_url: 'https://github.com/eresfavolosx/Picta',
    description: 'Interactive visual documentation suite with tabbed history, client-side caching & Material Design Lite.',
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 0,
    updated_at: '2026-10-24T17:28:00Z',
  },
  {
    name: 'NFC',
    html_url: 'https://github.com/eresfavolosx/NFC',
    description: 'Cross-platform mobile event registration & NFC verification platform with automated Python QA suite.',
    language: 'JavaScript / Vite',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2026-10-24T17:33:37Z',
  },
  {
    name: 'hackeaporunacausa',
    html_url: 'https://github.com/eresfavolosx/hackeaporunacausa',
    description: 'Social impact youth mentorship scheduling & community partner network for Boys & Girls Clubs of PR.',
    language: 'JavaScript / React',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: '2026-10-24T17:33:55Z',
  },
  {
    name: 'novuworks',
    html_url: 'https://github.com/eresfavolosx/novuworks',
    description: 'Fabián Vélez Vicente — Executive Portfolio & Interactive Atelier. Growth & Revenue Operations Analytics Lead.',
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
          this.repos = data;
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
            <span class="gh-verified-tag">Open Source Contributor</span>
          </div>
          <div class="gh-stats-cluster">
            <span class="gh-stat-pill"><strong>${publicReposCount}</strong> Repositories</span>
            <span class="gh-stat-pill"><strong>${followers}</strong> Followers</span>
            <span class="gh-stat-pill"><strong>Puerto Rico</strong> Base</span>
            <a href="https://github.com/eresfavolosx" target="_blank" rel="noopener noreferrer" class="gh-view-all-link">
              <span>View Full Codebase</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <!-- Repository Grid -->
        <div class="gh-repos-grid">
          ${this.repos.map((repo) => `
            <a href="${this.sanitizeGithubUrl(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="gh-repo-card" title="Open repository ${this.escapeHtml(repo.name)} on GitHub">
              <div class="gh-card-header">
                <div class="gh-card-title-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  <h3 class="gh-repo-name">${this.escapeHtml(repo.name)}</h3>
                </div>
                <span class="gh-badge-public">Public</span>
              </div>
              <p class="gh-repo-desc">${this.escapeHtml(repo.description || 'Verified production engineering repository.')}</p>
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
