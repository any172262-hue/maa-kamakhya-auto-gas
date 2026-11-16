import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let currentlyVisible = false;

    const checkVisibility = () => {
      const shouldBeVisible = window.scrollY > 350;
      if (shouldBeVisible !== currentlyVisible) {
        currentlyVisible = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkVisibility();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="back-to-top-btn animate-fade-in"
      aria-label="Scroll back to top of page"
      title="Back to Top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
