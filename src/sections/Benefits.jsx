import React from 'react';
import { IndianRupee, Leaf, Wrench, Fuel, ShieldCheck, Cpu } from 'lucide-react';
import { benefitsData } from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

const iconMap = {
  IndianRupee,
  Leaf,
  Wrench,
  Fuel,
  ShieldCheck,
  Cpu
};

export default function Benefits() {
  const { t } = useLanguage();

  const getBenefitTitle = (id, defaultTitle) => {
    switch (id) {
      case 'fuel-savings':
        return t('benefits.b1Title', {}, defaultTitle);
      case 'clean-mobility':
        return t('benefits.b2Title', {}, defaultTitle);
      case 'certified-retrofitment':
        return t('benefits.b3Title', {}, defaultTitle);
      case 'dual-fuel':
        return t('benefits.b4Title', {}, defaultTitle);
      case 'warranty':
        return t('benefits.b5Title', {}, defaultTitle);
      case 'engine-life':
        return t('benefits.b6Title', {}, defaultTitle);
      default:
        return defaultTitle;
    }
  };

  const getBenefitDesc = (id, defaultDesc) => {
    switch (id) {
      case 'fuel-savings':
        return t('benefits.b1Desc', {}, defaultDesc);
      case 'clean-mobility':
        return t('benefits.b2Desc', {}, defaultDesc);
      case 'certified-retrofitment':
        return t('benefits.b3Desc', {}, defaultDesc);
      case 'dual-fuel':
        return t('benefits.b4Desc', {}, defaultDesc);
      case 'warranty':
        return t('benefits.b5Desc', {}, defaultDesc);
      case 'engine-life':
        return t('benefits.b6Desc', {}, defaultDesc);
      default:
        return defaultDesc;
    }
  };

  return (
    <section id="benefits" className="section section-dark">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('benefits.tagline', {}, 'WHAT YOU GAIN')}
            title={t('benefits.title', {}, 'Real Benefits You Will Notice')}
            highlight={t('benefits.titleHighlight', {}, 'Every Day.')}
            description={t('benefits.description', {}, 'Here is what you can expect when you run your car on a properly installed sequential auto gas system.')}
          />
        </RevealAnimation>

        <div className="benefits-grid">
          {benefitsData.map((item, index) => {
            const Icon = iconMap[item.icon] || Fuel;
            return (
              <RevealAnimation key={item.id} delay={(index % 3) + 1}>
                <div className="card-navy card-hover-effect benefit-card">
                  <div className="benefit-icon-wrapper">
                    <Icon size={26} className="text-yellow" />
                  </div>
                  <h3 className="benefit-card-title">{getBenefitTitle(item.id, item.title)}</h3>
                  <p className="benefit-card-desc">{getBenefitDesc(item.id, item.description)}</p>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
