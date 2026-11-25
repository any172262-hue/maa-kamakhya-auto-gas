import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy({ onBackToHome }) {
  const { t } = useLanguage();

  usePageMeta({
    title: "Privacy Policy | Maa Kamakhya Auto Gas, Guwahati",
    description: "Read the Privacy Policy for Maa Kamakhya Auto Gas in Guwahati, Assam, explaining how enquiry details, calculator inputs, and WhatsApp communication are handled.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/privacy-policy/"
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
          <Shield size={16} className="text-yellow" />
          <span>Privacy Policy</span>
        </div>
        <h1 className="legal-title">{t('legal.privacyTitle', {}, 'Privacy Policy')}</h1>
        <p className="legal-meta">
          Business: <strong>{siteConfig.legalName}</strong> | {t('legal.lastUpdated', {}, 'Last Updated: November 2026')} | Status: Draft for owner review
        </p>
      </header>

      <div className="legal-content-card card-navy">
        <section className="legal-section">
          <h2>1. About This Policy</h2>
          <p>
            Maa Kamakhya Auto Gas provides CNG and LPG services, sequential kit installation, vehicle gas conversion, maintenance, and CNG filling at {siteConfig.address}.
          </p>
          <p>
            This Privacy Policy explains what information is collected when you visit our website, use our fuel savings calculator, or prepare a WhatsApp enquiry to send to our team.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Handle</h2>
          <p>
            This website only uses the details you choose to enter while browsing or preparing an enquiry:
          </p>
          <ul>
            <li>
              <strong>Enquiry Form Details:</strong> When you fill out the Contact Us form, you enter your Full Name, Mobile Number, Service Needed, and any optional Vehicle Model or Additional Message you wish to share.
            </li>
            <li>
              <strong>Referral Link Information (UTM Parameters):</strong> If you visit the website from a link that includes referral tags (such as utm_source or utm_campaign), those details may be kept in your browser session temporarily and included in your prepared WhatsApp message so our team knows how you found us.
            </li>
            <li>
              <strong>Fuel Savings Calculator Inputs:</strong> Numbers you enter in the fuel savings calculator stay in your browser to show rough estimates and are not saved on a server.
            </li>
            <li>
              <strong>Standard Hosting Logs:</strong> Like most websites, the hosting provider may keep basic technical logs (such as browser type and request timing) for security and availability. Any third-party analytics setup is currently marked as <em>TBD (Pending owner confirmation)</em>.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How Enquiries Work With WhatsApp</h2>
          <p>
            This website does not store your enquiry details in an online database. When you fill out the form:
          </p>
          <ul>
            <li>
              <strong>Review Before Sending:</strong> Clicking "Review &amp; Send via WhatsApp" opens a review box where you can check or edit your details before continuing.
            </li>
            <li>
              <strong>Opening WhatsApp:</strong> Once you confirm, your details are placed into a WhatsApp message addressed to Maa Kamakhya Auto Gas at <strong>+91 {siteConfig.whatsappNumber}</strong>.
            </li>
            <li>
              <strong>Your Choice to Send:</strong> Nothing is sent automatically by the website. Your enquiry is only sent if you press Send inside WhatsApp.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Third-Party Services &amp; Cookies</h2>
          <p>
            This website loads certain external services so pages display properly:
          </p>
          <ul>
            <li>
              <strong>Google Fonts:</strong> Used to display website fonts cleanly.
            </li>
            <li>
              <strong>Google Maps:</strong> Embedded on the site so you can view our location and get directions to our workshop in Garchuk, Guwahati.
            </li>
            <li>
              <strong>Cookies:</strong> This website does not intentionally set advertising cookies or tracking pixels. Any future cookie notice requirements are marked as <em>TBD (Pending owner confirmation)</em>.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Your Choices and Data Retention</h2>
          <p>
            Since no customer accounts or enquiry databases are stored on this website, your enquiry history only exists in your own WhatsApp or phone call records with us when you choose to message or call.
          </p>
          <p>
            If you have contacted Maa Kamakhya Auto Gas and would like us to remove or update details from past messages, please call or message us directly.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Contact Details</h2>
          <div className="legal-contact-box">
            <p><strong>Business Name:</strong> {siteConfig.legalName}</p>
            <p><strong>Address:</strong> {siteConfig.address}</p>
            <p><strong>Phone:</strong> {siteConfig.phoneFormatted}</p>
            <p><strong>WhatsApp:</strong> +91 {siteConfig.whatsappNumber}</p>
            <p><strong>Operating Hours:</strong> {siteConfig.hours}</p>
            <p><strong>Legal Contact / Officer:</strong> <em>TBD (To be confirmed by the business owner)</em></p>
          </div>
        </section>

        <section className="legal-section legal-review-notice">
          <p>
            <strong>Note for Business Owner Confirmation:</strong> This Privacy Policy describes how the current website works. Operating hours, legal contact details, analytics preferences, and cookie policy details are flagged for final review and approval by the owner of Maa Kamakhya Auto Gas.
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
