import { useTranslation } from '../src/TranslationProvider';
import Loader from '../components/Loader';
import LangSwitcher from '../components/LangSwitcher';
import Card from '../components/Card';
import Link from 'next/link';

export default function Home() {
  const { t, isLoading, isRTL, lang } = useTranslation();

  if (isLoading) return <Loader />;

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="brand-link">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="brand-icon"
              />
              <h1 className="brand">{t('x.brand')}</h1>
            </Link>
            <LangSwitcher />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero">
            <h1 className="hero-title">{t('home.title')}</h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            <p className="hero-description">{t('home.description')}</p>
          </section>

          {/* Features Grid */}
          <section className="features">
            <Card 
              title={t('home.features.lightweight.title')} 
              content={t('home.features.lightweight.description')}
            />
            <Card
              title={t('home.features.fast.title')} 
              content={t('home.features.fast.description')}
            />
            <Card 
              title={t('home.features.rtl.title')} 
              content={t('home.features.rtl.description')}
            />
          </section>

          {/* Live Demo Card */}
          <section className="demo-section">
            <div className="demo-card">
              <div className="demo-header">
                <div className="demo-badge">
                  <span className="pulse-dot"></span>
                  <span className="badge-text">LIVE DEMO</span>
                </div>
                <h2 className="demo-title">Translation in Action</h2>
              </div>
              
              <div className="demo-grid">
                <div className="demo-item">
                  <div className="demo-label">{t('home.demo.currentLanguage')}</div>
                  <div className="demo-value">{lang.toUpperCase()}</div>
                </div>
                <div className="demo-item">
                  <div className="demo-label">{t('home.demo.direction')}</div>
                  <div className="demo-value">{isRTL ? 'RTL' : 'LTR'}</div>
                </div>
                <div className="demo-item">
                  <div className="demo-label">{t('home.demo.status')}</div>
                  <div className="demo-value status-active">
                    <span className="status-icon">✓</span>
                    {t('home.demo.active')}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-container">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-description">
                Explore the power of lite-translation in your next project
              </p>
              <div className="cta-buttons">
                <a 
                  href="https://github.com/Hassool/lite-translation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                >
                  <span className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('home.cta.viewGithub')}
                </a>
                <Link href="/about" className="btn btn-secondary btn-large">
                  {t('home.cta.learnMore')}
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
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