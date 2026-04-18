---
description: Goal-backward verification that the current phase delivers what was promised.
---

# /verify

## Your job

Check that the current phase actually delivered its stated outcome, not just that tasks got checked off.

## Process

1. Read `.planning/phase-N/PLAN.md` -> "Outcome" + "Verifier criteria".
2. For each criterion, find the evidence in the repo (files, tests, behavior).
3. Run tests. If any fail, the phase fails verification.
4. Run `/security-audit` and `/ui-review` (if applicable).
5. Produce `.planning/phase-N/VERIFICATION.md` with:
   - Criterion-by-criterion verdict (PASS / FAIL / PARTIAL with note).
   - Evidence links.
   - Delta between plan and reality.
   - Go / No-go for closing the phase.

## Failure handling

If verdict is FAIL:

- Do NOT silently fix. Report.
- Propose `/plan-phase --repair` for a repair phase.
- Cap repair phases per original phase at 2 (from `.planning/config.json.workflow.node_repair_budget`).

## Next recommended (PASS)

```
Next recommended
----------------
Surface : Cursor Plan mode (or Claude CLI)
Mode    : plan
Model   : Claude Sonnet 4.6
Why     : Phase verified; next phase begins with /plan-phase.
```

## Next recommended (FAIL)

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : plan
Model   : Claude Opus 4.6
Why     : Repair phase benefits from a model that surfaces root causes, not symptoms.
```
