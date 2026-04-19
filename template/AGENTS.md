# __PROJECT_NAME__ - Agent Conventions (Source of Truth)

This file is the single source of agent conventions for __PROJECT_NAME__. Cursor reads `.cursor/rules/*.mdc` (auto-scoped). Claude Code reads `CLAUDE.md`. Both point here so conventions stay in sync.

Primary stack: __PRIMARY_STACK__
Database:      __DATABASE__
Frontend:      __FRONTEND__

---

## 1. Non-Negotiable Gates

1. **Bootstrap gate.** If `.planning/.bootstrap.json` has `bootstrapped === false`, stop and run `npm run bootstrap`.
2. **Venture gate.** If `.bootstrap.json.venture.committed === false`, refuse code edits outside `.planning/`. Follow the workflow in `.planning/VENTURE/README.md`.
3. **Commercial gate.** If venture is committed but `.planning/COMMERCIAL/LANDING.md` is missing or still has `<!-- STATUS: TODO -->` / `<!-- fill -->`, refuse code edits and refuse `/plan-phase`. Work the commercial track first via `/commercial:landing`. Enforced by rule `015-commercial-gate.mdc`. Sales page precedes product (Troy 1.6).
4. **Security deny-lists** in `.cursor/hooks.json` and `.claude/settings.json.permissions` are ground truth. Do not negotiate them away.

## 2. Surface Decision Tree (Cursor vs. Claude Code)

```
Task incoming
  |
  v
Is it a question / exploration (no code change)?
  yes -> Cursor Ask mode, Sonnet 4.6 or Cursor Auto
  no  |
      v
  Will it touch >1 file OR rename / migrate?
    yes -> Cursor Plan mode, then Claude Code CLI plan mode for diff review
    no  |
        v
    Is it a long autonomous run, scripting, or CI?
      yes -> Claude Code CLI (claude in Cursor integrated terminal)
      no  -> Cursor Agent mode OR Claude Code extension for visual diffs
```

Extra routing rules:

- Visual UI / CSS tweaks -> Cursor Agent with Composer 2 or Auto.
- Large refactor with good test coverage -> Claude Code CLI, `acceptEdits` after checkpoint.
- Tests-first TDD loop -> Claude Code CLI, `plan` then `default`.
- Debugging a specific error -> Cursor Agent with the error pasted, or `claude` CLI with `!` bash shortcut to repro.
- Parallel experiments -> `npm run worktree <name>` to spin a git worktree, then Cursor Agents Window.

## 3. Mode Policy (Claude Code)

`.planning/MODE-GUIDE.md` is the single source of truth for which mode to use when. Default mode for this project is `plan`, set in `.claude/settings.json`. Take a Checkpoint before `/execute` and any `acceptEdits` session.

## 4. Model Policy

`.planning/MODE-GUIDE.md` is the single source of truth. Default model is `claude-sonnet-4-5`, set in `.claude/settings.json`. Upgrade to Opus for venture-commit and research-depth decisions only. Never GPT / Gemini for `venture/*` commands - prompts are tuned to Claude's discourse.

## 5. Context Budget

- Read at most 5 files before proposing a plan.
- Prefer `@`-mention fuzzy inclusion (Claude Code extension) or explicit relative paths.
- `.planning/STATE.md` is the session-start snapshot; anything durable goes there, not in the chat.
- `CLAUDE.md` and this file are pre-loaded. Do not re-summarize them in the chat.
- Use `.cursor/rules/*.mdc` `globs` to scope rules to the files actually being edited.

## 6. Task Ownership (single-writer rule)

Two agents must not edit the same file at the same time (context diverges fast).

Protocol:

1. Before starting any file-modifying task, set `Current owner:` in `.planning/STATE.md` under "Session Continuity".
2. On finish or hand-off, clear it.
3. If `Current owner:` is already set to another agent, wait or coordinate.
4. Parallel work is fine in separate git worktrees; see `npm run worktree`.

