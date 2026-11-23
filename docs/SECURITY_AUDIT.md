# Security & Privacy Audit Report (SECURITY_AUDIT.md)
**Website:** Maa Kamakhya Auto Gas  
**Production Domain:** `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`  
**Architecture:** Static Client-Side Single Page Application (React 18 + Vite 5)  
**Hosting Target:** GitHub Pages (Static Hosting)  
**Audit Completed:** November 23, 2026  
**Auditor Role:** Senior Security Engineer & Application Security Specialist  
**Overall Security Status:** PASS — Zero Critical Vulnerabilities / Zero Exposed Secrets / Zero PII Exposure  

---

## 1. Secrets, Credentials & Key Management

### Audit Methodology
Automated pattern matching and heuristic entropy analysis was executed across all directories (excluding `node_modules`, `.git`, and `dist`) targeting:
- Google Cloud API keys (`AIza...`)
- GitHub Personal Access Tokens (`ghp_...`)
- AWS Access Keys (`AKIA...`)
- PEM/RSA Private Keys (`BEGIN PRIVATE KEY`)
- Hardcoded passwords and database connection strings
- Secret environment variables in frontend code

### Findings
| Credential / Secret Type | Scan Result | Status | Action Taken |
|---|---|---|---|
| API Keys & Cloud Credentials | 0 Found | PASS | Verified absence across all client code |
| Private Cryptographic Keys | 0 Found | PASS | Verified absence |
| Database Connection Strings | 0 Found | PASS | Verified absence (zero backend DB required) |
| SMTP / Email Service Passwords | 0 Found | PASS | Verified absence |
| Unverified Personal Email | 1 Found (`axomoneofficial@gmail.com`) | REMOVED | Removed unverified email from `siteConfig.js`, JSON-LD, Footer, and Contact pages |

---

## 2. Customer Privacy & PII Safeguards

### Threat Model & Storage Inspection
Static hosting environments on GitHub Pages must never contain or expose customer transaction records, lead lists, or personal communication logs.
- **Inspection Targets:** `server/data/enquiries.json`, backup archives, CSV exports, test fixtures, log files.
- **Scan Outcome:** **Zero customer records detected.**
- **Lead Submission Architecture:**
  - The website stores **no customer data in databases, localStorage, or server files**.
  - All customer enquiries are client-mediated via WhatsApp (`https://wa.me/918822049075`) and Telephony (`tel:+916913910337`).
  - Visitors are shown an upfront verification modal summarizing their entered details before WhatsApp is opened, ensuring complete transparency and user agency.
  - A 3-second "Hold to Cancel" button prevents unintended transmissions.

---

## 3. Frontend Application Security

### Cross-Site Scripting (XSS)
- **React DOM Rendering:** All dynamic text and user inputs are rendered using standard React JSX data binding, automatically escaping HTML entities.
- **Dangerous Invocations:** Zero instances of `dangerouslySetInnerHTML`, `eval()`, `Function()`, or `document.write()` exist in the application.
- **Input Sanitization:** Contact form inputs (name, phone, vehicle model, message) are strictly validated:
  - Mobile numbers validated against Indian 10-digit mobile prefix rules (`^[6-9]\d{9}$`).
  - Name inputs constrained to `2..80` characters.
  - Form inputs are URI-encoded using `encodeURIComponent()` before deep-linking to WhatsApp.

### Unsafe Redirects & Links
- All external links (`https://maps.google.com`, `https://wa.me/`, social channels) declare `rel="noopener noreferrer"` and `target="_blank"`.
- Navigation uses strictly validated internal anchor hashes (`#hero`, `#services`, `#contact`, etc.) preventing open redirect attacks.

---

## 4. Backend & Infrastructure Security

- **Hosting Environment:** GitHub Pages static asset hosting.
- **Backend Absence:** No Express or Node server runs in production. This eliminates entire classes of web vulnerabilities:
  - SQL Injection: **Not Applicable (Zero SQL databases)**
  - Remote Code Execution (RCE): **Not Applicable**
  - Session Hijacking / Cookie Tampering: **Not Applicable (Stateless)**
  - Server-Side Request Forgery (SSRF): **Not Applicable**

---

## 5. HTTP Security Headers

Security headers are implemented via HTML `<meta>` tags in `index.html` and static server header rules in `public/_headers`:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; frame-src 'self' https://maps.google.com https://www.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me;
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

- **Frame Restrictions:** Embedded frames are restricted strictly to Google Maps.
- **Form Actions:** Restricted strictly to self and `https://wa.me`.

---

## 6. Dependency Vulnerability Audit (`npm audit`)

An audit of all 70 installed npm packages was performed:
- **Production Dependencies (`react`, `react-dom`, `lucide-react`):** **0 vulnerabilities.**
- **Development Dependencies:** Vite `<=6.4.3` dev-dependency advisory noted (affects local dev server debug sourcemap path handling; zero impact on static production build artifacts in `dist/`).
- **Overrides:** `esbuild@0.25.0` pinned in `package.json` overrides.

---

## 7. Security Audit Conclusion

| Dimension | Evaluation | Status |
|---|---|---|
| Secrets & Keys | Zero exposed credentials | **PASS** |
| Customer Privacy | Zero stored PII; client-mediated WhatsApp handoff | **PASS** |
| XSS & Injection | Safe React bindings; zero `dangerouslySetInnerHTML` | **PASS** |
| Content Security Policy | Restrictive CSP enabled | **PASS** |
| Third-Party Dependencies | Clean runtime dependencies | **PASS** |
| Infrastructure | Secure static hosting on GitHub Pages | **PASS** |
