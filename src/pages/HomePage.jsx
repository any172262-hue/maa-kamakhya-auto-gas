import React, { useState } from 'react';
import Hero from '../sections/Hero';
import StatutoryDetails from '../sections/StatutoryDetails';
import TrustIndicators from '../sections/TrustIndicators';
import Services from '../sections/Services';
import WhyChooseUs from '../sections/WhyChooseUs';
import Benefits from '../sections/Benefits';
import SavingsCalculator from '../sections/SavingsCalculator';
import Process from '../sections/Process';
import CustomerReviews from '../sections/CustomerReviews';
import HomepageFaq from '../sections/HomepageFaq';
import WorkshopLocationMap from '../sections/WorkshopLocationMap';
import Contact from '../sections/Contact';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage({ onNavigate }) {
  usePageMeta({
    title: "CNG & LPG Services in Guwahati | Maa Kamakhya Auto Gas",
    description: "Maa Kamakhya Auto Gas offers CNG and LPG services, CNG filling, gas kit installation, vehicle gas conversion, repair and maintenance in Guwahati, Assam.",
    canonical: "https://any172262-hue.github.io/maa-kamakhya-auto-gas/"
  });

  const [inquiryPrefill, setInquiryPrefill] = useState('');

  const handleSelectService = (serviceTitle) => {
    setInquiryPrefill(`I am interested in getting a quote for ${serviceTitle}. Please share pricing and time required.`);
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (summaryText) => {
    setInquiryPrefill(summaryText);
  };

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <StatutoryDetails />
      <TrustIndicators />
      <WhyChooseUs />
      <Services onSelectService={handleSelectService} onNavigate={onNavigate} />
      <Benefits />
      <SavingsCalculator onApplyEstimate={handleApplyEstimate} />
      <Process />
      <CustomerReviews />
      <HomepageFaq />
      <WorkshopLocationMap />
      <Contact prefilledQuestion={inquiryPrefill} />
    </>
  );
}
