# Product Requirements Document (PRD)

## Project Information
- **Project Name:** Maa Kamakhya Auto Gas Web Platform
- **Legal Entity:** Maa Kamakhya Auto Gas
- **Document Version:** 1.0.0 (Production Release)
- **Status:** Approved / Specification Baseline
- **Last Updated:** 2026-11-15
- **Document Owner:** Lead Product Manager & Systems Architect

---

## 1. Executive Summary & Product Overview
Maa Kamakhya Auto Gas is Guwahati's premier government-approved automotive workshop specializing in sequential CNG retrofitment, certified hydrostatic cylinder testing, sequential ECU diagnostics, and performance tuning. Located near Raj Energy Station in Garchuk, Guwahati, Assam (PIN: 781034), the business operates under legal registration (GSTIN: 18**********1ZS, Est. 2022).

The web platform serves as the central digital acquisition and trust-building engine for Maa Kamakhya Auto Gas. Built with a high-performance single-page architecture (SPA), the site addresses consumer skepticism around aftermarket CNG conversion by offering an interactive fuel savings calculator, an engineering system schematic, verified business statutory credentials, vehicle compatibility matrices, and a streamlined WhatsApp quotation engine.

The visual identity is defined by a modern, high-contrast **Yellow + Navy Blue** automotive color system, conveying technical mastery, statutory authority, and automotive precision.

---

## 2. Problem Statement
Automotive commuters and commercial transport operators in Northeast India face critical economic and operational challenges:
1. **Escalating Fuel Expenditure:** With petrol prices at ₹107/Litre in Guwahati, vehicle owners spend between ₹10,000 and ₹35,000+ monthly on city and regional travel.
2. **Safety Apprehensions & Misconceptions:** Drivers fear potential fire hazards, cylinder burst risks, engine power loss, and boot space elimination due to unqualified roadside retrofitting.
3. **Lack of Price and Regulatory Transparency:** The retrofitment market is plagued by uncertified kits, lack of RTO endorsement assistance, and ambiguous pricing structures.
4. **Frictional Conversion Process:** Traditional workshops lack interactive tools to help drivers quantify ROI or evaluate vehicle compatibility prior to visiting the workshop.

---

## 3. Product Vision
To be the authoritative digital standard for automotive CNG retrofitment in Northeast India—educating car owners, proving tangible financial ROI through interactive simulation, establishing ironclad statutory credibility, and facilitating rapid conversion inquiries through direct WhatsApp communication.

---

## 4. Business Goals
- **Lead Generation:** Convert at least 10–14% of unique digital visitors into qualified quote inquiries via WhatsApp or phone calls.
- **Statutory Transparency:** Prominently showcase official business credentials (GSTIN, Assam registration, 2022 establishment, turnover, accepted payment modes including EMI) to build instant consumer trust.
- **Customer Education:** Demonstrate the mechanical architecture of sequential CNG systems through transparent component breakdowns and compatibility tables.
- **Frictionless Engagement:** Eliminate invasive registration forms; provide 1-click WhatsApp quotes pre-populated with customer vehicle specs and calculated fuel savings.

---

## 5. Target Audience & User Personas

### Persona A: Rajesh Sarma — Daily Private Car Commuter
- **Demographics:** 36 years old, IT Specialist, resident of Beltola, Guwahati.
- **Vehicle:** Maruti Suzuki Swift (Petrol, 2021 model).
- **Monthly Travel:** 1,200 – 1,800 km.
- **Pain Points:** Spends over ₹12,000/month on petrol; worried about boot luggage space and engine warranty.
- **Needs:** Clear evidence of boot-space optimization, fuel cost reduction estimates (>50%), and assurance of government-approved Italian sequential kits.

### Persona B: Bikash Das — Commercial Taxi / Fleet Operator
- **Demographics:** 42 years old, Owner-driver of 2 commercial vehicles (Maruti Dzire Tour / Ertiga).
- **Monthly Travel:** 4,500 – 6,000 km.
- **Pain Points:** Petrol expenditure consumes 50% of daily gross trip revenue; cannot afford workshop downtime.
- **Needs:** Maximum fuel savings, quick turnaround installation, EMI financing options, and end-to-end Assam RTO RC endorsement assistance.

### Persona C: Ananya Baruah — Eco-Conscious Family Car Owner
- **Demographics:** 29 years old, Marketing Executive, resident of Jalukbari.
- **Vehicle:** Tata Tiago (Petrol, 2022 model).
- **Pain Points:** High urban commuting emissions and rising fuel inflation.
- **Needs:** Clean mobility alternative, certified zero-leak guarantees, and seamless petrol-to-CNG automatic switchover.

