const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4178;
const DIST_DIR = path.join(__dirname, '../dist');
const ARTIFACTS_DIR = '/Users/fabianvelez/.gemini/antigravity/brain/b73a3d70-41e9-498c-9628-43f7f94a6c18';

// Static file server
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
  
  // Launch Chrome with remote debugging
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    `http://127.0.0.1:${PORT}`
  ]);

  // Wait 2s for Chrome to launch
  await new Promise(r => setTimeout(r, 2000));

  try {
    // Query targets
    const versionRes = await fetch('http://127.0.0.1:9223/json/list');
    const targets = await versionRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const wsUrl = pageTarget.webSocketDebuggerUrl;
    const ws = new globalThis.WebSocket(wsUrl);

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { resolve, reject } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = msgId++;
      callbacks.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });

    await new Promise(r => { ws.onopen = r; });
    console.log('Connected to Chrome CDP WebSocket');

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    // Wait for page animation & Three.js hydration
    await new Promise(r => setTimeout(r, 2500));

    // Verify copy via Runtime.evaluate
    const textCheckRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const bodyText = document.body.innerText;
        const has122 = bodyText.includes('122%');
        const hasBonus = bodyText.toLowerCase().includes('bonus');
        
        const heroLead = document.querySelector('.hero-lead')?.innerText || '';
        const metricsRibbon = document.querySelector('.luxury-metrics-ribbon')?.innerText || '';
        
        const mgExp = document.querySelector('.exp-item:nth-child(1)')?.innerText || '';
        const rvExp = document.querySelector('.exp-item:nth-child(2)')?.innerText || '';
        const vaExp = document.querySelector('.exp-item:nth-child(3)')?.innerText || '';
        const lpExp = document.querySelector('.exp-item:nth-child(4)')?.innerText || '';

        return {
          has122,
          hasBonus,
          heroLead,
          metricsRibbon,
          mgExp,
          rvExp,
          vaExp,
          lpExp
        };
      })()`,
      returnByValue: true
    });

    console.log('DOM Text Inspection Result:', JSON.stringify(textCheckRes.result?.value || textCheckRes, null, 2));

    // Screenshot Hero
    const heroShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_hero_resume_copy.png'), Buffer.from(heroShot.data, 'base64'));
    console.log('Wrote verified_hero_resume_copy.png');

    // Switch to Dossier view and capture
    await send('Runtime.evaluate', {
      expression: `
        document.querySelector('[data-view="dossier"]')?.click();
      `
    });
    await new Promise(r => setTimeout(r, 1200));
    const dossierShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_dossier_resume_copy.png'), Buffer.from(dossierShot.data, 'base64'));
    console.log('Wrote verified_dossier_resume_copy.png');

    // Switch back to overview view
    await send('Runtime.evaluate', {
      expression: `
        document.querySelector('[data-view="overview"]')?.click();
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Open Recruiter Fast-Track Modal
    await send('Runtime.evaluate', {
      expression: `document.querySelector('#btn-recruiter-brief')?.click();`
    });
    await new Promise(r => setTimeout(r, 1000));
    const recruiterShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_recruiter_resume_copy.png'), Buffer.from(recruiterShot.data, 'base64'));
    console.log('Wrote verified_recruiter_resume_copy.png');

    // Close recruiter brief
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-close-recruiter-modal')?.click();`
    });
    await new Promise(r => setTimeout(r, 500));

    // Open Executive Resume Modal
    await send('Runtime.evaluate', {
      expression: `document.querySelector('#btn-open-resume-card')?.click();`
    });
    await new Promise(r => setTimeout(r, 1000));
    const resumeModalShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_resume_modal_updated.png'), Buffer.from(resumeModalShot.data, 'base64'));
    console.log('Wrote verified_resume_modal_updated.png');

    // Scroll further down resume modal
    await send('Runtime.evaluate', {
      expression: `
        const scrollable = document.querySelector('#resume-export-modal .resume-modal-scrollable');
        if (scrollable) scrollable.scrollTop = 900;
      `
    });
    await new Promise(r => setTimeout(r, 800));
    const resumeExpShot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_resume_modal_all_companies.png'), Buffer.from(resumeExpShot2.data, 'base64'));
    console.log('Wrote verified_resume_modal_all_companies.png');

    ws.close();
  } catch (err) {
    console.error('Error in verification:', err);
  } finally {
    chromeProc.kill();
    server.close();
    process.exit(0);
  }
});
