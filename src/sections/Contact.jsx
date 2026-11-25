import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, CheckCircle, RefreshCw, Mail, Copy, Check, Globe, AlertCircle, Info } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';
import ConfirmationModal from '../components/ConfirmationModal';
import { buildWhatsAppMessage, buildWhatsAppUrl, buildWhatsAppWebUrl } from '../utils/whatsapp';
import { getUtmParams } from '../utils/utm';

export default function Contact({ prefilledQuestion = "", onNavigate }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceType: '',
    vehicleModel: '',
    message: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handoffState, setHandoffState] = useState(null); // 'prepared' | null
  const [cancelledNotice, setCancelledNotice] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(false);
  const [whatsappOpenError, setWhatsappOpenError] = useState(false);
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
          return t('contact.errNameRequired', {}, 'Please enter your name.');
        }
        if (value.trim().length < 2) {
          return t('contact.errNameMin', {}, 'Please enter at least 2 characters for your name.');
        }
        if (value.trim().length > 80) {
          return 'Please keep your name under 80 characters.';
        }
        return '';

      case 'phone': {
        const cleanPhone = (value || '').trim().replace(/[\s-]/g, '');
        if (!cleanPhone) {
          return t('contact.errPhoneRequired', {}, 'Please enter a valid mobile number.');
        }
        // Indian mobile validation: 10 digits starting with 6, 7, 8, or 9
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          return t('contact.errPhoneInvalid', {}, 'Please enter a valid mobile number.');
        }
        return '';
      }

      case 'serviceType':
        if (!value || !value.trim()) {
          return t('contact.errServiceRequired', {}, 'Please select a service.');
        }
        return '';

      case 'termsAccepted':
        if (!value) {
          return 'Please accept the Terms & Conditions and Privacy Policy to continue.';
        }
        return '';

      default:
        return '';
    }
  };

  const isFullNameValid = !validateField('fullName', formData.fullName);
  const isPhoneValid = !validateField('phone', formData.phone);
  const isServiceValid = !validateField('serviceType', formData.serviceType);
  const areRequiredFieldsValid = isFullNameValid && isPhoneValid && isServiceValid;
  const isFormReady = areRequiredFieldsValid && termsAccepted;

  const validateAll = () => {
    const newErrors = {};
    const nameErr = validateField('fullName', formData.fullName);
    const phoneErr = validateField('phone', formData.phone);
    const serviceErr = validateField('serviceType', formData.serviceType);
    const termsErr = validateField('termsAccepted', termsAccepted);

    if (nameErr) newErrors.fullName = nameErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (serviceErr) newErrors.serviceType = serviceErr;
    if (termsErr) newErrors.termsAccepted = termsErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCancelledNotice(false);
    setFormSubmitError(false);
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

  const handleTermsChange = (e) => {
    const checked = e.target.checked;
    setCancelledNotice(false);
    setFormSubmitError(false);
    setTermsAccepted(checked);
    setTouched((prev) => ({ ...prev, termsAccepted: true }));
    setErrors((prev) => ({
      ...prev,
      termsAccepted: validateField('termsAccepted', checked)
    }));
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

  const handleLegalLinkClick = (e, page) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = page === 'terms' ? '#terms-conditions' : '#privacy-policy';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTouched({
      fullName: true,
      phone: true,
      serviceType: true,
      termsAccepted: true
    });

    if (!validateAll() || !termsAccepted) {
      setFormSubmitError(true);
      return;
    }

    setFormSubmitError(false);
    setIsSubmitting(true);
    setCancelledNotice(false);
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

  const handleConfirmHandoff = (e) => {
    if (!termsAccepted || isSubmitting) {
      if (e) e.preventDefault();
      return;
    }

    const sanitizedData = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      vehicleModel: formData.vehicleModel.trim(),
      message: formData.message.trim()
    };

    try {
      const messageText = buildWhatsAppMessage(sanitizedData);
      const targetUrl = buildWhatsAppUrl(sanitizedData);
      const webUrl = buildWhatsAppWebUrl(sanitizedData);

      setLastMessageText(messageText);
      setLastWhatsAppUrl(targetUrl);
      setLastWhatsAppWebUrl(webUrl);
      setWhatsappOpenError(false);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setHandoffState('prepared');
    } catch {
      setWhatsappOpenError(true);
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
            tagline={t('contact.tagline', {}, 'Contact Us')}
            title={t('contact.title', {}, 'Contact Us')}
            highlight={t('contact.titleHighlight', {}, 'for Your Enquiry')}
            description={t('contact.description', {}, 'Have a question or need help choosing a service? Send us a message or contact our team directly on WhatsApp.')}
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
                  <div className="contact-label-small">{t('common.callWorkshop', {}, 'Call Us')}</div>
                  <a href={siteConfig.phoneTel} className="contact-value-main">
                    {siteConfig.phoneFormatted}
                  </a>
                  <p className="contact-meta-desc">{t('common.hours', {}, 'Operating hours: Please call or message us on WhatsApp to confirm timings.')}</p>
                </div>
              </div>

              <div className="contact-item-group">
                <div className="contact-icon-bubble">
                  <MessageCircle size={22} className="text-yellow" />
                </div>
                <div>
                  <div className="contact-label-small">{t('common.whatsappChat', {}, 'WhatsApp')}</div>
                  <a 
                    href={siteConfig.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value-main"
                  >
                    +91 {siteConfig.whatsappNumber}
                  </a>
                  <p className="contact-meta-desc">{t('contact.fastResponse', {}, 'Message us directly on WhatsApp')}</p>
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
                    <span>{t('location.getDirections', {}, 'Find Our Location')}</span>
                  </a>
                </div>
              </div>

              {/* Multilingual Support Box */}
              <div className="contact-languages-card card-navy">
                <div className="lang-header">
                  <span className="lang-badge">{t('location.multilingualSupport', {}, 'Multilingual Support')}</span>
                </div>
                <p className="lang-desc">
                  {t('location.multilingualDesc', {}, 'Our team can help you in English, Hindi, and Assamese.')}
                </p>
              </div>

              {/* Business Location & Service Note */}
              <div className="statutory-assurance-card">
                <p className="text-xs text-muted">
                  <strong>{siteConfig.name}</strong> is located on NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.
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
                    <span>{t('contact.tagline', {}, 'Contact Us')}</span>
                  </div>
                </div>
                <p className="form-card-subtitle">
                  {t('contact.description', {}, 'Have a question or need help choosing a service? Send us a message or contact our team directly on WhatsApp.')}
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
                        placeholder={t('contact.mobilePlaceholder', {}, 'Enter your mobile number')}
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

                  {/* Service Needed */}
                  <div className="form-group">
                    <label htmlFor="serviceType-select" className="form-label">
                      <span>{t('contact.serviceType', {}, 'Service Needed')} <span className="text-yellow">*</span></span>
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
                      <option value="">{t('contact.selectService', {}, "Select the service you're interested in")}</option>
                      {servicesData.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="Vehicle Compatibility Check">Vehicle Compatibility Check</option>
                      <option value="Wholesale & Dealership Supply">Wholesale &amp; Dealership Supply</option>
                      <option value="General Enquiry">General Enquiry</option>
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
                    placeholder={t('contact.vehiclePlaceholder', {}, 'Enter your vehicle model or make')}
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <span className="field-hint-text">
                    {t('contact.vehicleHint', {}, 'Sharing your vehicle model helps us understand your requirements.')}
                  </span>
                </div>

                {/* Optional Message / Notes */}
                <div className="form-group">
                  <label htmlFor="message-input" className="form-label">
                    <span>{t('contact.additionalMessage', {}, 'Additional Message')}</span>
                    <span className="text-muted text-xs font-normal"> (Optional)</span>
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows="3"
                    maxLength={500}
                    placeholder={t('contact.messagePlaceholder', {}, 'Tell us a little more about what you need...')}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Mandatory Terms & Conditions and Privacy Policy Checkbox */}
                <div
                  className={`form-group terms-consent-group ${
                    (touched.termsAccepted && !termsAccepted) || errors.termsAccepted ? 'terms-consent-error' : ''
                  } ${termsAccepted ? 'terms-consent-accepted' : ''}`}
                >
                  <div className="terms-checkbox-row">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      name="termsAccepted"
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                      className="terms-checkbox-input"
                      aria-required="true"
                      aria-invalid={!termsAccepted && (touched.termsAccepted || !!errors.termsAccepted) ? 'true' : 'false'}
                      aria-describedby={areRequiredFieldsValid && !termsAccepted ? 'terms-helper-msg' : undefined}
                    />
                    <label htmlFor="terms-checkbox" className="terms-checkbox-text">
                      I have read and agree to the{' '}
                      <a
                        href="#terms-conditions"
                        className="terms-legal-link"
                        onClick={(e) => handleLegalLinkClick(e, 'terms')}
                      >
                        Terms &amp; Conditions
                      </a>{' '}
                      and{' '}
                      <a
                        href="#privacy-policy"
                        className="terms-legal-link"
                        onClick={(e) => handleLegalLinkClick(e, 'privacy')}
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {areRequiredFieldsValid && !termsAccepted && (
                    <p id="terms-helper-msg" className="terms-helper-msg" role="status">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>Please accept the Terms &amp; Conditions and Privacy Policy to continue.</span>
                    </p>
                  )}

                  {!areRequiredFieldsValid && errors.termsAccepted && (
                    <span className="field-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.termsAccepted}</span>
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!isFormReady || isSubmitting}
                  className="form-submit-btn"
                  aria-disabled={!isFormReady || isSubmitting ? 'true' : 'false'}
                >
                  <MessageCircle size={20} />
                  <span>{isSubmitting ? t('common.loading', {}, 'Validating Details...') : t('contact.submitButton', {}, 'Review & Send via WhatsApp')}</span>
                </button>

                <p className="form-caption-note">
                  {t('contact.privacyNote', {}, "You'll be able to review your details before continuing to WhatsApp.")}
                </p>

                {formSubmitError && !isFormReady && (
                  <div className="enquiry-cancelled-banner animate-fade-in" role="alert">
                    <AlertCircle size={18} className="enquiry-cancelled-icon flex-shrink-0" />
                    <span>Please check the highlighted fields and try again.</span>
                  </div>
                )}

                {/* Enquiry Review Cancelled Notification */}
                {cancelledNotice && (
                  <div className="enquiry-cancelled-banner animate-fade-in" role="status">
                    <Info size={18} className="enquiry-cancelled-icon flex-shrink-0" />
                    <span>Your review has been cancelled. Your information is still saved in the form.</span>
                  </div>
                )}

                {/* WhatsApp Handoff State Banner */}
                {handoffState === 'prepared' && (
                  <div className="handoff-status-banner animate-fade-in" role="status">
                    <div className="handoff-header-row">
                      {whatsappOpenError ? (
                        <AlertCircle size={20} className="text-danger flex-shrink-0" />
                      ) : (
                        <CheckCircle size={20} className="text-yellow flex-shrink-0" />
                      )}
                      <h4 className="handoff-title">
                        {whatsappOpenError ? "WhatsApp couldn't be opened" : 'Your WhatsApp Message Is Ready'}
                      </h4>
                    </div>
                    <p className="handoff-body">
                      {whatsappOpenError
                        ? "WhatsApp couldn't be opened. Please try again or contact us directly."
                        : <>Your enquiry details have been prepared. Please tap <strong>Send</strong> in WhatsApp to message <strong>Maa Kamakhya Auto Gas</strong>.</>
                      }
                    </p>
                    <p className="handoff-disclaimer text-xs text-muted">
                      Note: Your message is not sent automatically by this website. You can review it once more in WhatsApp before sending.
                    </p>

                    {/* Direct Fallback Link for Mobile and Popup-blocked Browsers */}
                    <div className="handoff-trouble-card">
                      <a
                        href={lastWhatsAppUrl || siteConfig.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="handoff-trouble-link"
                      >
                        Having trouble opening WhatsApp? Tap here to try again.
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
                          <span>Open WhatsApp Again</span>
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
                          <span>Open WhatsApp Web</span>
                        </a>
                      )}

                      {lastMessageText && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(lastMessageText)}
                          className="btn btn-secondary btn-sm"
                          title="Copy message to clipboard"
                        >
                          {copiedMessage ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                          <span>{copiedMessage ? 'Copied!' : 'Copy Message'}</span>
                        </button>
                      )}

                      <a href={siteConfig.phoneTel} className="btn btn-secondary btn-sm">
                        <Phone size={14} />
                        <span>{t('common.callWorkshop', {}, 'Call Us')}: {siteConfig.phoneFormatted}</span>
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
        onEdit={() => {
          setCancelledNotice(false);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        onHoldCancel={() => {
          setIsModalOpen(false);
          setHandoffState(null);
          setCancelledNotice(true);
        }}
      />
    </section>
  );
}