---

## 6. Product Scope: MVP vs. Future Scope

### MVP Scope (Current Release)
- High-performance, fully responsive SPA running on React 18 + Vite 5.
- Premium Yellow + Navy Blue automotive UI design system.
- Responsive Navigation Bar with sticky blurred header, quick dialer (`tel:+916913910337`), and WhatsApp CTA.
- Automotive Hero Section with high-impact typography, boot cylinder visual, and quick-action buttons.
- Business Statutory Details banner positioned directly below Hero displaying verified legal credentials.
- Trust Indicators & Milestone Metrics (3,500+ installs, 55% savings, zero leaks, 2-year warranty).
- Why Choose CNG value cards (Economic, Eco, Engineering).
- 6 Comprehensive Automotive Service Cards with technical features and quotation hooks.
- 6 Technical Advantages & Safety Benefits with visual micro-interactions.
- Interactive Petrol vs. CNG Fuel Savings Calculator with live dynamic recalculations and transfer-to-quote capability.
- Complete CNG Installation in a Car annotated system schematic.
- Interactive Brand-based Vehicle Compatibility Matrix (Maruti Suzuki, Hyundai, Tata, Honda, Toyota).
- 5-Step Engineering & Certification Workflow.
- Interactive WhatsApp Conversion Form with validation and automated WhatsApp message formatting.
- Workshop Location, Hours, and Google Maps Navigation integration.
- Responsive Automotive Footer with copyright, legal notes, and quick jump links.
- Floating WhatsApp Quick Action Button.

### Future Scope (Post-MVP Roadmap)
- Real-time RTO RC Endorsement status tracker.
- Online workshop appointment booking with live technician bay allocation.
- Customer Hydro-Testing Certificate Verification & PDF download portal.
- Multi-language voice narration (Assamese, Bengali, Hindi).
- Admin Lead Management Dashboard with SMS webhook dispatch.

---

## 7. Functional Requirements Matrix (FR-001 to FR-015)

| Requirement ID | Module / Feature | Description | Measurable Acceptance Criteria | Priority |
|---|---|---|---|---|
| **FR-001** | Navigation Bar | Sticky header with brand logo, nav links, active section spy, click-to-call, and WhatsApp button. | Stays fixed on scroll; backdrop blur active; hamburger toggles mobile drawer smoothly; clicking link scrolls with 80px offset; active link highlights with accent yellow. | P0 |
| **FR-002** | Hero Section | Automotive hero with headline, car boot cylinder visual, value proposition, and primary CTAs. | Render headline "Switch to CNG. Save More. Drive Smarter."; CTAs for "Get a CNG Quote", Call (`6913910337`), and Directions; responsive layout on mobile/desktop. | P0 |
| **FR-003** | Business Statutory Details | Prominent top-tier statutory card displaying official legal registration. | Render Legal Name: Maa Kamakhya Auto Gas, Year: 2022, Employees: Less than 10, Turnover: 51 Lakh – 1 Crore, GSTIN: 18**********1ZS with "Assam Regd." badge, and 5 payment methods. | P0 |
| **FR-004** | Trust Indicators | Numerical social proof cards with animated counters/badges. | Display 3,500+ installations, 55% savings, 100% zero-leak record, 2-year warranty. | P0 |
| **FR-005** | Why Choose CNG | Value proposition cards highlighting key economic, environmental, and engineering factors. | 3 cards: Potential Fuel Savings, Cleaner Mobility Choice, Professional Retrofitment with modern icons. | P1 |
| **FR-006** | Verified Services & Trade Directory | Comprehensive catalog featuring 8 structured service modules and all 24 verified trade directory categories (dealerships, distribution, cylinder supply, repairs, spare parts, LPG, Maruti Alto 800 specialist). | Renders 24 interactive directory pills and 8 detailed service cards with category filter; clicking any pill pre-fills WhatsApp inquiry form. | P1 |
| **FR-007** | Technical Benefits | Detailed cards displaying engineering advantages of government-approved sequential systems. | 6 benefit cards: Sequential Injection, Certified Cylinders, Zero Power Loss, Dual-Fuel Switch, Low Emissions, Micro-Filtration. | P1 |
| **FR-008** | Savings Calculator | Reactive interactive calculator with distance slider and 4 editable fuel pricing inputs. | Computes: $\text{Petrol Cost} = (\text{Dist} / \text{P.Mileage}) \times \text{P.Price}$; $\text{CNG Cost} = (\text{Dist} / \text{C.Mileage}) \times \text{C.Price}$; displays monthly/annual savings; updates instantly on input. | P0 |
| **FR-009** | System Overview | Detailed technical car cutaway schematic illustrating CNG piping and components. | Shows Rear Cylinder, Underbody High-Pressure Pipe, Engine Bay Reducer, Injector Rail, Changeover Switch, Sequential ECU. | P1 |
| **FR-010** | Vehicle Compatibility | Interactive tabbed vehicle browser across 5 major automotive brands. | Tab navigation for Maruti, Hyundai, Tata, Honda, Toyota; displays compatible models, engine sizes, and tank capacities. | P1 |
| **FR-011** | 5-Step Process | Step-by-step engineering installation workflow from diagnostics to road handover. | 5 numbered cards: 1. Computer Diagnostics, 2. Precision Mount, 3. ECU Calibration, 4. Safety Leak Audit, 5. RTO Paperwork. | P2 |
| **FR-012** | Promotional CTA | High-impact conversion banner with instant quote trigger. | Navy/Gold high-contrast card with direct booking button linking to form or WhatsApp. | P1 |
| **FR-013** | WhatsApp Form | Multi-field quotation form with client-side validation and WhatsApp deep-link serialization. | Validates Name (min 2 chars), Phone (10 digits), Brand, Model, Year, Vehicle Use; constructs structured WhatsApp URL targeting `69139 10337`. | P0 |
| **FR-014** | Contact & Location | Workshop contact cards, business hours, and interactive Google Map. | Displays Address: Near Raj Energy Station, Garchuk, Guwahati - 781034; Phone: 6913910337; Hours: Mon-Sat 9AM-7:30PM; embedded responsive map. | P0 |
| **FR-015** | Floating WhatsApp | Persistent floating circular action button at bottom-right corner. | Fixed position `bottom: 24px; right: 24px; z-index: 999`; pulsing ripple animation; click opens `https://wa.me/916913910337`. | P0 |

