export type Level = 'base' | 'extended' | 'advanced'
export type Category = 'basic_systematic' | 'basic_practical' | 'series' | 'topic'

export interface PassageRef { osis: string; ref: string }
export interface Question { id: string; text: string }
export interface OriginalForm { lang: string; text: string; translit?: string }

export interface PassageItem {
  type: 'passage'
  level: Level
  id: string
  passage: PassageRef[]
  comment: string
  questions: Question[]
}
export interface NoteItem {
  type: 'note'
  level: Level
  id: string
  noteType: 'syntax' | 'verb' | 'background' | 'textual' | 'term' | 'variant' | 'worship' | 'other'
  label: string
  content: string
  original?: OriginalForm[]
  questions?: Question[]
}
export type Item = PassageItem | NoteItem

export interface Section { id: string; heading: string; items: Item[] }

export interface Study {
  id: string
  lang: string
  title: string
  category: Category
  seriesId: string | null
  order: number
  summary: string
  minutes: { base: number; extended: number }
  tags: string[]
  sections: Section[]
  application: { text: string; challenge: string }
  meta?: Record<string, unknown>
}

export interface StudyEntry {
  id: string
  title: string
  category: Category
  seriesId: string | null
  order: number
  summary: string
  minutes: { base: number; extended: number }
  tags: string[]
  refs: string[]
}
export interface SeriesMeta { id: string; title: string; order: number }
export interface IndexFile {
  lang: string
  featured?: { youtube?: { playlistId?: string; videoIds?: string[] } }
  series: SeriesMeta[]
  studies: StudyEntry[]
}

export interface LangMeta { code: string; name: string; dir?: 'ltr' | 'rtl'; defaultTranslation: string; moduleSizeKB?: number }
export interface LangsFile { languages: LangMeta[]; default: string }

export interface Bible { translation: string; name: string; lang: string; license: string; verses: Record<string, string> }

// ui.json - luźna struktura, dostęp przez ścieżkę kropkową
export type Ui = Record<string, any>
