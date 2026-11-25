import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { navLinks } from '../data/navigation';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer({ onNavigateLegal }) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (onNavigateLegal) onNavigateLegal('home');
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  const getNavLinkName = (link) => {
    switch (link.href) {
      case '#hero':
        return t('nav.home', {}, link.name);
      case '#benefits':
        return t('nav.benefits', {}, link.name);
      case '#services':
        return t('nav.services', {}, link.name);
      case '#calculator':
        return t('nav.calculator', {}, link.name);
      case '#process':
        return t('nav.process', {}, link.name);
      case '#contact':
        return t('nav.contact', {}, link.name);
      default:
        return link.name;
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <a href="#hero" className="footer-brand-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
              <Logo height={65} className="footer-logo-img" />
            </a>
            <p className="footer-brand-desc">
              {t('footer.aboutDesc', {}, 'Auto gas workshop and filling station in Guwahati providing CNG and LPG services, gas kit installation, vehicle gas conversion, and gas kit repair and maintenance.')}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.quickLinks', {}, 'Quick Links')}</h4>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="footer-nav-link"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {getNavLinkName(link)}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#/about" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#/contact" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('contact');
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Dedicated Auto Gas Services Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Auto Gas Services</h4>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="#/services/cng-services" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-cng-services');
                  }}
                >
                  CNG Services
                </a>
              </li>
              <li>
                <a 
                  href="#/services/lpg-services" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-lpg-services');
                  }}
                >
                  LPG Services
                </a>
              </li>
              <li>
                <a 
                  href="#/services/auto-gas-filling" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-auto-gas-filling');
                  }}
                >
                  Auto Gas Filling Station
                </a>
              </li>
              <li>
                <a 
                  href="#/services/gas-kit-installation" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-gas-kit-installation');
                  }}
                >
                  Gas Kit Installation
                </a>
              </li>
              <li>
                <a 
                  href="#/services/vehicle-gas-conversion" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-vehicle-gas-conversion');
                  }}
                >
                  Vehicle Gas Conversion
                </a>
              </li>
              <li>
                <a 
                  href="#/services/gas-kit-repair-maintenance" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateLegal) onNavigateLegal('service-gas-kit-repair-maintenance');
                  }}
                >
                  Gas Kit Repair & Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('nav.contact', {}, 'Contact Us')}</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={20} className="text-yellow footer-icon" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} className="text-blue footer-icon" />
                <a href={siteConfig.phoneTel} className="footer-link-active">
                  {siteConfig.phoneFormatted}
                </a>
              </li>
              <li className="footer-contact-item">
                <MessageCircle size={18} className="text-yellow footer-icon" />
                <a 
                  href={siteConfig.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link-active"
                >
                  WhatsApp: +91 {siteConfig.whatsappNumber}
                </a>
              </li>
              {siteConfig.email && (
                <li className="footer-contact-item">
                  <Mail size={18} className="text-yellow footer-icon" />
                  <a href={`mailto:${siteConfig.email}`} className="footer-link-active">
                    {siteConfig.email}
                  </a>
                </li>
              )}
              <li className="footer-contact-item">
                <Clock size={18} className="text-muted footer-icon" />
                <span>{t('common.hours', {}, siteConfig.hours)}</span>
              </li>
            </ul>
          </div>

          {/* Services & Regional Support */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.acceptedPayments', {}, 'Services')}</h4>
            <p className="footer-muted-text">
              {t('footer.paymentDesc', {}, 'CNG & LPG automotive solutions and auto gas filling station in Guwahati:')}
            </p>
            <div className="footer-payment-badges">
              <span className="payment-mini-tag">CNG Services</span>
              <span className="payment-mini-tag">LPG Services</span>
              <span className="payment-mini-tag">CNG Filling</span>
              <span className="payment-mini-tag">Kit Installation</span>
              <span className="payment-mini-tag">Conversion</span>
              <span className="payment-mini-tag">Maintenance</span>
            </div>

            <h4 className="footer-heading footer-subheading-spacing">{t('footer.regionalSupport', {}, 'Regional Support')}</h4>
            <div className="footer-lang-tags">
              <span className="lang-tag">English</span>
              <span className="lang-tag">हिन्दी (Hindi)</span>
              <span className="lang-tag">অসমীয়া (Assamese)</span>
            </div>
            <a 
              href={siteConfig.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-directions-btn"
            >
              {t('location.getDirections', {}, 'Find Our Location')}
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <p>
            <strong>{t('footer.disclaimerHeading', {}, 'Business Information & Disclaimer:')}</strong> {t('footer.disclaimerText', {}, `Maa Kamakhya Auto Gas is located at ${siteConfig.address}. Any fuel cost comparisons shown on this website are rough estimates based on the distance, fuel prices, and mileage figures you enter. Actual mileage depends on vehicle condition, driving habits, traffic, and road conditions.`)}
          </p>
        </div>

        {/* Bottom Bar with Required Legal Links */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} {siteConfig.name}. {t('footer.rightsReserved', {}, 'All rights reserved.')}
          </p>
          <div className="footer-legal-links">
            <a 
              href="#privacy-policy" 
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateLegal) onNavigateLegal('privacy');
                else window.location.hash = '#privacy-policy';
              }}
            >
              {t('footer.privacyPolicy', {}, 'Privacy Policy')}
            </a>
            <span className="footer-link-divider">•</span>
            <a 
              href="#terms-conditions" 
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateLegal) onNavigateLegal('terms');
                else window.location.hash = '#terms-conditions';
              }}
            >
              {t('footer.termsConditions', {}, 'Terms & Conditions')}
            </a>
          </div>
          <p className="footer-credits">
            {siteConfig.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
