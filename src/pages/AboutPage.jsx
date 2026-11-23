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
    title: "About Us | Maa Kamakhya Auto Gas: Guwahati, Assam",
    description: "Learn about Maa Kamakhya Auto Gas, a trusted local workshop on NH 37 in Garchuk, Guwahati providing CNG retrofitment, maintenance, and cylinder hydro-testing.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/about/"
  });

  const coreValues = [
    {
      title: "Sequential Gas Equipment",
      desc: "We install sequential gas injection systems matched to your vehicle model and engine configuration."
    },
    {
      title: "Transparent Advice & Estimates",
      desc: "Clear upfront quotes, practical fuel estimates based on your vehicle, and straightforward guidance."
    },
    {
      title: "Safe Installation Practices",
      desc: "High-pressure steel fuel lines routed securely, solid chassis-mounted cylinder cradles, and electronic leak tests."
    },
    {
      title: "Genuine Parts & Maintenance",
      desc: "Authentic replacement reducers, high-speed injector rails, vapor filters, and routine system inspections."
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
              <span>AUTO GAS WORKSHOP • GUWAHATI, ASSAM</span>
            </div>

            <h1 className="service-hero-title">
              About Maa Kamakhya Auto Gas
            </h1>

            <p className="service-hero-lead">
              A local automotive gas service workshop on NH 37 in Garchuk, Guwahati providing CNG and LPG services, auto gas filling (CNG only), gas kit installation, vehicle conversion, and maintenance support.
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
                Chat on WhatsApp
              </Button>

              <Button
                variant="call"
                size="lg"
                href={siteConfig.phoneTel}
                icon={Phone}
              >
                Call: {siteConfig.phone}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                onClick={() => onNavigate && onNavigate('home')}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Story & Credential Overview */}
      <section className="section section-navy">
        <div className="container">
          <div className="about-overview-grid">
            <RevealAnimation delay={1}>
              <div className="card-navy card-hover-effect p-8">
                <span className="badge-tag badge-tag-gold mb-4 inline-block">OUR WORKSHOP PROFILE</span>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Automotive Gas Services in Guwahati
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  <strong>Maa Kamakhya Auto Gas</strong> offers car owners and commercial drivers in Guwahati dedicated automotive gas services. Located on NH 37 at Pachim Boragaon in Garchuk, our facility is easily accessible from ISBT, Jalukbari, and Lokhra.
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  We provide CNG and LPG services, gas kit installation, vehicle gas conversion, repair and maintenance, and operate an auto gas filling station (CNG only) at our Guwahati location.
                </p>
                <div className="about-stats-row">
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-blue">CNG & LPG</span>
                    <span className="stat-lbl text-xs text-muted block">Fuel Solutions</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-yellow">CNG Only</span>
                    <span className="stat-lbl text-xs text-muted block">Station Fuel</span>
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
                <span className="badge-tag badge-tag-blue mb-4 inline-block">CONFIRMED BUSINESS INFORMATION</span>
                <h3 className="text-xl font-bold text-navy mb-4">Verified Business Profile</h3>
                <div className="about-compliance-list">
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Business Name:</span>
                    <span className="font-semibold text-navy text-sm block">Maa Kamakhya Auto Gas</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Public Address:</span>
                    <span className="font-semibold text-navy text-sm block">NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">District & State:</span>
                    <span className="font-semibold text-navy text-sm block">Kamrup Metropolitan, Assam</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Filling Station Fuel:</span>
                    <span className="font-semibold text-navy text-sm block">CNG only</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Operating Hours:</span>
                    <span className="font-semibold text-navy text-sm block">Not provided (contact workshop)</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Contact Notice:</span>
                    <span className="font-semibold text-navy text-sm block">Contact details pending owner verification</span>
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
            <span className="badge-tag badge-tag-gold">WHY CUSTOMERS TRUST US</span>
            <h2 className="section-title text-navy mt-2">Our Core Operating Standards</h2>
            <p className="text-muted text-sm max-w-xl mx-auto">
              Every vehicle retrofitment adheres strictly to standardized mechanical, electronic, and safety protocols.
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
