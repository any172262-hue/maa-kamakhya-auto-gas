# LANGUAGE SWITCHER FULL AUDIT & IMPLEMENTATION SPECIFICATION
**Project:** Maa Kamakhya Auto Gas Web Platform  
**Audit Date:** November 16, 2026  
**Auditor:** Antigravity AI Engineering Team  
**Document Status:** Complete Pre-Implementation Analysis Baseline  

---

## 1. Executive Summary & Current Architecture

An exhaustive inspection of the Maa Kamakhya Auto Gas codebase was conducted across all source files, documentation, components, and runtime state.

### Current Architectural Finding
1. **No Shared Translation System:** The application currently contains no centralized translation manager, i18n library, translation dictionary files (`locales/` or `translations/`), or context provider.
2. **Local Component State Only:** The language selector UI exists solely as local state inside `src/components/Navbar.jsx` (`const [selectedLanguage, setSelectedLanguage] = useState("English")`). 
3. **Purely Cosmetic Selector:** When a user selects a language in either the desktop dropdown or the mobile navigation drawer, only the local state variable inside `Navbar.jsx` is toggled. No event or state is emitted to the rest of the application.
4. **100% Hardcoded UI Text:** Every component, section, heading, card, form, modal, validation error, and legal page across `src/` contains static English strings.
5. **No Persistence or Metadata Sync:** The selected language is never saved to `localStorage` or `sessionStorage`. On page refresh, route transition, or hash change, the local state resets to English. The root `<html lang="en">` tag remains static.

---

## 2. Supported Languages

As specified in `src/data/siteConfig.js` (`languages: ["English", "Hindi", "Assamese"]`) and verified in workshop documentation:

| Language | ISO Code | Native Display Label | Regional Focus |
|---|---|---|---|
| **English** | `en` | English | Pan-India, commercial, and technical users |
| **Hindi** | `hi` | हिन्दी | Inter-state transport, taxi drivers, regional fleet operators |
| **Assamese** | `as` | অসমীয়া | Native Assam vehicle owners, Guwahati residents, local commuters |

---

## 3. Root Causes of Functional Failures

The failure of the language-switching feature stems from six interrelated architectural root causes:

### Root Cause 1: Lack of Centralized Language State
- **Current State:** `selectedLanguage` is instantiated as local state on line 38 of `src/components/Navbar.jsx`.
- **Consequence:** Child and peer components (`Hero.jsx`, `Services.jsx`, `Contact.jsx`, `Footer.jsx`, `ConfirmationModal.jsx`, etc.) cannot listen or react to language changes.

### Root Cause 2: Complete Absence of Translation Dictionaries
- **Current State:** There are zero translation files in the project.
- **Consequence:** Even if state were shared, there are no strings available for Hindi (`hi`) or Assamese (`as`).

### Root Cause 3: Zero Persistence Across Sessions and Navigation
- **Current State:** No calls to `localStorage` exist for language preference.
- **Consequence:** Any user page refresh, navigation to `#privacy-policy`, or return to `#hero` immediately wipes out the selected language.

### Root Cause 4: Component Tight Coupling & Missing Standalone Switcher
- **Current State:** The language switcher UI is copy-pasted and hardcoded directly inside `Navbar.jsx` in two separate places (desktop navbar lines 201-233, and mobile drawer lines 359-378).
- **Consequence:** Difficult to maintain, impossible to reuse in other sections (e.g. footer or legal pages), and creates duplicate state synchronization logic.

### Root Cause 5: Missing DOM Language Attribute Synchronization
- **Current State:** `index.html` defines `<html lang="en">`.
- **Consequence:** Screen readers, search engines, and browser translation tools do not recognize language changes, degrading accessibility and SEO for regional users.

### Root Cause 6: Accessibility Deficiencies in Current Dropdown
- **Current State:** The dropdown button uses `aria-expanded`, but the menu options lack proper ARIA listbox/menu roles, arrow key navigation, focus traps, and keyboard Escape listeners.

---

## 4. Affected Files & Components

Every component containing visible text is currently affected:

