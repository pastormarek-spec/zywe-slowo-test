# Aplikacja — czytnik PWA studiów biblijnych

Workspace aplikacji-czytnika (React + TS + Vite + Tailwind + vite-plugin-pwa).
Czysty czytnik gotowych scenariuszy 3-warstwowych (base ⊆ extended ⊆ advanced): bez kont, bez
backendu, offline po pobraniu modułu językowego, język w URL (`/:lang/...`).

## Wersja testowa (live)
- **https://pastormarek-spec.github.io/zywe-slowo-test/**
- Publikacja na GitHub Pages z gałęzi `gh-pages`. Po zmianach uruchom ponownie:
  ```
  bash deploy.sh        # build z VITE_BASE=/zywe-slowo-test/ + push na gh-pages
  ```
- `base` przy buildzie ustawia zmienna `VITE_BASE` (lokalnie zostaje `/`).

## Status: SZKIELET DZIAŁA ✅ (build + preview OK)
Działający szkielet PWA + seed studium #1 (pl + en). React+TS+Vite+Tailwind+vite-plugin-pwa.

### Uruchomienie
```
cd Aplikacja
npm install
npm run dev       # tryb deweloperski (http://localhost:5173)
npm run build     # produkcja → dist/ (service worker + manifest)
npm run preview   # podgląd builda
```

### Co już jest
- Ekran główny: okienko „na dziś" (playlista YouTube, ukryte offline), kategorie, wyszukiwarka, wybór języka, „Pobierz offline".
- Czytnik: przełącznik 3 poziomów (addytywny), rozwijanie wersetów w miejscu (z `bibles/DEMO.json`), pytania, noty advanced, zastosowanie + wyzwanie.
- Druk/PDF: `window.print()` + `@media print` (drukuje aktualny poziom).
- PWA: manifest, service worker, runtime-cache treści, „Pobierz moduł" rozgrzewa cache; SPA fallback (`_redirects`).
- i18n z `ui.json` (pl/en), język w URL (`/:lang/...`), bez kont i danych użytkownika.
- Konwerter `tools/md2json.py`: `.md` (folder Materiały) → `public/content/{lang}/studies/{id}.json`.

### Do dokończenia (następne kroki)
1. Konwersja pozostałych 34 studiów `.md` → JSON (`python tools/md2json.py "../Materiały/NN-*.md"`) + tłumaczenia EN.
2. Realne przekłady: `bibles/UBG.json` (pl) + `bibles/KJV.json` (en) — podmiana DEMO; ustawić `defaultTranslation` w `langs.json`.
3. Wideo „na dziś": uzupełnić `index.json → featured.youtube.videoIds` (build-time skrypt z YouTube Data API; klucz tylko przy buildzie).
4. Ikony/branding finalne; ewentualny tryb prezentacji (architektura tego nie blokuje).

## Pozostałe decyzje (z rozmowy)
1. **Pipeline treści** — konwersja istniejących 35 studiów `.md` (folder `Materiały/`) → `JSON`
   wg schematu aplikacji (`/content/{lang}/studies/{id}.json`).
2. **Przekłady Biblii** — placeholder PD (`bibles/DEMO.json`) i docelowe przekłady pl/en
   (klucz: `osis`).
3. **Wideo „na dziś"** — realny `playlistId` + `videoIds` kanału „Uwielbienie z Tekstem"
   (nie zmyślam ID — czekam na link).
4. **Hosting** — wpływa na `base` w Vite (GitHub Pages = podścieżka vs Netlify/Vercel/Cloudflare
   = root).
5. **Nazwa aplikacji, ikona, podpis wydawcy** (ADS — dyskretnie).

## Docelowa struktura treści (wg briefu)
```
public/content/langs.json
public/content/{lang}/index.json
public/content/{lang}/studies/{id}.json
public/content/{lang}/bibles/{translation}.json
public/content/{lang}/ui.json
```

## Zasady twarde
- Prywatność: bez kont, profili, zakładek, notatek; bez analityki śledzącej.
- i18n: wszystkie napisy z `ui.json` (zero tekstów na sztywno); gotowość na RTL.
- Wersety: tylko odnośniki w studium; treść z pliku przekładu po `osis`.
- Dodanie języka = dodanie folderu treści, bez zmian w kodzie.
