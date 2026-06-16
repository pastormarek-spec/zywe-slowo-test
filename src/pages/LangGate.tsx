import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadLangs } from '../content'
import type { LangMeta } from '../types'

export function LangGate() {
  const [langs, setLangs] = useState<LangMeta[]>([])
  useEffect(() => {
    loadLangs().then((l) => setLangs(l.languages)).catch(() => setLangs([]))
  }, [])

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 gap-6">
      <div className="flex items-center gap-3">
        <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-brand dark:text-brand-light">Studium Biblii</h1>
      </div>
      <p className="text-slate-500">Wybierz język · Choose a language</p>
      <div className="flex gap-3">
        {langs.map((l) => (
          <Link
            key={l.code}
            to={`/${l.code}`}
            className="rounded-xl border border-slate-300 dark:border-slate-600 px-6 py-3 hover:border-brand hover:shadow-sm"
          >
            {l.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