---

## 8. Non-Functional Requirements (NFR)

### 8.1 Performance & Core Web Vitals
- **Lighthouse Performance Score:** $\ge 95/100$ on mobile and desktop.
- **First Contentful Paint (FCP):** $\le 1.0\text{ second}$.
- **Largest Contentful Paint (LCP):** $\le 1.8\text{ seconds}$.
- **Cumulative Layout Shift (CLS):** $\le 0.02$.
- **Bundle Size:** Minified production JavaScript bundle $\le 250\text{ KB}$ ($\le 70\text{ KB}$ gzipped).

### 8.2 Security & Data Privacy
- **Zero Server-Side PII Retention:** MVP operates purely on client-side state; form details serialize directly into standard WhatsApp deep links (`https://wa.me/...`), eliminating database breach vulnerabilities.
- **Input Sanitization:** URL encoding of all user inputs using standard `encodeURIComponent` to prevent XSS or protocol hijacking.
- **HTTPS Enforcement:** Strict transport security headers when deployed on static edge hosting.

### 8.3 Accessibility (a11y)
- **WCAG Compliance:** Adherence to WCAG 2.1 Level AA standards.
- **Color Contrast:** All text meets or exceeds a 4.5:1 contrast ratio against navy or light backgrounds (Yellow `#FFD52A` against Navy `#07152C` achieves $>11.8:1$ contrast).
- **Keyboard Navigation:** All interactive elements (`<button>`, `<a>`, `<input>`, `<select>`) have visible focus rings (`outline: 2px solid #FFD52A; outline-offset: 2px;`).
- **Motion Reduction:** Full support for `prefers-reduced-motion: reduce`, disabling CSS transforms and animations for sensitive users.

### 8.4 Cross-Browser & Device Responsiveness
- Support for modern mobile and desktop browsers: Chrome $\ge 90$, Safari $\ge 14$, Firefox $\ge 88$, Edge $\ge 90$, iOS Safari $\ge 14$, Android Chrome $\ge 90$.
- Seamless responsiveness across standard breakpoints: Mobile (320px – 639px), Tablet (640px – 1023px), Desktop (1024px – 1439px), Ultra-Wide ($\ge 1440px$).

---

## 9. User Stories & Acceptance Criteria

### User Story US-001: Estimating Fuel Cost Savings
> **As a** daily car commuter,  
> **I want to** adjust my monthly travel distance and vehicle mileage on an interactive calculator,  
> **So that I can** see exactly how much money I will save per month and per year by converting to CNG.

