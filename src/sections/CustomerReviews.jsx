import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  X, 
  ExternalLink, 
  Send, 
  AlertCircle,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { 
  getApprovedReviews, 
  getPendingReviews,
  calculateRatingSummary, 
  submitReview,
  approveReview,
  rejectReview,
  DEFAULT_APPROVED_REVIEWS
} from '../services/reviewService';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function CustomerReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState(DEFAULT_APPROVED_REVIEWS);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  
  // Review form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [service, setService] = useState('Sequential CNG Kit Installation');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // Load reviews on mount
  useEffect(() => {
    const loadedApproved = getApprovedReviews();
    setReviews(loadedApproved);
    const loadedPending = getPendingReviews();
    setPendingReviews(loadedPending);
  }, []);

  // Listen for admin moderation shortcut (Ctrl + Shift + M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsModerationOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isModalOpen) handleCloseModal();
        if (isModerationOpen) setIsModerationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isModerationOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || isModerationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isModerationOpen]);

  // Calculate rating summary dynamically from actual approved reviews
  const summary = calculateRatingSummary(reviews);

  const handleOpenModal = () => {
    setFormErrors({});
    setSubmitSuccess(false);
    setSubmitMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName('');
    setRating(5);
    setHoverRating(0);
    setComment('');
    setHoneypot('');
    setFormErrors({});
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const result = submitReview({
      name,
      rating,
      comment,
      service,
      honeypot
    });

    if (!result.success) {
      if (result.errors) {
        setFormErrors(result.errors);
      }
      return;
    }

    setSubmitSuccess(true);
    setSubmitMessage(result.message);
    setPendingReviews(getPendingReviews());
  };

  const handleApprove = (id) => {
    const res = approveReview(id);
    if (res.success) {
      setReviews(res.approvedReviews);
      setPendingReviews(getPendingReviews());
    }
  };

  const handleReject = (id) => {
    const res = rejectReview(id);
    if (res.success) {
      setPendingReviews(res.pendingReviews);
    }
  };

  const servicesOptions = [
    'Sequential CNG Kit Installation',
    'CNG Cylinder Hydro-Testing',
    'CNG Retrofitment & Conversion',
    'LPG Kit Service & Tuning',
    'Auto Gas Diagnostic & Maintenance',
    'General CNG Servicing'
  ];

  return (
    <section id="reviews" className="section reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('reviews.tagline', {}, 'CUSTOMER EXPERIENCES & FEEDBACK')}
            title={t('reviews.title', {}, 'Customer Ratings &')}
            highlight={t('reviews.titleHighlight', {}, 'Reviews.')}
            description={t('reviews.description', {}, 'Genuine feedback from car owners who visited our NH 37 Garchuk workshop for CNG & LPG installations, maintenance, and testing.')}
          />
        </RevealAnimation>

        {/* Dynamic Reviews Container */}
        {summary.totalReviews === 0 ? (
          /* Honest Empty State: Never hardcodes 5.0 or fake reviews */
          <RevealAnimation delay={1}>
            <div className="reviews-empty-card">
              <div className="empty-stars-row" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} className="star-empty" />
                ))}
              </div>

              <h3 className="empty-title">
                {t('reviews.emptyTitle', {}, 'Be the first to share your experience with Maa Kamakhya Auto Gas.')}
              </h3>
              
              <p className="empty-desc">
                {t('reviews.emptyDesc', {}, 'We believe in 100% genuine feedback without fabricated ratings. All submitted customer reviews are individually verified by our workshop team.')}
              </p>

              <div className="empty-actions">
                <button
                  type="button"
                  ref={triggerRef}
                  onClick={handleOpenModal}
                  className="btn btn-primary btn-md review-write-btn"
                  aria-label="Write a customer review"
                >
                  <MessageSquare size={17} className="mr-2" />
                  <span>{t('reviews.writeReview', {}, 'Write a Review')}</span>
                </button>

                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-md review-google-btn"
                  aria-label="Review Maa Kamakhya Auto Gas on Google Maps"
                >
                  <span>{t('reviews.googleReview', {}, 'Review on Google Maps')}</span>
                  <ExternalLink size={15} className="ml-2" />
                </a>
              </div>
            </div>
          </RevealAnimation>
        ) : (
          /* Active Ratings Summary & Review Cards */
          <div className="reviews-content-wrapper">
            {/* Top Aggregate Rating Banner */}
            <RevealAnimation delay={1}>
              <div className="reviews-summary-card">
                <div className="rating-score-block">
                  <span className="big-rating-number">{summary.averageRating}</span>
                  <div className="stars-cluster" aria-label={`Average rating: ${summary.averageRating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={star <= Math.round(summary.averageRating) ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                  <span className="review-count-note">
                    {t('reviews.basedOn', { count: summary.totalReviews }, `Based on ${summary.totalReviews} verified review${summary.totalReviews === 1 ? '' : 's'}`)}
                  </span>
                </div>

                {/* Star Distribution Bars */}
                <div className="rating-bars-block">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="rating-bar-row">
                      <span className="bar-label">{stars}★</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${summary.starPercentages[stars]}%` }}
                          aria-valuenow={summary.starPercentages[stars]}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          role="progressbar"
                        />
                      </div>
                      <span className="bar-count">{summary.starCounts[stars]}</span>
                    </div>
                  ))}
                </div>

                {/* Actions Block */}
                <div className="rating-actions-block">
                  <button
                    type="button"
                    ref={triggerRef}
                    onClick={handleOpenModal}
                    className="btn btn-primary btn-md w-full review-write-btn"
                  >
                    <MessageSquare size={17} className="mr-2" />
                    <span>{t('reviews.writeReview', {}, 'Write a Review')}</span>
                  </button>

                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-md w-full review-google-btn"
                  >
                    <span>{t('reviews.googleReview', {}, 'Review on Google Maps')}</span>
                    <ExternalLink size={15} className="ml-2" />
                  </a>
                </div>
              </div>
            </RevealAnimation>

            {/* Individual Reviews Grid */}
            <div className="reviews-cards-grid">
              {reviews.map((rev, idx) => (
                <RevealAnimation key={rev.id || idx} delay={idx + 1}>
                  <article className="review-item-card">
                    <div className="review-card-header">
                      <div>
                        <div className="reviewer-name-row">
                          <h4 className="reviewer-name">{rev.name}</h4>
                          {rev.isVerified && (
                            <span className="verified-badge" title="Verified Customer Review">
                              <CheckCircle2 size={13} className="text-green mr-1" />
                              <span>{t('reviews.verifiedCustomer', {}, 'Verified Customer')}</span>
                            </span>
                          )}
                        </div>
                        {rev.service && <span className="review-service-tag">{rev.service}</span>}
                      </div>

                      <div className="review-stars-row" aria-label={`${rev.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= rev.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="review-comment-text">{rev.comment}</p>

                    <div className="review-card-footer">
                      <time className="review-date" dateTime={rev.createdAt}>
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </time>
                      <span className="review-tagline">Maa Kamakhya Auto Gas</span>
                    </div>
                  </article>
                </RevealAnimation>
              ))}
            </div>
          </div>
        )}

        {/* Discreet Owner Moderation Link */}
        <div className="reviews-admin-access">
          <button
            type="button"
            onClick={() => setIsModerationOpen(true)}
            className="admin-queue-toggle"
            title="Moderation Console (or press Ctrl+Shift+M)"
          >
            <ShieldCheck size={13} className="mr-1" />
            <span>Manage Pending Reviews ({pendingReviews.length} pending)</span>
          </button>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div 
          className="modal-backdrop review-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="modal-container review-modal-card" ref={modalRef}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <h3 id="write-review-title" className="modal-title">
                  {t('reviews.modalTitle', {}, 'Share Your Review')}
                </h3>
                <p className="modal-subtitle">
                  {t('reviews.modalSubtitle', {}, 'Your feedback helps other drivers in Guwahati learn about our services.')}
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseModal}
                aria-label={t('common.close', {}, 'Close')}
              >
                <X size={20} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="modal-body review-success-body">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="text-green" />
                </div>
                <h4 className="success-heading">
                  {t('reviews.successTitle', {}, 'Thank You for Your Review')}
                </h4>
                <p className="success-message">{submitMessage}</p>
                <div className="success-note">
                  <Clock size={14} className="mr-1 text-yellow flex-shrink-0" />
                  <span>
                    {t('reviews.moderationNote', {}, 'All submitted reviews are checked by our team before they appear on the website.')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-primary btn-md mt-4"
                >
                  {t('common.close', {}, 'Done')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-body review-form">
                {formErrors.rateLimit && (
                  <div className="alert-box alert-warning">
                    <AlertCircle size={16} className="alert-icon" />
                    <span>{formErrors.rateLimit}</span>
                  </div>
                )}

                {/* Rating Picker */}
                <div className="form-group">
                  <label id="star-rating-label" className="form-label font-semibold">
                    {t('reviews.yourRating', {}, 'Your Rating')} <span className="text-red">*</span>
                  </label>
                  <div 
                    className="star-rating-picker"
                    role="radiogroup"
                    aria-labelledby="star-rating-label"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-pick-btn"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        role="radio"
                        aria-checked={rating === star}
                        aria-label={`${star} star${star === 1 ? '' : 's'}`}
                      >
                        <Star
                          size={32}
                          className={
                            star <= (hoverRating || rating)
                              ? 'star-picked'
                              : 'star-unpicked'
                          }
                        />
                      </button>
                    ))}
                    <span className="rating-score-pill">
                      {hoverRating || rating} / 5
                    </span>
                  </div>
                  {formErrors.rating && <p className="form-error">{formErrors.rating}</p>}
                </div>

                {/* Customer Full Name */}
                <div className="form-group">
                  <label htmlFor="review-name" className="form-label font-semibold">
                    {t('reviews.nameLabel', {}, 'Your Name')} <span className="text-red">*</span>
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    maxLength={50}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kalita"
                    className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                  />
                  {formErrors.name && <p className="form-error">{formErrors.name}</p>}
                </div>

                {/* Service Tag */}
                <div className="form-group">
                  <label htmlFor="review-service" className="form-label font-semibold">
                    {t('reviews.serviceLabel', {}, 'Service Received')}
                  </label>
                  <select
                    id="review-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="form-input"
                  >
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Review Experience Text */}
                <div className="form-group">
                  <div className="label-counter-row">
                    <label htmlFor="review-comment" className="form-label font-semibold">
                      {t('reviews.experienceLabel', {}, 'Your Review / Experience')} <span className="text-red">*</span>
                    </label>
                    <span className="char-counter">{comment.length}/1000</span>
                  </div>
                  <textarea
                    id="review-comment"
                    required
                    rows={4}
                    minLength={10}
                    maxLength={1000}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the installation quality, mileage results, engine tuning, or customer service..."
                    className={`form-input ${formErrors.comment ? 'input-error' : ''}`}
                  />
                  {formErrors.comment && <p className="form-error">{formErrors.comment}</p>}
                </div>

                {/* Honeypot field for anti-spam (hidden from real users) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="review-website">Leave blank</label>
                  <input
                    id="review-website"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="privacy-disclosure-note">
                  <ShieldCheck size={14} className="text-yellow mr-1 flex-shrink-0" />
                  <span>
                    {t('reviews.privacyConsent', {}, 'Your review and name will appear publicly once approved. Contact details are never requested or published.')}
                  </span>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-secondary btn-md"
                  >
                    {t('common.cancel', {}, 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-md"
                  >
                    <Send size={16} className="mr-2" />
                    <span>{t('reviews.submitReview', {}, 'Submit Review')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Owner Moderation Console Modal */}
      {isModerationOpen && (
        <div 
          className="modal-backdrop moderation-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="moderation-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModerationOpen(false);
          }}
        >
          <div className="modal-container moderation-modal-card">
            <div className="modal-header">
              <div>
                <h3 id="moderation-title" className="modal-title flex items-center">
                  <ShieldCheck size={20} className="text-yellow mr-2" />
                  <span>Review Moderation Queue</span>
                </h3>
                <p className="modal-subtitle">
                  Pending customer reviews requiring owner approval before public display.
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModerationOpen(false)}
                aria-label="Close moderation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body moderation-body">
              {pendingReviews.length === 0 ? (
                <div className="moderation-empty-note">
                  <CheckCircle2 size={32} className="text-green mb-2" />
                  <p className="font-semibold">All customer reviews are up to date.</p>
                  <span className="text-xs text-muted">No pending reviews in the queue.</span>
                </div>
              ) : (
                <div className="pending-reviews-list">
                  {pendingReviews.map((item) => (
                    <div key={item.id} className="pending-review-item">
                      <div className="pending-item-header">
                        <div>
                          <strong className="text-white block">{item.name}</strong>
                          <span className="text-xs text-muted">{item.service}</span>
                        </div>
                        <span className="pending-stars-pill">{item.rating} ★</span>
                      </div>
                      <p className="pending-comment">{item.comment}</p>
                      <div className="pending-actions">
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id)}
                          className="btn-approve"
                        >
                          Approve Review
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(item.id)}
                          className="btn-reject"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <span className="text-xs text-muted">
                Approved reviews automatically update total count and rating average.
              </span>
              <button
                type="button"
                onClick={() => setIsModerationOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
