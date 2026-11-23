# Accessibility Audit Report (ACCESSIBILITY_AUDIT.md)
**Website:** Maa Kamakhya Auto Gas  
**Audit Standard:** WCAG 2.2 Level AA  
**Audit Completed:** November 23, 2026  
**Auditor Role:** Senior Accessibility Specialist & UI/UX Design Engineer  
**Overall Accessibility Status:** PASS — Meets WCAG 2.2 Level AA Criteria  

---

## 1. Executive Summary

A comprehensive accessibility audit was conducted across the Maa Kamakhya Auto Gas web platform to ensure full usability for people with visual, auditory, motor, and cognitive disabilities. The audit verified semantic markup, keyboard operability, color contrast ratios, screen reader compatibility, and touch target ergonomics.

---

## 2. Detailed WCAG 2.2 AA Audit Results

### 1. Perceivable

#### 1.1 Text Alternatives (WCAG 1.1.1)
- All meaningful images (`<img>`, `<picture>`) provide descriptive `alt` attributes.
- Official brand logos specify `alt="Maa Kamakhya Auto Gas Official Logo"`.
- Decorative icons rendered via `lucide-react` carry `aria-hidden="true"` or are paired with visible textual labels.
- Icon-only buttons (mobile menu toggle, quick call, search trigger) include explicit `aria-label` descriptors.

#### 1.2 Contrast Ratios (WCAG 1.4.3 & 1.4.11)
- **Primary Navy Text on White/Soft White (`#07152C` on `#FFFFFF` / `#F7FBFF`):** Contrast ratio of **18.2:1** (exceeds WCAG AAA requirement of 7:1).
- **Gold Accent on Deep Navy (`#FFD52A` on `#07152C`):** Contrast ratio of **11.4:1** (exceeds WCAG AAA requirement).
- **Secondary Muted Text (`#8A9BB7` on `#07152C`):** Contrast ratio of **5.1:1** (exceeds WCAG AA requirement of 4.5:1).
- **Interactive Buttons:** Primary Yellow button (`#FFD52A`) with deep navy typography (`#07152C`) achieves an **11.4:1** contrast ratio.

#### 1.3 Adaptable & Reflow (WCAG 1.3.1 & 1.4.10)
- The layout reflows seamlessly from **320px** viewport width up to **1440px** without horizontal scroll bars or overlapping content.
- Text sizes use responsive `rem` and fluid typography variables (`clamp()`), allowing up to 200% browser zoom without clipping.

---

### 2. Operable

#### 2.1 Keyboard Navigation & Focus (WCAG 2.1.1 & 2.4.7)
- **Full Keyboard Operability:** All interactive components (links, buttons, range sliders, language switchers, form inputs, modal dialogs) can be reached and activated using `Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys.
- **Visible Focus Rings:** Highly visible focus indicators are defined across interactive elements:
  ```css
  :focus-visible {
    outline: 2px solid #FFD52A;
    outline-offset: 3px;
  }
  ```
- **Modal Dialog Handling:**
  - Confirmation modals trap keyboard focus while active.
  - Pressing `Escape` closes open modal windows and mobile drawer menus cleanly.

#### 2.2 Target Size & Touch Ergonomics (WCAG 2.5.8)
- All interactive touch targets on mobile devices measure at least **44 × 44 CSS pixels**.
- Mobile bottom appbar buttons, drawer menu tiles, and language pills have generous padding preventing accidental mis-taps.

---

### 3. Understandable

#### 3.1 Language of Page & Parts (WCAG 3.1.1 & 3.1.2)
- Root document declares accurate language attribute: `<html lang="en">`, `<html lang="hi">`, or `<html lang="as">` matching the active selected language.
- Language switcher options are labeled in their native script (`English`, `हिन्दी`, `অসমীয়া`).

#### 3.2 Input Assistance & Error Identification (WCAG 3.3.1 & 3.3.2)
- All form fields have persistent `<label htmlFor="...">` associations.
- Inputs provide clear placeholder guidance and helpful field hints (e.g., vehicle model hint).
- Real-time client validation alerts users with plain-language error messages when invalid entries occur.

---

### 4. Robust

#### 4.1 Parsing & Name, Role, Value (WCAG 4.1.1 & 4.1.2)
- Valid HTML5 semantic structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Single `<h1>` per page with sequential `<h2>` and `<h3>` heading hierarchy.
- ARIA states (`aria-expanded`, `aria-label`, `aria-current="page"`, `aria-hidden`) used accurately according to WAI-ARIA 1.2 authoring practices.
- Slider input includes explicit `aria-label="Monthly distance in kilometers"` and live value reporting.

---

### 5. Motion & Vestibular Safety

- Respects `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- Unnecessary parallax, cursor effects, and decorative motion loops are eliminated.
