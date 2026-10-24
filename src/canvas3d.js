// ─────────────────────────────────────────────────────────────
//  Novu Works — 3D Spatial Canvas (Three.js WebGL2 Engine)
//  Resilient: Gracefully catches WebGL context creation errors.
// ─────────────────────────────────────────────────────────────

import * as THREE from 'three';
import { DISCIPLINES } from './data.js';
import { audio } from './audio.js';

export class SpatialCanvas3D {
  constructor(containerEl, onSelectDiscipline) {
    this.container = containerEl;
    this.onSelectDiscipline = onSelectDiscipline;
    this.width = containerEl.clientWidth || window.innerWidth;
    this.height = containerEl.clientHeight || window.innerHeight;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.isAvailable = false;

    // Interaction states
    this.pointer = new THREE.Vector2(0, 0);
    this.pointerTarget = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.hoveredNodeIndex = -1;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.worldRotation = { x: 0.15, y: 0 };

    // Morph state: 0 = Monogram, 1 = Growth Topology, 2 = Quantum Core
    this.morphProgress = 0;
    this.targetMorph = 0;

    // Telemetry tracking
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.drawCalls = 0;

    this.init();
  }

  init() {
    try {
      // 1. Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x06050b, 0.012);

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 1000);
      this.camera.position.set(0, 0, 48);

      // 3. Renderer with safe fallback
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.container.appendChild(this.renderer.domElement);
      this.isAvailable = true;

      // 4. Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambient);

      const dirLight1 = new THREE.DirectionalLight(0xe0566a, 2.0);
      dirLight1.position.set(20, 30, 20);
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x3d63e6, 2.5);
      dirLight2.position.set(-20, -20, 20);
      this.scene.add(dirLight2);

      // 5. Build 3D Objects
      this.rootGroup = new THREE.Group();
      this.scene.add(this.rootGroup);

      this.buildParticleCloud();
      this.buildArchitecturePillars();
      this.buildGridGround();

      // 6. Event Listeners
      this.bindEvents();

