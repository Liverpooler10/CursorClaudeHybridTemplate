# __PROJECT_NAME__ - Claude Code Instructions

> This file is the Claude Code entry point. The single source of project conventions is **[AGENTS.md](AGENTS.md)**. The Cursor-side mirror lives under `.cursor/rules/`. Read `AGENTS.md` first; everything below is the non-negotiable short form.

## Non-negotiable Gates

### Gate 1 - Bootstrap

Before anything else, read `.planning/.bootstrap.json`.

- If `bootstrapped === false` -> STOP. Tell the user to run `npm run bootstrap`.
- Do NOT create ad-hoc `.cursorrules`, local instruction files, or scaffold code.

### Gate 2 - Venture (Company of One)

Read `venture.committed` in `.planning/.bootstrap.json`.

- If `false` -> DISCOVERY mode: only edit `.planning/VENTURE/*.md`, `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/adr/*`. Refuse all code edits in `src/`, `app/`, `server/`, `api/`, `lib/`, `components/`, `pages/`, `prisma/`, `db/`.
- If `true` -> BUILD mode: regular rules apply.

The six mandatory discovery steps and their slash-commands are in `.claude/commands/venture/`.

## Mode Policy (short form)

- Multi-file changes, renames, migrations -> **`plan` mode**.
- Single-file edits, exploration -> **`default` mode**.
- Scoped refactors after a checkpoint -> **`acceptEdits` mode**.
- Isolated git worktrees only -> **`auto` mode**.
- **Never** `bypassPermissions` outside of a sandbox with no internet.

Full policy: see `AGENTS.md` and `.cursor/rules/030-claude-mode-policy.mdc`.

## Task Ownership

Only one agent edits a given file at a time. Before starting, set `Current owner: Claude Code (CLI|Extension)` in `.planning/STATE.md`. Clear it when done.

## Mandatory Reads Per Session

1. `AGENTS.md`
2. `.planning/STATE.md`
3. `.planning/.bootstrap.json`
4. `.planning/MODE-GUIDE.md` (to decide next surface/mode/model)

Everything else on demand, via `@`-mentions or explicit reads.

## Next-Step Hint Protocol (mandatory, no exceptions)

**Every response MUST end with this fenced block.** No exceptions for "trivial answers", short replies, plan-mode responses, or ask-mode responses. The block is how the user knows which window to type into next.

```
Next recommended
----------------
Surface : <Cursor Agent | Cursor Ask | Cursor Plan | Claude Code CLI | Claude Code Extension>
Mode    : <plan | default | acceptEdits | auto | ask>
Model   : <Claude Sonnet 4.6 | Claude Opus 4.6 | Composer 2 | Cursor Auto>
Why     : <one line, <= 120 chars, anchored in .planning/MODE-GUIDE.md>
```

The only two valid omissions: (1) pure permission-denial with no partial work done, (2) raw multi-option prompt waiting for user choice.

Mapping table: `.planning/MODE-GUIDE.md`. When in doubt: `Cursor Plan mode` + `Sonnet 4.6` + "re-evaluate after reading STATE.md".

## Local Overrides

Put personal, non-committed overrides in `CLAUDE.local.md`. That file is gitignored.
