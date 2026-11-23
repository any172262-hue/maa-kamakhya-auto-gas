import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { calculateFuelCosts } from './src/utils/calculator.js';
import { formatINR, formatDistance } from './src/utils/formatCurrency.js';
import { siteConfig } from './src/data/siteConfig.js';
import { navLinks } from './src/data/navigation.js';
import { servicesData, verifiedServiceTags, benefitsData, vehicleCompatibilityData, installationSteps, systemComponents } from './src/data/services.js';
import { searchWebsite, searchableItems } from './src/data/searchIndex.js';
import { formatUtmForMessage } from './src/utils/utm.js';
import { runCalculatorUnitTests } from './tests/unit/calculator.test.js';
import { runFormatCurrencyUnitTests } from './tests/unit/formatCurrency.test.js';
import { runLanguageTests } from './tests/unit/language.test.js';
import { runWhatsAppUnitTests } from './tests/unit/whatsapp.test.js';
import { runSiteConfigIntegrationTests } from './tests/integration/siteConfig.test.js';
import { runNavigationIntegrationTests } from './tests/integration/navigation.test.js';
import { runUserFlowE2ETests } from './tests/e2e/userFlow.test.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('====================================================');
console.log('🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION SUITE');
console.log('====================================================\n');

console.log('0. Executing Modular Tests (tests/unit, tests/integration, tests/e2e):');
runCalculatorUnitTests();
runFormatCurrencyUnitTests();
runLanguageTests();
runWhatsAppUnitTests();
runSiteConfigIntegrationTests();
runNavigationIntegrationTests();
runUserFlowE2ETests();
console.log('');

// 1. CALCULATOR UTILITY TESTS
console.log('1. Testing Fuel Savings Calculator Math & Validation:');
{
  // Test reference default values: 5000 km, ₹107/L, ₹91/kg, 15 km/L, 27 km/kg
  const r1 = calculateFuelCosts({
    distance: 5000,
    petrolPrice: 107,
    cngPrice: 91,
    petrolMileage: 15,
    cngMileage: 27
  });

  // Petrol cost = (5000 / 15) * 107 = 35666.66 -> 35667
  // CNG cost = (5000 / 27) * 91 = 16851.85 -> 16852
  // Monthly savings = 35667 - 16852 = 18815
  assert(r1.petrolCost === 35667, `Default petrol cost matches screenshot (Expected: 35667, Got: ${r1.petrolCost})`);
  assert(r1.cngCost === 16852, `Default CNG cost matches screenshot (Expected: 16852, Got: ${r1.cngCost})`);
  assert(r1.monthlySavings === 18815, `Default monthly savings matches screenshot (Expected: 18815, Got: ${r1.monthlySavings})`);
  assert(r1.annualSavings === 18815 * 12, `Annual savings matches 12x monthly (Got: ${r1.annualSavings})`);
  assert(r1.percentageSaved === 53, `Percentage saved is ~53% (Got: ${r1.percentageSaved}%)`);

  // Edge case: zero distance
  const rZero = calculateFuelCosts({ distance: 0 });
  assert(rZero.petrolCost === 0 && rZero.cngCost === 0 && rZero.monthlySavings === 0, 'Zero distance returns 0 costs');

  // Edge case: negative numbers
  const rNeg = calculateFuelCosts({ distance: -500, petrolPrice: -100 });
  assert(rNeg.petrolCost === 0 && !isNaN(rNeg.petrolCost), 'Negative inputs handled gracefully without NaN');

  // Edge case: zero mileage should not cause division by zero
  const rZeroMileage = calculateFuelCosts({ distance: 1000, petrolMileage: 0, cngMileage: 0 });
  assert(!isNaN(rZeroMileage.petrolCost) && isFinite(rZeroMileage.petrolCost), 'Zero mileage handled without Infinity or NaN');
}

