#!/usr/bin/env bash
set -euo pipefail

DESTINATION="."
PROJECT_NAME=""
PRIMARY_STACK="custom"
DATABASE="custom"
FRONTEND="custom"
INSTALL_CLAUDE_PLUGINS="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --destination)
      DESTINATION="$2"
      shift 2
      ;;
    --project-name)
      PROJECT_NAME="$2"
      shift 2
      ;;
    --primary-stack)
      PRIMARY_STACK="$2"
      shift 2
      ;;
    --database)
      DATABASE="$2"
      shift 2
      ;;
    --frontend)
      FRONTEND="$2"
      shift 2
      ;;
    --install-claude-plugins)
      INSTALL_CLAUDE_PLUGINS="true"
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$PROJECT_NAME" ]]; then
  echo "--project-name is required" >&2
  exit 1
fi

SCRIPT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_ROOT/.." && pwd)"
TEMPLATE_ROOT="$REPO_ROOT/template"

mkdir -p "$DESTINATION"
DESTINATION="$(cd "$DESTINATION" && pwd)"

echo "==> Scaffolding project into $DESTINATION"
cp -R "$TEMPLATE_ROOT"/. "$DESTINATION"/

CURRENT_DATE="$(date +%F)"

while IFS= read -r -d '' file; do
  sed -i.bak \
    -e "s|__PROJECT_NAME__|$PROJECT_NAME|g" \
    -e "s|__PRIMARY_STACK__|$PRIMARY_STACK|g" \
    -e "s|__DATABASE__|$DATABASE|g" \
    -e "s|__FRONTEND__|$FRONTEND|g" \
    -e "s|__CURRENT_DATE__|$CURRENT_DATE|g" \
    "$file"
  rm -f "${file}.bak"
done < <(find "$DESTINATION" -type f \( -name "*.md" -o -name "*.json" -o -name "*.txt" -o -name "*.example" -o -name ".cursorrules" -o -name "CLAUDE.md" \) -print0)

echo "==> Template files copied and placeholders replaced"

if [[ "$INSTALL_CLAUDE_PLUGINS" == "true" ]]; then
  if ! command -v claude >/dev/null 2>&1; then
    echo "Claude Code CLI was not found in PATH." >&2
    exit 1
  fi

  pushd "$DESTINATION" >/dev/null
  echo "==> Adding Claude marketplaces"
  claude plugins marketplace add --scope project nextlevelbuilder/ui-ux-pro-max-skill
  claude plugins marketplace add --scope project kepano/obsidian-skills

  echo "==> Installing Claude plugins"
  claude plugins install --scope project superpowers@claude-plugins-official
  claude plugins install --scope project ui-ux-pro-max@ui-ux-pro-max-skill
  claude plugins install --scope project obsidian@obsidian-skills
  popd >/dev/null
fi

echo "==> Done"
echo
echo "Next steps:"
echo "1. Review CLAUDE.md and .cursorrules"
echo "2. Fill out .planning/PROJECT.md, ROADMAP.md, and STATE.md"
echo "3. Run 'claude plugins list' inside the target project to verify plugin state"
