const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const pages = [
  {
    path: 'services/cng-services',
    title: 'CNG Services | Maa Kamakhya Auto Gas',
    description: "Explore CNG-related automotive services at Maa Kamakhya Auto Gas. Contact us to enquire about your vehicle's CNG service requirements.",
    canonical: 'https://maakamakhyaautogas.com/services/cng-services/',
    h1: 'CNG Services'
  },
  {
    path: 'services/lpg-services',
    title: 'LPG Services | Maa Kamakhya Auto Gas',
    description: 'Find LPG-related automotive services at Maa Kamakhya Auto Gas. Contact us for information about LPG services and vehicle requirements.',
    canonical: 'https://maakamakhyaautogas.com/services/lpg-services/',
    h1: 'LPG Services'
  },
  {
    path: 'services/auto-gas-filling',
    title: 'Auto Gas Filling Station | Maa Kamakhya Auto Gas',
    description: 'Looking for auto gas filling services? Contact Maa Kamakhya Auto Gas to enquire about filling availability and operating hours.',
    canonical: 'https://maakamakhyaautogas.com/services/auto-gas-filling/',
    h1: 'Auto Gas Filling Station'
  },
  {
    path: 'services/gas-kit-installation',
    title: 'Gas Kit Installation | Maa Kamakhya Auto Gas',
    description: "Enquire about vehicle gas kit installation at Maa Kamakhya Auto Gas. Contact us to discuss your vehicle's compatibility and requirements.",
    canonical: 'https://maakamakhyaautogas.com/services/gas-kit-installation/',
    h1: 'Vehicle Gas Kit Installation'
  },
  {
    path: 'services/vehicle-gas-conversion',
    title: 'Vehicle Gas Conversion | Maa Kamakhya Auto Gas',
    description: 'Interested in vehicle gas conversion? Contact Maa Kamakhya Auto Gas to enquire about available CNG and LPG conversion options.',
    canonical: 'https://maakamakhyaautogas.com/services/vehicle-gas-conversion/',
    h1: 'Vehicle Gas Conversion Services'
  },
  {
    path: 'services/gas-kit-repair-maintenance',
    title: 'Gas Kit Repair and Maintenance | Maa Kamakhya Auto Gas',
    description: 'Need gas kit repair or maintenance? Contact Maa Kamakhya Auto Gas to enquire about CNG and LPG gas kit service requirements.',
    canonical: 'https://maakamakhyaautogas.com/services/gas-kit-repair-maintenance/',
    h1: 'Gas Kit Repair and Maintenance'
  },
  {
    path: 'about',
    title: 'About Us | Maa Kamakhya Auto Gas: Guwahati, Assam',
    description: "Learn about Maa Kamakhya Auto Gas, Guwahati's government-approved CNG and LPG retrofitment center on NH 37, Pachim Boragaon, Garchuk. Established in 2022.",
    canonical: 'https://maakamakhyaautogas.com/about/',
    h1: 'About Maa Kamakhya Auto Gas'
  },
  {
    path: 'contact',
    title: 'Contact Us | Maa Kamakhya Auto Gas: NH 37 Guwahati',
    description: 'Contact Maa Kamakhya Auto Gas on NH 37, Pachim Boragaon, Garchuk, Guwahati for certified sequential CNG and LPG retrofitment, diagnostics, and quote inquiries.',
    canonical: 'https://maakamakhyaautogas.com/contact/',
    h1: 'Contact Maa Kamakhya Auto Gas'
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Maa Kamakhya Auto Gas',
    description: 'Privacy Policy for Maa Kamakhya Auto Gas.',
    canonical: 'https://maakamakhyaautogas.com/privacy-policy/',
    h1: 'Privacy Policy'
  },
  {
    path: 'terms-conditions',
    title: 'Terms & Conditions | Maa Kamakhya Auto Gas',
    description: 'Terms and Conditions for Maa Kamakhya Auto Gas.',
    canonical: 'https://maakamakhyaautogas.com/terms-conditions/',
    h1: 'Terms & Conditions'
  }
];

function generateHtml(page) {
  let html = template;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${page.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${page.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  return html;
}

pages.forEach((page) => {
  const targetDir = path.join(distDir, page.path);
  fs.mkdirSync(targetDir, { recursive: true });
  const html = generateHtml(page);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`✓ Generated: dist/${page.path}/index.html`);
});

// Also create dist/404.html (GitHub Pages SPA fallback)
fs.writeFileSync(path.join(distDir, '404.html'), template, 'utf8');
console.log('✓ Generated: dist/404.html');

console.log('All static crawlable pages generated successfully.');
