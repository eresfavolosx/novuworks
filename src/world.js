// ─────────────────────────────────────────────────────────────
//  World construction: terrain, sky, sun, roadside, car,
//  stations and the GPU particle logo. Everything procedural —
//  the only bitmap asset is the Novu Works logo itself.
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import * as SH from './shaders.js';
import { BRAND, STATIONS } from './content.js';

export const ROAD = 7;
export const SPACING = 640;
export const N = STATIONS.length;
export const LANE_X = ROAD * 0.5;

export const FOG = new THREE.Color('#1a0b30');

export const U = {
  bend: { value: new THREE.Vector2(0, 0.00004) },
  camZ: { value: 0 },
  time: { value: 0 },
  c1: { value: new THREE.Color(BRAND.c1) },
  c2: { value: new THREE.Color(BRAND.c2) },
  c3: { value: new THREE.Color(BRAND.c3) },
};
const bendU = () => ({ uBend: U.bend, uCamZ: U.camZ });
const brandU = () => ({ uC1: U.c1, uC2: U.c2, uC3: U.c3 });

/** Brand gradient colour at t∈[0,1], optionally boosted into HDR for bloom. */
export function brandColor(t, intensity = 1) {
  const c = new THREE.Color();
  t = THREE.MathUtils.clamp(t, 0, 1);
  if (t < 0.5) c.lerpColors(U.c1.value, U.c2.value, t * 2);
  else c.lerpColors(U.c2.value, U.c3.value, t * 2 - 1);
  return c.multiplyScalar(intensity);
}

/** Patch any built-in material so it follows the world-bend. */
export function bendify(mat) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uBend = U.bend;
    sh.uniforms.uCamZ = U.camZ;
    sh.vertexShader = SH.BEND + sh.vertexShader.replace(
      '#include <project_vertex>',
      `vec4 mvPosition = vec4( transformed, 1.0 );
      #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
      #endif
      vec4 bwp = modelMatrix * mvPosition;
      bwp.xyz = bendWorld( bwp.xyz );
      mvPosition = viewMatrix * bwp;
      gl_Position = projectionMatrix * mvPosition;`
    );
  };
  return mat;
}

const neon = (color, opts = {}) =>
  bendify(new THREE.MeshBasicMaterial({ color, ...opts }));
const neonLines = (color) =>
  bendify(new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1 }));

// ─────────────────────────────────────────────────────────────
//  Terrain
// ─────────────────────────────────────────────────────────────
function makeTerrain(segScale = 1) {
  const W = 640, L = 2600;
  const segX = Math.round(200 * segScale), segZ = Math.round(520 * segScale);
  const geo = new THREE.PlaneGeometry(W, L, segX, segZ);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      ...bendU(), ...brandU(),
      uTime: U.time,
      uRoad: { value: ROAD },
      uFog: { value: FOG },
      uFogDensity: { value: 1 / 1500 },
      uShock: { value: new THREE.Vector3(0, 0, 99) },
      uCar: { value: new THREE.Vector2() },
      uSpeed: { value: 0 },
    },
    vertexShader: SH.terrainVert,
    fragmentShader: SH.terrainFrag,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  const cell = L / segZ;
  mesh.userData.follow = (camZ) => {
    mesh.position.z = Math.round((camZ - L / 2 + 260) / cell) * cell;
  };
  return mesh;
}

// ─────────────────────────────────────────────────────────────
//  Sky + sun
// ─────────────────────────────────────────────────────────────
function makeSky() {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      ...brandU(),
      uTime: U.time,
      uHorizon: { value: FOG },
      uZenith: { value: new THREE.Color('#030110') },
      uWarp: { value: 0 },
    },
    vertexShader: SH.skyVert,
    fragmentShader: SH.skyFrag,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(3800, 48, 24), mat);
  sky.renderOrder = -2;
  sky.frustumCulled = false;
  return sky;
}

function makeSun() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { ...brandU(), uTime: U.time },
    vertexShader: SH.sunVert,
    fragmentShader: SH.sunFrag,
    transparent: true,
    depthWrite: false,
  });
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  sun.scale.setScalar(620);
  sun.frustumCulled = false;
  return sun;
}

