const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4182;
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
    '--remote-debugging-port=9227',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const versionRes = await fetch('http://127.0.0.1:9227/json/list');
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
        cb(msgResult(data));
      }
    };

    function msgResult(data) {
      return data.result;
    }

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

    // Reset localStorage
    await send('Runtime.evaluate', { expression: `localStorage.clear()` });
    await send('Page.reload');

    await new Promise(r => setTimeout(r, 1500));

    // Switch to planner view (tab 04 ROI Model)
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.nav-tab[data-view="planner"]').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture Planner in Dark Mode
    const darkPlannerScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_planner_dark_mode.png'), Buffer.from(darkPlannerScreen.data, 'base64'));
    console.log('Saved verified_planner_dark_mode.png');

    // Toggle to Light Mode
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-theme-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture Planner in Light Mode
    const lightPlannerScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_planner_light_mode.png'), Buffer.from(lightPlannerScreen.data, 'base64'));
    console.log('Saved verified_planner_light_mode.png');

    // Mobile Viewport test for Planner
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    const mobilePlannerScreen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_planner_mobile_light.png'), Buffer.from(mobilePlannerScreen.data, 'base64'));
    console.log('Saved verified_planner_mobile_light.png');

    ws.close();
  } catch (err) {
    console.error('Error during planner test:', err);
  } finally {
    chromeProc.kill();
    server.close();
    process.exit(0);
  }
});
