import type { Bible, IndexFile, LangsFile, Study, Ui } from './types'

const BASE = import.meta.env.BASE_URL // np. '/'
const cache = new Map<string, unknown>()

async function getJSON<T>(path: string): Promise<T> {
  const url = `${BASE}content/${path}`.replace(/\/{2,}/g, '/')
  if (cache.has(url)) return cache.get(url) as T
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Nie udało się wczytać: ${url} (${res.status})`)
  const data = (await res.json()) as T
  cache.set(url, data)
  return data
}

export const loadLangs = () => getJSON<LangsFile>('langs.json')
export const loadIndex = (lang: string) => getJSON<IndexFile>(`${lang}/index.json`)
export const loadUi = (lang: string) => getJSON<Ui>(`${lang}/ui.json`)
export const loadStudy = (lang: string, id: string) => getJSON<Study>(`${lang}/studies/${id}.json`)
export const loadBible = (lang: string, translation: string) =>
  getJSON<Bible>(`${lang}/bibles/${translation}.json`)

/** Pobiera cały moduł językowy do cache (service worker zachowa go offline). */
export async function downloadModule(lang: string, onProgress?: (done: number, total: number) => void) {
  const idx = await loadIndex(lang)
  const langs = await loadLangs()
  const meta = langs.languages.find((l) => l.code === lang)
  const translation = meta?.defaultTranslation || 'DEMO'
  const tasks: Promise<unknown>[] = [
    loadUi(lang),
    loadBible(lang, translation),
    ...idx.studies.map((s) => loadStudy(lang, s.id))
  ]
  let done = 0
  const total = tasks.length
  await Promise.all(
    tasks.map((t) =>
      t.then((r) => {
        done += 1
        onProgress?.(done, total)
        return r
      })
    )
  )
  return { lang, total }
}
