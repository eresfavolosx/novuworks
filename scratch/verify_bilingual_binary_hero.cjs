const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4205;
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

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(DIST_DIR, reqPath);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server listening on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9305',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise((r) => setTimeout(r, 1500));
  const t = await (await fetch('http://127.0.0.1:9305/json')).json();
  const page = t.find((x) => x.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const send = (m, p = {}) =>
    new Promise((resolve, reject) => {
      const curId = id++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === curId) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method: m, params: p }));
    });

  const evalJs = async (exp) => {
    const res = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      console.error('JS Evaluation Error:', res.exceptionDetails);
    }
    return res.result ? res.result.value : null;
  };

  const capture = async (filename) => {
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(ss.data, 'base64');
    const outPath = path.join(ARTIFACTS_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`✓ Saved screenshot: ${filename} (${buffer.length} bytes)`);
  };

  ws.addEventListener('open', async () => {
    try {
      await send('Runtime.enable');
      await send('Page.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 2,
        mobile: false
      });

      console.log('\n--- 1. Testing Initial Page Load & Default English Greeting ---');
      await send('Page.navigate', { url: `http://localhost:${PORT}/` });
      await new Promise((r) => setTimeout(r, 1200));
      // Dismiss survey modal
      await evalJs(`localStorage.setItem('fv_onboarding_completed', 'true')`);
      await new Promise((r) => setTimeout(r, 800));

      const initialState = await evalJs(`(() => {
        const terminal = !!document.getElementById('hero-greeting-terminal');
        const text = document.getElementById('hero-greeting-text')?.innerText;
        const enActive = document.getElementById('btn-greeting-mode-en')?.classList.contains('active');
        const esActive = document.getElementById('btn-greeting-mode-es')?.classList.contains('active');
        const binActive = document.getElementById('btn-greeting-mode-bin')?.classList.contains('active');
        const annotation = document.getElementById('hero-greeting-ann-text')?.innerText;
        const heroTitle = document.querySelector('.hero-title')?.innerText.replace(/\\s+/g, ' ').trim();
        return { terminal, text, enActive, esActive, binActive, annotation, heroTitle };
      })()`);

      console.log('Initial English State:', initialState);
      if (!initialState.terminal) throw new Error('Hero greeting terminal not found in DOM');
      if (!initialState.text.includes('Hello')) throw new Error(`Expected text to include 'Hello', got '${initialState.text}'`);
      if (!initialState.enActive) throw new Error('EN chip should be active by default');
      if (!initialState.heroTitle.includes('Quantitative Growth')) throw new Error('Hero title mismatch');

      await capture('verified_bilingual_binary_hero_en.png');

      console.log('\n--- 2. Switching to Spanish ("Hola") Greeting Mode ---');
      await evalJs(`document.getElementById('btn-greeting-mode-es')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const esState = await evalJs(`(() => {
        const text = document.getElementById('hero-greeting-text')?.innerText;
        const enActive = document.getElementById('btn-greeting-mode-en')?.classList.contains('active');
        const esActive = document.getElementById('btn-greeting-mode-es')?.classList.contains('active');
        const binActive = document.getElementById('btn-greeting-mode-bin')?.classList.contains('active');
        const annotation = document.getElementById('hero-greeting-ann-text')?.innerText;
        return { text, enActive, esActive, binActive, annotation };
      })()`);

      console.log('Spanish Greeting State:', esState);
      if (!esState.text.includes('Hola')) throw new Error(`Expected text to include 'Hola', got '${esState.text}'`);
      if (!esState.esActive) throw new Error('ES chip should be active');
      if (esState.enActive) throw new Error('EN chip should not be active');

      await capture('verified_bilingual_binary_hero_es.png');

      console.log('\n--- 3. Switching to UTF-8 Binary Code Mode ---');
      await evalJs(`document.getElementById('btn-greeting-mode-bin')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const binState = await evalJs(`(() => {
        const text = document.getElementById('hero-greeting-text')?.innerText;
        const binActive = document.getElementById('btn-greeting-mode-bin')?.classList.contains('active');
        const annotation = document.getElementById('hero-greeting-ann-text')?.innerText;
        return { text, binActive, annotation };
      })()`);

      console.log('Binary Greeting State:', binState);
      if (!binState.binActive) throw new Error('BIN chip should be active');
      if (!binState.text.startsWith('01001000')) throw new Error(`Expected binary byte string starting with 01001000, got: ${binState.text}`);
      if (!binState.annotation.includes('Binary')) throw new Error('Binary annotation missing');

      await capture('verified_bilingual_binary_hero_bin.png');

      console.log('\n--- 4. Testing Binary Headline Translation Toggle ---');
      await evalJs(`document.getElementById('btn-headline-binary-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const headlineBinState = await evalJs(`(() => {
        const heroTitle = document.querySelector('.hero-title');
        const isBinaryClass = heroTitle?.classList.contains('is-binary-headline');
        const titleText = heroTitle?.innerText.trim();
        const btnActive = document.getElementById('btn-headline-binary-toggle')?.classList.contains('active');
        return { isBinaryClass, titleTextLength: titleText?.length, startsWithBinary: titleText?.startsWith('0101'), btnActive };
      })()`);

      console.log('Headline Binary State:', headlineBinState);
      if (!headlineBinState.isBinaryClass) throw new Error('Hero title should have is-binary-headline class');
      if (!headlineBinState.btnActive) throw new Error('Binary headline toggle button should be active');

      await capture('verified_bilingual_binary_headline_active.png');

      // Restore headline
      await evalJs(`document.getElementById('btn-headline-binary-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const restoredState = await evalJs(`(() => {
        const heroTitle = document.querySelector('.hero-title');
        const isBinaryClass = heroTitle?.classList.contains('is-binary-headline');
        const titleText = heroTitle?.innerText.replace(/\\s+/g, ' ').trim();
        return { isBinaryClass, titleText };
      })()`);

      console.log('Restored Headline State:', restoredState);
      if (restoredState.isBinaryClass) throw new Error('Headline should not have is-binary-headline class');
      if (!restoredState.titleText.includes('Quantitative Growth')) throw new Error('Headline was not restored cleanly');

      console.log('\n--- 5. Testing Light Theme Adaptation ---');
      await evalJs(`document.getElementById('btn-theme-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const lightState = await evalJs(`(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        const termBg = window.getComputedStyle(document.getElementById('hero-greeting-terminal')).backgroundColor;
        return { theme, termBg };
      })()`);

      console.log('Light Theme State:', lightState);
      await capture('verified_bilingual_binary_hero_light.png');

      // Revert to dark theme
      await evalJs(`document.getElementById('btn-theme-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      console.log('\n--- 6. Mobile Viewport (iPhone 14 / 390x844) Audit ---');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        mobile: true
      });
      await new Promise((r) => setTimeout(r, 800));

      const mobileState = await evalJs(`(() => {
        const term = document.getElementById('hero-greeting-terminal');
        const rect = term?.getBoundingClientRect();
        const overflow = rect ? rect.right > window.innerWidth : false;
        return { rectWidth: rect?.width, windowWidth: window.innerWidth, overflow };
      })()`);

      console.log('Mobile Viewport Audit:', mobileState);
      if (mobileState.overflow) throw new Error('Hero greeting terminal overflows viewport on mobile');

      await capture('verified_bilingual_binary_hero_mobile.png');

      console.log('\n===============================================================');
      console.log('✓ ALL DYNAMIC BILINGUAL & BINARY HERO TESTS PASSED WITH 100% SUCCESS');
      console.log('===============================================================');

      ws.close();
      chrome.kill();
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('Test assertion failed:', err);
      ws.close();
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
}

run();
