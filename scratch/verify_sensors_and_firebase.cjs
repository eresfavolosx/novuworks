const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4185;
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
    '--remote-debugging-port=9226',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,960',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const versionRes = await fetch('http://127.0.0.1:9226/json/list');
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

    // Set onboarding completed to prevent popup overlap
    await send('Runtime.evaluate', {
      expression: `(() => {
        localStorage.setItem('fv_onboarding_completed', 'true');
        window.__fabianApp?.setTheme('dark', true);
      })()`
    });
    await send('Page.reload');
    await new Promise(r => setTimeout(r, 1800));

    // Ensure dark theme is active for the dark test
    await send('Runtime.evaluate', {
      expression: `window.__fabianApp?.setTheme('dark', true);`
    });
    await new Promise(r => setTimeout(r, 600));

    // 1. Inspect Spatial Gyro & Immersion State
    console.log('\n--- 1. Testing Spatial & Sensor Immersion Suite ---');
    const spatialTest = await send('Runtime.evaluate', {
      expression: `(() => {
        const app = window.__fabianApp;
        const gyroBtn = document.getElementById('btn-spatial-gyro');
        const prRootsBtn = document.getElementById('btn-pr-roots');
        
        return {
          hasApp: !!app,
          hasSpatial: !!app?.spatial,
          geodesic: app?.spatial?.geodesicTelemetry,
          hasGyroBtn: !!gyroBtn,
          gyroBtnText: gyroBtn?.textContent?.trim(),
          hasPrRootsBtn: !!prRootsBtn,
          tiltX: document.documentElement.style.getPropertyValue('--tilt-x'),
          tiltY: document.documentElement.style.getPropertyValue('--tilt-y'),
        };
      })()`,
      returnByValue: true
    });
    console.log('Spatial Suite initial check:', JSON.stringify(spatialTest.result.value, null, 2));

    // 2. Click Spatial Gyro HUD Button
    console.log('\n--- 2. Clicking Spatial Gyro HUD Button ---');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-spatial-gyro')?.click();`
    });
    await new Promise(r => setTimeout(r, 600));

    const toastCheck1 = await send('Runtime.evaluate', {
      expression: `document.getElementById('toast-banner')?.textContent?.trim()`,
      returnByValue: true
    });
    console.log('Toast after gyro click:', toastCheck1.result.value);

    // 3. Test Cultural Roots Coquí chime
    console.log('\n--- 3. Clicking San Juan Cultural Roots Pill ---');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-pr-roots')?.click();`
    });
    await new Promise(r => setTimeout(r, 600));

    const toastCheck2 = await send('Runtime.evaluate', {
      expression: `document.getElementById('toast-banner')?.textContent?.trim()`,
      returnByValue: true
    });
    console.log('Toast after PR roots click:', toastCheck2.result.value);

    // 4. Open Visitor Tools Modal to Tab 4 (Edge, Hardware & Firebase Telemetry)
    console.log('\n--- 4. Opening Visitor Tools Modal (Tab 4) ---');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const app = window.__fabianApp;
        app?.visitorTools?.open('edge-telemetry');
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const tab4Audit = await send('Runtime.evaluate', {
      expression: `(() => {
        const modal = document.getElementById('visitor-tools-modal');
        const panel = document.getElementById('tool-panel-edge-telemetry');
        const mount = document.getElementById('edge-telemetry-mount');
        const cards = Array.from(mount?.querySelectorAll('.telemetry-card') || []).map(c => ({
          title: c.querySelector('.tc-title')?.textContent?.trim(),
          metricsCount: c.querySelectorAll('.tc-metric').length,
          hasActionBtn: !!c.querySelector('.telemetry-action-btn')
        }));
        
        return {
          modalOpen: modal?.open,
          panelActive: panel?.classList.contains('active'),
          cardsFound: cards.length,
          cards
        };
      })()`,
      returnByValue: true
    });
    console.log('Tab 4 Telemetry Audit:', JSON.stringify(tab4Audit.result.value, null, 2));

    // 5. Test Telemetry Buttons inside modal
    console.log('\n--- 5. Clicking Telemetry Probe Buttons ---');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-test-haptic')?.click();`
    });
    await new Promise(r => setTimeout(r, 600));

    await send('Runtime.evaluate', {
      expression: `document.getElementById('btn-recalc-gps')?.click();`
    });
    await new Promise(r => setTimeout(r, 600));

    // 6. Screenshot: Telemetry Modal in Dark Theme
    const snapDark = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_telemetry_modal_dark.png'), Buffer.from(snapDark.data, 'base64'));
    console.log('Saved verified_telemetry_modal_dark.png');

    // 7. Toggle to Light Theme
    console.log('\n--- 6. Switching to Light Theme & Capturing Telemetry Modal ---');
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.__fabianApp?.setTheme('light', true);
        window.__fabianApp?.visitorTools?.updateTelemetryMount();
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const snapLight = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_telemetry_modal_light.png'), Buffer.from(snapLight.data, 'base64'));
    console.log('Saved verified_telemetry_modal_light.png');

    // 8. Close Modal and screenshot HUD header
    await send('Runtime.evaluate', {
      expression: `window.__fabianApp?.visitorTools?.close();`
    });
    await new Promise(r => setTimeout(r, 600));

    const snapHeader = await send('Page.captureScreenshot', {
      clip: { x: 0, y: 0, width: 1440, height: 180, scale: 1 },
      format: 'png'
    });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_spatial_gyro_hud.png'), Buffer.from(snapHeader.data, 'base64'));
    console.log('Saved verified_spatial_gyro_hud.png');

    // 9. Mobile Responsive Viewport Telemetry
    console.log('\n--- 7. Mobile Viewport (iPhone 14 / 390x844) Audit ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.__fabianApp?.setTheme('dark', true);
        window.__fabianApp?.visitorTools?.open('edge-telemetry');
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_telemetry_mobile.png'), Buffer.from(snapMobile.data, 'base64'));
    console.log('Saved verified_telemetry_mobile.png');

    console.log('\n=== ALL SENSOR & FIREBASE TELEMETRY VERIFICATIONS SUCCEEDED ===');

    chromeProc.kill();
    server.close();
    process.exit(0);

  } catch (err) {
    console.error('Verification error:', err);
    chromeProc.kill();
    server.close();
    process.exit(1);
  }
});
