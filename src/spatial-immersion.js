// ─────────────────────────────────────────────────────────────
//  Spatial Immersion & Hardware Sensor Suite — Novu Works
//  Engineers 6DoF Gyroscope, Precision GPS Geodesic Telemetry,
//  Tactile Haptics & Environmental Hardware Awareness
// ─────────────────────────────────────────────────────────────

import { logCandidateEvent } from './firebase.js';

// San Juan, Puerto Rico Headquarters Benchmark
export const SAN_JUAN_COORDS = {
  lat: 18.4655,
  lon: -66.1057,
  label: 'San Juan, Puerto Rico (HQ)',
  timezone: 'America/Puerto_Rico',
};

export class SpatialImmersionEngine {
  constructor(canvas3d = null) {
    this.canvas3d = canvas3d;

    // Gyroscope & Orientation state
    this.hasGyro = false;
    this.gyroActive = false;
    this.rawPitch = 0; // beta: -180 to 180
    this.rawRoll = 0;  // gamma: -90 to 90
    this.tiltX = 0;    // normalized: -1 to 1
    this.tiltY = 0;    // normalized: -1 to 1
    this.targetTiltX = 0;
    this.targetTiltY = 0;

    // GPS & Geodesic Telemetry state
    this.visitorLocation = null;
    this.geodesicTelemetry = null;
    this.gpsPermission = 'prompt'; // 'prompt' | 'granted' | 'denied'

    // Environmental state
    this.battery = null;
    this.isLowPowerMode = false;
    this.networkInfo = null;

    // Listeners & animation loop
    this.rafId = null;
    this.listenersAttached = false;
  }

  init() {
    this.initGyroscope();
    this.initDesktopParallaxFallback();
    this.initEnvironmentalSensors();
    this.initGeodesicFallback();
    this.startInterpolationLoop();
  }

