import { servicesData, verifiedServiceTags, benefitsData, vehicleCompatibilityData, installationSteps } from './services.js';
import { siteConfig } from './siteConfig.js';

export const searchableItems = [
  // 1. Core Services (8 packages)
  ...servicesData.map((svc) => ({
    id: `svc-${svc.id}`,
    title: svc.title,
    category: `Services: ${svc.category}`,
    description: svc.description,
    href: `#services`,
    action: svc.title,
    keywords: [svc.category, ...(svc.features || []), ...(svc.tags || [])].join(' ').toLowerCase()
  })),

  // 2. Verified Trade Tags (24 categories)
  ...verifiedServiceTags.map((tag, idx) => ({
    id: `tag-${idx}`,
    title: tag.name,
    category: `Trade Authorization: ${tag.category}`,
    description: `Government-listed automotive trade authorization for ${tag.name} in Guwahati, Assam.`,
    href: `#services`,
    action: tag.name,
    keywords: `${tag.name} ${tag.category} auto gas registration cng trade authorized`.toLowerCase()
  })),

  // 3. Calculator & Tools
  {
    id: 'tool-calculator',
    title: 'Fuel Savings Calculator',
    category: 'Interactive Calculator',
    description: 'Calculate your vehicle monthly and annual petrol vs CNG fuel expenditure and estimated savings.',
    href: '#calculator',
    keywords: 'calculator savings petrol cng running cost mileage distance kilometer price rupees guwahati'
  },

  // 4. Vehicle Compatibility
  ...vehicleCompatibilityData.brands.map((b) => ({
    id: `brand-${b.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${b.name} CNG Compatibility`,
    category: 'Vehicle Compatibility',
    description: `Certified sequential CNG kit compatibility for ${b.name} models: ${(b.popularModels || []).join(', ')}.`,
    href: '#services',
    keywords: `${b.name} ${(b.popularModels || []).join(' ')} compatibility conversion kit car four wheeler sedan hatchback`.toLowerCase()
  })),

  // 5. Benefits & Advantages
  ...benefitsData.map((b, idx) => ({
    id: `benefit-${idx}`,
    title: b.title,
    category: 'Why Choose CNG',
    description: b.description,
    href: '#benefits',
    keywords: `${b.title} ${b.description} advantages savings mileage performance clean green eco`.toLowerCase()
  })),

  // 6. Installation Process Steps
  ...installationSteps.map((step) => ({
    id: `step-${step.step}`,
    title: `Step ${step.step}: ${step.title}`,
    category: 'Installation Process',
    description: step.description,
    href: '#process',
    keywords: `step ${step.step} ${step.title} ${step.description} process workflow installation calibration testing`.toLowerCase()
  })),

  // 7. Confirmed Business Details
  {
    id: 'confirmed-business-details',
    title: 'Confirmed Business Information',
    category: 'Business Profile',
    description: `Operated by ${siteConfig.name} at ${siteConfig.address}. Offering CNG and LPG services in Guwahati.`,
    href: '#statutory-details',
    keywords: 'business profile address location boragaon garchuk guwahati assam confirmed services'
  },

  // 8. Contact & Workshop Location
  {
    id: 'contact-workshop',
    title: 'Workshop Location & Directions',
    category: 'Contact & Directions',
    description: `${siteConfig.address}. Open ${siteConfig.hours}. Call ${siteConfig.phoneFormatted}.`,
    href: '#location',
    keywords: 'location address directions map garchuk boragaon nh 37 nezon steel kumar resorts phone call whatsapp timing hours guwahati'
  }
];

/**
 * Searches the index client-side using multi-word case-insensitive matching.
 * @param {string} query
 * @returns {Array}
 */
export function searchWebsite(query) {
  if (!query || !query.trim()) return [];
  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

  return searchableItems.filter((item) => {
    const haystack = `${item.title} ${item.category} ${item.description} ${item.keywords}`.toLowerCase();
    return queryTokens.every((token) => haystack.includes(token));
  }).slice(0, 8); // Top 8 relevant results
}
