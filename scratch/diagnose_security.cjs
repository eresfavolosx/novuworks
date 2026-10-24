const { spawn } = require('child_process');

async function testSecurity(url) {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9333',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));
  const t = await (await fetch('http://127.0.0.1:9333/json')).json();
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

  const securityEvents = [];
  const consoleMessages = [];
  const networkRequests = [];

  ws.addEventListener('message', (e) => {
    const d = JSON.parse(e.data);
    if (d.method === 'Security.visibleSecurityStateChanged') {
      securityEvents.push(d.params.visibleSecurityState);
    }
    if (d.method === 'Log.entryAdded') {
      consoleMessages.push(d.params.entry);
    }
    if (d.method === 'Network.requestWillBeSent') {
      networkRequests.push(d.params.request.url);
    }
  });

  await new Promise(r => ws.addEventListener('open', r));
  await send('Security.enable');
  await send('Log.enable');
  await send('Network.enable');
  await send('Page.enable');

  console.log(`Navigating to ${url}...`);
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 4000));

  console.log('\n--- Visible Security States ---');
  console.log(JSON.stringify(securityEvents[securityEvents.length - 1], null, 2));

  console.log('\n--- Console Logs (Warnings & Errors) ---');
  const warningsAndErrors = consoleMessages.filter(m => m.level === 'warning' || m.level === 'error');
  console.log(warningsAndErrors.map(m => `[${m.level}] ${m.text}`).join('\n') || 'None');

  console.log('\n--- Mixed Content Requests (Insecure http:) ---');
  const insecure = networkRequests.filter(u => u.startsWith('http://'));
  console.log(insecure.length > 0 ? insecure.join('\n') : 'Zero http:// network requests found.');

  chrome.kill();
}

async function main() {
  console.log('=== Checking https://novu.works ===');
  await testSecurity('https://novu.works');
}

main().catch(console.error);
