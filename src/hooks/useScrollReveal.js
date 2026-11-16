import { useEffect, useRef } from 'react';

/**
 * Custom hook to reveal elements smoothly on scroll using IntersectionObserver.
 * @param {Object} options
 * @param {number} options.threshold
 * @param {string} options.rootMargin
 * @returns {React.RefObject}
 */
export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if user prefers reduced motion or if IntersectionObserver is unsupported
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal-active');
      return;
    }

    // Immediate check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
      el.classList.add('reveal-active');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px 0px 50px 0px'
      }
    );

    observer.observe(el);

    // Safety fallback timer: Ensure content is never permanently hidden
    const safetyTimer = setTimeout(() => {
      if (el) {
        el.classList.add('reveal-active');
      }
    }, 450);

    return () => {
      clearTimeout(safetyTimer);
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return elementRef;
}
