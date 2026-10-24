// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Video Game Easter Egg
//  "CYBER GROWTH RACER: 88 MPH DeLorean Time Machine"
//  Authentic 3D Procedural DeLorean DMC-12 Time Machine from
//  "Back to the Future" featuring 88 MPH temporal displacement,
//  twin flaming tire tracks, pulsing Y-flux capacitor, Mr. Fusion,
//  dual turbine exhaust vents, endless procedural object recycling,
//  invulnerability grace frames, and Web Audio synthesizer engine.
// ─────────────────────────────────────────────────────────────

import * as THREE from 'three';
import { audio } from './audio.js';

export class CyberArcadeGame {
  constructor(containerEl, onCloseCallback = null) {
    this.container = containerEl;
    this.onClose = onCloseCallback;
    this.isRunning = false;
    this.animationId = null;

    // Game state
    this.score = 0;
    this.speed = 50; // Start at comfortable cruise
    this.targetSpeed = 75;
    this.maxSpeed = 135; // Can exceed 88 MPH into hyper-pacing
    this.carX = 0;
    this.targetCarX = 0;
    this.distance = 0;
    this.bonusPacing = 0; // 0 to 122%
    this.lives = 4; // 4 Chrono Shields for balanced, enjoyable gameplay
    this.invulnerableTimer = 0; // i-frames (grace period) after collision
    this.timelineEra = 1;
    this.scoreMultiplier = 1.0;
    this.passedGates = new Set();
    this.hasTriggered88Mph = false;

    // Input state
    this.keys = { left: false, right: false, boost: false, brake: false };

    // Deep link or testing param for 88 MPH boost
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    if (urlParams && urlParams.get('boost') === '1') {
      this.speed = 92.0;
      this.targetSpeed = 95.0;
      this.keys.boost = true;
      this.hasTriggered88Mph = true;
    }

    // Milestone career gates (Loop into endless timeline eras)
    this.checkpoints = [
      { id: 'mg', z: -900, name: 'Money Group (Full-Time)', metric: '122% Bonus Target Delivered ($1B+ Portfolio Scope)' },
      { id: 'rv', z: -2100, name: 'Red Ventures / edX (Full-Time)', metric: '40M+ Databricks SQL Sessions Normalized & Scaled' },
      { id: 'va', z: -3400, name: 'Viva Advertising (My Company / Founder)', metric: '$10M+ B2B Revenue Pipeline & -83% Churn Reduction' },
      { id: 'lp', z: -4800, name: 'Link Puerto Rico (My Company / Co-Founder)', metric: '100+ Relational Databases & Disaster Ops Restored' },
      { id: 'st', z: -6200, name: 'Stanford University', metric: 'Stanford Innovation Fellows Graduate Honor' },
      { id: 'up', z: -7600, name: 'Univ. Politécnica PR', metric: 'B.S. Computer Engineering (Summa Cum Laude 4.0 GPA)' },
    ];

    this.collectibles = [];
    this.obstacles = [];
    this.gateMeshes = [];

    // Synthesizer Audio State
    this.engineGain = null;
    this.engineOsc = null;

    this.renderHtml();
    this.bindEvents(); // Bind buttons & Escape key immediately after DOM injection
    try {
      this.initThree();
    } catch (e) {
      console.warn('CyberArcade 3D init caught:', e);
    }
    try {
      this.initAudioEngine();
    } catch (e) {
      console.warn('CyberArcade audio init caught:', e);
    }
    this.start();
  }

