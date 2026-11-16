export function buildWhatsAppMessage(formData, utmData) {
  if (!formData) return '';
  const lines = [
    'Hello Maa Kamakhya Auto Gas,',
    '',
    'I would like to make an enquiry.',
    '',
    'Customer Details:',
    `Name: ${formData.fullName ? formData.fullName.trim() : ''}`,
    `Mobile: +91 ${formData.phone ? formData.phone.trim() : ''}`,
    formData.vehicleModel && formData.vehicleModel.trim() ? `Vehicle: ${formData.vehicleModel.trim()}` : null,
    `Enquiry Type: ${formData.serviceType ? formData.serviceType.trim() : ''}`,
    ''
  ].filter((x) => x !== null);

  if (formData.message && formData.message.trim()) {
    lines.push('Additional Message:');
    lines.push(formData.message.trim());
    lines.push('');
  }

  if (utmData && (utmData.utm_source || utmData.utm_campaign)) {
    const parts = [];
    if (utmData.utm_source) parts.push(`Source: ${utmData.utm_source}`);
    if (utmData.utm_medium) parts.push(`Medium: ${utmData.utm_medium}`);
    if (utmData.utm_campaign) parts.push(`Campaign: ${utmData.utm_campaign}`);
    if (parts.length > 0) {
      lines.push('Campaign Attribution:');
      lines.push(parts.join(' | '));
      lines.push('');
    }
  }

  lines.push('Please contact me regarding my enquiry.');
  return lines.join('\n');
}
