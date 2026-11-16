import React, { useState } from 'react';
import Hero from '../sections/Hero';
import StatutoryDetails from '../sections/StatutoryDetails';
import TrustIndicators from '../sections/TrustIndicators';
import Services from '../sections/Services';
import WhyChooseUs from '../sections/WhyChooseUs';
import Benefits from '../sections/Benefits';
import SavingsCalculator from '../sections/SavingsCalculator';
import Compatibility from '../sections/Compatibility';
import Process from '../sections/Process';
import CTA from '../sections/CTA';
import WorkshopLocationMap from '../sections/WorkshopLocationMap';
import Contact from '../sections/Contact';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  usePageMeta({
    title: "Maa Kamakhya Auto Gas | Premium CNG Retrofitment & Automotive Care: Guwahati, Assam",
    description: "Guwahati's government-approved CNG retrofitment and automotive care center on NH 37, Pachim Boragaon, Garchuk. High-performance sequential conversion, certified cylinder hydro-testing, and expert diagnostics.",
    canonical: "https://maakamakhyaautogas.com/"
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
      <Hero />
      <StatutoryDetails />
      <TrustIndicators />
      <WhyChooseUs />
      <Services onSelectService={handleSelectService} />
      <Benefits />
      <SavingsCalculator onApplyEstimate={handleApplyEstimate} />
      <Compatibility />
      <Process />
      <CTA />
      <WorkshopLocationMap />
      <Contact prefilledQuestion={inquiryPrefill} />
    </>
  );
}
