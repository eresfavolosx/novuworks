# Tocaito: Smart NFC Hardware Platform & Dynamic Link Management PWA

[![Live Demo](https://img.shields.io/badge/Live_Production-nfc.novu.works-orange?style=for-the-badge&logo=google-chrome)](https://nfc.novu.works)
[![PWA](https://img.shields.io/badge/PWA-Installable_Offline_Ready-success?style=for-the-badge&logo=pwa)](https://nfc.novu.works)
[![Hardware](https://img.shields.io/badge/Hardware-Web_NFC_NDEF-blueviolet?style=for-the-badge)](https://nfc.novu.works)

**Tocaito** is a progressive web application and IoT hardware management platform engineered by **Fabián Vélez Vicente**. Designed to bridge physical-to-digital interactions across events, luxury hospitality, and enterprise credentials, Tocaito provides an end-to-end suite for programming, provisioning, and dynamically routing contactless NFC wearables, cards, and smart tags without needing to re-write physical chips.

---

## ⚡ Architectural Highlights & Capabilities

### 1. Web NFC API Hardware Programmer
- **In-Browser NDEF Reading & Writing:** Employs the modern `window.NDEFReader` standard on Android/Chromium devices to scan, inspect, lock, and program physical NTAG213, NTAG215, and NTAG216 microchips in real-time.
- **Fail-Safe Write Queue:** Validates payload sizes and prevents corrupted records before issuing cryptographic write commands to physical tags.
- **Dynamic Link Redirection Layer:** Programmable shortlinks (`/redirect.html?id=...`) allow event organizers to change destinations dynamically on the fly without re-flashing hardware bracelets.

### 2. Progressive Web Application (PWA) Architecture
- **Offline Reliability:** Service Worker (`sw.js`) and Cache Storage API ensure seamless field operation even in underground venues, festival tents, or disconnected cellular dead-zones.
- **Native-Like App Experience:** Standalone window display, custom splash screens, iOS `apple-mobile-web-app-capable` status bar translucency, and adaptive light/dark theming.
- **Integrated QR Fallback Generator:** Automatically computes high-contrast vector QR codes for iOS devices and older smartphones lacking background NFC tag reading.

### 3. Real-Time Telemetry & Tag Fleet Analytics
- **Tap Engagement Metrics:** Real-time logging of scans, unique visitors, browser user-agents, and timestamp heatmaps.
- **Fleet Grouping & Batch Provisioning:** Manage hundreds of wristbands categorized by VIP tier, press passes, vendor credentials, or guest passes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Modern TypeScript, Component-Driven SPA, Vite Build Pipeline |
| **Hardware Standards** | Web NFC API (`NDEFReader`, `NDEFRecord`), ISO/IEC 14443 Type A |
| **PWA Infrastructure** | Service Workers, Web App Manifest, Cache API |
| **Design System** | Custom Amber/Obsidian Glassmorphism, CSS Variables, System Theme Detection |
| **Hosting & CI/CD** | Firebase Hosting Multi-Site Edge (`nfc.novu.works`), Cloudflare CDN |

---

## 📁 Repository Structure

```text
subdomains/nfc/
├── index.html              # Main NFC provisioning & administrative dashboard
├── redirect.html           # Ultra-fast client-side redirection gateway
├── manifest.json           # PWA metadata, icons, and display configurations
├── sw.js                   # Service Worker offline asset & route caching
├── assets/                 # Minified production script & stylesheet bundles
├── icons/                  # Multi-resolution iOS & Android adaptive icons
└── novu-intro.js           # Seamless NovuWorks platform integration overlay
```

---

## 🚀 Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eresfavolosx/NFC.git
   cd NFC
   ```

2. **Run locally over HTTPS (Required for Web NFC):**
   > [!NOTE]
   > The Web NFC API requires a secure HTTPS context or `localhost` to access hardware radio interfaces.
   ```bash
   # Using Node.js:
   npx serve .
   ```

3. **Open on an NFC-capable mobile device:**
   ```text
   http://localhost:3000
   ```

---

## 👨‍💻 Author & Engineering Credits

- **Fabián Vélez Vicente** — *Cloud & Enterprise Architecture Lead / Founder*
  - Portfolio: [novu.works](https://novu.works)
  - GitHub: [@eresfavolosx](https://github.com/eresfavolosx)
  - Email: `fabianvvicente1@gmail.com`
