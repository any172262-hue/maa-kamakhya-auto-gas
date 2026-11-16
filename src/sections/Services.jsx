import React, { useState } from 'react';
import { servicesData, verifiedServiceTags } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import RevealAnimation from '../components/RevealAnimation';
import { Sparkles, Filter, CheckCircle2, MessageCircle } from 'lucide-react';

const categories = [
  "All Services",
  "Installation Services",
  "Dealers & Distribution",
  "Cylinders & Hardware",
  "Repair & Maintenance",
  "Spare Parts & Tooling",
  "Automobile Trade"
];

export default function Services({ onSelectService }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All Services");
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredServices = activeCategory === "All Services"
    ? servicesData
    : servicesData.filter(item => item.category === activeCategory);

  const handleTagClick = (tag) => {
    setSelectedTag(tag.name);
    if (onSelectService) {
      onSelectService(`Inquiry for: ${tag.name}`);
    }
  };

  return (
    <section id="services" className="section section-navy">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('services.tagline', {}, 'OFFICIAL BUSINESS SERVICES & CAPABILITIES')}
            title={t('services.title', {}, 'Complete CNG Engineering &')}
            highlight={t('services.titleHighlight', {}, 'Automotive Solutions.')}
            description={t('services.description', {}, 'Maa Kamakhya Auto Gas delivers certified sequential auto-gas conversions, authorized kit dealerships, high-pressure cylinder distribution, genuine spare parts, and comprehensive automotive mechanical care in Guwahati.')}
          />
        </RevealAnimation>

        {/* 24 Verified Service Directory Badge Cloud */}
        <RevealAnimation delay={1}>
          <div className="verified-directory-card">
            <div className="verified-directory-header">
              <div className="verified-title-group">
                <span className="badge-tag badge-tag-gold">
                  <Sparkles size={14} className="text-yellow mr-1" />
                  <span>24 Verified Trade Categories & Authorizations</span>
                </span>
                <h3 className="verified-heading">Official Business Service Directory</h3>
                <p className="verified-subtext">
                  Direct government & trade business listing categories for Maa Kamakhya Auto Gas. Click any service tag to get an instant WhatsApp quote.
                </p>
              </div>
            </div>

            <div className="service-pills-grid" role="list" aria-label="Verified service directory tags">
              {verifiedServiceTags.map((tag) => {
                const isSelected = selectedTag === tag.name;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`service-pill-item ${isSelected ? 'pill-selected' : ''}`}
                    onClick={() => handleTagClick(tag)}
                    title={`Click to request quote for ${tag.name}`}
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
                  onClick={() => onSelectService && onSelectService(`Quotation for: ${selectedTag}`)}
                >
                  Proceed to Quote Form
                </a>
              </div>
            )}
          </div>
        </RevealAnimation>

        {/* Category Filter Tabs */}
        <div className="services-filter-tabs" role="tablist" aria-label="Filter services by category">
          <div className="filter-label-group">
            <Filter size={16} className="text-yellow" />
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
