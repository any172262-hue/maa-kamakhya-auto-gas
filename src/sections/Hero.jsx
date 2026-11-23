import React from 'react';
import { Phone, Navigation, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import RevealAnimation from '../components/RevealAnimation';
import Logo from '../components/Logo';

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section section-dark bg-radial-glow">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Headline & Action Controls */}
          <div className="hero-text-content">
            <RevealAnimation delay={1}>
              <h1 className="hero-title">
                {t('hero.h1', {}, 'CNG, LPG and Auto Gas Services at Maa Kamakhya Auto Gas')}
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={2}>
              <p className="hero-subtitle">
                {t('hero.description', {}, "Welcome to Maa Kamakhya Auto Gas. We provide CNG and LPG-related automotive services, including auto gas filling, gas kit installation, vehicle gas conversion, and gas kit repair and maintenance. Explore our services and contact us to enquire about your vehicle's requirements.")}
              </p>
            </RevealAnimation>

            {/* CTA Action Buttons */}
            <RevealAnimation delay={3}>
              <div className="hero-actions-group">
                <Button
                  variant="primary"
                  size="lg"
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const servicesSection = document.querySelector('#services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {t('hero.ctaExplore', {}, 'Explore Our Services')}
                </Button>

                <Button
                  variant="contact-workshop"
                  size="lg"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      const nameInput = document.querySelector('#fullName-input') || contactSection.querySelector('input[name="fullName"]');
                      if (nameInput) {
                        setTimeout(() => nameInput.focus({ preventScroll: true }), 400);
                      }
                    } else if (onNavigate) {
                      onNavigate('contact');
                    }
                  }}
                  ariaLabel="Contact Workshop - Open Enquiry Form"
                >
                  {t('hero.ctaContact', {}, 'Contact Workshop')}
                </Button>

                <Button
                  variant="call"
                  size="lg"
                  href={siteConfig.phoneTel}
                  icon={Phone}
                >
                  {t('common.call', {}, 'Call')}: {siteConfig.phoneFormatted}
                </Button>
              </div>
            </RevealAnimation>
          </div>

          {/* Right Column: Official Workshop Credential Card */}
          <div className="hero-media-wrapper">
            <RevealAnimation delay={2}>
              <div className="hero-brand-card card-navy">
                <div className="hero-brand-emblem-wrap">
                  <Logo height={110} className="hero-brand-emblem" priority={true} />
                </div>

                <div className="hero-brand-header">
                  <h3 className="hero-brand-title">MAA KAMAKHYA AUTO GAS</h3>
                  <p className="hero-brand-subtitle">{t('hero.officialCenter', {}, 'Auto Gas Workshop & Station • Guwahati, Assam')}</p>
                </div>

                <div className="hero-brand-highlights">
                  <div className="hero-highlight-item">
                    <div>
                      <span className="font-semibold text-white">{t('hero.addressShort', {}, 'NH 37, Pachim Boragaon')}</span>
                      <span className="text-xs text-muted block">Garchuk, Guwahati - 781035</span>
                    </div>
                  </div>

                  <div className="hero-highlight-item">
                    <div>
                      <span className="font-semibold text-white">CNG & LPG Solutions</span>
                      <span className="text-xs text-muted block">Installation, Conversion & Maintenance</span>
                    </div>
                  </div>

                  <div className="hero-highlight-item">
                    <div>
                      <span className="font-semibold text-white">{t('hero.hotline', {}, 'Customer Enquiries')}</span>
                      <span className="text-xs text-muted block">+91 69139 10337</span>
                    </div>
                  </div>
                </div>

                <div className="hero-brand-footer">
                  <a
                    href="#location"
                    onClick={(e) => {
                      e.preventDefault();
                      const locEl = document.querySelector('#location');
                      if (locEl) locEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hero-view-map-btn"
                  >
                    <Navigation size={14} className="text-yellow" />
                    <span>{t('hero.viewMap', {}, 'View NH 37 Interactive Map')}</span>
                  </a>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
