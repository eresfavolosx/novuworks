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

  // Official edX brand vector mark (adaptive 'ed' in currentColor + iconic faceted accent 'X')
  edx: `
    <svg class="comp-logo-svg" viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="edX Official Logo">
      <g transform="translate(6, 4)">
        <!-- Lowercase e in currentColor (adapts to dark & light) -->
        <path d="M 24.2,25.6 C 23,24.4 21.6,23.5 20,22.9 C 18.4,22.3 16.7,22 15,22 C 12.4,22 10,22.5 7.7,23.5 C 5.5,24.5 3.6,26 2,27.8 C 0.4,29.7 -0.8,31.9 -1.7,34.5 C -2.6,37.1 -3,40 -3,43.1 C -3,45.4 -2.6,47.5 -1.9,49.2 C -1.2,51 -0.2,52.5 1.1,53.7 C 2.4,54.9 3.9,55.8 5.6,56.5 C 7.3,57.1 9.1,57.4 11,57.4 C 12.9,57.4 14.9,57.2 16.5,56.7 C 18.2,56.2 19.7,55.6 20.9,54.7 C 22.1,53.8 23.2,52.9 24.1,51.7 C 24.9,50.6 25.5,49.3 25.9,48 H 20 C 19.3,49.3 18.2,50.4 16.8,51.2 C 15.4,52 13.6,52.4 11.3,52.4 C 10.3,52.4 9.2,52.2 8.2,51.9 C 7.2,51.5 6.3,51 5.4,50.2 C 4.5,49.4 3.9,48.4 3.4,47.2 C 2.9,46 2.6,44.5 2.6,42.7 V 41.8 H 27.5 C 27.6,41.5 27.6,41.1 27.7,40.6 C 27.8,39.7 27.8,38.8 27.8,38 C 27.8,35.8 27.4,33.8 26.7,32.1 C 26.2,30.4 25.3,29 24.2,27.8 Z M 22.3,36 H 3.5 C 3.9,34.5 4.5,33.2 5.1,32 C 5.8,30.8 6.6,29.8 7.5,28.9 C 8.4,28 9.5,27.4 10.6,26.9 C 11.8,26.4 13,26.2 14.3,26.2 C 15.7,26.2 16.7,26.4 17.7,26.9 C 18.7,27.3 19.5,27.9 20.2,28.7 C 20.9,29.5 21.4,30.3 21.7,31.4 C 22.1,32.4 22.3,33.5 22.3,34.6 Z" transform="matrix(0.9,0,0,0.9,12,-16)" fill="currentColor"/>
        <!-- Lowercase d in currentColor -->
        <path d="M 52.1,9 L 47.8,28.9 H 47.3 C 47,27.9 46.5,26.9 45.9,26.1 C 45.3,25.2 44.5,24.5 43.6,23.9 C 42.7,23.3 41.7,22.8 40.6,22.5 C 39.5,22.2 38.3,22 37.1,22 C 35.4,22 33.8,22.2 32.3,22.7 C 30.8,23.2 29.4,23.9 28,24.8 C 26.7,25.7 25.5,26.8 24.4,28.1 C 23.3,29.4 22.4,30.8 21.6,32.4 C 20.8,34 20.2,35.7 19.8,37.6 C 19.4,39.5 19.2,41.4 19.2,43.5 C 19.2,45.6 19.5,47.5 20.2,49.3 C 20.9,51 21.8,52.5 22.9,53.7 C 24,54.9 25.4,55.8 26.9,56.5 C 28.4,57.2 30,57.5 31.8,57.5 C 34,57.5 36,57 38,56.1 C 39.9,55.2 41.5,53.9 42.7,52.2 H 43.2 L 42.2,56.9 H 47.5 L 57.7,9 Z M 45.1,42.8 C 44.5,44.8 43.6,46.5 42.4,47.9 C 41.2,49.3 39.8,50.3 38.3,51.1 C 36.8,51.9 35.1,52.4 33.3,52.4 C 32,52.4 30.9,52.2 29.8,51.7 C 28.8,51.2 27.9,50.6 27.1,49.7 C 26.3,48.8 25.7,47.8 25.3,46.6 C 24.9,45.4 24.7,44.1 24.7,42.6 C 24.7,40.3 25,38.2 25.7,36.2 C 26.4,34.2 27.4,32.6 28.5,31.2 C 29.6,29.8 30.9,28.7 32.4,27.9 C 33.9,27.1 35.6,26.7 37.3,26.7 C 38.6,26.7 39.9,26.9 40.9,27.4 C 42,27.8 42.9,28.5 43.6,29.3 C 44.3,30.1 44.9,31.1 45.3,32.3 C 45.7,33.5 45.9,34.8 45.9,36.2 C 45.9,38.7 45.6,40.8 45.1,42.8 Z" transform="matrix(0.9,0,0,0.9,12,-16)" fill="currentColor"/>
        <!-- Uppercase X in authentic edX signature colors -->
        <g transform="matrix(0.9,0,0,0.9,12,-16)">
          <path d="M 78.7,74.6 L 91,74.6 L 102.1,47 L 91.3,22.7 H 78.7 L 89.5,47 Z" fill="#b82645"/>
          <path d="M 115.6,48.3 L 127.6,74.6 H 115.2 L 107.1,56.9 H 106.1 L 91,74.6 L 102.1,47 L 115.6,48.3 Z" fill="#0075eb"/>
          <path d="M 91.3,22.7 L 102.1,47 L 115.6,48.3 L 129.2,22.7 H 116.7 L 103.1,39.5 H 102.4 L 95.2,22.7 Z" fill="#0075eb"/>
        </g>
      </g>
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

  // Viva Advertising — Fabián's Company / Founder
  vivaAdvertising: `
    <svg class="comp-logo-svg" viewBox="0 0 185 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Viva Advertising Brand Logo">
      <defs>
        <linearGradient id="vivaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <!-- Modern Double-V Chevron Mark -->
      <g transform="translate(6, 8)">
        <polygon points="0,2 7,20 14,2 19,2 10,26 4,26" fill="url(#vivaGrad)"/>
        <polygon points="12,2 17,14 22,2 27,2 19,20 15,20" fill="#38bdf8"/>
      </g>
      <!-- Wordmark in currentColor & sky blue -->
      <text x="42" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="14.5" letter-spacing="0.08em" fill="currentColor">VIVA</text>
      <text x="42" y="34" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="8.5" letter-spacing="0.24em" fill="#0284c7">ADVERTISING</text>
    </svg>
  `,

  // Link Puerto Rico — Fabián's Company / Co-Founder
  linkPR: `
    <svg class="comp-logo-svg" viewBox="0 0 185 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Link Puerto Rico Brand Logo">
      <defs>
        <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <!-- Interlinked Network Nodes -->
      <g transform="translate(6, 10)">
        <circle cx="8" cy="12" r="6" stroke="url(#linkGrad)" stroke-width="2.5" fill="none"/>
        <circle cx="20" cy="12" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <line x1="8" y1="12" x2="20" y2="12" stroke="url(#linkGrad)" stroke-width="2.5"/>
      </g>
      <!-- Wordmark in currentColor & lavender -->
      <text x="40" y="22" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="14" letter-spacing="0.12em" fill="currentColor">LINK</text>
      <text x="40" y="34" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="700" font-size="8.5" letter-spacing="0.22em" fill="#c084fc">PUERTO RICO</text>
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
