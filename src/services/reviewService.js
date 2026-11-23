/**
 * Customer Ratings & Reviews Service
 * Maa Kamakhya Auto Gas
 * 
 * Provides genuine, unpadded review storage, dynamic rating calculation,
 * input validation, anti-spam safeguards, and pending review moderation.
 */

const STORAGE_KEY_APPROVED = 'mka_approved_reviews';
const STORAGE_KEY_PENDING = 'mka_pending_reviews';
const STORAGE_KEY_RATE_LIMIT = 'mka_last_review_submit';

// Default state: Zero fabricated reviews.
// When no genuine reviews exist, an honest empty state is presented to visitors.
export const DEFAULT_APPROVED_REVIEWS = [];

/**
 * Strips HTML tags and escapes special characters to prevent XSS/injection.
 */
export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>"'&]/g, (match) => {
      switch (match) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '&': return '&amp;';
        default: return match;
      }
    })
    .trim();
}

/**
 * Calculates rating metrics strictly from actual approved review records.
 * Never hardcodes or pads ratings when zero reviews exist.
 */
export function calculateRatingSummary(reviews = []) {
  const count = Array.isArray(reviews) ? reviews.length : 0;
  
  if (count === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      starPercentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0)));
    starCounts[star] = (starCounts[star] || 0) + 1;
    sum += star;
  });

  const averageRating = Number((sum / count).toFixed(1));
  const starPercentages = {
    5: Math.round((starCounts[5] / count) * 100),
    4: Math.round((starCounts[4] / count) * 100),
    3: Math.round((starCounts[3] / count) * 100),
    2: Math.round((starCounts[2] / count) * 100),
    1: Math.round((starCounts[1] / count) * 100)
  };

  return {
    averageRating,
    totalReviews: count,
    starCounts,
    starPercentages
  };
}

/**
 * Validates review submission inputs.
 */
export function validateReviewInput({ name, rating, comment, honeypot }) {
  const errors = {};

  // Honeypot check: If the hidden honeypot field is filled, flag as bot/spam
  if (honeypot && String(honeypot).trim() !== '') {
    return {
      isValid: false,
      isSpam: true,
      errors: { honeypot: 'Spam detected' }
    };
  }

  // Name validation: 2-50 characters
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 50) {
    errors.name = 'Name cannot exceed 50 characters.';
  }

  // Rating validation: integer between 1 and 5
  const numRating = Number(rating);
  if (!numRating || !Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    errors.rating = 'Please select a star rating between 1 and 5.';
  }

  // Comment validation: 10-1000 characters
  const trimmedComment = typeof comment === 'string' ? comment.trim() : '';
  if (!trimmedComment) {
    errors.comment = 'Please share your experience.';
  } else if (trimmedComment.length < 10) {
    errors.comment = 'Your review must be at least 10 characters long.';
  } else if (trimmedComment.length > 1000) {
    errors.comment = 'Your review cannot exceed 1000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    isSpam: false,
    errors
  };
}

/**
 * Checks client rate limit (cooldown period of 5 minutes between submissions).
 */
export function checkRateLimit(cooldownMs = 300000) {
  try {
    const lastSubmit = localStorage.getItem(STORAGE_KEY_RATE_LIMIT);
    if (!lastSubmit) return { allowed: true, waitSeconds: 0 };
    
    const elapsed = Date.now() - Number(lastSubmit);
    if (elapsed < cooldownMs) {
      const waitSeconds = Math.ceil((cooldownMs - elapsed) / 1000);
      return { allowed: false, waitSeconds };
    }
  } catch {
    // Graceful fallback if localStorage is unavailable
  }
  return { allowed: true, waitSeconds: 0 };
}

/**
 * Retrieves approved reviews from storage.
 */
export function getApprovedReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPROVED);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Return empty array if storage inaccessible or corrupt
  }
  return DEFAULT_APPROVED_REVIEWS;
}

/**
 * Retrieves pending reviews awaiting moderation.
 */
export function getPendingReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PENDING);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Return empty array
  }
  return [];
}

/**
 * Submits a new customer review.
 * All submissions are initially marked as 'pending' for moderation.
 */
export function submitReview({ name, rating, comment, service, honeypot }) {
  // 1. Spam & input validation
  const validation = validateReviewInput({ name, rating, comment, honeypot });
  if (!validation.isValid) {
    return {
      success: false,
      isSpam: validation.isSpam,
      errors: validation.errors
    };
  }

  // 2. Client rate limit check
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      success: false,
      isRateLimited: true,
      errors: {
        rateLimit: `Please wait ${rateLimit.waitSeconds} seconds before submitting another review.`
      }
    };
  }

  // 3. Create sanitized review record
  const newReview = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: sanitizeText(name),
    rating: Number(rating),
    comment: sanitizeText(comment),
    service: service ? sanitizeText(service) : 'CNG / LPG Service',
    createdAt: new Date().toISOString(),
    status: 'pending',
    isVerified: false
  };

  // 4. Save to pending moderation queue
  try {
    const pending = getPendingReviews();
    pending.unshift(newReview);
    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(pending));
    localStorage.setItem(STORAGE_KEY_RATE_LIMIT, String(Date.now()));
  } catch (err) {
    console.error('Failed to store pending review:', err);
  }

  return {
    success: true,
    message: 'Thank you for sharing your experience! Your review has been submitted for moderation and will appear publicly once verified by our workshop team.',
    review: newReview
  };
}

/**
 * Approves a pending review for public display.
 */
export function approveReview(reviewId) {
  try {
    const pending = getPendingReviews();
    const index = pending.findIndex((r) => r.id === reviewId);
    
    if (index === -1) return { success: false, error: 'Review not found' };

    const [approvedItem] = pending.splice(index, 1);
    approvedItem.status = 'approved';
    approvedItem.isVerified = true;

    const approved = getApprovedReviews();
    approved.unshift(approvedItem);

    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(pending));
    localStorage.setItem(STORAGE_KEY_APPROVED, JSON.stringify(approved));

    return {
      success: true,
      approvedReviews: approved,
      summary: calculateRatingSummary(approved)
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Rejects/dismisses a pending review.
 */
export function rejectReview(reviewId) {
  try {
    const pending = getPendingReviews();
    const filtered = pending.filter((r) => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(filtered));
    return { success: true, pendingReviews: filtered };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Deletes an existing approved review.
 */
export function deleteApprovedReview(reviewId) {
  try {
    const approved = getApprovedReviews();
    const filtered = approved.filter((r) => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY_APPROVED, JSON.stringify(filtered));
    return {
      success: true,
      approvedReviews: filtered,
      summary: calculateRatingSummary(filtered)
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