// ─────────────────────────────────────────────────────────────
//  Roadside: light pylons + arches (instanced, recycled)
// ─────────────────────────────────────────────────────────────
function makeRoadside() {
  const group = new THREE.Group();
  const PY_SP = 34, PY_N = 72;
  const pyGeo = new THREE.BoxGeometry(0.3, 6, 0.3).translate(0, 3, 0);
  const pylons = new THREE.InstancedMesh(pyGeo, neon(0xffffff), PY_N * 2);
  pylons.frustumCulled = false;
  for (let i = 0; i < PY_N * 2; i++) {
    pylons.setColorAt(i, brandColor(i % 2 ? 1 : 0, 2.4));
  }
  group.add(pylons);

  const AR_SP = 160, AR_N = 16;
  const arGeo = new THREE.TorusGeometry(ROAD + 6, 0.11, 6, 64, Math.PI);
  const arches = new THREE.InstancedMesh(arGeo, neon(0xffffff), AR_N);
  arches.frustumCulled = false;
  for (let i = 0; i < AR_N; i++) arches.setColorAt(i, brandColor((i % 5) / 4, 2.0));
  group.add(arches);

  const m = new THREE.Matrix4();
  group.userData.follow = (camZ) => {
    const start = Math.floor(camZ / PY_SP) * PY_SP + PY_SP * 2;
    for (let i = 0; i < PY_N; i++) {
      const z = start - i * PY_SP;
      m.makeTranslation(-(ROAD + 2.6), 0, z); pylons.setMatrixAt(i * 2, m);
      m.makeTranslation(ROAD + 2.6, 0, z); pylons.setMatrixAt(i * 2 + 1, m);
    }
    pylons.instanceMatrix.needsUpdate = true;
    const aStart = Math.floor(camZ / AR_SP) * AR_SP + AR_SP;
    for (let i = 0; i < AR_N; i++) {
      const z = aStart - i * AR_SP;
      m.makeTranslation(0, 0, z); arches.setMatrixAt(i, m);
      arches.setColorAt(i, brandColor((((Math.round(-z / AR_SP) % 5) + 5) % 5) / 4, 2.0));
    }
    arches.instanceMatrix.needsUpdate = true;
    arches.instanceColor.needsUpdate = true;
  };
  return group;
}

// ─────────────────────────────────────────────────────────────
//  Speed streaks
// ─────────────────────────────────────────────────────────────
function makeStreaks(count = 2400) {
  const base = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.getAttribute('position'));
  geo.setAttribute('uv', base.getAttribute('uv'));
  const r = new Float32Array(count * 4);
  for (let i = 0; i < r.length; i++) r[i] = Math.random();
  geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(r, 4));
  geo.instanceCount = count;
  const mat = new THREE.ShaderMaterial({
    uniforms: { ...bendU(), ...brandU(), uSpeed: { value: 0 }, uWarp: { value: 0 } },
    vertexShader: SH.streakVert,
    fragmentShader: SH.streakFrag,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  return mesh;
}

// ─────────────────────────────────────────────────────────────
//  The car — a low-poly electric wedge with neon edges
// ─────────────────────────────────────────────────────────────
function makeCar() {
  const car = new THREE.Group();
  const profile = new THREE.Shape();
  // (u = along length, +u = front ; v = height)
  profile.moveTo(2.55, 0.42);
  profile.lineTo(2.62, 0.92);
  profile.lineTo(0.15, 1.62);
  profile.lineTo(-2.35, 1.12);
  profile.lineTo(-2.42, 0.42);
  profile.lineTo(2.55, 0.42);
  const W = 2.05;
  const body = new THREE.ExtrudeGeometry(profile, { depth: W, bevelEnabled: false });
  body.rotateY(Math.PI / 2);
  body.translate(-W / 2, 0, 0);

  const bodyMat = bendify(new THREE.MeshStandardMaterial({
    color: 0x0c0b14, metalness: 0.85, roughness: 0.28, envMapIntensity: 1.2,
  }));
  const bodyMesh = new THREE.Mesh(body, bodyMat);
  car.add(bodyMesh);

  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(body, 20), neonLines(brandColor(0.5, 2.6)));
  car.add(edges);

  // glass strip
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.92, 0.05, 1.7),
    bendify(new THREE.MeshStandardMaterial({ color: 0x05060c, metalness: 1, roughness: 0.05 }))
  );
  glass.position.set(0, 1.42, -0.55);
  glass.rotation.x = -0.28;
  car.add(glass);

  // front light bar
  const lightbar = new THREE.Mesh(new THREE.BoxGeometry(W * 0.98, 0.07, 0.06), neon(new THREE.Color(4, 4, 4.6)));
  lightbar.position.set(0, 0.9, -2.63);
  car.add(lightbar);

  // tail light bar
  const tail = new THREE.Mesh(new THREE.BoxGeometry(W * 0.98, 0.1, 0.06), neon(brandColor(0, 4)));
  tail.position.set(0, 1.05, 2.37);
  car.add(tail);

  // wheels
  const wheelGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.32, 24).rotateZ(Math.PI / 2);
  const wheelMat = bendify(new THREE.MeshStandardMaterial({ color: 0x050508, roughness: 0.7 }));
  const rimGeo = new THREE.TorusGeometry(0.34, 0.035, 6, 24).rotateY(Math.PI / 2);
  const wheels = [];
  [[-1, -1.6], [1, -1.6], [-1, 1.55], [1, 1.55]].forEach(([sx, z], k) => {
    const w = new THREE.Group();
    w.add(new THREE.Mesh(wheelGeo, wheelMat));
    const rim = new THREE.Mesh(rimGeo, neon(brandColor(k % 2 ? 1 : 0, 3)));
    rim.position.x = sx * 0.17;
    w.add(rim);
    // spokes so rotation is visible
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.06), neon(brandColor(0.5, 2)));
    spoke.position.x = sx * 0.17;
    w.add(spoke);
    w.position.set(sx * (W / 2 + 0.02), 0.46, z);
    car.add(w);
    wheels.push(w);
  });

  // underglow pool
  const glowMat = bendify(new THREE.MeshBasicMaterial({
    map: radialTexture(), color: brandColor(0.5, 1.4), transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(7, 9).rotateX(-Math.PI / 2), glowMat);
  glow.position.y = 0.05;
  car.add(glow);

  // headlight beam on the road
  const beamMat = bendify(new THREE.MeshBasicMaterial({
    map: beamTexture(), color: new THREE.Color(0.9, 0.85, 1.0), transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55,
  }));
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(9, 34).rotateX(-Math.PI / 2), beamMat);
  beam.position.set(0, 0.06, -19.5);
  car.add(beam);

  car.userData = { wheels, edges, glow, tail };
  return car;
}

function radialTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,0.9)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0.25)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function beamTexture() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 256;
  const g = c.getContext('2d');
  const v = g.createLinearGradient(0, 256, 0, 0);
  v.addColorStop(0, 'rgba(255,255,255,0.8)');
  v.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = v;
  g.beginPath(); g.moveTo(22, 256); g.lineTo(42, 256); g.lineTo(64, 0); g.lineTo(0, 0); g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c);
  return t;
}

// ─────────────────────────────────────────────────────────────
//  Particle logo (sampled from the real logo pixels)
// ─────────────────────────────────────────────────────────────
export function makeLogoPoints(logo, { width = 46, density = 2, size = 1.0 } = {}) {
  const { pts, bbox } = logo;
  const scale = width / bbox.w;
  const cx = bbox.x + bbox.w / 2, cy = bbox.y + bbox.h / 2;
  const n = pts.length * density;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const rnd = new Float32Array(n * 4);
  const toLin = (v) => Math.pow(v / 255, 2.2);
  let k = 0;
  for (const p of pts) {
    for (let d = 0; d < density; d++) {
      pos[k * 3] = (p.x - cx + (Math.random() - 0.5)) * scale;
      pos[k * 3 + 1] = -(p.y - cy + (Math.random() - 0.5)) * scale;
      pos[k * 3 + 2] = (Math.random() - 0.5) * 1.4;
      col[k * 3] = toLin(p.r); col[k * 3 + 1] = toLin(p.g); col[k * 3 + 2] = toLin(p.b);
      rnd[k * 4] = Math.random(); rnd[k * 4 + 1] = Math.random();
      rnd[k * 4 + 2] = Math.random(); rnd[k * 4 + 3] = Math.random();
      k++;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 4));
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      ...bendU(),
      uTime: U.time,
      uExplode: { value: 0 },
      uSize: { value: size },
      uPR: { value: Math.min(window.devicePixelRatio, 2) },
      uPointer: { value: new THREE.Vector3(999, 999, 0) },
      uPointerOn: { value: 0 },
    },
    vertexShader: SH.logoVert,
    fragmentShader: SH.logoFrag,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.userData.count = n;
  return points;
}

