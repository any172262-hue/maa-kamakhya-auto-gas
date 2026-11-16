import React, { useEffect } from 'react';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, Scale, ShieldAlert } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

export default function TermsConditions({ onBackToHome }) {
  const { t } = useLanguage();

  usePageMeta({
    title: "Terms & Conditions | Maa Kamakhya Auto Gas, Guwahati",
    description: "Official Terms & Conditions for Maa Kamakhya Auto Gas website in Guwahati, Assam. Details service terms, fuel savings estimate disclaimers, and warranty policies.",
    canonical: "https://maakamakhyaautogas.com/#terms-conditions"
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
          <span>{t('legal.backToHome', {}, 'Back to Home')}</span>
        </a>
      </div>

      <header className="legal-header">
        <div className="legal-badge">
          <FileText size={16} className="text-yellow" />
          <span>Website Terms of Use</span>
        </div>
        <h1 className="legal-title">{t('legal.termsTitle', {}, 'Terms & Conditions')}</h1>
        <p className="legal-meta">
          Entity: <strong>{siteConfig.legalName}</strong> | {t('legal.lastUpdated', {}, 'Last Updated: November 2026')} | Status: Draft flagged for owner review
        </p>
      </header>

      <div className="legal-content-card card-navy">
        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website of Maa Kamakhya Auto Gas, you acknowledge and agree to comply with these terms of use. If you do not agree with any portion of these terms, please discontinue using this website.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Description of Website Services</h2>
          <p>
            This website provides digital informational resources regarding automotive CNG retrofitment, sequential kit distribution, cylinder hydrostatic testing, spare parts, and automobile mechanical services offered by Maa Kamakhya Auto Gas in Guwahati, Assam.
          </p>
          <p>
            Website content is published for informational, educational, and customer enquiry purposes. Browsing the website does not create a binding commercial contract or installation agreement.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Fuel Savings Calculator Disclaimer</h2>
          <p>
            The Petrol vs. CNG Savings Calculator provided on this website produces illustrative comparisons based entirely on the travel distances, fuel tariffs, and vehicle mileage values entered by the user.
          </p>
          <ul>
            <li>
              Actual fuel economy varies significantly based on vehicle condition, driving habits, traffic congestion, terrain, air conditioner usage, and engine tuning.
            </li>
            <li>
              Calculator estimates exclude the initial capital cost of kit installation, routine periodic servicing, cylinder hydrostatic testing fees, and vehicle insurance adjustments.
            </li>
            <li>
              Results from the calculator must not be interpreted as a legal performance guarantee or financial warranty.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Enquiries and Communication Guidelines</h2>
          <p>
            When you submit vehicle details via our quote request form or send a message to our WhatsApp hotline (+91 {siteConfig.whatsappNumber}):
          </p>
          <ul>
            <li>
              You agree to provide truthful and accurate information regarding your vehicle model, year, and registration type.
            </li>
            <li>
              Quotations, kit availability, and installation appointments provided through messaging channels are subject to physical pre-inspection of the vehicle at our Garchuk, Guwahati workshop.
            </li>
            <li>
              Maa Kamakhya Auto Gas reserves the right to decline retrofitment if an inspection reveals engine compression defects, severe cylinder head wear, or structural incompatibility.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Warranty and Compliance Limitations</h2>
          <p>
            Any component warranties or installation guarantees apply solely to work executed physically at our authorized workshop on NH 37, Garchuk, Guwahati, and are governed by individual written job cards and manufacturer warranty booklets issued upon delivery.
          </p>
          <p>
            Specific terms regarding formal warranty periods, claims processes, and exclusions for wear-and-tear items are marked as: <em>TBD (Subject to final owner approval and manufacturer terms)</em>.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Intellectual Property and Brand Rights</h2>
          <p>
            The official name, logo, graphic presentations, text, layout, and software code on this website are the property of Maa Kamakhya Auto Gas. Unauthorized copying, reproduction, or distribution without prior written consent is prohibited.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Governing Jurisdiction</h2>
          <p>
            Any disputes arising from the use of this website shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Kamrup Metropolitan District, Guwahati, Assam.
          </p>
        </section>

        <section className="legal-section legal-review-notice">
          <p>
            <strong>Owner Notice:</strong> This document is a preliminary terms draft formulated for website launch. It does not constitute formal legal counsel and is submitted for inspection and modification by the owner of Maa Kamakhya Auto Gas.
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
          <span>Return to Homepage</span>
        </a>
      </div>
    </div>
  );
}
