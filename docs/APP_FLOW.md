# Application User Flow & Navigation Architecture (APP_FLOW.md)

## Project Information
- **Project Name:** Maa Kamakhya Auto Gas Web Platform
- **Legal Entity:** Maa Kamakhya Auto Gas
- **Document Version:** 1.0.0 (Production Release)
- **Status:** Approved / Interaction Baseline
- **Last Updated:** 2026-11-15
- **Document Owner:** Lead UX Designer & Systems Flow Architect

---

## 1. End-to-End Primary User Journey

```mermaid
flowchart TD
    Visit([User Arrives via Search, Ad, or Direct Link]) --> HeroView[Hero Section: Value Proposition & Visual Boot Cylinder]
    
    HeroView --> QuickAction{Initial User Intent}
    QuickAction -->|Immediate Phone Call| PhoneDial[Native Phone Call: tel:+916913910337]
    QuickAction -->|Request Quote Immediately| QuickQuoteScroll[Smooth Scroll to Contact Form]
    QuickAction -->|Visit Physical Location| OpenMaps[Google Maps Directions: Garchuk Workshop]
    QuickAction -->|Explore & Verify Workshop| ScrollStatutory[View Business Statutory Details]
    
    ScrollStatutory --> ReviewLegal[Inspect Legal Name, GSTIN, Est. 2022, Payment Modes & EMI]
    ReviewLegal --> TrustProof[Inspect Social Proof: 3,500+ Cars Converted, 55% Cost Reduction]
    TrustProof --> WhyCNG[Review Why Choose CNG Cards: Fuel Economy, Green Air, Pro Care]
    
    WhyCNG --> ServiceBrowse[Explore Service Offerings: Sequential Kits, Hydro-Testing, Diagnostics]
    ServiceBrowse -->|Click 'Get Specific Estimate'| PrefillService[Prefill Contact Form with Selected Service & Auto-Scroll]
    ServiceBrowse --> TechnicalBenefits[Examine 6 Engineering & Safety Benefits]
    
    TechnicalBenefits --> CalculatorSection[Interactive Savings Calculator]
    CalculatorSection --> AdjustParameters[User Moves Distance Slider & Adjusts Fuel Rates]
    AdjustParameters --> ReactiveCalculation[Real-time Live Calculation of Monthly & Annual Savings]
    
    ReactiveCalculation --> CalcAction{User Next Step}
    CalcAction -->|Transfer Estimate to WhatsApp| TransferToForm[Auto-Fill Savings into Message & Scroll to Form]
    CalcAction -->|Continue Learning| SchematicView[Inspect Complete Car CNG Installation Diagram]
    
    SchematicView --> CompatibilityCheck[Select Car Brand in Compatibility Matrix: Maruti, Hyundai, Tata, etc.]
    CompatibilityCheck --> WorkflowView[Review 5-Step Professional Installation Process]
    WorkflowView --> CTABanner[View Promotional Conversion Banner]
    
    CTABanner --> FormSection[Contact & WhatsApp Quotation Form]
    TransferToForm --> FormSection
    PrefillService --> FormSection
    QuickQuoteScroll --> FormSection
    
    FormSection --> FillForm[User Enters: Name, 10-Digit Mobile, Car Brand, Model, Year, Usage Type]
    FillForm --> Validate{Client-Side Validation}
    
    Validate -->|Validation Errors| ShowInlineErrors[Display Helpful Error Tooltip & Focus Invalid Field]
    ShowInlineErrors --> FillForm
    
    Validate -->|Valid Submission| SerializeWhatsApp[Construct Encoded WhatsApp Deep Link]
    SerializeWhatsApp --> OpenWhatsApp[Launch WhatsApp Web / App: wa.me/916913910337]
    OpenWhatsApp --> DirectChat([Direct Chat Initiated with Certified Workshop Specialist])
```

---

## 2. Step-by-Step Navigation & Page Transition Flows

### 2.1 Sticky Header Navigation & Scrollspy
1. **Initial Header State:** The navigation bar is rendered fixed at `top: 0; left: 0; right: 0; z-index: 1000;`. On scroll, a subtle backdrop-blur (`backdrop-filter: blur(12px)`) and navy background (`rgba(7, 21, 44, 0.92)`) are engaged.
2. **Desktop Link Interaction:**
   - User clicks any anchor: `Benefits`, `Services`, `Savings Calculator`, `Compatibility`, `How It Works`, `Location`, or `Contact`.
   - The browser initiates a smooth scroll (`scroll-behavior: smooth`) toward the corresponding section ID.
   - A global `scroll-margin-top: 80px` prevents the sticky navbar from occluding section headers.
