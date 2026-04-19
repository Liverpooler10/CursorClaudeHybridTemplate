# Changelog

All notable changes to `create-cursor-claude-hybrid` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com). This project adheres to [Semantic Versioning](https://semver.org).

## [1.0.0] - 2026-04-19

### General Availability - Long-term discipline (Wave 5 of 5)

First GA release. The template now supports a full founder lifecycle: discovery -> commit -> sell -> build -> monitor -> kill-or-scale.

**Added**

- `/commercial:check` full kill-date logic. Parses `kill_date` and `capital_at_risk` from COMMITMENT.md, computes `target_so_far`, weekly burn, and emits exactly one of four signals (`double down`, `kill candidate`, `watch`, `on track`). Appends to METRICS.md history and to STATE.md TODOs. On `kill candidate` also drafts an ADR stub.
- `/commercial:competitor-watch` full MCP-fetch flow. Diffs vs. prior month, assigns threat level (low/medium/high), propagates high flags to METRICS.md Blockers and STATE.md TODOs.
- Rule `.cursor/rules/050-kill-date-watch.mdc` (globs: COMMITMENT.md, METRICS.md). Soft warning when opened within 30 days of kill-date and < 5 paying customers. Not a hard gate - visibility only.
- Web-Fetch MCP entry in `.mcp.json._opt_in_servers.fetch`. Opt-in: move into `mcpServers` to enable. Each fetch remains gated by `.claude/settings.json.permissions.ask`.
- README sections: `Long-term rhythm` (daily / weekly / monthly cadence) and `Versioning` (semver, npm tag policy, deprecation cycle).

**Changed**

- AGENTS.md §14 Session Hygiene explicitly includes the kill-date-watch behaviour.
- CHANGELOG tagged as v1.0.0; prior 0.x history preserved below.

**Distribution**

- Latest tag: `npm create cursor-claude-hybrid@latest` now points to v1.0.0.
- Legacy tag: `npm create cursor-claude-hybrid@legacy` points at v0.3.0, preserved through 2026-10.

**Release smoke test (manual)**

Before publishing any v1.x release, run the full happy path end-to-end:

1. `npm pack` in the repo, publish to a private npm proxy or use `npm link`.
2. `npm create cursor-claude-hybrid@latest smoke-$(date +%s)` in a scratch directory.
3. Answer the three stack prompts with `deferred`. Confirm plugin install.
4. `cd` into the new project. `npm run doctor` must show 0 FAIL.
5. Run `/venture:skillset` through `/venture:commit` using a toy opportunity ("I help indie devs ship faster"). `npm run commit` must pass.
6. Run `/commercial:landing` to fill LANDING.md. `npm run doctor` shows Commercial gate green.
7. Run `/plan-phase`. Phase 1 PLAN.md produced.
8. Run `/execute` on a single trivial task. Conventional commit created. STATE.md updated.
9. Run `/commercial:check`. A signal appears in METRICS.md.
10. `npm run doctor -- --verbose-tokens`. Context floor under 4000.

Any failure blocks the release.

**Breaking changes vs. 0.x**

- Package version jumps from 0.7.0 to 1.0.0. Scaffolds from 0.x continue working; their `.planning/.bootstrap.json.templateVersion` remains on their creation version.
- `/commercial:check` and `/commercial:competitor-watch` now have real implementations (were placeholders in 0.5.0-0.7.0). No migration needed - replacing the slash-command files is sufficient.
- `.mcp.json` gets the new `_opt_in_servers` key. Existing `.mcp.json` files are not touched by this release; copy the new key if you want the fetch MCP.

## [0.7.0] - 2026-04-19

### Performance, tokens, parallelism (Wave 4 of 5)

Two new guardrails for stack choice and vendor-vs-build, a slimmer AGENTS.md, and subagent delegation wired into the workhorse slash-commands.

**Added**

- Rule `.cursor/rules/120-performance-default.mdc` (globs: ADRs + code paths). Requires every stack ADR to answer three questions - can it be static, can it be serverless/BaaS, can it skip a database - or include a `Performance floor` field justifying the heavier choice.
- Rule `.cursor/rules/030-buy-vs-build.mdc` (alwaysApply, ~250 tokens). Maps commodity capabilities (CRM, analytics, auth, payments, email, storage, search, forms, scheduling) to default vendors and requires an ADR to build anything custom in these classes.
- Subagent delegation in `/execute`: when `superpowers` plugin is active AND a task has 3+ independent subtasks, each subtask runs as its own subagent. Falls back to linear execution otherwise.
- Subagent delegation in `/plan-phase`: research-only fan-out per task when a phase has 5+ tasks and `superpowers` is active. Research returns bullets; orchestrator writes the plan.
- `npm run doctor -- --verbose-tokens` flag. Dumps the top-10 loaded-every-session files with token estimates and byte counts.

**Changed**

- AGENTS.md §3 (Mode Policy) and §4 (Model Policy) slimmed from ~25 lines to 2 sentences each, pointing at `.planning/MODE-GUIDE.md` (the existing source of truth). Saves ~800 tokens from the always-loaded context floor.
- AGENTS.md §11 notes that subagents activate automatically when `superpowers` is installed.
- `/plan-phase` preconditions now include the Commercial gate (LANDING.md DONE) per rule 015.
- Token-floor thresholds tightened: PASS < 4000 (was < 5000), WARN 4000-6000 (was 5000-7000), FAIL > 6000 (was > 7000).
- README doctor example updated: now shows new rules, Commercial-gate line, token-audit line, plus a pointer to `--verbose-tokens`.

**Migration (existing v0.6.0 projects)**

- Copy `.cursor/rules/030-buy-vs-build.mdc` and `.cursor/rules/120-performance-default.mdc` from template.
- Optionally re-slim AGENTS.md §3/§4 with the new wording if you want the token savings. If you've customized these sections, keep your version.
- `/execute` and `/plan-phase` slash-commands received non-breaking additions - copy the Subagent Delegation section into your `.claude/commands/execute.md` and `plan-phase.md`, or re-copy the files wholesale.

## [0.6.0] - 2026-04-19

### Troy's framework, fully mapped (Wave 3 of 5)

Every Troy 1.1-1.6 concept now has a dedicated slot. No more narrative-only sections that drift from the source.

**Added**

- `OPPORTUNITIES.md` - new mandatory columns `Kind` (Pain / Enjoyment) and `Skill Fit (1-5)` cross-referenced to `SKILLSET.md`. At least 70 % of the advanced candidates must be Pain; Skill Fit < 3 kills a candidate unless a co-founder covers the gap.
- `RESEARCH.md` - new section `Marketing vs. Sales company` with Troy's tick-box rubric (price point, setup, contract, B2C/B2B). Verdict required before TAM/SAM/SOM.
- `RESEARCH.md` - new section `TAM / SAM / SOM` with the 4 fixed inputs (people in space, people in need, charge, frequency) and fixed formulas. SOM carries to CATEGORIZATION.md.
- `RESEARCH.md` - 10-hour-per-candidate time budget at the top as a hard guardrail.
- `CATEGORIZATION.md` - rebuilt around Troy's exact axis values: `Timeline-to-Ship` (< 1M, 1-3M, 3+M, Ongoing), `Opportunity-Size` (Low, Mid, Large, Venture), `Confidence` (Low, Fair, Likely, High). Explicit warning when > 50 % of shortlist is `3+ Months` ("not thinking lean enough").
- `MARKET-TEST.md` - default success metric pre-filled with `10 paying customers`.
- `MARKET-TEST.md` - new section `Finding your first customers` documenting Troy's four mechanisms: Advisor Shares (0.1-0.5 %), Godfather Offer, Sell At Cost, Free Trial with payment info. Includes the hard "don't" list (no split-the-difference, no free without payment info).

**Changed**

- `VENTURE/README.md` Hard rules expanded from 6 to 8, adding the Pain-kind rule and 10-hour research budget.
- `/venture:chase-pain` slash-command now enforces `Kind` and `Skill Fit` per row, reads SKILLSET.md directly, and warns if shortlist is > 30 % Enjoyment.

**Migration (existing v0.5.0 projects)**

- Existing `OPPORTUNITIES.md` tables can add `Kind` + `Skill Fit` columns manually, or re-run `/venture:chase-pain` to re-score.
- `RESEARCH.md` gets two new sections; existing text stays valid. Re-run `/venture:research` on any candidate to fill them.
- `CATEGORIZATION.md` axis changes are breaking for any existing scored matrix. `STATUS: DONE` from v0.5.0 remains accepted by `npm run commit`, but rerunning `/venture:categorize` is strongly recommended to get Troy's taxonomy.
- `MARKET-TEST.md` first-customers section is additive; no migration needed.

## [0.5.0] - 2026-04-19

### Commercial track is first-class (Wave 2 of 5)

After venture commit, the template now runs two parallel tracks: Tech (phases) and Commercial (COMMERCIAL/). A sales page must precede product code.

**Added**

- `.planning/COMMERCIAL/` directory with six templated files: `README.md`, `LANDING.md`, `ICP.md`, `PRICING.md`, `INTERVIEWS/README.md`, `METRICS.md`, `COMPETITORS.md`. All use the same STATUS/fill pattern as VENTURE files.
- Six new slash-commands under `.claude/commands/commercial/`: `landing`, `icp`, `pricing`, `interview-log`, `check`, `competitor-watch` (placeholder; full MCP wiring in v1.0.0).
- Rule `.cursor/rules/015-commercial-gate.mdc` (alwaysApply). Blocks `src/`, `app/`, `server/`, `api/`, `lib/`, `components/`, `pages/`, `prisma/`, `db/` edits and `/plan-phase` until `COMMERCIAL/LANDING.md` is DONE. Escape hatch: ADR 0002.
- Commercial-gate check in `scripts/doctor.mjs` with dedicated `nextRecommended()` branch that recommends `/commercial:landing` when gate is closed.
- `scripts/next.mjs` knows the Commercial gate and launches `/commercial:landing` after venture commit.

**Changed**

- `.planning/ROADMAP.md` restructured so each phase has explicit `Commercial Track` and `Tech Track` checklists. Every phase now ends with a commercial-metric update alongside `/verify`.
- `AGENTS.md` §1 renumbered; new §1.3 "Commercial gate" inserted. Security moved to §1.4.
- `CLAUDE.md` Gates section documents gate #3 (Commercial) explicitly.
- README adds commercial rows to the slash-commands table, extends the flow diagram with a `Commercial gate` node, and adds `COMMERCIAL/` to "What gets generated".

**Migration (existing v0.4.0 projects)**

- Copy `.planning/COMMERCIAL/` from the template and `.claude/commands/commercial/`.
- Copy `.cursor/rules/015-commercial-gate.mdc`.
- If you have an already-validated product that predates the gate, write `.planning/adr/0002-commercial-gate-skipped.md` and set `LANDING.md` STATUS to DONE manually.

## [0.4.0] - 2026-04-19

### AI leads, user commercializes (Wave 1 of 5)

First wave of the founder-focused rollout: the template now drives the next action instead of asking the user to pick a surface.

**Added**

- `npm run next` (`template/scripts/next.mjs`) - active launcher. Reads `.planning/.bootstrap.json` plus venture/commercial/phase state, then spawns `claude` with the correct `--permission-mode`, `--model`, and opening slash-command. Falls back to printing a copy-paste-ready command when `claude` is not on PATH.
- Plugin verification in `scripts/doctor.mjs` - calls `claude plugins list` and names any of the three project plugins (`superpowers`, `ui-ux-pro-max`, `obsidian`) that are missing.
- `defaultModel: "claude-sonnet-4-5"` in `.claude/settings.json` so Claude Code no longer opens to the most expensive model by default.
- Bootstrap flag `--no-install-claude-plugins` (opt-out). Default behavior flipped to install plugins.
- Interactive prompt during `npm create cursor-claude-hybrid` asks whether to install plugins now.
- README section `Daily workflow: npm run next`.

**Changed**

- `scripts/bootstrap.mjs` - default `installPlugins` now `true`. Old `--install-claude-plugins` flag still accepted (no-op when already on).
- Template version bumped to `0.4.0` (reflected in `.planning/.bootstrap.json.templateVersion`).
- README doctor-output example now shows the `Claude plugins` check line.
- AGENTS.md §11 clarifies that plugins install automatically and are verified by doctor.

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
