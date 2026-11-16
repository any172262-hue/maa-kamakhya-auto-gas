import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase().trim();
      const hash = window.location.hash.toLowerCase().trim();

      // Match legal pages
      if (pathname.endsWith('/privacy-policy') || hash === '#privacy-policy' || hash === '#/privacy-policy') {
        setCurrentPage('privacy');
      } else if (pathname.endsWith('/terms-conditions') || hash === '#terms-conditions' || hash === '#/terms-conditions') {
        setCurrentPage('terms');
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
    } else {
      window.location.hash = '';
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <MainLayout onNavigateLegal={navigateTo}>
        {currentPage === 'privacy' && <PrivacyPolicy onBackToHome={() => navigateTo('home')} />}
        {currentPage === 'terms' && <TermsConditions onBackToHome={() => navigateTo('home')} />}
        {currentPage === 'home' && <HomePage />}
      </MainLayout>
    </LanguageProvider>
  );
}
