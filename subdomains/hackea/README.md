# Hackea por una Causa: Youth Mentorship & Civic Impact Matching Platform

[![Live Demo](https://img.shields.io/badge/Live_Production-hackea.novu.works-red?style=for-the-badge&logo=google-chrome)](https://hackea.novu.works)
[![Partner](https://img.shields.io/badge/Partner-Boys_%26_Girls_Clubs_de_PR-blue?style=for-the-badge)](https://bgcpr.org)
[![Civic Tech](https://img.shields.io/badge/Initiative-Civic_Hackathon-orange?style=for-the-badge)](https://hackea.novu.works)

**Hackea por una Causa** is an open-source civic tech platform engineered by **Fabián Vélez Vicente** during the *Hackea por una Causa* hackathon in partnership with **Boys & Girls Clubs de Puerto Rico**. The platform connects at-risk youth and public school students across Puerto Rico with accredited industry professionals, university mentors, and technical leaders through an automated skill-matching, calendar scheduling, and workshop management workflow.

---

## ⚡ Problem & Architectural Solution

### The Challenge
Nonprofit organizations and public educational institutions across Puerto Rico face acute coordination bottlenecks matching volunteer professional mentors with underserved high school students. Scheduling conflicts, lack of role-model discovery, and disparate contact lists lead to an attrition rate of over 60% in civic mentorship initiatives.

### The Solution Architecture
- **Skill & Interest Taxonomy Matching:** Categorizes youth aspirations (Software Engineering, Visual Arts, Entrepreneurship, Nursing, Renewable Energy) and pairs them with industry mentors based on domain affinity and geographical proximity.
- **Automated Scheduling & Session Management:** Integrated interactive calendar for booking 1-on-1 career coaching, group masterclasses, and portfolio reviews with real-time confirmation badges.
- **Institutional Collaboration Hub:** Dedicated portal for partner schools, Boys & Girls Clubs clubhouses, and corporate sponsors to monitor student participation hours and mentor impact metrics.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Architecture** | Modern Vanilla JavaScript, Semantic HTML5, CSS Grid / Flexbox |
| **Typography & Design** | Plus Jakarta Sans, JetBrains Mono, Custom Dark/Light Theme Switching |
| **State & Coordination** | Reactive client-side tab switcher, LocalStorage session persistence |
| **Hosting & Deployment** | Firebase Hosting Multi-Site Edge (`hackea.novu.works`), Cloudflare CDN |

---

## 📁 Repository Structure

```text
subdomains/hackea/
├── index.html              # Main mentorship portal, directory & scheduler
├── assets/                 # Brand emblems, logos & iconography
└── novu-intro.js           # Seamless NovuWorks platform integration overlay
```

---

## 🚀 Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eresfavolosx/hackeaporunacausa.git
   cd hackeaporunacausa
   ```

2. **Serve locally:**
   ```bash
   python3 -m http.server 8080
   ```

3. **Visit in browser:**
   ```text
   http://localhost:8080
   ```

---

## 👨‍💻 Author & Engineering Credits

- **Fabián Vélez Vicente** — *Cloud & Enterprise Architecture Lead / Founder*
  - Portfolio: [novu.works](https://novu.works)
  - GitHub: [@eresfavolosx](https://github.com/eresfavolosx)
  - Email: `fabianvvicente1@gmail.com`