3. **Scrollspy Tracking:**
   - An active Intersection Observer monitors visible sections.
   - The corresponding link in the navbar is dynamically styled with an active yellow indicator (`#FFD52A`) and subtle background highlight.
4. **Quick Action Triggers:**
   - **"Call" button:** Triggers `tel:+916913910337`.
   - **"WhatsApp" button:** Dispatches an immediate introductory WhatsApp chat link.

---

## 3. Detailed Sub-Flows & User Decision Trees

### 3.1 Fuel Savings Calculator Decision Tree

```mermaid
flowchart TD
    CalcEntry[User Focuses on Savings Calculator] --> DefaultState[Default: 5,000 km, ₹107/L Petrol, ₹91/kg CNG, 15 km/L, 27 km/kg]
    DefaultState --> DisplayDefault[Displays: Petrol ₹35,667 | CNG ₹16,852 | Net Savings ₹18,815/mo]
    
    DisplayDefault --> UserChange{User Adjustment}
    UserChange -->|Drags Distance Slider| UpdateDist[Slider moves: 500 km to 10,000 km range]
    UserChange -->|Changes Petrol Price| UpdatePP[Petrol price input modified: e.g., ₹105 - ₹110]
    UserChange -->|Changes CNG Price| UpdateCP[CNG price input modified: e.g., ₹88 - ₹95]
    UserChange -->|Changes Petrol Mileage| UpdatePM[Mileage modified: e.g., 12 to 22 km/L]
    UserChange -->|Changes CNG Mileage| UpdateCM[CNG mileage modified: e.g., 20 to 32 km/kg]
    
    UpdateDist --> PureRecompute[Pure JS recompute in useMemo: < 1ms execution]
    UpdatePP --> PureRecompute
    UpdateCP --> PureRecompute
    UpdatePM --> PureRecompute
    UpdateCM --> PureRecompute
    
    PureRecompute --> UpdateUI[Instant Reactive Animated Numbers: Petrol, CNG, Net Monthly & Annual Savings]
    UpdateUI --> TransferCTA{Click 'Apply Estimate to WhatsApp'}
    
    TransferCTA --> FormFill[Prefills Contact Form with: 'Estimated monthly travel: X km. Calculated savings: ₹Y/mo.']
    FormFill --> ScrollToContact[Smoothly scrolls user directly to Contact Form]
```

### 3.2 Vehicle Compatibility Matrix Selection Flow

```mermaid
flowchart TD
    CompView[Compatibility Section Visible] --> TabSelect{User Selects Brand Tab}
    
    TabSelect -->|Maruti Suzuki| ShowMaruti[Displays: Swift, Dzire, Baleno, WagonR, Brezza, Ertiga, Celerio]
    TabSelect -->|Hyundai| ShowHyundai[Displays: Grand i10 Nios, Aura, i20, Venue, Creta, Santro]
    TabSelect -->|Tata Motors| ShowTata[Displays: Tiago, Tigor, Altroz, Punch, Nexon Petrol]
    TabSelect -->|Honda| ShowHonda[Displays: Amaze, City 1.5, Jazz, WR-V]
    TabSelect -->|Toyota| ShowToyota[Displays: Glanza, Urban Cruiser, Etios, Yaris]
    
    ShowMaruti --> CardDetails[Shows: Engine CC, Recommended Kit Type, Cylinder Capacity & RTO Endorsement Status]
    ShowHyundai --> CardDetails
    ShowTata --> CardDetails
    ShowHonda --> CardDetails
    ShowToyota --> CardDetails
    
    CardDetails --> CheckOther{User car not listed?}
    CheckOther -->|Click 'Check My Car on WhatsApp'| OpenWhatsAppCustom[Opens WhatsApp with 'Inquiring compatibility for custom vehicle']
```

---

## 4. WhatsApp Form Submission & Serialization Flow

