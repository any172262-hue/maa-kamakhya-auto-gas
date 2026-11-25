import React from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';
import WorkshopLocationMap from '../sections/WorkshopLocationMap';
import Contact from '../sections/Contact';

export default function ContactPage({ onNavigate }) {
  const { t } = useLanguage();

  usePageMeta({
    title: "Contact Us | Maa Kamakhya Auto Gas - NH 37 Guwahati",
    description: "Contact Maa Kamakhya Auto Gas on NH 37, Pachim Boragaon, Garchuk, Guwahati for CNG and LPG services, gas kit installation, vehicle conversion, and maintenance.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/contact/"
  });

  return (
    <div className="contact-page">
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
            <span className="breadcrumb-current" aria-current="page">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="service-hero-header section-dark">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-badge">
              <MapPin size={16} className="text-yellow" />
              <span>NH 37, Garchuk, Guwahati</span>
            </div>

            <h1 className="service-hero-title">
              Contact Maa Kamakhya Auto Gas
            </h1>

            <p className="service-hero-lead">
              Have a question or need help choosing a service? Reach out to our team for CNG and LPG kit installations, vehicle conversions, servicing, or CNG filling in Guwahati.
            </p>

            <div className="service-hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={MessageCircle}
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
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

              {siteConfig.email && (
                <Button
                  variant="secondary"
                  size="lg"
                  href={`mailto:${siteConfig.email}`}
                  icon={Mail}
                >
                  Email Us
                </Button>
              )}

              <Button
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                onClick={() => onNavigate && onNavigate('home')}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Interactive Location & Route Directions */}
      <WorkshopLocationMap />

      {/* 4. Full Verified Inquiry Form */}
      <Contact onNavigate={onNavigate} />
    </div>
  );
}
