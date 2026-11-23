# Multi-Agent Operating Guidelines & Quality Standards (AGENTS.md)

## Project: Maa Kamakhya Auto Gas Web Platform
- **Legal Entity:** Maa Kamakhya Auto Gas
- **Official Domain:** Automotive CNG Retrofitment, Hydrostatic Testing & Engine Diagnostics
- **Target Geography:** Guwahati, Kamrup, and Northeast India
- **Core Technology:** React 18, Vite 5, JavaScript (ES2022), Modern CSS3, Lucide React
- **Brand Palette:** Yellow + Navy Blue Automotive Theme (`#07152C`, `#0B2142`, `#1677FF`, `#55A4FF`, `#FFD52A`, `#F7F9FF`)

---

## 1. Absolute Brand Protection & Statutory Rules
All agents, subagents, and human contributors working within this workspace MUST strictly adhere to the following non-negotiable rules:

1. **Brand Exclusivity:** The official name is **Maa Kamakhya Auto Gas**. NEVER use or reintroduce any legacy, deprecated, or obsolete business names.
2. **Statutory Truthfulness:** Never fabricate, modify, or falsify legal business credentials:
   - **Legal Name:** `Maa Kamakhya Auto Gas`
   - **Year of Establishment:** `2022`
   - **No. of Employees:** `Less than 10`
   - **Annual Turnover:** `51 Lakh to 1 Crore`
   - **GSTIN:** `18**********1ZS` (Registered in Assam, Code 18)
   - **Payment Modes:** `EMI Financing, Visa / Master Card / Rupay, UPI, Net Banking, Cash`
   - **Physical Address:** `Shop No. 7, Opposite Nezon Steel, Near Kumar Resorts, NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam`
   - **Voice Hotline:** `6913910337` (`+91 69139 10337`)
   - **WhatsApp Business:** `69139 10337` (`+91 69139 10337`)
3. **Yellow + Blue Aesthetic Integrity:** Preserve the premium automotive styling. Avoid generic green or mismatched palette choices.
4. **Factual Integrity:** Do not invent fake customer testimonials, unverified mechanical claims, or false certifications. Mark any unverified or pending detail as `TBD`.

---

## 2. Specialized Agent Roles & Responsibilities

### 2.1 Lead Product Manager & Systems Analyst Agent
- **Ownership:** `docs/PRD.md`, `docs/APP_FLOW.md`, `docs/CHANGELOG.md`
- **Core Objectives:**
  - Define clear user personas, business objectives, and functional requirement matrices (FR-001 through FR-015).
  - Ensure all features tie back to measurable business ROI: driving qualified inquiries via WhatsApp and voice calls.
  - Maintain the Traceability Matrix mapping functional requirements to technical components and test cases.

### 2.2 Principal Software Architect & Frontend Engineer Agent
- **Ownership:** `docs/TRD.md`, `src/layouts/`, `src/pages/`, `src/components/`, `src/sections/`, `src/utils/`
- **Core Objectives:**
  - Enforce clean, modular component boundaries with single responsibility.
  - Implement zero-dependency, pure mathematical computation algorithms with sub-millisecond execution.
  - Maintain zero layout shift (CLS $\le 0.02$) and optimal bundle budgets ($\le 250\text{ KB}$ minified).
  - Safeguard responsive navigation, scroll margins, and cross-browser stability.

### 2.3 Lead UI/UX & Design Systems Agent
- **Ownership:** `docs/UI_UX_DESIGN_BRIEF.md`, `src/styles/variables.css`, `src/styles/index.css`
- **Core Objectives:**
  - Guarantee consistent application of design tokens (Navy `#07152C`, Elevated `#0B2142`, Yellow `#FFD52A`, White `#F7F9FF`).
  - Maintain WCAG 2.1 AA text contrast compliance (minimum 4.5:1; high-contrast targets $> 12:1$).
  - Ensure keyboard focus visibility (`outline: 2px solid #FFD52A; outline-offset: 2px;`) across all interactive controls.
  - Respect `prefers-reduced-motion: reduce` across all CSS transitions and animations.

### 2.4 Lead Quality Assurance & Test Automation Agent
- **Ownership:** `docs/TESTING_STRATEGY.md`, `tests/unit/`, `tests/integration/`, `tests/e2e/`, `test-suite.js`
- **Core Objectives:**
  - Maintain 100% test pass rate across all automated verification suites.
  - Prevent regressions in fuel calculations, currency formatting, navigation anchors, and WhatsApp URL generation.
  - Execute automated and manual cross-device audits (320px mobile to 4K desktop).

---

## 3. Engineering Quality Standards & Protocols
- **Pure Computation Rule:** Always isolate algorithmic math into pure utility functions with zero side effects.
- **External URL Encoding Rule:** All query strings constructed for WhatsApp or other external protocols must pass through `encodeURIComponent()`.
- **Image Aspect Ratio Rule:** Explicit width/height or aspect-ratio constraints must be declared on every media container to prevent cumulative layout shift.
- **Dependency Minimization Rule:** Avoid adding unnecessary npm packages when native browser APIs or lightweight solutions achieve the same goal.
- **Verification Rule:** Never claim a task or feature is complete without executing the verification suite and confirming a clean production build (`npm run build` and `node test-suite.js`).
