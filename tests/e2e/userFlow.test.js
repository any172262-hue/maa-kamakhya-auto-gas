import { buildWhatsAppInquiryUrl } from '../../src/services/whatsappService.js';
import { generateQuoteSummary } from '../../src/services/quoteService.js';

export function runUserFlowE2ETests() {
  console.log('  ▶ [E2E] Testing Calculator to WhatsApp Quote flow:');

  // Step 1: User calculates estimate
  const quote = generateQuoteSummary({
    distance: 5000,
    petrolPrice: 107,
    cngPrice: 91,
    petrolMileage: 15,
    cngMileage: 27
  });

  if (!quote.formattedSummary.includes('18,815')) {
    throw new Error('Quote summary does not contain monthly savings figure');
  }

  // Step 2: User applies estimate to WhatsApp form
  const sampleLead = {
    name: 'Pranab Das',
    phone: '9864012345',
    carBrand: 'Maruti Suzuki',
    carModel: 'Swift VXi',
    manufacturingYear: '2022',
    vehicleUse: 'Private',
    question: quote.formattedSummary
  };

  const url = buildWhatsAppInquiryUrl(sampleLead);

  if (!url.startsWith('https://wa.me/916913910337')) {
    throw new Error(`Invalid WhatsApp destination URL: ${url}`);
  }
  if (!url.includes('Pranab%20Das') || !url.includes('Swift%20VXi')) {
    throw new Error('URL encoded payload missing customer details');
  }

  console.log('    ✓ E2E Calculator-to-WhatsApp pipeline simulated successfully.');
}
