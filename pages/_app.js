import { TranslationProvider } from '../src/TranslationProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  );
}
