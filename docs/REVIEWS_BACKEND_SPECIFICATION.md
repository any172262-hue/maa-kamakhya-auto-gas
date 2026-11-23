# Customer Ratings & Reviews Backend Specification
**Project:** Maa Kamakhya Auto Gas  
**Platform:** Static Client-Side React SPA on GitHub Pages  
**Target Backend:** Serverless API / Cloud Edge Function with Persistent SQL/NoSQL Storage  
**Author:** Software Architecture & Security Lead  
**Date:** November 23, 2026

---

## 1. Hosting Environment & Backend Requirement Analysis

### The GitHub Pages Constraint
The Maa Kamakhya Auto Gas website is currently hosted on **GitHub Pages**, which operates exclusively as a static content delivery network (CDN):
* **No Server-Side Process:** GitHub Pages cannot execute server-side Node.js, Python, PHP, or Go runtime code.
* **No Persistent Server Storage:** Static files are served read-only from Git commits; files cannot be written or modified via HTTP POST requests.
* **Client-Side Moderation Standard:** The client application currently provides an honest, zero-fabrication reviews UI:
  - When zero approved reviews exist, it renders the honest empty state: *"Be the first to share your experience with Maa Kamakhya Auto Gas."*
  - New submissions are marked with `status: 'pending'` and held in moderation storage.
  - Approved reviews dynamically recalculate the average rating and review count.

### The Production Requirement
To persist customer reviews across multiple visitors globally and allow the workshop owner to approve reviews from any device, a lightweight backend API must be deployed.

---

## 2. Recommended Production Backend Architecture

Three modern, cost-effective serverless architectures are recommended:

### Option A: Cloudflare Workers + D1 Database (Recommended)
* **Hosting:** Cloudflare Workers (Edge Serverless).
* **Database:** Cloudflare D1 (Serverless SQLite at the edge).
* **Cost:** 100% Free tier (up to 100,000 requests/day, 5 GB storage).
* **Pros:** Blazing-fast edge execution, zero cold starts, native DDoS protection, built-in Cloudflare Turnstile bot prevention.

### Option B: Supabase (PostgreSQL + PostgREST)
* **Hosting:** Managed Cloud PostgreSQL.
* **Database:** PostgreSQL with Row Level Security (RLS).
* **Cost:** Free tier (up to 500 MB database, 50,000 monthly active users).
* **Pros:** Built-in web dashboard for the workshop owner to click "Approve" or "Reject" on reviews without writing any code.

### Option C: Vercel / Netlify Serverless Functions + MongoDB Atlas
* **Hosting:** Vercel / Netlify Edge Functions.
* **Database:** MongoDB Atlas (M0 Free Tier).
* **Cost:** Free tier.
* **Pros:** Simple Node.js/Express-like handler functions (`/api/reviews.js`).

---

## 3. Database Schema

### SQL Schema (`reviews` Table)
```sql
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,                       -- UUID v4
  customer_name TEXT NOT NULL,               -- Sanitized display name (max 50 chars)
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_category TEXT,                     -- Service received (e.g. 'Sequential CNG Installation')
  comment TEXT NOT NULL,                     -- Review body (10 - 1000 chars)
  status TEXT NOT NULL DEFAULT 'pending',    -- 'pending', 'approved', 'rejected'
  is_verified BOOLEAN NOT NULL DEFAULT 0,    -- 1 if customer visit was verified
  ip_hash TEXT NOT NULL,                     -- Salted SHA-256 hash for privacy-safe rate limiting
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  moderator_id TEXT
);

CREATE INDEX idx_reviews_status ON reviews(status, created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

---

## 4. REST API Specification

### 1. `GET /api/reviews`
* **Access:** Public (CORS enabled for `https://any172262-hue.github.io`).
* **Description:** Retrieves all approved reviews and computed summary statistics.
* **Response (200 OK):**
```json
{
  "summary": {
    "averageRating": 4.8,
    "totalReviews": 12,
    "starCounts": { "5": 10, "4": 2, "3": 0, "2": 0, "1": 0 },
    "starPercentages": { "5": 83, "4": 17, "3": 0, "2": 0, "1": 0 }
  },
  "reviews": [
    {
      "id": "rev_9f81a7b2",
      "name": "Sunil Deka",
      "rating": 5,
      "service": "Sequential CNG Kit Installation",
      "comment": "Excellent sequential kit fitting on my WagonR. Engine runs smooth with zero vibration and great mileage.",
      "createdAt": "2026-11-23T10:30:00Z",
      "isVerified": true
    }
  ]
}
```

### 2. `POST /api/reviews`
* **Access:** Public (Rate limited: 1 submission per IP hash per 10 minutes).
* **Description:** Validates and queues a customer review for moderation.
* **Request Body:**
```json
{
  "name": "Sunil Deka",
  "rating": 5,
  "service": "Sequential CNG Kit Installation",
  "comment": "Excellent sequential kit fitting on my WagonR...",
  "honeypot": ""
}
```
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for sharing your experience! Your review has been submitted for moderation and will appear publicly once verified by our workshop team.",
  "reviewId": "rev_9f81a7b2"
}
```

### 3. `GET /api/admin/reviews/pending`
* **Access:** Restricted (Requires `Authorization: Bearer <ADMIN_SECRET_KEY>`).
* **Description:** Retrieves pending reviews awaiting workshop owner approval.

### 4. `PATCH /api/admin/reviews/:id/approve`
* **Access:** Restricted (Requires `Authorization: Bearer <ADMIN_SECRET_KEY>`).
* **Description:** Sets `status = 'approved'` and `approved_at = NOW()`.

### 5. `DELETE /api/admin/reviews/:id`
* **Access:** Restricted (Requires `Authorization: Bearer <ADMIN_SECRET_KEY>`).
* **Description:** Rejects or removes spam/abusive submissions.

---

## 5. Security & Anti-Abuse Standards

1. **Anti-Spam Honeypot:** Form includes a hidden field (`honeypot`). Submissions with filled honeypot fields are rejected without processing.
2. **Privacy-Preserving Rate Limiting:** IP addresses are salted and hashed using SHA-256 before rate-limit comparison. No raw IP addresses are permanently stored.
3. **HTML Sanitization:** All text inputs are stripped of `<script>`, `<iframe>`, `<img>`, and HTML tags before database storage.
4. **Google Search Spam Compliance:** No fabricated `aggregateRating` schema markup is emitted. Reviews are only indexed when verified by genuine customers.

---

## 6. Frontend Integration Switch

In [src/services/reviewService.js](file:///C:/Users/rd364/.gemini/antigravity/scratch/maa-kamakhya-auto-gas/src/services/reviewService.js), a single environment variable can activate live backend API connectivity:
```javascript
const API_URL = import.meta.env.VITE_REVIEWS_API_URL;

export async function fetchLiveReviews() {
  if (!API_URL) return getApprovedReviews(); // Fallback to local storage
  const res = await fetch(`${API_URL}/api/reviews`);
  return res.json();
}
```
This enables an instant transition to live serverless database synchronization as soon as the backend is deployed.
