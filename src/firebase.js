// ─────────────────────────────────────────────────────────────
//  Firebase Suite Integration — Novu Works
//  Official Web App: 1:907589381358:web:1f25bbc0f33d7c36e197ff
//  Project: novuworks (https://novu.works)
//  Services: Firebase Analytics & Performance Monitoring Telemetry
// ─────────────────────────────────────────────────────────────

import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported, logEvent } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

// Firebase client configuration loaded safely via Vite env variables or dynamic detection
// Note: Never hardcode API keys in source repository.
export const firebaseConfig = {
  projectId: "novuworks",
  appId: "1:907589381358:web:1f25bbc0f33d7c36e197ff",
  storageBucket: "novuworks.firebasestorage.app",
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) || "",
  authDomain: "novuworks.firebaseapp.com",
  messagingSenderId: "907589381358",
  projectNumber: "907589381358",
};

let app = null;
let analytics = null;
let performance = null;

// Telemetry session state
export const TELEMETRY_STATE = {
  initialized: false,
  analyticsActive: false,
  perfActive: false,
  eventsLogged: 0,
  recentEvents: [],
};

export async function initFirebase() {
  if (typeof window === 'undefined') return null;

  try {
    if (firebaseConfig.apiKey) {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      TELEMETRY_STATE.initialized = true;

      // 1. Initialize Analytics (Guarded for environment / CORS support)
      const analyticsAvailable = await isAnalyticsSupported().catch(() => false);
      if (analyticsAvailable) {
        analytics = getAnalytics(app);
        TELEMETRY_STATE.analyticsActive = true;
        logCandidateEvent('portfolio_session_start', {
          domain: window.location.hostname,
          referrer: document.referrer || 'direct',
          viewport_w: window.innerWidth,
          viewport_h: window.innerHeight,
          dpr: window.devicePixelRatio || 1,
        });
      }

      // 2. Initialize Performance Monitoring
      try {
        if ('performance' in window) {
          performance = getPerformance(app);
          TELEMETRY_STATE.perfActive = true;
        }
      } catch (e) {
        console.debug('[Firebase Perf] Handled:', e.message);
      }
    } else {
      // In-app telemetry HUD active with local event bus
      TELEMETRY_STATE.initialized = true;
      TELEMETRY_STATE.analyticsActive = false;
      TELEMETRY_STATE.perfActive = false;
      console.debug('[Firebase Telemetry] Running in client telemetry mode (env key not set). Telemetry HUD operational.');
    }

    return { app, analytics, performance };
  } catch (err) {
    console.debug('[Firebase Init] Gracefully degraded:', err.message);
    return null;
  }
}

/**
 * Log structured executive & recruiter interactions to Firebase Analytics
 * @param {string} eventName
 * @param {Record<string, any>} params
 */
export function logCandidateEvent(eventName, params = {}) {
  const payload = {
    ...params,
    timestamp: Date.now(),
    url: window.location.pathname,
  };

  TELEMETRY_STATE.eventsLogged++;
  TELEMETRY_STATE.recentEvents.unshift({ name: eventName, ...payload });
  if (TELEMETRY_STATE.recentEvents.length > 20) {
    TELEMETRY_STATE.recentEvents.pop();
  }

  if (analytics) {
    try {
      logEvent(analytics, eventName, payload);
    } catch (e) {
      // Non-blocking telemetry
    }
  }

  // Dispatch custom event for in-app telemetry HUD
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('novu:firebase-event', {
        detail: { name: eventName, payload },
      })
    );
  }
}

/**
 * Start a custom Performance trace
 * @param {string} traceName
 * @returns {{ stop: () => void }}
 */
export function startPerfTrace(traceName) {
  if (performance && typeof performance.trace === 'function') {
    try {
      const trace = performance.trace(traceName);
      trace.start();
      return {
        stop: () => {
          try { trace.stop(); } catch (e) {}
        },
      };
    } catch (e) {}
  }

  // Fallback high-resolution performance measure
  const startMark = `${traceName}_start_${Date.now()}`;
  if (typeof window !== 'undefined' && window.performance?.mark) {
    window.performance.mark(startMark);
  }
  return {
    stop: () => {
      try {
        if (window.performance?.measure) {
          window.performance.measure(traceName, startMark);
        }
      } catch (e) {}
    },
  };
}
