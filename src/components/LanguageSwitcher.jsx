import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher({
  variant = "dropdown",
  className = "",
  onSelectLanguage
}) {
  const { language, setLanguage, languages, currentMeta, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Handle focus when menu opens
  useEffect(() => {
    if (isOpen) {
      const activeIdx = languages.findIndex((l) => l.code === language);
      const targetIdx = activeIdx >= 0 ? activeIdx : 0;
      setFocusedIndex(targetIdx);
      setTimeout(() => {
        if (optionRefs.current[targetIdx]) {
          optionRefs.current[targetIdx].focus();
        }
      }, 50);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, language, languages]);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
    setFocusedIndex(-1);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
    if (onSelectLanguage) {
      onSelectLanguage(code);
    }
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (e, idx) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % languages.length;
      setFocusedIndex(nextIdx);
      optionRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + languages.length) % languages.length;
      setFocusedIndex(prevIdx);
      optionRefs.current[prevIdx]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusedIndex(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = languages.length - 1;
      setFocusedIndex(lastIdx);
      optionRefs.current[lastIdx]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(languages[idx].code);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  // Variant: Mobile Pills / Segmented Buttons
  if (variant === "pills") {
    return (
      <div
        className={`mobile-lang-pills-container ${className}`}
        role="group"
        aria-label={t("nav.selectLanguage", {}, "Select Language")}
      >
        <div className="mobile-lang-pills">
          {languages.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`lang-pill ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(lang.code)}
                aria-pressed={isActive}
                aria-label={lang.ariaLabel}
              >
                <span className="lang-pill-native">{lang.nativeLabel}</span>
                {lang.code !== "en" && (
                  <span className="lang-pill-code">({lang.flag})</span>
                )}
                {isActive && <Check size={14} className="lang-pill-check" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Variant: Standard Dropdown (Navbar Desktop / Modal header)
  return (
    <div
      ref={wrapperRef}
      className={`lang-selector-wrapper ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`lang-selector-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={t("nav.selectLanguage", {}, "Select Language")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="lang-dropdown-menu"
      >
        <Globe size={15} className="lang-globe-icon" aria-hidden="true" />
        <span className="lang-current-label">
          {currentMeta.nativeLabel}
        </span>
        <ChevronDown
          size={14}
          className={`lang-chevron ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="lang-dropdown-menu"
          className="lang-dropdown-menu"
          role="listbox"
          aria-label={t("nav.selectLanguage", {}, "Select Language")}
        >
          {languages.map((lang, idx) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                ref={(el) => (optionRefs.current[idx] = el)}
                type="button"
                role="option"
                id={`lang-opt-${lang.code}`}
                aria-selected={isActive}
                className={`lang-option ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(lang.code)}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                tabIndex={focusedIndex === idx ? 0 : -1}
              >
                <div className="lang-opt-content">
                  <span className="lang-opt-native">{lang.nativeLabel}</span>
                  {lang.code !== "en" && (
                    <span className="lang-opt-latin">({lang.label})</span>
                  )}
                </div>
                {isActive && <Check size={14} className="text-yellow" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
