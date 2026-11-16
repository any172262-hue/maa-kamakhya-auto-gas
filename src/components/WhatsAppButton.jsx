import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function WhatsAppButton({
  message = "Hi Maa Kamakhya Auto Gas, I would like to inquire about CNG Retrofitment for my car.",
  floating = true,
  className = '',
  label = "WhatsApp Chat"
}) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/91${siteConfig.whatsappNumber}?text=${encodedMessage}`;

  if (floating) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-whatsapp ${className}`}
        aria-label="Chat with Maa Kamakhya Auto Gas on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={22} />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whatsapp ${className}`}
      aria-label="Chat with Maa Kamakhya Auto Gas on WhatsApp"
    >
      <MessageCircle size={18} />
      <span>{label}</span>
    </a>
  );
}
