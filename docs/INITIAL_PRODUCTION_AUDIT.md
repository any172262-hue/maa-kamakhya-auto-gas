# Initial Production Readiness & Codebase Audit
**Website:** Maa Kamakhya Auto Gas  
**Audit Target:** `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`  
**Hosting Environment:** GitHub Pages (Project Site)  
**Technology:** React 18, Vite 5, JavaScript (ESM), CSS3  
**Audit Completed:** November 23, 2026  
**Auditor Role:** Senior Full-Stack Developer, Security Engineer, Technical SEO Architect & QA Lead  

---

## 1. Executive Summary

This initial audit establishes an empirical baseline of all architectural, functional, security, SEO, and content issues across the Maa Kamakhya Auto Gas codebase prior to production launch. Findings have been verified by inspecting project manifests, source files, static generation scripts, stylesheets, and test suites.

Findings are categorized by severity:
- **Critical:** Issues causing runtime failures, legal/compliance misrepresentation, or data fabrication.
- **High:** Issues impacting search indexation, structured data validity, domain integrity, or core user journeys.
- **Medium:** Issues impacting maintainability, translation parity, or user clarity.
- **Low:** Minor configuration discrepancies, cosmetic inconsistencies, or non-blocking deprecations.

---

## 2. Itemized Audit Findings by Severity

### Critical Severity

#### CRIT-01: LanguageContext Missing `currentLanguage` Export
- **File:** `src/context/LanguageContext.jsx`, `src/pages/ServiceDetailPage.jsx`
- **Impact:** `LanguageContext` exported only `{ language, setLanguage, t, languages }`. `ServiceDetailPage.jsx` attempted to destructure `currentLanguage` from `useLanguage()`, resulting in `currentLanguage === undefined`. Consequently, all service detail pages remained locked to English fallback content even when visitors switched the site language to Assamese or Hindi.
- **Classification:** Functional / Multilingual Runtime Bug

#### CRIT-02: Fabricated Statutory Business Credentials
- **Files:** `src/data/siteConfig.js`, `src/sections/StatutoryDetails.jsx`, `src/pages/AboutPage.jsx`, `src/components/Footer.jsx`, `src/pages/PrivacyPolicy.jsx`
- **Impact:** The codebase contained hardcoded fictitious statutory credentials:
  - Fabricated GSTIN: `18**********1ZS`
  - Arbitrary establishment year: `2022`
  - Fabricated annual turnover: `51 Lakh to 1 Crore`
  - Fabricated employee count: `Less than 10 Dedicated Technicians`
- **Classification:** Legal & Compliance / Data Fabrication

#### CRIT-03: Unverified Business Email Displayed as Official
- **Files:** `src/data/siteConfig.js`, `src/components/Footer.jsx`, `src/pages/ContactPage.jsx`, `src/sections/Contact.jsx`, `index.html`, `scripts/generate_static_pages.cjs`
- **Impact:** The personal email `axomoneofficial@gmail.com` was hardcoded as the "Direct business email" and included in JSON-LD schema. The business owner supplied `nil/` for business email. Publishing an unconfirmed personal Gmail address violates factual representation rules.
- **Classification:** Business Information Integrity / Privacy

#### CRIT-04: Unverified Performance, Warranty & Regulatory Claims
- **Files:** `src/sections/Hero.jsx`, `src/sections/TrustIndicators.jsx`, `src/sections/Benefits.jsx`, `src/data/services.js`, `src/sections/CTA.jsx`, `src/components/Navbar.jsx`
- **Impact:** Multiple unverified marketing assertions were present:
  - Claim of `1,500+ kits retrofitted`
  - Blanket promise of `Up to 55% fuel reduction`
  - Promise of `3-year warranty`
  - Unverified regulatory claims: `Govt. Approved CNG Center`, `Government Homologated Center`
- **Classification:** Truth in Advertising / Regulatory Compliance

---

### High Severity

#### HIGH-01: Domain Inconsistency in Canonicals, Sitemap & Open Graph
- **Files:** `index.html`, `public/sitemap.xml`, `scripts/generate_static_pages.cjs`
- **Impact:** The codebase contained references to `https://maakamakhyaautogas.com/`, which has no active DNS, host, or GitHub Pages CNAME. Mixing this unverified domain with the actual GitHub Pages project URL (`https://any172262-hue.github.io/maa-kamakhya-auto-gas/`) breaks canonical link equity and search crawling.
- **Classification:** Technical SEO / Canonical Integrity

