const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4180;
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
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const versionRes = await fetch('http://127.0.0.1:9225/json/list');
    const targets = await versionRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Page target WS:', pageTarget.webSocketDebuggerUrl);

    const wsUrl = pageTarget.webSocketDebuggerUrl;
    const ws = new globalThis.WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg.result);
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

    // Emulate Dark Scheme initially as the default portfolio experience
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: 'dark' }]
    });

    // Reset localStorage to test clean state
    await send('Runtime.evaluate', {
      expression: `localStorage.clear()`
    });
    await send('Page.reload');

    // Wait for initial render
    await new Promise(r => setTimeout(r, 1500));

    // Evaluate initial dark theme state
    const initialTheme = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        metaContent: document.querySelector('meta[name="color-scheme"]')?.getAttribute('content'),
        dataTheme: document.documentElement.getAttribute('data-theme'),
        localStorage: localStorage.getItem('color-scheme'),
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        textColor: window.getComputedStyle(document.body).color
      })`,
      returnByValue: true
    });
    console.log('Default Dark Mode state:', initialTheme.result.value);

    // Capture initial Dark Mode screenshot
    const darkScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_hero_dark_mode.png'), Buffer.from(darkScreen.data, 'base64'));
    console.log('Saved verified_hero_dark_mode.png');

    // Click theme toggle button to switch to Light Mode
    const clickToggle = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('btn-theme-toggle');
        if (!btn) return { error: 'btn-theme-toggle not found' };
        btn.click();
        return {
          clicked: true,
          metaContent: document.querySelector('meta[name="color-scheme"]')?.getAttribute('content'),
          dataTheme: document.documentElement.getAttribute('data-theme'),
          localStorage: localStorage.getItem('color-scheme'),
          bodyBg: window.getComputedStyle(document.body).backgroundColor,
          textColor: window.getComputedStyle(document.body).color
        };
      })()`,
      returnByValue: true
    });
    console.log('Switched to Light Mode:', clickToggle.result.value);

    // Wait for CSS transition
    await new Promise(r => setTimeout(r, 600));

    // Capture Hero in Light Mode
    const lightHeroScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_hero_light_mode.png'), Buffer.from(lightHeroScreen.data, 'base64'));
    console.log('Saved verified_hero_light_mode.png');

    // Switch to Executive Dossier in Light Mode
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="dossier"]').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const lightDossierScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_dossier_light_mode.png'), Buffer.from(lightDossierScreen.data, 'base64'));
    console.log('Saved verified_dossier_light_mode.png');

    // Open Executive Resume Modal in Light Mode
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-open-resume-card').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const lightResumeModalScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_resume_modal_light_mode.png'), Buffer.from(lightResumeModalScreen.data, 'base64'));
    console.log('Saved verified_resume_modal_light_mode.png');

    // Close Resume Modal
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-close-resume-modal').click()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Test Mobile Viewport (390 x 844 iPhone 14) in Light Mode
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    // Navigate back to core hero view
    await send('Runtime.evaluate', {
      expression: `document.getElementById('brand-home').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const lightMobileScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_mobile_light_mode.png'), Buffer.from(lightMobileScreen.data, 'base64'));
    console.log('Saved verified_mobile_light_mode.png');

    // Click theme toggle button in mobile to switch back to Dark Mode
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const darkMobileScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_mobile_dark_mode.png'), Buffer.from(darkMobileScreen.data, 'base64'));
    console.log('Saved verified_mobile_dark_mode.png');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chromeProc.kill();
    server.close();
    process.exit(0);
  }
});
