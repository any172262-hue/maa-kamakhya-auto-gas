# API Specification & Communication Protocols (API_SPECIFICATION.md)

## Project Information
- **Project Name:** Maa Kamakhya Auto Gas Web Platform
- **Legal Entity:** Maa Kamakhya Auto Gas
- **Document Version:** 1.0.0 (Production Release)
- **Status:** Approved / Protocol & Future Interface Baseline
- **Last Updated:** 2026-11-15
- **Document Owner:** Lead API Architect & Integration Engineer

---

## 1. MVP Protocol Architecture: Zero-Backend Direct Client Integration

> [!IMPORTANT]
> **MVP Production Status: NO BACKEND REST/GRAPHQL API REQUIRED**
>
> The current production release of the **Maa Kamakhya Auto Gas** web platform functions entirely as a client-side web application. It requires no proprietary backend web services or REST APIs to operate.
>
> All external communications and conversion workflows are executed via standard internet URI schemes and third-party platform protocols:
> 1. **WhatsApp Deep-Link Protocol** (`https://wa.me/` protocol)
> 2. **Telephony URI Protocol** (`tel:` protocol)
> 3. **Geographic Mapping Protocol** (`https://maps.google.com/` protocol)

---

## 2. MVP Client Integration Protocols

### 2.1 WhatsApp Deep-Link Protocol Specification
The application constructs dynamically encoded URLs compliant with WhatsApp Web and mobile application protocols.

- **Base Endpoint:** `https://wa.me/`
- **Target Recipient Number:** `916913910337` (Verified official WhatsApp business number of Maa Kamakhya Auto Gas)
- **HTTP Method:** `GET`
- **Parameter:** `text` (URI-encoded UTF-8 string)

#### Serialization Payload Schema:
```typescript
interface WhatsAppQuotePayload {
  name: string;                // Customer full name (min 2 chars)
  phone: string;               // 10-digit customer mobile number
  brand: string;               // Vehicle manufacturer (e.g., Maruti Suzuki)
  model: string;               // Model and variant (e.g., Swift VXi)
  year: string | number;       // Year of manufacture (e.g., 2021)
  usage: 'Private' | 'Commercial' | 'Taxi'; // Operational usage category
  note?: string;               // Custom inquiry or calculated savings figures
}
```

#### Message Template Format:
```
Hello Maa Kamakhya Auto Gas team,

I would like to request a CNG conversion estimate for my vehicle:

• Name: {name}
• Phone: {phone}
• Vehicle Brand: {brand}
• Model / Variant: {model}
• Manufacturing Year: {year}
• Usage: {usage}
• Details/Savings: {note}

Please share recommended kit options, warranty, and installation timeline.
```

#### Encoding Implementation:
```javascript
const targetUrl = `https://wa.me/916913910337?text=${encodeURIComponent(formattedText)}`;
window.open(targetUrl, '_blank', 'noopener,noreferrer');
```

---

### 2.2 Telephony Direct Dialer Protocol
Used across header, hero, and contact cards for immediate voice communication with workshop engineers.
- **Protocol:** `tel:`
- **Target Number:** `+916913910337`
- **Format:** `<a href="tel:+916913910337">Call 6913910337</a>`
- **Behavior:** On mobile platforms (Android/iOS), launches native dialer; on desktop platforms, invokes configured VoIP client (Skype, FaceTime, or default dialer).

---

### 2.3 Geographic Navigation Protocol
Provides turn-by-turn navigation directly to the physical workshop in Garchuk, Guwahati.
- **Target URL:** `https://maps.google.com/?q=Raj+Energy+Station+Garchuk+Guwahati+Assam`
- **Format:** `<a href="..." target="_blank" rel="noopener noreferrer">Get Directions</a>`
- **Behavior:** Directly resolves coordinates and workshop landmarks in Google Maps app or browser.

---

## 3. Future Backend REST API Specification (Post-MVP Roadmap)

