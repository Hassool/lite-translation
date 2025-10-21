import { useTranslation } from '../src/TranslationProvider';
import LangSwitcher from '../components/LangSwitcher';
import Link from 'next/link';
import Card from '../components/Card';

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
            <h2 className="section-title">{t('about.features.title')}</h2>
            <ul className="feature-list">
              {t('about.features.list', []).map((feature, index) => (
                <li key={index}>{feature}</li>
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


      <footer className="footer">
        <div className="container">
          <p>{t('home.footer')}</p>
        </div>
      </footer>
    </div>
  );
}