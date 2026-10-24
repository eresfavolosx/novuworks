// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Video Game Easter Egg
//  "CYBER GROWTH RACER: The Hyper-Attribution Highway"
//  Real-time Three.js 3D arcade driving experience featuring
//  algorithmic media buying, Databricks telemetry gates, and
//  procedural Web Audio sound effects.
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
    this.speed = 0; // Current speed
    this.targetSpeed = 120;
    this.maxSpeed = 240;
    this.carX = 0;
    this.targetCarX = 0;
    this.distance = 0;
    this.bonusPacing = 0; // 0 to 122%
    this.lives = 3;
    this.passedGates = new Set();

    // Input state
    this.keys = { left: false, right: false, boost: false, brake: false };

    // Milestone gates
    this.checkpoints = [
      { id: 'mg', z: -800, name: 'Money Group', metric: '122% Bonus Target Delivered ($1B+ Scope)' },
      { id: 'rv', z: -1800, name: 'Red Ventures / edX', metric: '40M+ Databricks SQL Sessions Normalized' },
      { id: 'va', z: -3000, name: 'Viva Advertising', metric: '$10M+ B2B Pipeline & -83% Churn Reduced' },
      { id: 'lp', z: -4200, name: 'Link Puerto Rico', metric: '100+ Relational Databases Engineered' },
      { id: 'st', z: -5400, name: 'Stanford University', metric: 'Stanford Innovation Fellows Graduate' },
      { id: 'up', z: -6800, name: 'Univ. Politécnica PR', metric: 'B.S. Computer Engineering (4.0 GPA)' },
    ];

    this.collectibles = [];
    this.obstacles = [];
    this.gateMeshes = [];

    this.renderHtml();
    this.initThree();
    this.bindEvents();
    this.start();
  }

  renderHtml() {
    this.container.innerHTML = `
      <div class="arcade-overlay">
        <!-- Retro Arcade Top HUD Bar -->
        <header class="arcade-hud-header">
          <div class="arcade-title-group">
            <span class="arcade-tag">🎮 3D EASTER EGG · GROWTH RACER</span>
            <h2 class="arcade-title">HYPER-ATTRIBUTION HIGHWAY</h2>
          </div>

          <!-- Live Score & Telemetry Meters -->
          <div class="arcade-stats-row">
            <div class="arcade-stat-box">
              <span class="as-label">REVENUE ATTRIBUTED</span>
              <span class="as-value text-gold" id="arc-score">000,000 PTS</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">VELOCITY</span>
              <span class="as-value" style="color: #38bdf8;" id="arc-speed">120 MPH</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">BONUS PACING</span>
              <span class="as-value" style="color: #4ade80;" id="arc-pacing">122% ROAS</span>
            </div>
            <div class="arcade-stat-box">
              <span class="as-label">SHIELD INTEGRITY</span>
              <span class="as-value" id="arc-lives">♥♥♥</span>
            </div>
          </div>

          <button type="button" class="arcade-exit-btn" id="btn-exit-arcade" title="Exit to Portfolio (Esc)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Exit Arcade</span>
          </button>
        </header>

        <!-- 3D WebGL Canvas Layer -->
        <div class="arcade-canvas-wrap" id="arcade-3d-mount"></div>

        <!-- Checkpoint Toast Banner -->
        <div class="arcade-checkpoint-toast" id="arc-checkpoint-toast">
          <div class="cp-title" id="cp-toast-title">GATE REACHED</div>
          <div class="cp-desc" id="cp-toast-desc">Milestone Passed</div>
        </div>

        <!-- Controls Guide & On-Screen Touch Controls (Mobile Friendly) -->
        <footer class="arcade-controls-footer">
          <div class="arcade-key-hints">
            <span><strong>[A / ◄]</strong> Steer Left</span>
            <span><strong>[D / ►]</strong> Steer Right</span>
            <span><strong>[W / ▲ / SPACE]</strong> Turbo Warp Boost</span>
            <span><strong>[S / ▼]</strong> Drift Brake</span>
          </div>

          <!-- On-screen pedals for mobile touch devices -->
          <div class="arcade-touch-pedals">
            <button type="button" class="touch-btn" id="btn-touch-left">◄ STEER L</button>
            <button type="button" class="touch-btn boost-btn" id="btn-touch-boost">⚡ WARP BOOST</button>
            <button type="button" class="touch-btn" id="btn-touch-right">STEER R ►</button>
          </div>
        </footer>

        <!-- Game Over / Victory Modal -->
        <div class="arcade-modal-backdrop hidden" id="arc-end-modal">
          <div class="arcade-modal-card">
            <span class="am-kicker">MISSION DEBRIEF</span>
            <h3 class="am-title" id="am-verdict-title">122% BONUS TARGET ACHIEVED!</h3>
            <p class="am-sub" id="am-verdict-sub">
              You navigated the hyper-attribution highway, eliminated tracking divergence, and scaled multi-million dollar pipelines.
            </p>

            <div class="am-score-grid">
              <div class="am-score-cell">
                <span class="am-key">FINAL PIPELINE GENERATED</span>
                <span class="am-val text-gold" id="am-final-score">0 PTS</span>
              </div>
              <div class="am-score-cell">
                <span class="am-key">ENGINEER EVALUATION</span>
                <span class="am-val" style="color: #4ade80;">Top 1% Growth Engineer</span>
              </div>
            </div>

            <p class="am-cta-note">
              Fabián engineered this entire 3D WebGL game engine, physics, and procedural soundscape. Ready to scale quantitative growth systems together?
            </p>

            <div class="am-actions-row">
              <button type="button" class="luxury-btn primary-gold" id="btn-arc-play-again">
                <span>Play Again</span>
              </button>
              <a href="mailto:fabianvvicente1@gmail.com?subject=Strategic%20Role%20Inquiry%20-%20From%20Arcade%20Easter%20Egg" class="luxury-btn outline-platinum">
                <span>Hire Fabián / Strategy Chat</span>
              </a>
              <button type="button" class="luxury-btn subtle-ghost" id="btn-arc-exit-portfolio">
                <span>Return to Portfolio</span>
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
    this.scene.fog = new THREE.FogExp2(0x080612, 0.0035);

    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    this.camera.position.set(0, 3.8, 8);
    this.camera.lookAt(0, 1.2, -18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x06050e);
    mount.appendChild(this.renderer.domElement);

    // Ambient & Directional Lighting
    const hemi = new THREE.HemisphereLight(0x8a7bff, 0x140824, 0.8);
    this.scene.add(hemi);

    const sunLight = new THREE.DirectionalLight(0xe0566a, 1.8);
    sunLight.position.set(0, 20, -100);
    this.scene.add(sunLight);

    // 1. Cyber Synthwave Sun at the Horizon
    const sunGeom = new THREE.CircleGeometry(42, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xe0566a,
      fog: false,
    });
    this.sun = new THREE.Mesh(sunGeom, sunMat);
    this.sun.position.set(0, 18, -280);
    this.scene.add(this.sun);

    // 2. Infinite Neon Road Grid
    const roadWidth = 14;
    const roadLength = 600;
    const roadGeom = new THREE.PlaneGeometry(roadWidth, roadLength, 4, 60);
    const roadMat = new THREE.MeshBasicMaterial({
      color: 0x0c0b16,
      wireframe: false,
    });
    this.road = new THREE.Mesh(roadGeom, roadMat);
    this.road.rotation.x = -Math.PI / 2;
    this.road.position.set(0, 0, -roadLength / 2 + 20);
    this.scene.add(this.road);

    // Neon edge rails (Novu Works gradient)
    const railGeom = new THREE.BufferGeometry();
    const railPts = [
      -roadWidth / 2, 0.05, 50, -roadWidth / 2, 0.05, -550,
      roadWidth / 2, 0.05, 50, roadWidth / 2, 0.05, -550,
      -roadWidth / 6, 0.02, 50, -roadWidth / 6, 0.02, -550,
      roadWidth / 6, 0.02, 50, roadWidth / 6, 0.02, -550,
    ];
    railGeom.setAttribute('position', new THREE.Float32BufferAttribute(railPts, 3));
    const railMat = new THREE.LineBasicMaterial({ color: 0x8b52c8, transparent: true, opacity: 0.85 });
    this.rails = new THREE.LineSegments(railGeom, railMat);
    this.scene.add(this.rails);

    // 3. Electric Player Wedge Vehicle
    this.car = this.buildCarMesh();
    this.car.position.set(0, 0.35, 0);
    this.scene.add(this.car);

    // 4. Background Starfield / Speed Streaks
    const starCount = 600;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 260;
      starPositions[i + 1] = Math.random() * 80 + 2;
      starPositions[i + 2] = -Math.random() * 320;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.6 });
    this.stars = new THREE.Points(starGeom, starMat);
    this.scene.add(this.stars);

    // 5. Build Milestone Checkpoint Gates
    this.buildCheckpointGates();

    // 6. Spawn initial items
    this.spawnEntities();
  }

  buildCarMesh() {
    const group = new THREE.Group();

    // Aerodynamic wedge body
    const bodyGeom = new THREE.ConeGeometry(1.2, 3.4, 4);
    bodyGeom.rotateX(-Math.PI / 2);
    bodyGeom.rotateY(Math.PI / 4);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f111a,
      metalness: 0.85,
      roughness: 0.25,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    group.add(body);

    // Glowing Novu Works neon edge wireframe
    const edgesGeom = new THREE.EdgesGeometry(bodyGeom);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xe0566a, linewidth: 2 });
    const edges = new THREE.LineSegments(edgesGeom, edgesMat);
    group.add(edges);

    // Twin neon tail thrusters
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.4), thrusterMat);
    t1.position.set(-0.45, 0.1, 1.6);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.4), thrusterMat);
    t2.position.set(0.45, 0.1, 1.6);
    group.add(t1, t2);

    return group;
  }

  buildCheckpointGates() {
    const archMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true });

    this.checkpoints.forEach((cp) => {
      const gateGroup = new THREE.Group();
      gateGroup.position.set(0, 0, cp.z);

      // Grand archway
      const archGeom = new THREE.TorusGeometry(8, 0.35, 8, 24, Math.PI);
      const arch = new THREE.Mesh(archGeom, archMat);
      arch.position.set(0, 0, 0);
      arch.rotation.z = 0;
      gateGroup.add(arch);

      // Light curtain plane
      const curtainGeom = new THREE.PlaneGeometry(14, 8);
      const curtainMat = new THREE.MeshBasicMaterial({
        color: 0x8b52c8,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const curtain = new THREE.Mesh(curtainGeom, curtainMat);
      curtain.position.set(0, 4, 0);
      gateGroup.add(curtain);

      this.scene.add(gateGroup);
      this.gateMeshes.push({ group: gateGroup, cp });
    });
  }

  spawnEntities() {
    const lanes = [-4.5, -2.2, 0, 2.2, 4.5];
    const types = ['capi', 'roas', 'prompt', 'bonus'];
    const obstacleTypes = ['churn', 'loss'];

    // Spawn 24 collectibles spaced along the highway
    for (let i = 0; i < 24; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const z = -120 - i * 85;

      const itemMesh = this.createCollectibleMesh(type);
      itemMesh.position.set(lane, 1.1, z);
      this.scene.add(itemMesh);
      this.collectibles.push({ mesh: itemMesh, type, z, lane, collected: false });
    }

    // Spawn 14 obstacles along the highway
    for (let i = 0; i < 14; i++) {
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const z = -160 - i * 140;

      const obsMesh = this.createObstacleMesh(type);
      obsMesh.position.set(lane, 0.9, z);
      this.scene.add(obsMesh);
      this.obstacles.push({ mesh: obsMesh, type, z, lane, hit: false });
    }
  }

  createCollectibleMesh(type) {
    let geom, color;
    if (type === 'bonus') {
      geom = new THREE.IcosahedronGeometry(0.75, 0);
      color = 0xd4af37; // Gold
    } else if (type === 'roas') {
      geom = new THREE.OctahedronGeometry(0.65, 0);
      color = 0x4ade80; // Green
    } else if (type === 'prompt') {
      geom = new THREE.ConeGeometry(0.5, 1.1, 4);
      color = 0xa855f7; // Purple
    } else {
      geom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      color = 0x38bdf8; // Cyan
    }

    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true });
    return new THREE.Mesh(geom, mat);
  }

  createObstacleMesh(type) {
    const geom = new THREE.TetrahedronGeometry(0.85, 0);
    const color = type === 'churn' ? 0xef4444 : 0xf97316; // Red / Orange
    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true });
    return new THREE.Mesh(geom, mat);
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

    // Touch button bindings for mobile
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

    // Action buttons
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
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
    window.removeEventListener('resize', this.resizeHandler);

    // Clean Three.js resources
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
    this.container.innerHTML = '';
    if (this.onClose) this.onClose();
  }

  restart() {
    this.score = 0;
    this.speed = 120;
    this.carX = 0;
    this.targetCarX = 0;
    this.distance = 0;
    this.lives = 3;
    this.passedGates.clear();

    const endModal = this.container.querySelector('#arc-end-modal');
    if (endModal) endModal.classList.add('hidden');

    this.collectibles.forEach((c) => {
      c.collected = false;
      c.mesh.visible = true;
    });

    this.obstacles.forEach((o) => {
      o.hit = false;
      o.mesh.visible = true;
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
    this.renderer.render(this.scene, this.camera);
  }

  updatePhysics() {
    // Steering mechanics
    const steerSpeed = 0.28;
    if (this.keys.left) this.targetCarX = Math.max(-5.5, this.targetCarX - steerSpeed);
    if (this.keys.right) this.targetCarX = Math.min(5.5, this.targetCarX + steerSpeed);

    // Smooth ease-out car position
    this.carX += (this.targetCarX - this.carX) * 0.18;
    this.car.position.x = this.carX;
    this.car.rotation.z = (this.carX - this.targetCarX) * 0.15; // banking tilt
    this.car.rotation.y = (this.targetCarX - this.carX) * 0.08;

    // Speed acceleration / brake
    if (this.keys.boost) {
      this.targetSpeed = this.maxSpeed;
      this.camera.fov = 75; // dynamic warp FOV
    } else if (this.keys.brake) {
      this.targetSpeed = 60;
      this.camera.fov = 62;
    } else {
      this.targetSpeed = 140;
      this.camera.fov = 68;
    }
    this.camera.updateProjectionMatrix();

    this.speed += (this.targetSpeed - this.speed) * 0.08;
    const deltaZ = (this.speed / 60) * 0.85;
    this.distance += deltaZ;
    this.car.position.z -= deltaZ;

    // Keep camera following car
    this.camera.position.x = this.carX * 0.45;
    this.camera.position.z = this.car.position.z + 8.5;
    this.sun.position.z = this.car.position.z - 280;

    // Infinite road looping
    if (this.road.position.z - this.car.position.z > 200) {
      this.road.position.z = this.car.position.z - 200;
      this.rails.position.z = this.car.position.z - 200;
    }
  }

  updateEntities() {
    const t = performance.now() * 0.003;

    // Spin collectibles
    this.collectibles.forEach((c) => {
      c.mesh.rotation.y = t * 2;
      c.mesh.rotation.x = t;
    });

    // Spin obstacles
    this.obstacles.forEach((o) => {
      o.mesh.rotation.y = -t * 1.5;
      o.mesh.rotation.z = t;
    });
  }

  checkCollisions() {
    const carZ = this.car.position.z;
    const carX = this.car.position.x;

    // Collectibles collision check
    this.collectibles.forEach((c) => {
      if (!c.collected && Math.abs(c.z - carZ) < 2.2 && Math.abs(c.lane - carX) < 1.6) {
        c.collected = true;
        c.mesh.visible = false;
        audio.click(1600);

        let pts = 100;
        if (c.type === 'bonus') pts = 1000;
        else if (c.type === 'roas') pts = 500;
        else if (c.type === 'prompt') pts = 250;

        this.score += pts;
        this.bonusPacing = Math.min(122, this.bonusPacing + 5);
      }
    });

    // Obstacles collision check
    this.obstacles.forEach((o) => {
      if (!o.hit && Math.abs(o.z - carZ) < 2.0 && Math.abs(o.lane - carX) < 1.4) {
        o.hit = true;
        o.mesh.visible = false;
        audio.click(400); // Low crash sound
        this.lives -= 1;
        this.speed = Math.max(40, this.speed - 50);

        if (this.lives <= 0) {
          this.endGame(false);
        }
      }
    });

    // Milestone gates check
    this.checkpoints.forEach((cp) => {
      if (!this.passedGates.has(cp.id) && carZ <= cp.z) {
        this.passedGates.add(cp.id);
        this.triggerGateToast(cp);
        this.score += 2500;

        if (this.passedGates.size === this.checkpoints.length) {
          this.endGame(true);
        }
      }
    });
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
      setTimeout(() => toast.classList.remove('visible'), 3200);
    }
  }

  updateHUD() {
    const scoreEl = this.container.querySelector('#arc-score');
    if (scoreEl) scoreEl.textContent = `${this.score.toLocaleString()} PTS`;

    const speedEl = this.container.querySelector('#arc-speed');
    if (speedEl) speedEl.textContent = `${Math.round(this.speed)} MPH`;

    const pacingEl = this.container.querySelector('#arc-pacing');
    if (pacingEl) pacingEl.textContent = `${Math.min(122, Math.round(this.score / 80))}% ROAS`;

    const livesEl = this.container.querySelector('#arc-lives');
    if (livesEl) {
      livesEl.textContent = '♥'.repeat(Math.max(0, this.lives)) + '♡'.repeat(Math.max(0, 3 - this.lives));
      livesEl.style.color = this.lives <= 1 ? '#ef4444' : '#4ade80';
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
      scoreEl.textContent = `${this.score.toLocaleString()} PTS`;

      if (isVictory) {
        titleEl.textContent = '122% BONUS TARGET DELIVERED!';
        subEl.textContent = 'All corporate milestones cleared: Money Group, Red Ventures, Viva Advertising, Link PR, Stanford, and UPPR 4.0 GPA.';
      } else {
        titleEl.textContent = 'TELEMETRY DISCONNECTED';
        subEl.textContent = 'Attribution loss encountered! Re-engage full-funnel tracking to scale the portfolio to 122% pacing.';
      }
    }
  }
}
