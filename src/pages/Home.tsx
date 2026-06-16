import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { loadIndex } from '../content'
import { FeaturedVideo } from '../components/FeaturedVideo'
import { StudyCard } from '../components/StudyCard'
import { ContactForm } from '../components/ContactForm'
import type { IndexFile } from '../types'

// Akcent koloru na blok: tło panelu nawiązuje do koloru bloku (na ciemnym tle).
const BLOCK_ACCENTS = [
  { bar: 'bg-sky-400',     chip: 'bg-sky-500/15 text-sky-200 ring-sky-500/30',             panel: 'bg-sky-500/10 border-sky-500/25',         tile: 'bg-sky-50 border-sky-200 hover:border-sky-400' },
  { bar: 'bg-emerald-400', chip: 'bg-emerald-500/15 text-emerald-200 ring-emerald-500/30', panel: 'bg-emerald-500/10 border-emerald-500/25', tile: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400' },
  { bar: 'bg-amber-400',   chip: 'bg-amber-500/15 text-amber-200 ring-amber-500/30',       panel: 'bg-amber-500/10 border-amber-500/25',     tile: 'bg-amber-50 border-amber-200 hover:border-amber-400' },
  { bar: 'bg-violet-400',  chip: 'bg-violet-500/15 text-violet-200 ring-violet-500/30',     panel: 'bg-violet-500/10 border-violet-500/25',   tile: 'bg-violet-50 border-violet-200 hover:border-violet-400' },
  { bar: 'bg-rose-400',    chip: 'bg-rose-500/15 text-rose-200 ring-rose-500/30',          panel: 'bg-rose-500/10 border-rose-500/25',       tile: 'bg-rose-50 border-rose-200 hover:border-rose-400' },
]

export function Home() {
  const { lang, t } = useI18n()
  const [idx, setIdx] = useState<IndexFile | null>(null)

  useEffect(() => {
    setIdx(null)
    loadIndex(lang).then(setIdx).catch(() => setIdx(null))
  }, [lang])

  if (!idx) return <p className="text-slate-400">{t('common.loading', '…')}</p>

  const series = [...idx.series].sort((a, b) => a.order - b.order)
  const studiesIn = (sid: string) =>
    idx.studies.filter((s) => s.seriesId === sid).sort((a, b) => a.order - b.order)
  const known = new Set(series.map((s) => s.id))
  const orphans = idx.studies.filter((s) => !s.seriesId || !known.has(s.seriesId))

  const yt = idx.featured?.youtube

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-[#102a45] to-brand px-6 py-7 text-center shadow-lg">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
          {t('home.projectTitle', 'Żywe Słowo')} <span className="font-normal">- {t('home.projectTagline', 'droga do domu Ojca')}</span>
        </h1>
      </div>

      <FeaturedVideo playlistId={yt?.playlistId} videoIds={yt?.videoIds} />

      <div className="space-y-6">
        {series.map((s, i) => {
          const list = studiesIn(s.id)
          if (list.length === 0) return null
          const a = BLOCK_ACCENTS[i % BLOCK_ACCENTS.length]
          return (
            <section key={s.id} id={s.id} className={`scroll-mt-20 rounded-xl border p-4 ${a.panel}`}>
              <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                <span className={`h-7 w-1.5 rounded-full ${a.bar}`} aria-hidden />
                <h2 className="text-xl font-bold tracking-tight text-slate-100">{s.title}</h2>
                <span className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${a.chip}`}>
                  {list.length} {t('home.topicsCount', 'tematów')}
                </span>
              </div>
              <div className="mt-3 space-y-1.5">
                {list.map((st) => <StudyCard key={st.id} study={st} tile={a.tile} />)}
              </div>
            </section>
          )
        })}

        {orphans.length > 0 && (
          <section className="rounded-xl border border-slate-500/25 bg-slate-500/10 p-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-2">
              <span className="h-7 w-1.5 rounded-full bg-slate-400" aria-hidden />
              <h2 className="text-xl font-bold tracking-tight text-slate-100">{t('home.topic', 'Różne tematy')}</h2>
              <span className="ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 bg-slate-500/15 text-slate-300 ring-slate-500/30">
                {orphans.length} {t('home.topicsCount', 'tematów')}
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {orphans.map((st) => <StudyCard key={st.id} study={st} />)}
            </div>
          </section>
        )}
      </div>

      <ContactForm />

      <p className="no-print mt-8 text-center text-xs text-slate-400">
        <a href="https://adwent.pl" target="_blank" rel="noopener noreferrer" className="hover:text-brand-light">
          {t('contact.who', 'Kim jesteśmy?')}
        </a>
        <span className="mx-2" aria-hidden>·</span>
        <span>{t('about.publisher')}</span>
      </p>
    </div>
  )
}
