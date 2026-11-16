import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles, Wrench, Shield, MapPin } from 'lucide-react';
import { searchWebsite } from '../data/searchIndex';
import { useLanguage } from '../context/LanguageContext';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const matched = searchWebsite(query);
    setResults(matched);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        if (results.length > 0 && results[selectedIndex]) {
          e.preventDefault();
          handleResultClick(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleResultClick = (item) => {
    onClose();
    if (onSelectResult) {
      onSelectResult(item);
    } else if (item.href) {
      const targetEl = document.querySelector(item.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = item.href;
      }
    }
  };

  const handleQuickSuggestion = (text) => {
    setQuery(text);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="search-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t('search.title', {}, 'Website Search Dialog')}
    >
      <div className="search-modal-container card-navy">
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-icon-decor text-yellow" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder', {}, 'Search services, kits, car models, or workshop address...')}
            className="search-input-field"
            aria-label={t('search.placeholder', {}, 'Search query')}
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="search-clear-btn"
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="search-close-btn"
            aria-label={t('common.close', {}, 'Close search dialog')}
          >
            <X size={20} className="search-close-icon" />
          </button>
        </div>

        {/* Results Area */}
        <div className="search-results-area" ref={resultsContainerRef}>
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="search-results-list" role="listbox">
                <div className="results-count-banner">
                  {t('search.resultsCount', { count: results.length }, `Found ${results.length} verified matching results:`)}
                </div>
                {results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      className={`search-result-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleResultClick(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="result-item-header">
                        <span className="result-category-badge">{item.category}</span>
                        <span className="result-enter-hint">
                          {isSelected && <CornerDownLeft size={13} />}
                        </span>
                      </div>
                      <h4 className="result-item-title">{item.title}</h4>
                      <p className="result-item-desc">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="search-empty-state">
                <div className="empty-search-icon">
                  <Search size={32} className="text-yellow" />
                </div>
                <h4 className="empty-search-title">
                  {t('search.noResults', { query }, `No results found for "${query}"`)}
                </h4>
                <div className="search-suggestions-row">
                  <button type="button" onClick={() => handleQuickSuggestion('Sequential Kit')} className="suggestion-pill">Sequential Kit</button>
                  <button type="button" onClick={() => handleQuickSuggestion('Hydro Testing')} className="suggestion-pill">Hydro-Testing</button>
                  <button type="button" onClick={() => handleQuickSuggestion('Calculator')} className="suggestion-pill">Fuel Calculator</button>
                  <button type="button" onClick={() => handleQuickSuggestion('Garchuk')} className="suggestion-pill">Workshop Location</button>
                </div>
              </div>
            )
          ) : (
            <div className="search-initial-suggestions">
              <span className="suggestions-label">{t('search.quickCategories', {}, 'Popular Searches & Quick Navigation:')}</span>
              <div className="suggestions-grid">
                <button type="button" onClick={() => handleQuickSuggestion('Sequential Kit Installation')} className="suggestion-card">
                  <Wrench size={16} className="text-yellow" />
                  <span>Sequential Kit Installation</span>
                </button>
                <button type="button" onClick={() => handleQuickSuggestion('Fuel Savings Calculator')} className="suggestion-card">
                  <Sparkles size={16} className="text-yellow" />
                  <span>Fuel Savings Calculator</span>
                </button>
                <button type="button" onClick={() => handleQuickSuggestion('Cylinder Hydro-Testing')} className="suggestion-card">
                  <Shield size={16} className="text-yellow" />
                  <span>Cylinder Hydro-Testing</span>
                </button>
                <button type="button" onClick={() => handleQuickSuggestion('Workshop Location')} className="suggestion-card">
                  <MapPin size={16} className="text-yellow" />
                  <span>NH 37 Garchuk Workshop & Directions</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="search-modal-footer">
          <span className="search-brand-note">Maa Kamakhya Auto Gas • Search Services & Capabilities</span>
        </div>
      </div>
    </div>
  );
}
