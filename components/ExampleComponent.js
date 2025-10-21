import { useTranslation } from "@/src/TranslationProvider";


export default function ExampleComponent() {
  const { t } = useTranslation();
  return <p>Example: {t('x.greeting')}</p>;
}
