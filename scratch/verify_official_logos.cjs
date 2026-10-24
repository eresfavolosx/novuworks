const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACTS_DIR = path.resolve('/Users/fabianvelez/.gemini/antigravity/brain/b73a3d70-41e9-498c-9628-43f7f94a6c18');

// Simple static server for dist
function startServer(port = 5219) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
  };

  const server = http.createServer((req, res) => {
    let safePath = path.normalize(req.url.split('?')[0]);
    if (safePath === '/' || safePath === '') safePath = '/index.html';
    let filePath = path.join(DIST_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404);
        return res.end('Not found');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1e6);
    const msg = JSON.stringify({ id, method, params });
    const handler = (event) => {
      const res = JSON.parse(event.data.toString());
      if (res.id === id) {
        ws.removeEventListener('message', handler);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(msg);
  });
}

async function capture() {
  const port = 5219;
  const server = await startServer(port);
  console.log(`Preview server running at http://localhost:${port}`);

  const chromePort = 9422;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${chromePort}`,
    '--window-size=1440,900',
    '--disable-gpu',
    '--no-sandbox',
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  // Get WebSocket URL
  const httpGet = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  const listData = await httpGet(`http://localhost:${chromePort}/json/list`);
  const targets = JSON.parse(listData);
  const pageTarget = targets.find((t) => t.type === 'page');
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const WebSocket = globalThis.WebSocket;
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

  console.log('Connected to CDP');
  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');

  // Navigate to portfolio
  await sendCDP(ws, 'Page.navigate', { url: `http://localhost:${port}` });
  await new Promise((r) => setTimeout(r, 2000));

  // 1. Screenshot of the Hero Logo Strip on Desktop
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('company-logo-strip-mount').scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const heroShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_hero_authentic_logos.png'), Buffer.from(heroShot.data, 'base64'));
  console.log('Saved verified_hero_authentic_logos.png');

  // 2. Open Dossier View to verify Experience Timeline and Education Logos
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.querySelector('[data-view="dossier"]').click();
    `
  });
  await new Promise((r) => setTimeout(r, 600));

  // Scroll to experience section
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('dossier-experience-mount').scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const expShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_dossier_authentic_logos.png'), Buffer.from(expShot.data, 'base64'));
  console.log('Saved verified_dossier_authentic_logos.png');

  // Scroll to education & awards in dossier
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('dossier-education-mount').scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const eduShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_education_authentic_logos.png'), Buffer.from(eduShot.data, 'base64'));
  console.log('Saved verified_education_authentic_logos.png');

  // 3. Open Recruiter Fast-Track Modal to verify the 8 employer modal cells
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('recruiter-fasttrack-modal').showModal();
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const recModalShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_recruiter_modal_logos.png'), Buffer.from(recModalShot.data, 'base64'));
  console.log('Saved verified_recruiter_modal_logos.png');

  // Close Recruiter Modal and Open Resume Export Modal
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('recruiter-fasttrack-modal').close();
      document.getElementById('resume-export-modal').showModal();
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const resModalShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_resume_modal_logos.png'), Buffer.from(resModalShot.data, 'base64'));
  console.log('Saved verified_resume_modal_logos.png');

  // 4. Mobile Responsiveness Test (390x844 iPhone 14)
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('resume-export-modal').close();
      document.querySelector('[data-view="hero"]').click();
      window.scrollTo(0, 0);
    `
  });
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll down to the logo strip on mobile
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      document.getElementById('company-logo-strip-mount').scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  });
  await new Promise((r) => setTimeout(r, 600));
  const mobileShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_mobile_authentic_logos.png'), Buffer.from(mobileShot.data, 'base64'));
  console.log('Saved verified_mobile_authentic_logos.png');

  ws.close();
  chrome.kill();
  server.close();
  console.log('All verification screenshots captured successfully!');
  process.exit(0);
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
