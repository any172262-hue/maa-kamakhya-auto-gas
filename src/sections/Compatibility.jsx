import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Car
} from 'lucide-react';
import { vehicleCompatibilityData, systemComponents } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function Compatibility() {
  const { t } = useLanguage();
  const [activeBrand, setActiveBrand] = useState(0);

  return (
    <section id="compatibility" className="section section-dark">
      <div className="container">
        {/* Sub-Section 1: CNG System Overview */}
        <div id="installation-overview" className="system-overview-wrapper">
          <RevealAnimation>
            <SectionHeading
              tagline={t('compatibility.overviewTag', {}, 'CNG SYSTEM OVERVIEW')}
              title={t('compatibility.overviewTitle', {}, 'Complete CNG Installation in a')}
              highlight={t('compatibility.overviewHighlight', {}, 'Car.')}
              description={t('compatibility.overviewDesc', {}, 'Explore the main components and typical routing of a certified sequential CNG system from engine bay to cylinder mounting.')}
            />
          </RevealAnimation>

          {/* Central Infographic Graphic & Callout Cards */}
          <div className="system-diagram-layout">
            <RevealAnimation delay={1}>
              <div className="system-diagram-card card-navy">
                <img
                  src="/images/cng-installation.webp"
                  alt="Complete CNG Installation in a Car Schematic Overview"
                  className="cng-diagram-image"
                  width="896"
                  height="1200"
                  loading="lazy"
                />
                <p className="system-diagram-note">
                  {t('compatibility.diagramNote', {}, 'Illustrative system overview. Component placement and specifications depend on the vehicle make and approved retrofitment kit.')}
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

        {/* Sub-Section 2: Vehicle Compatibility Matrix */}
        <div className="compatibility-matrix-wrapper">
          <RevealAnimation>
            <SectionHeading
              tagline={t('compatibility.matrixTag', {}, 'CHECK YOUR VEHICLE')}
              title={t('compatibility.matrixTitle', {}, 'Car Compatibility &')}
              highlight={t('compatibility.matrixHighlight', {}, 'Supported Models.')}
              description={t('compatibility.matrixDesc', {}, 'We install government-homologated sequential CNG kits for India\'s most popular petrol passenger cars and commercial taxis.')}
            />
          </RevealAnimation>

          <div className="compatibility-card card-navy">
            {/* Brand Tabs */}
            <div className="brand-tabs-scroller">
              {vehicleCompatibilityData.brands.map((brand, idx) => (
                <button
                  key={brand.name}
                  type="button"
                  className={`brand-tab-btn ${activeBrand === idx ? 'active' : ''}`}
                  onClick={() => setActiveBrand(idx)}
                >
                  <Car size={16} />
                  <span>{brand.name}</span>
                </button>
              ))}
            </div>

            {/* Active Brand Display */}
            <div className="active-brand-details">
              <div className="active-brand-header">
                <div>
                  <h3 className="brand-name-title">
                    {vehicleCompatibilityData.brands[activeBrand].name}
                  </h3>
                  <div className="brand-status-tag">
                    <CheckCircle2 size={16} className="text-yellow" />
                    <span>{vehicleCompatibilityData.brands[activeBrand].compatibilityStatus}</span>
                  </div>
                </div>
              </div>

              <div className="supported-models-wrap">
                <h4 className="models-label">{t('compatibility.verifiedModels', {}, 'Verified Supported Models & Variants:')}</h4>
                <div className="models-pills-grid">
                  {vehicleCompatibilityData.brands[activeBrand].popularModels.map((model) => (
                    <div key={model} className="model-pill">
                      <span className="model-dot"></span>
                      <span>{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compatibility Guidelines Footer */}
            <div className="compatibility-guidelines-box">
              <h4 className="guidelines-title">{t('compatibility.guidelinesTitle', {}, 'General Retrofitment Guidelines:')}</h4>
              <ul className="guidelines-list">
                {vehicleCompatibilityData.guidelines.map((guide, idx) => (
                  <li key={idx} className="guideline-item">
                    <CheckCircle2 size={16} className="text-blue" />
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
