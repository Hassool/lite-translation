import { useTranslation } from '../src/TranslationProvider';
import LangSwitcher from '../components/LangSwitcher';
import Link from 'next/link';

export default function About() {
  const { t, isRTL } = useTranslation();

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="brand-link">
              <img src="/favicon.ico" alt="Logo" className="brand-icon" />
              <h1 className="brand">{t('x.brand')}</h1>
            </Link>

            <LangSwitcher />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container about-container">
          <section className="about-hero">
            <h1 className="page-title">{t('about.title')}</h1>
            <p className="page-subtitle">{t('about.content')}</p>
          </section>

          <section className="about-section">
            <h2 className="section-title">{t('about.mission.title')}</h2>
            <p className="section-text">{t('about.mission.description')}</p>
          </section>

          <section className="about-section">
            <h2 className="section-title">{t('about.why.title')}</h2>
            <div className="reason-grid">
              {t('about.why.reasons', []).map((reason, index) => (
                <div key={index} className="reason-card">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">{t('about.features.title')}</h2>
            <ul className="feature-list">
              {t('about.features.list', []).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="about-section">
            <h2 className="section-title">{t('about.usage.title')}</h2>
            <ul className="usage-list">
              {t('about.usage.items', []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="about-cta">
            <a 
              href="https://github.com/Hassool/lite-translation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              {t('about.getStarted')}
            </a>
            <Link href="/" className="btn btn-secondary">
              ← {t('about.backToHome')}
            </Link>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{t('home.footer')}</p>
        </div>
      </footer>
    </div>
  );
}