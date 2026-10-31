# Picta: Assistive WebRTC Camera & Color Vision Deficiency Correction Engine

[![Live Demo](https://img.shields.io/badge/Live_Production-picta.novu.works-purple?style=for-the-badge&logo=google-chrome)](https://picta.novu.works)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.2_AAA-success?style=for-the-badge)](https://picta.novu.works)
[![Web APIs](https://img.shields.io/badge/Web_APIs-WebRTC_getUserMedia-blue?style=for-the-badge)](https://picta.novu.works)

**Picta** is an assistive computer vision web application engineered by **Fabián Vélez Vicente** to empower individuals with Color Vision Deficiency (CVD) — including Protanopia, Deuteranopia, Tritanopia, and Achromatopsia — to perceive, distinguish, and identify colors in real-time through their mobile and desktop cameras.

---

## ⚡ Key Features & Engineering Mechanics

### 1. Real-Time WebRTC Viewfinder & Color Transformation Pipeline
- **Low-Latency Hardware Camera Ingestion:** Ingests 60fps video via `navigator.mediaDevices.getUserMedia` with seamless front/back lens switching and torch control.
- **Mathematical Daltonization Filters:** Applies real-time matrix convolutions using SVG filter primitives (`feColorMatrix`, `feComponentTransfer`):
  - **Protanopia Boost (Red-Weakness Correction):** Calculates the missing L-cone error vector and shifts the energy into amber and blue channels, making red and green objects distinctly separate.
  - **Deuteranopia Boost (Green-Weakness Correction):** Re-projects missing M-cone frequencies across red and blue spectral regions.
  - **Tritanopia Boost (Blue-Weakness Correction):** Rebalances the blue-yellow spectrum.
  - **High-Contrast Edge Sharpening:** Amplifies micro-contrasts and luminance borders for low-vision and Achromatopsia.
- **Bi-Directional CVD Simulation:** Real-time Brettel/Viénot transformations allow normal-vision designers, product teams, and educators to experience exact color blindness conditions.
- **Built-in Ishihara Test Plates:** Generates authentic Ishihara Plate #74 and #12 test targets for instant diagnostic calibration.

### 2. Interactive Pixel Eyedropper & Voice Announcer
- **Perceptual Color Naming:** Tap anywhere on the live video stream or uploaded snapshot to sample that exact coordinate.
- **Weighted Euclidean Delta-E:** Calculates the closest named color from a human-calibrated perceptual palette.
- **Multimodal Text-to-Speech (TTS):** Uses the Web Speech API (`SpeechSynthesis`) to announce color names and tonal warmth aloud.

### 3. Snapshot Gallery & Local Canvas Baking
- **Hardware-Accelerated Canvas Baking:** Bakes applied Daltonization matrices directly onto the output image before saving.
- **Haptic Feedback & Sound:** Tactile audio click and device vibration (`navigator.vibrate`) upon capture.
- **Local Storage Management:** Save, download, and review captured palettes offline.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Video & Vision** | WebRTC `getUserMedia`, HTML5 2D Canvas API, SVG Filter Primitives |
| **Assistive APIs** | Web Speech API (`SpeechSynthesis`), Vibration API, Web Audio API |
| **Frontend Framework** | Vanilla Modern JavaScript (ES6+ Modules), CSS3 Glassmorphism |
| **Design System** | Mobile-First Responsive PWA, Material Elevation, Adaptive Themes |
| **Hosting & CI/CD** | Firebase Hosting Multi-Site Edge (`picta.novu.works`), Cloudflare CDN |

---

## 📁 Repository Structure

```text
subdomains/picta/
├── index.html              # Core application interface & WebRTC canvas
├── README.md               # Architecture documentation & setup guide
├── Pages/
│   ├── About.html          # Clinical background on CVD & Daltonization math
│   ├── Guide.html          # Operating instructions & Ishihara test guide
│   └── Settings.html       # Camera resolution & voice tuning preferences
├── Assets/                 # Icons, vector badges & graphic resources
└── novu-intro.js           # Seamless NovuWorks platform integration overlay
```

---

## 🚀 Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eresfavolosx/Picta.git
   cd Picta
   ```

2. **Serve over HTTPS / Localhost (Required for Camera Permissions):**
   ```bash
   # Using Node.js:
   npx serve .
   ```

3. **Open in browser:**
   ```text
   http://localhost:3000
   ```

---

## 👨‍💻 Author & Engineering Credits

- **Fabián Vélez Vicente** — *Cloud & Enterprise Architecture Lead / Founder*
  - Portfolio: [novu.works](https://novu.works)
  - GitHub: [@eresfavolosx](https://github.com/eresfavolosx)
  - Email: `fabianvvicente1@gmail.com`
