export const TRANSLATION_CONFIG = {
  // Available languages in your app
  AVAILABLE_LANGUAGES: ['en', 'ar', 'es', 'fr'],
  
  // Default language (fallback)
  DEFAULT_LANGUAGE: 'en',
  
  // Languages that use RTL (Right-to-Left) direction
  RTL_LANGUAGES: ['ar', 'he', 'fa', 'ur'],
  
  // Enable caching for translations
  ENABLE_CACHING: true,
  
  // API endpoint for fetching translations (optional)
  API_ENDPOINT: '/api/translations',
  
  // Language names for the switcher
  LANGUAGE_NAMES: {
    en: 'English',
    ar: 'العربية',
    es: 'Spanish',
    fr: 'French',
  }
};