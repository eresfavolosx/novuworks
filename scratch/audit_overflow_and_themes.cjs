const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4219;
const DIST_DIR = '/Users/fabianvelez/Documents/antigravity/jolly-rutherford/dist';

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
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9319',
    '--enable-webgl',
    '--use-gl=angle',
    'about:blank'
  ]);

  await new Promise((r) => setTimeout(r, 1500));
  const t = await (await fetch('http://127.0.0.1:9319/json')).json();
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

  ws.addEventListener('open', async () => {
    try {
      await send('Runtime.enable');
      await send('Page.enable');

      const viewports = [
        { name: 'Desktop 1440', width: 1440, height: 900, mobile: false },
        { name: 'Mobile iPhone 14 (390)', width: 390, height: 844, mobile: true },
        { name: 'Small Mobile (360)', width: 360, height: 740, mobile: true }
      ];

      const views = ['core', 'case-studies', 'ai-lab', 'planner', 'dossier', 'intel-feed'];

      for (const vp of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 2,
          mobile: vp.mobile
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise((r) => setTimeout(r, 1000));
        await evalJs(`localStorage.setItem('fv_onboarding_completed', 'true')`);

        for (const viewName of views) {
          await evalJs(`window.__fabianApp?.switchView('${viewName}')`);
          await new Promise((r) => setTimeout(r, 200));

          for (const theme of ['dark', 'light']) {
            await evalJs(`window.__fabianApp?.setTheme('${theme}')`);
            await new Promise((r) => setTimeout(r, 150));

            const overflows = await evalJs(`(() => {
              const winW = window.innerWidth;
              const issues = [];
              const candidates = document.querySelectorAll('button, a.luxury-btn, a.cta-action-btn, a.proj-action-btn, .dock-btn, .channel-switch-btn, .email-action-pill, .hud-action-btn, .filter-chip, .sculpture-pill');

              candidates.forEach(el => {
                if (el.offsetParent === null) return;
                const rect = el.getBoundingClientRect();
                if (rect.right > winW + 1) {
                  issues.push({
                    view: '${viewName}',
                    theme: '${theme}',
                    id: el.id,
                    className: el.className,
                    text: (el.innerText || '').slice(0, 25),
                    rectRight: Math.round(rect.right),
                    winW,
                    overflowBy: Math.round(rect.right - winW)
                  });
                }
              });
              return issues;
            })()`);

            if (overflows.length > 0) {
              console.log(`[${vp.name}] [View: ${viewName}] [Theme: ${theme}] ${overflows.length} OVERFLOWS:`);
              console.log(overflows.map(x => `  - #${x.id || x.className} ("${x.text.replace(/\n/g, ' ')}") overflows by ${x.overflowBy}px`).join('\n'));
            }
          }
        }
      }

      chrome.kill();
      server.close();
      process.exit(0);
    } catch (e) {
      console.error(e);
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
}

run();
