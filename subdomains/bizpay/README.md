# BizPay: Commercial B2B Invoicing, Instant Payroll & ATH Móvil Business Payment Engine

[![Live Demo](https://img.shields.io/badge/Live_Production-bizpay.novu.works-blue?style=for-the-badge&logo=google-chrome)](https://bizpay.novu.works)
[![Platform](https://img.shields.io/badge/Platform-B2B_FinTech-0284c7?style=for-the-badge)](https://bizpay.novu.works)
[![Payment Partner](https://img.shields.io/badge/ATH_Móvil-Business_API_Ready-ff6600?style=for-the-badge)](https://athmovil.com)

**BizPay** is an enterprise-grade commercial payment, merchant ledger, and automated payroll platform engineered by **Fabián Vélez Vicente**. Built to bridge Caribbean B2B commerce with localized instant payment infrastructure, BizPay integrates direct ATH Móvil Business test sandboxes, multi-client accounts receivable tracking, real-time invoice generation, and automated contractor payroll distribution.

---

## ⚡ Architectural Highlights & Capabilities

### 1. Direct ATH Móvil Business Payment Gateway
- **Official API Handshake:** Integrates ATH Móvil Business web button SDK and JSON checkout APIs for instant mobile number / token settlements.
- **Sandbox Environment:** Full mock sandbox verification mode with pre-configured dummy merchant credentials for rapid end-to-end payment simulations.
- **Instant Webhooks & Reconciliation:** Automated transaction status callback handler recording confirmed payments directly into merchant ledgers.

### 2. Commercial B2B Invoicing & Accounts Receivable Ledger
- **Dynamic Invoice Engine:** Multi-line item tax, discount, and fee calculation with PDF/print export capabilities.
- **Aging Invoices & Overdue Alerts:** Real-time accounts receivable dashboard surfacing 30/60/90-day aging buckets and automated client reminders.
- **Multi-Merchant Switching:** Support for distinct merchant accounts and role-based permissions.

### 3. Automated Contractor & Employee Payroll System
- **Single-Click Batch Payroll:** Calculate net contractor compensation, withholding deductions, and direct deposit or ATH Móvil P2P disbursements.
- **Auditable Payroll History:** Timestamped employee pay stubs with itemized bonus, stipend, and tax ledgers.
- **CSV / Spreadsheet Export:** Native financial ledger reconciliation exports formatted for QuickBooks and standard accounting software.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Architecture** | Semantic HTML5, CSS3 Custom Properties, Responsive Material Elevation Design |
| **Typography & Icons** | Inter, JetBrains Mono, Google Material Icons |
| **Payment SDKs** | ATH Móvil Business Web Checkout API, Custom JSON Transaction Dispatcher |
| **Storage & State** | Client-side Session State, LocalStorage Cashflow Cache, REST Payload Models |
| **Hosting & CI/CD** | Firebase Hosting Multi-Site Edge (`bizpay.novu.works`), Cloudflare CDN |

---

## 📁 Repository & File Structure

```text
subdomains/bizpay/
├── index.html              # Main B2B executive ledger & financial overview
├── styles.css              # Custom fintech design system & responsive layout
├── Pages/
│   ├── Payments.html       # Client payments & ATH Móvil checkout terminal
│   ├── Invoices.html       # Accounts receivable & PDF invoice creator
│   ├── Payroll.html        # Contractor & staff compensation disbursement
│   └── Settings.html       # Merchant configuration & API keys
├── images/                 # Optimized brand assets & payment logos
└── novu-intro.js           # Seamless NovuWorks platform integration overlay
```

---

## 🚀 Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eresfavolosx/BizPay.git
   cd BizPay
   ```

2. **Run locally with any static web server:**
   ```bash
   # Using Python 3:
   python3 -m http.server 8080

   # Or using Node.js:
   npx serve .
   ```

3. **Open in browser:**
   ```text
   http://localhost:8080
   ```

---

## 👨‍💻 Author & Engineering Credits

- **Fabián Vélez Vicente** — *Cloud & Enterprise Architecture Lead / Founder*
  - Portfolio: [novu.works](https://novu.works)
  - GitHub: [@eresfavolosx](https://github.com/eresfavolosx)
  - Email: `fabianvvicente1@gmail.com`
