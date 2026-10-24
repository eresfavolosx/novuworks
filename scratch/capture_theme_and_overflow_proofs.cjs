const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4225;
const DIST_DIR = '/Users/fabianvelez/Documents/antigravity/jolly-rutherford/dist';
const ARTIFACTS_DIR = '/Users/fabianvelez/.gemini/antigravity/brain/b73a3d70-41e9-498c-9628-43f7f94a6c18';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9326',
    '--enable-webgl',
    '--use-gl=angle',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));
  const t = await (await fetch('http://127.0.0.1:9326/json')).json();
  const page = t.find(x => x.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const send = (m, p = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const h = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === curId) { ws.removeEventListener('message', h); d.error ? reject(d.error) : resolve(d.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: curId, method: m, params: p }));
  });

  const evalJs = async (exp) => {
    const res = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const takeScreenshot = async (filePath) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
  };

  ws.addEventListener('open', async () => {
    try {
      await send('Runtime.enable');
      await send('Page.enable');

      await send('Page.addScriptToEvaluateOnNewDocument', {
        source: `localStorage.setItem('fv_onboarding_completed', 'true');`
      });

      console.log('=== Desktop 1440x900 Verification ===');
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
      await send('Page.navigate', { url: `http://localhost:${PORT}/` });
      await new Promise(r => setTimeout(r, 1500));
      await evalJs(`document.querySelectorAll('dialog').forEach(d => d.close())`);

      // 1. Desktop Dark Mode Core Overview
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await evalJs(`window.__fabianApp?.switchView('core')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_dark_desktop_core.png'));

      // 2. Desktop Light Mode Core Overview
      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_desktop_core.png'));

      // 3. Desktop Light Mode ROI Terminal
      await evalJs(`window.__fabianApp?.switchView('planner')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_desktop_planner.png'));

      // 4. Desktop Dark Mode ROI Terminal
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_dark_desktop_planner.png'));

      console.log('=== Mobile 390x844 (iPhone 14) Verification ===');
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await evalJs(`window.__fabianApp?.switchView('core')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_dark_mobile_390.png'));

      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_mobile_390.png'));

      console.log('=== Small Mobile 360x740 Verification ===');
      await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 740, deviceScaleFactor: 2, mobile: true });
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_dark_mobile_360.png'));

      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_mobile_360.png'));

      // Small Mobile Planner View Terminal in Light Mode
      await evalJs(`window.__fabianApp?.switchView('planner')`);
      await new Promise(r => setTimeout(r, 400));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_mobile_360_planner.png'));

      // Small Mobile Let's Chat Modal in Light Mode
      await evalJs(`window.__fabianApp?.switchView('core')`);
      await evalJs(`document.querySelector('#btn-hero-lets-chat')?.click() || document.querySelector('.lets-chat-trigger')?.click()`);
      await new Promise(r => setTimeout(r, 500));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_light_mobile_chat_modal.png'));

      // Let's Chat Modal in Dark Mode
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 500));
      await takeScreenshot(path.join(ARTIFACTS_DIR, 'verified_theme_dark_mobile_chat_modal.png'));

      chrome.kill();
      server.close();
      console.log('All screenshots captured successfully without modal interference.');
      process.exit(0);
    } catch (e) {
      console.error(e);
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
});
