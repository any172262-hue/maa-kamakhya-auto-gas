# Google Search Console Setup & Verification Guide
**Target Production Property:** `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`  
**Property Type:** URL Prefix  
**Sitemap URL:** `https://any172262-hue.github.io/maa-kamakhya-auto-gas/sitemap.xml`  
**Website:** Maa Kamakhya Auto Gas, Guwahati, Assam  

---

## 1. Overview & Verification Strategy

Google Search Console (GSC) is Google's official portal for monitoring how Googlebot discovers, crawls, renders, and indexes your website.

Because this project is hosted as a GitHub Pages project-site under the path `/maa-kamakhya-auto-gas/`, the recommended property configuration is **URL Prefix**.

> [!IMPORTANT]
> **No Placeholder or Fake Tokens:**  
> This project intentionally contains **zero fake Google verification codes** or mock meta tags in `index.html`. Follow the sanctioned steps below once the site owner accesses Google Search Console.

---

## 2. Step-by-Step Property Creation

1. Open [Google Search Console](https://search.google.com/search-console).
2. Sign in with the official business Google account (`axomoneofficial@gmail.com` or authorized administrator).
3. In the property selector dropdown in the top left, click **Add Property**.
4. Select the **URL Prefix** option (right-hand box).
5. Enter the exact canonical production URL:
   ```text
   https://any172262-hue.github.io/maa-kamakhya-auto-gas/
   ```
6. Click **Continue**.

---

## 3. Verifying Ownership on GitHub Pages

Google Search Console offers multiple verification methods for URL Prefix properties. For GitHub Pages hosting, use one of the two methods below:

### Method A: HTML File Upload (Recommended & Cleanest)
1. In the Search Console verification screen, select **HTML file upload**.
2. Download the verification file provided by Google (e.g., `google1234567890abcdef.html`).
3. Place this downloaded file directly into the project's `public/` directory:
   ```text
   maa-kamakhya-auto-gas/
   └── public/
       └── google1234567890abcdef.html
   ```
4. Run `npm run build` so Vite copies it into `dist/`.
5. Commit and push the change to your GitHub repository's `main` branch.
6. Once GitHub Pages finishes building (usually 1–2 minutes), test that the file loads in your browser:
   `https://any172262-hue.github.io/maa-kamakhya-auto-gas/google1234567890abcdef.html`
7. In Google Search Console, click **Verify**.

### Method B: HTML Meta Tag
1. In Search Console, select **HTML tag**.
2. Copy the `<meta name="google-site-verification" content="..." />` snippet.
3. Paste this meta tag into the `<head>` section of `index.html` (and `scripts/generate_static_pages.cjs`).
4. Rebuild and push to GitHub Pages.
5. Click **Verify** in Search Console.

---

## 4. Submitting the XML Sitemap

Once ownership is verified:
1. In the left-hand navigation menu of Search Console, click on **Sitemaps** (under *Indexing*).
2. Under **Add a new sitemap**, enter the path:
   ```text
   sitemap.xml
   ```
   (Search Console already prepends your property URL: `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`).
3. Click **Submit**.
4. Verify that the status updates to **Success** and that Google detects all **11 submitted URLs**.

### Submitted Indexable URLs
1. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`
2. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/cng-services/`
3. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/lpg-services/`
4. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/auto-gas-filling/`
5. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/gas-kit-installation/`
6. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/vehicle-gas-conversion/`
7. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/gas-kit-repair-maintenance/`
8. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/about/`
9. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/contact/`
10. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/privacy-policy/`
11. `https://any172262-hue.github.io/maa-kamakhya-auto-gas/terms-conditions/`

---

## 5. Inspecting URLs & Requesting Indexing

To expedite initial crawling of key pages:
1. In the top search bar ("Inspect any URL in..."), paste the Homepage URL:
   `https://any172262-hue.github.io/maa-kamakhya-auto-gas/`
2. Press Enter. Search Console will retrieve the index status from the Google index.
3. Click **Test Live URL** to confirm Googlebot can fetch and render the pre-rendered HTML without errors.
4. Verify that:
   - HTTP response is `200 OK`.
   - Crawl allowed: `Yes`.
   - User-declared canonical matches Google-selected canonical.
   - Rich results detected: `AutoRepair`, `WebSite`.
5. Click **Request Indexing**.
6. Repeat this process for the primary service pages (especially `/services/cng-services/` and `/services/gas-kit-installation/`).

> [!NOTE]
> Google enforces daily quota limits on "Request Indexing". Only request indexing for high-priority pages. Do not submit duplicate requests.

---

## 6. Monitoring Search Performance & Queries

After Google crawls the pages (typically 3–14 days for a new site), monitor the **Performance** report:
- **Total Clicks:** Number of times users clicked your site in Google search results.
- **Total Impressions:** Number of times a link to your site appeared in search results.
- **Average CTR (Click-Through Rate):** Percentage of impressions that turned into clicks.
- **Average Position:** The average ranking position of your site's links for queries.

### High-Intent Queries to Track:
- `cng services guwahati`
- `cng kit installation in guwahati`
- `auto gas conversion assam`
- `cng cylinder hydro testing guwahati`
- `maa kamakhya auto gas`

---

## 7. Troubleshooting Common Indexing Errors

In the **Pages** report (under *Indexing*), look out for these statuses:
- **Discovered – currently not indexed:** Google knows the page exists but has not crawled it yet. Usually resolves automatically as site authority grows.
- **Crawled – currently not indexed:** Google visited the page but chose not to index it. Because our static pages have rich pre-rendered content, unique titles, and clear headings, this risk has been minimized.
- **Page with redirect:** Verify that internal links do not point to non-canonical paths (e.g., ensure all internal links use the trailing slash `/`).
- **Excluded by 'noindex' tag:** Only temporary or staging pages should have noindex. All 11 public pages in this project are configured as `index, follow`.

---

## 8. Indexing Disclaimer

> [!IMPORTANT]
> Neither this guide nor any technical SEO optimization can **guarantee** indexing or first-page rankings. Google's indexing and ranking decisions are determined entirely by autonomous ranking systems, crawl budget, regional search demand, and local search competition.
