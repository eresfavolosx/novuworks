const { spawn } = require('child_process');

const TARGETS = [
  'https://novu.works',
  'https://novuworks.web.app',
  'http://novu.works',
  'http://novuworks.web.app',
  'https://bizpay.novu.works',
  'https://picta.novu.works',
  'https://nfc.novu.works',
  'https://hackea.novu.works',
  'https://jobhelper.novu.works'
];

async function checkUrl(url) {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9335',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));
  const t = await (await fetch('http://127.0.0.1:9335/json')).json();
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

  let latestSecState = null;
  const consoleMessages = [];

  ws.addEventListener('message', (e) => {
    const d = JSON.parse(e.data);
    if (d.method === 'Security.visibleSecurityStateChanged') {
      latestSecState = d.params.visibleSecurityState;
    }
    if (d.method === 'Log.entryAdded') {
      consoleMessages.push(d.params.entry);
    }
  });

  await new Promise(r => ws.addEventListener('open', r));
  await send('Security.enable');
  await send('Log.enable');
  await send('Page.enable');

  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2500));

  const finalUrl = (await send('Runtime.evaluate', { expression: 'window.location.href', returnByValue: true })).result?.value;

  console.log(`[URL: ${url}] -> Landed on: ${finalUrl}`);
  console.log(`  Security State: ${latestSecState?.securityState || 'unknown'}`);
  if (latestSecState?.securityStateIssueIds?.length > 0) {
    console.log(`  Issues: ${JSON.stringify(latestSecState.securityStateIssueIds)}`);
  }
  const mixed = consoleMessages.filter(m => (m.text || '').toLowerCase().includes('mixed') || (m.text || '').toLowerCase().includes('insecure'));
  if (mixed.length > 0) {
    console.log(`  Mixed/Insecure Warnings:`, mixed.map(m => m.text));
  }

  chrome.kill();
}

async function run() {
  for (const url of TARGETS) {
    await checkUrl(url);
    await new Promise(r => setTimeout(r, 500));
  }
}

run().catch(console.error);
