import React from 'react';
import { IndianRupee, Leaf, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const points = [
    {
      icon: IndianRupee,
      title: t('why.card1Title', {}, 'Potential fuel savings'),
      description: t('why.card1Desc', {}, 'Compare your vehicle\'s estimated petrol and CNG running costs before deciding. Reduce daily commuting expenses by more than half.')
    },
    {
      icon: Leaf,
      title: t('why.card2Title', {}, 'Cleaner mobility choice'),
      description: t('why.card2Desc', {}, 'CNG can produce lower tailpipe emissions of harmful greenhouse pollutants than petrol in suitable applications, promoting cleaner air in Assam.')
    },
    {
      icon: Wrench,
      title: t('why.card3Title', {}, 'Professional retrofitment'),
      description: t('why.card3Desc', {}, 'Get certified guidance on compatible systems, government-approved installation requirements, leak-proof piping, and dedicated after-installation care.')
    }
  ];

  return (
    <section id="why-choose" className="section section-dark">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('why.tagline', {}, 'WHY CONSIDER CNG?')}
            title={t('why.title', {}, 'A smarter way to think about')}
            highlight={t('why.titleHighlight', {}, 'fuel.')}
            description={t('why.description', {}, 'The right CNG setup can offer meaningful running-cost advantages. Actual results depend on your vehicle, fuel prices, driving conditions and usage.')}
          />
        </RevealAnimation>

        <div className="why-grid">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <RevealAnimation key={pt.title} delay={idx + 1} className="why-card-wrapper">
                <div className="card-navy card-hover-effect why-card">
                  <div className="why-icon-box">
                    <Icon size={28} className="text-yellow" />
                  </div>
                  <h3 className="why-card-title">{pt.title}</h3>
                  <p className="why-card-desc">{pt.description}</p>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
