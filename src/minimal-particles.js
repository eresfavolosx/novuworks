// ─────────────────────────────────────────────────────────────
//  MinimalParticleMatrix — Minimalist Interactive Particle Canvas
//  Inspired by the NovuWorks GPU particle monogram & constellation math.
//  Engineered by Fabián Vélez Vicente.
// ─────────────────────────────────────────────────────────────

export class MinimalParticleMatrix {
  constructor(canvasEl, options = {}) {
    this.canvas = canvasEl;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.options = options;

    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.mouse = { x: -9999, y: -9999, radius: 85, isDown: false };
    this.animFrameId = null;
    this.isVisible = true;
    this.isTabActive = !document.hidden;

    // Color palettes
    this.paletteMode = 'novu'; // 'novu', 'gold', 'emerald'
    this.theme = options.theme || document.documentElement.getAttribute('data-theme') || 'dark';

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 600;
    this.height = rect.height || 220;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // If particles already exist, re-anchor them
    if (this.particles.length > 0) {
      this.reanchorParticles();
    }
  }

  createParticles() {
    this.particles = [];
    const count = this.width < 480 ? 44 : 72;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const scale = Math.min(this.width * 0.44, this.height * 0.75);

    // Generate coordinate targets along "N" and "W"
    for (let i = 0; i < count; i++) {
      const t = i / count;
      let targetX = 0;
      let targetY = 0;
      let hueType = 'coral';

      if (t < 0.45) {
        // "N" monogram stroke (left vertical, diagonal, right vertical)
        const sub = t / 0.45;
        const nWidth = scale * 0.38;
        const nHeight = scale * 0.65;
        const leftX = centerX - scale * 0.45;

        if (sub < 0.33) {
          const s = sub / 0.33;
          targetX = leftX;
          targetY = centerY + nHeight * 0.5 - s * nHeight;
          hueType = 'coral';
        } else if (sub < 0.66) {
          const s = (sub - 0.33) / 0.33;
          targetX = leftX + s * nWidth;
          targetY = centerY - nHeight * 0.5 + s * nHeight;
          hueType = 'violet';
        } else {
          const s = (sub - 0.66) / 0.34;
          targetX = leftX + nWidth;
          targetY = centerY + nHeight * 0.5 - s * nHeight;
          hueType = 'violet';
        }
      } else if (t < 0.90) {
        // "W" monogram stroke (four angular legs)
        const sub = (t - 0.45) / 0.45;
        const wWidth = scale * 0.52;
        const wHeight = scale * 0.65;
        const leftX = centerX + scale * 0.04;

        if (sub < 0.25) {
          const s = sub / 0.25;
          targetX = leftX + s * (wWidth * 0.25);
          targetY = centerY - wHeight * 0.5 + s * wHeight;
          hueType = 'blue';
        } else if (sub < 0.50) {
          const s = (sub - 0.25) / 0.25;
          targetX = leftX + (wWidth * 0.25) + s * (wWidth * 0.25);
          targetY = centerY + wHeight * 0.5 - s * (wHeight * 0.7);
          hueType = 'blue';
        } else if (sub < 0.75) {
          const s = (sub - 0.50) / 0.25;
          targetX = leftX + (wWidth * 0.50) + s * (wWidth * 0.25);
          targetY = centerY - (wHeight * 0.2) + s * (wHeight * 0.7);
          hueType = 'gold';
        } else {
          const s = (sub - 0.75) / 0.25;
          targetX = leftX + (wWidth * 0.75) + s * (wWidth * 0.25);
          targetY = centerY + wHeight * 0.5 - s * wHeight;
          hueType = 'gold';
        }
      } else {
        // Ambient orbit nodes surrounding the monogram
        const angle = Math.random() * Math.PI * 2;
        const dist = (scale * 0.45) + Math.random() * (scale * 0.25);
        targetX = centerX + Math.cos(angle) * dist;
        targetY = centerY + Math.sin(angle) * (dist * 0.6);
        hueType = 'gold';
      }

      // Add controlled jitter
      targetX += (Math.random() - 0.5) * 8;
      targetY += (Math.random() - 0.5) * 8;

      this.particles.push({
        x: targetX + (Math.random() - 0.5) * 60,
        y: targetY + (Math.random() - 0.5) * 60,
        originX: targetX,
        originY: targetY,
        vx: 0,
        vy: 0,
        radius: 1.5 + Math.random() * 1.8,
        baseRadius: 1.5 + Math.random() * 1.8,
        hueType,
        angle: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        amplitude: 2.5 + Math.random() * 3.5,
      });
    }
  }

  reanchorParticles() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const scale = Math.min(this.width * 0.44, this.height * 0.75);

