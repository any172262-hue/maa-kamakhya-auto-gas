import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, CheckCircle, ShieldCheck, RefreshCw, Mail, Copy, Check, Globe } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';
import ConfirmationModal from '../components/ConfirmationModal';
import { buildWhatsAppMessage, buildWhatsAppUrl, buildWhatsAppWebUrl } from '../utils/whatsapp';
import { getUtmParams } from '../utils/utm';

export default function Contact({ prefilledQuestion = "" }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceType: '',
    vehicleModel: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handoffState, setHandoffState] = useState(null); // 'prepared' | null
  const [utmParams, setUtmParams] = useState({});
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  const [lastWhatsAppWebUrl, setLastWhatsAppWebUrl] = useState('');
  const [lastMessageText, setLastMessageText] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Capture UTM parameters on mount
  useEffect(() => {
    const utm = getUtmParams();
    setUtmParams(utm);
  }, []);

  // Handle prefilled enquiry questions (e.g. from Calculator or Service Cards)
  useEffect(() => {
    if (prefilledQuestion) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledQuestion
      }));
    }
  }, [prefilledQuestion]);

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value || !value.trim()) {
          return t('contact.errNameRequired', {}, 'Please enter your full name.');
        }
        if (value.trim().length < 2) {
          return t('contact.errNameMin', {}, 'Name must be at least 2 characters.');
        }
        if (value.trim().length > 80) {
          return 'Name must be 80 characters or fewer.';
        }
        return '';

      case 'phone': {
        const cleanPhone = value.replace(/\D/g, '');
        if (!cleanPhone) {
          return t('contact.errPhoneRequired', {}, 'Please enter your mobile number.');
        }
        // Indian mobile validation: 10 digits starting with 6, 7, 8, or 9
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          return t('contact.errPhoneInvalid', {}, 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
        }
        return '';
      }

      case 'serviceType':
        if (!value || !value.trim()) {
          return t('contact.errServiceRequired', {}, 'Please select a service or enquiry type.');
        }
        return '';

      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const nameErr = validateField('fullName', formData.fullName);
    const phoneErr = validateField('phone', formData.phone);
    const serviceErr = validateField('serviceType', formData.serviceType);

    if (nameErr) newErrors.fullName = nameErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (serviceErr) newErrors.serviceType = serviceErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      serviceType: true
    });

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    // Brief deliberate state to prevent double click, then open confirmation modal
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 150);
  };

  const handleCopyMessage = async (textToCopy) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  const handleConfirmHandoff = () => {
    try {
      const messageText = buildWhatsAppMessage(formData);
      const targetUrl = buildWhatsAppUrl(formData);
      const webUrl = buildWhatsAppWebUrl(formData);
      setLastMessageText(messageText);
      setLastWhatsAppUrl(targetUrl);
      setLastWhatsAppWebUrl(webUrl);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setHandoffState('prepared');
    } catch (err) {
      console.error('Error preparing WhatsApp message:', err);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setHandoffState('prepared');
    }
  };

  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('contact.tagline', {}, 'GET IN TOUCH')}
            title={t('contact.title', {}, 'Request your CNG')}
            highlight={t('contact.titleHighlight', {}, 'conversion estimate.')}
            description={t('contact.description', {}, 'Share your requirements and review your details before continuing to chat with Maa Kamakhya Auto Gas on WhatsApp.')}
          />
        </RevealAnimation>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info */}
          <RevealAnimation delay={1}>
            <div className="contact-info-panel">
              <div className="contact-item-group">
                <div className="contact-icon-bubble">
                  <Phone size={22} className="text-yellow" />
                </div>
                <div>
                  <div className="contact-label-small">{t('common.callWorkshop', {}, 'Call our workshop')}</div>
                  <a href={siteConfig.phoneTel} className="contact-value-main">
                    {siteConfig.phoneFormatted}
                  </a>
                  <p className="contact-meta-desc">{t('common.hours', {}, 'Mon - Sat: 9:00 AM - 7:30 PM | Sun: On Appointment')}</p>
                </div>
              </div>

              <div className="contact-item-group">
                <div className="contact-icon-bubble">
                  <MessageCircle size={22} className="text-yellow" />
                </div>
                <div>
                  <div className="contact-label-small">{t('common.whatsappChat', {}, 'WhatsApp enquiries')}</div>
                  <a 
                    href={siteConfig.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value-main"
                  >
                    +91 {siteConfig.whatsappNumber}
                  </a>
                  <p className="contact-meta-desc">{t('contact.fastResponse', {}, 'Fast response on WhatsApp')}</p>
                </div>
              </div>

              {siteConfig.email && (
                <div className="contact-item-group">
                  <div className="contact-icon-bubble">
                    <Mail size={22} className="text-yellow" />
                  </div>
                  <div>
                    <div className="contact-label-small">Email enquiries</div>
                    <a href={`mailto:${siteConfig.email}`} className="contact-value-main">
                      {siteConfig.email}
                    </a>
                    <p className="contact-meta-desc">Direct business email</p>
                  </div>
                </div>
              )}

              <div className="contact-item-group">
                <div className="contact-icon-bubble">
                  <MapPin size={22} className="text-yellow" />
                </div>
                <div>
                  <div className="contact-label-small">{t('location.workshopAddress', {}, 'Workshop location')}</div>
                  <div className="contact-address-text">
                    {siteConfig.address}
                  </div>
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-link-btn"
                  >
                    <Navigation size={14} />
                    <span>{t('location.getDirections', {}, 'Get Directions via Google Maps')}</span>
                  </a>
                </div>
              </div>

              {/* Multilingual Support Box */}
              <div className="contact-languages-card card-navy">
                <div className="lang-header">
                  <span className="lang-badge">{t('location.multilingualSupport', {}, 'Multilingual Support')}</span>
                </div>
                <p className="lang-desc">
                  {t('location.multilingualDesc', {}, 'Our service advisors assist you in English, Hindi, and Assamese.')}
                </p>
              </div>

              {/* Business Location & Service Note */}
              <div className="statutory-assurance-card">
                <ShieldCheck size={20} className="text-yellow flex-shrink-0" />
                <p className="text-xs text-muted">
                  Operated by <strong>{siteConfig.name}</strong> on NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.
                </p>
              </div>
            </div>
          </RevealAnimation>

          {/* Right Column: Verified Enquiry Form */}
          <RevealAnimation delay={2}>
            <div className="contact-form-card">
              <div className="form-card-header">
                <div className="form-card-title-row">
                  <div className="form-card-badge">
                    <MessageCircle size={18} className="text-whatsapp flex-shrink-0" />
                    <span>{t('contact.tagline', {}, 'Direct WhatsApp Enquiry')}</span>
                  </div>
                </div>
                <p className="form-card-subtitle">
                  {t('contact.description', {}, 'Share your details for an instant quotation and CNG compatibility assessment.')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="conversion-form" noValidate>
                {/* Full Name Field */}
                <div className="form-group">
                  <label htmlFor="fullName-input" className="form-label">
                    <span>{t('contact.fullName', {}, 'Full Name')} <span className="text-yellow">*</span></span>
                  </label>
                  <input
                    id="fullName-input"
                    type="text"
                    name="fullName"
                    required
                    maxLength={80}
                    placeholder={t('contact.fullNamePlaceholder', {}, 'Enter your full name')}
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.fullName ? 'input-error' : ''} ${touched.fullName && !errors.fullName && formData.fullName ? 'input-valid' : ''}`}
                    aria-required="true"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                  {errors.fullName && (
                    <span id="fullName-error" className="field-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.fullName}</span>
                    </span>
                  )}
                </div>

                {/* Mobile Number & Service Type (2 Columns) */}
                <div className="form-row-2col">
                  {/* Mobile Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone-input" className="form-label">
                      <span>{t('contact.mobileNumber', {}, 'Mobile Number')} <span className="text-yellow">*</span></span>
                    </label>
                    <div className={`phone-input-wrapper ${errors.phone ? 'phone-input-wrapper-error' : ''} ${touched.phone && !errors.phone && formData.phone ? 'phone-input-wrapper-valid' : ''}`}>
                      <span className="phone-prefix-tag" aria-hidden="true">+91</span>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        placeholder={t('contact.mobilePlaceholder', {}, '10-digit number (e.g. 9876543210)')}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input phone-input-field"
                        aria-required="true"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <span id="phone-error" className="field-error-msg" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.phone}</span>
                      </span>
                    )}
                  </div>

                  {/* Service / Enquiry Type */}
                  <div className="form-group">
                    <label htmlFor="serviceType-select" className="form-label">
                      <span>{t('contact.serviceType', {}, 'Service / Enquiry Type')} <span className="text-yellow">*</span></span>
                    </label>
                    <select
                      id="serviceType-select"
                      name="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-select ${errors.serviceType ? 'input-error' : ''} ${touched.serviceType && !errors.serviceType && formData.serviceType ? 'input-valid' : ''}`}
                      aria-required="true"
                      aria-invalid={errors.serviceType ? 'true' : 'false'}
                      aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
                    >
                      <option value="">{t('contact.selectService', {}, 'Select a service category...')}</option>
                      {servicesData.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="Vehicle Compatibility Check">Vehicle Compatibility Check</option>
                      <option value="Trade Dealership & Wholesale Supply">Trade Dealership & Wholesale Supply</option>
                      <option value="General Workshop Enquiry">General Workshop Enquiry</option>
                      <option value="Others">{t('contact.optionOthers', {}, 'Others')}</option>
                    </select>
                    {errors.serviceType && (
                      <span id="serviceType-error" className="field-error-msg" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.serviceType}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional Vehicle Details */}
                <div className="form-group">
                  <label htmlFor="vehicleModel-input" className="form-label">
                    <span>{t('contact.vehicleModel', {}, 'Vehicle Model / Make')}</span>
                    <span className="text-muted text-xs font-normal"> (Optional)</span>
                  </label>
                  <input
                    id="vehicleModel-input"
                    type="text"
                    name="vehicleModel"
                    maxLength={80}
                    placeholder={t('contact.vehiclePlaceholder', {}, 'e.g. Maruti Suzuki Swift, Hyundai Grand i10, Dzire Taxi')}
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <span className="field-hint-text">
                    {t('contact.vehicleHint', {}, 'Helping us know your car helps us provide instant kit compatibility guidance.')}
                  </span>
                </div>

                {/* Optional Message / Notes */}
                <div className="form-group">
                  <label htmlFor="message-input" className="form-label">
                    <span>{t('contact.additionalMessage', {}, 'Additional Message or Questions')}</span>
                    <span className="text-muted text-xs font-normal"> (Optional)</span>
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows="3"
                    maxLength={500}
                    placeholder={t('contact.messagePlaceholder', {}, 'Enter any questions regarding running costs, kit warranty, hydro-testing, or booking timing...')}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit-btn"
                >
                  <MessageCircle size={20} />
                  <span>{isSubmitting ? t('common.loading', {}, 'Validating Details...') : t('contact.submitButton', {}, 'Review & Continue to WhatsApp')}</span>
                </button>

                <p className="form-caption-note">
                  {t('contact.privacyNote', {}, 'Before continuing, you will review your details in a confirmation step. You will then be able to send your message directly inside WhatsApp.')}
                </p>

                {/* WhatsApp Handoff State Banner */}
                {handoffState === 'prepared' && (
                  <div className="handoff-status-banner animate-fade-in" role="status">
                    <div className="handoff-header-row">
                      <CheckCircle size={20} className="text-yellow flex-shrink-0" />
                      <h4 className="handoff-title">Enquiry Prepared in WhatsApp</h4>
                    </div>
                    <p className="handoff-body">
                      Your enquiry message has been formatted. Please tap <strong>Send</strong> in your WhatsApp chat window to complete sending your message to <strong>Maa Kamakhya Auto Gas</strong>.
                    </p>
                    <p className="handoff-disclaimer text-xs text-muted">
                      Note: Your enquiry is only received by our team once you press Send inside WhatsApp.
                    </p>

                    {/* Direct Fallback Link for Mobile and Popup-blocked Browsers */}
                    <div className="handoff-trouble-card">
                      <a
                        href={lastWhatsAppUrl || 'https://wa.me/916913910337'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="handoff-trouble-link"
                      >
                        Having trouble opening WhatsApp? Tap here to continue.
                      </a>
                    </div>

                    <div className="handoff-actions-row">
                      {lastWhatsAppUrl && (
                        <a
                          href={lastWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm"
                        >
                          <RefreshCw size={14} />
                          <span>Reopen WhatsApp Chat</span>
                        </a>
                      )}

                      {lastWhatsAppWebUrl && (
                        <a
                          href={lastWhatsAppWebUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          title="Open WhatsApp Web in desktop browser"
                        >
                          <Globe size={14} />
                          <span>WhatsApp Web</span>
                        </a>
                      )}

                      {lastMessageText && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(lastMessageText)}
                          className="btn btn-secondary btn-sm"
                          title="Copy formatted enquiry message to clipboard"
                        >
                          {copiedMessage ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                          <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy Message'}</span>
                        </button>
                      )}

                      <a href={siteConfig.phoneTel} className="btn btn-secondary btn-sm">
                        <Phone size={14} />
                        <span>{t('common.call', {}, 'Call')}: {siteConfig.phoneFormatted}</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </RevealAnimation>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        formData={formData}
        utmData={utmParams}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmHandoff}
        onEdit={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </section>
  );
}
