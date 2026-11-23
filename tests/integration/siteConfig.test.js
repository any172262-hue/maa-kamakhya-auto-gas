import { siteConfig } from '../../src/data/siteConfig.js';

export function runSiteConfigIntegrationTests() {
  console.log('  ▶ [Integration] Testing siteConfig data integrity:');

  if (siteConfig.name !== 'Maa Kamakhya Auto Gas') throw new Error(`Incorrect brand name: ${siteConfig.name}`);
  if (siteConfig.phone !== '6913910337') throw new Error(`Incorrect phone number: ${siteConfig.phone}`);
  if (siteConfig.phoneTel !== 'tel:+916913910337') throw new Error(`Incorrect tel: link: ${siteConfig.phoneTel}`);
  if (siteConfig.email !== null) throw new Error(`Unsupplied business email must be null, found: ${siteConfig.email}`);
  if (siteConfig.whatsappNumber !== '6913910337') throw new Error(`Incorrect WhatsApp number: ${siteConfig.whatsappNumber}`);
  if (!siteConfig.whatsappUrl.includes('6913910337')) throw new Error('WhatsApp URL does not contain phone number');

  // Confirmed Business Details
  const { verifiedDetails, statutory } = siteConfig;
  if (!verifiedDetails) throw new Error('Missing verifiedDetails in siteConfig');
  if (verifiedDetails.businessName !== 'Maa Kamakhya Auto Gas') throw new Error('Incorrect businessName');
  if (!verifiedDetails.publicAddress.includes('NH 37, Pachim Boragaon, Garchuk, Guwahati')) throw new Error('Incorrect address');
  if (verifiedDetails.fillingStationFuel !== 'CNG Only') throw new Error('Filling station fuel must be CNG Only');
  if (verifiedDetails.operatingHours !== 'Not provided') throw new Error('Operating hours must state Not provided');

  // Verify statutory object exists with confirmed details
  if (statutory.legalName !== 'Maa Kamakhya Auto Gas') throw new Error('Incorrect statutory legalName');
  if (!statutory.address.includes('NH 37, Pachim Boragaon')) throw new Error('Incorrect statutory address');
  if (statutory.fillingFuel !== 'CNG only') throw new Error('Incorrect statutory filling fuel');

  // Anti-fabrication check: ensure unverified claims are NOT present
  if (statutory.yearOfEstablishment || statutory.gstin || statutory.turnOver || statutory.noOfEmployee) {
    throw new Error('Unverified claims (year, gstin, turnover, employees) must not be present in statutory');
  }

  console.log('    ✓ All siteConfig integration tests passed.');
}
