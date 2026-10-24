const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4215;
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
    '--remote-debugging-port=9315',
    '--enable-webgl',
    '--use-gl=angle',
    'about:blank'
  ]);

  await new Promise((r) => setTimeout(r, 1500));
  const t = await (await fetch('http://127.0.0.1:9315/json')).json();
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

      console.log('\n--- 1. Testing Page Load & Background Particles Engine ---');
      await send('Page.navigate', { url: `http://localhost:${PORT}/` });
      await new Promise((r) => setTimeout(r, 1200));
      await evalJs(`localStorage.setItem('fv_onboarding_completed', 'true')`);
      await new Promise((r) => setTimeout(r, 800));

      const particleStats = await evalJs(`(() => {
        const app = window.__app || (document.querySelector('.app-shell') ? true : false);
        const container = document.getElementById('webgl-container');
        const canvas = document.querySelector('.webgl-canvas-layer canvas');
        const canvasStyle = window.getComputedStyle(document.querySelector('.webgl-canvas-layer'));
        return {
          hasContainer: !!container,
          hasCanvas: !!canvas,
          canvasWidth: canvas?.width,
          canvasHeight: canvas?.height,
          opacity: canvasStyle.opacity
        };
      })()`);

      console.log('Background Canvas Stats:', particleStats);
      if (!particleStats.hasContainer) throw new Error('WebGL Canvas container not found');

      console.log('\n--- 2. Testing "Let\'s Chat" Trigger & Executive WhatsApp Modal ---');
      // Intercept window.open to test official WhatsApp URL generation
      await evalJs(`(() => {
        window.__interceptedUrls = [];
        window.open = function(url) {
          window.__interceptedUrls.push(url);
          return null;
        };
      })()`);

      // Click Hero "Let's Chat" button
      await evalJs(`document.getElementById('btn-hero-lets-chat')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const chatModalState = await evalJs(`(() => {
        const modal = document.getElementById('executive-chat-modal');
        const isOpen = modal?.hasAttribute('open') || modal?.classList.contains('active');
        const title = document.getElementById('chat-modal-title')?.innerText;
        const starters = Array.from(document.querySelectorAll('.chat-starter-card')).map(c => ({
          label: c.querySelector('.starter-label')?.innerText,
          desc: c.querySelector('.starter-desc')?.innerText
        }));
        const emailVal = document.querySelector('.alt-channel-card .ch-val')?.innerText;
        return { isOpen, title, starterCount: starters.length, starters, emailVal };
      })()`);

      console.log('Executive Chat Modal State:', chatModalState);
      if (!chatModalState.isOpen) throw new Error('Executive chat modal did not open upon clicking Let\'s Chat');
      if (chatModalState.starterCount < 3) throw new Error(`Expected at least 3 starter cards, got ${chatModalState.starterCount}`);
      if (chatModalState.emailVal !== 'fabianvvicente1@gmail.com') throw new Error('Email value mismatch in chat modal');

      await capture('verified_whatsapp_modal_en.png');

      console.log('\n--- 3. Testing 1-Click WhatsApp Conversation Starter Launch ---');
      await evalJs(`document.querySelector('.chat-starter-card')?.click()`);
      await new Promise((r) => setTimeout(r, 400));

      const launchedUrl = await evalJs(`window.__interceptedUrls[window.__interceptedUrls.length - 1]`);
      console.log('Launched WhatsApp URL:', launchedUrl);
      if (!launchedUrl || !launchedUrl.startsWith('https://wa.me/13478158054?text=')) {
        throw new Error(`Invalid WhatsApp click-to-chat URL: ${launchedUrl}`);
      }

      console.log('\n--- 4. Testing 1-Click Email Copy Fallback ---');
      await evalJs(`document.getElementById('btn-copy-chat-email')?.click()`);
      await new Promise((r) => setTimeout(r, 300));
      const copyLabel = await evalJs(`document.getElementById('copy-email-label')?.innerText`);
      console.log('Copy Button Label:', copyLabel);
      if (!copyLabel.includes('Copied')) throw new Error('Copy label did not update');

      // Close modal
      await evalJs(`document.getElementById('btn-close-chat-modal')?.click()`);
      await new Promise((r) => setTimeout(r, 500));

      const isClosed = await evalJs(`(() => {
        const modal = document.getElementById('executive-chat-modal');
        return !modal.hasAttribute('open') && !modal.classList.contains('active');
      })()`);
      if (!isClosed) throw new Error('Chat modal did not close cleanly');

      console.log('\n--- 5. Testing Persistent Floating WhatsApp Concierge Badge ---');
      const floatingBadgeState = await evalJs(`(() => {
        const badge = document.getElementById('floating-whatsapp-badge');
        const rect = badge?.getBoundingClientRect();
        return {
          exists: !!badge,
          visible: rect ? (rect.width > 0 && rect.height > 0) : false,
          bottom: rect?.bottom,
          right: rect?.right
        };
      })()`);
      console.log('Floating WhatsApp Badge State:', floatingBadgeState);
      if (!floatingBadgeState.exists || !floatingBadgeState.visible) {
        throw new Error('Floating WhatsApp Concierge badge is not visible');
      }

      // Test clicking floating badge
      await evalJs(`document.getElementById('btn-floating-wa')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const modalReopened = await evalJs(`(() => {
        const modal = document.getElementById('executive-chat-modal');
        return modal?.hasAttribute('open') || modal?.classList.contains('active');
      })()`);
      if (!modalReopened) throw new Error('Modal did not open from floating concierge badge');

      await evalJs(`document.getElementById('btn-close-chat-modal')?.click()`);
      await new Promise((r) => setTimeout(r, 500));

      console.log('\n--- 6. Testing Spanish Translation of Chat Modal ---');
      await evalJs(`document.getElementById('btn-lang-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      await evalJs(`document.getElementById('btn-hero-lets-chat')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const esChatState = await evalJs(`(() => {
        const starters = Array.from(document.querySelectorAll('.chat-starter-card .starter-label')).map(e => e.innerText);
        const sendBtnLabel = document.getElementById('btn-send-custom-wa')?.innerText;
        return { starters, sendBtnLabel };
      })()`);
      console.log('Spanish Chat Modal State:', esChatState);
      if (!esChatState.starters[0].includes('Rol Ejecutivo') && !esChatState.starters[0].includes('Liderazgo')) {
        throw new Error(`Spanish starter text not translated: ${esChatState.starters[0]}`);
      }

      await capture('verified_whatsapp_modal_es.png');

      await evalJs(`document.getElementById('btn-close-chat-modal')?.click()`);
      await new Promise((r) => setTimeout(r, 500));

      // Revert to English
      await evalJs(`document.getElementById('btn-lang-toggle')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      console.log('\n--- 7. Mobile Viewport (iPhone 14 / 390x844) Audit: Enhanced Particles & WhatsApp ---');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        mobile: true
      });
      await new Promise((r) => setTimeout(r, 1000));

      const mobileAudit = await evalJs(`(() => {
        const canvas = document.querySelector('.webgl-canvas-layer');
        const canvasOpacity = window.getComputedStyle(canvas).opacity;
        const waBadge = document.getElementById('floating-whatsapp-badge');
        const waRect = waBadge?.getBoundingClientRect();
        const heroLetsChat = document.getElementById('btn-hero-lets-chat');
        const heroChatRect = heroLetsChat?.getBoundingClientRect();

        return {
          canvasOpacity,
          waVisible: waRect ? (waRect.width > 0 && waRect.height > 0) : false,
          waBottom: waRect ? window.innerHeight - waRect.bottom : 0,
          heroChatVisible: heroChatRect ? (heroChatRect.width > 0) : false
        };
      })()`);

      console.log('Mobile Audit Stats:', mobileAudit);
      if (parseFloat(mobileAudit.canvasOpacity) < 0.6) {
        throw new Error(`Expected mobile canvas opacity >= 0.6, got ${mobileAudit.canvasOpacity}`);
      }
      if (!mobileAudit.waVisible) throw new Error('WhatsApp floating concierge not visible on mobile');

      await capture('verified_mobile_particles_hero.png');

      // Open WhatsApp modal on mobile
      await evalJs(`document.getElementById('btn-hero-lets-chat')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const mobileModalAudit = await evalJs(`(() => {
        const modal = document.querySelector('.chat-card-shell');
        const rect = modal?.getBoundingClientRect();
        const overflow = rect ? rect.right > window.innerWidth : false;
        return { modalWidth: rect?.width, windowWidth: window.innerWidth, overflow };
      })()`);

      console.log('Mobile Chat Modal Audit:', mobileModalAudit);
      if (mobileModalAudit.overflow) throw new Error('Chat modal overflows on mobile');

      await capture('verified_mobile_whatsapp_modal.png');

      console.log('\n===============================================================');
      console.log('✓ ALL MOBILE PARTICLE & WHATSAPP INTEGRATION TESTS PASSED 100%');
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
