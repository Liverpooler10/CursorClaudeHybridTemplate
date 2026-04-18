#!/usr/bin/env bash
set -euo pipefail
SCRIPT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js >= 18 is required. Install Node and re-run." >&2
  exit 1
fi

exec node "$SCRIPT_ROOT/bootstrap.mjs" "$@"