| Component / File Path | Current Status | Translation Scope Required |
|---|---|---|
| `src/components/Navbar.jsx` | Hardcoded local state | Nav links, call/quote buttons, language dropdown trigger |
| `src/components/LanguageSwitcher.jsx` | **Missing** (Must be created) | Reusable dropdown, mobile pills, accessible keyboard navigation |
| `src/context/LanguageContext.jsx` | **Missing** (Must be created) | Centralized state, persistence, `t()` translator helper, HTML lang sync |
| `src/locales/en.js` | **Missing** (Must be created) | Canonical English dictionary across all 16 domains |
| `src/locales/hi.js` | **Missing** (Must be created) | Professional automotive Hindi dictionary |
| `src/locales/as.js` | **Missing** (Must be created) | Authentic Assamese (অসমীয়া) regional dictionary |
| `src/locales/index.js` | **Missing** (Must be created) | Dictionary export and fallback registry |
| `src/sections/Hero.jsx` | 100% hardcoded English | Headline, subhead, trust badges, primary CTAs |
| `src/sections/StatutoryDetails.jsx` | 100% hardcoded English | Legal credentials, registration labels, payment options |
| `src/sections/TrustIndicators.jsx` | 100% hardcoded English | Milestone metrics (installs, warranty, savings, zero leaks) |
| `src/sections/WhyChooseUs.jsx` | 100% hardcoded English | Value proposition cards, advantages, body text |
| `src/sections/Services.jsx` | 100% hardcoded English | Service cards, technical features, trade directory categories |
| `src/sections/Benefits.jsx` | 100% hardcoded English | 6 safety and mechanical advantages |
| `src/sections/SavingsCalculator.jsx` | 100% hardcoded English | Profile presets, slider labels, comparison bars, savings chips, disclaimer |
| `src/sections/Compatibility.jsx` | 100% hardcoded English | Diagram callouts, vehicle brand matrix, retrofitment rules |
| `src/sections/Process.jsx` | 100% hardcoded English | 5-step engineering timeline titles and descriptions |
| `src/sections/CTA.jsx` | 100% hardcoded English | Promotional banner, savings message, WhatsApp CTA |
| `src/sections/WorkshopLocationMap.jsx` | 100% hardcoded English | Physical location details, working hours, directions |
| `src/sections/Contact.jsx` | 100% hardcoded English | Form labels, placeholders, options, inline validation error messages |
| `src/components/ConfirmationModal.jsx` | 100% hardcoded English | Modal headers, field summary, hold-to-cancel dynamic states, disclaimers |
| `src/components/SearchModal.jsx` | 100% hardcoded English | Search placeholder, quick categories, results summary |
| `src/components/Footer.jsx` | 100% hardcoded English | Navigation links, accepted payments, statutory notice, copyright |
| `src/pages/PrivacyPolicy.jsx` | 100% hardcoded English | Legal sections, privacy commitments, back button |
| `src/pages/TermsConditions.jsx` | 100% hardcoded English | Statutory terms, warranties, back button |
| `src/components/MobileBottomNav.jsx` | 100% hardcoded English | Bottom app bar item labels |

---

## 5. Detailed Problem Analysis by Dimension

### A. Functional Issues
1. Selecting "Hindi" or "Assamese" from the dropdown closes the dropdown but leaves 100% of website text in English.
2. Clicking outside the dropdown closes it, but keyboard navigation (Arrow Down, Arrow Up, Enter, Space) is absent.
3. Mobile drawer language selection operates in a vacuum, failing to sync with desktop or trigger re-renders elsewhere.
4. Validation errors inside the contact form remain hardcoded in English regardless of user language choice.
5. Confirmation modal and hold-to-cancel button text do not translate.

### B. Responsive & Layout Issues
1. **Script Text Expansion:** Hindi and Assamese scripts generally require 15% to 30% more horizontal space than English for equivalent semantic phrasing. If buttons have rigid `white-space: nowrap` without wrapping flexibility or responsive sizing, overflow can occur on small mobile screens (320px - 360px).
2. **Vertical Rhythm:** Devanagari (Hindi) and Eastern Nagari (Assamese) have matras (ascenders/descenders) that slightly increase line height. Typography styles must accommodate proper line-height (1.4 - 1.6) to avoid clipping.

