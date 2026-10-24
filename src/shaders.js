// ─────────────────────────────────────────────────────────────
//  GLSL library. Every surface in the world shares `bendWorld`,
//  a vertex-space trick that curves the infinite straight road
//  into sweeping turns and a planet-like horizon — the physics
//  stay perfectly straight while the visuals swerve.
// ─────────────────────────────────────────────────────────────

export const BEND = /* glsl */ `
uniform vec2 uBend;
uniform float uCamZ;
vec3 bendWorld(vec3 p){
  float d = max(uCamZ - p.z, 0.0);
  p.x += uBend.x * d * d;
  p.y -= uBend.y * d * d;
  return p;
}
`;

export const BRAND_FN = /* glsl */ `
uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
vec3 brand(float t){
  t = clamp(t, 0.0, 1.0);
  return t < 0.5 ? mix(uC1, uC2, t * 2.0) : mix(uC2, uC3, t * 2.0 - 1.0);
}
`;

export const NOISE = /* glsl */ `
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++){ s += a * snoise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return s;
}
`;

// ── Terrain ────────────────────────────────────────────────
export const terrainVert = /* glsl */ `
${BEND}
${NOISE}
uniform float uRoad;
varying vec3 vWorld;
varying float vDist;
float terrainH(vec2 p){
  float ax = abs(p.x);
  float valley = smoothstep(uRoad + 8.0, uRoad + 70.0, ax);
  float n = fbm(p * 0.010) * 0.5 + 0.5;
  float r = 1.0 - abs(snoise(p * 0.005 + 3.7));
  float far = 0.55 + 0.45 * smoothstep(60.0, 240.0, ax);
  return valley * (n * 42.0 + r * r * 38.0) * far;
}
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  wp.y = terrainH(wp.xz);
  vWorld = wp.xyz;
  wp.xyz = bendWorld(wp.xyz);
  vec4 mv = viewMatrix * wp;
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

export const terrainFrag = /* glsl */ `
${BRAND_FN}
uniform float uTime;
uniform float uRoad;
uniform vec3 uFog;
uniform float uFogDensity;
uniform vec3 uShock;       // xy = world xz of origin, z = age (s)
uniform vec2 uCar;         // world xz of car
uniform float uSpeed;      // 0..1+
varying vec3 vWorld;
varying float vDist;

float gridLine(vec2 p, float scale, float width){
  vec2 q = p / scale;
  vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
  return 1.0 - min(min(g.x, g.y) / width, 1.0);
}

