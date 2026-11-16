/**
 * Lightweight client-side UTM Campaign Tracker.
 * Captures query parameters on initial page arrival and preserves them across session navigation.
 * Collects only documented campaign attribution parameters without third-party tracking scripts.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'mk_auto_gas_utm';

function sanitizeUtmValue(val) {
  if (!val || typeof val !== 'string') return '';
  // Strip control characters, quotes, and newlines; limit to 60 characters
  return val.replace(/[^\w\s.-]/g, '').trim().slice(0, 60);
}

export function captureUtmParams() {
  if (typeof window === 'undefined') return {};

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const captured = {};
    let hasUtm = false;

    UTM_KEYS.forEach((key) => {
      const rawVal = searchParams.get(key);
      const cleanVal = sanitizeUtmValue(rawVal);
      if (cleanVal) {
        captured[key] = cleanVal;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }

    // Fall back to existing session attribution if present
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    // Non-blocking fallback for restricted environments
  }

  return {};
}

export function getUtmParams() {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // ignore
  }
  return captureUtmParams();
}

/**
 * Formats available UTM campaign details into text for WhatsApp enquiry handoff.
 * Omits entirely if no campaign parameters exist.
 * @param {Object} utm
 * @returns {string}
 */
export function formatUtmForMessage(utm = {}) {
  const lines = [];
  if (utm.utm_source) lines.push(`Source: ${utm.utm_source}`);
  if (utm.utm_medium) lines.push(`Medium: ${utm.utm_medium}`);
  if (utm.utm_campaign) lines.push(`Campaign: ${utm.utm_campaign}`);
  if (utm.utm_term) lines.push(`Term: ${utm.utm_term}`);
  if (utm.utm_content) lines.push(`Content: ${utm.utm_content}`);

  if (lines.length === 0) return '';
  return `Campaign Information:\n${lines.join('\n')}\n`;
}
