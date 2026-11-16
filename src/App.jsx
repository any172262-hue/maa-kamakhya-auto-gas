import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase().trim();
      const hash = window.location.hash.toLowerCase().trim();
      const full = pathname + hash;

      // 1. Dedicated Service Pages
      if (full.includes('cng-services')) {
        setCurrentPage('service-cng-services');
      } else if (full.includes('lpg-services')) {
        setCurrentPage('service-lpg-services');
      } else if (full.includes('auto-gas-filling')) {
        setCurrentPage('service-auto-gas-filling');
      } else if (full.includes('gas-kit-installation')) {
        setCurrentPage('service-gas-kit-installation');
      } else if (full.includes('vehicle-gas-conversion')) {
        setCurrentPage('service-vehicle-gas-conversion');
      } else if (full.includes('gas-kit-repair-maintenance') || full.includes('repair-maintenance')) {
        setCurrentPage('service-gas-kit-repair-maintenance');
      }
      // 2. Legal Pages
      else if (pathname.endsWith('/privacy-policy') || hash === '#privacy-policy' || hash === '#/privacy-policy') {
        setCurrentPage('privacy');
      } else if (pathname.endsWith('/terms-conditions') || hash === '#terms-conditions' || hash === '#/terms-conditions') {
        setCurrentPage('terms');
      }
      // 3. About & Contact Dedicated Views
      else if (pathname.endsWith('/about') || pathname.endsWith('/about/') || hash === '#about' || hash === '#/about') {
        setCurrentPage('about');
      } else if (pathname.endsWith('/contact-page') || hash === '#/contact' || hash === '#contact-page') {
        setCurrentPage('contact');
      } else {
        if (hash === '#404' || hash === '#/404') {
          window.location.hash = '';
        }
        setCurrentPage('home');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (pageName) => {
    if (pageName === 'privacy') {
      window.location.hash = '#privacy-policy';
      setCurrentPage('privacy');
    } else if (pageName === 'terms') {
      window.location.hash = '#terms-conditions';
      setCurrentPage('terms');
    } else if (pageName === 'about') {
      window.location.hash = '#/about';
      setCurrentPage('about');
    } else if (pageName === 'contact') {
      window.location.hash = '#/contact';
      setCurrentPage('contact');
    } else if (pageName.startsWith('service-')) {
      const slug = pageName.replace('service-', '');
      window.location.hash = `#/services/${slug}`;
      setCurrentPage(pageName);
    } else {
      window.location.hash = '';
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <MainLayout onNavigateLegal={navigateTo}>
        <Suspense fallback={<div className="legal-loading-spinner" style={{ minHeight: '60vh' }} />}>
          {currentPage === 'privacy' && <PrivacyPolicy onBackToHome={() => navigateTo('home')} />}
          {currentPage === 'terms' && <TermsConditions onBackToHome={() => navigateTo('home')} />}
          {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
          {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
          {currentPage.startsWith('service-') && (
            <ServiceDetailPage 
              serviceSlug={currentPage.replace('service-', '')} 
              onNavigate={navigateTo} 
            />
          )}
          {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        </Suspense>
      </MainLayout>
    </LanguageProvider>
  );
}
