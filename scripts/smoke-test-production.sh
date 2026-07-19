#!/usr/bin/env bash
# Post-deploy smoke test — hits production frontend routes + backend health.
# Usage: FRONTEND_URL=https://... API_URL=https://... bash scripts/smoke-test-production.sh

set -euo pipefail

FRONTEND_URL="${FRONTEND_URL:?Set FRONTEND_URL}"
API_URL="${API_URL:?Set API_URL}"

ROUTES=(
  "/"
  "/about"
  "/skills"
  "/projects"
  "/playground"
  "/experience"
  "/contact"
  "/projects/emosens"
  "/robots.txt"
  "/sitemap.xml"
)

echo "Smoke testing frontend: $FRONTEND_URL"
for route in "${ROUTES[@]}"; do
  code="$(curl -fsS -o /dev/null -w "%{http_code}" "${FRONTEND_URL}${route}")"
  if [ "$code" != "200" ]; then
    echo "FAIL ${route} → HTTP ${code}"
    exit 1
  fi
  echo "OK   ${route} → ${code}"
done

echo "Smoke testing backend: $API_URL/api/health"
health="$(curl -fsS "${API_URL}/api/health")"
echo "$health" | grep -q '"status"' || { echo "FAIL health response"; exit 1; }
echo "OK   /api/health"

echo "All smoke checks passed."
