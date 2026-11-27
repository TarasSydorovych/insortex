#!/usr/bin/env bash
set -euo pipefail
umask 077

live=/var/www/insortex
process=insortex
origin=http://127.0.0.1:3000
log_dir=/root/insortex-release-logs

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

cd "$live"
release=$(git rev-parse --verify "$1^{commit}")
baseline=$(git rev-parse "$release^")
test -s .next/BUILD_ID
test -f .env.local
test -x node_modules/.bin/next
command -v npm pm2 python3 >/dev/null

exec 9>/root/insortex-admin-descriptions.lock
flock -n 9 || fail 'Інше оновлення INSORTEX ще виконується.'
pid=$(pm2 pid "$process")
[[ $pid =~ ^[1-9][0-9]*$ && $(readlink -f "/proc/$pid/cwd") == "$live" ]] ||
  fail 'Очікується чинний процес PM2 insortex у /var/www/insortex.'

candidate=
backup=
switch_started=0
stage=$(mktemp -d /root/insortex-contact-catalog.XXXXXX)

restore_previous() {
  local file
  pm2 stop "$process" >/dev/null || return 1
  if [[ -d $backup/.next ]]; then
    if [[ -d $live/.next ]]; then
      mv -- "$live/.next" "$candidate/rejected.next" || return 1
    fi
    mv -- "$backup/.next" "$live/.next" || return 1
  fi
  for file in "${files[@]}"; do
    if [[ -f $backup/source/$file ]]; then
      cp -p -- "$backup/source/$file" "$live/$file" || return 1
    else
      rm -f -- "$live/$file" || return 1
    fi
  done
  pm2 restart "$process" >/dev/null || return 1
}

cleanup() {
  local code=$?
  trap - EXIT
  if ((code != 0 && switch_started)); then
    if restore_previous; then
      printf '%s\n' 'Попередню збірку відновлено. PM2 перезапустив insortex.' >&2
    else
      printf 'Відкат потребує перевірки. Резервна копія %s\n' "$backup" >&2
      exit "$code"
    fi
  fi
  if [[ -n $candidate ]]; then rm -rf -- "$candidate"; fi
  rm -rf -- "$stage"
  exit "$code"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

git diff --name-only --diff-filter=AM "$baseline" "$release" -- src > "$stage/files"
files=()
while IFS= read -r file; do files+=("$file"); done < "$stage/files"
test "${#files[@]}" -eq 13 || fail 'Склад змін відрізняється від перевіреного релізу.'
git show "$release:scripts/verify-contact-catalog.py" > "$stage/verify.py"

for file in "${files[@]}"; do
  mkdir -p "$stage/old/$(dirname "$file")" "$stage/new/$(dirname "$file")"
  git show "$release:$file" > "$stage/new/$file"
  chmod 0644 "$stage/new/$file"
  if git cat-file -e "$baseline:$file" 2>/dev/null; then
    git show "$baseline:$file" > "$stage/old/$file"
  fi
  [[ ! -L $file ]] || fail "Серверний файл є посиланням. $file"
  if [[ -f $file ]]; then
    cmp -s "$file" "$stage/old/$file" || cmp -s "$file" "$stage/new/$file" ||
      fail "Серверний файл відрізняється від очікуваної версії. $file"
  else
    [[ ! -e $file && ! -f $stage/old/$file ]] || fail "На сервері відсутній $file"
  fi
done

check_catalog() {
  local route
  for route in /api/category /api/products; do
    curl --noproxy '*' -fsS --max-time 15 -o /dev/null "$origin$route"
  done
}
check_catalog

source_kb=$(du -skx --exclude=node_modules --exclude=.git --exclude=.next \
  --exclude=.next-dev --exclude=backup --exclude=backups --exclude=nohup.out "$live" | cut -f1)
build_kb=$(du -skx --exclude=images "$live/.next" | cut -f1)
free_kb=$(df -Pk "$live" | awk 'NR == 2 {print $4}')
if ((free_kb < source_kb + build_kb)); then
  fail "Для збірки потрібно орієнтовно $(((source_kb + build_kb + 1023) / 1024)) МБ. Доступно $((free_kb / 1024)) МБ."
fi

mkdir -p "$log_dir"
build_log=$(mktemp "$log_dir/contact-catalog-build.XXXXXX.log")
backup=$(mktemp -d "$live.before-contact-catalog.XXXXXX")
cp -- "$stage/files" "$backup/files"
cp -p -- .next/BUILD_ID "$backup/build-id"
for file in "${files[@]}"; do
  if [[ -f $file ]]; then
    mkdir -p "$backup/source/$(dirname "$file")"
    cp -p -- "$file" "$backup/source/$file"
  fi
done

candidate=$(mktemp -d "$live.build-contact-catalog.XXXXXX")
tar -C "$live" --exclude=./node_modules --exclude=./.git --exclude=./.next \
  --exclude=./.next-dev --exclude=./backup --exclude=./backups --exclude=./nohup.out \
  -cf - . | tar -C "$candidate" -xf -
ln -s -- "$live/node_modules" "$candidate/node_modules"
cp -R -- "$stage/new/src/." "$candidate/src/"
printf 'Збираю оновлення. Журнал %s\n' "$build_log"
if ! (cd "$candidate" && NEXT_TELEMETRY_DISABLED=1 npm run build) > "$build_log" 2>&1; then
  fail "Збірка завершилася помилкою. Журнал $build_log"
fi
test -s "$candidate/.next/BUILD_ID"

cmp -s .next/BUILD_ID "$backup/build-id" || fail 'Під час збірки чинний сайт оновився.'
for file in .env.local package.json package-lock.json next.config.mjs; do
  cmp -s "$file" "$candidate/$file" || fail "Під час збірки змінився $file"
done
for file in "${files[@]}"; do
  if [[ -f $backup/source/$file ]]; then
    cmp -s "$file" "$backup/source/$file" || fail "Під час збірки змінився $file"
  else
    [[ ! -e $file ]] || fail "Під час збірки з’явився $file"
  fi
done
check_catalog

switch_started=1
pm2 stop "$process" >/dev/null
mv -- "$live/.next" "$backup/.next"
mv -- "$candidate/.next" "$live/.next"
for file in "${files[@]}"; do
  cp -p -- "$stage/new/$file" "$live/$file"
  cmp -s "$stage/new/$file" "$live/$file"
done
pm2 restart "$process" >/dev/null

for attempt in {1..20}; do
  if curl --noproxy '*' -fsS --max-time 3 -o /dev/null "$origin/ua/contact" 2>/dev/null; then
    break
  fi
  sleep 1
done
python3 "$stage/verify.py" "$origin" "$live"
curl --noproxy '*' -fsS --retry 1 --max-time 15 -o /dev/null https://insortex.com/ua/contact
cp -p -- .next/BUILD_ID "$backup/released-build-id"
printf 'Оновлення опубліковано. Резервна копія %s\n' "$backup"
