import assert from 'assert';
import { 
  calculateRatingSummary, 
  sanitizeText, 
  validateReviewInput, 
  DEFAULT_APPROVED_REVIEWS 
} from '../../src/services/reviewService.js';

export function runReviewsUnitTests() {
  console.log('▶ [Unit] Testing Customer Ratings & Reviews System:');

  // 1. Zero reviews / Empty state testing
  assert(DEFAULT_APPROVED_REVIEWS.length === 0, 'Default approved reviews array is strictly empty');
  const emptySummary = calculateRatingSummary([]);
  assert(emptySummary.averageRating === 0, 'Empty reviews array produces averageRating of 0 (no fake 5.0)');
  assert(emptySummary.totalReviews === 0, 'Empty reviews array produces totalReviews of 0');
  assert(emptySummary.starCounts[5] === 0, 'Empty reviews array produces 0 five-star reviews');
  assert(emptySummary.starCounts[1] === 0, 'Empty reviews array produces 0 one-star reviews');
  console.log('  ✓ Empty state verified: 0 average rating and 0 total reviews (never hardcoded 5.0)');

  // 2. Dynamic rating calculation math
  const mockApproved1 = [
    { id: 'rev_1', rating: 5, comment: 'Great sequential CNG installation' },
    { id: 'rev_2', rating: 4, comment: 'Good service and fair rates' },
    { id: 'rev_3', rating: 5, comment: 'Smooth pickup and testing' }
  ];
  const summary1 = calculateRatingSummary(mockApproved1);
  assert(summary1.totalReviews === 3, 'Total reviews count is 3');
  assert(summary1.averageRating === 4.7, `Average rating is (5+4+5)/3 = 4.7 (Got: ${summary1.averageRating})`);
  assert(summary1.starCounts[5] === 2, 'Five star count is 2');
  assert(summary1.starCounts[4] === 1, 'Four star count is 1');
  assert(summary1.starPercentages[5] === 67, 'Five star percentage is 67%');
  assert(summary1.starPercentages[4] === 33, 'Four star percentage is 33%');
  console.log('  ✓ Dynamic rating math verified: (5+4+5)/3 = 4.7 average');

  // 3. Automatic update on new approved review arrival
  const mockApproved2 = [
    ...mockApproved1,
    { id: 'rev_4', rating: 2, comment: 'Long queue on Sunday' }
  ];
  const summary2 = calculateRatingSummary(mockApproved2);
  assert(summary2.totalReviews === 4, 'Total reviews count updated to 4');
  assert(summary2.averageRating === 4.0, `Average rating automatically recalculates to (14+2)/4 = 4.0 (Got: ${summary2.averageRating})`);
  assert(summary2.starCounts[2] === 1, 'Two star count updated to 1');
  console.log('  ✓ Automatic recalculation verified: adding 2-star review updates average to 4.0');

  // 4. HTML sanitization & XSS prevention
  const dangerousInput = '<script>alert("xss")</script><b>Great Work!</b><img src=x onerror=alert(1)>';
  const sanitized = sanitizeText(dangerousInput);
  assert(!sanitized.includes('<script>'), 'Strips <script> tags completely');
  assert(!sanitized.includes('<b>'), 'Strips <b> tags completely');
  assert(!sanitized.includes('<img'), 'Strips <img> tags completely');
  assert(sanitized.includes('Great Work!'), 'Preserves legitimate text content');
  console.log('  ✓ HTML sanitization verified: strips dangerous tags and scripts');

  // 5. Input validation
  const valid = validateReviewInput({
    name: 'Anup Baruah',
    rating: 5,
    comment: 'Very professional CNG cylinder hydrostatic testing and certificate issuance.'
  });
  assert(valid.isValid === true, 'Accepts valid review input');

  // Rejects invalid rating
  const invalidRating = validateReviewInput({
    name: 'Anup Baruah',
    rating: 6,
    comment: 'Valid comment text here'
  });
  assert(invalidRating.isValid === false, 'Rejects rating above 5');
  assert(invalidRating.errors.rating, 'Provides error message for invalid rating');

  // Rejects short name
  const shortName = validateReviewInput({
    name: 'A',
    rating: 5,
    comment: 'Valid comment text here'
  });
  assert(shortName.isValid === false, 'Rejects name shorter than 2 characters');

  // Rejects short comment
  const shortComment = validateReviewInput({
    name: 'Anup Baruah',
    rating: 5,
    comment: 'Good'
  });
  assert(shortComment.isValid === false, 'Rejects comment shorter than 10 characters');

  // 6. Spam protection: Honeypot field
  const spamSubmission = validateReviewInput({
    name: 'Bot User',
    rating: 5,
    comment: 'Buy cheap auto parts at botlink.com',
    honeypot: 'http://spamlink.com'
  });
  assert(spamSubmission.isValid === false, 'Rejects submission with filled honeypot field');
  assert(spamSubmission.isSpam === true, 'Flags filled honeypot as spam');
  console.log('  ✓ Input validation & spam honeypot trap verified');
}

// Run if executed directly
if (process.argv[1]?.endsWith('reviews.test.js')) {
  runReviewsUnitTests();
  console.log('🎉 All review unit tests passed successfully!\n');
}
