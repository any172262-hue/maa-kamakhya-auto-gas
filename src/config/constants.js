import { siteConfig } from '../data/siteConfig.js';

export const APP_CONFIG = {
  name: siteConfig.name,
  legalName: siteConfig.statutory.legalName,
  tagline: siteConfig.tagline,
  phone: siteConfig.phone,
  phoneTel: siteConfig.phoneTel,
  whatsappNumber: siteConfig.whatsappNumber,
  whatsappUrl: siteConfig.whatsappUrl,
  address: siteConfig.address,
  mapUrl: siteConfig.mapUrl,
  hours: siteConfig.hours,
  languages: siteConfig.languages
};

export const FUEL_DEFAULTS = {
  distance: 5000,
  petrolPrice: 107,
  cngPrice: 91,
  petrolMileage: 15,
  cngMileage: 27
};
