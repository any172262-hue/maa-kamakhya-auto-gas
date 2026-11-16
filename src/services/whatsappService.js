import { siteConfig } from '../data/siteConfig.js';

/**
 * Service to format and trigger WhatsApp inquiries
 */
export function buildWhatsAppInquiryUrl(formData = {}) {
  const lines = [
    `*New CNG Conversion Inquiry - ${siteConfig.name}*`,
    `---------------------------------------`,
    `*Name:* ${formData.name || 'Not specified'}`,
    `*Phone:* ${formData.phone || 'Not specified'}`,
    `*Car Brand:* ${formData.carBrand || 'Not specified'}`,
    `*Model / Variant:* ${formData.carModel || 'Not specified'}`,
    `*Manufacturing Year:* ${formData.manufacturingYear || 'Not specified'}`,
    `*Vehicle Use:* ${formData.vehicleUse || 'Private'}`,
    formData.question ? `*Question / Notes:* ${formData.question}` : null,
    `---------------------------------------`,
    `Sent via WhatsApp Inquiry`
  ].filter(Boolean);

  const messageText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/91${siteConfig.whatsappNumber}?text=${messageText}`;
}

export function openWhatsAppChat(formData = {}) {
  const url = buildWhatsAppInquiryUrl(formData);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
