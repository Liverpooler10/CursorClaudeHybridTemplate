# Changelog

All notable changes to `create-cursor-claude-hybrid` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com). This project adheres to [Semantic Versioning](https://semver.org).

## [0.3.0] - 2026-04-18

### Token-efficiency pass

Reduces the per-session context floor by ~700 tokens and adds automated session-hygiene hints to every agent response.

**Added**

- `Session: <fresh | ok | consider-compact | consider-clear>` line in the mandatory Next-recommended footer (rule `035`, AGENTS.md §10). Agents now self-report context pressure every turn.
- AGENTS.md §14 Session Hygiene - concise rules for `/session-end`, `/compact`, `/clear` cadence.
- New Claude slash-command `/session-end` - flushes `.planning/STATE.md` and recommends `/compact` then `/clear`.
- New MODE-GUIDE.md rows for "session feels long" and "task just completed".
- Doctor check #11 (`scripts/doctor.mjs`) - token-floor audit. Counts AGENTS.md, CLAUDE.md, MODE-GUIDE.md, STATE.md, `.bootstrap.json`, and every `alwaysApply` rule. Thresholds: PASS < 5000, WARN 5000-7000, FAIL > 7000.

**Changed**

- `CLAUDE.md` slimmed from ~66 to ~22 lines - points at AGENTS.md instead of duplicating mode policy and footer schema.
- `.cursor/rules/010-planning-sync.mdc` - `alwaysApply: true` -> `globs: [".planning/**", "**/CHANGELOG.md"]`.
- `.cursor/rules/020-security.mdc` - `alwaysApply: true` -> `globs:` for security-sensitive paths only (hard enforcement stays in `hooks.json` + `settings.json.permissions`).
- `.cursor/rules/040-task-ownership.mdc` - `alwaysApply: true` -> `globs: [".planning/STATE.md"]`.
- Existing Claude slash-commands received `Session:` lines in their example footers.

**Removed**

- `.cursor/rules/030-claude-mode-policy.mdc` - content was redundant with AGENTS.md §3 and MODE-GUIDE.md.

**Floor impact**

alwaysApply rules dropped from 7 to 3 (`000-bootstrap-guard`, `005-venture-gate`, `035-next-step-hint`). Measured floor on a fresh scaffold: ~5576 tokens across 8 files, down from ~6300.

## [0.2.0] - 2026-04-17

### Venture-gated scaffold

- Initial public release.
- Bootstrap gate + Venture gate + dual-agent harmony (Cursor + Claude Code).
- Company-of-One discovery workflow (`.planning/VENTURE/*`).
- Agent orchestration slash-commands (`/plan-phase`, `/execute`, `/verify`, `/debug`, `/ui-review`, `/security-audit`, `/integration-check`).
- Security floor: `hooks.json`, `.claude/settings.json.permissions`, whitelisted MCP, gitleaks pre-commit.
- Doctor script (10 checks) and next-recommended footer protocol.