### C. Accessibility Issues
1. Dropdown lacks `role="listbox"` or `role="menu"` semantics.
2. Focus is not managed when dropdown opens or closes.
3. Screen readers announce `<html lang="en">` even if a regional language was intended.
4. Selected language option lacks `aria-selected="true"`.

---

## 6. Recommended Architectural Solution

Rather than introducing bloated external npm dependencies (e.g. heavy i18next bundles), we implement a clean, lightweight, native React Context architecture:

1. **`LanguageContext.jsx`:**
   - Holds active language state (`'en'`, `'hi'`, `'as'`).
   - Retrieves saved choice from `localStorage.getItem('mka_language')` on mount with automatic fallback to `'en'`.
   - Automatically syncs updates to `localStorage` and `document.documentElement.lang`.
   - Exposes `t(key, fallback)` helper function supporting dot-notation (`t('nav.services')`), safe fallback, and parameter interpolation.
2. **`LanguageSwitcher.jsx`:**
   - Centralized, standalone component used in both desktop navbar and mobile drawer.
   - Fully accessible with keyboard navigation (Arrow keys, Escape, Enter, Space), proper ARIA tags (`role="listbox"`, `aria-selected`, `aria-expanded`).
3. **Structured Localization Dictionaries (`src/locales/`):**
   - Pure ES modules (`en.js`, `hi.js`, `as.js`).
   - 100% complete key parity across all 3 languages.
   - Real, authentic automotive terminology (e.g., CNG sequential kit = सीएनजी सीक्वेंशियल किट / চিএনজি ছিকুৱেনচিয়েল কিট, hydro-testing = हाइड्रो-टेस्टिंग / হাইড্ৰ' টেষ্টিং).
4. **Component Localization:**
   - Integrate `useLanguage()` into all visible components, replacing hardcoded strings with `t(...)`.

---

## 7. Implementation Plan (Phased Steps)

- **Step 1: Create Centralized Localization Core**
  - Implement `src/context/LanguageContext.jsx` and hook `src/hooks/useLanguage.js`.
  - Provide fallback, persistence, and `document.documentElement.lang` management.
- **Step 2: Author Localization Dictionaries**
  - Build `src/locales/en.js` (complete baseline of all strings).
  - Build `src/locales/hi.js` (accurate, professional Hindi translations).
  - Build `src/locales/as.js` (authentic Assamese translations).
  - Build `src/locales/index.js` (dictionary index with key parity guarantee).
- **Step 3: Build Accessible `LanguageSwitcher.jsx` Component**
  - Extract desktop and mobile selector logic into a unified, accessible component.
  - Implement full keyboard accessibility and outside click detection.
- **Step 4: Integrate into Navigation and Layout**
  - Wrap `App.jsx` with `<LanguageProvider>`.
  - Update `Navbar.jsx`, `MobileBottomNav.jsx`, and `Footer.jsx`.
- **Step 5: Translate Core Website Sections**
  - Hero, Statutory Details, Trust Indicators, Why Choose Us.
  - Services, Benefits, Savings Calculator, Compatibility, Process, CTA, Location Map, Contact.
  - Validation messages, Confirmation Modal, and Search Modal.
  - Privacy Policy and Terms & Conditions pages.
- **Step 6: Comprehensive Testing and Verification**
  - Test dropdown open, close, and keyboard navigation.
  - Verify instant live text switching across all 3 languages.
  - Verify persistence on page reload and hash route transitions.
  - Run automated test suite (`node test-suite.js`).
  - Run production build (`npm run build`).

---

## 8. Risk Assessment & Mitigation

| Potential Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| Missing translation keys causing runtime crashes or blank text | Medium | High | `t(key, fallback)` helper returns English fallback or raw key if a translated key is missing; never throws. |
| Text expansion in Hindi/Assamese breaking button layouts | Medium | Medium | Test all viewports (320px to 1440px) with Hindi and Assamese enabled; use flexible flex wrapping and relative units. |
| Performance degradation from large bundles | Low | Low | Dictionaries are pure lightweight objects (~35 KB uncompressed, < 8 KB gzipped). Zero npm overhead. |
| Test suite breakage | Low | High | Ensure automated test suite expectations for statutory values (phone, GSTIN, WhatsApp, etc.) remain intact. |
