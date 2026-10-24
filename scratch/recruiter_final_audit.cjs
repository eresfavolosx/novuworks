const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4185;
const DIST_DIR = path.join(__dirname, '../dist');
const ARTIFACTS_DIR = '/Users/fabianvelez/.gemini/antigravity/brain/b73a3d70-41e9-498c-9628-43f7f94a6c18';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const ext = path.extname(filePath);
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
  
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    `http://127.0.0.1:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9230/json');
    const tabs = await listRes.json();
    const target = tabs.find(t => t.type === 'page');
    if (!target) throw new Error('No page target found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    await new Promise(r => ws.addEventListener('open', r));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const res = JSON.parse(evt.data.toString());
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.exceptionDetails) {
        throw new Error('Eval error: ' + JSON.stringify(res.exceptionDetails));
      }
      return res.result?.value;
    }

    async function screenshot(filename) {
      const { data } = await send('Page.captureScreenshot', { format: 'png' });
      const dest = path.join(ARTIFACTS_DIR, filename);
      fs.writeFileSync(dest, Buffer.from(data, 'base64'));
      console.log(`Screenshot saved: ${filename}`);
    }

    // Wait 1.5s for initial DOM hydration
    await new Promise(r => setTimeout(r, 1500));

    // Dismiss onboarding survey if open and explicitly activate Dark Theme
    await evaluate(`(() => {
      const surveyModal = document.getElementById('visitor-survey-modal');
      if (surveyModal && surveyModal.open) {
        document.getElementById('btn-survey-explore-all')?.click();
      }
      if (window.app) window.app.applyTheme('dark');
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const auditResults = {};

    // 1. Audit Hero Kicker Row
    auditResults.heroKicker = await evaluate(`(() => {
      const pills = Array.from(document.querySelectorAll('.hero-kicker-row .kicker-pill')).map(p => p.textContent.trim());
      return {
        hasUsCitizen: pills.some(p => p.includes('US CITIZEN')),
        hasPuertoRico: pills.some(p => p.includes('SAN JUAN, PUERTO RICO')),
        pills
      };
    })()`);
    console.log('Hero Kicker Audit:', auditResults.heroKicker);

    // 2. Audit Recruiter Brief Modal in Dark Mode
    await evaluate(`document.getElementById('btn-recruiter-brief').click()`);
    await new Promise(r => setTimeout(r, 600));

    auditResults.recruiterModalInitial = await evaluate(`(() => {
      const modal = document.getElementById('recruiter-fasttrack-modal');
      const contactEl = modal.querySelector('.scorecard-contact');
      const authEl = modal.querySelector('.scorecard-workauth-badge');
      const dlBtn = document.getElementById('btn-download-recruiter-pdf');
      return {
        isOpen: modal.open,
        contactText: contactEl ? contactEl.textContent.trim() : null,
        hasPhone: contactEl ? contactEl.textContent.includes('347') : false,
        authText: authEl ? authEl.textContent.trim() : null,
        hasUsCitizen: authEl ? authEl.textContent.includes('US Citizen') : false,
        pdfHref: dlBtn ? dlBtn.getAttribute('href') : null,
        pdfDownload: dlBtn ? dlBtn.getAttribute('download') : null
      };
    })()`);
    console.log('Recruiter Modal Initial (Dark):', auditResults.recruiterModalInitial);

    await screenshot('verified_recruiter_audit_dark.png');

    // Switch Role Lens to Data Governance (Decision Science)
    await evaluate(`(() => {
      const btn = document.querySelector('#recruiter-modal-lens-pills .modal-lens-btn[data-lens="data_governance"]');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));

    auditResults.recruiterModalDataGov = await evaluate(`(() => {
      const dlBtn = document.getElementById('btn-download-recruiter-pdf');
      const proofs = Array.from(document.querySelectorAll('#scorecard-proofs-mount .score-proof-card .score-title')).map(t => t.textContent.trim());
      return {
        pdfHref: dlBtn ? dlBtn.getAttribute('href') : null,
        pdfDownload: dlBtn ? dlBtn.getAttribute('download') : null,
        proofs
      };
    })()`);
    console.log('Recruiter Modal Data Governance Lens:', auditResults.recruiterModalDataGov);

    // Switch to Light Theme and capture screenshot
    await evaluate(`window.app.applyTheme('light')`);
    await new Promise(r => setTimeout(r, 400));
    await screenshot('verified_recruiter_audit_light.png');

    // Switch back to Dark Theme
    await evaluate(`window.app.applyTheme('dark')`);
    await new Promise(r => setTimeout(r, 300));

    // Close Recruiter Modal
    await evaluate(`document.getElementById('btn-close-recruiter-modal').click()`);
    await new Promise(r => setTimeout(r, 400));

    // 3. Audit Executive Resume Modal
    await evaluate(`document.getElementById('btn-open-resume-card').click()`);
    await new Promise(r => setTimeout(r, 600));

    auditResults.resumeModal = await evaluate(`(() => {
      const modal = document.getElementById('resume-export-modal');
      const contactBar = modal.querySelector('.res-contact-bar');
      const dlBtn = document.getElementById('btn-download-resume-pdf');
      return {
        isOpen: modal.open,
        hasPhone: contactBar ? contactBar.textContent.includes('347') : false,
        hasUsCitizen: contactBar ? contactBar.textContent.includes('US Citizen') : false,
        contactText: contactBar ? contactBar.textContent.replace(/\\s+/g, ' ').trim() : null,
        pdfHref: dlBtn ? dlBtn.getAttribute('href') : null
      };
    })()`);
    console.log('Executive Resume Modal Audit:', auditResults.resumeModal);

    await screenshot('verified_resume_modal_audit.png');

    // Close Resume Modal
    await evaluate(`document.getElementById('btn-close-resume-modal').click()`);
    await new Promise(r => setTimeout(r, 400));

    // 4. Audit Dossier View (View 05)
    await evaluate(`document.querySelector('.nav-tab[data-view="dossier"]').click()`);
    await new Promise(r => setTimeout(r, 600));

    auditResults.dossierView = await evaluate(`(() => {
      const contactRow = document.querySelector('.dossier-contact-row');
      const phonePill = contactRow ? contactRow.querySelector('.phone-pill') : null;
      const authPill = contactRow ? contactRow.querySelector('.auth-pill') : null;
      const dlBtn = document.getElementById('dossier-download-resume-btn');
      return {
        hasPhonePill: !!phonePill,
        phoneText: phonePill ? phonePill.textContent.trim() : null,
        hasAuthPill: !!authPill,
        authText: authPill ? authPill.textContent.trim() : null,
        pdfHref: dlBtn ? dlBtn.getAttribute('href') : null
      };
    })()`);
    console.log('Dossier View Audit:', auditResults.dossierView);

    await screenshot('verified_dossier_audit_dark.png');

    // Toggle Light Mode on Dossier
    await evaluate(`document.getElementById('btn-theme-toggle').click()`);
    await new Promise(r => setTimeout(r, 400));
    await screenshot('verified_dossier_audit_light.png');

    // Back to Dark Mode
    await evaluate(`document.getElementById('btn-theme-toggle').click()`);
    await new Promise(r => setTimeout(r, 300));

    // 5. Audit Visitor Tools Suite (ATS JSON Resume)
    await evaluate(`document.getElementById('btn-visitor-tools').click()`);
    await new Promise(r => setTimeout(r, 600));

    // Click Tab 3 (ATS Export)
    await evaluate(`document.querySelector('.tools-tab-btn[data-tool="ats-export"]').click()`);
    await new Promise(r => setTimeout(r, 400));

    auditResults.toolsAtsResume = await evaluate(`(() => {
      const previewEl = document.getElementById('ats-json-preview');
      const dlPdfBtn = document.getElementById('btn-tools-download-pdf');
      const rawJson = previewEl ? previewEl.textContent : '';
      let parsed = null;
      try { parsed = JSON.parse(rawJson); } catch (e) {}
      return {
        hasValidJson: !!parsed,
        name: parsed?.basics?.name,
        phone: parsed?.basics?.phone,
        workAuth: parsed?.basics?.workAuthorization,
        hasPlaceholderX: rawJson.includes('XXX'),
        pdfHref: dlPdfBtn ? dlPdfBtn.getAttribute('href') : null
      };
    })()`);
    console.log('Visitor Tools ATS Resume Audit:', auditResults.toolsAtsResume);

    await screenshot('verified_tools_ats_audit.png');

    // Close Tools Modal
    await evaluate(`document.getElementById('btn-close-tools-modal').click()`);
    await new Promise(r => setTimeout(r, 400));

    // 6. Audit Mobile Viewport (390 x 844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 500));

    // Open Recruiter Brief in Mobile
    await evaluate(`document.getElementById('btn-recruiter-brief').click()`);
    await new Promise(r => setTimeout(r, 600));
    await screenshot('verified_recruiter_mobile_audit.png');

    await evaluate(`document.getElementById('btn-close-recruiter-modal').click()`);
    await new Promise(r => setTimeout(r, 400));

    // Mobile Dossier View
    await evaluate(`document.querySelector('.dock-btn[data-view="dossier"]').click()`);
    await new Promise(r => setTimeout(r, 600));
    await screenshot('verified_dossier_mobile_audit.png');

    console.log('=== FINAL AUDIT VERIFICATION SUMMARY ===');
    console.log(JSON.stringify(auditResults, null, 2));

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Audit failed:', err);
    chromeProc.kill();
    server.close();
    process.exit(1);
  }
});
