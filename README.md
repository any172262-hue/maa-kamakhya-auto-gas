# Maa Kamakhya Auto Gas — Premium CNG Retrofitment Website

A modern, high-performance, fully responsive automotive website for **Maa Kamakhya Auto Gas**, Guwahati's premier government-approved CNG retrofitment and automotive care center.

Engineered with a **Premium Yellow + Navy Blue** automotive aesthetic, fluid micro-interactions, an interactive **Petrol vs CNG Fuel Savings Calculator**, full vehicle compatibility matrix, an illustrated CNG installation overview, and automated **WhatsApp lead conversion**.

---

## 🚀 Live Demo & Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Icons:** Lucide React
- **Styling:** Modern CSS3 with Custom Design Tokens & BEM Methodology
- **Animation:** CSS Keyframes & Native `IntersectionObserver` Scroll Reveal

---

## 🎨 Design System & Palette

- **Primary Navy:** `#07152C` (Deep automotive luxury base)
- **Secondary Navy:** `#0B2142` (Surface & card background)
- **Primary Blue:** `#1677FF` (High-energy electric blue highlights)
- **Light Blue:** `#55A4FF` (Glows, hover states, badges)
- **Accent Yellow:** `#FFD52A` (Electric gold for high-impact typography & CTAs)
- **White:** `#F7F9FF` (Headings & crisp text)
- **Muted Text:** `#B7C5DC` (Readable technical descriptions)

---

## 📂 Enterprise File Architecture

```
maa-kamakhya-auto-gas/
│
├── docs/
│   ├── PRD.md                         # Product Requirements Document
│   ├── TRD.md                         # Technical Requirements Document
│   ├── APP_FLOW.md                    # Application Navigation & User Flow Diagram
│   ├── UI_UX_DESIGN_BRIEF.md          # Design Tokens, Palette & Visual Philosophy
│   ├── IMPLEMENTATION_PLAN.md         # Phased Implementation Roadmap
│   ├── DATABASE_SCHEMA.md             # PostgreSQL / Lead Storage Data Models
│   ├── API_SPECIFICATION.md           # WhatsApp & Calculator Endpoint Contracts
│   ├── TESTING_STRATEGY.md            # QA Matrix & Coverage Strategy
│   └── CHANGELOG.md                   # Complete Version History
│
├── public/
│   ├── images/
│   │   ├── logo.svg                   # Vector brand logo
│   │   ├── logo.png                   # High-res PNG logo
│   │   ├── hero-car.webp              # Automotive boot cylinder visual
│   │   └── cng-installation.webp      # CNG technical installation schematic
│   ├── icons/
│   │   ├── cng-fuel.svg               # Vector fuel icon
│   │   └── shield.svg                 # Vector compliance icon
│   ├── favicon.svg                    # Vector energy favicon
│   └── favicon.ico                    # Favicon
│
├── src/
│   ├── assets/                        # Static local media & branding assets
│   ├── components/                    # Reusable presentational components
│   │   ├── Button.jsx                 # Accessible multi-variant button
│   │   ├── Logo.jsx                   # Zero-cache inline React vector logo
│   │   ├── Navbar.jsx                 # Sticky header with real-time scroll spy
│   │   ├── Footer.jsx                 # Comprehensive automotive footer
│   │   ├── SectionHeading.jsx         # Section title with gold badge pill
│   │   ├── ServiceCard.jsx            # Interactive service card
│   │   ├── RevealAnimation.jsx        # IntersectionObserver scroll wrapper
│   │   └── WhatsAppButton.jsx         # Floating & inline WhatsApp CTA widgets
│   │
│   ├── sections/                      # Single-responsibility domain sections
│   │   ├── Hero.jsx                   # High-impact automotive hero
│   │   ├── StatutoryDetails.jsx       # Top 2nd section: Legal & GST credentials
│   │   ├── TrustIndicators.jsx        # Conversion & safety metrics
│   │   ├── WhyChooseUs.jsx            # 3 core pillars from reference
│   │   ├── Services.jsx               # 6 retrofitment and testing services
│   │   ├── Benefits.jsx               # Key technical benefits of CNG
│   │   ├── SavingsCalculator.jsx      # Interactive Petrol vs CNG calculator
│   │   ├── Compatibility.jsx          # Schematic overview & brand matrix
│   │   ├── Process.jsx                # 5-step standardized installation workflow
│   │   ├── CTA.jsx                    # Promotional conversion banner
│   │   └── Contact.jsx                # Multi-field WhatsApp quote form & direct dialer
│   │
│   ├── layouts/                       # Structural page wrappers
│   │   └── MainLayout.jsx             # Shell wrapping Navbar, Content, and Footer
│   │
│   ├── pages/                         # Route / page level orchestrators
│   │   └── HomePage.jsx               # Main landing page composition
│   │
│   ├── services/                      # Business & integration services
│   │   ├── whatsappService.js         # WhatsApp payload builder & deep-link service
│   │   └── quoteService.js            # Fuel calculation summary formatter
│   │
│   ├── config/                        # Global environment & constants
│   │   └── constants.js               # Application configuration constants
│   │
│   ├── hooks/                         # Reusable custom hooks
│   │   ├── useScrollReveal.js         # IntersectionObserver hook with reduced-motion support
│   │   └── useSavingsCalculator.js    # Fuel calculation state & validation hook
│   │
│   ├── data/                          # Centralized data sources
│   │   ├── siteConfig.js              # Business credentials, phone, WhatsApp & GSTIN
│   │   ├── navigation.js              # Navigation anchors linking to section IDs
│   │   └── services.js                # Specifications, vehicle brands & process steps
│   │
│   ├── utils/                         # Pure utility functions
│   │   ├── formatCurrency.js          # Indian Rupee (`₹`) & distance formatting
│   │   └── calculator.js              # Core mathematical fuel cost algorithms
│   │
│   ├── styles/                        # Modular CSS3 Design System
│   │   ├── variables.css              # Design tokens (palette, typography, spacing)
│   │   ├── global.css                 # Base resets, container system & layout utilities
│   │   ├── animations.css             # Keyframe animations & reduced-motion queries
│   │   ├── components.css             # Component and section layout styles
│   │   └── responsive.css             # Breakpoint adaptations (320px – 1920px)
│   │
│   ├── App.jsx                        # Root React component
│   └── main.jsx                       # Application entry point
│
├── tests/                             # Comprehensive test suites
│   ├── unit/                          # Math, currency, and validation unit tests
│   ├── integration/                   # Configuration and navigation integration tests
│   └── e2e/                           # End-to-end quotation-to-WhatsApp pipeline tests
│
├── .env.example                       # Environment variables template
├── .gitignore                         # Git exclusion rules
├── index.html                         # HTML5 template with SEO tags
├── package.json                       # Project dependencies and npm scripts
├── vite.config.js                     # Vite build configuration
├── test-suite.js                      # Master automated verification runner
└── README.md                          # Platform documentation
```