#### HIGH-02: Structured Data (JSON-LD) Rich Result Spam Risk
- **Files:** `index.html`, `scripts/generate_static_pages.cjs`
- **Impact:** The JSON-LD graph used `AutoRepair` and declared unverified fields:
  - Hardcoded `openingHoursSpecification` (business hours are unconfirmed)
  - Estimated `geo` coordinates
  - Arbitrary `priceRange: "₹₹"`
  - Unverified `telephone` (pending owner confirmation)
  Inaccurate structured data triggers Google Search spam penalties and disqualifies rich snippets.
- **Classification:** Google Search Compliance / Schema Integrity

#### HIGH-03: Absence of Pre-rendered Crawlable HTML on GitHub Pages
- **Files:** `dist/` build output
- **Impact:** Because GitHub Pages is a static file host without URL rewriting for client-side routing, deep linking to subroutes (`/services/cng-services/`, `/about/`, `/contact/`) results in 404 HTTP errors unless static HTML pages or a custom `404.html` SPA redirector are generated.
- **Classification:** Crawlability / GitHub Pages Routing

#### HIGH-04: Misleading Sitemap Directives
- **File:** `public/sitemap.xml`
- **Impact:** Every `<url>` contained arbitrary `<changefreq>` (`daily`, `weekly`, `monthly`) and `<priority>` (`1.0`, `0.9`, `0.8`, `0.3`) values. Modern search engines ignore these tags and flag them when they contradict real update frequencies.
- **Classification:** Technical SEO

---

### Medium Severity

#### MED-01: Robots.txt Disallowing Non-existent Paths
- **File:** `public/robots.txt`
- **Impact:** Contained `Disallow: /api/` and `Disallow: /private/`. In a static GitHub Pages project with zero server-side APIs, disallowing non-existent directories signals false endpoints to automated vulnerability scanners.
- **Classification:** Technical SEO / Architecture Cleanliness

#### MED-02: Punctuation & Em Dash Discrepancies Across Locales
- **Files:** `src/locales/en.js`, `src/locales/hi.js`, `src/locales/as.js`
- **Impact:** Inconsistent use of unicode em dashes (`\u2014`) vs native punctuation across Assamese and Hindi created typographical rendering inconsistencies on older mobile devices.
- **Classification:** UI/UX & Typography

#### MED-03: Unverified Payment Facility Claims
- **Files:** `src/components/Footer.jsx`, `src/components/Navbar.jsx`, locale dictionaries
- **Impact:** Claimed acceptance of "Zero-cost EMI financing, Visa, MasterCard, RuPay" without verified merchant acquiring infrastructure.
- **Classification:** Consumer Trust & Accuracy

#### MED-04: Unflagged Contact Number Verification Status
- **Files:** `src/data/siteConfig.js`, `src/sections/Contact.jsx`
- **Impact:** Workshop phone (`6913910337`) and WhatsApp (`8822049075`) numbers were displayed without notifying visitors that they remain subject to final business-owner verification before in-person visits.
- **Classification:** User Expectations & Transparency

---

### Low Severity

#### LOW-01: Outdated Landmark Address in Environment Templates
- **Files:** `.env`, `.env.example`
- **Impact:** Environment variable `VITE_WORKSHOP_ADDRESS` contained obsolete landmark text (`Shop No. 7, Opposite Nezon Steel...`) instead of the confirmed address.
- **Classification:** Configuration Hygiene

#### LOW-02: Dev-Dependency Vulnerability Advisory in Vite 5
- **Files:** `package.json`, `package-lock.json`
- **Impact:** `npm audit` flagged a high-severity advisory in Vite `<=6.4.3` related to path traversal in debug `.map` handling during development. The vulnerability affects local dev servers only and does not impact static build artifacts in `dist/`.
- **Classification:** DevSecOps / Dependency Hygiene

#### LOW-03: Missing Automated GitHub Actions Workflow
- **Directory:** `.github/workflows/`
- **Impact:** No standardized GitHub Actions workflow existed to build, test, and deploy to GitHub Pages with minimal required permissions.
- **Classification:** CI/CD & Deployment Readiness

---

## 3. Summary of Findings

| Severity | Count | Primary Impact Areas |
|---|---|---|
| **Critical** | 4 | Multilingual routing bug, fabricated statutory info, unverified email, false marketing claims |
| **High** | 4 | Domain fragmentation, JSON-LD schema spam risk, static crawlability, sitemap clutter |
| **Medium** | 4 | Robots.txt noise, translation typography, unverified payment claims, unflagged contact status |
| **Low** | 3 | Environment variable address, dev-dependency advisory, missing CI/CD workflow |
| **Total** | **15** | All 15 findings are scheduled for verification and resolution in Phase 2 through Phase 14 |