// ─────────────────────────────────────────────────────────────
//  Stations — one gate per service + engineer + HQ
// ─────────────────────────────────────────────────────────────
function makeLabel(st, i, color) {
  const c = document.createElement('canvas');
  c.width = 2048; c.height = 400;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = '600 64px "Space Grotesk", system-ui, sans-serif';
  g.fillStyle = 'rgba(255,255,255,0.75)';
  g.fillText(`${String(i + 1).padStart(2, '0')}  ·  ${st.kicker.toUpperCase()}`, 1024, 90);
  g.font = '700 150px "Space Grotesk", system-ui, sans-serif';
  const grd = g.createLinearGradient(300, 0, 1748, 0);
  grd.addColorStop(0, BRAND.c1); grd.addColorStop(0.5, '#c9b6ff'); grd.addColorStop(1, BRAND.c3);
  g.shadowColor = color.getStyle(); g.shadowBlur = 30;
  g.fillStyle = grd;
  let title = st.title;
  let fs = 150;
  while (g.measureText(title).width > 1900 && fs > 70) { fs -= 8; g.font = `700 ${fs}px "Space Grotesk", system-ui, sans-serif`; }
  g.fillText(title, 1024, 250);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = bendify(new THREE.MeshBasicMaterial({
    map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    color: new THREE.Color(0.92, 0.92, 0.92),
  }));
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30 * (400 / 2048)), mat);
  return mesh;
}

/** A hologram = glowing edges + faint additive fill */
function holo(geo, color, { wire = false, fill = 0.07, threshold = 25 } = {}) {
  const grp = new THREE.Group();
  const lineGeo = wire ? new THREE.WireframeGeometry(geo) : new THREE.EdgesGeometry(geo, threshold);
  grp.add(new THREE.LineSegments(lineGeo, neonLines(color)));
  if (fill > 0) {
    grp.add(new THREE.Mesh(geo, neon(color.clone().multiplyScalar(0.5), {
      transparent: true, opacity: fill, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })));
  }
  return grp;
}

function gearGeometry(teeth, rOut, rIn, hole, depth) {
  const s = new THREE.Shape();
  const steps = teeth * 4;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = (i % 4 < 2) ? rOut : rIn;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
  }
  const h = new THREE.Path();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  s.holes.push(h);
  return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 12 }).center();
}

