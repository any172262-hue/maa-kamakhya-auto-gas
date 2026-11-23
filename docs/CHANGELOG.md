# Project Changelog & Release History (CHANGELOG.md)

All notable changes to the **Maa Kamakhya Auto Gas** web platform are documented in this file.
The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-15 (Official Production Release)

### Added
- **Official Enterprise Rebranding:** Enforced the official brand name **Maa Kamakhya Auto Gas** across all 9 documentation files, web architecture, metadata, UI components, and test suites.
- **Automotive Design System:** Implemented a high-contrast automotive color scheme featuring Deep Navy Blue (`#07152C`, `#0B2142`), Electric Blue (`#1677FF`), and Vibrant Accent Yellow (`#FFD52A`) with `Outfit` and `Plus Jakarta Sans` typography.
- **Dynamic Vector `<Logo />` Component:** Custom SVG logo rendering golden automotive streamline arches, bold brand lettering, and core tagline ("Expert Care • Better Performance • Complete Peace of Mind") eliminating image caching artifacts.
- **Top 2nd Section — Business Statutory Details:** Positioned directly beneath Hero showcasing verified legal credentials:
  - Legal Entity: `Maa Kamakhya Auto Gas`
  - Year of Establishment: `2022`
  - No. of Employees: `Less than 10`
  - Annual Turnover: `51 Lakh – 1 Crore`
  - GSTIN: `18**********1ZS` with official Assam registration badge (Code 18)
  - Accepted Payment Modes: `EMI Financing, Visa / Master Card / Rupay, UPI (GPay/PhonePe/Paytm), Net Banking, Cash`
- **Interactive Fuel Savings Calculator:** Reactive client-side calculation engine with distance slider (`500 km` to `10,000 km`) and 4 editable price/mileage inputs computing exact petrol costs, CNG costs, net monthly savings, and annual savings.
- **One-Click Calculation-to-Quote Transfer:** Interactive button transferring live calculated savings into the WhatsApp quotation form note with smooth auto-scroll.
- **Annotated CNG Installation System Schematic:** Detailed cutaway visualization illustrating underbody high-pressure piping, rear-mounted cylinder, engine bay reducer, injector rail, changeover switch, and sequential ECU.
- **Vehicle Compatibility Matrix:** Interactive brand tabs for Maruti Suzuki, Hyundai, Tata Motors, Honda, and Toyota displaying engine CC, tank capacities, and RTO endorsement status.
- **Structured WhatsApp Quotation Engine:** Multi-field validation form serializing customer vehicle specifications and contact details into formatted `https://wa.me/916913910337` deep links.
- **Sticky Navbar with Scrollspy:** Fixed header with blurred backdrop (`backdrop-filter: blur(12px)`), 80px scroll-margin compensation, and real-time active link highlight.
- **Floating WhatsApp Action Trigger:** Persistent pulsing button linking directly to workshop consultation.
- **Automated Verification Harness:** 42/42 passing automated tests in `test-suite.js` covering math precision, formatting, configuration integrity, and E2E conversion simulations.

### Changed
- Replaced legacy 6 generic services with the official 24 verified business listing categories and 8 structured automotive service modules per verified trade registrations.
- Relocated Business Statutory Details to the top of the page (Top 2nd position) per user design specification.
- Updated all contact channels to official verified numbers: Phone `6913910337`, WhatsApp `69139 10337`.
- Updated physical location to: `Shop No. 7, Opposite Nezon Steel, Near Kumar Resorts, NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam`.

---

## [0.9.0] - 2026-11-14 (Beta Prototype Release)

### Added
- Core Single-Page Application (SPA) scaffolding built with React 18 and Vite 5.
- Basic services catalog and preliminary benefits section.
- Baseline CSS reset and layout variables.

---

## [Upcoming Roadmap: Planned Releases]

### [1.1.0] - Planned Q1 2027
- **Assam RTO Status Tracker:** Interactive lookup tool allowing customers to check their vehicle registration endorsement progress using vehicle registration number.
- **Regional Language Audio Narration:** Voice guidance in Assamese and Bengali explaining CNG system safety features for non-reading vehicle owners.

### [1.2.0] - Planned Q2 2027
- **Hydro-Test Certificate Portal:** PDF verification and re-test reminder scheduler for 3-year cylinder safety audits.
- **Online Bay Booking Engine:** Slot scheduling for installation and 1,000 km complimentary checkups.
