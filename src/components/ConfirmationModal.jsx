import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Edit3, MessageCircle, X, Shield, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppMessage } from '../utils/whatsapp';
import Button from './Button';
import HoldToCancelButton from './HoldToCancelButton';

export default function ConfirmationModal({
  isOpen,
  formData,
  utmData,
  onConfirm,
  onEdit,
  onCancel,
  isSubmitting
}) {
  const { t } = useLanguage();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen || !formData) return null;

  const fullMessageText = buildWhatsAppMessage(formData, utmData);

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
        <div className="confirm-modal-header">
          <div className="confirm-modal-badge">
            <CheckCircle2 size={16} className="text-yellow" />
            <span>{t('modal.title', {}, 'Review Your Enquiry')}</span>
          </div>
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
          {t('modal.title', {}, 'Confirm Details Before Continuing to WhatsApp')}
        </h3>

        <p className="confirm-modal-notice">
          {t('modal.subtitle', {}, 'You are about to continue to WhatsApp to chat directly with Maa Kamakhya Auto Gas. Please review your details below before opening WhatsApp.')}
        </p>

        {/* Review Summary Box */}
        <div className="enquiry-summary-box">
          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldFullName', {}, 'Full Name:')}</span>
            <span className="summary-value text-white">{formData.fullName}</span>
          </div>

          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldMobile', {}, 'Mobile Number:')}</span>
            <span className="summary-value text-yellow font-bold">+91 {formData.phone}</span>
          </div>

          <div className="summary-field-row">
            <span className="summary-label">{t('modal.fieldService', {}, 'Enquiry Type:')}</span>
            <span className="summary-value text-white">{formData.serviceType}</span>
          </div>

          {formData.vehicleModel && formData.vehicleModel.trim() && (
            <div className="summary-field-row">
              <span className="summary-label">{t('modal.fieldVehicle', {}, 'Vehicle Details:')}</span>
              <span className="summary-value text-white">{formData.vehicleModel.trim()}</span>
            </div>
          )}

          {formData.message && formData.message.trim() && (
            <div className="summary-field-row summary-field-column">
              <span className="summary-label">{t('modal.fieldMessage', {}, 'Additional Message:')}</span>
              <p className="summary-message-block">{formData.message.trim()}</p>
            </div>
          )}

          {utmData && Object.keys(utmData).length > 0 && (
            <div className="summary-field-row summary-utm-row">
              <span className="summary-label">Attribution:</span>
              <span className="summary-value text-muted text-xs">
                {utmData.utm_source ? `Source: ${utmData.utm_source}` : ''}
                {utmData.utm_campaign ? ` | Campaign: ${utmData.utm_campaign}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Verbatim Complete WhatsApp Message Box */}
        <div className="confirm-full-message-box">
          <div className="confirm-full-message-header">
            <FileText size={14} className="text-yellow" />
            <span>Complete Pre-formatted WhatsApp Message:</span>
          </div>
          <pre className="confirm-full-message-content">{fullMessageText}</pre>
        </div>

        <div className="confirm-modal-reminder">
          <Shield size={16} className="text-yellow flex-shrink-0" />
          <span>
            {t('modal.verifiedNote', {}, 'Your inquiry will open in the verified WhatsApp chat with Maa Kamakhya Auto Gas specialists (+91 8822049075).')}
          </span>
        </div>

        {/* Action Controls */}
        <div className="confirm-modal-actions">
          <Button
            variant="whatsapp"
            size="lg"
            onClick={onConfirm}
            icon={MessageCircle}
            disabled={isSubmitting}
            className="w-full sm-auto"
          >
            {isSubmitting ? t('common.loading', {}, 'Preparing WhatsApp...') : t('modal.sendWhatsApp', {}, 'Confirm & Continue to WhatsApp')}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={onEdit}
            icon={Edit3}
            disabled={isSubmitting}
          >
            Edit Details
          </Button>

          <HoldToCancelButton
            onCancel={onCancel}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
