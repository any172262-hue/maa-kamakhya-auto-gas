import React, { useEffect, useRef, useState } from 'react';
import { Edit3, MessageCircle, X, FileText, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';
import Button from './Button';
import HoldToCancelButton from './HoldToCancelButton';

export default function ConfirmationModal({
  isOpen,
  formData,
  utmData,
  onConfirm,
  onEdit,
  onCancel,
  onHoldCancel,
  isSubmitting
}) {
  const { t } = useLanguage();
  const modalRef = useRef(null);
  const [modalCopied, setModalCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          if (!isSubmitting) onCancel();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onCancel, isSubmitting]);

  if (!isOpen || !formData) return null;

  const normalizedData = {
    ...formData,
    fullName: (formData.fullName || formData.name || '').trim(),
    phone: (formData.phone || '').trim(),
    serviceType: (formData.serviceType || formData.service || '').trim(),
    vehicleModel: (formData.vehicleModel || formData.carModel || '').trim(),
    message: (formData.message || '').trim()
  };

  const fullMessageText = buildWhatsAppMessage(normalizedData);
  const whatsAppUrl = buildWhatsAppUrl(normalizedData);
  const displayVehicle = normalizedData.vehicleModel || t('modal.notProvided', {}, 'Not provided');
  const displayMessage = normalizedData.message || 'No additional message';

  const handleCopyModalMessage = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullMessageText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullMessageText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 2500);
    } catch {
      // Clipboard unsupported
    }
  };

  return (
    <div
      className="confirmation-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="confirmation-modal-card card-navy" ref={modalRef}>
        <div className="confirm-modal-header" style={{ justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="confirm-modal-close"
            aria-label={t('common.close', {}, 'Close')}
          >
            <X size={18} />
          </button>
        </div>

        <h3 id="confirm-modal-title" className="confirm-modal-title">
          {t('modal.title', {}, 'Review Your Enquiry')}
        </h3>

        <p className="confirm-modal-notice">
          {t('modal.subtitle', {}, 'Please check your details before continuing to WhatsApp.')}
        </p>

        {/* Review Summary Box */}
        <div className="enquiry-summary-box">
          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldFullName', {}, 'Full Name:')}</span>
            <span className="summary-value text-white font-bold">{normalizedData.fullName}</span>
          </div>

          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldMobile', {}, 'Mobile Number:')}</span>
            <span className="summary-value text-yellow font-bold">
              {normalizedData.phone ? (normalizedData.phone.startsWith('+') ? normalizedData.phone : `+91 ${normalizedData.phone}`) : ''}
            </span>
          </div>

          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldService', {}, 'Service Needed:')}</span>
            <span className="summary-value text-white">{normalizedData.serviceType}</span>
          </div>

          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldVehicle', {}, 'Vehicle Model / Make:')}</span>
            <span className={`summary-value ${normalizedData.vehicleModel ? 'text-white' : 'text-muted'}`}>
              {displayVehicle}
            </span>
          </div>

          {(formData.vehicleType || formData.vehicleUse) && (
            <div className="summary-field-row">
              <span className="summary-label">Vehicle Type:</span>
              <span className="summary-value text-white">{(formData.vehicleType || formData.vehicleUse).trim()}</span>
            </div>
          )}

          {(formData.calculatorEstimate || formData.estimate) && (
            <div className="summary-field-row summary-field-column">
              <span className="summary-label">Calculator Estimate:</span>
              <p className="summary-message-block">{(formData.calculatorEstimate || formData.estimate).trim()}</p>
            </div>
          )}

          <div className="summary-field-row summary-field-column">
            <span className="summary-label">{t('modal.fieldMessage', {}, 'Additional Message:')}</span>
            <p className={`summary-message-block ${!normalizedData.message ? 'summary-message-empty' : ''}`}>
              {displayMessage}
            </p>
          </div>

          {utmData && (utmData.utm_source || utmData.utm_campaign) && (
            <div className="summary-field-row summary-utm-row">
              <span className="summary-label">Attribution:</span>
              <span className="summary-value text-muted text-xs">
                {utmData.utm_source ? `Source: ${utmData.utm_source}` : ''}
                {utmData.utm_campaign ? ` | Campaign: ${utmData.utm_campaign}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Verbatim Complete WhatsApp Message Box with Copy Option */}
        <div className="confirm-full-message-box">
          <div className="confirm-full-message-header">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-yellow" />
              <span>Complete Pre-formatted WhatsApp Message:</span>
            </div>
            <button
              type="button"
              onClick={handleCopyModalMessage}
              className="confirm-copy-btn"
              title="Copy message to clipboard"
              aria-label="Copy message to clipboard"
            >
              {modalCopied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
              <span>{modalCopied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <pre className="confirm-full-message-content">{fullMessageText}</pre>
        </div>

        <div className="confirm-modal-reminder">
          <span>
            {t('modal.verifiedNote', {}, 'Your message will open directly in chat with Maa Kamakhya Auto Gas (+91 69139 10337). Please press Send inside WhatsApp to deliver your enquiry.')}
          </span>
        </div>

        {/* Action Controls: [ Cancel ] [ Edit Details ] [ Confirm & Continue to WhatsApp ] */}
        <div className="confirm-modal-actions">
          <HoldToCancelButton
            onCancel={onHoldCancel || onCancel}
            disabled={isSubmitting}
          />

          <Button
            variant="secondary"
            size="md"
            onClick={onEdit}
            icon={Edit3}
            disabled={isSubmitting}
          >
            Edit Details
          </Button>

          <Button
            variant="whatsapp"
            size="lg"
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onConfirm}
            icon={MessageCircle}
            disabled={isSubmitting}
            className="confirm-whatsapp-action-btn"
          >
            {isSubmitting ? t('common.loading', {}, 'Preparing WhatsApp...') : t('modal.sendWhatsApp', {}, 'Confirm & Continue to WhatsApp')}
          </Button>
        </div>
      </div>
    </div>
  );
}
