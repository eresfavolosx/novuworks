# NFC Physical-to-Digital Studio (`nfc.novu.works`) — Tactile Hardware & Spatial Identity

> *"What if a physical ring, vinyl record, or studio badge could act as a living portal to an interactive story with a single tap?"*

**Live Interactive Prototype:** [https://nfc.novu.works](https://nfc.novu.works) · [Explore on Novu Works](https://novu.works/#nfc-platform)  
**Author:** **Fabián Vélez Vicente** (`@eresfavolosx`)

---

## ✨ The Concept
Digital connection has become trapped behind screens, search bars, and awkward QR codes. This creative technology experiment explores the tactile magic of physical objects—asking how a simple tap of an NFC-enabled ring, wooden token, or event badge can spark an immediate, memorable human encounter.

Whether an artist is embedding a secret audio story into a physical sculpture or two makers are exchanging contact cards at a workshop, **NFC Studio** makes bridging atoms and bits feel effortless and playful.

## ⚙️ The Technology
Engineered with zero external dependencies using modern hardware-to-browser web standards:
- **Chrome Web NFC API (`NDEFReader`):** Reads and flashes physical **NTAG213, NTAG215, and NTAG216** microchips directly from mobile Chrome without requiring a native app.
- **Binary NDEF & RFC 6350 vCard 3.0 Serialization:** Compiles structured identity metadata, deep links, and cryptographic hashes into byte-aligned NDEF records with real-time storage capacity gauges (144B / 504B / 888B).
- **6DoF Holographic Card Physics:** Responds to device gyroscope orientation and pointer movement with spring-damped 3D tilt, specular foil shaders, and **Navigator Vibration API** (`navigator.vibrate`) haptic confirmation pulses.

## 🌱 The Impact
- Empowers independent artists, educators, and makers to program physical artifacts straight from a mobile browser.
- Replaces disposable paper business cards and clunky native utilities with a warm, tactile, and reusable physical-to-digital ritual.

---

## 🚀 Running the Experiment Locally

```bash
npx serve .
```
Open on Android Chrome with NFC enabled to flash physical NTAG chips, or explore on any desktop/mobile browser using the interactive NDEF byte inspector and 3D holographic card studio.
