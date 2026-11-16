import React from 'react';
import { 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Gauge, 
  ArrowRight,
  Package,
  Cog,
  Flame,
  Car,
  Sparkles,
  Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  "cng-sequential-installation": Gauge,
  "cng-cylinder-distribution": ShieldCheck,
  "cng-kit-distribution": Package,
  "cng-repair-maintenance": Wrench,
  "cng-spares-tooling": Cog,
  "lpg-kit-installation": Flame,
  "automobile-trade-dealers": Car,
  "maruti-alto-specialist": Sparkles
};

export default function ServiceCard({ service, onSelect }) {
  const { t } = useLanguage();
  const IconComponent = iconMap[service.id] || Wrench;

  return (
    <article className="card-navy card-hover-effect service-card-item">
      {service.highlight && (
        <div className="service-card-badge">
          <span>{service.highlight}</span>
        </div>
      )}

      <div className="service-card-header">
        <div className="service-icon-box">
          <IconComponent size={26} className="text-yellow" />
        </div>
        <span className="service-category">{service.category}</span>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.shortDesc}</p>

      <ul className="service-features-list">
        {service.features.map((feat, idx) => (
          <li key={idx} className="service-feature-item">
            <CheckCircle2 size={16} className="text-blue feature-icon" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {service.tags && service.tags.length > 0 && (
        <div className="service-card-tags">
          <span className="service-tags-label">
            <Tag size={13} className="text-yellow" />
            <span>Official Capabilities:</span>
          </span>
          <div className="service-tags-wrapper">
            {service.tags.map((tag, tIdx) => (
              <span key={tIdx} className="service-micro-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="service-card-footer">
        <a
          href="#contact"
          className="service-link-btn"
          onClick={() => onSelect && onSelect(service.title)}
          aria-label={`Get quote for ${service.title}`}
        >
          <span>{t('services.ctaSpecific', {}, 'Get Specific Estimate')}</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
