import React from 'react';
import { Phone, Navigation, ArrowRight, ShieldCheck, Fuel, MapPin, CheckCircle2 } from 'lucide-react';
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
              <div className="hero-badge-pill">
                <Fuel size={15} className="text-yellow" />
                <span>{t('hero.badge', {}, 'CNG & LPG SERVICES • MAA KAMAKHYA AUTO GAS')}</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={2}>
              <h1 className="hero-title">
                {t('hero.h1', {}, 'CNG, LPG and Auto Gas Services at Maa Kamakhya Auto Gas')}
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={3}>
              <p className="hero-subtitle">
                {t('hero.description', {}, "Welcome to Maa Kamakhya Auto Gas. We provide CNG and LPG-related automotive services, including auto gas filling, gas kit installation, vehicle gas conversion, and gas kit repair and maintenance. Explore our services and contact us to enquire about your vehicle's requirements.")}
              </p>
            </RevealAnimation>

            {/* CTA Action Buttons */}
            <RevealAnimation delay={4}>
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
                  variant="secondary"
                  size="lg"
                  href="#contact"
                  onClick={handleScrollToContact}
                  icon={Phone}
                >
                  {t('hero.ctaContact', {}, 'Contact Us')}
                </Button>

                <Button
                  variant="call"
                  size="lg"
                  href={siteConfig.phoneTel}
                  icon={Phone}
                >
                  {t('common.call', {}, 'Call')}: {siteConfig.phone}
                </Button>
              </div>
            </RevealAnimation>

            {/* Quick Feature Badges Row */}
            <RevealAnimation delay={4}>
              <div className="hero-badges-row">
                <div className="hero-feature-tag">
                  <span className="dot-indicator"></span>
                  <span>{t('hero.trustPill1', {}, 'CNG retrofitment')}</span>
                </div>
                <div className="hero-feature-tag">
                  <span className="dot-indicator"></span>
                  <span>{t('hero.trustPill2', {}, 'Private & commercial vehicles')}</span>
                </div>
                <div className="hero-feature-tag">
                  <span className="dot-indicator"></span>
                  <span>{t('hero.trustPill3', {}, 'English, Hindi & Assamese support')}</span>
                </div>
                <div className="hero-feature-tag">
                  <span className="dot-indicator"></span>
                  <span>{t('hero.trustPill4', {}, 'Vehicle compatibility check')}</span>
                </div>
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
                  <p className="hero-brand-subtitle">{t('hero.officialCenter', {}, 'Govt. Approved CNG Center • Guwahati, Assam')}</p>
                </div>

                <div className="hero-brand-highlights">
                  <div className="hero-highlight-item">
                    <MapPin size={16} className="text-yellow flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{t('hero.addressShort', {}, 'NH 37, Pachim Boragaon')}</span>
                      <span className="text-xs text-muted block">Opposite Nezon Steel, Garchuk</span>
                    </div>
                  </div>

                  <div className="hero-highlight-item">
                    <ShieldCheck size={16} className="text-yellow flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">Government Homologated</span>
                      <span className="text-xs text-muted block">Certified Sequential CNG Retrofitment</span>
                    </div>
                  </div>

                  <div className="hero-highlight-item">
                    <CheckCircle2 size={16} className="text-yellow flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{t('hero.hotline', {}, 'Official Hotline & WhatsApp')}</span>
                      <span className="text-xs text-muted block">+91 69139 10337 • +91 88220 49075</span>
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