  renderHtml() {
    this.container.innerHTML = `
      <div class="arcade-overlay">
        <!-- Retro Arcade HUD Header -->
        <header class="arcade-hud-header">
          <div class="arcade-title-group">
            <span class="arcade-tag">⚡ 1.21 GIGAWATTS · TIME DISPLACEMENT ACTIVE</span>
            <h2 class="arcade-title">CYBER GROWTH RACER: 88 MPH DELOREAN</h2>
          </div>

          <!-- Doc Brown's 3-Color Time Circuit Readout -->
          <div class="time-circuits-banner" id="arc-time-circuits">
            <div class="tc-display red">
              <span class="tc-label">DESTINATION</span>
              <span class="tc-val">122% BONUS</span>
            </div>
            <div class="tc-display green">
              <span class="tc-label">PRESENT</span>
              <span class="tc-val" id="tc-era-val">ERA 1 · TOP 1%</span>
            </div>
            <div class="tc-display amber" id="tc-status-box">
              <span class="tc-label">TIME CIRCUITS</span>
              <span class="tc-val" id="tc-status-val">STANDBY</span>
            </div>
          </div>

          <!-- Live Score & Telemetry Meters -->
          <div class="arcade-stats-row">
            <div class="arcade-stat-box bttf-speed-box" id="hud-speed-box">
              <span class="as-label">SPEEDOMETER</span>
              <span class="as-value text-speed" id="arc-speed">50.0 MPH</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">PIPELINE ATTRIBUTED</span>
              <span class="as-value text-gold" id="arc-score">$000,000</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">BONUS PACING</span>
              <span class="as-value" style="color: #4ade80;" id="arc-pacing">122% ROAS</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">CHRONO SHIELDS</span>
              <span class="as-value" id="arc-lives" style="color: #38bdf8;">♥♥♥♥</span>
            </div>
          </div>

          <button type="button" class="arcade-exit-btn" id="btn-exit-arcade" title="Exit to Portfolio (Esc)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Exit Arcade</span>
          </button>
        </header>

        <!-- 3D WebGL Canvas Layer -->
        <div class="arcade-canvas-wrap" id="arcade-3d-mount"></div>

        <!-- 88 MPH Flash Screen Effect -->
        <div class="time-displacement-flash hidden" id="arc-time-flash"></div>

        <!-- Checkpoint Toast Banner -->
        <div class="arcade-checkpoint-toast" id="arc-checkpoint-toast">
          <div class="cp-title" id="cp-toast-title">GATE REACHED</div>
          <div class="cp-desc" id="cp-toast-desc">Milestone Passed</div>
        </div>

        <!-- Controls Guide & On-Screen Touch Controls -->
        <footer class="arcade-controls-footer">
          <div class="arcade-key-hints">
            <span><strong>[A / ◄]</strong> Steer Left</span>
            <span><strong>[D / ►]</strong> Steer Right</span>
            <span><strong>[W / ▲ / SPACE]</strong> Accelerate to 88 MPH ⚡</span>
            <span><strong>[S / ▼]</strong> Regenerative Brake</span>
          </div>

          <!-- On-screen pedals for mobile touch devices -->
          <div class="arcade-touch-pedals">
            <button type="button" class="touch-btn" id="btn-touch-left">◄ STEER L</button>
            <button type="button" class="touch-btn boost-btn" id="btn-touch-boost">⚡ 88 MPH BOOST</button>
            <button type="button" class="touch-btn" id="btn-touch-right">STEER R ►</button>
          </div>
        </footer>

        <!-- Game Over Modal -->
        <div class="arcade-modal-backdrop hidden" id="arc-end-modal">
          <div class="arcade-modal-card">
            <span class="am-kicker">TEMPORAL MISSION DEBRIEF</span>
            <h3 class="am-title" id="am-verdict-title">GREAT SCOTT! 122% BONUS TARGET DELIVERED!</h3>
            <p class="am-sub" id="am-verdict-sub">
              You pushed the DeLorean past 88 MPH, generated 1.21 Gigawatts of attribution lift, and navigated Fabián's career milestones.
            </p>

            <div class="am-score-grid">
              <div class="am-score-cell">
                <span class="am-key">TOTAL PIPELINE ATTRIBUTED</span>
                <span class="am-val text-gold" id="am-final-score">$0</span>
              </div>
              <div class="am-score-cell">
                <span class="am-key">CANDIDATE CLASSIFICATION</span>
                <span class="am-val" style="color: #38bdf8;">Elite 1% AI & Growth Engineer</span>
              </div>
            </div>

            <p class="am-cta-note">
              Fabián engineered this entire Back to the Future DeLorean 3D simulation, physical shaders, procedural audio synth, and game loop. Ready to hire a visionary who builds the impossible?
            </p>

            <div class="am-actions-row">
              <button type="button" class="luxury-btn primary-gold" id="btn-arc-play-again">
                <span>Engage Time Circuits Again</span>
              </button>
              <a href="mailto:fabianvvicente1@gmail.com?subject=Strategic%20Role%20Inquiry%20-%20From%20DeLorean%20Easter%20Egg" class="luxury-btn outline-platinum">
                <span>Hire Fabián / Interview</span>
              </a>
              <button type="button" class="luxury-btn subtle-ghost" id="btn-arc-exit-portfolio">
                <span>Return to Executive Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initThree() {
    const mount = this.container.querySelector('#arcade-3d-mount');
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060610, 0.0032);

    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    this.camera.position.set(0, 2.6, 6.8);
    this.camera.lookAt(0, 1.0, -18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x05040d);
    mount.appendChild(this.renderer.domElement);

    // Ambient & Directional Lighting
    const hemi = new THREE.HemisphereLight(0x93c5fd, 0x1e1533, 1.1);
    this.scene.add(hemi);

    const sunLight = new THREE.DirectionalLight(0xff5533, 1.6);
    sunLight.position.set(0, 30, -120);
    this.scene.add(sunLight);

    // Key Metallic Highlight Light for Brushed Stainless Steel Panels
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(8, 22, 14);
    this.scene.add(keyLight);

    // Cool Electric Cyan Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-8, 14, -8);
    this.scene.add(rimLight);

    // Retro Synthwave Sun at Horizon
    const sunGeom = new THREE.CircleGeometry(48, 36);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, fog: false });
    this.sun = new THREE.Mesh(sunGeom, sunMat);
    this.sun.position.set(0, 22, -300);
    this.scene.add(this.sun);

    // 2. High-Speed Asphalt Highway with Continuous Procedural Scrolling
    const roadWidth = 14;
    const roadLength = 850;
    const roadCanvas = document.createElement('canvas');
    roadCanvas.width = 128;
    roadCanvas.height = 256;
    const rCtx = roadCanvas.getContext('2d');
    rCtx.fillStyle = '#0a0a14';
    rCtx.fillRect(0, 0, 128, 256);
    // Subtle asphalt noise
    rCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 0; y < 256; y += 16) {
      rCtx.fillRect(0, y, 128, 1);
    }
    // High-contrast dashed amber/gold center stripe
    rCtx.fillStyle = '#f59e0b';
    for (let y = 0; y < 256; y += 64) {
      rCtx.fillRect(62, y + 14, 4, 36);
    }
    // Outer neon cyan highway edge rails
    rCtx.fillStyle = '#38bdf8';
    rCtx.fillRect(4, 0, 3, 256);
    rCtx.fillRect(121, 0, 3, 256);

    this.roadTex = new THREE.CanvasTexture(roadCanvas);
    this.roadTex.wrapS = THREE.RepeatWrapping;
    this.roadTex.wrapT = THREE.RepeatWrapping;
    this.roadTex.repeat.set(1, 52);

    const roadGeom = new THREE.PlaneGeometry(roadWidth, roadLength);
    // Translate geometry so it spans from +80 behind car to -770 ahead into horizon
    roadGeom.translate(0, 345, 0);
    roadGeom.rotateX(-Math.PI / 2);

    const roadMat = new THREE.MeshStandardMaterial({
      map: this.roadTex,
      roughness: 0.8,
      metalness: 0.1,
    });
    this.road = new THREE.Mesh(roadGeom, roadMat);
    this.road.position.set(0, 0, 0);
    this.scene.add(this.road);

    // Glowing 3D Neon Highway Guardrails
    const railGeom = new THREE.BufferGeometry();
    const railPts = [
      -roadWidth / 2, 0.12, 80, -roadWidth / 2, 0.12, -770,
      roadWidth / 2, 0.12, 80, roadWidth / 2, 0.12, -770,
    ];
    railGeom.setAttribute('position', new THREE.Float32BufferAttribute(railPts, 3));
    const railMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.9 });
    this.rails = new THREE.LineSegments(railGeom, railMat);
    this.rails.position.set(0, 0, 0);
    this.scene.add(this.rails);

    // 3. Build Procedural Back to the Future DeLorean DMC-12 Time Machine
    this.car = this.buildDeLoreanMesh();
    this.car.position.set(0, 0, 0);
    this.scene.add(this.car);

    // 4. Background Starfield / Speed Streaks
    const starCount = 650;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 320;
      starPositions[i + 1] = Math.random() * 95 + 1;
      starPositions[i + 2] = -Math.random() * 350;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.3, transparent: true, opacity: 0.7 });
    this.stars = new THREE.Points(starGeom, starMat);
    this.scene.add(this.stars);

    // 5. Milestone Checkpoint Gates
    this.buildCheckpointGates();

    // 6. Spawn Collectibles and Obstacles (Continuous Streaming Pool)
    this.spawnEntities();
  }

  buildDeLoreanMesh() {
    const carGroup = new THREE.Group();

    // ── Authentic Materials ──────────────────────────────────
    const stainlessMat = new THREE.MeshStandardMaterial({
      color: 0xc4c8d0,
      metalness: 0.92,
      roughness: 0.26,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x1f242d,
      metalness: 0.5,
      roughness: 0.7,
    });

    const bumperMat = new THREE.MeshStandardMaterial({
      color: 0x111215,
      metalness: 0.15,
      roughness: 0.9,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    const fluxMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffaea });
    const amberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const tailRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const mrFusionMat = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      metalness: 0.2,
      roughness: 0.3,
    });

    const ventMat = new THREE.MeshStandardMaterial({
      color: 0x16161c,
      metalness: 0.7,
      roughness: 0.35,
    });

    const ventInteriorMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });

    const tireRubberMat = new THREE.MeshStandardMaterial({
      color: 0x151518,
      metalness: 0.05,
      roughness: 0.92,
    });

    const alloyRimMat = new THREE.MeshStandardMaterial({
      color: 0xdde2ea,
      metalness: 0.95,
      roughness: 0.18,
    });

    // ── 1. Soft Drop Shadow Beneath Chassis ──────────────────
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(32, 64, 4, 32, 64, 32);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 64, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 5.0), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, 0.02, 0);
    carGroup.add(shadowMesh);

    // ── 2. Lower Chassis Floor Pan ───────────────────────────
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.1, 4.3), bumperMat);
    chassis.position.set(0, 0.15, 0);
    carGroup.add(chassis);

    // ── 3. Main Stainless Steel Monocoque Body ───────────────
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.26, 2.0), stainlessMat);
    mainBody.position.set(0, 0.34, 0);
    carGroup.add(mainBody);

    // Sloped Front Hood
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.16, 1.7), stainlessMat);
    hood.position.set(0, 0.38, -1.25);
    hood.rotation.x = 0.07;
    carGroup.add(hood);

    // Low Front Nose Fascia
    const nose = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.14, 0.4), stainlessMat);
    nose.position.set(0, 0.32, -2.12);
    carGroup.add(nose);

    // Black Front Bumper / Chin Spoiler
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.14, 0.28), bumperMat);
    frontBumper.position.set(0, 0.24, -2.26);
    carGroup.add(frontBumper);

    // Front Grille Insert & DMC Badge
    const grille = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.1, 0.06), bumperMat);
    grille.position.set(0, 0.34, -2.32);
    const dmcBadge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.02), alloyRimMat);
    dmcBadge.position.set(0, 0.34, -2.36);
    carGroup.add(grille, dmcBadge);

    // Quad Rectangular Sealed-Beam Headlights
    const hlL1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.04), headlightMat);
    hlL1.position.set(-0.42, 0.34, -2.34);
    const hlL2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.04), headlightMat);
    hlL2.position.set(-0.66, 0.34, -2.34);

    const hlR1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.04), headlightMat);
    hlR1.position.set(0.42, 0.34, -2.34);
    const hlR2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.04), headlightMat);
    hlR2.position.set(0.66, 0.34, -2.34);
    carGroup.add(hlL1, hlL2, hlR1, hlR2);

    // Amber Turn Indicators
    const ambL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.18), amberMat);
    ambL.position.set(-0.84, 0.33, -2.18);
    const ambR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.18), amberMat);
    ambR.position.set(0.84, 0.33, -2.18);
    carGroup.add(ambL, ambR);

    // Distinctive Hood Crease Grooves
    const creaseL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 1.4), trimMat);
    creaseL.position.set(-0.35, 0.47, -1.25);
    creaseL.rotation.x = 0.07;
    const creaseR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 1.4), trimMat);
    creaseR.position.set(0.35, 0.47, -1.25);
    creaseR.rotation.x = 0.07;
    carGroup.add(creaseL, creaseR);

    // ── 4. Cabin Greenhouse & Gullwing Roof ──────────────────
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.62, 0.06), glassMat);
    windshield.position.set(0, 0.72, -0.42);
    windshield.rotation.x = 0.82;
    carGroup.add(windshield);

    const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.66, 0.06), trimMat);
    pillarL.position.set(-0.72, 0.72, -0.42);
    pillarL.rotation.x = 0.82;
    const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.66, 0.06), trimMat);
    pillarR.position.set(0.72, 0.72, -0.42);
    pillarR.rotation.x = 0.82;
    carGroup.add(pillarL, pillarR);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.06, 0.95), stainlessMat);
    roof.position.set(0, 0.98, 0.22);
    const tBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.98), trimMat);
    tBar.position.set(0, 0.99, 0.22);
    carGroup.add(roof, tBar);

    const sideWinL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.92), glassMat);
    sideWinL.position.set(-0.68, 0.78, 0.22);
    const sideWinR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.92), glassMat);
    sideWinR.position.set(0.68, 0.78, 0.22);
    carGroup.add(sideWinL, sideWinR);

    const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.62, 0.05), glassMat);
    rearWindow.position.set(0, 0.74, 0.88);
    rearWindow.rotation.x = -0.58;
    carGroup.add(rearWindow);

    // Rear Slatted Louvers (5 slats)
    for (let l = 0; l < 5; l++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.03, 0.12), trimMat);
      louver.position.set(0, 0.88 - l * 0.08, 0.68 + l * 0.14);
      louver.rotation.x = -0.45;
      carGroup.add(louver);
    }

    // ── 5. Interior Cockpit & Glowing Y-Capacitor ────────────
    const dash = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.18, 0.35), bumperMat);
    dash.position.set(0, 0.58, -0.32);
    carGroup.add(dash);

    const fcBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.1), trimMat);
    fcBox.position.set(0, 0.75, 0.56);
    carGroup.add(fcBox);

    const fcStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8), fluxMat);
    fcStem.position.set(0, 0.71, 0.52);

    const fcLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.11, 8), fluxMat);
    fcLeft.position.set(-0.045, 0.79, 0.52);
    fcLeft.rotation.z = -Math.PI / 4;

    const fcRight = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.11, 8), fluxMat);
    fcRight.position.set(0.045, 0.79, 0.52);
    fcRight.rotation.z = Math.PI / 4;

    const fcCore = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    fcCore.position.set(0, 0.75, 0.52);

    carGroup.add(fcStem, fcLeft, fcRight, fcCore);
    this.fluxNodes = [fcStem, fcLeft, fcRight, fcCore];

    this.fluxLight = new THREE.PointLight(0x38bdf8, 1.4, 3.8);
    this.fluxLight.position.set(0, 0.78, 0.52);
    carGroup.add(this.fluxLight);

    // ── 6. Back to the Future Rear Deck Equipment ────────────
    const rearDeck = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.22, 1.2), stainlessMat);
    rearDeck.position.set(0, 0.44, 1.45);
    carGroup.add(rearDeck);

    // MR. FUSION Home Energy Reactor
    const mrFusionBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.1, 16), trimMat);
    mrFusionBase.position.set(0, 0.58, 1.15);

    const mrFusionBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.32, 16), mrFusionMat);
    mrFusionBody.position.set(0, 0.76, 1.15);

    const mrFusionCap = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.14, 16), mrFusionMat);
    mrFusionCap.position.set(0, 0.98, 1.15);

    const mrFusionRing = new THREE.Mesh(new THREE.TorusGeometry(0.162, 0.012, 8, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    mrFusionRing.position.set(0, 0.8, 1.15);
    mrFusionRing.rotation.x = Math.PI / 2;

    carGroup.add(mrFusionBase, mrFusionBody, mrFusionCap, mrFusionRing);

    // DUAL OVERSIZED REAR COOLING EXHAUST TURBINE BOX VENTS
    const ventW = 0.46, ventH = 0.38, ventLen = 0.62;

    const ventLeft = new THREE.Mesh(new THREE.BoxGeometry(ventW, ventH, ventLen), ventMat);
    ventLeft.position.set(-0.52, 0.68, 1.76);
    ventLeft.rotation.y = 0.06;
    const ventLGlow = new THREE.Mesh(new THREE.PlaneGeometry(ventW * 0.82, ventH * 0.78), ventInteriorMat);
    ventLGlow.position.set(-0.52, 0.68, 2.08);
    ventLGlow.rotation.y = Math.PI;

    const ventRight = new THREE.Mesh(new THREE.BoxGeometry(ventW, ventH, ventLen), ventMat);
    ventRight.position.set(0.52, 0.68, 1.76);
    ventRight.rotation.y = -0.06;
    const ventRGlow = new THREE.Mesh(new THREE.PlaneGeometry(ventW * 0.82, ventH * 0.78), ventInteriorMat);
    ventRGlow.position.set(0.52, 0.68, 2.08);
    ventRGlow.rotation.y = Math.PI;

    carGroup.add(ventLeft, ventLGlow, ventRight, ventRGlow);
    this.ventGlows = [ventLGlow, ventRGlow];

    const coilBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.45), trimMat);
    coilBox.position.set(0, 0.64, 1.68);
    carGroup.add(coilBox);

    // ── 7. Glowing Exterior Flux Bands ───────────────────────
    const conduitL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 3.8), fluxMat);
    conduitL.position.set(-0.86, 0.36, -0.15);
    const conduitR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 3.8), fluxMat);
    conduitR.position.set(0.86, 0.36, -0.15);

    const loopFL = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.02, 6, 12, Math.PI), fluxMat);
    loopFL.position.set(-0.87, 0.35, -1.35);
    loopFL.rotation.y = Math.PI / 2;

    const loopFR = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.02, 6, 12, Math.PI), fluxMat);
    loopFR.position.set(0.87, 0.35, -1.35);
    loopFR.rotation.y = -Math.PI / 2;

    const loopRL = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.02, 6, 12, Math.PI), fluxMat);
    loopRL.position.set(-0.87, 0.38, 1.25);
    loopRL.rotation.y = Math.PI / 2;

    const loopRR = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.02, 6, 12, Math.PI), fluxMat);
    loopRR.position.set(0.87, 0.38, 1.25);
    loopRR.rotation.y = -Math.PI / 2;

    carGroup.add(conduitL, conduitR, loopFL, loopFR, loopRL, loopRR);
    this.fluxBands = [conduitL, conduitR, loopFL, loopFR, loopRL, loopRR];

    // ── 8. Rear Fascia & "OUTATIME" Plate ────────────────────
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.16, 0.22), bumperMat);
    rearBumper.position.set(0, 0.24, 2.12);
    carGroup.add(rearBumper);

    for (let s = 0; s < 6; s++) {
      const xPos = -0.67 + (s + 0.5) * (1.34 / 6);
      const isAmber = s === 0 || s === 5;
      const sMat = isAmber ? amberMat : tailRedMat;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.03), sMat);
      seg.position.set(xPos, 0.42, 2.12);
      carGroup.add(seg);
    }

    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.02), new THREE.MeshBasicMaterial({ color: 0xfff0aa }));
    plate.position.set(0, 0.25, 2.24);
    carGroup.add(plate);

    const exL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.18, 12), alloyRimMat);
    exL.rotation.x = Math.PI / 2;
    exL.position.set(-0.35, 0.16, 2.22);
    const exR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.18, 12), alloyRimMat);
    exR.rotation.x = Math.PI / 2;
    exR.position.set(0.35, 0.16, 2.22);
    carGroup.add(exL, exR);

    // Front Headlight Beam Projection onto Road Surface (Flat Decal)
    const beamCanvas = document.createElement('canvas');
    beamCanvas.width = 64;
    beamCanvas.height = 128;
    const bCtx = beamCanvas.getContext('2d');
    const bGrad = bCtx.createLinearGradient(32, 0, 32, 128);
    bGrad.addColorStop(0, 'rgba(255, 252, 230, 0.45)');
    bGrad.addColorStop(0.4, 'rgba(255, 250, 210, 0.25)');
    bGrad.addColorStop(1, 'rgba(255, 250, 210, 0)');
    bCtx.fillStyle = bGrad;
    bCtx.beginPath();
    bCtx.moveTo(22, 0);
    bCtx.lineTo(42, 0);
    bCtx.lineTo(60, 128);
    bCtx.lineTo(4, 128);
    bCtx.closePath();
    bCtx.fill();

    const beamTex = new THREE.CanvasTexture(beamCanvas);
    const beamMat = new THREE.MeshBasicMaterial({
      map: beamTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const roadBeam = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 16.0), beamMat);
    roadBeam.rotation.x = -Math.PI / 2;
    roadBeam.position.set(0, 0.03, -10.4);
    carGroup.add(roadBeam);

    const hlPointL = new THREE.PointLight(0xfffaea, 1.4, 14);
    hlPointL.position.set(-0.54, 0.35, -2.4);
    const hlPointR = new THREE.PointLight(0xfffaea, 1.4, 14);
    hlPointR.position.set(0.54, 0.35, -2.4);
    carGroup.add(hlPointL, hlPointR);

    const underglow = new THREE.PointLight(0x38bdf8, 2.0, 6.0);
    underglow.position.set(0, 0.18, 0);
    carGroup.add(underglow);

    // ── 9. DMC Turbine Alloy Wheels ──────────────────────────
    const buildWheel = (radius, width) => {
      const wGroup = new THREE.Group();
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 24), tireRubberMat);
      tire.rotation.z = Math.PI / 2;
      wGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.76, radius * 0.76, width * 1.02, 24), alloyRimMat);
      rim.rotation.z = Math.PI / 2;
      wGroup.add(rim);

      for (let f = 0; f < 8; f++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(radius * 1.35, 0.025, width * 0.98), alloyRimMat);
        fin.rotation.x = (f * Math.PI) / 4;
        wGroup.add(fin);
      }

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.24, radius * 0.24, width * 1.06, 16), bumperMat);
      hub.rotation.z = Math.PI / 2;
      wGroup.add(hub);

      return wGroup;
    };

    this.steerPivotL = new THREE.Group();
    this.steerPivotL.position.set(-0.92, 0.32, -1.35);
    this.wheelFL = buildWheel(0.33, 0.22);
    this.steerPivotL.add(this.wheelFL);

    this.steerPivotR = new THREE.Group();
    this.steerPivotR.position.set(0.92, 0.32, -1.35);
    this.wheelFR = buildWheel(0.33, 0.22);
    this.steerPivotR.add(this.wheelFR);

    this.wheelRL = buildWheel(0.36, 0.26);
    this.wheelRL.position.set(-0.94, 0.35, 1.25);

    this.wheelRR = buildWheel(0.36, 0.26);
    this.wheelRR.position.set(0.94, 0.35, 1.25);

    carGroup.add(this.steerPivotL, this.steerPivotR, this.wheelRL, this.wheelRR);
    this.wheels = [this.wheelFL, this.wheelFR, this.wheelRL, this.wheelRR];

    // ── 10. Back to the Future 88 MPH Twin Fire Ribbons ──────
    const fireCanvas = document.createElement('canvas');
    fireCanvas.width = 64;
    fireCanvas.height = 128;
    const fCtx = fireCanvas.getContext('2d');

    const fireGrad = fCtx.createLinearGradient(0, 0, 0, 128);
    fireGrad.addColorStop(0, 'rgba(255, 235, 120, 1.0)');
    fireGrad.addColorStop(0.18, 'rgba(255, 120, 10, 0.95)');
    fireGrad.addColorStop(0.45, 'rgba(235, 45, 5, 0.85)');
    fireGrad.addColorStop(0.8, 'rgba(180, 20, 5, 0.4)');
    fireGrad.addColorStop(1, 'rgba(100, 10, 0, 0)');
    fCtx.fillStyle = fireGrad;
    fCtx.fillRect(0, 0, 64, 128);

    fCtx.fillStyle = 'rgba(255, 240, 180, 0.6)';
    for (let i = 0; i < 8; i++) {
      const x = 16 + Math.random() * 32;
      const h = 20 + Math.random() * 40;
      fCtx.fillRect(x, 0, 4, h);
    }

    const fireTex = new THREE.CanvasTexture(fireCanvas);
    fireTex.wrapS = THREE.RepeatWrapping;
    fireTex.wrapT = THREE.RepeatWrapping;

    const fireMatL = new THREE.MeshBasicMaterial({
      map: fireTex,
      transparent: true,
      opacity: 0,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const fireMatR = fireMatL.clone();

    const fireGeom = new THREE.PlaneGeometry(0.52, 14.0);
    fireGeom.rotateX(-Math.PI / 2);
    fireGeom.translate(0, 0, 7.0);

    this.fireTrailL = new THREE.Mesh(fireGeom, fireMatL);
    this.fireTrailL.position.set(-0.94, 0.06, 1.4);

    this.fireTrailR = new THREE.Mesh(fireGeom, fireMatR);
    this.fireTrailR.position.set(0.94, 0.06, 1.4);

    this.fireLightL = new THREE.PointLight(0xff5500, 0, 9);
    this.fireLightL.position.set(-0.94, 0.35, 2.5);

    this.fireLightR = new THREE.PointLight(0xff5500, 0, 9);
    this.fireLightR.position.set(0.94, 0.35, 2.5);

    carGroup.add(this.fireTrailL, this.fireTrailR, this.fireLightL, this.fireLightR);

    // ── 11. Temporal Lightning Sparks (88 MPH electric arcs) ──
    const sparkCount = 36;
    const sparkGeom = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 3,
      transparent: true,
      opacity: 0,
    });
    this.sparks = new THREE.LineSegments(sparkGeom, sparkMat);
    carGroup.add(this.sparks);

    return carGroup;
  }

  buildCheckpointGates() {
    const archMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true });

    this.checkpoints.forEach((cp) => {
      const gateGroup = new THREE.Group();
      gateGroup.position.set(0, 0, cp.z);

      const archGeom = new THREE.TorusGeometry(8.5, 0.35, 8, 24, Math.PI);
      const arch = new THREE.Mesh(archGeom, archMat);
      arch.position.set(0, 0, 0);
      gateGroup.add(arch);

      const curtainGeom = new THREE.PlaneGeometry(15, 8.5);
      const curtainMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      });
      const curtain = new THREE.Mesh(curtainGeom, curtainMat);
      curtain.position.set(0, 4.2, 0);
      gateGroup.add(curtain);

      this.scene.add(gateGroup);
      this.gateMeshes.push({ group: gateGroup, cp });
    });
  }

  spawnEntities() {
    const lanes = [-4.5, -2.2, 0, 2.2, 4.5];
    const types = ['plutonium', 'roas', 'capi', 'bonus'];
    const obstacleTypes = ['churn', 'loss'];

    // Spawn initial pool of 24 collectibles spaced along highway
    for (let i = 0; i < 24; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const z = -70 - i * 55;

      const itemMesh = this.createCollectibleMesh(type);
      itemMesh.position.set(lane, 1.1, z);
      this.scene.add(itemMesh);
      this.collectibles.push({ mesh: itemMesh, type, z, lane, collected: false });
    }

    // Spawn initial pool of 12 obstacles (spaced comfortably)
    for (let i = 0; i < 12; i++) {
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const z = -140 - i * 110;

      const obsMesh = this.createObstacleMesh(type);
      obsMesh.position.set(lane, 0.9, z);
      this.scene.add(obsMesh);
      this.obstacles.push({ mesh: obsMesh, type, z, lane, hit: false });
    }
  }

  createCollectibleMesh(type) {
    const group = new THREE.Group();

    if (type === 'plutonium') {
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true })
      );
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xd4af37 })
      );
      cap.position.y = 0.42;
      group.add(cyl, cap);
    } else if (type === 'bonus') {
      const geom = new THREE.IcosahedronGeometry(0.72, 0);
      const mat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true });
      group.add(new THREE.Mesh(geom, mat));
    } else if (type === 'roas') {
      const geom = new THREE.OctahedronGeometry(0.68, 0);
      const mat = new THREE.MeshBasicMaterial({ color: 0x4ade80, wireframe: true });
      group.add(new THREE.Mesh(geom, mat));
    } else {
      const geom = new THREE.BoxGeometry(0.68, 0.68, 0.68);
      const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      group.add(new THREE.Mesh(geom, mat));
    }

    return group;
  }

  createObstacleMesh(type) {
    const geom = new THREE.TetrahedronGeometry(0.85, 0);
    const color = type === 'churn' ? 0xef4444 : 0xf97316;
    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true });
    return new THREE.Mesh(geom, mat);
  }

  initAudioEngine() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.audioCtx = new AudioCtx();

      this.engineOsc = this.audioCtx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(80, this.audioCtx.currentTime);

      this.engineFilter = this.audioCtx.createBiquadFilter();
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(260, this.audioCtx.currentTime);

      this.engineGain = this.audioCtx.createGain();
      this.engineGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);

      this.engineOsc.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.audioCtx.destination);
      this.engineOsc.start();
    } catch {
      // Audio fallback
    }
  }

  trigger88MphSonicBoom() {
    if (!this.audioCtx) return;
    try {
      const t = this.audioCtx.currentTime;
      [220, 277.18, 329.63, 440, 554.37].forEach((freq) => {
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.8);

        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

        osc.connect(g);
        g.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 1.3);
      });
    } catch {
      // Audio fallback
    }
  }

  triggerShieldRestoreToast() {
    audio.chime(4);
    const toast = this.container.querySelector('#arc-checkpoint-toast');
    const titleEl = this.container.querySelector('#cp-toast-title');
    const descEl = this.container.querySelector('#cp-toast-desc');

    if (toast && titleEl && descEl) {
      titleEl.textContent = `⚡ CHRONO SHIELD RECHARGED!`;
      descEl.textContent = `Shield Integrity Restored to ${this.lives} Hearts`;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 2400);
    }
  }

  bindEvents() {
    this.keydownHandler = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') this.keys.boost = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.brake = true;
      if (e.key === 'Escape') this.stop();
    };

    this.keyupHandler = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') this.keys.boost = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.brake = false;
    };

    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);

    // Mobile touch controls
    const btnL = this.container.querySelector('#btn-touch-left');
    const btnR = this.container.querySelector('#btn-touch-right');
    const btnB = this.container.querySelector('#btn-touch-boost');

    const addTouch = (el, key) => {
      if (!el) return;
      el.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys[key] = true; });
      el.addEventListener('pointerup', () => { this.keys[key] = false; });
      el.addEventListener('pointerleave', () => { this.keys[key] = false; });
    };

    addTouch(btnL, 'left');
    addTouch(btnR, 'right');
    addTouch(btnB, 'boost');

    this.container.querySelector('#btn-exit-arcade')?.addEventListener('click', () => this.stop());
    this.container.querySelector('#btn-arc-play-again')?.addEventListener('click', () => this.restart());
    this.container.querySelector('#btn-arc-exit-portfolio')?.addEventListener('click', () => this.stop());

    this.resizeHandler = () => {
      const mount = this.container.querySelector('#arcade-3d-mount');
      if (!mount || !this.renderer || !this.camera) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  start() {
    this.isRunning = true;
    audio.confirm();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.loop();
  }

  stop() {
    if (this.isStopping) return;
    this.isStopping = true;
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
    window.removeEventListener('resize', this.resizeHandler);

    if (this.engineOsc) {
      try { this.engineOsc.stop(); } catch {}
      this.engineOsc = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch {}
      this.audioCtx = null;
    }

    if (this.renderer && this.renderer.domElement) {
      try {
        this.renderer.domElement.remove();
        this.renderer.dispose();
      } catch {}
      this.renderer = null;
    }
    this.container.innerHTML = '';
    const cb = this.onClose;
    this.onClose = null;
    if (cb) cb();
  }

  restart() {
    this.score = 0;
    this.speed = 50;
    this.carX = 0;
    this.targetCarX = 0;
    this.distance = 0;
    this.lives = 4;
    this.invulnerableTimer = 0;
    this.timelineEra = 1;
    this.scoreMultiplier = 1.0;
    this.hasTriggered88Mph = false;
    this.passedGates.clear();

    const endModal = this.container.querySelector('#arc-end-modal');
    if (endModal) endModal.classList.add('hidden');

    const carZ = this.car.position.z;
    const lanes = [-4.5, -2.2, 0, 2.2, 4.5];

    this.collectibles.forEach((c, i) => {
      c.collected = false;
      c.mesh.visible = true;
      const newZ = carZ - 70 - i * 55;
      const newLane = lanes[Math.floor(Math.random() * lanes.length)];
      c.mesh.position.set(newLane, 1.1, newZ);
      c.z = newZ;
      c.lane = newLane;
    });

    this.obstacles.forEach((o, i) => {
      o.hit = false;
      o.mesh.visible = true;
      const newZ = carZ - 140 - i * 110;
      const newLane = lanes[Math.floor(Math.random() * lanes.length)];
      o.mesh.position.set(newLane, 0.9, newZ);
      o.z = newZ;
      o.lane = newLane;
    });

    // Reset gates relative to current car position
    this.checkpoints.forEach((cp, idx) => {
      cp.z = carZ - 900 - idx * 1200;
      if (this.gateMeshes[idx]) {
        this.gateMeshes[idx].group.position.set(0, 0, cp.z);
      }
    });

    this.start();
  }

  loop() {
    if (!this.isRunning) return;
    this.animationId = requestAnimationFrame(() => this.loop());

    this.updatePhysics();
    this.updateEntities();
    this.checkCollisions();
    this.updateHUD();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  updatePhysics() {
    const steerSpeed = 0.26;
    if (this.keys.left) this.targetCarX = Math.max(-5.5, this.targetCarX - steerSpeed);
    if (this.keys.right) this.targetCarX = Math.min(5.5, this.targetCarX + steerSpeed);

    // Smooth ease-out car position
    this.carX += (this.targetCarX - this.carX) * 0.18;
    this.car.position.x = this.carX;
    this.car.rotation.z = (this.carX - this.targetCarX) * 0.14; // DeLorean banking
    this.car.rotation.y = (this.targetCarX - this.carX) * 0.08;

    // Physical front wheel steering
    const steerAngle = (this.targetCarX - this.carX) * 0.65;
    if (this.steerPivotL) this.steerPivotL.rotation.y = steerAngle;
    if (this.steerPivotR) this.steerPivotR.rotation.y = steerAngle;

    // Speed acceleration / boost mechanics
    if (this.keys.boost) {
      this.targetSpeed = this.maxSpeed;
      this.camera.fov = 76; // Warp camera perspective
    } else if (this.keys.brake) {
      this.targetSpeed = 40;
      this.camera.fov = 60;
    } else {
      this.targetSpeed = 75;
      this.camera.fov = 66;
    }
    this.camera.updateProjectionMatrix();

    this.speed += (this.targetSpeed - this.speed) * 0.07;
    const deltaZ = (this.speed / 60) * 0.85;
    this.distance += deltaZ;
    this.car.position.z -= deltaZ;

    // Spin 4 DMC turbine wheels based on forward velocity
    const rotDelta = deltaZ * 1.8;
    if (this.wheels) {
      this.wheels.forEach((w) => {
        w.rotation.x -= rotDelta;
      });
    }

    // Scroll road texture continuously to give realistic high-speed movement
    if (this.roadTex) {
      this.roadTex.offset.y += deltaZ * 0.035;
    }

    // Follow-camera tracking
    this.camera.position.x = this.carX * 0.42;
    this.camera.position.y = 2.6;
    this.camera.position.z = this.car.position.z + 6.8;

    // Continuous road, rails, stars, and sun tracking (Zero snapping, infinite seamless highway)
    this.road.position.z = this.car.position.z;
    this.rails.position.z = this.car.position.z;
    this.stars.position.z = this.car.position.z;
    this.sun.position.z = this.car.position.z - 300;

    // Invulnerability i-frames handling & visual blinking
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer -= 1 / 60;
      this.car.visible = Math.floor(performance.now() / 90) % 2 === 0;
    } else {
      this.car.visible = true;
    }

    // ── 88 MPH TIME DISPLACEMENT SPECIAL EFFECTS ─────────────
    const isAt88Mph = this.speed >= 88.0;
    const t = performance.now() * 0.003;

    // Update Web Audio engine tone
    if (this.engineOsc && this.audioCtx) {
      const freq = 60 + (this.speed / 135) * 160;
      this.engineOsc.frequency.setTargetAtTime(freq, this.audioCtx.currentTime, 0.05);
      if (this.engineFilter) {
        this.engineFilter.frequency.setTargetAtTime(180 + freq * 2, this.audioCtx.currentTime, 0.05);
      }
    }

    // Pulse interior Flux Capacitor & PointLight
    const fluxRate = isAt88Mph ? 24 : 8;
    const fluxPulse = 0.6 + Math.sin(t * fluxRate) * 0.4;
    if (this.fluxLight) {
      this.fluxLight.intensity = isAt88Mph ? 2.4 * fluxPulse : 1.2 * fluxPulse;
    }

    // Turbine vent glow intensity
    if (this.ventGlows) {
      const ventAlpha = isAt88Mph ? 0.9 : 0.4;
      this.ventGlows.forEach((vg) => {
        vg.material.opacity = ventAlpha;
      });
    }

    // 88 MPH Flaming Tire Tracks Activation
    if (isAt88Mph || this.keys.boost) {
      const flameFlicker = Math.min(1.0, 0.7 + Math.sin(t * 35) * 0.3);
      this.fireTrailL.material.opacity = flameFlicker;
      this.fireTrailR.material.opacity = flameFlicker;

      // Dynamic rear fiery road illumination
      if (this.fireLightL && this.fireLightR) {
        this.fireLightL.intensity = 2.4 * flameFlicker;
        this.fireLightR.intensity = 2.4 * flameFlicker;
      }

      // Elongate and flicker flame scale
      const flameLen = 1.0 + (this.speed - 88) * 0.02 + Math.sin(t * 20) * 0.15;
      this.fireTrailL.scale.set(1.0, 1.0, Math.max(0.5, flameLen));
      this.fireTrailR.scale.set(1.0, 1.0, Math.max(0.5, flameLen));

      // First time hitting 88 MPH in this run
      if (!this.hasTriggered88Mph && this.speed >= 88) {
        this.hasTriggered88Mph = true;
        this.trigger88MphSonicBoom();
        const flashEl = this.container.querySelector('#arc-time-flash');
        if (flashEl) {
          flashEl.classList.remove('hidden');
          flashEl.classList.add('flash-active');
          setTimeout(() => {
            flashEl.classList.remove('flash-active');
            flashEl.classList.add('hidden');
          }, 450);
        }
      }

      // Temporal blue electric lightning arcs around the car body
      if (this.sparks) {
        this.sparks.material.opacity = 0.95;
        const positions = this.sparks.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 6) {
          const xBase = (Math.random() - 0.5) * 1.8;
          const yBase = Math.random() * 0.8 + 0.2;
          const zBase = (Math.random() - 0.5) * 3.6;

          positions[i] = xBase;
          positions[i + 1] = yBase;
          positions[i + 2] = zBase;

          positions[i + 3] = xBase + (Math.random() - 0.5) * 0.4;
          positions[i + 4] = yBase + (Math.random() - 0.5) * 0.4;
          positions[i + 5] = zBase + (Math.random() - 0.5) * 0.5;
        }
        this.sparks.geometry.attributes.position.needsUpdate = true;
      }
    } else {
      // Fade out fire trails when below 88 MPH
      this.fireTrailL.material.opacity = Math.max(0, this.fireTrailL.material.opacity - 0.05);
      this.fireTrailR.material.opacity = Math.max(0, this.fireTrailR.material.opacity - 0.05);
      if (this.fireLightL) this.fireLightL.intensity = 0;
      if (this.fireLightR) this.fireLightR.intensity = 0;
      if (this.sparks) this.sparks.material.opacity = 0;
    }
  }

  updateEntities() {
    const t = performance.now() * 0.003;
    const carZ = this.car.position.z;
    const recycleLimit = carZ + 25; // 25 units behind car
    const lanes = [-4.5, -2.2, 0, 2.2, 4.5];

    // Spin & Continuously Recycle Collectibles Ahead
    this.collectibles.forEach((c) => {
      c.mesh.rotation.y = t * 2.2;
      c.mesh.rotation.x = t * 1.1;

      // If collectible passed behind player, respawn it ahead of the highway
      if (c.mesh.position.z > recycleLimit) {
        let minZ = carZ - 80;
        for (let i = 0; i < this.collectibles.length; i++) {
          if (this.collectibles[i].mesh.position.z < minZ) {
            minZ = this.collectibles[i].mesh.position.z;
          }
        }
        const respawnZ = minZ - (55 + Math.random() * 45);
        const newLane = lanes[Math.floor(Math.random() * lanes.length)];
        c.mesh.position.set(newLane, 1.1, respawnZ);
        c.z = respawnZ;
        c.lane = newLane;
        c.collected = false;
        c.mesh.visible = true;
      }
    });

    // Spin & Continuously Recycle Obstacles Ahead
    this.obstacles.forEach((o) => {
      o.mesh.rotation.y = -t * 1.8;
      o.mesh.rotation.z = t * 1.2;

      // If obstacle passed behind player, respawn it ahead
      if (o.mesh.position.z > recycleLimit) {
        let minZ = carZ - 120;
        for (let i = 0; i < this.obstacles.length; i++) {
          if (this.obstacles[i].mesh.position.z < minZ) {
            minZ = this.obstacles[i].mesh.position.z;
          }
        }
        const respawnZ = minZ - (95 + Math.random() * 65);
        const newLane = lanes[Math.floor(Math.random() * lanes.length)];
        o.mesh.position.set(newLane, 0.9, respawnZ);
        o.z = respawnZ;
        o.lane = newLane;
        o.hit = false;
        o.mesh.visible = true;
      }
    });
  }

  checkCollisions() {
    const carZ = this.car.position.z;
    const carX = this.car.position.x;
    const isInvulnerable = this.invulnerableTimer > 0;

    // Collectibles Collision Check
    this.collectibles.forEach((c) => {
      if (!c.collected && Math.abs(c.z - carZ) < 2.4 && Math.abs(c.lane - carX) < 1.4) {
        c.collected = true;
        c.mesh.visible = false;
        audio.click(1800);

        let pts = 250;
        if (c.type === 'bonus') {
          pts = 1220; // 122% ROAS Golden Core
          if (this.lives < 4) {
            this.lives += 1;
            this.triggerShieldRestoreToast();
          }
        } else if (c.type === 'plutonium') {
          pts = 1000;
          if (this.lives < 4) {
            this.lives += 1;
            this.triggerShieldRestoreToast();
          }
        } else if (c.type === 'roas') {
          pts = 500;
        }

        this.score += Math.round(pts * this.scoreMultiplier);
        this.bonusPacing = Math.min(122, this.bonusPacing + 4);
      }
    });

    // Obstacles Collision Check (with Grace Period i-frames)
    this.obstacles.forEach((o) => {
      if (!o.hit && Math.abs(o.z - carZ) < 1.8 && Math.abs(o.lane - carX) < 1.05) {
        o.hit = true;
        o.mesh.visible = false;

        if (!isInvulnerable) {
          audio.click(360);
          this.lives -= 1;
          this.invulnerableTimer = 2.0; // 2 seconds of grace protection
          this.speed = Math.max(40, this.speed - 30);

          if (this.lives <= 0) {
            this.endGame(false);
          }
        }
      }
    });

    // Milestone Checkpoint Gates
    this.checkpoints.forEach((cp) => {
      if (!this.passedGates.has(cp.id) && carZ <= cp.z) {
        this.passedGates.add(cp.id);
        this.triggerGateToast(cp);
        this.score += Math.round(3500 * this.scoreMultiplier);

        // When all 6 gates are passed in this era, advance to next era seamlessly!
        if (this.passedGates.size === this.checkpoints.length) {
          this.advanceTimelineEra();
        }
      }
    });
  }

  advanceTimelineEra() {
    this.timelineEra += 1;
    this.scoreMultiplier += 0.5;
    this.trigger88MphSonicBoom();

    const tcEraVal = this.container.querySelector('#tc-era-val');
    if (tcEraVal) {
      tcEraVal.textContent = `ERA ${this.timelineEra} · ${this.scoreMultiplier.toFixed(1)}X`;
    }

    const toast = this.container.querySelector('#arc-checkpoint-toast');
    const titleEl = this.container.querySelector('#cp-toast-title');
    const descEl = this.container.querySelector('#cp-toast-desc');

    if (toast && titleEl && descEl) {
      titleEl.textContent = `⚡ 122% BONUS TARGET DELIVERED!`;
      descEl.textContent = `Entering Temporal Era ${this.timelineEra} (${this.scoreMultiplier.toFixed(1)}x Multiplier Active)`;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 4000);
    }

    // Reposition gates ahead for the next milestone era
    const carZ = this.car.position.z;
    this.checkpoints.forEach((cp, idx) => {
      cp.z = carZ - 1200 - idx * 1200;
      if (this.gateMeshes[idx]) {
        this.gateMeshes[idx].group.position.set(0, 0, cp.z);
      }
    });
    this.passedGates.clear();
  }

  triggerGateToast(cp) {
    audio.confirm();
    const toast = this.container.querySelector('#arc-checkpoint-toast');
    const titleEl = this.container.querySelector('#cp-toast-title');
    const descEl = this.container.querySelector('#cp-toast-desc');

    if (toast && titleEl && descEl) {
      titleEl.textContent = `CHECKPOINT: ${cp.name.toUpperCase()}`;
      descEl.textContent = cp.metric;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 3400);
    }
  }

  updateHUD() {
    const scoreEl = this.container.querySelector('#arc-score');
    if (scoreEl) scoreEl.textContent = `$${this.score.toLocaleString()}`;

    const speedEl = this.container.querySelector('#arc-speed');
    const speedBox = this.container.querySelector('#hud-speed-box');
    const tcStatusVal = this.container.querySelector('#tc-status-val');

    if (speedEl) {
      speedEl.textContent = `${this.speed.toFixed(1)} MPH`;
      if (this.speed >= 88.0) {
        speedEl.style.color = '#ef4444';
        speedBox?.classList.add('time-circuits-engaged');
        if (tcStatusVal) {
          tcStatusVal.textContent = '88 MPH ⚡ ACTIVE';
          tcStatusVal.style.color = '#ef4444';
        }
      } else {
        speedEl.style.color = '#38bdf8';
        speedBox?.classList.remove('time-circuits-engaged');
        if (tcStatusVal) {
          tcStatusVal.textContent = 'STANDBY';
          tcStatusVal.style.color = '#f59e0b';
        }
      }
    }

    const pacingEl = this.container.querySelector('#arc-pacing');
    if (pacingEl) pacingEl.textContent = `${Math.min(122, Math.round(this.score / 70))}% ROAS`;

    const livesEl = this.container.querySelector('#arc-lives');
    if (livesEl) {
      livesEl.textContent = '♥'.repeat(Math.max(0, this.lives)) + '♡'.repeat(Math.max(0, 4 - this.lives));
      livesEl.style.color = this.lives <= 1 ? '#ef4444' : (this.lives === 4 ? '#38bdf8' : '#4ade80');
    }
  }

  endGame(isVictory) {
    this.isRunning = false;
    audio.confirm();

    const endModal = this.container.querySelector('#arc-end-modal');
    const titleEl = this.container.querySelector('#am-verdict-title');
    const subEl = this.container.querySelector('#am-verdict-sub');
    const scoreEl = this.container.querySelector('#am-final-score');

    if (endModal && titleEl && subEl && scoreEl) {
      endModal.classList.remove('hidden');
      scoreEl.textContent = `$${this.score.toLocaleString()}`;

      if (isVictory) {
        titleEl.textContent = 'GREAT SCOTT! 122% BONUS TARGET DELIVERED!';
        subEl.textContent = 'All corporate and academic milestones unlocked: Money Group (Full-Time), Red Ventures (Full-Time), Viva Advertising (Founder), Link PR (Co-Founder), Stanford, and UPPR 4.0 GPA.';
      } else {
        titleEl.textContent = 'TEMPORAL DISPLACEMENT COLLAPSED';
        subEl.textContent = 'Attribution loss encountered! Re-ignite the Flux Capacitor to deliver 122% ROAS pacing.';
      }
    }
  }
}