function makeIcon(id, color, logo) {
  const g = new THREE.Group();
  const anim = [];
  switch (id) {
    case 'seo': {
      const ring = holo(new THREE.TorusGeometry(2.1, 0.38, 8, 40), color);
      const handle = holo(new THREE.CylinderGeometry(0.32, 0.32, 2.6, 8), color);
      handle.position.set(2.4, -2.4, 0); handle.rotation.z = Math.PI / 4;
      const lens = holo(new THREE.CircleGeometry(1.7, 32), color, { fill: 0.15 });
      g.add(ring, handle, lens);
      anim.push((t) => { g.rotation.y = Math.sin(t * 0.8) * 0.6; });
      break;
    }
    case 'infra': {
      const leds = [];
      for (let k = 0; k < 3; k++) {
        const box = holo(new THREE.BoxGeometry(6, 1.3, 3), color);
        box.position.y = (k - 1) * 1.7;
        g.add(box);
        for (let j = 0; j < 4; j++) {
          const led = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.1), neon(new THREE.Color(3, 3, 3)));
          led.position.set(-2.3 + j * 0.6, (k - 1) * 1.7, 1.56);
          g.add(led); leds.push(led);
        }
      }
      anim.push((t) => {
        g.rotation.y = Math.sin(t * 0.5) * 0.5;
        leds.forEach((l, j) => { l.visible = Math.sin(t * 6 + j * 2.1) > -0.2; });
      });
      break;
    }
    case 'software': {
      const bar = new THREE.BoxGeometry(0.45, 2.6, 0.45);
      const mk = (x, y, rz) => { const b = holo(bar, color); b.position.set(x, y, 0); b.rotation.z = rz; g.add(b); };
      mk(-3.0, 0.85, -Math.PI / 4); mk(-3.0, -0.85, Math.PI / 4);
      mk(3.0, 0.85, Math.PI / 4); mk(3.0, -0.85, -Math.PI / 4);
      const sl = holo(new THREE.BoxGeometry(0.45, 4.6, 0.45), color); sl.rotation.z = -0.35; g.add(sl);
      anim.push((t) => { g.rotation.y = Math.sin(t * 0.9) * 0.7; });
      break;
    }
    case 'bizdev': {
      const bars = [];
      [1.2, 2.2, 3.2, 4.6].forEach((h, k) => {
        const b = holo(new THREE.BoxGeometry(1.1, 1, 1.1).translate(0, 0.5, 0), color);
        b.position.set(-2.4 + k * 1.6, -2.4, 0); b.userData.h = h; g.add(b); bars.push(b);
      });
      const arrow = holo(new THREE.ConeGeometry(0.7, 1.4, 4), color);
      arrow.position.set(3.4, 2.9, 0); arrow.rotation.z = -0.6; g.add(arrow);
      anim.push((t) => {
        bars.forEach((b, k) => { b.scale.y = b.userData.h * (0.75 + 0.25 * Math.sin(t * 2 + k)); });
        g.rotation.y = Math.sin(t * 0.6) * 0.5;
      });
      break;
    }
    case 'marketing': {
      const horn = holo(new THREE.CylinderGeometry(0.7, 2.4, 4, 20, 1, true).rotateZ(-Math.PI / 2), color, { threshold: 1 });
      horn.position.x = -1;
      g.add(horn);
      const waves = [];
      for (let k = 0; k < 3; k++) {
        const w = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 4, 48).rotateY(Math.PI / 2), neon(color, { transparent: true }));
        w.position.x = 1.6; g.add(w); waves.push(w);
      }
      anim.push((t) => {
        waves.forEach((w, k) => {
          const f = (t * 0.6 + k / 3) % 1;
          w.position.x = 1.2 + f * 3.5; w.scale.setScalar(0.8 + f * 0.8);
          w.material.opacity = 1 - f;
        });
        g.rotation.y = Math.sin(t * 0.5) * 0.4 - 0.2;
      });
      break;
    }
    case 'automation': {
      const a = holo(gearGeometry(12, 2.4, 1.9, 0.8, 0.6), color);
      const b = holo(gearGeometry(8, 1.65, 1.25, 0.5, 0.6), color);
      a.position.x = -1.5; b.position.set(2.45, 1.2, 0);
      g.add(a, b);
      anim.push((t) => { a.rotation.z = t * 0.8; b.rotation.z = -t * 0.8 * (12 / 8) + 0.2; });
      break;
    }
    case 'ai': {
      const outer = holo(new THREE.IcosahedronGeometry(3.4, 1), color, { fill: 0.05 });
      const inner = holo(new THREE.IcosahedronGeometry(1.6, 0), color.clone().multiplyScalar(1.4), { fill: 0.2 });
      g.add(outer, inner);
      anim.push((t) => {
        outer.rotation.set(t * 0.3, t * 0.4, 0);
        inner.rotation.set(-t * 0.9, -t * 0.7, 0);
        inner.scale.setScalar(1 + Math.sin(t * 3) * 0.12);
      });
      break;
    }
    case 'bizinfra': {
      const blocks = [];
      for (let x = 0; x < 4; x++) for (let z = 0; z < 3; z++) {
        const h = 1 + ((x * 7 + z * 13) % 5) * 0.8;
        const b = holo(new THREE.BoxGeometry(1.1, 1, 1.1).translate(0, 0.5, 0), color);
        b.position.set((x - 1.5) * 1.5, -2.6, (z - 1) * 1.5);
        b.userData.h = h; g.add(b); blocks.push(b);
      }
      anim.push((t) => {
        g.rotation.y = t * 0.35;
        blocks.forEach((b, k) => { b.scale.y = b.userData.h * (0.85 + 0.15 * Math.sin(t * 1.5 + k)); });
      });
      break;
    }
    case 'engineer': {
      const knot = holo(new THREE.TorusKnotGeometry(2.3, 0.55, 90, 8, 2, 3), color, { wire: true, fill: 0.04 });
      g.add(knot);
      const rings = [];
      for (let k = 0; k < 3; k++) {
        const r = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.05, 4, 80), neon(brandColor(k / 2, 2.5)));
        r.rotation.set(Math.random() * 3, Math.random() * 3, 0); g.add(r); rings.push(r);
      }
      anim.push((t) => {
        knot.rotation.set(t * 0.4, t * 0.6, 0);
        rings.forEach((r, k) => { r.rotation.x += 0.004 * (k + 1); r.rotation.y += 0.006 * (k + 1); });
      });
      break;
    }
    case 'hq': {
      const pts = makeLogoPoints(logo, { width: 34, density: 2, size: 0.9 });
      g.add(pts);
      g.userData.logo = pts;
      break;
    }
  }
  g.userData.anim = anim;
  return g;
}