    const count = this.particles.length;
    for (let i = 0; i < count; i++) {
      const p = this.particles[i];
      const t = i / count;

      if (t < 0.45) {
        const sub = t / 0.45;
        const nWidth = scale * 0.38;
        const nHeight = scale * 0.65;
        const leftX = centerX - scale * 0.45;

        if (sub < 0.33) {
          const s = sub / 0.33;
          p.originX = leftX;
          p.originY = centerY + nHeight * 0.5 - s * nHeight;
        } else if (sub < 0.66) {
          const s = (sub - 0.33) / 0.33;
          p.originX = leftX + s * nWidth;
          p.originY = centerY - nHeight * 0.5 + s * nHeight;
        } else {
          const s = (sub - 0.66) / 0.34;
          p.originX = leftX + nWidth;
          p.originY = centerY + nHeight * 0.5 - s * nHeight;
        }
      } else if (t < 0.90) {
        const sub = (t - 0.45) / 0.45;
        const wWidth = scale * 0.52;
        const wHeight = scale * 0.65;
        const leftX = centerX + scale * 0.04;

        if (sub < 0.25) {
          const s = sub / 0.25;
          p.originX = leftX + s * (wWidth * 0.25);
          p.originY = centerY - wHeight * 0.5 + s * wHeight;
        } else if (sub < 0.50) {
          const s = (sub - 0.25) / 0.25;
          p.originX = leftX + (wWidth * 0.25) + s * (wWidth * 0.25);
          p.originY = centerY + wHeight * 0.5 - s * (wHeight * 0.7);
        } else if (sub < 0.75) {
          const s = (sub - 0.50) / 0.25;
          p.originX = leftX + (wWidth * 0.50) + s * (wWidth * 0.25);
          p.originY = centerY - (wHeight * 0.2) + s * (wHeight * 0.7);
        } else {
          const s = (sub - 0.75) / 0.25;
          p.originX = leftX + (wWidth * 0.75) + s * (wWidth * 0.25);
          p.originY = centerY + wHeight * 0.5 - s * wHeight;
        }
      } else {
        const angle = (i / count) * Math.PI * 2;
        const dist = (scale * 0.45);
        p.originX = centerX + Math.cos(angle) * dist;
        p.originY = centerY + Math.sin(angle) * (dist * 0.6);
      }
    }
  }

  getColor(hueType, alpha = 1) {
    const isLight = this.theme === 'light';

    if (this.paletteMode === 'gold') {
      return isLight ? `rgba(180, 83, 9, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;
    }
    if (this.paletteMode === 'emerald') {
      return isLight ? `rgba(5, 150, 105, ${alpha})` : `rgba(16, 185, 129, ${alpha})`;
    }

    // Default 'novu' palette
    switch (hueType) {
      case 'coral':
        return isLight ? `rgba(225, 29, 72, ${alpha})` : `rgba(224, 86, 106, ${alpha})`;
      case 'violet':
        return isLight ? `rgba(124, 58, 237, ${alpha})` : `rgba(139, 82, 200, ${alpha})`;
      case 'blue':
        return isLight ? `rgba(37, 99, 235, ${alpha})` : `rgba(61, 99, 230, ${alpha})`;
      case 'gold':
      default:
        return isLight ? `rgba(180, 83, 9, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    // Cursor tracking
    const updateMouse = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = clientX - rect.left;
      this.mouse.y = clientY - rect.top;
    };

    this.canvas.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY));
    this.canvas.addEventListener('mouseenter', (e) => {
      updateMouse(e.clientX, e.clientY);
      this.mouse.radius = 110;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        this.mouse.radius = 120;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    // Tap/Click for shockwave
    this.canvas.addEventListener('click', (e) => {
      updateMouse(e.clientX, e.clientY);
      this.warp(this.mouse.x, this.mouse.y);
    });

    // Visibility Observer (0% CPU when scrolled away)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }

    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
    });
  }

  warp(originX, originY) {
    const cx = typeof originX === 'number' && originX > 0 ? originX : this.width / 2;
    const cy = typeof originY === 'number' && originY > 0 ? originY : this.height / 2;

    this.particles.forEach((p) => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = Math.max(0, 160 - dist) / 160;
      const angle = Math.atan2(dy, dx);
      p.vx += Math.cos(angle) * force * 14;
      p.vy += Math.sin(angle) * force * 14;
      p.radius = p.baseRadius * (1 + force * 2);
    });
  }

  setTheme(theme) {
    this.theme = theme;
  }

  cyclePalette() {
    if (this.paletteMode === 'novu') this.paletteMode = 'gold';
    else if (this.paletteMode === 'gold') this.paletteMode = 'emerald';
    else this.paletteMode = 'novu';
    return this.paletteMode;
  }

  update() {
    const spring = 0.045;
    const friction = 0.88;

    this.particles.forEach((p) => {
      // Harmonic breathing drift
      p.angle += p.speed;
      const targetX = p.originX + Math.cos(p.angle) * p.amplitude;
      const targetY = p.originY + Math.sin(p.angle) * (p.amplitude * 0.7);

      // Spring towards origin
      const dxOrigin = targetX - p.x;
      const dyOrigin = targetY - p.y;
      p.vx += dxOrigin * spring;
      p.vy += dyOrigin * spring;

      // Mouse repulsion
      const dxMouse = this.mouse.x - p.x;
      const dyMouse = this.mouse.y - p.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < this.mouse.radius && distMouse > 0) {
        const force = (this.mouse.radius - distMouse) / this.mouse.radius;
        const angle = Math.atan2(dyMouse, dxMouse);
        p.vx -= Math.cos(angle) * force * 7;
        p.vy -= Math.sin(angle) * force * 7;
        p.radius = p.baseRadius + force * 2.5;
      } else {
        p.radius += (p.baseRadius - p.radius) * 0.1;
      }

      // Apply friction and position
      p.vx *= friction;
      p.vy *= friction;
      p.x += p.vx;
      p.y += p.vy;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isLight = this.theme === 'light';
    const maxDist = this.width < 480 ? 38 : 50;

    // 1. Draw connecting filament lines
    this.ctx.lineWidth = 0.75;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isLight ? 0.35 : 0.45);
          this.ctx.strokeStyle = this.getColor(p1.hueType, alpha);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // 2. Draw glowing particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Soft outer aura
      this.ctx.fillStyle = this.getColor(p.hueType, isLight ? 0.25 : 0.35);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
      this.ctx.fill();

      // Sharp central particle core
      this.ctx.fillStyle = this.getColor(p.hueType, isLight ? 0.85 : 0.95);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  start() {
    const loop = () => {
      if (this.isVisible && this.isTabActive) {
        this.update();
        this.draw();
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}