## 7. Planning Sync

- `.planning/STATE.md` is updated at session end. One commit message that references the phase id.
- Use `git diff --stat` when syncing, not full diffs (tokens).
- `.planning/ROADMAP.md` is only updated when an ADR justifies it.
- Every architectural change ships with an ADR under `.planning/adr/`.

## 8. Branching

- Phase branches: `gsd/phase-N-slug` (enforced by `.planning/config.json`).
- Experiments: separate git worktrees under `worktrees/` (gitignored).
- Never direct-push to `main`.

## 9. Security Floor (do not weaken)

- No `curl ... | sh`. No `rm -rf /|~|.`.
- `.env*` files are never read, edited, or listed by agents (enforced by hooks).
- No new MCP servers added without an ADR + `.mcp.json.lock` update.
- Secrets scanning runs in pre-commit and CI. PRs fail on finds.

## 10. Next-Step Hint Protocol (mandatory)

Every response that completes or advances a task ends with a fenced block using this exact shape:

```
Next recommended
----------------
Surface : <Cursor Agent | Cursor Ask | Cursor Plan | Claude Code CLI | Claude Code Extension>
Mode    : <plan | default | acceptEdits | auto | ask>
Model   : <Claude Sonnet 4.6 | Claude Opus 4.6 | Composer 2 | Cursor Auto>
Why     : <one-line justification tied to MODE-GUIDE.md>
Session : <fresh | ok | consider-compact | consider-clear>
```

`Session:` heuristic (self-reported by the agent at the end of each turn):

- `fresh` - first ~5 turns of this session, minimal reads so far.
- `ok` - mid-session, context feels comfortable; no action needed.
- `consider-compact` - many tool calls or long reasoning chain, but current task still open. Advise user to run `/compact` in Claude Code before continuing.
- `consider-clear` - current task is **done** and STATE.md is up to date. Advise user to run `/session-end` then `/clear`, or start a fresh Cursor Composer session.

Mapping reference: `.planning/MODE-GUIDE.md`. The only two valid omissions of the whole block: pure permission-denials, and raw multi-option prompts awaiting user choice.

## 11. Installed Claude Plugins (project scope)

- `superpowers@claude-plugins-official`
- `ui-ux-pro-max@ui-ux-pro-max-skill`
- `obsidian@obsidian-skills`

Installed automatically during `npm create cursor-claude-hybrid` (default on; pass `--no-install-claude-plugins` to skip). `npm run doctor` verifies them on every health check; a `WARN` line names any missing plugin plus the install command.

When `superpowers` is active, `/execute` delegates independent subtasks to parallel subagents (at least 3 independent subtasks required) and `/plan-phase` fans out research subagents (at least 5 tasks required). Without `superpowers` both commands run linearly - behaviour is identical otherwise.

## 12. Testing Strategy

- Unit: Vitest, co-located next to modules.
- Integration: Vitest + `msw` for API boundaries.
- E2E: Playwright, only for critical user flows.
- Every `/execute` run ends green or reverts.

## 13. Commits and PRs

- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`).
- PR body must link an ADR when architecture changes.
- Phase PRs require `/verify` output attached.

## 14. Session Hygiene

Long chat contexts are the biggest token sink. Rules:

- Task done: emit `Session: consider-clear`, run `/session-end`, then `/compact`, then `/clear` (or new Cursor Composer).
- Context heavy mid-task (>20 turns / >8 substantive reads / agent re-asks): emit `Session: consider-compact`.
- Durable decisions go to `STATE.md` or an ADR, never into chat alone.
- Sync with `git diff --stat`, not full `git diff`. Use `@`-mentions instead of whole-file reads.
- Kill-Date Watch (rule `050-kill-date-watch.mdc`): when editing COMMITMENT.md or METRICS.md with < 30 days to kill-date, the agent prepends a visible countdown and recommends `/commercial:check`. This is not optional - ignoring the kill-date is how ventures die quietly.