**Acceptance Criteria:**
- Moving the slider immediately updates the displayed monthly distance in kilometres.
- Editing petrol price, CNG price, or mileage immediately updates both Petrol and CNG monthly costs.
- The Net Monthly Savings card displays the difference in green/gold highlight along with annual projected savings.
- Clicking "Apply Estimate to WhatsApp Enquiry" smoothly scrolls to the inquiry form and pre-fills the savings figure into the query note.

### User Story US-002: Verifying Workshop Authenticity
> **As a** vehicle owner cautious about car safety,  
> **I want to** inspect the official legal name, GSTIN, year of establishment, and accepted payment modes,  
> **So that I can** be confident that Maa Kamakhya Auto Gas is a legitimate, government-compliant business.

**Acceptance Criteria:**
- Business Statutory Details section is positioned prominently at the top of the page (directly below Hero).
- The section displays Legal Name: Maa Kamakhya Auto Gas, Est: 2022, GSTIN: 18**********1ZS, Turnover: 51 Lakh – 1 Crore, and accepted payment modes.
- The GSTIN displays a verified badge indicating Assam tax jurisdiction (State code 18).

### User Story US-003: Submitting a WhatsApp Conversion Request
> **As a** busy vehicle owner,  
> **I want to** enter my car details (Make, Model, Year) and click one button to open WhatsApp,  
> **So that I can** chat directly with a technician without filling out tedious multi-step signups.

**Acceptance Criteria:**
- Form fields include Name, Mobile Number, Car Brand, Car Model, Manufacturing Year, and Usage Type.
- Submitting with invalid fields displays inline error messages and focuses the first invalid input.
- Valid submission encodes the payload into a structured WhatsApp message and opens `https://wa.me/916913910337?text=...` in a new tab.

---

## 10. Business Rules & Operational Constraints
1. **Brand Exclusivity Rule:** The brand name is strictly **Maa Kamakhya Auto Gas**. No prior or obsolete business names may appear anywhere in user-facing UI, documentation, or code comments.
2. **Contact Consistency Rule:** The verified phone number for voice calls is `6913910337` (`+91 69139 10337`). The dedicated WhatsApp number is `69139 10337` (`+91 69139 10337`). These must remain consistent across all CTA buttons.
3. **Statutory Truthfulness Rule:** All statutory information (GSTIN, Turnover, Year of Establishment) is sourced from verified business documentation and must not be altered. Unknown fields must be marked as TBD.
4. **Fuel Tariff Defaults:** Fuel price defaults must reflect prevailing Guwahati tariffs (Petrol: ₹107.00/L, CNG: ₹91.00/kg) with realistic average fuel economy baselines (Petrol: 15 km/L, CNG: 27 km/kg).
5. **No Speculative Data Rule:** Never fabricate vehicle certifications, fake customer testimonials, or unverified technical claims.

---

## 11. Assumptions & Technical Constraints
- **Assumptions:** Users have access to a modern web browser and active WhatsApp capability (native app on mobile or WhatsApp Web on desktop).
- **Constraints:**
  - Client-side static architecture for the MVP release.
  - Zero database dependency for initial production launch.
  - Strict automotive visual palette: Navy Blue (`#07152C`, `#0B2142`), Electric Blue (`#1677FF`), Accent Gold/Yellow (`#FFD52A`), Crisp White (`#F7F9FF`).

---

## 12. Risk Management & Mitigations

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| User does not have WhatsApp installed on desktop | Low | Medium | Provide prominent direct phone click-to-call links (`tel:+916913910337`) and physical address across every page section. |
| User doubts accuracy of savings calculator | Medium | Low | Display clear disclaimer text stating that savings are illustrative fuel-only estimates, and provide user-adjustable mileage and price input fields. |
| Slow mobile cellular connections in regional Assam | Medium | High | Optimize all assets to modern WebP/SVG formats; eliminate heavy external UI libraries; maintain lightweight bundle size under 250 KB. |

---

## 13. Success Metrics & Key Performance Indicators (KPIs)
- **Primary Conversion Rate:** $\ge 12\%$ of sessions initiating a WhatsApp conversion message or phone dial.
- **Calculator Engagement:** $\ge 50\%$ of users interact with the distance slider or input fields.
- **Bounce Rate:** $\le 30\%$ on both desktop and mobile traffic.
- **Page Load Time:** Under 1.5 seconds on standard 4G mobile connections.
