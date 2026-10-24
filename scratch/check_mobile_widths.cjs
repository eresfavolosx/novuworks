const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4220;
const DIST_DIR = '/Users/fabianvelez/Documents/antigravity/jolly-rutherford/dist';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, async () => {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new', '--remote-debugging-port=9321', 'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1200));
  const t = await (await fetch('http://127.0.0.1:9321/json')).json();
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

  ws.addEventListener('open', async () => {
    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 740, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: `http://localhost:${PORT}/` });
    await new Promise(r => setTimeout(r, 1000));
    const data = (await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('.app-header');
        const left = document.querySelector('.header-left');
        const right = document.querySelector('.header-right');
        const brandName = document.querySelector('.brand-name');
        const btns = Array.from(right.querySelectorAll(':scope > *')).filter(el => el.offsetParent !== null).map(el => ({
          id: el.id || el.className,
          w: Math.round(el.getBoundingClientRect().width),
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right)
        }));
        return {
          winW: window.innerWidth,
          headerW: Math.round(header.getBoundingClientRect().width),
          leftW: Math.round(left.getBoundingClientRect().width),
          brandNameW: Math.round(brandName.getBoundingClientRect().width),
          rightW: Math.round(right.getBoundingClientRect().width),
          btns
        };
      })()`,
      returnByValue: true
    })).result.value;

    console.log(JSON.stringify(data, null, 2));
    chrome.kill();
    server.close();
    process.exit(0);
  });
});
