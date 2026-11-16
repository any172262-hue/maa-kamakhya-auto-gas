import { siteConfig } from '../../src/data/siteConfig.js';

export function runSiteConfigIntegrationTests() {
  console.log('  ▶ [Integration] Testing siteConfig data integrity:');

  if (siteConfig.name !== 'Maa Kamakhya Auto Gas') throw new Error(`Incorrect brand name: ${siteConfig.name}`);
  if (siteConfig.phone !== '6913910337') throw new Error(`Incorrect phone number: ${siteConfig.phone}`);
  if (siteConfig.phoneTel !== 'tel:+916913910337') throw new Error(`Incorrect tel: link: ${siteConfig.phoneTel}`);
  if (siteConfig.whatsappNumber !== '8822049075') throw new Error(`Incorrect WhatsApp number: ${siteConfig.whatsappNumber}`);
  if (!siteConfig.whatsappUrl.includes('8822049075')) throw new Error('WhatsApp URL does not contain phone number');

  // Statutory
  const { statutory } = siteConfig;
  if (statutory.legalName !== 'Maa Kamakhya Auto Gas') throw new Error('Incorrect statutory legalName');
  if (statutory.yearOfEstablishment !== '2022') throw new Error('Incorrect yearOfEstablishment');
  if (statutory.noOfEmployee !== 'Less than 10') throw new Error('Incorrect noOfEmployee');
  if (!statutory.turnOver.includes('51 Lakh')) throw new Error('Incorrect turnover');
  if (statutory.gstin !== '18**********1ZS') throw new Error('Incorrect GSTIN');
  if (!statutory.modeOfPayment.includes('EMI Financing')) throw new Error('Incorrect payment modes');

  console.log('    ✓ All siteConfig integration tests passed.');
}
