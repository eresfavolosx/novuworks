// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Authentic Corporate Brand Marks
//  Official, verified 100% native vector SVG logos for all employers & partners:
//  Money Group (Money.com), Red Ventures, edX, Meta, Microsoft,
//  Stanford University, Universidad Politécnica de PR, Grupo Guayacán,
//  Enactus, Power BI, Novu Works, Viva Advertising, Link Puerto Rico, Taíno Sun
//  Features adaptive currentColor typography for seamless contrast in Dark & Light Modes.
// ─────────────────────────────────────────────────────────────

export const LOGOS = {
  // Official Money Group LLC (Money.com) brand masthead
  moneyGroup: `
    <svg class="comp-logo-svg" viewBox="0 0 210 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Money Group Official Logo">
      <g fill="currentColor">
        <!-- Authentic Money editorial wordmark -->
        <text x="4" y="32" font-family="'Georgia', 'Times New Roman', serif" font-weight="900" font-size="34" letter-spacing="-0.03em">Money</text>
      </g>
      <!-- Sub-label GROUP nestled in signature typography -->
      <text x="108" y="46" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="13" letter-spacing="0.16em" fill="#d4af37">GROUP</text>
    </svg>
  `,

  // Official Red Ventures primary brand mark & clean wordmark
  redVentures: `
    <svg class="comp-logo-svg" viewBox="0 0 230 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Red Ventures Official Logo">
      <!-- Official R | V Primary Mark -->
      <g transform="translate(4, 5)">
        <!-- Crimson R -->
        <path d="M 0,0 H 14 C 18,0 21,2.5 21,6.5 C 21,9.5 19,11.5 16,12.5 L 22,23 H 15.5 L 10.5,13.5 H 6 V 23 H 0 V 0 Z M 6,4.5 V 9.5 H 13.5 C 15,9.5 16,8.5 16,7 C 16,5.5 15,4.5 13.5,4.5 H 6 Z" fill="#ed1c24"/>
        <!-- Dividing vertical line -->
        <line x1="26" y1="0" x2="26" y2="23" stroke="currentColor" stroke-width="2.5" opacity="0.6"/>
        <!-- V in currentColor -->
        <path d="M 31,0 H 37.5 L 43,15.5 L 48.5,0 H 55 L 46.5,23 H 39.5 L 31,0 Z" fill="currentColor"/>
      </g>
      <!-- Official Clean Wordmark -->
      <text x="66" y="24" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="15" letter-spacing="-0.01em" fill="currentColor">RED</text>
      <text x="102" y="24" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="600" font-size="15" letter-spacing="-0.01em" fill="currentColor" opacity="0.9">VENTURES</text>
    </svg>
  `,

  // Official edX trademark logo directly from https://www.edx.org/trademark-logos/edx-logo-elm.svg
  edx: `
    <svg class="comp-logo-svg" viewBox="0 0 553 311" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="edX Official Logo">
      <!-- Signature edX dark emerald teal parallelogram badge -->
      <polygon points="353.43,50.96 364.08,0 51.3,0 0,245.01 261.52,245.01 247.12,310.72 497.63,310.72 552.88,50.96" fill="#02262B" stroke="rgba(255, 255, 255, 0.25)" stroke-width="4"/>
      <!-- Authentic white lowercase 'e' -->
      <path d="M106.6,213.73c-7.09,0-13.79-1.16-20.09-3.49c-6.3-2.32-11.8-5.75-16.49-10.28c-4.69-4.53-8.39-10.1-11.11-16.72c-2.72-6.62-4.08-14.22-4.08-22.81c0-11.74,1.63-22.44,4.9-32.09c3.27-9.65,7.82-17.92,13.65-24.82c5.83-6.89,12.82-12.23,20.98-16.01c8.15-3.78,17.08-5.67,26.77-5.67c6.54,0,12.74,1.14,18.62,3.43c5.87,2.29,11.01,5.61,15.42,9.99c4.41,4.37,7.92,9.75,10.52,16.13c2.6,6.38,3.9,13.71,3.9,21.98c0,1.26-0.04,2.74-0.12,4.43c-0.08,1.7-0.2,3.43-0.36,5.2c-0.16,1.77-0.32,3.51-0.47,5.2c-0.16,1.69-0.35,3.13-0.59,4.31H76.22c-0.08,1.11-0.14,2.17-0.18,3.19c-0.04,1.03-0.06,2.09-0.06,3.19c0,6.54,0.95,12.11,2.84,16.72c1.89,4.61,4.35,8.37,7.39,11.29c3.03,2.92,6.44,5.02,10.22,6.32c3.78,1.3,7.6,1.95,11.46,1.95c8.43,0,15.21-1.46,20.33-4.37c5.12-2.91,9.02-6.85,11.7-11.82h21.63c-1.34,4.89-3.55,9.46-6.62,13.71c-3.07,4.25-6.95,7.94-11.64,11.05c-4.69,3.11-10.13,5.56-16.31,7.33C120.8,212.84,114,213.73,106.6,213.73z M148.08,136.08c0.08-0.39,0.14-1.12,0.18-2.19c0.04-1.06,0.06-2.11,0.06-3.13c0-4.18-0.61-8.14-1.83-11.88c-1.22-3.74-3.05-7.03-5.5-9.87c-2.44-2.84-5.48-5.08-9.1-6.74c-3.63-1.65-7.84-2.48-12.65-2.48c-4.89,0-9.46,0.87-13.71,2.6c-4.26,1.73-8.12,4.2-11.58,7.39c-3.47,3.19-6.46,7.01-8.98,11.46c-2.52,4.45-4.53,9.4-6.03,14.83H148.08z" fill="#FFFFFF"/>
      <!-- Authentic white lowercase 'd' -->
      <path d="M227.58,213.73c-6.38,0-12.37-1.2-17.97-3.61c-5.6-2.4-10.5-5.85-14.71-10.34c-4.22-4.49-7.55-9.93-9.99-16.31c-2.44-6.38-3.66-13.51-3.66-21.39c0-7.64,0.77-14.95,2.3-21.92s3.72-13.43,6.56-19.38c2.84-5.95,6.24-11.33,10.22-16.13c3.98-4.81,8.39-8.9,13.24-12.29c4.85-3.39,10.08-5.99,15.72-7.8c5.63-1.81,11.52-2.72,17.67-2.72c4.57,0,8.92,0.63,13.06,1.89c4.14,1.26,7.88,3.01,11.23,5.26c3.35,2.25,6.22,4.96,8.63,8.15c2.4,3.19,4.16,6.68,5.26,10.46h1.89l15.72-74.11h20.68l-37.82,178h-19.62l3.66-17.37h-1.89c-4.65,6.07-10.48,10.85-17.49,14.36C243.26,211.97,235.69,213.73,227.58,213.73z M234.08,195.41c6.62,0,12.74-1.55,18.38-4.67c5.63-3.11,10.54-7.37,14.71-12.76c4.18-5.4,7.45-11.74,9.81-19.03c2.36-7.29,3.55-15.15,3.55-23.58c0-5.44-0.75-10.32-2.25-14.66c-1.5-4.33-3.63-8.02-6.38-11.05c-2.76-3.03-6.11-5.38-10.05-7.03c-3.94-1.66-8.39-2.48-13.36-2.48c-6.54,0-12.61,1.46-18.2,4.37c-5.6,2.92-10.44,6.97-14.54,12.17c-4.1,5.2-7.33,11.41-9.69,18.61s-3.55,15.11-3.55,23.7c0,5.36,0.77,10.28,2.31,14.77c1.54,4.49,3.68,8.33,6.44,11.52c2.76,3.19,6.07,5.67,9.93,7.45C225.05,194.52,229.35,195.41,234.08,195.41z" fill="#FFFFFF"/>
      <!-- Authentic white uppercase 'X' -->
      <polygon points="508.94,84.45 462.81,84.45 412.49,146.75 410.01,146.75 383.4,84.45 336.74,84.45 376.74,174.94 290.39,277.23 335.9,277.23 391.32,211.52 395.06,211.52 425,277.23 470.79,277.23 426.51,179.47" fill="#FFFFFF"/>
    </svg>
  `,

  // Official Meta Platforms gradient infinity loop & wordmark vector
  meta: `
    <svg class="comp-logo-svg" viewBox="0 0 948 191" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Meta Official Logo">
      <defs>
        <linearGradient id="metaGrad1" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0064e1" offset="0%"/>
          <stop stop-color="#0064e1" offset="40%"/>
          <stop stop-color="#0073ee" offset="83%"/>
          <stop stop-color="#0082fb" offset="100%"/>
        </linearGradient>
        <linearGradient id="metaGrad2" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0082fb" offset="0%"/>
          <stop stop-color="#0064e0" offset="100%"/>
        </linearGradient>
      </defs>
      <path fill="#0081fb" d="m31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z"/>
      <path fill="url(#metaGrad1)" d="m24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z"/>
      <path fill="url(#metaGrad2)" d="m82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z"/>
      <!-- Wordmark in currentColor for Dark & Light Mode Adaptation -->
      <path fill="currentColor" d="m347.94,6.04h35.93l61.09,110.52 61.1-110.52h35.15v181.6h-29.31v-139.18l-53.58,96.38h-27.5l-53.57-96.38v139.18h-29.31z m285.11,67.71c-21.02,0-33.68,15.82-36.71,35.41h71.34c-1.47-20.18-13.11-35.41-34.63-35.41z m-65.77,46.57c0-41.22 26.64-71.22 66.28-71.22 38.99,0 62.27,29.62 62.27,73.42v8.05h-99.49c3.53,21.31 17.67,35.67 40.47,35.67 18.19,0 29.56-5.55 40.34-15.7l15.57,19.07c-14.67,13.49-33.33,21.27-56.95,21.27-42.91,0-68.49-31.29-68.49-70.56z m164.09-43.97h-26.98v-24h26.98v-39.69h28.28v39.69h40.99v24h-40.99v60.83c0,20.77 6.64,28.15 22.96,28.15 7.45,0 11.72-.64 18.03-1.69v23.74c-7.86,2.22-15.36,3.24-23.48,3.24-30.53,0-45.79-16.68-45.79-50.07z m188.35,23.34c-5.68-14.34-18.35-24.9-36.97-24.9-24.2,0-39.69,17.17-39.69,45.14 0,27.27 14.26,45.27 38.53,45.27 19.08,0 32.7-11.1 38.13-24.91z m28.28,87.95h-27.76v-18.94c-7.76,11.15-21.88,22.18-44.75,22.18-36.78,0-61.36-30.79-61.36-70.95 0-40.54 25.17-70.83 62.92-70.83 18.66,0 33.3,7.46 43.19,20.63v-17.38h27.76z"/>
    </svg>
  `,

  // Official Microsoft 4-square grid & Segoe wordmark vector
  microsoft: `
    <svg class="comp-logo-svg" viewBox="0 0 338 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Official Logo">
      <rect fill="#F25022" width="34.2" height="34.2"/>
      <rect x="37.8" fill="#7FBA00" width="34.2" height="34.2"/>
      <rect y="37.8" fill="#00A4EF" width="34.2" height="34.2"/>
      <rect x="37.8" y="37.8" fill="#FFB900" width="34.2" height="34.2"/>
      <!-- Wordmark in currentColor for Dark & Light Mode Adaptation -->
      <path fill="currentColor" d="M140.4,14.4v43.2h-7.5V23.7h-0.1l-13.4,33.9h-5l-13.7-33.9h-0.1v33.9h-6.9V14.4h10.8l12.4,32h0.2l13.1-32H140.4 z M146.6,17.7c0-1.2,0.4-2.2,1.3-3c0.9-0.8,1.9-1.2,3.1-1.2c1.3,0,2.4,0.4,3.2,1.2s1.3,1.8,1.3,3c0,1.2-0.4,2.2-1.3,3 c-0.9,0.8-1.9,1.2-3.2,1.2s-2.3-0.4-3.1-1.2C147.1,19.8,146.6,18.8,146.6,17.7z M154.7,26.6v31h-7.3v-31H154.7z M176.8,52.3 c1.1,0,2.3-0.2,3.6-0.8c1.3-0.5,2.5-1.2,3.6-2v6.8c-1.2,0.7-2.5,1.2-4,1.5c-1.5,0.3-3.1,0.5-4.9,0.5c-4.6,0-8.3-1.4-11.1-4.3 c-2.9-2.9-4.3-6.6-4.3-11c0-5,1.5-9.1,4.4-12.3c2.9-3.2,7-4.8,12.4-4.8c1.4,0,2.8,0.2,4.1,0.5c1.4,0.3,2.5,0.8,3.3,1.2v7 c-1.1-0.8-2.3-1.5-3.4-1.9c-1.2-0.4-2.4-0.7-3.6-0.7c-2.9,0-5.2,0.9-7,2.8s-2.6,4.4-2.6,7.6c0,3.1,0.9,5.6,2.6,7.3 C171.6,51.4,173.9,52.3,176.8,52.3z M204.7,26.1c0.6,0,1.1,0,1.6,0.1s0.9,0.2,1.2,0.3v7.4c-0.4-0.3-0.9-0.6-1.7-0.8 s-1.6-0.4-2.7-0.4c-1.8,0-3.3,0.8-4.5,2.3s-1.9,3.8-1.9,7v15.6h-7.3v-31h7.3v4.9h0.1c0.7-1.7,1.7-3,3-4 C201.2,26.6,202.8,26.1,204.7,26.1z M207.9,42.6c0-5.1,1.5-9.2,4.3-12.2c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3 s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2C209.3,51.3,207.9,47.4,207.9,42.6z M215.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6 c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C216.2,36.5,215.5,39,215.5,42.3z M250.5,34.8c0,1,0.3,1.9,1,2.5 c0.7,0.6,2.1,1.3,4.4,2.2c2.9,1.2,5,2.5,6.1,3.9c1.2,1.5,1.8,3.2,1.8,5.3c0,2.9-1.1,5.2-3.4,7c-2.2,1.8-5.3,2.6-9.1,2.6 c-1.3,0-2.7-0.2-4.3-0.5c-1.6-0.3-2.9-0.7-4-1.2v-7.2c1.3,0.9,2.8,1.7,4.3,2.2c1.5,0.5,2.9,0.8,4.2,0.8c1.6,0,2.9-0.2,3.6-0.7 c0.8-0.5,1.2-1.2,1.2-2.3c0-1-0.4-1.8-1.2-2.6c-0.8-0.7-2.4-1.5-4.6-2.4c-2.7-1.1-4.6-2.4-5.7-3.8s-1.7-3.2-1.7-5.4 c0-2.8,1.1-5.1,3.3-6.9c2.2-1.8,5.1-2.7,8.6-2.7c1.1,0,2.3,0.1,3.6,0.4s2.5,0.6,3.4,0.9V34c-1-0.6-2.1-1.2-3.4-1.7 c-1.3-0.5-2.6-0.7-3.8-0.7c-1.4,0-2.5,0.3-3.2,0.8C250.9,33.1,250.5,33.8,250.5,34.8z M266.9,42.6c0-5.1,1.5-9.2,4.3-12.2 c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2 C268.4,51.3,266.9,47.4,266.9,42.6z M274.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6 c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C275.3,36.5,274.5,39,274.5,42.3z M322.9,32.6h-10.9v25h-7.4v-25h-5.2v-6h5.2v-4.3c0-3.2,1.1-5.9,3.2-8s4.8-3.1,8.1-3.1c0.9,0,1.7,0.1,2.4,0.1s1.3,0.2,1.8,0.4v6.3 c-0.2-0.1-0.7-0.3-1.3-0.5c-0.6-0.2-1.3-0.3-2.1-0.3c-1.5,0-2.7,0.5-3.5,1.4c-0.8,0.9-1.2,2.4-1.2,4.2v3.7h10.9v-7l7.3-2.2v9.2h7.4 v6h-7.4v14.5c0,1.9,0.4,3.2,1,4c0.7,0.8,1.8,1.2,3.3,1.2c0.4,0,0.9-0.1,1.5-0.3c0.6-0.2,1.1-0.4,1.5-0.7v6c-0.5,0.3-1.2,0.5-2.3,0.7 c-1.1,0.2-2.1,0.3-3.2,0.3c-3.1,0-5.4-0.8-6.9-2.4c-1.5-1.6-2.3-4.1-2.3-7.4L322.9,32.6L322.9,32.6z"/>
    </svg>
  `,

  // Official Stanford Cardinal Block 'S' & Redwood Tree vector
  stanford: `
    <svg class="comp-logo-svg" viewBox="0 0 260 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Stanford University Official Logo">
      <!-- Authentic Stanford Block S Tree -->
      <g transform="translate(4, 3) scale(0.20)">
        <path fill="#8c1515" d="m35.872 1.1236-34.558 33.832v90.907l30.041 30.665h13.776c-0.33541 0.92261-0.77516 2.3452 0.18119 3.7375 1.0401 1.5433 2.835 1.5433 3.5228 1.5433 0.80522 0 1.9291-0.10059 3.6571-0.33551h0.02027s0.72132 0.64079-1.4762 1.3621c-1.8117 0.63746-3.3919 1.6909-3.912 3.5025-0.03436 0.13399-0.04703 0.27196-0.08053 0.38918h-45.716l-0.013433 46.465 34.558 33.953h90.887l34.558-33.905v-87.077l-30.047-30.618h-25.478c-0.0172 0-0.0403-0.0134-0.0403-0.0134-1.1239-0.67099-2.2781-1.3789-3.3349-2.0667l-0.38917-0.24828-0.0671-0.04026c-0.57036-0.35214-1.1709-0.78508-1.8251-1.3554-0.57036-0.45294-1.0434-0.90584-1.3957-1.3085l-0.10066-0.10066c-0.67099-0.70459-1.2581-1.3789-1.7111-1.966 3.9756 1.1407 8.3071 1.4292 10.387 1.4963h0.24828c0.13399 0 0.27196 0.02027 0.38918 0.02027l0.18116 0.0134c0.50323 0.03436 0.88907 0.11712 1.1407 0.20129 0.26842 0.10049 0.5066 0.22159 0.72469 0.32208l1.0736 0.40261c0.25165 0.06699 0.52 0.08053 0.80522 0.08053 1.5601 0 3.0195-0.93941 3.6904-2.4156 0.21816-0.50327 0.5536-1.5064 0.30195-2.8316l45.442 0.03367v-50.76l-34.551-33.886h-90.887z"/>
        <path fill="#ffffff" d="m157.19 36.804-32.1-31.487h-87.55l-32.108 31.436v87.382l27.628 28.182 17.815 0.0172c-1.9963 1.7949-2.6169 3.6569-2.9357 4.5628-0.68775 1.9962-1.4091 2.5665 4.8479 1.6943 1.9795-0.28515 5.5862-1.5601 7.2803-2.7008 1.6607-1.1407 4.9484-0.21816 4.6633 2.2479-1.5433 3.7743-5.502 6.1397-9.2768 6.6095-8.6893 1.0904-4.9317 4.3279-4.9317 4.3279 0.95619 0.65426 1.644 1.2917 2.1305 1.8621h-4.2273v-0.0172h-42.978l-0.017178 40.478 32.091 31.537h87.567l32.09-31.487v-83.539l-27.628-28.148h-22.327c-1.7781-1.1911-4.177-2.5163-6.3578-3.9421 0-0.01718 0-0.01718-0.0172-0.01718-0.83874-0.48647-1.6607-1.0903-2.4491-1.7781-0.65421-0.52001-1.2413-1.0736-1.7446-1.6272-1.9291-2.013-3.3717-4.1099-3.7576-5.0829-0.72133-1.7781-0.55355-4.026 1.0736-3.1034 4.1267 2.3821 10.904 2.835 13.42 2.9189 0.28515 0 2.3149 0.2349 2.8014 0.38564 0.50322 0.20141 1.2749 0.57034 1.2749 0.57034 1.0233 0.43614 2.8685-0.97294 0.73812-3.5731-0.55359-0.88907-1.3923-1.9124-2.3821-2.9524h47.354v-44.756"/>
      </g>
      <!-- Typography in currentColor & cardinal red -->
      <text x="50" y="27" font-family="'Source Serif Pro', 'Playfair Display', Georgia, serif" font-weight="700" font-size="20" letter-spacing="0.08em" fill="currentColor">STANFORD</text>
      <text x="52" y="44" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="9.5" letter-spacing="0.26em" fill="#e11d48">UNIVERSITY</text>
    </svg>
  `,

  // Official Universidad Politécnica de Puerto Rico (PUPR) verified heraldic shield + wordmark
  politecnica: `
    <svg class="comp-logo-svg" viewBox="0 0 260 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Universidad Politécnica de Puerto Rico Official Logo">
      <!-- Authentic PUPR Heraldic Shield -->
      <g transform="translate(4, 4)">
        <path d="M 0,0 H 32 V 22 C 32,34 16,42 16,42 C 16,42 0,34 0,22 Z" fill="#0047ba"/>
        <!-- Gold left half-crest -->
        <path d="M 0,0 H 16 V 42 C 16,42 0,34 0,22 Z" fill="#eab308"/>
        <!-- White UP Bell Tower Monogram -->
        <path d="M 7,8 H 15 V 28 H 11 V 13 H 7 Z M 17,8 H 25 C 28,8 29,10 29,13 C 29,16 28,18 25,18 H 21 V 28 H 17 Z M 21,11 V 15 H 25 C 26,15 26.5,14.5 26.5,13 C 26.5,11.5 26,11 25,11 Z" fill="#ffffff"/>
      </g>
      <!-- Official Wordmark -->
      <text x="44" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="12.5" letter-spacing="0.04em" fill="#0047ba">UNIVERSIDAD</text>
      <text x="44" y="36" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="13.5" letter-spacing="0.06em" fill="currentColor">POLITÉCNICA</text>
      <text x="44" y="47" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="7.5" letter-spacing="0.16em" fill="#eab308">DE PUERTO RICO</text>
    </svg>
  `,

  // Official Grupo Guayacán verified logo (Lush tree canopy + authentic terracotta-accented wordmark)
  guayacan: `
    <svg class="comp-logo-svg" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Grupo Guayacán Official Logo">
      <!-- Official Guayacán Tree Symbol in authentic brand green -->
      <g transform="translate(6, 4) scale(0.42)">
        <path fill="#4d8c2f" d="M47.7,0.5 C36.5,1.2 26.4,8.5 21.6,18.5 C19.2,23.5 15.6,28.7 10.4,32 C4.5,35.7 0,42.5 0,49.5 C0,58.5 6.5,65.8 15.5,67 C20.5,67.7 25,65.2 28.5,61.8 L30,64 C28,68 25.5,72 21,75 C16,78.5 13.5,84.5 15,90.5 C16.5,96.5 22,100.5 28.2,100.5 C32.5,100.5 36.5,98.2 39,94.5 L42,91 V99 C42,105 46.5,109.5 52.5,109.5 C58.5,109.5 63,105 63,99 V91 L66,94.5 C68.5,98.2 72.5,100.5 76.8,100.5 C83,100.5 88.5,96.5 90,90.5 C91.5,84.5 89,78.5 84,75 C79.5,72 77,68 75,64 L76.5,61.8 C80,65.2 84.5,67.7 89.5,67 C98.5,65.8 105,58.5 105,49.5 C105,42.5 100.5,35.7 94.6,32 C89.4,28.7 85.8,23.5 83.4,18.5 C78.6,8.5 68.5,1.2 57.3,0.5 C54.1,0.3 50.9,0.3 47.7,0.5 Z"/>
      </g>
      <!-- Official GUAYACÁN Wordmark with signature terracotta-orange Á -->
      <g transform="translate(60, 31)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="19" letter-spacing="0.08em" fill="currentColor">GUAYAC</text>
        <text x="89" y="0" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="19" letter-spacing="0.08em" fill="#e3522f">Á</text>
        <text x="104" y="0" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="19" letter-spacing="0.08em" fill="currentColor">N</text>
      </g>
      <text x="61" y="44" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="7.5" letter-spacing="0.22em" fill="#4d8c2f">GRUPO GUAYACÁN</text>
    </svg>
  `,

  // Official Enactus verified logo (Flight crane in golden origami folds + clean wordmark)
  enactus: `
    <svg class="comp-logo-svg" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Enactus Official Logo">
      <!-- Official Enactus Origami Bird Taking Flight -->
      <g transform="translate(4, 6) scale(0.65)">
        <!-- Back wing fold -->
        <polygon points="0,32 20,48 20,16" fill="#f59e0b"/>
        <!-- Main body flight triangle -->
        <polygon points="20,48 20,0 48,28" fill="#fbbf24"/>
        <!-- Wingtip fold -->
        <polygon points="20,28 40,28 48,28" fill="#d97706"/>
      </g>
      <!-- Official Enactus clean lowercase wordmark in currentColor -->
      <text x="42" y="32" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="25" letter-spacing="-0.03em" fill="currentColor">enactus</text>
    </svg>
  `,

  // Official Microsoft Power BI fluent icon + logotype
  powerbi: `
    <svg class="comp-logo-svg" viewBox="0 0 170 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Power BI Official Logo">
      <!-- Official Fluent 3-Bar Chart -->
      <g transform="translate(6, 6)">
        <rect x="0" y="16" width="7" height="18" rx="2" fill="#f3cd32"/>
        <rect x="10" y="8" width="7" height="26" rx="2" fill="#de9800"/>
        <rect x="20" y="0" width="7" height="34" rx="2" fill="#b25400"/>
      </g>
      <text x="42" y="27" font-family="'Segoe UI', 'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" letter-spacing="-0.01em" fill="currentColor">Power BI</text>
    </svg>
  `,

  // Official Viva Advertising logo directly from https://viva-advertising.com/
  vivaAdvertising: `
    <svg class="comp-logo-svg" viewBox="0 0 395 126" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Viva Advertising Official Logo">
      <!-- Authentic Viva Advertising Stylized Wordmark -->
      <path d="M 0 5.804 C 0 6.246, 8.235 21.658, 18.301 40.054 C 32.923 66.776, 37.044 73.564, 38.801 73.820 C 40.010 73.995, 41 73.879, 41 73.560 C 41 73.242, 32.627 57.686, 22.393 38.991 C 8.090 12.862, 3.348 5, 1.893 5 C 0.852 5, 0 5.362, 0 5.804 M 95.500 6.164 C 87.902 10.356, 84.787 17.536, 87.493 24.621 C 90.915 33.581, 99.393 37.029, 107.710 32.843 C 118.311 27.506, 118.893 13.173, 108.759 6.995 C 105.185 4.815, 98.683 4.408, 95.500 6.164 M 138 30.920 C 138 55.461, 138.129 57.333, 140.085 61.166 C 144.201 69.235, 151.809 73.941, 160.797 73.978 L 166.093 74 165.797 47.669 L 165.500 21.337 162.474 16.445 C 158.350 9.779, 151.713 5.752, 143.923 5.188 L 138 4.760 138 30.920 M 252.241 6.995 C 242.064 13.200, 242.658 28.218, 253.271 33.036 C 258.564 35.439, 260.436 35.439, 265.729 33.036 C 271.298 30.509, 273.991 26.041, 273.996 19.327 C 273.999 15.201, 273.469 13.523, 271.381 11.041 C 266.180 4.860, 258.430 3.221, 252.241 6.995 M 317.204 6.670 C 315.392 7.563, 313 9.465, 311.889 10.897 C 304.958 19.828, 289.197 41.530, 289.455 41.788 C 289.625 41.958, 290.839 41.828, 292.153 41.498 C 293.707 41.108, 297.482 36.895, 302.959 29.437 C 307.589 23.134, 311.720 18.320, 312.139 18.739 C 312.558 19.158, 319.370 31.200, 327.278 45.500 L 341.656 71.500 357.281 71.775 L 372.906 72.050 366.121 59.775 C 362.389 53.024, 355.146 39.850, 350.024 30.500 C 344.903 21.150, 339.540 12.207, 338.106 10.627 C 333.080 5.086, 323.933 3.354, 317.204 6.670 M 359.709 13.810 C 386.098 62.337, 392.675 73.963, 393.750 73.980 C 396.738 74.028, 393.984 67.916, 377.261 37.385 C 361.925 9.388, 359.210 5, 357.220 5 C 355.006 5, 355.100 5.336, 359.709 13.810 M 24 7.381 C 24 8.325, 55.494 64.838, 57.564 67.609 C 64.149 76.423, 79.529 76.114, 85.722 67.043 C 86.944 65.253, 92.231 58.051, 97.472 51.038 C 102.712 44.025, 107 38.060, 107 37.782 C 107 37.505, 105.905 37.487, 104.566 37.743 C 102.861 38.069, 99.645 41.610, 93.816 49.580 C 89.242 55.835, 85.241 60.964, 84.924 60.977 C 84.608 60.989, 77.642 48.850, 69.445 34 L 54.541 7 39.270 7 C 30.872 7, 24 7.172, 24 7.381 M 186.709 15.789 C 218.743 74.551, 217.682 73.060, 227.964 73.804 C 234.606 74.284, 239.836 72.321, 243.096 68.122 C 248.897 60.649, 265.824 37.490, 265.627 37.294 C 265.502 37.168, 264.235 37.389, 262.812 37.783 C 261.073 38.265, 257.556 42.108, 252.086 49.500 C 247.610 55.550, 243.622 60.607, 243.224 60.737 C 242.826 60.868, 235.818 48.830, 227.651 33.987 L 212.801 7 197.359 7 L 181.918 7 186.709 15.789 M 287.192 47.024 C 283.849 49.063, 280.044 55.703, 280.044 59.500 C 280.044 63.297, 283.849 69.937, 287.192 71.976 C 291.520 74.614, 298.458 74.628, 302.759 72.005 C 311.862 66.455, 312.438 54.754, 303.959 47.619 C 299.955 44.250, 292.195 43.974, 287.192 47.024 M 102.173 118.953 C 101.050 122.279, 100.566 125, 101.097 125 C 101.628 125, 102.322 124.325, 102.638 123.500 C 103.423 121.455, 106.680 121.605, 107.875 123.742 C 108.411 124.700, 109.107 125.226, 109.422 124.912 C 110.247 124.086, 106.551 113.684, 105.282 113.261 C 104.696 113.065, 103.297 115.627, 102.173 118.953 M 124 119 L 124 125 127 125 C 132.817 125, 136.176 118.279, 132.171 114.655 C 131.165 113.745, 128.915 113, 127.171 113 L 124 113 124 119 M 147.461 114.750 C 147.832 115.713, 148.648 118.412, 149.275 120.750 C 149.902 123.088, 150.955 125, 151.616 125 C 152.276 125, 153.739 122.269, 154.866 118.931 C 156.139 115.162, 156.482 113.006, 155.770 113.243 C 155.140 113.453, 153.965 115.606, 153.157 118.028 L 151.690 122.431 150.315 117.716 C 149.558 115.122, 148.455 113, 147.863 113 C 147.247 113, 147.075 113.749, 147.461 114.750 M 170 119 L 170 125 173.500 125 C 175.425 125, 177 124.550, 177 124 C 177 123.450, 175.875 123, 174.500 123 C 172.944 123, 172 122.433, 172 121.500 C 172 120.667, 172.889 120, 174 120 C 175.100 120, 176 119.550, 176 119 C 176 118.450, 175.100 118, 174 118 C 172.889 118, 172 117.333, 172 116.500 C 172 115.675, 172.873 115, 173.941 115 C 175.009 115, 176.160 114.550, 176.500 114 C 176.868 113.405, 175.677 113, 173.559 113 L 170 113 170 119 M 191 119 C 191 122.333, 191.444 125, 192 125 C 192.550 125, 193 124.100, 193 123 C 193 121.900, 193.645 121, 194.433 121 C 195.221 121, 196.151 121.900, 196.500 123 C 197.197 125.196, 199.009 125.743, 198.985 123.750 C 198.976 123.063, 198.568 121.865, 198.076 121.089 C 197.530 120.226, 197.609 118.997, 198.282 117.921 C 199.807 115.479, 197.588 113, 193.878 113 C 191.027 113, 191 113.057, 191 119 M 212 114 C 212 114.550, 212.675 115, 213.500 115 C 214.633 115, 215 116.222, 215 120 C 215 122.750, 215.450 125, 216 125 C 216.550 125, 217 122.750, 217 120 C 217 116.313, 217.378 115, 218.441 115 C 219.234 115, 220.160 114.550, 220.500 114 C 220.878 113.389, 219.344 113, 216.559 113 C 214.052 113, 212 113.450, 212 114 M 235 119 C 235 122.333, 235.444 125, 236 125 C 236.556 125, 237 122.333, 237 119 C 237 115.667, 236.556 113, 236 113 C 235.444 113, 235 115.667, 235 119 M 252.250 113.662 C 250.089 114.534, 250.870 117.984, 253.500 119.182 C 254.875 119.808, 256 120.924, 256 121.661 C 256 122.423, 254.922 123, 253.500 123 C 252.125 123, 251 123.450, 251 124 C 251 125.112, 253.980 125.329, 256.418 124.393 C 258.809 123.475, 258.315 120.252, 255.500 118.408 C 252.487 116.434, 252.276 115, 255 115 C 256.100 115, 257 114.550, 257 114 C 257 112.964, 254.433 112.782, 252.250 113.662 M 273 119 C 273 122.333, 273.444 125, 274 125 C 274.556 125, 275 122.333, 275 119 C 275 115.667, 274.556 113, 274 113 C 273.444 113, 273 115.667, 273 119 M 289 119 C 289 122.333, 289.444 125, 290 125 C 290.550 125, 291.018 123.088, 291.039 120.750 L 291.078 116.500 293.641 120.750 C 295.050 123.088, 296.607 125, 297.102 125 C 297.596 125, 298 122.300, 298 119 C 298 115.667, 297.556 113, 297 113 C 296.450 113, 295.980 114.688, 295.956 116.750 L 295.911 120.500 293.706 116.760 C 290.431 111.207, 289 111.888, 289 119 M 314 115 C 309.859 119.141, 312.689 125, 318.829 125 C 321.686 125, 322 124.703, 322 122 C 322 119.576, 321.578 119, 319.800 119 C 318.089 119, 317.867 119.267, 318.800 120.200 C 320.661 122.061, 320.231 123, 317.519 123 C 315.703 123, 314.869 122.326, 314.407 120.487 C 313.581 117.195, 315.491 115, 319.181 115 C 320.885 115, 321.858 114.580, 321.500 114 C 320.456 112.311, 316.110 112.890, 314 115 M 126 119 C 126 122.570, 126.261 123, 128.433 123 C 129.987 123, 131.094 122.278, 131.500 121 C 132.538 117.730, 131.142 115, 128.433 115 C 126.261 115, 126 115.430, 126 119 M 193 117.073 C 193 118.504, 193.539 119.043, 194.739 118.812 C 197.345 118.310, 197.636 115, 195.073 115 C 193.642 115, 193 115.642, 193 117.073 M 104 118.500 C 104 119.325, 104.450 120, 105 120 C 105.550 120, 106 119.325, 106 118.500 C 106 117.675, 105.550 117, 105 117 C 104.450 117, 104 117.675, 104 118.500" fill="currentColor" fill-rule="evenodd"/>
    </svg>
  `,

  // Official Link Puerto Rico logo directly from https://linkpuertorico.org/
  // ALL BLUE (#00aeef) across the 3D isometric emblem, LINK wordmark, and PUERTO RICO sub-wordmark
  linkPR: `
    <svg class="comp-logo-svg" viewBox="0 0 1300 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Link Puerto Rico Official Logo">
      <!-- Authentic Cyan/Blue 3D Isometric Hexagon Emblem -->
      <path d="M 138.820 40.363 C 97.196 62.453, 62.920 80.747, 62.650 81.016 C 62.172 81.495, 123.012 119.300, 126.277 120.553 C 127.310 120.949, 134.749 117.657, 146.212 111.731 C 156.270 106.531, 175.975 96.388, 190 89.189 L 215.500 76.102 226 81.895 C 231.775 85.081, 248.650 94.209, 263.500 102.179 C 278.350 110.149, 303.648 123.749, 319.719 132.401 L 348.937 148.133 384.429 129.317 C 403.950 118.967, 419.923 110.275, 419.925 110 C 419.929 109.450, 215.679 -0.061, 214.951 0.100 C 214.703 0.155, 180.444 18.274, 138.820 40.363 M -0 241.671 L -0 361.509 72.750 401.966 C 112.763 424.217, 146.963 443.272, 148.750 444.310 L 152 446.198 151.988 405.849 L 151.976 365.500 136.738 357.238 C 115.069 345.490, 80.262 326.337, 75.250 323.403 L 71 320.916 71 241.646 L 71 162.375 36.414 142.438 C 17.392 131.472, 1.417 122.350, 0.914 122.167 C 0.365 121.967, -0 169.730, -0 241.671 M 172.741 167.634 L 131.981 188.170 132.241 237.140 L 132.500 286.110 173.500 308.052 C 196.050 320.121, 214.950 329.987, 215.500 329.978 C 216.050 329.969, 234.050 320.131, 255.500 308.115 L 294.500 286.267 294.759 237.263 L 295.019 188.259 256.350 167.960 C 235.083 156.796, 216.741 147.535, 215.591 147.380 C 214.419 147.222, 195.587 156.123, 172.741 167.634 M 392.500 204.751 L 360.500 223.500 360 273.481 L 359.500 323.461 326 342.176 C 307.575 352.470, 277.313 369.342, 258.750 379.670 L 225 398.448 225 435.654 L 225 472.859 233.331 468.180 C 237.913 465.606, 282.913 440.109, 333.331 411.521 L 425 359.541 425 272.771 C 425 225.047, 424.887 186.001, 424.750 186.001 C 424.613 186.002, 410.100 194.440, 392.500 204.751" fill="#00aeef" fill-rule="evenodd"/>
      <!-- Authentic Bold Geometric LINK Wordmark — ALL BLUE -->
      <path d="M 543 236.483 L 543 359 617 359 L 691 359 691 334.500 L 691 310 642.005 310 L 593.010 310 592.755 212.250 L 592.500 114.500 567.750 114.233 L 543 113.965 543 236.483 M 743 236.500 L 743 359 767.500 359 L 792 359 792 236.500 L 792 114 767.500 114 L 743 114 743 236.500 M 854 235 L 854 360 878.493 360 L 902.986 360 903.243 291.946 L 903.500 223.891 974 291.057 C 1012.775 327.998, 1045.963 359.610, 1047.750 361.307 L 1051 364.392 1051 239.196 L 1051 114 1026.007 114 L 1001.014 114 1000.757 181.437 L 1000.500 248.874 927.610 179.437 C 887.520 141.247, 854.558 110, 854.360 110 C 854.162 110, 854 166.250, 854 235 M 1112 236.500 L 1112 359 1136.491 359 L 1160.982 359 1161.241 307.938 L 1161.500 256.875 1197 307.925 L 1232.500 358.975 1262.309 358.988 C 1285.881 358.997, 1291.966 358.738, 1291.390 357.750 C 1290.989 357.063, 1272.511 330.544, 1250.326 298.820 C 1228.142 267.097, 1209.720 240.435, 1209.389 239.572 C 1209.010 238.584, 1221.753 215.712, 1243.833 177.752 C 1263.108 144.613, 1279.182 116.705, 1279.552 115.734 C 1280.188 114.069, 1278.627 113.984, 1252.012 114.234 L 1223.797 114.500 1192.649 168.272 L 1161.500 222.044 1161.241 168.022 L 1160.983 114 1136.491 114 L 1112 114 1112 236.500" fill="#00aeef" fill-rule="evenodd"/>
      <!-- Official Sub-wordmark PUERTO RICO — ALL BLUE -->
      <text x="548" y="440" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="74" letter-spacing="0.28em" fill="#00aeef">PUERTO RICO</text>
    </svg>
  `,

  // Official ATH Móvil (Evertec) Logo
  athMovil: `
    <svg class="comp-logo-svg" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ATH Móvil Official Logo">
      <rect x="2" y="4" width="40" height="40" rx="10" fill="#ff671b"/>
      <path d="M 12,24 L 22,34 L 32,14" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="52" y="27" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="18" letter-spacing="-0.02em" fill="#ff671b">ATH</text>
      <text x="96" y="27" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="18" letter-spacing="-0.02em" fill="#0072ce">MÓVIL</text>
      <text x="53" y="40" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="8.5" letter-spacing="0.18em" fill="currentColor" opacity="0.7">BUSINESS</text>
    </svg>
  `,

  // Official Databricks Lakehouse Platform Logo
  databricks: `
    <svg class="comp-logo-svg" viewBox="0 0 210 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Databricks Official Logo">
      <g transform="translate(6, 6) scale(0.38)">
        <!-- Databricks 4-layer stacked isometric diamonds in signature red-orange -->
        <polygon points="45,0 90,26 45,52 0,26" fill="#FF3621"/>
        <polygon points="45,18 90,44 45,70 0,44" fill="#FF5A43"/>
        <polygon points="45,36 90,62 45,88 0,62" fill="#FF7865"/>
        <polygon points="45,54 90,80 45,106 0,80" fill="#FF9A8B"/>
      </g>
      <text x="52" y="28" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="17" letter-spacing="-0.02em" fill="currentColor">databricks</text>
    </svg>
  `,

  // Official Anthropic Claude AI Logo (Workflows Deployed at Money Group)
  claude: `
    <svg class="comp-logo-svg" viewBox="0 0 190 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Anthropic Claude AI Official Logo">
      <!-- Signature Terracotta Spark Icon -->
      <g transform="translate(6, 7) scale(0.68)">
        <polygon points="22,0 26,14 40,16 28,24 33,38 20,30 9,40 12,25 0,18 15,14" fill="#d97757"/>
      </g>
      <text x="44" y="27" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="16" letter-spacing="-0.01em" fill="currentColor">Claude</text>
      <text x="110" y="27" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="600" font-size="11" letter-spacing="0.08em" fill="#d97757">AI</text>
    </svg>
  `,

  // Official Boys & Girls Clubs de Puerto Rico Logo (Partner in Hackea PR & Liza Project)
  boysAndGirlsClubs: `
    <svg class="comp-logo-svg" viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Boys & Girls Clubs Official Logo">
      <!-- Official Clasping Hands in Signature Azure Blue -->
      <g transform="translate(4, 5) scale(0.40)">
        <circle cx="50" cy="50" r="48" fill="#005a9c"/>
        <path d="M 30,55 C 30,45 42,32 52,42 C 60,34 72,45 72,55 C 72,68 51,80 51,80 C 51,80 30,68 30,55 Z" fill="#ffffff"/>
      </g>
      <text x="54" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="800" font-size="12" letter-spacing="0.04em" fill="#005a9c">BOYS &amp; GIRLS CLUBS</text>
      <text x="54" y="38" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="10.5" letter-spacing="0.12em" fill="currentColor">DE PUERTO RICO</text>
    </svg>
  `,

  // Novu Works — Fabián's Studio / Enterprise Software Lab
  novuWorks: `
    <svg class="comp-logo-svg" viewBox="0 0 170 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Novu Works Brand Logo">
      <defs>
        <linearGradient id="nwGradBrand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e0566a"/>
          <stop offset="50%" stop-color="#8b52c8"/>
          <stop offset="100%" stop-color="#3d63e6"/>
        </linearGradient>
      </defs>
      <!-- Stylized Monogram N-W Prism -->
      <g transform="translate(6, 7)">
        <polygon points="14,0 28,8 28,24 14,32 0,24 0,8" fill="none" stroke="url(#nwGradBrand)" stroke-width="2.2"/>
        <path d="M 6,22 V 10 L 14,20 V 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 16,10 L 18,21 L 20,14 L 22,21 L 24,10" stroke="url(#nwGradBrand)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Wordmark -->
      <text x="44" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="14" letter-spacing="0.06em" fill="currentColor">NOVU</text>
      <text x="94" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="14" letter-spacing="0.06em" fill="#d4af37">WORKS</text>
      <text x="45" y="34" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="600" font-size="8" letter-spacing="0.28em" fill="currentColor" opacity="0.6">STUDIO • LAB</text>
    </svg>
  `,

  // Sol de Jayuya — Indigenous Taíno Cultural Heritage Mark
  tainoSun: `
    <svg class="comp-logo-svg taino-sun-svg" viewBox="0 0 170 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sol de Jayuya Heritage Logo">
      <g transform="translate(18, 22) scale(0.28)">
        <path d="M 20.0 0.0 Q 33.8 9.1 17.3 10.0 Q 24.7 24.7 10.0 17.3 Q 9.1 33.8 0.0 20.0 Q -9.1 33.8 -10.0 17.3 Q -24.7 24.7 -17.3 10.0 Q -33.8 9.1 -20.0 0.0 Q -33.8 -9.1 -17.3 -10.0 Q -24.7 -24.7 -10.0 -17.3 Q -9.1 -33.8 0.0 -20.0 Q 9.1 -33.8 10.0 -17.3 Q 24.7 -24.7 17.3 -10.0 Q 33.8 -9.1 20.0 0.0 Z" stroke="#d4af37" stroke-width="2.5" fill="none"/>
        <circle cx="0" cy="0" r="11" stroke="#d4af37" stroke-width="2.2" fill="none"/>
        <circle cx="-4" cy="-3" r="1.8" fill="#d4af37"/>
        <circle cx="4" cy="-3" r="1.8" fill="#d4af37"/>
        <path d="M -4 4 Q 0 8 4 4" stroke="#d4af37" stroke-width="2" fill="none"/>
      </g>
      <text x="44" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="12" letter-spacing="0.08em" fill="currentColor">PUERTO RICO</text>
      <text x="44" y="34" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="600" font-size="8.5" letter-spacing="0.22em" fill="#d4af37">SAN JUAN, PR</text>
    </svg>
  `
};
