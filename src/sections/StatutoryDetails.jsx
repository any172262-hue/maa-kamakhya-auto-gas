import React from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function StatutoryDetails() {
  const { t } = useLanguage();
  const { statutory } = siteConfig;

  const detailsList = [
    {
      label: t('statutory.legalName', {}, 'Legal Name'),
      value: statutory.legalName,
      icon: Building2,
      subtext: t('statutory.legalNameSub', {}, 'Government-approved CNG retrofitment workshop')
    },
    {
      label: t('statutory.estYear', {}, 'Year of Establishment'),
      value: statutory.yearOfEstablishment,
      icon: Calendar,
      subtext: t('statutory.estYearSub', {}, 'Serving Northeast India since 2022')
    },
    {
      label: t('statutory.employees', {}, 'No of Employee'),
      value: statutory.noOfEmployee,
      icon: Users,
      subtext: t('statutory.employeesSub', {}, 'Certified technical specialists')
    },
    {
      label: t('statutory.turnover', {}, 'Turn Over'),
      value: statutory.turnOver,
      icon: TrendingUp,
      subtext: t('statutory.turnoverSub', {}, 'Annual verified operating capacity')
    },
    {
      label: t('statutory.gstin', {}, 'GSTIN'),
      value: statutory.gstin,
      icon: ShieldCheck,
      badge: t('statutory.verifiedBadge', {}, 'Assam Regd.'),
      subtext: t('statutory.gstinSub', {}, 'Registered taxpayer in Assam (Code 18)')
    },
    {
      label: t('statutory.paymentMode', {}, 'Mode of Payment'),
      value: statutory.modeOfPayment,
      icon: CreditCard,
      subtext: t('statutory.paymentModeSub', {}, 'Flexible financing & instant payments'),
      isPayment: true
    }
  ];

  return (
    <section id="statutory-details" className="section section-navy statutory-section">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('statutory.tagline', {}, 'OFFICIAL REGISTRATION & COMPLIANCE')}
            title={t('statutory.title', {}, 'Business Statutory')}
            highlight={t('statutory.titleHighlight', {}, 'Details.')}
            description={t('statutory.description', {}, 'Complete statutory verification, legal registration details, and flexible payment options ensuring complete transparency and peace of mind.')}
          />
        </RevealAnimation>

        <div className="statutory-grid">
          {detailsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealAnimation 
                key={item.label} 
                delay={(index % 3) + 1}
                className={`statutory-card-col ${item.isPayment ? 'statutory-card-wide' : ''}`}
              >
                <div className="card-navy card-hover-effect statutory-card">
                  <div className="statutory-card-top">
                    <div className="statutory-icon-box">
                      <Icon size={22} className="text-yellow" />
                    </div>
                    {item.badge && (
                      <div className="statutory-verified-badge">
                        <CheckCircle2 size={12} className="text-yellow" />
                        <span>{item.badge}</span>
                      </div>
                    )}
                  </div>

                  <div className="statutory-label">{item.label}</div>
                  <div className="statutory-value">{item.value}</div>
                  <p className="statutory-subtext">{item.subtext}</p>

                  {item.isPayment && (
                    <div className="statutory-payment-chips">
                      {statutory.paymentMethodsList.map((method) => (
                        <span key={method} className="payment-chip">
                          <CheckCircle2 size={12} className="text-blue" />
                          <span>{method}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </RevealAnimation>
            );
          })}
        </div>

        {/* Assurance Box */}
        <RevealAnimation delay={2}>
          <div className="statutory-assurance-bar card-navy">
            <div className="assurance-icon-box">
              <Lock size={18} className="text-yellow" />
            </div>
            <div className="assurance-text">
              <strong>100% Statutory & Tax Invoiced:</strong> Every conversion, hydro-testing service, and cylinder replacement is accompanied by an authorized tax invoice, fitment compliance certificate, and legal warranty documentation under <strong>{statutory.legalName}</strong>.
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
