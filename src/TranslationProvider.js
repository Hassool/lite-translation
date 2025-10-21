'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { modules } from './index';
import { TRANSLATION_CONFIG } from './config';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [lang, setLang] = useState(TRANSLATION_CONFIG.DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [translationCache, setTranslationCache] = useState({});

  const loadTranslations = useCallback(async (language) => {
    setIsLoading(true);

    // Check in-memory cache first
    if (TRANSLATION_CONFIG.ENABLE_CACHING && translationCache[language]) {
      setTranslations(translationCache[language]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${TRANSLATION_CONFIG.API_ENDPOINT}?lang=${language}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch translations: ${res.status}`);
      }
      
      const data = await res.json();

      // Store in memory cache
      if (TRANSLATION_CONFIG.ENABLE_CACHING) {
        setTranslationCache(prev => ({
          ...prev,
          [language]: data
        }));
      }
      
      setTranslations(data);
    } catch (e) {
      console.error('Translation load error:', e);
      // Fallback to default module translations
      const fallbackTranslations = Object.keys(modules).reduce((acc, key) => {
        acc[key] = modules[key].default;
        return acc;
      }, {});
      setTranslations(fallbackTranslations);
    } finally {
      setIsLoading(false);
    }
  }, [translationCache]);

  const changeLanguage = useCallback((newLang) => {
    if (!TRANSLATION_CONFIG.AVAILABLE_LANGUAGES.includes(newLang)) {
      console.warn(`Language "${newLang}" is not available. Using default.`);
      newLang = TRANSLATION_CONFIG.DEFAULT_LANGUAGE;
    }

    if (newLang === lang) return;
    
    setLang(newLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      const isRTL = TRANSLATION_CONFIG.RTL_LANGUAGES.includes(newLang);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.classList.toggle('rtl', isRTL);
    }

    loadTranslations(newLang);
  }, [lang, loadTranslations]);

  useEffect(() => {
    const initialLang = TRANSLATION_CONFIG.DEFAULT_LANGUAGE;
    setLang(initialLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = initialLang;
      const isRTL = TRANSLATION_CONFIG.RTL_LANGUAGES.includes(initialLang);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.classList.toggle('rtl', isRTL);
    }

    loadTranslations(initialLang);
  }, [loadTranslations]);

  const t = useCallback((key, defaultValue = key) => {
    if (isLoading) return defaultValue;

    const getValue = (obj) => {
      if (!obj) return null;
      return key.split('.').reduce((acc, k) => acc?.[k], obj);
    };

    return getValue(translations) ?? getValue(modules.x?.default) ?? defaultValue;
  }, [isLoading, translations]);

  const isRTL = TRANSLATION_CONFIG.RTL_LANGUAGES.includes(lang);

  return (
    <TranslationContext.Provider
      value={{
        lang,
        translations,
        isLoading,
        changeLanguage,
        isRTL,
        t,
        availableLanguages: TRANSLATION_CONFIG.AVAILABLE_LANGUAGES,
        languageNames: TRANSLATION_CONFIG.LANGUAGE_NAMES
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}