const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');

const pagesToCheck = [
  {
    path: '',
    expectedTitle: 'CNG & LPG Services in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Maa Kamakhya Auto Gas offers CNG and LPG services, CNG filling, gas kit installation, vehicle gas conversion, repair and maintenance in Guwahati, Assam.'
  },
  {
    path: 'services/cng-services',
    expectedTitle: 'CNG Services in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Looking for CNG services in Guwahati? Visit Maa Kamakhya Auto Gas at Pachim Boragaon, Garchuk, for CNG-related automotive services.'
  },
  {
    path: 'services/lpg-services',
    expectedTitle: 'LPG Services in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Explore LPG-related automotive services at Maa Kamakhya Auto Gas in Pachim Boragaon, Garchuk, Guwahati. Contact us for service enquiries.'
  },
  {
    path: 'services/auto-gas-filling',
    expectedTitle: 'CNG Filling Station in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Looking for CNG filling in Guwahati? Find Maa Kamakhya Auto Gas at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.'
  },
  {
    path: 'services/gas-kit-installation',
    expectedTitle: 'Gas Kit Installation in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Enquire about vehicle gas kit installation at Maa Kamakhya Auto Gas, Pachim Boragaon, Garchuk, Guwahati. Contact us for service information.'
  },
  {
    path: 'services/vehicle-gas-conversion',
    expectedTitle: 'Vehicle Gas Conversion in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Enquire about vehicle gas conversion at Maa Kamakhya Auto Gas in Pachim Boragaon, Garchuk, Guwahati. Contact us to discuss your vehicle requirements.'
  },
  {
    path: 'services/gas-kit-repair-maintenance',
    expectedTitle: 'Gas Kit Repair in Guwahati | Maa Kamakhya Auto Gas',
    expectedDesc: 'Need gas kit repair or maintenance in Guwahati? Contact Maa Kamakhya Auto Gas at Pachim Boragaon, Garchuk, Assam.'
  }
];

let failed = 0;

pagesToCheck.forEach(item => {
  const filePath = path.join(distDir, item.path, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    failed++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Title check
  const titleTag = content.match(/<title>([^<]+)<\/title>/);
  const actualTitle = titleTag ? titleTag[1].replace(/&amp;/g, '&') : '';
  if (actualTitle !== item.expectedTitle) {
    console.error(`❌ Title mismatch on ${item.path || 'home'}: expected "${item.expectedTitle}", got "${actualTitle}"`);
    failed++;
  } else {
    console.log(`✓ Title verified on ${item.path || 'home'}: "${actualTitle}"`);
  }

  // Desc check
  const descTag = content.match(/<meta name="description" content="([^"]+)"/);
  const actualDesc = descTag ? descTag[1] : '';
  if (actualDesc !== item.expectedDesc) {
    console.error(`❌ Description mismatch on ${item.path || 'home'}: expected "${item.expectedDesc}", got "${actualDesc}"`);
    failed++;
  } else {
    console.log(`✓ Description verified on ${item.path || 'home'}: "${actualDesc.slice(0, 60)}..."`);
  }
});

// Check CNG-only filling station verification
const fillingHtml = fs.readFileSync(path.join(distDir, 'services/auto-gas-filling/index.html'), 'utf8');
if (!fillingHtml.includes('Fuel Available at Filling Station: CNG') || !fillingHtml.includes('We do not provide LPG filling at this station')) {
  console.error('❌ Filling station page missing CNG-only safeguards!');
  failed++;
} else {
  console.log('✓ Filling station verified: STRICT CNG-ONLY SAFEGUARDS ACTIVE.');
}

if (failed === 0) {
  console.log('\n🎉 ALL 7 PAGES FULLY MATCH THE CONFIRMED LOCAL SEO BLUEPRINT!');
} else {
  console.error(`\n❌ ${failed} checks failed.`);
  process.exit(1);
}
