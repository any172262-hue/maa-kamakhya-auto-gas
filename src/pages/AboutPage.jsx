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
    description: "Learn about Maa Kamakhya Auto Gas, Guwahati's leading government-approved CNG and LPG retrofitment center on NH 37, Pachim Boragaon, Garchuk. Established in 2022.",
    canonical: "https://maakamakhyaautogas.com/about/"
  });

  const coreValues = [
    {
      title: "Government Homologated Safety",
      desc: "Every CNG and LPG retrofitment is performed using government-approved sequential injection systems compliant with Indian automotive safety norms."
    },
    {
      title: "Transparent Customer Care",
      desc: "Itemized upfront estimates, zero hidden costs, realistic fuel savings calculations, and flexible payment modes including no-cost EMI financing."
    },
    {
      title: "Certified Engineering Standards",
      desc: "Our workshop follows standardized calibration protocols, high-pressure leak audits, and manufacturer-recommended torque specifications."
    },
    {
      title: "Authentic Parts & Hardware",
      desc: "Authorized wholesale and retail distribution of genuine OEM autogas spares, reducers, injector rails, and PESO-certified cylinders."
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
              <span>ESTABLISHED 2022 • GUWAHATI, ASSAM</span>
            </div>

            <h1 className="service-hero-title">
              About Maa Kamakhya Auto Gas
            </h1>

            <p className="service-hero-lead">
              Guwahati's trusted destination for government-approved sequential CNG retrofitment, autogas conversion, certified cylinder hydro-testing assistance, and expert automotive diagnostics on NH 37.
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
                <span className="badge-tag badge-tag-gold mb-4 inline-block">OUR HERITAGE & MISSION</span>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Engineering Clean, Smarter & Cost-Effective Mobility
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Established in 2022, <strong>Maa Kamakhya Auto Gas</strong> was founded to meet the growing demand for safe, reliable, and compliant auto-gas solutions across Guwahati and Assam. Located strategically along the NH 37 highway frontage at Pachim Boragaon, Garchuk, our workshop provides direct drive-in bays for passenger cars, commercial cabs, and regional delivery fleets.
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  We specialize in converting conventional petrol vehicles to dual-fuel CNG and LPG systems, reducing vehicle fuel bills by up to 50% to 55% while maintaining peak engine performance and highway pickup.
                </p>
                <div className="about-stats-row">
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-blue">2022</span>
                    <span className="stat-lbl text-xs text-muted block">Year Established</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-yellow">100%</span>
                    <span className="stat-lbl text-xs text-muted block">Govt Homologated</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val font-black text-2xl text-blue">24</span>
                    <span className="stat-lbl text-xs text-muted block">Trade Authorizations</span>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={2}>
              <div className="card-navy p-8">
                <span className="badge-tag badge-tag-blue mb-4 inline-block">STATUTORY & LEGAL COMPLIANCE</span>
                <h3 className="text-xl font-bold text-navy mb-4">Official Business Verification</h3>
                <div className="about-compliance-list">
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Legal Business Name:</span>
                    <span className="font-semibold text-navy text-sm block">Maa Kamakhya Auto Gas</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">GSTIN:</span>
                    <span className="font-semibold text-navy text-sm block">18**********1ZS</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Annual Turnover:</span>
                    <span className="font-semibold text-navy text-sm block">51 Lakh to 1 Crore</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Team Size:</span>
                    <span className="font-semibold text-navy text-sm block">Less than 10 Dedicated Technicians</span>
                  </div>
                  <div className="compliance-row">
                    <span className="text-muted text-xs">Registered Facility Address:</span>
                    <span className="font-semibold text-navy text-sm block">Shop No. 7, Opposite Nezon Steel, NH 37, Garchuk, Guwahati - 781035</span>
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
