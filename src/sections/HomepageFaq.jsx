import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function HomepageFaq() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: t('faq.q1', {}, 'What services does Maa Kamakhya Auto Gas provide?'),
      a: t('faq.a1', {}, 'Maa Kamakhya Auto Gas provides CNG services, LPG services, auto gas filling, gas kit installation, vehicle gas conversion, and gas kit repair and maintenance.')
    },
    {
      q: t('faq.q2', {}, 'Does Maa Kamakhya Auto Gas provide gas kit installation?'),
      a: t('faq.a2', {}, 'Yes. Gas kit installation is one of the services offered. Contact us to discuss your vehicle and installation requirements.')
    },
    {
      q: t('faq.q3', {}, 'Can I enquire about vehicle gas conversion?'),
      a: t('faq.a3', {}, 'Yes. You can contact Maa Kamakhya Auto Gas to enquire about vehicle gas conversion and whether your vehicle is suitable.')
    },
    {
      q: t('faq.q4', {}, 'Does Maa Kamakhya Auto Gas provide gas kit repair and maintenance?'),
      a: t('faq.a4', {}, 'Yes. We provide gas kit repair, servicing, and maintenance. Contact us with your vehicle details and the issue you are facing.')
    },
    {
      q: t('faq.q5', {}, 'How can I contact Maa Kamakhya Auto Gas?'),
      a: t('faq.a5', {}, 'Use the phone number, WhatsApp link, or Contact Us form on this website to ask about services and availability.')
    }
  ];

  return (
    <section id="faq" className="section section-dark homepage-faq-section">
      <div className="container container-narrow">
        <RevealAnimation>
          <SectionHeading
            tagline={t('faq.tagline', {}, 'Common Questions')}
            title={t('faq.title', {}, 'Frequently Asked Questions About')}
            highlight={t('faq.highlight', {}, 'Our Auto Gas Services')}
            description={t('faq.description', {}, 'Clear answers to common questions about CNG, LPG, vehicle conversion, and servicing in Guwahati.')}
          />
        </RevealAnimation>

        <div className="faq-accordion-container" role="region" aria-label="Frequently Asked Questions">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <RevealAnimation key={idx} delay={idx + 1}>
                <div className={`faq-card-item card-navy ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-header-btn"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-body-${idx}`}
                  >
                    <span className="faq-header-text font-semibold text-navy">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`faq-icon-arrow transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue' : 'text-muted'}`}
                    />
                  </button>
                  {isOpen && (
                    <div id={`faq-body-${idx}`} className="faq-content-panel animate-fade-in">
                      <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
