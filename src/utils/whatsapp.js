/**
 * Formats a clean, professional WhatsApp inquiry message for Maa Kamakhya Auto Gas.
 * Adheres strictly to verified business details and only includes fields that are actually available.
 * 
 * Official WhatsApp Number: +91 69139 10337 (916913910337)
 * Click-to-chat format: https://wa.me/916913910337?text=ENCODED_MESSAGE
 * WhatsApp Web format: https://web.whatsapp.com/send?phone=916913910337&text=ENCODED_MESSAGE
 */

export function buildWhatsAppMessage(formData = {}) {
  if (!formData) return '';

  const lines = [
    'Hello Maa Kamakhya Auto Gas,',
    '',
    'I would like to enquire about your services.',
    '',
    'Customer Details:'
  ];

  // 1. Customer Name
  const name = (formData.fullName || formData.name || '').trim();
  if (name) {
    lines.push(`Name: ${name}`);
  }

  // 2. Customer Mobile Number
  const rawPhone = (formData.phone || formData.mobileNumber || '').trim();
  if (rawPhone) {
    const cleanDigits = rawPhone.replace(/\D/g, '');
    let displayPhone = rawPhone;
    if (cleanDigits.length === 10) {
      displayPhone = `+91 ${cleanDigits}`;
    } else if (cleanDigits.length === 12 && cleanDigits.startsWith('91')) {
      displayPhone = `+91 ${cleanDigits.slice(2)}`;
    }
    lines.push(`Mobile: ${displayPhone}`);
  }

  // 3. Selected Service
  const service = (formData.serviceType || formData.service || formData.serviceCategory || '').trim();
  if (service) {
    lines.push(`Service: ${service}`);
  }

  // 4. Vehicle Model (combine brand + model if both provided, e.g. Maruti Suzuki Swift VXi)
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
  if (vehicleModel) {
    lines.push(`Vehicle Model: ${vehicleModel}`);
  }

  // 5. Vehicle Type (only if available)
  const vehicleType = (formData.vehicleType || formData.vehicleUse || '').trim();
  if (vehicleType) {
    lines.push(`Vehicle Type: ${vehicleType}`);
  }

  // 6. Additional Requirements & Calculator Estimates
  const additionalParts = [];

  const calcEstimate = (formData.calculatorEstimate || formData.estimate || '').trim();
  if (calcEstimate) {
    additionalParts.push(`Calculator Estimate: ${calcEstimate}`);
  }

  const message = (formData.message || formData.additionalRequirements || formData.question || '').trim();
  if (message && message !== calcEstimate) {
    additionalParts.push(message);
  }

  if (additionalParts.length > 0) {
    lines.push('');
    lines.push('Additional Requirements:');
    additionalParts.forEach((part) => lines.push(part));
  }

  // Closing
  lines.push('');
  lines.push('Please contact me regarding my enquiry.');
  lines.push('');
  lines.push('Thank you.');
  lines.push('Maa Kamakhya Auto Gas Customer Enquiry.');

  return lines.join('\n');
}

/**
 * Builds the official WhatsApp click-to-chat URL with destination +91 69139 10337
 */
export function buildWhatsAppUrl(formData = {}) {
  const message = buildWhatsAppMessage(formData);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/916913910337?text=${encoded}`;
}

/**
 * Builds the official WhatsApp Web click-to-chat URL for desktop/web browser fallback
 */
export function buildWhatsAppWebUrl(formData = {}) {
  const message = buildWhatsAppMessage(formData);
  const encoded = encodeURIComponent(message);
  return `https://web.whatsapp.com/send?phone=916913910337&text=${encoded}`;
}
