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

  // 🔹 Load translations (with memory caching)
  const loadTranslations = useCallback(async (language) => {
    setIsLoading(true);

    if (TRANSLATION_CONFIG.ENABLE_CACHING && translationCache[language]) {
      setTranslations(translationCache[language]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${TRANSLATION_CONFIG.API_ENDPOINT}?lang=${language}`);
      if (!res.ok) throw new Error(`Failed to fetch translations: ${res.status}`);
      const data = await res.json();

      if (TRANSLATION_CONFIG.ENABLE_CACHING) {
        setTranslationCache(prev => ({ ...prev, [language]: data }));
      }

      setTranslations(data);
    } catch (e) {
      console.error('Translation load error:', e);
      const fallback = Object.keys(modules).reduce((acc, key) => {
        acc[key] = modules[key].default;
        return acc;
      }, {});
      setTranslations(fallback);
    } finally {
      setIsLoading(false);
    }
  }, [translationCache]);

  // 🔹 Change language instantly (fix: wait for load to complete)
  const changeLanguage = useCallback(async (newLang) => {
    if (!TRANSLATION_CONFIG.AVAILABLE_LANGUAGES.includes(newLang)) {
      console.warn(`Language "${newLang}" is not available. Using default.`);
      newLang = TRANSLATION_CONFIG.DEFAULT_LANGUAGE;
    }

    if (newLang === lang) return;

    setIsLoading(true);
    await loadTranslations(newLang); 
    setLang(newLang);               

    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      const isRTL = TRANSLATION_CONFIG.RTL_LANGUAGES.includes(newLang);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.classList.toggle('rtl', isRTL);
    }

    setIsLoading(false);
  }, [lang, loadTranslations]);

  useEffect(() => {
    const storedLang =
      typeof window !== 'undefined'
        ? localStorage.getItem('lang') || TRANSLATION_CONFIG.DEFAULT_LANGUAGE
        : TRANSLATION_CONFIG.DEFAULT_LANGUAGE;

    setLang(storedLang);
    document.documentElement.lang = storedLang;
    const isRTL = TRANSLATION_CONFIG.RTL_LANGUAGES.includes(storedLang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', isRTL);

    loadTranslations(storedLang);
  }, [loadTranslations]);

  // 🔹 Translation function
  const t = useCallback((key, defaultValue = key) => {
    if (isLoading) return defaultValue;
    const getValue = (obj) => key.split('.').reduce((acc, k) => acc?.[k], obj);
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
      {isLoading ? (
        <div className="translation-loader">
          <div className="spinner"></div>
          <p>Loading translations...</p>
        </div>
      ) : (
        children
      )}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
}
