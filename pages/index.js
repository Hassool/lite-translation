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
            <h1 className="brand">{t('x.brand')}</h1>
            <LangSwitcher />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <section className="hero">
            <h2 className="hero-title">{t('home.title')}</h2>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            <p className="hero-description">{t('home.description')}</p>
          </section>

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

          <section className="cta">
            <Link href="/about" className="btn btn-primary">
              {t('home.cta.learnMore')} →
            </Link>
            <a 
              href="https://github.com/yourusername/lite-translation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t('home.cta.viewGithub')}
            </a>
          </section>

          <section className="demo-info">
            <div className="info-card">
              <p><strong>{t('home.demo.currentLanguage')}:</strong> {lang.toUpperCase()}</p>
              <p><strong>{t('home.demo.direction')}:</strong> {isRTL ? 'RTL' : 'LTR'}</p>
              <p><strong>{t('home.demo.status')}:</strong> ✅ {t('home.demo.active')}</p>
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