# Mode Guide (Surface / Mode / Model)

This is the lookup table used by the "Next recommended" footer that every agent response ends with (see `.cursor/rules/035-next-step-hint.mdc`). Keep it short. Changes here propagate everywhere.

## Surfaces

- **Cursor Agent** - Cursor's native AI in Agent mode. Full tool access. Multi-model (Auto, Sonnet, Opus, GPT, Gemini, Composer 2).
- **Cursor Ask** - Read-only mode for questions and exploration.
- **Cursor Plan** - Read-only planning mode; produces a plan the user must approve.
- **Claude Code CLI** - `claude` command inside Cursor's integrated terminal. Full slash-commands, `!bash` shortcut, scripting.
- **Claude Code Extension** - Panel in Cursor sidebar. Visual diffs, `@`-mentions with fuzzy match.

## Modes (Claude Code)

- `plan` - Reads and proposes; no action until you approve.
- `default` - Works step by step, prompts before each action.
- `acceptEdits` - Auto-approves file edits; bash still prompts.
- `auto` - Approves routine actions; flags risky ones. Worktree-only.
- `bypassPermissions` - Sandbox-only. Never on real repo.

## Models (when you can pick)

- **Claude Sonnet 4.6** - Balanced default. Fast, solid reasoning.
- **Claude Opus 4.6** - Deep reasoning. Use for commit decisions, adversarial review, gnarly bugs.
- **Composer 2** - Cursor-only frontier coding model. Best for UI and tight iteration loops.
- **Cursor Auto** - Cursor picks per turn. Good default when you don't want to think.
- **GPT / Gemini** - Available in Cursor. Not used for venture-gate work; acceptable for code tasks.

## Situation matrix

| Situation | Surface | Mode | Model | Why |
|---|---|---|---|---|
| Bootstrap not done | Terminal | n/a | n/a | Must run `npm run bootstrap` first |
| Venture: SKILLSET.md | Claude CLI or Cursor Ask | plan / ask | Sonnet 4.6 | Honest inventory; push back on vague |
| Venture: OPPORTUNITIES.md | Claude CLI | plan | Sonnet 4.6 | Scored pain; no code |
| Venture: RESEARCH.md | Claude CLI | plan | Opus 4.6 | Evidence quality matters |
| Venture: CATEGORIZATION.md | Cursor Ask | ask | Sonnet 4.6 | Ranking pass |
| Venture: MARKET-TEST.md | Claude CLI | plan | Sonnet 4.6 | Hypothesis drafting |
| Venture: COMMITMENT.md | Claude CLI | plan | Opus 4.6 | Adversarial review before signing |
| Post-commit: Phase 1 plan | Cursor Plan | plan | Auto | Orchestrate via `/plan-phase` |
| Execute planned tasks | Claude CLI | plan -> default | Sonnet 4.6 | Atomic commits per task |
| Verify phase output | Claude CLI | default | Sonnet 4.6 | Goal-backward check |
| UI polish / Tailwind | Cursor Agent | default | Composer 2 | Fast visual iteration |
| Debug a specific error | Cursor Agent | default | Sonnet 4.6 | Paste stack, iterate |
| Refactor across files | Claude CLI | plan, then acceptEdits | Sonnet 4.6 | Checkpoint first |
| Research / market question | Cursor Ask | ask | Opus 4.6 | Research-quality reasoning |
| PR review | Claude CLI | default | Sonnet 4.6 | Cheap, thorough |
| Write or update tests | Claude CLI | plan | Sonnet 4.6 | Plan tests before running |
| Rename / migration | Claude CLI | plan | Opus 4.6 | High blast radius; plan hard |
| Parallel experiment | Worktree + Cursor Agent | default | Auto | Isolated via `npm run worktree` |
| Security-sensitive change | Claude CLI | plan | Opus 4.6 | Requires audit trail in ADR |

If none of the rows match, default to: `Cursor Plan mode + Claude Sonnet 4.6, re-evaluate after reading STATE.md`.

## Cost notes

- Cursor Pro billing covers the native agent and model picker.
- Claude Code CLI / Extension bills separately via Anthropic. Heavy Opus sessions drain Pro fast; Max tier ($100/200) is common for power users.
- Prefer Sonnet 4.6 by default. Only escalate to Opus 4.6 where the table says so.

## How the "Next recommended" block uses this

Agents read this file (or a cached summary) when emitting their footer. The Surface / Mode / Model line picks one row; the "Why" line quotes or paraphrases the row's reason.
