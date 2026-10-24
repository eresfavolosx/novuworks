// ─────────────────────────────────────────────────────────────
//  Novu Works — Executive Audio Synthesizer (Zero-file Web Audio)
//  Synthesizes tactile UI feedback, harmonic node chimes, and
//  an optional ambient focus tone for an ultra-premium feel.
// ─────────────────────────────────────────────────────────────

export class ExecutiveAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('novu_muted') === 'true';
    this.ambientGain = null;
    this.ambientRunning = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.isMuted ? 0 : 0.85;

    // High quality limiter/compressor to ensure zero digital clipping
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.knee.value = 30;
    comp.ratio.value = 8;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    this.masterGain.connect(comp);
    comp.connect(this.ctx.destination);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('novu_muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.85, t, 0.05);
    }
    return this.isMuted;
  }

  // Tactile micro-click for UI buttons, tabs, toggles
  click(frequency = 1200, depth = 0.03) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, t);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, t + depth);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + depth);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + depth + 0.01);
  }

  // Harmonic chime when inspecting 3D nodes or switching architecture
  chime(index = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Pentatonic scale starting at F#4
    const scale = [369.99, 415.30, 466.16, 554.37, 622.25, 739.99, 830.61, 932.33];
    const freq = scale[index % scale.length];
    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = freq;

    osc2.type = 'triangle';
    osc2.frequency.value = freq * 2.005; // warm harmonic overtone

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4, t);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.6);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.85);
    osc2.stop(t + 0.85);
  }

  // Positive confirmation sound for form submit, calculation, or preset switch
  confirm() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [554.37, 739.99]; // C#5 to F#5
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.42);
    });
  }

  // Subtle ambient spatial drone for focus mode
  toggleAmbient() {
    this.init();
    if (!this.ctx) return;

    if (this.ambientRunning) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      this.ambientRunning = false;
      return false;
    }

    if (!this.ambientGain) {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0;

      // 108Hz / 216Hz warm binaural pad
      const o1 = this.ctx.createOscillator();
      const o2 = this.ctx.createOscillator();
      const o3 = this.ctx.createOscillator();

      o1.type = 'sine'; o1.frequency.value = 108.0;
      o2.type = 'sine'; o2.frequency.value = 108.4; // 0.4Hz binaural beat
      o3.type = 'triangle'; o3.frequency.value = 216.0;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;

      const subGain = this.ctx.createGain();
      subGain.gain.value = 0.03;

      o1.connect(filter);
      o2.connect(filter);
      o3.connect(subGain);
      subGain.connect(filter);

      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      o1.start(); o2.start(); o3.start();
    }

    this.ambientGain.gain.setTargetAtTime(0.06, this.ctx.currentTime, 1.2);
    this.ambientRunning = true;
    return true;
  }
}

export const audio = new ExecutiveAudio();