---

## ⚙️ Installation & Development

### 1. Prerequisites
- **Node.js** v18+ or v20+
- **npm** v9+

### 2. Install Dependencies
```bash
cd e:\maa-kamakhya-auto-gas
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The website will start at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This generates an optimized, minified production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📞 Contact Information & Configuration

All business and statutory information is centralized in [src/data/siteConfig.js](file:///e:/maa-kamakhya-auto-gas/src/data/siteConfig.js):

- **Brand & Legal Name:** `Maa Kamakhya Auto Gas`
- **Year of Establishment:** `2022`
- **Number of Employees:** `Less than 10`
- **Annual Turnover:** `₹51 Lakh to 1 Crore`
- **GSTIN:** `18**********1ZS` (State Code: 18 - Assam)
- **Payment Modes Accepted:** `EMI Financing, Visa / Master Card / Rupay, UPI, Net Banking, Cash`
- **Phone (Calling):** `6913910337` (`tel:+916913910337`)
- **WhatsApp (Inquiries):** `8822049075` (`https://wa.me/918822049075`)
- **Physical Workshop Address:** `Shop No. 7, Opposite Nezon Steel, Near Kumar Resorts, NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam`
- **Operating Hours:** `Monday to Saturday: 9:00 AM to 7:30 PM | Sunday: On Appointment`
- **Languages Supported:** `English, Hindi, Assamese`

To update any of these details, simply edit `siteConfig.js`. Changes will reflect across all headers, footers, buttons, and contact forms.

---

## 🧮 Savings Calculator Formula

```text
Petrol Cost = (Monthly Distance / Petrol Mileage) × Petrol Price
CNG Cost = (Monthly Distance / CNG Mileage) × CNG Price
Estimated Monthly Saving = Petrol Cost - CNG Cost
Projected Annual Saving = Estimated Monthly Saving × 12
```

- **Guwahati Default Benchmarks:**
  - Petrol: ₹107/L @ 15 km/L
  - CNG: ₹91/kg @ 27 km/kg
  - Default monthly distance: 5,000 km
  - Result: **₹18,815 estimated monthly saving** (Up to ~53% reduction)

---

## 🧪 Testing Checklist

- [x] Responsive on 320px, 375px, 425px, 768px, 1024px, 1440px, 1920px.
- [x] Smooth sticky navbar with blurred backdrop and active indicator.
- [x] Mobile drawer opens, closes, and closes upon clicking any nav link.
- [x] Interactive savings calculator updates in real time with Indian Rupee formatting.
- [x] Calculator handles invalid, negative, or zero inputs gracefully without NaN errors.
- [x] "Apply Estimate to WhatsApp Inquiry" pre-fills the inquiry form and scrolls smoothly.
- [x] Direct phone link (`tel:+916913910337`) triggers dialer on mobile.
- [x] WhatsApp buttons open `wa.me/918822049075` with encoded inquiry message.
- [x] Complete CNG system overview schematic loads crisply.
- [x] Brand compatibility tabs toggle models dynamically.
- [x] Zero console errors during development and production build.
