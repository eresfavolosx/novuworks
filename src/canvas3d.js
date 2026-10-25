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
    this.width = window.innerWidth || containerEl.clientWidth || 1440;
    this.height = window.innerHeight || containerEl.clientHeight || 900;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.startTime = performance.now();
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

    // Morph state: 0 = Monogram (Novu Works Particle - Default), 1 = Ribbon (Spiral Growth Flow), 2 = AI Prism
    this.activeMode = 0;
    this.modeTransitions = [1, 0, 0]; // opacities/scales of the 3 modes

    // Device Capability & Adaptive Resource Profile (Guards lower-end devices from hoarding resources)
    this.deviceTier = this.detectDeviceTier();
    this.lastRenderTime = 0;
    this.isVisibleInViewport = true;
    this.isTabVisible = !document.hidden;
    this.scratchVec3 = new THREE.Vector3();

    // Visualizer & Initial Loading state
    this.isVisualizerMode = false;
    this.isInitialLoading = typeof document !== 'undefined' && Boolean(document.getElementById('particle-loading-screen'));
    this.targetRootPosition = new THREE.Vector3(0, 0, 0);
    this.targetRootScale = new THREE.Vector3(1.25, 1.25, 1.25);
    this.targetCameraZ = 46;

    // Telemetry tracking
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.drawCalls = 0;

    this.init();
  }

  detectDeviceTier() {
    if (typeof window === 'undefined') return { isLowEnd: false, isMobile: false, maxFps: 60, dpr: 1.5 };
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 8;
    const isSaveData = Boolean(navigator.connection?.saveData);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isLowEnd = cores <= 4 || memory <= 4 || isSaveData || prefersReducedMotion;
    if (isLowEnd && document.documentElement) {
      document.documentElement.classList.add('low-spec-device');
    }

    const dpr = isLowEnd ? 1.0 : (isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 1.75));
    const maxFps = isLowEnd ? 30 : 60;

    return {
      isLowEnd,
      isMobile,
      cores,
      memory,
      maxFps,
      dpr,
    };
  }

  init() {
    try {
      this.width = Math.max(window.innerWidth || 0, this.container.clientWidth || 0, 320);
      this.height = Math.max(window.innerHeight || 0, this.container.clientHeight || 0, 320);

      // 1. Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x050507, 0.015);

      // 2. Camera with cinematic focal length
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
      this.camera.position.set(0, 0, 46);

      // 3. Adaptive WebGL Renderer (Power & Memory Efficient for Lower-End Hardware)
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'default',
        antialias: !this.deviceTier.isLowEnd,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(this.deviceTier.dpr);
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
      this.rootGroup.position.copy(this.targetRootPosition);
      this.rootGroup.scale.copy(this.targetRootScale);

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
      this.initError = { message: err.message, stack: err.stack };
      this.isAvailable = false;
      this.container.style.display = 'none';
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 01: NW Monogram Emblem (Gold & Platinum Particle Matrix)
  // ─────────────────────────────────────────────────────────────
  buildParticleMonogram() {
    const COUNT = this.deviceTier.isLowEnd ? 1100 : (this.deviceTier.isMobile ? 1800 : 2600);
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
        uOpacity: { value: this.currentTheme === 'light' ? 0.22 : 0.75 },
        uIsLight: { value: this.currentTheme === 'light' ? 1.0 : 0.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uPointer;
        uniform float uOpacity;
        uniform float uIsLight;
        uniform float uPixelRatio;

        attribute vec3 color;
        attribute float size;
        attribute float rand;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Minimalist theme adaptation: soft platinum/champagne in light mode
          vec3 baseColor = color;
          if (uIsLight > 0.5) {
            vec3 lightGold = vec3(0.77, 0.66, 0.50);
            vec3 lightPlatinum = vec3(0.58, 0.64, 0.72);
            baseColor = mix(lightPlatinum, lightGold, rand);
          }
          vColor = baseColor;
          vec3 p = position;

          // Gentle organic luxury breathing
          p.x += sin(uTime * 1.0 + rand * 6.28) * 0.22;
          p.y += cos(uTime * 1.2 + rand * 6.28) * 0.22;
          p.z += sin(uTime * 0.8 + rand * 6.28) * 0.25;

          // Responsive cursor repulsion
          vec3 toPointer = p - uPointer;
          float dist = length(toPointer);
          if (dist < 10.0) {
            float force = (1.0 - dist / 10.0);
            p += normalize(toPointer + 0.001) * force * 2.5;
          }

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float pSize = uIsLight > 0.5 ? size * 0.85 : size;
          gl_PointSize = pSize * uPixelRatio * (340.0 / -mvPosition.z);
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
    this.monogramMesh.scale.set(1, 1, 1);
    this.monogramMesh.visible = true;
    this.rootGroup.add(this.monogramMesh);
  }

  // ─────────────────────────────────────────────────────────────
  // 02: Möbius Growth Flow (Parametric Liquid Titanium Ribbon)
  // ─────────────────────────────────────────────────────────────
  buildMobiusRibbon() {
    this.ribbonGroup = new THREE.Group();

    // High density Torus Knot scaled adaptively to device tier
    const radialSegs = this.deviceTier.isLowEnd ? 80 : (this.deviceTier.isMobile ? 100 : 140);
    const tubularSegs = this.deviceTier.isLowEnd ? 16 : (this.deviceTier.isMobile ? 18 : 22);
    const knotGeo = new THREE.TorusKnotGeometry(7.5, 1.4, radialSegs, tubularSegs, 2, 3);

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

  createCircleParticleTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  // ─────────────────────────────────────────────────────────────
  // Ambient Cosmic Dust & Kinetic Stellar Spark Matrix
  // (Minimalist, Round, High-End Luxury Celestial Particle Field)
  // ─────────────────────────────────────────────────────────────
  buildAmbientDust() {
    const COUNT = this.deviceTier.isLowEnd ? 110 : (this.deviceTier.isMobile ? 160 : 240);
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const gold = new THREE.Color('#d4af37');
    const champagne = new THREE.Color('#f5e6be');
    const sapphire = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#8b52c8');
    const coral = new THREE.Color('#e0566a');

    for (let i = 0; i < COUNT; i++) {
      // Gentle volumetric distribution enveloping mobile and desktop viewports
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = -5.0 - Math.random() * 30.0;

      speeds[i] = 0.3 + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;

      // Soft color variation across Novu Works palette
      const r = Math.random();
      const pColor = new THREE.Color();
      if (r < 0.45) {
        pColor.copy(gold).lerp(champagne, Math.random());
      } else if (r < 0.72) {
        pColor.copy(sapphire);
      } else if (r < 0.88) {
        pColor.copy(violet);
      } else {
        pColor.copy(coral);
      }

      col[i * 3] = pColor.r;
      col[i * 3 + 1] = pColor.g;
      col[i * 3 + 2] = pColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const circleTexture = this.createCircleParticleTexture();

    const mat = new THREE.PointsMaterial({
      vertexColors: true,
      map: circleTexture,
      size: 1.45,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.dustMesh = new THREE.Points(geo, mat);
    this.dustSpeeds = speeds;
    this.dustPhases = phases;
    this.dustBasePositions = new Float32Array(pos);
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
      const beadGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.25,
        emissive: 0x221808,
        emissiveIntensity: 0.2,
      });
      const pearl = new THREE.Mesh(beadGeo, beadMat);
      group.add(pearl);

      // Outer delicate hairline halo
      const haloGeo = new THREE.TorusGeometry(0.36, 0.012, 10, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xfff0c8,
        transparent: true,
        opacity: 0.2,
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

    if (this.isInitialLoading) {
      // Prominently centered in upper viewport for cinematic NovuWorks particle startup animation
      this.targetRootPosition.set(0, isDesktop ? 1.6 : 2.0, 0);
      const s = isDesktop ? 1.45 : 1.15;
      this.targetRootScale.set(s, s, s);
      return;
    }

    if (this.isVisualizerMode) {
      // Centered and monumentally scaled for full-canvas zen mode
      this.targetRootPosition.set(0, 0, 0);
      const s = isDesktop ? 1.25 : 0.85;
      this.targetRootScale.set(s, s, s);
    } else if (isDesktop) {
      // Offset 3D sculpture to the open right half on desktop to frame the hero section without text collision
      this.targetRootPosition.set(11.5, 0.2, -7.0);
      this.targetRootScale.set(0.92, 0.92, 0.92);
    } else {
      // Centered and monumentally scaled on mobile/tablet for rich dynamic particle immersion
      this.targetRootPosition.set(0, -0.6, -4.5);
      this.targetRootScale.set(0.95, 0.95, 0.95);
    }
  }

  finishInitialLoading() {
    this.isInitialLoading = false;
    this.updateRootGroupPosition();
  }

  // ─────────────────────────────────────────────────────────────
  // Event Listeners & Interaction Handling (Passive Background Tracking + Active Orbit Drag)
  // ─────────────────────────────────────────────────────────────
  bindEvents() {
    const onPointerDown = (e) => {
      if (!this.isVisualizerMode) return;
      if (e.target && e.target.closest && e.target.closest('#visualizer-hud')) return;
      this.isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.dragStart = { x: clientX, y: clientY };
      if (this.renderer?.domElement) this.renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.pointer.x = (clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(clientY / window.innerHeight) * 2 + 1;

      this.pointerTarget.set(this.pointer.x * 18, this.pointer.y * 12);

      if (this.isDragging && this.isVisualizerMode) {
        const deltaX = clientX - this.dragStart.x;
        const deltaY = clientY - this.dragStart.y;
        this.targetWorldRotation.y += deltaX * 0.007;
        this.targetWorldRotation.x = THREE.MathUtils.clamp(
          this.targetWorldRotation.x + deltaY * 0.007,
          -Math.PI * 0.45,
          Math.PI * 0.45
        );
        this.dragStart = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.renderer?.domElement) {
          this.renderer.domElement.style.cursor = this.isVisualizerMode ? 'grab' : 'default';
        }
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    window.addEventListener('wheel', (e) => {
      if (!this.isVisualizerMode) return;
      if (e.target && e.target.closest && e.target.closest('#visualizer-hud')) return;
      this.targetCameraZ = THREE.MathUtils.clamp((this.targetCameraZ || 46) + e.deltaY * 0.025, 24, 75);
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(this.deviceTier.dpr);
      this.updateRootGroupPosition();
      if (this.monogramMesh) {
        this.monogramMesh.material.uniforms.uPixelRatio.value = this.deviceTier.dpr;
      }
    });

    // Resource Guard 1: Pause WebGL render loop when browser tab is hidden or minimized
    document.addEventListener('visibilitychange', () => {
      this.isTabVisible = !document.hidden;
      if (document.hidden) {
        this.pause();
      } else if (this.isVisibleInViewport) {
        this.resume();
      }
    });

    // Resource Guard 2: Pause WebGL render loop when canvas container is scrolled out of view
    if ('IntersectionObserver' in window && this.container) {
      this.viewportObserver = new IntersectionObserver(
        (entries) => {
          const isIntersecting = entries[0]?.isIntersecting ?? true;
          this.isVisibleInViewport = isIntersecting;
          if (!isIntersecting) {
            this.pause();
          } else if (this.isTabVisible) {
            this.resume();
          }
        },
        { threshold: 0.01 }
      );
      this.viewportObserver.observe(this.container);
    }
  }

  setVisualizerMode(active) {
    this.isVisualizerMode = !!active;
    if (this.isVisualizerMode) {
      this.isPaused = false;
      this.isVisibleInViewport = true;
      this.resume();
    }
    this.updateRootGroupPosition();
    if (this.isVisualizerMode && this.rootGroup && this.targetRootPosition && this.targetRootScale) {
      this.rootGroup.position.copy(this.targetRootPosition);
      this.rootGroup.scale.copy(this.targetRootScale);
    }
    if (this.monogramMesh?.material?.uniforms?.uOpacity) {
      this.monogramMesh.material.uniforms.uOpacity.value = this.isVisualizerMode ? 0.95 : 0.0;
    }
    if (this.renderer && this.camera) {
      this.width = window.innerWidth || this.width;
      this.height = window.innerHeight || this.height;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }
    if (this.renderer?.domElement) {
      this.renderer.domElement.style.cursor = this.isVisualizerMode ? 'grab' : 'default';
    }
    if (!this.isVisualizerMode) {
      this.targetCameraZ = 46;
      this.targetWorldRotation.x = 0.12;
    } else {
      this.targetCameraZ = 46;
    }
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
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Smooth Animation Frame Loop (Adaptive FPS Capped for Lower-End Devices)
  // ─────────────────────────────────────────────────────────────
  animate() {
    if (!this.isAvailable || !this.renderer) return;
    requestAnimationFrame(() => this.animate());
    if (this.isPaused || !this.isVisibleInViewport || !this.isTabVisible) return;

    // Background particles are strictly displayed on the Startup Screen or dedicated Secondary Screen (Visualizer Mode)
    // When browsing the portfolio normally, stop rendering to guarantee 100% clean reading & zero battery drain
    if (!this.isVisualizerMode && !this.isInitialLoading) {
      return;
    }

    // Throttle rendering on lower-end devices or battery saving modes to prevent thermal throttling & hoarding
    const now = performance.now();
    const minFrameInterval = 1000 / (this.deviceTier?.maxFps || 60);
    if (now - this.lastRenderTime < minFrameInterval - 1.5) {
      return;
    }
    this.lastRenderTime = now;

    const elapsedTime = (now - this.startTime) * 0.001;

    // Silky smooth rotation inertia
    if (!this.isDragging) {
      this.targetWorldRotation.y += this.isVisualizerMode ? 0.0032 : 0.0022;
      // Soft ambient tilt based on cursor position
      if (!this.isVisualizerMode) {
        this.targetWorldRotation.x = 0.12 + this.pointer.y * 0.18;
      }
    }

    this.worldRotation.y = THREE.MathUtils.lerp(this.worldRotation.y, this.targetWorldRotation.y, 0.05);
    this.worldRotation.x = THREE.MathUtils.lerp(this.worldRotation.x, this.targetWorldRotation.x, 0.05);

    this.rootGroup.rotation.y = this.worldRotation.y;
    this.rootGroup.rotation.x = this.worldRotation.x;

    // Smooth root group translation and scaling
    if (this.targetRootPosition && this.targetRootScale) {
      this.rootGroup.position.lerp(this.targetRootPosition, 0.06);
      this.rootGroup.scale.lerp(this.targetRootScale, 0.06);
    }

    // Smooth camera zoom
    if (this.camera && this.targetCameraZ) {
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, this.targetCameraZ, 0.08);
    }

    // Smooth mode crossfade transitions
    for (let i = 0; i < 3; i++) {
      const target = this.activeMode === i ? 1.0 : 0.0;
      this.modeTransitions[i] = THREE.MathUtils.lerp(this.modeTransitions[i], target, 0.07);
    }

    // 01: Monogram (Only compute when visible)
    if (this.monogramMesh && this.modeTransitions[0] > 0.005) {
      const u = this.monogramMesh.material.uniforms;
      u.uTime.value = elapsedTime;
      u.uOpacity.value = this.modeTransitions[0];
      const gyroInfluenceX = (this.spatialTiltX || 0) * 12;
      const gyroInfluenceY = (this.spatialTiltY || 0) * 9;
      const combinedX = this.pointerTarget.x + gyroInfluenceX;
      const combinedY = this.pointerTarget.y + gyroInfluenceY;
      this.scratchVec3.set(combinedX, combinedY, 0);
      u.uPointer.value.lerp(this.scratchVec3, 0.1);
      this.monogramMesh.visible = this.modeTransitions[0] > 0.01;
      const s0 = 0.8 + 0.2 * this.modeTransitions[0];
      this.monogramMesh.scale.set(s0, s0, s0);
    } else if (this.monogramMesh && this.monogramMesh.visible) {
      this.monogramMesh.visible = false;
    }

    // Camera spatial 6DoF parallax (subtle high-end depth)
    if (this.camera && !this.isVisualizerMode) {
      const targetCamX = (this.spatialTiltX || 0) * 3.5 + this.pointer.x * 1.5;
      const targetCamY = (this.spatialTiltY || 0) * 2.5 + this.pointer.y * 1.0;
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetCamX, 0.05);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetCamY, 0.05);
    }

    // 02: Möbius Ribbon (Only rotate when visible)
    if (this.ribbonGroup && this.modeTransitions[1] > 0.005) {
      const t = this.modeTransitions[1];
      this.ribbonGroup.visible = t > 0.01;
      const s1 = (0.75 + 0.25 * t) * t;
      this.ribbonGroup.scale.set(s1, s1, s1);
      this.ribbonSolid.rotation.x = elapsedTime * 0.4;
      this.ribbonSolid.rotation.y = elapsedTime * 0.6;
      this.ribbonWire.rotation.x = -elapsedTime * 0.35;
      this.ribbonWire.rotation.y = -elapsedTime * 0.55;
      this.ribbonRing.rotation.z = elapsedTime * 0.25;
    } else if (this.ribbonGroup && this.ribbonGroup.visible) {
      this.ribbonGroup.visible = false;
    }

    // 03: Quantum AI Prism (Only rotate when visible)
    if (this.prismGroup && this.modeTransitions[2] > 0.005) {
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
    } else if (this.prismGroup && this.prismGroup.visible) {
      this.prismGroup.visible = false;
    }

    // Ambient Dust drift: 100% GPU rotation for silky performance; bypass CPU vertex loops on low-end
    if (this.dustMesh) {
      const speedMult = 0.85;
      this.dustMesh.rotation.y = elapsedTime * (0.038 * speedMult);
      this.dustMesh.rotation.x = Math.sin(elapsedTime * 0.4) * (0.045 * speedMult);

      // On non-low-end devices, update vertex waves at throttled frequency
      if (!this.deviceTier.isLowEnd && (this.frameCount % 2 === 0)) {
        const posAttr = this.dustMesh.geometry.attributes.position;
        if (posAttr && this.dustBasePositions && this.dustSpeeds) {
          const arr = posAttr.array;
          const base = this.dustBasePositions;
          const count = arr.length / 3;
          const pointerX = this.pointerTarget.x;
          const pointerY = this.pointerTarget.y;

          for (let i = 0; i < count; i += 2) {
            const spd = this.dustSpeeds[i];
            const phs = this.dustPhases[i];
            
            // Organic undulating wave kinetics
            const waveY = Math.sin(elapsedTime * spd + phs) * 1.15;
            const waveX = Math.cos(elapsedTime * (spd * 0.7) + phs) * 0.75;
            const waveZ = Math.sin(elapsedTime * 0.5 + phs) * 0.6;

            let targetX = base[i * 3] + waveX;
            let targetY = base[i * 3 + 1] + waveY;
            let targetZ = base[i * 3 + 2] + waveZ;

            // Subtle cursor magnetic repulsion
            const dx = targetX - pointerX;
            const dy = targetY - pointerY;
            const distSq = dx * dx + dy * dy;
            if (distSq < 144) {
              const dist = Math.sqrt(distSq) || 1;
              const force = (12 - dist) / 12 * 2.2;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }

            arr[i * 3] = targetX;
            arr[i * 3 + 1] = targetY;
            arr[i * 3 + 2] = targetZ;
          }
          posAttr.needsUpdate = true;
        }
      }
    }

    // Subtle ambient animation on orbital pearls (zero UI collision)
    this.pillarNodes.forEach((node, i) => {
      node.halo.rotation.z += 0.015;
      node.group.position.y = node.basePos.y + Math.sin(elapsedTime * 1.6 + i) * 0.35;
    });

    this.renderer.render(this.scene, this.camera);

    this.drawCalls = this.renderer.info.render.calls;
    this.frameCount++;
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

  setTheme(theme) {
    this.currentTheme = theme;
    const isLight = theme === 'light';
    if (this.scene && this.scene.fog) {
      this.scene.fog.color.setHex(isLight ? 0xf8f9fb : 0x050507);
    }
    if (this.dustMesh && this.dustMesh.material) {
      this.dustMesh.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      this.dustMesh.material.color.setHex(isLight ? 0x946800 : 0xd4af37);
      this.dustMesh.material.opacity = isLight ? 0.20 : 0.35;
      this.dustMesh.material.needsUpdate = true;
    }
    if (this.monogramMesh && this.monogramMesh.material) {
      if (this.monogramMesh.material.uniforms?.uOpacity) {
        this.monogramMesh.material.uniforms.uOpacity.value = isLight ? 0.22 : 0.75;
      }
      if (this.monogramMesh.material.uniforms?.uIsLight) {
        this.monogramMesh.material.uniforms.uIsLight.value = isLight ? 1.0 : 0.0;
      }
      this.monogramMesh.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      this.monogramMesh.material.needsUpdate = true;
    }
    if (this.orbitRing && this.orbitRing.material) {
      this.orbitRing.material.opacity = isLight ? 0.12 : 0.24;
      this.orbitRing.material.needsUpdate = true;
    }
    if (this.pillarNodes) {
      this.pillarNodes.forEach((node) => {
        if (node.pearl?.material) {
          node.pearl.material.opacity = isLight ? 0.35 : 0.9;
        }
        if (node.halo?.material) {
          node.halo.material.opacity = isLight ? 0.12 : 0.3;
        }
      });
    }
  }

  setSpatialTilt(tiltX, tiltY) {
    this.spatialTiltX = tiltX;
    this.spatialTiltY = tiltY;
  }
}
