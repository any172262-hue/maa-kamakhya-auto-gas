import React, { useState, useEffect } from 'react';
import { Home, Wrench, Calculator, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export default function MobileBottomNav({ onNavigateLegal }) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'services', 'calculator', 'compatibility', 'process', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigateLegal) onNavigateLegal('home');
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  return (
    <nav className="mobile-bottom-appbar" aria-label="Mobile Application Bar">
      <div className="mobile-bottom-grid">
        {/* Home Tab */}
        <button
          type="button"
          className={`mobile-tab-item ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'hero')}
          aria-label={t('nav.home', {}, 'Go to Home section')}
        >
          <Home size={19} className="tab-icon" />
          <span className="tab-label">{t('nav.home', {}, 'Home')}</span>
          {activeSection === 'hero' && <span className="tab-active-dot" />}
        </button>

        {/* Services Tab */}
        <button
          type="button"
          className={`mobile-tab-item ${activeSection === 'services' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'services')}
          aria-label={t('nav.services', {}, 'View CNG Services')}
        >
          <Wrench size={19} className="tab-icon" />
          <span className="tab-label">{t('nav.services', {}, 'Services')}</span>
          {activeSection === 'services' && <span className="tab-active-dot" />}
        </button>

        {/* Savings Calculator Tab (Center Prominent) */}
        <button
          type="button"
          className={`mobile-tab-item mobile-tab-calc ${activeSection === 'calculator' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'calculator')}
          aria-label={t('nav.calculator', {}, 'Fuel Savings Calculator')}
        >
          <div className="tab-calc-bubble">
            <Calculator size={19} className="tab-icon-calc text-yellow" />
          </div>
          <span className="tab-label font-bold text-yellow">{t('nav.calculator', {}, 'Calculator')}</span>
        </button>

        {/* Quick Phone Call */}
        <a
          href={siteConfig.phoneTel}
          className="mobile-tab-item mobile-tab-call"
          aria-label={`Call workshop at ${siteConfig.phone}`}
        >
          <Phone size={19} className="tab-icon text-yellow" />
          <span className="tab-label">{t('common.call', {}, 'Call')}</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-tab-item mobile-tab-whatsapp"
          aria-label="Chat directly on WhatsApp"
        >
          <div className="tab-whatsapp-bubble">
            <MessageCircle size={19} className="tab-icon-whatsapp" />
          </div>
          <span className="tab-label text-green font-bold">{t('common.whatsapp', {}, 'WhatsApp')}</span>
        </a>
      </div>
    </nav>
  );
}
