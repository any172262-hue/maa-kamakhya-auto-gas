import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';
import RevealAnimation from '../components/RevealAnimation';
import { getServicePageData } from '../data/servicePagesData';

export default function ServiceDetailPage({ serviceSlug, onNavigate, onSelectService }) {
  const { language, currentLanguage, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const activeLang = language || currentLanguage || 'en';
  const serviceData = getServicePageData(serviceSlug);
  const langKey = (activeLang === 'as' || activeLang === 'hi') ? activeLang : 'en';
  const content = serviceData ? serviceData[langKey] : null;

  usePageMeta({
    title: content ? content.title : 'Services | Maa Kamakhya Auto Gas',
    description: content ? content.metaDescription : 'Automotive CNG and LPG services at Maa Kamakhya Auto Gas, NH 37 Guwahati.',
    canonical: `https://any172262-hue.github.io/maa-kamakhya-auto-gas/services/${serviceSlug}/`
  });

  if (!serviceData || !content) {
    return (
      <div className="section section-dark text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <p className="text-muted mb-6">The requested service page does not exist or has been moved.</p>
        <Button variant="primary" onClick={() => onNavigate && onNavigate('home')}>
          Return to Homepage
        </Button>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleEnquiry = () => {
    const defaultMsg = `Hello Maa Kamakhya Auto Gas, I am inquiring about: ${content.h1}. Please provide service details, vehicle compatibility, and pricing.`;
    const encoded = encodeURIComponent(defaultMsg);
    window.open(`https://wa.me/91${siteConfig.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="service-detail-page">
      {/* 1. Breadcrumbs Row */}
      <div className="service-breadcrumb-bar">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb-nav">
            <button 
              type="button" 
              className="breadcrumb-link" 
              onClick={() => onNavigate && onNavigate('home')}
            >
              {t('nav.home', {}, 'Home')}
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <a 
              href="#services" 
              className="breadcrumb-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
                setTimeout(() => {
                  const el = document.querySelector('#services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              {t('nav.services', {}, 'Services')}
            </a>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current" aria-current="page">{content.h1}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="service-hero-header section-dark">
        <div className="container">
          <div className="service-hero-content">
            <h1 className="service-hero-title">{content.h1}</h1>

            <p className="service-hero-lead">
              {content.summary}
            </p>

            <div className="service-hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={MessageCircle}
                onClick={handleEnquiry}
              >
                {t('common.whatsappChat', {}, 'Contact on WhatsApp')}
              </Button>

              <Button
                variant="call"
                size="lg"
                href={siteConfig.phoneTel}
                icon={Phone}
              >
                {t('common.callWorkshop', {}, 'Call Us')}: {siteConfig.phoneFormatted}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                onClick={() => onNavigate && onNavigate('home')}
              >
                {t('legal.backToHome', {}, 'Go Back')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Detailed Structured Sections */}
      <section className="section section-navy service-sections-wrapper">
        <div className="container">
          <div className="service-sections-header">
            <h2 className="section-title text-navy mt-2">
              What This Service Includes
            </h2>
          </div>

          <div className="service-details-grid">
            {content.sections.map((sec, idx) => (
              <RevealAnimation key={sec.title} delay={idx + 1}>
                <article className="card-navy card-hover-effect service-section-card">
                  <div className="service-section-header">
                    <span className="service-section-num">0{idx + 1}</span>
                    <h3 className="service-section-title">{sec.title}</h3>
                  </div>
                  <p className="service-section-desc">{sec.desc}</p>
                </article>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="section section-dark service-faq-section">
          <div className="container container-narrow">
            <div className="text-center mb-8">
              <h2 className="section-title text-navy">
                Questions About {content.h1}
              </h2>
            </div>

            <div className="faq-accordion-list" role="region" aria-label="Service FAQs">
              {content.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div key={fIdx} className={`faq-item-card ${isOpen ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(fIdx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${fIdx}`}
                    >
                      <span className="faq-q-text">{faq.question}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div id={`faq-answer-${fIdx}`} className="faq-answer-panel animate-fade-in">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Internal Cross-Linking Section */}
      {content.internalLinks && content.internalLinks.length > 0 && (
        <section className="section section-navy service-internal-links-section">
          <div className="container">
            <div className="internal-links-header text-center mb-6">
              <span className="badge-tag badge-tag-blue">More Services</span>
              <h3 className="section-title text-navy mt-2">Explore Services</h3>
              <p className="text-muted text-sm max-w-xl mx-auto">
                See our other CNG, LPG, and vehicle gas services at Maa Kamakhya Auto Gas.
              </p>
            </div>

            <div className="internal-links-grid">
              {content.internalLinks.map((link) => {
                const targetSlug = link.path.replace(/^\/services\/|\/$/g, '');
                return (
                  <div key={link.path} className="card-navy card-hover-effect internal-link-card">
                    <h4 className="internal-link-title">{link.name}</h4>
                    <p className="internal-link-desc text-xs text-muted mb-4">
                      Available at Maa Kamakhya Auto Gas in Guwahati, Assam.
                    </p>
                    <button
                      type="button"
                      className="internal-link-action-btn"
                      onClick={() => onNavigate && onNavigate(`service-${targetSlug}`)}
                    >
                      <span>{link.text}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Contact & Location Quick Card */}
      <section className="section section-dark service-contact-banner">
        <div className="container">
          <div className="service-contact-card card-navy">
            <div className="service-contact-grid">
              <div className="service-contact-info">
                <div className="service-contact-badge">
                  <span>Visit Our Workshop</span>
                </div>
                <h3 className="service-contact-heading">Have Questions About {content.h1}?</h3>
                <p className="service-contact-text text-muted text-sm">
                  Visit Maa Kamakhya Auto Gas on NH 37, Pachim Boragaon, Garchuk, Guwahati, or reach out by phone or WhatsApp to discuss your vehicle.
                </p>
                <div className="service-contact-meta">
                  <div className="meta-item">
                    <MapPin size={15} className="text-yellow flex-shrink-0" />
                    <span>{siteConfig.address}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={15} className="text-yellow flex-shrink-0" />
                    <span>{t('common.hours', {}, 'Operating hours: Please call or message us on WhatsApp to confirm timings.')}</span>
                  </div>
                </div>
              </div>

              <div className="service-contact-actions">
                <Button
                  variant="primary"
                  size="lg"
                  icon={MessageCircle}
                  onClick={handleEnquiry}
                >
                  WhatsApp: +91 {siteConfig.whatsappNumber}
                </Button>

                <Button
                  variant="call"
                  size="lg"
                  href={siteConfig.phoneTel}
                  icon={Phone}
                >
                  Call Us: {siteConfig.phoneFormatted}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
