import { siteConfig } from '../data/siteConfig.js';

/**
 * Formats a clean, professional WhatsApp inquiry message for Maa Kamakhya Auto Gas.
 * Adheres strictly to verified business details.
 * 
 * Official WhatsApp Number: +91 69139 10337 (916913910337)
 * Click-to-chat format: https://wa.me/916913910337?text=ENCODED_MESSAGE
 * WhatsApp Web format: https://web.whatsapp.com/send?phone=916913910337&text=ENCODED_MESSAGE
 */

export function buildWhatsAppMessage(formData = {}) {
  if (!formData) return '';

  // 1. Customer Name
  const name = (formData.fullName || formData.name || '').trim() || 'Not provided';

  // 2. Customer Mobile Number
  const rawPhone = (formData.phone || formData.mobileNumber || '').trim();
  let displayPhone = 'Not provided';
  if (rawPhone) {
    const cleanDigits = rawPhone.replace(/\D/g, '');
    if (cleanDigits.length === 10) {
      displayPhone = `+91 ${cleanDigits}`;
    } else if (cleanDigits.length === 12 && cleanDigits.startsWith('91')) {
      displayPhone = `+91 ${cleanDigits.slice(2)}`;
    } else {
      displayPhone = rawPhone;
    }
  }

  // 3. Selected Service
  const service = (formData.serviceType || formData.service || formData.serviceCategory || '').trim() || 'Not provided';

  // 4. Vehicle Model / Make
  let vehicleModel = (formData.vehicleModel || '').trim();
  if (!vehicleModel) {
    const brand = (formData.carBrand || '').trim();
    const model = (formData.carModel || formData.model || '').trim();
    if (brand && model) {
      vehicleModel = model.toLowerCase().startsWith(brand.toLowerCase()) ? model : `${brand} ${model}`;
    } else {
      vehicleModel = model || brand;
    }
  }
  const vehicleDisplay = vehicleModel || 'Not provided';

  // 5. Additional Message & Calculator Estimates
  const additionalParts = [];
  const calcEstimate = (formData.calculatorEstimate || formData.estimate || '').trim();
  if (calcEstimate) {
    additionalParts.push(`Calculator Estimate: ${calcEstimate}`);
  }
  const message = (formData.message || formData.additionalRequirements || formData.question || '').trim();
  if (message && message !== calcEstimate) {
    additionalParts.push(message);
  }
  const messageDisplay = additionalParts.length > 0 ? additionalParts.join(' | ') : 'No additional message';

  const lines = [
    'Hello Maa Kamakhya Auto Gas Team,',
    '',
    'I would like to make an enquiry.',
    '',
    'CUSTOMER DETAILS',
    '',
    `Full Name: ${name}`,
    '',
    `Mobile Number: ${displayPhone}`,
    '',
    `Service Needed: ${service}`,
    '',
    `Vehicle Model / Make: ${vehicleDisplay}`,
    '',
    `Additional Message: ${messageDisplay}`,
    '',
    'I have reviewed my information and agreed to the Terms & Conditions and Privacy Policy.',
    '',
    'Thank you.'
  ];

  return lines.join('\n');
}

/**
 * Builds the official WhatsApp click-to-chat URL using siteConfig.whatsappNumber
 */
export function buildWhatsAppUrl(formData = {}) {
  const message = buildWhatsAppMessage(formData);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/91${siteConfig.whatsappNumber}?text=${encoded}`;
}

/**
 * Builds the official WhatsApp Web click-to-chat URL for desktop/web browser fallback
 */
export function buildWhatsAppWebUrl(formData = {}) {
  const message = buildWhatsAppMessage(formData);
  const encoded = encodeURIComponent(message);
  return `https://web.whatsapp.com/send?phone=91${siteConfig.whatsappNumber}&text=${encoded}`;
}
