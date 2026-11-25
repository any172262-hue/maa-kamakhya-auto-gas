import React, { useEffect } from 'react';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, Scale, ShieldAlert } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

export default function TermsConditions({ onBackToHome }) {
  const { t } = useLanguage();

  usePageMeta({
    title: "Terms & Conditions | Maa Kamakhya Auto Gas, Guwahati",
    description: "Read the Terms & Conditions for using the Maa Kamakhya Auto Gas website, including enquiry guidelines, calculator disclaimers, and warranty notices.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/terms-conditions/"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container container">
      <div className="legal-back-nav">
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onBackToHome(); }} 
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={16} />
          <span>{t('legal.backToHome', {}, 'Go Back')}</span>
        </a>
      </div>

      <header className="legal-header">
        <div className="legal-badge">
          <FileText size={16} className="text-yellow" />
          <span>Terms &amp; Conditions</span>
        </div>
        <h1 className="legal-title">{t('legal.termsTitle', {}, 'Terms & Conditions')}</h1>
        <p className="legal-meta">
          Business: <strong>{siteConfig.legalName}</strong> | {t('legal.lastUpdated', {}, 'Last Updated: November 2026')} | Status: Draft for owner review
        </p>
      </header>

      <div className="legal-content-card card-navy">
        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By visiting or using the website of Maa Kamakhya Auto Gas, you agree to these Terms &amp; Conditions. If you do not agree with these terms, please stop using this website.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. About Website Information</h2>
          <p>
            This website shares general information about CNG and LPG services, kit installation, vehicle gas conversion, servicing, and CNG filling offered by Maa Kamakhya Auto Gas in Guwahati, Assam.
          </p>
          <p>
            The content on this website is for information and enquiry purposes only. Viewing the website or sending an enquiry does not create a binding service contract or confirmed booking.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Fuel Savings Calculator Disclaimer</h2>
          <p>
            The Petrol vs. CNG Savings Calculator on this website provides approximate estimates based solely on the daily distance, fuel prices, and mileage values you enter.
          </p>
          <ul>
            <li>
              Real-world fuel mileage depends on vehicle condition, driving style, traffic, road conditions, AC use, and engine tuning.
            </li>
            <li>
              The calculator does not include kit installation cost, routine maintenance, cylinder testing fees, or insurance changes.
            </li>
            <li>
              Calculator figures are estimates only and should not be treated as a guarantee of fuel savings.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Enquiries and Workshop Inspection</h2>
          <p>
            When you share vehicle details through our enquiry form or message us on WhatsApp (+91 {siteConfig.whatsappNumber}):
          </p>
          <ul>
            <li>
              Please provide accurate details about your vehicle model, fuel type, and requirements.
            </li>
            <li>
              Any guidance, kit options, or estimates discussed over phone or WhatsApp remain subject to an in-person vehicle inspection at our Garchuk, Guwahati workshop.
            </li>
            <li>
              Maa Kamakhya Auto Gas may advise against or decline a gas kit installation if an inspection shows mechanical or engine condition issues that make conversion unsuitable.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Warranties and Service Terms</h2>
          <p>
            Any product warranties apply only to work completed at Maa Kamakhya Auto Gas on NH 37, Garchuk, Guwahati, and follow the written job card and manufacturer terms provided at the time of service.
          </p>
          <p>
            Specific warranty periods, coverage terms, and exclusions are marked as: <em>TBD (Subject to final owner confirmation and kit manufacturer terms)</em>.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Website Content and Trademarks</h2>
          <p>
            The business name, logo, text, layout, and code on this website belong to Maa Kamakhya Auto Gas. Please do not copy or reuse website materials without permission.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, and any disputes relating to the use of this website fall under the jurisdiction of the courts in Kamrup Metropolitan District, Guwahati, Assam.
          </p>
        </section>

        <section className="legal-section legal-review-notice">
          <p>
            <strong>Note for Business Owner Confirmation:</strong> These Terms &amp; Conditions are an initial draft prepared for the website. Formal warranty terms and legal review remain flagged for final confirmation by the owner of Maa Kamakhya Auto Gas.
          </p>
        </section>
      </div>

      <div className="legal-footer-nav">
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onBackToHome(); }} 
          className="btn btn-primary"
        >
          <ArrowLeft size={16} />
          <span>{t('legal.backToHome', {}, 'Go Back')}</span>
        </a>
      </div>
    </div>
  );
}
