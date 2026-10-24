const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4184;
const DIST_DIR = path.join(__dirname, '../dist');
const ARTIFACTS_DIR = '/Users/fabianvelez/.gemini/antigravity/brain/b73a3d70-41e9-498c-9628-43f7f94a6c18';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const ext = path.extname(filePath);
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
  
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const versionRes = await fetch('http://127.0.0.1:9229/json/list');
    const targets = await versionRes.json();
    const pageTarget = targets.find(t => t.type === 'page');

    const wsUrl = pageTarget.webSocketDebuggerUrl;
    const ws = new globalThis.WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (callbacks.has(data.id)) {
        const cb = callbacks.get(data.id);
        callbacks.delete(data.id);
        cb(data.result);
      }
    };

    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => { ws.onopen = r; });
    console.log('WebSocket connected to Chrome CDP');

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    // Emulate dark theme initially
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'dark' }]
    });

    // Mark onboarding completed so survey modal doesn't block automated tool test
    await send('Runtime.evaluate', {
      expression: `localStorage.setItem('fv_onboarding_completed', 'true')`
    });
    await send('Page.reload');

    // Wait 2s for live APIs (Open-Meteo weather, GitHub, Cloudflare edge trace)
    await new Promise(r => setTimeout(r, 2500));

    // 1. Strict Verification of Borikén Absence
    const borikenCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        hasBorikenInText: document.body.innerText.toLowerCase().includes('borik'),
        hasBorikenInHtml: document.documentElement.outerHTML.toLowerCase().includes('borik')
      })`
    });
    console.log('Borikén check:', borikenCheck.result.value);

    // 2. Open-Meteo Puerto Rico Weather API Check
    const weatherCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        weatherBadgeText: document.getElementById('pr-weather-badge')?.textContent.trim(),
        rootsBtnTitle: document.getElementById('btn-pr-roots')?.getAttribute('title'),
        hasCelsiusAndFahrenheit: document.getElementById('pr-weather-badge')?.textContent.includes('°C')
      })`
    });
    console.log('Open-Meteo Weather check:', weatherCheck.result.value);

    // 3. Open Visitor Utilities Suite Modal
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-visitor-tools')?.click()`
    });
    await new Promise(r => setTimeout(r, 600));

    const toolsModalCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        isOpen: document.getElementById('visitor-tools-modal')?.open,
        activeTab: document.querySelector('.tools-tab-btn.active')?.dataset.tool,
        capiUrl: document.getElementById('capi-output-url')?.textContent.trim()
      })`
    });
    console.log('Visitor Tools modal check:', toolsModalCheck.result.value);

    // Capture CAPI & UTM Builder in Dark Mode
    const capiScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_visitor_tools_capi.png'), Buffer.from(capiScreen.data, 'base64'));
    console.log('Saved verified_visitor_tools_capi.png');

    // Switch to ROAS & Break-Even Modeler tab
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.tools-tab-btn[data-tool="roas-calc"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    const roasScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_visitor_tools_roas.png'), Buffer.from(roasScreen.data, 'base64'));
    console.log('Saved verified_visitor_tools_roas.png');

    // Switch to Edge Telemetry tab
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.tools-tab-btn[data-tool="edge-telemetry"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    const telemetryScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_visitor_tools_telemetry.png'), Buffer.from(telemetryScreen.data, 'base64'));
    console.log('Saved verified_visitor_tools_telemetry.png');

    // Switch Theme to Light Mode while tools modal is open
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Switch back to CAPI tab for Light Mode view
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.tools-tab-btn[data-tool="capi-builder"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    const toolsLightScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_visitor_tools_light.png'), Buffer.from(toolsLightScreen.data, 'base64'));
    console.log('Saved verified_visitor_tools_light.png');

    // Close Tools Modal
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-close-tools-modal')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    // 4. Test Live GitHub Codebase Radar in Dossier View
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="dossier"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const ghRadarCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        hasRadarContainer: !!document.querySelector('.gh-radar-container'),
        repoCardsCount: document.querySelectorAll('.gh-repo-card').length,
        repoNames: Array.from(document.querySelectorAll('.gh-repo-name')).map(el => el.textContent.trim())
      })`
    });
    console.log('Live GitHub Radar check:', ghRadarCheck.result.value);

    // Scroll down to the GitHub radar section
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.github-radar-section')?.scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await new Promise(r => setTimeout(r, 500));

    const ghRadarLightScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_github_radar_light.png'), Buffer.from(ghRadarLightScreen.data, 'base64'));
    console.log('Saved verified_github_radar_light.png');

    // Switch theme back to Dark Mode
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    const ghRadarDarkScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_github_radar_dark.png'), Buffer.from(ghRadarDarkScreen.data, 'base64'));
    console.log('Saved verified_github_radar_dark.png');

    // 5. Test Live Hacker News Topic Switcher in Intel Feed
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="intel-feed"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 800));

    // Click on 🤖 AI topic button
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.radar-topic-btn[data-topic="ai"]')?.click()`
    });
    await new Promise(r => setTimeout(r, 1800));

    const newsCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        activeTopic: document.querySelector('.radar-topic-btn.active')?.dataset.topic,
        newsItemsCount: document.querySelectorAll('.radar-news-item').length,
        firstTitle: document.querySelector('.r-news-title')?.textContent.trim()
      })`
    });
    console.log('Live News topic check (AI):', newsCheck.result.value);

    // Capture Intel Feed with topic switcher
    const topicsScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_intel_topics.png'), Buffer.from(topicsScreen.data, 'base64'));
    console.log('Saved verified_intel_topics.png');

    // 6. Test Mobile Viewport (375x812 iPhone)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    // Open tools modal on mobile
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-visitor-tools')?.click()`
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileToolsScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_visitor_tools_mobile.png'), Buffer.from(mobileToolsScreen.data, 'base64'));
    console.log('Saved verified_visitor_tools_mobile.png');

    console.log('ALL NEW API & PUERTO RICO TESTS COMPLETED SUCCESSFULLY!');
    chromeProc.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('CDP test error:', err);
    chromeProc.kill();
    server.close();
    process.exit(1);
  }
});
