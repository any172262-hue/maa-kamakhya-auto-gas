import React from 'react';
import { 
  Navigation, 
  Phone, 
  CheckCircle2, 
  Building2, 
  Route 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/SectionHeading';
import RevealAnimation from '../components/RevealAnimation';
import Button from '../components/Button';
import Logo from '../components/Logo';

export default function WorkshopLocationMap() {
  const { t } = useLanguage();

  // Live Google Maps embed centered on the exact coordinates: 26°07'12.1"N 91°41'47.5"E (NH 37, Garchuk)
  const googleMapEmbedUrl = "https://maps.google.com/maps?q=26.1200128,91.6965264&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const drivingRoutes = [
    {
      from: "From ISBT Guwahati (Interstate Bus Terminus)",
      distance: "~2.0 km",
      directions: "Drive west on NH 37 toward Jalukbari / Boragaon. Pass Garchuk Chariali; workshop is situated on NH 37 opposite Nezon Steel, near Kumar Resorts."
    },
    {
      from: "From Jalukbari Flyover / Airport Side",
      distance: "~5.5 km",
      directions: "Head east along NH 37 toward Garchuk and Lokhra. Direct highway-frontage access at Pachim Boragaon directly opposite Nezon Steel."
    },
    {
      from: "From Lokhra Chariali / NH-27 Bypass",
      distance: "~4.5 km",
      directions: "Take NH 37 heading west past Garchuk intersection. Direct highway access with dedicated parking and vehicle drive-in bay."
    }
  ];

  const workshopFeatures = [
    "Location on NH 37, Pachim Boragaon",
    "Near Garchuk intersection, Guwahati",
    "Auto Gas Filling Station (CNG Only)",
    "CNG & LPG Automotive Services",
    "Gas Kit Installation & Conversion",
    "Gas Kit Repair & Maintenance"
  ];

  return (
    <section id="location" className="section section-dark workshop-location-section">
      <div className="container">
        <RevealAnimation>
          <SectionHeading
            tagline={t('location.tagline', {}, 'VISIT OUR WORKSHOP')}
            title={t('location.title', {}, 'Prime NH 37 Location in')}
            highlight={t('location.titleHighlight', {}, 'Guwahati.')}
            description={t('location.description', {}, 'Conveniently accessible from Jalukbari, Lokhra, Betkuchi and the Guwahati bypass. Drop in for a free pre-fitment inspection.')}
          />
        </RevealAnimation>

        <div className="location-grid">
          {/* Column 1: Interactive Google Maps Embed */}
          <RevealAnimation delay={1}>
            <div className="location-map-card card-navy">
              {/* Live Interactive Google Map Frame */}
              <div className="map-iframe-container">
                <iframe
                  title="Maa Kamakhya Auto Gas Workshop Location on NH 37, Pachim Boragaon, Garchuk, Guwahati"
                  src={googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-iframe-element"
                />
              </div>

              {/* Map Quick Action Controls */}
              <div className="map-card-actions">
                <div className="map-address-block">
                  <div className="map-address-line">
                    <strong className="text-white">{siteConfig.name}</strong>
                    <span className="map-tag-sub">Guwahati</span>
                  </div>
                  <div className="map-address-sub text-muted text-xs">
                    {siteConfig.address}
                  </div>
                  <div className="map-coords-badge text-xs">
                    <span>Location: NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035</span>
                  </div>
                </div>

                <div className="map-buttons-row">
                  <Button
                    variant="primary"
                    size="md"
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={Navigation}
                  >
                    {t('location.getDirections', {}, 'Open Live GPS Directions')}
                  </Button>

                  <Button
                    variant="call"
                    size="md"
                    href={siteConfig.phoneTel}
                    icon={Phone}
                  >
                    {t('common.call', {}, 'Call')}: {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </div>
          </RevealAnimation>

          {/* Column 2: Workshop Identity & Guwahati Highway Driving Routes */}
          <div className="location-info-column">
            {/* Facility Identification Card */}
            <RevealAnimation delay={2}>
              <div className="location-showcase-card card-navy">
                <div className="showcase-card-header">
                  <div className="showcase-badge">
                    <Building2 size={16} className="text-yellow" />
                    <span>{t('location.workshopAddress', {}, 'Official Workshop Location')}</span>
                  </div>
                  <span className="text-xs text-muted">Garchuk Facility</span>
                </div>

                <div className="showcase-brand-identity-box">
                  <div className="showcase-logo-frame">
                    <Logo height={48} className="showcase-brand-logo" />
                  </div>
                  <div className="showcase-brand-details">
                    <h4 className="showcase-brand-title text-white font-bold">{siteConfig.name}</h4>
                    <p className="showcase-brand-address text-xs text-muted">
                      {siteConfig.address}
                    </p>
                    <div className="showcase-meta-pills">
                      <span className="showcase-pill">NH 37</span>
                      <span className="showcase-pill">Pachim Boragaon</span>
                      <span className="showcase-pill">Garchuk, Guwahati</span>
                    </div>
                  </div>
                </div>

                <div className="showcase-amenities-list">
                  {workshopFeatures.map((feat) => (
                    <div key={feat} className="showcase-amenity-item">
                      <CheckCircle2 size={14} className="text-yellow flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealAnimation>

            {/* Quick Highway Route Guide Card */}
            <RevealAnimation delay={3}>
              <div className="location-routes-card card-navy">
                <div className="routes-card-header">
                  <Route size={18} className="text-yellow" />
                  <h4 className="routes-title">Guwahati Highway Route Landmarks</h4>
                </div>

                <div className="routes-list">
                  {drivingRoutes.map((route) => (
                    <div key={route.from} className="route-item">
                      <div className="route-item-top">
                        <span className="route-from font-semibold text-white">{route.from}</span>
                        <span className="route-distance-pill">{route.distance}</span>
                      </div>
                      <p className="route-directions text-xs text-muted">
                        {route.directions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