  // ─────────────────────────────────────────────────────────────
  // 1. Spatial Gyroscope & DeviceOrientation
  // ─────────────────────────────────────────────────────────────
  initGyroscope() {
    if (typeof window === 'undefined') return;

    if ('DeviceOrientationEvent' in window) {
      // Check if permission API exists (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        this.requiresPermission = true;
      } else {
        // Android, Chrome, and standard devices listen directly
        this.attachGyroListener();
      }
    }
  }

  async requestGyroPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          this.attachGyroListener();
          logCandidateEvent('spatial_gyro_permission', { status: 'granted' });
          this.hapticSuccess();
          return true;
        } else {
          logCandidateEvent('spatial_gyro_permission', { status: 'denied' });
          return false;
        }
      } catch (err) {
        console.debug('[Spatial Gyro] Permission error:', err.message);
        return false;
      }
    }
    return true;
  }

  attachGyroListener() {
    if (this.listenersAttached) return;
    this.listenersAttached = true;

    window.addEventListener('deviceorientation', (e) => {
      if (e.beta === null && e.gamma === null) return;
      this.hasGyro = true;
      this.gyroActive = true;

      this.rawPitch = e.beta || 0; // -180 to 180
      this.rawRoll = e.gamma || 0; // -90 to 90

      // Normalize roll (-45° to +45° typical phone hand-tilt range)
      const clampedRoll = Math.max(-45, Math.min(45, this.rawRoll));
      this.targetTiltX = clampedRoll / 45;

      // Normalize pitch (assuming 35° resting reading angle)
      const adjustedPitch = (e.beta || 35) - 35;
      const clampedPitch = Math.max(-45, Math.min(45, adjustedPitch));
      this.targetTiltY = clampedPitch / 45;

      this.updateHudGyroBadge();
    }, { passive: true });

    logCandidateEvent('spatial_gyro_active', { source: 'deviceorientation' });
  }

  initDesktopParallaxFallback() {
    if (typeof window === 'undefined') return;

    // On non-gyro devices, mouse cursor positions provide smooth pseudo-spatial parallax
    window.addEventListener('mousemove', (e) => {
      if (this.hasGyro) return; // Gyro takes precedence

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      this.targetTiltX = normX;
      this.targetTiltY = -normY;
    }, { passive: true });
  }

  startInterpolationLoop() {
    let lastAppliedX = null;
    let lastAppliedY = null;
    let lastDomWriteTime = 0;

    const loop = () => {
      if (document.hidden) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }

      // Silky smooth low-pass interpolation (lerp)
      const damping = this.hasGyro ? 0.09 : 0.06;
      this.tiltX += (this.targetTiltX - this.tiltX) * damping;
      this.tiltY += (this.targetTiltY - this.tiltY) * damping;

      // 1. Update 3D Canvas WebGL spatial matrix
      if (this.canvas3d && typeof this.canvas3d.setSpatialTilt === 'function') {
        this.canvas3d.setSpatialTilt(this.tiltX, this.tiltY);
      }

      // 2. Set dynamic CSS specular & holographic reflection variables (throttled & delta-gated)
      // Prevents hoarding CPU/GPU by eliminating continuous root DOM style recalculations
      const now = performance.now();
      const dx = Math.abs(this.tiltX - (lastAppliedX ?? 999));
      const dy = Math.abs(this.tiltY - (lastAppliedY ?? 999));

      if ((dx > 0.003 || dy > 0.003) && (now - lastDomWriteTime >= 33)) {
        lastAppliedX = this.tiltX;
        lastAppliedY = this.tiltY;
        lastDomWriteTime = now;

        const root = document.documentElement;
        if (root) {
          root.style.setProperty('--tilt-x', this.tiltX.toFixed(3));
          root.style.setProperty('--tilt-y', this.tiltY.toFixed(3));
          root.style.setProperty('--specular-x', `${(50 + this.tiltX * 35).toFixed(1)}%`);
          root.style.setProperty('--specular-y', `${(50 + this.tiltY * 35).toFixed(1)}%`);
          root.style.setProperty('--shimmer-angle', `${Math.round(135 + this.tiltX * 45)}deg`);
        }
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  updateHudGyroBadge() {
    const badge = document.getElementById('hud-spatial-gyro-badge');
    if (!badge) return;

    const rollDeg = Math.round(this.rawRoll);
    const pitchDeg = Math.round(this.rawPitch);
    badge.innerHTML = `
      <span class="gyro-icon" style="transform: rotate(${rollDeg}deg);">🧭</span>
      <span class="gyro-readout">Spatial ${rollDeg > 0 ? '+' : ''}${rollDeg}° / ${pitchDeg > 0 ? '+' : ''}${pitchDeg}°</span>
    `;
    badge.classList.add('active');
  }

  // ─────────────────────────────────────────────────────────────
  // 2. Precision GPS & Geodesic Telemetry to San Juan HQ
  // ─────────────────────────────────────────────────────────────
  async requestPrecisionGps() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      return this.geodesicTelemetry;
    }

    this.hapticTick();

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gpsPermission = 'granted';
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = Math.round(pos.coords.accuracy);

          this.visitorLocation = { lat, lon, accuracy, source: 'gps' };
          this.geodesicTelemetry = this.calculateGeodesicToSanJuan(lat, lon);

          logCandidateEvent('gps_precision_telemetry', {
            distance_mi: this.geodesicTelemetry.distanceMiles,
            bearing_deg: this.geodesicTelemetry.bearingDeg,
            accuracy_m: accuracy,
          });

          this.hapticSuccess();
          this.updateHudGpsBadge();
          resolve(this.geodesicTelemetry);
        },
        (err) => {
          this.gpsPermission = 'denied';
          console.debug('[GPS] Geolocation prompt declined:', err.message);
          this.initGeodesicFallback();
          resolve(this.geodesicTelemetry);
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
      );
    });
  }

  async initGeodesicFallback() {
    // If GPS is not yet requested, probe edge POP / timezone to estimate baseline coordinates
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let estLat = 37.7749; // Default San Francisco
      let estLon = -122.4194;

      if (tz.includes('New_York') || tz.includes('Eastern')) {
        estLat = 40.7128; estLon = -74.0060;
      } else if (tz.includes('Chicago') || tz.includes('Central')) {
        estLat = 41.8781; estLon = -87.6298;
      } else if (tz.includes('Denver') || tz.includes('Mountain')) {
        estLat = 39.7392; estLon = -104.9903;
      } else if (tz.includes('London') || tz.includes('Europe')) {
        estLat = 51.5074; estLon = -0.1278;
      } else if (tz.includes('Puerto_Rico')) {
        estLat = 18.4655; estLon = -66.1057;
      }

      this.visitorLocation = { lat: estLat, lon: estLon, source: 'timezone_estimate' };
      this.geodesicTelemetry = this.calculateGeodesicToSanJuan(estLat, estLon);
      this.updateHudGpsBadge();
    } catch (e) {}
  }

  /**
   * Great-Circle Distance (Haversine Formula) & Forward Azimuth Heading
   */
  calculateGeodesicToSanJuan(lat1, lon1) {
    const lat2 = SAN_JUAN_COORDS.lat;
    const lon2 = SAN_JUAN_COORDS.lon;

    const R_km = 6371.0;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const rLat1 = toRad(lat1);
    const rLat2 = toRad(lat2);

    // Haversine
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(R_km * c);
    const distanceMiles = Math.round(distanceKm * 0.621371);
    const distanceNautical = Math.round(distanceKm * 0.539957);

    // Forward Azimuth (Bearing)
    const y = Math.sin(dLon) * Math.cos(rLat2);
    const x =
      Math.cos(rLat1) * Math.sin(rLat2) -
      Math.sin(rLat1) * Math.cos(rLat2) * Math.cos(dLon);
    const bearingRad = Math.atan2(y, x);
    const bearingDeg = Math.round((toDeg(bearingRad) + 360) % 360);

    // Cardinal Direction
    const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const cardinal = cardinals[Math.round(bearingDeg / 22.5) % 16];

    // Speed of Light in Fiber Transit Delay (200,000 km/s)
    const fiberLatencyMs = Math.round((distanceKm / 200000) * 1000 * 2); // Round-trip

    return {
      distanceMiles,
      distanceKm,
      distanceNautical,
      bearingDeg,
      cardinal,
      fiberLatencyMs,
      target: SAN_JUAN_COORDS.label,
    };
  }

  updateHudGpsBadge() {
    const badge = document.getElementById('hud-geodesic-badge');
    if (!badge || !this.geodesicTelemetry) return;

    const { distanceMiles, cardinal, bearingDeg } = this.geodesicTelemetry;
    if (distanceMiles < 10) {
      badge.innerHTML = `<span class="geo-flag">🇵🇷</span> San Juan Local HQ`;
    } else {
      badge.innerHTML = `<span class="geo-icon">🧭</span> ${distanceMiles.toLocaleString()} mi to San Juan HQ (${bearingDeg}° ${cardinal})`;
    }
    badge.setAttribute(
      'title',
      `Great-Circle Distance: ${distanceMiles.toLocaleString()} miles (${this.geodesicTelemetry.distanceKm.toLocaleString()} km) · Heading: ${bearingDeg}° ${cardinal} · Theoretical Fiber Transit: ~${this.geodesicTelemetry.fiberLatencyMs}ms. Click to recalculate via GPS.`
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 3. Tactile Haptic Micro-Engine
  // ─────────────────────────────────────────────────────────────
  hapticTick() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(4); } catch (e) {}
    }
  }

  hapticClick() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8); } catch (e) {}
    }
  }

  hapticSuccess() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate([10, 30, 15]); } catch (e) {}
    }
  }

  hapticChime() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate([12, 40, 16]); } catch (e) {}
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 4. Environmental Hardware Awareness (Battery & Network)
  // ─────────────────────────────────────────────────────────────
  async initEnvironmentalSensors() {
    if (typeof navigator === 'undefined') return;

    // Battery Awareness
    if ('getBattery' in navigator && typeof navigator.getBattery === 'function') {
      try {
        const battery = await navigator.getBattery();
        this.battery = battery;
        this.checkBatteryHealth(battery);

        battery.addEventListener('levelchange', () => this.checkBatteryHealth(battery));
        battery.addEventListener('chargingchange', () => this.checkBatteryHealth(battery));
      } catch (e) {}
    }

    // Network Telemetry
    if ('connection' in navigator) {
      const conn = navigator.connection;
      this.networkInfo = {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      };
    }
  }

  checkBatteryHealth(battery) {
    // If battery is < 18% and discharging, engage eco power optimizations
    const isCritical = battery.level < 0.18 && !battery.charging;
    if (isCritical !== this.isLowPowerMode) {
      this.isLowPowerMode = isCritical;
      document.documentElement.classList.toggle('device-eco-power', isCritical);
      logCandidateEvent('device_power_state', {
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        eco_mode: isCritical,
      });
    }
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
