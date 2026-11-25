import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';
import RevealAnimation from '../components/RevealAnimation';

export default function AboutPage({ onNavigate }) {
  const { t } = useLanguage();

  usePageMeta({
    title: "About Us | Maa Kamakhya Auto Gas - Guwahati, Assam",
    description: "Learn about Maa Kamakhya Auto Gas on NH 37 in Garchuk, Guwahati, offering sequential CNG and LPG kit installations, maintenance, vehicle conversions, and CNG filling.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/about/"
  });

  const coreValues = [
    {
      title: "Sequential Gas Systems",
      desc: "We match and install sequential gas injection kits based on your vehicle model and engine setup."
    },
    {
      title: "Clear Guidance & Estimates",
      desc: "We walk you through practical requirements, expected work, and estimated costs before you decide."
    },
    {
      title: "Careful Installation & Testing",
      desc: "High-pressure steel fuel lines, sturdy cylinder mounts, and thorough leak checks on every vehicle."
    },
    {
      title: "Maintenance & Part Replacement",
      desc: "Routine servicing, filter changes, tuning, and replacement of worn gas kit components."
    }
  ];

  return (
    <div className="about-page">
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
            <span className="breadcrumb-current" aria-current="page">About Us</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="service-hero-header section-dark">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-badge">
              <Building2 size={16} className="text-yellow" />
              <span>Guwahati, Assam</span>
            </div>

            <h1 className="service-hero-title">
              About Maa Kamakhya Auto Gas
            </h1>

            <p className="service-hero-lead">
              We are a local automotive gas workshop on NH 37 in Garchuk, Guwahati, providing CNG and LPG services, kit installation, vehicle gas conversion, repair and maintenance, and CNG filling.
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
                Contact on WhatsApp
              </Button>

              <Button
                variant="call"
                size="lg"
                href={siteConfig.phoneTel}
                icon={Phone}
              >
                Call Us: {siteConfig.phoneFormatted}
              </Button>

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

      {/* 3. Story & Business Overview */}
      <section className="section section-navy">
        <div className="container">
          <div className="about-overview-grid">
            <RevealAnimation delay={1}>
              <div className="card-navy card-hover-effect p-8">
                <span className="badge-tag badge-tag-gold mb-4 inline-block">Who We Are</span>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Automotive Gas Services in Guwahati
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  <strong>Maa Kamakhya Auto Gas</strong> serves private car owners and commercial drivers across Guwahati and nearby areas. Located on NH 37 at Pachim Boragaon in Garchuk, our workshop is easy to reach from ISBT, Jalukbari, and Lokhra.
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Whether you are looking to install a new sequential CNG or LPG kit, service an existing gas system, or fill CNG for your vehicle, our team is available to help.
                </p>
                <div className="about-stats-row">
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-blue">CNG & LPG</span>
                    <span className="stat-lbl text-xs text-muted block">Kit Services</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-yellow">CNG Only</span>
                    <span className="stat-lbl text-xs text-muted block">Filling Station</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-blue">6</span>
                    <span className="stat-lbl text-xs text-muted block">Core Services</span>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={2}>
              <div className="card-navy p-8">
                <span className="badge-tag badge-tag-blue mb-4 inline-block">Business Information</span>
                <h3 className="text-xl font-bold text-navy mb-4">Location & Service Summary</h3>
                <div className="about-compliance-list">
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Business Name</span>
                    <span className="font-semibold text-navy text-sm block">Maa Kamakhya Auto Gas</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Address</span>
                    <span className="font-semibold text-navy text-sm block">NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">District & State</span>
                    <span className="font-semibold text-navy text-sm block">Kamrup Metropolitan, Assam</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Filling Station Fuel</span>
                    <span className="font-semibold text-navy text-sm block">CNG only</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Operating Hours</span>
                    <span className="font-semibold text-navy text-sm block">Please call or message us on WhatsApp to confirm current timings</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Phone & WhatsApp</span>
                    <span className="font-semibold text-navy text-sm block">{siteConfig.phoneFormatted} (Confirm directly before visiting)</span>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center mb-10">
            <span className="badge-tag badge-tag-gold">How We Work</span>
            <h2 className="section-title text-navy mt-2">What You Can Expect From Us</h2>
            <p className="text-muted text-sm max-w-xl mx-auto">
              Every installation and service check follows clear mechanical, wiring, and leak-testing steps.
            </p>
          </div>

          <div className="about-values-grid">
            {coreValues.map((val, idx) => (
              <RevealAnimation key={val.title} delay={idx + 1}>
                <div className="card-navy card-hover-effect p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-blue flex-shrink-0" />
                    <h3 className="font-bold text-navy text-base">{val.title}</h3>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{val.desc}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
