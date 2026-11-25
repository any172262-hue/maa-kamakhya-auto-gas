import React from 'react';
import { systemComponents } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function Compatibility() {
  const { t } = useLanguage();

  return (
    <section id="compatibility" className="section section-dark">
      <div className="container">
        {/* CNG System Overview */}
        <div id="installation-overview" className="system-overview-wrapper">
          <RevealAnimation>
            <SectionHeading
              tagline={t('compatibility.overviewTag', {}, 'CNG System Overview')}
              title={t('compatibility.overviewTitle', {}, 'How a Sequential CNG Kit')}
              highlight={t('compatibility.overviewHighlight', {}, 'Works')}
              description={t('compatibility.overviewDesc', {}, 'See the main parts and typical layout of a sequential CNG system from engine bay to cylinder mounting.')}
            />
          </RevealAnimation>

          {/* Central Infographic Graphic & Callout Cards */}
          <div className="system-diagram-layout">
            <RevealAnimation delay={1}>
              <div className="system-diagram-card card-navy">
                <img
                  src={`${import.meta.env.BASE_URL}images/cng-installation.webp`}
                  alt="Diagram showing main parts of a sequential CNG system installed in a car"
                  className="cng-diagram-image"
                  width="896"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: '896 / 1200' }}
                />
                <p className="system-diagram-note">
                  {t('compatibility.diagramNote', {}, 'Sample layout for reference. Exact placement depends on your vehicle model and chosen kit.')}
                </p>
              </div>
            </RevealAnimation>

            {/* Component Detail Grid */}
            <div className="system-components-grid">
              {systemComponents.map((comp, idx) => (
                <RevealAnimation key={comp.title} delay={idx + 1}>
                  <div className="card-navy card-hover-effect comp-item-card">
                    <div className="comp-tag-badge">
                      <span>{comp.tag}</span>
                    </div>
                    <h4 className="comp-title">{comp.title}</h4>
                    <p className="comp-desc">{comp.desc}</p>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
