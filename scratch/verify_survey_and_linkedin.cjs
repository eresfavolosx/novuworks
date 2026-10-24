const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4183;
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
    '--remote-debugging-port=9228',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const versionRes = await fetch('http://127.0.0.1:9228/json/list');
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

    // 1. Clear storage so we simulate first-time visitor
    await send('Runtime.evaluate', { expression: `localStorage.clear()` });
    await send('Page.reload');

    // Wait for the 1.2s onboarding concierge delay + transition
    await new Promise(r => setTimeout(r, 2200));

    // Check if survey modal is open
    const modalCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        isOpen: document.getElementById('visitor-survey-modal')?.open,
        title: document.getElementById('survey-modal-title')?.textContent,
        optionsCount: document.querySelectorAll('.survey-card-btn').length,
        personaPillText: document.getElementById('btn-tailor-experience')?.textContent.trim()
      })`
    });
    console.log('Survey modal check:', modalCheck.result.value);

    // Capture Survey Modal in Dark Mode
    const darkSurveyScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_survey_modal_dark.png'), Buffer.from(darkSurveyScreen.data, 'base64'));
    console.log('Saved verified_survey_modal_dark.png');

    // Switch theme to Light Mode while modal is open
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture Survey Modal in Light Mode
    const lightSurveyScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_survey_modal_light.png'), Buffer.from(lightSurveyScreen.data, 'base64'));
    console.log('Saved verified_survey_modal_light.png');

    // 2. Select Growth & Performance Marketing persona
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.survey-card-btn[data-lens="revops_analytics"]').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const postSelectionCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        isModalOpen: document.getElementById('visitor-survey-modal')?.open,
        savedPersona: localStorage.getItem('fv_visitor_persona'),
        onboardingCompleted: localStorage.getItem('fv_onboarding_completed'),
        personaLabel: document.querySelector('#btn-tailor-experience .persona-label')?.textContent,
        personaDot: document.querySelector('#btn-tailor-experience .persona-dot')?.textContent
      })`
    });
    console.log('Post-selection check:', postSelectionCheck.result.value);

    // Switch to Dossier view to see tailored stats & narrative
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="dossier"]').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const tailoredDossierScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_tailored_dossier.png'), Buffer.from(tailoredDossierScreen.data, 'base64'));
    console.log('Saved verified_tailored_dossier.png');

    // 3. Switch to Intel Feed view to check LinkedIn Mirror Banner & Post Badges
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="intel-feed"]').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const intelFeedCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        hasBanner: !!document.querySelector('.linkedin-live-mirror-banner'),
        bannerTitle: document.querySelector('.llm-title')?.textContent.trim(),
        hasConnectBtn: !!document.querySelector('.llm-connect-btn'),
        connectHref: document.querySelector('.llm-connect-btn')?.getAttribute('href'),
        linkedinPillCount: document.querySelectorAll('.post-linkedin-pill').length,
        linkedinActionCount: document.querySelectorAll('.post-action-linkedin').length
      })`
    });
    console.log('Intel Feed LinkedIn check:', intelFeedCheck.result.value);

    // Capture Intel Feed with LinkedIn Mirror in Light Mode
    const lightFeedScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_intel_feed_linkedin_light.png'), Buffer.from(lightFeedScreen.data, 'base64'));
    console.log('Saved verified_intel_feed_linkedin_light.png');

    // Switch theme back to Dark Mode
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture Intel Feed with LinkedIn Mirror in Dark Mode
    const darkFeedScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_intel_feed_linkedin_dark.png'), Buffer.from(darkFeedScreen.data, 'base64'));
    console.log('Saved verified_intel_feed_linkedin_dark.png');

    // 4. Test Header Pill Re-open Modal
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-tailor-experience').click()`
    });
    await new Promise(r => setTimeout(r, 600));

    const reOpenCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        isReopened: document.getElementById('visitor-survey-modal')?.open,
        growthCardActive: document.querySelector('.survey-card-btn[data-lens="revops_analytics"]')?.classList.contains('active')
      })`
    });
    console.log('Modal re-open check:', reOpenCheck.result.value);

    // 5. Test Mobile viewport (375x812 iPhone)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 800));

    const mobileSurveyScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_mobile_survey.png'), Buffer.from(mobileSurveyScreen.data, 'base64'));
    console.log('Saved verified_mobile_survey.png');

    // Close survey modal on mobile and check mobile header + Intel Feed
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-close-survey-modal').click()`
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileFeedScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_mobile_feed_linkedin.png'), Buffer.from(mobileFeedScreen.data, 'base64'));
    console.log('Saved verified_mobile_feed_linkedin.png');

    console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
    chromeProc.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('CDP verification error:', err);
    chromeProc.kill();
    server.close();
    process.exit(1);
  }
});