void main(){
  float ax = abs(vWorld.x);
  float h = vWorld.y;
  vec3 lineCol = brand(vWorld.x / 260.0 + 0.5);

  float g = gridLine(vWorld.xz, 8.0, 1.1);
  float g2 = gridLine(vWorld.xz, 40.0, 1.6);
  float peak = smoothstep(4.0, 70.0, h);

  // shockwave from the last station passed
  float sd = length(vWorld.xz - uShock.xy);
  float wave = smoothstep(7.0, 0.0, abs(sd - uShock.z * 220.0)) * exp(-uShock.z * 0.9);

  // soft energy pulse travelling with the car
  float cd = length(vWorld.xz - uCar);
  float carGlow = exp(-cd * 0.03) * 0.6;

  vec3 col = vec3(0.010, 0.005, 0.024) + vec3(0.02, 0.008, 0.04) * peak;
  col += lineCol * (g * (0.35 + peak * 1.9 + carGlow + wave * 7.0) + g2 * 0.35);

  // road
  float roadMask = 1.0 - smoothstep(uRoad, uRoad + 1.2, ax);
  if (roadMask > 0.0){
    vec3 road = vec3(0.016, 0.012, 0.03);
    float edge = smoothstep(0.45, 0.0, abs(ax - (uRoad - 0.4)));
    float dash = step(0.5, fract(vWorld.z / 12.0));
    float center = smoothstep(0.22, 0.0, ax) * dash;
    float lanes = smoothstep(0.12, 0.0, abs(ax - uRoad * 0.5)) * step(0.75, fract(vWorld.z / 6.0)) * 0.4;
    // chevrons of light racing down the edge lines
    float racer = pow(fract(vWorld.z / 90.0 + uTime * 0.6), 18.0);
    road += lineCol * edge * (3.0 + racer * 5.0);
    road += vec3(1.0, 0.95, 1.0) * (center * 1.3 + lanes);
    road += lineCol * wave * 2.0 + vec3(0.05, 0.02, 0.09) * carGlow;
    col = mix(col, road, roadMask);
  }

  float fog = 1.0 - exp(-pow(vDist * uFogDensity, 1.7));
  col = mix(col, uFog, clamp(fog, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

// ── Sky dome ───────────────────────────────────────────────
export const skyVert = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

export const skyFrag = /* glsl */ `
${BRAND_FN}
uniform float uTime;
uniform vec3 uHorizon;
uniform vec3 uZenith;
uniform float uWarp;
varying vec3 vDir;
float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
void main(){
  vec3 d = normalize(vDir);
  float h = d.y;
  vec3 col = mix(uHorizon, uZenith, smoothstep(-0.02, 0.45, h));
  // aurora band
  float band = exp(-pow((h - 0.16 - 0.03 * sin(d.x * 6.0 + uTime * 0.2)) * 9.0, 2.0));
  col += brand(0.5 + 0.5 * sin(d.x * 3.0 + uTime * 0.1)) * band * 0.18;
  // sun glow
  float sg = max(dot(d, normalize(vec3(0.0, 0.06, -1.0))), 0.0);
  col += uC1 * pow(sg, 10.0) * 0.55 + uC2 * pow(sg, 3.0) * 0.12;
  // stars
  vec3 p = d * 260.0;
  vec3 cell = floor(p);
  float r = hash(cell);
  float star = step(0.986, r) * smoothstep(0.42, 0.0, length(fract(p) - 0.5));
  star *= smoothstep(0.03, 0.35, h) * (0.6 + 0.4 * sin(uTime * 2.5 + r * 90.0));
  col += vec3(0.9, 0.85, 1.0) * star * (1.6 + uWarp * 2.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

// ── Synthwave sun ──────────────────────────────────────────
export const sunVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

export const sunFrag = /* glsl */ `
${BRAND_FN}
uniform float uTime;
varying vec2 vUv;
void main(){
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float y = vUv.y;
  vec3 top = vec3(1.0, 0.62, 0.42);
  vec3 col = y > 0.55 ? mix(uC1, top, (y - 0.55) / 0.45) : mix(uC2, uC1, y / 0.55);
  // stripes that widen toward the bottom
  float stripe = 1.0;
  if (y < 0.55){
    float k = fract(y * 16.0 + uTime * 0.25);
    float w = (0.55 - y) * 1.35;
    stripe = smoothstep(w - 0.04, w + 0.04, k);
  }
  float disc = (1.0 - smoothstep(0.985, 1.0, r)) * stripe;
  float halo = exp(-max(r - 1.0, 0.0) * 5.0) * 0.35 * smoothstep(1.0, 1.02, r) * (1.0 - smoothstep(1.0, 2.0, r));
  vec3 outCol = col * disc * 2.2 + uC1 * halo;
  float a = max(disc, halo);
  gl_FragColor = vec4(outCol, a);
}
`;

// ── Speed streaks (instanced quads) ────────────────────────
export const streakVert = /* glsl */ `
${BEND}
${BRAND_FN}
attribute vec4 aRand;
uniform float uSpeed;
uniform float uWarp;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  float L = 720.0;
  vec3 c;
  c.x = (aRand.x - 0.5) * 170.0;
  c.x += sign(c.x) * 9.0;
  c.y = 0.6 + pow(aRand.y, 1.6) * 55.0;
  c.z = uCamZ + 30.0 - mod(uCamZ + 30.0 - aRand.z * L, L);
  float len = 0.3 + uSpeed * 1.5 + uWarp * 28.0 * (0.5 + aRand.w);
  vec3 wp = c + vec3(0.0, 0.0, (position.y + 0.5) * len);
  wp = bendWorld(wp);
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  mv.x += position.x * (0.07 + aRand.w * 0.1);
  vUv = uv;
  vColor = brand(aRand.x);
  float near = smoothstep(L, L * 0.6, uCamZ + 30.0 - c.z);
  vAlpha = near * (0.25 + uSpeed * 0.5 + uWarp);
  gl_Position = projectionMatrix * mv;
}
`;

export const streakFrag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  float a = (1.0 - abs(vUv.x - 0.5) * 2.0) * smoothstep(0.0, 0.4, vUv.y) * vAlpha;
  gl_FragColor = vec4(vColor * 2.2 * a, a);
}
`;

// ── GPU particle logo ──────────────────────────────────────
export const logoVert = /* glsl */ `
${BEND}
attribute vec3 aColor;
attribute vec4 aRand;
uniform float uTime;
uniform float uExplode;
uniform float uSize;
uniform float uPR;
uniform vec3 uPointer;
uniform float uPointerOn;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec3 p = position;
  float e = uExplode;
  // idle breathing wave
  p.z += sin(p.x * 0.22 + uTime * 1.7) * 0.55 + sin(p.y * 0.5 + uTime * 1.1) * 0.25;
  // pointer field (repel + lift)
  vec2 dp = p.xy - uPointer.xy;
  float infl = exp(-dot(dp, dp) / 28.0) * uPointerOn;
  p.xy += normalize(dp + 1e-4) * infl * 5.0;
  p.z += infl * 6.0 * (0.5 + aRand.w);
  // explode / assemble
  vec3 dir = normalize(aRand.xyz * 2.0 - 1.0);
  float ang = e * (1.0 + aRand.w * 5.0);
  float s = sin(ang), c = cos(ang);
  p.xy = mat2(c, -s, s, c) * p.xy;
  p += dir * e * (30.0 + aRand.w * 140.0);
  p.z += e * e * aRand.w * 160.0;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  wp.xyz = bendWorld(wp.xyz);
  vec4 mv = viewMatrix * wp;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * (0.7 + aRand.w * 0.8) * (80.0 / max(-mv.z, 1.0));
  vColor = aColor;
  vAlpha = (1.0 - smoothstep(0.55, 1.0, e)) * (0.75 + 0.25 * sin(uTime * 3.0 + aRand.w * 40.0));
}
`;

export const logoFrag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  gl_FragColor = vec4(vColor * (1.3 + smoothstep(0.25, 0.0, d)) * a, a);
}
`;

// ── Post: lens (chromatic aberration, vignette, grain) ─────
export const LensShader = {
  uniforms: {
    tDiffuse: { value: null },
    uCA: { value: 0.0015 },
    uVignette: { value: 0.9 },
    uTime: { value: 0 },
    uFlash: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uCA; uniform float uVignette; uniform float uTime; uniform float uFlash;
    varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 dir = vUv - 0.5;
      float d = length(dir);
      vec2 off = dir * uCA * (0.5 + d * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      col *= mix(1.0, smoothstep(0.95, 0.2, d), uVignette);
      col += (rand(vUv * 800.0 + uTime) - 0.5) * 0.025;
      col += vec3(0.75, 0.6, 1.0) * uFlash;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
