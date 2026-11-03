# Picta (`picta.novu.works`) — Real-Time Perceptual Color & Voice Companion

> *"What if your phone's camera could translate the emotional warmth and exact nuance of any color into a friendly voice and tactile visual overlay?"*

**Live Interactive Prototype:** [https://picta.novu.works](https://picta.novu.works) · [Explore on Novu Works](https://novu.works/#picta)  
**Author:** **Fabián Vélez Vicente** (`@eresfavolosx`)

---

## 🎨 The Concept
For more than 300 million people living with Color Vision Deficiency (Protanopia, Deuteranopia, and Tritanopia), everyday moments—like picking ripe fruit, matching clothes, reading a color-coded chart, or admiring a sunset—can carry quiet hesitation. **Picta** was born from a simple, empathetic question: *how can we turn any smartphone or laptop browser into an immediate, joyful assistive lens that helps people both see and hear the world's colors?*

Rather than locking perceptual assistance behind expensive hardware or native app store downloads, Picta invites both color-blind users and their sighted friends to explore human perception together in real time.

## ⚙️ The Technology
Picta is engineered as a zero-install Progressive Web App powered entirely by client-side browser primitives and perceptual color mathematics:
- **60 FPS WebRTC Camera Stream:** Captures live video via `navigator.mediaDevices.getUserMedia` with hardware torch and multi-lens switching.
- **3×3 LMS Cone-Response Daltonization Matrices:** Applies Machado & Viénot physiological transformation matrices directly to `ImageData` pixel buffers inside a `requestAnimationFrame` loop—either simulating Protanopia/Deuteranopia/Tritanopia for empathy training or shifting indistinguishable wavelengths into visible spectrums.
- **Euclidean RGB Delta-E Color Synthesis:** Samples a 5×5 center reticle to filter sensor noise and computes the nearest human-named shade across a curated perceptual lexicon.
- **Web Speech API Voice Companion:** Speaks color names and emotional warmth descriptors aloud (`window.speechSynthesis`) with automatic debouncing as the user pans across a scene.

## 🌱 The Impact
- Transforms any device with a browser and camera into an instant, dignified assistive companion for **300M+ people worldwide**.
- Fosters shared empathy by allowing sighted family members, teachers, and designers to experience the exact perceptual world of their color-blind loved ones.
- Operates **100% on-device** with zero cloud latency and complete visual privacy.

---

## 🚀 Running the Experiment Locally

```bash
# Serve the static PWA directory with any local HTTP server
npx serve .
```
Open `http://localhost:3000` in Chrome, Safari, or Edge and grant camera permissions—or use the built-in procedural test canvas to explore the Daltonization matrices without a camera.