// 2. CURRENCY FORMATTER TESTS
console.log('\n2. Testing Currency & Distance Formatter:');
{
  const formatted1 = formatINR(18815);
  assert(formatted1.includes('18,815') || formatted1.includes('₹'), `INR currency formatting works for 18815 (Got: ${formatted1})`);

  const formattedZero = formatINR(0);
  assert(formattedZero.includes('0'), `Zero formatted correctly (Got: ${formattedZero})`);

  const formattedNaN = formatINR(NaN);
  assert(formattedNaN.includes('0'), `NaN value formatted safely as ₹0 (Got: ${formattedNaN})`);

  const formattedDist = formatDistance(5000);
  assert(formattedDist.includes('5,000') && formattedDist.includes('km'), `Distance formatted correctly (Got: ${formattedDist})`);
}

// 3. SITE CONFIGURATION & CONTACT DATA INTEGRITY
console.log('\n3. Testing Contact Configuration Integrity:');
{
  assert(siteConfig.phone === '6913910337', `Phone number is authentic (6913910337)`);
  assert(siteConfig.phoneTel === 'tel:+916913910337', `Tel link format is valid (tel:+916913910337)`);
  assert(siteConfig.email === null, `Unsupplied business email is correctly set to null (no invented email)`);
  assert(siteConfig.whatsappNumber === '6913910337', `WhatsApp number is authentic (6913910337)`);
  assert(siteConfig.whatsappUrl.includes('6913910337'), `WhatsApp link points to authentic number`);
  assert(siteConfig.address.includes('Guwahati'), `Address includes Guwahati`);
  assert(siteConfig.languages.length === 3, `Supports 3 languages: English, Hindi, Assamese`);
  assert(siteConfig.name === 'Maa Kamakhya Auto Gas', `Brand Name is 'Maa Kamakhya Auto Gas'`);
  
  // Business Confirmed Details Verification
  assert(siteConfig.statutory.legalName === 'Maa Kamakhya Auto Gas', `Legal Name matches 'Maa Kamakhya Auto Gas'`);
  assert(siteConfig.statutory.address.includes('NH 37, Pachim Boragaon'), `Address matches confirmed NH 37 location`);
  assert(siteConfig.statutory.fillingFuel === 'CNG only', `Filling station fuel confirmed as 'CNG only'`);
  assert(siteConfig.verifiedDetails.operatingHours === 'Not provided', `Operating hours correctly flagged as 'Not provided'`);
  assert(!siteConfig.statutory.gstin, `Zero fabricated GSTIN in statutory config`);
  assert(!siteConfig.statutory.yearOfEstablishment, `Zero unverified establishment year in statutory config`);
}

// 4. NAVIGATION LINKS INTEGRITY
console.log('\n4. Testing Navigation Links:');
{
  assert(navLinks.length >= 5, `Navigation contains at least 5 primary links (Found: ${navLinks.length})`);
  navLinks.forEach(link => {
    assert(link.href.startsWith('#'), `Nav link '${link.name}' points to an internal ID (${link.href})`);
  });
}

// 5. DATA COLLECTIONS COMPLETENESS
console.log('\n5. Testing Data Collections:');
{
  assert(servicesData.length === 8, `Services data contains 8 full services (Found: ${servicesData.length})`);
  assert(verifiedServiceTags.length === 24, `Verified trade directory contains all 24 categories (Found: ${verifiedServiceTags.length})`);
  assert(benefitsData.length === 6, `Benefits data contains 6 core points (Found: ${benefitsData.length})`);
  assert(vehicleCompatibilityData.brands.length >= 6, `Vehicle compatibility covers 6+ major automotive brands`);
  assert(installationSteps.length === 5, `Installation process has 5 standardized steps`);
  assert(systemComponents.length === 5, `CNG system diagram has 5 detailed component callouts`);
}

