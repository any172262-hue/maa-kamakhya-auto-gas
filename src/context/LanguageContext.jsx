import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../locales/index.js";

const STORAGE_KEY = "mka_language";
const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((item) => item.code === saved)) {
      return saved;
    }
  } catch (err) {
    console.warn("Could not read language from localStorage:", err);
  }
  return DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((newLang) => {
    if (!SUPPORTED_LANGUAGES.some((item) => item.code === newLang)) {
      console.warn(`Unsupported language code: ${newLang}`);
      return;
    }
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (err) {
      console.warn("Could not save language to localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        if (SUPPORTED_LANGUAGES.some((item) => item.code === event.newValue)) {
          setLanguageState(event.newValue);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const t = useCallback(
    (keyPath, params = {}, fallback = "") => {
      if (!keyPath || typeof keyPath !== "string") return fallback || "";

      const keys = keyPath.split(".");
      let current = translations[language];

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k];
        } else {
          current = undefined;
          break;
        }
      }

      // Fallback to default language (en) if not found in active language
      if (current === undefined && language !== DEFAULT_LANGUAGE) {
        let fallbackCurrent = translations[DEFAULT_LANGUAGE];
        for (const k of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === "object" && k in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[k];
          } else {
            fallbackCurrent = undefined;
            break;
          }
        }
        current = fallbackCurrent;
      }

      if (current === undefined || current === null) {
        return fallback || keyPath;
      }

      // If resolved value is string and has params, interpolate {param}
      if (typeof current === "string") {
        return current.replace(/\{(\w+)\}/g, (_, token) => {
          return params[token] !== undefined ? String(params[token]) : `{${token}}`;
        });
      }

      return current;
    },
    [language]
  );

  const currentMeta = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((item) => item.code === language) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
      currentMeta,
      isRTL: false
    }),
    [language, setLanguage, t, currentMeta]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
