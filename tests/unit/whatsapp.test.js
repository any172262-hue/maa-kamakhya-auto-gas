import { buildWhatsAppMessage, buildWhatsAppUrl, buildWhatsAppWebUrl } from '../../src/utils/whatsapp.js';
import { buildWhatsAppInquiryUrl } from '../../src/services/whatsappService.js';

export function runWhatsAppUnitTests() {
  console.log('  ▶ [Unit] Testing WhatsApp Enquiry Message & URL Builder:');

  // Test 1: Full enquiry payload
  const fullLead = {
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    serviceType: 'CNG Sequential Kit Installation Services',
    vehicleModel: 'Maruti Suzuki Swift VXi',
    vehicleType: 'Private Petrol Hatchback',
    message: 'Need 12kg cylinder and estimate of installation time.'
  };

  const fullMsg = buildWhatsAppMessage(fullLead);

  if (!fullMsg.startsWith('Hello Maa Kamakhya Auto Gas Team,\n\nI would like to make an enquiry.\n\nCUSTOMER DETAILS')) {
    throw new Error('Greeting or header format does not match official specification');
  }

  if (!fullMsg.includes('Full Name: Rahul Sharma')) {
    throw new Error('Missing or incorrect customer name');
  }

  if (!fullMsg.includes('Mobile Number: +91 9876543210')) {
    throw new Error('Missing or incorrect mobile format');
  }

  if (!fullMsg.includes('Service Needed: CNG Sequential Kit Installation Services')) {
    throw new Error('Missing or incorrect service');
  }

  if (!fullMsg.includes('Vehicle Model / Make: Maruti Suzuki Swift VXi')) {
    throw new Error('Missing or incorrect vehicle model');
  }

  if (!fullMsg.includes('Additional Message: Need 12kg cylinder and estimate of installation time.')) {
    throw new Error('Missing or incorrect additional message');
  }

  if (!fullMsg.endsWith('I have reviewed my information and agreed to the Terms & Conditions and Privacy Policy.\n\nThank you.')) {
    throw new Error('Missing or incorrect message closing');
  }

  // Test 2: Minimal payload (only required fields, no optional fields)
  const minimalLead = {
    fullName: 'Anup Bordoloi',
    phone: '6001234567',
    serviceType: 'Vehicle Compatibility Check'
  };

  const minimalMsg = buildWhatsAppMessage(minimalLead);

  if (!minimalMsg.includes('Vehicle Model / Make: Not provided')) {
    throw new Error('Unsupplied Vehicle Model should show "Not provided"');
  }

  if (!minimalMsg.includes('Additional Message: No additional message')) {
    throw new Error('Unsupplied Additional Message should show "No additional message"');
  }

  // Test 3: Enquiry with Calculator Estimate
  const calcLead = {
    fullName: 'Bikash Kalita',
    phone: '9123456789',
    serviceType: 'Gas kit installation',
    vehicleModel: 'Hyundai Grand i10',
    calculatorEstimate: 'Monthly distance 3,000 km, estimated saving ₹11,289/mo (₹135,468/year).'
  };

  const calcMsg = buildWhatsAppMessage(calcLead);

  if (!calcMsg.includes('Additional Message: Calculator Estimate: Monthly distance 3,000 km, estimated saving ₹11,289/mo (₹135,468/year).')) {
    throw new Error('Calculator estimate missing from additional message');
  }

  // Test 4: Official WhatsApp Destination URL
  const officialUrl = buildWhatsAppUrl(fullLead);

  if (!officialUrl.startsWith('https://wa.me/916913910337?text=')) {
    throw new Error(`Official WhatsApp URL does not point to +91 69139 10337: ${officialUrl}`);
  }

  if (officialUrl.includes('88220')) {
    throw new Error('Old phone number 88220 leaked into WhatsApp URL');
  }

  if (officialUrl.startsWith(`https://wa.me/91${fullLead.phone}`)) {
    throw new Error('URL erroneously redirected to customer phone number instead of official business');
  }

  // Test 5: whatsappService alignment
  const serviceUrl = buildWhatsAppInquiryUrl(fullLead);
  if (serviceUrl !== officialUrl) {
    throw new Error('Mismatch between buildWhatsAppUrl and buildWhatsAppInquiryUrl');
  }

  // Test 6: WhatsApp Web Desktop Fallback URL
  const webUrl = buildWhatsAppWebUrl(fullLead);
  if (!webUrl.startsWith('https://web.whatsapp.com/send?phone=916913910337&text=')) {
    throw new Error(`WhatsApp Web URL does not match expected format: ${webUrl}`);
  }

  // Test 7: Special Characters and Punctuation Encoding
  const specialLead = {
    fullName: 'A & B Transport (Guwahati)',
    phone: '9864011223',
    serviceType: 'CNG services',
    message: 'Testing special chars: & + = ? % # "quotes" and newlines\nLine 2.'
  };
  const specialUrl = buildWhatsAppUrl(specialLead);
  if (specialUrl.includes('&message=') || specialUrl.includes('quotes"') || specialUrl.includes('Line 2\n')) {
    throw new Error('Special characters were not properly URL-encoded');
  }
  const specialDecoded = decodeURIComponent(specialUrl.split('?text=')[1]);
  if (!specialDecoded.includes('A & B Transport (Guwahati)') || !specialDecoded.includes('Line 2.')) {
    throw new Error('Special characters failed round-trip decoding');
  }

  // Test 8: Long Message Preservation (500 chars)
  const longText = 'A'.repeat(500);
  const longLead = {
    fullName: 'Test User',
    phone: '9876543210',
    serviceType: 'Gas kit installation',
    message: longText
  };
  const longUrl = buildWhatsAppUrl(longLead);
  const longDecoded = decodeURIComponent(longUrl.split('?text=')[1]);
  if (!longDecoded.includes(longText)) {
    throw new Error('Long message was truncated or corrupted in URL');
  }

  // Test 9: URL decoding round-trip verification
  const urlParam = officialUrl.split('?text=')[1];
  const decodedMessage = decodeURIComponent(urlParam);
  if (decodedMessage !== fullMsg) {
    throw new Error('Decoded URL parameter does not exactly match unencoded message');
  }

  console.log('    ✓ All WhatsApp enquiry integration unit tests passed (9/9).');
}
