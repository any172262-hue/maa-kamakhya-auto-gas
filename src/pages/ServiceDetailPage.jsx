import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Gauge,
  Flame,
  Fuel,
  Wrench,
  Car,
  Cog
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';
import RevealAnimation from '../components/RevealAnimation';
import { getServicePageData } from '../data/servicePagesData';

const iconMap = {
  Gauge,
  Flame,
  Fuel,
  Wrench,
  Car,
  Cog
};

export default function ServiceDetailPage({ serviceSlug, onNavigate, onSelectService }) {
  const { currentLanguage, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const serviceData = getServicePageData(serviceSlug);
  const langKey = (currentLanguage === 'as' || currentLanguage === 'hi') ? currentLanguage : 'en';
  const content = serviceData ? serviceData[langKey] : null;

  usePageMeta({
    title: content ? content.title : 'Services | Maa Kamakhya Auto Gas',
    description: content ? content.metaDescription : 'Automotive CNG and LPG services at Maa Kamakhya Auto Gas, NH 37 Guwahati.',
    canonical: `https://maakamakhyaautogas.com/services/${serviceSlug}/`
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

  const IconComponent = iconMap[serviceData.icon] || Wrench;

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
            <div className="service-hero-badge">
              <IconComponent size={16} className="text-yellow" />
              <span>{content.heroBadge}</span>
            </div>

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
                {t('common.whatsappChat', {}, 'WhatsApp Enquiry')}
              </Button>

              <Button
                variant="call"
                size="lg"
                href={siteConfig.phoneTel}
                icon={Phone}
              >
                {t('common.call', {}, 'Call')}: {siteConfig.phone}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                onClick={() => onNavigate && onNavigate('home')}
              >
                {t('common.reset', {}, 'Back to Home')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Detailed Structured Sections */}
      <section className="section section-navy service-sections-wrapper">
        <div className="container">
          <div className="service-sections-header">
            <span className="badge-tag badge-tag-blue">
              <Sparkles size={14} className="text-yellow mr-1" />
              <span>{content.h1} - Detailed Overview</span>
            </span>
            <h2 className="section-title text-navy mt-2">
              Key Capabilities & Service Standards
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
              <div className="inline-flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-yellow" />
                <span className="badge-tag badge-tag-gold">FAQS & EXPERT GUIDANCE</span>
              </div>
              <h2 className="section-title text-navy">
                Frequently Asked Questions about {content.h1}
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
              <span className="badge-tag badge-tag-blue">RELATED AUTOMOTIVE SERVICES</span>
              <h3 className="section-title text-navy mt-2">Explore Related Services</h3>
              <p className="text-muted text-sm max-w-xl mx-auto">
                Discover our full range of certified CNG, LPG, and automotive care services at Maa Kamakhya Auto Gas.
              </p>
            </div>

            <div className="internal-links-grid">
              {content.internalLinks.map((link) => {
                const targetSlug = link.path.replace(/^\/services\/|\/$/g, '');
                return (
                  <div key={link.path} className="card-navy card-hover-effect internal-link-card">
                    <h4 className="internal-link-title">{link.name}</h4>
                    <p className="internal-link-desc text-xs text-muted mb-4">
                      Official verified services and certified solutions in Guwahati, Assam.
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
                  <ShieldCheck size={16} className="text-yellow" />
                  <span>VISIT OUR NH 37 WORKSHOP</span>
                </div>
                <h3 className="service-contact-heading">Ready to Enquire About {content.h1}?</h3>
                <p className="service-contact-text text-muted text-sm">
                  Visit our government-approved workshop on NH 37, Pachim Boragaon, Garchuk, Guwahati for a free pre-fitment inspection, live diagnostic scan, and quote.
                </p>
                <div className="service-contact-meta">
                  <div className="meta-item">
                    <MapPin size={15} className="text-yellow flex-shrink-0" />
                    <span>Opposite Nezon Steel, Garchuk, Guwahati - 781035</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={15} className="text-yellow flex-shrink-0" />
                    <span>Mon - Sat: 9:00 AM to 7:30 PM</span>
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
                  Call: +91 {siteConfig.phone}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
