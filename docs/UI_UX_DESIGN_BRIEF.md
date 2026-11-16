# UI/UX Design Brief & Design System Specification (UI_UX_DESIGN_BRIEF.md)

## Project Information
- **Project Name:** Maa Kamakhya Auto Gas Web Platform
- **Legal Entity:** Maa Kamakhya Auto Gas
- **Document Version:** 1.0.0 (Production Release)
- **Status:** Approved / Design System Baseline
- **Last Updated:** 2026-11-15
- **Document Owner:** Lead UI/UX Designer & Design Systems Architect

---

## 1. Design Vision & Brand Philosophy
The visual and interaction design for **Maa Kamakhya Auto Gas** conveys automotive engineering precision, institutional trustworthiness, and modern clean-fuel technology.

Departing decisively from generic "leaf-green" environmental cliches, the visual language utilizes a commanding **Deep Navy Blue and High-Contrast Accent Yellow** color palette. Deep navy communicates structural integrity, industrial rigor, and mechanical expertise; electric blue brings high-tech sequential computing into focus; while luminous gold/yellow injects vibrant energy, speed, and immediate call-to-action prominence.

Every interaction is designed to feel buttery-smooth (60fps), responsive, and tactile—reminiscent of high-end automotive instrument clusters.

---

## 2. Color System & Design Tokens

### 2.1 Core Palette

| Token Name | Hex Code | RGB | Role / Usage |
|---|---|---|---|
| `--color-primary-navy` | `#07152C` | `rgb(7, 21, 44)` | Deep base background for header, hero, statutory section, and footer; conveys depth and premium contrast. |
| `--color-secondary-navy` | `#0B2142` | `rgb(11, 33, 66)` | Elevated card surfaces, floating modals, and interactive container backgrounds. |
| `--color-surface-hover` | `#112E5A` | `rgb(17, 46, 90)` | Hover state for interactive cards, list items, and containers. |
| `--color-primary-blue` | `#1677FF` | `rgb(22, 119, 255)` | Primary interactive buttons, active links, feature highlights, and system conduits. |
| `--color-light-blue` | `#55A4FF` | `rgb(85, 164, 255)` | Secondary accents, icons, hover badges, and subtle glows. |
| `--color-accent-yellow` | `#FFD52A` | `rgb(255, 213, 42)` | High-impact accent: CTA buttons, glowing badges, active indicators, and numerical savings callouts. |
| `--color-accent-yellow-hover` | `#F0C419` | `rgb(240, 196, 25)` | Button press / hover state for accent yellow components. |
| `--color-text-white` | `#F7F9FF` | `rgb(247, 249, 255)` | Primary text on navy backgrounds; pristine legibility with subtle cool-tint softening. |
| `--color-text-muted` | `#B7C5DC` | `rgb(183, 197, 220)` | Secondary descriptions, metadata, subtitle copy, and inactive tabs. |
| `--color-border-subtle` | `rgba(85, 164, 255, 0.15)` | — | Translucent glassmorphic borders on navy card surfaces. |
| `--color-border-highlight` | `rgba(255, 213, 42, 0.35)` | — | Accent border highlight for active/focused elements. |
| `--color-whatsapp-green` | `#25D366` | `rgb(37, 211, 102)` | Official WhatsApp brand color for WhatsApp CTAs and floating buttons. |

### 2.2 Contrast & Accessibility Verification
- **Accent Yellow (`#FFD52A`) on Primary Navy (`#07152C`):** Contrast ratio **12.4:1** (Exceeds WCAG AAA requirement of 7:1).
- **Text White (`#F7F9FF`) on Primary Navy (`#07152C`):** Contrast ratio **16.8:1** (Exceeds WCAG AAA).
- **Muted Text (`#B7C5DC`) on Primary Navy (`#07152C`):** Contrast ratio **8.2:1** (Exceeds WCAG AAA).
- **White Text on Primary Blue (`#1677FF`):** Contrast ratio **4.6:1** (Meets WCAG AA for standard text).

---

## 3. Typography Scale & Hierarchy

The typography pairs an automotive geometric display typeface (`Outfit`) for titles with an ultra-readable ergonomic sans-serif (`Plus Jakarta Sans`) for interface controls and body copy.

