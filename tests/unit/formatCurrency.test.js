import { formatINR, formatDistance } from '../../src/utils/formatCurrency.js';

export function runFormatCurrencyUnitTests() {
  console.log('  ▶ [Unit] Testing formatINR() and formatDistance():');

  const inr = formatINR(18815);
  if (!inr.includes('18,815') && !inr.includes('₹')) throw new Error(`formatINR failed: got ${inr}`);

  const zeroInr = formatINR(0);
  if (!zeroInr.includes('0')) throw new Error(`Zero format failed: got ${zeroInr}`);

  const nanInr = formatINR(NaN);
  if (!nanInr.includes('0')) throw new Error(`NaN format failed: got ${nanInr}`);

  const dist = formatDistance(5000);
  if (!dist.includes('5,000') || !dist.includes('km')) throw new Error(`formatDistance failed: got ${dist}`);

  console.log('    ✓ All formatCurrency unit tests passed.');
}
