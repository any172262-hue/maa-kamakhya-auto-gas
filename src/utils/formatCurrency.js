/**
 * Formats a numeric value into standard Indian Rupee notation (e.g. ₹18,815)
 * @param {number} value
 * @returns {string}
 */
export function formatINR(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return '₹0';
  }

  const rounded = Math.round(Math.max(0, value));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rounded);
}

/**
 * Formats a distance number with km suffix
 * @param {number} distance
 * @returns {string}
 */
export function formatDistance(distance) {
  if (distance === undefined || distance === null || isNaN(distance)) {
    return '0 km';
  }
  return new Intl.NumberFormat('en-IN').format(Math.round(distance)) + ' km';
}
