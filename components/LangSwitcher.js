import { useTranslation } from '../src/TranslationProvider';

export default function LangSwitcher() {
  const { lang, changeLanguage, availableLanguages, languageNames } = useTranslation();

  return (
    <div className="lang-switcher">
      <select 
        value={lang} 
        onChange={(e) => changeLanguage(e.target.value)}
        className="lang-select"
        aria-label="Select language"
      >
        {availableLanguages.map(langCode => (
          <option key={langCode} value={langCode}>
            {languageNames[langCode] || langCode.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}