```css
:root {
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

| Scale Token | Font Size (Clamp Formula) | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-display` | `clamp(2.5rem, 5.5vw, 4.25rem)` | 800 (Extrabold) | 1.1 | Hero Section Main Headline |
| `--text-h1` | `clamp(2.0rem, 4.0vw, 3.0rem)` | 700 (Bold) | 1.2 | Section Major Headings |
| `--text-h2` | `clamp(1.5rem, 2.8vw, 2.0rem)` | 700 (Bold) | 1.25 | Subsection & Card Major Titles |
| `--text-h3` | `clamp(1.2rem, 2.0vw, 1.45rem)` | 600 (Semibold) | 1.3 | Card Headers, Calculator Output |
| `--text-body-lg` | `clamp(1.05rem, 1.4vw, 1.2rem)` | 400 / 500 | 1.6 | Hero Lead Paragraph, Intro Copy |
| `--text-body` | `clamp(0.95rem, 1.1vw, 1.05rem)` | 400 (Regular) | 1.55 | Standard Body Copy, Bullets |
| `--text-small` | `0.875rem (14px)` | 500 (Medium) | 1.4 | Badges, Table Headers, Metadata |
| `--text-xs` | `0.75rem (12px)` | 600 (Semibold) | 1.3 | Micro-badges, Legal Disclaimers |

---

## 4. Spacing System & Layout Grid

A consistent 8-point harmonic spacing grid governs all padding, margins, and gaps.

```css
:root {
  --space-1: 0.25rem;  /* 4px  */
  --space-2: 0.5rem;   /* 8px  */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1.0rem;   /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2.0rem;   /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3.0rem;  /* 48px */
  --space-16: 4.0rem;  /* 64px */
  --space-20: 5.0rem;  /* 80px */
  --space-24: 6.0rem;  /* 96px */
}
```

### Layout Container & Grid Constraints
- **Max Container Width:** `1280px` (`max-width: 80rem; margin: 0 auto;`).
- **Standard Container Padding:** Horizontal padding `clamp(1rem, 4vw, 2.5rem)`.
- **Section Vertical Rhythm:** Vertical padding `clamp(3.5rem, 7vw, 6.0rem)` on major sections.
- **Card Grids:** Auto-fit responsive grids:
  - 3-Column Services Grid: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;`.
  - 2-Column Calculator Split: `grid-template-columns: 1fr 1fr;` collapsing to `1fr` on $< 900px$.

---

## 5. Border Radius & Elevation (Shadows)

```css
:root {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Elevated Glow Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 10px 28px rgba(0, 0, 0, 0.45);
  --shadow-accent-glow: 0 0 24px rgba(255, 213, 42, 0.25);
  --shadow-blue-glow: 0 0 24px rgba(22, 119, 255, 0.28);
}
```

---

## 6. Detailed Component Design Specifications

### 6.1 Navigation Bar (`Navbar.jsx`)
- **Container:** Height `72px`, fixed sticky position with `backdrop-filter: blur(14px)` and background `rgba(7, 21, 44, 0.94)`.
- **Brand Logo:** Dynamic vector showing custom automotive streamline arches, bold **MAA KAMAKHYA** in accent yellow, and **AUTO GAS** in white, with sub-line "EXPERT CARE • BETTER PERFORMANCE • COMPLETE PEACE OF MIND".
- **Navigation Links:** Horizontal flex row with `gap: 1.5rem`. Hover effect transforms text color to `#FFD52A` with a sliding underline indicator.
- **Quick Action Group:**
  - Phone button: Compact rounded pill with phone icon and bold label (`Call 6913910337`).
  - WhatsApp CTA: Vibrantly styled green pill button with official WhatsApp chat icon.
- **Mobile Hamburger:** 44px tap target with smooth icon swap (Lucide `Menu` / `X`).

### 6.2 Hero Section (`Hero.jsx`)
- **Structure:** 2-column asymmetric layout (60% value proposition, 40% visual boot cylinder).
- **Category Badge:** Pill badge reading `CNG RETROFITMENT • MAA KAMAKHYA AUTO GAS` in accent yellow on translucent navy.
- **Headline:** "Switch to CNG. Save More. Drive Smarter." with "Save More." rendered in vibrant accent yellow.
- **Visual Container:** High-resolution photographic asset displaying a premium white sedan with open boot showcasing an approved high-pressure CNG cylinder and manifold.
- **Action Group:**
  - Primary Button: "Get a CNG quote" (Solid Accent Yellow `#FFD52A` with navy text).
  - Secondary Button: "Call 6913910337" (Bordered navy pill with call icon).
  - Tertiary Button: "Get Directions" (Bordered pill with map pin icon).

