import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { downloadModule } from '../content'

export function Header() {
  const { lang, t } = useI18n()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [dl, setDl] = useState<'idle' | 'busy' | 'done'>('idle')

  function onSearch(e: FormEvent) {
    e.preventDefault()
    if (q.trim()) nav(`/${lang}/search?q=${encodeURIComponent(q.trim())}`)
  }

  async function onDownload() {
    setDl('busy')
    try { await downloadModule(lang); setDl('done') } catch { setDl('idle') }
  }

  const dlLabel = dl === 'busy' ? t('home.downloading', 'Pobieranie…')
    : dl === 'done' ? t('home.offlineReady', 'Dostępne offline')
    : t('home.downloadOffline', 'Pobierz do trybu offline')

  return (
    <header className="no-print border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link
          to={`/${lang}`}
          className="shrink-0 inline-flex items-center justify-center min-w-[10.5rem] rounded-lg bg-brand text-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-brand-light"
        >
          {t('nav.topics', 'Lista tematów')}
        </Link>
        <form onSubmit={onSearch} className="flex-1 min-w-0">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('home.searchPlaceholder', 'Szukaj…')}
            aria-label={t('nav.search', 'Szukaj')}
            className="w-full max-w-[12rem] rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-1.5 text-sm"
          />
        </form>
        <nav className="flex items-center gap-2 text-sm shrink-0">
          <button
            onClick={onDownload}
            disabled={dl !== 'idle'}
            title={dlLabel}
            aria-label={dlLabel}
            className="inline-flex items-center gap-1 rounded-md border border-brand text-brand-light px-2 py-1 text-xs hover:bg-brand/10 disabled:opacity-60"
          >
            <span aria-hidden>{dl === 'done' ? '✓' : '↓'}</span>
            <span className="hidden sm:inline">{dlLabel}</span>
          </button>
          <Link to={`/pl`} className={lang === 'pl' ? 'font-semibold' : 'text-slate-500'}>PL</Link>
          <Link to={`/en`} className={lang === 'en' ? 'font-semibold' : 'text-slate-500'}>EN</Link>
          <Link to={`/${lang}/about`} className="text-slate-500 hover:text-brand" title={t('nav.about')}>?</Link>
        </nav>
      </div>
    </header>
  )
}
