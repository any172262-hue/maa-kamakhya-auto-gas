import React, { useState } from 'react';
import { servicesData, verifiedServiceTags } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import RevealAnimation from '../components/RevealAnimation';
import { 
  CheckCircle2, 
  MessageCircle,
  Gauge,
  Flame,
  Fuel,
  Wrench,
  Car,
  Cog,
  ArrowRight
} from 'lucide-react';

const coreSeoServices = [
  {
    id: "cng-services",
    slug: "cng-services",
    title: "CNG Services",
    icon: Gauge,
    desc: "Explore our CNG-related automotive services. Contact Maa Kamakhya Auto Gas to discuss your vehicle's CNG service requirements.",
    linkText: "Explore our CNG services"
  },
  {
    id: "lpg-services",
    slug: "lpg-services",
    title: "LPG Services",
    icon: Flame,
    desc: "Find LPG-related automotive services for your vehicle. Get in touch with our team to enquire about the available services.",
    linkText: "Learn about LPG services"
  },
  {
    id: "auto-gas-filling",
    slug: "auto-gas-filling",
    title: "Auto Gas Filling Station",
    icon: Fuel,
    desc: "Looking for auto gas filling services? Contact Maa Kamakhya Auto Gas for information about filling availability and operating hours.",
    linkText: "View filling station details"
  },
  {
    id: "gas-kit-installation",
    slug: "gas-kit-installation",
    title: "Gas Kit Installation",
    icon: Wrench,
    desc: "Enquire about gas kit installation for your vehicle. Contact us to discuss vehicle compatibility and installation requirements.",
    linkText: "Enquire about gas kit installation"
  },
  {
    id: "vehicle-gas-conversion",
    slug: "vehicle-gas-conversion",
    title: "Vehicle Gas Conversion",
    icon: Car,
    desc: "Interested in converting your vehicle to use gas? Contact Maa Kamakhya Auto Gas to enquire about available CNG and LPG conversion options and vehicle suitability.",
    linkText: "View vehicle gas conversion"
  },
  {
    id: "gas-kit-repair-maintenance",
    slug: "gas-kit-repair-maintenance",
    title: "Gas Kit Repair and Maintenance",
    icon: Cog,
    desc: "Enquire about gas kit repair and maintenance for your vehicle. Contact us to discuss the issue and available service options.",
    linkText: "Explore repair and maintenance"
  }
];

const categories = [
  "All Services",
  "Installation Services",
  "Dealers & Distribution",
  "Cylinders & Hardware",
  "Repair & Maintenance",
  "Spare Parts & Tooling",
  "Automobile Trade"
];

export default function Services({ onSelectService, onNavigate }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All Services");
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredServices = activeCategory === "All Services"
    ? servicesData
    : servicesData.filter(item => item.category === activeCategory);

  const handleTagClick = (tag) => {
    setSelectedTag(tag.name);
    if (onSelectService) {
      onSelectService(`Enquiry for: ${tag.name}`);
    }
  };

  const handleNavigateService = (slug) => {
    if (onNavigate) {
      onNavigate(`service-${slug}`);
    } else {
      window.location.hash = `#/services/${slug}`;
    }
  };

  return (
    <section id="services" className="section section-navy">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('services.tagline', {}, 'Our Services')}
            title={t('services.title', {}, 'CNG, LPG and Auto Gas Services at')}
            highlight={t('services.titleHighlight', {}, 'Maa Kamakhya Auto Gas')}
            description={t('services.description', {}, 'Explore our CNG and LPG services in Guwahati, including kit installation, vehicle gas conversion, repair and maintenance, and CNG filling.')}
          />
        </RevealAnimation>

        {/* Core 6 Dedicated SEO Services Grid */}
        <div className="core-seo-services-grid">
          {coreSeoServices.map((srv, idx) => (
            <RevealAnimation key={srv.id} delay={idx + 1}>
              <article className="card-navy card-hover-effect core-service-item">
                  <h3 className="core-service-title">{srv.title}</h3>
                  <p className="core-service-desc">{srv.desc}</p>
                  <button
                    type="button"
                    className="core-service-cta-btn"
                    onClick={() => handleNavigateService(srv.slug)}
                    aria-label={srv.linkText}
                  >
                    <span>{srv.linkText}</span>
                    <ArrowRight size={15} />
                  </button>
                </article>
              </RevealAnimation>
            ))}
        </div>

        {/* Generous Spacing Separation */}
        <div className="services-section-spacer" aria-hidden="true" />

        {/* 24 Service & Parts Directory */}
        <RevealAnimation delay={1}>
          <div className="verified-directory-card">
            <div className="verified-directory-header">
              <div className="verified-title-group">
                <h3 className="verified-heading">Services &amp; Parts Directory</h3>
                <p className="verified-subtext">
                  Select any category below to add it to your WhatsApp enquiry form.
                </p>
              </div>
            </div>

            <div className="service-pills-grid" role="list" aria-label="Service and parts directory">
              {verifiedServiceTags.map((tag) => {
                const isSelected = selectedTag === tag.name;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`service-pill-item ${isSelected ? 'pill-selected' : ''}`}
                    onClick={() => handleTagClick(tag)}
                    title={`Select ${tag.name} for enquiry`}
                  >
                    <CheckCircle2 size={15} className="pill-check-icon" />
                    <span className="pill-text">{tag.name}</span>
                    <span className="pill-cat-sub">{tag.category}</span>
                  </button>
                );
              })}
            </div>

            {selectedTag && (
              <div className="pill-selection-banner animate-fade-in">
                <div className="banner-content">
                  <MessageCircle size={18} className="text-yellow" />
                  <span>Selected: <strong>{selectedTag}</strong></span>
                </div>
                <a
                  href="#contact"
                  className="btn btn-accent btn-sm"
                  onClick={() => onSelectService && onSelectService(`Enquiry for: ${selectedTag}`)}
                >
                  Go to Enquiry Form
                </a>
              </div>
            )}
          </div>
        </RevealAnimation>

        {/* Category Filter Tabs */}
        <div className="services-filter-tabs" role="tablist" aria-label="Filter services by category">
          <div className="filter-label-group">
            <span className="filter-title">Filter by Category:</span>
          </div>
          <div className="filter-buttons-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "All Services" ? t('services.filterAll', {}, 'All Services') : cat}
                {cat === "All Services" && ` (${servicesData.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Service Cards Grid */}
        <div className="services-grid">
          {filteredServices.map((service, idx) => (
            <RevealAnimation key={service.id} delay={(idx % 3) + 1}>
              <ServiceCard service={service} onSelect={onSelectService} />
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
