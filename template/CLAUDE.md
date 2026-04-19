# __PROJECT_NAME__ - Claude Code Entry Point

> Single source of conventions: **[AGENTS.md](AGENTS.md)**. Cursor mirrors via `.cursor/rules/*.mdc`. Read `AGENTS.md` first; the lines below are the non-negotiable short form.

## Gates (stop if any fails)

1. **Bootstrap.** If `.planning/.bootstrap.json.bootstrapped === false` -> tell the user to run `npm run bootstrap`. No ad-hoc `.cursorrules` or scaffold code.
2. **Venture.** If `.bootstrap.json.venture.committed === false` -> DISCOVERY mode: only edit `.planning/VENTURE/*.md`, `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/adr/*`. Refuse code edits in `src/`, `app/`, `server/`, `api/`, `lib/`, `components/`, `pages/`, `prisma/`, `db/`.
3. **Commercial.** If venture is committed BUT `.planning/COMMERCIAL/LANDING.md` still has `<!-- STATUS: TODO -->` or `<!-- fill -->` placeholders -> COMMERCIAL mode: only edit under `.planning/COMMERCIAL/`, `.planning/STATE.md`, `.planning/adr/*`. Refuse code edits and `/plan-phase`. Run `/commercial:landing` first.

## Mandatory Reads Per Session

1. `AGENTS.md`
2. `.planning/STATE.md`
3. `.planning/.bootstrap.json`
4. `.planning/MODE-GUIDE.md`

Everything else on demand via `@`-mentions or explicit reads. Context budget: 5 files before proposing a plan.

## Task Ownership

Set `Current owner: Claude Code (CLIExtension)` in `.planning/STATE.md` before editing any file; clear it when done. Never co-edit a file with Cursor.

## Next-Step Hint Protocol

Every response ends with the "Next recommended" fenced block defined in **AGENTS.md paragraph 10** (including the `Session:` line). No exceptions except pure permission-denials or raw user-choice prompts. When in doubt: `Cursor Plan mode` + `Sonnet 4.6` + "re-evaluate after reading STATE.md".

## Session Hygiene

See AGENTS.md paragraph 14. Use `/session-end` to flush STATE.md, then `/compact`, then `/clear` when a task is done or context feels long.

## Local Overrides

Personal, non-committed overrides live in `CLAUDE.local.md` (gitignored).
