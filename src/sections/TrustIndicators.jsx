import React from 'react';
import { Award, ShieldCheck, Zap, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RevealAnimation from '../components/RevealAnimation';

export default function TrustIndicators() {
  const { t } = useLanguage();

  const metrics = [
    {
      value: t('trust.metric1Value', {}, '1,500+'),
      label: t('trust.metric1Label', {}, 'Kits Retrofitted'),
      suffix: t('trust.metric1Sub', {}, 'Across Assam & Northeast'),
      icon: Award
    },
    {
      value: t('trust.metric2Value', {}, 'Up to 55%'),
      label: t('trust.metric2Label', {}, 'Fuel Cost Reduction'),
      suffix: t('trust.metric2Sub', {}, 'Compared to Petrol'),
      icon: Zap
    },
    {
      value: t('trust.metric3Value', {}, '100% Legal'),
      label: t('trust.metric3Label', {}, 'Govt. Approved Retrofitment'),
      suffix: t('trust.metric3Sub', {}, 'Homologated Components'),
      icon: ShieldCheck
    },
    {
      value: t('trust.metric4Value', {}, '3 Years'),
      label: t('trust.metric4Label', {}, 'Warranty & Hydro-Testing'),
      suffix: t('trust.metric4Sub', {}, 'Certified Guarantee'),
      icon: ThumbsUp
    }
  ];

  return (
    <section className="trust-section section-navy">
      <div className="container">
        <div className="trust-grid">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealAnimation key={item.label} delay={index + 1} className="trust-card-wrapper">
                <div className="trust-card">
                  <div className="trust-icon-box">
                    <Icon size={24} className="text-yellow" />
                  </div>
                  <div className="trust-stat-content">
                    <div className="trust-stat-value">{item.value}</div>
                    <div className="trust-stat-label">{item.label}</div>
                    <div className="trust-stat-suffix">{item.suffix}</div>
                  </div>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
