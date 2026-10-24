const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4228;
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
    '--remote-debugging-port=9328',
    '--enable-webgl',
    '--use-gl=angle',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));
  const t = await (await fetch('http://127.0.0.1:9328/json')).json();
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
    if (res.exceptionDetails) {
      console.error('JS Eval Error:', res.exceptionDetails);
    }
    return res.result ? res.result.value : null;
  };

  ws.addEventListener('open', async () => {
    try {
      await send('Runtime.enable');
      await send('Page.enable');

      // Pre-seed onboarding completion so survey modal doesn't pop up during test
      await send('Page.addScriptToEvaluateOnNewDocument', {
        source: `try { localStorage.setItem('fv_onboarding_completed', 'true'); } catch (e) {}`
      });

      console.log('--- TEST 1: Default Gyro, Spiral & Particles Status ---');
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
      await send('Page.navigate', { url: `http://localhost:${PORT}/` });
      await new Promise(r => setTimeout(r, 1200));

      const appStatus = await evalJs(`(() => {
        const app = window.__fabianApp;
        const canvas = app?.canvas3d;
        const spatial = app?.spatial;
        const gyroBtnInDom = !!document.getElementById('btn-spatial-gyro');
        const activeSculpturePill = document.querySelector('.sculpture-pill.active')?.dataset.morph;
        const activeVizPill = document.querySelector('.viz-morph-pill.active')?.dataset.morph;
        
        const dustCount = canvas?.dustMesh?.geometry?.attributes?.position?.count;
        const dustMaterialMap = !!canvas?.dustMesh?.material?.map;
        const dustOpacity = canvas?.dustMesh?.material?.opacity;
        const dustSize = canvas?.dustMesh?.material?.size;
        
        return {
          gyroBtnInDom,
          activeMode: canvas?.activeMode,
          ribbonVisible: canvas?.ribbonGroup?.visible,
          monogramVisible: canvas?.monogramMesh?.visible,
          activeSculpturePill,
          activeVizPill,
          spatialInitialized: !!spatial,
          dustCount,
          dustMaterialMap,
          dustOpacity,
          dustSize
        };
      })()`);
      console.log('App 3D & Gyro status:', JSON.stringify(appStatus, null, 2));

      console.log('\n--- TEST 2: Theme Icon Visibility (No Double Icons / No Weird Overlap) ---');
      // Dark Theme test
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 200));
      const darkIcons = await evalJs(`(() => {
        const btn = document.getElementById('btn-theme-toggle');
        const sun = btn?.querySelector('.icon-theme-sun');
        const moon = btn?.querySelector('.icon-theme-moon');
        return {
          theme: document.documentElement.getAttribute('data-theme'),
          sunDisplay: window.getComputedStyle(sun).display,
          moonDisplay: window.getComputedStyle(moon).display,
          sunClass: sun?.className.baseVal || sun?.className,
          moonClass: moon?.className.baseVal || moon?.className
        };
      })()`);
      console.log('Dark Theme icon visibility:', darkIcons);

      // Light Theme test
      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 200));
      const lightIcons = await evalJs(`(() => {
        const btn = document.getElementById('btn-theme-toggle');
        const sun = btn?.querySelector('.icon-theme-sun');
        const moon = btn?.querySelector('.icon-theme-moon');
        return {
          theme: document.documentElement.getAttribute('data-theme'),
          sunDisplay: window.getComputedStyle(sun).display,
          moonDisplay: window.getComputedStyle(moon).display,
          sunClass: sun?.className.baseVal || sun?.className,
          moonClass: moon?.className.baseVal || moon?.className
        };
      })()`);
      console.log('Light Theme icon visibility:', lightIcons);

      console.log('\n--- TEST 3: Mobile Toast Position Check ---');
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await evalJs(`window.__fabianApp?.showToast('☀️ Light Theme Active')`);
      await new Promise(r => setTimeout(r, 100));
      const toastPos = await evalJs(`(() => {
        const toast = document.querySelector('.toast-popup');
        const rect = toast.getBoundingClientRect();
        return {
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          winH: window.innerHeight,
          winW: window.innerWidth,
          isNearTop: rect.top < 120,
          isFarFromBottom: rect.bottom < window.innerHeight - 150
        };
      })()`);
      console.log('Mobile Toast bounding rect:', toastPos);

      console.log('\n--- TEST 4: Comprehensive Header & Viewport Width Scan (320px to 1920px) ---');
      const testWidths = [320, 340, 360, 375, 390, 412, 428, 480, 600, 768, 860, 1024, 1280, 1440, 1680, 1920];
      const overflowViolations = [];

      for (const w of testWidths) {
        const isMob = w <= 768;
        await send('Emulation.setDeviceMetricsOverride', { width: w, height: 800, deviceScaleFactor: 2, mobile: isMob });
        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 600));

        const res = await evalJs(`(() => {
          const winW = window.innerWidth;
          const header = document.querySelector('.app-header');
          const headerRect = header ? header.getBoundingClientRect() : null;
          
          // Check rightmost button in header
          const right = document.querySelector('.header-right');
          const btns = right ? Array.from(right.querySelectorAll(':scope > *')).filter(el => el.offsetParent !== null) : [];
          let maxRight = 0;
          let offendingBtn = null;
          btns.forEach(b => {
            const r = b.getBoundingClientRect().right;
            if (r > maxRight) {
              maxRight = r;
              offendingBtn = b.id || b.className;
            }
          });

          // Horizontal page scroll check
          const scrollWidth = document.documentElement.scrollWidth;
          const pageOverflow = scrollWidth > winW + 1;
          const headerOverflow = headerRect ? (headerRect.right > winW + 1) : false;
          const btnOverflow = maxRight > winW + 1;

          return {
            winW,
            headerRight: headerRect ? Math.round(headerRect.right) : 0,
            maxBtnRight: Math.round(maxRight),
            scrollWidth,
            pageOverflow,
            headerOverflow,
            btnOverflow,
            offendingBtn
          };
        })()`);

        if (res.headerOverflow || res.btnOverflow || res.pageOverflow) {
          overflowViolations.push({ width: w, res });
          console.log(`❌ OVERFLOW AT ${w}px:`, res);
        } else {
          console.log(`✅ ${w}px OK (headerRight: ${res.headerRight}px <= ${w}px, btnRight: ${res.maxBtnRight}px)`);
        }
      }

      console.log(`\nScan summary: ${overflowViolations.length} overflow violations detected.`);

      // Capture screenshots for artifacts
      console.log('\n--- Capturing Evidence Screenshots ---');
      // 1. Desktop 1440 Dark
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 400));
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_theme_dark_desktop_spiral_particles.png'), Buffer.from(shot.data, 'base64'));

      // 2. Desktop 1440 Light
      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 400));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_theme_light_desktop_spiral_particles.png'), Buffer.from(shot.data, 'base64'));

      // 3. Mobile 390 Dark
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await evalJs(`window.__fabianApp?.setTheme('dark')`);
      await new Promise(r => setTimeout(r, 400));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_theme_dark_mobile_390_clean.png'), Buffer.from(shot.data, 'base64'));

      // 4. Mobile 320 Light (Narrowest Fold screen)
      await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
      await evalJs(`window.__fabianApp?.setTheme('light')`);
      await new Promise(r => setTimeout(r, 400));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verified_theme_light_mobile_320_clean.png'), Buffer.from(shot.data, 'base64'));

      console.log('Screenshots saved to artifacts directory.');

      chrome.kill();
      server.close();
      process.exit(overflowViolations.length === 0 ? 0 : 1);
    } catch (err) {
      console.error('Test execution error:', err);
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
});
