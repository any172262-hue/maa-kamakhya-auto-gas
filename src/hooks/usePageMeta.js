import { useEffect } from 'react';

/**
 * Updates document title, meta descriptions, Open Graph, and Twitter Card tags dynamically per page.
 * @param {Object} options
 * @param {string} options.title - Document title
 * @param {string} options.description - Meta description
 * @param {string} [options.canonical] - Optional canonical URL path
 * @param {string} [options.image] - Optional preview image URL
 */
export function usePageMeta({ title, description, canonical, image }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to get or create a meta tag
    const setMeta = (attribute, name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Update Meta Description
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    // 3. Update OG & Twitter Titles
    if (title) {
      setMeta('property', 'og:title', title);
      setMeta('name', 'twitter:title', title);
    }

    // 4. Update Canonical and OG:URL
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonical);
      setMeta('property', 'og:url', canonical);
    }

    // 5. Update Preview Image if provided
    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    }
  }, [title, description, canonical, image]);
}
