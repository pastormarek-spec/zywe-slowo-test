import { useI18n } from '../i18n'

export function About() {
  const { t } = useI18n()
  return (
    <div className="prose-slate">
      <h1 className="text-xl font-semibold mb-3">{t('about.title', 'O aplikacji')}</h1>
      <p className="study-prose text-slate-700 dark:text-slate-200">{t('about.body')}</p>
      <p className="mt-3 text-sm text-slate-500">{t('about.privacy')}</p>
      <p className="mt-6 text-sm text-slate-400">{t('about.publisher')}</p>
    </div>
  )
}