function makeStation(st, i, logo) {
  const group = new THREE.Group();
  const t = i / (N - 1);
  const color = brandColor(t, 2.6);

  // hexagonal gate
  const hex = new THREE.Mesh(new THREE.TorusGeometry(14, 0.38, 6, 6), neon(color));
  hex.position.y = 5;
  group.add(hex);
  const inner = new THREE.Mesh(new THREE.TorusGeometry(12.6, 0.08, 4, 6), neon(color.clone().multiplyScalar(0.8)));
  inner.position.y = 5;
  group.add(inner);

  // side pillars with data ticks
  const tickGeo = new THREE.BoxGeometry(0.9, 0.12, 0.12);
  const ticks = new THREE.InstancedMesh(tickGeo, neon(color), 40);
  const m = new THREE.Matrix4();
  for (let k = 0; k < 40; k++) {
    const side = k < 20 ? -1 : 1;
    m.makeTranslation(side * (ROAD + 4.6), 0.4 + (k % 20) * 0.7, 0);
    ticks.setMatrixAt(k, m);
  }
  group.add(ticks);

  const icon = makeIcon(st.id, color, logo);
  icon.position.y = st.id === 'hq' ? 9 : 10.5;
  group.add(icon);

  const label = makeLabel(st, i, color);
  label.position.y = 22.5;
  group.add(label);

  // floor ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(ROAD + 0.5, ROAD + 1.0, 64).rotateX(-Math.PI / 2), neon(color, { transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
  ring.position.y = 0.08;
  group.add(ring);

  const station = {
    i, st, group, hex, inner, icon, label, ring, color,
    flash: 0,
    update(time, dist, dt) {
      // dist = distance ahead of the car (negative = behind)
      inner.rotation.z = time * 0.25 * (i % 2 ? 1 : -1);
      icon.userData.anim.forEach((f) => f(time));
      icon.position.y = (st.id === 'hq' ? 9 : 10.5) + Math.sin(time * 1.2 + i) * 0.4;
      if (icon.userData.logo) {
        const u = icon.userData.logo.material.uniforms;
        const target = THREE.MathUtils.clamp((dist - 60) / 420, 0, 1);
        u.uExplode.value += (target - u.uExplode.value) * Math.min(1, dt * 2.5);
      }
      this.flash = Math.max(0, this.flash - dt * 1.4);
      const f = 1 + this.flash * 3;
      hex.scale.setScalar(1 + this.flash * 0.15);
      hex.material.color.copy(color).multiplyScalar(f);
      ring.scale.setScalar(1 + (1 - this.flash) * 0 + this.flash * 1.6);
    },
  };
  return station;
}

// ─────────────────────────────────────────────────────────────
//  World assembly
// ─────────────────────────────────────────────────────────────
export function createWorld({ logo, quality = 1 }) {
  const scene = new THREE.Scene();
  scene.fog = null;

  const sky = makeSky();
  const sun = makeSun();
  const terrain = makeTerrain(quality < 0.7 ? 0.6 : 1);
  const roadside = makeRoadside();
  const streaks = makeStreaks(quality < 0.7 ? 1200 : 2400);
  const car = makeCar();
  scene.add(sky, sun, terrain, roadside, streaks, car);

  scene.add(new THREE.HemisphereLight(0x8a7bff, 0x1a0820, 0.6));
  const key = new THREE.DirectionalLight(0xffb0c0, 1.4);
  key.position.set(-20, 30, -60);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6a8cff, 1.2);
  rim.position.set(30, 10, 40);
  scene.add(rim);

  const stations = STATIONS.map((st, i) => {
    const s = makeStation(st, i, logo);
    scene.add(s.group);
    return s;
  });

  // intro hero logo floating above the start line
  const hero = makeLogoPoints(logo, { width: 44, density: 3, size: 1.0 });
  hero.position.set(0, 13, -46);
  scene.add(hero);

  return { scene, sky, sun, terrain, roadside, streaks, car, stations, hero };
}
