import { spawn } from 'child_process';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless',
  '--remote-debugging-port=9226',
  '--disable-gpu',
  'https://novuworks.web.app'
]);

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9226/json')).json();
    const page = list.find((t) => t.url.includes('novuworks.web.app'));
    if (!page) {
      console.log('Page not found in tabs:', list);
      chrome.kill();
      process.exit(1);
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (() => {
              const errors = [];
              window.addEventListener('error', e => errors.push(e.message));
              const btns = Array.from(document.querySelectorAll('button, a')).map(b => ({
                id: b.id,
                className: b.className,
                text: b.textContent.trim().replace(/\\s+/g, ' ').slice(0, 30),
                rect: b.getBoundingClientRect()
              }));
              return JSON.stringify({ btns, title: document.title, activeView: document.querySelector('.viewport-view.active')?.id });
            })()
          `
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 2) {
        console.log('DOM Evaluation Result:', data.result.result.value);
        ws.close();
        chrome.kill();
        process.exit(0);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('RUNTIME EXCEPTION:', data.params.exceptionDetails);
      }
    };
  } catch (err) {
    console.error('Fetch error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 2500);
