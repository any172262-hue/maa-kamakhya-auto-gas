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
import HomepageFaq from '../sections/HomepageFaq';
import CTA from '../sections/CTA';
import WorkshopLocationMap from '../sections/WorkshopLocationMap';
import Contact from '../sections/Contact';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage({ onNavigate }) {
  usePageMeta({
    title: "Maa Kamakhya Auto Gas | CNG, LPG and Auto Gas Services",
    description: "Explore CNG and LPG services at Maa Kamakhya Auto Gas, including auto gas filling, gas kit installation, vehicle gas conversion, repair and maintenance.",
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
      <Hero onNavigate={onNavigate} />
      <StatutoryDetails />
      <TrustIndicators />
      <WhyChooseUs />
      <Services onSelectService={handleSelectService} onNavigate={onNavigate} />
      <Benefits />
      <SavingsCalculator onApplyEstimate={handleApplyEstimate} />
      <Compatibility />
      <Process />
      <HomepageFaq />
      <CTA />
      <WorkshopLocationMap />
      <Contact prefilledQuestion={inquiryPrefill} />
    </>
  );
}
