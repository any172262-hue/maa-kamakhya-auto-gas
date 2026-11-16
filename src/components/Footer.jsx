import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Building2 } from 'lucide-react';
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
      case '#benefits':
        return t('nav.benefits', {}, link.name);
      case '#services':
        return t('nav.services', {}, link.name);
      case '#calculator':
        return t('nav.calculator', {}, link.name);
      case '#compatibility':
        return t('nav.compatibility', {}, link.name);
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
              {t('footer.aboutDesc', {}, 'Guwahati\'s trusted destination for government-approved sequential CNG retrofitment, certified cylinder hydro-testing, and expert automotive engineering.')}
            </p>
            <div className="footer-certification-badge">
              <ShieldCheck size={18} className="text-yellow" />
              <span>Govt. Approved & PESO Compliant Workshop</span>
            </div>
            <div className="footer-legal-badge">
              <Building2 size={15} className="text-blue" />
              <span>Govt. Registered: <strong>{siteConfig.statutory.legalName}</strong></span>
            </div>
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
                  href="#statutory-details" 
                  className="footer-nav-link text-yellow"
                  onClick={(e) => handleLinkClick(e, '#statutory-details')}
                >
                  {t('statutory.title', {}, 'Statutory Details')} & GST
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('nav.contact', {}, 'Contact')} & {t('location.workshopAddress', {}, 'Location')}</h4>
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
              <li className="footer-contact-item">
                <Clock size={18} className="text-muted footer-icon" />
                <span>{t('common.hours', {}, siteConfig.hours)}</span>
              </li>
            </ul>
          </div>

          {/* Payment & Regional Support */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.acceptedPayments', {}, 'Accepted Payments')}</h4>
            <p className="footer-muted-text">
              {t('footer.paymentDesc', {}, 'We accept all major secure payment channels including zero-cost EMI financing:')}
            </p>
            <div className="footer-payment-badges">
              <span className="payment-mini-tag">UPI</span>
              <span className="payment-mini-tag">Visa</span>
              <span className="payment-mini-tag">MasterCard</span>
              <span className="payment-mini-tag">RuPay</span>
              <span className="payment-mini-tag">Net Banking</span>
              <span className="payment-mini-tag">EMI</span>
              <span className="payment-mini-tag">Cash</span>
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
              {t('location.getDirections', {}, 'Get Directions via Google Maps')}
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <p>
            <strong>Statutory Compliance & Disclaimer:</strong> {t('footer.disclaimerText', {}, `Operated by ${siteConfig.statutory.legalName} (Established ${siteConfig.statutory.yearOfEstablishment}, GSTIN: ${siteConfig.statutory.gstin}). Fuel cost comparisons and savings figures displayed on this website are illustrative estimates based on user-entered mileage, local fuel retail tariffs, and standard test cycles. Actual vehicle fuel economy varies with traffic conditions, driving style, AC usage, and payload. All retrofitment components are sourced from government-homologated manufacturers.`)}
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
            GSTIN: {siteConfig.statutory.gstin} • Established {siteConfig.statutory.yearOfEstablishment}
          </p>
        </div>
      </div>
    </footer>
  );
}