      // 7. Start Loop
      this.animate();
    } catch (err) {
      console.warn('WebGL initialization caught gracefully. App running in standard graphics mode:', err);
      this.isAvailable = false;
      this.container.style.display = 'none';
    }
  }

  buildParticleCloud() {
    const COUNT = 3200;
    const posA = new Float32Array(COUNT * 3); // Logo shape
    const posB = new Float32Array(COUNT * 3); // Topology lattice
    const posC = new Float32Array(COUNT * 3); // Dynamic sphere
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT);

    const color1 = new THREE.Color('#e0566a');
    const color2 = new THREE.Color('#8b52c8');
    const color3 = new THREE.Color('#3d63e6');

    for (let i = 0; i < COUNT; i++) {
      randoms[i] = Math.random();
      sizes[i] = 1.0 + Math.random() * 2.5;

      const t = i / COUNT;
      let x = 0, y = 0, z = (Math.random() - 0.5) * 3.5;

      if (t < 0.45) {
        // "N" stroke
        const sub = t / 0.45;
        if (sub < 0.33) {
          x = -13 + (Math.random() - 0.5) * 1.5;
          y = -9 + (sub / 0.33) * 18 + (Math.random() - 0.5);
        } else if (sub < 0.66) {
          const s = (sub - 0.33) / 0.33;
          x = -13 + s * 9 + (Math.random() - 0.5) * 1.2;
          y = 9 - s * 18 + (Math.random() - 0.5);
        } else {
          x = -4 + (Math.random() - 0.5) * 1.5;
          y = -9 + ((sub - 0.66) / 0.34) * 18 + (Math.random() - 0.5);
        }
      } else if (t < 0.95) {
        // "W" stroke
        const sub = (t - 0.45) / 0.50;
        if (sub < 0.25) {
          const s = sub / 0.25;
          x = 2 + s * 3.5; y = 9 - s * 18;
        } else if (sub < 0.50) {
          const s = (sub - 0.25) / 0.25;
          x = 5.5 + s * 3.5; y = -9 + s * 13;
        } else if (sub < 0.75) {
          const s = (sub - 0.50) / 0.25;
          x = 9 + s * 3.5; y = 4 - s * 13;
        } else {
          const s = (sub - 0.75) / 0.25;
          x = 12.5 + s * 3.5; y = -9 + s * 18;
        }
        x += (Math.random() - 0.5) * 1.3;
        y += (Math.random() - 0.5) * 1.3;
      } else {
        x = (Math.random() - 0.5) * 34;
        y = (Math.random() - 0.5) * 22;
        z = (Math.random() - 0.5) * 12;
      }

      posA[i * 3] = x;
      posA[i * 3 + 1] = y;
      posA[i * 3 + 2] = z;

      // Tiered growth architecture
      const tier = i % 4;
      const row = Math.floor(i / 4) % 18;
      posB[i * 3] = (row - 9) * 2.4 + (Math.random() - 0.5) * 1.5;
      posB[i * 3 + 1] = (tier - 1.5) * 6.0 + (Math.random() - 0.5) * 1.2;
      posB[i * 3 + 2] = (Math.random() - 0.5) * 14.0;

      // Quantum Core
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 11.0 + Math.cbrt(Math.random()) * 4.5;
      posC[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posC[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posC[i * 3 + 2] = r * Math.cos(phi);

      const gradT = THREE.MathUtils.clamp((x + 15) / 32, 0, 1);
      const pColor = new THREE.Color();
      if (gradT < 0.5) pColor.lerpColors(color1, color2, gradT * 2);
      else pColor.lerpColors(color2, color3, (gradT - 0.5) * 2);

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posA, 3));
    geometry.setAttribute('targetPosB', new THREE.BufferAttribute(posB, 3));
    geometry.setAttribute('targetPosC', new THREE.BufferAttribute(posC, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('rand', new THREE.BufferAttribute(randoms, 1));

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uMorph;
        uniform vec3 uPointer;
        uniform float uPixelRatio;

        attribute vec3 targetPosB;
        attribute vec3 targetPosC;
        attribute vec3 color;
        attribute float size;
        attribute float rand;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec3 pA = position;
          vec3 pB = targetPosB;
          vec3 pC = targetPosC;

          vec3 p;
          if (uMorph <= 1.0) {
            p = mix(pA, pB, uMorph);
          } else {
            p = mix(pB, pC, uMorph - 1.0);
          }

          p.x += sin(uTime * 1.5 + rand * 6.28) * 0.35;
          p.y += cos(uTime * 1.8 + rand * 6.28) * 0.35;
          p.z += sin(uTime * 1.2 + rand * 6.28) * 0.45;

          vec3 toPointer = p - uPointer;
          float dist = length(toPointer);
          if (dist < 12.0) {
            float force = (1.0 - dist / 12.0);
            p += normalize(toPointer + 0.001) * force * 4.5;
          }

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = size * uPixelRatio * (280.0 / -mvPosition.z);
          vAlpha = smoothstep(60.0, 10.0, -mvPosition.z) * (0.65 + 0.35 * sin(uTime * 2.0 + rand * 10.0));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float d = length(coord);
          if (d > 0.5) discard;

          float intensity = pow(1.0 - (d * 2.0), 1.8);
          vec3 glow = vColor * (1.2 + 0.8 * intensity);
          gl_FragColor = vec4(glow, vAlpha * intensity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particleMesh = new THREE.Points(geometry, shaderMaterial);
    this.rootGroup.add(this.particleMesh);
  }

  buildArchitecturePillars() {
    this.pillarNodes = [];
    const count = DISCIPLINES.length;
    const radius = 22.0;

    const ringGeometry = new THREE.TorusGeometry(radius, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b52c8,
      transparent: true,
      opacity: 0.22,
    });
    this.orbitRing = new THREE.Mesh(ringGeometry, ringMat);
    this.orbitRing.rotation.x = Math.PI / 2.3;
    this.rootGroup.add(this.orbitRing);

    DISCIPLINES.forEach((disc, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 2.5;

      const group = new THREE.Group();
      group.position.set(x, y, z);

      const icoGeo = new THREE.IcosahedronGeometry(1.6, 0);
      const wireMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(disc.color),
        emissive: new THREE.Color(disc.color),
        emissiveIntensity: 0.8,
        wireframe: true,
      });
      const outer = new THREE.Mesh(icoGeo, wireMat);
      group.add(outer);

      const coreGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(disc.color),
      });
      const inner = new THREE.Mesh(coreGeo, coreMat);
      group.add(inner);

      const hitGeo = new THREE.SphereGeometry(2.4, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitGeo, hitMat);
      hitBox.userData = { index: i, discipline: disc };
      group.add(hitBox);

      const sprite = this.createNodeTextSprite(disc.number, disc.title, disc.color);
      sprite.position.set(0, 2.7, 0);
      group.add(sprite);

      this.rootGroup.add(group);
      this.pillarNodes.push({
        group,
        outer,
        inner,
        hitBox,
        disc,
        basePos: new THREE.Vector3(x, y, z),
        angle,
      });
    });
  }

  createNodeTextSprite(number, text, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(10, 8, 20, 0.85)';
    ctx.roundRect(10, 10, 492, 108, 16);
    ctx.fill();

    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 4;
    ctx.roundRect(10, 10, 492, 108, 16);
    ctx.stroke();

    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${number} · ${text}`, 32, 74);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(7.5, 1.85, 1);
    return sprite;
  }

  buildGridGround() {
    const grid = new THREE.GridHelper(120, 40, 0x8b52c8, 0x1f1935);
    grid.position.y = -18;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    this.rootGroup.add(grid);
  }

  bindEvents() {
    const el = this.container;

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      this.pointerTarget.set(this.pointer.x * 24, this.pointer.y * 16);

      if (this.isDragging) {
        const deltaX = clientX - this.dragStart.x;
        const deltaY = clientY - this.dragStart.y;
        this.worldRotation.y += deltaX * 0.005;
        this.worldRotation.x += deltaY * 0.005;
        this.rotationVelocity.x = deltaY * 0.001;
        this.rotationVelocity.y = deltaX * 0.001;
        this.dragStart.x = clientX;
        this.dragStart.y = clientY;
      }
    };

    const onPointerDown = (e) => {
      this.isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.dragStart.x = clientX;
      this.dragStart.y = clientY;
    };

    const onPointerUp = () => {
      if (this.isDragging && Math.abs(this.rotationVelocity.x) < 0.002 && Math.abs(this.rotationVelocity.y) < 0.002) {
        this.checkRaycastClick();
      }
      this.isDragging = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    el.addEventListener('mousedown', onPointerDown);
    el.addEventListener('touchstart', onPointerDown, { passive: true });

    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      this.width = el.clientWidth || window.innerWidth;
      this.height = el.clientHeight || window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      if (this.particleMesh) {
        this.particleMesh.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
      }
    });
  }

  setMorphState(stateIndex) {
    this.targetMorph = stateIndex;
    audio.confirm();
  }

  checkRaycastClick() {
    if (!this.camera || !this.pillarNodes) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hitBoxes = this.pillarNodes.map((n) => n.hitBox);
    const intersects = this.raycaster.intersectObjects(hitBoxes);

    if (intersects.length > 0) {
      const data = intersects[0].object.userData;
      audio.chime(data.index);
      if (this.onSelectDiscipline) {
        this.onSelectDiscipline(data.discipline);
      }
    }
  }

  animate() {
    if (!this.isAvailable || !this.renderer) return;
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    if (!this.isDragging) {
      this.worldRotation.y += this.rotationVelocity.y + 0.0025;
      this.worldRotation.x += this.rotationVelocity.x;
      this.rotationVelocity.x *= 0.94;
      this.rotationVelocity.y *= 0.94;
    }

    this.rootGroup.rotation.y = this.worldRotation.y;
    this.rootGroup.rotation.x = THREE.MathUtils.lerp(this.rootGroup.rotation.x, this.worldRotation.x, 0.1);

    this.morphProgress = THREE.MathUtils.lerp(this.morphProgress, this.targetMorph, 0.06);

    if (this.particleMesh) {
      const u = this.particleMesh.material.uniforms;
      u.uTime.value = elapsedTime;
      u.uMorph.value = this.morphProgress;
      u.uPointer.value.lerp(new THREE.Vector3(this.pointerTarget.x, this.pointerTarget.y, 0), 0.1);
    }

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hitBoxes = this.pillarNodes.map((n) => n.hitBox);
    const intersects = this.raycaster.intersectObjects(hitBoxes);
    const activeIndex = intersects.length > 0 ? intersects[0].object.userData.index : -1;

    if (activeIndex !== this.hoveredNodeIndex) {
      if (activeIndex !== -1) audio.click(1800, 0.015);
      this.hoveredNodeIndex = activeIndex;
    }

    this.pillarNodes.forEach((node, i) => {
      const isHovered = i === this.hoveredNodeIndex;
      node.outer.rotation.x += 0.015 * (i % 2 === 0 ? 1 : -1);
      node.outer.rotation.y += 0.02;

      const targetScale = isHovered ? 1.45 : 1.0;
      node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

      node.outer.material.emissiveIntensity = THREE.MathUtils.lerp(
        node.outer.material.emissiveIntensity,
        isHovered ? 2.5 : 0.8,
        0.15
      );

      node.group.position.y = node.basePos.y + Math.sin(elapsedTime * 2.0 + i) * 0.6;
    });

    this.renderer.render(this.scene, this.camera);

    this.drawCalls = this.renderer.info.render.calls;
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;
      if (this.onTelemetryUpdate) {
        this.onTelemetryUpdate({
          fps: this.fps,
          drawCalls: this.drawCalls,
          points: 3200,
          triangles: this.renderer.info.render.triangles,
        });
      }
    }
  }

  focusPillar(disciplineId) {
    const idx = DISCIPLINES.findIndex((d) => d.id === disciplineId);
    if (idx !== -1 && this.pillarNodes && this.pillarNodes[idx]) {
      const node = this.pillarNodes[idx];
      const targetAngle = -node.angle + Math.PI / 2;
      this.worldRotation.y = targetAngle;
      audio.chime(idx);
    }
  }
}