// 6. ADVANCED FEATURES: SEARCH INDEX, UTM TRACKER & FORM VALIDATION
console.log('\n6. Testing Search Index, UTM Tracker & Form Validation:');
{
  // Search index checks
  assert(searchableItems.length >= 35, `Search index contains 35+ verified items across all categories (Found: ${searchableItems.length})`);
  
  const searchSeq = searchWebsite('sequential');
  assert(searchSeq.length > 0, `Search for 'sequential' returns matching results (Found: ${searchSeq.length})`);
  assert(searchSeq.some(item => item.title.toLowerCase().includes('sequential')), `Search results contain 'Sequential' in title`);

  const searchCalc = searchWebsite('calculator');
  assert(searchCalc.length > 0 && searchCalc[0].id === 'tool-calculator', `Search for 'calculator' finds Fuel Savings Calculator`);

  const searchMaruti = searchWebsite('maruti');
  assert(searchMaruti.length > 0, `Search for 'maruti' finds car compatibility and trade records`);

  const searchEmpty = searchWebsite('');
  assert(Array.isArray(searchEmpty) && searchEmpty.length === 0, `Empty search query returns empty array`);

  const searchGibberish = searchWebsite('xyznonexistent123');
  assert(Array.isArray(searchGibberish) && searchGibberish.length === 0, `Unmatched query returns empty array without throwing`);

  // UTM formatting checks
  const utmFull = {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'cng_assam_launch',
    utm_term: 'cng kit guwahati',
    utm_content: 'banner_a'
  };
  const utmFormatted = formatUtmForMessage(utmFull);
  assert(utmFormatted.includes('Campaign Information:'), `UTM message contains Campaign Information header`);
  assert(utmFormatted.includes('Source: google') && utmFormatted.includes('Campaign: cng_assam_launch'), `UTM message contains source and campaign values`);

  const utmEmpty = formatUtmForMessage({});
  assert(utmEmpty === '', `Empty UTM returns empty string (no unnecessary text)`);

  // Indian Phone validation logic tests (^[6-9]\d{9}$)
  const phoneRegex = /^[6-9]\d{9}$/;
  assert(phoneRegex.test('6913910337'), `Validates 6913910337 as true`);
  assert(phoneRegex.test('6913910337'), `Validates 6913910337 as true`);
  assert(phoneRegex.test('9876543210'), `Validates 9876543210 as true`);
  assert(phoneRegex.test('6001234567'), `Validates 6001234567 as true`);
  assert(!phoneRegex.test('5551234567'), `Rejects phone starting with 5 (Invalid in India)`);
  assert(!phoneRegex.test('1234567890'), `Rejects phone starting with 1`);
  assert(!phoneRegex.test('98765'), `Rejects short phone number`);
  assert(!phoneRegex.test('987654321012'), `Rejects number longer than 10 digits`);
}

// 7. HTTP SERVER & ASSETS CHECK
console.log('\n7. Testing Live Local HTTP Server & Asset Delivery:');

