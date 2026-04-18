---
description: Plan the next roadmap phase. Produces a task breakdown, risk list, and verifier criteria before any code is written.
---

# /plan-phase

## Preconditions

- `.planning/.bootstrap.json.venture.committed === true` (else refuse; stay in venture gate).
- `.planning/ROADMAP.md` shows the next unstarted phase.
- No `Current owner:` lock in `.planning/STATE.md` (or it is yours).

## Process

1. Read: `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `AGENTS.md`. Nothing else yet.
2. Identify the next phase and its outcome statement.
3. Produce `.planning/phase-N/PLAN.md` with:
   - Outcome (one sentence).
   - Task breakdown: each task <= 1 day, with acceptance criteria.
   - Dependencies / risks.
   - Test strategy per task.
   - Rollback plan.
   - Verifier criteria (how we know phase is done).
4. Write an ADR if architecture is at stake.
5. Set `.planning/STATE.md` -> "Current Position" to the new phase and "Current owner: Claude Code CLI (plan-phase)".
6. Create the phase branch if missing: `git checkout -b gsd/phase-N-<slug>` (ask before pushing).

## Do NOT

- Touch any code files.
- Install dependencies.
- Commit without user approval on the plan.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : plan (review the plan) -> switch to default when starting first task
Model   : Claude Sonnet 4.6
Why     : Plan is reviewed in plan mode; /execute picks up the first task in default.
```