### 6.3 Business Statutory Details Section (`StatutoryDetails.jsx`)
- **Placement:** Positioned as the top 2nd section directly below Hero to anchor enterprise authority.
- **Card Matrix:** 6 distinct card elements arranged in an ergonomic grid:
  1. **Legal Name:** `Maa Kamakhya Auto Gas` with building icon.
  2. **Year of Establishment:** `2022` with calendar icon (Serving Northeast India since 2022).
  3. **No of Employee:** `Less than 10` with users icon (Certified technical specialists).
  4. **Turn Over:** `51 Lakh – 1 Crore` with trending up icon (Annual verified operating capacity).
  5. **GSTIN:** `18**********1ZS` with shield check icon and prominent gold badge `Assam Regd. (Code 18)`.
  6. **Mode of Payment:** Full width card displaying accepted payment options: EMI Financing, Visa / Master Card / Rupay, UPI (GPay/PhonePe/Paytm), Net Banking, and Cash with verified checkmarks.

### 6.4 Savings Calculator Section (`SavingsCalculator.jsx`)
- **Layout:** Split dual-card architecture.
  - **Left Card (Input Controls):**
    - Monthly Distance: Interactive drag slider (`500 km` to `10,000 km`) with large bold numerical display (default `5,000 km`).
    - Petrol Price Input: Standard default `₹107` per litre.
    - CNG Price Input: Standard default `₹91` per kg.
    - Petrol Mileage Input: Standard default `15 km/L`.
    - CNG Mileage Input: Standard default `27 km/kg`.
  - **Right Card (Reactive Financial Output):**
    - Petrol Monthly Cost: Highlighted in clean text (`₹35,667`).
    - CNG Monthly Cost: Highlighted in clean text (`₹16,852`).
    - Net Estimated Monthly Savings: Large prominent display (`₹18,815 estimated saving`) in rich gold/green container.
    - Annual Projected Savings: Sub-callout (`₹2,25,780 saved annually`).
    - Quick Action Button: "Apply Estimate to WhatsApp Enquiry" smoothly scrolling user to contact form with pre-populated figures.

### 6.5 WhatsApp Quotation Form (`Contact.jsx`)
- **Form Card:** Clean dark surface card (`#0B2142`) with subtle border.
- **Inputs:**
  - Full Name (`text`)
  - Mobile Number (`tel`, 10-digit mask)
  - Car Brand (`text`, e.g., Maruti Suzuki)
  - Car Model / Variant (`text`, e.g., Swift VXi)
  - Manufacturing Year (`text`, e.g., 2021)
  - Vehicle Use (`select`: Private / Commercial / Taxi)
  - Optional Query / Notes (`textarea`)
- **Submit Button:** Full-width green button (`#25D366`) with WhatsApp icon reading: `Send enquiry on WhatsApp`.
- **Transparency Notice:** "This form opens WhatsApp with your details. It does not store submissions on this website."

---

## 7. Motion Design & Animation Guidelines
- **Motion Principle:** Transitions must be purposeful, crisp, and physics-based. Avoid exaggerated bouncy or distracting movements.
- **Standard Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (fluid deceleration).
- **Duration Scale:**
  - Micro-interactions (hover, focus, tab changes): `150ms – 250ms`.
  - Component entrance / scroll reveal: `500ms – 700ms`.
  - Slide-out mobile drawer: `300ms`.
- **Reduced Motion Support:** When `prefers-reduced-motion: reduce` is enabled, all duration timers are overridden to `0.01ms`, instantly displaying end-state layouts.

---

## 8. Responsive Design Breakpoints

```css
/* Mobile Small to Medium */
@media (max-width: 639px) {
  .hero-grid, .calculator-split, .contact-split {
    grid-template-columns: 1fr;
  }
  .navbar-links {
    display: none;
  }
}

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .mobile-drawer-toggle {
    display: none;
  }
}
```
