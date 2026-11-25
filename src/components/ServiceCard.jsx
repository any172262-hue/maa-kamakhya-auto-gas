import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceCard({ service, onSelect }) {
  const { t } = useLanguage();

  return (
    <article className="card-navy card-hover-effect service-card-item">
      <div className="service-card-header">
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
            <span>Key Options:</span>
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
          aria-label={`Enquire about ${service.title}`}
        >
          <span>{t('services.ctaSpecific', {}, 'Enquire Now')}</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
