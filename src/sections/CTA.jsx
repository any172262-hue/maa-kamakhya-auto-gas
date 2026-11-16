import React from 'react';
import { Phone, MessageCircle, ArrowRight, Zap } from 'lucide-react';
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
              <div className="cta-badge">
                <Zap size={16} className="text-yellow" />
                <span>{t('cta.tagline', {}, 'LIMITED SLOTS AVAILABLE THIS WEEK')}</span>
              </div>
              <h2 className="cta-title">
                {t('cta.title', {}, 'Ready to cut your daily fuel bills by half?')}
              </h2>
              <p className="cta-desc">
                {t('cta.description', {}, 'Book your pre-fitment engine diagnostic and get a transparent price quote with government-approved warranty and RTO endorsement support in Guwahati.')}
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
                  {t('hero.ctaQuote', {}, 'Request Your Free Quote')}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href={siteConfig.phoneTel}
                  icon={Phone}
                >
                  {t('common.call', {}, 'Call')} {siteConfig.phone}
                </Button>

                <Button
                  variant="whatsapp"
                  size="lg"
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                >
                  {t('cta.ctaWhatsApp', {}, 'Chat on WhatsApp')}
                </Button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
