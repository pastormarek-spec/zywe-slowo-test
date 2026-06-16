#!/usr/bin/env bash
# Buduje aplikacje i publikuje gotowy build na galezi gh-pages (GitHub Pages).
# Uruchamiac z katalogu Aplikacja/ (Git Bash). Wymaga zalogowanego 'gh' albo
# skonfigurowanego dostepu push do repo przez https.
#
#   bash deploy.sh
#
set -euo pipefail

REPO_URL="https://github.com/pastormarek-spec/zywe-slowo-test.git"
BASE="/zywe-slowo-test/"

echo ">> build (VITE_BASE=$BASE)"
VITE_BASE="$BASE" npm run build

echo ">> SPA fallback (404=index) + .nojekyll"
cp dist/index.html dist/404.html
touch dist/.nojekyll

echo ">> publikacja na galezi gh-pages (force push gotowego buildu)"
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="Marek Micyk" -c user.email="pastormarek@gmail.com" \
    commit -qm "deploy: $(date '+%Y-%m-%d %H:%M')"
git push -fq "$REPO_URL" gh-pages

echo ">> gotowe -> https://pastormarek-spec.github.io/zywe-slowo-test/"