```mermaid
flowchart TD
    FormStart[User Interacts with Contact Form] --> InputName[Enters Full Name]
    InputName --> InputPhone[Enters 10-Digit Mobile Number]
    InputPhone --> InputBrand[Enters Car Brand: e.g., Maruti Suzuki]
    InputBrand --> InputModel[Enters Car Model: e.g., Swift VXi]
    InputModel --> InputYear[Enters Manufacturing Year: e.g., 2021]
    InputYear --> SelectUsage[Selects Vehicle Use: Private / Commercial / Taxi]
    SelectUsage --> InputNote[Enters Optional Specific Question or Calculation Note]
    
    InputNote --> ClickSubmit[Clicks 'Send enquiry on WhatsApp' Button]
    ClickSubmit --> RunValidator{Validation Engine}
    
    RunValidator -->|Name < 2 chars| ErrName[Show: 'Please enter your name']
    RunValidator -->|Phone != 10 digits| ErrPhone[Show: 'Please enter a valid 10-digit mobile number']
    RunValidator -->|Car Brand empty| ErrBrand[Show: 'Please provide your car brand']
    RunValidator -->|Car Model empty| ErrModel[Show: 'Please provide your car model/variant']
    
    ErrName --> HighlightField[Focus input & apply red border shake animation]
    ErrPhone --> HighlightField
    ErrBrand --> HighlightField
    ErrModel --> HighlightField
    
    RunValidator -->|All Fields Valid| ConstructURL[Build WhatsApp Message Payload]
    ConstructURL --> EncodePayload[Format Text with Greeting, Car Specs, Usage & Disclaimer]
    EncodePayload --> URL[Generate: https://wa.me/916913910337?text=ENCODED_STRING]
    URL --> TriggerWindow[Execute window.open with noopener,noreferrer]
    TriggerWindow --> SuccessReset[Display confirmation notice on form]
```

### Form Serialization Format:
```
Hello Maa Kamakhya Auto Gas team,

I would like to request a CNG conversion estimate for my vehicle:

• Name: [Customer Name]
• Phone: [Customer Phone]
• Vehicle Brand: [Car Brand]
• Model / Variant: [Car Model]
• Manufacturing Year: [Year]
• Usage: [Private / Commercial]
• Details/Savings: [User Note or Calculated Savings]

Please share recommended kit options, warranty, and installation timeline.
```

---

## 5. Mobile Drawer Navigation Flow
1. **Drawer Trigger:** On screens $< 1024px$, the horizontal navigation links collapse into an accessible hamburger icon button (`aria-label="Toggle navigation menu"`).
2. **Open Transition:** Clicking the hamburger toggles the drawer state (`isOpen: true`). An overlay backdrop fades in, and the mobile drawer slides down with smooth CSS transitions (`transform: translateY(0); opacity: 1;`).
3. **Scroll Lock:** Background body scrolling is gently restricted while the drawer is expanded.
4. **Selection & Dismissal:**
   - Clicking any section anchor link triggers `setIsOpen(false)` and smoothly scrolls to the target.
   - Clicking the backdrop outside the drawer menu triggers `setIsOpen(false)`.
   - Pressing the `Escape` key immediately closes the drawer.

---

## 6. Error & Edge Case Handling Flows

| Edge Case | User Condition | System Response / Fallback Handling |
|---|---|---|
| **Invalid Form Submission** | User leaves phone number incomplete or enters non-numeric characters. | Real-time input masking limits entry to digits; on submission, an inline error badge alerts the user and smoothly scrolls/focuses the input. |
| **WhatsApp Block / Non-Installation** | User is on desktop without WhatsApp Web logged in. | The WhatsApp web redirect prompt opens in a new tab; fallback telephone number `6913910337` is visibly displayed beside the form. |
| **Extreme Calculator Inputs** | User enters ₹0 or negative fuel prices. | Input constraints clamp prices to valid operational ranges (min ₹40/kg, max ₹200/L); prevents NaN or negative cost calculations. |
| **Slow Cellular Network (2G/3G)** | Network latency prevents instant asset loading. | Critical layout is rendered purely via inline CSS and system fallbacks; zero layout shift occurs; text content and calculator remain 100% interactive instantly. |
| **Reduced Motion Preference** | User has `prefers-reduced-motion: reduce` configured at the OS level. | All slide and fade animations are bypassed; scroll transitions occur instantaneously. |
