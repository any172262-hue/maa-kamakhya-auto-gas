import React from 'react';
import { Fuel, MapPin, Wrench, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RevealAnimation from '../components/RevealAnimation';

export default function TrustIndicators() {
  const { t } = useLanguage();

  const metrics = [
    {
      value: t('trust.metric1Value', {}, 'CNG & LPG'),
      label: t('trust.metric1Label', {}, 'Dual-Fuel Solutions'),
      suffix: t('trust.metric1Sub', {}, 'Automotive Gas Systems'),
      icon: Fuel
    },
    {
      value: t('trust.metric2Value', {}, 'CNG Only'),
      label: t('trust.metric2Label', {}, 'Filling Station Fuel'),
      suffix: t('trust.metric2Sub', {}, 'NH 37 Dispensing Point'),
      icon: ShieldCheck
    },
    {
      value: t('trust.metric3Value', {}, '6 Services'),
      label: t('trust.metric3Label', {}, 'Confirmed Offerings'),
      suffix: t('trust.metric3Sub', {}, 'Installation, Conversion, Repair'),
      icon: Wrench
    },
    {
      value: t('trust.metric4Value', {}, 'Guwahati'),
      label: t('trust.metric4Label', {}, 'Kamrup Metropolitan'),
      suffix: t('trust.metric4Sub', {}, 'Pachim Boragaon, Garchuk'),
      icon: MapPin
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
