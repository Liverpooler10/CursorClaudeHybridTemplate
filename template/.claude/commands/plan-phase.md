---
description: Plan the next roadmap phase. Produces a task breakdown, risk list, and verifier criteria before any code is written.
---

# /plan-phase

## Preconditions

- `.planning/.bootstrap.json.venture.committed === true` (else refuse; stay in venture gate).
- `.planning/COMMERCIAL/LANDING.md` is STATUS DONE (else refuse; rule 015-commercial-gate).
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

## Subagent delegation (research only, not writing)

If the `superpowers` plugin is active AND the phase has 5 or more tasks, fan out one research subagent per task **in parallel** to answer:

- What prior code or docs already address this task?
- What external libraries or patterns best fit (ties in with rule 030 buy-vs-build)?
- What tests exist that already cover part of the acceptance criteria?

Collect the research into the PLAN.md under a `## Research notes` section per task. Do not let subagents modify code or the plan itself - they return bullet points, the orchestrator writes the plan.

If `superpowers` is not active or the phase has < 5 tasks, do the research linearly.

## Do NOT

- Touch any code files.
- Install dependencies.
- Commit without user approval on the plan.
- Let subagents write to PLAN.md directly - they only return research notes.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : plan (review the plan) -> switch to default when starting first task
Model   : Claude Sonnet 4.6
Why     : Plan is reviewed in plan mode; /execute picks up the first task in default.
Session : consider-clear
```
