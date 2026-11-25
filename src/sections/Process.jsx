import React from 'react';
import { installationSteps } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function Process() {
  const { t } = useLanguage();

  const getStepTitle = (stepNumber, defaultTitle) => {
    switch (stepNumber) {
      case '01':
      case 1:
        return t('process.step1Title', {}, defaultTitle);
      case '02':
      case 2:
        return t('process.step2Title', {}, defaultTitle);
      case '03':
      case 3:
        return t('process.step3Title', {}, defaultTitle);
      case '04':
      case 4:
        return t('process.step4Title', {}, defaultTitle);
      case '05':
      case 5:
        return t('process.step5Title', {}, defaultTitle);
      default:
        return defaultTitle;
    }
  };

  const getStepDesc = (stepNumber, defaultDesc) => {
    switch (stepNumber) {
      case '01':
      case 1:
        return t('process.step1Desc', {}, defaultDesc);
      case '02':
      case 2:
        return t('process.step2Desc', {}, defaultDesc);
      case '03':
      case 3:
        return t('process.step3Desc', {}, defaultDesc);
      case '04':
      case 4:
        return t('process.step4Desc', {}, defaultDesc);
      case '05':
      case 5:
        return t('process.step5Desc', {}, defaultDesc);
      default:
        return defaultDesc;
    }
  };

  return (
    <section id="process" className="section section-navy">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('process.tagline', {}, 'How It Works')}
            title={t('process.title', {}, 'Our 5-Step')}
            highlight={t('process.titleHighlight', {}, 'Installation Process')}
            description={t('process.description', {}, 'Every vehicle kit installation follows clear inspection, neat fitting, tuning, and leak-testing steps.')}
          />
        </RevealAnimation>

        <div className="process-timeline-grid">
          {installationSteps.map((item, index) => (
            <RevealAnimation key={item.step} delay={index + 1} className="process-step-wrapper">
              <div className="card-navy card-hover-effect process-step-card">
                <div className="step-badge-number">
                  <span>{item.step}</span>
                </div>
                <h3 className="step-title">{getStepTitle(item.step, item.title)}</h3>
                <p className="step-desc">{getStepDesc(item.step, item.description)}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
