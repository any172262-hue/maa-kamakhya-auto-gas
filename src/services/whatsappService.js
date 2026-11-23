import { siteConfig } from '../data/siteConfig.js';
import { buildWhatsAppMessage } from '../utils/whatsapp.js';

/**
 * Service to format and trigger WhatsApp inquiries to official destination +91 69139 10337
 */
export function buildWhatsAppInquiryUrl(formData = {}) {
  const messageText = buildWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/91${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

export function openWhatsAppChat(formData = {}) {
  const url = buildWhatsAppInquiryUrl(formData);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
