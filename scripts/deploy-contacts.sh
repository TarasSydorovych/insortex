#!/usr/bin/env bash
set -euo pipefail
umask 077

live=/var/www/insortex
template=/root/insortex-admin-descriptions/deploy-verified.sh
baseline=cd20bdaa37d0979c50523aac864fc11bb6532c1b
files=(
  src/app/components/contact/firstBlockContact.jsx
  src/app/components/protectedRoute.js
  src/app/i18n/locales/en/translation.json
  src/app/i18n/locales/pl/translation.json
  src/app/i18n/locales/ru/translation.json
  src/app/i18n/locales/ua/translation.json
)

cd "$live"
release=$(git rev-parse --verify "$1^{commit}")
test -s "$template"
test "$(grep -c '^files=(' "$template")" -eq 1
grep -Fxq 'check_catalog' "$template"

check_catalog() {
  local route
  for route in /api/products /api/category; do
    curl --noproxy '*' -fsS --max-time 12 -o /dev/null "http://127.0.0.1:3000$route" || return
  done
  printf 'API каталогу відповідає\n'
}
export -f check_catalog
check_catalog

source_kb=$(du -skx --exclude=.next --exclude=.next-dev --exclude=.git --exclude=node_modules \
  --exclude=backup --exclude=backups --exclude=nohup.out "$live" | awk '{ print $1 }')
build_kb=$(du -skx "$live/.next" | awk '{ print $1 }')
free_kb=$(df -Pk "$live" | awk 'NR == 2 { print $4 }')
if ((free_kb < source_kb + build_kb)); then
  printf 'Для копії та збірки потрібно орієнтовно %s МБ. На сервері доступно %s МБ.\n' \
    "$(((source_kb + build_kb + 1023) / 1024))" "$((free_kb / 1024))" >&2
  exit 1
fi

bundle=$(mktemp -d /root/insortex-contacts.XXXXXX)
trap 'rm -rf -- "$bundle"' EXIT
for file in "${files[@]}"; do
  mkdir -p "$bundle/changed/$(dirname "$file")"
  git show "$release:$file" > "$bundle/changed/$file"
  old_hash=$(git show "$baseline:$file" | sha256sum | awk '{ print $1 }')
  new_hash=$(sha256sum "$bundle/changed/$file" | awk '{ print $1 }')
  live_hash=$(sha256sum "$file" | awk '{ print $1 }')
  if [[ $live_hash != "$old_hash" && $live_hash != "$new_hash" ]]; then
    printf 'Серверний файл %s відрізняється від очікуваної версії.\n' "$file" >&2
    exit 1
  fi
  printf '%s  %s\n' "$live_hash" "$file" >> "$bundle/before.sha256"
  printf '%s  %s\n' "$new_hash" "$file" >> "$bundle/after.sha256"
done

sed -e "s|^files=(.*)$|files=(${files[*]})|" \
  -e 's|before-admin-descriptions\.|before-contacts.|g' \
  -e 's|build-admin-descriptions\.|build-contacts.|g' \
  -e 's|admin-descriptions-build\.|contacts-build.|g' \
  -e 's|/ua/product/vibroplatforma-dlya-malyny|/ua/contact|g' \
  "$template" > "$bundle/deploy.sh"
bash -n "$bundle/deploy.sh"
bash "$bundle/deploy.sh"
