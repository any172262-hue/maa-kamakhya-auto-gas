import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import RevealAnimation from '../components/RevealAnimation';

export default function CTA() {
  const { t } = useLanguage();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-banner-section section-dark">
      <div className="container">
        <RevealAnimation>
          <div className="cta-banner-box">
            <div className="cta-content">
              <h2 className="cta-title">
                {t('cta.title', {}, 'Have questions about CNG or LPG for your vehicle?')}
              </h2>
              <p className="cta-desc">
                {t('cta.description', {}, 'Contact Maa Kamakhya Auto Gas on NH 37 in Garchuk, Guwahati to ask about kit suitability, CNG filling, or maintenance.')}
              </p>

              <div className="cta-buttons-row">
                <Button
                  variant="primary"
                  size="lg"
                  href="#contact"
                  onClick={handleScrollToContact}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {t('hero.ctaQuote', {}, 'Contact Us')}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href={siteConfig.phoneTel}
                  icon={Phone}
                >
                  {t('common.callWorkshop', {}, 'Call Us')}: {siteConfig.phoneFormatted}
                </Button>

                <Button
                  variant="whatsapp"
                  size="lg"
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                >
                  {t('cta.ctaWhatsApp', {}, 'WhatsApp Us')}
                </Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