When a centralized CRM and backend server are deployed in subsequent development phases, the following RESTful API endpoints will be exposed at `https://api.maakamakhyaautogas.com/v1`.

### 3.1 Endpoint: Submit Lead & Quote Request
- **Route:** `POST /api/v1/leads`
- **Content-Type:** `application/json`
- **Authentication:** `Public / Rate-limited` (Cloudflare Turnstile token verification)

#### Request Body Schema:
```json
{
  "fullName": "Rajesh Sarma",
  "phoneNumber": "9864012345",
  "email": "rajesh.sarma@example.com",
  "vehicleBrand": "Maruti Suzuki",
  "vehicleModel": "Swift VXi",
  "manufacturingYear": 2021,
  "vehicleUsage": "Private",
  "calculationSnapshot": {
    "monthlyDistanceKm": 5000,
    "petrolPriceInr": 107.0,
    "cngPriceInr": 91.0,
    "estimatedMonthlySavingsInr": 18815.0
  },
  "customerNote": "Interested in 14kg cylinder option and boot space availability."
}
```

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "leadId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "message": "Inquiry successfully received. Our certified technician will contact you shortly.",
  "assignedWorkshop": "Garchuk Main Center, Guwahati",
  "whatsAppFollowUpSent": true,
  "timestamp": "2026-11-15T10:30:00Z"
}
```

#### Error Responses:
- `400 Bad Request`: Validation failure on phone number or required fields.
- `429 Too Many Requests`: Rate limit exceeded (more than 5 requests per minute per IP).
- `500 Internal Server Error`: Server exception.

---

### 3.2 Endpoint: Fuel Savings Calculation Engine API
- **Route:** `POST /api/v1/calculator/evaluate`
- **Content-Type:** `application/json`

#### Request Body Schema:
```json
{
  "distanceKm": 5000,
  "petrolPrice": 107.0,
  "cngPrice": 91.0,
  "petrolMileage": 15.0,
  "cngMileage": 27.0
}
```

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "inputs": {
    "distanceKm": 5000,
    "petrolPrice": 107.0,
    "cngPrice": 91.0,
    "petrolMileage": 15.0,
    "cngMileage": 27.0
  },
  "results": {
    "petrolMonthlyCost": 35667,
    "cngMonthlyCost": 16852,
    "netMonthlySavings": 18815,
    "netAnnualSavings": 225780,
    "percentageSaved": 52.75,
    "breakevenMonths": 3.2
  }
}
```

---

### 3.3 Endpoint: Vehicle Compatibility Lookup
- **Route:** `GET /api/v1/vehicles/compatibility?brand=Maruti%20Suzuki`
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "brand": "Maruti Suzuki",
  "models": [
    {
      "model": "Swift",
      "compatibleVariants": ["LXi", "VXi", "ZXi (1.2L DualJet)"],
      "recommendedKit": "Sequential OBD-II Italian EFI",
      "cylinderOptions": ["12kg (60L)", "14kg (65L)"],
      "rtoApprovedAssam": true,
      "warrantyMonths": 24
    },
    {
      "model": "Dzire",
      "compatibleVariants": ["Tour S", "LXi", "VXi", "ZXi"],
      "recommendedKit": "Sequential OBD-II Commercial Heavy-Duty",
      "cylinderOptions": ["14kg (65L)", "Dual Cylinder Option"],
      "rtoApprovedAssam": true,
      "warrantyMonths": 24
    }
  ]
}
```

---

## 4. Standard HTTP Status & Error Codes (Future Backend)

| Code | Status Name | Description |
|---|---|---|
| `200` | OK | Request processed successfully. |
| `201` | Created | Resource (Lead or Booking) successfully created. |
| `400` | Bad Request | Request payload failed schema validation (e.g. invalid phone number). |
| `404` | Not Found | Requested vehicle or resource not found. |
| `429` | Too Many Requests | Rate limiting active to prevent spam submissions. |
| `500` | Internal Error | Unhandled backend exception logged for engineering triage. |
