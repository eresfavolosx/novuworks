const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4216;
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
    '--remote-debugging-port=9316',
    '--enable-webgl',
    '--use-gl=angle',
    'about:blank'
  ]);

  await new Promise((r) => setTimeout(r, 1500));
  const t = await (await fetch('http://127.0.0.1:9316/json')).json();
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

      console.log('\n--- 1. Loading Application ---');
      await send('Page.navigate', { url: `http://localhost:${PORT}/` });
      await new Promise((r) => setTimeout(r, 1200));
      await evalJs(`localStorage.setItem('fv_onboarding_completed', 'true')`);
      await new Promise((r) => setTimeout(r, 600));

      // Instrument window.open and anchor clicks to intercept outbound URLs
      await evalJs(`(() => {
        window.__interceptedUrls = [];
        window.open = function(url) {
          window.__interceptedUrls.push(url);
          return null;
        };
      })()`);

      console.log('\n--- 2. Clicking "Let\'s Chat" and Inspecting Dual-Channel Pop-Up ---');
      await evalJs(`document.getElementById('btn-hero-lets-chat')?.click()`);
      await new Promise((r) => setTimeout(r, 600));

      const initialPopupState = await evalJs(`(() => {
        const modal = document.getElementById('executive-chat-modal');
        const isOpen = modal?.hasAttribute('open') || modal?.classList.contains('active');
        const tabWa = document.getElementById('tab-chat-whatsapp');
        const tabEmail = document.getElementById('tab-chat-email');
        const panelWa = document.getElementById('panel-chat-whatsapp');
        const panelEmail = document.getElementById('panel-chat-email');
        const statusText = document.getElementById('chat-header-status-text')?.innerText;
        return {
          isOpen,
          tabWaText: tabWa?.innerText,
          tabWaActive: tabWa?.classList.contains('active'),
          tabEmailText: tabEmail?.innerText,
          tabEmailActive: tabEmail?.classList.contains('active'),
          panelWaVisible: !panelWa?.hasAttribute('hidden'),
          panelEmailVisible: !panelEmail?.hasAttribute('hidden'),
          statusText
        };
      })()`);

      console.log('Initial Chat Pop-Up State:', initialPopupState);
      if (!initialPopupState.isOpen) throw new Error('Chat popup dialog is not open');
      if (!initialPopupState.tabWaActive) throw new Error('WhatsApp tab should be active by default');
      if (!initialPopupState.panelWaVisible) throw new Error('WhatsApp panel should be visible');
      if (initialPopupState.panelEmailVisible) throw new Error('Email panel should be hidden initially');

      await capture('verified_lets_chat_popup_whatsapp.png');

      console.log('\n--- 3. Switching to Executive Direct Email Channel ---');
      await evalJs(`document.getElementById('tab-chat-email')?.click()`);
      await new Promise((r) => setTimeout(r, 400));

      const emailPanelState = await evalJs(`(() => {
        const tabWa = document.getElementById('tab-chat-whatsapp');
        const tabEmail = document.getElementById('tab-chat-email');
        const panelWa = document.getElementById('panel-chat-whatsapp');
        const panelEmail = document.getElementById('panel-chat-email');
        const statusText = document.getElementById('chat-header-status-text')?.innerText;
        const emailAddress = document.querySelector('.email-address-text')?.innerText;
        const emailStarters = Array.from(document.querySelectorAll('.email-starter-card')).map(c => ({
          label: c.querySelector('.starter-label')?.innerText,
          desc: c.querySelector('.starter-desc')?.innerText
        }));
        const subjectVal = document.getElementById('custom-email-subject')?.value;
        return {
          tabWaActive: tabWa?.classList.contains('active'),
          tabEmailActive: tabEmail?.classList.contains('active'),
          panelWaVisible: !panelWa?.hasAttribute('hidden'),
          panelEmailVisible: !panelEmail?.hasAttribute('hidden'),
          statusText,
          emailAddress,
          starterCount: emailStarters.length,
          emailStarters,
          subjectVal
        };
      })()`);

      console.log('Email Channel Panel State:', emailPanelState);
      if (!emailPanelState.tabEmailActive) throw new Error('Email tab is not active');
      if (!emailPanelState.panelEmailVisible) throw new Error('Email panel is not visible');
      if (emailPanelState.panelWaVisible) throw new Error('WhatsApp panel should be hidden');
      if (!emailPanelState.statusText.includes('Email') && !emailPanelState.statusText.includes('Correo')) {
        throw new Error('Status line did not update to Email status');
      }
      if (emailPanelState.emailAddress !== 'fabianvvicente1@gmail.com') {
        throw new Error('Email address text mismatch');
      }
      if (emailPanelState.starterCount < 3) {
        throw new Error(`Expected at least 3 email starter templates, got ${emailPanelState.starterCount}`);
      }

      await capture('verified_lets_chat_popup_email.png');

      console.log('\n--- 4. Testing Email Template Selection & Composer Pre-fill ---');
      await evalJs(`document.querySelector('.email-starter-card')?.click()`);
      await new Promise((r) => setTimeout(r, 300));

      const composerFilled = await evalJs(`(() => {
        const subj = document.getElementById('custom-email-subject')?.value;
        const body = document.getElementById('custom-email-body')?.value;
        return { subj, bodyLen: body?.length };
      })()`);
      console.log('Composer Pre-filled State:', composerFilled);
      if (!composerFilled.subj.includes('Leadership') && !composerFilled.subj.includes('Executive')) {
        throw new Error('Email subject was not populated from template');
      }
      if (!composerFilled.bodyLen || composerFilled.bodyLen < 20) {
        throw new Error('Email body was not populated from template');
      }

      console.log('\n--- 5. Testing Email Quick Actions: Copy Address & Gmail Web ---');
      await evalJs(`document.getElementById('btn-copy-chat-email')?.click()`);
      await new Promise((r) => setTimeout(r, 300));
      const copiedLabel = await evalJs(`document.getElementById('copy-email-label')?.innerText`);
      console.log('Copy Email Label:', copiedLabel);
      if (!copiedLabel.includes('Copied') && !copiedLabel.includes('Copiado')) {
        throw new Error('Copy address label failed to show confirmation');
      }

      // Test Gmail Web action
      await evalJs(`document.getElementById('btn-send-custom-gmail')?.click()`);
      await new Promise((r) => setTimeout(r, 300));
      const lastInterceptedUrl = await evalJs(`window.__interceptedUrls[window.__interceptedUrls.length - 1]`);
      console.log('Gmail Web Intercepted URL:', lastInterceptedUrl);
      if (!lastInterceptedUrl || !lastInterceptedUrl.includes('mail.google.com/mail') || (!lastInterceptedUrl.includes('fabianvvicente1@gmail.com') && !lastInterceptedUrl.includes('fabianvvicente1%40gmail.com'))) {
        throw new Error(`Invalid Gmail Web URL generated: ${lastInterceptedUrl}`);
      }

      console.log('\n--- 6. Testing Switch-Back Nudge to WhatsApp ---');
      await evalJs(`document.getElementById('btn-nudge-to-wa')?.click()`);
      await new Promise((r) => setTimeout(r, 300));

      const backToWaState = await evalJs(`(() => {
        const tabWa = document.getElementById('tab-chat-whatsapp');
        const panelWa = document.getElementById('panel-chat-whatsapp');
        const panelEmail = document.getElementById('panel-chat-email');
        return {
          waActive: tabWa?.classList.contains('active'),
          waVisible: !panelWa?.hasAttribute('hidden'),
          emailVisible: !panelEmail?.hasAttribute('hidden')
        };
      })()`);
      console.log('Back to WhatsApp State:', backToWaState);
      if (!backToWaState.waActive || !backToWaState.waVisible) {
        throw new Error('Failed to switch back to WhatsApp via nudge');
      }

      console.log('\n--- 7. Testing Bilingual Spanish Localization of Pop-Up ---');
      await evalJs(`window.__fabianApp?.setLanguage('es')`);
      await new Promise((r) => setTimeout(r, 400));

      const spanishPopupState = await evalJs(`(() => {
        const tabWaText = document.getElementById('tab-chat-whatsapp')?.innerText;
        const tabEmailText = document.getElementById('tab-chat-email')?.innerText;
        const waSendBtnText = document.getElementById('btn-send-custom-wa')?.innerText;
        const waStarters = Array.from(document.querySelectorAll('#chat-starters-mount .starter-label')).map(x => x.innerText);
        return { tabWaText, tabEmailText, waSendBtnText, waStarters };
      })()`);
      console.log('Spanish Pop-Up State:', spanishPopupState);
      if (!spanishPopupState.tabEmailText.includes('Correo')) {
        throw new Error('Spanish Email tab label missing "Correo"');
      }
      if (!spanishPopupState.tabWaText.includes('Chat')) {
        throw new Error('Spanish WhatsApp tab label missing "Chat"');
      }
      if (spanishPopupState.waSendBtnText !== 'Abrir en WhatsApp') {
        throw new Error(`Expected 'Abrir en WhatsApp', got '${spanishPopupState.waSendBtnText}'`);
      }

      // Switch to Email in Spanish
      await evalJs(`document.getElementById('tab-chat-email')?.click()`);
      await new Promise((r) => setTimeout(r, 300));
      await capture('verified_lets_chat_popup_es_email.png');

      console.log('\n--- 8. Mobile Viewport (iPhone 14 / 390x844) Audit ---');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        mobile: true
      });
      await new Promise((r) => setTimeout(r, 400));

      const mobilePopupAudit = await evalJs(`(() => {
        const modal = document.getElementById('executive-chat-modal');
        const rect = modal?.getBoundingClientRect();
        const switcher = document.querySelector('.chat-channel-switcher')?.getBoundingClientRect();
        return {
          modalWidth: rect?.width,
          windowWidth: window.innerWidth,
          overflow: rect ? rect.width > window.innerWidth : false,
          switcherWidth: switcher?.width
        };
      })()`);
      console.log('Mobile Pop-Up Audit:', mobilePopupAudit);
      if (mobilePopupAudit.overflow) {
        throw new Error('Horizontal overflow detected in mobile chat popup');
      }

      await capture('verified_lets_chat_popup_mobile.png');

      console.log('\n===============================================================');
      console.log('✓ ALL DUAL-CHANNEL "LET\'S CHAT" POP-UP TESTS PASSED 100%');
      console.log('===============================================================\n');

      chrome.kill();
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('Test execution failed:', err);
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
}

run();
