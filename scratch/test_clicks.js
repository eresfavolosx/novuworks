import { spawn } from 'child_process';

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless',
  '--remote-debugging-port=9227',
  '--disable-gpu',
  'https://novuworks.web.app'
]);

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9227/json')).json();
    const page = list.find((t) => t.url.includes('novuworks.web.app'));
    if (!page) {
      console.log('Page not found');
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
            (async () => {
              const logs = [];
              const testBtn = (selector, name) => {
                const el = document.querySelector(selector);
                if (!el) {
                  logs.push({ name, status: 'NOT_FOUND', selector });
                  return false;
                }
                try {
                  el.click();
                  logs.push({ name, status: 'CLICKED_OK', id: el.id, text: el.textContent.trim().slice(0, 20) });
                  return true;
                } catch (e) {
                  logs.push({ name, status: 'ERROR', error: e.message });
                  return false;
                }
              };

              // Test buttons:
              testBtn('#btn-explore-case-studies', 'Hero Case Studies Btn');
              const viewCaseActive = document.querySelector('#view-case-studies')?.classList.contains('active');
              
              testBtn('#btn-launch-ai-lab', 'Hero AI Lab Btn');
              const viewAiActive = document.querySelector('#view-ai-lab')?.classList.contains('active');

              testBtn('#btn-view-dossier', 'Hero Dossier Btn');
              const viewDossierActive = document.querySelector('#view-dossier')?.classList.contains('active');

              testBtn('#btn-tesla-mode', 'Tesla Mode Btn');
              const teslaActive = document.body.classList.contains('tesla-mode');

              testBtn('#btn-audio-toggle', 'Audio Toggle Btn');

              testBtn('.dock-btn[data-view="planner"]', 'Mobile Dock Planner Btn');
              const plannerActive = document.querySelector('#view-planner')?.classList.contains('active');

              testBtn('.nav-tab[data-view="case-studies"]', 'Nav Tab Case Studies');

              testBtn('.case-card', 'Case Study Card');
              const modalOpen = document.querySelector('#discipline-modal')?.hasAttribute('open');

              return JSON.stringify({
                logs,
                viewCaseActive,
                viewAiActive,
                viewDossierActive,
                teslaActive,
                plannerActive,
                modalOpen
              });
            })()
          `,
          awaitPromise: true
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 2) {
        console.log('CLICK TESTS RESULTS:', data.result?.result?.value || data);
        ws.close();
        chrome.kill();
        process.exit(0);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', data.params.exceptionDetails);
      }
    };
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
    process.exit(1);
  }
}, 2500);
