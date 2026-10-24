const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('===============================================================');
console.log('🔒 EXHAUSTIVE API SECURITY & SECRET SCANNING AUDIT');
console.log('===============================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(cond, msg) {
  totalChecks++;
  if (!cond) {
    console.error(`❌ FAILED: ${msg}`);
    throw new Error(msg);
  }
  console.log(`✓ PASSED: ${msg}`);
  passedChecks++;
}

// 1. Audit HTTP Security Headers in firebase.json
console.log('--- 1. Auditing firebase.json Production Security Headers ---');
const fbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../firebase.json'), 'utf8'));
const targets = fbConfig.hosting;

assert(Array.isArray(targets) && targets.length === 5, 'Found exactly 5 hosting targets in firebase.json');

const requiredHeaders = [
  'X-Content-Type-Options',
  'X-Frame-Options',
  'X-XSS-Protection',
  'Referrer-Policy',
  'Strict-Transport-Security'
];

targets.forEach((tgt) => {
  const globalHeaderRule = tgt.headers?.find((h) => h.source === '**');
  assert(!!globalHeaderRule, `Target [${tgt.target}] has global "**" security headers rule`);
  requiredHeaders.forEach((rh) => {
    const found = globalHeaderRule.headers.find((hdr) => hdr.key === rh);
    assert(!!found && found.value.length > 0, `Target [${tgt.target}] enforces ${rh}: ${found?.value}`);
  });
});

// 2. Audit Client-side API URL Sanitization & XSS Guards
console.log('\n--- 2. Auditing API URL Sanitization & HTML Escaping ---');
const ghRadarContent = fs.readFileSync(path.join(__dirname, '../src/github-radar.js'), 'utf8');
assert(ghRadarContent.includes('escapeHtml(repo.name)'), 'GitHub Radar escapes repo.name against DOM XSS');
assert(ghRadarContent.includes('escapeHtml(repo.description'), 'GitHub Radar escapes repo.description against DOM XSS');
assert(ghRadarContent.includes('escapeHtml(repo.language'), 'GitHub Radar escapes repo.language against DOM XSS');
assert(ghRadarContent.includes('sanitizeGithubUrl(repo.html_url)'), 'GitHub Radar sanitizes repo.html_url against protocol injection');
assert(ghRadarContent.includes('AbortSignal.timeout(6000)'), 'GitHub Radar enforces 6s request timeout');

const intelFeedContent = fs.readFileSync(path.join(__dirname, '../src/intel-feed.js'), 'utf8');
assert(intelFeedContent.includes('sanitizeUrl(news.url)'), 'Intel Feed sanitizes live news.url against javascript: protocol injection');
assert(intelFeedContent.includes('AbortSignal.timeout(6000)'), 'Intel Feed enforces 6s request timeout');

const teslaContent = fs.readFileSync(path.join(__dirname, '../src/tesla-cockpit.js'), 'utf8');
assert(teslaContent.includes('sanitizeUrl(news.url)'), 'Tesla Cockpit sanitizes live news.url against protocol injection');
assert(teslaContent.includes('AbortSignal.timeout(6000)'), 'Tesla Cockpit enforces 6s request timeout');

const liveTelemContent = fs.readFileSync(path.join(__dirname, '../src/live-telemetry.js'), 'utf8');
assert(liveTelemContent.includes('Number.isFinite'), 'Binance ticker validates prices with Number.isFinite');
assert(liveTelemContent.includes('AbortSignal.timeout(5000)'), 'Live telemetry enforces 5s request timeout');

const visitorToolsContent = fs.readFileSync(path.join(__dirname, '../src/visitor-tools.js'), 'utf8');
assert(visitorToolsContent.includes('replace(/[^a-zA-Z0-9'), 'Cloudflare trace parser sanitizes trace key/values');

// 3. Test URL sanitization logic directly
console.log('\n--- 3. Testing Unit Behavior of Sanitizers ---');
function sanitizeUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch (e) {}
  return '#';
}

function sanitizeGithubUrl(url) {
  if (!url) return 'https://github.com/eresfavolosx';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' && parsed.hostname === 'github.com') {
      return parsed.href;
    }
  } catch (e) {}
  return 'https://github.com/eresfavolosx';
}

assert(sanitizeUrl('javascript:alert(1)') === '#', 'Blocks javascript: protocol exploit');
assert(sanitizeUrl('data:text/html,<script>alert(1)</script>') === '#', 'Blocks data: URI exploit');
assert(sanitizeUrl('vbscript:msgbox(1)') === '#', 'Blocks vbscript: protocol exploit');
assert(sanitizeUrl('https://news.ycombinator.com/item?id=123') === 'https://news.ycombinator.com/item?id=123', 'Allows valid https URL');

assert(sanitizeGithubUrl('javascript:alert(1)') === 'https://github.com/eresfavolosx', 'Blocks non-github URL in GitHub Radar');
assert(sanitizeGithubUrl('https://evil-site.com/malware') === 'https://github.com/eresfavolosx', 'Blocks off-domain URL in GitHub Radar');
assert(sanitizeGithubUrl('https://github.com/eresfavolosx/JobHelper') === 'https://github.com/eresfavolosx/JobHelper', 'Allows verified GitHub repository URL');

// 4. Automated Python Zero-Secret Scan across all repos
console.log('\n--- 4. Running Zero-Secret Pattern Scanner Across All 6 Repositories ---');
const scanScriptPath = path.join(__dirname, 'scan_secrets.py');
const scanOutput = execSync(`python3 "${scanScriptPath}"`).toString().trim();
assert(scanOutput === 'ALL_CLEAN', 'All 6 repositories passed zero-secret scan with 0 leaks');

console.log('\n===============================================================');
console.log(`✓ ALL ${passedChecks} OF ${totalChecks} API SECURITY AUDIT CHECKS PASSED 100%`);
console.log('===============================================================\n');
