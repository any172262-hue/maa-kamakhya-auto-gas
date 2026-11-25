import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import SearchModal from '../components/SearchModal';
import MobileBottomNav from '../components/MobileBottomNav';

export default function MainLayout({ children, onNavigateLegal }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="site-wrapper">
      <ScrollProgress />
      <Navbar onNavigateLegal={onNavigateLegal} onOpenSearch={() => setIsSearchOpen(true)} />
      <main id="main-content">
        {children}
      </main>
      <Footer onNavigateLegal={onNavigateLegal} />
      <BackToTop />
      <MobileBottomNav onNavigateLegal={onNavigateLegal} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