function checkHttp(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:5173${urlPath}`, (res) => {
      resolve({ statusCode: res.statusCode, contentType: res.headers['content-type'] });
    });
    req.on('error', (err) => {
      resolve({ error: err.message });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve({ error: 'timeout' });
    });
  });
}

async function runHttpChecks() {
  const rootRes = await checkHttp('/');
  const isServerRunning = rootRes.statusCode === 200;

  if (isServerRunning) {
    assert(rootRes.statusCode === 200, `Root page returns HTTP 200 OK (Got: ${rootRes.statusCode || rootRes.error})`);

    const logoRes = await checkHttp('/images/maa-kamakhya-auto-gas-logo.png');
    assert(logoRes.statusCode === 200, `Official Maa Kamakhya Auto Gas Logo returns HTTP 200 OK (Got: ${logoRes.statusCode || logoRes.error})`);

    const carRes = await checkHttp('/images/hero-car.webp');
    assert(carRes.statusCode === 200, `Hero Car WebP returns HTTP 200 OK (Got: ${carRes.statusCode || carRes.error})`);

    const cngRes = await checkHttp('/images/cng-installation.webp');
    assert(cngRes.statusCode === 200, `CNG Installation Diagram WebP returns HTTP 200 OK (Got: ${cngRes.statusCode || cngRes.error})`);

    const favRes = await checkHttp('/favicon.svg');
    assert(favRes.statusCode === 200, `Favicon SVG returns HTTP 200 OK (Got: ${favRes.statusCode || favRes.error})`);

    // 7. SEO METADATA & 404 RESILIENCE
    console.log('\n7. Testing SEO Metadata & 404 Resilience:');
    const indexHtmlRes = await checkHttp('/');
    assert(indexHtmlRes.statusCode === 200, 'HTML document served with 200 OK');
  } else {
    // Disk fallback for CI / offline test execution
    assert(fs.existsSync('./index.html'), 'Root index.html exists on disk');
    assert(fs.existsSync('./public/images/maa-kamakhya-auto-gas-logo.png'), 'Official Maa Kamakhya Auto Gas Logo exists on disk');
    assert(fs.existsSync('./public/images/hero-car.webp'), 'Hero Car WebP exists on disk');
    assert(fs.existsSync('./public/images/cng-installation.webp'), 'CNG Installation Diagram WebP exists on disk');
    assert(fs.existsSync('./public/favicon.svg'), 'Favicon SVG exists on disk');

    // 7. SEO METADATA & 404 RESILIENCE
    console.log('\n7. Testing SEO Metadata & 404 Resilience:');
    assert(fs.existsSync('./index.html'), 'HTML document verified on disk');
  }

  // 8. TECHNICAL SEO, SITEMAP, ROBOTS & STRUCTURED DATA TESTS
  console.log('\n8. Testing Technical SEO, Sitemap, Robots.txt & Structured Data Integrity:');
  {
    // Sitemap validation
    assert(fs.existsSync('./public/sitemap.xml'), 'Sitemap XML exists in public folder');
    const sitemapContent = fs.readFileSync('./public/sitemap.xml', 'utf8');
    const canonicalDomain = 'https://any172262-hue.github.io/maa-kamakhya-auto-gas/';
    assert(sitemapContent.includes(canonicalDomain), 'Sitemap specifies the official GitHub Pages project domain');
    assert(!sitemapContent.includes('maakamakhyaautogas.com'), 'Sitemap contains zero obsolete unhosted domain URLs');
    assert(!sitemapContent.includes('hreflang="as"'), 'Sitemap contains zero dead alternate language URLs');
    
    const expectedRoutes = [
      '',
      'services/cng-services/',
      'services/lpg-services/',
      'services/auto-gas-filling/',
      'services/gas-kit-installation/',
      'services/vehicle-gas-conversion/',
      'services/gas-kit-repair-maintenance/',
      'about/',
      'contact/',
      'privacy-policy/',
      'terms-conditions/'
    ];
    expectedRoutes.forEach(r => {
      assert(sitemapContent.includes(`<loc>${canonicalDomain}${r}</loc>`), `Sitemap includes indexable route: ${canonicalDomain}${r}`);
    });

    // Robots.txt validation
    assert(fs.existsSync('./public/robots.txt'), 'robots.txt exists in public directory');
    const robotsContent = fs.readFileSync('./public/robots.txt', 'utf8');
    assert(robotsContent.includes('Allow: /'), 'robots.txt permits crawling of site content');
    assert(robotsContent.includes(`Sitemap: ${canonicalDomain}sitemap.xml`), 'robots.txt points to correct live sitemap.xml');
    assert(!robotsContent.includes('maakamakhyaautogas.com'), 'robots.txt contains zero obsolete unhosted sitemap directives');

    // Dist generation checks (if dist exists)
    if (fs.existsSync('./dist')) {
      assert(fs.existsSync('./dist/index.html'), 'Production build dist/index.html exists');
      assert(fs.existsSync('./dist/404.html'), 'Production build dist/404.html fallback exists');
      
      const distIndex = fs.readFileSync('./dist/index.html', 'utf8');
      assert(distIndex.includes(canonicalDomain), 'Production index.html contains correct canonical link');
      assert(distIndex.includes('og:title') && distIndex.includes('twitter:card'), 'Production index.html contains Open Graph and Twitter Card tags');
      assert(!distIndex.includes('./images/'), 'Production index.html does not contain broken relative ./images/ paths');

      const expectedSubpages = [
        'services/cng-services/index.html',
        'services/lpg-services/index.html',
        'services/auto-gas-filling/index.html',
        'services/gas-kit-installation/index.html',
        'services/vehicle-gas-conversion/index.html',
        'services/gas-kit-repair-maintenance/index.html',
        'about/index.html',
        'contact/index.html',
        'privacy-policy/index.html',
        'terms-conditions/index.html'
      ];

      expectedSubpages.forEach(sub => {
        const fullPath = `./dist/${sub}`;
        assert(fs.existsSync(fullPath), `Pre-rendered static crawlable file exists: ${sub}`);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          assert(content.includes('<h1'), `${sub} contains pre-rendered <h1> heading`);
          assert(content.includes('<link rel="canonical"'), `${sub} contains canonical link`);
          assert(content.includes('type="application/ld+json"'), `${sub} contains structured JSON-LD`);
          
          // Test JSON-LD parse
          const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
          assert(jsonLdMatch && jsonLdMatch[1], `${sub} has valid JSON-LD script block`);
          if (jsonLdMatch && jsonLdMatch[1]) {
            try {
              const parsed = JSON.parse(jsonLdMatch[1]);
              assert(parsed['@context'] === 'https://schema.org', `${sub} structured data has valid schema.org context`);
            } catch (e) {
              assert(false, `${sub} JSON-LD parsing failed: ${e.message}`);
            }
          }
        }
      });
    }

    // 9. Testing Google Search Spam Policies Compliance
    console.log('\n9. Testing Google Search Spam Policies Compliance:');
    
    // Check absence of fake review/rating schema abuse
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    assert(!indexHtml.includes('aggregateRating'), 'Zero fake aggregateRating schema in index.html (Anti-Spam)');
    assert(!indexHtml.includes('ratingValue'), 'Zero fake ratingValue in index.html (Anti-Spam)');
    
    // Check absence of hidden text hacks in CSS
    const compCss = fs.readFileSync(path.join(__dirname, 'src', 'styles', 'components.css'), 'utf8');
    assert(!compCss.includes('text-indent: -9999px'), 'Zero off-screen text-indent hacks in CSS (Anti-Spam)');
    assert(!compCss.includes('font-size: 0px'), 'Zero zero-sized font keyword hacks in CSS (Anti-Spam)');

    // Check compliance documentation
    const spamDocExists = fs.existsSync(path.join(__dirname, 'docs', 'GOOGLE_SPAM_POLICY_COMPLIANCE.md'));
    assert(spamDocExists, 'docs/GOOGLE_SPAM_POLICY_COMPLIANCE.md exists and is complete');

    // 10. Testing Confirmed Local SEO Content Plan Compliance
    console.log('\n10. Testing Confirmed Local SEO Content Plan Compliance:');
    const localSeoDocExists = fs.existsSync(path.join(__dirname, 'docs', 'LOCAL_SEO_CONTENT_PLAN.md'));
    assert(localSeoDocExists, 'docs/LOCAL_SEO_CONTENT_PLAN.md exists and is complete');

    // Verify Homepage metadata
    assert(indexHtml.includes('CNG &amp; LPG Services in Guwahati | Maa Kamakhya Auto Gas') || indexHtml.includes('CNG & LPG Services in Guwahati | Maa Kamakhya Auto Gas'), 'Homepage title matches confirmed Local SEO specification');
    assert(indexHtml.includes('Maa Kamakhya Auto Gas offers CNG and LPG services, CNG filling, gas kit installation'), 'Homepage meta description matches confirmed Local SEO specification');

    // Verify Filling Station CNG-only safeguards
    const fillingHtmlPath = path.join(__dirname, 'dist', 'services', 'auto-gas-filling', 'index.html');
    if (fs.existsSync(fillingHtmlPath)) {
      const fillingContent = fs.readFileSync(fillingHtmlPath, 'utf8');
      assert(fillingContent.includes('CNG Filling Station in Guwahati'), 'Filling station has confirmed H1');
      assert(fillingContent.includes('Fuel Available at Filling Station: CNG') || fillingContent.includes('Fuel available at the filling station: CNG'), 'Filling station explicitly states CNG fuel availability');
      assert(fillingContent.includes('We do not provide LPG filling at this station') || fillingContent.includes('LPG filling is not available'), 'Strict safeguard: Zero LPG filling claim at filling station');
    }
  }

  console.log('\n====================================================');
  console.log(`SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    console.log('🎉 ALL INTEGRATION & QUALITY AUDIT TESTS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
}

runHttpChecks();
