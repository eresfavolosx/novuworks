// ─────────────────────────────────────────────────────────────
//  Fabián Vélez Vicente — Luxury 3D Spatial Canvas (Three.js WebGL)
//  Minimalist · Gallery-Grade · Gold & Titanium Physical Materials
//  Three Interactive Morphing Sculptures:
//    01: NW Monogram (Gold & Platinum Particle Matrix)
//    02: Möbius Growth Flow (Liquid Titanium Parametric Ribbon)
//    03: Quantum AI Prism (Obsidian & Gold Faceted Monolith)
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

    // Interaction & inertia state
    this.pointer = new THREE.Vector2(0, 0);
    this.pointerTarget = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.hoveredNodeIndex = -1;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.worldRotation = { x: 0.12, y: 0 };
    this.targetWorldRotation = { x: 0.12, y: 0 };

    // Morph state: 0 = Monogram, 1 = Ribbon, 2 = AI Prism
    this.activeMode = 0;
    this.modeTransitions = [1, 0, 0]; // opacities/scales of the 3 modes

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
      this.scene.fog = new THREE.FogExp2(0x050507, 0.015);

      // 2. Camera with cinematic focal length
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
      this.camera.position.set(0, 0, 46);

      // 3. High-Performance WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.container.appendChild(this.renderer.domElement);
      this.isAvailable = true;

      // 4. Luxury Gallery Lighting (Warm Gold Key, Champagne Rim, Deep Obsidian Fill)
      const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.65);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffe6b3, 2.4);
      keyLight.position.set(24, 32, 24);
      this.scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
      rimLight.position.set(-24, -20, 18);
      this.scene.add(rimLight);

      const topLight = new THREE.PointLight(0xffffff, 1.2, 80);
      topLight.position.set(0, 25, 10);
      this.scene.add(topLight);

      // 5. Root Transform Group (Deep Background Placement)
      this.rootGroup = new THREE.Group();
      this.scene.add(this.rootGroup);
      this.updateRootGroupPosition();

      // Build Sculptures
      this.buildParticleMonogram();
      this.buildMobiusRibbon();
      this.buildQuantumPrism();
      this.buildAmbientDust();
      this.buildArchitecturePillars();

      // 6. Bind Event Listeners
      this.bindEvents();

      // 7. Start Render Loop
      this.animate();
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      this.isAvailable = false;
      this.container.style.display = 'none';
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 01: NW Monogram Emblem (Gold & Platinum Particle Matrix)
  // ─────────────────────────────────────────────────────────────
  buildParticleMonogram() {
    const COUNT = 3400;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT);

    const goldColor = new THREE.Color('#d4af37');
    const champagneColor = new THREE.Color('#f3e5ab');
    const platinumColor = new THREE.Color('#e2e8f0');

    for (let i = 0; i < COUNT; i++) {
      randoms[i] = Math.random();
      sizes[i] = 1.2 + Math.random() * 2.2;

      const t = i / COUNT;
      let x = 0, y = 0, z = (Math.random() - 0.5) * 3.2;

      if (t < 0.44) {
        // "N" stroke
        const sub = t / 0.44;
        if (sub < 0.33) {
          x = -13 + (Math.random() - 0.5) * 1.2;
          y = -9 + (sub / 0.33) * 18 + (Math.random() - 0.5) * 0.8;
        } else if (sub < 0.66) {
          const s = (sub - 0.33) / 0.33;
          x = -13 + s * 9 + (Math.random() - 0.5) * 1.0;
          y = 9 - s * 18 + (Math.random() - 0.5) * 0.8;
        } else {
          x = -4 + (Math.random() - 0.5) * 1.2;
          y = -9 + ((sub - 0.66) / 0.34) * 18 + (Math.random() - 0.5) * 0.8;
        }
      } else if (t < 0.92) {
        // "W" stroke
        const sub = (t - 0.44) / 0.48;
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
        x += (Math.random() - 0.5) * 1.1;
        y += (Math.random() - 0.5) * 1.1;
      } else {
        // Floating luxury halo aura
        const angle = Math.random() * Math.PI * 2;
        const radius = 14 + Math.random() * 8;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * (radius * 0.65);
        z = (Math.random() - 0.5) * 8;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradation across monogram: Novu Works signature gradient (coral -> violet -> blue) fused with gold
      const nwCoral = new THREE.Color('#e0566a');
      const nwViolet = new THREE.Color('#8b52c8');
      const nwBlue = new THREE.Color('#3d63e6');
      const goldColor = new THREE.Color('#d4af37');

      const pColor = new THREE.Color();
      const gradT = THREE.MathUtils.clamp((x + 14) / 28, 0, 1);
      if (gradT < 0.4) {
        pColor.lerpColors(nwCoral, nwViolet, gradT / 0.4);
      } else if (gradT < 0.75) {
        pColor.lerpColors(nwViolet, nwBlue, (gradT - 0.4) / 0.35);
      } else {
        pColor.lerpColors(nwBlue, goldColor, (gradT - 0.75) / 0.25);
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('rand', new THREE.BufferAttribute(randoms, 1));

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uOpacity: { value: 1.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uPointer;
        uniform float uOpacity;
        uniform float uPixelRatio;

        attribute vec3 color;
        attribute float size;
        attribute float rand;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec3 p = position;

          // Gentle organic luxury breathing
          p.x += sin(uTime * 1.2 + rand * 6.28) * 0.28;
          p.y += cos(uTime * 1.5 + rand * 6.28) * 0.28;
          p.z += sin(uTime * 1.0 + rand * 6.28) * 0.35;

          // Responsive cursor repulsion
          vec3 toPointer = p - uPointer;
          float dist = length(toPointer);
          if (dist < 10.0) {
            float force = (1.0 - dist / 10.0);
            p += normalize(toPointer + 0.001) * force * 3.2;
          }

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = size * uPixelRatio * (360.0 / -mvPosition.z);
          vAlpha = smoothstep(95.0, 18.0, -mvPosition.z) * uOpacity * (0.8 + 0.2 * sin(uTime * 2.2 + rand * 8.0));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float d = length(coord);
          if (d > 0.5) discard;

          // Soft luxury specular radial dropoff
          float intensity = pow(1.0 - (d * 2.0), 1.6);
          vec3 glow = vColor * (1.1 + 0.9 * intensity);
          gl_FragColor = vec4(glow, vAlpha * intensity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.monogramMesh = new THREE.Points(geometry, shaderMaterial);
    this.rootGroup.add(this.monogramMesh);
  }

  // ─────────────────────────────────────────────────────────────
  // 02: Möbius Growth Flow (Parametric Liquid Titanium Ribbon)
  // ─────────────────────────────────────────────────────────────
  buildMobiusRibbon() {
    this.ribbonGroup = new THREE.Group();

    // High density Torus Knot representing compounding acquisition loop
    const knotGeo = new THREE.TorusKnotGeometry(7.5, 1.4, 180, 24, 2, 3);

    // Physical metallic gold & platinum material
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
      emissive: 0x221a08,
      emissiveIntensity: 0.35,
    });
    this.ribbonSolid = new THREE.Mesh(knotGeo, knotMat);
    this.ribbonGroup.add(this.ribbonSolid);

    // Delicate wireframe exoskeleton with Novu Works violet chromatic glow
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8b52c8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    this.ribbonWire = new THREE.Mesh(knotGeo, wireMat);
    this.ribbonWire.scale.set(1.02, 1.02, 1.02);
    this.ribbonGroup.add(this.ribbonWire);

    // Inner orbiting light ring with Novu Works coral aura
    const ringGeo = new THREE.TorusGeometry(11.5, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe0566a,
      transparent: true,
      opacity: 0.45,
    });
    this.ribbonRing = new THREE.Mesh(ringGeo, ringMat);
    this.ribbonRing.rotation.x = Math.PI / 3;
    this.ribbonGroup.add(this.ribbonRing);

    this.ribbonGroup.scale.set(0.001, 0.001, 0.001);
    this.ribbonGroup.visible = false;
    this.rootGroup.add(this.ribbonGroup);
  }

  // ─────────────────────────────────────────────────────────────
  // 03: Quantum AI Prism (Obsidian & Gold Faceted Monolith)
  // ─────────────────────────────────────────────────────────────
  buildQuantumPrism() {
    this.prismGroup = new THREE.Group();

    // Central faceted obsidian icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(6.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x14141a,
      metalness: 0.95,
      roughness: 0.12,
      flatShading: true,
      emissive: 0x2a2010,
      emissiveIntensity: 0.45,
    });
    this.prismCore = new THREE.Mesh(coreGeo, coreMat);
    this.prismGroup.add(this.prismCore);

    // Outer gold hairline cage
    const cageGeo = new THREE.IcosahedronGeometry(8.2, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      wireframe: true,
      metalness: 1.0,
      roughness: 0.2,
      emissive: 0xd4af37,
      emissiveIntensity: 0.35,
    });
    this.prismCage = new THREE.Mesh(cageGeo, cageMat);
    this.prismGroup.add(this.prismCage);

    // Dual gimbal orbital rings with Novu Works violet & sapphire hues
    const ring1Geo = new THREE.TorusGeometry(11.0, 0.05, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8b52c8, transparent: true, opacity: 0.55 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x3d63e6, transparent: true, opacity: 0.55 });
    this.prismRing1 = new THREE.Mesh(ring1Geo, ringMat1);
    this.prismRing2 = new THREE.Mesh(ring1Geo, ringMat2);
    this.prismRing2.rotation.y = Math.PI / 2;
    this.prismGroup.add(this.prismRing1);
    this.prismGroup.add(this.prismRing2);

    this.prismGroup.scale.set(0.001, 0.001, 0.001);
    this.prismGroup.visible = false;
    this.rootGroup.add(this.prismGroup);
  }

  // ─────────────────────────────────────────────────────────────
  // Ambient Cosmic Dust (Subtle Depth & Luxury Atmosphere, Deep Z)
  // ─────────────────────────────────────────────────────────────
  buildAmbientDust() {
    const COUNT = 320;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      // Strictly placed behind the text plane (z < -14) so zero particles ever overlap text
      pos[i * 3 + 2] = -14.0 - Math.random() * 30.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.55,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    this.dustMesh = new THREE.Points(geo, mat);
    this.rootGroup.add(this.dustMesh);
  }

  // ─────────────────────────────────────────────────────────────
  // 8 Architecture Pillars (Floating Gold Pearls on Orbit Ring)
  // Scaled & Offset Strictly to the Right Sector
  // ─────────────────────────────────────────────────────────────
  buildArchitecturePillars() {
    this.pillarNodes = [];
    const count = DISCIPLINES.length;
    const radius = 10.5;

    // Fine equatorial gold hairline ring
    const ringGeometry = new THREE.TorusGeometry(radius, 0.035, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.24,
    });
    this.orbitRing = new THREE.Mesh(ringGeometry, ringMat);
    this.orbitRing.rotation.x = Math.PI / 2.35;
    this.rootGroup.add(this.orbitRing);

    DISCIPLINES.forEach((disc, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2.0) * 1.2;

      const group = new THREE.Group();
      group.position.set(x, y, z);

      // Delicate gold & titanium ambient pearl bead (purely ambient, zero text overlap)
      const beadGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.25,
        emissive: 0x221808,
        emissiveIntensity: 0.35,
      });
      const pearl = new THREE.Mesh(beadGeo, beadMat);
      group.add(pearl);

      // Outer delicate hairline halo
      const haloGeo = new THREE.TorusGeometry(0.55, 0.018, 12, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xfff0c8,
        transparent: true,
        opacity: 0.3,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      group.add(halo);

      this.rootGroup.add(group);
      this.pillarNodes.push({
        group,
        pearl,
        halo,
        disc,
        basePos: new THREE.Vector3(x, y, z),
        angle,
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Deep Background Layer Positioning (Prevents Any UI Overlap)
  // ─────────────────────────────────────────────────────────────
  updateRootGroupPosition() {
    if (!this.rootGroup) return;
    const isDesktop = (window.innerWidth || this.width) >= 1024;
    if (isDesktop) {
      // Offset 3D sculpture to the open right half on desktop to frame the hero section without text collision
      this.rootGroup.position.set(7.5, 0.5, -2.0);
      this.rootGroup.scale.set(1.05, 1.05, 1.05);
    } else {
      // Centered and softly scaled on mobile/tablet so text remains crisp and readable
      this.rootGroup.position.set(0, -3.0, -12.0);
      this.rootGroup.scale.set(0.65, 0.65, 0.65);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Event Listeners & Interaction Handling (Passive Background Tracking)
  // ─────────────────────────────────────────────────────────────
  bindEvents() {
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.pointer.x = (clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(clientY / window.innerHeight) * 2 + 1;

      this.pointerTarget.set(this.pointer.x * 18, this.pointer.y * 12);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.updateRootGroupPosition();
      if (this.monogramMesh) {
        this.monogramMesh.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
      }
    });
  }

  setMorphState(stateIndex) {
    this.activeMode = stateIndex;
    audio.confirm();
  }

  checkRaycastClick() {
    // Disabled on background canvas to prevent accidental modal popups or click collisions
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.clock.start();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Smooth Animation Frame Loop
  // ─────────────────────────────────────────────────────────────
  animate() {
    if (!this.isAvailable || !this.renderer) return;
    requestAnimationFrame(() => this.animate());
    if (this.isPaused) return;

    const elapsedTime = this.clock.getElapsedTime();

    // Silky smooth rotation inertia
    if (!this.isDragging) {
      this.targetWorldRotation.y += 0.0022;
      // Soft ambient tilt based on cursor position
      this.targetWorldRotation.x = 0.12 + this.pointer.y * 0.18;
    }

    this.worldRotation.y = THREE.MathUtils.lerp(this.worldRotation.y, this.targetWorldRotation.y, 0.05);
    this.worldRotation.x = THREE.MathUtils.lerp(this.worldRotation.x, this.targetWorldRotation.x, 0.05);

    this.rootGroup.rotation.y = this.worldRotation.y;
    this.rootGroup.rotation.x = this.worldRotation.x;

    // Smooth mode crossfade transitions
    for (let i = 0; i < 3; i++) {
      const target = this.activeMode === i ? 1.0 : 0.0;
      this.modeTransitions[i] = THREE.MathUtils.lerp(this.modeTransitions[i], target, 0.07);
    }

    // 01: Monogram
    if (this.monogramMesh) {
      const u = this.monogramMesh.material.uniforms;
      u.uTime.value = elapsedTime;
      u.uOpacity.value = this.modeTransitions[0];
      u.uPointer.value.lerp(new THREE.Vector3(this.pointerTarget.x, this.pointerTarget.y, 0), 0.1);
      this.monogramMesh.visible = this.modeTransitions[0] > 0.01;
      const s0 = 0.8 + 0.2 * this.modeTransitions[0];
      this.monogramMesh.scale.set(s0, s0, s0);
    }

    // 02: Möbius Ribbon
    if (this.ribbonGroup) {
      const t = this.modeTransitions[1];
      this.ribbonGroup.visible = t > 0.01;
      const s1 = (0.75 + 0.25 * t) * t;
      this.ribbonGroup.scale.set(s1, s1, s1);
      this.ribbonSolid.rotation.x = elapsedTime * 0.4;
      this.ribbonSolid.rotation.y = elapsedTime * 0.6;
      this.ribbonWire.rotation.x = -elapsedTime * 0.35;
      this.ribbonWire.rotation.y = -elapsedTime * 0.55;
      this.ribbonRing.rotation.z = elapsedTime * 0.25;
    }

    // 03: Quantum AI Prism
    if (this.prismGroup) {
      const t = this.modeTransitions[2];
      this.prismGroup.visible = t > 0.01;
      const s2 = (0.75 + 0.25 * t) * t;
      this.prismGroup.scale.set(s2, s2, s2);
      this.prismCore.rotation.x = elapsedTime * 0.35;
      this.prismCore.rotation.y = elapsedTime * 0.45;
      this.prismCage.rotation.x = -elapsedTime * 0.28;
      this.prismCage.rotation.y = -elapsedTime * 0.38;
      this.prismRing1.rotation.x = elapsedTime * 0.5;
      this.prismRing2.rotation.y = elapsedTime * 0.5;
    }

    // Ambient Dust drift
    if (this.dustMesh) {
      this.dustMesh.rotation.y = elapsedTime * 0.03;
    }

    // Subtle ambient animation on orbital pearls (zero UI collision)
    this.pillarNodes.forEach((node, i) => {
      node.halo.rotation.z += 0.015;
      node.group.position.y = node.basePos.y + Math.sin(elapsedTime * 1.6 + i) * 0.35;
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
      this.targetWorldRotation.y = targetAngle;
      audio.chime(idx);
    }
  }
}
