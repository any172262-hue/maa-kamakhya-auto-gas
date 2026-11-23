import React from 'react';
import { 
  Building2, 
  MapPin, 
  Fuel, 
  Clock, 
  Wrench, 
  AlertCircle,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';

export default function StatutoryDetails() {
  const { t } = useLanguage();
  const { verifiedDetails } = siteConfig;

  const detailsList = [
    {
      label: t('statutory.legalName', {}, 'Business Name'),
      value: verifiedDetails.businessName,
      icon: Building2,
      subtext: t('statutory.legalNameSub', {}, 'Confirmed business identity in Guwahati')
    },
    {
      label: t('statutory.address', {}, 'Public Address'),
      value: verifiedDetails.publicAddress,
      icon: MapPin,
      subtext: t('statutory.addressSub', {}, 'NH 37 highway frontage, Pachim Boragaon, Garchuk')
    },
    {
      label: t('statutory.district', {}, 'District & State'),
      value: verifiedDetails.district,
      icon: MapPin,
      badge: t('statutory.verifiedBadge', {}, 'Confirmed'),
      subtext: t('statutory.districtSub', {}, 'Kamrup Metropolitan, Assam, India (PIN: 781035)')
    },
    {
      label: t('statutory.fuelAvailability', {}, 'Station Fuel Availability'),
      value: verifiedDetails.fillingStationFuel,
      icon: Fuel,
      badge: t('statutory.cngOnlyBadge', {}, 'CNG Only'),
      subtext: t('statutory.fuelSub', {}, 'CNG is available at the filling station. LPG filling is not available.')
    },
    {
      label: t('statutory.hours', {}, 'Operating Hours'),
      value: t('statutory.hoursValue', {}, 'Not Provided'),
      icon: Clock,
      subtext: t('statutory.hoursSub', {}, 'Operating hours are not published. Please contact before visiting.')
    },
    {
      label: t('statutory.services', {}, 'Confirmed Services'),
      value: t('statutory.servicesCount', {}, '6 Core Services'),
      icon: Wrench,
      subtext: t('statutory.servicesSub', {}, 'CNG, LPG, Filling, Installation, Conversion, Repair')
    }
  ];

  return (
    <section id="statutory-details" className="section section-navy statutory-section">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('statutory.tagline', {}, 'CONFIRMED BUSINESS INFORMATION')}
            title={t('statutory.title', {}, 'Verified Business Details &')}
            highlight={t('statutory.titleHighlight', {}, 'Location Information.')}
            description={t('statutory.description', {}, 'Accurate, evidence-backed information for Maa Kamakhya Auto Gas in Guwahati. Unverified claims, unconfirmed opening hours, and third-party ratings are strictly excluded.')}
          />
        </RevealAnimation>

        <div className="statutory-grid">
          {detailsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealAnimation 
                key={item.label} 
                delay={(index % 3) + 1}
                className="statutory-card-col"
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
                  <div className="statutory-value" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>{item.value}</div>
                  <p className="statutory-subtext">{item.subtext}</p>
                </div>
              </RevealAnimation>
            );
          })}
        </div>

        {/* Owner Verification Notice Bar */}
        <RevealAnimation delay={2}>
          <div className="statutory-assurance-bar card-navy" style={{ borderColor: 'rgba(234, 179, 8, 0.4)' }}>
            <div className="assurance-icon-box">
              <AlertCircle size={18} className="text-yellow" />
            </div>
            <div className="assurance-text">
              <strong>Owner Verification Notice:</strong> Published phone numbers (+91 {siteConfig.phone} / WhatsApp +91 {siteConfig.whatsappNumber}) are pending business-owner confirmation. Operating hours are not published online. Please confirm service availability and timings before visiting our NH 37 location.
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
