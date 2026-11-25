import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Search,
  ChevronRight, 
  Clock, 
  Globe
} from 'lucide-react';
import { navLinks } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';
import Logo from './Logo';

export default function Navbar({ onNavigateLegal, onOpenSearch }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to get translated nav title
  const getNavLinkName = (link, isShort = false) => {
    switch (link.href) {
      case '#benefits':
        return t('nav.benefits', {}, link.name);
      case '#services':
        return t('nav.services', {}, link.name);
      case '#calculator':
        return isShort && link.shortName ? t('nav.calculator', {}, link.shortName) : t('nav.calculator', {}, link.name);
      case '#process':
        return isShort && link.shortName ? t('nav.process', {}, link.shortName) : t('nav.process', {}, link.name);
      case '#contact':
        return t('nav.contact', {}, link.name);
      default:
        return link.name;
    }
  };

  // Scroll listener for sticky navbar styling and active section detection (Scroll Spy)
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let lastSection = 'hero';
    const sectionIds = ['hero', 'benefits', 'services', 'calculator', 'process', 'location', 'contact'];

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 20;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      // Scroll Spy detection
      const scrollPosition = scrollY + 140;
      let matchedSection = 'hero';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          matchedSection = sectionIds[i];
          break;
        }
      }

      if (matchedSection !== lastSection) {
        lastSection = matchedSection;
        setActiveSection(matchedSection);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile drawer when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e) => {
      // If the clicked element is no longer connected to DOM (e.g. icon swapped on click), ignore
      if (e.target && !e.target.isConnected) return;

      const drawerEl = document.querySelector('.nav-mobile-drawer');
      const toggleEl = document.querySelector('.nav-mobile-toggle');

      if (drawerEl && (drawerEl === e.target || drawerEl.contains(e.target))) return;
      if (toggleEl && (toggleEl === e.target || toggleEl.contains(e.target))) return;
      if (e.target.closest && (e.target.closest('.nav-mobile-drawer') || e.target.closest('.nav-mobile-toggle'))) return;

      setMobileMenuOpen(false);
    };

    // Attach after current event dispatch completes to avoid capturing the opening click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Global shortcut (Ctrl+K or Cmd+K) to open site search
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onOpenSearch) onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [onOpenSearch]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMobileMenu();
    if (onNavigateLegal) onNavigateLegal('home');
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 78;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Authoritative Typography */}
        <a 
          href="#hero" 
          className="navbar-brand" 
          aria-label={t('common.brandName', {}, 'Maa Kamakhya Auto Gas Home')}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <div className="navbar-logo-frame">
            <Logo height={44} className="navbar-brand-logo" priority={true} />
          </div>
          <div className="navbar-brand-text">
            <div className="brand-name-row">
              <span className="brand-name-white">MAA KAMAKHYA</span>
              <span className="brand-name-gold">AUTO GAS</span>
            </div>
            <div className="brand-meta-row">
              <span className="brand-meta-text">{t('hero.badge', {}, 'CNG & Auto Gas Workshop • Guwahati')}</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Main Navigation">
          <ul className="nav-menu-list">
            {navLinks.map((link) => {
              const linkSectionId = link.href.replace('#', '');
              const isActive = activeSection === linkSectionId;
              const linkDisplay = getNavLinkName(link, true);

              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>{linkDisplay}</span>
                    {isActive && <span className="nav-link-indicator" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions & CTA Buttons */}
        <div className="nav-desktop-actions">
          {/* Site Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="nav-search-btn"
            aria-label={t('nav.openSearch', {}, 'Search website content')}
            title={t('nav.openSearch', {}, 'Search services & information')}
          >
            <Search size={15} className="text-yellow" />
            <span className="search-btn-label">{t('nav.search', {}, 'Search')}</span>
          </button>

          {/* Language Selector Dropdown */}
          <LanguageSwitcher variant="dropdown" />

          <div className="nav-actions-divider" />

          {/* Quick Call Button */}
          <Button
            variant="call"
            size="md"
            href={siteConfig.phoneTel}
            icon={Phone}
            ariaLabel={`Call Maa Kamakhya Auto Gas at ${siteConfig.phone}`}
            className="nav-btn-call"
          >
            {t('common.call', {}, 'Call')}
          </Button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="nav-mobile-buttons">
          <button
            type="button"
            className="nav-mobile-icon-btn nav-mobile-search-btn"
            onClick={onOpenSearch}
            aria-label={t('nav.openSearch', {}, 'Search site')}
            title="Search site"
          >
            <Search size={17} className="text-yellow" />
          </button>

          <button
            type="button"
            className={`nav-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('nav.closeMenu', {}, 'Close navigation menu') : t('nav.openMenu', {}, 'Open navigation menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (App Experience) */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <div className="mobile-drawer-content container">
            {/* Mobile App Header Badge */}
            <div className="mobile-drawer-header-card">
              <div className="mobile-drawer-brand">
                <Logo height={42} className="mobile-drawer-logo" />
                <div className="mobile-drawer-titles">
                  <div className="drawer-title-bold">MAA KAMAKHYA AUTO GAS</div>
                  <div className="drawer-title-sub">Auto Gas Workshop • NH 37, Garchuk, Guwahati</div>
                </div>
              </div>
              <div className="mobile-drawer-verified-tag">
                <span>NH 37, Pachim Boragaon, Garchuk</span>
              </div>
            </div>

            {/* Quick Search inside Drawer */}
            <button
              type="button"
              className="mobile-drawer-search-bar"
              onClick={() => {
                closeMobileMenu();
                if (onOpenSearch) onOpenSearch();
              }}
            >
              <Search size={16} className="text-yellow flex-shrink-0" />
              <span className="search-placeholder">{t('search.placeholder', {}, 'Search services, kits, models...')}</span>
              <span className="search-hint-pill">{t('nav.search', {}, 'Search')}</span>
            </button>

            {/* App Nav Tiles with Chevron */}
            <div className="mobile-nav-tiles">
              {navLinks.map((link, idx) => {
                const linkSectionId = link.href.replace('#', '');
                const isActive = activeSection === linkSectionId;
                const linkDisplay = getNavLinkName(link, false);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`mobile-nav-tile ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ animationDelay: `${(idx + 1) * 0.04}s` }}
                  >
                    <div className="tile-label-wrap">
                      <span className="tile-name">{linkDisplay}</span>
                      {link.name === 'Services' && <span className="tile-badge-count">{t('services.filterAll', {}, 'All Services')}</span>}
                    </div>
                    <ChevronRight size={16} className="tile-arrow" />
                  </a>
                );
              })}
            </div>

            {/* Mobile Language Selector */}
            <div className="mobile-lang-row">
              <span className="mobile-lang-label">
                <Globe size={13} className="text-yellow" />
                <span>{t('nav.selectLanguage', {}, 'Language')}:</span>
              </span>
              <LanguageSwitcher variant="pills" />
            </div>

            {/* Mobile Action CTAs */}
            <div className="mobile-actions-stack">
              <Button
                variant="call"
                size="lg"
                href={siteConfig.phoneTel}
                icon={Phone}
                className="w-full"
              >
                {t('common.call', {}, 'Call')} {siteConfig.phoneFormatted}
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                className="w-full"
              >
                {t('common.whatsappChat', {}, 'Chat on WhatsApp')}
              </Button>
            </div>

            <div className="mobile-drawer-timing">
              <Clock size={13} className="text-yellow flex-shrink-0" />
              <span>{t('common.hours', {}, 'NH 37, Garchuk, Guwahati | Enquire for Timings')}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
